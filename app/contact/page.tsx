import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free discovery call with Carron Business Advisory. Fractional CFO services for South African SMEs, delivered remotely, countrywide.",
};

const details = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: <path d="M4 6h16v12H4z M4 7l8 6 8-6" />,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
    icon: <path d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L20 18v2a2 2 0 01-2 2A16 16 0 014 6a2 2 0 010-2z" />,
  },
  {
    label: "Coverage",
    value: "Remote · Countrywide across South Africa",
    href: undefined,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
      </>
    ),
  },
  {
    label: "Response time",
    value: "Within one business day",
    href: undefined,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about your{" "}
            <span className="text-gold-gradient">numbers</span>.
          </>
        }
        description="Tell us a little about your business and what's prompting the call. We'll come back within one business day to set up a free, no-obligation discovery call."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          {/* Details */}
          <FadeIn className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Start the conversation
              </h2>
              <p className="mt-3 leading-relaxed text-bone/90">
                Whether you need an ongoing financial right-hand or just a second
                opinion on one decision, we&apos;re glad to talk — straight, and
                without obligation.
              </p>
            </div>

            <ul className="space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {d.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block text-bone transition-colors hover:text-gold"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-bone">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Nationwide coverage graphic (no single office pin) */}
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10"
              role="img"
              aria-label="Carron serves SMEs remotely across all of South Africa"
            >
              <div
                className="flex h-56 flex-col items-center justify-center gap-3 bg-emerald-section"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,175,55,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.16) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              >
                <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-emerald-deep/80 px-4 py-2 text-sm text-gold">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Serving SMEs across South Africa
                </span>
                <p className="text-xs text-bone-dim">
                  Remote-first · every province
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-emerald-section/60 p-8 sm:p-10">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
