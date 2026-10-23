/**
 * Offline check of the Sanity adapter: runs the real GROQ queries (with groq-js)
 * against the seed documents and compares the result with the local adapter.
 *
 *   npx tsx scripts/test-sanity-adapter.ts
 */
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { evaluate, parse } from "groq-js";
import { localAdapter } from "../src/lib/content/adapters/local";
import { createSanityAdapter } from "../src/lib/content/adapters/sanity";
import { MEDIA_MAP } from "./media-map";

const output = execFileSync("npx", ["tsx", "scripts/seed-sanity.ts", "--dry-run"], {
  encoding: "utf8",
  env: { ...process.env, NEXT_PUBLIC_SANITY_PROJECT_ID: "test" },
});
const dataset = JSON.parse(output.slice(0, output.lastIndexOf("]") + 1));

// Seeded ids must be public: in Sanity an id containing a dot is a private path.
const privateIds = dataset.map((d: { _id: string }) => d._id).filter((id: string) => id.includes("."));
assert.deepEqual(privateIds, [], "seed must not create dotted (private) ids");

// A reference to a missing/unpublished document resolves to null — the adapter must skip it.
const homeDoc = dataset.find((d: { _id: string }) => d._id === "homePage");
homeDoc.slider.push({ _type: "reference", _ref: "location-missing", _key: "dangling" });
homeDoc.testimonials.push({ _type: "reference", _ref: "testimonial-missing", _key: "dangling" });

// Every image assignment must target a seeded document; attach fake assets to check the mapping.
for (const { file, doc, field } of MEDIA_MAP) {
  const target = dataset.find((d: { _id: string }) => d._id === doc);
  assert.ok(target, `media-map: document "${doc}" (for ${file}) is not created by the seed`);
  const parts = field.split(".");
  const parent = parts.slice(0, -1).reduce((obj: Record<string, unknown>, key: string) => obj[key] as Record<string, unknown>, target);
  assert.ok(parent, `media-map: "${doc}" has no "${parts.slice(0, -1).join(".")}"`);
  parent[parts.at(-1)!] = { _type: "imageWithAlt", asset: { _type: "reference", _ref: `image-${file.replace(/\W/g, "")}-1200x800-png` } };
}

const adapter = createSanityAdapter(async <T>(query: string) => {
  const result = await evaluate(parse(query), { dataset });
  return (await result.get()) as T;
});

async function main() {
  const [sanityHome, localHome, sanitySettings, localSettings] = await Promise.all([
    adapter.getHomePage(),
    localAdapter.getHomePage(),
    adapter.getSiteSettings(),
    localAdapter.getSiteSettings(),
  ]);

  // Same copy and structure as the local content.
  assert.equal(sanityHome.hero.title, localHome.hero.title);
  assert.deepEqual(sanityHome.slider.map((l) => l.name), localHome.slider.map((l) => l.name));
  assert.deepEqual(
    sanityHome.network.spaces.map((s) => [s.title, s.size, s.address]),
    localHome.network.spaces.map((s) => [s.title, s.size, s.address]),
  );
  assert.deepEqual(sanityHome.happeningNow.events.map((e) => e.title), localHome.happeningNow.events.map((e) => e.title));
  assert.deepEqual(sanityHome.happeningNow.cities, ["Barcelona", "Andorra"]);
  assert.deepEqual(sanityHome.testimonials.map((t) => t.author), localHome.testimonials.map((t) => t.author));
  assert.deepEqual(sanityHome.news.items.map((n) => n.href), localHome.news.items.map((n) => n.href));
  assert.equal(sanityHome.news.items[0].date, "Aug 21, 2025");
  assert.equal(sanityHome.memberships.cta.label, "Apply");
  assert.deepEqual(sanitySettings.mainNav, localSettings.mainNav);
  assert.deepEqual(sanitySettings.footer.legal, localSettings.footer.legal);
  assert.equal(sanitySettings.contact.phone, localSettings.contact.phone);

  // Location-modal fields reach the site exactly like the local content.
  const pick = (d?: object) => JSON.parse(JSON.stringify(d ?? {}, (k, v) => (k === "mapImage" || k === "_type" || k === "_key" ? undefined : v)));
  assert.deepEqual(
    sanityHome.network.spaces.map((s) => pick(s.details)),
    localHome.network.spaces.map((s) => pick(s.details)),
  );

  // Images from media-map reach every slot of the Home.
  const cdn = /^https:\/\/cdn\.sanity\.io\/images\//;
  assert.ok(sanityHome.slider.every((l) => cdn.test(l.image ?? "")), "slider images");
  assert.ok(sanityHome.network.spaces.every((s) => cdn.test(s.image ?? "")), "space images");
  assert.ok(sanityHome.happeningNow.events.every((e) => cdn.test(e.image ?? "")), "event images");
  assert.ok(sanityHome.news.items.every((n) => cdn.test(n.image ?? "")), "news images");
  assert.match(sanityHome.memberships.image ?? "", cdn, "memberships background");
  assert.match(sanitySettings.footer.image ?? "", cdn, "footer image");

  // Event dates are formatted in the location's time zone.
  const [first] = sanityHome.happeningNow.events;
  assert.match(first.timeLabel, /^\d{1,2}:\d{2} [AP]M - \d{1,2}:\d{2} [AP]M GMT[+-]\d+$/);
  assert.match(first.dateLabel, /^[A-Z][a-z]+day, [A-Z][a-z]+ \d{1,2}$/);

  console.log("✔ Sanity adapter matches the local content");
  console.log(`✔ ${MEDIA_MAP.length} image assignments reach the Home (e.g. ${sanityHome.slider[0].image})`);
  console.log("  first event:", first.month, first.day, "·", first.dateLabel, "·", first.timeLabel);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
