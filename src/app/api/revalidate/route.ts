import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { SANITY_CACHE_TAG } from "@/lib/content/adapters/sanity/client";

/**
 * Called by a Sanity webhook on publish so changes show up immediately
 * (otherwise cached content refreshes within an hour).
 * Webhook URL: https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || request.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(SANITY_CACHE_TAG);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
