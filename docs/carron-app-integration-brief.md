# Carron Business Advisory — App Integration Brief

**Paste this whole document into Claude (Artifacts) as the brief for any Carron tool or app you build.** It makes the app match the Carron look, use the same scoring content, record results to the same backend, and sell the same paid products through the same Paystack gateway — so every app stays consistent with carron.co.za.

---

## 0. The commercial model (read first — everything else serves this)

Carron sells on one boundary:

| | The customer gets | The question it answers |
|---|---|---|
| **Free tools** | Score, red/amber/green per area, benchmark, where they are exposed | **Where do I stand?** |
| **Paid plans** | Ranked priorities, specific actions, how to start, targets | **What should I do about it?** |
| **CFO Review** | A person who checks the priorities, discusses them with management, and plans the implementation | **Does an experienced advisor agree, and how do we do it?** |

**A free result never contains a prescription.** It may name the weak area and the risk it carries. It must not say what to change, what to put in place, or in what order. That is the paid product, and giving it away for free is the single most damaging thing an app can do to this business.

**Vocabulary rule.** These words belong to **paid** output only: *action, priority, recommendation, plan, what to do, how to start, target, roadmap, fix first.* A free result uses: *score, where you stand, red/amber/green, under pressure, most exposed, depends on you, needs attention.*

**Never generate the paid report in the app.** The paid reports are generated **server-side after payment** — that is the paywall. The app's job is only to:

1. collect the inputs,
2. show a **free** result (score + where they stand — *not* the fixes),
3. call the Carron API to record the lead and, on purchase, start payment,
4. send the user to the shared result viewer on carron.co.za.

Because the server owns the report logic, any app that sends the same inputs gets the **identical** report. That is how results stay shared and consistent.

---

## 1. Brand & design system

- **Name:** Carron Business Advisory. **Tagline:** "Carron Creates Clarity."
- **Who for:** owners of South African SMEs. Fractional-CFO / business-advisory.
- **Voice:** plain English, practical, calm, no jargon. Always expand acronyms on first use (T&C, PO, SOP, MFA). Address the owner as "you".
- **Fonts (Google Fonts):** `Fraunces` (serif) for headings; `Inter` (sans) for body.
- **Colours — dark UI (the interactive tools):**
  - background deep green `#0f2218` (with a radial highlight `#1c3a2f` at top)
  - cream text `#f4efe4`; sage `#9dc4b0`; line-soft `rgba(255,255,255,.12)`
  - gold `#c8a84b`, gold-light `#e8d49a` (accents, primary buttons); clay `#c46a54` (warnings/errors)
- **Colours — light UI (reports, print, PDFs):**
  - background `#fff`; body `#12241a`; headings emerald `#16412f`; gold accent `#9a7d2e`; sage-grey `#5b6b60`
  - status pills: Act `#b3583f` on `#f7e4de`; Watch `#9a7d2e` on `#faf1d6`; Healthy/Proven `#3f8f72` on `#e2efe4`
- **Logo:** `https://carron.co.za/images/carron-logo-horizontal-white.png` on dark backgrounds; `.../carron-logo-horizontal-emerald.png` on light/print. (Never recolour the logo.)

### Pricing rules (get these exactly right)

- Free tools; **Financial Health Action Plan R1,295**; **90-Day Owner-Independence Plan R795**; **CFO Review from R4,500**.
- **Carron is not VAT-registered.** No VAT is added to any fee. Never write "plus VAT", "excl. VAT", "ex VAT" or "+VAT" against a Carron price — the fee shown is the fee paid. Saying so plainly is a selling point, not a caveat.
- Either paid fee is **credited in full toward a CFO Review**. Say "credited toward a CFO Review", not "toward advisory".
- Both plans are live products. Never label them "launching soon" or "coming soon".

### Naming rule

The customer-facing name of the financial product is the **Financial Health Action Plan**. Its internal `product` key, API routes and stored orders still use `diagnostic` — that is deliberate, so existing orders keep working. Never show the word "Diagnostic" to a customer as the product's name, and never rename the API key in an app.

---

## 2. Architecture

