import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { team, values, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, philosophy, and people behind Aurelia Private Wealth — an independent advisory firm built to serve a deliberately small number of families exceptionally well.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Aurelia"
        title={
          <>
            A private office, built on{" "}
            <span className="text-gold-gradient">trust</span>.
          </>
        }
        description="Founded on a simple conviction: that significant wealth deserves advice free of conflict, measured in decades, and delivered with genuine care."
      />

      {/* Story */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="Founded to do this differently"
          />
          <FadeIn className="space-y-5 text-base leading-relaxed text-stone-300/90 sm:text-lg">
            <p>
              Aurelia was established in 1998 by a small group of advisors who
              had grown disillusioned with an industry that too often put
              products before people. They set out to build a firm with one
              purpose: to act, always, in the client&apos;s interest.
            </p>
            <p>
              More than two decades later, that founding principle is unchanged.
              We remain independent and privately held, intentionally limiting
              the number of relationships we take on so that each receives the
              depth of attention it deserves.
            </p>
            <p>
              Today we advise on billions in assets for families, founders, and
              institutions across the globe — but we still measure our success
              the same way we always have: in the trust our clients place in us,
              year after year, generation after generation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-white/10 bg-emerald-section py-16">
        <FadeInStagger className="container-luxe grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <FadeInItem key={s.label} className="text-center">
              <p className="text-3xl font-bold text-gold sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-stone-400 sm:text-sm">
                {s.label}
              </p>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </section>

      {/* Philosophy / values */}
      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="Principles that guide every decision"
            description="These are not slogans. They are the standards we hold ourselves to in every recommendation we make."
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
                  <p className="mt-3 text-sm leading-relaxed text-stone-300/90">
                    {v.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Team */}
      <section className="bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our People"
            title="The advisors behind the firm"
            description="A multidisciplinary partnership of investors, planners, and tax specialists — each with decades of experience serving discerning clients."
          />
          <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <FadeInItem key={member.name} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-base/60 p-7 text-center transition-colors duration-300 hover:border-gold/30">
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-xl font-bold text-gold">
                    {member.initials}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-400">
                    {member.bio}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CTASection
        title="Let's discuss your family's future."
        description="We welcome a confidential conversation to explore your goals and whether Aurelia is the right partner for you."
      />
    </>
  );
}
