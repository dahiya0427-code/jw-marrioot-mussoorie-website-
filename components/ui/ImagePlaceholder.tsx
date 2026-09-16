type Variant = "walnut" | "forest" | "sand" | "gold";

const variantClasses: Record<Variant, string> = {
  walnut: "bg-gradient-to-br from-walnut-brown via-walnut-brown to-deep-forest",
  forest: "bg-gradient-to-tr from-deep-forest via-walnut-brown to-charcoal-ink",
  sand: "bg-gradient-to-br from-warm-sand via-warm-sand to-champagne-gold/40",
  gold: "bg-gradient-to-tr from-champagne-gold/70 via-warm-sand to-walnut-brown/70",
};

const labelClasses: Record<Variant, string> = {
  walnut: "text-ivory-mist/70",
  forest: "text-ivory-mist/70",
  sand: "text-walnut-brown/60",
  gold: "text-walnut-brown/70",
};

export interface ImagePlaceholderProps {
  /** Tailwind aspect-ratio utility, e.g. "aspect-[16/9]", "aspect-square". */
  aspect?: string;
  /** Small centered caption. Defaults to a neutral "pending photography" note. */
  label?: string;
  variant?: Variant;
  className?: string;
}

/**
 * Stand-in for real property photography, built from brand-palette gradients.
 * Swap for a real <Image> (or Payload media field) one-for-one once licensed
 * photography is available — every usage takes the same aspect/label shape.
 */
export function ImagePlaceholder({
  aspect = "aspect-[4/3]",
  label = "Property photography — pending",
  variant = "walnut",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${aspect} ${variantClasses[variant]} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <span
        className={`px-4 text-center font-sans text-xs tracking-[0.15em] uppercase ${labelClasses[variant]}`}
      >
        {label}
      </span>
    </div>
  );
}
