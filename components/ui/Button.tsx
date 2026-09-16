import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-champagne-gold text-walnut-brown hover:opacity-90",
  secondary: "bg-walnut-brown text-ivory-mist hover:opacity-90",
  outline:
    "bg-transparent text-walnut-brown border border-walnut-brown hover:bg-warm-sand",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: undefined;
}

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
}

/**
 * Brand-system button. Pill-shaped (fully rounded) by default per the
 * JW Marriott Mussoorie design system. Pass `href` to render as a
 * (Next.js) link styled identically, for CTAs that navigate rather than
 * submit — e.g. the header's "Book Now" pill.
 */
export function Button({
  variant = "primary",
  className = "",
  href,
  ...props
}: ButtonProps | LinkButtonProps) {
  const classes = `btn-pill ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
