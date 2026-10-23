import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Button — Type = Left | Right | Left - Dark | Right - Dark | Dropdown |
 * Dropup | Search | Close | Close Solid, plus the black "Action" pill used on cards.
 * On hover the icon slides out and a copy slides in from the opposite side.
 */
type Tone = "glass" | "dark" | "light" | "muted";
type Shape = "pill" | "circle" | "action" | "search";

const tones: Record<Tone, string> = {
  glass: "bg-black/12 text-white backdrop-blur-[5px]",
  dark: "bg-black text-white",
  light: "bg-white text-black",
  muted: "bg-black/12 text-black",
};

const shapes: Record<Shape, string> = {
  pill: "h-8 w-12 rounded-full",
  action: "h-8 w-12 rounded-full",
  circle: "size-8 rounded-full",
  search: "size-[58px] rounded-full",
};

type Slide = "left" | "right" | "up" | "down" | "up-right" | "none";

type BaseProps = {
  icon: ReactNode;
  label: string;
  tone?: Tone;
  shape?: Shape;
  /** Direction the icon travels on hover. */
  slide?: Slide;
  className?: string;
};

type AsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;
type AsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type IconButtonProps = AsLink | AsButton;

const slideOut: Record<Slide, string> = {
  left: "group-hover:-translate-x-full",
  right: "group-hover:translate-x-full",
  up: "group-hover:-translate-y-full",
  down: "group-hover:translate-y-full",
  "up-right": "group-hover:translate-x-full group-hover:-translate-y-full",
  none: "",
};

const slideIn: Record<Slide, string> = {
  left: "translate-x-full group-hover:translate-x-0",
  right: "-translate-x-full group-hover:translate-x-0",
  up: "translate-y-full group-hover:translate-y-0",
  down: "-translate-y-full group-hover:translate-y-0",
  "up-right": "-translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0",
  none: "hidden",
};

/**
 * The icon + its hover copy. Exported so a whole card (the `group`) can drive
 * the animation of a decorative, non-interactive icon pill.
 */
export function SlidingIcon({ icon, slide = "right" }: { icon: ReactNode; slide?: Slide }) {
  return (
    <>
      <span className={cn("flex transition-transform duration-300 ease-out", slideOut[slide])}>{icon}</span>
      <span
        aria-hidden
        className={cn("absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out", slideIn[slide])}
      >
        {icon}
      </span>
    </>
  );
}

export function iconButtonClasses({ tone = "dark", shape = "pill", className }: { tone?: Tone; shape?: Shape; className?: string }) {
  return cn("group relative inline-flex shrink-0 items-center justify-center overflow-hidden", tones[tone], shapes[shape], className);
}

export function IconButton(props: IconButtonProps) {
  const { icon, label, tone, shape, slide = "right", className } = props;
  const classes = iconButtonClasses({ tone, shape, className });
  const content = <SlidingIcon icon={icon} slide={slide} />;

  if (props.href !== undefined) {
    const { icon: _i, label: _l, tone: _t, shape: _s, slide: _sl, className: _c, ...linkProps } = props;
    return (
      <Link {...linkProps} aria-label={label} className={classes}>
        {content}
      </Link>
    );
  }

  const { icon: _i, label: _l, tone: _t, shape: _s, slide: _sl, className: _c, href: _h, type = "button", ...buttonProps } = props;
  return (
    <button type={type} {...buttonProps} aria-label={label} className={classes}>
      {content}
    </button>
  );
}
