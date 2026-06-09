import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/content";
import { Logo } from "./Logo";

const socials = [
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.97V21h-4z",
  },
  {
    label: "X",
    href: siteConfig.social.x,
    path: "M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.1L9 21H5.8l7.5-8.6L5.3 3h6.6l4.5 5.6zM16.4 19h1.8L8.1 5H6.2z",
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    path: "M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.4a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zM16.8 6a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2zM12 4.6c2.4 0 2.7 0 3.6.05 2.5.11 3.66 1.29 3.77 3.77.04.93.05 1.2.05 3.58s0 2.65-.05 3.58c-.11 2.47-1.26 3.66-3.77 3.77-.93.04-1.2.05-3.6.05s-2.67 0-3.6-.05c-2.5-.11-3.66-1.3-3.77-3.77C4.6 14.65 4.6 14.38 4.6 12s0-2.65.05-3.58C4.76 5.94 5.92 4.76 8.4 4.65 9.33 4.6 9.6 4.6 12 4.6zM12 3C9.56 3 9.25 3 8.3 3.05 4.95 3.2 3.2 4.94 3.05 8.3 3 9.25 3 9.56 3 12s0 2.75.05 3.7c.15 3.36 1.9 5.1 5.25 5.25.95.05 1.26.05 3.7.05s2.75 0 3.7-.05c3.35-.15 5.1-1.89 5.25-5.25.05-.95.05-1.26.05-3.7s0-2.75-.05-3.7c-.15-3.36-1.9-5.1-5.25-5.25C14.75 3 14.44 3 12 3z",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-emerald-deep">
      <div className="container-luxe py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">
              {siteConfig.tagline} A boutique advisory firm for families and
              institutions who measure success in generations.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gold transition-all duration-300 hover:border-gold/50 hover:bg-gold/10"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navigate">
            {navLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.slice(0, 5).map((s) => (
              <FooterLink key={s.slug} href="/services">
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-stone-400 transition-colors hover:text-gold"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className="text-stone-400 transition-colors hover:text-gold"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="pt-2 text-stone-400">{siteConfig.address.line1}</li>
            <li className="text-stone-400">{siteConfig.address.line2}</li>
          </FooterColumn>
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-center sm:text-right">
            Advisory services illustrative only. This site is a design
            demonstration and does not constitute financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-stone-400 transition-colors duration-300 hover:text-gold"
      >
        {children}
      </Link>
    </li>
  );
}
