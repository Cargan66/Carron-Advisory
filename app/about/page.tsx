import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Carron Business Advisory brings CFO-level financial leadership to South African SMEs — fractional, outsourced, and delivered remotely across the country. Meet the philosophy behind the firm.",
};

const fractionalReasons = [
  {
    title: "Seniority you couldn't otherwise afford",
    description:
      "A full-time CFO commands a senior executive salary plus benefits. Fractional gives you the same calibre of judgement for a few days a month — the cost of a tool, not a hire.",
  },
  {
    title: "Right-sized to the business",
    description:
      "You scale the engagement to what you actually need: more hands-on during a funding round or a tough quarter, lighter when things are steady. No idle salary in the quiet months.",
  },
  {
    title: "Outside perspective, no politics",
    description:
      "An external CFO has seen the same problems across many businesses and owes nothing to internal history. You get a straight answer and a fresh read on the numbers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Carron"
        title={
          <>
            CFO-level thinking, sized for the{" "}
            <span className="text-gold-gradient">owner-managed business</span>.
          </>
        }
        description="Carron exists for the business that has outgrown a bookkeeper but can't yet justify a full-time finance chief — and shouldn't have to wait until it can."
      />

      {/* Story */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built for the gap most SMEs fall into"
              className="mb-8"
            />
            <FadeIn className="space-y-5 text-base leading-relaxed text-bone/90 sm:text-lg">
            <p>
              Most South African SMEs run on a bookkeeper and the owner&apos;s
              instinct. That carries a business a long way — until the decisions
              get bigger than a bank balance can answer. A funding round. A
              pricing call. A branch, a hire, a big contract. Suddenly the gut
              isn&apos;t enough, and a full-time CFO is still years away on the
              budget.
            </p>
            <p>
              Carron was built for exactly that gap. We bring the financial
              leadership a CFO provides — forward-looking cash flow, real margin
              analysis, fundable numbers, board-grade reporting — to businesses
              that need it now and would rather not carry a six-figure salary to
              get it.
            </p>
            <p>
              The work is hands-on and unglamorous: we get into the numbers,
              translate them into decisions you can act on, and stay close enough
              to help you make the calls that matter. No jargon, no lectures —
              just an experienced set of hands on the financial wheel.
            </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/collaboration.jpg"
                alt="A business owner and advisor working through the numbers together"
                width={750}
                height={1125}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="max-h-[560px] w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why fractional works */}
      <section className="border-y border-white/10 bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Why Fractional Works"
            title="Senior financial leadership, without the full-time cost"
            description="Fractional isn't a watered-down CFO. It's the same role, bought by the day instead of the year — which for most growing SMEs is exactly the right way to buy it."
          />
          <FadeInStagger className="mt-16 grid gap-6 md:grid-cols-3">
            {fractionalReasons.map((r, i) => (
              <FadeInItem key={r.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-base/60 p-8">
                  <span className="text-sm font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                    {r.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="How We Work"
            title="A few principles we don't bend on"
            description="These aren't slogans on a wall — they're how we decide what to do for a client, and what to tell them."
          />
          <FadeInStagger className="mt-16 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <FadeInItem key={v.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-section/60 p-8">
                  <span className="text-sm font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                    {v.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Remote, countrywide */}
      <section className="bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <span className="gold-rule" aria-hidden />
              Remote, Countrywide
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
              Wherever your business is, we&apos;re already there
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-bone/90">
              <p>
                Good financial leadership doesn&apos;t require someone in the
                building. With cloud accounting and a steady rhythm of calls and
                reporting, we work just as closely with a business in
                Polokwane or Gqeberha as one down the road.
              </p>
              <p>
                That&apos;s the point of the model: you get a senior CFO without
                geography limiting your choice, and without the overhead of an
                office presence you don&apos;t need. We serve SMEs across every
                province, entirely remotely.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-emerald-base"
              role="img"
              aria-label="Carron serves SMEs remotely across all of South Africa"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute h-64 w-64 rounded-full bg-gold/10 blur-3xl"
              />
              <div className="relative text-center">
                <p className="text-5xl font-bold text-gold-gradient">9</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-bone-muted">
                  Provinces, one team
                </p>
                <p className="mx-auto mt-4 max-w-[14rem] text-sm leading-relaxed text-bone-dim">
                  Delivered remotely, from cash flow to board pack.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Let's see if Carron is the right fit."
        description="Start with a free discovery call. We'll talk through your business and where an experienced CFO would move the needle — no obligation, no jargon."
      />
    </>
  );
}
