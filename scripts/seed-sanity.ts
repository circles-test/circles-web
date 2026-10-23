/**
 * Loads the content from src/content into Sanity (first-time setup).
 *
 *   npm run seed            # refuses to run if the Home page already exists
 *   npm run seed -- --force # overwrites the seeded documents
 *   npm run seed -- --dry-run # prints the documents without writing anything
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * SANITY_WRITE_TOKEN (Editor) in .env.local. Images are not uploaded.
 *
 * IDs use "-" on purpose: in Sanity an id with a dot ("location.barcelona") is a
 * *private path*, invisible to the site's public (token-less) queries.
 */
import { randomUUID } from "node:crypto";
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";
import * as home from "../src/content/home";
import * as navigation from "../src/content/navigation";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || (!token && !process.argv.includes("--dry-run"))) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-10-01",
  token,
  useCdn: false,
  // Since API 2025-02-19 queries default to the "published" perspective and hide drafts.
  // The seed must see drafts (to discard them), so it reads the raw dataset.
  perspective: "raw",
});

const key = () => randomUUID().slice(0, 12);
const ref = (id: string) => ({ _type: "reference", _ref: id, _key: key() });
const link = (l: { label: string; href: string }) => ({ _type: "link", _key: key(), label: l.label, href: l.href });
const slug = (value: string) => ({ _type: "slug", current: value });
const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// --- Locations -----------------------------------------------------------------

const locationMeta: Record<string, { city: string; timeZone: string; comingSoon?: boolean }> = {
  barcelona: { city: "Barcelona", timeZone: "Europe/Madrid" },
  andorra: { city: "Andorra", timeZone: "Europe/Andorra", comingSoon: true },
};

const locations = home.locations.map((l) => {
  const s = l.href.split("/").pop()!;
  return { _id: `location-${s}`, _type: "location", name: l.name, slug: slug(s), address: l.address, ...locationMeta[s] };
});

const locationIdForAddress = (address?: string) =>
  locations.find((l) => address && l.address.split(",")[0] === address.split(",")[0])?._id;

// --- Spaces --------------------------------------------------------------------

/** Location-modal fields as stored in Sanity (images are not uploaded). */
function spaceDetails(details: (typeof home.spaces)[number]["details"]) {
  if (!details) return {};
  return {
    about: details.about,
    rating: details.rating,
    price: details.price,
    amenities: details.amenities,
    directions: details.directions,
    page: details.page && link(details.page),
    cta: details.cta && link(details.cta),
  };
}

const spaces = home.spaces.map((s) => {
  const locationId = locationIdForAddress(s.address);
  return {
    _id: `space-${slugify(s.title)}`,
    _type: "space",
    title: s.title,
    category: s.category,
    description: s.description,
    access: s.access,
    comingSoon: s.comingSoon,
    ...(locationId && { location: { _type: "reference", _ref: locationId } }),
    ...spaceDetails(s.details),
  };
});

// --- Events (dates moved into the coming weeks so they show as upcoming) -------

const inDays = (days: number, hourUtc: number, minute = 0) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  d.setUTCHours(hourUtc, minute, 0, 0);
  return d.toISOString();
};

const events = home.happeningNow.events.map((e, i) => ({
  _id: `event-${slugify(e.title)}`,
  _type: "event",
  title: e.title,
  slug: slug(slugify(e.title)),
  location: { _type: "reference", _ref: `location-${e.city.toLowerCase()}` },
  startsAt: inDays(7 + i * 3, 19),
  endsAt: inDays(7 + i * 3, 21, 30),
  access: e.access,
  description: e.description,
}));

// --- News & testimonials -------------------------------------------------------

const newsPosts = home.news.items.map((n) => {
  const s = n.href.split("/").pop()!;
  return {
    _id: `newsPost-${s}`,
    _type: "newsPost",
    title: n.title,
    slug: slug(s),
    publishedAt: new Date(n.date).toISOString(),
    category: n.category,
    excerpt: n.excerpt,
  };
});

