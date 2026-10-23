"use client";

import { IconArrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useRef, type ReactNode } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

/**
 * Section with a heading and a horizontally scrolling row of cards
 * (Locations, Happening Now, News, Testimonials).
 * Native swipe on touch; on desktop the dark arrows in the heading scroll the row.
 */
export function Carousel({
  eyebrow,
  title,
  actions,
  footer,
  arrows = true,
  className,
  trackClassName,
  children,
}: {
  eyebrow?: string;
  title?: ReactNode;
  /** Extra controls next to the arrows (e.g. a SegmentedControl). */
  actions?: ReactNode;
  /** Rendered below the row (e.g. a "View all" button). */
  footer?: ReactNode;
  arrows?: boolean;
  className?: string;
  trackClassName?: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrowButtons = arrows && (
    <div className="hidden gap-4 lg:flex">
      <IconButton label="Previous" onClick={() => scroll(-1)} icon={<IconArrowLeft size={16} stroke={1.5} />} slide="left" />
      <IconButton label="Next" onClick={() => scroll(1)} icon={<IconArrowNarrowRight size={16} stroke={1.5} />} />
    </div>
  );

  return (
    <section className={className}>
      {eyebrow && title && (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          actions={
            (actions || arrowButtons) && (
              <>
                {actions}
                {arrowButtons}
              </>
            )
          }
        />
      )}
      <div
        ref={trackRef}
        className={cn(
          "scrollbar-none flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 lg:scroll-px-6 lg:gap-12 lg:px-6",
          "*:snap-start",
          trackClassName,
        )}
      >
        {children}
      </div>
      {footer && <div className="flex justify-center px-4 pt-12 pb-32 lg:px-6 lg:pt-0 lg:pb-12">{footer}</div>}
    </section>
  );
}
