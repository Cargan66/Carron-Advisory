# Carron.co.za — SEO Changes (Phase 2: P0 + P1)

**Date:** 9 October 2026
**Branch:** `seo-improvements` (not pushed, not deployed — for your review)
**Scope:** All **P0** and **P1** items from [SEO-AUDIT.md](SEO-AUDIT.md), as approved. P2 (new landing/city/sector pages, case-study component, numeric Lighthouse pass) was **not** started.

**Build status:** `npm run build` passes — 52 static pages exported, ESLint clean, TypeScript clean. Each change below was confirmed in the exported HTML under `out/`.

---

## P0 — correctness / indexing

| # | Change | Files |
|---|---|---|
| 1 | **Removed the dead `@vercel/analytics`** import + `<Analytics />`. It requested `/_vercel/insights/script.js`, which 404'd on every page on the Cloudflare host and threw 2 console errors per load. Confirmed gone from the exported homepage. (Cloudflare RUM via `/cdn-cgi/rum` already provides analytics.) | `app/layout.tsx` |
| 2 | **Added `alternates.canonical`** to the 7 pages that had none | `app/about`, `app/services`, `app/engagement`, `app/diagnostic`, `app/contact`, `app/insights`, `app/tools` (`/page.tsx`) |
| 3 | **Trimmed 8 over-length meta descriptions** to ≤155 chars | `app/page.tsx`, `app/about`, `app/services`, `app/services/fractional-cfo`, `app/engagement`, `app/diagnostic`, `app/faq`, `app/resources/financial-health-check` |
| 4 | **Shortened the FAQ `<title>`** from 66→~45 chars (`"FAQ — Fractional CFO Questions Answered"` → `"Fractional CFO FAQ"`, i.e. `Fractional CFO FAQ — Carron Business Advisory`) | `app/faq/page.tsx` |
| 5 | **`/testimonials-case-studies`: `robots: noindex`** + removed from the sitemap (illustrative content; re-index once real, named clients exist) | `app/testimonials-case-studies/page.tsx`, `app/sitemap.ts` |

Also: added `/.wrangler/` and `/90 Day Diagnostic/` to `.gitignore` (local build/scratch that was previously untracked).

## P1 — high-value content & structure

| # | Change | Files |
|---|---|---|
| 6 | **Converted the two PDF-primary reports to full HTML.** `ai-is-no-longer-optional` and `5-signs-your-sme-is-ready-to-hire` previously rendered only a ~260-word teaser (full text locked in the PDF). Both are now fully transcribed from their source PDFs — chapters, verified stats, tool tables, the 90-day roadmap / five signs, conclusion and key sources. `pdfPrimary` dropped so the PDF becomes a secondary download; `readTime` updated; internal links added. **No facts invented — everything is from Carron's own published reports.** | `lib/articles.ts` |
| 7 | **Linked the money page internally.** Footer now has a direct "Fractional CFO services" link and deep-links the six service items to `/services#<slug>`; `/services` gained a secondary button to `/services/fractional-cfo`; the expanded page and the two converted articles link to it in body copy. | `components/Footer.tsx`, `app/services/page.tsx` |
| 8 | **Structured data.** New `PersonJsonLd` (on `/about`), `ServiceJsonLd` (on `/services` and `/services/fractional-cfo`), `BreadcrumbJsonLd` (on every non-home page, incl. the article & category templates). `FaqJsonLd` now takes a `path` so a second FAQ section doesn't collide with `/faq` on `@id`/URL. All confirmed in exported HTML. | `components/JsonLd.tsx` + all content pages |
| 9 | **Expanded `/services/fractional-cfo`** past 1500 words: richer "what it is" prose, a new "fractional vs outsourced vs part-time" section (targets those query variants, links to Engagement + two insight articles), and a six-question "Fractional CFO FAQs" section emitted as `FAQPage` schema. Pricing kept **qualitative** (no invented rand figures) and pointed at `/diagnostic` + `/engagement`. | `app/services/fractional-cfo/page.tsx` |

## Commits (in order, on `seo-improvements`)
1. `SEO Phase 1: read-only audit (SEO-AUDIT.md)`
2. `SEO P0: canonicals, meta descriptions, dead script, noindex`
3. `SEO P1: structured data + internal links to the money page`
4. `SEO P1: expand the Fractional CFO page (prose, FAQ, schema)`
5. `SEO P1: render the AI and Hiring reports as full HTML`
6. `SEO P1: escape apostrophes in Fractional CFO prose (lint fix)`

---

## Notes, caveats & `TODO(Carel):`
- **`TODO(Carel):` Person schema credentials.** `PersonJsonLd` (in `components/JsonLd.tsx`) deliberately lists only experience and areas of expertise — not formal qualifications — so the schema matches what's visible on `/about`. If you'd like your B.Com / MBL (UNISA) and CGISA membership surfaced in structured data, say so and I'll add `alumniOf` / `hasCredential` (ideally also shown on the About page, so schema and page agree).
- **Pricing figures.** I did not invent any fractional-CFO rand figures. The transcribed reports keep the exact figures printed in the source PDFs (e.g. tool price ranges, R30.23 minimum wage). The new Fractional CFO page copy keeps pricing qualitative.
- **`@vercel/analytics`** is still listed in `package.json` dependencies (only the import was removed). It's harmless/unused; it can be pruned from `package.json` in a later housekeeping pass if you like.
- **Updated-date on the two converted articles:** the article template shows author + publish date + read time; it does not yet track a separate "updated" date. If you want a visible "Updated 9 Oct 2026" line (and `dateModified` in schema), that's a small follow-up — flagged rather than done to avoid touching the article data model.
- **Numeric Lighthouse pass** (P2) still outstanding — the dead-script fix should lift the Best-Practices score; worth a real mobile run once this is live.

## Not done (P2 — awaiting a separate go-ahead)
New landing pages (`/services/outsourced-cfo`, `/services/part-time-financial-director`, `/fractional-cfo-cost-south-africa`), sector pages, city pages, the reusable case-study component + `/case-studies` index, and the Lighthouse pass. All require either your rand figures or real client stories, so they're held for a Phase-3 decision.

---
**Nothing here has been pushed to `main` or deployed.** Review the branch; when you're happy, the usual `git push carron main` (after merging) will publish it.
