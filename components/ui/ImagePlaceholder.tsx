import type { ReactNode } from "react";
import Image from "next/image";
import { MountainIcon, TreesIcon, BedIcon, SparklesIcon } from "@/components/ui/icons";

type Variant = "walnut" | "forest" | "sand" | "gold";

const variantClasses: Record<Variant, string> = {
  walnut: "bg-gradient-to-br from-walnut-brown via-[#2f2117] to-deep-forest",
  forest: "bg-gradient-to-tr from-deep-forest via-[#26362b] to-charcoal-ink",
  sand: "bg-gradient-to-br from-warm-sand via-[#e9ddc6] to-champagne-gold/50",
  gold: "bg-gradient-to-tr from-champagne-gold/60 via-warm-sand to-walnut-brown/60",
};

const labelClasses: Record<Variant, string> = {
  walnut: "text-ivory-mist/75",
  forest: "text-ivory-mist/75",
  sand: "text-walnut-brown/70",
  gold: "text-walnut-brown/75",
};

const iconClasses: Record<Variant, string> = {
  walnut: "text-ivory-mist/15",
  forest: "text-ivory-mist/15",
  sand: "text-walnut-brown/15",
  gold: "text-walnut-brown/15",
};

const defaultIcons: Record<Variant, ReactNode> = {
  walnut: <MountainIcon className="h-full w-full" strokeWidth={1} />,
  forest: <TreesIcon className="h-full w-full" strokeWidth={1} />,
  sand: <BedIcon className="h-full w-full" strokeWidth={1} />,
  gold: <SparklesIcon className="h-full w-full" strokeWidth={1} />,
};

export interface ImagePlaceholderProps {
  /** Tailwind aspect-ratio utility, e.g. "aspect-[16/9]", "aspect-square". */
  aspect?: string;
  /** Small centered caption. Defaults to a neutral "pending photography" note. Ignored when `src` is set. */
  label?: string;
  variant?: Variant;
  className?: string;
  /** Overrides the variant's default watermark icon. Pass `null` to hide it. Ignored when `src` is set. */
  icon?: ReactNode;
  /**
   * A real (licensed) photo URL. When set, renders an actual photo instead
   * of the brand-gradient placeholder — everything else about the tile
   * (aspect ratio, rounding, hover treatment from the parent) stays the same.
   */
  src?: string;
  /** Alt text for `src`. Falls back to `label` if omitted. */
  alt?: string;
}

/**
 * Image tile used everywhere the site shows a photo: renders a real <Image>
 * when `src` is given, otherwise falls back to a brand-gradient placeholder
 * (soft vignette, grain, and a large low-opacity watermark icon) so unshot
 * areas still read as intentional rather than broken. Every usage takes the
 * same aspect/label shape regardless of which mode is active.
 */
export function ImagePlaceholder({
  aspect = "aspect-[4/3]",
  label = "Property photography — pending",
  variant = "walnut",
  className = "",
  icon,
  src,
  alt,
}: ImagePlaceholderProps) {
  const resolvedIcon = icon === null ? null : (icon ?? defaultIcons[variant]);

  if (src) {
    return (
      <div className={`relative overflow-hidden ${aspect} ${className}`.trim()}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-end overflow-hidden ${aspect} ${variantClasses[variant]} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      {/* soft top-left highlight for depth, mimicking ambient light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      {/* fine grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      {resolvedIcon ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-center ${iconClasses[variant]}`}
        >
          <div className="h-16 w-16 sm:h-20 sm:w-20">{resolvedIcon}</div>
        </div>
      ) : null}

      <span
        className={`relative w-full px-4 pb-3 text-center font-sans text-[0.65rem] tracking-[0.15em] uppercase ${labelClasses[variant]}`}
      >
        {label}
      </span>
    </div>
  );
}
