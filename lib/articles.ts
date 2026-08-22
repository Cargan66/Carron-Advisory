// Data-driven Insights. Add a new post by appending to `articles` below —
// the home teaser, the Insights index, and the /insights/[slug] route all read
// from here. Bodies use a tiny convention: blank lines separate paragraphs,
// and a line beginning with "## " renders as a subheading.

export type ArticleCategory =
  | "Cash Flow"
  | "Funding"
  | "Profitability"
  | "Tax"
  | "Strategy"
  | "Hiring"
  | "Growth";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) — used for sorting and display. */
  date: string;
  readTime: string;
  author: string;
  /** Cover image path under /public. */
  cover: string;
  /** Optional dedicated 1200×630 social-share image; falls back to `cover`. */
  ogImage?: string;
  /** Optional downloadable PDF (path under /public) — for report-style posts. */
  pdf?: string;
  /**
   * When true, the PDF is the primary read: the article page shows a prominent
   * "Open report / Download" card above a short teaser body. When false/absent,
   * the full text on the page is primary and the PDF is a secondary download.
   */
  pdfPrimary?: boolean;
  body: string;
};

export const articles: Article[] = [
  {
    slug: "when-shareholders-contribute-unequally",
    cover: "/images/shareholders-contribute-unequally.png",
    pdf: "/articles/Carron_When_Shareholders_Contribute_Unequally.pdf",
    title: "When Shareholders Contribute Unequally",
    category: "Strategy",
    excerpt:
      "Our August 2026 special report: equal ownership answers who owns the shares — not who must fund more, who should earn what, or who carries the greater personal risk. A framework for separating the six shareholder accounts — ownership, funding, capacity, work, benefits and risk — in an owner-managed SME.",
    date: "2026-08-22",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `Equal ownership answers who owns the shares. It does not, by itself, determine who must provide more money, who should earn what, or who should carry the greater personal risk when the business needs support.

## Executive summary

Two shareholders can own a business equally while contributing very differently. One may provide more cash, sign larger sureties, work full-time or defer remuneration. The other may bring customers, technical capability or operational leadership, but have limited personal capacity because of other commitments.

Those differences need to be identified and treated explicitly. Otherwise a payment becomes "money I put in", a reduced salary becomes "sacrifice", a personal guarantee stays invisible until the company fails, and a loan repayment is mistaken for preferential remuneration.

- Separate ownership, funding, work, remuneration, benefits and personal risk.
- Acknowledge genuine limits on personal funding capacity without transferring unlimited risk to another shareholder.
- Agree the rules before the company needs emergency funding.

**Decision principle:** every material difference should be disclosed, classified, agreed and recorded before it is relied upon.

## Equal ownership does not settle every question

A 50/50 shareholding often creates an expectation that everything else will also be equal: capital, monthly funding, hours, salaries, dividends and exposure to debt. That expectation rarely survives contact with a real business.

A shareholder's legal obligation to provide more money cannot safely be inferred from the ownership percentage alone. The memorandum of incorporation, shareholders' agreement, subscription terms, loan agreements and later resolutions matter. If those documents are silent, the company may have a commercial need for cash without a clear mechanism compelling either owner to provide it.

Equal shares can coexist with unequal roles — one shareholder running the business daily, another contributing oversight, intellectual property, customer access or years of under-remunerated work. These contributions are real, but not automatically equivalent, and should not be converted into values retrospectively during a dispute. Commitment and capacity are also different questions: a shareholder may be committed yet unable to provide more money, or have liquidity yet reasonably refuse to fund an unapproved strategy.

**Management test:** can each shareholder explain, in the same terms, what 50/50 ownership does — and does not — require when the company needs more cash?

## The six shareholder accounts

A shareholder can have several relationships with the same company at once: owner, lender, employee, director, supplier, guarantor and recipient of distributions. A single payment can be misunderstood unless its purpose is recorded when it occurs. Keep separate records for separate relationships:

| Account | What it answers |
| --- | --- |
| Ownership | Who holds the shares, voting rights and rights attached to that class of share? |
| Funding | Who subscribed for equity, advanced loans or paid company costs personally? |
| Personal capacity | What can each shareholder realistically fund or guarantee, and for how long? |
| Work and sacrifice | Who performs which role, carries which accountability or defers agreed remuneration? |
| Benefits received | What was paid as remuneration, reimbursement, dividend, loan repayment or another benefit? |
| Risk carried | Who signed surety, pledged assets or accepted exposure beyond the amount invested? |

These accounts interact, but should not be netted informally. A shareholder loan is not salary; a dividend is not repayment of a loan; long hours are not automatically additional equity; personal surety is not cash, but it is genuine contingent risk. Retrospective valuation is especially dangerous — the better time to agree the treatment is before the money, work or guarantee is provided.

## Personal finances affect business capacity

Shareholders do not enter a business with identical personal balance sheets. One may have liquidity and unused borrowing capacity; another significant debt, high household commitments, dependants or existing guarantees. Personal debt does not prove a lack of commitment — but it constrains choices. A shareholder with no borrowing capacity cannot be treated as a dependable source of emergency finance merely because the shares are held equally.

The company does not need unrestricted access to every personal transaction. But if the plan assumes future shareholder funding or guarantees, there should be enough honest disclosure to establish capacity and limits:

- Existing debt and significant monthly commitments that affect funding capacity.
- Available liquidity and realistic borrowing capacity — not the theoretical value of an asset.
- Existing personal guarantees and sureties, including obligations to other businesses.
- The maximum additional amount and period each shareholder is willing and able to support.
- Foreseeable events that could materially reduce that capacity.

Capacity should be reviewed, not presumed forever. **Capacity principle:** a genuine capacity constraint should be recorded, together with agreed measures addressing any funding and risk carried by another shareholder.

## Money into the company

When a shareholder transfers money to the company, the first question is not who was more generous — it is what the transaction legally and commercially represents.

| Treatment | Commercial effect | Questions to settle |
| --- | --- | --- |
| Additional equity | Permanent risk capital; may affect ownership or rights if new shares are issued. | Valuation, share class, dilution, approvals and exit treatment. |
| Shareholder loan | Company owes the shareholder under agreed terms. | Interest, security, ranking, repayment dates and subordination. |
| Expense paid personally | Shareholder settles a company cost. | Evidence, approval, reimbursement and VAT/tax treatment. |
| Informal advance | Cash moves without agreed terms. | High risk of later disagreement; document and classify promptly. |

Unequal funding should not automatically change ownership. Dilution is one mechanism, not the default answer — the contributing shareholder might instead receive a documented loan, interest, repayment priority or another negotiated protection. Even emergency funding needs governance: record the amount, purpose, classification, authority, and repayment or conversion terms. And test whether the funding solves the underlying problem — more shareholder money can bridge timing, but cannot indefinitely repair an uneconomic margin or a model that keeps losing cash.

## Money and value taken out

A shareholder who works in the company may be paid for the role performed; that payment need not be "market related" to be defensible. In a start-up or wealth-building phase, remuneration may be deliberately modest, deferred or linked to affordability. Equal shareholders performing different roles may reasonably receive different remuneration. Accepting less cash can be a meaningful sacrifice — but a lower agreed salary is not automatically a debt or capital contribution unless it is genuinely owed and recorded as such.

Do not mix the payment categories:

| Payment | What it represents |
| --- | --- |
| Salary or fee | Payment for an agreed role or service, subject to the applicable tax and legal treatment. |
| Reimbursement | Repayment of a properly supported company expense paid personally. |
| Shareholder-loan repayment | Settlement of an existing company debt; not remuneration or a dividend. |
| Interest | Return under a loan agreement, with tax consequences requiring confirmation. |
| Dividend or distribution | Return linked to share rights, subject to company-law and tax requirements. |
| Drawings / unexplained payment | A warning label, not a satisfactory classification for a company transaction. |

South African distributions require more than available bank cash — board authority, the governing documents, the statutory solvency and liquidity requirements and the tax treatment all need to be considered.

## Personal surety and unequal exposure

A loan belongs to the company, but a shareholder who signs surety accepts a separate personal exposure. Depending on the wording, the lender may pursue one or more sureties for amounts the company cannot pay — and the ownership percentage does not necessarily cap that exposure. Where shareholders sign different levels of surety, or only one has assets acceptable to the lender, or the documents impose joint and several liability, a 50% shareholder may carry far more than 50% of the practical downside.

No cash enters the company merely because a shareholder signs, so surety should not be added to the shareholder-loan balance — but the risk should be acknowledged, limited where possible, and considered when future funding or distributions are discussed:

- Record which facilities and amounts each shareholder guarantees.
- Understand whether liability is limited, proportional, joint, or joint and several.
- Agree whether guarantees will be reduced or released as company debt declines.
- Prevent new debt or increased facilities being accepted without the required authority.
- Consider what happens to the surety if a shareholder exits, dies, becomes disabled or leaves the business.

Independent legal advice is appropriate before material personal security is given, varied or relied upon in an exit arrangement. **Risk principle:** ownership measures the interest in the company; a surety measures personal exposure to a creditor. Do not assume the two are equal.

## Worked example: equal owners face a funding shortfall

Consider a fictional owner-managed company with two equal shareholders. The business has a credible order pipeline but needs temporary working capital before customers pay. One can fund the full shortfall; the other cannot contribute cash at present.

| Factor | Shareholder A | Shareholder B |
| --- | --- | --- |
| Shareholding | Equal interest | Equal interest |
| Operating role | Finance and commercial oversight | Managing director and sales |
| Current funding capacity | Can fund the shortfall | Cannot contribute cash now |
| Personal position | Has available liquidity | Debt and household commitments constrain capacity |
| Personal guarantees | Has accepted greater contingent exposure | Has accepted less contingent exposure |
| Current remuneration | Reduced by agreement | Reduced by agreement |

**What needs to be agreed:** whether either shareholder is obliged to contribute (and the amount, period and limit); how one-sided funding will be classified, capped, protected and repaid; Shareholder B's realistic capacity constraint and the alternatives; and Shareholder A's express agreement before relying on personal liquidity, with the cost and risk quantified.

**A possible negotiated solution:** document Shareholder A's contribution as a shareholder loan with defined interest, repayment triggers and information rights; preserve equal ownership; suspend dividends until the loan reaches an agreed level; cap further funding unless both approve; and require disclosure of any material change in capacity. That is one solution — not a universal rule. If the company cannot support the loan terms, or repeated funding is likely, the parties may need new equity, an external investor, reduced spending, a revised strategy, dilution or an orderly exit.

## Solutions: funding and personal capacity

Match the solution to the underlying problem:

- **No agreed obligation to fund** — adopt a written funding-call procedure: who may request funding, the information required, whether participation is optional or compulsory, each shareholder's cap, the response period, and what happens when a shareholder declines. Support each call with a purpose, a 13-week cash forecast, alternatives and the expected repayment.
- **Only one shareholder can fund** — a documented shareholder loan, staged contributions, external debt, a new investor, temporary cost reductions or a negotiated equity issue. A loan preserves ownership while recognising unequal cash; new equity changes ownership where permanent capital and risk have genuinely changed.
- **Repeated rescue** — stop treating each shortfall as an isolated emergency. Set a cumulative funding limit and a review trigger; once reached, revisit margins, working capital, fixed costs, strategy and viability before more personal money is requested.
- **Protecting the contributor** — agree interest or another lawful return, repayment triggers, information rights, restrictions on further borrowing, possible security, treatment on exit, and whether distributions are restricted while the loan is outstanding.

**Decision test:** does the proposed funding solve a timing problem, or merely postpone a structural loss?

## Solutions: work, remuneration and money out

- **Unequal operating roles** — use written role descriptions, decision rights, time commitments and measurable accountabilities. Equal ownership does not require equal remuneration where the work differs, but pay should follow an agreed role and the company's affordability, not an informal "I do more".
- **Can't afford full remuneration** — agree a start-up remuneration policy: the cash payable now, any triggers, the review date, and whether any unpaid amount is genuinely owed. A lower agreed salary is not automatically a debt; contractually deferred remuneration is recorded separately.
- **Poorly classified owner payments** — every payment coded and supported when made (remuneration, reimbursement, interest, loan repayment, dividend). Unexplained "drawings" trigger review, not a permanent suspense account.
- **Capacity without destroying privacy** — a confidential capacity declaration limited to what the business needs: funding range, material guarantees, borrowing constraints, maximum exposure and foreseeable changes. Confirm annually.
- **Distributions that worsen imbalance** — before dividends, review solvency and liquidity, outstanding shareholder loans, unpaid approved remuneration and unequal exposure.

**Classification rule:** no amount should leave the company until its purpose, authority, supporting evidence and accounting treatment are clear.

## Solutions: creditor recovery, surety and exit

- **The shareholder with assets is the easier target** — where the finance documents allow it, a creditor may pursue whoever is easiest; internal percentages do not restrict the creditor. Discuss capped or proportionate sureties, consent for new facilities and the effect of each waiver — and reflect any limit in terms the creditor accepts.
- **One co-surety pays more than their share** — co-sureties may have contribution rights, but wording and facts matter. Record intended proportions in a contribution agreement or cross-indemnity, recognising a claim has little value against someone with no recoverable assets.
- **Only one shareholder signed** — equal shares do not make the other personally responsible; any intended sharing needs a cross-indemnity, borrowing and distribution restrictions, information and veto rights, or a commercial adjustment.
- **Exit while the creditor still holds the surety** — a share sale does not release a surety. Seek creditor release, accepted replacement security or refinancing; where release is unavailable, an exit agreement should set out who pursues it, the steps and a deadline.
- **Deadlock** — a staged process: direct discussion, mediation, expert determination, and a carefully drafted buy-sell mechanism as a last resort. Avoid formulas that reward the deepest pockets or force a distressed sale.

**Protection principle:** an indemnity is only as useful as the other party's ability to honour it — test legal rights against practical recoverability.

## What shareholders should agree in advance

A useful shareholders' agreement is not merely a record of percentages; it explains how the company responds when additional capital, temporary liquidity or personal guarantees are required. Settle, in advance: who may request funding and what must support it; whether any obligation to contribute exists and how it is capped; what happens when a shareholder cannot or will not participate; whether funding is equity, loan or third-party debt; how interest, repayment, security, priority and conversion are determined; whether new debt or sureties need unanimous approval; how roles, remuneration, deferrals and reimbursements are approved; when dividends may be considered while loans are outstanding; what information shareholders receive and how often; and how deadlock, incapacity, exit, death and default are handled.

Use practical triggers rather than vague promises — the cash forecast falling below a reserve, borrowing exceeding a limit, a funding request requiring a 13-week forecast, further exposure needing written consent. Review personal capacity respectfully: an annual confidential confirmation and immediate disclosure of material changes, not supervision of household spending.

**CFO test:** if the company needed urgent funding, could the shareholders predict the process, the classification of the money and the protection of each person — without first having an argument?

## Conclusion

Equal ownership can remain entirely appropriate when shareholders contribute different amounts of cash, time, expertise and personal risk. Clear treatment does not require perfect symmetry — it requires the differences to be known, classified and addressed consistently.

The financially constrained shareholder should not be judged simply for being unable to contribute. But that constraint cannot become an automatic obligation for another shareholder to fund every shortfall, sign every surety or defer repayment indefinitely. The discipline is to keep the six accounts separate — ownership, funding, personal capacity, work and sacrifice, benefits received, and risk carried. Once those are clear, the shareholders can choose among loans, equity, external funding, reduced costs, deferred remuneration or changed ownership with far less ambiguity. The best time to agree the rules is while the shareholders can still discuss the matter as partners rather than opponents.

## Problem-to-solution matrix

A starting point, not a prescription — select, adapt or combine options after considering the company's agreements, finance documents, tax position, affordability and the practical recoverability of each protection, with qualified advisers.

| Problem identified | Possible discussion options |
| --- | --- |
| Equal ownership assumed to require equal funding | State whether further funding is compulsory, optional or capped; establish a funding-call procedure. |
| One shareholder can't contribute (debt/commitments) | Disclose realistic capacity; use shareholder loans, external funding, staged contributions, cost reductions or agreed dilution. |
| One shareholder provides all the additional funding | Record it as equity or a loan; agree interest, repayment priority, information rights, security and dividend restrictions. |
| Personal circumstances treated as entirely private | Require limited confidential disclosure of capacity, sureties and material constraints — not unrestricted access. |
| A shareholder accepts lower remuneration | Agree affordable remuneration; distinguish reduced from contractually deferred pay; record any amount actually owed. |
| Unequal operating roles | Use written roles, responsibilities, time commitments, decision rights and agreed remuneration principles. |
| Money out is poorly classified | Separate salary, reimbursement, dividends, interest and loan repayments; require approval and records. |
| One shareholder signs greater surety | Negotiate caps, proportional exposure, cross-indemnities, security, information and approval rights over new borrowing. |
| The wealthier shareholder is the creditor's easiest target | Negotiate limitations in the original surety; consider contribution and indemnity arrangements and separate security. |
| The other shareholder has no recoverable assets | Recognise an indemnity may be worthless; consider security over shares, distribution restrictions or alternative funding. |
| The company can't repay the shareholder who settled the debt | Record the claim; restrict distributions; establish repayment priority; consider restructuring or external capital. |
| Disagreement about whether more funding is sensible | Require a request supported by a 13-week forecast, purpose, repayment plan, alternatives and downside scenario. |
| Urgent funding bypasses governance | Adopt an emergency-funding procedure with authority limits and written ratification. |
| One shareholder repeatedly funds shortfalls | Establish cumulative funding limits and triggers for restructuring, dilution, external investment or exit. |
| Dividends paid while one shareholder remains exposed | Confirm solvency and liquidity first; consider reducing shareholder loans or unequal exposure before distributing. |
| A shareholder exits while still liable under surety | Seek written creditor release or accepted replacement security; don't assume a private agreement releases the surety. |
| A 50/50 deadlock | Use escalation, mediation, independent advice, reserved matters and a carefully drafted buy-sell or exit mechanism. |

*This report provides general business and financial education only. It is not legal, tax, employment, credit, valuation or investment advice. The Companies Act, the memorandum of incorporation, shareholders' agreement, employment, loan and surety documents, resolutions, applicable tax law and the particular facts must be reviewed by appropriately qualified South African legal and tax advisers.*

**Related reading:** Can Your Business Afford to Grow? · Why the Bank Said No · The 7-Step Cash Flow Framework.

The full report includes a one-page **Shareholder Contribution and Decision Review** — a working record to complete before the next funding, guarantee or remuneration decision — available in the downloadable PDF.`,
  },
  {
    slug: "management-accounts-arrived-now-what",
    cover: "/images/management-accounts-now-what.png",
    pdf: "/articles/Carron_Your_Management_Accounts_Arrived_Now_What.pdf",
    title: "Your Management Accounts Arrived. Now What?",
    category: "Strategy",
    excerpt:
      "Our August 2026 special report: receiving management accounts isn't the same as using them. How an SME owner turns the monthly pack into explanation, forward-looking judgement and action — with a worked example, a 30-minute review, and a one-page decision sheet.",
    date: "2026-08-13",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `Receiving management accounts is not the same as using them. The real value starts when the numbers are turned into explanation, forward-looking judgement and management action.

**The four questions:** What changed? · Why did it change? · What does it mean for the next few months? · What are we going to do about it?

A profit and loss statement, balance sheet, debtor age analysis and cash-flow report can all be technically correct and still make very little difference to the way a business is managed. Many monthly finance meetings start on page one, work through individual expense lines, explain a few variances and conclude that the month was "good", "difficult" or "about on budget". That is reporting — it is not yet financial management.

The purpose of management accounts is to help management make better decisions while there is still time to change the outcome.

## 1. The report is not the meeting

Monthly accounts describe what has already happened. Management's job is to determine what those results say about what should happen next. A business can produce increasingly sophisticated reporting without improving decision-making; more pages, dashboards and graphs do not automatically create better management information.

For an SME this does not require a 50-page board pack. It requires a small number of reliable reports, produced soon enough after month-end, and a disciplined review process. At a minimum, management usually wants visibility over:

- revenue and gross margin;
- operating expenses and operating profit;
- cash and near-term liquidity;
- debtors and overdue collections;
- stock or work in progress, where relevant;
- creditors and major upcoming payments;
- actual results against budget, forecast or another sensible comparator; and
- the forward outlook.

**The principle:** management accounts should contain enough information to explain performance and support a decision — but not so much that the important issues disappear inside the report.

## 2. Start with what changed

One of the least effective ways to review management accounts is to read every line in sequence. Start instead with the significant movements. The first question is: *what is materially different from what we expected?* For example:

- revenue is 12% above forecast;
- gross margin has fallen from 34% to 29%;
- one expense category is substantially higher;
- debtor days have increased;
- stock is growing faster than sales;
- overtime has become recurring;
- cash is lower despite a profitable month; or
- one customer now represents an unusually large share of sales or debtors.

Not every variance deserves equal attention. An office expense R3,000 above budget may be irrelevant; a two-percentage-point deterioration in gross margin on a large revenue base may be very important. Materiality needs both rand value and business context. A useful meeting begins with perhaps three to five significant issues — if there are twenty, the pack needs better prioritisation.

Before discussing the detail, everyone reviewing the numbers should be able to answer one question: **"What surprised us this month?"** If the answer is "nothing", either the business is exceptionally predictable, or the reports are not being challenged hard enough.

## 3. Are sales producing the expected margin?

Revenue is often the first number an owner notices, and it should rarely be considered on its own. Suppose monthly sales rise from R2.0 million to R2.3 million — but gross margin falls from 32% to 27%:

| | Previous month | Current month |
| --- | --- | --- |
| Revenue | R2,000,000 | R2,300,000 |
| Gross margin | 32% | 27% |
| Gross profit | R640,000 | R621,000 |

Sales increased by R300,000, yet gross profit *fell* by R19,000. The business is doing more work but generating less gross profit — and that requires explanation. Possible causes include lower selling prices, increased discounts, product or customer mix, supplier cost increases, exchange-rate effects, excessive freight, overtime, subcontractor costs, waste or rework, stock losses, commission, unbilled work, or incorrect cost allocation.

**Management test:** a business should not congratulate itself on growing revenue until it understands the margin attached to that growth.

## 4. Where did the cash go?

A profitable month can still end with less money in the bank. That does not necessarily mean anything is wrong — but the movement must be understood. Cash may have gone because customers have not yet paid, stock increased, suppliers were paid faster, VAT or provisional tax was paid, equipment was purchased, a loan was repaid, drawings or dividends were paid, deposits were paid, or cash has simply been absorbed by growth.

**The owner's question:** "We made a profit — why is the bank balance lower?" The answer is usually somewhere in the balance sheet and cash movements.

- **Debtors** — don't look only at the total. Consider overdue balances, ageing by 30/60/90+ days, large individual exposures, disputed invoices, and whether collections are improving or deteriorating. A growing debtor balance can be fine if sales are growing — but if debtors grow substantially faster than revenue, understand why.
- **Stock** — higher stock may be deliberate (seasonal demand, a major order, longer lead times, a bulk deal) or a warning (slow-moving or obsolete items, poor purchasing discipline, cash trapped in inventory). The report cannot tell the difference; management must.
- **Creditors** — an improving bank balance can be misleading. Cash may look stronger simply because suppliers haven't been paid. That is delayed outflow, not cash generation.

Review debtors, stock and creditors together, not as unrelated balance-sheet numbers.

## 5. Which costs are becoming permanent?

A single month's expense variance often matters less than a change in the underlying cost structure. A business that adds two employees, another vehicle, new software subscriptions, more warehouse space and R40,000 a month of outsourced support may find each commitment sensible on its own — but together they permanently raise the monthly break-even point.

**Once-off vs recurring:** a R100,000 once-off implementation cost hurts one month. A R30,000 recurring monthly commitment costs R360,000 every year before escalation — and is often the more significant of the two.

Look for the new run rate: which costs have risen three months in succession? Was it planned? Temporary or permanent? What revenue or efficiency was expected in return — and did it materialise? If sales weaken, can the cost be reduced? Has break-even moved? This matters most after a period of growth, when resources are added in small increments and the fixed-cost base changes before anyone notices.

## 6. Compare actual performance with something meaningful

"Marketing cost was R82,000" is a fact, not yet management information. Was it above or below budget? Higher than last month, or the same month last year? Driven by a planned campaign? Producing measurable sales?

| Comparison | Question | What it tells management |
| --- | --- | --- |
| Budget | What did we originally expect? | Accountability, and testing the assumptions behind the annual plan. |
| Latest forecast | What did we most recently expect? | Often more useful than an old budget once circumstances have changed. |
| Prior month | What is changing now? | Emerging trends — with care in seasonal businesses. |
| Prior year | How are we doing vs the comparable period? | Particularly useful where seasonality matters. |
| Operational driver | Does the result make sense operationally? | Revenue per salesperson, billable hours, average selling price, units, jobs completed. |

The strongest packs connect financial outcomes to operational causes — moving the conversation from "the number changed" to "we understand *why* the number changed."

## 7. Look forward before closing the report

A common weakness in monthly reporting is spending all the time on the month that has already ended. The final part of the meeting should be forward-looking: what do the current results change about the next three months? Which sales assumptions need updating? Have customer payment dates moved? Are supplier prices changing, or payroll about to increase? Are tax payments approaching? Does the cash forecast still make sense, and has the minimum expected cash balance changed?

A business can wait until next month's accounts to discover that profit was lower. It cannot wait comfortably until next month to discover that *next Friday's payroll* cannot be funded. For that reason, monthly management accounts and a short-term cash forecast serve different purposes and should complement one another.

## 8. Turn exceptions into decisions

This is where many meetings lose value: management identifies a problem, someone explains it, everyone accepts the explanation, and nothing changes. A meaningful exception should end in one of three outcomes:

| Outcome | Meaning |
| --- | --- |
| Accept | The movement is understood and management is comfortable with it. No action required. |
| Investigate | Not enough information yet. Someone establishes the facts by a specified date. |
| Act | Management knows what must change. An owner and deadline are assigned. |

| What changed | Explanation | Decision |
| --- | --- | --- |
| Gross margin fell from 31% to 27% | Supplier increase not recovered on three major products | Pricing review before next sales cycle |
| Debtor days increased | Two large customers paid late | Account managers to confirm collection dates |
| Overtime increased 35% | Production bottleneck | Review staffing and shift structure |
| Software cost increased | New licences added across departments | Confirm active users, cancel redundant licences |

Without the final decision column, management accounts risk becoming a history lesson.

## 9. Worked example: a good month, a weaker business

Consider a fictional South African distribution and service SME:

| | Previous month | Current month |
| --- | --- | --- |
| Revenue | R3,200,000 | R3,520,000 |
| Gross profit | R960,000 | R985,600 |
| Operating profit | R235,000 | R248,000 |
| Closing bank balance | R610,000 | R390,000 |

At first glance the month looks good — revenue, gross profit and operating profit are all up. But cash fell by R220,000. The weak conclusion ("good trading month, cash a little tight") would miss most of the useful information. The review reveals four issues:

1. **Gross margin deteriorated** — from 30.0% (R960,000 ÷ R3,200,000) to 28.0% (R985,600 ÷ R3,520,000). A major customer received additional discounts while freight costs increased, so the growth is less valuable than it appeared.
2. **Debtors increased by R310,000** — mostly two large customers, both beyond terms. The revenue is recognised; the cash has not arrived.
3. **Stock increased by R180,000** — purchasing ran ahead of a sales campaign now delayed six weeks. The business is funding it in the meantime.
4. **Fixed monthly costs increased** — a salesperson, a leased vehicle and warehouse staff added over three months total R94,000 a month. Approved individually; their combined effect on the cost base only now shows.

**Better conclusion:** sales are growing, but margin quality has weakened, more cash is tied up in debtors and stock, and the fixed-cost base has risen. The business needs to improve pricing discipline, confirm collection dates and reconsider near-term purchasing before adding further cost. The accounting numbers didn't change — the quality of the interpretation did.

## 10. A 30-minute monthly finance review

A disciplined SME review can be completed quickly if the pack is prepared properly:

| Time | Focus | What to cover |
| --- | --- | --- |
| 0–5 min | Headline position | Revenue, gross margin, operating profit, cash, debtors, stock, forecast. Identify the 3–5 issues to discuss. |
| 5–15 min | Understand the movements | For each exception: what changed, why, temporary or structural, the rand effect, likely to continue? |
| 15–22 min | Look forward | Major collections, supplier payments, payroll, tax dates, stock purchases, major orders, capex, forecast cash low point. |
| 22–30 min | Decide | For every significant issue record Action — Owner — Due date. Then close. |

The purpose is not to discuss finance for 30 minutes; it is to leave with clearer decisions than when the meeting started.

**On AI:** used well, AI can summarise material variances, compare commentary between periods, flag unanswered questions, prepare an agenda, and turn a long report into a short list of management questions. But an AI-generated explanation is not evidence — if AI suggests margin fell because of discounts, freight or mix, management must still establish which explanation the records actually support. AI can help identify the question; it should not invent the answer.

## 11. Conclusion

A monthly pack does not need to predict every problem. It should make important changes visible early enough for management to respond — telling you where performance changed, why, whether sales are producing acceptable margin, where cash is being absorbed, whether the fixed-cost base is changing, what the results imply for the next few months, and which decisions now need to be taken.

South African small-business research in 2026 indicates owners are already paying close attention to cash — 66% report monitoring cash flow, and 63% check their bank balance daily or weekly. The next step is to turn that attention into forward-looking management information rather than relying on the bank balance alone.

The most useful question at the end of a monthly finance meeting is not "Have we reviewed the accounts?" It is **"What are we going to do differently because of what the accounts told us?"**

*This article is a general management framework and does not replace accounting, tax, legal or other professional advice appropriate to a particular business.*

The full report includes a one-page **Monthly Management Accounts Decision Sheet** — a working record for the headline position, the eight owner questions, the decision log and the forward view — available in the downloadable PDF.`,
  },
  {
    slug: "fractional-cfo-services-south-africa",
    cover: "/images/boardroom.jpg",
    ogImage: "/images/og-fractional-cfo.png",
    title: "Fractional CFO Services in South Africa: Complete Guide",
    category: "Strategy",
    excerpt:
      "What fractional CFO services do, how they differ from accountants, and why owner-managed South African businesses need one. Pricing: R2,500/hour based on scope.",
    date: "2026-08-09",
    readTime: "10 min read",
    author: "Carel Gangel",
    body: `Your business is growing. Revenue is up. But you can't shake the feeling that you're flying blind on your finances.

You're not alone. Most owner-managed businesses in South Africa face the same problem: they're good at what they do — running operations, selling products, building teams — but translating their numbers into decisions is another story.

That's where fractional CFO services come in.

## What Is a Fractional CFO?

A fractional CFO is a senior financial strategist who works with your business on a part-time, flexible basis — without the full-time salary or long-term commitment.

A fractional CFO doesn't do data entry. They don't file tax returns. What they do:

- **Translate numbers into decisions** — your P&L is a roadmap, not just a report
- **Forecast cash flow** — so you know what's coming and can plan accordingly
- **Build financial strategy** — aligned with your growth goals
- **Manage KPIs** — the metrics that actually matter to your business
- **Guide capital allocation** — where to invest, what to cut, when to push harder
- **Support funding or exit plans** — if you're raising capital or planning to sell

## Fractional CFO vs. Accountant: The Critical Difference

Accountants look backward. They close your books, file your returns, and tell you what happened last month.

Fractional CFOs look forward. They use historical data to predict cash needs, identify profitability leaks, and build scenarios for growth.

Both matter — they just answer different questions. Your accountant tells you what happened; a fractional CFO helps you decide what to do next. The two work best side by side, which is why a good fractional CFO works alongside your accountant, not instead of them.

## Why Owner-Managed Businesses Need This Now

You're bootstrapped or lightly funded. You have finite resources. Every capital decision matters.

A fractional CFO helps you avoid cash crunches, improve margins, scale smartly, make faster decisions, and prepare for the next phase — all without carrying a full-time executive salary.

## What a Fractional CFO Engagement Looks Like

- **Month 1 — Assessment.** Review historical financials. Identify gaps. Establish baseline KPIs.
- **Months 2–3 — Build & implement.** Install the cash flow model. Build KPI dashboards. Create a financial policy framework.
- **Ongoing — Strategy & execution.** Monthly or quarterly reviews. Forecasting. Capital-allocation guidance.

Time commitment is typically **10–20 hours a month at R2,500/hour**, depending on the scope of the engagement and the resources needed.

## Fractional CFO vs. Full-Time CFO: When Each Makes Sense

Hire a **fractional CFO** if you don't need daily oversight, you want expert guidance without the full-time cost, you're in a growth or transition phase, and you already have accounting covered.

Hire a **full-time CFO** if you have complex multi-division operations, daily decisions are mission-critical, or you're preparing for an IPO or an institutional sale.

For the fuller breakdown, see [fractional CFO vs full-time CFO](/insights/fractional-vs-full-time-cfo).

## How to Choose the Right Fractional CFO

**Red flags:**

- They focus on compliance over strategy
- They only work with one fixed package
- They can't explain your model in plain English
- They're reactive rather than forward-looking

**Green flags:**

- They ask the hard questions first
- They build custom models for your business
- They speak your language
- They have owner-managed business experience
- They work alongside your accountant, not against them

## The South African Angle

Your strategy has to account for local realities: exchange-rate volatility, the funding environment, regulatory shifts, sector dynamics, and seasonal cash-flow patterns.

A CFO who understands these dynamics navigates them, instead of reacting to them.

## The Bottom Line

A fractional CFO isn't a luxury. It's insurance against flying blind.

Start with a [financial diagnostic call](/contact), explore [what a fractional CFO adds](/services/fractional-cfo), [check your cash health](/resources/financial-health-check), or see [how we've helped other owners](/testimonials-case-studies).`,
  },
  {
    slug: "cash-flow-framework",
    cover: "/images/reporting-dashboard.jpg",
    ogImage: "/images/og-cash-flow.png",
    title: "A 7-Step Cash Flow Framework for Owner-Managed Businesses",
    category: "Cash Flow",
    excerpt:
      "Why profitable businesses run out of cash — and a 7-step framework to forecast cash flow 90 days out, with scenarios, action plans, and a calculator you can use.",
    date: "2026-08-08",
    readTime: "9 min read",
    author: "Carel Gangel",
    body: `Cash flow kills more profitable businesses than bad products ever do.

You know the feeling: your P&L says 30% growth year on year. Your bank account says something different.

## Why Cash Flow Is Different from Profit

Profit is revenue minus expenses. Cash flow is money in minus money out. They differ because of **timing**:

- You invoice on day 1, but the terms are Net 30 EOM (a 28 January invoice is only due 28 February — about 31 days later)
- You pay salaries on the 25th, but the revenue arrives on the 28th
- You bought inventory three months ago with cash you didn't have
- Your biggest customer extended their payment terms

The result: profitable on paper, broke in practice.

## The 7-Step Framework

### Step 1 — Map your cash cycle

How long is it between paying for something and getting cash from the customer? Buy inventory on day 1 (cash out), it sits for 30 days, the customer buys on day 31, and Net 30 EOM terms mean payment lands roughly 31 days after month-end — about 92 days of cash trapped.

Calculate it: **Days receivable + Days inventory − Days payable = your cash cycle.**

### Step 2 — Forecast receivables & payables

List your top 10 customers: how long do they take to pay? List your top suppliers: what are your terms? Project 90 days out — how much in AR, how much in AP? That gap is cash stuck in operations.

### Step 3 — Account for seasonal swings

Which months are cash crunches? Which carry excess cash? When do you need to borrow? Plot it, and you'll see crises three months ahead.

### Step 4 — Build a 13-week rolling forecast

Include fixed costs (salaries, rent, insurance), variable costs (COGS, packaging), and one-off expenses (equipment, marketing). Use our [cash flow calculator](/tools) or a spreadsheet. Update it monthly and rebuild from the prior month's actual closing balance.

### Step 5 — Identify your minimum cash balance

A healthy buffer is 3–6 months of operating expenses plus the ability to meet all creditor obligations. If the forecast drops below this, act.

### Step 6 — Build scenarios

Model a best case (on time, hit target), a base case (realistic delays and drops), and a stress case (revenue down 20%, a big customer extends terms). See which one keeps you up at night.

### Step 7 — Create an action plan

- **Immediate (0–4 weeks):** chase overdue AR, look at renegotiating terms, negotiate AP, pause discretionary spend.
- **Medium-term (1–3 months):** refinance debt, review pricing, reduce inventory.
- **Strategic (3+ months):** change the business model, rebalance the customer mix, invest in automation.

## Common Patterns & Fixes

- **Invoicing too late.** Invoice the same day; move to retainers or deposits.
- **AR aging is a mess.** Automate reminders; call the moment an invoice is overdue, or when terms can be renegotiated.
- **Too much inventory.** Tighter ordering, dropshipping, or consignment.
- **Suppliers eating your cash.** Negotiate extended terms.
- **Buying assets too freely.** Buy an asset only if its conservative annual cash benefit exceeds its annual ownership cost — and only if the business keeps at least three months of operating cash afterward.

## The Bottom Line

Cash flow is predictable. Spend four hours building this framework, update it monthly, and use it to decide when to hire, spend, or grow.

Want a second read on your numbers? [Check the financial health check](/resources/financial-health-check), learn about [fractional CFO services](/services/fractional-cfo), or [book a call](/contact).`,
  },
  {
    slug: "fractional-vs-full-time-cfo",
    cover: "/images/partnership.jpg",
    ogImage: "/images/og-fractional-vs-fulltime.png",
    title: "Fractional CFO vs Full-Time CFO: Which Do You Need?",
    category: "Strategy",
    excerpt:
      "An honest comparison of fractional vs full-time CFO — cost, commitment and ramp-up time, when each makes sense, and the hiring mistake we see most.",
    date: "2026-08-07",
    readTime: "8 min read",
    author: "Carel Gangel",
    body: `At some point, every growing owner-managed business asks the same question: *should I hire a full-time CFO?*

It feels like a mark of maturity — like you're graduating to enterprise-level financial leadership. But here's what most founders don't realise: a full-time CFO is the wrong move for most owner-managed businesses.

Not because full-time CFOs aren't valuable. They are — in the right context. But for most scaling businesses, a fractional CFO is the better answer. Here's when each model makes sense, and the hiring mistake we see most.

## The Honest Comparison

| Factor | Full-Time CFO | Fractional CFO |
| --- | --- | --- |
| Cost | Significantly higher annual investment | R2,500/hour, typically 10–20 hours/month |
| Commitment | 40 hours/week, ongoing | Flexible hours, scalable scope |
| Ramp-up | 3–6 months to be effective | 2–4 weeks |
| Flexibility | Hard to scale down or exit | Easy to adjust or pause |
| Scope | Manages the entire finance function | Strategy + decision-making |
| When to exit | Expensive and disruptive | Clean, retainer-based |
| Oversight needed | Yes, from you | Minimal (strategic review only) |

## The Cost Question: Why Full-Time Is Expensive

A full-time CFO costs significantly more than most owners expect — because a CFO is a senior executive, not a data-entry accountant. They bring deep financial acumen, industry experience, board-level communication, and years of managing complexity. That talent is expensive, full-time.

Beyond salary, add benefits, training and development, the systems and tools they'll need, and the recruitment cost when a hire doesn't work out. With a fractional engagement, you pay for expertise only when you need it — no overhead, no idle time, no ramp-down cost.

## The Ramp-Up Problem Nobody Talks About

A new full-time CFO is largely unproductive for three to six months. They have to understand your business model, meet your team, learn your accounting, build trust with you, and establish authority — all while you pay a full salary.

A fractional CFO ramps up in two to four weeks, because they've seen dozens of businesses like yours, they know what to look for, they start delivering value immediately, and there's no politics or empire-building — they're not staying.

## When You Actually Need a Full-Time CFO

1. **Complex multi-division operations** — three or more business units with different models and critical daily coordination.
2. **Institutional investors or boards** — investor relations, board reporting and audit committees that need daily interaction.
3. **Preparing for an IPO or institutional sale** — building compliance, audit infrastructure and governance frameworks.
4. **Mission-critical daily decisions** — capital decisions every day that hinge on the financials.

Even then, ask: do I need full-time, or a fractional CFO plus a strong controller? Most of the time, it's the latter.

## When Fractional CFO Makes More Sense (And It's Most of the Time)

1. **You don't need daily oversight** — decisions are weekly or monthly, not hourly.
2. **You want expert guidance without full-time cost** — strategic input, not operational management.
3. **You're in a growth or transition phase** — your needs will change, and fractional scales with you.
4. **Your accounting is handled** — you have a controller or accountant and need a strategic layer on top.
5. **You're bootstrapped or lightly funded** — every rand matters; fractional is R2,500/hour for 10–20 hours a month, versus significantly more (and far harder to adjust) for full-time.

## The Hybrid Model: The Best of Both

A third option most founders miss: a **fractional CFO plus a strong controller**.

- **Fractional CFO (10–20 hours/month):** strategy, forecasting, capital allocation, KPI frameworks, decision support.
- **Controller (full-time):** daily execution, close, reconciliation, compliance, systems.

It tends to deliver most of a full-time CFO's results at a fraction of the cost, and it fits scaling SaaS companies, growing services agencies, multi-location retail, and businesses with complex operations that aren't yet institutional.

## The Hiring Mistake We See Most

Owner-managed businesses often hire a full-time CFO too early — out of peer pressure ("real companies have CFOs"), fear ("we're too big not to"), or misdiagnosis (thinking the problem is "no financial leadership" when it's really "no basic accounting infrastructure").

What usually happens: months 1–3 the CFO learns the business and delivers little; months 4–6 they start to add value; months 9–12 a personality clash emerges, or they want to build a team, or they discover the accounting is messier than expected; by month 13 the owner realises they've built a finance function rather than solved their problem. Many of these hires don't last 18 months.

The real need was often a diagnostic, a financial model, monthly review and guidance, and someone to coach the accountant. That's fractional.

## How to Decide: Three Questions

1. **Do you make financial decisions daily?** Yes → full-time might make sense (though the hybrid is usually better). No → fractional.
2. **Can the business absorb the cost if it doesn't work out?** Yes → full-time is affordable. No → fractional.
3. **Do you have a strong controller or accountant in place?** Yes → a fractional CFO on top. No → hire the controller first, then add fractional.

## The Timeline

- **Years 1–3 (bootstrapped):** an accountant handles tax and books; you plan manually.
- **Years 3–5 (early growth):** accountant plus a fractional CFO (5–10 hours/month) for forecasts, KPIs and guidance.
- **Years 5–8 (fast growth):** a full-time controller plus a fractional CFO (10–20 hours/month).
- **Years 8+ (institutional or plateau):** a full-time CFO if you're going institutional; otherwise stay with controller plus fractional.

Most businesses never need a full-time CFO — and that's okay.

## The Bottom Line

Hiring a full-time CFO feels like progress. It isn't always. A fractional CFO is faster, cheaper, easier to adjust, and delivers value immediately. If you're not yet at eight-figure revenue with complex multi-division operations or institutional investors, you probably need fractional, not full-time.

Not sure which fits? Explore [our fractional CFO services](/services/fractional-cfo), see [client stories](/testimonials-case-studies), or [contact us to discuss](/contact) — no pressure, just clarity.`,
  },
  {
    slug: "profitable-no-cash-why",
    cover: "/images/cash-counting.jpg",
    ogImage: "/images/og-profitable-nocash.png",
    title: "Profitable Business, No Money? Here's Why",
    category: "Cash Flow",
    excerpt:
      "Five reasons profitable businesses run out of cash — receivables, inventory, fixed assets, debt and tax — plus the one number (operating cash flow) that explains it.",
    date: "2026-08-06",
    readTime: "9 min read",
    author: "Carel Gangel",
    body: `Your P&L says you made R200,000 in profit last month. Your bank account says you have R15,000. Which one is lying?

Neither — and that's the problem. It's the number-one financial frustration we hear from owner-managed businesses: revenue is up, profit is up, but every month you're stressed about cash. The reason is simple: **profit and cash are not the same thing.**

## The Core Problem: Why Profit ≠ Cash

Think about your last transaction. You invoice a customer R50,000 on day 1. You've booked R50,000 in revenue, and profit goes up. Cash? It hasn't moved yet.

Profit is a point-in-time calculation — revenue minus expenses, recorded when earned or incurred. Cash is the actual money in your bank account right now. In a growing business, the two diverge, often dramatically.

## The 5 Biggest Reasons Profitable Businesses Have No Cash

### 1. Your receivables are too old

You invoice on 28 January on Net 30 EOM terms, so payment is due 28 February and lands around 1 March — revenue booked on 28 January, cash more than a month later. Invoice R100,000 a week and by month-end you've booked R400,000 in revenue but may hold only R50,000 in cash while last month's invoices slowly pay.

**The fix:** invoice the same day, offer a small early-payment discount, move to retainers or deposits, and call overdue invoices the day they're due.

### 2. You're carrying too much inventory

You pay R100,000 for stock upfront (cash out now), it sits for six weeks, and customers buy it over the following eight. Revenue and profit are booked as it sells — but the cash left fourteen weeks earlier. If you're adding inventory every month as you grow, cash gets trapped fast.

**The fix:** tighten your ordering cadence (order weekly, not monthly), use dropshipping or consignment, and negotiate vendor terms so you pay after receipt rather than upfront.

### 3. You invested in fixed assets

You buy an R80,000 machine: R80,000 leaves today, but the accounts depreciate it over five years (R16,000 a year). The P&L shows a R16,000 expense; your bank shows R80,000 gone. You can grow profitably while haemorrhaging cash on asset purchases — R150,000 of profit alongside R200,000 of capital spend is a R50,000 cash *decline*.

**The fix:** before buying, ask what annual cash benefit the asset will generate; buy only if that exceeds its annual ownership cost, keep three months of operating cash afterward, and finance the purchase to spread the cash impact where it's reasonable.

### 4. You paid down debt

On an R150,000 loan you might pay R5,000 principal plus R2,000 interest a month. The P&L only shows the R2,000 interest; your cash account shows the full R7,000. That R5,000 of principal never touches the P&L — so aggressive debt paydown can show profit while cash falls.

**The fix:** include debt repayment in your cash forecast (not just the P&L), don't prioritise paydown over your cash buffer, and extend loan terms to lower the monthly payment if cash is tight.

### 5. You have a tax bill coming

Year-end profit of R400,000 carries roughly R112,000 of tax — accrued at year-end, but due three to four months later. The P&L reflects profit; your cash doesn't reflect the liability until the bill arrives and R112,000 leaves the account.

**The fix:** set the provision aside monthly. In this example, R112,000 ÷ 12 ≈ R9,333 a month into a tax reserve, so the cash is already segregated when the bill lands.

## The One Number That Fixes Everything

Most P&Ls don't separate profit from cash. **Operating cash flow** does: net profit, plus non-cash charges (depreciation, amortisation), minus increases in working capital, minus capital expenditure, minus debt principal repaid, minus tax paid.

| Item | Amount |
| --- | --- |
| Net profit | R150,000 |
| + Depreciation | R20,000 |
| − AR increase | (R40,000) |
| − Inventory increase | (R30,000) |
| + AP increase | R15,000 |
| − Capex | (R50,000) |
| − Debt repayment | (R20,000) |
| − Tax paid | (R25,000) |
| **Operating cash flow** | **(R5,000)** |

Despite R150,000 in profit, cash *declined* by R5,000 — because of growth investment and debt. Your P&L says you're winning; your cash flow says pause and reassess. That's the difference between looking good on paper and being able to pay your bills.

## How to Use This Information

1. **Calculate operating cash flow, not just profit.** If you use QuickBooks, your accountant can pull this in about 15 minutes — it's a real report, not an estimate.
2. **Review the variances.** Cash declining despite profit? AR growing → renegotiate terms. Inventory growing → tighten ordering. Buying assets → slow down. Tax biting → set aside monthly.
3. **Build a 13-week cash forecast.** Profit doesn't predict cash; timing does. Use the [7-step cash flow framework](/insights/cash-flow-framework) to see which weeks are tight.
4. **Focus on what matters.** Improving AR aging from 45 days to 35 can free up R50,000–R100,000 immediately; trimming inventory 10% another R30,000–R50,000. These moves don't touch the P&L — they transform the cash position.

## The Bottom Line

Your business isn't as profitable as your P&L says, and it's not as cash-strapped as your bank account says. The truth is operating cash flow — start tracking it, forecast it, and use it to make decisions. At month-end, your bills don't care about your P&L; they care about the money in the bank.

**Next steps:** download the full special report, [Profitable But No Money in the Bank](/insights/profitable-but-no-money-in-the-bank), [check your financial health](/resources/financial-health-check), or [book a financial diagnostic call](/contact) and we'll show you exactly where your cash is going.`,
  },
  {
    slug: "could-you-actually-sell-your-business",
    cover: "/images/sell-your-business.png",
    pdf: "/articles/Carron_Could_You_Actually_Sell_Your_Business.pdf",
    title: "Could You Actually Sell Your Business?",
    category: "Strategy",
    excerpt:
      "Our August 2026 special report: a profitable business is not automatically a saleable one. If customers, pricing, knowledge and decisions still sit mainly with the owner, a buyer sees an income stream that leaves when the owner does — what an owner-dependent SME is really worth, and how to close the gap.",
    date: "2026-08-04",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `## Executive summary — a buyer pays for future performance that can transfer

A profitable business is not automatically a saleable business. If the customers, pricing decisions, supplier relationships, operating knowledge and management authority still sit mainly with the owner, a buyer may see an income stream that leaves when the owner does.

The central issue is not how hard the owner has worked, or what the business earned while the owner was present. It is what earnings, relationships and operating capability are likely to remain *after* ownership changes.

- Start with maintainable earnings after a fair cost for replacing the owner's operational roles.
- Test whether customers, staff, suppliers, knowledge and decision authority sit in the business rather than in one person.
- Expect weak transferability to affect price, payment terms, handover requirements — or whether a buyer proceeds at all.
- Prepare early enough to prove management depth, customer continuity and reliable evidence across several reporting periods.

**The report in one sentence:** a buyer pays for future performance that can transfer — not for the owner's past effort, sacrifice or personal presence.

*Important tax boundary: the 2026 CGT change is context only. This report does not give tax advice, calculate tax, assess eligibility or recommend a structure. Obtain transaction-specific advice from a SARS-registered tax practitioner.*

## The tax change is topical — saleability is the real issue

With effect from 1 March 2026, the lifetime exclusion for qualifying small-business capital gains increased from R1.8 million to R2.7 million, and the small-business asset-value ceiling increased from R10 million to R15 million. These are conditional statutory limits — not a tax rebate, and not a promise that a sale will be tax-efficient. The commercial question remains whether the business can be sold on acceptable terms.

The value gap often begins with one calculation: sustainable earnings after the owner's operational roles have been replaced at a fair market cost.

How buyer concern usually appears in the deal:

| Buyer concern | Likely deal effect |
| --- | --- |
| Lower sustainable earnings | The buyer deducts the cost of replacing roles the owner performed. |
| Higher perceived risk | The valuation multiple may be lower, even where reported profit is unchanged. |
| Deferred consideration | More of the price may depend on an earn-out, retention or customer continuity. |
| Longer handover | The owner may be required to remain for longer than intended. |

## 1. The business a buyer can actually buy

A strong income for the owner may still be a weak transferable asset. Many owner-managed businesses work because the owner is the chief salesperson, negotiator, credit controller, problem-solver and final approver. That is efficient while the owner is present — but during a sale, the same concentration becomes a single point of failure.

A buyer is not purchasing the years already worked. The buyer is purchasing the right to future cash flows, together with the people, systems, contracts, assets and working capital required to produce them. If that package is incomplete, the price or deal terms will change.

| Position | What a buyer sees |
| --- | --- |
| Transferable business | Customers, decisions and delivery sit in the organisation. The owner can leave after a planned handover. |
| Transferable with conditions | The business has value, but a buyer needs a longer handover, retention terms or an earn-out. |
| Owner-dependent income | A material part of revenue, knowledge or daily control may leave with the owner. |

**The 90-day absence test.** Assume the owner is unexpectedly unavailable for 90 days. Ask whether the business can still:

- win and renew material customer work without relying on the owner's personal promise;
- set prices, approve exceptions and protect gross margin;
- schedule work, manage quality, resolve staff issues and meet delivery commitments;
- collect debtors, manage suppliers and maintain a credible cash forecast; and
- explain performance to a lender or buyer using records rather than the owner's memory.

If the honest answer is "the owner would handle it by phone", the business has not yet passed the test.

## 2. Start with transferable earnings

Reported profit must be converted into a defensible view of maintainable performance. A buyer will normally reconstruct the economic performance of the business — not to produce the highest possible adjusted profit, but to establish what the business can reasonably earn under new ownership, on normal commercial terms.

| Step | Buyer question |
| --- | --- |
| 1. Reported result | Start with a consistent operating-profit or EBITDA measure that reconciles to the accounts. |
| 2. Genuine adjustments | Add back documented once-off or personal costs; remove non-operating or exceptional income. |
| 3. Commercial normalisation | Restate owner pay, related-party rent and other terms to realistic market levels. |
| 4. Owner replacement | Deduct the fair cost of the sales, management, technical or finance roles the owner performs. |
| 5. Sustainability test | Challenge temporary margin, unusual orders, fragile contracts and unrepeatable cost savings. |

Adjustments that often fail under scrutiny: a once-off cost that appears every year under a different description; personal expenses with no invoices or clear separation from business costs; an owner salary added back without deducting the cost of the person who must replace the owner; a forecast that assumes growth but excludes the working capital, people or capital expenditure needed to deliver it; and a margin improvement supported by one exceptional customer, price increase or supplier concession.

Enterprise value is not the cash the seller receives. Debt, surplus cash, normal working capital, tax, transaction costs and deal-specific adjustments still have to be considered. A buyer's financial review may test monthly bank reconciliations, debtor and creditor ageing, tax filing and payment status, related-party balances, shareholder loans, deferred income and unfulfilled customer prepayments.

## 3. The owner-dependency test

Test evidence, not confidence. Owners often believe the business can function without them because staff handle many daily tasks. A buyer will look further: who holds the authority, relationships, judgement and knowledge when something important goes wrong?

| Area | Evidence question |
| --- | --- |
| Customers | Who can win, price, renew and recover the top customer relationships without the owner? |
| Decisions | Which commercial, credit, purchasing and hiring decisions still require personal approval? |
| Delivery | Can managers plan capacity, resolve quality problems and protect margin independently? |
| Cash | Who owns debtor collection, supplier terms, banking controls and the cash forecast? |
| Knowledge | Are critical processes, pricing logic, supplier alternatives and obligations documented? |
| Leadership | Can the management team explain results, forecasts, risks and action plans to a buyer? |
| Continuity | Has the business completed a real owner-absence test without performance deteriorating? |

**Build an owner role and replacement-cost map.** List every recurring role the owner performs, the hours or decision load involved, the capability required and who could take it over — then estimate a realistic annual replacement cost. Several part-time owner roles may require two full-time hires, or a stronger manager plus specialist support.

Do not confuse delegation with transfer: a task is not transferred while the employee still depends on the owner for the judgement, relationship or final decision behind it. The objective is not to make the owner irrelevant, but to ensure the business can keep performing while the owner moves from daily operator to a governed handover role. The effect on value is transaction-specific; there is no defensible automatic 20–50% valuation uplift.

## 4. Seven risks a buyer will price

Weakness does not always stop a sale; it changes who carries the risk.

| Risk | What the buyer sees |
| --- | --- |
| 1. Owner-held relationships | Customers and suppliers deal with the owner personally; the team has limited independent standing. |
| 2. Customer concentration | The loss of one customer would materially reduce profit, cash flow or debt-service capacity. |
| 3. Thin management | Key roles have no capable deputy, retention plan or documented authority. |
| 4. Unreliable numbers | Late closes, changing classifications and unsupported add-backs weaken confidence in earnings. |
| 5. Low revenue repeatability | Sales depend on once-off projects, informal renewals or an unpredictable pipeline. |
| 6. Transfer restrictions | Contracts, leases, licences, IP or distribution rights may not survive the transaction. |
| 7. Hidden cash claims | Tax, debtors, creditors, leave, capex and normal working capital can reduce the amount ultimately received. |

How risk moves into the transaction: a lower view of maintainable earnings or a lower multiple; an earn-out linked to customer retention, revenue or profit after transfer; a holdback, escrow, warranty or indemnity for identified exposures; a longer owner employment, consulting or restraint period; or a decision not to proceed if the risk cannot be verified or transferred.

There is no universal safe percentage for customer concentration. Treat concentration as a quantified scenario — model the profit, cash and replacement-time effect if a material customer is lost — not a universal 15% trigger or an automatic 20–40% discount. Popular international claims (that 70% of small businesses never sell, or that half of M&A deals fail in due diligence) are not reliable South African SME benchmarks. The defensible lesson is to prove saleability and evidence readiness.

## 5. Worked example — same profit, different value

Business A and Business B each report annual revenue of R12.0 million and EBITDA of R2.2 million, with similar industries and growth prospects. The difference is what a buyer must replace, and what is likely to transfer.

| Measure | Business A: owner-dependent | Business B: management-run |
| --- | --- | --- |
| Reported revenue | R12.0m | R12.0m |
| Reported EBITDA | R2.2m | R2.2m |
| Owner salary included | R0.6m | Owner is not operational |
| Fair cost to replace owner role | R1.2m | Already included in costs |
| Maintainable EBITDA after replacement | R1.6m | R2.2m |
| Largest customer | 32% of revenue; owner-held | 9% of revenue; team-held |
| Recurring or contracted revenue | 25% | 65% |
| Management continuity | Owner approves key decisions | Management runs within clear limits |

At the same purely illustrative multiple of 3.0 times maintainable EBITDA, Business A indicates R4.8 million and Business B R6.6 million — a **R1.8 million gap created by the owner-replacement cost alone**. The buyer may still apply a lower multiple to Business A, or defer part of the price, because of customer concentration and transition risk.

*The 3.0 times multiple is an illustration, not a South African market benchmark or a valuation. The indicated figures are enterprise values before debt, cash, normal working-capital adjustments, tax, transaction costs and deal-specific terms.*

## 6. A 24-month sale-readiness plan

The slowest weaknesses to repair are management depth, customer transfer and reliable evidence.

**First 90 days — establish the real position:** map the owner's roles, decision rights, relationships and annual replacement cost; prepare a three-year monthly earnings bridge with documented adjustments and gross-margin analysis; measure customer concentration, repeat revenue, contract coverage, debtor quality and pipeline reliability; and create a register of tax, CIPC, employment, lease, licence, IP and material-contract matters.

**Months 4 to 12 — transfer capability:** delegate pricing, credit, purchasing and people decisions within written limits; move key customer and supplier relationships from one-to-one owner contact to team-based ownership; document the few processes whose failure would stop sales, delivery, quality or cash collection; strengthen monthly management accounts, the 13-week cash forecast and operational KPIs; and resolve known tax, employment, corporate-record and contract gaps while time is still available.

**Months 13 to 24 — prove transferability:** run a planned owner-absence test and record what failed, slowed or still returned to the owner; require management to lead customer reviews, forecasts, budget decisions and performance explanations; confirm that important contracts, leases, licences and IP are documented and transferable; build a controlled due-diligence file and obtain an independent valuation or range; and decide the preferred exit route, buyer profile, handover period, minimum terms and walk-away conditions.

The same work that improves saleability also reduces key-person risk, strengthens control and gives the owner more freedom before any sale occurs. The 24-month horizon is a practical preparation period, not a guarantee of a sale, a higher multiple or a faster close.

## 7. The 2026 tax context and buyer due diligence

Treat tax as a specialist workstream, not as the reason to sell.

| Measure | Previous | 2026 |
| --- | --- | --- |
| Lifetime small-business capital-gain exclusion | R1.8 million | R2.7 million |
| Market-value ceiling for all business assets | R10 million | R15 million |

The R2.7 million is a lifetime exclusion of *qualifying capital gains* — not R2.7 million of sale proceeds, and not a tax rebate. The R15 million ceiling concerns the market value of business assets, not the owner's equity value; liabilities do not reduce the asset-value test. The relief applies to a natural person and contains detailed requirements relating to qualifying assets or interests, holding period, substantial involvement and the circumstances of disposal. A shareholder sale and a company sale of business assets can produce materially different tax and legal outcomes.

The buyer's evidence pack should be ready across four areas:

- **Financial** — annual and monthly results, normalisation schedule, bank reconciliations, forecasts, aged debtors and creditors, cash, debt, capex, deferred income and customer prepayments.
- **Commercial** — sales and margin by customer, contracts, pipeline, retention, pricing, suppliers and concentration risks.
- **Corporate and tax** — CIPC records, share register, beneficial ownership, related-party balances, shareholder loans, tax compliance, returns, assessments and disputes.
- **People and legal** — organisation, employment terms, restraints, leave, licences, IP, leases, claims and change-of-control clauses.

Weak evidence can delay, reprice or stop a transaction. AI can help index the file and flag gaps; it cannot verify undisclosed liabilities, determine a defensible valuation or replace legal, tax and transaction judgement. *(Tax amounts checked 3 August 2026 against SARS CGT guidance and National Treasury's Budget 2026 Tax Guide. This is not an eligibility checklist.)*

## 8. Conclusion — start while there is still time to change the business

A saleable SME is not one that merely shows a profit. It is one where the profit can be explained, repeated and transferred; where the operating capability sits in a team and systems; and where a buyer can verify the claims without depending on the owner's assurances.

The owner-dependency question can be uncomfortable, because the dependence often reflects years of responsible involvement. The objective is not to diminish that contribution — it is to convert it into processes, relationships, authority and evidence that another owner can rely on.

**Six questions to answer this quarter:**

1. What annual cost would a buyer incur to replace everything I currently do?
2. Which customers, suppliers and employees remain dependent on me personally?
3. Can three years of monthly results support a defensible maintainable-earnings figure?
4. What would fail during a 90-day absence, and who owns the corrective action?
5. Which tax, legal, contract or working-capital matters could reduce the price or delay completion?
6. What must be measurably different 24 months from now?

*This report provides general business and financial education only. It is not tax advice, a tax calculation, an eligibility assessment, transaction structuring, a business valuation, legal advice or a recommendation to sell. A proposed sale should be assessed by a SARS-registered tax practitioner and suitably qualified valuation, legal and transaction advisers.*

**Related reading:** Can Your Business Afford to Grow? · Profitable But No Money in the Bank · The Customer You Cannot Afford to Lose.

The full report includes a one-page Sale-Readiness Decision Record — a management working document for an owner, board or advisory review — available in the downloadable PDF.`,
  },
  {
    slug: "below-the-new-vat-threshold",
    cover: "/images/vat-registration.png",
    pdf: "/articles/Carron_Should_You_Review_Your_VAT_Registration.pdf",
    title: "Below the New VAT Threshold? Do Not Change Anything Yet",
    category: "Tax",
    excerpt:
      "Our July 2026 special report: from 1 April 2026 the compulsory VAT threshold rose to R2.3 million. Being below it is a review trigger, not an instruction to deregister — six commercial questions to work through with a registered tax practitioner first.",
    date: "2026-07-26",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `## Executive summary

The administrative saving is rarely the whole decision. From 1 April 2026, the compulsory threshold is R2.3 million and the voluntary threshold is R120,000, subject to the applicable requirements. A business below the new compulsory threshold may have a choice. The value of that choice depends on customers, pricing, VAT-bearing costs, cash consequences and how likely the business is to grow back into compulsory registration.

The central decision question is not "how much will we save on VAT administration?" It is "what will change for customers, true margin, cash and the growth path — and what has the practitioner confirmed?"

- Being below R2.3 million is a review trigger, not an instruction to deregister.
- B2B customers that recover VAT may receive little or no price benefit from a change.
- Consumer-facing businesses may have a stronger pricing case, but only after input costs are included.
- Stock, equipment, property and unresolved prior-period items can create a cash question that requires professional calculation.
- Growth, contracts and seasonality should be tested over at least the next 18 to 24 months before management decides.

Management owns the customer, pricing, margin, cash and growth analysis. A SARS-registered tax practitioner confirms eligibility, historic compliance, tax treatment, process and timing. SARS determines the cancellation and effective date. A change in threshold creates a choice — it does not create an automatic answer.

## Read the threshold in the correct context

The new threshold changes when compulsory registration may apply. It does not cancel an existing registration, settle historic compliance, determine the treatment of assets, or authorise a business to alter invoices and returns.

- **Taxable supplies** — the supplies included when the registration requirements are tested. Your practitioner should confirm what belongs in the calculation.
- **Compulsory threshold** — SARS states R2.3 million in any consecutive 12-month period from 1 April 2026.
- **Voluntary registration** — from R120,000, remains possible below the compulsory threshold, subject to the applicable requirements.
- **Cancellation** — an application and formal SARS process. It is not automatic when turnover falls below the threshold.
- **Input VAT exposure** — VAT currently recovered on operating and capital purchases that may become part of business cost if registration ends.
- **Final tax period** — the period and adjustments SARS and the practitioner must confirm before the registration is closed.

The safe review sequence: **measure** turnover, customers, costs and assets; **model** price, margin, cash and growth; **confirm** the tax position with the practitioner; **implement** only after the formal outcome.

This report does not determine eligibility, classify transactions or assets, calculate a VAT liability, complete a return or represent a taxpayer. AI may organise records and flag missing information, but it should not reach the tax conclusion or replace a registered practitioner.

## Build the fact base before you form an opinion

A year-end turnover figure is not enough. Prepare: monthly taxable-supply information for at least the current and prior 12 months; the revenue outlook (signed contracts, recurring revenue, price increases, pipeline, known losses); the customer mix (VAT-registered businesses, final consumers, exempt bodies, tenders, onboarding rules); and a cost-and-asset map (VAT-bearing operating costs, stock, equipment, property and other material items).

Signals that a quick decision would be weak: turnover close to R2.3 million (a single contract, price change or strong month may move the position); seasonal or project-based revenue (a low year-end number may hide a higher consecutive 12-month period); an asset- or stock-heavy business (the possible final-period cash effect may be material and fact-specific); and management focused only on compliance cost (customer pricing, lost input VAT and future growth may matter more than filing effort). The higher threshold does not cure an earlier registration, return, invoice, payment or supporting-document problem — include prior-period questions in the professional review.

### The six commercial questions

1. **Customer** — who recovers VAT, who pays the full VAT-inclusive price, and which customers or tenders expect a VAT vendor?
2. **Price** — would prices remain unchanged, reduce or be renegotiated? Do not assume that removing VAT automatically creates extra margin.
3. **Margin** — how much VAT-bearing expenditure sits in rent, stock, equipment, software, professional fees and other costs that may become unrecoverable?
4. **Cash** — what stock, assets, property, rights or prior-period matters must the practitioner quantify before management can fund the transition?
5. **Growth** — could signed work, pipeline, price increases or seasonality move the business back toward compulsory registration?
6. **Control** — what must change in quotations, contracts, invoices, systems, customer communication, cash forecasts and monthly monitoring?

### Two illustrative profiles

**Profile A — B2B installer with stock and a strong pipeline.** Most customers are VAT-registered and may focus on net cost rather than a lower gross price. Stock, subcontractors, vehicles and equipment carry VAT, so lost input VAT may materially weaken margin. A signed project could move turnover back above the threshold. Commercial reading: the apparent administrative saving may be small relative to margin, tender, working-capital and growth effects.

**Profile B — consumer-facing service business with limited inputs.** Most customers are final consumers, so the VAT-inclusive price is directly visible and may affect demand. VAT-bearing inputs are modest. Revenue is stable and comfortably below the threshold. Commercial reading: the pricing case may be stronger, but management should still test costs, cash, growth and implementation before acting.

## Potential VAT and cash consequences

Cancellation can bring retained enterprise stock, assets, property and rights into the final VAT calculation. Certain goods or rights retained when a vendor deregisters are deemed supplied immediately before the person ceases to be a vendor, subject to exceptions — the actual treatment, value and timing depend on the records and current law.

Management should prepare a fixed-asset register, stock listing, purchase documents, property and lease information, major creditors and debtors, and details of mixed, private or exempt use. The practitioner should determine what belongs in the final period, valuation and adjustments, restrictions or deductions, filing treatment and payment timing.

Keep a provisional reserve in the cash forecast until the practitioner has completed a documented calculation. Do not use a generic online calculator or a percentage of assets as the decision amount.

## Decision pack and formal control

Prepare monthly turnover and source reports, customer segmentation and pricing options, a VAT-bearing cost map, stock/asset/property/contract records, and an 18- to 24-month forecast with a cash reserve. The practitioner confirms eligibility, historic compliance, final-period and asset treatment, required documents, and the effective date and continuing obligations. Management then compares the credible commercial scenarios, inserts confirmed cash effects, selects the funding and transition plan, and records the decision.

**Non-negotiable control:** continue the current VAT treatment until SARS has confirmed the cancellation, effective date and final tax period. Do not alter quotations, invoices, returns or customer documents merely because management has decided to investigate.

Three credible management outcomes: **remain registered** (the commercial value of registration or growth path outweighs the administrative saving); **apply after advice** (a durable commercial case, confirmed tax treatment, adequate cash and a controlled implementation plan); or **defer and review** (the position is too close to the threshold, the cash effect is unclear, growth is likely, or records need correction).

## Closing perspective

The strongest commercial case is usually found where final consumers carry the VAT-inclusive price, VAT-bearing inputs are modest, the transition cash is manageable and turnover is likely to remain below the threshold. Neither pattern is a tax conclusion — it is the management case to place before a registered practitioner.

Do not start with the cost of VAT returns. Start with customers, true margin, cash and the growth horizon. Then obtain a written professional conclusion and wait for the formal SARS outcome before changing anything.

*This report provides general business and financial education. It does not constitute tax or legal advice and does not consider the circumstances of a particular taxpayer. Obtain advice from a SARS-registered tax practitioner before applying or acting.*

**Related reading:** Can Your Business Afford to Grow? · The 13-Week Cash Flow Forecast Every SME Should Run.

The full VAT Registration Review Record (a one-page working document for the decision) remains available in the downloadable PDF.`,
  },
  {
    slug: "can-your-business-afford-to-grow",
    cover: "/images/afford-to-grow.png",
    pdf: "/articles/Carron_Can_Your_Business_Afford_to_Grow.pdf",
    title: "Can Your Business Afford to Grow?",
    category: "Growth",
    excerpt:
      "Our July 2026 special report: a financial decision framework for growth. A big order, a hire, new equipment or a second site can be compelling — the real question is whether the business can carry the cash, margin, capacity and timing it demands.",
    date: "2026-07-20",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `## Executive view

A large order, an additional employee, new equipment or a second site can be commercially compelling. The financial issue is not whether growth is desirable in principle — it is whether the business can carry the cash, margin, capacity and timing consequences of the commitment.

The financial sequence: **commit** (commercial terms agreed) → **fund** (cash and capacity committed) → **deliver** (costs and operating effort incurred) → **collect** (customer cash received).

A growth decision should be evaluated on four linked dimensions: commercial value, cash timing, capacity and risk, and funding structure. Establish the **cash gap** (maximum cumulative cash required before meaningful collections), the **cash low point** (lowest forecast bank balance after the commitment is included), and the **cash buffer** (room remaining if collections are later or costs exceed plan).

The review should establish whether customer terms, supplier terms and VAT timing create a material cash gap; whether margin remains adequate after incremental delivery costs, discounts, finance charges and rework; whether recurring commitments and capacity remain affordable if revenue arrives late; and whether the funding source, duration and repayment pattern match the underlying cash cycle. A forecast does not make the decision for management — it makes the financial consequences visible early enough for the commercial terms, timing or structure to be changed.

**South African context, July 2026:** SARB held the policy rate at 7.0% and Absa listed prime at 10.5%. At the end of December 2025, national and provincial departments reported 90,856 invoices older than 30 days, totalling R15.5 billion. Growth plans should therefore price both the cost of finance and the risk of late receipts. (Sources: SARB MPC statement, 23 July 2026; Absa financial indices; National Treasury Q3 2025/26 supplier-payment report.)

## Where the cash gap begins

Revenue, profit and cash do not necessarily arise at the same point. The gap matters most where the business funds stock, labour, deposits, VAT or fixed costs before the customer pays. Commit (order, hire or asset approved) → spend (inputs and setup paid) → deliver (work completed, invoice raised) → collect (customer receipt reaches bank).

Customer terms set the funding need: the interval between paying suppliers and labour and collecting from the customer. The cash gap is often larger than the expected profit for the period before final collection. Recurring commitments — a salary, lease or subscription — start immediately, while matching revenue may arrive late or not materialise as planned, reducing the room available to absorb late receipts, weaker sales or a cost overrun.

**Worked illustration — a profitable order with a cash requirement:** sale value excluding VAT R600,000; deposit received at order R180,000; materials, labour and delivery paid before final collection (R405,000); cash movement before final collection (R225,000); expected gross contribution once the final collection arrives R195,000. The order is profitable, but it requires R225,000 before final collection — before overheads, finance costs and VAT timing. The decision is whether the forecast can carry that low point without breaching the minimum cash reserve.

## The six financial tests

Use these before a major order, an additional hire, a new product line, equipment, a stock build or a new site. The purpose is not to eliminate risk — it is to size it before the commitment becomes difficult to reverse.

1. **True margin** — calculate contribution from the specific opportunity, including materials, freight, overtime, commission, discounts, finance, warranty and rework. Historic margin is a reference, not a substitute.
2. **Cash conversion cycle** — map deposits, supplier terms, payroll, tax dates, milestone billings and final collection by week, using cash dates, not invoice dates.
3. **Fixed-cost burden** — separate once-off implementation costs from recurring commitments. The established business carries recurring costs when revenue is late, lower or absent.
4. **Capacity and control** — test people, production, systems, quality control and management attention. Growth that weakens delivery to existing customers can destroy margin and cash elsewhere.
5. **Combined downside case** — test later collection, lower volume and higher direct cost together. The combined case often exposes a funding gap that each single sensitivity misses.
6. **Funding match** — match purpose, duration and repayment pattern to the underlying cash cycle. A short collection gap and a long-life asset require different funding structures.

## Managing uncertainty

Growth plans rarely fail because every original assumption was wrong. They become difficult when collection, cost, volume or capacity move together. A minimum downside case should combine a 30-day collection delay, a 10% cost increase and 20% lower early volume, and be tested together, not just individually — the combined case often exposes a funding gap that no single sensitivity shows.

Watch for: sales rising while the bank balance remains flat (the sales and cash forecasts describing different realities); the next customer receipt being required to meet payroll or core suppliers (the working-capital requirement is structural, not incidental); a profitable order relying on long payment terms (the customer may be shifting its funding burden onto the supplier); new commitments not appearing in the forecast until after approval; and management being unable to identify the maximum cash gap or the week it occurs.

The response is commercial: renegotiate a deposit, use milestone billing, stage delivery, phase the commitment, fund it properly, or decline. Agree the trigger before the cash buffer is exhausted.

## Decision materials

A compact set of current materials connects the opportunity to cash, margin, capacity and funding:

- **13-week forecast** — the base case into which the opportunity must fit.
- **Opportunity cash map** — the timing of deposits, stock, labour, delivery, invoicing and collections attributable to the decision.
- **Margin model** — the incremental economics of the opportunity after direct delivery costs and concessions.
- **Downside case** — the effect of slower collections, lower volume or higher direct cost on cash and funding.
- **Funding note** — amount, purpose, duration, responsible owner and contingency for any funding requirement.
- **Decision record** — the commercial rationale, cash low point, capacity conditions, funding route, decision owner and review date.

Match the funding to the use: customer deposits and milestone billings can fund order-specific work; working-capital facilities or invoice finance may suit short collection gaps; asset or term finance better matches long-life equipment; owner capital or equity is more appropriate where timing and repayment are uncertain. The cheapest facility is not the right facility if its repayment profile creates the next cash crisis.

## The management routine

**Before the commitment:** establish the minimum cash reserve, map inflows and outflows by expected payment date, confirm the commercial terms, funding route and decision owner.

**In the weekly review:** replace estimates with actual receipts and payments, reconfirm material collections and supplier commitments, refresh the cash low point and downside case.

**When assumptions move:** identify the assumption that moved and quantify the effect, consider commercial, timing or funding alternatives, record the decision, owner and next review date.

At 30, 60 and 90 days post-commitment, compare actual cash usage, contribution, collection timing and capacity impact with the approved case. Escalate when the cash buffer, margin or service condition is breached — growth should remain subject to review after approval; signing the commitment does not end the decision process.

## Conclusion

Growth may be worth accepting, renegotiating, staging, deferring or declining. None of those outcomes is a failure of ambition. The financially sound outcome is the one the business can carry without weakening cash, service or the established operation. When management can see the maximum cash gap, the week it occurs, the downside position and the funding requirement, the commercial decision becomes more deliberate and more negotiable.

**Related reading:** Profitable But No Money in the Bank · The 13-Week Cash Flow Forecast Every SME Should Run.

**Key external sources:** South African Reserve Bank, Statement of the Monetary Policy Committee, 23 July 2026; Absa, Financial indices and rates; National Treasury, Third Quarter Report on payment of supplier invoices, 2025/26; SARS, VAT 404 Guide for Vendors; Neil C. Churchill and John Mullins, "How Fast Can Your Company Afford to Grow?", Harvard Business Review, May 2001.

The full Growth Decision Record (a one-page working document) remains available in the downloadable PDF.`,
  },
  {
    slug: "the-customer-you-cannot-afford-to-lose",
    cover: "/images/customer-risk.jpg",
    pdf: "/articles/Carron_The_Customer_You_Cannot_Afford_to_Lose.pdf",
    title: "The Customer You Cannot Afford to Lose",
    category: "Strategy",
    excerpt:
      "Our July 2026 special report: when one big customer both carries and endangers your business — a customer-concentration and cash-flow framework for weighing margin, timing and exposure before you commit.",
    date: "2026-07-14",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `## Executive view

One big customer can carry your business and quietly run it at the same time. Your biggest customer can look like the strongest part of the business and be its biggest single risk. The danger is rarely one unpaid bill — it is that too much of your sales, profit, capacity and cash now sit with one relationship, so a late payment, a squeeze on price, or losing the contract hurts far more than the order book suggests.

The dependence bites two ways: the customer is too big to lose, so you put up with longer terms, discounts and arguments you would never accept from anyone else; and they are too big to carry, so one late payment drags your whole bank balance to its lowest point. In a country where most SMEs are already paid late, a big customer does not just add risk in line with its size — it piles it all in one place.

The decision: serve, renegotiate, reprice, cap, pause or turn down the exposure. The review should establish whether the terms you agreed match how the customer actually pays; whether the customer is still worth it once you count finance costs, admin time, credit notes, rework and discounts; whether leaning on one customer or group uses up capacity you need elsewhere; and whether you've made a real decision about the payment risk — charged for it, capped it, insured it, secured it, or knowingly accepted it — rather than just carrying it by default.

One overdue invoice is a chasing problem. A customer too big to lose and too slow to pay is a dependence problem, and it belongs in your management and cash review, not just on the overdue list at month-end.

## Concentration: the financial language

Do not guess how dependent you are — work it out. For each customer, look at three things: what slice of your sales they are, what slice of your profit they are once you've covered the cost of serving them, and how much they owe you right now. If one customer is more than about a tenth of your sales, keep an eye on them. If they are a fifth or more — or your five biggest together are more than half the business — that is a built-in risk to check every month, not carry around in your head.

- **Stated terms** — the payment terms on the invoice or contract.
- **Actual days to pay** — how many days they really take, from invoice to money in the bank, going on past history.
- **Customer exposure** — everything they owe you: current, overdue, plus committed but not yet invoiced work.
- **Funding cost** — what it costs you to carry that money, through the overdraft, your suppliers, paying late, or your own cash.
- **Dispute drag** — invoices held up by paperwork, price arguments, missing delivery proof, credit notes or sign-off chains.
- **Concentration risk** — leaning on one customer, group or sector for a big share of your sales or profit.

It comes down to timing: when your cash goes out, when the customer's cash comes back, and how much uncertainty you can carry while their balance is still owing.

## Where concentration hits cash

Your overdue list shows what is unpaid. It does not show how much of the whole business is riding on one account, what you have already spent to serve them, or how often that customer misses the date it promised while everyone waits.

Size shifts the power too. A customer that knows it is central can dictate terms, stretch payment from 30 days out towards the 90 to 150 days common with big buyers, and use a small dispute as an excuse to hold the whole balance. You fund that gap from your own overdraft and your suppliers, so the cost of the relationship hits your bank balance long before it shows up as a bad debt.

You can still be making a profit on paper while the cash in the bank gets tight. A big customer can crowd out smaller ones that pay faster, spread your risk and tie up less cash. Supplier credit can hide the problem until a key supplier shortens your terms. The cash you need to fund one customer can be more than a month's profit, even when they eventually pay in full.

## Worked illustration — a profitable customer that is also half the business

Figures below are illustrative and exclude VAT to keep it simple. Say total sales are about R1,500,000 a month, so this one customer is roughly half of everything sold.

| Item | Example amount / timing |
|---|---|
| Monthly sales to one customer | R750,000 |
| Direct cost at 76% | (R570,000) |
| Profit before finance and rework costs | R180,000 |
| When you pay your suppliers | 30 days |
| Terms the customer agreed | 60 days |
| How they actually pay | 85 days |
| Roughly what they owe you at 85 days | R2,125,000 |
| Less what your suppliers fund for 30 days | (R570,000) |
| Roughly the cash you have to find | R1,555,000 |

One customer that is half the business can tie up more than eight months of the profit they bring in, before overheads, VAT, tax dates and the rest of the business are even considered. Another 30 days' delay adds roughly R750,000 more tied up in a single customer — a decision about dependence and cash, not just a chat about collections.

Split the same sales across five customers on the same terms and the dip is shallower: one late payment will not sink you, and losing any single client is a knock rather than a threat to the whole business.

## The concentration review that matters

A good review ties the who-owes-what list to your profit, your operations and your cash forecast. Do it every month: rank customers by their share of sales and profit, show how much your top one and top five owe you and the worst case for cash, and set a signed-off limit that supply is not allowed to quietly blow through.

| Review area | Question to answer |
|---|---|
| Actual days to pay | Does the customer normally pay as agreed, or only after repeated follow-up? |
| Open exposure by week | What amount is at risk before the next payroll, VAT, supplier or funding date? |
| Margin by customer | Is the customer still worth it once delivery, rework, discounts and admin time are counted? |
| Dispute pattern | Are delays down to missing order numbers, delivery proof, price arguments or sign-offs? |
| Credit limit discipline | Are you still supplying because the customer matters, or because nobody actually stopped it? |
| Concentration | How much of your sales, profit and money owed sits with one customer or group? |

## Actions before the problem becomes normal

Match the action to the size of the customer. For a big one: put a price on the terms and cap what they can owe you, deliver in stages so you're never carrying the full cost at once, and treat winning other customers as the real fix.

- **Deposit or milestone billing** — get cash in before you've paid to deliver the whole job.
- **Credit limits** — cap what a customer can owe you, based on how they actually pay, not just how big they are.
- **Pricing for terms** — long terms, extra admin and constant delays shouldn't be priced the same as a cash sale.
- **Dispute prevention** — sort out the order number, delivery proof and sign-offs before you invoice, not after.
- **Supply discipline** — when a customer goes over their limit, stop treating "keep supplying" as automatic.
- **Customer mix** — keep room for other customers and work to depend less on any single one.

## AI-assisted concentration review

AI can prepare the questions. It cannot make the credit decision. It helps most when your books are already reasonable — invoice dates, customer names, due dates, payments, credit notes, delivery records. Used well, it turns messy records into a clear picture in minutes: how much of your sales and profit each customer is, who is slowly taking longer to pay, and how low your cash would go if your biggest customer slips or leaves. Keep the data to a minimum, mask anything sensitive, and check everything against your own records — the answer is a starting point for the conversation, never a substitute for it.

## The management routine

Make how much rides on one customer a fixed item in the weekly review, with a name against it. Before the review, update what's come in, promised dates, disputes, credit limits and the 13-week cash forecast. In the review, focus on the biggest exposures, missed promises, how low the cash goes, and what to do before the next payroll or supplier run. After the review, write down who owns it, the action, the deadline, and any change to supply terms or limits.

The five questions: what cash is due this week (name the customers and amounts, not just the total)? Which promises were missed? Which invoices are disputed, and why? What is the cash low point if receipts move? What decision is needed — keep supplying, limit, renegotiate, escalate, pause or stop?

## Conclusion

A good customer is not just one that orders often and pays in the end — when it's a big customer, it's one whose profit, payment habits and share of your business still add up for you. The customer you cannot afford to lose deserves the most careful decision, not the least attention. Work out what they really bring in, cap what they can tie up, and keep building the rest of your customer base, so the business is carried by its customers, not held hostage by one of them.

**Related reading:** Profitable But No Money in the Bank · The 13-Week Cash Flow Forecast Every SME Should Run · Can Your Business Afford to Grow? · Revenue Is Vanity, Margin Is Sanity · Management Accounts That Actually Earn Their Keep.

The full Customer Concentration Risk Record (a one-page working document) remains available in the downloadable PDF.`,
  },
  {
    slug: "profitable-but-no-money-in-the-bank",
    cover: "/images/cash-counting.jpg",
    pdf: "/articles/Carron_Profitable_But_No_Cash.pdf",
    title: "Profitable But No Money in the Bank",
    category: "Cash Flow",
    excerpt:
      "Our 2026 special report on the gap between profit and cash: seven reasons profitable South African SMEs still run out of money — and the weekly habit that catches it early.",
    date: "2026-07-05",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `## Read: profit vs cash, in plain English

Six terms, defined once, used throughout this report. Profit and cash measure different things: profit explains performance over a period; cash explains what is available to pay today.

**P&L (profit and loss statement)** — shows income less expenses for a period. It is not a bank statement.
**Profit** — what remains after income less expenses for the period, using the accounting basis adopted by the business.
**Cash** — money actually available to meet payments when they fall due.
**Debtors** — customers who owe the business money.
**Working capital** — cash tied up in debtors, stock, work-in-progress and other operating balances.
**Cash-flow forecast** — a time-based estimate of expected receipts and known payments.

Profit can be earned before the customer pays. Cash can leave the bank without passing through the profit line. This report is about the gap between those two statements.

**Simplified management bridge — not a formal cash-flow statement:** reported profit, less cash tied up in unpaid invoices, less additional stock and unfinished jobs, less tax paid, less loan capital repayments, less equipment purchases, less owner withdrawals, equals movement in the bank account.

## Where the cash actually goes

Profit is an accounting event. Cash is a banking event. Revenue recognition and cash collection do not have to happen on the same date — an income statement can include a sale that has not yet produced a receipt in the bank. Sale made, invoice sent, wait for receipt, cash received.

**Reason 1 — debtors: profit recorded before cash arrives.** Once goods or services have been delivered, the customer may still take time to pay. The invoice can be included in revenue while the business must continue paying payroll, rent and suppliers. The practical control is a weekly debtor-age report and a credible expected receipt date for each material invoice.

**Reason 2 — VAT, PAYE and provisional tax falling due.** Tax cash dates are real commitments. PAYE is payable within seven days after the end of the month in which the tax was deducted; provisional-tax dates depend on the business year of assessment. VAT timing depends on the vendor tax period. Keep these dates in the cash forecast and reserve for known statutory liabilities.

**Worked illustration, not a benchmark:** a business invoices a customer R100,000. It has already paid R70,000 in labour, rent and suppliers to perform the work. Until the R100,000 is collected, the business needs to fund that R70,000 cash-timing gap, even though profit may have been recorded.

IFRS 15 explains why revenue can be recognised when goods or services are transferred, while cash may be received later. The specific timing depends on the contract, invoice terms and collection behaviour.

## Five more ways cash gets tied up

The remaining five causes are structural — they arise from how the business carries stock, grows, borrows and spends. They are normal mechanics of business and become dangerous only when they are not visible in cash terms.

**Reason 3 — stock and WIP.** Stock and unfinished jobs represent cash already spent. Review slow-moving stock, age work-in-progress by job, and use deposits or milestone billing where the cash risk is material. Owner test: is stock or WIP growing faster than sales?

**Reason 4 — growth and working capital.** Every additional order can require supplier and staffing cash before the customer receipt arrives. Model the dates of material costs and customer payments before committing. Owner test: did the best sales month create the tightest cash month?

**Reason 5 — loan capital repayments.** Only interest is normally reported as a finance cost. The capital part of a loan instalment still leaves the bank. Forecast the full instalment. Owner test: is the bank instalment bigger than the interest in the P&L?

**Reason 6 — equipment and withdrawals.** Equipment is paid for when bought but recognised in profit over time through depreciation. Depending on the legal structure, drawings, dividends or owner-loan repayments can also leave cash without being operating costs. Owner test: is every planned withdrawal dated in the forecast?

**Reason 7 — low margin or poor pricing concealed by turnover growth.** Rising turnover does not automatically release cash. If gross margin is too thin, each additional sale can consume more working capital than it releases. Review margin by customer, product or job and test whether deposits, payment terms or pricing need to change before pursuing further volume.

**Cash timing test, before you accept a large order (illustration only):** a R1m order may require R300,000 of supplier deposits and R250,000 of labour or delivery cost before the first customer receipt. The R550,000 gap must be funded first. Ask: when does cash arrive, and can we carry the gap?

## The warning signs, reason by reason

| Warning sign | Practical response |
|---|---|
| Debtor days are rising, or the 60-, 90- or 120-day columns are growing | Review the age report weekly. Contact material overdue accounts before month-end. |
| A VAT, PAYE or provisional payment falls in the same week as payroll | Enter the expected statutory debit early and fund the reserve progressively. |
| Stock levels or incomplete jobs are growing faster than revenue | Track stock turn and aged WIP. Stop buying slow-moving items and close completed work promptly. |
| A new order needs supplier or staffing cash before the customer will pay | Model dates before accepting it. Seek a deposit, milestone billing or supplier timing that matches the risk. |
| The full bank instalment is materially larger than the interest in the P&L | Forecast the full instalment, including capital. Check whether the facility term suits the asset or cash cycle. |
| A vehicle, machine, dividend, drawing or withdrawal is planned but absent from the forecast | Do not commit until the post-payment balance remains above the agreed minimum cash level. |
| Sales are rising while gross margin is falling, or cash is tighter despite revenue growth | Review pricing, discounting, customer terms and supplier terms before pursuing more volume. |

Decision rule: a forecast is not there to produce a perfect number. It is there to expose a likely low point early enough to collect, delay, negotiate, reprice or arrange funding before the bank balance becomes the crisis.

## Tools that support the discipline

The forecast and debtor-ageing report form the minimum cash-control stack:

- **13-week cash-flow forecast** — shows the lowest projected cash point and the receipts or payments driving it. Finance and owner, every Monday.
- **Debtor age profile** — prioritises who must be contacted before the tightest cash week arrives. Collections lead, weekly.
- **SARS reserve and payment calendar** — separates tax cash from operating cash and makes statutory dates visible. Finance, weekly update.
- **Loan, capex and withdrawals schedule** — captures full bank outflows that may not sit in the profit report. Owner and finance, when committed.
- **Stock/WIP and gross-margin review** — tests whether stock, growth or pricing is consuming more cash than it releases. Operational lead, monthly.

Start with the 13-week forecast and one debtor-age report. Add the next tool only after the first two are updated every week without fail.

## Building the 13-week habit

A forecast does not create cash. It creates time — time to collect, negotiate or arrange funding before the bank balance becomes the problem.

**Week 1 — build the baseline.** List every confirmed cash inflow by its expected receipt date, not its invoice date. Enter every known outflow: salaries, suppliers, rent, loan instalments, VAT, PAYE and owner commitments. Net receipts and payments by week, then identify the lowest projected balance.

**Every Monday — update, don't rebuild.** Replace last week's forecast column with actuals and roll the 13-week window forward. Confirm the next two to three weeks of material receipts directly with customers. Agree one action, owner and deadline before the week begins.

**When a gap appears — act on what it shows.** Collect: chase the debtors driving the tightest week before that week arrives. Delay or negotiate: move discretionary spend, request deposits or renegotiate supplier timing. Reprice or fund: correct poor terms, or approach the bank early with the forecast.

A forecast built once and forgotten is a document. Updated every week, it becomes a management habit: a known low point, a named action and less surprise.

## Conclusion

None of the seven reasons a business can run out of cash while profitable is automatically a sign of poor management. Debtors can pay later than expected. Tax dates do not move. Growth needs funding before it releases cash. Loan capital, equipment and owner withdrawals can affect cash differently from profit.

What separates businesses that get caught out from those that do not is visibility. A rolling 13-week cash-flow forecast turns multiple risks into one visible number: the lowest projected cash point and the receipts or commitments that cause it.

Profit tells you the business worked last quarter. Cash tells you whether it can meet commitments this quarter.

**What changes on Monday morning:** open the bank balance, debtor-age report and current 13-week forecast together. Confirm the receipts that will decide the tightest two weeks. Enter every known payment, including tax, loan capital, equipment and withdrawals. Agree one action: collect, delay, negotiate, reprice or arrange funding. Record the owner of that action and the date it must be completed.

**When to escalate:** early, when a projected balance falls below the business's agreed minimum safe level, when a debtor receipt becomes doubtful, or when a new order needs funding before it can generate cash. A bank or funder conversation is usually stronger when it happens with a forecast in hand, before the gap becomes an emergency.

*This report avoids unverified payment statistics. Its factual tax and accounting references were checked against: IFRS Foundation, IFRS 15 Revenue from Contracts with Customers; SARS, Pay As You Earn; SARS, Provisional Tax; and SARS, Value-Added Tax (all accessed July 2026). Current tax dates, categories and treatment must be confirmed with SARS or a qualified adviser before action is taken.*

## Quick-reference checklist

Tick these against your own business. Any one "yes" is a cash risk worth tracking in the 13-week forecast.

- **Debtors** — are customers taking longer than your stated terms to pay?
- **SARS deadlines** — has a VAT, PAYE or provisional-tax payment ever clashed with payroll?
- **Stock/WIP** — is money tied up in stock or unfinished jobs not yet invoiced?
- **Growth** — did your busiest month coincide with your tightest cash month?
- **Loan repayments** — are loan capital repayments leaving the bank with no matching P&L expense?
- **Equipment and withdrawals** — has a purchase or withdrawal reduced cash without warning?
- **Margin** — is turnover rising while the amount left after direct costs is shrinking?

Cash-discipline score: 0–2 ticks, establish the weekly forecast. 3–4 ticks, cash pressure is active, assign actions now. 5 or more ticks, treat cash management as an immediate management priority.

**What I do every Monday:** check the actual bank balance and replace the prior week in the forecast with actuals. Confirm material customer receipts expected in the next two weeks. Enter every known payment: salaries, suppliers, loan instalments, SARS and owner commitments. Identify the lowest projected bank balance in the 13-week period. Decide and assign one action before the week starts.`,
  },
  {
    slug: "5-signs-your-sme-is-ready-to-hire",
    cover: "/images/hiring-team.jpg",
    pdf: "/articles/Carron_Hiring_Article_2026_SME.pdf",
    pdfPrimary: true,
    title: "5 Signs Your SME Is Ready to Hire — And How to Do It Right",
    category: "Hiring",
    excerpt:
      "Our 2026 special report: the five concrete signs an SME is ready to hire, what South African labour law requires from day one, and how to get your first or next hire right.",
    date: "2026-06-30",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `For most South African SME owners, the decision to hire is one of the most consequential calls they'll make. Hire too early — before revenue and workflow justify it — and payroll becomes the line item that sinks an otherwise healthy business. Hire too late, and the owner becomes the bottleneck: turning away work, missing growth windows, and burning out under a workload no single person should carry alone.

This special report removes the guesswork. It identifies five concrete, observable signs that a business has crossed from "we're managing" to "we need another set of hands" — then walks through exactly what South African labour law requires the moment that first employee starts.

The context matters too. With unemployment at 32.7% and SMEs employing roughly 60% of the country's workforce, getting hiring right is both a real responsibility and a genuine competitive advantage.

## What's inside

- Why hiring decisions matter more than ever
- The five signs you're ready — observable, not gut-feel
- What the law requires from day one: UIF, PAYE, contracts, and the R30.23/hour minimum wage from 1 March 2026
- A simple, structured hiring process that improves your odds
- The common hiring mistakes SMEs make — and how to avoid them

Open the full report in your browser, or download the PDF to read at your leisure.`,
  },
  {
    slug: "ai-is-no-longer-optional",
    cover: "/images/ai-report.jpg",
    pdf: "/articles/Carron_AI_Article_2026.pdf",
    pdfPrimary: true,
    title: "AI Is No Longer Optional — For South African SMEs",
    category: "Strategy",
    excerpt:
      "Our 2026 special report: a practical, evidence-based look at AI adoption for South African SMEs — the tools that earn their keep, the barriers, and a 90-day starter roadmap.",
    date: "2026-06-15",
    readTime: "PDF report",
    author: "Carel Gangel",
    body: `South Africa's small and medium enterprises are at a genuine inflection point. After a decade defined by load-shedding, constrained credit, and rising costs, the next challenge is quieter but just as consequential: keeping pace with the AI revolution reshaping how competitive businesses operate.

This special report is written for owners who know the conversation is happening but haven't yet found a clear, practical way into it. It sets out where South African SMEs stand in the global AI landscape, why the window to act is narrowing, which tools offer genuine value at accessible price points, and exactly how to begin.

The central finding is straightforward: businesses integrating AI today are outpacing those that aren't — on speed, output quality, customer responsiveness, and profitability. The gap compounds. A business that begins now will be materially more capable by year-end than a competitor who waits.

## What's inside

- The state of AI in South Africa, with verified 2026 indicators
- Why AI is no longer optional — and what the gap is already costing
- Practical AI tools across every part of your business
- The real barriers, and how to break them
- A 90-day starter roadmap you can act on this quarter

Open the full report in your browser, or download the PDF to read at your leisure.`,
  },
  {
    slug: "the-13-week-cash-flow-forecast",
    cover: "/images/insights-desk.jpg",
    title: "The 13-Week Cash Flow Forecast Every SME Should Run",
    category: "Cash Flow",
    excerpt:
      "Profit doesn't pay salaries — cash does. Here's the single most useful report a growing business can keep, and how to build it.",
    date: "2026-06-02",
    readTime: "6 min read",
    author: "Carel Gangel",
    body: `Most owner-managed businesses run on a bank balance and a gut feel. That works until it doesn't — usually the week a big VAT payment, a payroll run, and a slow-paying debtor all land at once.

The fix isn't a fancier accounting package. It's a rolling 13-week cash flow forecast: a simple, weekly view of the cash you expect in and the cash you expect out, thirteen weeks ahead.

## Why 13 weeks

Thirteen weeks is one quarter. It's long enough to see a crunch coming while there's still time to act — chase a debtor, delay a discretionary spend, draw on a facility — and short enough that you can forecast each week with real confidence.

## What goes in it

Start with your opening bank balance. Then, week by week, list the cash actually landing in your account: customer receipts timed to when they really pay, not when you invoice. Against that, list the cash actually leaving: salaries, suppliers, rent, loan repayments, VAT, and PAYE.

The number that matters is the closing balance each week. The moment it dips toward zero — or below your overdraft limit — you've found a problem you can still do something about.

## Making it a habit

A forecast is only useful if it's current. Update it weekly, compare what you forecast against what actually happened, and tighten your assumptions. Within a month or two you'll trust it — and you'll stop being surprised by your own bank account.

This is exactly the kind of discipline a fractional CFO brings: not a one-off spreadsheet, but a living forecast that turns cash from a worry into a managed number.`,
  },
  {
    slug: "why-the-bank-said-no",
    cover: "/images/funding-towers.jpg",
    title: "Why the Bank Said No — and How to Change the Answer",
    category: "Funding",
    excerpt:
      "A declined facility is rarely about the business itself. More often it's about how the numbers were presented. Here's what lenders actually look for.",
    date: "2026-05-18",
    readTime: "7 min read",
    author: "Carel Gangel",
    body: `Being turned down for funding stings — especially when you know the business is sound. But lenders aren't rejecting your business so much as the case you put in front of them. Fix the case, and the answer often changes.

## They're buying certainty, not optimism

A bank lends against its confidence that it will be repaid. A hockey-stick forecast with no working behind it reads as a wish, not a plan. A grounded forecast — built on your actual margins, your real debtor days, and a sober view of the downside — reads as a business that knows itself.

## The three things they check first

First, can you service the debt? They'll stress-test whether your cash flow covers the repayment even in a soft month. Second, is the information reliable? Clean, current management accounts signal a business in control. Late, messy numbers signal risk. Third, do you have skin in the game and a plan for the money?

## Present it like a CFO would

The businesses that get a yes walk in with a tight pack: recent management accounts, a 13-week cash flow, a funding motivation that explains exactly what the money is for and how it gets repaid, and answers ready for the obvious questions.

That's the work a fractional CFO does before the meeting — and the reason it's often worth having one in the room with you.`,
  },
  {
    slug: "revenue-is-vanity-margin-is-sanity",
    cover: "/images/retail-pricing.jpg",
    title: "Revenue Is Vanity, Margin Is Sanity",
    category: "Profitability",
    excerpt:
      "Chasing turnover can quietly make a business poorer. A look at why margin — not sales — is the number that keeps you solvent.",
    date: "2026-05-04",
    readTime: "5 min read",
    author: "Carel Gangel",
    body: `"We're growing!" is one of the most dangerous things an owner can believe without checking the margin behind it. Plenty of businesses have grown their way into a cash crisis by selling more of something that barely makes money.

## Know your true gross margin

Gross margin is what's left after the direct cost of delivering the sale. If you don't know it — per product, per client, per job — you're flying blind. The exercise of working it out almost always turns up surprises: a flagship product that's barely profitable, or a "difficult" client who's actually your best one.

## The pricing lever beats the sales lever

For most SMEs, a small price increase drops almost entirely to the bottom line, while the same effort spent chasing new sales carries cost all the way through. Before you hire another salesperson, ask whether a disciplined pricing review would earn more — faster, and with less risk.

## Cut the quiet losers

Once you can see profitability line by line, the decisions get easier. Reprice the thin-margin work, fire the loss-making lines, and put your energy behind what actually pays. That's not cost-cutting — it's knowing where the money really comes from.

A fractional CFO's first job is usually exactly this: turning a fog of turnover into a clear map of where you make and lose money.`,
  },
  {
    slug: "provisional-tax-without-the-panic",
    cover: "/images/tax-paperwork.jpg",
    title: "Provisional Tax Without the Panic",
    category: "Tax",
    excerpt:
      "Two deadlines a year catch out countless SA business owners. A calmer, planned approach to provisional tax — and staying square with SARS.",
    date: "2026-04-20",
    readTime: "6 min read",
    author: "Carel Gangel",
    body: `For many South African business owners, provisional tax arrives like bad weather — twice a year, always sooner than expected, and often bigger than the bank balance can comfortably handle. It doesn't have to be that way.

## The problem is timing, not tax

Provisional tax itself is straightforward: you estimate your taxable income and pay it in two main bites during the year. The pain comes from not setting the money aside and from guessing the estimate badly — too low invites penalties and interest, too high ties up cash you needed.

## Set it aside as you go

The simplest discipline in the world: every month, move a sensible percentage of profit into a separate account earmarked for SARS. When the deadline comes, the money is already there. No scramble, no facility, no stress.

## Estimate from real numbers

A good provisional estimate comes from up-to-date management accounts and a realistic forecast for the rest of the year — not last year's figure with a finger in the air. Get the estimate close, and you avoid both penalties and the cash-flow whiplash of an over-payment.

## Plan the structure, too

Beyond the deadlines, how your business is structured affects what you ultimately pay. That's worth reviewing proactively with your advisor and accountant — well before year-end, when there's still time to act.

Handled this way, tax becomes another planned line in the cash flow rather than a recurring emergency.`,
  },
  {
    slug: "management-accounts-that-earn-their-keep",
    cover: "/images/reporting-dashboard.jpg",
    title: "Management Accounts That Actually Earn Their Keep",
    category: "Cash Flow",
    excerpt:
      "If your monthly accounts get filed and forgotten, they're costing you money. What board-grade reporting looks like for an SME.",
    date: "2026-04-06",
    readTime: "5 min read",
    author: "Carel Gangel",
    body: `Plenty of businesses produce management accounts. Far fewer use them. If yours arrive late, run to twenty pages, and get filed without a decision attached, they're an expense rather than a tool.

## One page, on time

Good SME reporting fits on a page and lands within days of month-end, not weeks. It shows the handful of numbers that actually move your business — cash, gross margin, the order book, debtor days — alongside the budget and the trend, so a glance tells you whether you're on track.

## Numbers with a "so what"

A figure on its own is trivia. The value is in the read-out: revenue is up but margin slipped — why, and what do we do? Debtor days crept out to 65 — who do we call this week? Reporting should end in actions, not just observations.

## Clean systems underneath

You can't get reliable reports out of a messy accounting system. Part of the work is upstream: a tidy chart of accounts, disciplined capture, and reconciliations that actually reconcile. Get that right and the reporting almost writes itself.

This is the rhythm a fractional CFO installs — reporting you read because it tells you something, every single month.`,
  },
  {
    slug: "what-a-fractional-cfo-actually-does",
    cover: "/images/boardroom.jpg",
    title: "What a Fractional CFO Actually Does",
    category: "Profitability",
    excerpt:
      "Not a bookkeeper, not an auditor, not a full-time hire. A plain explanation of the role — and when an SME is ready for one.",
    date: "2026-03-23",
    readTime: "6 min read",
    author: "Carel Gangel",
    body: `"Fractional CFO" is a tidy phrase for a simple idea: senior financial leadership, for a fraction of the time and cost of a full-time hire. But it's often misunderstood, so here's the plain version.

## Not the bookkeeper, not the auditor

Your bookkeeper records what happened. Your auditor checks it after the fact. A CFO is forward-looking: they own the cash flow forecast, the margin analysis, the funding strategy, and the financial side of the big decisions. Different job, different altitude.

## What "fractional" means

It means you get that seniority part-time — a few days a month, or a focused project — rather than carrying a full executive salary. For a business that has outgrown a bookkeeper but can't yet justify a R1.5m-a-year finance chief, it's the bridge.

## When you're ready for one

The signs are familiar: cash flow surprises you, you're making big calls on gut feel, the bank has gone cold, or growth isn't turning into profit. If two or three of those ring true, the question isn't whether you need senior financial input — it's how to get it affordably.

## Delivered remotely

None of this requires someone in your office. With cloud accounting and a regular rhythm of calls and reporting, a fractional CFO works just as well across the country as down the corridor — which is exactly how we work with SMEs nationwide.`,
  },
];

