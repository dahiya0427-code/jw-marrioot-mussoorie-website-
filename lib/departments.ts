/**
 * Department content for the Departments section of the site — a
 * behind-the-scenes look at how the resort's teams are organised.
 *
 * Department names and descriptions are illustrative, written to match
 * real-world luxury hotel org structure, and MUST be validated against
 * this property's actual HR / organisational chart before launch. No named
 * staff members or headcounts are included.
 */
export interface Department {
  slug: string;
  name: string;
  /** One-line hook shown on the listing card. */
  hook: string;
  /** Overview paragraph for the detail page. */
  overview: string;
  /** "What this team does for you" paragraph for the detail page. */
  forGuests: string;
  relatedLinks: { label: string; href: string }[];
}

export const DEPARTMENTS: Department[] = [
  {
    slug: "front-office",
    name: "Front Office",
    hook: "The team behind arrival, departure, and everything guests need in between.",
    overview:
      "The Front Office team manages check-in and check-out, reservations coordination, and the concierge desk, acting as the resort's first and last point of contact for every guest.",
    forGuests:
      "From the moment a booking is confirmed to the final farewell, this team handles room assignments, local recommendations, transport arrangements, and any requests that come up mid-stay — the people to turn to for anything that needs sorting quickly.",
    relatedLinks: [{ label: "Plan your stay", href: "/accommodation" }],
  },
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    hook: "The team behind every restaurant, bar, and in-room dining order on property.",
    overview:
      "The Food & Beverage team runs the resort's restaurants, bars, and in-room dining service, along with the kitchens and service standards that sit behind every meal served.",
    forGuests:
      "Whether it's a table at one of the resort's dining venues, a round of drinks by the fire, or breakfast delivered to the room, this team is responsible for the food, the service, and the pace of the experience around it.",
    relatedLinks: [{ label: "Explore dining", href: "/dining" }],
  },
  {
    slug: "spa-and-wellness",
    name: "Spa & Wellness",
    hook: "The team behind Cedar Spa's treatments and the resort's wellness facilities.",
    overview:
      "The Spa & Wellness team operates Cedar Spa by L'Occitane along with the resort's wider wellness facilities, overseeing treatment bookings, therapist scheduling, and the calm of the spa environment itself.",
    forGuests:
      "This team guides guests to the right treatment, manages appointment timing, and looks after the small details — quiet, temperature, pacing — that turn a booked treatment into an unhurried hour.",
    relatedLinks: [{ label: "Visit Cedar Spa", href: "/facilities/cedar-spa" }],
  },
  {
    slug: "housekeeping",
    name: "Housekeeping",
    hook: "The team behind every room, ready and immaculate, throughout a stay.",
    overview:
      "The Housekeeping team maintains guest rooms, public spaces, and back-of-house areas to the resort's standard, coordinating daily servicing, turndown, and any special requests tied to a room.",
    forGuests:
      "This team is why a room feels freshly prepared every time a guest returns to it — handling everything from daily cleaning and linen changes to extra amenities requested during a stay.",
    relatedLinks: [{ label: "Plan your stay", href: "/accommodation" }],
  },
  {
    slug: "sales-and-events",
    name: "Sales & Events",
    hook: "The team behind weddings, corporate offsites, and every event on property.",
    overview:
      "The Sales & Events team plans and delivers weddings, corporate offsites, and social gatherings across the resort's venues, coordinating everything from initial enquiry through to the day itself.",
    forGuests:
      "This team works with hosts on venue selection, layouts, catering, and timelines, and stays involved through the event to make sure the day runs the way it was planned.",
    relatedLinks: [{ label: "Explore weddings & events", href: "/events" }],
  },
];

export function getDepartment(slug: string): Department | undefined {
  return DEPARTMENTS.find((department) => department.slug === slug);
}
