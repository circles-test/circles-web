import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Image slot. Figma names these layers "To change": the imagery is content,
 * so without a `src` a neutral placeholder is rendered in its place.
 * The parent sets the size; Media fills it.
 */
export type MediaProps = {
  src?: string;
  alt?: string;
  /** Dark bottom gradient used on cards and full-bleed slides. */
  overlay?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

export function Media({ src, alt = "", overlay = false, priority, sizes = "100vw", className, imageClassName }: MediaProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black/8", className)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      )}
      {overlay && <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/0 to-black/40" />}
    </div>
  );
}
