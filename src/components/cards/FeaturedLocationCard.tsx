import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { iconButtonClasses, SlidingIcon } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

/** Figma: Slider › Card — "OUR LOCATIONS" card laid over the hero slider. */
export type Location = {
  name: string;
  address: string;
  href: string;
  image?: string;
};

export function FeaturedLocationCard({
  location,
  eyebrow = "Our locations",
  className,
}: {
  location: Location;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <Link
      href={location.href}
      className={cn("group flex h-[238px] w-full flex-col gap-2 bg-background p-6 lg:bg-white", className)}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="flex flex-1 items-end gap-2 pt-[68px]">
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-display text-h2">{location.name}</p>
          <p className="text-detail">{location.address}</p>
        </div>
        <span aria-hidden className={iconButtonClasses({ shape: "action" })}>
          <SlidingIcon icon={<IconArrowUpRight size={16} stroke={1.5} />} slide="up-right" />
        </span>
      </div>
    </Link>
  );
}
