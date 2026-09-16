// TODO: migrate to Payload CMS fetch (LegalPages collection, slug "terms-of-use") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PROPERTY_NAME } from "@/lib/property";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the JW Marriott Mussoorie Walnut Grove Resort & Spa website.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" />

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-sm text-soft-grey">Last updated: draft, pending publication</p>

        <p className="font-sans text-base text-charcoal-ink/80">
          These terms govern your use of the {PROPERTY_NAME} website. By
          browsing this site, you agree to the terms below. This is a general
          template intended to be reviewed by qualified legal counsel before
          publication.
        </p>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Use of this site</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            This website is provided for general information about the resort,
            its rooms, dining, facilities, and events, and to allow enquiries
            and, in future, bookings. You agree to use the site only for
            lawful purposes and not to attempt to disrupt or misuse it.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Intellectual property</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            All text, graphics, and other content on this site, unless
            otherwise noted, belong to the resort or its licensors and may not
            be copied, reproduced, or used commercially without prior written
            permission.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Accuracy of content</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We aim to keep information on this site accurate and up to date.
            Some content, including certain photography, is still being
            finalised as the site is developed, and details such as pricing,
            availability, and opening hours should be confirmed directly with
            the resort before you rely on them.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Third-party links</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            This site may link to third-party websites for convenience. We are
            not responsible for the content or practices of sites we do not
            operate.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Limitation of liability</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            To the fullest extent permitted by law, the resort is not liable
            for any indirect or consequential loss arising from your use of
            this website.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Governing law</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            These terms are governed by the laws of India, and any disputes
            will be subject to the jurisdiction of the courts of Uttarakhand.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Changes to these terms</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We may revise these terms from time to time. Continued use of the
            site after changes are posted constitutes acceptance of the
            updated terms.
          </p>
        </div>
      </section>
    </>
  );
}
