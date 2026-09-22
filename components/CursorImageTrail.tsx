"use client";

import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  src: string;
}

// A small, varied set of already-curated photos (see lib/stockPhotos.ts) —
// just enough to feel like a shuffled sneak peek of the resort as the
// cursor moves, not a full gallery.
const TRAIL_IMAGES = [
  STOCK_PHOTOS.roomDeluxe,
  STOCK_PHOTOS.roomLuxurySuite,
  STOCK_PHOTOS.diningTroutHouse,
  STOCK_PHOTOS.spaTreatmentRoom,
  STOCK_PHOTOS.weddingOutdoorLawn,
  STOCK_PHOTOS.spaIndoorPool,
];

const SPAWN_THROTTLE_MS = 220;
const LIFETIME_MS = 2000;

/**
 * Wraps its children with a "magic" cursor trail: as the mouse moves over
 * the wrapped area, small square photo tiles pop up at the cursor position
 * and fade out ~2s later. The mousemove listener lives on this outer,
 * normally-interactive wrapper (so links/buttons inside keep working); the
 * tiles themselves render in a `pointer-events-none` layer on top so they
 * never intercept clicks. Desktop/pointer-driven only — see the `hidden
 * lg:block` on the trail layer.
 */
export function CursorImageTrail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const nextIdRef = useRef(0);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < SPAWN_THROTTLE_MS) return;
    lastSpawnRef.current = now;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const id = nextIdRef.current++;
    const src = TRAIL_IMAGES[Math.floor(Math.random() * TRAIL_IMAGES.length)];

    setTrail((current) => [
      ...current.slice(-8),
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top, src },
    ]);

    window.setTimeout(() => {
      setTrail((current) => current.filter((item) => item.id !== id));
    }, LIFETIME_MS);
  }, []);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className={`relative ${className}`.trim()}>
      {children}
      <div
        className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden lg:block"
        aria-hidden="true"
      >
        {trail.map((item) => (
          <div
            key={item.id}
            className="animate-trail-pop absolute h-16 w-16 overflow-hidden rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
            style={{ left: item.x, top: item.y }}
          >
            <ImagePlaceholder aspect="aspect-square" variant="sand" src={item.src} alt="" className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
