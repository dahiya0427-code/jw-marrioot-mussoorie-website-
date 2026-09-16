"use client";

// Non-functional UI stub for now — no backend wiring yet.
export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex flex-col gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        placeholder="Your email"
        className="rounded-full border border-ivory-mist/30 bg-transparent px-4 py-2 font-sans text-sm text-ivory-mist placeholder:text-ivory-mist/50 focus:border-champagne-gold focus:outline-none"
      />
      <button type="submit" className="btn-pill bg-champagne-gold text-walnut-brown hover:opacity-90">
        Subscribe
      </button>
    </form>
  );
}
