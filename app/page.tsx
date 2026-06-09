import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { articles, services, values } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Value proposition */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Why Aurelia"
            title={
              <>
                Independent advice, held to a higher standard of{" "}
                <span className="text-gold-gradient">care</span>.
              </>
            }
            description="We are not a bank, a brokerage, or a product factory. We are an independent fiduciary partner — paid by our clients, accountable only to them, and built to serve a deliberately small number of families exceptionally well."
          />

          <FadeInStagger className="grid gap-5">
            {values.map((v) => (
              <FadeInItem key={v.title}>
                <div className="flex gap-5 rounded-2xl border border-white/10 bg-emerald-section/50 p-6 transition-colors duration-300 hover:border-gold/30">
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-gold-gradient" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-300/90">
                      {v.description}
                    </p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <div className="container-luxe">
        <div className="gold-divider" />
      </div>

      {/* Services overview */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What We Do"
            title="A complete advisory practice, under one roof"
            description="From day-to-day portfolio management to multi-generational legacy planning, our services are designed to work together as a single, coherent strategy."
          />

          <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FadeInItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn className="mt-12 flex justify-center">
            <Button href="/services" variant="secondary" size="lg">
              View All Services
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Credibility / approach band */}
      <section className="relative overflow-hidden bg-emerald-section py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gold/5 to-transparent"
        />
        <div className="container-luxe relative z-10">
          <SectionHeading
            align="left"
            eyebrow="Our Approach"
            title="Disciplined, transparent, and built around you"
          />
          <FadeInStagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((step, i) => (
              <FadeInItem key={step.title}>
                <div className="border-t border-gold/30 pt-6">
                  <span className="text-sm font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300/90">
                    {step.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="In Their Words"
            title="Trusted across generations"
            className="mb-16"
          />
          <Testimonials />
        </div>
      </section>

      {/* Insights teaser */}
      <section className="bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Insights"
              title="Perspectives for the long view"
            />
            <FadeIn>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
              >
                All insights
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          <FadeInStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {homeArticles.map((a) => (
              <FadeInItem key={a.title} className="h-full">
                <Link
                  href="/insights"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-base/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {a.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold-light">
                    {a.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">
                    {a.excerpt}
                  </p>
                  <span className="mt-5 text-xs text-stone-500">
                    {a.date} · {a.readTime}
                  </span>
                </Link>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}

const approach = [
  {
    title: "Discover",
    description:
      "We begin by listening — to your goals, your family, and the life you want your wealth to support.",
  },
  {
    title: "Design",
    description:
      "A bespoke strategy across investments, tax, and legacy, modelled across decades and scenarios.",
  },
  {
    title: "Implement",
    description:
      "We put the plan to work with institutional execution and coordination across your advisors.",
  },
  {
    title: "Steward",
    description:
      "Ongoing oversight, transparent reporting, and proactive adjustments as your life evolves.",
  },
];

const homeArticles = articles.slice(0, 3);
