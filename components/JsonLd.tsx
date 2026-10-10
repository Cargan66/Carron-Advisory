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

/**
 * FAQPage structured data. Helps search engines and AI answer engines
 * (ChatGPT, Claude, Perplexity, Google AI Overviews) parse and cite the Q&A.
 * Pass plain-text answers (no markup).
 */
export function FaqJsonLd({
  items,
  path = "/faq",
}: {
  items: { question: string; answer: string }[];
  /** Page the FAQ section lives on — keeps the @id/URL correct when a second
   *  FAQ section exists outside /faq (e.g. the Fractional CFO page). */
  path?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}${path}#faqpage`,
    inLanguage: "en-ZA",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Person schema for Carel Gangel, tied to the Organization. Rendered on /about
 * for E-E-A-T (search + answer engines can attribute authorship and expertise).
 */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/about#carel-gangel`,
    name: "Carel Gangel",
    jobTitle: "Founder & Fractional CFO",
    description:
      "Finance executive with more than 30 years' experience, including Regional CFO responsibilities across Northern Europe and financial management across South Africa, the United Kingdom and Germany. Provides fractional CFO and strategic financial advisory to established businesses across South Africa.",
    url: `${siteConfig.url}/about`,
    image: ogImage,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.x],
    knowsAbout: [
      "Fractional CFO services",
      "Cash flow forecasting",
      "Profitability and pricing",
      "Business funding and bank facilities",
      "Financial governance and controls",
      "Corporate finance",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of South Africa (UNISA)",
    },
    memberOf: {
      "@type": "Organization",
      name: "Chartered Governance Institute of Southern Africa",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "B.Com, University of South Africa",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Master of Business Leadership (MBL), University of South Africa",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "professional membership",
        name: "Associate, Chartered Governance Institute (ICSA)",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Service schema for the services pages. Ties the offering to the Organization
 * as provider and states the area served (South Africa).
 */
export function ServiceJsonLd({
  name,
  description,
  path,
  serviceType = "Fractional CFO services",
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${siteConfig.url}${path}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    audience: {
      "@type": "BusinessAudience",
      name: "Owner-managed South African SMEs",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BreadcrumbList schema. Pass the trail from Home to the current page as
 * {name, path} pairs (Home first). Rendered on non-home pages.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