`carron.co.za` is a Cloudflare Worker that serves the static site **and** a small JSON API backed by a D1 database, with **Paystack** for payments. The API base URL is:

```
https://carron.co.za
```

The API sends `Access-Control-Allow-Origin: *`, so an app hosted anywhere (including a Claude Artifact on claude.ai) can call it from the browser.

---

## 3. The two paid products

| Product (customer-facing name) | Sold off | `product` key | Price | Result viewer |
|---|---|---|---|---|
| Financial Health Action Plan | Financial Health Check | `diagnostic` | R1,295 | `/diagnostic-result/` |
| 90-Day Owner-Independence Plan | 90-Day Test | `plan` | R795 | `/plan-result/` |

R1,295 = **129500** and R795 = **79500** (ZAR cents, Paystack subunit). Both credited toward a R4,500 CFO Review.

**What each paid report actually promises** — match this wording, do not inflate it:

- **Financial Health Action Plan:** every priority that needs work, ranked in order of urgency — each with a clear action, a starting point and a target — plus what is already strong and how to protect it. There is **no five-item cap**; the engine keeps every area needing work.
- **90-Day Owner-Independence Plan:** a phase-by-phase plan (Days 1–30 / 31–60 / 61–90) built from the answers — for every gap, the authority, limit or hand-over to put in place, why it matters and how to prove it — plus what is already running without the owner.

---

## 4. API reference

All requests/responses are JSON. All responses include CORS headers.

### 4.1 Record a free-tool completion (lead)
```
POST /api/lead
{ "tool": "90-day-test", "name": "", "email": "you@biz.co.za",
  "result": "48/100 — Owner-Reliant", "detail": "{...any JSON string...}", "consent": true }
→ { "ok": true }
```
`tool` must be one of: `"health-check"`, `"90-day-test"`, `"find-your-fit"`. `consent` must be `true`. Requires a valid email.

### 4.2 Start a paid order (either product)
```
POST /api/diagnostic/create      (or /api/plan/create)
{ "email": "you@biz.co.za", "summary": { ... see §5 ... } }
→ { "ok": true, "reference": "cba_…", "authorization_url": "https://checkout.paystack.com/…" }
```
Then **redirect the browser** to `authorization_url`:
```js
window.location.href = data.authorization_url;
```
Validation: diagnostic needs `summary.ratios` with ≥3 entries; plan needs `summary.answers` with ≥10 entries. Invalid → `{ ok:false, error:"…" }`.

### 4.3 Read the generated report (after payment)
```
GET /api/diagnostic/get?reference=cba_…     (or /api/plan/get?reference=…)
→ { "status": "pending" }
   | { "status": "paid", "report": {…}, "html": "<the full report HTML>", "meta": {…} }
```
You normally do **not** need to call this yourself — the shared viewer pages already poll it and render the `html`. Paystack returns the buyer to the viewer automatically (see §6).

### 4.4 Health Check submission (optional, richer analytics row)
```
POST /api/health-check
{ "email","consent":true,"sector","score","band","value_low","value_high",
  "net_asset_value","ratios":"<JSON string>","name","missing_count" }
→ { "ok": true }
```

---

## 5. `summary` payloads for `create`

### Financial Health Action Plan (`/api/diagnostic/create`)
```json
{
  "sectorLabel": "Retail & wholesale",
  "score": 67, "band": "Some cracks to fix",
  "value_low": 500000, "value_high": 800000, "net_asset_value": 200000,
  "ratios": [
    { "name": "Gross margin",  "val": "50%",     "status": "Healthy", "bench": "20–40%" },
    { "name": "Operating margin","val": "10%",    "status": "Healthy", "bench": "~4.1%" },
    { "name": "Cash runway (months)","val":"0.6 mo","status":"Act",  "bench": "3+ months" },
    { "name": "Debt vs revenue","val": "0.7×",    "status": "Watch",   "bench": "under 1×" },
    { "name": "Liquidity (cash+debtors vs creditors)","val":"1.6×","status":"Healthy","bench":"1.5×+" },
    { "name": "Solvency (assets vs liabilities)","val":"1.9×","status":"Healthy","bench":"2×+" }
  ]
}
```
**Contract that makes the report identical:** the server keys each ratio off words in `name` — it must contain one of `gross`, `operating`, `runway`, `liquidity`, `solvency`, `debt`. `status` must be exactly `"Healthy"`, `"Watch"`, `"Act"`, or `"Not supplied"`. Given these, the server writes the whole report (strengths, ranked priorities, targets, 90-day roadmap). So the app only has to compute each ratio's value + status the same way the live Health Check does (canonical logic lives in `public/health-check/index.html` — reuse it verbatim; ask Claude Code to extract the scoring if you need it).

