import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-emerald-radial pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-gold/10 blur-[110px]"
      />
      <div className="container-luxe relative z-10">
        <FadeIn>
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <span className="gold-rule" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-300/90">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
