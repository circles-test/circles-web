import { Button } from "@/components/ui/Button";
import { DateBadge } from "@/components/ui/DateBadge";
import { Media } from "@/components/ui/Media";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

/** Figma: Card — Type = Event, Size = Medium. */
export type CircleEvent = {
  title: string;
  description: string;
  /** e.g. "Members only", "Public" */
  access: string;
  month: string;
  day: string | number;
  dateLabel: string;
  timeLabel: string;
  image?: string;
  cta?: { label: string; href: string };
};

export function EventCard({ event, className }: { event: CircleEvent; className?: string }) {
  const { title, description, access, month, day, dateLabel, timeLabel, image, cta } = event;
  return (
    <article
      className={cn("group relative flex h-[688px] w-full max-w-[539px] shrink-0 flex-col gap-2 overflow-hidden p-4 lg:p-8", className)}
    >
      <Media src={image} alt={title} sizes="(min-width: 1024px) 539px, 388px" />
      <div className="relative flex-1 pb-6">
        <Tag>{access}</Tag>
      </div>
      <div className="relative flex w-full flex-col gap-2 bg-white p-6">
        <div className="flex items-center gap-2.5">
          <DateBadge month={month} day={day} />
          <div className="flex flex-col gap-1">
            <p className="text-cta">{dateLabel}</p>
            <p className="text-detail text-black/50">{timeLabel}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-6">
          <h3 className="font-display text-h2">{title}</h3>
          <p className="line-clamp-5 text-body text-black/50">{description}</p>
        </div>
        <Button href={cta?.href ?? "#"} className="self-start">
          {cta?.label ?? "Join Now"}
        </Button>
      </div>
    </article>
  );
}
