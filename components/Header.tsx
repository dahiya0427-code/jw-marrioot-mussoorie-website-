"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export interface NavItem {
  label: string;
  href: string;
}

// Full site nav, in order. "Events" covers weddings & MICE (kept short here
// for header width; the /events page headline spells the full scope out).
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Dining", href: "/dining" },
  { label: "Facilities", href: "/facilities" },
  { label: "Experiences", href: "/experiences" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex flex-col leading-tight">
      <span className="font-display text-xl text-walnut-brown sm:text-2xl">
        JW Marriott
      </span>
      <span className="font-sans text-[0.65rem] tracking-[0.2em] text-soft-grey uppercase sm:text-xs">
        Mussoorie Walnut Grove
      </span>
    </Link>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hairline bg-ivory-mist/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 xl:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label === "Events" ? "Events — weddings & MICE" : undefined}
              className="font-sans text-sm text-charcoal-ink transition-colors hover:text-champagne-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/book" variant="primary" className="hidden sm:inline-flex">
            Book Now
          </Button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-hairline xl:hidden"
          >
            <span className="block h-0.5 w-5 bg-walnut-brown" />
            <span className="block h-0.5 w-5 bg-walnut-brown" />
            <span className="block h-0.5 w-5 bg-walnut-brown" />
          </button>
        </div>
      </div>
      </header>

      {/*
        Mobile / tablet slide-out drawer — deliberately a SIBLING of
        <header>, not a descendant. The header has `backdrop-blur`
        (backdrop-filter), which per spec makes it the containing block
        for any `position: fixed` descendant. Nesting this fixed overlay
        inside the header collapsed it to the header's own ~65px height
        instead of the full viewport. Keeping it outside avoids that.
      */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!isMenuOpen}
      >
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-charcoal-ink/40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 right-0 flex h-full w-full max-w-sm flex-col bg-ivory-mist shadow-xl transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <Wordmark />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline font-sans text-xl text-walnut-brown"
            >
              &times;
            </button>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 font-sans text-base text-charcoal-ink hover:bg-warm-sand"
              >
                {item.label === "Events" ? "Events (Weddings & MICE)" : item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-hairline px-5 py-5">
            <Button href="/book" variant="primary" className="w-full">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
