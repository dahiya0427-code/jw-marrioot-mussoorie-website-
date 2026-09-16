// TODO: migrate to Payload CMS fetch once DATABASE_URI is live, if a CMS-managed 404 is ever needed
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <ImagePlaceholder
        aspect="aspect-auto"
        variant="forest"
        label="Property photography — pending"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-charcoal-ink/60" />

      <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl text-ivory-mist sm:text-5xl">
          It looks like you&rsquo;ve wandered off the trail
        </h1>
        <p className="mt-4 font-sans text-base text-ivory-mist/85">
          The page you were looking for isn&rsquo;t here. Let&rsquo;s get you back
          toward the walnut groves.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Return home
          </Button>
          <Button
            href="/blog"
            variant="outline"
            className="!border-ivory-mist !text-ivory-mist hover:!bg-ivory-mist/10"
          >
            Visit the blog
          </Button>
        </div>
      </div>
    </section>
  );
}
