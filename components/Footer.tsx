import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CursorImageTrail } from "@/components/CursorImageTrail";
import { LotusMarkIcon } from "@/components/ui/icons";
import {
  PROPERTY_ADDRESS_LINES,
  PROPERTY_NAME,
  PROPERTY_PHONE_DISPLAY,
  PROPERTY_PHONE_HREF,
} from "@/lib/property";

const NAV_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Weddings & events", href: "/events" },
  { label: "Rooms & suites", href: "/accommodation" },
  { label: "Dining", href: "/dining" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Booking & Cancellation Policy", href: "/legal/booking-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

const SOCIAL_LINKS = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

function ColumnLabel({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full bg-ivory-mist/10 px-3 py-1 font-sans text-[0.65rem] tracking-[0.15em] text-champagne-gold uppercase">
      {children}
    </span>
  );
}

export function Footer() {
  return (
    <CursorImageTrail className="overflow-hidden bg-walnut-brown text-ivory-mist">
      <footer className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Wordmark, tagline, CTA */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <LotusMarkIcon className="h-9 w-9 shrink-0 text-champagne-gold" strokeWidth={1.1} />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-2xl text-ivory-mist">JW Marriott</span>
                <span className="font-sans text-xs tracking-[0.2em] text-ivory-mist/60 uppercase">
                  Mussoorie Walnut Grove
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-display text-2xl text-ivory-mist/90 italic">
              Find your stillness in the Garhwal hills
            </p>
            <Link href="/offers" className="btn-pill mt-6 inline-flex bg-champagne-gold text-walnut-brown hover:opacity-90">
              Get a best deal
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <ColumnLabel>Navigation</ColumnLabel>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 font-sans text-sm text-ivory-mist/80 transition-colors hover:text-champagne-gold"
                  >
                    {link.label}
                    <span aria-hidden="true">&#8599;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnLabel>Contact</ColumnLabel>
            <div className="mt-5 space-y-4">
              <a
                href={PROPERTY_PHONE_HREF}
                className="block font-sans text-sm text-ivory-mist/80 hover:text-champagne-gold"
              >
                {PROPERTY_PHONE_DISPLAY}
              </a>
              <address className="space-y-1 font-sans text-sm text-ivory-mist/80 not-italic">
                {PROPERTY_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="flex gap-3 pt-1">
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

              <div className="pt-2">
                <p className="font-sans text-xs tracking-[0.1em] text-ivory-mist/50 uppercase">Stay in touch</p>
                <div className="mt-2">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Giant faded watermark wordmark */}
        <div aria-hidden="true" className="mt-16 -mb-2 overflow-hidden text-center select-none">
          <p className="font-display text-[16vw] leading-none whitespace-nowrap text-ivory-mist/[0.06] sm:text-8xl lg:text-9xl">
            JW Marriott
          </p>
        </div>

        {/* Legal + copyright */}
        <div className="mt-8 flex flex-col gap-4 border-t border-ivory-mist/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-ivory-mist/60 hover:text-ivory-mist"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 font-sans text-xs text-ivory-mist/60 sm:items-end">
            <p>
              &copy; {new Date().getFullYear()} {PROPERTY_NAME}. All rights reserved.
            </p>
            <p>
              Website by{" "}
              <a
                href="https://pehchaandigital.com/"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 hover:text-champagne-gold"
              >
                Pehchaan Digital
              </a>
            </p>
          </div>
        </div>
      </footer>
    </CursorImageTrail>
  );
}
