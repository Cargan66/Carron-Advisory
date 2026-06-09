import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin a confidential conversation with Aurelia Private Wealth. Book a consultation or reach our New York advisory office.",
};

const details = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: (
      <path d="M4 6h16v12H4z M4 7l8 6 8-6" />
    ),
  },
  {
    label: "Telephone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    icon: (
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />
    ),
  },
  {
    label: "Office",
    value: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    href: undefined,
    icon: (
      <>
        <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" />
        <circle cx="12" cy="11" r="2.5" />
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
            Begin a conversation in{" "}
            <span className="text-gold-gradient">confidence</span>.
          </>
        }
        description="Tell us a little about yourself and what you're looking for. A member of our advisory team will respond within one business day."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          {/* Details */}
          <FadeIn className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Speak with our team
              </h2>
              <p className="mt-3 leading-relaxed text-stone-300/90">
                Whether you&apos;re exploring a first relationship or seeking a
                second opinion, we&apos;re glad to talk — discreetly and without
                obligation.
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
                        className="mt-1 block text-stone-200 transition-colors hover:text-gold"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-stone-200">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Map placeholder */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <div
                className="flex h-56 items-center justify-center bg-emerald-section"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,175,55,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.18) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
                role="img"
                aria-label="Map showing Aurelia's New York office location"
              >
                <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-emerald-deep/80 px-4 py-2 text-sm text-gold">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                    <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                  {siteConfig.address.line2}
                </span>
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
