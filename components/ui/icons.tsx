import type { SVGProps } from "react";

/**
 * Minimal line-icon set for the brand system — hairline stroke weight,
 * currentColor fill, sized to sit inside a small rounded badge. Kept
 * hand-rolled (no icon package dependency) since the set is small and
 * fixed.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MountainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 19h18L14.5 8 10 14.5 7.5 11 3 19Z" />
      <path d="M14.5 8 16 5.5 21 13" />
    </svg>
  );
}

export function TreesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3 4.5 9h2L4 14h3v6" />
      <path d="M16.5 6 12.5 12.5h2.2L12 18h4v3" strokeLinejoin="round" />
      <path d="M16 18v-6" />
      <path d="M20 21h-8" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4c-9 0-16 6-16 15 9 0 16-6 16-15Z" />
      <path d="M5 19c3-4 6-7 12-12" />
    </svg>
  );
}

export function HeartHandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m11 14 2-2 3 3 4-4" />
      <path d="M3 12h3l2-2 3 3-2 2H6l-3-3Z" />
      <path d="M13.5 5.5c1-1.4 3.6-2.3 5 .1 1.4 2.4-1 5.9-5 8.4-4-2.5-6.4-6-5-8.4 1.4-2.4 4-1.5 5 .1Z" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 19c0-3.3 3-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
      <path d="M16 4.3a3 3 0 0 1 0 5.9" />
      <path d="M21.5 19c0-2.6-2-4.6-4.5-5.3" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18v2" />
      <path d="M21 18v2" />
      <path d="M3 12V8a2 2 0 0 1 2-2h5v4" />
      <circle cx="7.5" cy="9" r="1.25" />
    </svg>
  );
}

export function UtensilsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3v7a2 2 0 0 0 2 2v9" />
      <path d="M6 3v4M9 3v4" />
      <path d="M18 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.5 6.5 2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.8 5-4.7 1.8 1.8-5 4.7-1.8Z" />
    </svg>
  );
}

export function SnowflakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
      <path d="M9 3.5 12 6l3-2.5M9 20.5 12 18l3 2.5M4 9l1 3.5-3 1.5M23 12.5l-3 1.5 1 3.5M1 12.5l3 1.5-1 3.5M23 12.5l-3-1.5 1-3.5" />
    </svg>
  );
}

export function TvIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="6" width="19" height="13" rx="2" />
      <path d="M8 21h8M9 3l3 3 3-3" />
    </svg>
  );
}

export function ArmchairIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
      <path d="M4 12h16v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Z" />
      <path d="M4 14a2 2 0 0 0-2 2v3M20 14a2 2 0 0 1 2 2v3" />
      <path d="M7 18v3M17 18v3" />
    </svg>
  );
}

export function RobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6l1 3-1.5 1.5L14 6v15h-4V6l-.5 1.5L8 6l1-3Z" />
      <path d="M9 8 5 10l1 3 3-1.5M15 8l4 2-1 3-3-1.5" />
    </svg>
  );
}

export function HairDryerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 5a6 6 0 0 1 6 6v1a2 2 0 0 1-2 2h-4" />
      <path d="M11 14v5a1.5 1.5 0 0 1-3 0v-1" />
      <path d="M17 10h3.5a1.5 1.5 0 0 1 0 3H17" />
      <circle cx="11" cy="11" r="6" />
    </svg>
  );
}

export function BathtubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M4 12V9a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
      <path d="M2 12h1M21 12h1M6 19v2M16 19v2" />
    </svg>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5a16 16 0 0 1 18 0" />
      <path d="M6.2 12.3a11.5 11.5 0 0 1 11.6 0" />
      <path d="M9.5 16a6.5 6.5 0 0 1 5 0" />
      <circle cx="12" cy="19.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-3.5L6 8h12l2 4.5V16" />
      <path d="M3 16h18v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2Z" />
      <circle cx="7.5" cy="16" r="1.3" />
      <circle cx="16.5" cy="16" r="1.3" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 5.5v5.3c0 4.6 3 7.9 7 9.2 4-1.3 7-4.6 7-9.2V5.5L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3 4 6l1.5 3L8 7.5V21h8V7.5l2.5 1.5L20 6l-4-3-1 1.5a3 3 0 0 1-6 0L8 3Z" />
    </svg>
  );
}

export function FlowerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M12 20v2" />
    </svg>
  );
}

/** Six-petal lotus mark used as the small emblem above the header wordmark. */
export function LotusMarkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 12c0-4 1.8-7 3.5-8.5C17 5 17.5 8.5 15.5 11c2.2-1.2 5-1 6.5.5-2 1.8-4.8 2.2-7 1.5 1.8 1.5 2.5 3.8 2 6-2.3-.3-4.3-1.7-5-3.8-.7 2.1-2.7 3.5-5 3.8-.5-2.2.2-4.5 2-6-2.2.7-5 .3-7-1.5 1.5-1.5 4.3-1.7 6.5-.5C6.5 8.5 7 5 8.5 3.5 10.2 5 12 8 12 12Z" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h3.2l1.3 4.3-2 1.6a12 12 0 0 0 6.6 6.6l1.6-2 4.3 1.3V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

/** Generic rounded chat-bubble mark for a "message us" contact button. */
export function ChatBubbleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.6 8.6 0 0 1-3.8-.9L3 20l1.1-5.5a8.3 8.3 0 0 1-.9-3.8A8.4 8.4 0 0 1 11.7 2a8.4 8.4 0 0 1 9.3 9.5Z" />
      <path d="M8 10.5h8M8 14h5" />
    </svg>
  );
}
