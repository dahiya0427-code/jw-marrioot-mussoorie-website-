import type { MetadataRoute } from "next";
import { ACCOMMODATION_CATEGORIES } from "@/lib/accommodation";
import { DINING_VENUES } from "@/lib/dining";
import { FACILITIES } from "@/lib/facilities";
import { EXPERIENCES } from "@/lib/experiences";
import { DEPARTMENTS } from "@/lib/departments";
import { BLOG_POSTS } from "@/lib/blog";
import { OFFERS } from "@/lib/offers";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function entry(path: string, changeFrequency: ChangeFrequency, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

/**
 * Static marketing pages. Deliberately excludes `/book`, `/booking/[reference]`,
 * `/admin`, and `/api/*` — transactional or private routes that should never be
 * offered to search engines for indexing (see app/robots.ts).
 */
const STATIC_ROUTES: Array<{ path: string; changeFrequency: ChangeFrequency; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/accommodation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/dining", changeFrequency: "weekly", priority: 0.8 },
  { path: "/facilities", changeFrequency: "weekly", priority: 0.8 },
  { path: "/experiences", changeFrequency: "weekly", priority: 0.7 },
  { path: "/events", changeFrequency: "monthly", priority: 0.8 },
  { path: "/departments", changeFrequency: "monthly", priority: 0.4 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/media", changeFrequency: "monthly", priority: 0.4 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/offers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/legal/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/terms-of-use", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/booking-policy", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) =>
    entry(route.path, route.changeFrequency, route.priority),
  );

  // Dynamic detail pages — one entry per `generateStaticParams()` slug in each
  // section's own [slug]/page.tsx, sourced from the same lib/*.ts data arrays
  // so the sitemap can never drift from the actual generated routes.
  const dynamicEntries: MetadataRoute.Sitemap = [
    ...ACCOMMODATION_CATEGORIES.map((category) =>
      entry(`/accommodation/${category.slug}`, "monthly", 0.7),
    ),
    ...DINING_VENUES.map((venue) => entry(`/dining/${venue.slug}`, "monthly", 0.7)),
    ...FACILITIES.map((facility) => entry(`/facilities/${facility.slug}`, "monthly", 0.6)),
    ...EXPERIENCES.map((experience) => entry(`/experiences/${experience.slug}`, "monthly", 0.6)),
    ...DEPARTMENTS.map((department) => entry(`/departments/${department.slug}`, "yearly", 0.3)),
    ...BLOG_POSTS.map((post) => entry(`/blog/${post.slug}`, "monthly", 0.6)),
    ...OFFERS.map((offer) => entry(`/offers/${offer.slug}`, "weekly", 0.6)),
  ];

  return [...staticEntries, ...dynamicEntries];
}