### 90-Day Plan (`/api/plan/create`)
```json
{ "answers": [0,1,1,0,2,1,0,1,0,2,2,3,1,1,0,0,1,2,1,0],
  "score": 44, "band": "Owner-Reliant" }
```
`answers` is **exactly the 20 values in the canonical order in §7**, each `0–3`. The server builds the entire plan from `answers` alone (`score`/`band` are only shown in the header), so identical answers → identical plan.

---

## 6. Payment flow (end to end)

1. App collects inputs and shows the **free** result (score + where they stand — never the fixes).
2. User clicks the upsell: "Unlock your action plan · R1,295" (health) or "Unlock the full plan · R795" (90-day).
3. App `POST`s `/api/{product}/create` with `{ email, summary }`.
4. App redirects to the returned `authorization_url` (Paystack checkout).
5. Buyer pays. Paystack redirects them to `https://carron.co.za/{product}-result/?reference=…`.
6. That viewer polls `/api/{product}/get`, receives the generated `html`, and renders the full report with Save/print.

So the **report is always shown on carron.co.za's viewer** — one code path, one look, every time. The app never renders paid content itself.

**Test mode:** the site currently runs a Paystack **test** key, so checkout works with test card `4084 0840 8408 4081` (any future expiry, any CVV) and real cards are not charged. When the live key is set in Cloudflare, the same flow charges for real — no app change.

---

## 7. Canonical 90-Day Test content (use verbatim)

20 questions, in this exact order (index → domain, survival?, the question). For each, ask **"can this happen without me?"** and score: **0** = No, waits for me · **1** = On paper only · **2** = Someone else is authorised · **3** = Proven, done without me.

0. **Decision rights & authority** (survival) — An authority matrix says who can approve what — spend, discount, refund, credit, hire — up to what rand limit, and which decisions stay reserved for you.
1. **Decision rights & authority** — A named deputy holds authority when you're away, with a capable backup.
2. **Sales, quoting & pricing** (survival) — Someone can quote, discount within rules, and close a sale without you.
3. **Sales, quoting & pricing** — Pre-approved quote/contract/terms templates exist, and someone owns lead follow-up.
4. **Customer service & resolution** (survival) — Someone can resolve a complaint and issue a refund/credit up to a limit without you.
5. **Customer service & resolution** — Key customer and external relationships (bank, insurer, landlord, key suppliers) aren't known only to you.
6. **Collections & credit control** (survival) — Someone owns debtor follow-up — enforce terms, place on stop, escalate — without you.
7. **Collections & credit control** — Credit limits, term changes and repayment arrangements can be approved to clear rules without you.
8. **Money & payments** (survival) — Someone can approve and release payroll and supplier payments up to a limit without you.
9. **Money & payments** — A second person holds a banking mandate and can see the cash position any time.
10. **Purchasing & suppliers** (survival) — Staff can reorder stock, raise a purchase order (PO) and approve a supplier invoice up to a limit.
11. **Purchasing & suppliers** — A preferred-supplier list, terms and contacts are known to more than one person.
12. **People, operations & delivery** (survival) — A manager can approve leave, cover a shift gap and handle first-line discipline without you.
13. **People, operations & delivery** — The core work is documented in written procedures (SOPs) with quality standards, and each key role has a cross-trained backup.
14. **Access, IT & cyber resilience** (survival) — No critical system depends on your personal login/device/two-step verification — access is via named accounts, banking mandates and a password manager with emergency access.
15. **Access, IT & cyber resilience** — There's a written plan for an IT/cyber incident (outage, ransomware, lost phone, failed backup, payment fraud).
16. **Compliance & obligations** — Tax, statutory, insurance, licence and renewal dates are diarised and owned, with a backup.
17. **Compliance & obligations** — Someone knows which events must be reported to insurers, regulators, lenders or partners, and can act.
18. **Rhythm, escalation & continuity** (survival) — A short weekly exception scorecard (cash, sales, margin, delivery, people, risk) runs, led by the team.
19. **Rhythm, escalation & continuity** — There's a clear escalation path plus a predefined emergency authority if you're unreachable.

