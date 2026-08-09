import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { HealthCheckForm } from "@/components/HealthCheckForm";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Free Financial Health Check",
  description:
    "Is your SME financially healthy? Get Carron's free Financial Health Check — a practical self-assessment of cash, margin, funding and reporting for South African owner-managed businesses.",
  alternates: { canonical: "/resources/financial-health-check" },
};

const covers = [
  {
    title: "Cash & runway",
    body: "Whether you can see what's in the bank weeks ahead — and how many months of runway you really have.",
  },
  {
    title: "Margin & pricing",
    body: "Whether you know your true gross margin, and which products, clients or jobs actually make money.",
  },
  {
    title: "Funding readiness",
    body: "Whether your numbers would stand up if you walked into the bank for a facility tomorrow.",
  },
  {
    title: "Reporting & control",
    body: "Whether your month-end tells you what's coming — or only ever what already happened.",
  },
];

export default function FinancialHealthCheckPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free Assessment"
        title={
          <>
            Is your SME financially healthy?{" "}
            <span className="text-gold-gradient">Free assessment</span>
          </>
        }
        description="A short, practical self-assessment across the four areas that decide whether an owner-managed business is in control of its numbers — cash, margin, funding and reporting."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* What's inside */}
          <div>
            <FadeIn>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                What the Health Check covers
              </h2>
              <p className="mt-4 text-base leading-relaxed text-bone/90">
                Four quick sections you can work through against your own numbers
                in a couple of minutes — with a clear sense of where you stand and
                what to fix first.
              </p>
            </FadeIn>
            <FadeInStagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {covers.map((c) => (
                <FadeInItem key={c.title}>
                  <div className="h-full rounded-2xl border border-white/10 bg-emerald-section/50 p-6">
                    <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="text-base font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bone-muted">{c.body}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>

            <FadeIn className="mt-10 rounded-2xl border border-white/10 bg-emerald-section/40 p-6">
              <p className="text-sm leading-relaxed text-bone-muted">
                Want a deeper, numbers-specific view?{" "}
                <Link href="/diagnostic" className="font-medium text-gold hover:text-gold-light">
                  The Financial Performance Diagnostic
                </Link>{" "}
                goes further — or read more about{" "}
                <Link href="/services/fractional-cfo" className="font-medium text-gold hover:text-gold-light">
                  fractional CFO services
                </Link>
                .
              </p>
            </FadeIn>
          </div>

          {/* Capture form */}
          <FadeIn className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-gold/20 bg-emerald-section/60 p-7 sm:p-9">
              <h2 className="text-xl font-bold text-white">Get your free Health Check</h2>
              <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                Enter your details and we&apos;ll send the assessment straight to your
                screen as a downloadable PDF.
              </p>
              <div className="mt-6">
                <HealthCheckForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
