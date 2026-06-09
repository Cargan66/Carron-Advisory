import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on investing, tax, legacy, and markets from the Aurelia advisory team — written for the long view.",
};

export default function InsightsPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Perspectives for the{" "}
            <span className="text-gold-gradient">long view</span>.
          </>
        }
        description="Considered writing on investing, tax, and legacy — none of it noise, all of it grounded in how we actually advise."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          {/* Featured article */}
          <FadeIn>
            <Link
              href="/insights"
              className="group grid overflow-hidden rounded-3xl border border-white/10 bg-emerald-section/60 transition-colors duration-500 hover:border-gold/40 lg:grid-cols-2"
            >
              <div className="relative min-h-[260px] overflow-hidden bg-emerald-radial p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
                />
                <span className="relative inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Featured
                </span>
                <p className="relative mt-auto" />
              </div>
              <div className="flex flex-col justify-center p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {featured.category}
                </span>
                <h2 className="mt-4 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-gold-light sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-stone-300/90">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-stone-500">
                  <span className="text-stone-300">{featured.author}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.date}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Article grid */}
          <FadeInStagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <FadeInItem key={a.slug} className="h-full">
                <Link
                  href="/insights"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-emerald-section/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
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
                  <div className="mt-6 flex items-center gap-2 text-xs text-stone-500">
                    <span>{a.date}</span>
                    <span aria-hidden>·</span>
                    <span>{a.readTime}</span>
                  </div>
                </Link>
              </FadeInItem>
            ))}
          </FadeInStagger>

          {/* Newsletter */}
          <FadeIn className="mt-20">
            <div className="rounded-3xl border border-gold/20 bg-emerald-section px-8 py-12 text-center sm:px-16">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                The Aurelia Quarterly
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-stone-300/90">
                Our considered perspective on markets and planning, delivered
                four times a year. No noise, no selling.
              </p>
              <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-full border border-white/10 bg-emerald-deep/60 px-5 py-3 text-white placeholder:text-stone-500 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-emerald-deep transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
