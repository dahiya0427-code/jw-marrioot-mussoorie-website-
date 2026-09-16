// TODO: migrate to Payload CMS fetch (LegalPages collection, slug "cookie-policy") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookie Policy | JW Marriott Mussoorie Walnut Grove Resort & Spa",
  description: "How JW Marriott Mussoorie Walnut Grove Resort & Spa uses cookies on this website.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" />

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-sm text-soft-grey">Last updated: draft, pending publication</p>

        <p className="font-sans text-base text-charcoal-ink/80">
          This policy explains, in general terms, how this website uses
          cookies and similar technologies. It is a first-draft template
          intended to be reviewed by qualified legal counsel before
          publication.
        </p>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">What are cookies</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Cookies are small text files placed on your device when you visit
            a website. They help the site function, remember your
            preferences, and understand how it is used.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Cookies we use</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We use essential cookies required for the website to function
            correctly, and may use analytics cookies to understand overall
            visitor patterns and preference cookies to remember choices such
            as language. We do not currently use cookies for third-party
            advertising.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Managing cookies</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Most browsers allow you to control cookies through their settings,
            including blocking or deleting them. Disabling essential cookies
            may affect how parts of this website function.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Changes to this policy</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We may update this policy as our use of cookies changes. Material
            changes will be reflected by an updated date at the top of this
            page.
          </p>
        </div>
      </section>
    </>
  );
}
