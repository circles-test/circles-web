"use client";

import { useState } from "react";
import { EventCard, type CircleEvent } from "@/components/cards/EventCard";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Carousel } from "./Carousel";

/** Figma: "Happening now" — events carousel filtered by city. */
export function HappeningNow({
  eyebrow,
  title,
  events,
  cities,
  viewAll,
}: {
  eyebrow: string;
  title: string;
  events: (CircleEvent & { city: string })[];
  cities: string[];
  viewAll: { label: string; href: string };
}) {
  const [city, setCity] = useState("all");
  const options = [{ value: "all", label: "All" }, ...cities.map((c) => ({ value: c, label: c }))];
  const visible = city === "all" ? events : events.filter((event) => event.city === city);

  return (
    <Carousel
      eyebrow={eyebrow}
      title={title}
      arrows={false}
      actions={
        <>
          <SegmentedControl label="Filter by city" options={options} value={city} onChange={setCity} />
          {/* Desktop: "View all" sits in the heading; mobile: below the cards. */}
          <Button href={viewAll.href} variant="secondary" className="hidden lg:inline-flex">
            {viewAll.label}
          </Button>
        </>
      }
      footer={
        <Button href={viewAll.href} variant="secondary" className="lg:hidden">
          {viewAll.label}
        </Button>
      }
      trackClassName="lg:gap-4"
    >
      {visible.map((event) => (
        <EventCard key={event.title} event={event} className="w-[388px] max-w-[calc(100vw-52px)] lg:w-[539px]" />
      ))}
    </Carousel>
  );
}
