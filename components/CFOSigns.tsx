import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";
import { cfoSigns } from "@/lib/content";

export function CFOSigns() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gold/5 to-transparent"
      />
      <div className="container-luxe relative z-10">
        <SectionHeading
          eyebrow="Is it time for a CFO?"
          title="Six signs you've outgrown your books"
          description="None of these mean the business is in trouble. They mean it's grown past what a bookkeeper alone can carry. If two or three feel familiar, it's worth a conversation."
        />

        <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cfoSigns.map((sign) => (
            <FadeInItem key={sign.title} className="h-full">
              <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-emerald-section/40 p-6 transition-colors duration-300 hover:border-gold/30">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-gold/40 text-gold"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      d="M12 8v5M12 16h.01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-white">{sign.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                    {sign.description}
                  </p>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-12 flex justify-center">
          <Button href="/contact" size="lg">
            Book a Discovery Call
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
