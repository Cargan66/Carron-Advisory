"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

/**
 * Lead-magnet email capture for the Financial Health Check.
 *
 * Uses the same Web3Forms pipeline as the contact form (submissions email to
 * info@carron.co.za). On success the PDF download is triggered automatically
 * and a manual download link is shown as a fallback.
 *
 * To switch to Mailchimp/HubSpot later: replace the fetch() target and body
 * with the provider's endpoint/form fields — the UI stays the same.
 */

const WEB3FORMS_ACCESS_KEY = "dc0870f4-27e1-4787-8fb0-ab76fdcc861f";

// The file delivered to subscribers. Swap this PDF for the final health-check
// report whenever it's ready — keep the same path and nothing else changes.
const DOWNLOAD_PATH = "/resources/carron-financial-health-check.pdf";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-xl border border-white/10 bg-emerald-deep/60 px-4 py-3 text-white placeholder:text-stone-500 transition-colors duration-200 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";

function triggerDownload() {
  const a = document.createElement("a");
  a.href = DOWNLOAD_PATH;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function HealthCheckForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const business = String(formData.get("business") ?? "");
    const email = String(formData.get("email") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Financial Health Check download — Carron",
          from_name: "Carron website",
          name: name || "—",
          business: business || "—",
          email,
          message: "Requested the free Financial Health Check PDF.",
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      triggerDownload();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-2xl border border-gold/30 bg-gold/5 px-8 py-12 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-white">Your download is starting.</h3>
        <p className="mt-3 max-w-sm text-sm text-bone-muted">
          If it doesn&apos;t begin automatically, use the button below. We&apos;ve also
          noted your details — no spam, ever.
        </p>
        <a
          href={DOWNLOAD_PATH}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
        >
          Download the PDF
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hc-name" className="mb-2 block text-sm font-medium text-bone/90">
            Your name
          </label>
          <input id="hc-name" name="name" type="text" autoComplete="name" placeholder="Thandi Mokoena" className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="hc-business" className="mb-2 block text-sm font-medium text-bone/90">
            Business name
          </label>
          <input id="hc-business" name="business" type="text" autoComplete="organization" placeholder="Your company (Pty) Ltd" className={fieldClasses} />
        </div>
      </div>
      <div>
        <label htmlFor="hc-email" className="mb-2 block text-sm font-medium text-bone/90">
          Email <span className="text-gold">*</span>
        </label>
        <input
          id="hc-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="thandi@yourbusiness.co.za"
          aria-invalid={!!emailError}
          className={fieldClasses}
        />
        {emailError && (
          <p className="mt-1.5 text-xs text-red-300" role="alert">
            {emailError}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Something went wrong. Please try again, or email info@carron.co.za and we&apos;ll send it over.
        </p>
      )}

      <div className="pt-1">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get the free assessment"}
        </Button>
        <p className="mt-3 text-xs text-bone-dim">
          We respect your privacy. Your details are never shared, and you can unsubscribe any time.
        </p>
      </div>
    </form>
  );
}
