/**
 * Carron R795 "90-Day Owner-Independence Plan" — the grounded expert engine.
 *
 * Takes the 90-Day Test answers (20 items, each 0-3) and builds a phased,
 * prioritised plan to make the business run without the owner: Days 1-30
 * (survival bottlenecks), 31-60 (delegate & document), 61-90 (prove, embed the
 * rhythm, test). Every action is the one already written into the test for that
 * item — no LLM, deterministic, private. Lives here so the Worker generates it
 * server-side after payment (the paywall). Content is advisor-owned.
 */

// The 20 items, mirrored from the 90-Day Test (domain, survival flag), each with
// a plain-English "why it matters" and the specific action to put in place.
const ITEMS = [
  { domain: "Decision rights & authority", survival: true, why: "Without clear approval limits, every non-routine decision funnels back to you — this is usually the single biggest source of owner-dependence.", action: "Write a one-page authority matrix: for each area, the limit each role can approve without you, what must be logged, when to escalate, and which matters are reserved (major debt, big contracts, senior hires)." },
  { domain: "Decision rights & authority", survival: false, why: "If only you can step in when a call is needed, an ordinary holiday or a week off sick becomes a business risk.", action: "Name a deputy with written authority to act in your absence, and a backup for the deputy so a single absence doesn't recreate the bottleneck." },
  { domain: "Sales, quoting & pricing", survival: true, why: "When staff can't quote or discount within rules, deals stall while customers wait — and you get pulled into every negotiation.", action: "Document the price list and discount rules so staff quote and close without a 'let me ask the boss'." },
  { domain: "Sales, quoting & pricing", survival: false, why: "Ad-hoc quoting is slow and inconsistent, and warm leads go cold while they wait for you to get to them.", action: "Create pre-approved quote, contract and terms-and-conditions templates and assign lead follow-up to someone other than you." },
  { domain: "Customer service & resolution", survival: true, why: "If only you can resolve a complaint or approve a refund, small issues escalate and customers feel every delay.", action: "Set a refund/credit authority limit and a documented complaints policy your team can act on." },
  { domain: "Customer service & resolution", survival: false, why: "Relationships that live only with you walk out the door the day you're unavailable — or the day you eventually sell.", action: "Make sure each key customer and external relationship (bank, accountant, insurer, landlord, key suppliers) is held by more than one person." },
  { domain: "Collections & credit control", survival: true, why: "Cash is the lifeblood. If chasing overdue accounts waits for you, it simply doesn't happen consistently — and the cash gap grows.", action: "Give a named person authority to chase overdue debt, place accounts on stop, and escalate at a set amount/age." },
  { domain: "Collections & credit control", survival: false, why: "Unclear credit authority leaves you with either risky exposure or a constant stream of referrals back to you.", action: "Set who approves credit limits, who can change terms, and who can agree a repayment arrangement — each with a limit." },
  { domain: "Money & payments", survival: true, why: "If payroll or supplier payments can't run without you, a single absence puts your staff and key suppliers at risk — but the fix must not weaken segregation of duties.", action: "Delegate payment approval up to a set limit with proper dual controls (a separate preparer and approver), and confirm payroll can run and be approved without you — independence without weakening fraud controls." },
  { domain: "Money & payments", survival: false, why: "A single bank signatory is a continuity risk, and a cash position only you can see keeps the business tied to your attention.", action: "Add a second bank signatory/mandate and make the cash position visible to someone other than you." },
  { domain: "Purchasing & suppliers", survival: true, why: "When buying waits for your sign-off, you get stock-outs and firefighting instead of a supply chain that just runs.", action: "Set purchasing/reorder rules (where applicable) and a purchase-order and invoice approval limit so buying the goods or services you need doesn't wait for you." },
  { domain: "Purchasing & suppliers", survival: false, why: "Supplier knowledge kept in your head means a supplier problem becomes your problem, personally, every time.", action: "Document preferred suppliers, terms and contacts so a supplier problem can be handled without you." },
  { domain: "People, operations & delivery", survival: true, why: "If leave, staffing gaps and discipline route through you, day-to-day operations stall the moment you're not there.", action: "Give a manager written authority over leave, unexpected staffing gaps and first-line discipline." },
  { domain: "People, operations & delivery", survival: false, why: "Work that lives only in your head — or one person's — is fragile: one resignation or absence and it stops.", action: "Write simple written procedures (SOPs) and quality standards for the work only you know, and cross-train a backup for each key role." },
  { domain: "Access, IT & cyber resilience", survival: true, why: "Access tied to your personal logins is both a security hole and a hard dependency — if you're unreachable, the business is locked out.", action: "Move to named accounts and role-based access; put logins in a password manager with emergency access for the deputy; add a backup two-step login (MFA) and proper banking mandates." },
  { domain: "Access, IT & cyber resilience", survival: false, why: "Without a written plan, an outage, ransomware or payment fraud becomes a panic only you can lead the business through.", action: "Write an incident plan: who calls the IT provider, who authorises spend, where backups are, who decides to shut systems down, and who tells customers." },
  { domain: "Compliance & obligations", survival: false, why: "Deadlines kept in your head get missed the moment you're busy or away — and missed statutory dates carry penalties.", action: "Put every tax, statutory, insurance, licence and renewal date on an owned calendar with a named backup owner." },
  { domain: "Compliance & obligations", survival: false, why: "Missing a required notice to an insurer, lender or regulator can void cover or breach a contract — quietly, until it bites.", action: "List reportable events and who handles each, so nothing legally or contractually important depends on your diary." },
  { domain: "Rhythm, escalation & continuity", survival: true, why: "Without a simple weekly rhythm the team owns, the business can't steer itself — it waits for you to spot the problems.", action: "Set up a one-glance weekly scorecard (cash, sales, margin, delivery, people, risk) the deputy runs without you." },
  { domain: "Rhythm, escalation & continuity", survival: false, why: "When something goes wrong and you can't be reached, someone has to be able to act — or the business simply freezes.", action: "Define the escalation path, name an emergency authority for when you can't be reached, and write 'if this happens, do this' steps for your top crises." },
];

