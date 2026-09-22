import type { ReactNode } from "react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export interface ContentCardProps {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  meta?: string;
  imageLabel?: string;
  imageVariant?: "walnut" | "forest" | "sand" | "gold";
  icon?: ReactNode;
  imageSrc?: string;
}

/**
 * Reusable grid card: image placeholder + title + short text + optional
 * link. Used across Facilities/Dining/Accommodation/Experiences listings.
 */
export function ContentCard({
  title,
  description,
  href,
  linkLabel = "Learn more",
  meta,
  imageLabel,
  imageVariant = "sand",
  icon,
  imageSrc,
}: ContentCardProps) {
  const body = (
    <>
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <ImagePlaceholder
            aspect="aspect-[4/3]"
            variant={imageVariant}
            label={imageLabel}
            icon={icon}
            src={imageSrc}
            alt={imageLabel ?? title}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {meta ? (
          <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
            {meta}
          </p>
        ) : null}
        <h3 className="font-display text-xl text-walnut-brown">{title}</h3>
        <p className="font-sans text-sm text-charcoal-ink/80">{description}</p>
        {href ? (
          <span className="mt-2 font-sans text-sm font-semibold text-walnut-brown underline-offset-4 group-hover:underline">
            {linkLabel} &rarr;
          </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ivory-mist transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

  if (href) {
    return (
      <Link href={href} className={className}>
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}
