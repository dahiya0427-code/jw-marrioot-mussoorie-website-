// TODO: migrate to Payload CMS fetch (BlogPosts collection) once DATABASE_URI is live
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BlogFilterGrid } from "@/components/blog/BlogFilterGrid";
import { Reveal } from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & travel guides",
  description:
    "Practical guides for planning a Mussoorie trip — things to do, how to get here, what Mindful Luxury means, and how to plan a mountain wedding at JW Marriott Mussoorie Walnut Grove Resort & Spa.",
};

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];

  return (
    <>
      <PageHero
        eyebrow="Blog & resources"
        title="Notes for planning your Mussoorie trip"
        subhead="Travel guides, practical logistics, and a closer look at what a stay here is built around — written to answer the questions travellers actually ask before they visit."
      />

      {/* Featured post */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Featured guide
        </p>
        <Reveal direction="zoom" delayMs={100}>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline bg-ivory-mist transition-shadow hover:shadow-lg lg:grid-cols-2"
          >
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant={featuredPost.imageVariant}
              label={`${featuredPost.title} — photography pending`}
              src={featuredPost.imageSrc}
              alt={`${featuredPost.title} — illustrative photo`}
              className="lg:h-full"
            />
            <div className="flex flex-col justify-center gap-3 p-8 lg:p-10">
              <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
                {featuredPost.category}
              </p>
              <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="font-sans text-base text-charcoal-ink/80">
                {featuredPost.excerpt}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <span className="font-sans text-xs text-charcoal-ink/60">
                  {featuredPost.readTimeMinutes} min read
                </span>
                <span className="font-sans text-sm font-semibold text-walnut-brown underline-offset-4 group-hover:underline">
                  Read the guide &rarr;
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Filterable grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <BlogFilterGrid />
      </section>
    </>
  );
}
