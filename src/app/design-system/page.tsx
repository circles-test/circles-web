import { IconArrowLeft, IconArrowNarrowRight, IconArrowUpRight, IconChevronDown, IconSearch, IconX } from "@tabler/icons-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EventCard } from "@/components/cards/EventCard";
import { FeaturedLocationCard } from "@/components/cards/FeaturedLocationCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { QuickAction } from "@/components/cards/QuickAction";
import { SpaceCard } from "@/components/cards/SpaceCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { DateBadge } from "@/components/ui/DateBadge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Tag } from "@/components/ui/Tag";
// Fixed sample data on purpose: this page shows components, not live content.
import { happeningNow, locations, news, spaces, testimonials } from "@/content/home";
import { SegmentedControlDemo } from "./SegmentedControlDemo";

export const metadata: Metadata = { title: "Design system — Circles House", robots: { index: false } };

function Block({ title, children, dark }: { title: string; children: ReactNode; dark?: boolean }) {
  return (
    <section className="flex flex-col gap-4 border-t border-black/12 px-4 py-12 lg:px-6">
      <Eyebrow className="text-black/50">{title}</Eyebrow>
      <div className={dark ? "flex flex-wrap items-center gap-4 bg-black/40 p-4" : "flex flex-wrap items-start gap-4"}>{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  const [event] = happeningNow.events;
  return (
    <>
      <div className="px-4 py-12 lg:px-6">
        <h1 className="font-display text-h2 lg:text-h1">Design system</h1>
      </div>

      <Block title="Typography">
        <div className="flex flex-col gap-4">
          <p className="font-display text-h1">H1 — Clash Display 64/68</p>
          <p className="font-display text-h2">H2 — Clash Display 34</p>
          <p className="font-display text-h3">H3 — Clash Display 18</p>
          <p className="text-body">Body — PP Fragment Sans 14/20</p>
          <p className="text-cta">CTA — PP Fragment Sans 14</p>
          <p className="text-detail">Detail — PP Fragment Sans 12</p>
          <p className="text-detail font-light">Detail light — PP Fragment Sans Light 12</p>
        </div>
      </Block>

      <Block title="Colors">
        {[
          ["black", "bg-black"],
          ["white", "bg-white border border-black/12"],
          ["background", "bg-background border border-black/12"],
          ["red", "bg-red"],
          ["cream", "bg-cream"],
          ["dark 8%", "bg-black/8"],
          ["dark 12%", "bg-black/12"],
          ["black 50%", "bg-black/50"],
        ].map(([name, cls]) => (
          <div key={name} className="flex flex-col gap-2">
            <div className={`size-16 ${cls}`} />
            <p className="text-detail">{name}</p>
          </div>
        ))}
      </Block>

      <Block title="Button">
        <Button>Book a Stay</Button>
        <Button variant="secondary">Members Login</Button>
        <Button variant="simple">Coliving</Button>
        <Button variant="large">Happening Now</Button>
      </Block>

      <Block title="Icon buttons — dark / muted / search">
        <IconButton label="Previous" icon={<IconArrowLeft size={16} stroke={1.5} />} slide="left" />
        <IconButton label="Next" icon={<IconArrowNarrowRight size={16} stroke={1.5} />} />
        <IconButton label="Open" icon={<IconArrowUpRight size={16} stroke={1.5} />} shape="action" slide="up-right" />
        <IconButton label="Dropdown" icon={<IconChevronDown size={16} stroke={1.5} />} tone="muted" shape="circle" slide="down" />
        <IconButton label="Close" icon={<IconX size={16} stroke={1.5} />} tone="muted" shape="circle" slide="none" />
        <IconButton label="Search" icon={<IconSearch size={16} stroke={1.5} />} shape="search" slide="none" />
      </Block>

      <Block title="Icon buttons — glass / light" dark>
        <IconButton label="Previous" icon={<IconArrowLeft size={16} stroke={1.5} />} tone="glass" slide="left" />
        <IconButton label="Next" icon={<IconArrowNarrowRight size={16} stroke={1.5} />} tone="glass" />
        <IconButton label="Next" icon={<IconArrowNarrowRight size={16} stroke={1.5} />} tone="light" />
      </Block>

      <Block title="Field / Switcher / Tag / Date">
        <Field label="Location" placeholder="Anywhere" className="w-[270px]" />
        <Field label="Location" value="Barcelona" className="w-[270px]" />
        <SegmentedControlDemo />
        <Tag className="bg-black/60">Members only</Tag>
        <DateBadge month="Aug" day={18} />
        <DateBadge month="Aug" day={18} tone="red" />
      </Block>

      <Block title="Card — Space (small / medium / large)">
        <SpaceCard space={spaces[0]} size="small" />
        <SpaceCard space={spaces[2]} size="medium" />
        <SpaceCard space={{ ...spaces[1], comingSoon: true }} size="large" />
      </Block>

      <Block title="Card — Event / News">
        <EventCard event={event} className="w-[388px]" />
        <NewsCard item={news.items[0]} className="w-[388px]" />
      </Block>

      <Block title="Testimonial / Featured location / Quick action">
        <TestimonialCard testimonial={testimonials[0]} className="w-[337px]" />
        <div className="w-[429px] max-w-full bg-black/40 p-4">
          <FeaturedLocationCard location={locations[0]} />
        </div>
        <div className="flex w-full flex-col lg:flex-row">
          <QuickAction tone="red" item={{ label: "Featured location", title: "Barcelona, Spain", href: "#" }} className="flex-1" />
          <QuickAction tone="black" item={{ label: "Featured location", title: "Andorra, Andorra (Coming soon)", href: "#" }} className="flex-1" />
          <QuickAction tone="white" item={{ label: "Latest News", title: "Movie Night @ Circles House", href: "#" }} className="flex-1" />
        </div>
      </Block>
    </>
  );
}
