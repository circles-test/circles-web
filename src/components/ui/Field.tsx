import { IconChevronDown } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Field — Ussage = Search, Type = Dropdown | Date first | Date second.
 * A trigger that shows a label and the current value; it opens a picker
 * (dropdown / calendar) that the parent wires through `onClick`.
 * Without a value the label is shown in black and the placeholder in 50% black;
 * with a value the colors swap (Input = Yes).
 */
type FieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  /** Show the chevron (dropdown fields). */
  chevron?: boolean;
  /** Rounded corners off when the field is part of a joined group (date range). */
  joined?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | "value">;

export function Field({ label, value, placeholder, chevron = true, joined = false, className, type = "button", ...props }: FieldProps) {
  const hasValue = Boolean(value);
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "flex h-[58px] min-w-0 flex-col items-start justify-center gap-0.5 bg-black/8 px-4 py-2 text-left text-body transition-colors hover:bg-black/12",
        !joined && "rounded-lg",
        className,
      )}
    >
      <span className={cn("w-full truncate", hasValue ? "text-black/50" : "text-black")}>{label}</span>
      <span className="flex w-full items-center gap-2.5">
        <span className={cn("min-w-0 flex-1 truncate", hasValue ? "text-black" : "text-black/50")}>
          {value ?? placeholder}
        </span>
        {chevron && <IconChevronDown aria-hidden size={16} stroke={1.5} className="shrink-0" />}
      </span>
    </button>
  );
}
