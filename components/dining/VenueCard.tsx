import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { UtensilsIcon } from "@/components/ui/icons";
import type { DiningVenue } from "@/lib/dining";

export interface VenueCardProps {
  venue: DiningVenue;
  /** Reverses the image/text order for an alternating editorial layout. */
  reverse?: boolean;
}

/**
 * Editorial-style dining listing row: large image placeholder on one side,
 * name/cuisine/hook/hours on the other, alternating sides down the page so
 * the /dining listing reads like a magazine spread rather than a plain
 * directory grid.
 */
export function VenueCard({ venue, reverse = false }: VenueCardProps) {
  return (
    <article
      className={`group grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        href={`/dining/${venue.slug}`}
        className="block overflow-hidden rounded-2xl"
      >
        <ImagePlaceholder
          aspect="aspect-[4/3]"
          variant={venue.imageVariant}
          label={`${venue.name} — photography pending`}
          icon={<UtensilsIcon className="h-full w-full" strokeWidth={1} />}
          src={venue.imageSrc}
          alt={`${venue.name} — illustrative photo`}
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div>
        <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
          {venue.cuisineTag}
        </p>
        <h3 className="mt-2 font-display text-3xl text-walnut-brown sm:text-4xl">
          <Link href={`/dining/${venue.slug}`}>{venue.name}</Link>
        </h3>
        <p className="mt-3 font-sans text-base text-charcoal-ink/80">{venue.hook}</p>
        <p className="mt-4 font-sans text-sm text-charcoal-ink/70">
          <span className="font-semibold text-walnut-brown">Hours:</span> {venue.hours}
        </p>
        <Link
          href={`/dining/${venue.slug}`}
          className="mt-5 inline-block font-sans text-sm font-semibold text-walnut-brown underline-offset-4 hover:underline"
        >
          Discover {venue.name} &rarr;
        </Link>
      </div>
    </article>
  );
}
