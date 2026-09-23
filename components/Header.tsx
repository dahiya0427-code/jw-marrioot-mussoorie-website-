"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Ticker } from "@/components/Ticker";
import { LotusMarkIcon, PhoneIcon } from "@/components/ui/icons";
import { PROPERTY_PHONE_DISPLAY, PROPERTY_PHONE_HREF } from "@/lib/property";

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

function Wordmark({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
      <LotusMarkIcon
        className={`h-8 w-8 shrink-0 ${scrolled ? "text-champagne-gold" : "text-ivory-mist"}`}
        strokeWidth={1.2}
      />
      <span className="flex flex-col leading-tight">
        <span
          className={`font-display text-lg sm:text-2xl ${scrolled ? "text-walnut-brown" : "text-ivory-mist"}`}
        >
          JW Marriott
        </span>
        <span
          className={`font-sans text-[0.6rem] tracking-[0.15em] uppercase sm:text-xs ${scrolled ? "text-soft-grey" : "text-ivory-mist/70"}`}
        >
          Mussoorie Walnut Grove
        </span>
      </span>
    </Link>
  );
}

/**
 * Fixed, always-on-top header. Every page opens on a tall photo hero (see
 * PageHero / the homepage's own hero), so the header starts transparent
 * with pill-shaped, glass-style nav — floating over that photo — and
 * solidifies to an opaque ivory bar once the page scrolls past it. The
 * announcement ticker rides along as the header's own top row so the two
 * move as one fixed unit instead of the ticker scrolling away separately.
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 64);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <Ticker />
        <header
          className={`transition-colors duration-300 ${
            scrolled
              ? "border-b border-hairline bg-ivory-mist/95 shadow-sm backdrop-blur"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Wordmark scrolled={scrolled} />

            <nav aria-label="Primary" className="hidden items-center gap-1.5 xl:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label === "Events" ? "Events — weddings & MICE" : undefined}
                  className={`rounded-full border px-2.5 py-1.5 font-sans text-[13px] whitespace-nowrap transition-colors ${
                    scrolled
                      ? "border-transparent text-charcoal-ink hover:border-hairline hover:bg-warm-sand"
                      : "border-ivory-mist/10 bg-charcoal-ink/50 text-ivory-mist shadow-[0_1px_4px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-charcoal-ink/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={PROPERTY_PHONE_HREF}
                title={PROPERTY_PHONE_DISPLAY}
                className={`btn-pill hidden items-center gap-2 sm:inline-flex ${
                  scrolled
                    ? "bg-champagne-gold text-walnut-brown hover:opacity-90"
                    : "border border-ivory-mist/15 bg-charcoal-ink/50 text-ivory-mist shadow-[0_1px_4px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-charcoal-ink/70"
                }`}
              >
                <PhoneIcon className="h-4 w-4" strokeWidth={2} />
                Call Now
              </a>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className={`inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border xl:hidden ${
                  scrolled ? "border-hairline" : "border-ivory-mist/15 bg-charcoal-ink/50 shadow-[0_1px_4px_rgba(0,0,0,0.35)] backdrop-blur-md"
                }`}
              >
                <span className={`block h-0.5 w-5 ${scrolled ? "bg-walnut-brown" : "bg-ivory-mist"}`} />
                <span className={`block h-0.5 w-5 ${scrolled ? "bg-walnut-brown" : "bg-ivory-mist"}`} />
                <span className={`block h-0.5 w-5 ${scrolled ? "bg-walnut-brown" : "bg-ivory-mist"}`} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/*
        Mobile / tablet slide-out drawer — deliberately a SIBLING of the
        fixed header block, not a descendant. The header has `backdrop-blur`
        (backdrop-filter), which per spec makes it the containing block
        for any `position: fixed` descendant. Nesting this fixed overlay
        inside the header collapsed it to the header's own ~65px height
        instead of the full viewport. Keeping it outside avoids that.
      */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden xl:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}
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
            <Wordmark scrolled />
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

          <div className="flex flex-col gap-3 border-t border-hairline px-5 py-5">
            <Button href="/book" variant="primary" className="w-full">
              Book Now
            </Button>
            <a
              href={PROPERTY_PHONE_HREF}
              className="btn-pill w-full items-center justify-center gap-2 border border-walnut-brown bg-transparent text-walnut-brown hover:bg-warm-sand"
            >
              <PhoneIcon className="h-4 w-4" strokeWidth={2} />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
