import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { engagementModels, engagementSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engagement Models",
  description:
    "How fractional CFO services work in practice — monthly retainer, fixed-scope project diagnostics, or ad-hoc advisory. Flexible, remote, and right-sized for your SME.",
};

export default function EngagementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engagement Models"
        title={
          <>
            Buy defined CFO outcomes,{" "}
            <span className="text-gold-gradient">not unlimited time</span>.
          </>
        }
        description="Three bounded ways to work together, each with a clear scope, agreed deliverables, and no assumption of unlimited availability."
      />

      {/* Models */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <FadeInStagger className="grid gap-6 lg:grid-cols-3">
            {engagementModels.map((m) => (
              <FadeInItem key={m.name} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-section/60 p-8 transition-colors duration-300 hover:border-gold/30">
                  <h2 className="text-xl font-bold text-white">{m.name}</h2>
                  <p className="mt-2 text-sm font-medium text-gold">{m.best}</p>
                  <p className="mt-4 text-sm leading-relaxed text-bone-muted">
                    {m.href
                      ? "A focused, independent review of cash, profitability, reporting, forecasting, and financial risk. You leave with clear priorities and a practical 90-day action plan."
                      : m.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                    {m.includes.map((inc) => (
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
                  {m.href && (
                    <div className="mt-auto pt-7">
                      <Button href={m.href} variant="secondary" className="w-full">
                        {m.cta}
                      </Button>
                    </div>
                  )}
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn className="mt-10">
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-bone-dim">
              Not sure which fits? Most owners aren&apos;t at first. A discovery
              call usually makes it obvious — and there&apos;s no pressure to
              commit to anything ongoing.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partnership image */}
      <section className="bg-emerald-base pb-24 sm:pb-32">
        <FadeIn className="container-luxe">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/images/partnership.jpg"
              alt="Two professionals shaking hands after agreeing to work together"
              width={1135}
              height={756}
              sizes="100vw"
              className="h-56 w-full object-cover sm:h-80"
            />
          </div>
        </FadeIn>
      </section>

      {/* How it starts */}
      <section className="border-t border-white/10 bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Getting Started"
            title="A simple, low-friction way in"
            description="No long onboarding, no lock-in. Four steps from first call to real work."
          />
          <FadeInStagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((step, i) => (
              <FadeInItem key={step.title} className="h-full">
                <div className="flex h-full flex-col bg-emerald-base p-8">
                  <span className="text-3xl font-bold text-gold/40">
                    {String(i + 1).padStart(2, "0")}
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

          <FadeIn className="mt-12 flex justify-center">
            <Button href="/contact" size="lg">
              Book a Discovery Call
            </Button>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
