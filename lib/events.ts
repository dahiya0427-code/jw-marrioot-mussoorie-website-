/**
 * Events content for the Weddings & MICE section of the site.
 *
 * Venue names, capacities, and event-infrastructure figures reflect the
 * resort's published positioning as one of the largest event infrastructures
 * among luxury resorts in Uttarakhand. Figures are presented as planning
 * guides; final layouts and capacities are confirmed with the Sales &
 * Events team at the time of booking.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export interface EventVenue {
  slug: string;
  name: string;
  tag: string;
  /** Short capacity summary shown on the comparison card. */
  capacity: string;
  hook: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
}

export const EVENT_VENUES: EventVenue[] = [
  {
    slug: "grand-orchard-ballroom",
    name: "Grand Orchard Ballroom",
    tag: "Pillarless ballroom",
    capacity: "Seated up to 275",
    hook: "A pillarless ballroom that keeps sightlines open end to end, suited to a seated wedding banquet or a formal gala.",
    imageVariant: "walnut",
  },
  {
    slug: "indoor-banquet-hall",
    name: "Indoor Banquet Hall",
    tag: "Indoor banquet",
    capacity: "Seated 300 · floating 500",
    hook: "The resort's largest indoor gathering space, flexible enough for a seated banquet or a standing reception.",
    imageVariant: "gold",
  },
  {
    slug: "outdoor-lawn",
    name: "Outdoor Lawn",
    tag: "Outdoor lawn",
    capacity: "Seated 140 · floating 350",
    hook: "An open-air lawn with a panoramic Himalayan backdrop, built for a ceremony or reception under the mountain sky.",
    imageVariant: "forest",
  },
];

export const EVENTS_STATS = {
  totalGuestCapacity: "up to ~1,000 guests",
  totalVenues: 6,
  totalMeetingSpaceSqFt: "~3,300 sq ft",
};
