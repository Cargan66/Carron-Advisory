import { Card } from "./Card";
import { Icon } from "./Icons";
import type { Service } from "@/lib/content";

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <Card interactive className="h-full">
      <div className="flex h-full flex-col">
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold transition-colors duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
          <Icon name={service.icon} className="h-7 w-7" />
        </span>

        <h3 className="text-xl font-bold text-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-300/90">
          {detailed ? service.description : service.summary}
        </p>

        {detailed && (
          <ul className="mt-6 space-y-2.5">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm text-stone-300"
              >
                <svg
                  className="mt-0.5 h-4 w-4 flex-none text-gold"
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

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
      </div>
    </Card>
  );
}
