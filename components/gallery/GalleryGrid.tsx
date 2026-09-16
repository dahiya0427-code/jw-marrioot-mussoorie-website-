"use client";

import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
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
 * lightbox (no external gallery/lightbox package). Every tile is an
 * <ImagePlaceholder> — swap for real <Image>/Payload media once licensed
 * photography exists.
 */
export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(ALL_FILTER);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === ALL_FILTER
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (!selectedItem) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedItem(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

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
              onClick={() => setActiveFilter(filter)}
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
        {filteredItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedItem(item)}
            aria-label={`View larger image: ${item.label}`}
            className="group overflow-hidden rounded-2xl border border-hairline text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold"
          >
            <ImagePlaceholder
              aspect="aspect-square"
              variant={item.variant}
              label={item.label}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="mt-10 text-center font-sans text-sm text-charcoal-ink/60">
          No images in this category yet.
        </p>
      ) : null}

      {/* Lightbox */}
      {selectedItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.label}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-ink/90 p-4 sm:p-8"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl"
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
              className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory-mist text-xl leading-none text-walnut-brown shadow-lg hover:opacity-90 sm:-top-5 sm:-right-5"
            >
              &times;
            </button>
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant={selectedItem.variant}
              label={selectedItem.label}
              className="rounded-2xl"
            />
            <p className="mt-4 text-center font-sans text-sm tracking-[0.1em] text-ivory-mist/80 uppercase">
              {selectedItem.label}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
