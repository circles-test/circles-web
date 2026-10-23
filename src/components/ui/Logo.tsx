import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Circles wordmark (Figma layer "Subtract", 111×24).
 * TODO: replace the text with the exported SVG (e.g. /public/logo.svg).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Circles House — home" className={cn("inline-flex h-6 w-[111px] items-center", className)}>
      <span className="font-serif text-[30px] leading-none font-bold tracking-tight">circles</span>
    </Link>
  );
}
