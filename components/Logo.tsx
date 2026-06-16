import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-gold/60">
        {/* Stylised 'C' monogram */}
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M17 7.5a6.5 6.5 0 1 0 0 9" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-wide text-white">
          {siteConfig.shortName}
        </span>
        <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold/80">
          {siteConfig.descriptor}
        </span>
      </span>
    </Link>
  );
}
