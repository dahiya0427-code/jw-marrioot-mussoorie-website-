"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { GuestDetails } from "../types";

export interface GuestDetailsStepProps {
  guest: GuestDetails;
  onChange: (patch: Partial<GuestDetails>) => void;
  onBack: () => void;
  onNext: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function GuestDetailsStep({ guest, onChange, onBack, onNext }: GuestDetailsStepProps) {
  const [touched, setTouched] = useState(false);

  const emailValid = EMAIL_RE.test(guest.email);
  const isValid = guest.name.trim().length > 1 && emailValid && guest.phone.trim().length >= 7;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (isValid) onNext();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-2xl text-walnut-brown">Guest details</h2>
      <p className="mt-1 font-sans text-sm text-charcoal-ink/70">
        No account needed — just a few details to hold your reservation.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="guestName" className="font-sans text-sm text-charcoal-ink">
            Full name
          </label>
          <input
            id="guestName"
            required
            value={guest.name}
            onChange={(event) => onChange({ name: event.target.value })}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="guestEmail" className="font-sans text-sm text-charcoal-ink">
            Email address
          </label>
          <input
            id="guestEmail"
            type="email"
            required
            value={guest.email}
            onChange={(event) => onChange({ email: event.target.value })}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
          {touched && !emailValid ? (
            <p className="mt-1 font-sans text-xs text-alert-rust">Enter a valid email address.</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="guestPhone" className="font-sans text-sm text-charcoal-ink">
            Phone number
          </label>
          <input
            id="guestPhone"
            type="tel"
            required
            value={guest.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="specialRequests" className="font-sans text-sm text-charcoal-ink">
            Special requests (optional)
          </label>
          <textarea
            id="specialRequests"
            rows={4}
            value={guest.specialRequests}
            onChange={(event) => onChange({ specialRequests: event.target.value })}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
      </div>

      {touched && !isValid ? (
        <p className="mt-3 font-sans text-xs text-alert-rust">
          Please fill in your name, a valid email, and phone number.
        </p>
      ) : null}

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue to payment</Button>
      </div>
    </form>
  );
}
