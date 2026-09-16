import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ACCOMMODATION_CATEGORIES } from "@/lib/accommodation";

export const metadata: Metadata = {
  title: "Book Your Stay | JW Marriott Mussoorie Walnut Grove Resort & Spa",
  description:
    "Reserve your room or suite at JW Marriott Mussoorie Walnut Grove Resort & Spa — a simple, secure booking flow with no account required.",
};

interface BookPageProps {
  searchParams: Promise<{ room?: string }>;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const { room } = await searchParams;
  const initialRoomSlug =
    room && ACCOMMODATION_CATEGORIES.some((category) => category.slug === room) ? room : undefined;

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book your stay"
        subhead="A simple, secure way to reserve your room or suite — no account required."
      />
      <div className="bg-ivory-mist">
        <BookingWizard initialRoomSlug={initialRoomSlug} />
      </div>
    </>
  );
}
