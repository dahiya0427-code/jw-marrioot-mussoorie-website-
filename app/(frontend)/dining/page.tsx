// TODO: migrate to Payload CMS fetch (DiningVenues collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VenueCard } from "@/components/dining/VenueCard";
import { Button } from "@/components/ui/Button";
import { DINING_VENUES } from "@/lib/dining";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Five restaurants, one philosophy: nourish the soul. Explore JW Cafe, Trout House Grill & Bar, Teppan, Wisteria Deck, and Perch at JW Marriott Mussoorie Walnut Grove Resort & Spa.",
};

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Dining"
        title="Five restaurants, one philosophy: nourish the soul"
        subhead="Every kitchen at Walnut Grove starts from the same idea — that a meal, cooked well and eaten slowly, is its own kind of rest. From an open-kitchen buffet to a fireside grill, a teppanyaki table to a mountaintop cafe, dining here follows the day rather than a single dining room."
      />

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          The table, reimagined
        </p>
        <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
          A different mood for every hour
        </h2>
        <p className="mt-4 font-sans text-base text-charcoal-ink/80">
          Breakfast at the open kitchen, a Mediterranean lunch on a sunlit
          deck, a Himalayan-inflected dinner over mountain views, or simply a
          pot of tea with the Garhwal range for company — each venue at
          Walnut Grove has its own hours, its own cuisine, and its own
          reason to visit.
        </p>
      </section>

      {/* Editorial venue list */}
      <section className="mx-auto max-w-6xl space-y-20 px-4 pb-20 sm:px-6 lg:px-8">
        {DINING_VENUES.map((venue, index) => (
          <VenueCard key={venue.slug} venue={venue} reverse={index % 2 === 1} />
        ))}
      </section>

      {/* Closing CTA */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            Planning a special dinner?
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Whether it&rsquo;s a quiet anniversary table or a gathering for the
            whole family, our team can help you choose the right venue and
            reserve a table ahead of your stay.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" variant="primary">
              Enquire / reserve a table
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
