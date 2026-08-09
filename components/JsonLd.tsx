import { siteConfig } from "@/lib/site";

/**
 * Structured data (schema.org JSON-LD). Rendered as a plain <script> so it is
 * emitted into the static HTML at build time — no client JS required.
 *
 * `OrganizationJsonLd` carries the site-wide Organization + WebSite +
 * LocalBusiness graph and lives in the root layout (so it is present on /,
 * /services, /about and every other page). `ArticleJsonLd` is added per post.
 */

const logo = `${siteConfig.url}/images/logo.png`;
const ogImage = `${siteConfig.url}/images/og-image.png`;

const phoneE164 = "+27689012180";

export function OrganizationJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        legalName: siteConfig.name,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: phoneE164,
        logo: {
          "@type": "ImageObject",
          url: logo,
          width: 512,
          height: 512,
        },
        image: ogImage,
        founder: { "@type": "Person", name: "Carel Gangel" },
        sameAs: [siteConfig.social.linkedin, siteConfig.social.x],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteConfig.email,
          telephone: phoneE164,
          areaServed: "ZA",
          availableLanguage: ["en"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Knysna",
          addressRegion: "Western Cape",
          addressCountry: "ZA",
        },
        areaServed: { "@type": "Country", name: "South Africa" },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-ZA",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        image: ogImage,
        logo: logo,
        email: siteConfig.email,
        telephone: phoneE164,
        priceRange: "$$",
        serviceType:
          "Fractional CFO, outsourced CFO and financial leadership for SMEs",
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Knysna",
          addressRegion: "Western Cape",
          addressCountry: "ZA",
        },
        areaServed: { "@type": "Country", name: "South Africa" },
        sameAs: [siteConfig.social.linkedin, siteConfig.social.x],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image: string;
}) {
  const url = `${siteConfig.url}/insights/${slug}`;
  const absoluteImage = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: absoluteImage,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: date,
    dateModified: date,
    inLanguage: "en-ZA",
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: logo, width: 512, height: 512 },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
