import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom text styles from globals.css so that
// `text-h2` is treated as a font size and doesn't clash with `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["h1", "h2", "h3", "body", "cta", "detail"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
