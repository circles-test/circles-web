import type { ReactNode } from "react";

/** Figma: "Promotion banner" — red strip above the header. */
export function PromotionBanner({ children }: { children: ReactNode }) {
  return (
    <div className="bg-red px-4 py-2 text-center text-detail font-light lg:px-6">
      <p>{children}</p>
    </div>
  );
}
