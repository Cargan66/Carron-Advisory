import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/FadeIn";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Diagnostic",
  description:
    "Start free: an instant financial health check and valuation, a R795 top-five diagnostic, or a full CFO-level review. Fixed-scope financial clarity for established South African SMEs.",
};

// The three-tier ladder. Tier 1 and Tier 2 tools are not live yet — their
// CTAs point to the #notify sign-up section further down this page.
type Tier = {
  tag: string;
  name: string;
  fee: string;
  feeNote?: string;
  soon: boolean;
  description: string;
  disclosure?: string;
  includes: string[];
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
    raw?: boolean;
  };
};

const tiers: Tier[] = [
  {
    tag: "Tier 1 · Free",
    name: "Free Health Check & Valuation",
    fee: "Free",
    soon: false,
    description:
      "Enter about ten numbers from your management accounts — around two minutes — and get an instant read on where you stand.",
    includes: [
      "A financial health score out of 100",
      "Your key financial ratios",
      "An estimated business-value range (earnings, revenue and net-asset methods)",
    ],
    cta: { label: "Run your free check", href: "/health-check/", variant: "primary", raw: true },
  },
  {
    tag: "Tier 2 · R795",
    name: "R795 Diagnostic",
    fee: "R795",
    feeNote: "once-off",
    soon: true,
    description:
      "Your top five priorities ranked by potential impact, each with a first action — generated instantly from the same numbers you have already entered.",
    disclosure:
      "An automated result with an AI-written explanation. Not advisor-reviewed at this tier.",
    includes: [
      "Top five priorities, ranked by impact",
      "A clear first action for each priority",
      "Generated instantly from your entered numbers",
    ],
    cta: { label: "Unlock your Top 5", href: "/diagnostic#notify", variant: "secondary" },
  },
  {
    tag: "Tier 3 · CFO Review",
    name: "CFO Review",
    fee: "From R4,500",
    feeNote: "plus VAT · your R795 diagnostic fee credited in full",
    soon: false,
    description:
      "A senior, advisor-verified review of your numbers — the priorities checked by a person and turned into a practical 90-day plan. Full detail below.",
    includes: [
      "Everything in the diagnostic, verified by an advisor",
      "Executive scorecard and 90-day action plan",
      "A 90-minute findings session with management",
    ],
    cta: { label: "Book a CFO Review", href: "/contact", variant: "primary" },
  },
];

const reviewAreas = [
  {
    title: "Cash & working capital",
    description:
      "Cash visibility, debtor and creditor pressure, funding headroom, and risks likely to surface over the next 13 weeks.",
  },
  {
    title: "Profitability & margins",
    description:
      "Revenue quality, gross margin, cost behaviour, break-even exposure, and where products, customers, or divisions may be diluting profit.",
  },
  {
    title: "Reporting & forecasting",
    description:
      "Whether management receives timely, decision-useful information and can see the financial effect of plans before committing.",
  },
  {
    title: "Strategy & governance",
    description:
      "Financial risks, decision rights, accountability, controls, and whether the finance function supports the next stage of growth.",
  },
];

const process = [
  {
    title: "Context",
    description:
      "A short questionnaire and 90-minute leadership discussion establish the decisions, pressures, and ambitions behind the numbers.",
  },
  {
    title: "Review",
    description:
      "We review an agreed set of management accounts, forecasts, budgets, cash information, and operating reports.",
  },
  {
    title: "Diagnosis",
    description:
      "The evidence is assessed across cash, profit, reporting, forecasting, governance, and strategic decision support.",
  },
  {
    title: "Action",
    description:
      "A findings session turns the analysis into priorities, owners, and a practical 90-day plan for management.",
  },
];

const deliverables = [
  "Executive financial health scorecard",
  "Five highest-priority findings — advisor-verified",
  "Immediate financial risks requiring attention",
  "Cash and profit improvement opportunities",
  "Reporting, forecasting, and governance gaps",
  "Recommended management KPIs",
  "Prioritised 90-day action plan",
  "90-minute executive findings session",
];

const fitSignals = [
  "You want a free, instant read on your numbers before spending anything",
  "Turnover is growing, but cash or profit is not keeping pace",
  "Management accounts look backward and arrive too late",
  "Major decisions rely more on instinct than reliable forecasts",
  "The business has an accountant or finance manager, but no strategic CFO",
  "Funding, expansion, succession, or a transaction is approaching",
];

