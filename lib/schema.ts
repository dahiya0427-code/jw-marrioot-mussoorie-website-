/**
 * schema.org JSON-LD builders, kept alongside the content they describe so
 * every structured-data payload is derived from the same canonical data used
 * to render the page — never re-typed by hand a second time.
 */
import type { AccommodationCategory } from "@/lib/accommodation";
import type { FAQItem } from "@/components/FAQAccordion";
import type { BlogPost } from "@/lib/blog";
import { EVENT_VENUES } from "@/lib/events";
import { FACILITIES } from "@/lib/facilities";
import {
  PROPERTY_ADDRESS_LINES,
  PROPERTY_NAME,
  PROPERTY_PHONE_HREF,
  PROPERTY_STATS,
} from "@/lib/property";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

/**
 * PROPERTY_ADDRESS_LINES is written as three human-readable display lines
 * (see lib/property.ts). schema.org's PostalAddress wants those same facts
 * split into fields, so this derives them from the canonical lines rather
 * than re-typing the street/locality/region/postal code/country by hand.
 */
function buildPostalAddress() {
  const [line1, line2, line3] = PROPERTY_ADDRESS_LINES;
  const [neighbourhood, addressLocality] = line2.split(", ");
  const [regionPostal, addressCountry] = line3.split(", ");
  const [addressRegion, postalCode] = regionPostal.split(" ");

  return {
    "@type": "PostalAddress",
    streetAddress: `${line1}, ${neighbourhood}`,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
  };
}

/**
 * Hotel schema (which itself subsumes Organization — Hotel extends
 * LodgingBusiness extends LocalBusiness extends Organization in the
 * schema.org hierarchy) rendered once, site-wide, from the root layout.
 * Covers PRD §6's Hotel schema and Organization/NAP requirements together.
 */
export function buildHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: PROPERTY_NAME,
    url: SITE_URL,
    telephone: PROPERTY_PHONE_HREF.replace("tel:", ""),
    address: buildPostalAddress(),
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    numberOfRooms: PROPERTY_STATS.keys,
    amenityFeature: FACILITIES.map((facility) => ({
      "@type": "LocationFeatureSpecification",
      name: facility.name,
      value: true,
    })),
  };
}

/** FAQPage schema built from the same {question, answer} array a page also passes to <FAQAccordion>. */
export function buildFaqPageSchema(items: readonly FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** HotelRoom schema for an /accommodation/[slug] detail page. */
export function buildHotelRoomSchema(category: AccommodationCategory, amenities: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: category.name,
    description: category.tagline,
    url: `${SITE_URL}/accommodation/${category.slug}`,
    occupancy: {
      "@type": "QuantitativeValue",
      value: category.occupancy,
    },
    bed: {
      "@type": "BedDetails",
      description: category.bedConfig,
    },
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    containedInPlace: {
      "@type": "Hotel",
      name: PROPERTY_NAME,
      url: SITE_URL,
    },
  };
}

/** Largest integer found in a capacity string like "Seated 300 · floating 500". */
function maxCapacity(capacity: string): number | undefined {
  const numbers = capacity.match(/\d+/g)?.map(Number);
  return numbers && numbers.length > 0 ? Math.max(...numbers) : undefined;
}

/**
 * EventVenue schema (schema.org's type for a bookable venue used to host
 * events) for each of the resort's real event spaces on /events. A generic
 * schema.org `Event` needs a concrete startDate to be valid structured data,
 * which doesn't exist for these always-available spaces — EventVenue is the
 * correct fit for "the real venue/capacity data from lib/events.ts".
 */
export function buildEventVenuesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": EVENT_VENUES.map((venue) => ({
      "@type": "EventVenue",
      name: venue.name,
      description: venue.hook,
      maximumAttendeeCapacity: maxCapacity(venue.capacity),
      containedInPlace: {
        "@type": "Hotel",
        name: PROPERTY_NAME,
        url: SITE_URL,
      },
    })),
  };
}

/**
 * BlogPosting schema for a /blog/[slug] article. `datePublished` /
 * `dateModified` and a canonical `image` are intentionally omitted: lib/blog.ts
 * carries no publish-date field, and no licensed photography exists yet
 * (see lib/gallery.ts) — inventing either would break with this codebase's
 * practice of never fabricating facts. Add both once real values exist.
 */
export function buildBlogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: PROPERTY_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: PROPERTY_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}
