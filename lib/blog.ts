/**
 * Blog / resources content — SEO- and AEO-oriented long-form guides aimed at
 * people planning a trip to Mussoorie. Each post follows a question-style
 * H2 pattern: a short, self-contained answer paragraph immediately under
 * the heading, followed by more detail — written so an answer engine or
 * search snippet can lift the direct-answer paragraph on its own.
 *
 * Facts (distances, drive times, venue capacities, brand-pillar wording)
 * are reused from the resort's existing canonical sources (lib/property.ts,
 * lib/events.ts, lib/experiences.ts) rather than re-derived, and no
 * statistic or historical claim below is invented.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";
import {
  MINDFUL_LUXURY_PILLARS,
  PROPERTY_NAME,
  PROPERTY_STATS,
} from "@/lib/property";
import { EVENT_VENUES, EVENTS_STATS } from "@/lib/events";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

export type BlogCategory = "Travel Guides" | "Wellness" | "Weddings";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Travel Guides",
  "Wellness",
  "Weddings",
];

export interface BlogSection {
  /** Question-style H2 heading. */
  heading: string;
  /** Short, self-contained direct-answer paragraph shown right under the heading. */
  directAnswer: string;
  /** Supporting paragraphs elaborating on the direct answer. */
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  /** One-line summary shown on listing cards and used as the meta description. */
  excerpt: string;
  readTimeMinutes: number;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  /** Generic (non-property-specific) editorial stock photo used until real photography exists. */
  imageSrc?: string;
  /** Opening paragraph(s) shown before the first H2 section. */
  intro: string[];
  sections: BlogSection[];
  /** Featured on the /blog listing as the lead hero card. */
  featured?: boolean;
  closingCta: { label: string; href: string; description: string };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "things-to-do-in-mussoorie",
    title: "Things to do in Mussoorie: a complete guide",
    category: "Travel Guides",
    excerpt:
      "Kempty Falls, Gun Hill, Mall Road, Cloud's End, and the Heritage Centre — a practical guide to Mussoorie's sights, with real distances and drive times from the resort.",
    readTimeMinutes: 9,
    imageVariant: "forest",
    imageSrc: STOCK_PHOTOS.mountainValley,
    featured: true,
    intro: [
      `Mussoorie earned its old nickname, the "Queen of the Hills," long before it became a weekend favourite for travellers from Delhi and the plains — and its best-known sights are still what draw most first-time visitors. Staying at ${PROPERTY_NAME} puts a good spread of them within a short, scenic drive, so a few focused outings can cover most of the town's highlights without feeling rushed.`,
      "This guide runs through the sights most worth building a day around, with distances and drive times from the resort where a reliable figure exists, so you can sequence a day out realistically rather than guessing.",
    ],
    sections: [
      {
        heading: "How far is Kempty Falls from the resort?",
        directAnswer:
          "Kempty Falls is about 6.1 km from the resort, roughly a 15-20 minute drive, making it the closest major waterfall to the property and an easy morning or afternoon outing.",
        paragraphs: [
          "The falls drop over a series of rocky tiers into shallow pools where visitors wade and swim, with paddle boats and a small cable car adding to the atmosphere at the base. It is a lively, sociable spot rather than a quiet one, and that is a large part of its appeal for families and groups.",
          "Weekday mornings, before tour traffic builds up from Dehradun, are the calmest time to visit. Grippy footwear is worth packing regardless of season, since the rocks stay slick even outside the monsoon months.",
        ],
      },
      {
        heading: "How far is Gun Hill, and how do you get to the top?",
        directAnswer:
          "Gun Hill's base is about 9.1 km from the resort, roughly a 20-25 minute drive, from where a short cable car ride or walking trail leads up to Mussoorie's second-highest point.",
        paragraphs: [
          "From near Mall Road, the summit is reached either by a ropeway ride of a few minutes or a walking trail through pine forest that suits most fitness levels. At the top, a viewing deck looks out over the Doon Valley and, on a clear day, a distant line of Himalayan peaks.",
          "Early morning and the hour before sunset tend to give the clearest views, particularly just after the monsoon and through the winter months. A light jacket earns its space in the bag even on a warm day in the valley below, since the wind picks up noticeably at the top.",
        ],
      },
      {
        heading: "What is there to do on Mall Road?",
        directAnswer:
          "Mall Road is Mussoorie's pedestrian promenade, lined with cafes, restaurants, and shops between the Library and Kulri ends of town — best explored on foot, especially in the evening.",
        paragraphs: [
          "Much of the road is closed to private vehicles during the day, which makes it an easy, unhurried stretch for browsing shopfronts and stopping for coffee. The Kulri end is busier and more commercial, while the Library end runs a little quieter.",
          "Evenings are Mall Road at its best, when shopfronts light up and the street fills with a mix of visitors and locals out for a stroll. Comfortable walking shoes matter more than anything else here, since covering the length of the Mall adds up quickly.",
        ],
      },
      {
        heading: "What is Cloud's End, and is it worth the drive?",
        directAnswer:
          "Cloud's End is a quiet viewpoint at the far western edge of the Mussoorie ridge, reached through stretches of pine and deodar forest — worth the drive for travellers who want valley views without the crowds of the town's more central spots.",
        paragraphs: [
          "As the name suggests, the road effectively runs out here, giving way to forest and open views over the Aglar River below. Foot traffic drops off noticeably compared with Mall Road or Gun Hill, which is much of the appeal.",
          "There is little in the way of food or facilities directly at the site, so it is worth carrying water. The drive itself, along a narrow forest road, rewards an unhurried pace rather than a quick there-and-back visit.",
        ],
      },
      {
        heading: "What will I see at the Mussoorie Heritage Centre?",
        directAnswer:
          "The Mussoorie Heritage Centre is a small museum in town tracing the area's history from its founding as a colonial-era hill station through to the present day — a 30-45 minute visit for anyone curious about the town's backstory.",
        paragraphs: [
          "The exhibits move through old photographs, maps, and objects that trace how a 19th-century hill station grew into the town that draws travellers today. It is a modest, compact museum rather than a sprawling one, which makes it easy to fit into a half-day out alongside a Mall Road walk.",
        ],
      },
    ],
    closingCta: {
      label: "See more Mussoorie experiences",
      href: "/experiences",
      description:
        "The concierge team can help sequence a day out, arrange a car, and share current local conditions before you set off.",
    },
  },
  {
    slug: "how-to-reach-mussoorie-from-delhi",
    title: "How to reach Mussoorie from Delhi",
    category: "Travel Guides",
    excerpt:
      "Road, rail, and air routes from Delhi to the resort, with real distances and drive times — from Jolly Grant Airport, Dehradun Railway Station, and the direct road route.",
    readTimeMinutes: 7,
    imageVariant: "walnut",
    imageSrc: STOCK_PHOTOS.mountainValley,
    intro: [
      `Getting to Mussoorie from Delhi almost always means a final stretch by road, whatever route brings you to the region — the hill town itself has no airport or railway station of its own. Here is how the main options compare for travellers headed to ${PROPERTY_NAME}.`,
    ],
    sections: [
      {
        heading: "What is the best way to reach Mussoorie from Delhi?",
        directAnswer:
          "Most travellers either fly into Dehradun's Jolly Grant Airport and drive the rest of the way, or drive the entire route from Delhi — both bring you to a final hill stretch of roughly 35 km up to the resort.",
        paragraphs: [
          "Flying cuts the bulk of the distance and hands off to a shorter, more scenic final drive, which suits travellers short on time. Driving the whole way from Delhi takes longer but gives you control over the pace and any stops along the way — a reasonable trade-off for a weekend break rather than a quick turnaround trip.",
        ],
      },
      {
        heading: "How far is the resort from Jolly Grant Airport, Dehradun?",
        directAnswer: `${PROPERTY_NAME} is approximately ${PROPERTY_STATS.distanceFromAirportKm} km from ${PROPERTY_STATS.airportName}, a ${PROPERTY_STATS.driveTimeFromAirport} as the road climbs into the hills.`,
        paragraphs: [
          "Jolly Grant Airport has regular short-haul flights connecting Dehradun with Delhi, typically under an hour in the air. From there, a pre-arranged car is the easiest way to cover the final hill stretch, which winds steadily upward once you leave the Doon Valley behind.",
        ],
      },
      {
        heading: "How far is the resort from Dehradun Railway Station?",
        directAnswer:
          "The resort is approximately 34 km from Dehradun Railway Station, a similar hill drive of around 1.5 to 2 hours to the one from the airport.",
        paragraphs: [
          "Dehradun is well connected to Delhi by rail, including fast daytime services such as the Shatabdi Express, which makes the train-plus-drive combination a comfortable option for travellers who would rather avoid a long road trip or a flight.",
        ],
      },
      {
        heading: "Can I drive directly from Delhi to Mussoorie?",
        directAnswer:
          "Yes — a direct drive from Delhi to Mussoorie covers roughly 275-290 km depending on the route, generally taking somewhere around 6-7 hours including a stop, though this varies with traffic and time of departure.",
        paragraphs: [
          "The Delhi-Dehradun Expressway has shortened the road journey between the two cities considerably compared with the older highway route via Meerut and Roorkee, and it is now the quicker way to cover the plains portion of the drive. From Dehradun, the road climbs into the hills for the final approach to Mussoorie.",
          "Starting early in the day is worth it regardless of route, both to avoid Delhi's peak-hour traffic on the way out and to reach the hill roads while there is still good daylight.",
        ],
      },
      {
        heading: "Is there a train to Mussoorie?",
        directAnswer:
          "No — Mussoorie has no railway station of its own. The nearest is Dehradun Railway Station, about 34 km from the resort, which is well connected to Delhi by several daily trains.",
        paragraphs: [
          "Booking a car in advance for the onward hill drive from Dehradun makes the train option considerably smoother, particularly for travellers arriving with luggage after an overnight or early-morning train.",
        ],
      },
    ],
    closingCta: {
      label: "Explore accommodation",
      href: "/accommodation",
      description:
        "Once travel is booked, the reservations and concierge teams can help arrange airport or station transfers ahead of your stay.",
    },
  },
  {
    slug: "mindful-luxury-guide",
    title: "A guide to Mindful Luxury: what makes JW Marriott different",
    category: "Wellness",
    excerpt:
      "Be mindful and present, nourish the soul, come together — an approachable look at the three ideas behind JW Marriott's Mindful Luxury philosophy, and what they look like at Walnut Grove.",
    readTimeMinutes: 6,
    imageVariant: "gold",
    imageSrc: STOCK_PHOTOS.spaTreatmentRoom,
    intro: [
      `"Mindful Luxury" can sound like brand copy until you see what it actually changes about a stay. At JW Marriott, it is the philosophy behind day-to-day decisions — from how spaces are designed to how service is delivered — built around three straightforward ideas. Here is what each one means in practice at ${PROPERTY_NAME}.`,
    ],
    sections: [
      {
        heading: "What is JW Marriott's Mindful Luxury philosophy?",
        directAnswer:
          "Mindful Luxury is JW Marriott's brand philosophy built around three pillars — being mindful and present, nourishing the soul, and coming together — that shape everything from spa design to how event spaces are laid out.",
        paragraphs: [
          "Rather than a spa package or a single amenity, it is closer to a lens the brand uses to make decisions: does this help a guest slow down, feel genuinely restored, or connect with the people they are travelling with. The three pillars below are how that plays out at Walnut Grove specifically.",
        ],
      },
      ...MINDFUL_LUXURY_PILLARS.map((pillar) => ({
        heading: `What does "${pillar.title}" actually mean?`,
        directAnswer: pillar.description,
        paragraphs: [pillarElaboration(pillar.title)],
      })),
    ],
    closingCta: {
      label: "Learn more about the resort",
      href: "/about",
      description:
        "Read more about the property, its setting in the Garhwal foothills, and the story behind Walnut Grove.",
    },
  },
  {
    slug: "planning-a-mountain-wedding",
    title: "Planning a mountain wedding: what to know",
    category: "Weddings",
    excerpt:
      "Guest logistics, venue choices, and seasonal timing for a hill-station destination wedding — framed around real event spaces and capacities at Walnut Grove.",
    readTimeMinutes: 8,
    imageVariant: "sand",
    imageSrc: STOCK_PHOTOS.weddingOutdoorLawn,
    intro: [
      "A mountain wedding trades some of the convenience of a city venue for a setting most guests will remember for years — but that trade-off works best when the practical planning is handled early. Here is a sensible starting checklist, framed around the kind of event spaces a hill-station property like Walnut Grove actually offers.",
    ],
    sections: [
      {
        heading:
          "What should I consider first when planning a mountain destination wedding?",
        directAnswer:
          "Start with guest travel logistics and a weather backup plan — hill-station weddings depend more on both than a city wedding does, and the earlier they are settled, the smoother everything else falls into place.",
        paragraphs: [
          "Guests travelling to a hill town need more lead time than they would for a wedding in their own city — flights or trains to the nearest hub, then a road transfer up into the hills. Sharing travel guidance and a suggested arrival window well ahead of the date makes a real difference to turnout and to how relaxed guests are once they arrive.",
          "A weather backup is the other early decision. Mountain weather can turn faster than in the plains, so any outdoor ceremony plan is worth pairing with an indoor space that could take over at short notice.",
        ],
      },
      {
        heading: "How many guests can Walnut Grove's event spaces hold?",
        directAnswer: `Across its event spaces, the resort can accommodate ${EVENTS_STATS.totalGuestCapacity} depending on layout, spread across ${EVENTS_STATS.totalVenues} venues.`,
        paragraphs: [
          "Exact numbers depend heavily on layout — a seated banquet holds fewer guests than a standing reception in the same room — so it is worth planning around the specific format of your ceremony and reception rather than a single headline capacity figure.",
        ],
      },
      {
        heading: "Indoor or outdoor: which venue is right for a hill wedding?",
        directAnswer:
          "Most mountain weddings are planned with both in mind: an outdoor space for the ceremony's setting and an indoor space as the reliable fallback and reception venue.",
        paragraphs: EVENT_VENUES.map(
          (venue) => `${venue.name} — ${venue.capacity.toLowerCase()}. ${venue.hook}`
        ),
      },
      {
        heading: "What is the best season for a Mussoorie wedding?",
        directAnswer:
          "Spring (March-May) and post-monsoon autumn (late September-November) generally offer the most reliable weather for an outdoor hill wedding, while the June-September monsoon and the colder winter months bring more planning risk.",
        paragraphs: [
          "The monsoon brings a real chance of rain disrupting an outdoor ceremony, which is where an indoor backup earns its place in the plan. Winter can be clear and dramatic, but cold nights and occasional fog are worth building into guest expectations if you choose that window.",
        ],
      },
      {
        heading: "How far ahead should guests plan travel?",
        directAnswer:
          "Guests should generally plan to arrive at least a day before the first event, given the road transfer time into the hills from the nearest airport or railway station.",
        paragraphs: [
          "The final approach into Mussoorie from either Dehradun's airport or railway station typically runs an hour and a half to two hours by road, on top of whatever it takes to reach Dehradun itself. Building that into a shared travel note for guests — along with suggested arrival timing — avoids a stressful rush on the day itself.",
        ],
      },
    ],
    closingCta: {
      label: "Talk to the events team",
      href: "/events",
      description:
        "The Sales & Events team can walk through venue layouts, capacities, and seasonal availability for your date.",
    },
  },
];

/** Non-corporate elaboration paragraph for each Mindful Luxury pillar, resort-specific. */
function pillarElaboration(pillarTitle: string): string {
  switch (pillarTitle) {
    case "Be mindful and present":
      return "In practice, that shows up in small ways — rooms oriented toward the view rather than the road, common areas built for sitting quietly rather than rushing through, and a pace that does not push guests toward a packed itinerary. It is less about a specific activity and more about giving a stay room to breathe.";
    case "Nourish the soul":
      return "This is the pillar behind Cedar Spa's treatment menu and the resort's five kitchens, each built around genuine culinary craft rather than a single all-purpose restaurant. The idea is restoration you can taste and feel, not just a spa afternoon bolted onto a stay.";
    case "Come together":
      return "It is also the thinking behind the resort's event spaces — built for family trips, weddings, and milestones that bring people together against a Himalayan backdrop, rather than treated as an afterthought to the rooms.";
    default:
      return "";
  }
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, limit);
}
