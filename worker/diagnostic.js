/**
 * Carron R795 "Top-5 Financial Priorities" diagnostic — the grounded expert engine.
 *
 * Pure function: takes the Financial Health Check summary the browser already
 * computes (sector, score, band, value range, net-asset value, and the six
 * ratios with their status + benchmark) and returns a ranked Top-5 priorities
 * report. Every statement is tied to the user's own numbers — no LLM, no
 * external calls, deterministic and private. Lives here so the Worker can run
 * it server-side after payment (the paywalled IP).
 *
 * Input shape (from /api/health-check summary):
 *   { sectorLabel, score, band, value_low, value_high, net_asset_value,
 *     ratios: [{ name, val, status, bench }] }   // status: Healthy|Watch|Act|Not supplied
 */

const STATUS_WEIGHT = { Act: 3, Watch: 2, Healthy: 1 };
// Lower importance number = more fundamental (survival before profitability).
const IMPORTANCE = {
  runway: 1, liquidity: 2, solvency: 3, debt: 4,
  operating: 5, gross: 6, valuation: 7, reporting: 8,
};

function ratioKey(name = "") {
  const n = name.toLowerCase();
  if (n.includes("gross")) return "gross";
  if (n.includes("operating")) return "operating";
  if (n.includes("runway")) return "runway";
  if (n.includes("liquidity")) return "liquidity";
  if (n.includes("solvency")) return "solvency";
  // Check "debt" LAST — "Liquidity (cash+debtors …)" also contains "debt".
  if (n.includes("debt")) return "debt";
  return null;
}

