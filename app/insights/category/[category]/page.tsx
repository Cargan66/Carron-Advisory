import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { FadeInStagger, FadeInItem } from "@/components/FadeIn";
import {
  getCategories,
  getArticlesByCategory,
  categoryFromSlug,
  formatArticleDate,
} from "@/lib/articles";

type Params = { params: { category: string } };

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const category = categoryFromSlug(params.category);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category} Insights`,
    description: `${category} articles for South African SME owners — practical writing from Carron Business Advisory on ${category.toLowerCase()} and the decisions that move an owner-managed business.`,
    alternates: { canonical: `/insights/category/${params.category}` },
  };
}

export default function CategoryPage({ params }: Params) {
  const category = categoryFromSlug(params.category);
  if (!category) notFound();

  const posts = getArticlesByCategory(params.category);
  const categories = getCategories();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            <span className="text-gold-gradient">{category}</span>
          </>
        }
        description={`Practical reading on ${category.toLowerCase()} for owner-managed South African businesses.`}
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          {/* Category filter — links to every category + all */}
          <div className="mb-12 flex flex-wrap gap-3">
            <Link
              href="/insights"
              className="rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-bone-muted transition-colors hover:border-gold/40 hover:text-gold"
            >
              All
            </Link>
            {categories.map((c) => {
              const active = c.slug === params.category;
              return (
                <Link
                  key={c.slug}
                  href={`/insights/category/${c.slug}`}
                  aria-current={active}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-gold/50 bg-gold/10 text-gold"
                      : "border-white/10 text-bone-muted hover:border-gold/40 hover:text-gold"
                  }`}
                >
                  {c.category} ({c.count})
                </Link>
              );
            })}
          </div>

          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((a) => (
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
                    <h2 className="mt-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold-light">
                      {a.title}
                    </h2>
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

      <CTASection
        title="See where your business stands."
        description="Start with a free financial health check on your own numbers, or book a no-obligation discovery call — whichever suits you."
        primary={{ href: "/resources/financial-health-check", label: "Run your free check" }}
        secondary={{ href: "/contact", label: "Book a Discovery Call" }}
      />
    </>
  );
}
