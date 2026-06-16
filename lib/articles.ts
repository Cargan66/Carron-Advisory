// Data-driven Insights. Add a new post by appending to `articles` below —
// the home teaser, the Insights index, and the /insights/[slug] route all read
// from here. Bodies use a tiny convention: blank lines separate paragraphs,
// and a line beginning with "## " renders as a subheading.

export type ArticleCategory =
  | "Cash Flow"
  | "Funding"
  | "Profitability"
  | "Tax"
  | "Strategy";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) — used for sorting and display. */
  date: string;
  readTime: string;
  author: string;
  /** Cover image path under /public. */
  cover: string;
  /** Optional downloadable PDF (path under /public) — for report-style posts. */
  pdf?: string;
  body: string;
};

export const articles: Article[] = [
  {
    slug: "ai-is-no-longer-optional",
    cover: "/images/ai-report.jpg",
    pdf: "/articles/Carron_AI_Article_2026.pdf",
    title: "AI Is No Longer Optional — For South African SMEs",
    category: "Strategy",
    excerpt:
      "Our 2026 special report: a practical, evidence-based look at AI adoption for South African SMEs — the tools that earn their keep, the barriers, and a 90-day starter roadmap.",
    date: "2026-06-15",
    readTime: "PDF report",
    author: "Carron Business Advisory",
    body: `South Africa's small and medium enterprises are at a genuine inflection point. After a decade defined by load-shedding, constrained credit, and rising costs, the next challenge is quieter but just as consequential: keeping pace with the AI revolution reshaping how competitive businesses operate.

This special report is written for owners who know the conversation is happening but haven't yet found a clear, practical way into it. It sets out where South African SMEs stand in the global AI landscape, why the window to act is narrowing, which tools offer genuine value at accessible price points, and exactly how to begin.

The central finding is straightforward: businesses integrating AI today are outpacing those that aren't — on speed, output quality, customer responsiveness, and profitability. The gap compounds. A business that begins now will be materially more capable by year-end than a competitor who waits.

## What's inside

- The state of AI in South Africa, with verified 2026 indicators
- Why AI is no longer optional — and what the gap is already costing
- Practical AI tools across every part of your business
- The real barriers, and how to break them
- A 90-day starter roadmap you can act on this quarter

Open the full report in your browser, or download the PDF to read at your leisure.`,
  },
  {
    slug: "the-13-week-cash-flow-forecast",
    cover: "/images/insights-desk.jpg",
    title: "The 13-Week Cash Flow Forecast Every SME Should Run",
    category: "Cash Flow",
    excerpt:
      "Profit doesn't pay salaries — cash does. Here's the single most useful report a growing business can keep, and how to build it.",
    date: "2026-06-02",
    readTime: "6 min read",
    author: "Carron Business Advisory",
    body: `Most owner-managed businesses run on a bank balance and a gut feel. That works until it doesn't — usually the week a big VAT payment, a payroll run, and a slow-paying debtor all land at once.

The fix isn't a fancier accounting package. It's a rolling 13-week cash flow forecast: a simple, weekly view of the cash you expect in and the cash you expect out, thirteen weeks ahead.

## Why 13 weeks

Thirteen weeks is one quarter. It's long enough to see a crunch coming while there's still time to act — chase a debtor, delay a discretionary spend, draw on a facility — and short enough that you can forecast each week with real confidence.

## What goes in it

Start with your opening bank balance. Then, week by week, list the cash actually landing in your account: customer receipts timed to when they really pay, not when you invoice. Against that, list the cash actually leaving: salaries, suppliers, rent, loan repayments, VAT, and PAYE.

The number that matters is the closing balance each week. The moment it dips toward zero — or below your overdraft limit — you've found a problem you can still do something about.

## Making it a habit

A forecast is only useful if it's current. Update it weekly, compare what you forecast against what actually happened, and tighten your assumptions. Within a month or two you'll trust it — and you'll stop being surprised by your own bank account.

This is exactly the kind of discipline a fractional CFO brings: not a one-off spreadsheet, but a living forecast that turns cash from a worry into a managed number.`,
  },
  {
    slug: "why-the-bank-said-no",
    cover: "/images/funding-towers.jpg",
    title: "Why the Bank Said No — and How to Change the Answer",
    category: "Funding",
    excerpt:
      "A declined facility is rarely about the business itself. More often it's about how the numbers were presented. Here's what lenders actually look for.",
    date: "2026-05-18",
    readTime: "7 min read",
    author: "Carron Business Advisory",
    body: `Being turned down for funding stings — especially when you know the business is sound. But lenders aren't rejecting your business so much as the case you put in front of them. Fix the case, and the answer often changes.

## They're buying certainty, not optimism

A bank lends against its confidence that it will be repaid. A hockey-stick forecast with no working behind it reads as a wish, not a plan. A grounded forecast — built on your actual margins, your real debtor days, and a sober view of the downside — reads as a business that knows itself.

## The three things they check first

First, can you service the debt? They'll stress-test whether your cash flow covers the repayment even in a soft month. Second, is the information reliable? Clean, current management accounts signal a business in control. Late, messy numbers signal risk. Third, do you have skin in the game and a plan for the money?

## Present it like a CFO would

The businesses that get a yes walk in with a tight pack: recent management accounts, a 13-week cash flow, a funding motivation that explains exactly what the money is for and how it gets repaid, and answers ready for the obvious questions.

That's the work a fractional CFO does before the meeting — and the reason it's often worth having one in the room with you.`,
  },
  {
    slug: "revenue-is-vanity-margin-is-sanity",
    cover: "/images/retail-pricing.jpg",
    title: "Revenue Is Vanity, Margin Is Sanity",
    category: "Profitability",
    excerpt:
      "Chasing turnover can quietly make a business poorer. A look at why margin — not sales — is the number that keeps you solvent.",
    date: "2026-05-04",
    readTime: "5 min read",
    author: "Carron Business Advisory",
    body: `"We're growing!" is one of the most dangerous things an owner can believe without checking the margin behind it. Plenty of businesses have grown their way into a cash crisis by selling more of something that barely makes money.

## Know your true gross margin

Gross margin is what's left after the direct cost of delivering the sale. If you don't know it — per product, per client, per job — you're flying blind. The exercise of working it out almost always turns up surprises: a flagship product that's barely profitable, or a "difficult" client who's actually your best one.

## The pricing lever beats the sales lever

For most SMEs, a small price increase drops almost entirely to the bottom line, while the same effort spent chasing new sales carries cost all the way through. Before you hire another salesperson, ask whether a disciplined pricing review would earn more — faster, and with less risk.

## Cut the quiet losers

Once you can see profitability line by line, the decisions get easier. Reprice the thin-margin work, fire the loss-making lines, and put your energy behind what actually pays. That's not cost-cutting — it's knowing where the money really comes from.

A fractional CFO's first job is usually exactly this: turning a fog of turnover into a clear map of where you make and lose money.`,
  },
  {
    slug: "provisional-tax-without-the-panic",
    cover: "/images/tax-paperwork.jpg",
    title: "Provisional Tax Without the Panic",
    category: "Tax",
    excerpt:
      "Two deadlines a year catch out countless SA business owners. A calmer, planned approach to provisional tax — and staying square with SARS.",
    date: "2026-04-20",
    readTime: "6 min read",
    author: "Carron Business Advisory",
    body: `For many South African business owners, provisional tax arrives like bad weather — twice a year, always sooner than expected, and often bigger than the bank balance can comfortably handle. It doesn't have to be that way.

## The problem is timing, not tax

Provisional tax itself is straightforward: you estimate your taxable income and pay it in two main bites during the year. The pain comes from not setting the money aside and from guessing the estimate badly — too low invites penalties and interest, too high ties up cash you needed.

## Set it aside as you go

The simplest discipline in the world: every month, move a sensible percentage of profit into a separate account earmarked for SARS. When the deadline comes, the money is already there. No scramble, no facility, no stress.

## Estimate from real numbers

A good provisional estimate comes from up-to-date management accounts and a realistic forecast for the rest of the year — not last year's figure with a finger in the air. Get the estimate close, and you avoid both penalties and the cash-flow whiplash of an over-payment.

## Plan the structure, too

Beyond the deadlines, how your business is structured affects what you ultimately pay. That's worth reviewing proactively with your advisor and accountant — well before year-end, when there's still time to act.

Handled this way, tax becomes another planned line in the cash flow rather than a recurring emergency.`,
  },
  {
    slug: "management-accounts-that-earn-their-keep",
    cover: "/images/reporting-dashboard.jpg",
    title: "Management Accounts That Actually Earn Their Keep",
    category: "Cash Flow",
    excerpt:
      "If your monthly accounts get filed and forgotten, they're costing you money. What board-grade reporting looks like for an SME.",
    date: "2026-04-06",
    readTime: "5 min read",
    author: "Carron Business Advisory",
    body: `Plenty of businesses produce management accounts. Far fewer use them. If yours arrive late, run to twenty pages, and get filed without a decision attached, they're an expense rather than a tool.

## One page, on time

Good SME reporting fits on a page and lands within days of month-end, not weeks. It shows the handful of numbers that actually move your business — cash, gross margin, the order book, debtor days — alongside the budget and the trend, so a glance tells you whether you're on track.

## Numbers with a "so what"

A figure on its own is trivia. The value is in the read-out: revenue is up but margin slipped — why, and what do we do? Debtor days crept out to 65 — who do we call this week? Reporting should end in actions, not just observations.

## Clean systems underneath

You can't get reliable reports out of a messy accounting system. Part of the work is upstream: a tidy chart of accounts, disciplined capture, and reconciliations that actually reconcile. Get that right and the reporting almost writes itself.

This is the rhythm a fractional CFO installs — reporting you read because it tells you something, every single month.`,
  },
  {
    slug: "what-a-fractional-cfo-actually-does",
    cover: "/images/boardroom.jpg",
    title: "What a Fractional CFO Actually Does",
    category: "Profitability",
    excerpt:
      "Not a bookkeeper, not an auditor, not a full-time hire. A plain explanation of the role — and when an SME is ready for one.",
    date: "2026-03-23",
    readTime: "6 min read",
    author: "Carron Business Advisory",
    body: `"Fractional CFO" is a tidy phrase for a simple idea: senior financial leadership, for a fraction of the time and cost of a full-time hire. But it's often misunderstood, so here's the plain version.

## Not the bookkeeper, not the auditor

Your bookkeeper records what happened. Your auditor checks it after the fact. A CFO is forward-looking: they own the cash flow forecast, the margin analysis, the funding strategy, and the financial side of the big decisions. Different job, different altitude.

## What "fractional" means

It means you get that seniority part-time — a few days a month, or a focused project — rather than carrying a full executive salary. For a business that has outgrown a bookkeeper but can't yet justify a R1.5m-a-year finance chief, it's the bridge.

## When you're ready for one

The signs are familiar: cash flow surprises you, you're making big calls on gut feel, the bank has gone cold, or growth isn't turning into profit. If two or three of those ring true, the question isn't whether you need senior financial input — it's how to get it affordably.

## Delivered remotely

None of this requires someone in your office. With cloud accounting and a regular rhythm of calls and reporting, a fractional CFO works just as well across the country as down the corridor — which is exactly how we work with SMEs nationwide.`,
  },
];

const toTime = (iso: string) => new Date(iso).getTime();

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => toTime(b.date) - toTime(a.date));
}

/** The N most recent articles (defaults to 3 for the home teaser). */
export function getRecentArticles(count = 3): Article[] {
  return getAllArticles().slice(0, count);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Format an ISO date as e.g. "2 June 2026" for South African readers. */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
