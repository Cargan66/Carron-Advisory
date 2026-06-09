"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <svg
        aria-hidden
        className="mx-auto mb-8 h-12 w-12 text-gold/40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c.4 0 .8-.05 1.1-.13C8 16.6 6.3 18 4.5 18.4l.5 1.6c3.6-.8 6-3.9 6-7.9V10.5C11 8 9 6 7.5 6zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c.4 0 .8-.05 1.1-.13-.6 1.73-2.3 3.13-4.1 3.53l.5 1.6c3.6-.8 6-3.9 6-7.9V10.5C20 8 18 6 16.5 6z" />
      </svg>

      <div className="min-h-[180px] sm:min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-balance text-xl font-medium leading-relaxed text-white sm:text-2xl">
              &ldquo;{active.quote}&rdquo;
            </p>
            <footer className="mt-7">
              <p className="font-semibold text-gold">{active.author}</p>
              <p className="mt-1 text-sm text-stone-400">{active.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold transition-colors hover:border-gold/50 hover:bg-gold/10"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold transition-colors hover:border-gold/50 hover:bg-gold/10"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
