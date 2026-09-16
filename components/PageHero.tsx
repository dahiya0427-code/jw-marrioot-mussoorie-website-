import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subhead?: string;
  cta?: { label: string; href: string };
  imageLabel?: string;
}

/**
 * Full-bleed hero band used at the top of every interior page: image
 * placeholder background, serif headline, optional subhead + CTA.
 */
export function PageHero({ eyebrow, title, subhead, cta, imageLabel }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden sm:min-h-[65vh]">
      <ImagePlaceholder
        aspect="aspect-auto"
        variant="walnut"
        label={imageLabel ?? "Property photography — pending"}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/70 via-charcoal-ink/20 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        {eyebrow ? (
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subhead ? (
          <p className="mt-4 max-w-2xl font-sans text-base text-ivory-mist/85 sm:text-lg">
            {subhead}
          </p>
        ) : null}
        {cta ? (
          <div className="mt-6">
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
