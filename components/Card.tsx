import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a hover lift + gold border glow. */
  interactive?: boolean;
  /** "dark" (default) for emerald sections; "light" for cream/bone sections. */
  tone?: "dark" | "light";
};

export function Card({
  children,
  className = "",
  interactive = false,
  tone = "dark",
}: CardProps) {
  const isLight = tone === "light";
  const shell = isLight
    ? "border-emerald-base/10 bg-white shadow-sm"
    : "border-white/10 bg-emerald-section/60 backdrop-blur-sm";
  const hover = interactive
    ? isLight
      ? "transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-deep/40 hover:shadow-[0_24px_60px_-30px_rgba(201,162,39,0.35)]"
      : "transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_24px_60px_-30px_rgba(212,175,55,0.45)]"
    : "";
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-8 ${shell} ${hover} ${className}`}
    >
      {/* Subtle gold corner sheen on hover */}
      {interactive && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {children}
    </div>
  );
}
