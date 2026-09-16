import { Button } from "@/components/ui/Button";

export interface ConfirmationStepProps {
  reference: string;
  guestEmail: string;
  /** "confirmed": payment verified. "pending": payment gateway unavailable — request recorded, team will follow up. */
  status: "confirmed" | "pending";
}

export function ConfirmationStep({ reference, guestEmail, status }: ConfirmationStepProps) {
  const isConfirmed = status === "confirmed";

  return (
    <div className="text-center">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
          isConfirmed ? "bg-confirmation-green/10 text-confirmation-green" : "bg-info-slate/10 text-info-slate"
        }`}
        aria-hidden="true"
      >
        {isConfirmed ? "✓" : "i"}
      </div>

      <h2 className="mt-4 font-display text-2xl text-walnut-brown">
        {isConfirmed ? "Booking confirmed" : "Request received"}
      </h2>

      <p className="mt-2 font-sans text-sm text-charcoal-ink/80">
        {isConfirmed
          ? `Thank you — your reservation is confirmed. A confirmation email is on its way to ${guestEmail}.`
          : `Thank you — we've received your request. Online payment isn't available on this site yet, so our reservations team will contact you at ${guestEmail} to confirm details and arrange payment.`}
      </p>

      <p className="mt-6 font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Booking reference</p>
      <p className="font-display text-3xl text-walnut-brown">{reference}</p>

      <p className="mx-auto mt-6 max-w-sm font-sans text-xs text-charcoal-ink/60">
        Keep this reference to view your booking status anytime.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href={`/booking/${reference}`} variant="outline">
          View booking
        </Button>
        <Button href="/" variant="primary">
          Return home
        </Button>
      </div>
    </div>
  );
}