**Free score:** `points = Σ answer[i] × (survival ? 2 : 1)`; `maxScore = 87` (3 × Σ weights, where the 9 survival questions weigh 2 and the other 11 weigh 1); `score = round(points / 87 × 100)`. Survival questions are indices 0,2,4,6,8,10,12,14,18.

**Two different labels — don't mix them up:**
- **Overall band, by score:** `0–39` Self-Employed · `40–64` Owner-Reliant · `65–84` Owner-Light · `85–100` Owner-Independent.
- **Per-area rating, by that area's average answer** `avg`: `<1` Owner-dependent · `<2` Documented · `<2.75` Delegated · else Proven.

**What the free result may show:** the score and overall band, an area-by-area rating (per domain), the *named* weakest areas and any survival gaps **with the risk they carry** — but **never the specific fix** (the authority, limit or hand-over to put in place). Those are the paid plan. End the free result with a locked teaser and the R795 upsell.

---

## 8. Financial Health Check (summary of the contract)

The Health Check takes a compulsory **sector** and up to **10 figures** (balance-sheet items on the left, P&L on the right) and produces: a **score/100 + band**, an **indicative value range** (earnings, revenue and net-asset methods), and **six ratios** (gross margin, operating margin, cash runway, debt vs revenue, liquidity, solvency) each rated **Healthy / Watch / Act** against sector benchmarks (operating margin vs StatsSA sector net-margin; the rest vs generally-accepted standards). Blank ≠ zero — track a `missing_count`.

To keep results identical, **reuse the exact scoring from `public/health-check/index.html`** (source of truth) and post the `summary` shape in §5.

**Free result** = the score, the six ratios with their ratings and benchmarks, and the indicative value range. The band text says where the pressure is; it must not say what to do about it. **The interpretation, the ranked priorities and the actions are the paid Financial Health Action Plan.**

---

## 9. Minimal integration snippet

```js
const API = "https://carron.co.za";

// 1) record the free completion (lead)
await fetch(`${API}/api/lead`, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ tool: "90-day-test", email, result: `${score}/100 — ${band}`,
    detail: JSON.stringify({ score, band }), consent: true }),
}).catch(() => {});

// 2) on the upsell click: start payment and go to Paystack
async function buy(product, summary, email) {
  const r = await fetch(`${API}/api/${product}/create`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, summary }),
  }).then(r => r.json());
  if (r.ok && r.authorization_url) window.location.href = r.authorization_url;
  else alert("Could not start checkout. Please try again.");
}
// product = "plan"  → summary = { answers:[…20…], score, band }        → R795
// product = "diagnostic" → summary = { sectorLabel, score, band, value_low, value_high, net_asset_value, ratios:[…] }  → R1,295
```

---

## 10. Consistency checklist for every app

- [ ] Fraunces + Inter; the Carron colours; the correct logo per background.
- [ ] Plain English; acronyms expanded.
- [ ] Free result shows **where** they stand, never the paid **fixes**; the paid vocabulary (action, priority, plan, target, what to do) appears only behind the paywall.
- [ ] Free result ends with the upsell for the matching product, at the right price.
- [ ] Paid report is **never** generated in the app — always via `/api/{product}/create` → Paystack → the carron.co.za viewer.
- [ ] Reuse the canonical questions (§7) / Health Check scoring (§8) verbatim so scores and reports match.
- [ ] Record every completion to `/api/lead` (with consent).
- [ ] R1,295 = 129500 / R795 = 79500 cents; either fee credited toward a R4,500 CFO Review.
- [ ] No VAT anywhere on a Carron fee; no "coming soon" on a live product; the financial product is called the Financial Health Action Plan (never "Diagnostic") to a customer.
