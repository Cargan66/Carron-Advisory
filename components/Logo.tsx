import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/60">
        {/* Stylised 'A' monogram */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 4L5 20" />
          <path d="M12 4l7 16" />
          <path d="M8 14h8" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-wide text-white">
          {siteConfig.shortName}
        </span>
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-gold/80">
          Private Wealth
        </span>
      </span>
    </Link>
  );
}
