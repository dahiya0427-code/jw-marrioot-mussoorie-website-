export interface AmenitiesListProps {
  items: readonly string[];
  className?: string;
}

/**
 * Two-column icon + label amenities checklist. No icon library is
 * established elsewhere in the codebase (Header/Footer use plain text and
 * <Link>s), so this uses a plain Unicode checkmark rather than introducing
 * a new dependency.
 */
export function AmenitiesList({ items, className = "" }: AmenitiesListProps) {
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 ${className}`.trim()}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 font-sans text-sm text-charcoal-ink/80"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne-gold/15 text-xs text-champagne-gold"
          >
            &#10003;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
