import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** "dark" (default) for the emerald sections; "light" for cream/bone sections. */
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  tone = "dark",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const isLight = tone === "light";

  return (
    <FadeIn className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${isLight ? "text-gold-deep" : "text-gold"}`}>
          <span className="gold-rule" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={`max-w-3xl text-balance text-3xl/[1.25] font-bold sm:text-4xl/[1.25] lg:text-[2.75rem]/[1.25] ${
          isLight ? "text-emerald-deep" : "text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            isLight ? "text-emerald-base/80" : "text-stone-300/90"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
