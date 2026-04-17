import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use — Tallyard",
  description:
    "Terms governing use of Tallyard calculators and guides. Estimates are for planning, not engineering.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-content py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
        Legal
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Terms of use
      </h1>
      <p className="text-sm text-ink-faint mb-10">
        Last updated: April 18, 2026
      </p>

      <div className="space-y-8 text-base text-ink-muted leading-relaxed max-w-prose">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            What Tallyard provides
          </h2>
          <p>
            Tallyard publishes free online calculators and editorial guides
            related to home improvement, construction, and DIY projects.
            These tools provide material estimates and informational
            content for planning purposes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Not professional advice
          </h2>
          <p>
            Tallyard calculators produce estimates, not engineering
            specifications, construction documents, or professional advice.
            Results depend on your inputs and on assumptions that may not
            match your specific project conditions. For structural work,
            electrical wiring, plumbing, permitting, or anything where
            safety is at stake, consult a licensed professional. Tallyard
            is not a substitute for a contractor, engineer, architect, or
            building inspector.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Accuracy and limitations
          </h2>
          <p>
            We make every reasonable effort to ensure calculators produce
            accurate estimates based on current manufacturer specifications
            and industry standards. However, material costs, coverage
            rates, and building code requirements vary by region and change
            over time. Always verify quantities against your actual
            material specifications before purchasing. Always verify code
            requirements with your local building authority before
            beginning work.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Limitation of liability
          </h2>
          <p>
            Tallyard is provided &ldquo;as is&rdquo; without warranty of
            any kind, express or implied. Tallyard, its founder, and its
            contributors are not liable for material shortages, overages,
            project cost overruns, structural failures, or any other
            outcomes resulting from use of calculator results or guide
            recommendations. Use at your own risk and judgment.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Intellectual property
          </h2>
          <p>
            Content on this site, including calculator code, guide text,
            visual design, and illustrations, is the property of Tallyard.
            You may share links to any page. You may not reproduce
            substantial portions of guide content without permission.
            Calculator formulas themselves (the math) are not proprietary;
            our specific implementations and explanations are.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            External links
          </h2>
          <p>
            Tallyard may link to external sites (manufacturer pages,
            government resources, code references) for sourcing purposes.
            We do not control and are not responsible for the content,
            availability, or privacy practices of external sites.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Changes to terms
          </h2>
          <p>
            We may update these terms. Material changes will be reflected
            in the &ldquo;last updated&rdquo; date above. Continued use
            of the site after changes constitutes acceptance of updated
            terms.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Contact
          </h2>
          <p>
            Questions about these terms? Email{" "}
            <a
              href="mailto:hello@tallyard.com"
              className="text-accent hover:underline"
            >
              hello@tallyard.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
