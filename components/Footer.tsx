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
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-emerald-deep">
      <div className="container-luxe py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone-muted">
              Fractional and outsourced CFO services for South African SMEs.
              Senior financial leadership, delivered remotely, countrywide.
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

          <FooterColumn title="What a CFO Adds">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.slug} href="/services">
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-bone-muted transition-colors hover:text-gold"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.phoneHref}
                className="text-bone-muted transition-colors hover:text-gold"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="pt-2 text-bone-muted">{siteConfig.location}</li>
            <FooterLink href="/tools">Finance calculator</FooterLink>
            <FooterLink href="/diagnostic">Financial Performance Diagnostic</FooterLink>
          </FooterColumn>
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-bone-dim sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-center sm:text-right">
            Serving SMEs remotely across South Africa. Information on this site
            is general and does not constitute financial, tax, or legal advice.
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
        className="text-bone-muted transition-colors duration-300 hover:text-gold"
      >
        {children}
      </Link>
    </li>
  );
}
