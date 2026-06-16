"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

// Web3Forms access key — get a free one in seconds at https://web3forms.com
// (enter the inbox address where enquiries should land; they email you the key).
// Paste it here to start receiving contact-form submissions.
const WEB3FORMS_ACCESS_KEY = "dc0870f4-27e1-4787-8fb0-ab76fdcc861f";

const fieldClasses =
  "w-full rounded-xl border border-white/10 bg-emerald-deep/60 px-4 py-3 text-white placeholder:text-stone-500 transition-colors duration-200 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (data: {
    name: string;
    email: string;
    message: string;
  }): Errors => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!data.message.trim()) {
      next.message = "Please tell us a little about your business.";
    } else if (data.message.trim().length < 10) {
      next.message = "Please provide a little more detail (10+ characters).";
    }
    return next;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: String(formData.get("name") ?? ""),
      business: String(formData.get("business") ?? ""),
      email: String(formData.get("email") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New enquiry — Carron Business Advisory",
          from_name: "Carron website",
          name: data.name,
          business: data.business || "—",
          email: data.email,
          interest: data.interest || "—",
          message: data.message,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-2xl border border-gold/30 bg-gold/5 px-8 py-14 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 text-2xl font-bold text-white">Thank you.</h3>
        <p className="mt-3 max-w-sm text-bone-muted">
          Your message has been received. We&apos;ll be in touch within one
          business day to set up your discovery call.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-gold hover:text-gold-light"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Thandi Mokoena"
            aria-invalid={!!errors.name}
            className={fieldClasses}
          />
        </Field>
        <Field label="Business name" htmlFor="business">
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            placeholder="Your company (Pty) Ltd"
            className={fieldClasses}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="thandi@yourbusiness.co.za"
            aria-invalid={!!errors.email}
            className={fieldClasses}
          />
        </Field>
        <Field label="What's the priority?" htmlFor="interest">
          <select id="interest" name="interest" className={fieldClasses} defaultValue="">
            <option value="" disabled>
              Select an area
            </option>
            <option>Cash flow</option>
            <option>Profit &amp; pricing</option>
            <option>Funding &amp; banks</option>
            <option>Reporting &amp; systems</option>
            <option>Risk &amp; governance</option>
            <option>Growth &amp; strategy</option>
            <option>Financial Performance Diagnostic</option>
            <option>Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Tell us about your business" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A line or two about your business, roughly your turnover, and what's prompting you to reach out…"
          aria-invalid={!!errors.message}
          className={`${fieldClasses} resize-none`}
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            Something went wrong sending your message. Please try again or email
            us directly.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Book a Discovery Call"}
        </Button>
        <p className="text-xs text-bone-dim">
          We respect your privacy. Your details are never shared.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-bone/90"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