// Short capability names (same order as ITEMS) — used to name strengths.
const CAPS = [
  "an authority matrix with approval limits",
  "a named deputy and a backup",
  "documented pricing and discount rules",
  "pre-approved quote and contract templates",
  "delegated refunds and a complaints policy",
  "key relationships held by more than you",
  "delegated debtor follow-up",
  "clear credit-limit and terms authority",
  "delegated payment approval and payroll",
  "a second bank signatory and visible cash",
  "reorder and purchase approval limits",
  "a shared preferred-supplier list",
  "a manager with people authority",
  "written procedures and cross-trained backups",
  "named accounts and secure, shared access",
  "an IT incident plan",
  "an owned compliance calendar",
  "owned handling of reportable events",
  "a team-run weekly scorecard",
  "a defined escalation path",
];

const STATE = ["waits for you", "on paper only", "delegated, not proven", "proven"];
const STATE_SHORT = ["Waits for you", "On paper", "Delegated", "Proven"];

export function generatePlan(input) {
  const answers = Array.isArray(input.answers) ? input.answers : [];
  const items = ITEMS.map((it, i) => ({ ...it, cap: CAPS[i], level: answers[i] == null ? 0 : Math.max(0, Math.min(3, answers[i] | 0)) }));

  // Phase assignment by urgency (survival + how far it has travelled from the owner).
  const p1 = items.filter((it) => it.survival && it.level <= 1);                       // stalls the business — do first
  const p2 = items.filter((it) => (!it.survival && it.level <= 1) || (it.survival && it.level === 2)); // document + prove the critical delegated
  const p3 = items.filter((it) => !it.survival && it.level === 2);                     // prove the rest

  const entry = (it) => ({ domain: it.domain, state: STATE[it.level], why: it.why, action: it.action });

  const phases = [
    {
      window: "Days 1–30", title: "Remove the survival bottlenecks",
      goal: "The handful of things that, if they still need you, stall the business within days. Put the authority and the rules in place first.",
      howto: "Start with a one-page authority matrix — who can approve what, up to what rand limit. Most owner-dependence traces straight back to decisions that still route through you.",
      items: p1.map(entry),
      empty: "Your survival items are already covered — no day-1 emergencies. Strong position to build from.",
    },
    {
      window: "Days 31–60", title: "Delegate and document the rest",
      goal: "Move the remaining gaps out of your head and into owned, written form — and prove the critical items you delegated actually work without you.",
      howto: "Turn each 'on paper' item into a simple one-page written procedure (SOP) the person actually uses. Documented is not the same as done.",
      items: p2.map(entry),
      empty: "Nothing outstanding to document or delegate here — the foundations are in place.",
    },
    {
      window: "Days 61–90", title: "Prove it, embed the rhythm, and test",
      goal: "Prove the delegated items in real conditions, stand up a weekly team-run scorecard so the business steers itself, and pressure-test the whole thing.",
      howto: "The real test is leaving: take a few days fully off and watch what breaks. Whatever surfaces is the start of your next cycle.",
      items: p3.map(entry).concat([
        { domain: "Continuity test", state: "", why: "The only real proof is your absence — this surfaces exactly what still depends on you, so you know what to tackle in the next cycle.", action: "Take three to five working days completely off. Log every decision or task that had to wait for you — that list becomes your next 90-day cycle." },
      ]),
      empty: null,
    },
  ];

  const gapCount = p1.length + p2.length + p3.length;
  const proven = items.filter((it) => it.level === 3);
  const provenCount = proven.length;
  // The strengths section: what already runs without you, named and grouped by domain.
  const strengths = proven.map((it) => ({ domain: it.domain, cap: it.cap }));

  // Domain-level readiness roll-up for the "at a glance" table (10 areas).
  const dOrder = [], dMap = {};
  items.forEach((it) => {
    if (!dMap[it.domain]) { dMap[it.domain] = []; dOrder.push(it.domain); }
    dMap[it.domain].push(it.level);
  });
  const areas = dOrder.map((dn) => {
    const lv = dMap[dn];
    const avg = lv.reduce((a, b) => a + b, 0) / lv.length;
    const level = Math.round(avg);
    return { domain: dn, level, label: STATE_SHORT[level], proven: lv.filter((x) => x === 3).length, total: lv.length };
  });

  const headline = p1.length >= 1
    ? `${p1.length} critical ${p1.length === 1 ? "item still stalls" : "items still stall"} the business the moment you step away — that's where the first 30 days go.`
    : gapCount > 0
    ? "No day-one emergencies — solid. This plan closes the remaining documentation and delegation gaps and proves them."
    : "Strong: almost everything already runs without you. This plan is about proving it and keeping it that way.";

  return { score: input.score, band: input.band || "", headline, strengths, areas, phases, gapCount, provenCount };
}

