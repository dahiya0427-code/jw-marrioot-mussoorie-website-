import Link from "next/link";
import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder";

export interface VenueOverlayCardProps {
  title: string;
  tag: string;
  href: string;
  imageVariant: NonNullable<ImagePlaceholderProps["variant"]>;
  imageSrc?: string;
  icon?: ReactNode;
}

/**
 * Full-bleed photo card with the caption overlaid at the bottom-left and a
 * circular "go" arrow at bottom-right — used for the homepage's venues grid
 * (Cedar Spa / dining / wellness), as an alternative to the plain
 * image-top-text-below <ContentCard> layout.
 */
export function VenueOverlayCard({ title, tag, href, imageVariant, imageSrc, icon }: VenueOverlayCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl"
    >
      <div className="transition-transform duration-500 ease-out group-hover:scale-105">
        <ImagePlaceholder
          aspect="aspect-[4/3]"
          variant={imageVariant}
          label={`${title} — photography pending`}
          src={imageSrc}
          alt={`${title} — illustrative photo`}
          icon={icon}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-ink/85 via-charcoal-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="font-sans text-[0.65rem] tracking-[0.15em] text-champagne-gold uppercase">
            {tag}
          </p>
          <h3 className="mt-1 font-display text-xl text-ivory-mist sm:text-2xl">{title}</h3>
        </div>
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory-mist text-walnut-brown transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          &#8599;
        </span>
      </div>
    </Link>
  );
}
