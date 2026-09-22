import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  /**
   * Deliberately not rendered — hero copy is kept to an eyebrow + short
   * title only (a full sentence over a photo reads as cluttered). Left
   * optional in the type so existing callers don't need to drop the prop;
   * the fuller description belongs in the page's first body section instead.
   */
  subhead?: string;
  cta?: { label: string; href: string };
  imageLabel?: string;
  /** Overrides the default mountain-valley stock photo backdrop. */
  imageSrc?: string;
}

/**
 * Full-bleed hero band used at the top of every interior page: photo
 * background (a generic mountain-valley stock photo by default, or a
 * page-specific `imageSrc`), short serif headline, optional CTA — kept
 * deliberately text-light so the photo carries the section.
 */
export function PageHero({ eyebrow, title, cta, imageLabel, imageSrc }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden sm:min-h-[65vh]">
      <div className="absolute inset-0">
        <ImagePlaceholder
          aspect="aspect-auto"
          variant="walnut"
          label={imageLabel ?? "Property photography — pending"}
          src={imageSrc ?? STOCK_PHOTOS.mountainValley}
          alt="Himalayan mountain valley — illustrative photo"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/85 via-charcoal-ink/40 to-charcoal-ink/25" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        {eyebrow ? (
          <span className="inline-block rounded-full border border-ivory-mist/25 bg-charcoal-ink/30 px-4 py-1.5 font-sans text-[0.65rem] tracking-[0.2em] text-champagne-gold uppercase backdrop-blur-sm">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-4 max-w-3xl font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {cta ? (
          <div className="mt-7">
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
