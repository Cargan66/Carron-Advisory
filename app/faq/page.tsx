import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/FadeIn";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Fractional CFO Questions Answered",
  description:
    "Straight answers to what South African SME owners ask about fractional CFOs, cash flow, funding and working with Carron Business Advisory — what a fractional CFO does, what it costs, and when to hire one.",
  alternates: { canonical: "/faq" },
};

// raw:true renders a plain <a> — required for the static tool pages
// (/health-check/, /find-your-fit/, /90-day-test/), which a Next <Link> breaks.
type FaqLink = { href: string; label: string; raw?: boolean };
type Faq = { q: string; a: string; links?: FaqLink[] };
type FaqGroup = { eyebrow: string; title: string; items: Faq[] };

const faqGroups: FaqGroup[] = [
  {
    eyebrow: "The basics",
    title: "Fractional CFOs, explained",
    items: [
      {
        q: "What is a fractional CFO?",
        a: "A fractional CFO is an experienced finance executive who works with your business part-time — a few days a month, a fixed project, or on demand — instead of as a full-time hire. You get senior financial leadership on cash flow, margin, funding, reporting and strategy without carrying a full-time executive salary. Carron Business Advisory provides fractional (outsourced) CFO services to South African SMEs, remotely and countrywide.",
      },
      {
        q: "What does “fractional” mean in fractional CFO?",
        a: "“Fractional” simply means part-time, or a fraction of a full role. A fractional CFO gives you a share of a senior CFO’s time — scaled to what your business needs and can afford — rather than a full-time appointment. It is also called an outsourced or part-time CFO.",
      },
      {
        q: "What does a fractional CFO actually do?",
        a: "A fractional CFO turns your numbers into decisions: managing cash flow and forecasting, improving margins and pricing, preparing management accounts and board reporting, raising or restructuring funding, and reducing financial risk. Unlike a bookkeeper or accountant who records what already happened, a CFO is forward-looking — focused on what is coming and the next big decision.",
      },
      {
        q: "What is the difference between a bookkeeper, an accountant and a CFO?",
        a: "A bookkeeper records transactions; an accountant compiles financial statements and handles tax and compliance; a CFO uses those numbers to steer the business forward — cash, margin, funding, risk and strategy. The three roles are complementary, not interchangeable. Most owner-managed SMEs have a bookkeeper and an accountant long before anyone is doing the CFO role.",
        links: [
          {
            href: "/find-your-fit/",
            label: "Find Your Fit — 90-second quiz",
            raw: true,
          },
        ],
      },
      {
        q: "Do I still need a CFO if I already have an accountant or auditor?",
        a: "Usually yes, because they do different jobs. Your accountant or auditor looks backward — compliance, financial statements and tax. A CFO looks forward — cash flow, pricing, funding and the decisions ahead. A fractional CFO works alongside your existing accountant, not instead of them.",
      },
      {
        q: "When should an SME hire a fractional CFO?",
        a: "Common triggers are: the business is profitable on paper but cash is always tight; you are planning growth, a big investment or a funding round; margins are slipping and you are not sure why; reporting arrives late or you do not trust the numbers; or you are making major decisions on gut feel. If the business has outgrown a bookkeeper but cannot justify a full-time CFO (often R1 million or more a year in South Africa), a fractional CFO fills the gap.",
      },
    ],
  },
  {
    eyebrow: "Cost & engagement",
    title: "Working with Carron",
    items: [
      {
        q: "How much does a fractional CFO cost in South Africa?",
        a: "A fractional CFO costs a fraction of a full-time one. Instead of a full-time CFO salary — commonly R1 million or more a year in South Africa, plus benefits — you pay only for the time the business needs, typically a monthly retainer, a fixed-scope project, or ad-hoc sessions. Carron scopes each engagement to the business and quotes the fee in plain language up front, and the first discovery call is free.",
        links: [{ href: "/engagement", label: "See how engagement works" }],
      },
      {
        q: "What is Carron Business Advisory?",
        a: "Carron Business Advisory is a South African firm providing fractional and outsourced CFO services to owner-managed SMEs — senior financial leadership for businesses that have outgrown a bookkeeper but cannot justify a full-time CFO. It was founded by Carel Gangel and works remotely with clients across South Africa.",
      },
      {
        q: "Where is Carron based, and do you work with businesses across South Africa?",
        a: "Carron is based in Knysna in the Western Cape and works remotely with SMEs countrywide across South Africa. Engagements are run inside your existing systems and reporting rhythm, so location is not a constraint.",
      },
      {
        q: "What size and type of business does Carron work with?",
        a: "Carron works with owner-managed South African SMEs — typically businesses that have outgrown a bookkeeper but are not large enough for a full-time CFO. The approach suits most sectors, including trade and retail, services, manufacturing, construction, transport and professional practices.",
      },
      {
        q: "How does an engagement with Carron work, and how do I get started?",
        a: "It starts with a free, no-obligation discovery call about your business and your numbers. From there you can take a fixed-scope financial diagnostic that surfaces your priorities and a 90-day plan, then a right-sized engagement — retainer, project or ad-hoc — with scope and fee agreed up front. You only take on what the business actually needs.",
        links: [{ href: "/contact", label: "Book a free discovery call" }],
      },
    ],
  },
  {
    eyebrow: "Problems we solve",
    title: "Where a CFO makes the difference",
    items: [
      {
        q: "Can a fractional CFO help if my business is profitable but always short of cash?",
        a: "Yes — this is one of the most common reasons SMEs bring in a CFO. Profit and cash are not the same thing: money gets tied up in debtors, stock, tax timing and debt repayments. A fractional CFO builds a cash-flow forecast, finds where cash is trapped, and puts a plan in place so you can see and fund what is coming.",
      },
      {
        q: "Can a fractional CFO help me raise funding or get a bank loan?",
        a: "Yes. A CFO prepares the numbers that lenders and investors expect — forecasts, management accounts and a credible plan — and helps you choose the right kind of funding and present a fundable case. Becoming “bank-ready” or “investment-ready” is largely a finance-leadership job.",
      },
      {
        q: "How is a fractional CFO different from an outsourced accounting firm?",
        a: "An outsourced accounting firm typically handles bookkeeping, financial statements, payroll and tax — essential compliance work that looks backward. A fractional CFO is a strategic role that looks forward: interpreting the numbers, guiding decisions, and sitting on your side of the table for cash, margin, funding and growth. The two work well together.",
      },
    ],
  },
  {
    eyebrow: "Free tools",
    title: "Try before you talk to us",
    items: [
      {
        q: "Does Carron offer any free tools?",
        a: "Yes — three free tools, each a couple of minutes. The Financial Health Check & Valuation asks for about ten numbers and gives you a health score out of 100, your key ratios benchmarked against your industry, and an indicative business value. Find Your Fit is a 90-second quiz that tells you whether you need a bookkeeper, an accountant or a CFO. And the 90-Day Test scores whether your business could run for 90 days without you, and the bottlenecks to fix first.",
        links: [
          { href: "/health-check/", label: "Financial Health Check", raw: true },
          { href: "/find-your-fit/", label: "Find Your Fit", raw: true },
          { href: "/90-day-test/", label: "The 90-Day Test", raw: true },
        ],
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((g) =>
  g.items.map((it) => ({ question: it.q, answer: it.a })),
);

function ArrowLink({ href, label, raw }: FaqLink) {
  const className =
    "inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light";
  const inner = (
    <>
      {label}
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
  // Static tool pages must use a plain <a> (a Next <Link> breaks client nav to them).
  return raw ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={allFaqs} />

      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Fractional CFO questions,{" "}
            <span className="text-gold-gradient">answered</span>
          </>
        }
        description="Straight answers to what South African SME owners ask about fractional CFOs — what they do, what they cost, when to hire one, and how Carron works. Written to be genuinely useful whether you found us on Google or asked an AI assistant."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe max-w-4xl">
          {faqGroups.map((group, gi) => (
            <div key={group.title} className={gi > 0 ? "mt-16" : ""}>
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {group.eyebrow}
                </span>
                <span className="h-px flex-1 bg-white/10" aria-hidden />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {group.title}
              </h2>

              <dl className="mt-6 divide-y divide-white/10 border-t border-white/10">
                {group.items.map((f) => (
                  <FadeIn key={f.q} className="py-7">
                    <dt className="text-lg font-semibold leading-snug text-white">
                      {f.q}
                    </dt>
                    <dd className="mt-3 text-base leading-relaxed text-stone-300/90">
                      {f.a}
                      {f.links && (
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                          {f.links.map((l) => (
                            <ArrowLink key={l.href} {...l} />
                          ))}
                        </div>
                      )}
                    </dd>
                  </FadeIn>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Still have a question about your numbers?"
        description="If your question isn't here, ask it directly. Every engagement starts with a free, no-obligation discovery call — no pressure, no tie-ins."
        primary={{ href: "/contact", label: "Ask us directly" }}
        secondary={{ href: "/tools", label: "Try the free tools" }}
      />
    </>
  );
}
