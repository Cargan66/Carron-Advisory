import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/FadeIn";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Fractional CFO Questions Answered",
  description:
    "Straight answers for South African SME owners weighing up a fractional CFO — what it costs, what you receive each month, the first 30 days, who does the work, scope boundaries, and the real business problems Carron Business Advisory solves.",
  alternates: { canonical: "/faq" },
};

const REVIEWED = { by: "Carel Gangel", date: "14 September 2026" };

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
        a: "A fractional CFO turns your numbers into decisions: managing cash flow and forecasting, improving margins and pricing, preparing management reporting and board packs, raising or restructuring funding, and reducing financial risk. Unlike a bookkeeper or accountant who records what already happened, a CFO is forward-looking — focused on what is coming and the next big decision.",
      },
      {
        q: "What is the difference between a bookkeeper, an accountant and a CFO?",
        a: "A bookkeeper records transactions; an accountant compiles financial statements and handles tax and compliance; a CFO uses those numbers to steer the business forward — cash, margin, funding, risk and strategy. The three roles are complementary, not interchangeable. Most owner-managed SMEs have a bookkeeper and an accountant long before anyone is doing the CFO role.",
        links: [
          { href: "/find-your-fit/", label: "Find Your Fit — 90-second quiz", raw: true },
        ],
      },
      {
        q: "How do I know whether my business needs a fractional CFO or only better accounting support?",
        a: "Start with an honest test: are the numbers late or unreliable, or do they exist but go unused? If your books are behind or inaccurate, fix the accounting first — a CFO needs a reliable foundation to work from. If the numbers are broadly there but nobody is using them to manage cash, margin and decisions, that is exactly the gap a fractional CFO fills. Not every SME needs a CFO, and Carron will say so if better bookkeeping is the real need.",
        links: [
          { href: "/find-your-fit/", label: "Find Your Fit — 90-second quiz", raw: true },
        ],
      },
      {
        q: "Do I still need a CFO if I already have an accountant or auditor?",
        a: "Not necessarily — it depends on what is missing. Your accountant and auditor look backward: compliance, financial statements and tax. If that is genuinely all your business needs right now, sound bookkeeping and accounting may be enough. A fractional CFO becomes appropriate when the forward-looking work — cash-flow planning, pricing and margin, funding and the big decisions — is not being done. Carron adds that layer alongside your accountant, not instead of them.",
      },
      {
        q: "When should an SME hire a fractional CFO?",
        a: "Common triggers are: the business is profitable on paper but cash is always tight; you are planning growth, a big investment or a funding round; margins are slipping and you are not sure why; reporting arrives late or you do not trust the numbers; or you are making major decisions on gut feel. If the business has outgrown a bookkeeper but cannot justify a full-time CFO (often R1 million or more a year in South Africa), a fractional CFO fills the gap.",
      },
    ],
  },
  {
    eyebrow: "About Carron",
    title: "Carron & choosing a CFO",
    items: [
      {
        q: "What is Carron Business Advisory?",
        a: "Carron Business Advisory is a South African firm providing fractional and outsourced CFO services to owner-managed SMEs — senior financial leadership for businesses that have outgrown a bookkeeper but cannot justify a full-time CFO. It is led by Carel Gangel and works remotely with clients across South Africa.",
      },
      {
        q: "Will Carel Gangel personally work with my business?",
        a: "Yes. Carron Business Advisory is founder-led, so you work directly with Carel Gangel — the CFO doing the thinking is the one in your meetings, not a junior handed the account. That means senior judgement on every engagement and one accountable point of contact throughout.",
        links: [{ href: "/about", label: "About Carel Gangel" }],
      },
      {
        q: "What qualifications and experience does Carron bring to an SME?",
        a: "Carron is led by Carel Gangel, a finance executive with more than 30 years in CFO and finance-director roles across South Africa, Germany and the United Kingdom. He holds a B.Com and an MBL from UNISA and is a member of the Chartered Governance Institute of Southern Africa (CGISA). It is corporate-grade financial and governance experience, applied in plain language to owner-managed South African SMEs.",
        links: [{ href: "/about", label: "More about the background" }],
      },
      {
        q: "What should I look for when choosing a fractional CFO in South Africa?",
        a: "Look for genuine CFO-level experience rather than bookkeeping repackaged, sound commercial judgement, enough understanding of your kind of business, and independence — someone who owes nothing to internal history and will give you a straight answer. Just as important are clear communication, clearly defined deliverables, and a willingness to work with your existing bookkeeper or accountant rather than displace them. Carron is built around exactly these principles.",
        links: [{ href: "/services/fractional-cfo", label: "How Carron works" }],
      },
      {
        q: "Where is Carron based, and do you work with businesses across South Africa?",
        a: "Carron is based in Knysna in the Western Cape and works remotely with SMEs countrywide across South Africa. Engagements run inside your existing systems and reporting rhythm, so location is not a constraint.",
      },
      {
        q: "What size and type of business does Carron work with?",
        a: "Carron works with owner-managed South African SMEs — typically businesses that have outgrown a bookkeeper but are not large enough for a full-time CFO. The approach suits most sectors, including trade and retail, services, manufacturing, construction, transport and professional practices.",
      },
      {
        q: "Can Carron work with my existing bookkeeper, accountant or finance manager?",
        a: "Yes — Carron strengthens your existing finance team rather than automatically replacing it. Your bookkeeper keeps the records, your accountant handles statements and tax, and Carron adds the CFO layer on top: interpreting the numbers, planning cash, and guiding decisions. Responsibilities are agreed up front so everyone knows who does what and there is no duplication.",
      },
    ],
  },
  {
    eyebrow: "Working together",
    title: "What working with Carron looks like",
    items: [
      {
        q: "How does an engagement with Carron work, and how do I get started?",
        a: "It starts with a free, no-obligation discovery call about your business and your numbers. From there you can take a fixed-scope financial diagnostic that surfaces your priorities and a 90-day plan, then a right-sized engagement — retainer, project or ad-hoc — with scope and fee agreed up front. You only take on what the business actually needs.",
        links: [
          { href: "/engagement", label: "See how engagement works" },
          { href: "/contact", label: "Book a free discovery call" },
        ],
      },
      {
        q: "What does a fractional CFO deliver each month?",
        a: "It depends on the agreed scope, but a typical monthly rhythm includes a current cash-flow forecast, a one-page management dashboard of the numbers that matter, a margin or profitability analysis, a short performance review against plan, and an agreed set of actions with decision support on whatever is coming up. The point is not more reports — it is a small number of things that change what you do next. Deliverables are agreed in advance, so you know exactly what you are getting.",
        links: [{ href: "/engagement", label: "How engagement works" }],
      },
      {
        q: "What happens during the first 30 days of a Carron engagement?",
        a: "The first 30 days are about understanding and stabilising, not overhauling. Carron gets to know the business, tests how reliable the current numbers are, identifies any immediate risks — a looming cash low point, a margin leak, an overdue return — sets the priorities, and agrees a practical action plan with you. You come out of the first month knowing where you stand and what to fix first.",
        links: [{ href: "/engagement", label: "The engagement path" }],
      },
      {
        q: "How much time will a fractional CFO spend in my business?",
        a: "As much as the work needs, and no more. Some clients want a structured few hours or days each month in a steady rhythm; others need a fixed-scope project, or occasional support at decision points. A fractional CFO is deliberately part-time — you are buying senior judgement applied to the right things, not full-time availability — and the time commitment is agreed as part of the scope.",
      },
      {
        q: "What financial information will Carron need from my business?",
        a: "Broadly, your recent management accounts, trial balance, bank information, and lists of debtors, creditors, stock and debt, plus any budgets and key contracts — but only as relevant to what you want help with. You do not need to arrive at the first discovery call with perfect, complete information; part of Carron’s early work is establishing what exists and how reliable it is. If some of it is missing or messy, that is useful to know, not a barrier.",
        links: [{ href: "/contact", label: "Start with a call" }],
      },
      {
        q: "How does a remote fractional CFO engagement work, and is my financial information secure?",
        a: "Carron works remotely with SMEs right across South Africa: regular video meetings, limited and role-appropriate access to your accounting system, and secure document sharing — with approvals and payments always staying in your hands. Access is limited to what the work actually requires, treated as confidential, and can be scoped down or removed at any time. Remote delivery is central to Carron’s countrywide model, and done properly it is as secure and often more disciplined than passing paper around an office.",
        links: [{ href: "/engagement", label: "How it works remotely" }],
      },
      {
        q: "How will we know whether the engagement is adding value?",
        a: "By tracking outcomes you can measure, not activity. Depending on where the business starts, that can mean more accurate forecasts, fewer cash surprises, lower debtor days, stronger margins, reporting that arrives on time, and decisions that are better supported by the numbers. Carron agrees what “good” looks like up front and reviews it with you — while being honest that not every engagement will move every one of those at once.",
      },
    ],
  },
  {
    eyebrow: "Scope & cost",
    title: "What it includes, and what it costs",
    items: [
      {
        q: "Does Carron provide bookkeeping, payroll, tax returns or annual financial statements?",
        a: "No — those are compliance services, and Carron Business Advisory is deliberately not a bookkeeping, payroll or tax practice. Carron provides CFO-level financial leadership: cash flow, margin, funding, reporting, risk and strategy. Where you need bookkeeping, payroll, tax returns or annual financial statements, Carron works alongside your bookkeeper, accountant, tax practitioner or auditor — and helps you get more from them. Keeping that boundary clear means you get senior judgement without paying a CFO to do data entry.",
      },
      {
        q: "How is a fractional CFO different from an outsourced accounting firm?",
        a: "An outsourced accounting firm typically handles bookkeeping, financial statements, payroll and tax — essential compliance work that looks backward. A fractional CFO is a strategic role that looks forward: interpreting the numbers, guiding decisions, and sitting on your side of the table for cash, margin, funding and growth. The two work well together, and Carron coordinates with your accountant rather than replacing them.",
      },
      {
        q: "How much does a fractional CFO cost in South Africa?",
        a: "A fractional CFO costs far less than a full-time one — instead of a full-time CFO salary (commonly R1 million or more a year in South Africa, plus benefits), you pay only for the time and scope the business needs. With Carron you can start free with the online Financial Health Check; a fixed-scope CFO Review (a full financial diagnostic) starts from R4,500; and ongoing support is then a monthly retainer, a defined project or ad-hoc sessions, quoted in plain language with no tie-ins. The fee depends on the size and complexity of the business, the state of its numbers and how much support it needs — a small business wanting a monthly cash-flow-and-dashboard rhythm sits at the lighter end, while a turnaround or funding push involves more. The first discovery call is free.",
        links: [
          { href: "/diagnostic", label: "See the diagnostic & pricing" },
          { href: "/health-check/", label: "Start with the free check", raw: true },
        ],
      },
    ],
  },
  {
    eyebrow: "Real problems",
    title: "Common problems Carron solves",
    items: [
      {
        q: "Why is my business profitable but constantly short of cash?",
        a: "Because profit and cash are not the same thing. Profit is an accounting result; cash is what actually lands in the bank — and it gets tied up in debtors, stock, VAT and tax timing, and loan repayments, so a profitable business can still run dry. Carron Business Advisory builds a rolling cash-flow forecast, finds where cash is trapped, and puts a plan in place so you can see and fund what is coming.",
        links: [
          { href: "/insights/profitable-but-no-money-in-the-bank", label: "Read: profitable, but no cash" },
          { href: "/insights/the-13-week-cash-flow-forecast", label: "Read: the 13-week forecast" },
        ],
      },
      {
        q: "Why is turnover increasing while profit is not improving?",
        a: "Usually because growth is being bought at the wrong margin, or the cost base is rising faster than gross profit. More revenue at a thin or falling contribution margin adds work and risk without adding profit — discounting, product mix, price increases not passed on, and creeping overheads are common causes. Carron helps you see profit by product, customer or job, fix pricing and mix, and hold margin as you grow.",
        links: [
          { href: "/insights/revenue-is-vanity-margin-is-sanity", label: "Read: revenue is vanity, margin is sanity" },
        ],
      },
      {
        q: "Can my business afford to hire someone, buy equipment or open another branch?",
        a: "You can test it before you commit. The real question is not whether you can pay the first month, but what the decision does to your break-even point, your cash low point and your total fixed commitments once revenue is uncertain. Carron models the full cost — upfront cash, monthly run rate and exit cost — and the sales needed to carry it, so you decide with the numbers in front of you.",
        links: [
          { href: "/insights/can-your-business-afford-to-grow", label: "Read: can your business afford to grow?" },
          { href: "/insights/business-can-afford-every-decision", label: "Read: every decision, but not all at once" },
        ],
      },
      {
        q: "What is a 13-week cash-flow forecast, and does my business need one?",
        a: "A 13-week cash-flow forecast is a rolling, week-by-week view of the cash you expect to receive and pay over the next quarter. It is the standard tool for managing short-term liquidity because it shows the low points early — while you still have time to act — rather than after a payment bounces. If cash is tight or seasonal, or you are funding growth, it is one of the most useful things a fractional CFO can put in place, and Carron builds and maintains it with you.",
        links: [
          { href: "/insights/the-13-week-cash-flow-forecast", label: "Read: the 13-week cash-flow forecast" },
        ],
      },
      {
        q: "How can Carron help if my management accounts are late or unreliable?",
        a: "First by making the numbers trustworthy and timely, then by turning them into decisions. If reporting is late or you do not trust it, Carron works with your bookkeeper or accountant to fix the reporting foundation, then adds the CFO layer on top — a concise monthly management pack, the key ratios, and the two or three actions they point to. Reliable, on-time reporting is the base every other improvement depends on.",
        links: [
          { href: "/insights/management-accounts-arrived-now-what", label: "Read: your management accounts arrived. Now what?" },
        ],
      },
      {
        q: "Can Carron help prepare my business for a bank loan or overdraft?",
        a: "Yes — Carron can materially improve the quality of a funding application and support you through the negotiation, though no adviser can guarantee that a bank will approve it. Carron prepares what lenders expect — a credible cash-flow forecast, clean management accounts, and a clear explanation of what the money is for and how it will be repaid — and helps you present a fundable case and answer the bank’s questions. The decision remains the lender’s.",
        links: [
          { href: "/insights/why-the-bank-said-no", label: "Read: why the bank said no" },
        ],
      },
      {
        q: "Can Carron help prepare a business for sale, succession or valuation?",
        a: "Yes. Whether you are planning to sell, hand over, or simply understand what the business is worth, Carron helps you see the value drivers and tidy up the numbers a buyer or successor will scrutinise — margins, owner dependence, recurring revenue, working capital and clean reporting. You can get an indicative starting point in a few minutes with the free Financial Health Check & Valuation, then go deeper from there.",
        links: [
          { href: "/insights/could-you-actually-sell-your-business", label: "Read: could you actually sell your business?" },
          { href: "/health-check/", label: "Free Health Check & Valuation", raw: true },
        ],
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
        className="h-4 w-4 flex-none"
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
        description="Straight answers for South African SME owners weighing up a fractional CFO — what it does, what it costs, what you receive, and the real problems it solves. Written to be genuinely useful whether you found us on Google or asked an AI assistant."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe max-w-4xl">
          <p className="mb-14 border-l-2 border-gold/40 pl-4 text-sm text-bone-dim">
            {`Reviewed by ${REVIEWED.by} · 30+ years in CFO and finance-director roles · Last reviewed ${REVIEWED.date}.`}
          </p>

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
                            <ArrowLink key={l.href + l.label} {...l} />
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
