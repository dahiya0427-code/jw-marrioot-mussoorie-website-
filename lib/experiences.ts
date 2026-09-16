/**
 * Experience content for the Experiences section of the site — a
 * travel-guide style layer covering things to do around Mussoorie, framed
 * around JW Marriott Mussoorie Walnut Grove Resort & Spa as a base.
 *
 * Distances and drive times are approximate, road-distance figures from the
 * resort and are provided as a planning guide only; actual travel time
 * varies with traffic, weather, and road conditions in the hills.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export interface ExperienceFAQ {
  question: string;
  answer: string;
}

export interface Experience {
  slug: string;
  name: string;
  /** Short category tag shown as the card meta / hero eyebrow. */
  tag: string;
  /** Distance from the resort in kilometres, where a reliable figure exists. */
  distanceKm?: number;
  /** Approximate travel time from the resort, in plain language. */
  travelTime?: string;
  /** One-line hook shown on the listing card. */
  hook: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  /**
   * Opening, self-contained answer paragraph for the detail page — states
   * what the place is and, where known, how far it is and how long it
   * takes to get there, so the paragraph reads correctly on its own.
   */
  directAnswer: string;
  /** Longer-form paragraphs: best time to visit, what to expect, tips. */
  description: string[];
  faqs: ExperienceFAQ[];
  cta: { label: string; href: string };
}

