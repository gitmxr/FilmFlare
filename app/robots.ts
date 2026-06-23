import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Search result pages are utility views — keep out of the index to avoid thin/duplicate content.
      disallow: ["/api/", "/search/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
