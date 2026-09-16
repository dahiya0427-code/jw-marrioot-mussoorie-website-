"use client";

import { ACCOMMODATION_CATEGORIES } from "@/lib/accommodation";
import { formatInr, getIndicativeNightlyRate } from "@/lib/booking";
import { Button } from "@/components/ui/Button";

export interface RoomDatesStepProps {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onChangeRoom: (slug: string) => void;
  onChangeDates: (checkIn: string, checkOut: string) => void;
  onChangeOccupancy: (adults: number, children: number) => void;
  onNext: () => void;
}

export function RoomDatesStep({
  roomSlug,
  checkIn,
  checkOut,
  adults,
  children,
  onChangeRoom,
  onChangeDates,
  onChangeOccupancy,
  onNext,
}: RoomDatesStepProps) {
  const today = new Date().toISOString().slice(0, 10);
  const datesValid = Boolean(checkIn && checkOut && checkIn < checkOut && checkIn >= today);
  const isValid = Boolean(roomSlug) && datesValid;

  return (
    <div>
      <h2 className="font-display text-2xl text-walnut-brown">Select your room &amp; dates</h2>
      <p className="mt-1 font-sans text-sm text-charcoal-ink/70">
        Choose a category, then your check-in and check-out dates.
      </p>

      <div className="mt-6 space-y-3">
        {ACCOMMODATION_CATEGORIES.map((category) => {
          const rate = getIndicativeNightlyRate(category.slug);
          const selected = category.slug === roomSlug;
          return (
            <label
              key={category.slug}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
                selected ? "border-champagne-gold bg-warm-sand" : "border-hairline hover:border-champagne-gold/50"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="room"
                  value={category.slug}
                  checked={selected}
                  onChange={() => onChangeRoom(category.slug)}
                  className="h-4 w-4 accent-champagne-gold"
                />
                <span>
                  <span className="block font-display text-base text-walnut-brown">{category.name}</span>
                  <span className="block font-sans text-xs text-charcoal-ink/60">{category.viewType}</span>
                </span>
              </span>
              <span className="text-right font-sans text-sm text-charcoal-ink">
                <span className="block font-semibold">{formatInr(rate)}</span>
                <span className="block text-[0.65rem] text-soft-grey">per night, indicative*</span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-2 font-sans text-[0.65rem] text-soft-grey">
        *Indicative rate shown for illustration only — the confirmed rate is provided by our reservations team ahead
        of payment.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="checkIn" className="font-sans text-sm text-charcoal-ink">
            Check-in
          </label>
          <input
            id="checkIn"
            type="date"
            min={today}
            value={checkIn}
            onChange={(event) => onChangeDates(event.target.value, checkOut)}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="font-sans text-sm text-charcoal-ink">
            Check-out
          </label>
          <input
            id="checkOut"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(event) => onChangeDates(checkIn, event.target.value)}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="adults" className="font-sans text-sm text-charcoal-ink">
            Adults
          </label>
          <input
            id="adults"
            type="number"
            min={1}
            max={6}
            value={adults}
            onChange={(event) => onChangeOccupancy(Number(event.target.value) || 1, children)}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="children" className="font-sans text-sm text-charcoal-ink">
            Children
          </label>
          <input
            id="children"
            type="number"
            min={0}
            max={4}
            value={children}
            onChange={(event) => onChangeOccupancy(adults, Number(event.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-hairline bg-ivory-mist px-4 py-2.5 font-sans text-sm text-charcoal-ink focus:border-champagne-gold focus:outline-none"
          />
        </div>
      </div>

      {checkIn && checkOut && !datesValid ? (
        <p className="mt-3 font-sans text-xs text-alert-rust">
          Check-out must be after check-in, and dates must not be in the past.
        </p>
      ) : null}

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue to add-ons
        </Button>
      </div>
    </div>
  );
}
