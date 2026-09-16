// TODO: migrate to Payload CMS fetch once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentCard } from "@/components/ContentCard";
import { EXPERIENCES, ON_PROPERTY_TEASER } from "@/lib/experiences";

export const metadata: Metadata = {
  title: "Experiences | JW Marriott Mussoorie Walnut Grove Resort & Spa",
  description:
    "Plan your Mussoorie trip from JW Marriott Mussoorie Walnut Grove Resort & Spa — waterfalls, viewpoints, hiking trails, and cultural sites nearby, with distances and travel times from the resort.",
};

function meta(experience: { tag: string; distanceKm?: number; travelTime?: string }) {
  if (experience.distanceKm && experience.travelTime) {
    return `${experience.tag} · ${experience.distanceKm} km, ${experience.travelTime}`;
  }
  return experience.tag;
}

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Mussoorie, with the resort as your base"
        subhead="Waterfalls, ridgeline viewpoints, a wildlife park, and the town's old Mall Road are all within reach of Walnut Grove — close enough for a half-day out and back in time for dinner."
      />

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Beyond the grounds
        </p>
        <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
          A hill station built for exploring
        </h2>
        <p className="mt-4 font-sans text-base text-charcoal-ink/80">
          Mussoorie rewards travellers who venture out from wherever they are
          staying — a waterfall in the morning, a walk down Mall Road in the
          evening, a quiet viewpoint whenever the mood calls for one. The
          resort sits close enough to the town's landmarks and natural sights
          to make all of it an easy day trip, with the comfort of Walnut
          Grove to come back to.
        </p>
      </section>

      {/* Experience grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((experience) => (
            <ContentCard
              key={experience.slug}
              title={experience.name}
              description={experience.hook}
              href={`/experiences/${experience.slug}`}
              linkLabel="Explore"
              meta={meta(experience)}
              imageVariant={experience.imageVariant}
              imageLabel={`${experience.name} — photography pending`}
            />
          ))}
          <ContentCard
            title={ON_PROPERTY_TEASER.name}
            description={ON_PROPERTY_TEASER.hook}
            href={ON_PROPERTY_TEASER.href}
            linkLabel="See on-property adventure"
            meta={ON_PROPERTY_TEASER.tag}
            imageVariant={ON_PROPERTY_TEASER.imageVariant}
            imageLabel={`${ON_PROPERTY_TEASER.name} — photography pending`}
          />
        </div>
      </section>

      {/* Planning note */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            Let the concierge do the planning
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Distances and drive times above are approximate guides — actual
            travel varies with traffic, weather, and road conditions in the
            hills. The concierge team can help sequence a day out, arrange a
            car, and share current local conditions before you set off.
          </p>
        </div>
      </section>
    </>
  );
}
