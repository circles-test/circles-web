import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { VideoTeaser } from "@/components/ui/VideoTeaser";
import { SearchBar } from "./SearchBar";

/**
 * Figma: "Above the fold › Intro" (desktop) / "Main text" (mobile).
 * Mobile order: title · video · copy · search.
 * Desktop: title, copy and search on the left; video in a 317px column on the right.
 */
export function Hero({
  title,
  description,
  video,
}: {
  title: ReactNode;
  description: string;
  video?: { label: string; poster?: string; src?: string };
}) {
  return (
    <section className="flex flex-col p-4 lg:items-center lg:px-6 lg:py-[68px]">
      <div className="grid w-full max-w-[1318px] gap-2.5 lg:grid-cols-[1fr_317px] lg:grid-rows-[auto_auto_1fr] lg:gap-x-4 lg:gap-y-0">
        <h1 className="font-display text-h2 lg:pr-28 lg:text-h1">{title}</h1>

        {video && (
          <div className="flex flex-col items-end py-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:items-center lg:gap-2 lg:py-0">
            <VideoTeaser {...video} />
            <div className="hidden w-full flex-1 items-end justify-end lg:flex">
              <IconChevronDown aria-hidden size={16} stroke={1.5} />
            </div>
          </div>
        )}

        <p className="pr-10 text-body lg:col-start-1 lg:w-[540px] lg:pt-4">{description}</p>
        <SearchBar className="pt-6 lg:col-start-1 lg:pt-12" />
      </div>
    </section>
  );
}
