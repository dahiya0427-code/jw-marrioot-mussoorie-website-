// TODO: migrate to Payload CMS fetch (LegalPages collection, slug "privacy-policy") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PROPERTY_NAME, PROPERTY_PHONE_DISPLAY } from "@/lib/property";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How JW Marriott Mussoorie Walnut Grove Resort & Spa collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-sm text-soft-grey">Last updated: draft, pending publication</p>

        <p className="font-sans text-base text-charcoal-ink/80">
          {PROPERTY_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the resort&rdquo;)
          respects your privacy. This policy explains, in general terms, what
          information we collect through this website, how we use it, and the
          choices available to you. It is a first-draft template intended to be
          reviewed by qualified legal counsel before publication.
        </p>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Information we collect</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We may collect information you provide directly, such as your name,
            email address, phone number, and message when you submit an enquiry
            form, sign up for our newsletter, or make a booking request. We may
            also collect limited technical information automatically, such as
            browser type and general usage patterns, to help us maintain and
            improve the site.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">How we use your information</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We use the information collected to respond to enquiries, process
            booking requests, send newsletters to those who opt in, and
            understand how our website is used so we can improve it. We do not
            sell your personal information.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Sharing of information</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We may share information with trusted service providers who help us
            operate the website and our booking and communication systems, and
            where required by law. We do not share your information with third
            parties for their own marketing purposes without your consent.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Data security &amp; retention</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We take reasonable technical and organisational measures to protect
            the information we hold. We retain personal information only for as
            long as necessary for the purposes described in this policy, or as
            required by law.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Your choices</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            You may ask us to access, correct, or delete the personal
            information we hold about you, and you may unsubscribe from our
            newsletter at any time using the link in any email we send.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Changes to this policy</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            We may update this policy from time to time. Material changes will
            be reflected by an updated date at the top of this page.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Contact us</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Questions about this policy can be directed to the resort at{" "}
            {PROPERTY_PHONE_DISPLAY} or via our contact page.
          </p>
        </div>
      </section>
    </>
  );
}
