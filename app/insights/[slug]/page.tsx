import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
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
            <div className="mb-8 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={article.cover}
                alt={article.title}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
                className="h-full w-full object-cover"
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

            {/* PDF-primary report: prominent open/download card above a teaser body */}
            {article.pdf && article.pdfPrimary && (
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
                    <p className="text-sm text-bone-muted">Open it in your browser or download it to read.</p>
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

            {/* Full text is on the page: PDF is a secondary offline download */}
            {article.pdf && !article.pdfPrimary && (
              <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-emerald-section/40 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                      <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-sm text-bone-muted">
                    Prefer it offline? Download this report as a formatted PDF.
                  </p>
                </div>
                <a
                  href={article.pdf}
                  download
                  className="inline-flex flex-none items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
                >
                  Download as PDF
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            )}
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

      <CTASection
        title="See where your business stands."
        description="Start with a free financial health check on your own numbers, or book a no-obligation discovery call — whichever suits you."
        primary={{ href: "/diagnostic#notify", label: "Run your free check" }}
        secondary={{ href: "/contact", label: "Book a Discovery Call" }}
      />
    </>
  );
}

/**
 * On-page article renderer. Supports the markdown subset used in article
 * bodies: `##` / `###` headings, `-` bullet and `1.` numbered lists,
 * `| pipe |` tables, `**bold**` / `*italic*` inline, and blank-line-separated
 * paragraphs (with soft line breaks preserved inside a paragraph block).
 */
function Prose({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

const isTableSeparator = (line: string) =>
  /^\s*\|?[-:\s|]+\|?\s*$/.test(line) && line.includes("-");

function renderBlock(block: string, key: number): ReactNode {
  const trimmed = block.trimStart();
  const lines = block.split("\n");

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={key} className="pt-1 text-lg font-bold text-white sm:text-xl">
        {inline(trimmed.slice(4))}
      </h3>
    );
  }
  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={key} className="pt-2 text-2xl font-bold text-white sm:text-[1.75rem]">
        {inline(trimmed.slice(3))}
      </h2>
    );
  }

  // Markdown pipe table
  if (lines.length >= 2 && lines[0].includes("|") && isTableSeparator(lines[1])) {
    const cells = (row: string) =>
      row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
    const header = cells(lines[0]);
    const rows = lines.slice(2).filter((l) => l.includes("|")).map(cells);
    return (
      <div key={key} className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-emerald-section/60">
              {header.map((h, hi) => (
                <th key={hi} className="border-b border-white/10 px-4 py-3 font-semibold text-gold">
                  {inline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 ? "bg-white/[0.02]" : ""}>
                {row.map((c, ci) => (
                  <td key={ci} className="border-b border-white/10 px-4 py-3 align-top text-bone/90">
                    {inline(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Unordered list
  if (lines.every((l) => l.trimStart().startsWith("- "))) {
    return (
      <ul key={key} className="space-y-2.5">
        {lines.map((l, li) => (
          <li key={li} className="flex gap-3 text-base leading-relaxed text-bone/90 sm:text-lg">
            <span className="mt-[0.6rem] h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden />
            <span>{inline(l.trimStart().slice(2))}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Ordered list
  if (lines.every((l) => /^\s*\d+\.\s/.test(l))) {
    return (
      <ol key={key} className="space-y-2.5">
        {lines.map((l, li) => (
          <li key={li} className="flex gap-3 text-base leading-relaxed text-bone/90 sm:text-lg">
            <span className="flex-none font-semibold text-gold">{li + 1}.</span>
            <span>{inline(l.replace(/^\s*\d+\.\s/, ""))}</span>
          </li>
        ))}
      </ol>
    );
  }

  // Paragraph (preserve soft line breaks inside a block)
  return (
    <p key={key} className="text-base leading-relaxed text-bone/90 sm:text-lg">
      {lines.map((l, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {inline(l)}
        </Fragment>
      ))}
    </p>
  );
}

/** Inline **bold** and *italic* into <strong>/<em>. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.length > 1 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
