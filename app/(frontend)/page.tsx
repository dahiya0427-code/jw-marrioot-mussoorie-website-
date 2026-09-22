// TODO: migrate to Payload CMS fetch (Pages collection, slug "home") once DATABASE_URI is live
import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { RoomCard } from "@/components/accommodation/RoomCard";
import { BookingBar } from "@/components/BookingBar";
import { VenueOverlayCard } from "@/components/VenueOverlayCard";
import { PhotoMarquee } from "@/components/PhotoMarquee";
import { MobileCarousel } from "@/components/MobileCarousel";
import { Reveal } from "@/components/Reveal";
import {
  LeafIcon,
  UtensilsIcon,
  UsersIcon,
  SparklesIcon,
  BedIcon,
  CompassIcon,
  MountainIcon,
  ChatBubbleIcon,
} from "@/components/ui/icons";
import {
  MINDFUL_LUXURY_PILLARS,
  PROPERTY_STATS,
  EVENT_SPACES,
  PROPERTY_PHONE_HREF,
} from "@/lib/property";
import { getAccommodationCategory } from "@/lib/accommodation";
import { getDiningVenue } from "@/lib/dining";
import { FACILITIES } from "@/lib/facilities";
import { BLOG_POSTS } from "@/lib/blog";
import { STOCK_PHOTOS } from "@/lib/stockPhotos";

const PILLAR_META: { icon: ReactNode; href: string; linkLabel: string }[] = [
  { icon: <LeafIcon className="h-6 w-6" />, href: "/experiences", linkLabel: "Explore experiences" },
  { icon: <UtensilsIcon className="h-6 w-6" />, href: "/dining", linkLabel: "Explore dining" },
  { icon: <UsersIcon className="h-6 w-6" />, href: "/events", linkLabel: "Explore events" },
];

const FEATURED_ROOM_SLUGS = ["deluxe-room", "luxury-suite", "presidential-suite"];

const HERO_MARQUEE_ITEMS = [
  { src: STOCK_PHOTOS.roomDeluxe, alt: "Deluxe Room — illustrative photo" },
  { src: STOCK_PHOTOS.spaTreatmentRoom, alt: "Cedar Spa — illustrative photo" },
  { src: STOCK_PHOTOS.diningTroutHouse, alt: "Trout House Grill & Bar — illustrative photo" },
  { src: STOCK_PHOTOS.spaIndoorPool, alt: "Indoor swimming pool — illustrative photo" },
];

// The resort's main line (see lib/property.ts) reused for a WhatsApp deep
// link — swap for a dedicated WhatsApp Business number if the property has
// one, since this is the general reservations line.
const WHATSAPP_HREF = `https://wa.me/${PROPERTY_PHONE_HREF.replace("tel:+", "")}`;

