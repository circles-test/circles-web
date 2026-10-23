import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Figma: "Tag" — translucent label laid over imagery (e.g. "Members only", "Announcement"). */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-[4px] bg-black/40 px-4 py-2 text-detail whitespace-nowrap text-white backdrop-blur-[6px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
