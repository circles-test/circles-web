"use client";

import { useState, type ReactNode } from "react";
import { SpaceCard, type Space } from "@/components/cards/SpaceCard";
import { LocationModal } from "@/components/modals/LocationModal";
import { Carousel } from "./Carousel";

/**
 * "A more meaningful way to live, work, and connect." — clicking a card opens
 * the Location modal with that space's details.
 */
export function SpacesCarousel({
  eyebrow,
  title,
  spaces,
  defaultCta,
}: {
  eyebrow: string;
  title: ReactNode;
  spaces: (Space & { size: "large" | "medium" | "small" })[];
  defaultCta: { label: string; href: string };
}) {
  const [selected, setSelected] = useState<Space | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Carousel eyebrow={eyebrow} title={title} className="pt-20 lg:pt-32" trackClassName="items-center py-12">
        {spaces.map(({ size, ...space }) => (
          <SpaceCard
            key={space.title}
            space={space}
            size={size}
            onSelect={() => {
              setSelected(space);
              setOpen(true);
            }}
          />
        ))}
      </Carousel>
      <LocationModal space={selected} open={open} onClose={() => setOpen(false)} defaultCta={defaultCta} />
    </>
  );
}