const toTime = (iso: string) => new Date(iso).getTime();

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => toTime(b.date) - toTime(a.date));
}

/** The N most recent articles (defaults to 3 for the home teaser). */
export function getRecentArticles(count = 3): Article[] {
  return getAllArticles().slice(0, count);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Turn a category label into a URL-safe slug, e.g. "Cash Flow" → "cash-flow". */
export function categorySlug(category: ArticleCategory): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

/** Every category that has at least one article, with its post count. */
export function getCategories(): {
  category: ArticleCategory;
  slug: string;
  count: number;
}[] {
  const counts = new Map<ArticleCategory, number>();
  for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, slug: categorySlug(category), count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/** Articles in a given category slug, newest first. */
export function getArticlesByCategory(slug: string): Article[] {
  return getAllArticles().filter((a) => categorySlug(a.category) === slug);
}

/** Resolve a category slug back to its display label. */
export function categoryFromSlug(slug: string): ArticleCategory | undefined {
  return articles.find((a) => categorySlug(a.category) === slug)?.category;
}

/** Up to `count` related articles — same category first, then newest others. */
export function getRelatedArticles(slug: string, count = 2): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  const others = getAllArticles().filter((a) => a.slug !== slug);
  const sameCategory = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}

/** Format an ISO date as e.g. "2 June 2026" for South African readers. */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