export const EXPERIENCES: Experience[] = [
  {
    slug: "kempty-falls",
    name: "Kempty Falls",
    tag: "Waterfall",
    distanceKm: 6.1,
    travelTime: "roughly 15-20 minute drive",
    hook: "A cascading waterfall with pools for wading and paddle rides, minutes from the resort.",
    imageVariant: "forest",
    directAnswer:
      "Kempty Falls is a 6.1 km, roughly 15-20 minute drive from JW Marriott Mussoorie Walnut Grove Resort & Spa, making it the closest waterfall to the resort and one of the most visited natural attractions in Mussoorie.",
    description: [
      "The falls drop over a series of rocky tiers into shallow pools where visitors wade and swim, with paddle boats and a small cable car adding to the atmosphere around the base. It is a lively, sociable spot rather than a secluded one, and that is much of its appeal.",
      "Weekday mornings are the quietest time to visit, before tour buses arrive from Dehradun and the pools fill up. The monsoon months bring the fullest flow of water but also slippery rocks, so footing is worth taking seriously between July and September.",
      "Water shoes or sandals with grip are more useful here than regular sneakers, and it is worth carrying a change of clothes and a dry bag for phones and wallets. Vendors around the falls sell snacks and can hold bags for a small fee if you plan to get in the water.",
    ],
    faqs: [
      {
        question: "Is it safe to swim at Kempty Falls?",
        answer:
          "The shallower pools near the base are generally safe for wading and casual swimming, though rocks can be slippery and the current strengthens close to the main cascade, especially during and after the monsoon. Stay within marked areas and keep a closer eye on children.",
      },
      {
        question: "What is the best time of day to visit Kempty Falls?",
        answer:
          "Arriving soon after sunrise, before mid-morning, is the best way to enjoy the falls before tour groups arrive and the pools get crowded. Weekdays are noticeably quieter than weekends and holidays.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "bhatta-falls",
    name: "Bhatta Falls",
    tag: "Waterfall & picnic spot",
    distanceKm: 22,
    travelTime: "roughly 45-60 minute drive",
    hook: "A quieter, multi-tiered waterfall and picnic spot along a scenic valley drive.",
    imageVariant: "sand",
    directAnswer:
      "Bhatta Falls is a 22 km, roughly 45-60 minute drive from JW Marriott Mussoorie Walnut Grove Resort & Spa, along a winding valley road that is a good part of the outing in itself.",
    description: [
      "Bhatta Falls tumbles down in several smaller tiers rather than one dramatic drop, feeding a scattering of natural pools set among terraced fields. It draws a fraction of the crowds that gather at Kempty Falls, which makes it a better fit for travellers after a slower, more picnic-minded afternoon.",
      "The lushest, most photogenic time to visit is just after the monsoon, from September into November, when the surrounding hillsides are deep green and the water runs clear without the monsoon's full force. Spring months are a good alternative if you would rather skip the rains altogether.",
      "Small dhabas near the entrance serve simple Garhwali and North Indian meals, and picnic lawns are set up for groups who bring their own food. Cash is the easier way to pay, as card machines are inconsistent this far out of town, and grip-soled footwear helps on the wet stone paths down to the water.",
    ],
    faqs: [
      {
        question: "How is Bhatta Falls different from Kempty Falls?",
        answer:
          "Bhatta Falls is smaller in scale, further from the resort, and considerably less crowded than Kempty Falls. It suits travellers who want a relaxed picnic-style outing over a busier, more commercial waterfall visit.",
      },
      {
        question: "Can I have lunch at Bhatta Falls?",
        answer:
          "Yes, several small dhabas near the entrance serve simple local meals, and there are picnic lawns for groups who prefer to bring their own food. Carrying some cash is advisable.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "gun-hill-trail",
    name: "Gun Hill Trail",
    tag: "Hiking & viewpoint",
    distanceKm: 9.1,
    travelTime: "roughly 20-25 minute drive to the base",
    hook: "Mussoorie's second-highest point, reached on foot or by cable car, with 360-degree Himalayan views.",
    imageVariant: "walnut",
    directAnswer:
      "Gun Hill Trail leads to Mussoorie's second-highest point, about 9.1 km — roughly a 20-25 minute drive from JW Marriott Mussoorie Walnut Grove Resort & Spa to the base — followed by a short walk or cable car ride up to the summit for 360-degree views.",
    description: [
      "From the base near Mall Road, the summit is reached either by a ropeway ride of a few minutes or a walking trail that climbs steadily through pine forest — a manageable outing for most fitness levels, if a little breathless in the last stretch. At the top, a viewing deck opens onto the Doon Valley on one side and, on a clear day, a distant line of snow-capped peaks including Bandarpunch on the other.",
      "Visibility is the whole point of the trip, so timing matters. Early morning and the hour before sunset tend to offer the clearest air, particularly just after the monsoon season and through the winter months, when haze is at its lowest. Midday visits in peak season can mean a hazier view and a longer queue for the cable car.",
      "Stalls at the summit sell tea, snacks, and the usual assortment of hats and shawls, which are genuinely useful given how quickly the wind picks up at altitude. Carrying a light jacket even on a warm day in the valley below is worth the extra bag space.",
    ],
    faqs: [
      {
        question: "Is there a cable car to Gun Hill?",
        answer:
          "Yes, a ropeway runs from near Mall Road to the summit and takes only a few minutes each way. A walking trail is also available for those who would rather hike up through the pine forest.",
      },
      {
        question: "What can I see from the top of Gun Hill?",
        answer:
          "On a clear day, the summit offers views over the Doon Valley and, in the distance, a stretch of the Himalayan range including Bandarpunch peak. Visibility is best in the early morning or shortly before sunset.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "clouds-end",
    name: "Cloud's End",
    tag: "Viewpoint",
    hook: "The road's literal end — pine-forest hush and valley views at Mussoorie's quiet western edge.",
    imageVariant: "forest",
    directAnswer:
      "Cloud's End is a panoramic viewpoint at the far western edge of the Mussoorie ridge, reached by a scenic drive from JW Marriott Mussoorie Walnut Grove Resort & Spa through stretches of pine and deodar forest — noticeably quieter than the town's more central viewpoints.",
    description: [
      "As the name suggests, the road effectively runs out here, giving way to forest and open valley views over the Aglar River below. It marks the westernmost point most visitors reach in Mussoorie, and the drop in foot traffic compared to Mall Road or Gun Hill is immediately noticeable.",
      "Any clear day works for a visit, though late afternoon light through the pines makes for the most atmospheric photographs, and sunset here is a genuinely peaceful alternative to the more crowded viewpoints in town. Winter mornings can be misty, which has its own quiet appeal but limits the long-distance views.",
      "There is little in the way of food or facilities directly at Cloud's End, so it is worth carrying water and any snacks you might want. The drive itself, along a narrow forest road, is best enjoyed at an unhurried pace rather than treated as a quick there-and-back errand.",
    ],
    faqs: [
      {
        question: "Why is it called Cloud's End?",
        answer:
          "The name reflects its position at the far western end of the Mussoorie ridge road, where the settled area gives way to forest and open valley — a natural stopping point that often sits at or above the cloud line.",
      },
      {
        question: "Is Cloud's End busy with tourists?",
        answer:
          "No, it sees considerably fewer visitors than central Mussoorie attractions like Mall Road or Gun Hill, which is much of its appeal for travellers wanting a quieter viewpoint.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "gucchupani-robbers-cave",
    name: "Gucchupani (Robbers Cave)",
    tag: "Natural cave & stream",
    hook: "A narrow limestone gorge carved by a mountain stream, best explored barefoot in the water.",
    imageVariant: "sand",
    directAnswer:
      "Gucchupani, also known as Robbers Cave, is a natural limestone cave and stream gorge near Mussoorie, best reached by car from JW Marriott Mussoorie Walnut Grove Resort & Spa, where visitors wade in knee-deep water through a narrow rock passage carved by the stream.",
    description: [
      "The experience is less about a single cave chamber and more about the walk itself: a shallow stream running through a narrow, high-walled gorge, with the rock formations overhead getting more dramatic the further in you go. Most visitors walk in barefoot or in water shoes, following the current until the gorge widens out again.",
      "Summer months, from April through June, bring the most comfortable water levels for wading, while the monsoon season raises the flow enough that access is often restricted for safety. Late autumn and winter bring cold water but a manageable, quieter walk for those less bothered by the temperature.",
      "A dry bag or waterproof phone pouch is genuinely useful here rather than optional, and quick-dry clothing makes the rest of the day more comfortable. Small stalls near the entrance rent water shoes and sell snacks, and it is worth checking locally on the day, since water levels can change with recent rainfall upstream.",
    ],
    faqs: [
      {
        question: "Why is it called Robbers Cave?",
        answer:
          "Local lore holds that the cave and gorge once served as a hideout for bandits, which is how the site picked up its English name alongside the local name, Gucchupani.",
      },
      {
        question: "Is Gucchupani suitable for children?",
        answer:
          "Yes, for most of the year the water is shallow enough for children to wade through with an adult, though it is worth checking conditions on the day, as water levels and current strength change with recent rainfall.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "mall-road",
    name: "Mall Road",
    tag: "Shopping & dining",
    hook: "Mussoorie's pedestrian heart, lined with cafes, Tibetan handicrafts, and mountain views.",
    imageVariant: "gold",
    directAnswer:
      "Mall Road is Mussoorie's main pedestrian promenade, a short drive from JW Marriott Mussoorie Walnut Grove Resort & Spa, lined with cafes, restaurants, and shops running between the Library and Kulri ends of town.",
    description: [
      "Much of Mall Road is closed to private vehicles during the day, which turns it into an easy, unhurried stretch for walking between shopfronts, cafes, and the odd colonial-era building that survives among the newer construction. The Kulri end tends to be busier and more commercial, while the Library end is a touch quieter.",
      "Evenings are when Mall Road is at its best, as shopfronts light up and the street fills with a mix of visitors and locals out for a stroll. Weekday visits, particularly outside peak holiday season, are noticeably calmer than weekend evenings, when the crowds thicken considerably.",
      "Comfortable walking shoes matter more than anything else, since covering the length of the Mall on foot adds up. Evenings cool quickly even in summer, so a light jacket or shawl is worth carrying, and a little friendly bargaining is generally accepted at the handicraft and shawl stalls.",
    ],
    faqs: [
      {
        question: "Is Mall Road walkable or do I need a vehicle?",
        answer:
          "Mall Road is largely pedestrian during the day, with private vehicles restricted, so it is best explored on foot once you arrive. A short drive or taxi ride is the usual way to get there from the resort.",
      },
      {
        question: "What food should I try on Mall Road?",
        answer:
          "Mall Road's cafes and restaurants cover everything from North Indian and Tibetan momos to continental cafe fare; street-food stalls are also worth a stop for a quick snack while walking the length of the Mall.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "mussoorie-heritage-centre",
    name: "Mussoorie Heritage Centre",
    tag: "Culture & history",
    hook: "A small museum tracing Mussoorie's path from colonial hill station to present-day hill town.",
    imageVariant: "walnut",
    directAnswer:
      "The Mussoorie Heritage Centre is a small museum in the town of Mussoorie, a short drive from JW Marriott Mussoorie Walnut Grove Resort & Spa, dedicated to the area's history from its founding as a colonial-era hill station through to the present day.",
    description: [
      "The exhibits move through Mussoorie's history in a compact space — old photographs, maps, and objects that trace how a 19th-century sanatorium town for the British grew into the hill station that draws travellers today. It is a modest museum rather than a sprawling one, which makes it easy to fit into a half-day out.",
      "Daytime hours on a quieter weekday morning are the best time to visit, before or after a walk on nearby Mall Road, and the museum rewards visitors who enjoy a little context before wandering the town's older streets and buildings. It is worth confirming opening days locally, as small heritage sites in hill towns occasionally adjust their hours seasonally.",
      "Allow around 30 to 45 minutes for a visit, longer if you like reading through the exhibits in detail. Pairing it with a Mall Road walk or a coffee stop nearby makes for an easy, unhurried half-day in town.",
    ],
    faqs: [
      {
        question: "How long does a visit to the Heritage Centre take?",
        answer:
          "Most visitors spend around 30 to 45 minutes at the Heritage Centre, though it can easily stretch longer for those who enjoy reading through the historical exhibits in detail.",
      },
      {
        question: "Is the Heritage Centre good for children?",
        answer:
          "It suits curious older children and adults best, given its museum format. It pairs well with a livelier stop on Mall Road for families looking to balance the day.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
  {
    slug: "malsi-deer-park",
    name: "Malsi Deer Park",
    tag: "Family & wildlife",
    hook: "A family-friendly park where spotted deer, birds, and small mammals roam wooded enclosures.",
    imageVariant: "forest",
    directAnswer:
      "Malsi Deer Park is a family-friendly wildlife park on the road between Dehradun and Mussoorie, reachable by car from JW Marriott Mussoorie Walnut Grove Resort & Spa, with wooded enclosures for spotted deer, birds, and other small mammals.",
    description: [
      "Set among tall sal trees, the park's walking paths lead past enclosures for spotted deer, along with birds and a handful of other small mammals, in a low-key setting that suits a shorter, easy-paced visit rather than a full day out. It is a popular stop for families travelling with young children.",
      "Cooler daytime hours, particularly in the morning, tend to be the most comfortable time to visit, and the park is best avoided during the heaviest monsoon downpours when paths can get muddy. Its location on the main Dehradun-Mussoorie road also makes it a natural stop to break up the drive up to the resort or back down to the plains.",
      "Basic snacks and drinks are usually available near the entrance, but it is worth carrying water regardless, especially for children. Comfortable walking shoes are enough, as the paths are gentle and the visit rarely takes more than an hour or two.",
    ],
    faqs: [
      {
        question: "Is Malsi Deer Park good for young children?",
        answer:
          "Yes, the park's gentle walking paths and low-key wildlife viewing make it a comfortable, easy stop for families with young children.",
      },
      {
        question: "Can I visit Malsi Deer Park on the way to or from Dehradun?",
        answer:
          "Yes, the park sits directly on the main Dehradun-Mussoorie road, making it a convenient stop to break up the drive to or from Dehradun's airport or railway station.",
      },
    ],
    cta: { label: "Plan your stay", href: "/accommodation" },
  },
];

/** On-property adventure teaser shown on the Experiences listing grid. */
export const ON_PROPERTY_TEASER = {
  name: "Hilltop adventure & trekking",
  tag: "On property",
  hook: "Prefer to stay closer to home? A hilltop adventure area and marked trails start right at the resort.",
  href: "/facilities/adventure-trekking",
  imageVariant: "forest" as NonNullable<ImagePlaceholderProps["variant"]>,
};

export function getExperience(slug: string): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}
