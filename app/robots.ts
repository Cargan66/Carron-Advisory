import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Note: we intentionally do NOT disallow /_next — it holds the CSS/JS
      // Googlebot needs to render the pages. Blocking it would hurt indexing.
      disallow: ["/admin"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
