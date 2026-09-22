import type { ReactNode } from "react";
import {
  SnowflakeIcon,
  TvIcon,
  ArmchairIcon,
  BedIcon,
  RobeIcon,
  HairDryerIcon,
  BathtubIcon,
  WifiIcon,
  CarIcon,
  ShieldIcon,
  ShirtIcon,
  UtensilsIcon,
  FlowerIcon,
  SparklesIcon,
} from "@/components/ui/icons";

export interface AmenitiesListProps {
  items: readonly string[];
  className?: string;
}

/**
 * Keyword -> icon lookup, checked in order against each amenity's label
 * (case-insensitive substring match). Falls back to a generic sparkle for
 * any amenity that doesn't match a known keyword, so arbitrary per-room
 * `extraAmenities` strings (see lib/accommodation.ts) still render sensibly.
 */
const ICON_KEYWORDS: [string, ReactNode][] = [
  ["wi-fi", <WifiIcon key="wifi" className="h-full w-full" strokeWidth={1.5} />],
  ["wifi", <WifiIcon key="wifi2" className="h-full w-full" strokeWidth={1.5} />],
  ["air condition", <SnowflakeIcon key="ac" className="h-full w-full" strokeWidth={1.5} />],
  ["satellite tv", <TvIcon key="tv" className="h-full w-full" strokeWidth={1.5} />],
  ["seating", <ArmchairIcon key="seat" className="h-full w-full" strokeWidth={1.5} />],
  ["sofa", <ArmchairIcon key="sofa" className="h-full w-full" strokeWidth={1.5} />],
  ["bedding", <BedIcon key="bed" className="h-full w-full" strokeWidth={1.5} />],
  ["bed", <BedIcon key="bed2" className="h-full w-full" strokeWidth={1.5} />],
  ["bathrobe", <RobeIcon key="robe" className="h-full w-full" strokeWidth={1.5} />],
  ["hairdryer", <HairDryerIcon key="dryer" className="h-full w-full" strokeWidth={1.5} />],
  ["hair dryer", <HairDryerIcon key="dryer2" className="h-full w-full" strokeWidth={1.5} />],
  ["bath", <BathtubIcon key="bath" className="h-full w-full" strokeWidth={1.5} />],
  ["hot water", <BathtubIcon key="hotwater" className="h-full w-full" strokeWidth={1.5} />],
  ["shower", <BathtubIcon key="shower" className="h-full w-full" strokeWidth={1.5} />],
  ["parking", <CarIcon key="car" className="h-full w-full" strokeWidth={1.5} />],
  ["cctv", <ShieldIcon key="cctv" className="h-full w-full" strokeWidth={1.5} />],
  ["security", <ShieldIcon key="security" className="h-full w-full" strokeWidth={1.5} />],
  ["laundry", <ShirtIcon key="laundry" className="h-full w-full" strokeWidth={1.5} />],
  ["restaurant", <UtensilsIcon key="restaurant" className="h-full w-full" strokeWidth={1.5} />],
  ["dining", <UtensilsIcon key="dining" className="h-full w-full" strokeWidth={1.5} />],
  ["garden", <FlowerIcon key="garden" className="h-full w-full" strokeWidth={1.5} />],
];

function iconForAmenity(label: string): ReactNode {
  const lower = label.toLowerCase();
  const match = ICON_KEYWORDS.find(([keyword]) => lower.includes(keyword));
  return match?.[1] ?? <SparklesIcon className="h-full w-full" strokeWidth={1.5} />;
}

/**
 * Amenity grid: a soft, elevated card per item with an icon badge above a
 * bold label — replaces the earlier plain checklist for a more visual,
 * at-a-glance "what's included" summary.
 */
export function AmenitiesList({ items, className = "" }: AmenitiesListProps) {
  return (
    <ul
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${className}`.trim()}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex flex-col items-center gap-3 rounded-2xl bg-ivory-mist p-6 text-center shadow-ambient transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-sand text-champagne-gold">
            <span className="h-7 w-7">{iconForAmenity(item)}</span>
          </span>
          <span className="font-sans text-sm font-semibold text-charcoal-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}
