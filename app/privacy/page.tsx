import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Notice (POPIA)",
  description:
    "How Carron Investments (Pty) Ltd, trading as Carron Business Advisory, collects, uses, shares and protects your personal information under the Protection of Personal Information Act (POPIA) — and your rights as a data subject.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "18 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="text-gold-gradient">Notice</span>
          </>
        }
        description="How we collect, use, share and protect your personal information under the Protection of Personal Information Act, 2013 (POPIA) — and the rights you have over your information."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe max-w-3xl">
          <p className="mb-12 border-l-2 border-gold/40 pl-4 text-sm text-bone-dim">
            Responsible party: <strong className="text-bone-muted">Carron Investments (Pty) Ltd</strong>{" "}
            (Registration No. 2017/539242/07), trading as Carron Business Advisory · Last updated {UPDATED}.
          </p>

          <div className="prose-privacy space-y-12 text-bone-muted">
            <Block n="1" title="Who we are (the responsible party)">
              <p>
                In this notice “we”, “us” and “Carron” mean{" "}
                <strong className="text-white">Carron Investments (Pty) Ltd</strong> (Registration
                No. 2017/539242/07), a private company incorporated in South Africa, trading as{" "}
                <strong className="text-white">Carron Business Advisory</strong>. We are the
                “responsible party” for your personal information under POPIA.
              </p>
              <address className="not-italic">
                <strong className="text-white">Location:</strong> Knysna, Western Cape, South Africa
                <br />
                <strong className="text-white">Information Officer:</strong> Carel Gangel
                <br />
                <strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@carron.co.za" className="text-gold hover:text-gold-light">
                  info@carron.co.za
                </a>
                <br />
                <span className="text-bone-dim">A postal address is available on request.</span>
              </address>
            </Block>

            <Block n="2" title="What this notice covers">
              <p>
                This notice applies to personal information we collect through our website,{" "}
                <a href="https://carron.co.za" className="text-gold hover:text-gold-light">
                  carron.co.za
                </a>
                , including our free tools (the Financial Health Check &amp; Valuation, the 90-Day
                Test and Find Your Fit), our paid reports, and our enquiry and contact forms. It does
                not cover third-party websites we may link to, which have their own privacy notices.
              </p>
            </Block>

            <Block n="3" title="What personal information we collect, and why">
              <p>We collect only what we need to provide the service you have asked for:</p>
              <ul>
                <li>
                  <strong className="text-white">Your contact details (name and email address)</strong>{" "}
                  — when you enter them to see a tool result, buy a paid report, or contact us. We use
                  them to deliver your result or report, to reply to you, and — where you have ticked
                  the consent box — to follow up about your result and send you occasional relevant
                  information.
                </li>
                <li>
                  <strong className="text-white">The figures you enter into our tools</strong> — such
                  as revenue, costs and balance-sheet amounts. These are processed to calculate your
                  result. Importantly, we store only a{" "}
                  <strong className="text-white">summary</strong> of the outcome (for example your
                  score, your ratios and an indicative value range) — we do{" "}
                  <strong className="text-white">not</strong> retain the raw underlying financial
                  figures you type in.
                </li>
                <li>
                  <strong className="text-white">Payment information</strong> — when you buy a paid
                  report, payment is processed by our payment provider (Paystack). We do not see or
                  store your card or banking details; we receive only confirmation that a payment
                  succeeded, plus the email address you used.
                </li>
                <li>
                  <strong className="text-white">Technical and usage information</strong> — such as an
                  approximate country derived from your network address and basic, aggregated site
                  analytics. This helps us keep the site working and understand, in aggregate, how it
                  is used.
                </li>
              </ul>
              <p>
                We do not knowingly collect special personal information (as defined in POPIA), and
                our services are intended for business owners, not children.
              </p>
            </Block>

            <Block n="4" title="The lawful basis for processing">
              <p>We process your personal information on these bases under POPIA:</p>
              <ul>
                <li>
                  <strong className="text-white">Your consent</strong> — for recording your details
                  from a free tool and for any follow-up marketing. You give this by ticking the
                  consent box, and you may withdraw it at any time (see “Your rights” below).
                </li>
                <li>
                  <strong className="text-white">Performance of a contract</strong> — to generate and
                  deliver a paid report you have purchased.
                </li>
                <li>
                  <strong className="text-white">Our legitimate interests</strong> — to operate,
                  secure and improve the website, and to respond to enquiries you send us.
                </li>
              </ul>
            </Block>

            <Block n="5" title="Who we share it with (operators and third parties)">
              <p>
                We do not sell your personal information. We share it only with the service providers
                (“operators”) that help us run the business, under agreements requiring them to keep
                it secure and use it only on our instructions:
              </p>
              <ul>
                <li>
                  <strong className="text-white">Cloudflare</strong> — website hosting and the
                  database where opted-in leads and summaries are stored.
                </li>
                <li>
                  <strong className="text-white">Web3Forms</strong> — delivers form submissions to us
                  by email so we are notified of an enquiry or completion.
                </li>
                <li>
                  <strong className="text-white">Paystack</strong> — processes payments for paid
                  reports.
                </li>
                <li>
                  <strong className="text-white">Advertising and analytics providers</strong> (for
                  example Google and Meta) — only where you have consented to non-essential
                  analytics/advertising cookies. Until then, no advertising trackers are loaded.
                </li>
              </ul>
              <p>
                We may also disclose information where the law requires it, or to establish, exercise
                or defend a legal claim.
              </p>
            </Block>

            <Block n="6" title="Where your information is processed (cross-border transfer)">
              <p>
                Some of our operators process data on servers outside South Africa. Where personal
                information is transferred across a border, we do so in accordance with section 72 of
                POPIA — for example where the recipient is subject to laws or binding agreements that
                provide an adequate level of protection, or where the transfer is necessary to perform
                the service you have requested.
              </p>
            </Block>

            <Block n="7" title="How long we keep it">
              <p>
                We keep opted-in contact details for up to{" "}
                <strong className="text-white">24 months</strong> from your last engagement with us,
                unless you become an active client (in which case we keep them for the duration of our
                relationship and any period the law requires) or you ask us to delete them sooner.
                Result summaries are kept on the same basis. When information is no longer needed for
                the purpose it was collected, we delete or de-identify it.
              </p>
            </Block>

            <Block n="8" title="How we protect it">
              <p>
                We take reasonable technical and organisational measures to safeguard your personal
                information against loss, unauthorised access and misuse — including encrypted
                connections, access controls and storing only the minimum information we need. No
                system is perfectly secure, but we act promptly if we become aware of a compromise and
                will notify you and the Information Regulator where the law requires.
              </p>
            </Block>

            <Block n="9" title="Your rights as a data subject">
              <p>Under POPIA you have the right to:</p>
              <ul>
                <li>ask what personal information we hold about you, and request a copy;</li>
                <li>ask us to correct or delete information that is inaccurate or no longer needed;</li>
                <li>object to processing, and withdraw your consent to marketing at any time;</li>
                <li>not receive unsolicited direct marketing — every email includes an unsubscribe;</li>
                <li>
                  complain to the Information Regulator if you believe we have not handled your
                  information properly.
                </li>
              </ul>
              <p>
                To exercise any of these, email{" "}
                <a href="mailto:info@carron.co.za" className="text-gold hover:text-gold-light">
                  info@carron.co.za
                </a>
                . We will respond within a reasonable time and may need to verify your identity first.
              </p>
            </Block>

            <Block n="10" title="Cookies and tracking">
              <p>
                We use only essential cookies needed for the site to function. Non-essential
                analytics and advertising cookies (such as those used to measure ad campaigns) are
                loaded only if and when you give consent, and you can change your choice at any time.
              </p>
            </Block>

            <Block n="11" title="Changes to this notice">
              <p>
                We may update this notice from time to time. The “last updated” date at the top shows
                when it last changed; material changes will be highlighted on this page.
              </p>
            </Block>

            <Block n="12" title="Contact us, or the Information Regulator">
              <p>
                For any privacy question or request, contact our Information Officer, Carel Gangel, at{" "}
                <a href="mailto:info@carron.co.za" className="text-gold hover:text-gold-light">
                  info@carron.co.za
                </a>
                . A postal address is available on request.
              </p>
              <p>
                You also have the right to lodge a complaint with the regulator:
              </p>
              <address className="not-italic">
                <strong className="text-white">The Information Regulator (South Africa)</strong>
                <br />
                JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001
                <br />
                Complaints:{" "}
                <a
                  href="mailto:POPIAComplaints@inforegulator.org.za"
                  className="text-gold hover:text-gold-light"
                >
                  POPIAComplaints@inforegulator.org.za
                </a>
                <br />
                General enquiries:{" "}
                <a
                  href="mailto:enquiries@inforegulator.org.za"
                  className="text-gold hover:text-gold-light"
                >
                  enquiries@inforegulator.org.za
                </a>
                <br />
                <a
                  href="https://inforegulator.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light"
                >
                  inforegulator.org.za
                </a>
              </address>
            </Block>
          </div>

          <p className="mt-16 border-t border-white/10 pt-8 text-sm text-bone-dim">
            This notice is provided for transparency and does not, on its own, constitute legal
            advice. See also our{" "}
            <Link href="/faq" className="text-gold hover:text-gold-light">
              FAQ
            </Link>{" "}
            and{" "}
            <Link href="/contact" className="text-gold hover:text-gold-light">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function Block({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="flex items-baseline gap-3 text-xl font-bold text-white sm:text-2xl">
        <span className="text-base font-semibold text-gold">{n}.</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_address]:mt-3 [&_address]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
