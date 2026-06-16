import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <FadeIn className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          <span className="gold-rule" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl text-balance text-3xl/[1.25] font-bold text-white sm:text-4xl/[1.25] lg:text-[2.75rem]/[1.25]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-stone-300/90 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
