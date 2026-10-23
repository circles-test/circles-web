import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

/**
 * Figma: Card — Type = Space, Size = Large | Medium | Small.
 * Image with a title; on hover the access tag, address and description fade in.
 */
export type Space = {
  category: string;
  title: string;
  description?: string;
  /** e.g. "Members only", "Public" */
  access?: string;
  address?: string;
  comingSoon?: boolean;
  image?: string;
  href?: string;
  /** Extra details shown in the Location modal. */
  details?: SpaceDetails;
};

export type SpaceAmenity = "coliving" | "coworking";

export type SpaceDetails = {
  /** Modal text; the card description is used when empty. */
  about?: string;
  /** 1–5 */
  rating?: number;
  price?: { label: string; value: string };
  amenities?: SpaceAmenity[];
  /** e.g. "20 minutes from Gràcia by public transport." */
  directions?: string;
  mapImage?: string;
  /** "View location" — present only when the space has its own page. */
  page?: { label: string; href: string };
  /** Main button; defaults to the site's "Book a Stay". */
  cta?: { label: string; href: string };
};

const sizes = {
  large: "h-[388px] w-[316px] lg:h-[488px] lg:w-[540px]",
  medium: "h-[388px] w-[316px]",
  small: "h-[232px] w-[316px]",
};

export function SpaceCard({
  space,
  size = "medium",
  onSelect,
  className,
}: {
  space: Space;
  size?: keyof typeof sizes;
  /** Makes the whole card a button (e.g. to open the Location modal) instead of a link. */
  onSelect?: () => void;
  className?: string;
}) {
  const { category, title, description, access, address, comingSoon, image, href } = space;
  const body = (
    <>
      <p className="flex w-full gap-2 text-detail uppercase">
        <span className="whitespace-nowrap">{category}</span>
        {comingSoon && <span className="text-red">Coming soon</span>}
      </p>
      <div className={cn("relative flex flex-col justify-between overflow-hidden p-4 text-white", sizes[size])}>
        <Media
          src={image}
          alt={title}
          overlay
          sizes="(min-width: 1024px) 540px, 316px"
          imageClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="relative flex items-center gap-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {access && <Tag>{access}</Tag>}
          {address && <p className="flex-1 text-right text-detail">{address}</p>}
        </div>
        <div className="relative flex flex-col gap-2">
          <h3 className="font-display text-h2">{title}</h3>
          {description && (
            <p className="max-h-0 overflow-hidden text-body opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );

  const classes = cn("group flex shrink-0 flex-col items-start gap-2", className);
  if (onSelect) {
    // A button stretched over the card keeps the heading structure valid (no <h3> inside a <button>).
    return (
      <article className={cn(classes, "relative")}>
        {body}
        <button
          type="button"
          onClick={onSelect}
          aria-haspopup="dialog"
          aria-label={`${title} — more details`}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        />
      </article>
    );
  }
  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <article className={classes}>{body}</article>
  );
}
