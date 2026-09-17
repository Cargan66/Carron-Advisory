import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { siteConfig } from "@/lib/site";

// Installable-app (PWA) chrome: theme colour for the status bar / task switcher.
export const viewport: Viewport = {
  themeColor: "#0f2218",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Kept ≤ 60 chars so it isn't truncated in search results.
const titleline = `${siteConfig.name} — Fractional CFO for SA SMEs`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleline,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "fractional CFO South Africa",
    "outsourced CFO",
    "part-time CFO",
    "CFO for owner-managed business",
    "financial control for business owners",
    "profitable but short of cash",
    "bank wants forecasts",
    "improve business margins",
    "cash flow forecasting South Africa",
    "SME funding and bank facilities",
    "financial governance and controls",
    "corporate finance advisor South Africa",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    title: titleline,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Fractional CFO services for South African SMEs`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleline,
    description: siteConfig.description,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "TwNXvSYn9QtWDEy0jZMwh5nMh3BDReClG78WWGJdRUQ",
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Carron",
  appleWebApp: {
    capable: true,
    title: "Carron",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={poppins.variable}>
      <body className="min-h-screen font-sans">
        <OrganizationJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-emerald-deep"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
