// TODO: migrate to Payload CMS fetch (Pages collection, slug "media") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { PRESS_MENTIONS } from "@/lib/media";
import {
  PROPERTY_ADDRESS_LINES,
  PROPERTY_NAME,
  PROPERTY_PHONE_DISPLAY,
  PROPERTY_PHONE_HREF,
} from "@/lib/property";

export const metadata: Metadata = {
  title: "Media & Press",
  description:
    "Press and recognition, press kit, and media contact details for JW Marriott Mussoorie Walnut Grove Resort & Spa.",
};

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media & Press"
        title="Walnut Grove, in the press"
        subhead="A resource for journalists and press partners covering JW Marriott Mussoorie Walnut Grove Resort & Spa."
      />

      {/* Press & Recognition */}
      {/* NOTE: the mentions below are invented, illustrative placeholders —
          see lib/media.ts — and must be replaced with real, rights-cleared
          press coverage before launch. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Press & recognition
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            What people are saying
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            A sample of illustrative press mentions — placeholders only,
            pending confirmed coverage.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRESS_MENTIONS.map((mention) => (
            <figure
              key={mention.publication}
              className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-ivory-mist p-6"
            >
              <blockquote className="font-display text-xl text-walnut-brown">
                &ldquo;{mention.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-sans text-sm text-charcoal-ink/70">
                <span className="font-semibold text-charcoal-ink">
                  {mention.publication}
                </span>
                <span className="mx-2" aria-hidden="true">
                  &middot;
                </span>
                {mention.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Press Kit */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Press kit
          </p>
          <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
            Fact sheet, imagery, and brand assets
          </h2>
          <p className="mt-4 font-sans text-base text-charcoal-ink/80">
            A press kit with the resort&rsquo;s fact sheet, approved
            photography, and logo assets is being prepared. Check back soon,
            or reach out directly using the details below.
          </p>
          <div className="mt-6">
            {/* Non-functional stub — wire up to a real, hosted press kit
                file once one exists. */}
            <Button variant="outline" aria-disabled="true">
              Download press kit
            </Button>
          </div>
        </div>
      </section>

      {/* Media contact */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Media contact
        </p>
        <h2 className="mt-3 font-display text-2xl text-walnut-brown sm:text-3xl">
          For interview requests, imagery, or further information
        </h2>
        <p className="mt-4 font-display text-lg text-walnut-brown">
          {PROPERTY_NAME}
        </p>
        <address className="mt-2 space-y-1 font-sans text-sm text-charcoal-ink/80 not-italic">
          {PROPERTY_ADDRESS_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a
          href={PROPERTY_PHONE_HREF}
          className="mt-3 inline-block font-sans text-sm font-semibold text-walnut-brown hover:underline"
        >
          {PROPERTY_PHONE_DISPLAY}
        </a>
      </section>
    </>
  );
}
