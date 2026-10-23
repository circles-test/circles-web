/**
 * Uploads the images listed in scripts/media-map.ts to Sanity and puts each one
 * in its field (published document and, if it exists, its unpublished draft).
 *
 *   npm run upload-images -- <folder>             # e.g. public/media
 *   npm run upload-images -- <folder> --dry-run   # only checks files and documents
 *
 * Needs SANITY_WRITE_TOKEN (Editor) in .env.local, like `npm run seed`.
 * Safe to run again: Sanity recognises files it already has and doesn't duplicate them.
 */
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { MEDIA_MAP } from "./media-map";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const folder = args.find((arg) => !arg.startsWith("--"));

if (!folder) {
  console.error("Tell me where the images are: npm run upload-images -- public/<folder>");
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || (!token && !dryRun)) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-10-01",
  token,
  useCdn: false,
  perspective: "raw", // see drafts too
});

async function main() {
  // 1. Every file must exist before touching anything.
  const missingFiles = [...new Set(MEDIA_MAP.map((m) => m.file))].filter((file) => !existsSync(path.join(folder!, file)));
  if (missingFiles.length) {
    console.error(`These files are not in ${folder}:\n  - ${missingFiles.join("\n  - ")}`);
    process.exit(1);
  }

  if (dryRun && !token) {
    console.log(`(dry run) ${MEDIA_MAP.length} assignments, all files found in ${folder}. Documents not checked (no token).`);
    return;
  }

  // 2. Which target documents (and drafts) exist.
  const docIds = [...new Set(MEDIA_MAP.map((m) => m.doc))];
  const existing = new Set(
    await client.fetch<string[]>(`*[_id in $ids]._id`, { ids: [...docIds, ...docIds.map((id) => `drafts.${id}`)] }),
  );
  const missingDocs = docIds.filter((id) => !existing.has(id) && !existing.has(`drafts.${id}`));
  if (missingDocs.length) {
    console.warn(`⚠ Not found in Sanity (renamed or deleted?), skipping:\n  - ${missingDocs.join("\n  - ")}`);
  }

  if (dryRun) {
    console.log(`(dry run) all files found; ${docIds.length - missingDocs.length}/${docIds.length} documents found.`);
    return;
  }

  // 3. Upload each file once, then set it on every field that uses it.
  const assetIds = new Map<string, string>();
  for (const { file, doc, field, alt } of MEDIA_MAP) {
    if (missingDocs.includes(doc)) continue;

    if (!assetIds.has(file)) {
      const asset = await client.assets.upload("image", createReadStream(path.join(folder!, file)), { filename: file });
      assetIds.set(file, asset._id);
    }

    const value = { _type: "imageWithAlt", alt, asset: { _type: "reference", _ref: assetIds.get(file) } };
    const tx = client.transaction();
    for (const id of [doc, `drafts.${doc}`]) {
      if (existing.has(id)) tx.patch(id, (patch) => patch.set({ [field]: value }));
    }
    await tx.commit();
    console.log(`✔ ${file} → ${doc} › ${field}`);
  }

  console.log(`\nDone: ${assetIds.size} images uploaded. Check them in the Studio.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