// Priority copy per ratio × status. Each returns the finding/why/actions/target;
// {val}/{bench} are filled from the user's own numbers.
const TEMPLATES = {
  gross: {
    Act: (r) => ({
      title: "Rebuild your gross margin",
      why: "Too little of every sale survives direct costs — overheads, debt and your own income all come out of a slice that's too thin. Nothing else compounds until this improves.",
      actions: [
        "Review pricing on your top-selling lines first — small, defensible increases here move the most.",
        "Renegotiate your two or three largest input or supplier costs, or find alternates.",
        "Identify and reprice (or drop) any line you're effectively selling at a loss.",
        "Check that all direct costs are actually being recovered in your pricing, including freight and wastage.",
      ],
    }),
    Watch: (r) => ({
      title: "Tighten your gross margin",
      why: "Your margin is workable but has no cushion. A supplier increase you don't pass on, or a bit of discounting, quietly erodes the profit underneath everything.",
      actions: [
        "Pass through input-cost increases deliberately, not months late.",
        "Review discounting — it comes straight off this line.",
        "Look at product/customer mix: steer effort toward the higher-margin work.",
      ],
    }),
    Healthy: (r) => ({
      title: "Protect your gross margin",
      why: "Your gross margin is a genuine strength — it's the foundation the rest of the business stands on. The risk is quiet erosion.",
      actions: [
        "Hold the line on discounting and re-quote when input costs move.",
        "Watch mix creep toward lower-margin lines as you grow.",
      ],
    }),
  },
  operating: {
    Act: (r) => ({
      title: "Restore operating profitability — urgent",
      why: "After overheads, the business isn't making an operating profit. It can't fund growth, service debt or pay a fair owner's income from trading, and it will lean on cash or borrowing to survive.",
      actions: [
        "Rank every overhead largest-first and challenge the top five — renegotiate, reduce or remove.",
        "Test headcount and premises against actual output; carrying capacity you're not using shows up here.",
        "Stop or reprice activity that doesn't cover its own cost.",
        "Set a monthly operating-profit target and track against it, not just year-end.",
      ],
    }),
    Watch: (r) => ({
      title: "Lift your operating margin",
      why: "You're profitable at the operating line but below where a stronger operator in your sector sits — so there's less to reinvest, and less resilience if a cost rises or a month is slow.",
      actions: [
        "Attack the three largest overheads before touching anything small.",
        "Convert margin gains into a cash reserve rather than new spending.",
        "Review which jobs/customers actually contribute after overhead.",
      ],
    }),
    Healthy: (r) => ({
      title: "Compound your operating profit",
      why: "Your operating profitability is a real strength. The opportunity now is to turn it into value and resilience rather than let it drift into new fixed costs.",
      actions: [
        "Bank a share of the profit as a cash buffer.",
        "Be deliberate about which new fixed commitments you take on (see the cumulative-commitment principle).",
      ],
    }),
  },
  runway: {
    Act: (r) => ({
      title: "Fix your cash buffer — this is the most urgent item",
      why: "You have very little cash cover. A single late-paying customer or one slow month could leave you unable to fund payroll or a key supplier — a survival risk regardless of whether you're profitable.",
      actions: [
        "Build a rolling 13-week cash-flow forecast this week so you can see the low points before they arrive.",
        "Chase overdue debtors hard, and tighten terms on new work.",
        "Set a minimum cash floor and protect it.",
        "Arrange a facility (overdraft) now, while you don't urgently need it — not when you do.",
      ],
    }),
    Watch: (r) => ({
      title: "Extend your cash runway",
      why: "Your cash cover is thin. It's not an emergency, but it leaves no room for a bad month or a large unexpected cost.",
      actions: [
        "Put a 13-week cash forecast in place and keep it current.",
        "Reduce the cash trapped in debtors and stock.",
        "Build toward at least three months of operating cover.",
      ],
    }),
    Healthy: (r) => ({
      title: "Protect your cash buffer",
      why: "Your cash cover is healthy — the thing most likely to erode it is unnoticed working-capital creep as you grow.",
      actions: [
        "Keep the cash floor as a rule, not a maybe.",
        "Watch debtor days and stock as volume rises.",
      ],
    }),
  },
  debt: {
    Act: (r) => ({
      title: "Reduce your debt load",
      why: "Debt is high relative to what the business turns over. Repayments compete with operations for the same cash, and the cost of that debt eats into profit before you see it.",
      actions: [
        "List every facility with its rate, term and covenants on one page.",
        "Refinance expensive short-term debt into cheaper, longer terms where you can.",
        "Direct spare cash at the most expensive debt first.",
        "Pause new fixed financial commitments until this is under control.",
      ],
    }),
    Watch: (r) => ({
      title: "Keep debt in proportion",
      why: "Your debt is manageable but worth watching — it's at a level where another facility or a slow patch would start to bite.",
      actions: [
        "Know the rate and term on each facility.",
        "Avoid stacking new fixed commitments (see the cumulative-commitment principle).",
      ],
    }),
    Healthy: (r) => ({
      title: "Maintain your low gearing",
      why: "Low debt is a strength — it gives you room to borrow deliberately when a real opportunity appears, rather than out of necessity.",
      actions: [
        "Keep new borrowing tied to a clear, funded return.",
      ],
    }),
  },
  liquidity: {
    Act: (r) => ({
      title: "Close your liquidity gap — urgent",
      why: "You owe suppliers more than you can quickly cover from cash and debtors. That's the classic squeeze that puts otherwise-profitable businesses under pressure when a payment falls due.",
      actions: [
        "Accelerate debtor collection — this is the fastest lever.",
        "Negotiate longer or staged terms with key suppliers.",
        "Sequence payments against expected receipts rather than paying everything at once.",
        "Avoid taking on new short-term liabilities until the gap closes.",
      ],
    }),
    Watch: (r) => ({
      title: "Strengthen your short-term liquidity",
      why: "You can cover current obligations, but only just. There's little margin if a large customer pays late.",
      actions: [
        "Tighten debtor collection and reduce slow stock.",
        "Aim to cover current liabilities comfortably (around 1.5× or better).",
      ],
    }),
    Healthy: (r) => ({
      title: "Protect your liquidity",
      why: "Your short-term position is sound — the risk is letting debtor days and stock drift up as you grow.",
      actions: ["Keep debtor days and stock in check as volume rises."],
    }),
  },
  solvency: {
    Act: (r) => ({
      title: "Rebuild the balance sheet — structural",
      why: "What the business owes is close to, or more than, what it owns. That's a structural issue: it limits your ability to raise funding and magnifies the impact of any loss.",
      actions: [
        "Treat this as a priority for a proper review of funding, retained profit and the asset base.",
        "Retain profit rather than drawing it while equity is thin.",
        "Avoid new liabilities that aren't matched by an asset or a clear return.",
      ],
    }),
    Watch: (r) => ({
      title: "Strengthen the balance sheet",
      why: "Your assets cover your liabilities, but the cushion is modest. Building equity now gives you resilience and makes the business more fundable.",
      actions: [
        "Retain a portion of profit to build equity.",
        "Keep new liabilities tied to productive assets.",
      ],
    }),
    Healthy: (r) => ({
      title: "Maintain a strong balance sheet",
      why: "A solid asset-to-liability position is a real strength — it makes you resilient and fundable.",
      actions: ["Keep retaining enough profit to stay ahead of new liabilities."],
    }),
  },
};

