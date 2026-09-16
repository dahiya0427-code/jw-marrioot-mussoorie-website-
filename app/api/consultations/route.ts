// POST /api/consultations
//
// Guest-submitted enquiry intake for all three PRD §4.5 enquiry types —
// Weddings & Events RFP, Spa & Wellness consultation, and General/Corporate
// enquiry — routed to Sales or Spa/Reservations respectively. Backs the
// ContactForm (general + spa, via an enquiryType selector) and
// EventEnquiryForm (weddings/MICE) client components.
//
// Mirrors the pattern established by POST /api/bookings: validate, write via
// Payload's local API (which bypasses the staff-only access control on
// ConsultationRequests — see the access-control comment in
// collections/ConsultationRequests.ts), then best-effort email. The DB write
// is what matters for staff follow-up; email is a nice-to-have that degrades
// gracefully when RESEND_API_KEY / STAFF_NOTIFICATION_EMAIL aren't set.
import { NextResponse, type NextRequest } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  sendConsultationAcknowledgementEmail,
  sendConsultationStaffNotificationEmail,
} from "@/lib/email";

type EnquiryType = "weddings-events" | "spa-wellness" | "general-corporate";

const ENQUIRY_TYPES: EnquiryType[] = ["weddings-events", "spa-wellness", "general-corporate"];

const DEPARTMENT_BY_ENQUIRY_TYPE: Record<EnquiryType, "sales" | "spa-reservations"> = {
  "weddings-events": "sales",
  "spa-wellness": "spa-reservations",
  "general-corporate": "sales",
};

interface ConsultationRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  enquiryType?: string;
  subject?: string;
  eventType?: string;
  preferredDate?: string;
  guestCount?: number;
  message?: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: ConsultationRequestBody;
  try {
    body = await request.json();
  } catch {
    return badRequest("Request body must be valid JSON.");
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const enquiryType = body.enquiryType as EnquiryType | undefined;
  const subject = body.subject?.trim();
  const eventType = body.eventType?.trim();
  const message = body.message?.trim();
  const source = body.source?.trim();

  if (!name || name.length < 2) {
    return badRequest("Your name is required.");
  }
  if (!email || !EMAIL_RE.test(email)) {
    return badRequest("A valid email address is required.");
  }
  if (!enquiryType || !ENQUIRY_TYPES.includes(enquiryType)) {
    return badRequest("A valid enquiry type is required.");
  }

  let preferredDate: string | undefined;
  if (body.preferredDate) {
    const parsed = new Date(body.preferredDate);
    if (Number.isNaN(parsed.getTime())) {
      return badRequest("Preferred date is invalid.");
    }
    preferredDate = parsed.toISOString();
  }

  let guestCount: number | undefined;
  if (body.guestCount !== undefined && body.guestCount !== null && `${body.guestCount}` !== "") {
    const parsed = Number(body.guestCount);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return badRequest("Guest count must be a non-negative number.");
    }
    guestCount = parsed;
  }

  const department = DEPARTMENT_BY_ENQUIRY_TYPE[enquiryType];

  // --- Create the consultation request document (status: new) ------------
  let payload;
  try {
    payload = await getPayload({ config });
  } catch (err) {
    console.error("[api/consultations] Failed to initialize Payload", err);
    return NextResponse.json(
      {
        error:
          "We couldn't reach our reservations database. Please try again in a few minutes or contact the resort directly.",
      },
      { status: 500 },
    );
  }

  try {
    await payload.create({
      collection: "consultation-requests",
      data: {
        name,
        email,
        phone: phone || undefined,
        enquiryType,
        department,
        subject: subject || undefined,
        eventType: eventType || undefined,
        preferredDate,
        guestCount,
        message: message || undefined,
        source: source || undefined,
        status: "new",
      },
    });
  } catch (err) {
    console.error("[api/consultations] Failed to create consultation request document", err);
    return NextResponse.json(
      {
        error:
          "We couldn't reach our reservations database. Please try again in a few minutes or contact the resort directly.",
      },
      { status: 500 },
    );
  }

  // --- Best-effort email (guest acknowledgement + internal notification) --
  // Never let email failures affect the guest-facing success response — the
  // document above is already persisted for staff follow-up.
  try {
    await sendConsultationAcknowledgementEmail({ name, email, phone, enquiryType, message });
  } catch (err) {
    console.error("[api/consultations] Failed to send guest acknowledgement email", err);
  }

  try {
    await sendConsultationStaffNotificationEmail({
      name,
      email,
      phone,
      enquiryType,
      message,
      department,
    });
  } catch (err) {
    console.error("[api/consultations] Failed to send internal staff notification email", err);
  }

  return NextResponse.json({ success: true });
}
