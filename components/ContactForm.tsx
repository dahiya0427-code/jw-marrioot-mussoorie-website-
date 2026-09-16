"use client";

import { useState, type FormEvent } from "react";

// TODO: wire up to a real submission endpoint (e.g. Payload ConsultationRequests
// collection) once DATABASE_URI is live. For now this only shows a confirmation.
export function ContactForm() {
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
          We&rsquo;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-sans text-sm text-charcoal-ink">
            Full name
          </label>
          <input
            id="name"
            name="name"
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
        <label htmlFor="subject" className="font-sans text-sm text-charcoal-ink">
          Enquiry type
        </label>
        <select
          id="subject"
          name="subject"
          className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
        >
          <option>Stay enquiry</option>
          <option>Weddings &amp; events</option>
          <option>Dining reservation</option>
          <option>Spa &amp; wellness</option>
          <option>General enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="font-sans text-sm text-charcoal-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
        />
      </div>

      <button type="submit" className="btn-pill bg-champagne-gold text-walnut-brown hover:opacity-90">
        Send enquiry
      </button>
    </form>
  );
}
