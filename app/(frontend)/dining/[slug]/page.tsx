// TODO: migrate to Payload CMS fetch (DiningVenues collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { VenueCard } from "@/components/dining/VenueCard";
import { DINING_VENUES, getDiningVenue } from "@/lib/dining";

interface DiningDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DINING_VENUES.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({
  params,
}: DiningDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = getDiningVenue(slug);

  if (!venue) {
    return { title: "Dining" };
  }

  return {
    title: venue.name,
    description: venue.hook,
  };
}

export default async function DiningDetailPage({ params }: DiningDetailPageProps) {
  const { slug } = await params;
  const venue = getDiningVenue(slug);

  if (!venue) {
    notFound();
  }

  const otherVenues = DINING_VENUES.filter((v) => v.slug !== venue.slug).slice(0, 2);

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden sm:min-h-[60vh]">
        <ImagePlaceholder
          aspect="aspect-auto"
          variant={venue.imageVariant}
          label={`${venue.name} — photography pending`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/70 via-charcoal-ink/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            {venue.cuisineTag}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl">
            {venue.name}
          </h1>
        </div>
      </section>

      {/* Story + practical info band */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <blockquote className="border-l-2 border-champagne-gold pl-6 font-display text-2xl text-walnut-brown sm:text-3xl">
              &ldquo;{venue.pullQuote}&rdquo;
            </blockquote>
            <div className="mt-8 space-y-4">
              {venue.description.map((paragraph, index) => (
                <p key={index} className="font-sans text-base text-charcoal-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-hairline bg-warm-sand p-6">
            <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
              Good to know
            </p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="font-sans text-sm font-semibold text-walnut-brown">Hours</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink/80">{venue.hours}</dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold text-walnut-brown">
                  Dress code
                </dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink/80">
                  {venue.dressCode}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold text-walnut-brown">
                  In-room dining
                </dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink/80">
                  Available, for guests who prefer to dine in their room.
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <Button href="/contact" variant="primary" className="w-full text-center">
                Enquire / reserve a table
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature highlights */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            On the menu
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
            Signature highlights
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {venue.signatureHighlights.map((dish) => (
              <div
                key={dish.name}
                className="flex h-full flex-col rounded-2xl border border-hairline bg-ivory-mist p-5"
              >
                <h3 className="font-display text-lg text-walnut-brown">{dish.name}</h3>
                <p className="mt-2 font-sans text-sm text-charcoal-ink/80">
                  {dish.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-sans text-xs text-charcoal-ink/60">
            A selection of dishes, presented as a guide to the kitchen&rsquo;s style —
            the full menu is available at the venue.
          </p>
        </div>
      </section>

      {/* Other venues */}
      {otherVenues.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Explore more
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
            Other venues to try
          </h2>
          <div className="mt-12 space-y-16">
            {otherVenues.map((other) => (
              <VenueCard key={other.slug} venue={other} />
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FAQAccordion items={venue.faqs} />
        </div>
      </section>
    </>
  );
}
