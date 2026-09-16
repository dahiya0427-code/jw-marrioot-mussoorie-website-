/**
 * Press & Media content for the Media/Press section of the site.
 *
 * IMPORTANT — VALIDATE BEFORE LAUNCH: the press mentions below are
 * invented, illustrative placeholders only (publication names, quotes,
 * and dates), standing in for genuine press coverage. They must be
 * replaced with real, rights-cleared press mentions — with permission
 * from each publication — before this page goes live.
 */
export interface PressMention {
  publication: string;
  quote: string;
  date: string;
}

export const PRESS_MENTIONS: PressMention[] = [
  {
    publication: "Condé Nast Traveller India (placeholder)",
    quote:
      "A hill-station address that trades postcard views for something more grounded — mindful luxury, done without pretence.",
    date: "March 2025",
  },
  {
    publication: "Travel + Leisure India (placeholder)",
    quote: "Cedar Spa alone is worth the drive up from Dehradun.",
    date: "November 2024",
  },
  {
    publication: "The Times of India, Travel (placeholder)",
    quote:
      "Uttarakhand's most ambitious new wedding venue, built for the mountains rather than around them.",
    date: "August 2024",
  },
  {
    publication: "Architectural Digest India (placeholder)",
    quote:
      "Walnut and deodar, not marble and glass — a resort that actually looks like where it is.",
    date: "June 2024",
  },
];
