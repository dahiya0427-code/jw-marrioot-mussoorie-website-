// TODO: migrate to Payload CMS fetch (BlogPosts collection) once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog";
import { buildBlogPostingSchema } from "@/lib/schema";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Blog" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLd data={buildBlogPostingSchema(post)} />
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden sm:min-h-[55vh]">
        <ImagePlaceholder
          aspect="aspect-auto"
          variant={post.imageVariant}
          label={`${post.title} — photography pending`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/70 via-charcoal-ink/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            {post.category} · {post.readTimeMinutes} min read
          </p>
          <h1 className="mt-3 font-display text-3xl text-ivory-mist sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Reading column */}
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {post.intro.map((paragraph, index) => (
            <p key={index} className="font-sans text-lg text-charcoal-ink">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-3 font-sans text-base font-medium text-charcoal-ink">
                {section.directAnswer}
              </p>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-sans text-base text-charcoal-ink/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            More from the blog
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <ContentCard
                key={relatedPost.slug}
                title={relatedPost.title}
                description={relatedPost.excerpt}
                href={`/blog/${relatedPost.slug}`}
                linkLabel="Read the guide"
                meta={`${relatedPost.category} · ${relatedPost.readTimeMinutes} min read`}
                imageVariant={relatedPost.imageVariant}
                imageLabel={`${relatedPost.title} — photography pending`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-walnut-brown sm:text-3xl">
            {post.closingCta.label}
          </h2>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80">
            {post.closingCta.description}
          </p>
          <div className="mt-6 flex justify-center">
            <Button href={post.closingCta.href} variant="primary">
              {post.closingCta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
