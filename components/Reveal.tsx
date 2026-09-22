"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "zoom" | "fade";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay (ms) before the reveal starts, for staggering a group of items. */
  delayMs?: number;
  /** Which way the element travels in from. Defaults to "up". */
  direction?: RevealDirection;
}

const HIDDEN_CLASSES: Record<RevealDirection, string> = {
  up: "opacity-0 translate-y-8",
  down: "opacity-0 -translate-y-8",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  zoom: "opacity-0 scale-90",
  fade: "opacity-0",
};

const VISIBLE_CLASSES: Record<RevealDirection, string> = {
  up: "opacity-100 translate-y-0",
  down: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  zoom: "opacity-100 scale-100",
  fade: "opacity-100",
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Animates its children into place the first time they scroll into view,
 * using IntersectionObserver rather than a scroll-position calculation
 * (cheaper, and doesn't fight the fixed header's own scroll listener in
 * Header.tsx). Stops observing after the first reveal — this is a one-time
 * entrance, not a re-triggering scroll effect. `direction` picks which way
 * it travels in from, so a page can mix "up"/"left"/"right"/"zoom"/"fade"
 * across sections instead of every block using the same motion. Honors
 * prefers-reduced-motion by starting already revealed, computed up front
 * via lazy state init rather than toggled inside the effect.
 */
export function Reveal({ children, className = "", delayMs = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? VISIBLE_CLASSES[direction] : HIDDEN_CLASSES[direction]
      } ${className}`.trim()}
      style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
