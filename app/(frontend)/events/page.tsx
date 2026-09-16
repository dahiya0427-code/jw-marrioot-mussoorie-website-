// TODO: migrate to Payload CMS fetch once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { EventEnquiryForm } from "@/components/EventEnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { EVENT_VENUES, EVENTS_STATS } from "@/lib/events";
import { buildEventVenuesSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Weddings & Events",
  description:
    "Wedding by the Hills — one of the largest event infrastructures among luxury resorts in Uttarakhand, with capacity for up to 1,000 guests across the Grand Orchard Ballroom, Indoor Banquet Hall, and Outdoor Lawn.",
};

export default function EventsPage() {
  return (
    <>
      <JsonLd data={buildEventVenuesSchema()} />
      <PageHero
        eyebrow="Wedding by the Hills"
        title="A wedding, or a gathering, that feels like it belongs to the mountains"
        subhead={`One of the largest event infrastructures among luxury resorts in Uttarakhand, with capacity for ${EVENTS_STATS.totalGuestCapacity} across six event spaces.`}
        cta={{ label: "Start planning", href: "#start-planning" }}
      />

      {/* Stats strip */}
      <section className="border-b border-hairline bg-ivory-mist py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-3xl text-walnut-brown sm:text-4xl">
              {EVENTS_STATS.totalGuestCapacity}
            </p>
            <p className="mt-1 font-sans text-xs tracking-[0.15em] text-charcoal-ink/70 uppercase">
              Total guest capacity
            </p>
          </div>
          <div>
            <p className="font-display text-3xl text-walnut-brown sm:text-4xl">
              {EVENTS_STATS.totalVenues}
            </p>
            <p className="mt-1 font-sans text-xs tracking-[0.15em] text-charcoal-ink/70 uppercase">
              Event spaces
            </p>
          </div>
          <div>
            <p className="font-display text-3xl text-walnut-brown sm:text-4xl">
              {EVENTS_STATS.totalMeetingSpaceSqFt}
            </p>
            <p className="mt-1 font-sans text-xs tracking-[0.15em] text-charcoal-ink/70 uppercase">
              Combined indoor meeting space
            </p>
          </div>
        </div>
      </section>

      {/* Venue comparison */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Three venues, one setting
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Spaces built for the scale of your day
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            From an intimate seated banquet to a floating reception under the
            open sky, each venue is designed to hold its own — and to work
            together for a wedding that unfolds across more than one space.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_VENUES.map((venue) => (
            <div
              key={venue.slug}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ivory-mist"
            >
              <ImagePlaceholder
                aspect="aspect-[4/3]"
                variant={venue.imageVariant}
                label={`${venue.name} — photography pending`}
              />
              <div className="flex flex-1 flex-col gap-2 p-6">
                <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
                  {venue.tag}
                </p>
                <h3 className="font-display text-xl text-walnut-brown">
                  {venue.name}
                </h3>
                <p className="font-sans text-sm font-semibold text-walnut-brown">
                  {venue.capacity}
                </p>
                <p className="font-sans text-sm text-charcoal-ink/80">
                  {venue.hook}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MICE / corporate offsite */}
      <section className="bg-deep-forest py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Meetings & incentives
          </p>
          <h2 className="mt-3 font-display text-3xl text-ivory-mist sm:text-4xl">
            A corporate offsite with room to think
          </h2>
          <p className="mt-4 font-sans text-base text-ivory-mist/85">
            With roughly 3,300 sq ft of combined indoor meeting space plus
            generous pre-function areas, Walnut Grove suits everything from a
            focused leadership offsite to a full incentive programme —
            conference sessions by day, and the resort's dining and wellness
            facilities to unwind in once the agenda closes. Dedicated event
            planning support and in-house catering carry through from a
            single boardroom meeting to a multi-day conference.
          </p>
        </div>
      </section>

      {/* Start planning / enquiry form */}
      <section id="start-planning" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Start planning
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Tell us about your event
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            Share a few details and our Sales &amp; Events team will follow up
            to talk through venues, dates, and everything in between.
          </p>
        </div>
        <div className="mt-10">
          <EventEnquiryForm />
        </div>
      </section>
    </>
  );
}
