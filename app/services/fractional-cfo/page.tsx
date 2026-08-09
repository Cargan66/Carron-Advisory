import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { services, engagementModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fractional CFO Services",
  description:
    "Fractional CFO services for South African SMEs — senior financial leadership on a part-time basis. What it is, how it works, our approach, and pricing. Book a financial diagnostic call.",
  alternates: { canonical: "/services/fractional-cfo" },
};

const howItWorks = [
  {
    step: "1",
    title: "Discovery call",
    body: "A free, no-obligation conversation about your business, your numbers, and what's keeping you up at night — so we both know whether a CFO is what you need.",
  },
  {
    step: "2",
    title: "Financial diagnostic",
    body: "A fixed-scope review of cash, margin, reporting, funding and risk that surfaces your highest-priority findings and a practical 90-day plan.",
  },
  {
    step: "3",
    title: "Right-sized engagement",
    body: "A clear recommendation — retainer, project or ad-hoc — with scope and fee in plain language. You only take on what the business actually needs.",
  },
  {
    step: "4",
    title: "We plug in and deliver",
    body: "We work inside your systems and your rhythm, remotely, turning the numbers into decisions month after month — and flex as you grow.",
  },
];

const approach = [
  {
    title: "Forward-looking, not backward",
    body: "A bookkeeper records what happened; a CFO looks at what's coming — cash, margin, funding and the next big decision.",
  },
  {
    title: "Plain language, owner-first",
    body: "No jargon and no lectures. We translate the numbers into moves an owner can make this week, and always explain the why.",
  },
  {
    title: "On your side of the table",
    body: "We work for you — not the bank, not SARS, not a software vendor. One job: help you run a stronger, more fundable business.",
  },
];

export default function FractionalCfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fractional CFO"
        title={
          <>
            Fractional CFO services for{" "}
            <span className="text-gold-gradient">South African SMEs</span>
          </>
        }
        description="Senior financial leadership on a part-time basis — the judgement of a full-time CFO, sized and priced for an owner-managed business that has outgrown a bookkeeper."
      />

      {/* What is a fractional CFO */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="What It Is"
            title="A CFO, without the full-time cost"
            description="A fractional (or outsourced) CFO is an experienced finance executive who works with your business part-time — a few days a month, a defined project, or a session when you need it. You get strategic financial leadership on cash flow, margin, funding, reporting and growth, without carrying a full-time executive salary."
          />
          <FadeIn className="rounded-3xl border border-white/10 bg-emerald-section/50 p-8 sm:p-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              A fractional CFO is a strong fit when
            </h3>
            <ul className="mt-6 space-y-3.5">
              {[
                "You're profitable on paper but always short of cash",
                "Turnover is climbing but margin isn't following",
                "The bank wants forecasts you don't currently have",
                "You're weighing a hire, a branch or a big contract",
                "You need senior finance judgement — but not a full-time salary",
              ].map((s) => (
                <li key={s} className="flex items-start gap-3 text-bone/90">
                  <svg className="mt-1 h-4 w-4 flex-none text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Where a CFO adds value — internal links to the six service areas */}
      <section className="border-y border-white/10 bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Where It Adds Value"
            title="Six places senior financial leadership pays for itself"
            description="The role flexes to what your business needs most right now — and shifts as you grow. Explore each area in detail on the What a CFO Adds page."
          />
          <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FadeInItem key={service.slug} className="h-full">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-base/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                >
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-gold-light">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-muted">
                    {service.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">
                    Learn more
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="How It Works"
            title="From first call to CFO on tap"
            description="A simple, low-friction path — you always know the next step, the scope and the fee before you commit."
          />
          <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => (
              <FadeInItem key={s.step} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-section/50 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-lg font-bold text-gold">
                    {s.step}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-bone-muted">{s.body}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Our approach */}
      <section className="border-y border-white/10 bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Approach"
            title="How we work"
          />
          <FadeInStagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {approach.map((a) => (
              <FadeInItem key={a.title} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-emerald-base/60 p-8">
                  <span className="mb-5 block h-2.5 w-2.5 rounded-full bg-gold-gradient" />
                  <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-muted">{a.body}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Pricing"
            title="Three ways to work together"
            description="You don't buy a fixed package. Pricing follows the engagement that fits — and every relationship can start with a fixed-scope diagnostic so you see the value before committing to anything ongoing."
          />
          <FadeInStagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {engagementModels.map((m) => (
              <FadeInItem key={m.name} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-section/50 p-8">
                  <h3 className="text-xl font-bold text-white">{m.name}</h3>
                  <p className="mt-2 text-sm font-medium text-gold">{m.best}</p>
                  <p className="mt-4 text-sm leading-relaxed text-bone-muted">{m.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {m.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-sm text-bone/90">
                        <svg className="mt-0.5 h-4 w-4 flex-none text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  {m.href && m.cta && (
                    <Link
                      href={m.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
                    >
                      {m.cta}
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <FadeIn className="mt-12 text-center">
            <p className="text-sm text-bone-dim">
              Not sure where you&apos;d start?{" "}
              <Link href="/resources/financial-health-check" className="font-medium text-gold hover:text-gold-light">
                Try the free Financial Health Check
              </Link>{" "}
              — a two-minute read on your own numbers.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Book a financial diagnostic call."
        description="Start with a free, no-obligation call. We'll talk through your numbers and where a fractional CFO would make the biggest difference — no pressure, no tie-ins."
        primary={{ href: "/contact", label: "Book a financial diagnostic call" }}
        secondary={{ href: "/diagnostic", label: "See the Diagnostic" }}
      />
    </>
  );
}
