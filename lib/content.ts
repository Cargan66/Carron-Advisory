// Centralised placeholder content for the site. Swap these out for real copy / a CMS later.

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  icon: IconName;
};

export type IconName =
  | "shield"
  | "chart"
  | "compass"
  | "scroll"
  | "scale"
  | "gem";

export const services: Service[] = [
  {
    slug: "wealth-management",
    title: "Wealth Management",
    summary:
      "A single, coordinated strategy for your entire balance sheet — built around your family, not a product shelf.",
    description:
      "We act as the architect and steward of your complete financial picture, aligning liquid portfolios, private holdings, and lifestyle assets under one disciplined plan.",
    features: [
      "Consolidated balance-sheet oversight",
      "Bespoke asset allocation",
      "Liquidity & cash-flow design",
      "Dedicated private advisor",
    ],
    icon: "gem",
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    summary:
      "Institutional-grade portfolio construction with access to public and private markets.",
    description:
      "Our investment committee builds resilient, globally diversified portfolios — spanning public equities, fixed income, and curated private-market opportunities.",
    features: [
      "Strategic & tactical allocation",
      "Private markets & alternatives",
      "Risk-managed mandates",
      "Quarterly performance reviews",
    ],
    icon: "chart",
  },
  {
    slug: "retirement-planning",
    title: "Retirement Planning",
    summary:
      "A confident transition into the next chapter, with income that lasts as long as you do.",
    description:
      "We model decades of spending, taxes, and market scenarios so you can step back on your own terms — and stay there.",
    features: [
      "Income sustainability modelling",
      "Pension & account optimisation",
      "Healthcare & longevity planning",
      "Scenario stress-testing",
    ],
    icon: "compass",
  },
  {
    slug: "estate-planning",
    title: "Estate Planning",
    summary:
      "Pass on more than capital — pass on intent, values, and a structure that endures.",
    description:
      "Working alongside your attorneys, we design trust and gifting structures that transfer wealth efficiently and protect the next generation.",
    features: [
      "Trust & entity coordination",
      "Multi-generational gifting",
      "Philanthropic structuring",
      "Family governance",
    ],
    icon: "scroll",
  },
  {
    slug: "tax-strategy",
    title: "Tax Strategy",
    summary:
      "Keep more of what you earn through proactive, year-round tax coordination.",
    description:
      "We integrate tax thinking into every decision — from asset location to charitable timing — in partnership with your CPA.",
    features: [
      "Asset-location optimisation",
      "Tax-loss harvesting",
      "Charitable & gifting timing",
      "Entity & compensation planning",
    ],
    icon: "scale",
  },
  {
    slug: "risk-protection",
    title: "Risk & Protection",
    summary:
      "Insulate your family's wealth from the shocks you cannot predict.",
    description:
      "From liability to longevity, we identify exposures across your balance sheet and structure protection that fits the life you've built.",
    features: [
      "Wealth-protection review",
      "Insurance strategy",
      "Liability & entity shielding",
      "Cyber & fraud safeguards",
    ],
    icon: "shield",
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "$8.4B", label: "Assets under advisement" },
  { value: "320+", label: "Families & institutions served" },
  { value: "27 yrs", label: "Average advisor tenure" },
  { value: "98%", label: "Client retention rate" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Aurelia brought order to a balance sheet that three other firms had only complicated. They think like owners, not salespeople.",
    author: "M. Harrington",
    role: "Founder, private holding company",
  },
  {
    quote:
      "The team modelled our succession a decade out and gave our children a structure — and a vocabulary — for stewardship.",
    author: "The Delacroix Family",
    role: "Third-generation clients",
  },
  {
    quote:
      "Discreet, rigorous, and genuinely aligned. In fifteen years I have never felt like a transaction.",
    author: "Dr. A. Whitfield",
    role: "Endowment trustee",
  },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
};

export const articles: Article[] = [
  {
    slug: "the-quiet-power-of-asset-location",
    title: "The Quiet Power of Asset Location",
    excerpt:
      "Where you hold an investment can matter as much as what you hold. A look at the after-tax mathematics most portfolios ignore.",
    category: "Tax Strategy",
    date: "May 2026",
    readTime: "6 min read",
    author: "Eleanor Vance",
  },
  {
    slug: "private-markets-without-the-hype",
    title: "Private Markets, Without the Hype",
    excerpt:
      "Alternatives can strengthen a portfolio — or quietly add risk and illiquidity. A disciplined framework for allocation.",
    category: "Investments",
    date: "April 2026",
    readTime: "8 min read",
    author: "Marcus Reyes",
  },
  {
    slug: "teaching-the-next-generation",
    title: "Teaching the Next Generation to Steward Wealth",
    excerpt:
      "Capital is transferred in an afternoon; stewardship takes a generation. How families build financial fluency that lasts.",
    category: "Legacy",
    date: "April 2026",
    readTime: "5 min read",
    author: "Priya Nair",
  },
  {
    slug: "rethinking-the-60-40-portfolio",
    title: "Rethinking the 60/40 Portfolio",
    excerpt:
      "The classic balanced portfolio was built for a different macro regime. What a modern, resilient core looks like today.",
    category: "Investments",
    date: "March 2026",
    readTime: "7 min read",
    author: "Marcus Reyes",
  },
  {
    slug: "philanthropy-as-strategy",
    title: "Philanthropy as Strategy, Not Afterthought",
    excerpt:
      "Donor-advised funds, charitable trusts, and timing — aligning generosity with tax efficiency and family values.",
    category: "Legacy",
    date: "February 2026",
    readTime: "6 min read",
    author: "Priya Nair",
  },
  {
    slug: "the-case-for-patience",
    title: "The Case for Patience in Volatile Markets",
    excerpt:
      "Behaviour, not forecasting, is where most returns are won or lost. Notes on staying invested when it is hardest.",
    category: "Markets",
    date: "January 2026",
    readTime: "5 min read",
    author: "Eleanor Vance",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Eleanor Vance",
    role: "Managing Partner & CIO",
    bio: "Three decades shaping portfolios for founders and family offices. Eleanor chairs the investment committee and sets the firm's research agenda.",
    initials: "EV",
  },
  {
    name: "Marcus Reyes",
    role: "Partner, Investment Advisory",
    bio: "Former institutional allocator with a focus on private markets and risk-managed mandates for multi-generational clients.",
    initials: "MR",
  },
  {
    name: "Priya Nair",
    role: "Partner, Wealth & Legacy",
    bio: "Priya leads estate, philanthropic, and family-governance work, helping clients transfer not only assets but intent.",
    initials: "PN",
  },
  {
    name: "James Caldwell",
    role: "Head of Tax Strategy",
    bio: "A CPA by training, James integrates year-round tax planning into every client's broader financial architecture.",
    initials: "JC",
  },
];

export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Independence",
    description:
      "We answer only to our clients. No proprietary products, no hidden incentives — just advice aligned with your interests.",
  },
  {
    title: "Discretion",
    description:
      "Privacy is the foundation of trust. Your affairs are handled with the confidentiality they deserve.",
  },
  {
    title: "Stewardship",
    description:
      "We measure success in decades and generations, not quarters — preserving and growing what matters to you.",
  },
];