const testimonials = home.testimonials.map((t) => ({
  _id: `testimonial-${slugify(t.author)}`,
  _type: "testimonial",
  quote: t.quote,
  author: t.author,
  source: t.source,
}));

// --- Singletons ----------------------------------------------------------------

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  promotion: navigation.promotion,
  mainNav: navigation.mainNav.map(link),
  login: link(navigation.headerActions.login),
  book: link(navigation.headerActions.book),
  footer: {
    main: navigation.footerNav.main.map(link),
    extras: navigation.footerNav.extras.map(link),
    legal: navigation.footerNav.legal.map(link),
  },
  contact: navigation.contact,
  // URLs are placeholders ("#") in the local content — fill them in the Studio.
  socials: [],
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  hero: { title: home.hero.title, description: home.hero.description, videoLabel: home.hero.video.label },
  slider: locations.map((l) => ref(l._id)),
  network: {
    ...home.network,
    spaces: home.spaces.map((s, i) => ({
      _type: "spaceCard",
      _key: key(),
      size: s.size,
      space: { _type: "reference", _ref: spaces[i]._id },
    })),
  },
  happeningNow: {
    eyebrow: home.happeningNow.eyebrow,
    title: home.happeningNow.title,
    viewAll: link(home.happeningNow.viewAll),
  },
  memberships: { ...home.memberships, cta: link(home.memberships.cta) },
  introduction: { ...home.introduction, cta: link(home.introduction.cta) },
  testimonials: testimonials.map((t) => ref(t._id)),
  news: { eyebrow: home.news.eyebrow, title: home.news.title },
  newsletter: home.newsletter,
};

// --- Write ---------------------------------------------------------------------

const SEEDED_TYPES = ["location", "space", "event", "newsPost", "testimonial"];

async function main() {
  const docs: IdentifiedSanityDocumentStub[] = [...locations, ...spaces, ...events, ...newsPosts, ...testimonials, siteSettings, homePage];

  if (process.argv.includes("--dry-run")) {
    console.log(JSON.stringify(docs, null, 2));
    console.log(`(dry run) ${docs.length} documents would be written`);
    return;
  }

  const exists = await client.fetch<boolean>(`defined(*[_id == "homePage"][0]._id)`);
  if (exists && !process.argv.includes("--force")) {
    console.error("The Home page already exists in Sanity. Re-run with --force to overwrite the seeded documents.");
    process.exit(1);
  }

  // Unpublished drafts of the seeded documents would keep old content (and old references): discard them.
  const drafts = await client.fetch<string[]>(`*[_id in $ids]._id`, { ids: docs.map((d) => `drafts.${d._id}`) });

  // Earlier versions of this script used dotted (private) ids — remove them and their drafts.
  const legacyIds = await client.fetch<string[]>(
    `*[${SEEDED_TYPES.flatMap((t) => [`_id in path("${t}.*")`, `_id in path("drafts.${t}.*")`]).join(" || ")}]._id`,
  );

  // Anything else still pointing at a legacy document would block its deletion: stop and say what.
  if (legacyIds.length) {
    const blocking = await client.fetch<{ _id: string; _type: string }[]>(
      `*[references($legacyIds) && !(_id in $handled)]{ _id, _type }`,
      { legacyIds, handled: [...legacyIds, ...drafts, ...docs.map((d) => d._id)] },
    );
    if (blocking.length) {
      console.error("These documents reference the old seeded content. Point them to the new documents (or delete them) in the Studio, then run again:");
      for (const doc of blocking) console.error(`  - ${doc._type}: ${doc._id}`);
      process.exit(1);
    }
  }

  if (drafts.length) console.log(`  Discarding unpublished drafts: ${drafts.join(", ")}`);

  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  for (const id of drafts) tx.delete(id);
  for (const id of legacyIds) tx.delete(id);
  await tx.commit();

  if (legacyIds.length) console.log(`✔ Removed ${legacyIds.length} documents with legacy private ids`);

  console.log(`✔ Seeded ${docs.length} documents into ${projectId}/${client.config().dataset}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
