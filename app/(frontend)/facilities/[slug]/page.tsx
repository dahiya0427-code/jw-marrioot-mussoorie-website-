// TODO: migrate to Payload CMS fetch (Facilities collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FACILITIES, getFacility } from "@/lib/facilities";

interface FacilityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FACILITIES.map((facility) => ({ slug: facility.slug }));
}

export async function generateMetadata({
  params,
}: FacilityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = getFacility(slug);

  if (!facility) {
    return { title: "Facilities | JW Marriott Mussoorie Walnut Grove Resort & Spa" };
  }

  return {
    title: `${facility.name} | JW Marriott Mussoorie Walnut Grove Resort & Spa`,
    description: facility.hook,
  };
}

export default async function FacilityDetailPage({ params }: FacilityDetailPageProps) {
  const { slug } = await params;
  const facility = getFacility(slug);

  if (!facility) {
    notFound();
  }

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden sm:min-h-[60vh]">
        <ImagePlaceholder
          aspect="aspect-auto"
          variant={facility.imageVariant}
          label={`${facility.name} — photography pending`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/70 via-charcoal-ink/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            {facility.tag}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl">
            {facility.name}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {facility.description.map((paragraph, index) => (
            <p key={index} className="font-sans text-base text-charcoal-ink/80">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <Button href={facility.cta.href} variant="primary">
            {facility.cta.label}
          </Button>
        </div>
      </section>

      {/* Sample treatments (Cedar Spa only) */}
      {facility.sampleTreatments && facility.sampleTreatments.length > 0 ? (
        <section className="bg-warm-sand py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              A sense of the menu
            </p>
            <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
              Sample treatments
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facility.sampleTreatments.map((treatment) => (
                <div
                  key={treatment.name}
                  className="flex h-full flex-col rounded-2xl border border-hairline bg-ivory-mist p-5"
                >
                  <h3 className="font-display text-lg text-walnut-brown">
                    {treatment.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-charcoal-ink/80">
                    {treatment.duration}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center font-sans text-xs text-charcoal-ink/60">
              An illustrative selection, presented as a guide to the spa&rsquo;s
              style — the full treatment menu is available at Cedar Spa.
            </p>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FAQAccordion items={facility.faqs} />
        </div>
      </section>
    </>
  );
}
