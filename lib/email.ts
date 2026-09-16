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

export interface ConsultationEmailPayload {
  name: string;
  email: string;
  phone?: string | null;
  enquiryType: "weddings-events" | "spa-wellness" | "general-corporate";
  message?: string | null;
}

const ENQUIRY_TYPE_LABEL: Record<ConsultationEmailPayload["enquiryType"], string> = {
  "weddings-events": "Weddings & Events",
  "spa-wellness": "Spa & Wellness",
  "general-corporate": "General enquiry",
};

/**
 * Sends the "we've received your enquiry" acknowledgement to the guest who
 * submitted a consultation request (contact / events / spa forms). Same
 * best-effort contract as sendBookingConfirmationEmail — never throws for a
 * missing RESEND_API_KEY, and callers should still wrap this defensively.
 */
export async function sendConsultationAcknowledgementEmail(
  request: ConsultationEmailPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[consultation] RESEND_API_KEY not set — skipping acknowledgement email for ${request.email}.`,
    );
    return;
  }

  const resend = new Resend(apiKey);
  const typeLabel = ENQUIRY_TYPE_LABEL[request.enquiryType] ?? "General enquiry";

  // TODO: replace with a verified sending domain/address before launch.
  await resend.emails.send({
    from: "JW Marriott Mussoorie Walnut Grove <reservations@jwmarriottmussoorie.example>",
    to: request.email,
    subject: `We've received your enquiry — JW Marriott Mussoorie Walnut Grove`,
    html: `
      <div style="font-family: Georgia, serif; color: #2a2622; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #3b2a20; font-size: 20px;">Thank you, ${request.name}</h1>
        <p>We've received your ${typeLabel.toLowerCase()} enquiry and a member of our team will be in touch within 24 hours.</p>
        ${request.message ? `<p style="color: #8c8478;">Your message: &ldquo;${request.message}&rdquo;</p>` : ""}
        <p>We look forward to welcoming you to JW Marriott Mussoorie Walnut Grove Resort &amp; Spa.</p>
      </div>
    `,
  });
}

/**
 * Best-effort internal notification for staff when a new consultation
 * request comes in. Distinct from the guest acknowledgement above: this one
 * additionally requires STAFF_NOTIFICATION_EMAIL to be configured (an env
 * var left as an empty placeholder until a real internal address exists),
 * and skips silently — logging why — if either that or RESEND_API_KEY is
 * missing. The Payload document itself (not this email) is the source of
 * truth for staff follow-up.
 */
export async function sendConsultationStaffNotificationEmail(
  request: ConsultationEmailPayload & { department: "sales" | "spa-reservations" },
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL;

  if (!apiKey) {
    console.log("[consultation] RESEND_API_KEY not set — skipping internal staff notification.");
    return;
  }
  if (!staffEmail) {
    console.log(
      "[consultation] STAFF_NOTIFICATION_EMAIL not set — skipping internal staff notification.",
    );
    return;
  }

  const resend = new Resend(apiKey);
  const typeLabel = ENQUIRY_TYPE_LABEL[request.enquiryType] ?? "General enquiry";

  await resend.emails.send({
    from: "JW Marriott Mussoorie Walnut Grove <reservations@jwmarriottmussoorie.example>",
    to: staffEmail,
    subject: `New ${typeLabel} enquiry — ${request.name} (routed to ${request.department})`,
    html: `
      <div style="font-family: sans-serif; color: #2a2622; max-width: 480px; margin: 0 auto;">
        <h1 style="font-size: 18px;">New consultation request</h1>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0;">
          <tr><td style="padding: 4px 0; color: #8c8478;">Type</td><td style="padding: 4px 0; text-align: right;">${typeLabel}</td></tr>
          <tr><td style="padding: 4px 0; color: #8c8478;">Routed to</td><td style="padding: 4px 0; text-align: right;">${request.department}</td></tr>
          <tr><td style="padding: 4px 0; color: #8c8478;">Name</td><td style="padding: 4px 0; text-align: right;">${request.name}</td></tr>
          <tr><td style="padding: 4px 0; color: #8c8478;">Email</td><td style="padding: 4px 0; text-align: right;">${request.email}</td></tr>
          ${request.phone ? `<tr><td style="padding: 4px 0; color: #8c8478;">Phone</td><td style="padding: 4px 0; text-align: right;">${request.phone}</td></tr>` : ""}
        </table>
        ${request.message ? `<p style="color: #8c8478;">Message: &ldquo;${request.message}&rdquo;</p>` : ""}
        <p>View and manage this request in the admin panel under Consultation Requests.</p>
      </div>
    `,
  });
}
