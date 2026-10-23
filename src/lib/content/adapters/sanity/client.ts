import { createClient, type QueryParams, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-10-01",
};

// Created lazily: importing this module must not fail when Sanity isn't configured
// (CONTENT_SOURCE=local).
let client: SanityClient | undefined;
let builder: ImageUrlBuilder | undefined;

function getClient() {
  // useCdn: false — Sanity's CDN can serve a stale copy for a few seconds after a publish, which
  // would undo the webhook refresh. Next.js' own cache (below) already keeps traffic to Sanity low.
  client ??= createClient({ ...sanityConfig, useCdn: false, perspective: "published" });
  return client;
}

/** Every Sanity request is tagged so a publish webhook can refresh them all (see app/api/revalidate). */
export const SANITY_CACHE_TAG = "sanity";

/**
 * - `npm run dev`: no cache — every reload reads what is published in Sanity right now.
 * - Production (Vercel): cached; the publish webhook (/api/revalidate) clears it instantly,
 *   and it refreshes on its own after an hour as a fallback.
 */
const cacheOptions =
  process.env.NODE_ENV === "development"
    ? ({ cache: "no-store" } as const)
    : { next: { revalidate: 3600, tags: [SANITY_CACHE_TAG] } };

export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return getClient().fetch<T>(query, params, cacheOptions);
}

export type SanityImage = { asset?: { _ref: string }; alt?: string } | null | undefined;

/** Sanity image → plain URL (format/size negotiated by Sanity's CDN). */
export function imageUrl(image: SanityImage, width = 2000): string | undefined {
  if (!image?.asset) return undefined;
  builder ??= createImageUrlBuilder(sanityConfig);
  return builder.image(image).width(width).fit("max").auto("format").url();
}
