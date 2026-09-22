// TODO: migrate to Payload CMS fetch (RoomTypes collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RoomCard } from "@/components/accommodation/RoomCard";
import { AmenitiesList } from "@/components/accommodation/AmenitiesList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { ACCOMMODATION_CATEGORIES, BASE_ROOM_AMENITIES } from "@/lib/accommodation";
import { PROPERTY_STATS } from "@/lib/property";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

export const metadata: Metadata = {
  title: "Accommodation",
  description:
    "Explore rooms and suites at JW Marriott Mussoorie Walnut Grove Resort & Spa — 115 keys set among deodar and walnut groves in the Garhwal Himalayan foothills.",
};

export default function AccommodationPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodation"
        title="Rooms and suites built for stillness"
        subhead={`${PROPERTY_STATS.keys} keys — ${PROPERTY_STATS.rooms} rooms and ${PROPERTY_STATS.suites} suites — each looking out over the Garhwal foothills, finished with the same warm, unhurried character found across the resort.`}
        imageSrc={STOCK_PHOTOS.roomLuxurySuite}
      />

      {/* Intro */}
      <Reveal direction="fade">
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Find your room
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Four ways to stay
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            From an intimate Deluxe Room to the panoramic Presidential Suite,
            every category shares the same considered details — warm woods,
            plush designer bedding, and a bath tub with a separate rain shower —
            scaled to however much space your stay calls for.
          </p>
        </section>
      </Reveal>

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ACCOMMODATION_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delayMs={index * 100} direction={index % 2 === 0 ? "up" : "zoom"}>
              <RoomCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Shared amenities */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              In every room
            </p>
            <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
              The essentials, done thoughtfully
            </h2>
          </Reveal>
          <div className="mt-10">
            <AmenitiesList items={BASE_ROOM_AMENITIES} />
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <Reveal direction="zoom">
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            Ready to plan your stay?
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Book directly with us in a few simple steps — no account required —
            or reach out and our team will help you find the right room.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/book" variant="primary">
              Book now
            </Button>
          </div>
        </section>
      </Reveal>
    </>
  );
}
