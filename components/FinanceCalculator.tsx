"use client";

import { useMemo, useState } from "react";

/**
 * Finance calculator.
 *
 * Tab-first: each tool is a self-contained panel component, registered in the
 * `tabs` array and rendered below. Four calculators are live — Loan Repayment,
 * Break-even, VAT, and Markup vs Margin. Add another by writing a panel and
 * adding an entry to `tabs`.
 */

const ZAR = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

const ZAR2 = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const pct = (n: number) => `${n.toLocaleString("en-ZA", { maximumFractionDigits: 1 })}%`;

const units = (n: number) =>
  `${n.toLocaleString("en-ZA", { maximumFractionDigits: 0 })} units`;

type LoanMode = "repayment" | "term";

type CalcResult =
  | {
      status: "ok";
      mode: LoanMode;
      monthly: number;
      months: number;
      totalInterest: number;
      totalRepaid: number;
    }
  | { status: "impossible"; firstMonthInterest: number };

export function FinanceCalculator() {
  const [tab, setTab] = useState("loan");

  const tabs = [
    { id: "loan", label: "Loan Repayment", soon: false },
    { id: "breakeven", label: "Break-even", soon: false },
    { id: "vat", label: "VAT", soon: false },
    { id: "markup", label: "Markup vs Margin", soon: false },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-emerald-section/60 backdrop-blur-sm">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Finance calculators"
        className="flex flex-wrap gap-1 border-b border-white/10 bg-emerald-deep/40 p-2"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active}
              disabled={t.soon}
              onClick={() => !t.soon && setTab(t.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-gold-gradient text-emerald-deep"
                  : t.soon
                    ? "cursor-not-allowed text-bone-dim/60"
                    : "text-bone/80 hover:text-gold"
              }`}
            >
              {t.label}
              {t.soon && (
                <span className="ml-2 rounded-full border border-white/15 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider text-bone-dim/70">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8">
        {tab === "loan" && <LoanCalculator />}
        {tab === "breakeven" && <BreakEvenCalculator />}
        {tab === "vat" && <VATCalculator />}
        {tab === "markup" && <MarkupMarginCalculator />}
      </div>
    </div>
  );
}

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-emerald-deep/60 px-4 py-3 text-white placeholder:text-bone-dim/60 transition-colors duration-200 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";

function LoanCalculator() {
  const [mode, setMode] = useState<LoanMode>("repayment");
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("11.75");
  const [term, setTerm] = useState("60");
  const [repayment, setRepayment] = useState("11000");

  const result = useMemo<CalcResult | null>(() => {
    const P = Number(amount);
    const annual = Number(rate);
    const r = annual / 100 / 12;

    if (!Number.isFinite(P) || P <= 0) return null;

    if (mode === "repayment") {
      const n = Number(term);
      if (!Number.isFinite(n) || n <= 0) return null;

      // Handle the zero-interest case explicitly.
      const monthly = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
      const totalRepaid = monthly * n;
      return {
        status: "ok",
        mode,
        monthly,
        months: n,
        totalRepaid,
        totalInterest: totalRepaid - P,
      };
    }

    // mode === "term"
    const M = Number(repayment);
    if (!Number.isFinite(M) || M <= 0) return null;

    if (r === 0) {
      const n = Math.ceil(P / M);
      const totalRepaid = M * n;
      return {
        status: "ok",
        mode,
        monthly: M,
        months: n,
        totalRepaid,
        totalInterest: totalRepaid - P,
      };
    }

    // The repayment must at least cover the first month's interest, or the
    // balance never reduces and the loan can never be settled.
    const firstMonthInterest = P * r;
    if (M <= firstMonthInterest) {
      return { status: "impossible", firstMonthInterest };
    }

    const n = Math.ceil(-Math.log(1 - (r * P) / M) / Math.log(1 + r));
    const totalRepaid = M * n;
    return {
      status: "ok",
      mode,
      monthly: M,
      months: n,
      totalRepaid,
      totalInterest: totalRepaid - P,
    };
  }, [mode, amount, rate, term, repayment]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div>
        {/* Mode toggle */}
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-emerald-deep/50 p-1">
          <ModeButton
            active={mode === "repayment"}
            onClick={() => setMode("repayment")}
          >
            Monthly repayment
          </ModeButton>
          <ModeButton active={mode === "term"} onClick={() => setMode("term")}>
            Required term
          </ModeButton>
        </div>

        <div className="space-y-5">
          <FieldNumber
            id="loan-amount"
            label="Loan amount (ZAR)"
            prefix="R"
            value={amount}
            onChange={setAmount}
            min={0}
            step={1000}
          />
          <FieldNumber
            id="loan-rate"
            label="Annual interest rate"
            suffix="%"
            value={rate}
            onChange={setRate}
            min={0}
            step={0.25}
          />
          {mode === "repayment" ? (
            <FieldNumber
              id="loan-term"
              label="Term (months)"
              suffix="months"
              value={term}
              onChange={setTerm}
              min={1}
              step={1}
            />
          ) : (
            <FieldNumber
              id="loan-repayment"
              label="Affordable monthly repayment (ZAR)"
              prefix="R"
              value={repayment}
              onChange={setRepayment}
              min={0}
              step={500}
            />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col rounded-2xl border border-gold/20 bg-emerald-deep/50 p-6">
        {result?.status === "impossible" ? (
          <div className="flex flex-1 flex-col justify-center text-center">
            <p className="text-gold">That repayment is too low.</p>
            <p className="mt-2 text-sm leading-relaxed text-bone/80">
              At this rate the interest each month is about{" "}
              <span className="font-semibold text-white">
                {ZAR2.format(result.firstMonthInterest)}
              </span>
              . Your repayment needs to exceed that, or the balance never comes
              down. Increase the monthly amount to settle the loan.
            </p>
          </div>
        ) : result ? (
          <>
            <ResultHeadline
              label={
                result.mode === "repayment"
                  ? "Monthly instalment"
                  : "Time to settle"
              }
              value={
                result.mode === "repayment"
                  ? ZAR2.format(result.monthly)
                  : formatMonths(result.months)
              }
            />
            <dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
              {result.mode === "term" ? (
                <ResultRow
                  label="Monthly repayment"
                  value={ZAR2.format(result.monthly)}
                />
              ) : (
                <ResultRow label="Term" value={formatMonths(result.months)} />
              )}
              <ResultRow
                label="Total interest"
                value={ZAR.format(result.totalInterest)}
              />
              <ResultRow
                label="Total repaid"
                value={ZAR.format(result.totalRepaid)}
                emphasise
              />
            </dl>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-center text-sm text-bone-dim/70">
            Enter your loan details to see the figures.
          </div>
        )}

        <p className="mt-6 text-xs leading-relaxed text-bone-dim/70">
          Indicative only. Figures assume a fixed rate and equal monthly
          instalments, and exclude fees, insurance, and initiation costs. Not a
          quote or financial advice.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------- Break-even ------------------------------- */

function BreakEvenCalculator() {
  const [fixed, setFixed] = useState("60000");
  const [price, setPrice] = useState("250");
  const [variable, setVariable] = useState("150");

  const result = useMemo(() => {
    const F = Number(fixed);
    const P = Number(price);
    const V = Number(variable);
    if (![F, P, V].every(Number.isFinite) || F < 0 || P <= 0 || V < 0)
      return null;

    const contribution = P - V;
    if (contribution <= 0) return { status: "loss" as const };

    const marginRatio = contribution / P;
    const breakEvenUnits = F / contribution;
    const breakEvenRevenue = F / marginRatio;
    return {
      status: "ok" as const,
      breakEvenUnits,
      breakEvenRevenue,
      contribution,
      marginRatio,
    };
  }, [fixed, price, variable]);

  return (
    <CalcLayout
      inputs={
        <div className="space-y-5">
          <FieldNumber
            id="be-fixed"
            label="Fixed costs (per month)"
            prefix="R"
            value={fixed}
            onChange={setFixed}
            min={0}
            step={1000}
          />
          <FieldNumber
            id="be-price"
            label="Selling price per unit"
            prefix="R"
            value={price}
            onChange={setPrice}
            min={0}
            step={10}
          />
          <FieldNumber
            id="be-variable"
            label="Variable cost per unit"
            prefix="R"
            value={variable}
            onChange={setVariable}
            min={0}
            step={10}
          />
        </div>
      }
      disclaimer="Indicative only. Variable costs are the costs that rise with each sale (stock, materials, commission); fixed costs stay the same whatever you sell."
    >
      {result?.status === "loss" ? (
        <CenteredNote title="Each sale loses money.">
          Your selling price doesn&apos;t cover the variable cost of the sale, so
          the business can never break even — every unit widens the gap. Raise
          the price or cut the per-unit cost first.
        </CenteredNote>
      ) : result ? (
        <>
          <ResultHeadline
            label="Break-even point"
            value={units(Math.ceil(result.breakEvenUnits))}
          />
          <dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
            <ResultRow
              label="Break-even revenue"
              value={ZAR.format(result.breakEvenRevenue)}
              emphasise
            />
            <ResultRow
              label="Contribution per unit"
              value={ZAR2.format(result.contribution)}
            />
            <ResultRow
              label="Contribution margin"
              value={pct(result.marginRatio * 100)}
            />
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-bone-dim/80">
            You need to sell about {units(Math.ceil(result.breakEvenUnits))} a
            month to cover all your costs. Everything beyond that is profit.
          </p>
        </>
      ) : (
        <EmptyState>Enter your costs and price to find break-even.</EmptyState>
      )}
    </CalcLayout>
  );
}

/* ---------------------------------- VAT ----------------------------------- */

type VatMode = "add" | "remove";

function VATCalculator() {
  const [mode, setMode] = useState<VatMode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("15");

  const result = useMemo(() => {
    const A = Number(amount);
    const R = Number(rate);
    if (!Number.isFinite(A) || A < 0 || !Number.isFinite(R) || R < 0)
      return null;

    const factor = 1 + R / 100;
    if (mode === "add") {
      const vat = A * (R / 100);
      return { excl: A, vat, incl: A + vat, mode };
    }
    const excl = A / factor;
    return { excl, vat: A - excl, incl: A, mode };
  }, [mode, amount, rate]);

  return (
    <CalcLayout
      modeToggle={
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-emerald-deep/50 p-1">
          <ModeButton active={mode === "add"} onClick={() => setMode("add")}>
            Add VAT
          </ModeButton>
          <ModeButton
            active={mode === "remove"}
            onClick={() => setMode("remove")}
          >
            Remove VAT
          </ModeButton>
        </div>
      }
      inputs={
        <div className="space-y-5">
          <FieldNumber
            id="vat-amount"
            label={
              mode === "add" ? "Amount (excl. VAT)" : "Amount (incl. VAT)"
            }
            prefix="R"
            value={amount}
            onChange={setAmount}
            min={0}
            step={100}
          />
          <FieldNumber
            id="vat-rate"
            label="VAT rate"
            suffix="%"
            value={rate}
            onChange={setRate}
            min={0}
            step={0.5}
          />
        </div>
      }
      disclaimer="Indicative only. South Africa's standard VAT rate is 15%. Only VAT-registered businesses charge and claim VAT."
    >
      {result ? (
        <>
          <ResultHeadline
            label={mode === "add" ? "Total incl. VAT" : "Amount excl. VAT"}
            value={
              mode === "add"
                ? ZAR2.format(result.incl)
                : ZAR2.format(result.excl)
            }
          />
          <dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
            <ResultRow
              label="Amount excl. VAT"
              value={ZAR2.format(result.excl)}
            />
            <ResultRow
              label={`VAT @ ${pct(Number(rate) || 0)}`}
              value={ZAR2.format(result.vat)}
              emphasise
            />
            <ResultRow
              label="Amount incl. VAT"
              value={ZAR2.format(result.incl)}
            />
          </dl>
        </>
      ) : (
        <EmptyState>Enter an amount to work out the VAT.</EmptyState>
      )}
    </CalcLayout>
  );
}

/* ----------------------------- Markup vs Margin ---------------------------- */

type MarkupBasis = "price" | "markup" | "margin";

function MarkupMarginCalculator() {
  const [basis, setBasis] = useState<MarkupBasis>("price");
  const [cost, setCost] = useState("100");
  const [price, setPrice] = useState("150");
  const [markup, setMarkup] = useState("50");
  const [margin, setMargin] = useState("33.3");

  const result = useMemo(() => {
    const C = Number(cost);
    if (!Number.isFinite(C) || C <= 0) return null;

    let sellPrice: number;
    if (basis === "price") {
      sellPrice = Number(price);
      if (!Number.isFinite(sellPrice) || sellPrice < 0) return null;
    } else if (basis === "markup") {
      const m = Number(markup);
      if (!Number.isFinite(m)) return null;
      sellPrice = C * (1 + m / 100);
    } else {
      const m = Number(margin);
      if (!Number.isFinite(m)) return null;
      if (m >= 100) return { status: "impossible" as const };
      sellPrice = C / (1 - m / 100);
    }

    const profit = sellPrice - C;
    const markupPct = (profit / C) * 100;
    const marginPct = sellPrice > 0 ? (profit / sellPrice) * 100 : 0;
    return {
      status: "ok" as const,
      sellPrice,
      profit,
      markupPct,
      marginPct,
      cost: C,
    };
  }, [basis, cost, price, markup, margin]);

  return (
    <CalcLayout
      modeToggle={
        <div className="mb-6">
          <span className="mb-2 block text-sm font-medium text-bone/90">
            Work it out from
          </span>
          <div className="inline-flex flex-wrap rounded-full border border-white/10 bg-emerald-deep/50 p-1">
            <ModeButton
              active={basis === "price"}
              onClick={() => setBasis("price")}
            >
              Selling price
            </ModeButton>
            <ModeButton
              active={basis === "markup"}
              onClick={() => setBasis("markup")}
            >
              Markup %
            </ModeButton>
            <ModeButton
              active={basis === "margin"}
              onClick={() => setBasis("margin")}
            >
              Margin %
            </ModeButton>
          </div>
        </div>
      }
      inputs={
        <div className="space-y-5">
          <FieldNumber
            id="mm-cost"
            label="Cost price per unit"
            prefix="R"
            value={cost}
            onChange={setCost}
            min={0}
            step={10}
          />
          {basis === "price" && (
            <FieldNumber
              id="mm-price"
              label="Selling price per unit"
              prefix="R"
              value={price}
              onChange={setPrice}
              min={0}
              step={10}
            />
          )}
          {basis === "markup" && (
            <FieldNumber
              id="mm-markup"
              label="Target markup"
              suffix="%"
              value={markup}
              onChange={setMarkup}
              step={5}
            />
          )}
          {basis === "margin" && (
            <FieldNumber
              id="mm-margin"
              label="Target margin"
              suffix="%"
              value={margin}
              onChange={setMargin}
              step={5}
            />
          )}
        </div>
      }
      disclaimer="Indicative only. Markup is profit as a % of cost; margin is profit as a % of the selling price. The same rand profit always looks like a bigger markup than margin."
    >
      {result?.status === "impossible" ? (
        <CenteredNote title="That margin isn't reachable.">
          A margin of 100% or more would need an infinite selling price. Margin
          is profit as a share of the price, so it can only get close to — never
          reach — 100%.
        </CenteredNote>
      ) : result ? (
        <>
          <ResultHeadline
            label="Selling price"
            value={ZAR2.format(result.sellPrice)}
          />
          <dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
            <ResultRow label="Cost price" value={ZAR2.format(result.cost)} />
            <ResultRow
              label="Profit per unit"
              value={ZAR2.format(result.profit)}
            />
            <ResultRow label="Markup" value={pct(result.markupPct)} emphasise />
            <ResultRow label="Margin" value={pct(result.marginPct)} emphasise />
          </dl>
        </>
      ) : (
        <EmptyState>Enter a cost price to compare markup and margin.</EmptyState>
      )}
    </CalcLayout>
  );
}

/* ------------------------------ Shared layout ----------------------------- */

function CalcLayout({
  inputs,
  children,
  disclaimer,
  modeToggle,
}: {
  inputs: React.ReactNode;
  children: React.ReactNode;
  disclaimer: string;
  modeToggle?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        {modeToggle}
        {inputs}
      </div>
      <div className="flex flex-col rounded-2xl border border-gold/20 bg-emerald-deep/50 p-6">
        {children}
        <p className="mt-6 text-xs leading-relaxed text-bone-dim/70">
          {disclaimer}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center text-center text-sm text-bone-dim/70">
      {children}
    </div>
  );
}

function CenteredNote({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <p className="text-gold">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-bone/80">{children}</p>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-gold-gradient text-emerald-deep"
          : "text-bone/80 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

function FieldNumber({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  step,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-bone/90"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bone-dim"
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} ${prefix ? "pl-8" : ""} ${
            suffix ? "pr-20" : ""
          }`}
        />
        {suffix && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-bone-dim"
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultHeadline({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">{value}</p>
    </div>
  );
}

function ResultRow({
  label,
  value,
  emphasise = false,
}: {
  label: string;
  value: string;
  emphasise?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-bone/80">{label}</dt>
      <dd
        className={`text-right font-semibold ${
          emphasise ? "text-lg text-gold" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rem > 0) parts.push(`${rem} mo`);
  const human = parts.join(" ") || "0 mo";
  return `${months} months · ${human}`;
}
