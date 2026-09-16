// Read-only, tokenised "manage your booking" view (PRD §4.2). The booking's
// generated `reference` field acts as the access token — no guest login. On
// launch, the guest is given this page's URL rather than needing an account.
//
// TODO: add cancel/modify actions in a later phase — this is a read-only
// status view for now.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { getAccommodationCategory } from "@/lib/accommodation";
import { formatInr, type BookingDoc } from "@/lib/booking";

interface BookingStatusPageProps {
  params: Promise<{ reference: string }>;
}

export async function generateMetadata({ params }: BookingStatusPageProps): Promise<Metadata> {
  const { reference } = await params;
  return { title: `Booking ${reference}` };
}

const STATUS_LABEL: Record<BookingDoc["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  paid: "Paid",
  cancelled: "Cancelled",
};

const STATUS_CLASSES: Record<BookingDoc["status"], string> = {
  pending: "text-info-slate bg-info-slate/10",
  confirmed: "text-confirmation-green bg-confirmation-green/10",
  paid: "text-confirmation-green bg-confirmation-green/10",
  cancelled: "text-alert-rust bg-alert-rust/10",
};

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BookingStatusPage({ params }: BookingStatusPageProps) {
  const { reference } = await params;

  let booking: BookingDoc | null = null;
  let loadError = false;

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "bookings",
      where: { reference: { equals: reference } },
      limit: 1,
    });
    booking = (result.docs[0] as unknown as BookingDoc | undefined) ?? null;
  } catch (err) {
    console.error(`[booking/${reference}] Failed to load booking`, err);
    loadError = true;
  }

  if (!loadError && !booking) {
    notFound();
  }

  const category = booking?.roomTypeSlug ? getAccommodationCategory(booking.roomTypeSlug) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Manage booking"
        title={`Booking ${reference}`}
        subhead="Your reservation status and details — no login required."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {loadError ? (
          <div className="rounded-2xl border border-alert-rust/30 bg-alert-rust/5 p-8 text-center">
            <p className="font-display text-xl text-walnut-brown">We couldn&rsquo;t load this booking right now</p>
            <p className="mt-2 font-sans text-sm text-charcoal-ink/80">
              Please try again shortly, or contact the resort directly with your reference.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/contact" variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        ) : booking ? (
          <div className="rounded-2xl border border-hairline bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-2xl text-walnut-brown">{booking.reference}</p>
              <span
                className={`rounded-full px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide ${STATUS_CLASSES[booking.status] ?? "bg-hairline text-soft-grey"}`}
              >
                {STATUS_LABEL[booking.status] ?? booking.status}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Guest</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink">{booking.guestName}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Room</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink">
                  {category?.name ?? booking.roomTypeSlug ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Check-in</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink">{formatDate(booking.checkIn)}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Check-out</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink">{formatDate(booking.checkOut)}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Guests</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink">
                  {booking.adults ?? "—"} adult{booking.adults === 1 ? "" : "s"}
                  {booking.children ? `, ${booking.children} child${booking.children === 1 ? "" : "ren"}` : ""}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Total amount</dt>
                <dd className="mt-1 font-sans text-sm text-charcoal-ink">
                  {typeof booking.amountInInr === "number" ? formatInr(booking.amountInInr) : "—"}
                </dd>
              </div>
            </dl>

            {booking.addOns && booking.addOns.length > 0 ? (
              <div className="mt-6 border-t border-hairline pt-6">
                <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">Add-ons</p>
                <ul className="mt-2 space-y-1">
                  {booking.addOns.map((addOn, index) => (
                    <li key={index} className="flex justify-between font-sans text-sm text-charcoal-ink/80">
                      <span>{addOn.label}</span>
                      <span>{typeof addOn.priceInInr === "number" ? formatInr(addOn.priceInInr) : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {booking.notes ? (
              <div className="mt-6 border-t border-hairline pt-6">
                <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
                  Special requests
                </p>
                <p className="mt-1 font-sans text-sm text-charcoal-ink/80">{booking.notes}</p>
              </div>
            ) : null}

            {/* TODO: add cancel/modify actions in a later phase — this is a
               read-only status view for now. */}

            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="outline">
                Need to make a change? Contact us
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
