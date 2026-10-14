# Frasier's founder-dependency frameworks vs. the 90-Day Owner-Independence Plan

**Status:** applied 2026-10-14 to [worker/plan.js](worker/plan.js).
**Constraints set by the owner:** the 20-question questionnaire does not change, and
nothing is adopted unless it *strengthens the existing questionnaire*. Three of five
candidate changes passed that filter; two were dropped.

## Where this came from

Roland Frasier refers to **The Five Evolutions of A Business** as his book and as the
framework he has refined over three decades. We could not read it: it is not findable
for purchase or download, and the only written version online is an unfinished blog
case study that publishes evolution 1 ("Up-Level Your Brand"), names evolution 2
("Play Chess Not Checkers"), and stops.

The video — [*If You Don't Understand Valuation, You Don't Understand Business*](https://www.youtube.com/watch?v=_cjjea6LXE4)
(16 min, Oct 2026) — **does not enumerate the five evolutions either**. He cites the
book twice (00:44, 05:02) and teaches founder dependency instead, which proved more
useful to us: three named, concrete frameworks that bear on items we already score.

| Framework | At | What it is |
|---|---|---|
| **Own and Escalate** | 07:06 | One named owner per domain + plain-language escalation criteria |
| **The 72-Hour Nest Test** | 08:28 | Leave for 72h with ownership pre-assigned; see what wobbled |
| **The Freedom Formula** | 10:01 | Clarity × Autonomy × Transferable Value — *multiplied*, not added |

## Adopted

### 1. "Own and Escalate" sharpens the authority-matrix action (item 1)

Same question, better answer. Our action was built almost entirely on **rand limits**,
and his version adds two things we lacked: **one named person per area, explicitly not a
committee**, and **escalation criteria in plain language rather than only an amount** —
*"you own all renewals; escalate only if a key customer wants pricing below our margin
floor."* Most real escalations are not a rand threshold at all, so the old wording could
not express them.

### 2. Nest Test mechanics sharpen the continuity test and the Phase 3 how-to

Our test said "take three to five working days completely off and log what had to wait."
It was missing the mechanics that make his version diagnostic rather than merely
disruptive:

- **Hand every area to a named stand-in with written guardrails before you go** — ours
  tested absence without preparing for it, which measures chaos, not capability.
- **No calls, no messages, no checking in** — "completely off" left the loophole open.
- **Record what *held*, what *wobbled* (it happened, but badly), and what *waited*** —
  the old log caught only the third, and missed work that got done poorly.

Also added his diagnostic: if the thought of being out of contact for three days is
frightening, that feeling is itself the finding. This one earns its place because
**"proven" is the questionnaire's own top rung** — the test is how an owner can honestly
claim it on the next re-run, so a sharper test makes the score itself more honest.

### 3. The area roll-up reported a half-broken area as "Delegated" — fixed

The Freedom Formula is multiplicative: "if any one of them is zero, this whole thing is
zero." `renderAreas` did the opposite — it averaged the item levels in an area and
rounded. An area with one item **proven** and one that still **waits for you** averaged
1.5, rounded to 2, and told a paying customer that area was **"Delegated."** `[3, 2]`
rounded to **"Proven."**

Now reports the **weakest item** in the area. Verified: that case reads
*"Waits for you · 1/2 proven"*; all-proven still reads Proven across all ten areas.

This was a correctness defect in a live paid product, independent of anything Frasier
says — it was reporting the customer's own answers back to them wrongly.

## Not adopted

**Customer mix / concentration.** Frasier's evolution 1 is about who you serve and what
you charge, and we score nothing on customer mix — for SA owner-managed businesses the
owner-dependence often *is* the customer list. But with the questionnaire fixed it could
only enter as an unscored action on a topic we never ask about, which does not strengthen
the questionnaire. Recorded here as a genuine gap; it needs a question before it needs an
action, and that is a separate decision.

**His valuation numbers and the value copy.** He quotes 2–3× EBITDA owner-operated
against 4–6× professionally run, PE at 6–8.5×, and a "$2m swing" on identical profit.
Vivid, but: US figures for 7–9-figure companies, our ICP is R25k+/month SA owner-managed
businesses that mostly will never sell, and specific multiples in a paid PDF move us
toward valuation advice the plan's own disclaimer disclaims. The exit framing also cuts
against the SA positioning finalised on 10 October. Dropped entirely, not softened.

## Fit with existing rules

- **Questionnaire unchanged.** All three changes are `action`/`why`/`howto` strings and
  display logic. Nothing touches `public/90-day-test/index.html` or the
  `answers[0..19]` contract.
- **Free vs paid** holds — all of it is actions, so it lands in the paid plan only.

## Sources

- [*If You Don't Understand Valuation, You Don't Understand Business*](https://www.youtube.com/watch?v=_cjjea6LXE4) — the three frameworks (no captions; watched)
- [The Five Evolutions of A Business — rolandfrasier.com](https://www.rolandfrasier.com/The+Five+Evolutions+of+A+Business) (evolution 1 only)
- [5 Exits of Every Successful Business Owner — Business Lunch](https://businesslunchpodcast.com/podcast-episodes/5-exits-of-every-successful-business-owner/)
