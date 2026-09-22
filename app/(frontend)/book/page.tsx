import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ACCOMMODATION_CATEGORIES } from "@/lib/accommodation";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Reserve your room or suite at JW Marriott Mussoorie Walnut Grove Resort & Spa — a simple, secure booking flow with no account required.",
};

interface BookPageProps {
  searchParams: Promise<{ room?: string; checkIn?: string; checkOut?: string }>;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export default async function BookPage({ searchParams }: BookPageProps) {
  const { room, checkIn, checkOut } = await searchParams;
  const initialRoomSlug =
    room && ACCOMMODATION_CATEGORIES.some((category) => category.slug === room) ? room : undefined;
  const datesValid = Boolean(
    checkIn && checkOut && ISO_DATE.test(checkIn) && ISO_DATE.test(checkOut) && checkIn < checkOut,
  );

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book your stay"
        subhead="A simple, secure way to reserve your room or suite — no account required."
      />
      <div className="bg-ivory-mist">
        <BookingWizard
          initialRoomSlug={initialRoomSlug}
          initialCheckIn={datesValid ? checkIn : undefined}
          initialCheckOut={datesValid ? checkOut : undefined}
        />
      </div>
    </>
  );
}
