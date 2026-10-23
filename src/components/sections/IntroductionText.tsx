import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";

/**
 * Figma: "Introduction text" — two-tone headline, copy and three image slots.
 * Mobile: stacked. Desktop: three 429px columns (text · main image · text).
 */
export function IntroductionText({
  title,
  highlight,
  intro,
  body,
  cta,
  images = {},
}: {
  title: string;
  /** Second line of the headline, in red. */
  highlight: string;
  intro: string;
  body: string;
  cta: { label: string; href: string };
  images?: { main?: string; left?: string; right?: string };
}) {
  return (
    <section className="flex flex-col gap-4 px-4 py-32 lg:flex-row lg:items-stretch lg:justify-between lg:px-6">
      <div className="relative h-[768px] w-full lg:order-2 lg:h-[564px] lg:w-[429px]">
        <Media src={images.main} alt="" sizes="(min-width: 1024px) 429px, 100vw" />
      </div>

      <div className="flex flex-col gap-4 lg:order-1 lg:w-[429px] lg:pr-10">
        <h2 className="font-display text-h2">
          <span className="block">{title}</span>
          <span className="block text-red">{highlight}</span>
        </h2>
        <p className="text-body lg:mt-auto">{intro}</p>
        <div className="relative h-[153px] w-[318px]">
          <Media src={images.left} alt="" sizes="318px" />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:order-3 lg:w-[429px] lg:items-end lg:pl-10">
        <div className="relative h-[257px] w-[206px] self-end">
          <Media src={images.right} alt="" sizes="206px" />
        </div>
        <div className="flex flex-col items-start gap-4 lg:mt-auto">
          <p className="text-body">{body}</p>
          <Button href={cta.href} variant="secondary">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
