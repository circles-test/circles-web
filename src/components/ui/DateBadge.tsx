import { cn } from "@/lib/cn";

/** Figma: "Date image" — month + day block on event cards. */
export function DateBadge({
  month,
  day,
  tone = "cream",
  className,
}: {
  month: string;
  day: string | number;
  tone?: "cream" | "red";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 flex-col items-center gap-1 rounded-[4px] px-4 py-2 whitespace-nowrap text-white",
        tone === "cream" ? "bg-cream" : "bg-red",
        className,
      )}
    >
      <span className="text-detail">{month}</span>
      <span className="text-cta">{day}</span>
    </span>
  );
}
