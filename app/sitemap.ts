import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { articles, getCategories } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Priority reflects commercial importance: the homepage first, then the
  // services and conversion pages, then supporting and index pages.
  const priorityByRoute: Record<string, number> = {
    "": 1.0,
    "/services": 0.9,
    "/services/fractional-cfo": 0.9,
    "/diagnostic": 0.9,
    "/engagement": 0.9,
    "/resources/financial-health-check": 0.9,
    "/contact": 0.8,
    "/about": 0.8,
    "/testimonials-case-studies": 0.8,
    "/insights": 0.8,
    "/tools": 0.7,
  };

  const staticRoutes = Object.entries(priorityByRoute).map(
    ([route, priority]) => ({
      url: `${siteConfig.url}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    }),
  );

  const articleRoutes = articles.map((a) => ({
    url: `${siteConfig.url}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryRoutes = getCategories().map((c) => ({
    url: `${siteConfig.url}/insights/category/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
