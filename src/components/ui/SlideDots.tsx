import { cn } from "@/lib/cn";

/** Figma: "Slide dot" — filled dot for the current slide, outlined for the rest. */
export function SlideDots({
  count,
  current,
  onSelect,
  className,
}: {
  count: number;
  current: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current}
          onClick={() => onSelect?.(i)}
          className={cn("size-2 rounded-full border border-white transition-colors", i === current && "bg-white")}
        />
      ))}
    </div>
  );
}
