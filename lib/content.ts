// Centralised content for the Carron Business Advisory site.
// Swap these out for real copy / a CMS later. Articles live in lib/articles.ts.

export type IconName =
  | "cashflow"
  | "profit"
  | "funding"
  | "reporting"
  | "governance"
  | "growth";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "cash-flow-command",
    title: "Cash Flow Command",
    summary:
      "Know exactly what's in the bank next week, next month, and next quarter — before it becomes a crisis.",
    description:
      "We build a rolling 13-week cash flow forecast so you can see runway, plan around tight weeks, and stop being surprised by month-end. Working capital, debtors, and creditors — managed, not guessed.",
    features: [
      "Rolling 13-week cash flow forecast",
      "Working-capital and debtor-days clarity",
      "Runway visibility, weeks ahead",
      "Early warning on cash crunches",
    ],
    icon: "cashflow",
  },
  {
    slug: "profit-and-pricing",
    title: "Profit & Pricing",
    summary:
      "Find out which products, clients, and jobs actually make money — and which quietly bleed it.",
    description:
      "Revenue is vanity; margin is sanity. We break down your unit economics so you know your true gross margin, your break-even, and where a pricing change earns more than a sales push ever could.",
    features: [
      "Gross-margin and unit-economics analysis",
      "Product, client, and job-level profitability",
      "Break-even and contribution modelling",
      "Pricing and discount discipline",
    ],
    icon: "profit",
  },
  {
    slug: "funding-and-banks",
    title: "Funding & Banks",
    summary:
      "Walk into the bank with numbers they trust — and walk out with the facility you asked for.",
    description:
      "When you need to raise capital or negotiate a facility, the numbers have to stack up. We prepare investor- and bank-ready forecasts and financials, then sit alongside you in the conversation.",
    features: [
      "Bank- and investor-ready forecasts",
      "Funding applications and motivations",
      "Facility and overdraft negotiation",
      "Lender and investor relationships",
    ],
    icon: "funding",
  },
  {
    slug: "reporting-and-systems",
    title: "Reporting & Systems",
    summary:
      "A board-grade dashboard that tells you what's happening now — not what happened three months ago.",
    description:
      "We clean up your accounting system and build management reporting you'll actually use: a one-page dashboard of the numbers that move your business, delivered on time, every month.",
    features: [
      "Board-grade management dashboards",
      "Clean, reliable accounting systems",
      "Monthly management accounts that arrive on time",
      "The handful of KPIs that matter",
    ],
    icon: "reporting",
  },
  {
    slug: "risk-and-governance",
    title: "Risk & Governance",
    summary:
      "Strengthen decision-making, accountability, and financial control without burying the business in bureaucracy.",
    description:
      "We clarify financial decision rights, reporting accountability, key risks, and practical controls. Your accountant and tax advisers keep ownership of compliance; Carron makes sure leadership sees the risks and acts in time.",
    features: [
      "Board and management governance",
      "Financial risk and control review",
      "Decision rights and accountability",
      "Coordination with accountants and auditors",
    ],
    icon: "governance",
  },
  {
    slug: "growth-and-strategy",
    title: "Growth & Strategy",
    summary:
      "Turn a gut-feel for where the business is going into a plan you can fund, measure, and adjust.",
    description:
      "We pressure-test your growth plans with scenario modelling — what a new hire, a new branch, or a big contract really does to cash and profit — and guide you through acquisitions or a sale when the time comes.",
    features: [
      "Scenario and what-if modelling",
      "Scaling and expansion plans",
      "M&A, buy-side and sell-side guidance",
      "Strategy grounded in the numbers",
    ],
    icon: "growth",
  },
];

// "Is it time for a CFO?" — honest, recognisable signs an SME has outgrown its books.
export type Sign = {
  title: string;
  description: string;
};

