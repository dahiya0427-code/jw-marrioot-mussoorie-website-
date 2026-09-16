// POST /api/bookings
//
// Guest-checkout booking creation (PRD §4.2/§4.3). Validates the booking
// payload, creates a `bookings` document via Payload's local API (status
// "pending"), then creates a matching Razorpay Order for the total amount.
//
// Payload's Local API bypasses collection access control by default
// (overrideAccess defaults to true), which is what lets this public route
// write to the staff-only `bookings` collection on the guest's behalf — see
// the access-control comment in collections/Bookings.ts.
import { NextResponse, type NextRequest } from "next/server";
import Razorpay from "razorpay";
import { getPayload } from "payload";
import config from "@payload-config";
import { getAccommodationCategory } from "@/lib/accommodation";
import {
  BOOKING_ADD_ONS,
  calculatePricing,
  generateBookingReference,
  isValidRoomSlug,
  type BookingDoc,
} from "@/lib/booking";

interface BookingRequestBody {
  roomSlug?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  addOnIds?: string[];
  guest?: {
    name?: string;
    email?: string;
    phone?: string;
    specialRequests?: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: BookingRequestBody;
  try {
    body = await request.json();
  } catch {
    return badRequest("Request body must be valid JSON.");
  }

  const { roomSlug, checkIn, checkOut, guest } = body;
  const adults = Number(body.adults ?? 2);
  const children = Number(body.children ?? 0);
  const addOnIds = Array.isArray(body.addOnIds)
    ? body.addOnIds.filter((id): id is string => typeof id === "string")
    : [];

  if (!roomSlug || !isValidRoomSlug(roomSlug)) {
    return badRequest("Select a valid room category.");
  }
  if (!checkIn || !checkOut || Number.isNaN(new Date(checkIn).getTime()) || Number.isNaN(new Date(checkOut).getTime())) {
    return badRequest("Provide valid check-in and check-out dates.");
  }
  if (new Date(checkOut).getTime() <= new Date(checkIn).getTime()) {
    return badRequest("Check-out date must be after the check-in date.");
  }
  if (!Number.isFinite(adults) || adults < 1) {
    return badRequest("At least one adult guest is required.");
  }
  if (!Number.isFinite(children) || children < 0) {
    return badRequest("Number of children cannot be negative.");
  }
  const unknownAddOn = addOnIds.find((id) => !BOOKING_ADD_ONS.some((a) => a.id === id));
  if (unknownAddOn) {
    return badRequest(`Unknown add-on selected: ${unknownAddOn}`);
  }
  if (!guest?.name || guest.name.trim().length < 2) {
    return badRequest("Guest name is required.");
  }
  if (!guest.email || !EMAIL_RE.test(guest.email)) {
    return badRequest("A valid guest email address is required.");
  }

  const category = getAccommodationCategory(roomSlug)!;
  const pricing = calculatePricing(roomSlug, checkIn, checkOut, addOnIds);

  if (pricing.nights < 1) {
    return badRequest("Stay must be at least one night.");
  }
  if (pricing.total <= 0) {
    return badRequest("Unable to calculate a valid total for this booking.");
  }

  const selectedAddOns = addOnIds.map((id) => {
    const addOn = BOOKING_ADD_ONS.find((a) => a.id === id)!;
    return { label: addOn.label, priceInInr: addOn.priceInInr };
  });

  // --- Create the booking document (status: pending) ---------------------
  let payload;
  try {
    payload = await getPayload({ config });
  } catch (err) {
    console.error("[api/bookings] Failed to initialize Payload", err);
    return NextResponse.json(
      {
        error:
          "We couldn't reach the reservations database. Please try again in a few minutes or contact the resort directly.",
      },
      { status: 500 },
    );
  }

  let booking: BookingDoc;
  try {
    booking = (await payload.create({
      collection: "bookings",
      data: {
        reference: generateBookingReference(),
        guestName: guest.name.trim(),
        guestEmail: guest.email.trim(),
        guestPhone: guest.phone?.trim() || undefined,
        roomTypeSlug: category.slug,
        checkIn,
        checkOut,
        adults,
        children,
        addOns: selectedAddOns,
        amountInInr: pricing.total,
        currency: "INR",
        paymentGateway: "razorpay",
        status: "pending",
        notes: guest.specialRequests?.trim() || undefined,
      },
    })) as unknown as BookingDoc;
  } catch (err) {
    console.error("[api/bookings] Failed to create booking document", err);
    return NextResponse.json(
      {
        error:
          "We couldn't reach the reservations database. Please try again in a few minutes or contact the resort directly.",
      },
      { status: 500 },
    );
  }

  // --- Create a matching Razorpay Order -----------------------------------
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.warn(
      `[api/bookings] Razorpay is not configured — booking ${booking.reference} was recorded as pending without a payment order.`,
    );
    return NextResponse.json(
      {
        error: "Payment gateway not configured yet",
        bookingId: booking.id,
        reference: booking.reference,
      },
      { status: 503 },
    );
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  let order;
  try {
    order = await razorpay.orders.create({
      amount: Math.round(pricing.total * 100), // paise
      currency: "INR",
      receipt: booking.reference,
      notes: { bookingId: String(booking.id) },
    });
  } catch (err) {
    console.error("[api/bookings] Razorpay order creation failed", err);
    return NextResponse.json(
      {
        error: "Unable to initiate payment right now. Please try again shortly.",
        bookingId: booking.id,
        reference: booking.reference,
      },
      { status: 502 },
    );
  }

  try {
    await payload.update({
      collection: "bookings",
      id: booking.id,
      data: { razorpayOrderId: order.id },
    });
  } catch (err) {
    // Non-fatal for the guest: the order exists and payment can proceed;
    // the webhook lookup keyed on razorpayOrderId just won't resolve if
    // this write failed, which is logged for staff follow-up.
    console.error("[api/bookings] Failed to persist razorpayOrderId on booking", err);
  }

  return NextResponse.json({
    bookingId: booking.id,
    reference: booking.reference,
    amountInInr: pricing.total,
    razorpayKeyId: keyId,
    razorpayOrder: { id: order.id, amount: order.amount, currency: order.currency },
  });
}
