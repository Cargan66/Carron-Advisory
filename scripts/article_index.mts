/**
 * Regenerate ARTICLE-INDEX.md in Google Drive folder 0.
 *
 * ChatGPT reads that one file for its duplicate check instead of browsing
 * carron.co.za and folder 3 (~250,000 characters, which exhausted its chat).
 * Run this after adding articles to lib/articles.ts so the index stays current:
 *
 *   npx tsx scripts/article_index.mts
 *
 * Writes to the Drive path below; pass a different path as argv[2] to override.
 */
import { writeFileSync } from "node:fs";
import { articles } from "../lib/articles";

const OUT =
  process.argv[2] ??
  "G:/My Drive/01 Carron Business Advisory/Carron Articles G Drive/0 Carron Style Examples G/ARTICLE-INDEX.md";

/** First sentence of the excerpt, else the excerpt clipped to one line. */
function covers(excerpt: string): string {
  const flat = excerpt.replace(/\s+/g, " ").trim();
  const firstStop = flat.search(/[.?!](\s|$)/);
  if (firstStop > 0 && firstStop <= 140) return flat.slice(0, firstStop);
  return flat.length <= 140 ? flat : flat.slice(0, 137).trimEnd() + "\u2026";
}

const rows = [...articles]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(
    (a) =>
      `| ${a.date} | ${a.category} | ${a.title} | ${covers(a.excerpt).replace(/\|/g, "\\|")} |`,
  );

const today = new Date().toISOString().slice(0, 10);

const md = `# Carron — published article index

Auto-generated from the website on ${today}. **${articles.length} articles.**

Use THIS FILE for the duplicate check. Do not browse carron.co.za and do not open
the packages in folder 3 — between them that is roughly 250,000 characters of text,
which is what has been exhausting the chat. Everything you need to judge whether a
proposed topic is already covered is below.

If a title alone genuinely leaves you unsure, open that ONE article at
carron.co.za/insights/<slug>. One, not all of them.

Dates in the future are committed and will publish themselves on the date shown.
Treat them as covered: do not propose those topics again.

| Date | Category | Title | What it already covers |
|---|---|---|---|
${rows.join("\n")}

Regenerate with \`npx tsx scripts/article_index.mts\` after adding articles.
`;

writeFileSync(OUT, md, "utf8");
console.log(`${articles.length} articles -> ${OUT}`);
