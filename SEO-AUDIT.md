# Carron.co.za — SEO Audit (Phase 1, read-only)

**Date:** 9 October 2026
**Branch:** `seo-improvements`
**Scope:** Read-only audit of the live site + source. No code changed. This report ends with a prioritised list of proposed Phase 2 changes — **nothing will be built until you approve.**

---

## 0. How to read this

- **What I measured directly:** source of every route and shared component; the production HTML of the live site (homepage, a PDF-primary article, `/services`) read in a real browser — titles, meta descriptions, canonicals, H1s, JSON-LD, images, console errors and the network waterfall.
- **What I could NOT measure here:** numeric **Lighthouse** scores. Google's PageSpeed Insights API returned *HTTP 429 – daily quota exceeded* for anonymous use, and there's no local Lighthouse/Chrome runner in this environment. The performance section below gives real runtime evidence (network + console) and a qualitative read; the numeric Lighthouse pass is listed as a Phase 2 to-do (run with a PSI API key or Chrome DevTools).
- Severity key: **P0** = correctness/indexing risk, do first · **P1** = clear SEO win, low risk · **P2** = growth/content, larger effort.

**Overall posture: good foundations, under-exploited.** The technical base is genuinely solid — static export, clean URLs, per-article canonicals, an Organization/WebSite/LocalBusiness JSON-LD graph site-wide, a code-generated sitemap + robots, self-hosted fonts, `next/image` everywhere, one H1 per page, alt text on every image. The gaps are (a) a handful of mechanical fixes (a dead analytics script that 404s on every page, over-length meta descriptions, missing canonicals on 7 pages), (b) **two flagship reports whose full text lives only in a PDF**, and (c) a thin commercial layer — the money term "fractional CFO" has one short page, and there are no cost/outsourced/part-time/city/sector pages to catch high-intent search.

---

## 1. Page inventory

Titles below include the site template suffix `— Carron Business Advisory` (27 chars) where the page doesn't set an absolute title. Description length measured against the ~155-char display limit; title against ~60 chars.

### Next.js routes

| Route | Title (len) | Desc len | Canonical | H1 | Notes |
|---|---|---|---|---|---|
| `/` | Carron Business Advisory — Fractional CFO for SA SMEs (53) | **174 ⚠** | ✅ `/` | 1 ✅ | Desc over limit (confirmed live) |
| `/about` | About — … (32) | **~210 ⚠** | ❌ **none** | 1 ✅ | No canonical; no Person schema |
| `/services` | What a CFO Adds — … (42) | **190 ⚠** | ❌ **none** (confirmed live) | 1 ✅ | No canonical; no Service schema |
| `/services/fractional-cfo` | Fractional CFO Services — … (50) | **183 ⚠** | ✅ | 1 ✅ | **Top commercial page but thin (~650 words) & not in nav/footer** |
| `/engagement` | Engagement Models — … (44) | **164 ⚠** | ❌ **none** | 1 ✅ | No canonical |
| `/diagnostic` | Diagnostic — … (37) | **190 ⚠** | ❌ **none** | 1 ✅ | No canonical; generic title |
| `/contact` | Contact — … (34) | 137 ✅ | ❌ **none** | 1 ✅ | No canonical |
| `/insights` | Insights — … (35) | 143 ✅ | ❌ **none** | 1 ✅ | No canonical |
| `/insights/[slug]` | article title, capped ≤60 ✅ | excerpt | ✅ | 1 ✅ | BlogPosting schema; see §2 |
| `/insights/category/[category]` | category — … | — | ✅ | 1 ✅ | OK |
| `/faq` | **FAQ — Fractional CFO Questions Answered — … (66 ⚠)** | **237 ⚠** | ✅ | 1 ✅ | Title too long (brand doubled); FAQPage schema ✅ |
| `/tools` | Finance Tools — … (40) | 136 ✅ | ❌ **none** | 1 ✅ | No canonical |
| `/resources/financial-health-check` | SME Financial Health Check: 10-Point Diagnostic \| Carron (56) | **173 ⚠** | ✅ | 1 ✅ | Good absolute title; keyword block present |
| `/testimonials-case-studies` | Testimonials & Case Studies — … (54) | 152 ✅ | ✅ | 1 ✅ | **Illustrative/fictional content, indexable + in sitemap** — see §3 |
| `/privacy` | Privacy Notice (POPIA) — … | long | ✅ | 1 ✅ | Low priority, fine |
| `/paia` | PAIA Manual — … | long | ✅ | 1 ✅ | Low priority, fine |

### Static interactive tools (hand-built HTML under `/public`, served at trailing-slash URLs)

| Route | Head SEO | Notes |
|---|---|---|
| `/health-check/` | title ✅, desc ✅ (247, long), canonical ✅, OG ✅ | Solid. Could add `WebApplication` JSON-LD |
| `/90-day-test/` | title ✅, desc ✅, canonical ✅, OG ✅ | Solid |
| `/find-your-fit/` | title ✅, desc ✅, canonical ✅, OG ✅ | Solid |
| `/diagnostic-result/`, `/plan-result/` | n/a (post-payment views) | Correctly **excluded** from sitemap ✅ |

