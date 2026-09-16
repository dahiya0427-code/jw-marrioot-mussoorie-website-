/**
 * Canonical property facts (NAP + core stats), used anywhere on the site
 * that needs to render the address/phone or key numbers — keeping every
 * mention byte-for-byte identical matters for local SEO / GEO consistency.
 */
export const PROPERTY_NAME = "JW Marriott Mussoorie Walnut Grove Resort & Spa";

export const PROPERTY_ADDRESS_LINES = [
  "Village Siya, Kempty Fall Road",
  "Charleville, Mussoorie",
  "Uttarakhand 248179, India",
] as const;

export const PROPERTY_ADDRESS_ONE_LINE =
  "Village Siya, Kempty Fall Road, Charleville, Mussoorie, Uttarakhand 248179, India";

export const PROPERTY_PHONE_DISPLAY = "+91 135 263 5700";
export const PROPERTY_PHONE_HREF = "tel:+911352635700";

export const PROPERTY_STATS = {
  keys: 115,
  rooms: 105,
  suites: 10,
  distanceFromAirportKm: 35,
  driveTimeFromAirport: "1.5–2 hour scenic drive",
  airportName: "Jolly Grant Airport, Dehradun",
} as const;

export const DINING_VENUES = [
  {
    name: "JW Cafe",
    cuisine: "Multi-cuisine, all-day dining",
    hours: "7am – 11pm daily",
  },
  {
    name: "Trout House Grill & Bar",
    cuisine: "Indian, with a Himalayan twist",
    hours: "5pm – 11pm daily",
  },
  {
    name: "Teppan",
    cuisine: "Pan-Asian teppanyaki",
    hours: "7pm – 11pm, Tuesday to Sunday",
  },
  {
    name: "Wisteria Deck",
    cuisine: "Mediterranean",
    hours: "12pm – 5pm daily",
  },
  {
    name: "Perch",
    cuisine: "Al fresco bar & cafe",
    hours: "11am – 8pm daily",
  },
] as const;

export const MINDFUL_LUXURY_PILLARS = [
  {
    title: "Be mindful and present",
    description:
      "Space to slow down and notice where you are — the Garhwal foothills, the quiet between the deodar trees, the mountain air.",
  },
  {
    title: "Nourish the soul",
    description:
      "From Cedar Spa's Provençal rituals to five kitchens built around genuine craft, everything here is meant to restore rather than simply impress.",
  },
  {
    title: "Come together",
    description:
      "Spaces designed for real gathering — family trips, weddings, milestones — set against the Himalayan range.",
  },
] as const;

export const NEARBY_LANDMARKS = [
  { name: "Kempty Falls", distance: "6.1 km" },
  { name: "Gun Hill Trail", distance: "9.1 km" },
  { name: "Mall Road", distance: "in Mussoorie town" },
  { name: "Cloud's End", distance: "in Mussoorie" },
  { name: "Mussoorie Heritage Centre", distance: "in Mussoorie" },
] as const;

export const EVENT_SPACES = [
  {
    name: "Grand Orchard Ballroom",
    capacity: "Seated 275",
  },
  {
    name: "Indoor Banquet Hall",
    capacity: "Seated 300 / floating 500",
  },
  {
    name: "Outdoor Lawn",
    capacity: "Seated 140 / floating 350",
  },
] as const;
