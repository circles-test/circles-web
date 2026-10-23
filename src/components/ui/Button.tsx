import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Figma: Button — Type = Main | Secondary | Simple | Large.
 * On hover the label rolls up and is replaced by a copy of itself
 * (the design stacks two copies of the text for this effect).
 */
type Variant = "primary" | "secondary" | "simple" | "large";

const variants: Record<Variant, string> = {
  primary: "h-10 min-w-37 rounded-full bg-black px-6 text-cta text-white",
  secondary: "h-10 min-w-37 rounded-full border border-black px-6 text-cta text-black",
  simple: "text-cta text-black",
  large: "font-display text-h3 text-black",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function RollingText({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(
    "group inline-flex shrink-0 items-center justify-center whitespace-nowrap text-center",
    variants[variant],
    className,
  );
  const content = <RollingText>{children}</RollingText>;

  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, ...linkProps } = props;
    return (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, type = "button", ...buttonProps } = props;
  return (
    <button type={type} {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
