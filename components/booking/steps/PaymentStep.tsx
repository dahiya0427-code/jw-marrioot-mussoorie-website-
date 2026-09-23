"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { formatInr } from "@/lib/booking";
import type { BookingWizardState } from "../types";

export interface BookingCreatedPayload {
  bookingId: string;
  reference: string;
  razorpayOrder: { id: string; amount: number; currency: string } | null;
  razorpayKeyId: string | null;
}

export interface PaymentStepProps {
  state: BookingWizardState;
  onBookingCreated: (payload: BookingCreatedPayload) => void;
  onConfirmed: (reference: string) => void;
  onUnconfigured: (reference: string) => void;
  onBack: () => void;
}

type Phase = "creating" | "ready" | "unconfigured" | "processing" | "error";

/**
 * Step 4: creates the pending booking + Razorpay order (once, on entry),
 * then opens Razorpay Checkout. On success, verifies the payment with
 * POST /api/bookings/confirm before handing control back to the wizard.
 */
export function PaymentStep({ state, onBookingCreated, onConfirmed, onUnconfigured, onBack }: PaymentStepProps) {
  const [phase, setPhase] = useState<Phase>(state.bookingId ? (state.razorpayOrder ? "ready" : "unconfigured") : "creating");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const hasRequestedRef = useRef(Boolean(state.bookingId));

  useEffect(() => {
    // Guard with a ref rather than an effect-cleanup "cancelled" flag: in
    // React Strict Mode (dev), this effect fires, cleans up, and fires again
    // on mount. A closure-scoped `cancelled` flag set by that first cleanup
    // would silently discard the in-flight fetch's result even though the
    // component is still mounted for real — leaving the UI stuck on
    // "Preparing your reservation…" forever. The ref persists across that
    // double-invoke, so only the flag matters: the first (real) fetch is
    // left to resolve and apply its result normally.
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    async function createBooking() {
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomSlug: state.roomSlug,
            checkIn: state.checkIn,
            checkOut: state.checkOut,
            adults: state.adults,
            children: state.children,
            addOnIds: state.addOnIds,
            guest: state.guest,
          }),
        });
        const data = await res.json().catch(() => ({}) as Record<string, unknown>);

        if (res.status === 503) {
          onBookingCreated({
            bookingId: data.bookingId as string,
            reference: data.reference as string,
            razorpayOrder: null,
            razorpayKeyId: null,
          });
          setPhase("unconfigured");
          return;
        }

        if (!res.ok) {
          setErrorMessage(
            (data.error as string) ?? "Something went wrong while creating your reservation. Please try again.",
          );
          setPhase("error");
          return;
        }

        onBookingCreated({
          bookingId: data.bookingId as string,
          reference: data.reference as string,
          razorpayOrder: data.razorpayOrder as BookingCreatedPayload["razorpayOrder"],
          razorpayKeyId: data.razorpayKeyId as string | null,
        });
        setPhase("ready");
      } catch {
        setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
        setPhase("error");
      }
    }

    createBooking();
    // Runs once on step entry — the effect intentionally does not re-run as
    // wizard state changes underneath it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePay() {
    if (!state.razorpayOrder || !state.razorpayKeyId || !window.Razorpay) return;
    setPhase("processing");

    const checkout = new window.Razorpay({
      key: state.razorpayKeyId,
      amount: state.razorpayOrder.amount,
      currency: state.razorpayOrder.currency,
      order_id: state.razorpayOrder.id,
      name: "JW Marriott Mussoorie Walnut Grove Resort & Spa",
      description: `Reservation — ${state.roomSlug}`,
      prefill: {
        name: state.guest.name,
        email: state.guest.email,
        contact: state.guest.phone,
      },
      theme: { color: "#c6a15b" },
      handler: async (response) => {
        try {
          const confirmRes = await fetch("/api/bookings/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId: state.bookingId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const confirmData = await confirmRes.json();
          if (!confirmRes.ok) {
            setErrorMessage(
              confirmData.error ??
                "We received your payment but couldn't confirm it automatically. Please contact the resort with your reference.",
            );
            setPhase("error");
            return;
          }
          onConfirmed(confirmData.reference ?? state.reference ?? "");
        } catch {
          setErrorMessage(
            "We received your payment but couldn't confirm it automatically. Please contact the resort with your reference.",
          );
          setPhase("error");
        }
      },
      modal: {
        ondismiss: () => setPhase("ready"),
      },
    });

    checkout.open();
  }

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />

      <h2 className="font-display text-2xl text-walnut-brown">Payment</h2>
      <p className="mt-1 font-sans text-sm text-charcoal-ink/70">Secure checkout powered by Razorpay.</p>

      <div className="mt-6">
        {phase === "creating" ? (
          <p className="font-sans text-sm text-charcoal-ink/70">Preparing your reservation…</p>
        ) : null}

        {phase === "unconfigured" ? (
          <div className="rounded-xl border border-info-slate/30 bg-info-slate/5 p-5">
            <p className="font-sans text-sm text-charcoal-ink">
              Online payment isn&rsquo;t set up on this site yet. Your reservation request has been recorded as{" "}
              <strong>{state.reference}</strong> — our reservations team will reach out to confirm details and
              arrange payment.
            </p>
          </div>
        ) : null}

        {(phase === "ready" || phase === "processing") && state.razorpayOrder ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-hairline bg-warm-sand p-5">
              <p className="font-sans text-sm text-charcoal-ink/80">Amount due</p>
              <p className="mt-1 font-display text-2xl text-walnut-brown">
                {formatInr(state.razorpayOrder.amount / 100)}
              </p>
            </div>
            <Button
              type="button"
              onClick={handlePay}
              disabled={!scriptReady || phase === "processing"}
              className="w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {phase === "processing" ? "Opening secure checkout…" : "Pay with Razorpay"}
            </Button>
          </div>
        ) : null}

        {phase === "error" ? (
          <div className="rounded-xl border border-alert-rust/30 bg-alert-rust/5 p-5">
            <p className="font-sans text-sm text-alert-rust">{errorMessage}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={phase === "processing"}>
          Back
        </Button>
        {phase === "unconfigured" ? (
          <Button
            type="button"
            onClick={() => onUnconfigured(state.reference ?? "")}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        ) : null}
      </div>
    </div>
  );
}
