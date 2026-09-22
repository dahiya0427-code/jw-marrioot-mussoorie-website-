// TODO: migrate to Payload CMS fetch (Offers collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { OFFERS, OFFERS_TERMS, getOffer } from "@/lib/offers";

interface OfferDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return OFFERS.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: OfferDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);

  if (!offer) {
    return { title: "Offers" };
  }

  return {
    title: offer.name,
    description: offer.tagline,
  };
}

export default async function OfferDetailPage({ params }: OfferDetailPageProps) {
  const { slug } = await params;
  const offer = getOffer(slug);

  if (!offer) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden sm:min-h-[55vh]">
        <div className="absolute inset-0">
          <ImagePlaceholder
            aspect="aspect-auto"
            variant={offer.imageVariant}
            label={`${offer.name} — photography pending`}
            src={offer.imageSrc}
            alt={`${offer.name} — illustrative photo`}
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/75 via-charcoal-ink/25 to-transparent" />
        <div className="relative mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            {offer.duration}
          </p>
          <h1 className="mt-3 font-display text-3xl text-ivory-mist sm:text-4xl lg:text-5xl">
            {offer.name}
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base text-ivory-mist/85 sm:text-lg">
            {offer.tagline}
          </p>
        </div>
      </section>

      {/* Inclusions */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Ideal for
        </p>
        <p className="mt-2 font-sans text-base text-charcoal-ink/80">
          {offer.idealFor}
        </p>

        <h2 className="mt-10 font-display text-2xl text-walnut-brown sm:text-3xl">
          What's included
        </h2>
        <ul className="mt-6 space-y-3">
          {offer.inclusions.map((inclusion) => (
            <li key={inclusion} className="flex gap-3 font-sans text-base text-charcoal-ink/80">
              <span aria-hidden="true" className="mt-0.5 text-champagne-gold">
                &#10003;
              </span>
              <span>{inclusion}</span>
            </li>
          ))}
        </ul>

        {offer.goodToKnow.length > 0 ? (
          <div className="mt-10">
            <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
              Good to know
            </h2>
            <div className="mt-4 space-y-3">
              {offer.goodToKnow.map((note, index) => (
                <p key={index} className="font-sans text-sm text-charcoal-ink/80">
                  {note}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* How to book */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            How to book this package
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Pricing shown here is intentionally left as "starting from" —
            reach out to the reservations team for current rates, room
            categories, and availability for your dates, and they'll confirm
            everything before you book.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" variant="primary">
              Enquire via contact
            </Button>
          </div>
        </div>
      </section>

      {/* Terms & conditions */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl text-walnut-brown">
          Terms &amp; conditions
        </h2>
        <p className="mt-2 font-sans text-xs text-charcoal-ink/50 italic">
          Draft template — to be reviewed and finalised with hotel legal and
          revenue management before this package is published with live
          pricing.
        </p>
        <ul className="mt-4 space-y-2">
          {OFFERS_TERMS.map((term, index) => (
            <li key={index} className="font-sans text-sm text-charcoal-ink/70">
              {term}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
