/**
 * Booking-engine content & pricing helpers for the /book flow.
 *
 * See lib/accommodation.ts for the 4 real accommodation category slugs
 * (deluxe-room, premier-room, luxury-suite, presidential-suite) this file
 * builds on top of.
 */
import { getAccommodationCategory } from "./accommodation";

/**
 * Shape of a `bookings` Payload document, as written/read by the booking API
 * routes and the /booking/[reference] status page. Declared by hand (rather
 * than imported from the generated `payload-types.ts`) because that file is
 * generated on demand by Payload's dev/build process and may not exist yet
 * in a fresh checkout — see collections/Bookings.ts for the source of truth
 * on field shape. Local API results are cast to this type at each call site.
 */
export interface BookingDoc {
  id: string | number;
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string | null;
  roomTypeSlug: string;
  checkIn: string;
  checkOut: string;
  adults?: number | null;
  children?: number | null;
  addOns?: { label: string; priceInInr: number }[] | null;
  amountInInr: number;
  currency?: string | null;
  paymentGateway?: "razorpay" | "stripe" | null;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  status: "pending" | "confirmed" | "paid" | "cancelled";
  notes?: string | null;
}

export interface BookingAddOn {
  id: string;
  label: string;
  description: string;
  priceInInr: number;
}

/**
 * Optional add-ons/packages offered in step 2 of the booking flow. Prices
 * are flat, illustrative figures — see the same caveat as
 * INDICATIVE_NIGHTLY_RATES_INR below.
 */
export const BOOKING_ADD_ONS: BookingAddOn[] = [
  {
    id: "airport-transfer",
    label: "Private airport transfer",
    description: "Return transfer between Jolly Grant Airport, Dehradun and the resort.",
    priceInInr: 3500,
  },
  {
    id: "candlelight-dinner",
    label: "Candlelight dinner for two",
    description: "A private table with a curated multi-course menu at one of the resort's restaurants.",
    priceInInr: 4500,
  },
  {
    id: "spa-credit",
    label: "Cedar Spa credit (₹3,000)",
    description: "Redeemable against any spa treatment during your stay.",
    priceInInr: 3000,
  },
  {
    id: "early-late-checkout",
    label: "Early check-in / late check-out",
    description: "Subject to availability on your arrival or departure day.",
    priceInInr: 1500,
  },
];

export function getBookingAddOn(id: string): BookingAddOn | undefined {
  return BOOKING_ADD_ONS.find((addOn) => addOn.id === id);
}

/**
 * INDICATIVE nightly rates, in INR, per accommodation category — for the
 * booking-flow UI to demonstrate a running total only.
 *
 * IMPORTANT — DO NOT PRESENT AS A LIVE RATE: JW Marriott Mussoorie Walnut
 * Grove Resort & Spa has not published live nightly rates, and this site
 * has no connection to a PMS / channel manager yet. Real dynamic pricing
 * (by date, occupancy, rate plan, promotions, taxes) MUST be sourced from
 * the property's PMS/channel manager integration before this booking
 * engine is used for real, bookable transactions.
 */
export const INDICATIVE_NIGHTLY_RATES_INR: Record<string, number> = {
  "deluxe-room": 18000,
  "premier-room": 22000,
  "luxury-suite": 32000,
  "presidential-suite": 55000,
};

export function getIndicativeNightlyRate(slug: string): number {
  return INDICATIVE_NIGHTLY_RATES_INR[slug] ?? 0;
}

export function isValidRoomSlug(slug: string): boolean {
  return Boolean(getAccommodationCategory(slug));
}

/** Whole nights between two yyyy-mm-dd date strings (0 or negative if invalid/same-day). */
export function calculateNights(checkIn: string, checkOut: string): number {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) return 0;
  const ms = outDate.getTime() - inDate.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export interface PricingBreakdown {
  nights: number;
  nightlyRate: number;
  roomSubtotal: number;
  addOnsTotal: number;
  total: number;
}

export function calculatePricing(
  roomSlug: string,
  checkIn: string,
  checkOut: string,
  addOnIds: string[],
): PricingBreakdown {
  const nights = Math.max(calculateNights(checkIn, checkOut), 0);
  const nightlyRate = getIndicativeNightlyRate(roomSlug);
  const roomSubtotal = nights * nightlyRate;
  const addOnsTotal = addOnIds.reduce((sum, id) => sum + (getBookingAddOn(id)?.priceInInr ?? 0), 0);
  return { nights, nightlyRate, roomSubtotal, addOnsTotal, total: roomSubtotal + addOnsTotal };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars (0/O, 1/I)

/** Generates a guest-facing booking reference, e.g. "JWM-7K4QXWM". */
export function generateBookingReference(): string {
  let suffix = "";
  for (let i = 0; i < 7; i += 1) {
    suffix += REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)];
  }
  return `JWM-${suffix}`;
}
