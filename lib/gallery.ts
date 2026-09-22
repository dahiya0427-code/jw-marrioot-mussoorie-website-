/**
 * Gallery content for the Gallery section of the site.
 *
 * No licensed photography exists yet for JW Marriott Mussoorie Walnut Grove
 * Resort & Spa. Rooms/Dining/Weddings/Spa tiles use a generic (illustrative,
 * non-property-specific) stock photo from lib/stockPhotos.ts as a stand-in;
 * Nature tiles name actual local landmarks (Kempty Falls, Gun Hill Trail)
 * and deliberately have no stock photo assigned, since a random stock photo
 * captioned with a specific real place would misrepresent it. Swap `imageSrc`
 * for a real <Image> (or Payload media field) one-for-one once genuine,
 * licensed photography is available.
 */
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

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
  /** Generic (non-property-specific) stock photo used until real photography exists. */
  imageSrc?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Rooms
  {
    id: "deluxe-room-interior",
    category: "Rooms",
    label: "Deluxe Room interior",
    variant: "sand",
    imageSrc: STOCK_PHOTOS.roomDeluxe,
  },
  {
    id: "premier-room-balcony",
    category: "Rooms",
    label: "Premier Room valley-view balcony",
    variant: "gold",
    imageSrc: STOCK_PHOTOS.roomPremier,
  },
  {
    id: "luxury-suite-living-area",
    category: "Rooms",
    label: "Luxury Suite living area",
    variant: "forest",
    imageSrc: STOCK_PHOTOS.roomLuxurySuite,
  },
  {
    id: "presidential-suite-view",
    category: "Rooms",
    label: "Presidential Suite panoramic Himalayan view",
    variant: "walnut",
    imageSrc: STOCK_PHOTOS.roomPresidentialSuite,
  },

  // Dining
  {
    id: "jw-cafe-spread",
    category: "Dining",
    label: "JW Cafe all-day dining spread",
    variant: "sand",
    imageSrc: STOCK_PHOTOS.diningJwCafe,
  },
  {
    id: "trout-house-interior",
    category: "Dining",
    label: "Trout House Grill & Bar interior",
    variant: "walnut",
    imageSrc: STOCK_PHOTOS.diningTroutHouse,
  },
  {
    id: "teppan-counter",
    category: "Dining",
    label: "Teppan teppanyaki counter",
    variant: "forest",
    imageSrc: STOCK_PHOTOS.diningTeppan,
  },
  {
    id: "wisteria-deck-seating",
    category: "Dining",
    label: "Wisteria Deck al fresco seating",
    variant: "gold",
    imageSrc: STOCK_PHOTOS.diningWisteriaDeck,
  },
  {
    id: "perch-bar-evening",
    category: "Dining",
    label: "Perch bar & cafe at dusk",
    variant: "sand",
    imageSrc: STOCK_PHOTOS.diningPerch,
  },

  // Weddings
  {
    id: "grand-orchard-ballroom",
    category: "Weddings",
    label: "Grand Orchard Ballroom set for a reception",
    variant: "gold",
    imageSrc: STOCK_PHOTOS.weddingBallroom,
  },
  {
    id: "outdoor-lawn-wedding",
    category: "Weddings",
    label: "Outdoor Lawn wedding setup",
    variant: "forest",
    imageSrc: STOCK_PHOTOS.weddingOutdoorLawn,
  },
  {
    id: "indoor-banquet-hall",
    category: "Weddings",
    label: "Indoor Banquet Hall staged for an event",
    variant: "walnut",
    imageSrc: STOCK_PHOTOS.weddingBanquetHall,
  },

  // Nature — actual local landmarks named; no stock photo (see file header).
  { id: "kempty-falls-view", category: "Nature", label: "Kempty Falls view", variant: "forest" },
  { id: "gun-hill-trail", category: "Nature", label: "Gun Hill Trail", variant: "sand" },
  { id: "walnut-grove-path", category: "Nature", label: "Walnut grove walking path", variant: "walnut" },

  // Spa
  {
    id: "cedar-spa-treatment-room",
    category: "Spa",
    label: "Cedar Spa treatment room",
    variant: "forest",
    imageSrc: STOCK_PHOTOS.spaTreatmentRoom,
  },
  {
    id: "cedar-spa-couples-suite",
    category: "Spa",
    label: "Cedar Spa couple's treatment suite",
    variant: "gold",
    imageSrc: STOCK_PHOTOS.spaCouplesSuite,
  },
  {
    id: "indoor-pool-deck",
    category: "Spa",
    label: "Indoor swimming pool deck",
    variant: "sand",
    imageSrc: STOCK_PHOTOS.spaIndoorPool,
  },
];
