// POST /api/bookings/webhook
//
// Razorpay server-to-server webhook. On `payment.captured`, this is the
// authoritative transition to status "paid" (see the comment in
// app/api/bookings/confirm/route.ts for how that differs from the
// client-triggered "confirmed" status), and it's what triggers the
// best-effort confirmation email via Resend.
//
// NOTE: Razorpay webhooks are normally signed with a dedicated "webhook
// secret" configured separately in the Razorpay dashboard (distinct from
// the API key secret). Per this project's current env setup we only have
// RAZORPAY_KEY_SECRET, so that's what's used here — if/when a dedicated
// RAZORPAY_WEBHOOK_SECRET is provisioned, swap it in below.
import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendBookingConfirmationEmail } from "@/lib/email";
import type { BookingDoc } from "@/lib/booking";

interface RazorpayWebhookPayload {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
      };
    };
  };
}

export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const signature = request.headers.get("x-razorpay-signature");

  // Read the raw body — signature verification requires the exact bytes
  // Razorpay signed, before any JSON parsing.
  const rawBody = await request.text();

  if (!secret) {
    console.error("[api/bookings/webhook] Received a webhook but RAZORPAY_KEY_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook receiver not configured yet" }, { status: 503 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing X-Razorpay-Signature header." }, { status: 400 });
  }

  const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (expectedSignature !== signature) {
    console.error("[api/bookings/webhook] Signature mismatch — rejecting webhook.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: RazorpayWebhookPayload;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (event.event !== "payment.captured") {
    // Acknowledge and ignore every other event type.
    return NextResponse.json({ received: true, ignored: event.event ?? "unknown" });
  }

  const paymentEntity = event.payload?.payment?.entity;
  const orderId = paymentEntity?.order_id;
  const paymentId = paymentEntity?.id;

  if (!orderId) {
    console.warn("[api/bookings/webhook] payment.captured event missing order_id — nothing to update.");
    return NextResponse.json({ received: true });
  }

  try {
    const payload = await getPayload({ config });
    const found = await payload.find({
      collection: "bookings",
      where: { razorpayOrderId: { equals: orderId } },
      limit: 1,
    });
    const booking = found.docs[0] as unknown as BookingDoc | undefined;

    if (!booking) {
      console.warn(`[api/bookings/webhook] No booking found for Razorpay order ${orderId}.`);
      return NextResponse.json({ received: true });
    }

    const updated = (await payload.update({
      collection: "bookings",
      id: booking.id,
      data: { status: "paid", razorpayPaymentId: paymentId },
    })) as unknown as BookingDoc;

    // Best-effort email — a failure here must never fail the webhook
    // response, or Razorpay will keep retrying a payment update that
    // actually succeeded.
    try {
      await sendBookingConfirmationEmail({
        reference: updated.reference,
        guestName: updated.guestName,
        guestEmail: updated.guestEmail,
        roomTypeSlug: updated.roomTypeSlug,
        checkIn: typeof updated.checkIn === "string" ? updated.checkIn : null,
        checkOut: typeof updated.checkOut === "string" ? updated.checkOut : null,
        amountInInr: updated.amountInInr,
      });
    } catch (emailErr) {
      console.error(`[api/bookings/webhook] Failed to send confirmation email for ${updated.reference}`, emailErr);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[api/bookings/webhook] Failed to process payment.captured event", err);
    // Return 500 so Razorpay retries the webhook later.
    return NextResponse.json({ error: "Internal error processing webhook." }, { status: 500 });
  }
}
