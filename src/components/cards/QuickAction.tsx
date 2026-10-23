import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

/**
 * Figma: Quick Action — Color = Cream | Black | White.
 * Thumbnail + label + title, used in the header dropdown panel and menus.
 */
const tones = {
  red: "bg-red text-black",
  cream: "bg-cream text-black",
  black: "bg-black text-white",
  white: "bg-background text-black",
};

export type QuickActionItem = {
  label: string;
  title: string;
  href: string;
  image?: string;
};

export function QuickAction({
  item,
  tone = "cream",
  className,
}: {
  item: QuickActionItem;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <Link href={item.href} className={cn("group flex items-center gap-2 px-6 py-4", tones[tone], className)}>
      <div className="relative h-20 w-37 shrink-0 overflow-hidden">
        <Media src={item.image} alt="" sizes="148px" imageClassName="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-detail">{item.label}</p>
        <p className="font-display text-h3">{item.title}</p>
      </div>
    </Link>
  );
}
