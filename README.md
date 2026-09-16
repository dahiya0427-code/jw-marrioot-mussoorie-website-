# JW Marriott Mussoorie Walnut Grove Resort & Spa — Website

This repo contains the **technical foundation** (Phase 2 of the approved PRD) for the
hospitality website. It is deliberately a *scaffold*: collections have minimal fields,
there is no real content, and no payment/email integration logic has been wired up yet.
That all lands in later phases.

## What's been scaffolded

- **Next.js (App Router, TypeScript)** — created with `create-next-app`, using two root
  route groups:
  - `app/(frontend)` — the public marketing site (fonts, brand tokens, homepage placeholder).
  - `app/(payload)` — the Payload admin panel (`/admin`) and its REST/GraphQL API routes.
- **Payload CMS 3.x**, installed natively inside the Next.js app (not a separate service),
  configured in `payload.config.ts` at the project root.
- **Postgres via `@payloadcms/db-postgres`**, targeting Neon. Connection is read from the
  `DATABASE_URI` env var (Neon's pooled connection string works directly — it's
  Postgres-wire-compatible).
- **Tailwind CSS v4**, configured CSS-first in `app/(frontend)/globals.css` with the full
  brand color palette exposed as both CSS custom properties and Tailwind utility classes
  (`bg-walnut-brown`, `text-champagne-gold`, `border-hairline`, etc.).
- **Typography**: "Fraunces" (serif, headings — Tailwind's `font-display`) and "Inter"
  (sans-serif, body/UI — Tailwind's `font-sans`), loaded via `next/font/google` in
  `app/(frontend)/layout.tsx`.
- **Pill-shaped buttons** per the brand system: a `.btn-pill` component class in
  `globals.css`, and a `<Button>` component at `components/ui/Button.tsx` with
  `primary` / `secondary` / `outline` variants.
- **Payload collections** (skeletons — minimal fields, deeper field specs come later):
  `Pages`, `BlogPosts`, `Categories`, `Departments`, `Facilities`, `RoomTypes`, `Offers`,
  `Events`, `GalleryItems`, `Media` (upload-enabled), `TickerItems`, `Testimonials`,
  `LegalPages`, `Bookings`, `ConsultationRequests`, and `StaffUsers` (Payload's
  auth-enabled admin-user collection, with a `role` field: super-admin, reservations,
  front-office, marketing, sales).
  - Every content collection has at minimum `title`, a unique `slug`, a `content`
    rich-text field, and (where sensible) a `heroImage` relationship to `Media`.
  - `Bookings` and `ConsultationRequests` have a `status` select field for staff
    filtering, and access-control stubs so only authenticated `StaffUsers` can
    read/create/update/delete them (`collections/access/isStaff.ts`). Guests will submit
    through a public API route added in a later phase — they never write to these
    collections directly as a logged-in user.
- **Env var documentation** in `.env.example` covering every variable the project will
  eventually need (database, Payload, Resend, Razorpay, Stripe).
- **Git**: a local repo with a sensible `.gitignore` (node_modules, `.next`, `.env*.local`,
  Payload's local `/media` upload dir, etc.) and an initial commit. No remote configured.

## What you need to do next

1. **Create a Neon Postgres project** (https://neon.tech) and copy its pooled connection
   string. Paste it into `.env.local` as `DATABASE_URI`, replacing the placeholder
   `postgres://REPLACE_ME_WITH_YOUR_NEON_CONNECTION_STRING`.
2. **Run the dev server**:
   ```
   npm run dev
   ```
3. **Visit `/admin`** (http://localhost:3000/admin) and follow the prompts to create your
   first Payload super-admin `StaffUsers` account. Payload will create the database
   schema automatically on first connect.

## Env vars still pending real credentials

`.env.local` has working placeholder values only for `DATABASE_URI` (until you add your
Neon string) and a real, already-generated `PAYLOAD_SECRET` (an internal signing secret,
safe to keep for local dev). Everything below is an **empty placeholder** pending real
third-party credentials, and isn't needed to boot the app or use the admin panel — only
to exercise those specific integrations once built:

- `RESEND_API_KEY` — transactional email (Resend)
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` — primary payment gateway
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` — secondary payment gateway

See `.env.example` for the full documented list.

## Notes / deviations

- Next.js 16.3.5 was installed by `create-next-app@latest` at scaffold time (rather than
  Next 15) since that's what the "latest" tag currently resolves to, and it is within
  `@payloadcms/next`'s supported peer range (`>=16.2.6 <17.0.0`). No version was pinned
  down manually.
- Reference material in `docs/` was left untouched.
