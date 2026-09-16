"use client";

import { useState, type FormEvent } from "react";

// TODO: wire up to a real submission endpoint (e.g. Payload EventEnquiries
// collection) once DATABASE_URI is live. For now this only shows a
// confirmation state — no data is sent anywhere.
export function EventEnquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-hairline bg-warm-sand p-8 text-center"
      >
        <p className="font-display text-2xl text-walnut-brown">Thank you</p>
        <p className="mt-2 font-sans text-sm text-charcoal-ink/80">
          Our Sales &amp; Events team will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="eventType" className="font-sans text-sm text-charcoal-ink">
          Event type
        </label>
        <select
          id="eventType"
          name="eventType"
          required
          className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
        >
          <option value="">Select an event type</option>
          <option>Wedding</option>
          <option>Corporate</option>
          <option>Social</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className="font-sans text-sm text-charcoal-ink">
            Preferred date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="guestCount" className="font-sans text-sm text-charcoal-ink">
            Estimated guest count
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            min={1}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="font-sans text-sm text-charcoal-ink">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-sans text-sm text-charcoal-ink">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="font-sans text-sm text-charcoal-ink">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="details" className="font-sans text-sm text-charcoal-ink">
          Tell us about your event
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
        />
      </div>

      <button type="submit" className="btn-pill bg-champagne-gold text-walnut-brown hover:opacity-90">
        Start planning
      </button>
    </form>
  );
}
