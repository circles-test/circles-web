"use client";

import { IconHomeCheck, IconHomeStats, IconMapPin, IconShield, IconStarFilled, IconX } from "@tabler/icons-react";
import { useEffect, useRef, type ReactNode } from "react";
import type { Space, SpaceAmenity } from "@/components/cards/SpaceCard";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconButton } from "@/components/ui/IconButton";
import { Media } from "@/components/ui/Media";

/**
 * Figma: "Location modal - with page" / "without page" (desktop 448×768, mobile full screen).
 * Mobile: full-screen sheet sliding up. Desktop: full-height panel sliding in from the right.
 * The second button ("View location") only shows when the space has its own page.
 */
const amenities: Record<SpaceAmenity, { label: string; icon: ReactNode }> = {
  coliving: { label: "Coliving", icon: <IconHomeCheck size={16} stroke={1.5} /> },
  coworking: { label: "Coworking", icon: <IconHomeStats size={16} stroke={1.5} /> },
};

function Feature({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-1 text-detail">
      {icon}
      {children}
    </li>
  );
}

export function LocationModal({
  space,
  open,
  onClose,
  defaultCta,
}: {
  space: Space | null;
  open: boolean;
  onClose: () => void;
  /** Used when the space has no button of its own (site's "Book a Stay"). */
  defaultCta: { label: string; href: string };
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start keyboard focus on the close button (React's autoFocus runs before the dialog opens).
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const details = space?.details ?? {};
  const cta = details.cta ?? defaultCta;
  const mapsHref = space?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(space.address)}`
    : undefined;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="location-modal-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-black backdrop:bg-black/40 lg:ml-auto lg:w-[448px] transition-transform duration-300 ease-out starting:translate-y-full lg:starting:translate-x-full lg:starting:translate-y-0"
    >
      {space && (
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="relative h-56 w-full shrink-0">
              <Media src={space.image} alt={space.title} sizes="(min-width: 1024px) 448px, 100vw" />
              <IconButton
                label="Close"
                onClick={onClose}
                icon={<IconX size={16} stroke={1.5} />}
                tone="light"
                shape="circle"
                slide="none"
                className="absolute top-4 right-4"
                data-autofocus
              />
            </div>

            <div className="flex flex-col gap-2.5 px-4 pt-6 pb-4">
              <div className="flex items-center gap-2">
                <Eyebrow className="flex-1">{space.category}</Eyebrow>
                {space.comingSoon && <span className="text-detail text-red uppercase">Coming soon</span>}
                {details.rating && (
                  <span className="flex items-center gap-1 text-detail" aria-label={`Rated ${details.rating} out of 5`}>
                    <IconStarFilled aria-hidden size={16} />
                    {details.rating}/5
                  </span>
                )}
              </div>
              <h2 id="location-modal-title" className="font-display text-h2">
                {space.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 px-4 pb-4">
              {(details.about ?? space.description) && <p className="text-body">{details.about ?? space.description}</p>}

              {details.price && (
                <div className="flex flex-col gap-1">
                  <p className="text-cta text-black/50">{details.price.label}</p>
                  <p className="font-display text-h3">{details.price.value}</p>
                </div>
              )}

              {(details.amenities?.length || space.access) && (
                <ul className="flex flex-wrap gap-4 pt-4" aria-label="Features">
                  {details.amenities?.map((key) => (
                    <Feature key={key} icon={amenities[key].icon}>
                      {amenities[key].label}
                    </Feature>
                  ))}
                  {space.access && <Feature icon={<IconShield size={16} stroke={1.5} />}>{space.access}</Feature>}
                </ul>
              )}

              {(space.address || details.mapImage) && (
                <div className="flex flex-col gap-4 pt-4">
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${space.address ?? space.title} in Google Maps`}
                    className="group relative block h-32 w-full overflow-hidden"
                  >
                    <Media src={details.mapImage} alt="" sizes="(min-width: 1024px) 416px, 100vw" />
                    {!details.mapImage && (
                      <IconMapPin aria-hidden size={24} stroke={1.5} className="absolute inset-0 m-auto text-black/50" />
                    )}
                  </a>
                  <div className="flex flex-col gap-1 pr-6 text-cta">
                    {space.address && <p>{space.address}</p>}
                    {details.directions && <p className="text-black/50">{details.directions}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 justify-center gap-2 border-t border-black/12 px-4 py-4">
            {details.page && (
              <Button href={details.page.href} variant="secondary">
                {details.page.label}
              </Button>
            )}
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
