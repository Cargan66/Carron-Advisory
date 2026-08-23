import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { CFOSigns } from "@/components/CFOSigns";
import { DashboardArt } from "@/components/DashboardArt";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { CalculatorSection } from "@/components/CalculatorSection";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import {
  services,
  values,
  whyCarron,
  founder,
  clientSectors,
  clientSituations,
} from "@/lib/content";
import type { Metadata } from "next";
import { getRecentArticles, formatArticleDate } from "@/lib/articles";

export const metadata: Metadata = {
  description:
    "Fractional CFO advisory for SMEs in South Africa. Strategic financial leadership, cash flow forecasting, margin and pricing, funding and KPI dashboards — remote, countrywide.",
  alternates: { canonical: "/" },
};

const recent = getRecentArticles(3);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Free tools — all three lead magnets, visible up top */}
      <section className="border-y border-gold/15 bg-emerald-section py-16 sm:py-20">
        <div className="container-luxe">
          <FadeIn className="max-w-2xl">
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="gold-rule" aria-hidden />
              Free tools · Start here
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              See where your business stands —{" "}
              <span className="text-gold-gradient">free</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bone/90">
              Three quick, practical checks. Start with whichever fits — each takes
              just a couple of minutes.
            </p>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                href: "/90-day-test/",
                badge: "2-min test",
                title: "The 90-Day Test",
                desc: "Could your business run for 90 days without you? Get a score out of 100 and the bottlenecks to fix first.",
                cta: "Take the test",
              },
              {
                href: "/find-your-fit/",
                badge: "90-sec quiz",
                title: "Find Your Fit",
                desc: "Bookkeeper, accountant or CFO? Answer ten questions and see the level of finance support you actually need.",
                cta: "Find your fit",
              },
              {
                href: "/resources/financial-health-check",
                badge: "10-point check",
                title: "Financial Health Check",
                desc: "Cash, margins, debtors and growth — a 20-minute diagnostic that shows exactly where the cracks are.",
                cta: "Run the check",
              },
            ].map((t) => (
              <FadeInItem key={t.href} className="h-full">
                <a
                  href={t.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-base/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                >
                  <span className="inline-flex w-fit items-center rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-gold">
                    {t.badge}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white transition-colors group-hover:text-gold-light">
                    {t.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-muted">
                    {t.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors group-hover:text-gold-light">
                    {t.cta}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Value proposition */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Why Carron"
            title={
              <>
                The difference between keeping books and{" "}
                <span className="text-gold-gradient">running a business</span>.
              </>
            }
            description="A bookkeeper tells you what happened. An auditor checks it after the fact. A CFO looks forward — at cash, margin, funding, and the next big decision. Carron gives owner-managed businesses that financial leadership, sized and priced for an SME."
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
                    <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                      {v.description}
                    </p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Founder strip */}
      <section className="border-y border-white/10 bg-emerald-section py-16 sm:py-20">
        <div className="container-luxe">
          <FadeIn className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
            <span className="relative h-24 w-24 flex-none overflow-hidden rounded-full border-2 border-gold/50">
              <Image
                src="/images/carel-gangel.png"
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="96px"
                className="object-cover object-[center_28%]"
              />
            </span>
            <div className="flex-1">
              <p className="text-lg leading-relaxed text-bone/90 sm:text-xl">
                {founder.short}
              </p>
              <p className="mt-3 text-sm font-medium text-gold">
                {founder.name} · {founder.role}
              </p>
            </div>
            <Button href="/about" variant="secondary" size="md" className="flex-none">
              Meet Carel
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Is it time for a CFO? */}
      <CFOSigns />

      {/* Who we work best with */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Who We Work Best With"
            title="Built for established, owner-managed businesses"
            description="Carron adds the most value where the numbers have outgrown a bookkeeper — typically owner-managed businesses with a bookkeeper, accountant or finance manager, but no strategic finance leader."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-2xl border border-white/10 bg-emerald-section/50 p-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Sectors we know well
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {clientSectors.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-bone/90">
                      <svg className="mt-1 h-4 w-4 flex-none text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-emerald-section/50 p-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  When owners call us
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {clientSituations.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-bone/90">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold-gradient" />
                      &ldquo;{s}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What an Experienced CFO Adds"
            title="Six places senior financial leadership pays for itself"
            description="The CFO role flexes to what your business needs most right now — and shifts as you grow. You don't buy a fixed product; you get judgement applied where it counts."
          />

          <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FadeInItem key={service.slug} className="h-full">
                <ServiceCard service={service} href={`/services#${service.slug}`} />
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn className="mt-12 flex justify-center">
            <Button href="/services" variant="secondary" size="lg">
              See What a CFO Adds
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* See your numbers clearly — dashboard + growth */}
      <section className="bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <DashboardArt className="w-full drop-shadow-[0_40px_70px_-35px_rgba(0,0,0,0.7)]" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <span className="gold-rule" aria-hidden />
              See Your Numbers Clearly
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
              Board-grade clarity, every month
            </h2>
            <p className="mt-5 text-base leading-relaxed text-bone/90">
              You get a one-page view of the numbers that actually move your
              business — cash in the bank, where your margin really sits, and how
              many months of runway you have. No twenty-page pack you&apos;ll
              never read; just the figures you need to make the next decision and
              turn effort into profit.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/coins-growth.jpg"
                alt="A small green plant growing from a pile of coins"
                width={1400}
                height={933}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-52 w-full object-cover object-[center_72%]"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why choose Carron — 3-column value prop */}
      <section className="border-y border-white/10 bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Why Choose Carron"
            title="Senior financial leadership, without the full-time cost"
            description="Three reasons owner-managed businesses bring Carron in — and stay."
          />
          <FadeInStagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {whyCarron.map((w, i) => (
              <FadeInItem key={w.title} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-emerald-base/60 p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-lg font-bold text-gold">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                    {w.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <FadeIn className="mt-12 flex justify-center">
            <Button href="/services/fractional-cfo" variant="secondary" size="lg">
              Explore Fractional CFO Services
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Finance calculator */}
      <CalculatorSection />

      {/* Testimonials */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Illustrative Outcomes"
            title="What changes when the numbers get clear"
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
              title="Recent articles"
              description="Short, practical reads for SME owners — click any one to read it in full."
            />
            <FadeIn>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
              >
                View all articles
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          <FadeInStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {recent.map((a) => (
              <FadeInItem key={a.slug} className="h-full">
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-emerald-base/60 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {a.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold-light">
                      {a.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-muted">
                      {a.excerpt}
                    </p>
                    <span className="mt-5 text-xs text-bone-dim">
                      {formatArticleDate(a.date)} · {a.readTime}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors group-hover:text-gold-light">
                      Read article
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
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
