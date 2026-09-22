// TODO: migrate to Payload CMS fetch (Offers collection) once DATABASE_URI is live
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { OFFERS } from "@/lib/offers";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

export const metadata: Metadata = {
  title: "Offers & packages",
  description:
    "Package concepts for a stay at JW Marriott Mussoorie Walnut Grove Resort & Spa — romantic getaways, family weekends, and wellness resets, with clear inclusions and current rates on request.",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers & packages"
        title="Luxury, clearly priced"
        subhead="No guessing games on what's included. Each package below lists exactly what comes with it — enquire directly for current rates, so what you see is what you pay for."
        imageSrc={STOCK_PHOTOS.spaCouplesSuite}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {OFFERS.map((offer, index) => (
            <Reveal key={offer.slug} delayMs={index * 130} direction={index === 0 ? "left" : index === 2 ? "right" : "zoom"}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ivory-mist">
                <ImagePlaceholder
                  aspect="aspect-[4/3]"
                  variant={offer.imageVariant}
                  label={`${offer.name} — photography pending`}
                  src={offer.imageSrc}
                  alt={`${offer.name} — illustrative photo`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
                    {offer.duration}
                  </p>
                  <h3 className="font-display text-xl text-walnut-brown">
                    {offer.name}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-ink/80">
                    {offer.tagline}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {offer.inclusions.map((inclusion) => (
                      <li
                        key={inclusion}
                        className="flex gap-2 font-sans text-sm text-charcoal-ink/80"
                      >
                        <span aria-hidden="true" className="text-champagne-gold">
                          &#10003;
                        </span>
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/offers/${offer.slug}`}
                    className="mt-auto pt-4 font-sans text-sm font-semibold text-walnut-brown underline-offset-4 hover:underline"
                  >
                    View &amp; enquire &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-warm-sand py-16">
        <Reveal direction="fade" className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            Rates on request, always
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Package concepts above are illustrative; final pricing depends on
            room category, season, and current availability. The reservations
            team can confirm exact rates and current promotions for your
            dates.
          </p>
        </Reveal>
      </section>
    </>
  );
}