export const cfoSigns: Sign[] = [
  {
    title: "Cash-flow surprises",
    description:
      "Profit on paper, but somehow there's never enough in the bank when VAT or salaries fall due.",
  },
  {
    title: "Decisions on gut feel",
    description:
      "You're making big calls — hiring, pricing, that new branch — without numbers you trust behind them.",
  },
  {
    title: "The bank said no",
    description:
      "You went for funding or a facility and were turned down, and you're not entirely sure why.",
  },
  {
    title: "Month-end only looks backward",
    description:
      "Your accounts tell you what happened three months ago, never what's coming next.",
  },
  {
    title: "Growth without margin",
    description:
      "Turnover keeps climbing but the profit doesn't follow — and you can't pinpoint where it goes.",
  },
  {
    title: "A full-time CFO is out of reach",
    description:
      "You know you need senior financial leadership, but a full-time CFO salary simply doesn't add up yet.",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "For the first time I know what's in the bank three months out. We stopped lurching from one tight month to the next — and I sleep again.",
    author: "Owner-manager",
    role: "Manufacturing business, Gauteng",
  },
  {
    quote:
      "We'd been turned down twice. Carron rebuilt the numbers, sat with me at the bank, and we walked out with the facility approved.",
    author: "Founder",
    role: "Logistics SME, Western Cape",
  },
  {
    quote:
      "Turns out two of our best-selling lines were barely breaking even. We fixed the pricing and added more to the bottom line than a whole new client would have.",
    author: "Managing member",
    role: "Wholesale & distribution, KZN",
  },
];

// The advisor's philosophy — what guides the work, not slogans.
export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Outcomes, not admin",
    description:
      "You don't need another set of management accounts gathering dust. You need to know your runway, your margin, and your next move. That's what we deliver.",
  },
  {
    title: "Plain language",
    description:
      "No jargon, no lectures. We translate the numbers into decisions an owner can act on this week — and make sure you understand the why.",
  },
  {
    title: "On your side of the table",
    description:
      "We work for you, not the bank, not SARS, not a software vendor. One job: help you run a stronger, more fundable business.",
  },
];

// Engagement models — how fractional / outsourced CFO works.
export type EngagementModel = {
  name: string;
  best: string;
  description: string;
  includes: string[];
  href?: string;
  cta?: string;
};

export const engagementModels: EngagementModel[] = [
  {
    name: "Monthly Retainer",
    best: "Best for businesses that need an ongoing financial right-hand.",
    description:
      "A defined set of strategic CFO outcomes within a capped monthly time allocation. Your forecasts and decision support stay current without creating an unlimited-access commitment.",
    includes: [
      "Agreed deliverables and capped monthly hours",
      "Meetings, preparation, analysis, and correspondence included in the cap",
      "Additional work only with prior approval",
      "Scope and capacity reviewed quarterly",
    ],
  },
  {
    name: "Financial Performance Diagnostic",
    best: "Best for owners who need clarity before committing to ongoing support.",
    description:
      "A fixed-scope engagement with a clear deliverable — a funding pack, a pricing review, a 13-week cash flow build, or a clean-up of your reporting. Defined outcome, defined fee.",
    includes: [
      "Fixed scope and fixed price",
      "Financial health scorecard",
      "Five priority findings and opportunities",
      "Practical 90-day action plan",
    ],
    href: "/diagnostic",
    cta: "Explore the Diagnostic",
  },
  {
    name: "Ad-hoc Advisory",
    best: "Best for owners who just need a sounding board, occasionally.",
    description:
      "Senior financial judgement on tap, by the session. Bring a decision — a contract, an offer, a hire, a wobble — and get a clear, numbers-grounded view without a long commitment.",
    includes: [
      "Pay-as-you-go sessions",
      "No long-term commitment",
      "Quick turnaround on a specific question",
      "A second opinion before you commit",
    ],
  },
];

// How the engagement starts — a simple, low-friction path.
export type Step = {
  title: string;
  description: string;
};

export const engagementSteps: Step[] = [
  {
    title: "Discovery call",
    description:
      "A free, no-obligation conversation to understand your business, your numbers, and what's keeping you up at night.",
  },
  {
    title: "Financial Performance Diagnostic",
    description:
      "A fixed-scope review of cash, profitability, reporting, forecasting, governance, and strategic financial risk.",
  },
  {
    title: "Right-sized proposal",
    description:
      "A clear recommendation — retainer, project, or ad-hoc — with scope and fee in plain language. No tie-ins.",
  },
  {
    title: "Get to work, remotely",
    description:
      "We plug into your systems and your rhythm, wherever you are in the country, and start turning numbers into decisions.",
  },
];
