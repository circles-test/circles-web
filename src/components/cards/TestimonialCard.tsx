import { IconArrowUpRight } from "@tabler/icons-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

export type Testimonial = {
  quote: string;
  author: string;
  source: string;
  href?: string;
};

/** Figma: Testimonials › Card — quote, author and a link to the original review. */
export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  const { quote, author, source, href } = testimonial;
  return (
    <figure className={cn("flex w-full shrink-0 flex-col border-r border-black/12 pr-6", className)}>
      <blockquote className="line-clamp-4 font-display text-h3">{quote}</blockquote>
      <figcaption className="flex items-center gap-2 pt-32">
        <div className="flex flex-1 flex-col gap-1 text-cta">
          <p>{author}</p>
          <p className="text-black/50">{source}</p>
        </div>
        {href && (
          <IconButton
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            label={`Read ${author}'s review`}
            icon={<IconArrowUpRight size={16} stroke={1.5} />}
            shape="action"
            slide="up"
          />
        )}
      </figcaption>
    </figure>
  );
}
