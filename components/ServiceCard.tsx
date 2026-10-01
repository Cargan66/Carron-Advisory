import Link from "next/link";
import { Card } from "./Card";
import { Icon } from "./Icons";
import type { Service } from "@/lib/content";

export function ServiceCard({
  service,
  detailed = false,
  href,
  tone = "dark",
}: {
  service: Service;
  detailed?: boolean;
  /** When set, the whole card becomes a link and shows a "Learn more" cue. */
  href?: string;
  /** "dark" (default) for emerald sections; "light" for cream/bone sections. */
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  const iconCls = isLight
    ? "border-gold-deep/30 bg-gold/10 text-gold-deep group-hover:border-gold-deep/60 group-hover:bg-gold/20"
    : "border-gold/30 bg-gold/5 text-gold group-hover:border-gold/60 group-hover:bg-gold/10";
  const titleCls = isLight ? "text-emerald-deep" : "text-white";
  const descCls = isLight ? "text-emerald-base/75" : "text-bone-muted";
  const featCls = isLight ? "text-emerald-base/90" : "text-bone/90";
  const accentCls = isLight ? "text-gold-deep" : "text-gold";
  const inner = (
    <Card interactive tone={tone} className="h-full">
      <div className="flex h-full flex-col">
        <span className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border transition-colors duration-500 ${iconCls}`}>
          <Icon name={service.icon} className="h-7 w-7" />
        </span>

        <h3 className={`text-xl font-bold ${titleCls}`}>{service.title}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${descCls}`}>
          {detailed ? service.description : service.summary}
        </p>

        {detailed && (
          <ul className="mt-6 space-y-2.5">
            {service.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-2.5 text-sm ${featCls}`}
              >
                <svg
                  className={`mt-0.5 h-4 w-4 flex-none ${accentCls}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        )}

        {href && (
          <div className="mt-auto pt-6">
            <span className={`inline-flex items-center gap-2 text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentCls}`}>
              Learn more
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full" aria-label={`${service.title} — learn more`}>
        {inner}
      </Link>
    );
  }

  return inner;
}
