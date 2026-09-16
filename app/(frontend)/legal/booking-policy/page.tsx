// TODO: migrate to Payload CMS fetch (LegalPages collection, slug "booking-policy") once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PROPERTY_PHONE_DISPLAY } from "@/lib/property";

export const metadata: Metadata = {
  title: "Booking & Cancellation Policy",
  description: "Reservation, check-in/out, and cancellation terms for JW Marriott Mussoorie Walnut Grove Resort & Spa.",
};

export default function BookingPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Booking & Cancellation Policy" />

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-sm text-soft-grey">Last updated: draft, pending publication</p>

        <p className="font-sans text-base text-charcoal-ink/80">
          This page outlines the general terms that apply to reservations at
          the resort. Specific rates, packages, or event bookings may carry
          their own terms, which will be confirmed at the time of booking.
          This is a general template intended to be reviewed by qualified
          legal counsel before publication.
        </p>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Reservations</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Reservations are typically confirmed with a valid credit card or
            advance payment. A confirmation will be shared by email once your
            booking is secured.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Check-in &amp; check-out</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Standard check-in is from 2:00 pm and check-out is by 12:00 pm.
            Early check-in and late check-out may be arranged, subject to
            availability.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Cancellations &amp; modifications</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Standard reservations may generally be cancelled or modified free
            of charge up to 48 hours before arrival. Cancellations made within
            48 hours of arrival, or no-shows, may be charged the equivalent of
            one night&rsquo;s stay. Peak-season and package rates may carry
            different, more restrictive terms, which will be clearly stated at
            the time of booking.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Group &amp; event bookings</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            Weddings, conferences, and other group events are governed by a
            separate signed agreement covering deposits, payment schedules,
            and cancellation terms specific to the event.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-walnut-brown">Questions</h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            For help with an existing or upcoming reservation, please call us
            at {PROPERTY_PHONE_DISPLAY} or use our contact page.
          </p>
        </div>
      </section>
    </>
  );
}