function priorityFromRatio(key, ratio) {
  const status = ratio.status;
  const t = TEMPLATES[key] && TEMPLATES[key][status];
  if (!t) return null;
  const body = t(ratio);
  return {
    key,
    status,
    weight: STATUS_WEIGHT[status] * 100 - (IMPORTANCE[key] || 9),
    title: body.title,
    where: whereLine(key, ratio),
    why: body.why,
    actions: body.actions,
    target: targetLine(key),
  };
}

function whereLine(key, r) {
  const b = r.bench ? ` — benchmark: ${r.bench.replace(/·.*$/, "").trim()}` : "";
  return `You're at ${r.val}${b}.`;
}

function targetLine(key) {
  return {
    gross: "Aim to lift gross margin toward the top of your sector's typical range.",
    operating: "Aim to clear your sector's typical margin, then push above it.",
    runway: "Aim for at least 3 months of operating cash cover.",
    debt: "Aim to bring total debt below one year's revenue.",
    liquidity: "Aim to cover current liabilities around 1.5× or better.",
    solvency: "Aim for assets comfortably above liabilities (around 2×).",
    valuation: "Aim to move up your indicative value range by lifting margin and reducing owner-dependence.",
    reporting: "Aim for management accounts and a cash forecast every month, within days of month-end.",
  }[key] || "";
}

// A taste of the HOW — one concrete first step per lever. Genuinely useful, but
// clearly the tip of the iceberg; the full method comes with the CFO Review.
const HOWTO = {
  runway:
    "Build the 13-week forecast from today's bank balance — list every expected receipt and payment, week by week. The first cash low point usually jumps straight out.",
  liquidity:
    "Two fast levers on debtors: call your oldest accounts first, and offer a small settlement discount for early or immediate payment. Only discount where your margin can carry it — build it into your pricing, don't give it away on work already priced tight.",
  operating:
    "List overheads largest-to-smallest on one page. The top five almost always hide the real savings — challenge those before touching anything small.",
  gross:
    "Take your five best-selling lines and work out the true cost of each, including freight and wastage. Mispriced 'winners' are the usual culprit.",
  debt:
    "Put every facility on one line with its rate and term. The most expensive short-term debt is where a refinance pays back fastest.",
  solvency:
    "Retain a fixed amount of profit each month instead of drawing it — equity rebuilds faster than most owners expect.",
  valuation:
    "Reach for margin before revenue: a few points of operating margin lifts the value more than chasing extra sales.",
  reporting:
    "Set a hard monthly deadline (say the 7th) for management accounts. A fixed date does more for reporting discipline than any new system.",
};

