import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export interface PhotoMarqueeItem {
  src: string;
  alt: string;
}

export interface PhotoMarqueeProps {
  items: PhotoMarqueeItem[];
  className?: string;
}

/**
 * Small auto-scrolling strip of thumbnails — decorative only (not
 * interactive), used to break up an otherwise-static hero. Each tile keeps a
 * soft rounded-rectangle silhouette (never circular) but vignettes toward
 * its edges so it reads as fading into the hero photo rather than a hard
 * framed chip sliding across it. The item list is rendered twice back to
 * back so the CSS animation (see .animate-marquee-ltr in globals.css) can
 * loop seamlessly.
 */
export function PhotoMarquee({ items, className = "" }: PhotoMarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`.trim()} aria-hidden="true">
      <div className="flex w-max animate-marquee-ltr items-center gap-2">
        {track.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24 ${
              index % 2 === 1 ? "-translate-y-2" : "translate-y-2"
            }`}
            style={{ filter: "drop-shadow(0 6px 14px rgba(28, 22, 15, 0.4))" }}
          >
            <ImagePlaceholder aspect="aspect-square" variant="sand" src={item.src} alt={item.alt} className="h-full w-full" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 45%, rgba(20, 16, 12, 0.6) 100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
