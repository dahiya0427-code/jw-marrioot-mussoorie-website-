"use client";

import { useState, type FormEvent } from "react";

// Maps the human-readable "Enquiry type" options below to the 3-way routing
// category ConsultationRequests / POST /api/consultations understands (PRD
// §4.5: Weddings & Events RFP -> Sales, Spa & Wellness -> Spa/Reservations,
// General/Corporate -> Sales). Stay/Dining enquiries both route to Sales as
// "general-corporate" — the original label is still sent as `subject` so
// staff retain that context.
const SUBJECT_TO_ENQUIRY_TYPE: Record<string, "weddings-events" | "spa-wellness" | "general-corporate"> = {
  "Stay enquiry": "general-corporate",
  "Weddings & events": "weddings-events",
  "Dining reservation": "general-corporate",
  "Spa & wellness": "spa-wellness",
  "General enquiry": "general-corporate",
};

interface ContactFormProps {
  /** Preselects the "Enquiry type" dropdown, e.g. when linked from /facilities/cedar-spa. */
  defaultSubject?: string;
}

export function ContactForm({ defaultSubject = "Stay enquiry" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = String(data.get("subject") ?? "General enquiry");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          subject,
          enquiryType: SUBJECT_TO_ENQUIRY_TYPE[subject] ?? "general-corporate",
          source: "contact",
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
      console.error("[ContactForm] submission failed", err);
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
          defaultValue={defaultSubject}
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
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
