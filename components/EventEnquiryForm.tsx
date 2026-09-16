"use client";

import { useState, type FormEvent } from "react";

export function EventEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("details"),
          enquiryType: "weddings-events",
          eventType: data.get("eventType"),
          preferredDate: data.get("eventDate") || undefined,
          guestCount: data.get("guestCount") || undefined,
          source: "events",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(result?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("submitted");
    } catch (err) {
      console.error("[EventEnquiryForm] submission failed", err);
      setErrorMessage("We couldn't send your enquiry. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "submitted") {
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

      {status === "error" && errorMessage ? (
        <p role="alert" className="font-sans text-sm text-alert-rust">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-pill bg-champagne-gold text-walnut-brown hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Start planning"}
      </button>
    </form>
  );
}
