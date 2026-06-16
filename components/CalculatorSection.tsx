import { SectionHeading } from "./SectionHeading";
import { FadeIn } from "./FadeIn";
import { FinanceCalculator } from "./FinanceCalculator";

export function CalculatorSection({
  eyebrow = "Finance Tools",
  title = "Run the numbers before the meeting",
  description = "A quick loan calculator to sanity-check a facility or asset purchase. Work out the monthly instalment, or how long an amount you can afford will take to settle.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-emerald-section py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-14"
        />
        <FadeIn>
          <FinanceCalculator />
        </FadeIn>
      </div>
    </section>
  );
}
