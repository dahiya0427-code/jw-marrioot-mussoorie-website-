/**
 * Gallery content for the Gallery section of the site.
 *
 * No licensed photography exists yet for JW Marriott Mussoorie Walnut Grove
 * Resort & Spa, so every entry below renders as an <ImagePlaceholder> rather
 * than a real photo. Labels describe what each tile will show once genuine,
 * licensed photography is available — swap `ImagePlaceholder` for a real
 * <Image> (or Payload media field) one-for-one at that point.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export type GalleryCategory = "Rooms" | "Dining" | "Weddings" | "Nature" | "Spa";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Rooms",
  "Dining",
  "Weddings",
  "Nature",
  "Spa",
];

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  label: string;
  variant: NonNullable<ImagePlaceholderProps["variant"]>;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Rooms
  { id: "deluxe-room-interior", category: "Rooms", label: "Deluxe Room interior", variant: "sand" },
  { id: "premier-room-balcony", category: "Rooms", label: "Premier Room valley-view balcony", variant: "gold" },
  { id: "luxury-suite-living-area", category: "Rooms", label: "Luxury Suite living area", variant: "forest" },
  { id: "presidential-suite-view", category: "Rooms", label: "Presidential Suite panoramic Himalayan view", variant: "walnut" },

  // Dining
  { id: "jw-cafe-spread", category: "Dining", label: "JW Cafe all-day dining spread", variant: "sand" },
  { id: "trout-house-interior", category: "Dining", label: "Trout House Grill & Bar interior", variant: "walnut" },
  { id: "teppan-counter", category: "Dining", label: "Teppan teppanyaki counter", variant: "forest" },
  { id: "wisteria-deck-seating", category: "Dining", label: "Wisteria Deck al fresco seating", variant: "gold" },
  { id: "perch-bar-evening", category: "Dining", label: "Perch bar & cafe at dusk", variant: "sand" },

  // Weddings
  { id: "grand-orchard-ballroom", category: "Weddings", label: "Grand Orchard Ballroom set for a reception", variant: "gold" },
  { id: "outdoor-lawn-wedding", category: "Weddings", label: "Outdoor Lawn wedding setup", variant: "forest" },
  { id: "indoor-banquet-hall", category: "Weddings", label: "Indoor Banquet Hall staged for an event", variant: "walnut" },

  // Nature
  { id: "kempty-falls-view", category: "Nature", label: "Kempty Falls view", variant: "forest" },
  { id: "gun-hill-trail", category: "Nature", label: "Gun Hill Trail", variant: "sand" },
  { id: "walnut-grove-path", category: "Nature", label: "Walnut grove walking path", variant: "walnut" },

  // Spa
  { id: "cedar-spa-treatment-room", category: "Spa", label: "Cedar Spa treatment room", variant: "forest" },
  { id: "cedar-spa-couples-suite", category: "Spa", label: "Cedar Spa couple's treatment suite", variant: "gold" },
  { id: "indoor-pool-deck", category: "Spa", label: "Indoor swimming pool deck", variant: "sand" },
];
