// POST /api/bookings/confirm
//
// Called client-side by the Payment step immediately after Razorpay
// Checkout's `handler` callback fires with a payment/order/signature triple.
// Verifies that triple against RAZORPAY_KEY_SECRET (the same
// order_id|payment_id HMAC Razorpay documents for client-side verification)
// and, if valid, marks the booking "confirmed" as an optimistic UI signal.
//
// This is deliberately NOT the authoritative "paid" transition — that only
// happens in app/api/bookings/webhook/route.ts, driven by Razorpay's own
// server-to-server payment.captured event, which also triggers the
// confirmation email. This route just lets the browser move to the
// confirmation screen without waiting on the webhook's timing.
import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { BookingDoc } from "@/lib/booking";

interface ConfirmRequestBody {
  bookingId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}

export async function POST(request: NextRequest) {
  let body: ConfirmRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;
  if (!bookingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: "Missing payment confirmation details." }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payment gateway not configured yet" }, { status: 503 });
  }

  // Razorpay's documented client-side payment verification: HMAC-SHA256 of
  // "order_id|payment_id", keyed with the account's key secret.
  // https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/#4-verify-payment-signature
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
  const isValid = expectedSignature === razorpaySignature;

  if (!isValid) {
    console.error(`[api/bookings/confirm] Signature verification failed for booking ${bookingId}`);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    const booking = (await payload.update({
      collection: "bookings",
      id: bookingId,
      data: { status: "confirmed", razorpayPaymentId },
    })) as unknown as BookingDoc;

    return NextResponse.json({ reference: booking.reference, status: booking.status });
  } catch (err) {
    console.error("[api/bookings/confirm] Failed to update booking after verified payment", err);
    return NextResponse.json(
      {
        error:
          "Your payment was verified, but we couldn't update the reservation record. Please contact the resort with your reference.",
      },
      { status: 500 },
    );
  }
}
