import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a hover lift + gold border glow. */
  interactive?: boolean;
};

export function Card({
  children,
  className = "",
  interactive = false,
}: CardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-emerald-section/60 p-8 backdrop-blur-sm ${
        interactive
          ? "transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_24px_60px_-30px_rgba(212,175,55,0.45)]"
          : ""
      } ${className}`}
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
