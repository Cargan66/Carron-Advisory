import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CalculatorSection } from "@/components/CalculatorSection";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Finance Tools",
  description:
    "Free tools for South African business owners — the 90-Day Owner-Independence Test, plus loan-repayment and settlement calculators in ZAR.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Finance Tools"
        title={
          <>
            Quick numbers, <span className="text-gold-gradient">no spreadsheet</span>.
          </>
        }
        description="Handy calculators for the questions that come up between board packs. Indicative only — but enough to sanity-check a decision before you make it."
      />

      {/* Featured tool — the 90-Day Test (static page under /public) */}
      <section className="bg-emerald-base pt-16 sm:pt-24">
        <div className="container-luxe">
          <FadeIn>
            <a
              href="/90-day-test/"
              className="group block overflow-hidden rounded-3xl border border-gold/25 bg-emerald-section/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 sm:p-12"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                    Free diagnostic · 2 minutes
                  </span>
                  <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                    The 90-Day Test:{" "}
                    <span className="text-gold-gradient">
                      could your business run without you?
                    </span>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-bone/90">
                    Twenty questions across ten areas — decisions, cash, collections,
                    people, compliance and risk — scored on how far each has really
                    travelled from you: on paper, delegated, or proven. You get an
                    owner-independence score out of 100, a red/amber/green read on every
                    area, and a prioritised action plan.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors group-hover:text-gold-light">
                    Take the test
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div className="flex flex-none items-center justify-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-gold/5 sm:h-28 sm:w-28">
                    <span className="text-4xl font-bold text-gold-gradient sm:text-5xl">
                      90
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      <CalculatorSection
        eyebrow="Loan Repayment"
        title="What will it really cost to borrow?"
        description="Work out the monthly instalment on a facility or asset finance, or flip it around: tell us what you can afford each month and see how long it takes to settle — and what the interest adds up to."
      />

      <CTASection
        title="Want the full picture, not just one number?"
        description="A fractional CFO builds the forecast these calculators only hint at. Book a discovery call and let's look at your real numbers."
      />
    </>
  );
}