export function renderPlanHTML(plan, meta = {}) {
  const phaseHTML = plan.phases
    .map((ph) => {
      const body =
        ph.items && ph.items.length
          ? `<ul class="ph-items">${ph.items
              .map(
                (it) =>
                  `<li><span class="pi-dom">${esc(it.domain)}</span>${
                    it.state ? `<span class="pi-state">now: ${esc(it.state)}</span>` : ""
                  }${it.why ? `<div class="pi-why">${esc(it.why)}</div>` : ""}<div class="pi-act"><span class="pi-do">Put in place:</span> ${esc(it.action)}</div></li>`
              )
              .join("")}</ul>`
          : `<p class="ph-empty">${esc(ph.empty || "Nothing outstanding here.")}</p>`;
      return `
      <div class="phase">
        <div class="ph-h"><span class="ph-w">${esc(ph.window)}</span><span class="ph-t">${esc(ph.title)}</span></div>
        <p class="ph-goal">${esc(ph.goal)}</p>
        ${body}
        <div class="ph-how"><strong>How to start</strong> ${esc(ph.howto)}</div>
      </div>`;
    })
    .join("");

  const strengthsHTML = renderStrengths(plan);

  return `
  <div class="dg-head">
    <img src="/images/carron-logo-horizontal-emerald.png" alt="Carron Business Advisory">
    <div class="dg-meta"><strong>90-Day Owner-Independence Plan</strong>${esc(meta.date || "")}${meta.name ? " · " + esc(meta.name) : ""}</div>
  </div>
  <h2>Your 90-day plan to run the business without you</h2>
  <p class="dg-lede">Owner-independence score <strong>${plan.score}/100</strong>${plan.band ? " — " + esc(plan.band) : ""}. ${esc(plan.headline)} Work it in three phases.</p>
  ${renderPlanExec(plan)}
  ${renderAreas(plan)}
  ${strengthsHTML}
  <p class="dg-intro">Each item below shows where you stand today, why it matters, and the one thing to put in place. Don't try to do it all at once — work the phases in order, delegate the doing where you can, and treat <em>proven</em> (it has actually happened without you) as the bar, not merely <em>documented</em>.</p>
  ${phaseHTML}
  <div class="dg-cta"><strong>The "how to start" notes above are a taster.</strong> A Carron CFO Review works these phases with you — the authority matrix, the procedure and scorecard templates, and how to prove each item — and holds you to the 90 days. Owner dependence is one of the areas it covers, alongside cash, profitability and reporting. Your R795 fee is credited in full toward it, and Carron is not VAT-registered, so no VAT is added.</div>
  <p class="dg-disc">Automated and educational only, generated from the answers you gave — not advisor-reviewed, legal, employment or tax advice. Confirm anything with employment, contractual or statutory consequences with a qualified adviser before acting.</p>`;
}

