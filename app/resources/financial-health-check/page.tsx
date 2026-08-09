import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { HealthCheckForm } from "@/components/HealthCheckForm";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: { absolute: "SME Financial Health Check: 10-Point Diagnostic | Carron" },
  description:
    "Diagnose your business in 20 minutes. A 10-point check across cash position, receivables, margins, profitability and growth — with a downloadable checklist to track quarterly.",
  keywords: [
    "financial health check SME",
    "SME financial diagnostic",
    "business financial health South Africa",
  ],
  alternates: { canonical: "/resources/financial-health-check" },
  openGraph: {
    type: "article",
    title: "SME Financial Health Check: 10-Point Diagnostic",
    description:
      "Diagnose your business in 20 minutes across the 10 areas that decide financial health — with a downloadable checklist.",
    url: "/resources/financial-health-check",
    images: [
      {
        url: "/images/og-health-check.png",
        width: 1200,
        height: 630,
        alt: "Carron SME Financial Health Check — 10-point diagnostic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SME Financial Health Check: 10-Point Diagnostic",
    description:
      "Diagnose your business in 20 minutes across the 10 areas that decide financial health.",
    images: ["/images/og-health-check.png"],
  },
};

type Area = {
  n: number;
  title: string;
  measure: string;
  healthy: string;
  why: string;
  redFlag: string;
  action: string[];
};

const areas: Area[] = [
  {
    n: 1,
    title: "Cash Position: Do You Have Breathing Room?",
    measure:
      "How many months of operating expenses can you cover right now with cash on hand?",
    healthy:
      "2–3 months of operating expenses, plus the ability to pay all creditor obligations when due.",
    why: "Cash is oxygen. Without it, nothing else works — no matter how profitable you are.",
    redFlag: "Less than one month. You're one customer delay away from trouble.",
    action: [
      "Below two months? Prioritise cash recovery — invoice faster, tighten payables, and pause discretionary spend.",
    ],
  },
  {
    n: 2,
    title: "Receivables Aging: Are Customers Paying On Time?",
    measure: "What percentage of your invoices are paid by their due date?",
    healthy: "Over 90% paid by the due date (or when renegotiated).",
    why: "Every day late is cash trapped in operations. Net 30 slipping to Net 45 can be R50k sitting in someone else's bank account.",
    redFlag: "Under 70% on-time, especially from repeat customers.",
    action: [
      "Call overdue customers the day they're due — not ten days later.",
      "Renegotiate terms with large customers who chronically pay late.",
      "Consider retainers or deposits for new customers.",
    ],
  },
  {
    n: 3,
    title: "Payables Management: Are You Paying Within Terms?",
    measure:
      "What percentage of supplier invoices do you pay within agreed terms?",
    healthy: "100% on time (or early, if cash allows).",
    why: "Late payments damage supplier relationships, trigger penalties, and telegraph cash problems.",
    redFlag: "Paying 30+ days late when terms are Net 15 — suppliers will pull credit.",
    action: [
      "Build a payment calendar two weeks out, so you know what's due.",
      "Negotiate longer terms with key suppliers if cash is tight.",
      "Never take early-payment discounts you can't afford.",
    ],
  },
  {
    n: 4,
    title: "Gross Margin: Where Is Your Money Going?",
    measure: "Revenue minus COGS, expressed as a percentage of revenue.",
    healthy:
      "Depends on your model — retail 30–40%, services 60–80%, product varies.",
    why: "Gross margin funds everything else — salaries, rent, profit. Low margin means you need huge volume to survive.",
    redFlag: "Gross margin declining year on year with no clear explanation.",
    action: [
      "If margin is slipping, investigate: did prices drop, did COGS rise, are some products far more profitable than others?",
      "Don't set arbitrary targets — diagnose the gap, then look for pricing power, waste reduction, or a mix shift.",
    ],
  },
  {
    n: 5,
    title: "Operating Expense Ratio: Is Overhead Sustainable?",
    measure: "(Salaries + rent + insurance + other fixed) ÷ gross profit.",
    healthy: "Roughly 50–70% of gross profit (varies by industry).",
    why: "At 90% of gross profit you have almost no room for error — a slow month breaks profitability.",
    redFlag: "The ratio rising while revenue is flat or falling.",
    action: [
      "Don't reflexively cut salaries — grow revenue or reduce overhead thoughtfully.",
      "Audit fixed costs: rent, subscriptions, contractors. Which ones are earned?",
    ],
  },
  {
    n: 6,
    title: "Net Margin: Are You Actually Profitable?",
    measure: "Net profit ÷ revenue.",
    healthy: "Often 10–20% (higher for services, lower for retail).",
    why: "This is your bottom line — what you keep after paying everyone.",
    redFlag: "Net margin declining or negative while revenue grows — profit is leaking somewhere.",
    action: [
      "Run a variance analysis: what changed — COGS, overhead, a lost customer?",
      "Aim for steady year-on-year improvement; small, consistent gains compound.",
    ],
  },
  {
    n: 7,
    title: "Cash Conversion Cycle: How Long Is Cash Trapped?",
    measure: "Days inventory + days receivable − days payable.",
    healthy: "Under 60 days (ideally 30–45).",
    why: "Every day in the cycle is cash sitting in inventory or receivables. A shorter cycle means more cash to grow.",
    redFlag: "A cycle over 90 days, especially if it's growing.",
    action: [
      "Reduce inventory with tighter ordering, dropshipping or consignment.",
      "Invoice the same day, not a week later.",
      "Extend payables where you can without damaging relationships.",
    ],
  },
  {
    n: 8,
    title: "Debt-to-Revenue: How Leveraged Are You?",
    measure: "Total debt ÷ annual revenue.",
    healthy: "Under 1.0 (debt less than a year's revenue).",
    why: "High leverage means high fixed obligations — a revenue drop becomes existential.",
    redFlag: "Over 2.0 (more debt than two years of revenue).",
    action: [
      "Don't panic if it's high during growth — just stay aware.",
      "Focus on revenue growth to grow out of debt, and avoid new debt until the ratio improves.",
    ],
  },
  {
    n: 9,
    title: "Revenue Concentration: Over-Reliant on One Customer?",
    measure: "What percentage of revenue comes from your top customer? Top three?",
    healthy: "No single customer over 30%; top three under 60%.",
    why: "One customer leaving can be a crisis. At 50% of revenue, losing them means halving costs — or shutting down.",
    redFlag: "Top customer over 50% of revenue — and a price negotiator.",
    action: [
      "Actively build a more diverse customer base. If your top customer wants longer terms, build another revenue stream first.",
    ],
  },
  {
    n: 10,
    title: "Year-over-Year Growth: Are You Actually Growing?",
    measure: "Revenue growth and profit growth, year on year.",
    healthy: "Both revenue and profit growing (even if profit grows slower).",
    why: "Growth without profit is a treadmill.",
    redFlag: "Revenue up 20% but profit flat or down — something's broken in execution.",
    action: [
      "If revenue is growing but profit isn't, focus on margin, not volume.",
    ],
  },
];

const scoreBands = [
  {
    band: "8–10 healthy",
    meaning:
      "You're in good shape. Maintain discipline, and stay ahead of any watch-area before it turns into a problem.",
  },
  {
    band: "5–7 healthy",
    meaning:
      "Fix the red areas first — cash position, margin, growth. Watch-areas can wait 30–60 days.",
  },
  {
    band: "Under 5 healthy",
    meaning:
      "Systemic issues. You need a structured financial review — book a diagnostic call.",
  },
];

export default function FinancialHealthCheckPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free Resource"
        title={
          <>
            SME Financial Health Check:{" "}
            <span className="text-gold-gradient">10-Point Diagnostic</span>
          </>
        }
        description="You run a profitable business and revenue is growing — but something feels off. This 20-minute diagnostic gives you clarity across the ten areas that decide whether your business is really in control of its numbers."
      />

      <section className="bg-emerald-base py-20 sm:py-28">
        <div className="container-luxe max-w-3xl">
          {/* How this works */}
          <FadeIn>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">How this works</h2>
            <p className="mt-4 text-base leading-relaxed text-bone/90 sm:text-lg">
              We measure your business across 10 financial areas. Rate each one{" "}
              <span className="font-semibold text-emerald-300">green</span> (healthy),{" "}
              <span className="font-semibold text-gold">yellow</span> (watch), or{" "}
              <span className="font-semibold text-red-300">red</span> (needs action). At the
              end you&apos;ll know which areas are strong, which need attention first, and which
              will become problems if ignored. No benchmarks to chase — just an honest read on
              where the work is.
            </p>
          </FadeIn>

          {/* The 10 areas */}
          <FadeInStagger className="mt-14 space-y-6">
            {areas.map((a) => (
              <FadeInItem key={a.n}>
                <div className="rounded-2xl border border-white/10 bg-emerald-section/50 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-base font-bold text-gold">
                      {a.n}
                    </span>
                    <h3 className="pt-1 text-lg font-bold text-white sm:text-xl">{a.title}</h3>
                  </div>
                  <dl className="mt-5 space-y-3 text-sm leading-relaxed sm:text-base">
                    <Row label="Measure">{a.measure}</Row>
                    <Row label="Healthy" tone="good">{a.healthy}</Row>
                    <Row label="Why it matters">{a.why}</Row>
                    <Row label="Red flag" tone="bad">{a.redFlag}</Row>
                  </dl>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      Action
                    </p>
                    <ul className="mt-3 space-y-2">
                      {a.action.map((step) => (
                        <li key={step} className="flex gap-3 text-sm text-bone/90">
                          <span className="mt-[0.55rem] h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          {/* What your score means */}
          <FadeIn className="mt-16">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What your score means</h2>
            <p className="mt-4 text-base leading-relaxed text-bone/90">
              Count your green (healthy) areas.
            </p>
            <div className="mt-6 space-y-4">
              {scoreBands.map((s) => (
                <div key={s.band} className="rounded-2xl border border-white/10 bg-emerald-section/40 p-6">
                  <p className="font-semibold text-gold">{s.band}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-bone/90">{s.meaning}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Next steps */}
          <FadeIn className="mt-16">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Next steps</h2>
            <ol className="mt-6 space-y-4">
              {[
                ["Immediate (0–4 weeks)", "Fix any red areas. Call overdue receivables, adjust payables, pause discretionary spend."],
                ["Medium-term (1–3 months)", "Address the watch-areas. Renegotiate terms, build a cash forecast, investigate margin gaps."],
                ["Strategic (3+ months)", "Diversify your customer base, improve the cash cycle, and build a 13-week rolling forecast."],
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-sm font-bold text-gold">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-bone/90">
                    <span className="font-semibold text-white">{k}: </span>
                    {v}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* Download form */}
      <section className="border-t border-white/10 bg-emerald-section py-20 sm:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Download the one-page checklist
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bone/90">
              Track all 10 areas quarterly on a single page — 20 minutes, four times a year.
              It&apos;s the difference between flying blind and flying with instruments. Enter your
              details and it downloads straight away.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone-muted">
              Prefer a deeper look? Learn the{" "}
              <Link href="/insights/cash-flow-framework" className="font-medium text-gold hover:text-gold-light">
                7-step cash flow framework
              </Link>
              , explore{" "}
              <Link href="/services/fractional-cfo" className="font-medium text-gold hover:text-gold-light">
                fractional CFO services
              </Link>
              , or{" "}
              <Link href="/contact" className="font-medium text-gold hover:text-gold-light">
                book a financial diagnostic
              </Link>
              .
            </p>
          </FadeIn>

          <FadeIn className="rounded-3xl border border-gold/20 bg-emerald-base/60 p-7 sm:p-9">
            <h3 className="text-xl font-bold text-white">Get the checklist</h3>
            <p className="mt-2 text-sm leading-relaxed text-bone-muted">
              Enter your details and we&apos;ll send the checklist straight to your screen as a
              downloadable PDF.
            </p>
            <div className="mt-6">
              <HealthCheckForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Row({
  label,
  tone,
  children,
}: {
  label: string;
  tone?: "good" | "bad";
  children: React.ReactNode;
}) {
  const labelTone =
    tone === "good" ? "text-emerald-300" : tone === "bad" ? "text-red-300" : "text-gold";
  return (
    <div className="sm:flex sm:gap-4">
      <dt className={`flex-none font-semibold sm:w-32 ${labelTone}`}>{label}</dt>
      <dd className="text-bone/90">{children}</dd>
    </div>
  );
}
