"use client";

import { useRef, useState, type ReactNode } from "react";

export interface MobileCarouselProps {
  items: ReactNode[];
  className?: string;
}

/**
 * Swipeable, one-card-at-a-time carousel with prev/next arrows and a
 * progress bar — used only below the `sm` breakpoint (see call sites, which
 * pair this with a `hidden sm:grid` version of the same items for tablet/
 * desktop). CSS scroll-snap drives the actual swipe/scroll; the buttons and
 * progress bar just read and adjust that same scroll position, so touch
 * swiping and the arrows stay in sync.
 */
export function MobileCarousel({ items, className = "" }: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function scrollToIndex(target: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(items.length - 1, target));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    setIndex(clamped);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let closestDistance = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setIndex(closest);
  }

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={i} className="w-[86%] shrink-0 snap-center">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 px-4">
        <button
          type="button"
          onClick={() => scrollToIndex(index - 1)}
          aria-label="Previous"
          disabled={index === 0}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-walnut-brown transition-opacity disabled:opacity-30"
        >
          &#8249;
        </button>
        <div className="h-1 w-full max-w-[160px] overflow-hidden rounded-full bg-hairline">
          <div
            className="h-full rounded-full bg-walnut-brown transition-all duration-300"
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
        <button
          type="button"
          onClick={() => scrollToIndex(index + 1)}
          aria-label="Next"
          disabled={index === items.length - 1}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-walnut-brown transition-opacity disabled:opacity-30"
        >
          &#8250;
        </button>
      </div>

      <p className="mt-2 text-center font-sans text-xs tracking-[0.1em] text-soft-grey">
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </p>
    </div>
  );
}