// The strengths section: ratios already scoring Healthy, named with a "keep it"
// tip. Reassures the owner and stops the report reading as all-negative.
const STRENGTH_LABEL = {
  gross: "Gross margin",
  operating: "Operating profit",
  runway: "Cash runway",
  liquidity: "Short-term liquidity",
  solvency: "Balance-sheet strength",
  debt: "Low gearing (debt level)",
};
const KEEP = {
  gross: "Hold the line on discounting and re-quote whenever input costs move — margin erodes quietly, a point at a time.",
  operating: "Bank a share of the profit as a cash buffer rather than letting it drift into new fixed costs.",
  runway: "Keep your minimum cash floor a rule, not a maybe, and watch debtor days as volume grows.",
  liquidity: "Keep debtor days and slow-moving stock in check as you grow — that's what quietly tightens an otherwise sound position.",
  solvency: "Keep retaining enough profit to stay ahead of any new liabilities.",
  debt: "Keep any new borrowing tied to a clear, funded return — borrow by choice, not out of necessity.",
};

function strengthsFrom(ratios, exclude = new Set()) {
  const out = [];
  for (const r of ratios) {
    if (r.status !== "Healthy") continue;
    const key = ratioKey(r.name);
    if (!key || !STRENGTH_LABEL[key] || exclude.has(key)) continue; // skip anything already a priority card
    out.push({ key, label: STRENGTH_LABEL[key], where: whereLine(key, r), tip: KEEP[key] });
  }
  out.sort((a, b) => (IMPORTANCE[a.key] || 9) - (IMPORTANCE[b.key] || 9));
  return out;
}

function valuationPriority(d) {
  const range =
    d.value_low && d.value_high
      ? `${fmtR(d.value_low)} – ${fmtR(d.value_high)}`
      : "your indicative range";
  return {
    key: "valuation",
    status: d.score >= 65 ? "Healthy" : "Watch",
    weight: 150,
    title: "Grow what the business is worth",
    where: `Your indicative value is ${range}.`,
    why: "Value is driven by three things: how much profit the business makes, how reliable that profit is, and how much of it depends on you personally. Improving the priorities above lifts the first two; reducing owner-dependence lifts the third.",
    actions: [
      "Lift operating margin — it feeds directly into the earnings the value is based on.",
      "Reduce how much only you can do (the 90-Day Owner-Independence Test maps this).",
      "Build predictable, recurring revenue where you can — buyers pay more for reliability.",
    ],
    target: targetLine("valuation"),
  };
}

function reportingPriority() {
  return {
    key: "reporting",
    status: "Watch",
    weight: 120,
    title: "Put reporting on a monthly rhythm",
    where: "This is a foundation every other priority depends on.",
    why: "You can't manage cash, margin or debt from numbers that arrive late or that you don't trust. Timely monthly management accounts and a short cash forecast turn all of the above from guesswork into decisions.",
    actions: [
      "Get management accounts out within a few days of month-end.",
      "Pair them with a rolling 13-week cash forecast.",
      "Review the two or three numbers that matter each month, and act on them.",
    ],
    target: targetLine("reporting"),
  };
}

export function generateDiagnostic(d) {
  const ratios = Array.isArray(d.ratios) ? d.ratios : [];
  const candidates = [];

  for (const r of ratios) {
    if (r.status === "Not supplied") continue;
    if (r.status === "Healthy") continue; // healthy ratios are covered in the strengths section
    const key = ratioKey(r.name);
    if (!key) continue;
    const p = priorityFromRatio(key, r);
    if (p) candidates.push(p);
  }

  candidates.push(valuationPriority(d));
  candidates.push(reportingPriority());

  candidates.sort((a, b) => b.weight - a.weight);

  // Full report: de-dup by key and keep EVERY area that needs work, most urgent
  // first (no cap). The healthy areas are acknowledged in the strengths section.
  const seen = new Set();
  const priorities = [];
  for (const p of candidates) {
    if (seen.has(p.key)) continue;
    seen.add(p.key);
    priorities.push(p);
  }

  const actCount = priorities.filter((p) => p.status === "Act").length;
  const headline =
    actCount >= 2
      ? "Several items need attention now — the first two below are the most urgent."
      : actCount === 1
      ? "The business is broadly sound, with one pressing item to act on first."
      : "A solid base — the moves below protect it and build value from here.";

  return {
    sector: d.sectorLabel || "your sector",
    score: d.score,
    band: d.band || "",
    valueLow: d.value_low,
    valueHigh: d.value_high,
    nav: d.net_asset_value,
    headline,
    strengths: strengthsFrom(ratios),
    priorities: priorities.map((p, i) => ({ rank: i + 1, howto: HOWTO[p.key] || "", ...p })),
  };
}