export default function DiagnosticPage() {
  return (
    <>
      <PageHeader
        eyebrow="Diagnostic"
        title={
          <>
            See where you stand. <span className="text-gold-gradient">Free.</span>{" "}
            Then go as deep as you need.
          </>
        }
        description="A free instant read on your numbers, a fast paid diagnostic with your top priorities, or a full CFO-level review — start free and choose how far to take it."
      />

      {/* Three-tier ladder */}
      <section className="bg-emerald-base py-20 sm:py-28">
        <div className="container-luxe">
          <FadeInStagger className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <FadeInItem key={tier.name} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-emerald-section/60 p-8 transition-colors duration-300 ${
                    tier.soon
                      ? "border-white/10 hover:border-gold/30"
                      : "border-gold/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {tier.tag}
                    </p>
                    {tier.soon && (
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-bone-dim">
                        Launching soon
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-white">
                    {tier.name}
                  </h2>

                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gold-gradient">
                      {tier.fee}
                    </span>
                    {tier.feeNote && (
                      <span className="text-sm text-bone-dim">{tier.feeNote}</span>
                    )}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-bone-muted">
                    {tier.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                    {tier.includes.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2.5 text-sm text-bone/90"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 flex-none text-gold"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  {tier.disclosure && (
                    <p className="mt-5 text-xs leading-relaxed text-bone-dim">
                      {tier.disclosure}
                    </p>
                  )}

                  <div className="mt-auto pt-7">
                    {tier.cta.raw ? (
                      <a
                        href={tier.cta.href}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium tracking-wide text-emerald-deep shadow-[0_8px_30px_-12px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        {tier.cta.label}
                      </a>
                    ) : (
                      <Button
                        href={tier.cta.href}
                        variant={tier.cta.variant}
                        className="w-full"
                      >
                        {tier.cta.label}
                      </Button>
                    )}
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn className="mt-10">
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-bone-dim">
              Start with the free check. If it surfaces something worth acting on,
              step up to the R795 Top 5 or a full CFO Review — and your R795 is
              credited in full against the review.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Inside the CFO Review — what we review */}
      <section className="border-y border-white/10 bg-emerald-section py-20 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Inside the CFO Review"
            title="A commercial view of financial performance"
            description="The top tier is a senior review focused on information that affects decisions. Poor records may be identified as a risk, but repairing them is outside the review scope."
          />
          <FadeInStagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {reviewAreas.map((area, index) => (
              <FadeInItem key={area.title}>
                <article className="h-full rounded-2xl border border-white/10 bg-emerald-base/70 p-7">
                  <span className="text-sm font-bold text-gold/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {area.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-bone-muted">
                    {area.description}
                  </p>
                </article>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* The process */}
      <section className="bg-emerald-base py-20 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Process"
            title="Focused enough to move quickly. Deep enough to be useful."
          />
          <FadeInStagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <FadeInItem key={step.title} className="h-full">
                <div className="h-full bg-emerald-section p-7">
                  <span className="text-3xl font-bold text-gold/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                    {step.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* What you receive + strong fit */}
      <section className="bg-emerald-section py-20 sm:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              What you receive
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              A decision-ready diagnostic pack
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              A strong fit when
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              You want clarity before financial hindsight costs you
            </h2>
            <ul className="mt-8 space-y-3">
              {fitSignals.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Clear boundaries + typical engagement / fee */}
      <section className="border-t border-white/10 bg-emerald-base py-20 sm:py-28">
        <div className="container-luxe">
          <FadeIn className="rounded-3xl border border-gold/20 bg-emerald-section/60 px-8 py-12 sm:px-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Clear boundaries
                </p>
                <h2 className="mt-4 text-3xl font-bold text-white">
                  Insight and direction, without an open-ended assignment.
                </h2>
                <p className="mt-4 leading-relaxed text-bone-muted">
                  The Free Health Check and R795 Diagnostic are automated tools —
                  useful starting points, not advice. The CFO Review is
                  advisor-led: its fixed fee covers the agreed information review,
                  one leadership interview, analysis, a concise diagnostic report,
                  and one findings session. Bookkeeping, tax returns, audit or
                  assurance, detailed valuations, due diligence, and
                  implementation are separately scoped if required.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-emerald-base/60 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  CFO Review — typical engagement
                </p>
                <dl className="mt-6 space-y-5">
                  <Fact label="Time frame" value="Two to three weeks" />
                  <Fact
                    label="Fee"
                    value="From R4,500 plus VAT — your R795 diagnostic fee credited in full"
                  />
                  <Fact label="Management time" value="Two focused sessions" />
                  <Fact label="Commitment" value="No ongoing retainer required" />
                </dl>
                <Button href="/contact" size="lg" className="mt-8 w-full">
                  Book a CFO Review
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Get notified — Tier 1 & Tier 2 tools coming soon */}
      <section
        id="notify"
        className="scroll-mt-28 border-t border-white/10 bg-emerald-section py-20 sm:py-28"
      >
        <div className="container-luxe">
          <FadeIn className="mx-auto max-w-2xl rounded-3xl border border-gold/25 bg-emerald-base/60 px-8 py-12 text-center sm:px-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Launching soon
            </span>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
              The R795 Diagnostic is on its way
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-bone-muted">
              Your{" "}
              <a
                href="/health-check/"
                className="font-medium text-gold hover:text-gold-light"
              >
                Free Health Check &amp; Valuation
              </a>{" "}
              is live now. The paid R795 Top-5 Diagnostic — instant priorities ranked
              from your numbers — is coming next. Leave your email and we&apos;ll tell
              you the moment it opens, or book a CFO Review now.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="mailto:info@carron.co.za?subject=Notify%20me%20when%20the%20Carron%20financial%20tools%20launch">
                Notify me when it&apos;s live
              </Button>
              <Button href="/contact" variant="secondary">
                Book a CFO Review
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Not sure whether you need the free check or a full CFO Review?"
        description="Start with the business issue. We'll recommend the smallest useful step, with scope and fee agreed before any work begins."
      />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
      <dt className="text-sm text-bone-dim">{label}</dt>
      <dd className="text-right text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-bone/90">
      <svg
        className="mt-0.5 h-5 w-5 flex-none text-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}
