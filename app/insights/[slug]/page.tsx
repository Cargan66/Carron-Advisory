import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/FadeIn";
import {
  articles,
  getAllArticles,
  getArticle,
  formatArticleDate,
} from "@/lib/articles";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

export default function ArticlePage({ params }: Params) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  // Up to two further reads, newest first, excluding this one.
  const more = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
      />

      <article className="bg-emerald-base py-20 sm:py-28">
        <div className="container-luxe max-w-3xl">
          <FadeIn>
            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={article.cover}
                alt={article.title}
                width={1500}
                height={1000}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
                className="h-60 w-full object-cover sm:h-80"
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-bone-dim">
              <span>{article.author}</span>
              <span aria-hidden>·</span>
              <span>{formatArticleDate(article.date)}</span>
              <span aria-hidden>·</span>
              <span>{article.readTime}</span>
            </div>
            <div className="gold-divider my-8" />

            {article.pdf && (
              <div className="mb-10 flex flex-col items-start gap-5 rounded-2xl border border-gold/30 bg-emerald-section/60 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                      <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-white">Full report (PDF)</p>
                    <p className="text-sm text-bone-muted">
                      Open it in your browser or download it to read.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={article.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-emerald-deep transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Open report
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={article.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
                  >
                    Download
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            <Prose body={article.body} />
          </FadeIn>

          <FadeIn className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All insights
            </Link>
          </FadeIn>
        </div>
      </article>

      {/* Further reading */}
      {more.length > 0 && (
        <section className="border-t border-white/10 bg-emerald-section py-20 sm:py-24">
          <div className="container-luxe">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Further reading
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  href={`/insights/${a.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-emerald-base/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {a.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold-light">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

/**
 * Minimal prose renderer for the article body. Blank lines separate
 * paragraphs; a line starting with "## " becomes a subheading.
 */
function Prose({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\n+/);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="pt-2 text-xl font-bold text-white sm:text-2xl"
            >
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }
        return (
          <p
            key={i}
            className="text-base leading-relaxed text-bone/90 sm:text-lg"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}
