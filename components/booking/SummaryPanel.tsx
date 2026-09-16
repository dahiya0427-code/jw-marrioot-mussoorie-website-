"use client";

import { useState } from "react";
import { getAccommodationCategory } from "@/lib/accommodation";
import { calculatePricing, formatInr, getBookingAddOn } from "@/lib/booking";

export interface SummaryPanelProps {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  addOnIds: string[];
}

/**
 * Running-total summary of the in-progress booking. Desktop: sticky
 * sidebar, always visible. Mobile: collapsible drawer triggered by a
 * summary bar, per the /book flow spec.
 */
export function SummaryPanel({ roomSlug, checkIn, checkOut, adults, children, addOnIds }: SummaryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const category = getAccommodationCategory(roomSlug);
  const pricing = calculatePricing(roomSlug, checkIn, checkOut, addOnIds);

  const body = (
    <div className="space-y-4">
      <div>
        <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Your stay</p>
        <p className="mt-1 font-display text-lg text-walnut-brown">{category?.name ?? "Select a room"}</p>
        {category ? <p className="font-sans text-xs text-charcoal-ink/60">{category.viewType}</p> : null}
      </div>

      {checkIn && checkOut ? (
        <div className="flex items-center justify-between border-t border-hairline pt-3 font-sans text-sm text-charcoal-ink/80">
          <span>
            {checkIn} &rarr; {checkOut}
          </span>
          <span>
            {pricing.nights} night{pricing.nights === 1 ? "" : "s"}
          </span>
        </div>
      ) : null}

      <div className="flex items-center justify-between font-sans text-sm text-charcoal-ink/80">
        <span>Guests</span>
        <span>
          {adults} adult{adults === 1 ? "" : "s"}
          {children > 0 ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}
        </span>
      </div>

      {pricing.nights > 0 ? (
        <div className="flex items-center justify-between border-t border-hairline pt-3 font-sans text-sm text-charcoal-ink/80">
          <span>
            Room ({pricing.nights} &times; {formatInr(pricing.nightlyRate)})
          </span>
          <span>{formatInr(pricing.roomSubtotal)}</span>
        </div>
      ) : null}

      {addOnIds.length > 0 ? (
        <div className="space-y-1 border-t border-hairline pt-3">
          {addOnIds.map((id) => {
            const addOn = getBookingAddOn(id);
            if (!addOn) return null;
            return (
              <div key={id} className="flex items-center justify-between font-sans text-xs text-charcoal-ink/70">
                <span>{addOn.label}</span>
                <span>{formatInr(addOn.priceInInr)}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-hairline pt-3 font-sans text-base font-semibold text-walnut-brown">
        <span>Total</span>
        <span>{formatInr(pricing.total)}</span>
      </div>

      <p className="font-sans text-[0.65rem] leading-relaxed text-soft-grey">
        Indicative pricing for illustration only — final rate is confirmed at payment, and taxes or fees may apply.
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden rounded-2xl border border-hairline bg-white p-6 shadow-sm lg:block">{body}</div>

      {/* Mobile: collapsible drawer */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between rounded-xl border border-hairline bg-white px-5 py-3 font-sans text-sm font-semibold text-walnut-brown shadow-sm"
        >
          <span>
            {isOpen ? "Hide summary" : "View summary"} &middot; {formatInr(pricing.total)}
          </span>
          <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen ? <div className="mt-3 rounded-2xl border border-hairline bg-white p-6 shadow-sm">{body}</div> : null}
      </div>
    </>
  );
}
