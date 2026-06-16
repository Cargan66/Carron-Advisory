import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/FadeIn";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Financial Performance Diagnostic",
  description:
    "A fixed-scope CFO diagnostic for established South African SMEs, covering cash, profitability, reporting, forecasting, and financial risk, with a practical 90-day action plan.",
};

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
  "Five highest-priority findings",
  "Immediate financial risks requiring attention",
  "Cash and profit improvement opportunities",
  "Reporting, forecasting, and governance gaps",
  "Recommended management KPIs",
  "Prioritised 90-day action plan",
  "90-minute executive findings session",
];

const fitSignals = [
  "Turnover is growing, but cash or profit is not keeping pace",
  "Management accounts look backward and arrive too late",
  "Major decisions rely more on instinct than reliable forecasts",
  "The business has an accountant or finance manager, but no strategic CFO",
  "Funding, expansion, succession, or a transaction is approaching",
  "The owner wants an independent view before committing to a retainer",
];

export default function DiagnosticPage() {
  return (
    <>
      <PageHeader
        eyebrow="Financial Performance Diagnostic"
        title={
          <>
            See what the numbers are really saying, then decide{" "}
            <span className="text-gold-gradient">what to do next</span>.
          </>
        }
        description="A focused, fixed-scope review for established SMEs that need independent CFO-level insight without committing to an ongoing engagement."
      />

      <section className="bg-emerald-base py-20 sm:py-28">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              The outcome
            </span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Clarity on the few financial issues that matter most now.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-muted">
              This is not an audit, a bookkeeping clean-up, or a generic report.
              It is a senior financial review designed to show management where
              value is being lost, where risk is building, and which actions
              deserve attention first.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-gold/25 bg-emerald-section p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Typical engagement
              </p>
              <dl className="mt-6 space-y-5">
                <Fact label="Time frame" value="Two to three weeks" />
                <Fact label="Fixed fee" value="From R25,000 plus VAT" />
                <Fact label="Management time" value="Two focused sessions" />
                <Fact label="Commitment" value="No ongoing retainer required" />
              </dl>
              <Button href="/contact" size="lg" className="mt-8 w-full">
                Discuss a Diagnostic
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-white/10 bg-emerald-section py-20 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What We Review"
            title="A commercial view of financial performance"
            description="The work stays focused on information that affects decisions. Poor records may be identified as a risk, but repairing them is outside the diagnostic scope."
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
              The business has outgrown financial hindsight
            </h2>
            <ul className="mt-8 space-y-3">
              {fitSignals.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

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
                  The fixed fee covers the agreed information review, one
                  leadership interview, analysis, a concise diagnostic report,
                  and one findings session. Bookkeeping, tax returns, audit or
                  assurance, detailed valuations, due diligence, and
                  implementation are separately scoped if required.
                </p>
              </div>
              <div className="lg:text-right">
                <Button href="/contact" size="lg">
                  Start the Conversation
                </Button>
                <p className="mt-4 text-sm text-bone-dim">
                  A short discovery call confirms fit before any work begins.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Not sure whether you need a diagnostic or ongoing CFO support?"
        description="Start with the business issue. We'll recommend the smallest useful engagement, with scope and fee agreed before work begins."
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
