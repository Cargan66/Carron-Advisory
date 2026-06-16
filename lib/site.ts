export const siteConfig = {
  name: "Carron Business Advisory",
  shortName: "Carron",
  descriptor: "Business Advisory",
  tagline: "The difference between keeping books and running a business.",
  description:
    "Carron Business Advisory provides fractional and outsourced CFO services to South African SMEs — senior financial leadership for owner-managed businesses that have outgrown a bookkeeper but can't justify a full-time CFO. Remote, countrywide.",
  url: "https://carronadvisory.co.za",
  email: "hello@carronadvisory.co.za",
  phone: "+27 21 000 0000",
  location: "Remote · Countrywide across South Africa",
  social: {
    linkedin: "https://www.linkedin.com",
    x: "https://x.com",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What a CFO Adds", href: "/services" },
  { label: "Engagement", href: "/engagement" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
