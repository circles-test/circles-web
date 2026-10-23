import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

/** Figma: Card — Type = News, Size = Medium. */
export type NewsItem = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  href: string;
};

export function NewsCard({ item, className }: { item: NewsItem; className?: string }) {
  const { title, excerpt, category, date, image, href } = item;
  return (
    <Link href={href} className={cn("group flex w-full shrink-0 flex-col gap-2", className)}>
      <div className="relative h-[388px] w-full overflow-hidden p-4">
        <Media
          src={image}
          alt={title}
          sizes="(min-width: 1024px) 540px, 388px"
          imageClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <Tag className="relative">{category}</Tag>
      </div>
      <p className="px-4 pt-4 text-detail text-black/50">{date}</p>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-display text-h2">{title}</h3>
        <p className="line-clamp-2 text-body">{excerpt}</p>
      </div>
    </Link>
  );
}