function fmtR(n) {
  return "R" + Math.round(Number(n) || 0).toLocaleString("en-ZA");
}

// Render the report as a branded, print-friendly HTML body (light theme).
export function renderDiagnosticHTML(report, meta = {}) {
  const val =
    report.valueLow && report.valueHigh
      ? `${fmtR(report.valueLow)} – ${fmtR(report.valueHigh)}`
      : "—";
  const cards = report.priorities
    .map(
      (p) => `
    <div class="pri">
      <div class="pri-h"><span class="pri-n">${p.rank}</span><span class="pri-t">${esc(p.title)}</span>
        <span class="pri-s pri-${p.status.toLowerCase()}">${esc(p.status)}</span></div>
      <div class="pri-where">${esc(p.where)}</div>
      <div class="pri-why">${esc(p.why)}</div>
      <div class="pri-do"><strong>Do this</strong><ul>${p.actions
        .map((a) => `<li>${esc(a)}</li>`)
        .join("")}</ul></div>
      ${p.howto ? `<div class="pri-how"><strong>How to start</strong> ${esc(p.howto)}</div>` : ""}
      <div class="pri-target">${esc(p.target)}</div>
    </div>`
    )
    .join("");

  return `
  <div class="dg-head">
    <img src="/images/carron-logo-horizontal-emerald.png" alt="Carron Business Advisory">
    <div class="dg-meta"><strong>Financial Priorities Diagnostic</strong>${report.sector} · ${esc(
    meta.date || ""
  )}${meta.name ? " · " + esc(meta.name) : ""}</div>
  </div>
  <h2>Your financial priorities — the full picture</h2>
  <p class="dg-lede">Health score <strong>${report.score}/100</strong> — ${esc(
    report.band
  )}. Indicative value <strong>${val}</strong>. ${esc(report.headline)} Every area is covered below, most urgent first.</p>
  ${renderStrengths(report)}
  ${cards}
  <div class="dg-cta"><strong>The "how to start" notes above are a taster.</strong> In a Carron CFO Review a senior advisor works through these priorities with you — the full method for each, the order to tackle them, and a plan you can act on. Your R795 fee is credited in full toward it.</div>
  <p class="dg-disc">Automated and educational only, generated from the figures you entered — not a formal audit, valuation or advisor-reviewed opinion. Confirm anything material with a qualified adviser before acting.</p>`;
}

function renderStrengths(report) {
  const s = report.strengths || [];
  if (!s.length) {
    return `
    <div class="strengths strengths--none">
      <div class="str-h">What's already strong</div>
      <p class="str-lede">None of the six ratios is in the clear yet — the priorities below are where to start. As each one moves into the healthy range it'll be recorded here, so expect this to fill up as you work the plan.</p>
    </div>`;
  }
  const lis = s
    .map(
      (it) =>
        `<li><span class="pi-dom">${esc(it.label)}</span><span class="str-cap">${esc(it.where)}</span><span class="str-tip">${esc(it.tip)}</span></li>`
    )
    .join("");
  const count = s.length;
  return `
    <div class="strengths">
      <div class="str-h">What's already strong${count > 1 ? ` · ${count} of your ratios` : ""}</div>
      <p class="str-lede">Start here — these are already in good shape. Don't lose sight of them while you work the priorities below; a strength ignored is the next problem.</p>
      <ul class="str-list">${lis}</ul>
    </div>`;
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
