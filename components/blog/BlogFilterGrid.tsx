"use client";

import { useState } from "react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";

const ALL_FILTER = "All" as const;
type FilterValue = BlogCategory | typeof ALL_FILTER;

const FILTERS: FilterValue[] = [ALL_FILTER, ...BLOG_CATEGORIES];

/**
 * Client-side filterable grid of blog/resource posts. Same filter-chip
 * interaction pattern as components/gallery/GalleryGrid.tsx, applied to
 * blog categories instead of gallery categories.
 */
export function BlogFilterGrid({ posts = BLOG_POSTS }: { posts?: BlogPost[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(ALL_FILTER);

  const filteredPosts =
    activeFilter === ALL_FILTER
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="flex flex-wrap justify-center gap-3"
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
              className={`rounded-full border px-5 py-2 font-sans text-sm tracking-wide transition-colors ${
                isActive
                  ? "border-champagne-gold bg-champagne-gold text-walnut-brown"
                  : "border-hairline bg-transparent text-charcoal-ink/70 hover:border-champagne-gold hover:text-walnut-brown"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ivory-mist transition-shadow hover:shadow-lg"
          >
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant={post.imageVariant}
              label={`${post.title} — photography pending`}
            />
            <div className="flex flex-1 flex-col gap-2 p-5">
              <p className="font-sans text-xs tracking-[0.15em] text-champagne-gold uppercase">
                {post.category}
              </p>
              <h3 className="font-display text-xl text-walnut-brown">
                {post.title}
              </h3>
              <p className="font-sans text-sm text-charcoal-ink/80">
                {post.excerpt}
              </p>
              <span className="mt-auto pt-2 font-sans text-xs text-charcoal-ink/60">
                {post.readTimeMinutes} min read
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="mt-10 text-center font-sans text-sm text-charcoal-ink/60">
          No articles in this category yet.
        </p>
      ) : null}
    </div>
  );
}
