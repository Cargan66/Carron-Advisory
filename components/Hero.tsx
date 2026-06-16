"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./Button";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const marks = [
  "Fractional CFO leadership",
  "Remote, countrywide",
  "No full-time salary",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-emerald-radial">
      {/* Office background — a team working together */}
      <Image
        src="/images/office-team.jpg"
        alt="A team working together at their laptops in a bright office"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover opacity-80"
      />
      {/* Left-to-right emerald wash: dark behind the text, clear over the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-base via-emerald-base/80 to-emerald-base/20"
      />
      {/* Gentle top & bottom fade to blend the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-deep/60 via-transparent to-emerald-base/70"
      />

      {/* Decorative gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-muted/40 blur-[120px]"
      />
      {/* Faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-luxe relative z-10 pt-28"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-gold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Fractional &amp; outsourced CFO services
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-8 max-w-4xl text-balance text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Senior financial leadership,{" "}
          <span className="text-gold-gradient">without the full-time salary</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-bone/90 sm:text-xl"
        >
          You&apos;ve outgrown a bookkeeper but a full-time CFO doesn&apos;t add
          up yet. Carron gives South African SMEs an experienced CFO on tap — the
          difference between keeping books and running a business.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button href="/contact" size="lg">
            Book a Discovery Call
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button href="/services" size="lg" variant="secondary">
            What a CFO Adds
          </Button>
        </motion.div>

        {/* Honest positioning strip — no invented stats */}
        <motion.ul
          variants={item}
          className="mt-20 flex max-w-3xl flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-10"
        >
          {marks.map((m) => (
            <li key={m} className="flex items-center gap-2.5 text-sm text-bone/80">
              <svg
                className="h-4 w-4 flex-none text-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {m}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-gold/40 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-gold" />
        </motion.div>
      </div>
    </section>
  );
}
