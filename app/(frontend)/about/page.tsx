// TODO: migrate to Payload CMS fetch (Pages collection, slug "about") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { MINDFUL_LUXURY_PILLARS, PROPERTY_STATS } from "@/lib/property";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of JW Marriott Mussoorie Walnut Grove Resort & Spa — Mindful Luxury in the Garhwal Himalayan foothills.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A quiet philosophy, set in the Garhwal hills"
        subhead="JW Marriott Mussoorie Walnut Grove Resort & Spa brings the brand's Mindful Luxury philosophy to the foothills of the Garhwal Himalayan range."
      />

      {/* Brand story */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal direction="fade">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            The JW Marriott philosophy
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Mindful Luxury
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            JW Marriott hotels are built around a simple idea: true luxury is the
            space and quiet attention to be fully present. That philosophy, known
            as Mindful Luxury, shapes everything from the design of a room to the
            rhythm of a meal, and it rests on three pillars.
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          {MINDFUL_LUXURY_PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delayMs={index * 100} direction="left">
              <div className="border-l-2 border-champagne-gold pl-6">
                <h3 className="font-display text-xl text-walnut-brown">{pillar.title}</h3>
                <p className="mt-2 font-sans text-sm text-charcoal-ink/80">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Property story / setting */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal direction="left">
            <ImagePlaceholder aspect="aspect-[4/3]" variant="walnut" />
          </Reveal>
          <Reveal direction="right" delayMs={150}>
            <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              The property
            </p>
            <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
              Walnut Grove, in the foothills of the Garhwal Himalayas
            </h2>
            <p className="mt-4 font-sans text-base text-charcoal-ink/80">
              Set in Village Siya along Kempty Fall Road, in Charleville,
              Mussoorie, the resort takes its name from the walnut groves that
              surround it. It is roughly {PROPERTY_STATS.distanceFromAirportKm} km
              — a {PROPERTY_STATS.driveTimeFromAirport} — from{" "}
              {PROPERTY_STATS.airportName}, and offers {PROPERTY_STATS.keys} keys
              ({PROPERTY_STATS.rooms} rooms and {PROPERTY_STATS.suites} suites)
              looking out over the surrounding hills.
            </p>
            <p className="mt-4 font-sans text-base text-charcoal-ink/80">
              Mussoorie itself has long been known as the &ldquo;Queen of the
              Hills&rdquo; — a hill station of pine and deodar forest, colonial-era
              charm, and views toward the Himalayan range. The resort sits within
              easy reach of Mall Road, Kempty Falls, Gun Hill Trail, and
              Cloud&rsquo;s End, while remaining its own quiet retreat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sustainability */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal direction="zoom">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Sustainability
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Implant Nature
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            Implant Nature is the resort&rsquo;s ongoing sapling-planting
            programme, a small, practical commitment to the hillside it calls
            home. Rather than a single gesture, it is treated as a continuing
            practice — planting saplings that, over time, help renew the
            landscape around Walnut Grove for the guests, staff, and communities
            who share it.
          </p>
        </Reveal>
      </section>
    </>
  );
}
