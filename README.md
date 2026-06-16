# Carron Business Advisory

A modern, high-end **fractional-CFO advisory website** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Carron provides **fractional / outsourced CFO services to South African SMEs** — senior financial leadership for owner-managed businesses that have outgrown a bookkeeper but can't justify a full-time CFO. Delivered remotely, countrywide. The brand is a deep emerald-and-gold aesthetic — refined, credible, premium.

![Emerald & gold advisory theme](https://img.shields.io/badge/theme-emerald%20%26%20gold-D4AF37?style=flat-square&labelColor=0B2E20)

---

## ✨ Features

- **Seven routes** — Home, About, What a CFO Adds (Services), Engagement Models, Insights, Finance Tools, Contact
- **Finance calculator** (`components/FinanceCalculator.tsx`) — a live loan-repayment tool with two modes (solve for monthly instalment, or solve for term from an affordable repayment), ZAR formatting, and a guard against repayments too low to ever clear the loan. Built tab-first so break-even / VAT / markup-vs-margin calculators can be added later.
- **Data-driven Insights** — a typed `Article` model in `lib/articles.ts`; the home page shows the 3 most recent, the index lists all, and each post has a dynamic `/insights/[slug]` route (statically generated).
- **"Is it time for a CFO?"** band — honest, recognisable signs an SME has outgrown its books (no invented credibility stats).
- **Sticky transparent navbar** that gains a solid emerald background on scroll, with a gold monogram logo and animated active-link underline.
- **Reusable components** — `Button`, `Card`, `SectionHeading`, `ServiceCard`, `Footer`, plus Framer Motion `FadeIn` helpers.
- **Contact form** (name, business name, email, priority, message) with client-side validation and a stubbed API route (`/api/contact`) that logs submissions server-side.
- **Animated testimonials** carousel and scroll-triggered entrance animations throughout.
- **Responsive & mobile-first**, with an animated mobile menu.
- **Accessible** — semantic HTML, skip-to-content link, visible focus rings, ARIA labels, sufficient contrast, and reduced-motion-friendly viewport animations.
- **SEO basics** — per-page metadata tuned for "fractional CFO South Africa", Open Graph + Twitter tags, `sitemap.xml` (including article slugs), and `robots.txt`.

## 🎨 Brand

| Token | Value | Use |
| --- | --- | --- |
| `emerald.base` | `#0B2E20` | Page background |
| `emerald.section` | `#0F3D2A` | Section / card surfaces |
| `emerald.deep` | `#08251A` | Footer, deepest bands |
| `gold` (DEFAULT) | `#D4AF37` | Primary accent |
| `gold.deep` | `#C9A227` | Gradient stop |
| `gold.light` | `#E8C766` | Highlights / hover |
| `bone` (DEFAULT) | `#EFE9DA` | Off-white body text |

Typography is **Poppins** (700 for headings, 400/500 for body), loaded via `next/font/google`.

## 🚀 Getting started

> **Prerequisites:** Node.js 18.17+ and npm.

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
├── app/                    # App Router pages & routes
│   ├── layout.tsx          # Root layout, fonts, metadata, Navbar/Footer
│   ├── globals.css         # Tailwind layers + brand utilities
│   ├── page.tsx            # Home
│   ├── about/              # About — story, philosophy, remote model
│   ├── services/           # What a CFO Adds
│   ├── engagement/         # Engagement models (retainer / project / ad-hoc)
│   ├── insights/           # Insights index
│   │   └── [slug]/         # Dynamic article detail route
│   ├── tools/              # Finance calculator page
│   ├── contact/            # Contact (form + nationwide coverage graphic)
│   ├── api/contact/        # Stubbed form-submission endpoint
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # SEO robots
├── components/             # Reusable UI (Navbar, Footer, FinanceCalculator, …)
├── lib/
│   ├── site.ts             # Site config & nav
│   ├── content.ts          # Services, CFO signs, testimonials, engagement data
│   └── articles.ts         # Typed Article model + helpers
├── tailwind.config.ts      # Brand colors, fonts, animations
└── ...config files
```

## ✍️ Adding an Insights article

Append a new object to the `articles` array in `lib/articles.ts`:

```ts
{
  slug: "your-post-slug",
  title: "Your Post Title",
  category: "Cash Flow",          // Cash Flow | Funding | Profitability | Tax
  excerpt: "One-line summary for cards and SEO.",
  date: "2026-07-01",             // ISO date — drives ordering and display
  readTime: "5 min read",
  author: "Carron Business Advisory",
  body: `Opening paragraph.

## A subheading

Body text. Blank lines separate paragraphs; lines starting with "## " render as subheadings.`,
}
```

The home teaser, the Insights index, the `/insights/[slug]` route, and the sitemap all pick it up automatically.

## 🔌 Wiring up the contact form

The form posts to `app/api/contact/route.ts`, which currently validates input and
`console.log`s the enquiry. To send real emails, drop in a provider such as
[Resend](https://resend.com) or [SendGrid](https://sendgrid.com) inside that route.

## 🖼️ Imagery

The design uses CSS gradients, textures, and monogram marks rather than bundled
photography, so it runs with no external image dependencies. To add stock imagery,
`images.unsplash.com` is already allow-listed in `next.config.mjs` for `next/image`.

## 📝 Notes

This is a **design demonstration**. The copy and testimonials are illustrative
placeholders in the firm's voice, and nothing on the site constitutes financial,
tax, or legal advice.

---

Built with Next.js · TypeScript · Tailwind CSS · Framer Motion.
