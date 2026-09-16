import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  PROPERTY_ADDRESS_LINES,
  PROPERTY_NAME,
  PROPERTY_PHONE_DISPLAY,
  PROPERTY_PHONE_HREF,
} from "@/lib/property";

const SITEMAP_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Dining", href: "/dining" },
      { label: "Facilities", href: "/facilities" },
      { label: "Experiences", href: "/experiences" },
    ],
  },
  {
    heading: "Plan",
    links: [
      { label: "Events (Weddings & MICE)", href: "/events" },
      { label: "Offers", href: "/offers" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Use", href: "/legal/terms-of-use" },
      { label: "Booking & Cancellation Policy", href: "/legal/booking-policy" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
    ],
  },
];

const SOCIAL_LINKS = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

export function Footer() {
  return (
    <footer className="bg-walnut-brown text-ivory-mist">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* NAP block */}
          <div className="lg:col-span-2">
            <p className="font-display text-xl text-ivory-mist">{PROPERTY_NAME}</p>
            <address className="mt-4 space-y-1 font-sans text-sm text-ivory-mist/80 not-italic">
              {PROPERTY_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={PROPERTY_PHONE_HREF}
              className="mt-3 inline-block font-sans text-sm text-champagne-gold hover:underline"
            >
              {PROPERTY_PHONE_DISPLAY}
            </a>

            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((label) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory-mist/30 font-sans text-[0.65rem] uppercase text-ivory-mist/70"
                >
                  {label.slice(0, 2)}
                </span>
              ))}
            </div>
          </div>

          {SITEMAP_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-ivory-mist/80 hover:text-ivory-mist"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter stub */}
          <div>
            <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
              Stay in touch
            </p>
            <p className="mt-4 font-sans text-sm text-ivory-mist/80">
              Occasional notes on offers and seasonal experiences.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 border-t border-ivory-mist/15 pt-6 font-sans text-xs text-ivory-mist/60">
          <p>
            &copy; {new Date().getFullYear()} {PROPERTY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
