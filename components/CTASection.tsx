import { Button } from "./Button";
import { FadeIn } from "./FadeIn";

export function CTASection({
  title = "Begin a conversation in confidence.",
  description = "Every engagement starts with a private, no-obligation consultation to understand your goals — and whether we're the right fit.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="container-luxe py-24 sm:py-32">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-emerald-section px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-gold/10 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-gold/10 blur-[90px]"
          />
          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="gold-rule mx-auto mb-6 block" aria-hidden />
            <h2 className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-300/90 sm:text-lg">
              {description}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Book a Consultation
              </Button>
              <Button href="/about" size="lg" variant="secondary">
                Learn About Us
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
