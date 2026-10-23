import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label above titles ("THE CIRCLES HOUSE NETWORK", "JOIN US"…). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-detail uppercase", className)}>{children}</p>;
}
