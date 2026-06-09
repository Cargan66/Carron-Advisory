"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { stats } from "@/lib/content";

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

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-emerald-radial">
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
          Boutique private wealth advisory
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-8 max-w-4xl text-balance text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Quietly building{" "}
          <span className="text-gold-gradient">enduring wealth</span> for the
          few we serve.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-stone-300/90 sm:text-xl"
        >
          Aurelia is an independent advisory firm for high-net-worth families
          and institutions — pairing institutional rigour with the discretion of
          a private office.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button href="/contact" size="lg">
            Book a Consultation
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
            Explore Our Services
          </Button>
        </motion.div>

        {/* Stat band */}
        <motion.dl
          variants={item}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-bold text-gold sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-stone-400">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
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
