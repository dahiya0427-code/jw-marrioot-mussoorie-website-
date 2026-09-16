import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { AccommodationCategory } from "@/lib/accommodation";

export interface RoomCardProps {
  category: AccommodationCategory;
}

/**
 * Accommodation-specific card: image placeholder, name, one-line
 * description, a handful of amenity highlights, and two calls to action —
 * a plain "View details" link to the detail page, and a "Check
 * availability" button that opens the /book flow with this room
 * pre-selected. Kept separate from the generic <ContentCard> because this
 * listing needs two CTAs per card rather than one.
 */
export function RoomCard({ category }: RoomCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ivory-mist transition-shadow hover:shadow-lg">
      <Link href={`/accommodation/${category.slug}`} className="block">
        <ImagePlaceholder
          aspect="aspect-[4/3]"
          variant={category.imageVariant}
          label={`${category.name} — photography pending`}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
            {category.viewType}
          </p>
          <h3 className="mt-1 font-display text-xl text-walnut-brown">
            <Link href={`/accommodation/${category.slug}`}>{category.name}</Link>
          </h3>
        </div>

        <p className="font-sans text-sm text-charcoal-ink/80">{category.tagline}</p>

        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5">
          {category.highlightAmenities.map((amenity) => (
            <li
              key={amenity}
              className="flex items-center gap-1.5 font-sans text-xs text-charcoal-ink/70"
            >
              <span aria-hidden="true" className="text-champagne-gold">
                &#10003;
              </span>
              {amenity}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-3">
          <Link
            href={`/accommodation/${category.slug}`}
            className="font-sans text-sm font-semibold text-walnut-brown underline-offset-4 hover:underline"
          >
            View details &rarr;
          </Link>
          <Button href={`/book?room=${category.slug}`} variant="outline" className="text-sm">
            Check availability
          </Button>
        </div>
      </div>
    </div>
  );
}
