// TODO: migrate to Payload CMS fetch (TickerItems collection) once DATABASE_URI is live
/**
 * Slim site-wide announcement bar, always above the Header. Currently a
 * single static message — once content is seeded, this will read the
 * active `ticker-items` entries instead.
 */
export function Ticker() {
  return (
    <div className="bg-walnut-brown px-4 py-2 text-center">
      <p className="font-sans text-xs tracking-[0.08em] text-ivory-mist sm:text-sm">
        Introducing Cedar Spa&rsquo;s new monsoon wellness ritual
      </p>
    </div>
  );
}
