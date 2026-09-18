import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "PAIA Manual",
  description:
    "Manual of Carron Investments (Pty) Ltd, trading as Carron Business Advisory, under section 51 of the Promotion of Access to Information Act, 2000 (PAIA) — the records we hold, how to request access, and your rights.",
  alternates: { canonical: "/paia" },
};

const UPDATED = "18 September 2026";

export default function PaiaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={
          <>
            PAIA <span className="text-gold-gradient">Manual</span>
          </>
        }
        description="Manual under section 51 of the Promotion of Access to Information Act, 2000 (PAIA) — the records we hold, how to request access to information, and how this connects to your privacy rights under POPIA."
      />

      <section className="bg-emerald-base py-24 sm:py-32">
        <div className="container-luxe max-w-3xl">
          <p className="mb-6 border-l-2 border-gold/40 pl-4 text-sm text-bone-dim">
            Private body: <strong className="text-bone-muted">Carron Investments (Pty) Ltd</strong>{" "}
            (Registration No. 2017/539242/07), trading as Carron Business Advisory · Prepared under
            PAIA section 51 · Last updated {UPDATED}.
          </p>
          <p className="mb-12">
            <a
              href="/paia-manual.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
            >
              <svg className="h-4 w-4 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download this manual (PDF)
            </a>
          </p>

          <div className="space-y-12 text-bone-muted">
            <Block n="1" title="Introduction and purpose">
              <p>
                This manual is published in terms of section 51 of the{" "}
                <strong className="text-white">Promotion of Access to Information Act, 2 of 2000
                (PAIA)</strong>. PAIA gives effect to the constitutional right of access to
                information. It sets out the records held by Carron Investments (Pty) Ltd, trading as
                Carron Business Advisory (“Carron”, “we”, “us”), and how a person may request access
                to them.
              </p>
              <p>
                It also reflects our obligations as a “responsible party” under the{" "}
                <strong className="text-white">Protection of Personal Information Act, 4 of 2013
                (POPIA)</strong> — how we process personal information is described in full in our{" "}
                <Link href="/privacy" className="text-gold hover:text-gold-light">
                  Privacy Notice
                </Link>
                .
              </p>
            </Block>

            <Block n="2" title="Particulars of the private body">
              <address className="not-italic">
                <strong className="text-white">Registered name:</strong> Carron Investments (Pty) Ltd
                <br />
                <strong className="text-white">Trading as:</strong> Carron Business Advisory
                <br />
                <strong className="text-white">Registration number:</strong> 2017/539242/07
                <br />
                <strong className="text-white">Nature of business:</strong> Fractional and outsourced
                CFO advisory services to South African SMEs
                <br />
                <strong className="text-white">Information Officer:</strong> Carel Gangel
                <br />
                <strong className="text-white">Location:</strong> Knysna, Western Cape, South Africa
                <br />
                <strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@carron.co.za" className="text-gold hover:text-gold-light">
                  info@carron.co.za
                </a>
                <br />
                <strong className="text-white">Website:</strong>{" "}
                <a href="https://carron.co.za" className="text-gold hover:text-gold-light">
                  carron.co.za
                </a>
                <br />
                <span className="text-bone-dim">A postal address is available on request.</span>
              </address>
              <p>
                All PAIA requests and privacy queries should be directed to the Information Officer at
                the email above.
              </p>
            </Block>

            <Block n="3" title="The Information Regulator">
              <p>
                The Information Regulator oversees both PAIA and POPIA. You may contact it, or lodge a
                complaint, at:
              </p>
              <address className="not-italic">
                <strong className="text-white">The Information Regulator (South Africa)</strong>
                <br />
                JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001
                <br />
                PAIA:{" "}
                <a
                  href="mailto:PAIAComplaints@inforegulator.org.za"
                  className="text-gold hover:text-gold-light"
                >
                  PAIAComplaints@inforegulator.org.za
                </a>
                <br />
                POPIA:{" "}
                <a
                  href="mailto:POPIAComplaints@inforegulator.org.za"
                  className="text-gold hover:text-gold-light"
                >
                  POPIAComplaints@inforegulator.org.za
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

            <Block n="4" title="The Guide on how to use PAIA">
              <p>
                The Information Regulator has compiled a Guide, in terms of section 10 of PAIA, on how
                to use the Act. It is available in each official language from the Information
                Regulator at the contact details above, or on its website.
              </p>
            </Block>

            <Block n="5" title="Records we hold, by category">
              <p>
                We hold the following broad categories of records. Access to any record remains
                subject to the grounds for refusal in Chapter 4 of PAIA (see section 8) — in
                particular the mandatory protection of other people’s personal information and of
                confidential commercial information.
              </p>
              <ul>
                <li>
                  <strong className="text-white">Statutory and company records</strong> —
                  incorporation documents, the Memorandum of Incorporation, CIPC filings, share
                  register, and directors’ and members’ records.
                </li>
                <li>
                  <strong className="text-white">Financial records</strong> — accounting records,
                  bank statements, invoices, management accounts and annual financial statements.
                </li>
                <li>
                  <strong className="text-white">Tax records</strong> — income-tax records and related
                  correspondence with SARS (we are not registered for VAT).
                </li>
                <li>
                  <strong className="text-white">Client and engagement records</strong> — engagement
                  letters, correspondence, advisory deliverables, and financial information that
                  clients share with us in confidence.
                </li>
                <li>
                  <strong className="text-white">Website and marketing records</strong> — the details
                  captured through our online tools and forms (name, email address and a summary of a
                  tool result), as described in our Privacy Notice. We do not retain the raw financial
                  figures entered into the tools.
                </li>
                <li>
                  <strong className="text-white">Supplier and service-provider records</strong> —
                  agreements and correspondence with our operators (for example hosting, payment and
                  form-delivery providers).
                </li>
                <li>
                  <strong className="text-white">Personnel records</strong> — records relating to any
                  employees or contractors, where applicable.
                </li>
              </ul>
            </Block>

            <Block n="6" title="Records accessible in terms of other legislation">
              <p>
                Certain records may be accessed, or must be kept, under other laws — for example the
                Companies Act, 71 of 2008; the Income Tax Act, 58 of 1962; POPIA; the Basic Conditions
                of Employment Act; the Labour Relations Act; the Unemployment Insurance Act; the
                Compensation for Occupational Injuries and Diseases Act; the Electronic Communications
                and Transactions Act, 25 of 2002; and the Consumer Protection Act, 68 of 2008 — each
                where and to the extent it applies. Access under those laws follows their own
                procedures, not PAIA.
              </p>
            </Block>

            <Block n="7" title="Records available without a PAIA request">
              <p>
                Some information is already freely available and does not require a formal request —
                for example the content published on our website, our service descriptions, insight
                articles, and this manual.
              </p>
            </Block>

            <Block n="8" title="How to request access to a record">
              <p>To request access to a record we hold, please:</p>
              <ul>
                <li>
                  complete the prescribed <strong className="text-white">Form 2 (Request for Access to
                  Record of Private Body)</strong>, available from the Information Regulator’s website;
                </li>
                <li>
                  send it to the Information Officer at{" "}
                  <a href="mailto:info@carron.co.za" className="text-gold hover:text-gold-light">
                    info@carron.co.za
                  </a>
                  ;
                </li>
                <li>
                  provide enough detail to identify the record and the form of access you want, and a
                  contact address;
                </li>
                <li>
                  if you are requesting the record on behalf of someone else, provide proof of your
                  authority;
                </li>
                <li>pay the prescribed request fee, and any access fee, as set out in section 10.</li>
              </ul>
              <p>
                We will ordinarily decide on the request within{" "}
                <strong className="text-white">30 days</strong>, and will tell you the decision, any
                fee payable, and your rights to appeal or apply to court. This period may be extended
                in the limited circumstances PAIA allows (for example where the request covers a large
                number of records).
              </p>
            </Block>

            <Block n="9" title="Grounds on which access may be refused">
              <p>
                We must or may refuse access on the grounds set out in Chapter 4 of PAIA. These
                include the mandatory protection of:
              </p>
              <ul>
                <li>another person’s personal information (their privacy);</li>
                <li>
                  confidential commercial information of a third party or of Carron (trade secrets,
                  financial, commercial, scientific or technical information);
                </li>
                <li>information supplied in confidence, or subject to legal professional privilege;</li>
                <li>records whose disclosure would endanger a person’s life or safety.</li>
              </ul>
              <p>
                Where only part of a record is protected, we will give access to the remainder where
                it is reasonably possible to separate it.
              </p>
            </Block>

            <Block n="10" title="Fees">
              <p>
                PAIA provides for a request fee, an access fee (calculated on the time and materials
                needed to prepare the record), and in some cases a deposit. The amounts are those
                prescribed in the PAIA Regulations, as amended from time to time. The current fees, and
                how they apply to your request, are available from the Information Officer on request.
              </p>
            </Block>

            <Block n="11" title="If you are unhappy with a decision (remedies)">
              <p>
                PAIA does not provide an internal appeal against a private body’s decision. If we
                refuse a request, or you are dissatisfied with how it was handled, you may lodge a
                complaint with the Information Regulator, or apply to a court for appropriate relief,
                within the periods PAIA allows.
              </p>
            </Block>

            <Block n="12" title="Processing of personal information (POPIA)">
              <p>
                As a responsible party under POPIA, we process personal information — principally the
                name, email address and result summary of people who use our tools or contact us — for
                the purposes of providing our services, responding to enquiries and, with consent,
                following up. The categories of data subjects, the personal information involved, the
                recipients (our operators), any cross-border transfers, and the security measures we
                apply are set out in full in our{" "}
                <Link href="/privacy" className="text-gold hover:text-gold-light">
                  Privacy Notice
                </Link>
                , which forms part of this manual.
              </p>
            </Block>

            <Block n="13" title="Availability of this manual">
              <p>
                This manual is available free of charge on this website, and on request from the
                Information Officer. A copy will be provided to the Information Regulator on request.
              </p>
            </Block>
          </div>

          <p className="mt-16 border-t border-white/10 pt-8 text-sm text-bone-dim">
            This manual is provided for transparency and PAIA compliance and does not, on its own,
            constitute legal advice. See also our{" "}
            <Link href="/privacy" className="text-gold hover:text-gold-light">
              Privacy Notice
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
