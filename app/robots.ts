import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin (Payload) and /api/* are private/transactional; /booking/[reference]
      // is a guest's tokenised, unauthenticated booking-status page and should
      // never surface in search results even though it isn't login-gated.
      disallow: ["/admin", "/api/", "/booking/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
