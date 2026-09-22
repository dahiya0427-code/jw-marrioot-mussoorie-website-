"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ACCOMMODATION_CATEGORIES } from "@/lib/accommodation";
import { CalendarIcon, UsersIcon, BedIcon } from "@/components/ui/icons";

/**
 * Floating "check availability" widget shown beneath the homepage hero.
 * Dates/guests are collected for a considered UX (and forwarded as query
 * params for a future booking-engine integration) but the only param the
 * current /book flow reads is `room` — see lib/accommodation.ts.
 */
export function BookingBar() {
  const router = useRouter();
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults, 1 Room");
  const [room, setRoom] = useState(ACCOMMODATION_CATEGORIES[0]?.slug ?? "");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (room) params.set("room", room);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    router.push(`/book?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-ambient relative mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-hairline bg-ivory-mist p-5 sm:p-6 lg:flex-row lg:items-end lg:gap-3 lg:p-4"
    >
      <div className="flex-1">
        <label
          htmlFor="bb-checkin"
          className="flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.15em] text-soft-grey uppercase"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          Check-in
        </label>
        <input
          id="bb-checkin"
          type="date"
          min={today}
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none focus:ring-2 focus:ring-champagne-gold/20"
        />
      </div>

      <div className="hidden h-10 w-px self-end bg-hairline lg:block" />

      <div className="flex-1">
        <label
          htmlFor="bb-checkout"
          className="flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.15em] text-soft-grey uppercase"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          Check-out
        </label>
        <input
          id="bb-checkout"
          type="date"
          min={checkIn || today}
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none focus:ring-2 focus:ring-champagne-gold/20"
        />
      </div>

      <div className="hidden h-10 w-px self-end bg-hairline lg:block" />

      <div className="flex-1">
        <label
          htmlFor="bb-guests"
          className="flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.15em] text-soft-grey uppercase"
        >
          <UsersIcon className="h-3.5 w-3.5" />
          Guests &amp; rooms
        </label>
        <select
          id="bb-guests"
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none focus:ring-2 focus:ring-champagne-gold/20"
        >
          <option>1 Adult, 1 Room</option>
          <option>2 Adults, 1 Room</option>
          <option>2 Adults + 1 Child, 1 Room</option>
          <option>4 Adults, 2 Rooms</option>
        </select>
      </div>

      <div className="hidden h-10 w-px self-end bg-hairline lg:block" />

      <div className="flex-1">
        <label
          htmlFor="bb-room"
          className="flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.15em] text-soft-grey uppercase"
        >
          <BedIcon className="h-3.5 w-3.5" />
          Room category
        </label>
        <select
          id="bb-room"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none focus:ring-2 focus:ring-champagne-gold/20"
        >
          {ACCOMMODATION_CATEGORIES.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-pill bg-champagne-gold text-walnut-brown hover:opacity-90 lg:shrink-0">
        Check Availability
      </button>
    </form>
  );
}
