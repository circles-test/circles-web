"use client";

import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Logo } from "@/components/ui/Logo";
import type { Link } from "@/lib/content/types";
import { MobileMenu } from "./MobileMenu";

/**
 * Figma: Header.
 * Mobile: menu button + logo + "Book a Stay".
 * Desktop (lg+): dropdown button + logo + navigation + "Members Login" + "Book a Stay".
 */
export function Header({ nav, login, book }: { nav: Link[]; login: Link; book: Link }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="flex h-18 items-center gap-4 border-b border-black/12 p-4 lg:px-6">
        <div className="flex flex-1 items-center gap-4 lg:flex-none">
          <IconButton
            label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            icon={menuOpen ? <IconX size={16} stroke={1.5} /> : <IconMenu2 size={16} stroke={1.5} />}
            tone="muted"
            shape="circle"
            slide="none"
            className="size-10 lg:hidden"
          />
          {/* Desktop: opens the quick-actions panel (Figma "Details"). */}
          <IconButton
            label="Explore Circles"
            icon={<IconChevronDown size={16} stroke={1.5} />}
            tone="muted"
            shape="circle"
            slide="down"
            className="hidden lg:inline-flex"
          />
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden h-full flex-1 items-center gap-4 px-12 lg:flex">
          {nav.map((link) => (
            <Button key={link.href} href={link.href} variant="simple">
              {link.label}
            </Button>
          ))}
        </nav>

        <Button href={login.href} variant="secondary" className="hidden w-42 lg:inline-flex">
          {login.label}
        </Button>
        <Button href={book.href}>{book.label}</Button>
      </div>

      <MobileMenu id="mobile-menu" open={menuOpen} onNavigate={() => setMenuOpen(false)} nav={nav} login={login} />
    </header>
  );
}
