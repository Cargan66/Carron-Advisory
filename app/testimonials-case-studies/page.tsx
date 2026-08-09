import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Testimonials } from "@/components/Testimonials";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials & Case Studies",
  description:
    "Client success stories from Carron Business Advisory — how South African SME owners put a fractional CFO to work on cash flow, margin, funding and growth.",
  alternates: { canonical: "/testimonials-case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title={
          <>
            How we&apos;ve helped{" "}
            <span className="text-gold-gradient">owners</span>
          </>
        }
        description="Real engagements with owner-managed South African businesses. Named client stories are published here as each engagement matures — starting with our current work."
      />

      {/* Case studies */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <FadeInStagger className="grid gap-8">
            {caseStudies.map((cs) => (
              <FadeInItem key={cs.client}>
                <article className="overflow-hidden rounded-3xl border border-white/10 bg-emerald-section/50">
                  <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
                    {/* Story */}
                    <div className="p-8 sm:p-10">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Client logo placeholder — a branded monogram tile */}
                        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-lg font-bold text-gold">
                          {cs.client
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
                        <div>
                          <h2 className="text-xl font-bold text-white sm:text-2xl">
                            {cs.client}
                          </h2>
                          <p className="text-sm text-bone-dim">{cs.sector}</p>
                        </div>
                        {cs.status === "in-development" && (
                          <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                            In development
                          </span>
                        )}
                      </div>

                      <p className="mt-6 text-base leading-relaxed text-bone/90">
                        {cs.summary}
                      </p>

                      {cs.quote && (
                        <blockquote className="mt-6 border-l-2 border-gold/50 pl-5">
                          <p className="text-lg font-medium leading-relaxed text-white">
                            &ldquo;{cs.quote}&rdquo;
                          </p>
                          {cs.attribution && (
                            <footer className="mt-3 text-sm font-medium text-gold">
                              {cs.attribution}
                            </footer>
                          )}
                        </blockquote>
                      )}
                    </div>

                    {/* Results metrics */}
                    <div className="border-t border-white/10 bg-emerald-base/50 p-8 sm:p-10 lg:border-l lg:border-t-0">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                        Results
                      </h3>
                      <dl className="mt-6 space-y-6">
                        {cs.results.map((r) => (
                          <div key={r.label}>
                            <dt className="text-sm text-bone-muted">{r.label}</dt>
                            <dd className="mt-1 text-2xl font-bold text-white">
                              {r.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </article>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Illustrative outcomes carousel (existing component) */}
      <section className="border-y border-white/10 bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Illustrative Outcomes"
            title="What changes when the numbers get clear"
            description="While named case studies are being published, these reflect the kinds of outcomes owners engage Carron for."
            className="mb-16"
          />
          <Testimonials />
        </div>
      </section>

      <CTASection
        title="See how we've helped other owners."
        description="Every engagement starts with a free, no-obligation discovery call. Tell us where your numbers are today, and we'll show you where a fractional CFO would make the biggest difference."
        primary={{ href: "/contact", label: "Book a Discovery Call" }}
        secondary={{ href: "/services/fractional-cfo", label: "Fractional CFO Services" }}
      />
    </>
  );
}
