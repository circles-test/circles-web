"use client";

import { IconArrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { FeaturedLocationCard, type Location } from "@/components/cards/FeaturedLocationCard";
import { IconButton } from "@/components/ui/IconButton";
import { Media } from "@/components/ui/Media";
import { SlideDots } from "@/components/ui/SlideDots";
import { cn } from "@/lib/cn";

/**
 * Figma: "Slider" — full-bleed slides (cross-fade), each featuring a location card,
 * with dots and glass arrows. Full screen on mobile, 768px tall on desktop.
 */
export function HeroSlider({ slides, eyebrow }: { slides: Location[]; eyebrow?: string }) {
  const [current, setCurrent] = useState(0);
  const count = slides.length;
  const go = (index: number) => setCurrent((index + count) % count);
  const slide = slides[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our locations"
      className="relative isolate flex h-[100svh] max-h-[956px] min-h-[600px] flex-col justify-end overflow-hidden p-4 lg:h-[768px] lg:min-h-0 lg:flex-row lg:items-end lg:p-6"
    >
      {slides.map((s, i) => (
        <div
          key={s.href}
          aria-hidden={i !== current}
          className={cn("absolute inset-0 -z-10 transition-opacity duration-700", i === current ? "opacity-100" : "opacity-0")}
        >
          <Media src={s.image} alt={s.name} overlay priority={i === 0} />
        </div>
      ))}

      <div className="flex w-full flex-col items-end gap-12 lg:ml-auto lg:w-[429px]">
        <FeaturedLocationCard location={slide} eyebrow={eyebrow} />
        <div className="flex w-full items-center justify-end gap-2">
          <SlideDots count={count} current={current} onSelect={go} className="flex-1" />
          <IconButton label="Previous slide" onClick={() => go(current - 1)} icon={<IconArrowLeft size={16} stroke={1.5} />} tone="glass" slide="left" />
          <IconButton label="Next slide" onClick={() => go(current + 1)} icon={<IconArrowNarrowRight size={16} stroke={1.5} />} tone="glass" />
        </div>
      </div>
    </section>
  );
}
