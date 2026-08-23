import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

type Tier = {
  name: string;
  time: string;
  pct: string;
  items: string[];
};

const tiers: Tier[] = [
  {
    name: "Advisory",
    time: "~2–4 hrs / month",
    pct: "32%",
    items: ["Monthly management review", "KPI dashboard", "Cash-flow monitoring"],
  },
  {
    name: "Growth",
    time: "~2–4 days / month",
    pct: "66%",
    items: ["Budgeting & forecasting", "Board & bank reporting", "Pricing & margin strategy"],
  },
  {
    name: "Strategic",
    time: "Full fractional CFO seat",
    pct: "100%",
    items: ["Funding & bank negotiations", "M&A & due-diligence support", "Finance function build-out"],
  },
];

export function EngagementTiers() {
  return (
    <section className="border-y border-white/10 bg-emerald-section py-24 sm:py-32">
      <div className="container-luxe">
        <FadeIn className="max-w-2xl">
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="gold-rule" aria-hidden />
            Fractional CFO — Engagement Options
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            Pick the level of finance support your business{" "}
            <span className="italic text-gold-gradient">actually</span> needs.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone-300/90 sm:text-lg">
            Three tiers, built around how much time and strategy your stage calls
            for — not a one-size-fits-all retainer.
          </p>
        </FadeIn>

        <FadeInStagger className="mt-14">
          {tiers.map((tier) => (
            <FadeInItem key={tier.name}>
              <div className="grid gap-6 border-t border-white/10 py-9 lg:grid-cols-[300px_1fr] lg:items-center lg:gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-gold/80">
                    {tier.time}
                  </p>
                  <div
                    className="mt-4 h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-white/10"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-gold-gradient"
                      style={{ width: tier.pct }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {tier.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2.5 text-sm text-bone/90 sm:text-base"
                    >
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-10 flex justify-start border-t border-white/10 pt-8 lg:justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light"
          >
            Book a discovery call to find your fit
            <span aria-hidden>→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
