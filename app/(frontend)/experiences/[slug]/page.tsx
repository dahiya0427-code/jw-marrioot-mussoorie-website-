// TODO: migrate to Payload CMS fetch once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { EXPERIENCES, getExperience } from "@/lib/experiences";

interface ExperienceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({
  params,
}: ExperienceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    return { title: "Experiences | JW Marriott Mussoorie Walnut Grove Resort & Spa" };
  }

  return {
    title: `${experience.name} | JW Marriott Mussoorie Walnut Grove Resort & Spa`,
    description: experience.directAnswer,
  };
}

export default async function ExperienceDetailPage({
  params,
}: ExperienceDetailPageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  const meta =
    experience.distanceKm && experience.travelTime
      ? `${experience.tag} · ${experience.distanceKm} km from the resort · ${experience.travelTime}`
      : experience.tag;

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden sm:min-h-[60vh]">
        <ImagePlaceholder
          aspect="aspect-auto"
          variant={experience.imageVariant}
          label={`${experience.name} — photography pending`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/70 via-charcoal-ink/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            {meta}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl">
            {experience.name}
          </h1>
        </div>
      </section>

      {/* Direct-answer + description */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-lg text-charcoal-ink">
          {experience.directAnswer}
        </p>
        <div className="mt-6 space-y-4">
          {experience.description.map((paragraph, index) => (
            <p key={index} className="font-sans text-base text-charcoal-ink/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FAQAccordion items={experience.faqs} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            Make it part of your stay
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            The concierge team can help time your visit, arrange a car, and
            share current local conditions before you set off.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href={experience.cta.href} variant="primary">
              {experience.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
