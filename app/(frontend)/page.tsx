// TODO: migrate to Payload CMS fetch (Pages collection, slug "home") once DATABASE_URI is live
import { PageHero } from "@/components/PageHero";
import { ContentCard } from "@/components/ContentCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { DINING_VENUES, MINDFUL_LUXURY_PILLARS, PROPERTY_STATS } from "@/lib/property";

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="JW Marriott Mussoorie Walnut Grove Resort & Spa"
        title="Find your stillness in the Garhwal hills"
        subhead="115 keys set among deodar and walnut groves in the foothills of the Garhwal Himalayan range, roughly two hours from Dehradun."
        cta={{ label: "Book Now", href: "/accommodation" }}
      />

      {/* Mindful Luxury pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Mindful Luxury
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
          A philosophy, not just a stay
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {MINDFUL_LUXURY_PILLARS.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <h3 className="font-display text-xl text-walnut-brown">{pillar.title}</h3>
              <p className="mt-3 font-sans text-sm text-charcoal-ink/80">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Accommodation teaser */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ImagePlaceholder aspect="aspect-[4/3]" variant="gold" />
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              Accommodation
            </p>
            <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
              105 rooms, 10 suites, one view worth waking up to
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base text-charcoal-ink/80">
              Every room looks out onto the Garhwal foothills. Interiors take their
              cues from the walnut groves outside — warm woods, soft textiles, and
              quiet, considered detail.
            </p>
            <div className="mt-6">
              <Button href="/accommodation" variant="secondary">
                Explore rooms &amp; suites
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dining venues grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
          Dining
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
          Five restaurants, one philosophy: nourish the soul
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DINING_VENUES.map((venue) => (
            <ContentCard
              key={venue.name}
              title={venue.name}
              description={venue.cuisine}
              meta={venue.hours}
              href="/dining"
              linkLabel="View dining"
              imageVariant="sand"
            />
          ))}
        </div>
      </section>

      {/* Wellness / facilities highlight */}
      <section className="bg-deep-forest py-16 text-ivory-mist">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="order-2 lg:order-1">
            <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              Wellness &amp; facilities
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Cedar Spa, and space to simply be
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base text-ivory-mist/85">
              Cedar Spa by L&rsquo;Occitane brings Provençal rituals and Swedish,
              Balinese, and Shiatsu techniques to the mountains, with suites built
              for couples. Beyond the spa: an indoor temperature-controlled pool, a
              24-hour fitness centre, a 12,000 sq ft kids&rsquo; club, a bowling
              alley, an amphitheatre, a putting green, and trekking trails at the
              doorstep.
            </p>
            <div className="mt-6">
              <Button href="/facilities" variant="primary">
                Discover facilities
              </Button>
            </div>
          </div>
          <ImagePlaceholder
            aspect="aspect-[4/3]"
            variant="forest"
            className="order-1 lg:order-2"
          />
        </div>
      </section>

      {/* Weddings & events teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <ImagePlaceholder aspect="aspect-[4/3]" variant="walnut" />
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              Weddings &amp; events
            </p>
            <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
              Space to bring everyone together, up to 1,000 guests
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base text-charcoal-ink/80">
              From an intimate lawn ceremony to a full ballroom celebration, the
              Grand Orchard Ballroom, Indoor Banquet Hall, and Outdoor Lawn scale
              to fit the occasion — weddings, conferences, and everything in
              between.
            </p>
            <div className="mt-6">
              <Button href="/events" variant="secondary">
                Plan your event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / press placeholder */}
      <section className="bg-warm-sand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-2xl text-walnut-brown italic sm:text-3xl">
            &ldquo;Guest and press voices will appear here once the property has
            opened for reviews.&rdquo;
          </p>
          <p className="mt-4 font-sans text-xs tracking-[0.15em] text-soft-grey uppercase">
            Testimonials &amp; press — pending
          </p>
        </div>
      </section>

      {/* Quick stat strip */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-hairline bg-ivory-mist p-8 text-center sm:grid-cols-4">
          <div>
            <p className="font-display text-3xl text-walnut-brown">{PROPERTY_STATS.keys}</p>
            <p className="mt-1 font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">Keys</p>
          </div>
          <div>
            <p className="font-display text-3xl text-walnut-brown">5</p>
            <p className="mt-1 font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">Restaurants &amp; bars</p>
          </div>
          <div>
            <p className="font-display text-3xl text-walnut-brown">{PROPERTY_STATS.distanceFromAirportKm} km</p>
            <p className="mt-1 font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">From Dehradun airport</p>
          </div>
          <div>
            <p className="font-display text-3xl text-walnut-brown">1,000</p>
            <p className="mt-1 font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">Event guest capacity</p>
          </div>
        </div>
      </section>
    </>
  );
}
