import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wealth management, investment advisory, retirement and estate planning, tax strategy, and risk protection — a complete advisory practice for high-net-worth families.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title={
          <>
            One firm for the whole of your{" "}
            <span className="text-gold-gradient">financial life</span>.
          </>
        }
        description="Our services are designed to work in concert — a single, coordinated strategy rather than a collection of disconnected products."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FadeInItem key={service.slug} className="h-full">
                <ServiceCard service={service} detailed />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Process */}
      <section className="bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="How We Engage"
            title="A clear path from first meeting to lasting partnership"
          />
          <FadeInStagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {engagement.map((step, i) => (
              <FadeInItem key={step.title} className="h-full">
                <div className="flex h-full flex-col bg-emerald-base p-8">
                  <span className="text-3xl font-bold text-gold/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300/90">
                    {step.description}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}

const engagement = [
  {
    title: "Introduction",
    description:
      "A confidential, no-obligation conversation to understand your situation and goals.",
  },
  {
    title: "Discovery & Analysis",
    description:
      "A thorough review of your balance sheet, objectives, and existing arrangements.",
  },
  {
    title: "Strategy & Proposal",
    description:
      "A bespoke plan presented in plain language, with clear recommendations and fees.",
  },
  {
    title: "Ongoing Stewardship",
    description:
      "Implementation, transparent reporting, and a relationship that evolves with you.",
  },
];
