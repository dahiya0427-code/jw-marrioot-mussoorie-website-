// TODO: migrate to Payload CMS fetch (Facilities collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentCard } from "@/components/ContentCard";
import { Reveal } from "@/components/Reveal";
import { FACILITIES } from "@/lib/facilities";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "From Cedar Spa by L'Occitane to a hilltop adventure area, explore the facilities at JW Marriott Mussoorie Walnut Grove Resort & Spa — spa, pool, fitness, family, and recreation, all set among the deodar and walnut groves.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="A resort built for however you like to unwind"
        subhead="From a Provençal spa ritual to a quiet round on the putting green, a family afternoon at the kids' club to a trek into the surrounding forest, Walnut Grove holds a full day's worth of ways to rest, play, and move — all within the grounds."
        imageSrc={STOCK_PHOTOS.spaTreatmentRoom}
      />

      {/* Intro */}
      <Reveal direction="fade">
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Something for every hour
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Eight ways to spend your day
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            Whether the plan is stillness or activity, indoors or out, the
            resort's facilities are built to move with the mood of your stay —
            starting with Cedar Spa by L&rsquo;Occitane, the resort&rsquo;s
            flagship wellness experience.
          </p>
        </section>
      </Reveal>

      {/* Facility grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((facility, index) => (
            <Reveal key={facility.slug} delayMs={(index % 3) * 100} direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"}>
              <ContentCard
                title={facility.name}
                description={facility.hook}
                href={`/facilities/${facility.slug}`}
                linkLabel="Explore"
                meta={facility.tag}
                imageVariant={facility.imageVariant}
                imageLabel={`${facility.name} — photography pending`}
                imageSrc={facility.imageSrc}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* More amenities */}
      <section className="bg-warm-sand py-16">
        <Reveal direction="zoom" className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            More amenities, around every corner
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Beyond these eight, the resort also offers a hair salon, an
            on-site souvenir shop, and gardens set among the walnut and
            deodar groves — the smaller comforts that round out a stay at
            Walnut Grove.
          </p>
        </Reveal>
      </section>
    </>
  );
}