export default function Home() {
  const featuredRooms = FEATURED_ROOM_SLUGS.map(getAccommodationCategory).filter(
    (category): category is NonNullable<typeof category> => Boolean(category),
  );
  const cedarSpa = FACILITIES.find((facility) => facility.slug === "cedar-spa");
  const indoorPool = FACILITIES.find((facility) => facility.slug === "indoor-pool");
  const troutHouse = getDiningVenue("trout-house-grill-bar");
  const wisteriaDeck = getDiningVenue("wisteria-deck");
  const featuredPost = BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden sm:min-h-[92vh]">
        <div className="absolute inset-0">
          <ImagePlaceholder
            aspect="aspect-auto"
            variant="walnut"
            label="Property photography — pending"
            src={STOCK_PHOTOS.blueHourPeak}
            alt="Himalayan peak wrapped in cloud at blue hour — illustrative photo"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/85 via-charcoal-ink/35 to-charcoal-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-ink/60 via-charcoal-ink/15 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-36 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory-mist/25 bg-charcoal-ink/30 px-4 py-1.5 font-sans text-[0.65rem] tracking-[0.2em] text-champagne-gold uppercase backdrop-blur-sm">
              <MountainIcon className="h-3.5 w-3.5" />
              Garhwal Himalayan Foothills
            </span>
            <h1
              className="mt-6 font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
            >
              Find your stillness in the{" "}
              <span className="text-champagne-gold italic">Garhwal hills</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/book" variant="primary">
                Book Now
              </Button>
              <Button href="/offers" variant="outline-inverse">
                Get a best deal
              </Button>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-confirmation-green text-ivory-mist shadow-ambient transition-transform hover:-translate-y-0.5"
              >
                <ChatBubbleIcon className="h-5 w-5" strokeWidth={2} />
              </a>
            </div>
          </div>

          <PhotoMarquee items={HERO_MARQUEE_ITEMS} className="mt-12 max-w-xs lg:absolute lg:right-8 lg:bottom-8 lg:mt-0 xl:right-12" />
        </div>
      </section>

      {/* Floating booking widget, overlapping the hero's bottom edge */}
      <div className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6 lg:-mt-16 lg:px-8">
        <BookingBar />
      </div>

      {/* Mindful Luxury pillars */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <Reveal direction="fade">
          <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Philosophy of living
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
            Mindful Himalayan Luxury
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center font-sans text-sm text-charcoal-ink/70">
            Three guiding tenets shaping every ritual, culinary feast, and restful breath at
            Walnut Grove.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {MINDFUL_LUXURY_PILLARS.map((pillar, index) => {
            const meta = PILLAR_META[index];
            const pillarDirection = index === 0 ? "left" : index === 2 ? "right" : "up";
            return (
              <Reveal key={pillar.title} delayMs={index * 120} direction={pillarDirection}>
                <div className="group h-full rounded-2xl border border-hairline bg-ivory-mist p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-warm-sand text-walnut-brown transition-colors group-hover:bg-champagne-gold">
                    {meta?.icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl text-walnut-brown">{pillar.title}</h3>
                  <p className="mt-3 font-sans text-sm text-charcoal-ink/80">
                    {pillar.description}
                  </p>
                  {meta ? (
                    <Button href={meta.href} variant="outline" className="mt-6 text-xs">
                      {meta.linkLabel}
                    </Button>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Handcrafted accommodations */}
      <section className="bg-warm-sand py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6" direction="left">
            <div>
              <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
                Sanctuary suites
              </p>
              <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
                Handcrafted accommodations
              </h2>
            </div>
            <Button href="/accommodation" variant="secondary">
              View all rooms &amp; suites
            </Button>
          </Reveal>
          {/* Swipeable one-at-a-time carousel below `sm`; grid from `sm` up. */}
          <MobileCarousel
            className="mt-12 -mx-4 sm:hidden"
            items={featuredRooms.map((category) => (
              <RoomCard key={category.slug} category={category} />
            ))}
          />
          <div className="mt-12 hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {featuredRooms.map((category, index) => (
              <Reveal key={category.slug} delayMs={index * 120} direction="zoom">
                <RoomCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Venues: Spa & Dining feature grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal direction="fade">
          <p className="text-center font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Nourish &amp; restore
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-walnut-brown sm:text-4xl">
            Holistic wellness, culinary artistry
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/facilities" variant="secondary">
              View all venues
            </Button>
          </div>
        </Reveal>
        {(() => {
          const venueCards = [
            cedarSpa ? (
              <VenueOverlayCard
                key="cedar-spa"
                title={cedarSpa.name}
                tag="Holistic wellness"
                href="/facilities/cedar-spa"
                imageVariant={cedarSpa.imageVariant}
                imageSrc={cedarSpa.imageSrc}
                icon={<SparklesIcon className="h-full w-full" strokeWidth={1} />}
              />
            ) : null,
            troutHouse ? (
              <VenueOverlayCard
                key="trout-house"
                title={troutHouse.name}
                tag={troutHouse.cuisineTag}
                href={`/dining/${troutHouse.slug}`}
                imageVariant={troutHouse.imageVariant}
                imageSrc={troutHouse.imageSrc}
                icon={<UtensilsIcon className="h-full w-full" strokeWidth={1} />}
              />
            ) : null,
            wisteriaDeck ? (
              <VenueOverlayCard
                key="wisteria-deck"
                title={wisteriaDeck.name}
                tag={wisteriaDeck.cuisineTag}
                href={`/dining/${wisteriaDeck.slug}`}
                imageVariant={wisteriaDeck.imageVariant}
                imageSrc={wisteriaDeck.imageSrc}
                icon={<UtensilsIcon className="h-full w-full" strokeWidth={1} />}
              />
            ) : null,
            indoorPool ? (
              <VenueOverlayCard
                key="indoor-pool"
                title={indoorPool.name}
                tag={indoorPool.tag}
                href="/facilities/indoor-pool"
                imageVariant={indoorPool.imageVariant}
                imageSrc={indoorPool.imageSrc}
                icon={<SparklesIcon className="h-full w-full" strokeWidth={1} />}
              />
            ) : null,
          ].filter((card): card is NonNullable<typeof card> => card !== null);

          return (
            <>
              {/* Swipeable one-at-a-time carousel below `sm`; grid from `sm` up. */}
              <MobileCarousel className="mt-12 -mx-4 sm:hidden" items={venueCards} />
              <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2">
                {venueCards.map((card, index) => (
                  <Reveal key={index} delayMs={index * 120} direction={index % 2 === 0 ? "left" : "right"}>
                    {card}
                  </Reveal>
                ))}
              </div>
            </>
          );
        })()}
      </section>

      {/* Wellness / facilities highlight */}
      <section className="bg-deep-forest py-20 text-ivory-mist">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="order-2 lg:order-1" direction="left">
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
          </Reveal>
          <Reveal className="order-1 lg:order-2" delayMs={150} direction="right">
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant="forest"
              src={STOCK_PHOTOS.spaIndoorPool}
              alt="Indoor swimming pool — illustrative photo"
              className="rounded-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Weddings & events teaser */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant="walnut"
              icon={<UsersIcon className="h-full w-full" strokeWidth={1} />}
              src={STOCK_PHOTOS.weddingOutdoorLawn}
              alt="Outdoor wedding ceremony setup — illustrative photo"
              className="rounded-2xl"
            />
          </Reveal>
          <Reveal delayMs={150} direction="right">
            <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              Weddings &amp; events
            </p>
            <h2 className="mt-3 font-display text-3xl text-walnut-brown sm:text-4xl">
              Space to bring everyone together, up to 1,000 guests
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base text-charcoal-ink/80">
              From an intimate lawn ceremony to a full ballroom celebration, our
              event spaces scale to fit the occasion — weddings, conferences, and
              everything in between.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {EVENT_SPACES.map((space) => (
                <div key={space.name} className="rounded-xl border border-hairline bg-ivory-mist p-3">
                  <dt className="font-sans text-xs text-soft-grey">{space.name}</dt>
                  <dd className="mt-1 font-display text-sm text-walnut-brown">{space.capacity}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Button href="/events" variant="secondary">
                Plan your event
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offers band */}
      <section className="bg-walnut-brown py-16 text-ivory-mist">
        <Reveal className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 sm:px-6 lg:px-8" direction="zoom">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
              Seasonal escapes
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl sm:text-4xl">
              Curated stays, thoughtfully packaged
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base text-ivory-mist/85">
              Multi-night packages pairing accommodation with spa credits, dining,
              and family experiences — built to take the planning off your hands.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/offers" variant="primary">
              View all curated offers
            </Button>
            <Button href="/events" variant="outline-inverse">
              Plan a wedding
            </Button>
          </div>
        </Reveal>
      </section>

      {/* From the blog */}
      {featuredPost ? (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl border border-hairline bg-ivory-mist lg:grid-cols-2" direction="zoom">
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              variant={featuredPost.imageVariant}
              label={`${featuredPost.title} — photography pending`}
              src={featuredPost.imageSrc}
              alt={`${featuredPost.title} — illustrative photo`}
              className="lg:h-full"
            />
            <div className="p-8 lg:p-12">
              <span className="inline-block rounded-full bg-warm-sand px-4 py-1.5 font-sans text-xs font-semibold tracking-[0.1em] text-walnut-brown uppercase">
                Blog
              </span>
              <h2 className="mt-4 font-display text-2xl text-walnut-brown sm:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-4 font-sans text-base text-charcoal-ink/80">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button href="/blog" variant="secondary">
                  View all blogs
                </Button>
                <Button href={`/blog/${featuredPost.slug}`} variant="outline">
                  Read this guide
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* Testimonial / press placeholder */}
      <section className="bg-warm-sand py-20">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8" direction="fade">
          <span className="font-display text-5xl text-champagne-gold/60">&ldquo;</span>
          <p className="-mt-4 font-display text-2xl text-walnut-brown italic sm:text-3xl">
            Guest and press voices will appear here once the property has opened
            for reviews.
          </p>
          <p className="mt-4 font-sans text-xs tracking-[0.15em] text-soft-grey uppercase">
            Testimonials &amp; press — pending
          </p>
        </Reveal>
      </section>

      {/* Quick stat strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-y divide-hairline rounded-2xl border border-hairline bg-ivory-mist p-8 text-center sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          <Reveal direction="zoom" delayMs={0} className="flex flex-col items-center gap-2 py-4 sm:py-0">
            <BedIcon className="h-6 w-6 text-champagne-gold" />
            <p className="font-display text-3xl text-walnut-brown">{PROPERTY_STATS.keys}</p>
            <p className="font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">Keys</p>
          </Reveal>
          <Reveal direction="zoom" delayMs={100} className="flex flex-col items-center gap-2 py-4 sm:py-0">
            <UtensilsIcon className="h-6 w-6 text-champagne-gold" />
            <p className="font-display text-3xl text-walnut-brown">5</p>
            <p className="font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">
              Restaurants &amp; bars
            </p>
          </Reveal>
          <Reveal direction="zoom" delayMs={200} className="flex flex-col items-center gap-2 py-4 sm:py-0">
            <CompassIcon className="h-6 w-6 text-champagne-gold" />
            <p className="font-display text-3xl text-walnut-brown">
              {PROPERTY_STATS.distanceFromAirportKm} km
            </p>
            <p className="font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">
              From Dehradun airport
            </p>
          </Reveal>
          <Reveal direction="zoom" delayMs={300} className="flex flex-col items-center gap-2 py-4 sm:py-0">
            <UsersIcon className="h-6 w-6 text-champagne-gold" />
            <p className="font-display text-3xl text-walnut-brown">1,000</p>
            <p className="font-sans text-xs tracking-[0.1em] text-soft-grey uppercase">
              Event guest capacity
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
