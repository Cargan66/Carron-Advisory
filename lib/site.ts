export const siteConfig = {
  name: "Aurelia Private Wealth",
  shortName: "Aurelia",
  tagline: "Stewardship of significant wealth, across generations.",
  description:
    "Aurelia Private Wealth is a boutique advisory firm serving high-net-worth families and institutions with discreet, bespoke wealth management, investment advisory, and legacy planning.",
  url: "https://aurelia-wealth.example.com",
  email: "advisory@aurelia-wealth.example.com",
  phone: "+1 (212) 555-0147",
  address: {
    line1: "One Rockefeller Plaza, Suite 2200",
    line2: "New York, NY 10020",
  },
  social: {
    linkedin: "https://www.linkedin.com",
    x: "https://x.com",
    instagram: "https://www.instagram.com",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
