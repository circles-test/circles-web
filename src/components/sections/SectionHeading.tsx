import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * Figma: "Title" — eyebrow + big title, with optional actions (arrows, switcher, "View all").
 * Mobile: centered H2. Desktop: left-aligned H1 with actions on the right.
 */
export function SectionHeading({
  eyebrow,
  title,
  actions,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4 px-4 py-12 text-center lg:items-start lg:px-6 lg:pb-6 lg:text-left", className)}>
      <Eyebrow className="pt-2">{eyebrow}</Eyebrow>
      <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-end lg:gap-2.5">
        <h2 className="font-display text-h2 text-balance lg:flex-1 lg:text-h1 lg:text-pretty">{title}</h2>
        {actions && <div className="flex items-center gap-4">{actions}</div>}
      </div>
    </div>
  );
}
