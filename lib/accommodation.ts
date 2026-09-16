/**
 * Accommodation category content for the Accommodation section of the site.
 *
 * IMPORTANT — VALIDATE BEFORE LAUNCH: JW Marriott Mussoorie Walnut Grove
 * Resort & Spa has not publicly published exact room/suite category names,
 * per-category inventory counts, or square footage. The four categories
 * below (names, descriptions, bed/occupancy configurations) are invented,
 * tasteful placeholders consistent with a JW Marriott hill resort and MUST
 * be confirmed with hotel operations/revenue management before launch.
 * The only hotel-confirmed figures are the property-wide totals in
 * `PROPERTY_STATS` (115 keys: 105 rooms + 10 suites) — nothing in this file
 * should be presented to guests as an exact, hotel-confirmed detail.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export interface AccommodationCategory {
  slug: string;
  name: string;
  tagline: string;
  viewType: string;
  occupancy: string;
  bedConfig: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  /** 2-3 short highlights shown on the listing card. */
  highlightAmenities: string[];
  /** Long-form description paragraphs for the detail page. */
  description: string[];
  /** Amenities beyond the shared BASE_ROOM_AMENITIES, specific to this category. */
  extraAmenities: string[];
}

/**
 * Amenities common to every room and suite category, drawn from the
 * property's published in-room amenity copy.
 */
export const BASE_ROOM_AMENITIES = [
  "Air conditioning",
  "Satellite TV",
  "Comfortable seating area",
  "Plush bedding with designer duvet",
  "Bathrobe & slippers",
  "Hairdryer",
  "Bath tub & separate rain shower",
] as const;

export const ACCOMMODATION_CATEGORIES: AccommodationCategory[] = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    tagline:
      "A calm, generously proportioned room with a private balcony over garden and forest.",
    viewType: "Garden or forest view",
    occupancy: "2 adults, or 2 adults + 1 child",
    bedConfig: "1 king or 2 twin beds",
    imageVariant: "sand",
    highlightAmenities: ["Private balcony", "Garden/forest view", "Rain shower"],
    description: [
      "The Deluxe Room is the resort's entry point into Mindful Luxury — a spacious room finished in warm woods and soft, natural textiles that echo the walnut groves just outside. A private balcony opens onto the garden or forest, a quiet spot for a morning cup of tea before the hill station wakes up.",
      "Inside, plush bedding and a designer duvet sit alongside a comfortable seating area, ideal for unwinding after a day exploring Mussoorie's trails and Mall Road. The bathroom carries the same unhurried spirit, with a soaking tub and a separate rain shower.",
    ],
    extraAmenities: [],
  },
  {
    slug: "premier-room",
    name: "Premier Room",
    tagline:
      "A brighter, more open room facing the valley, with a dedicated seating area for slower mornings.",
    viewType: "Valley view",
    occupancy: "2 adults, or 2 adults + 1 child",
    bedConfig: "1 king or 2 twin beds",
    imageVariant: "gold",
    highlightAmenities: ["Private balcony", "Valley view", "Seating area"],
    description: [
      "Set higher in the resort's layout, the Premier Room looks out across the valley toward the Garhwal foothills — a view that changes with the light through the day. The private balcony is built for lingering, whether that means a slow breakfast or watching the hills fade into evening mist.",
      "The room itself is arranged to give the seating area its own quiet corner, separate from the bed, so the space works equally well for rest or for catching up on a book. Designer bedding, a bath tub, and a separate rain shower round out the essentials.",
    ],
    extraAmenities: ["Dedicated seating nook, separate from the bed"],
  },
  {
    slug: "luxury-suite",
    name: "Luxury Suite",
    tagline:
      "A suite with a separate living area and sleeper sofa, built with families and longer stays in mind.",
    viewType: "Valley or forest view",
    occupancy: "2 adults + 2 children",
    bedConfig: "1 king bed, plus a sleeper sofa in the living area",
    imageVariant: "forest",
    highlightAmenities: ["Separate living area", "Sleeper sofa", "Ideal for families"],
    description: [
      "The Luxury Suite separates rest from relaxation: a bedroom with plush, designer-dressed bedding, and beyond it, a distinct living area furnished with a sleeper sofa — room enough for a family to spread out without feeling like everyone shares a single space.",
      "It is a natural choice for families or for stays that call for a little more room to breathe, with the same considered finishes — warm woods, soft textiles, a soaking tub and rain shower — found throughout the resort's rooms.",
    ],
    extraAmenities: [
      "Separate living area",
      "Sleeper sofa, suited to families",
      "Additional wardrobe space",
    ],
  },
  {
    slug: "presidential-suite",
    name: "Presidential Suite",
    tagline:
      "The resort's largest suite, with panoramic Garhwal Himalayan views and premium in-room amenities.",
    viewType: "Panoramic Garhwal Himalayan view",
    occupancy: "2 adults + 2 children",
    bedConfig: "1 king bed, with a separate living and dining area",
    imageVariant: "walnut",
    highlightAmenities: [
      "Panoramic Himalayan views",
      "Separate living & dining area",
      "Premium amenities",
    ],
    description: [
      "The Presidential Suite is the resort's most spacious address, set to take in panoramic views of the Garhwal Himalayan range from a scale of room built for occasions as much as for rest. A separate living and dining area makes it suited to entertaining, family celebrations, or simply spreading out.",
      "Every detail is elevated in step with the space — premium in-room amenities, designer bedding, and a marble-finished bathroom with a soaking tub and separate rain shower — while retaining the same calm, unhurried character found across the resort.",
    ],
    extraAmenities: [
      "Separate living & dining area",
      "Panoramic Garhwal Himalayan views",
      "Premium in-room amenities",
      "Priority turndown service",
    ],
  },
];

export function getAccommodationCategory(slug: string): AccommodationCategory | undefined {
  return ACCOMMODATION_CATEGORIES.find((category) => category.slug === slug);
}

export const ACCOMMODATION_FAQS = [
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Standard check-in is from 2:00 pm and check-out is by 12:00 pm. Early check-in and late check-out can often be arranged on request, subject to availability.",
  },
  {
    question: "Are rooms accessible for guests with mobility needs?",
    answer:
      "Accessible rooms and features can be arranged with advance notice. Please share any mobility requirements when booking, or contact the resort directly, so the team can confirm the most suitable room ahead of your stay.",
  },
  {
    question: "Is breakfast included?",
    answer:
      "Many rate plans include daily breakfast; availability depends on the specific package or rate selected at the time of booking. Our team can confirm inclusions and help you choose the right plan for your stay.",
  },
  {
    question: "Can rooms be connected for families or groups travelling together?",
    answer:
      "Interconnecting and adjoining rooms can often be requested for families or groups, subject to availability. Let us know your party size and preferences and we will do our best to accommodate them.",
  },
] as const;
