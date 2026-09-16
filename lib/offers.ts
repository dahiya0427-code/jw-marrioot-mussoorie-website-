/**
 * Package/offer concepts for the Offers section of the site.
 *
 * These are illustrative package concepts only — names, inclusions, and
 * durations are plausible but not final. Actual pricing, inclusions, and
 * blackout dates must be confirmed with hotel revenue management before
 * any package goes live; nothing here should be read as a confirmed rate.
 * Pages deliberately avoid stating an INR price and instead point to
 * /contact for current rates.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export interface Offer {
  slug: string;
  name: string;
  duration: string;
  tagline: string;
  idealFor: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  inclusions: string[];
  goodToKnow: string[];
}

export const OFFERS: Offer[] = [
  {
    slug: "romantic-mountain-getaway",
    name: "Romantic Mountain Getaway",
    duration: "2 nights · 3 days",
    tagline:
      "A slower pace, a mountain backdrop, and a handful of thoughtful touches built for two.",
    idealFor:
      "Couples celebrating an anniversary, a proposal, or simply time away together.",
    imageVariant: "walnut",
    inclusions: [
      "2 nights' accommodation in a Deluxe Room or higher, mountain- or valley-facing where available",
      "Daily breakfast for two",
      "A spa credit to use at Cedar Spa during the stay",
      "One candlelight dinner for two at a resort restaurant",
      "Late checkout, subject to availability",
    ],
    goodToKnow: [
      "The spa credit can be applied toward any Cedar Spa treatment and does not carry forward beyond the stay.",
      "The candlelight dinner venue depends on weather and restaurant availability on the night; the concierge team will confirm on arrival.",
    ],
  },
  {
    slug: "family-weekend-retreat",
    name: "Family Weekend Retreat",
    duration: "2 nights · 3 days",
    tagline:
      "A mountain weekend with breakfast, dinner, and activities for children already built in.",
    idealFor:
      "Families looking for an easy weekend in the hills without piecing the itinerary together themselves.",
    imageVariant: "forest",
    inclusions: [
      "2 nights' accommodation in a Premier Room or family-friendly suite category",
      "Daily breakfast and dinner for the family",
      "Access to the resort's kids' club throughout the stay",
      "One on-property adventure activity per child, subject to age and availability",
      "Access to the indoor and outdoor pools",
    ],
    goodToKnow: [
      "Kids' club access and the adventure activity are subject to minimum-age requirements and adult supervision guidelines set on property.",
      "Additional children or extra beds beyond the base room occupancy may carry a supplementary charge — the reservations team can confirm at the time of booking.",
    ],
  },
  {
    slug: "wellness-reset",
    name: "Wellness Reset",
    duration: "3 nights · 4 days",
    tagline:
      "A longer stay built around rest, movement, and daily time at Cedar Spa.",
    idealFor:
      "Travellers planning a proper reset rather than a quick weekend away.",
    imageVariant: "sand",
    inclusions: [
      "3 nights' accommodation",
      "A daily spa treatment at Cedar Spa across the length of the stay",
      "Daily access to a guided yoga or wellness activity",
      "A healthy-dining menu option available at breakfast and dinner",
      "Access to the indoor pool and fitness facilities",
    ],
    goodToKnow: [
      "Spa treatments are scheduled in advance through the spa team to secure preferred times across the stay.",
      "Yoga and wellness activity formats vary by day and season; the wellness team shares the week's schedule on arrival.",
    ],
  },
];

export function getOffer(slug: string): Offer | undefined {
  return OFFERS.find((offer) => offer.slug === slug);
}

export const OFFERS_TERMS = [
  "Rates are illustrative only and are not confirmed prices. Current rates and full package pricing are available on request — contact the resort directly for an accurate quote for your dates.",
  "Package inclusions, availability, and minimum-stay requirements are subject to change and may vary by season; blackout dates may apply during peak season, festive periods, and long weekends.",
  "Spa credits, activities, and dining inclusions are as listed per package, are valid only during the stay, and are non-transferable and non-redeemable for cash.",
  "A valid booking confirmation and advance payment, as specified at the time of booking, may be required to hold a reservation.",
  "The resort reserves the right to amend package inclusions, availability, and these terms without prior notice; always confirm current terms and conditions at the time of booking.",
] as const;
