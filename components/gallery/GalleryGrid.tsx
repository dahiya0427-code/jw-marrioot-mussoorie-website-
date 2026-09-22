"use client";

import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";

const ALL_FILTER = "All" as const;
type FilterValue = GalleryCategory | typeof ALL_FILTER;

const FILTERS: FilterValue[] = [ALL_FILTER, ...GALLERY_CATEGORIES];

/**
 * Client-side filterable gallery grid with a lightweight, hand-rolled
 * lightbox (no external gallery/lightbox package) — grid tile click opens a
 * full-size viewer with prev/next arrows, an "X of Y" counter, and a
 * caption, navigating within whichever category is currently filtered.
 */
export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(ALL_FILTER);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === ALL_FILTER
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const selectedItem: GalleryItem | null =
    selectedIndex !== null ? (filteredItems[selectedIndex] ?? null) : null;

  function showPrev() {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + filteredItems.length) % filteredItems.length,
    );
  }

  function showNext() {
    setSelectedIndex((current) => (current === null ? null : (current + 1) % filteredItems.length));
  }

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, filteredItems.length]);

  return (
    <div>
      {/* Category filter chips */}
      <div
        role="group"
        aria-label="Filter gallery by category"
        className="flex flex-wrap justify-center gap-3"
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setSelectedIndex(null);
              }}
              aria-pressed={isActive}
              className={`rounded-full border px-5 py-2 font-sans text-sm tracking-wide transition-colors ${
                isActive
                  ? "border-champagne-gold bg-champagne-gold text-walnut-brown"
                  : "border-hairline bg-transparent text-charcoal-ink/70 hover:border-champagne-gold hover:text-walnut-brown"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item, index) => (
          <Reveal key={item.id} delayMs={(index % 4) * 80} direction="zoom">
            <button
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View larger image: ${item.label}`}
              className="group w-full overflow-hidden rounded-2xl border border-hairline text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold"
            >
              <ImagePlaceholder
                aspect="aspect-square"
                variant={item.variant}
                label={item.label}
                src={item.imageSrc}
                alt={`${item.label} — illustrative photo`}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="mt-10 text-center font-sans text-sm text-charcoal-ink/60">
          No images in this category yet.
        </p>
      ) : null}

      {/* Lightbox */}
      {selectedItem && selectedIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.label}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-ink/90 p-4 sm:p-8"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
              className="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory-mist text-xl leading-none text-walnut-brown shadow-lg hover:opacity-90 sm:-top-5 sm:-right-5"
            >
              &times;
            </button>

            {filteredItems.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-mist/90 text-lg text-walnut-brown shadow-lg hover:bg-ivory-mist sm:-left-5"
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-mist/90 text-lg text-walnut-brown shadow-lg hover:bg-ivory-mist sm:-right-5"
                >
                  &rsaquo;
                </button>
              </>
            ) : null}

            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant={selectedItem.variant}
              label={selectedItem.label}
              src={selectedItem.imageSrc}
              alt={`${selectedItem.label} — illustrative photo`}
              className="rounded-2xl"
            />
            <p className="mt-4 text-center font-sans text-sm tracking-[0.1em] text-ivory-mist/80 uppercase">
              {selectedIndex + 1} of {filteredItems.length} &mdash; {selectedItem.label}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
