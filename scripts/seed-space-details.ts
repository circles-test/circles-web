/**
 * Fills the new Location-modal fields of the spaces already in Sanity with the
 * example values from src/content/home.ts (taken from Figma).
 * Only empty fields are filled: anything edited in the Studio is left as is.
 *
 *   npm run seed:space-details
 *   npm run seed:space-details -- --dry-run
 *
 * Needs SANITY_WRITE_TOKEN (Editor) in .env.local.
 */
import { createClient } from "@sanity/client";
import * as home from "../src/content/home";

const dryRun = process.argv.includes("--dry-run");
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

// Same ids as scripts/seed-sanity.ts
const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const link = (l?: { label: string; href: string }) => l && { _type: "link", label: l.label, href: l.href };

const updates = home.spaces
  .filter((s) => s.details)
  .map(({ title, details }) => {
    const fields = {
      about: details!.about,
      rating: details!.rating,
      price: details!.price,
      amenities: details!.amenities,
      directions: details!.directions,
      page: link(details!.page),
      cta: link(details!.cta),
    };
    // Drop empty values so setIfMissing doesn't create them.
    return { id: `space-${slugify(title)}`, fields: Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined)) };
  });

async function main() {
  if (dryRun) {
    for (const { id, fields } of updates) console.log(id, "←", Object.keys(fields).join(", "));
    console.log(`(dry run) ${updates.length} spaces would be updated (only empty fields)`);
    return;
  }

  const ids = updates.flatMap((u) => [u.id, `drafts.${u.id}`]);
  const existing = new Set(await client.fetch<string[]>(`*[_id in $ids]._id`, { ids }));

  const tx = client.transaction();
  for (const { id, fields } of updates) {
    const targets = [id, `drafts.${id}`].filter((t) => existing.has(t));
    if (!targets.length) {
      console.warn(`⚠ ${id} not found in Sanity, skipping`);
      continue;
    }
    for (const target of targets) tx.patch(target, (patch) => patch.setIfMissing(fields));
    console.log(`✔ ${id} ← ${Object.keys(fields).join(", ")}`);
  }
  await tx.commit();
  console.log("Done. Only empty fields were filled — check the “Location modal” tab of each Space in the Studio.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
