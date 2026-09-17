import type { MetadataRoute } from "next";

// Makes the site installable ("Add to Home Screen") as a standalone app.
// Served at /manifest.webmanifest; Next also injects the <link rel="manifest">.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Carron Business Advisory",
    short_name: "Carron",
    description:
      "Financial clarity tools for South African business owners — the Financial Health Check & Valuation and the 90-Day Owner-Independence Test.",
    start_url: "/tools/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f2218",
    theme_color: "#0f2218",
    categories: ["business", "finance", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
