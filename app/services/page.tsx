import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "What a CFO Adds",
  description:
    "Cash flow, profit and pricing, funding, reporting, risk and governance, and growth strategy — the six areas where a fractional CFO turns numbers into better decisions for South African SMEs.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What a CFO Adds"
        title={
          <>
            One CFO, flexing across your whole{" "}
            <span className="text-gold-gradient">financial picture</span>.
          </>
        }
        description="You don't buy a fixed package. The role moves to where the business needs it most — and shifts as you grow. These are the six areas where it earns its keep."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe">
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FadeInItem key={service.slug} className="h-full">
                <div id={service.slug} className="h-full scroll-mt-28">
                  <ServiceCard service={service} detailed />
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Advisory in action */}
      <section className="bg-emerald-base pb-24 sm:pb-32">
        <FadeIn className="container-luxe">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/images/advisory-review.jpg"
              alt="A CFO and a business owner reviewing the numbers together at a desk"
              width={1500}
              height={1000}
              sizes="100vw"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </FadeIn>
      </section>

      {/* Engagement teaser */}
      <section className="bg-emerald-section py-24 sm:py-32">
        <div className="container-luxe">
          <div className="rounded-3xl border border-gold/20 bg-emerald-base/60 px-8 py-14 sm:px-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <SectionHeading
                align="left"
                eyebrow="How It Works"
                title="Flexible by design — retainer, project, or ad-hoc"
                description="The CFO role can flex across all six areas, or zero in on one. Whether you need an ongoing right-hand or a single piece of work, there's an engagement that fits — all delivered remotely."
              />
              <FadeIn className="flex lg:justify-end">
                <Button href="/engagement" size="lg">
                  See Engagement Models
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
