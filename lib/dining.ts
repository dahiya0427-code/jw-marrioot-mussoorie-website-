/**
 * Dining venue content for the Dining section of the site.
 *
 * Venue names, cuisine positioning, and operating hours reflect published
 * marriott.com copy for JW Marriott Mussoorie Walnut Grove Resort & Spa.
 * Signature dish names are invented, tasteful placeholders consistent with
 * each venue's cuisine and MUST be confirmed with the culinary team before
 * launch — they are presentational only and carry no pricing.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

export interface DiningDish {
  name: string;
  description: string;
}

export interface DiningFAQ {
  question: string;
  answer: string;
}

export interface DiningVenue {
  slug: string;
  name: string;
  cuisineTag: string;
  /** One-line hook shown on the listing card. */
  hook: string;
  hours: string;
  dressCode: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  /** Generic (non-property-specific) stock photo used until real photography exists. */
  imageSrc?: string;
  /** Short editorial pull-quote for the detail page's story band. */
  pullQuote: string;
  /** Long-form description paragraphs for the detail page. */
  description: string[];
  signatureHighlights: DiningDish[];
  faqs: DiningFAQ[];
}

export const DINING_VENUES: DiningVenue[] = [
  {
    slug: "jw-cafe",
    name: "JW Cafe",
    cuisineTag: "Multi-cuisine, all-day dining",
    hook: "An open kitchen, an ever-changing spread, and a table for every mood.",
    hours: "Daily, 7:00 am – 11:00 pm",
    dressCode: "Casual",
    imageVariant: "sand",
    imageSrc: STOCK_PHOTOS.diningJwCafe,
    pullQuote:
      "The kitchen is never behind a wall here — you watch the day's dishes come together, one station at a time.",
    description: [
      "JW Cafe is the resort's all-day address for whatever the moment calls for — an unhurried breakfast before a trail walk, a working lunch, or a late dinner after the mountain air turns cold. The interactive open kitchen sits at its centre, chefs moving between live stations as regional and globally inspired dishes take shape in view of the room.",
      "The extensive buffet runs alongside a small à la carte selection, giving every table room to mix a Garhwali favourite with something further afield. It is the kind of restaurant built to be visited more than once in a single stay, each time with something new on the spread.",
    ],
    signatureHighlights: [
      {
        name: "Himalayan buckwheat crêpes",
        description: "Thin, lightly nutty crêpes finished with local honey and seasonal fruit.",
      },
      {
        name: "Tandoori butter chicken",
        description: "Slow-simmered in a tomato-butter gravy, from the live tandoor station.",
      },
      {
        name: "Wok-tossed pan-Asian noodles",
        description: "Made to order at the open kitchen, with a choice of vegetables or protein.",
      },
      {
        name: "Live pasta & risotto station",
        description: "Fresh pasta finished tableside with a sauce chosen at the counter.",
      },
    ],
    faqs: [
      {
        question: "Do you cater to dietary restrictions?",
        answer:
          "Yes. The buffet is clearly labelled for common allergens and dietary preferences, and our chefs are glad to prepare vegetarian, vegan, or gluten-free options on request.",
      },
      {
        question: "Is this venue suitable for large groups?",
        answer:
          "Yes, JW Cafe's open, flexible layout comfortably accommodates families and larger groups. For parties above eight, we recommend calling ahead so we can prepare the right table.",
      },
      {
        question: "Do I need a reservation for breakfast?",
        answer:
          "Walk-ins are welcome throughout the day, though during peak breakfast hours a short wait is possible. In-room dining remains available as an alternative at any time.",
      },
    ],
  },
  {
    slug: "trout-house-grill-bar",
    name: "Trout House Grill & Bar",
    cuisineTag: "Indian cuisine, with a Himalayan twist",
    hook: "Fresh-caught trout, mountain views, and Indian cooking rooted in the Garhwal foothills.",
    hours: "Daily, 5:00 pm – 11:00 pm",
    dressCode: "Casual",
    imageVariant: "forest",
    imageSrc: STOCK_PHOTOS.diningTroutHouse,
    pullQuote:
      "The trout comes from cold mountain streams, the produce from nearby farms — this is Indian food that tastes like where it's cooked.",
    description: [
      "Trout House Grill & Bar takes classic Indian cooking and lets the Himalayas write in the margins — fresh seafood, locally sourced vegetables, and grains grown within sight of the resort, worked into dishes that feel both familiar and distinctly of this place. Wide windows and an open-air terrace frame the mountain views that give the restaurant its name.",
      "The grill runs through the evening, built around live tandoor and char work, while the bar keeps pace with a list of drinks designed to match the smoke and spice of the kitchen. It is the resort's dinner destination for guests who want the flavour of the region on the plate.",
    ],
    signatureHighlights: [
      {
        name: "Kumaoni-style grilled trout",
        description: "River trout marinated in mountain herbs and finished over live coals.",
      },
      {
        name: "Garhwali lamb chops",
        description: "Slow-marinated chops from the tandoor, with a local mountain-herb rub.",
      },
      {
        name: "Tandoori river prawns",
        description: "Char-grilled prawns finished with a smoked chilli glaze.",
      },
      {
        name: "Bhang-ki-chutney paneer tikka",
        description: "House paneer marinated in a traditional hill-style green chutney.",
      },
    ],
    faqs: [
      {
        question: "Do you cater to dietary restrictions?",
        answer:
          "Yes, the menu is thoughtfully balanced between meat, seafood, and vegetarian dishes, and our chefs can adapt most preparations for common dietary needs with advance notice.",
      },
      {
        question: "Is this venue suitable for large groups?",
        answer:
          "Yes. Trout House Grill & Bar welcomes families and larger parties; for groups above eight, we recommend reserving ahead so we can arrange seating with the best of the mountain view.",
      },
      {
        question: "Is the terrace seating available in cooler weather?",
        answer:
          "The open-air terrace is weather-dependent and may close on especially cold or wet evenings, with comfortable indoor seating always available as an alternative.",
      },
    ],
  },
  {
    slug: "teppan",
    name: "Teppan",
    cuisineTag: "Pan-Asian, with live teppanyaki",
    hook: "Chinese, Japanese, and Thai favourites, cooked live on the teppan grill in front of you.",
    hours: "Tuesday – Sunday, 7:00 pm – 11:00 pm (closed Monday)",
    dressCode: "Casual",
    imageVariant: "walnut",
    imageSrc: STOCK_PHOTOS.diningTeppan,
    pullQuote:
      "Dinner as a small performance — the grill sizzling an arm's length away, each dish plated the moment it's ready.",
    description: [
      "Teppan brings together the favourites of Chinese, Japanese, and Thai kitchens around a single, theatrical centrepiece: the live teppanyaki grill. Chefs work through each order in full view, knives and spatulas moving in practiced rhythm, so dinner here is as much to watch as it is to eat.",
      "The menu leans on bold, balanced pan-Asian flavours — char, citrus, chilli, and umami in turn — plated straight from the grill to the table. Open five evenings a week, it is the resort's most convivial dinner setting, best suited to a night without anywhere else to be.",
    ],
    signatureHighlights: [
      {
        name: "Teppanyaki-grilled miso salmon",
        description: "Miso-glazed salmon seared to order on the teppan grill.",
      },
      {
        name: "Wok-fired Sichuan greens",
        description: "Seasonal greens tossed with a numbing Sichuan chilli-garlic sauce.",
      },
      {
        name: "Thai basil chicken teppan",
        description: "Diced chicken and holy basil, seared hot and fast on the flat-top.",
      },
      {
        name: "Tokyo-style vegetable gyoza",
        description: "Pan-seared dumplings finished crisp-bottomed straight off the grill.",
      },
    ],
    faqs: [
      {
        question: "Do you cater to dietary restrictions?",
        answer:
          "Yes, vegetarian and gluten-conscious options are available across the teppanyaki menu — just let your chef know when you're seated, and the grill station will prepare accordingly.",
      },
      {
        question: "Is this venue suitable for large groups?",
        answer:
          "The teppan grill seating works best in smaller groups gathered around a single station; larger parties can be accommodated across multiple grills with advance reservation.",
      },
      {
        question: "Can I watch the chefs cook?",
        answer:
          "Yes — that's the point. Seating is arranged around the teppan grill itself, so every dish is prepared and plated within view of the table.",
      },
    ],
  },
  {
    slug: "wisteria-deck",
    name: "Wisteria Deck",
    cuisineTag: "Mediterranean, with local Himalayan ingredients",
    hook: "Sun-drenched Mediterranean plates, built from produce grown just down the valley.",
    hours: "Daily, 12:00 pm – 5:00 pm",
    dressCode: "Casual",
    imageVariant: "gold",
    imageSrc: STOCK_PHOTOS.diningWisteriaDeck,
    pullQuote:
      "Olive oil, char, and citrus — Mediterranean cooking that borrows its vegetables and herbs from the hills right outside.",
    description: [
      "Wisteria Deck serves authentic Mediterranean cuisine through the brightest hours of the day, its open deck catching the afternoon light across the resort's gardens. The kitchen leans on olive oil, citrus, and open flame in the Mediterranean tradition, while sourcing much of its produce from the Himalayan foothills around Mussoorie.",
      "It is a lunch built for lingering — light enough for a midday break between activities, generous enough to satisfy a longer, slower afternoon at the table. The deck setting makes it a natural favourite for guests who want their meal outdoors.",
    ],
    signatureHighlights: [
      {
        name: "Himalayan herb-crusted grilled fish",
        description: "Locally sourced fish, herb-crusted and grilled whole.",
      },
      {
        name: "Charred vegetable mezze platter",
        description: "A spread of grilled local vegetables, hummus, and flatbread.",
      },
      {
        name: "Wood-fired flatbread with mountain greens",
        description: "Thin-crust flatbread topped with foraged local greens and soft cheese.",
      },
      {
        name: "Slow-roasted lamb kofta",
        description: "Spiced lamb kofta, slow-roasted and served with a herb yoghurt.",
      },
    ],
    faqs: [
      {
        question: "Do you cater to dietary restrictions?",
        answer:
          "Yes, the Mediterranean menu is naturally rich in vegetarian and plant-forward options, and the kitchen can adapt most dishes for other dietary preferences on request.",
      },
      {
        question: "Is this venue suitable for large groups?",
        answer:
          "Yes, the open deck seating suits both intimate lunches and larger gatherings; for bigger groups, advance notice helps us set up the deck accordingly.",
      },
      {
        question: "Is the deck covered in case of rain?",
        answer:
          "Partial covered seating is available on the deck, with indoor seating nearby as a backup should the weather turn during your meal.",
      },
    ],
  },
  {
    slug: "perch",
    name: "Perch",
    cuisineTag: "Al fresco bar & cafe",
    hook: "Small bites, artisanal tea and coffee, and an open view of the Garhwal range.",
    hours: "Daily, 11:00 am – 8:00 pm",
    dressCode: "Casual",
    imageVariant: "sand",
    imageSrc: STOCK_PHOTOS.diningPerch,
    pullQuote:
      "Come for the view, stay for the tea flight — Perch is built for the hour when nothing needs to happen quickly.",
    description: [
      "Perch is the resort's al fresco bar and cafe, set to take in an open view of the Garhwal range across the length of the afternoon and into evening. The menu keeps to small, shareable bites built around Himalayan ingredients — easy to order a little at a time, over a longer conversation.",
      "Its real strength is the drinks list: artisanal tea blends steeped to order and coffee infusions drawn from regional beans, alongside a light bar programme for the golden hour. It is the resort's answer to the question of where to simply sit still for a while.",
    ],
    signatureHighlights: [
      {
        name: "Buckwheat crackers with mountain herb dip",
        description: "House-baked buckwheat crackers with a whipped Himalayan herb dip.",
      },
      {
        name: "Wild honey & walnut tart",
        description: "A small tart layered with local wild honey and candied walnut.",
      },
      {
        name: "Himalayan cheese board",
        description: "A selection of regional cheeses with preserves and crackers.",
      },
      {
        name: "Artisanal chai flight",
        description: "Three small pours of hand-blended chai, steeped to order.",
      },
    ],
    faqs: [
      {
        question: "Do you cater to dietary restrictions?",
        answer:
          "Yes, the small-bites menu includes vegetarian, vegan, and gluten-free choices, and the team is happy to talk through the day's offerings before you order.",
      },
      {
        question: "Is this venue suitable for large groups?",
        answer:
          "Perch works well for both quiet solo visits and small gatherings; for larger groups, we recommend checking ahead as seating on the deck is more limited than the resort's main restaurants.",
      },
      {
        question: "Is outdoor seating available in cooler weather?",
        answer:
          "Outdoor seating is weather-dependent, with sheltered and indoor alternatives close by so you can still enjoy the view on a cooler or wetter day.",
      },
    ],
  },
];

export function getDiningVenue(slug: string): DiningVenue | undefined {
  return DINING_VENUES.find((venue) => venue.slug === slug);
}
