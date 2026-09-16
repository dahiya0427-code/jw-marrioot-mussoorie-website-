/**
 * Best-effort transactional email via Resend. Every call site must treat
 * failures (including a missing RESEND_API_KEY) as non-fatal — a booking's
 * payment status must never depend on email delivery succeeding.
 */
import { Resend } from "resend";
import { getAccommodationCategory } from "./accommodation";
import { formatInr } from "./booking";

export interface BookingEmailPayload {
  reference: string;
  guestName: string;
  guestEmail: string;
  roomTypeSlug?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  amountInInr?: number | null;
}

/**
 * Sends the "your payment was captured" confirmation email. Resolves
 * silently (after logging) if RESEND_API_KEY is not configured, rather than
 * throwing — callers (the Razorpay webhook handler) wrap this in their own
 * try/catch as an extra safety net, but this function is designed to never
 * need it to.
 */
export async function sendBookingConfirmationEmail(booking: BookingEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[booking] RESEND_API_KEY not set — skipping confirmation email for booking ${booking.reference}.`,
    );
    return;
  }

  const category = booking.roomTypeSlug ? getAccommodationCategory(booking.roomTypeSlug) : undefined;
  const roomName = category?.name ?? "your room";

  const resend = new Resend(apiKey);

  // TODO: replace with a verified sending domain/address before launch.
  await resend.emails.send({
    from: "JW Marriott Mussoorie Walnut Grove <reservations@jwmarriottmussoorie.example>",
    to: booking.guestEmail,
    subject: `Booking confirmed — ${booking.reference}`,
    html: `
      <div style="font-family: Georgia, serif; color: #2a2622; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #3b2a20; font-size: 20px;">Your stay is confirmed</h1>
        <p>Dear ${booking.guestName},</p>
        <p>Thank you for booking with JW Marriott Mussoorie Walnut Grove Resort &amp; Spa. Your payment has been received and your reservation is confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 4px 0; color: #8c8478;">Reference</td><td style="padding: 4px 0; text-align: right;"><strong>${booking.reference}</strong></td></tr>
          <tr><td style="padding: 4px 0; color: #8c8478;">Room</td><td style="padding: 4px 0; text-align: right;">${roomName}</td></tr>
          ${booking.checkIn ? `<tr><td style="padding: 4px 0; color: #8c8478;">Check-in</td><td style="padding: 4px 0; text-align: right;">${booking.checkIn}</td></tr>` : ""}
          ${booking.checkOut ? `<tr><td style="padding: 4px 0; color: #8c8478;">Check-out</td><td style="padding: 4px 0; text-align: right;">${booking.checkOut}</td></tr>` : ""}
          ${typeof booking.amountInInr === "number" ? `<tr><td style="padding: 4px 0; color: #8c8478;">Amount paid</td><td style="padding: 4px 0; text-align: right;">${formatInr(booking.amountInInr)}</td></tr>` : ""}
        </table>
        <p>You can view your booking anytime at /booking/${booking.reference}.</p>
        <p>We look forward to welcoming you.</p>
      </div>
    `,
  });
}
