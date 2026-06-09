# Aurelia Private Wealth

A modern, high-end **finance advisory website** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

The brand is a deep emerald-and-gold private-wealth aesthetic — refined, exclusive, and built for high-net-worth clientele.

![Emerald & gold luxury finance theme](https://img.shields.io/badge/theme-emerald%20%26%20gold-D4AF37?style=flat-square&labelColor=0B2E20)

---

## ✨ Features

- **Five pages** — Home, About, Services, Insights/Blog, Contact
- **Sticky transparent navbar** that gains a solid emerald background on scroll, with a gold monogram logo and animated active-link underline
- **Full-screen hero** with bold gold headline, dual CTAs, and an animated stat band
- **Reusable components** — `Button`, `Card`, `SectionHeading`, `ServiceCard`, `Footer`, plus Framer Motion `FadeIn` helpers
- **Contact form** with client-side validation and a stubbed API route (`/api/contact`) that logs submissions server-side
- **Animated testimonials** carousel and scroll-triggered entrance animations throughout
- **Responsive & mobile-first**, with an animated mobile menu
- **Accessible** — semantic HTML, skip-to-content link, visible focus rings, ARIA labels, `prefers`-friendly contrast
- **SEO basics** — per-page metadata, Open Graph + Twitter tags, `sitemap.xml`, and `robots.txt`

## 🎨 Brand

| Token | Value | Use |
| --- | --- | --- |
| `emerald.base` | `#0B2E20` | Page background |
| `emerald.section` | `#0F3D2A` | Section / card surfaces |
| `emerald.deep` | `#082218` | Footer, deep accents |
| `gold` (DEFAULT) | `#D4AF37` | Primary accent |
| `gold.deep` | `#C9A227` | Gradient stop |
| `gold.light` | `#E8C766` | Highlights / hover |

Typography is **Poppins** (700 for headings, 400/500 for body), loaded via `next/font/google`.

## 🚀 Getting started

> **Prerequisites:** Node.js 18.17+ (tested on Node 24) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Then open **http://localhost:3000**.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # Run ESLint
```

## 📁 Project structure

```
.
├── app/                  # App Router pages & routes
│   ├── layout.tsx        # Root layout, fonts, metadata, Navbar/Footer
│   ├── globals.css       # Tailwind layers + brand utilities
│   ├── page.tsx          # Home
│   ├── about/            # About
│   ├── services/         # Services
│   ├── insights/         # Insights / blog
│   ├── contact/          # Contact (form + map placeholder)
│   ├── api/contact/      # Stubbed form-submission endpoint
│   ├── sitemap.ts        # SEO sitemap
│   └── robots.ts         # SEO robots
├── components/           # Reusable UI (Navbar, Footer, Button, Card, …)
├── lib/                  # Site config & placeholder content/data
├── tailwind.config.ts    # Brand colors, fonts, animations
└── ...config files
```

## 🔌 Wiring up the contact form

The form posts to `app/api/contact/route.ts`, which currently validates input and
`console.log`s the enquiry. To send real emails, drop in a provider such as
[Resend](https://resend.com) or [SendGrid](https://sendgrid.com) inside that route.

## 🖼️ Imagery

The design uses CSS gradients, textures, and monogram marks rather than bundled
photography, so it runs with no external image dependencies. To add stock imagery,
`images.unsplash.com` is already allow-listed in `next.config.mjs` for `next/image`.

## 📝 Notes

This is a **design demonstration**. The copy, statistics, testimonials, and team
profiles are placeholders and do not represent a real firm or financial advice.

---

Built with Next.js · TypeScript · Tailwind CSS · Framer Motion.