**Canonical gap:** 7 indexable routes emit **no** `<link rel="canonical">` — `/about`, `/services`, `/engagement`, `/diagnostic`, `/contact`, `/insights`, `/tools`. (Next only emits one when `alternates.canonical` is set; these pages don't set it.) Low risk today but it's the kind of thing that bites once URL params or alternate paths appear.

---

## 2. Article HTML-vs-PDF (the most important check)

**24 articles. 22 render their full body as crawlable HTML** (the `<Prose>` component renders the whole article; where a PDF exists it's a *secondary* "offline download" card). That's exactly right for SEO/AEO.

**2 articles are `pdfPrimary: true` — the full report lives only in the PDF, and the page shows a ~260-word teaser:**

| Slug | On-page words (measured live) | Full report |
|---|---|---|
| `ai-is-no-longer-optional` | **266** | locked in `Carron_AI_Article_2026.pdf` |
| `5-signs-your-sme-is-ready-to-hire` | ~270 (teaser) | locked in `Carron_Hiring_Article_2026_SME.pdf` |

These two are your most substantial, best-researched reports, yet Google and AI answer engines can only see a teaser — the body text, headings, stats and sources inside the PDF are effectively invisible for ranking and citation. **Converting these to full HTML (keeping the PDF as a download) is the single highest-value content fix on the site.**

---

## 3. Technical basics

- **robots.txt** (`app/robots.ts`): allows all, disallows `/admin`, points to the sitemap, keeps `/_next` crawlable. ✅ Correct.
- **sitemap.xml** (`app/sitemap.ts`): static routes + all 24 articles + category pages, sensible priorities. ✅ Two issues:
  - `/testimonials-case-studies` (priority 0.8) is **illustrative/fictional** but indexable and in the sitemap — thin/fabricated-content risk and an E-E-A-T liability. Recommend `noindex` + drop from sitemap until real, named clients exist.
  - `lastModified` for static routes is `new Date()` (build time) — every page looks "modified today" on every deploy. Minor; fine to leave.
- **404 / broken links:** **Confirmed live bug —** every page requests `GET /_vercel/insights/script.js → 404` (Vercel Analytics, from `@vercel/analytics/next` in `app/layout.tsx`). The site deploys to Cloudflare, so the script doesn't exist → **2 console errors on every page load** and a wasted request. Cloudflare RUM (`/cdn-cgi/rum`, returns 204) already provides analytics, so the Vercel package is pure dead weight. Remove it.
- **Alt text:** every `<img>` on the homepage has alt (0 missing of 6, measured live); `next/image` usage across the source consistently passes `alt`. ✅
- **Heading order:** one `<h1>` per page via `PageHeader`; homepage has a clean `h1 → 10×h2` structure. ✅
- **HTTPS / canonical host:** `siteConfig.url` is `https://carron.co.za` and `metadataBase` is set, so OG/canonical URLs resolve absolutely. ✅ (Worth a one-time check that `www.` 301-redirects to apex.)

---

## 4. Structured data (JSON-LD)

**Present and valid in production HTML (confirmed live):**
- Site-wide graph in `app/layout.tsx` → `Organization` + `WebSite` + `ProfessionalService`+`LocalBusiness` (with address, contactPoint, areaServed, sameAs). ✅
- `/faq` → `FAQPage` (all Q&As). ✅
- Every article → `BlogPosting`. ✅

**Gaps vs. a complete setup:**
- **No `Person` schema** for Carel Gangel on `/about` (E-E-A-T — ties author to the Organization).
- **No `Service`** entities on `/services` or `/services/fractional-cfo` (only the generic site-wide LocalBusiness).
- **No `BreadcrumbList`** anywhere (helps Google render breadcrumb rich results on deep pages).
- Articles use `BlogPosting` with `dateModified` == `datePublished` — fine, but no genuine "updated" date is tracked, so refreshed articles don't signal freshness.

---

## 5. Internal linking

- **`/contact`** is well linked — 15 source files reference it (nav, footer, every CTA section). ✅
- **`/services/fractional-cfo` — the single highest-priority commercial page (sitemap 0.9) — is NOT in the header nav or the footer.** The nav's "What a CFO Adds" points to `/services`; the footer's service list also points to `/services`. The fractional-CFO page is reachable only via scattered body links (home, FAQ, article template, resources, testimonials). For your money term this is the biggest internal-linking miss.
- Footer omits the free tools (`/health-check/`, `/find-your-fit/`) and `/resources/financial-health-check`; only `/90-day-test/`, `/tools` and `/diagnostic` appear.
- Articles → service/contact linking is inconsistent (the two `pdfPrimary` teasers in particular have almost no body, so no internal links out).

---

## 6. Performance (runtime evidence; numeric Lighthouse pending)

Measured on the live homepage in-browser (not a Lighthouse score, but real signals):
- **Good:** static export served from Cloudflare's edge; fonts self-hosted as `woff2` via `next/font` with `display: swap`; CSS a single file; `next/image` with explicit `sizes`; hero image 200-OK and reasonably sized.
- **Bad:** the `/_vercel/insights/script.js` 404 on every page (§3) — a render-adjacent failed request + console errors that will cost you on the Lighthouse **Best Practices** category specifically.
- **To do in Phase 2:** a real mobile Lighthouse pass on `/`, `/services/fractional-cfo` and one article, with LCP/CLS/TBT captured (run via PSI with an API key or Chrome DevTools — the anonymous PSI quota was exhausted during this audit).

---

## 7. Keyword coverage vs. target terms

**Well covered (informational / problem intent)** — via the 24 articles + the 42-question FAQ:
cash flow forecasting, profitable but short of cash, "the bank wants forecasts", improving margins, SME funding, working capital, stock/inventory cash, provisional tax, VAT threshold, management accounts, owner-dependence. This is a real strength and is already AEO-friendly (self-contained answers + FAQPage schema).

**Under-served (high-intent commercial / local)** — these have no dedicated landing page:
- **"fractional CFO"** — one thin page (`/services/fractional-cfo`, ~650 words).
- **"outsourced CFO"** — only mentioned in copy; no page.
- **"part-time CFO / part-time financial director"** — only mentioned; no page.
- **"fractional CFO cost / price South Africa"** — no page; pricing is vague ("from R4,500").
- **City intent** — "fractional CFO Cape Town / Johannesburg / Durban / Garden Route" — nothing.
- **Sector intent** — "CFO for manufacturing / distribution / wholesale" — nothing.

This is where the growth is: the site answers "how do I fix X?" well but barely competes for "I want to hire a fractional CFO (here, at this price, in my sector)."

---

## 8. Prioritised proposed changes (Phase 2 — awaiting your approval)

### P0 — correctness / indexing (quick, low risk)
1. **Remove `@vercel/analytics`** from `app/layout.tsx` — kills the 404 + console errors on every page. (Cloudflare RUM already covers analytics.)
2. **Add `alternates.canonical`** to the 7 pages missing it (`/about`, `/services`, `/engagement`, `/diagnostic`, `/contact`, `/insights`, `/tools`).
3. **Tighten over-length meta descriptions** to ≤155 chars on `/`, `/about`, `/services`, `/services/fractional-cfo`, `/engagement`, `/diagnostic`, `/faq`, `/resources/financial-health-check`.
4. **Shorten the FAQ `<title>`** so it isn't 66 chars (e.g. drop the trailing brand, or set an absolute ≤60-char title).
5. **`/testimonials-case-studies`:** set `noindex` and remove from the sitemap until there are real, named clients (don't index illustrative content).

### P1 — high-value content & structure
6. **Convert the two `pdfPrimary` reports** (`ai-is-no-longer-optional`, `5-signs-your-sme-is-ready-to-hire`) to full HTML bodies, keeping the PDF as a download. (§2 — biggest single win.) Full text from the PDFs; `TODO(Carel):` any stat I can't verify from the PDF.
7. **Put `/services/fractional-cfo` into the footer** (and consider a nav sub-link), and add internal links to it from the top articles and `/services`.
8. **Add JSON-LD:** `Person` (About), `Service` (services pages), `BreadcrumbList` (all non-home pages). Validate every block.
9. **Expand `/services/fractional-cfo` to 1500+ words** (what it is, when you need one, what you get, how it's priced, FAQs) — with its own FAQ section (+ FAQPage schema) and internal links.

### P2 — growth pages (larger, content-dependent)
10. New commercial landing pages, added to sitemap + footer, **remote-positioned (no fake offices), all rand figures as `TODO(Carel):`**:
    - `/services/outsourced-cfo`, `/services/part-time-financial-director`
    - `/fractional-cfo-cost-south-africa` (pricing/explainer)
    - `/sectors/manufacturing`, `/sectors/distribution-wholesale`
    - city pages `/fractional-cfo/cape-town|johannesburg|durban|garden-route`
11. **Reusable case-study component + `/case-studies` index** — but publish nothing fictional; keep it out of nav/sitemap until a real client story exists.
12. **Numeric Lighthouse pass** (mobile) on `/`, `/services/fractional-cfo`, one article — record and fix any real opportunities.

### Ground rules I'll follow in Phase 2
Small, labelled commits on `seo-improvements`; **no push to main, no deploy** (you review first); keep the "Signal & Noise" design, tone and components unchanged; keep all existing URLs working (301 if any must change); SA English; rand written as `R 1 000`; **no invented facts, figures, credentials or client names — `TODO(Carel):` placeholders instead.** A `SEO-CHANGES.md` will log everything, and I'll run `tsc`/build + confirm green before handing back.

---

**Phase 1 ends here. Tell me which items to proceed with (all P0, all P1, specific numbers, or the lot) and I'll start Phase 2.**
