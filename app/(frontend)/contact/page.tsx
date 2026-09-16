// TODO: migrate to Payload CMS fetch (Pages collection, slug "contact") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  PROPERTY_ADDRESS_LINES,
  PROPERTY_NAME,
  PROPERTY_PHONE_DISPLAY,
  PROPERTY_PHONE_HREF,
} from "@/lib/property";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with JW Marriott Mussoorie Walnut Grove Resort & Spa — address, phone, and enquiry form.",
};

interface ContactPageProps {
  searchParams: Promise<{ type?: string }>;
}

// The Cedar Spa facility page's "Book a consultation" CTA links here with
// ?type=spa so the shared enquiry form (which already covers all PRD §4.5
// enquiry types via its "Enquiry type" selector) preselects Spa & wellness
// instead of guests having to pick it themselves.
const DEFAULT_SUBJECT_BY_TYPE: Record<string, string> = {
  spa: "Spa & wellness",
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { type } = await searchParams;
  const defaultSubject = type ? DEFAULT_SUBJECT_BY_TYPE[type] : undefined;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        subhead="Reach out for stays, celebrations, or anything in between."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-walnut-brown">Send an enquiry</h2>
            <div className="mt-6">
              <ContactForm defaultSubject={defaultSubject} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-walnut-brown">Visit or call</h2>
            <p className="mt-4 font-display text-lg text-walnut-brown">{PROPERTY_NAME}</p>
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

            <p className="mt-6 font-sans text-sm text-charcoal-ink/80">
              Approximately 35 km — a 1.5 to 2 hour scenic drive — from Jolly Grant
              Airport, Dehradun.
            </p>

            <div className="mt-6">
              <ImagePlaceholder
                aspect="aspect-[4/3]"
                variant="sand"
                label="Map — pending"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
