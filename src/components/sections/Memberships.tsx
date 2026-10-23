import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

/**
 * Figma: "Memberships" — full-bleed image with a light panel (title, thumbnail,
 * copy, CTA) and a row of highlights at the bottom (first one active).
 */
export function Memberships({
  eyebrow,
  title,
  description,
  cta,
  highlights,
  image,
  thumbnail,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  highlights: string[];
  image?: string;
  thumbnail?: string;
}) {
  return (
    <section className="relative isolate flex h-[956px] flex-col gap-4 p-4 lg:h-[768px] lg:flex-row lg:items-end lg:p-6">
      <Media src={image} alt="" overlay className="-z-10" />

      <div className="flex w-full flex-col items-center gap-12 bg-background p-6 text-center lg:h-full lg:w-[540px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 lg:flex-1">{title}</h2>
        <div className="relative size-[134px] shrink-0">
          <Media src={thumbnail} alt="" sizes="134px" />
        </div>
        <p className="text-body lg:flex lg:flex-1 lg:items-end">{description}</p>
        <Button href={cta.href}>{cta.label}</Button>
      </div>

      <ul className="flex flex-1 items-end gap-4 lg:justify-end">
        {highlights.map((highlight, i) => (
          <li
            key={highlight}
            className={cn(
              "flex flex-1 justify-center border-t pt-2 text-cta whitespace-nowrap text-white lg:flex-none lg:justify-start",
              i === 0 ? "border-white" : "border-white/12",
            )}
          >
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
