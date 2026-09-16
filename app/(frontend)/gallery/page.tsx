// TODO: migrate to Payload CMS fetch (GalleryItems collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | JW Marriott Mussoorie Walnut Grove Resort & Spa",
  description:
    "A visual tour of JW Marriott Mussoorie Walnut Grove Resort & Spa — rooms and suites, five dining venues, wedding spaces, the surrounding Garhwal hills, and Cedar Spa.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A first look at Walnut Grove"
        subhead="Rooms and suites, five kitchens, wedding spaces built for the hills, and the forest that surrounds all of it. Browse by category below."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <GalleryGrid />
      </section>
    </>
  );
}
