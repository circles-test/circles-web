import "server-only";
import { cache } from "react";
import { localAdapter } from "./adapters/local";
import { sanityAdapter } from "./adapters/sanity";
import type { ContentAdapter } from "./types";

export type * from "./types";

/**
 * Content source, chosen with CONTENT_SOURCE ("local" | "sanity").
 * Defaults to Sanity when a project id is configured, local files otherwise.
 */
const source = process.env.CONTENT_SOURCE ?? (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "sanity" : "local");

const adapter: ContentAdapter = source === "sanity" ? sanityAdapter : localAdapter;

// `cache` dedupes calls within a request (layout + page asking for the same data).
export const getSiteSettings = cache(() => adapter.getSiteSettings());
export const getHomePage = cache(() => adapter.getHomePage());
