import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CalculatorSection } from "@/components/CalculatorSection";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Finance Tools",
  description:
    "Free finance calculators for South African business owners — work out loan repayments and settlement terms in ZAR. More tools coming soon.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Finance Tools"
        title={
          <>
            Quick numbers, <span className="text-gold-gradient">no spreadsheet</span>.
          </>
        }
        description="Handy calculators for the questions that come up between board packs. Indicative only — but enough to sanity-check a decision before you make it."
      />

      <CalculatorSection
        eyebrow="Loan Repayment"
        title="What will it really cost to borrow?"
        description="Work out the monthly instalment on a facility or asset finance, or flip it around: tell us what you can afford each month and see how long it takes to settle — and what the interest adds up to."
      />

      <CTASection
        title="Want the full picture, not just one number?"
        description="A fractional CFO builds the forecast these calculators only hint at. Book a discovery call and let's look at your real numbers."
      />
    </>
  );
}
