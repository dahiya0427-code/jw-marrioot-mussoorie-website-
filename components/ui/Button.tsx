import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-champagne-gold text-walnut-brown hover:opacity-90",
  secondary: "bg-walnut-brown text-ivory-mist hover:opacity-90",
  outline:
    "bg-transparent text-walnut-brown border border-walnut-brown hover:bg-warm-sand",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * Brand-system button. Pill-shaped (fully rounded) by default per the
 * JW Marriott Mussoorie design system. Deeper variants/sizes can be added
 * as later pages need them — this is intentionally minimal for the
 * scaffolding phase.
 */
export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn-pill ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
