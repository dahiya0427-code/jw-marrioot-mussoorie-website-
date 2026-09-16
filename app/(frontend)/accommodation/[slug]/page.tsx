// TODO: migrate to Payload CMS fetch (RoomTypes collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RoomCard } from "@/components/accommodation/RoomCard";
import { AmenitiesList } from "@/components/accommodation/AmenitiesList";
import {
  ACCOMMODATION_CATEGORIES,
  ACCOMMODATION_FAQS,
  BASE_ROOM_AMENITIES,
  getAccommodationCategory,
} from "@/lib/accommodation";

interface AccommodationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ACCOMMODATION_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: AccommodationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getAccommodationCategory(slug);

  if (!category) {
    return { title: "Accommodation | JW Marriott Mussoorie Walnut Grove Resort & Spa" };
  }

  return {
    title: `${category.name} | JW Marriott Mussoorie Walnut Grove Resort & Spa`,
    description: category.tagline,
  };
}

export default async function AccommodationDetailPage({
  params,
}: AccommodationDetailPageProps) {
  const { slug } = await params;
  const category = getAccommodationCategory(slug);

  if (!category) {
    notFound();
  }

  const amenities = [...BASE_ROOM_AMENITIES, ...category.extraAmenities];
  const otherCategories = ACCOMMODATION_CATEGORIES.filter((c) => c.slug !== category.slug).slice(
    0,
    2,
  );

  return (
    <>
      <PageHero
        eyebrow={category.viewType}
        title={category.name}
        subhead={category.tagline}
        imageLabel={`${category.name} — photography pending`}
      />

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ImagePlaceholder
          aspect="aspect-[16/9]"
          variant={category.imageVariant}
          label={`${category.name} — main photography pending`}
        />
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["Bedroom", "Bathroom", "Balcony / view", "Seating area"].map((view) => (
            <ImagePlaceholder
              key={view}
              aspect="aspect-square"
              variant={category.imageVariant}
              label={`${view} — pending`}
            />
          ))}
        </div>
      </section>

      {/* Meta row + description */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-hairline bg-warm-sand p-6 sm:grid-cols-3">
          <div>
            <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
              View
            </p>
            <p className="mt-1 font-sans text-sm text-charcoal-ink">{category.viewType}</p>
          </div>
          <div>
            <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
              Occupancy
            </p>
            <p className="mt-1 font-sans text-sm text-charcoal-ink">{category.occupancy}</p>
          </div>
          <div>
            <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
              Bed configuration
            </p>
            <p className="mt-1 font-sans text-sm text-charcoal-ink">{category.bedConfig}</p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {category.description.map((paragraph, index) => (
            <p key={index} className="font-sans text-base text-charcoal-ink/80">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/contact" variant="primary">
            Check availability
          </Button>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            In this room
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
            Amenities
          </h2>
          <div className="mt-10">
            <AmenitiesList items={amenities} />
          </div>
        </div>
      </section>

      {/* You may also like */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Explore more
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
          You may also like
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {otherCategories.map((other) => (
            <RoomCard key={other.slug} category={other} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FAQAccordion items={[...ACCOMMODATION_FAQS]} />
        </div>
      </section>
    </>
  );
}
