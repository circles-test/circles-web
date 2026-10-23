"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { Link as NavLink } from "@/lib/content/types";

/** Figma (Mobile): "Menu" — full-screen list of large links below the header. */
export function MobileMenu({
  id,
  open,
  onNavigate,
  nav,
  login,
}: {
  id: string;
  open: boolean;
  onNavigate: () => void;
  nav: NavLink[];
  login: NavLink;
}) {
  // Lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div id={id} hidden={!open} className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto bg-background lg:hidden">
      <nav aria-label="Mobile" className="flex min-h-full flex-col gap-8 px-4 py-12">
        {nav.map((link) => (
          <Link key={link.href} href={link.href} onClick={onNavigate} className="font-display text-h2">
            {link.label}
          </Link>
        ))}
        <Button href={login.href} onClick={onNavigate} variant="secondary" className="mt-auto w-42 self-start">
          {login.label}
        </Button>
      </nav>
    </div>
  );
}
