import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { getAllArticles, formatArticleDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical writing on cash flow, funding, profitability, and tax for South African SME owners — grounded in how a fractional CFO actually works.",
};

export default function InsightsPage() {
  const [featured, ...rest] = getAllArticles();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Practical reading for{" "}
            <span className="text-gold-gradient">SME owners</span>.
          </>
        }
        description="No filler and no jargon — just useful thinking on the financial decisions that actually move an owner-managed business."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          {/* Featured article */}
          <FadeIn>
            <Link
              href={`/insights/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-white/10 bg-emerald-section/60 transition-colors duration-500 hover:border-gold/40"
            >
              {/* Full 16:9 cover — shown uncropped */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1152px"
                  priority
                  className="object-cover"
                />
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-emerald-deep/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                  Latest
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {featured.category}
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-gold-light sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-3xl leading-relaxed text-bone/90">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-bone-dim">
                  <span>{formatArticleDate(featured.date)}</span>
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
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-emerald-section/60 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                    <div className="mt-6 flex items-center gap-2 text-xs text-bone-dim">
                      <span>{formatArticleDate(a.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{a.readTime}</span>
                    </div>
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
