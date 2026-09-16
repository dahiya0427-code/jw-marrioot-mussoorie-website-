/**
 * Facility content for the Facilities section of the site.
 *
 * Facility names and descriptive facts reflect published marriott.com copy
 * for JW Marriott Mussoorie Walnut Grove Resort & Spa. Sample treatment
 * names (Cedar Spa) are invented, tasteful, illustrative placeholders with
 * durations only, no pricing, and MUST be confirmed with the spa team
 * before launch.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export interface FacilityFAQ {
  question: string;
  answer: string;
}

export interface FacilityTreatment {
  name: string;
  duration: string;
}

export interface Facility {
  slug: string;
  name: string;
  /** Short tag shown as the card meta / hero eyebrow. */
  tag: string;
  /** One-line hook shown on the listing card. */
  hook: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  /** Long-form description paragraphs for the detail page. */
  description: string[];
  faqs: FacilityFAQ[];
  cta: { label: string; href: string };
  /** Cedar Spa only: an illustrative sample treatment list. */
  sampleTreatments?: FacilityTreatment[];
}

export const FACILITIES: Facility[] = [
  {
    slug: "cedar-spa",
    name: "Cedar Spa by L'Occitane",
    tag: "Spa & wellness",
    hook: "Provençal rituals, Himalayan stillness, and treatment suites built for two.",
    imageVariant: "forest",
    description: [
      "Cedar Spa by L'Occitane brings the Provençal wellness tradition into the Garhwal foothills, drawing on ingredients sourced from the other end of the earth — Shea from Burkina Faso, Immortelle from Corsica — and working them into rituals designed to slow the day down rather than rush through it.",
      "Therapists trained in Swedish, Balinese, and Shiatsu techniques tailor each session to what the body actually needs, whether that is deep, targeted pressure or a longer, gentler unwinding. Couple's treatment suites let two guests share the same quiet hour, side by side, with the forest just beyond the window.",
      "As the resort's flagship wellness experience, Cedar Spa rewards unhurried planning. Guests are welcome to arrive early to settle in, or to build a full afternoon around a single signature ritual.",
    ],
    sampleTreatments: [
      { name: "Immortelle renewing facial", duration: "60 minutes" },
      { name: "Shea nourishing full-body massage", duration: "90 minutes" },
      { name: "Balinese ritual massage", duration: "75 minutes" },
      { name: "Shiatsu pressure-point therapy", duration: "60 minutes" },
      { name: "Couple's Provençal escape", duration: "90 minutes" },
    ],
    faqs: [
      {
        question: "Do I need to be a hotel guest to book a spa treatment?",
        answer:
          "No. Cedar Spa welcomes both resort guests and outside visitors, though advance booking is strongly recommended as treatment suites and preferred time slots fill quickly.",
      },
      {
        question: "Can couples be treated in the same room?",
        answer:
          "Yes. Cedar Spa's couple's treatment suites are designed for two guests to be treated side by side in the same private room.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 24 hours ahead, and earlier during weekends and holiday periods. Our team can also help you plan a full spa itinerary alongside the rest of your stay.",
      },
    ],
    cta: { label: "Book a consultation", href: "/contact?type=spa" },
  },
  {
    slug: "indoor-pool",
    name: "Indoor swimming pool",
    tag: "Wellness",
    hook: "A temperature-controlled pool for a swim whatever the mountain weather is doing.",
    imageVariant: "sand",
    description: [
      "The resort's indoor, temperature-controlled swimming pool stays comfortable through every season Mussoorie brings — a crisp winter morning or a cool monsoon afternoon included. It is the easiest way to keep a swim in the daily routine without checking the forecast first.",
      "Loungers set around the pool deck make it just as suited to an unhurried hour of reading as to laps, and the space stays quiet enough for guests looking to unwind before or after a treatment at Cedar Spa.",
    ],
    faqs: [
      {
        question: "What are the pool's operating hours?",
        answer:
          "The indoor pool is open daily through the morning and evening; current hours are posted at the pool entrance and can be confirmed with the front desk on arrival.",
      },
      {
        question: "Is the pool suitable for children?",
        answer:
          "Yes, the pool welcomes guests of all ages. Children should be accompanied by an adult at all times, and pool staff can advise on the depth and any timing set aside for family swim.",
      },
      {
        question: "Are towels provided poolside?",
        answer:
          "Yes, fresh towels are available at the pool deck for the duration of your visit.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "fitness-centre",
    name: "24-hour fitness centre",
    tag: "Wellness",
    hook: "Cardio, free weights, and strength machines, open around the clock.",
    imageVariant: "walnut",
    description: [
      "The fitness centre is open 24 hours a day, built for guests whose routine doesn't pause for a holiday — an early climb before breakfast, a late session after a long day of meetings, or anything in between.",
      "The equipment spans cardio machines, free weights, and strength training stations, enough to hold a complete workout without needing to plan around anyone else's schedule.",
    ],
    faqs: [
      {
        question: "Is the fitness centre really open 24 hours?",
        answer:
          "Yes, the fitness centre is accessible to resort guests at any hour, day or night, using room key access.",
      },
      {
        question: "Are personal training sessions available?",
        answer:
          "Please check with the front desk or wellness team on arrival for current availability of personal training and fitness guidance.",
      },
      {
        question: "Do I need to book equipment in advance?",
        answer:
          "No advance booking is required. During peak hours, we ask guests to be considerate about sharing cardio and strength equipment.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "kids-club",
    name: "Kids' club & playground",
    tag: "Family",
    hook: "A 12,000 sq. ft. world of its own, plus a dedicated playground outside.",
    imageVariant: "gold",
    description: [
      "Spread across 12,000 sq. ft., the resort's kids' club gives younger guests a space that is entirely theirs — built for play, discovery, and making friends over the course of a stay. A dedicated playground just outside extends that world into the open air.",
      "Whether it's an hour while parents visit Cedar Spa or a full afternoon of activities, the kids' club is designed to make a family holiday feel like a holiday for everyone in it.",
    ],
    faqs: [
      {
        question: "What is the age range for the kids' club?",
        answer:
          "The kids' club welcomes children across a broad range of ages, with activities adapted accordingly. Our team can advise on the best fit for your child when you check in.",
      },
      {
        question: "Do parents need to stay with their children?",
        answer:
          "The kids' club is staffed and supervised, though specific check-in and supervision policies are confirmed with the team on-site — please ask at the front desk for current details.",
      },
      {
        question: "Is the playground open to all resort guests?",
        answer:
          "Yes, the outdoor playground is available to all families staying at the resort, alongside the indoor kids' club.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "bowling-alley",
    name: "Bowling alley",
    tag: "Recreation",
    hook: "A round of bowling, any time the mood — or the mountain weather — calls for it.",
    imageVariant: "walnut",
    description: [
      "The resort's on-site bowling alley is an easy, indoor way to fill an evening — a casual game between dinner and dessert, or a proper family tournament if the group is competitive enough.",
      "It sits alongside the amphitheatre and other indoor recreation spaces, making it simple to string together a full evening of activity without stepping outside.",
    ],
    faqs: [
      {
        question: "Is the bowling alley open to all guests?",
        answer:
          "Yes, the bowling alley is available to all resort guests. Group bookings for larger parties are welcome — ask the recreation team for current timings.",
      },
      {
        question: "Is there an additional charge to use the bowling alley?",
        answer:
          "Please check with the front desk or recreation team for current access details and any applicable charges.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "amphitheatre",
    name: "Amphitheatre",
    tag: "Recreation",
    hook: "Cultural shows and karaoke nights, staged under the mountain sky.",
    imageVariant: "forest",
    description: [
      "The resort's amphitheatre hosts cultural shows and karaoke nights, giving guests a reason to gather as the evening cools — whether as an audience for a performance or on stage for a song.",
      "The programme varies through the week and season, and it's one of the easiest places at the resort to turn a quiet evening into a shared one.",
    ],
    faqs: [
      {
        question: "How often are shows held at the amphitheatre?",
        answer:
          "Cultural shows and karaoke nights are scheduled through the week; the current programme is posted at the front desk and concierge.",
      },
      {
        question: "Can guests request a karaoke slot?",
        answer:
          "Yes, guests are welcome to sign up for karaoke nights — ask the recreation team about the evening's schedule.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "putting-green",
    name: "Putting green",
    tag: "Recreation",
    hook: "A quiet green for a relaxed round, framed by the Garhwal hills.",
    imageVariant: "sand",
    description: [
      "The resort's putting green offers a relaxed round for guests looking to keep a golf habit going, or to try it for the first time in pleasant surroundings, with the Garhwal foothills as a backdrop.",
      "It's a low-key complement to the resort's more active pursuits — easy to fit in before breakfast or as a wind-down before dinner.",
    ],
    faqs: [
      {
        question: "Do I need my own equipment for the putting green?",
        answer:
          "Basic putting equipment is available at the resort; please check with the recreation team for current availability.",
      },
      {
        question: "Is the putting green suitable for beginners?",
        answer:
          "Yes, the putting green is casual and welcoming to golfers of any level, including first-timers.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "adventure-trekking",
    name: "Hilltop adventure & trekking",
    tag: "Outdoors",
    hook: "A hilltop outdoor adventure area and marked trails into the forest beyond.",
    imageVariant: "forest",
    description: [
      "A dedicated hilltop outdoor adventure area gives guests a base for activity in the open air, set against the deodar and walnut groves that surround the resort.",
      "From there, marked trekking trails lead into the surrounding forest, ranging from a short walk to a longer outing for guests who want to properly explore the Garhwal foothills on foot.",
    ],
    faqs: [
      {
        question: "Do I need a guide for the trekking trails?",
        answer:
          "Marked trails can be walked independently, though we recommend checking with the concierge for current trail conditions, and a guided option is available on request.",
      },
      {
        question: "What should I bring for the hilltop adventure area?",
        answer:
          "Comfortable footwear and weather-appropriate layers are recommended, given the change in temperature and terrain at altitude.",
      },
      {
        question: "Are the trails suitable for all fitness levels?",
        answer:
          "Trails vary in length and difficulty. Our concierge can recommend a route to match your fitness level and the time you have available.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
];

export function getFacility(slug: string): Facility | undefined {
  return FACILITIES.find((facility) => facility.slug === slug);
}
