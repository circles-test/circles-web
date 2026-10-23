"use client";

import { cn } from "@/lib/cn";

/** Figma: "Switcher" — e.g. All / Barcelona / Andorra on Happening Now. */
type SegmentedControlProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, label, className }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex items-center rounded-lg bg-black/8 p-0.5", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-22 rounded-lg p-2 text-detail whitespace-nowrap transition-colors",
              active ? "bg-black text-white" : "text-black/50 hover:text-black",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