// A synthesis paragraph: overall standing, the binding constraint, strengths, the goal.
function renderPlanExec(plan) {
  const p1 = (plan.phases[0] && plan.phases[0].items) || [];
  const st = plan.strengths || [];
  const lead = p1.length >= 1
    ? `Right now ${p1.length} survival-critical ${p1.length === 1 ? "area still stalls" : "areas still stall"} the business the moment you step away — that's the risk to close first, and it's where the first 30 days go.`
    : plan.gapCount > 0
    ? "No day-one emergencies — the business would keep running if you stepped out tomorrow. What's left is turning informal habits into documented, delegated and proven routines."
    : "Almost everything already runs without you. From here it's about proving it under real conditions and keeping it that way as the business changes.";
  const strengths = st.length
    ? ` You're not starting from zero: ${st.length} ${st.length === 1 ? "area is" : "areas are"} already proven to run without you (below), so protect ${st.length === 1 ? "it" : "them"} while you close the gaps.`
    : "";
  const goal = " The goal across these 90 days is one thing: every task and decision below should be able to happen without you — first documented, then delegated, then <strong>proven by your absence</strong>. That's also what lifts the value and sellability of the business.";
  return `<div class="dg-exec"><span class="eh">In short</span>${lead}${strengths}${goal}</div>`;
}

// All ten areas in one scannable readiness dashboard.
function renderAreas(plan) {
  const a = plan.areas || [];
  if (!a.length) return "";
  const cls = ["st-wait", "st-paper", "st-deleg", "st-proven"];
  const rows = a.map((x) => {
    const badge = `<span class="tb-badge ${cls[x.level] || "st-wait"}">${esc(x.label)}</span>`;
    const prov = `${x.proven}/${x.total} proven`;
    return `<tr><td>${esc(x.domain)}</td><td>${badge}</td><td class="tb-prov">${prov}</td></tr>`;
  }).join("");
  return `<h3 class="dg-h3">Where you stand — your ten areas at a glance</h3>
  <div class="dg-tablewrap"><table class="dg-table"><thead><tr><th>Area</th><th>Readiness</th><th>Proven</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderStrengths(plan) {
  const s = plan.strengths || [];
  if (!s.length) {
    return `
    <div class="strengths strengths--none">
      <div class="str-h">What's already running without you</div>
      <p class="str-lede">Nothing is fully <em>proven</em> yet — and that's exactly what the plan below builds. Every item you move to "proven" (it has happened without you, for real) becomes a strength recorded here next time you run this test. Expect this section to fill up.</p>
    </div>`;
  }
  const lis = s
    .map((it) => `<li><span class="pi-dom">${esc(it.domain)}</span><span class="str-cap">${esc(it.cap)}</span></li>`)
    .join("");
  const count = s.length;
  return `
    <div class="strengths">
      <div class="str-h">What's already running without you${count > 1 ? ` · ${count} strengths` : ""}</div>
      <p class="str-lede">Start here — this is what you've genuinely proven. These already run without you, so don't spend the 90 days re-checking them. Name them, and protect them.</p>
      <ul class="str-list">${lis}</ul>
      <div class="str-tips"><strong>Keep them strong</strong>
        <ul>
          <li>Re-check each one whenever someone changes role or leaves — that's the moment a "proven" item quietly reverts to you.</li>
          <li>Keep the written version current. An out-of-date procedure is as risky as none, and it dates fastest right after someone new takes it over.</li>
          <li>Re-run this test each quarter. Owner-independence drifts the moment you stop watching it — these strengths are only strengths while they hold.</li>
        </ul>
      </div>
    </div>`;
}

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
