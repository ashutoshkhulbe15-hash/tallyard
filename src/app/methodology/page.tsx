import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — how Tallyard calculators work",
  description:
    "Every Tallyard calculator shows its formula and cites its sources. Learn how we derive coverage rates, sizing factors, and rounding rules.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="container-content py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
        Methodology
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        How Tallyard calculators <span className="accent-italic">work</span>
      </h1>

      <p className="text-base text-ink-muted leading-relaxed max-w-prose mb-10">
        Every calculator on this site follows the same three principles:
        the formula is public, the sources are cited, and the answer is
        shown with its supporting math. This page explains how we put
        those principles into practice.
      </p>

      <div className="space-y-10 max-w-prose">
        {/* Formulas */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">
            Formulas
          </h2>
          <div className="space-y-3 text-base text-ink-muted leading-relaxed">
            <p>
              Each calculator&apos;s formula is displayed directly on the
              page, in the &ldquo;Show the math&rdquo; section below the
              result. You see every input, every intermediate step, and the
              final result. If we apply a waste factor, a rounding rule, or
              a coverage rate, it appears explicitly in the calculation
              steps.
            </p>
            <p>
              For example, the paint calculator uses:{" "}
              <span className="font-mono text-sm text-ink bg-bg-warm px-1.5 py-0.5 rounded">
                gallons = (perimeter × height − doors × 20 − windows × 15) × coats ÷ coverage
              </span>
              , where coverage defaults to 350 sq ft/gal (one coat, smooth
              surface). The formula, the default, and the source of the
              coverage rate are all visible.
            </p>
          </div>
        </div>

        {/* Sources */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">
            Sources
          </h2>
          <div className="space-y-3 text-base text-ink-muted leading-relaxed">
            <p>
              Coverage rates, sizing factors, and code requirements are
              sourced from four categories, listed in order of preference:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong className="text-ink">Manufacturer product data.</strong>{" "}
                Coverage per gallon (paint), yield per bag (concrete),
                capacity per unit (air conditioning tonnage). These come
                directly from product data sheets published by
                manufacturers like Benjamin Moore, Quikrete, Trane, and
                James Hardie.
              </li>
              <li>
                <strong className="text-ink">Building codes.</strong>{" "}
                Stair rise and run limits (IRC R311.7), egress window
                minimums (IRC R310), drain pipe sizing (IPC Table 710.1),
                insulation R-values by climate zone (IECC Table R402.1.2).
                We cite the specific code section for every code-derived
                value.
              </li>
              <li>
                <strong className="text-ink">Industry standards.</strong>{" "}
                ACCA Manual J for HVAC load calculations, APA for
                engineered wood, NADRA for deck construction, NKBA for
                kitchen layout. These fill gaps between manufacturer data
                and building codes.
              </li>
              <li>
                <strong className="text-ink">Aggregated cost data.</strong>{" "}
                For cost estimates in guides, we use HomeGuide, Angi,
                NerdWallet cost reports, and EIA energy pricing. We note
                the source date and identify that cost data is approximate
                and regionally variable.
              </li>
            </ol>
            <p>
              Every calculator page links to its specific sources at the
              bottom. If a source goes stale (manufacturer updates a
              product line, code gets revised), we update the calculator
              and note it in the methodology section.
            </p>
          </div>
        </div>

        {/* Rounding */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">
            Rounding
          </h2>
          <div className="space-y-3 text-base text-ink-muted leading-relaxed">
            <p>
              Calculator results are rounded up to practical purchase
              units. You can&apos;t buy 2.67 gallons of paint, and ordering
              5.4 cubic yards of concrete is a recipe for a short pour. So
              we round the result to the nearest buyable quantity and show
              both the raw and rounded numbers.
            </p>
            <p>
              Waste factors are applied before rounding. A 10% waste factor
              on 4.8 cubic yards of concrete becomes 5.28, rounded to 5.5.
              The waste factor is always displayed in the formula steps so
              you can remove it if you&apos;re confident in your
              measurements.
            </p>
          </div>
        </div>

        {/* What we don't do */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">
            What calculators are not
          </h2>
          <div className="space-y-3 text-base text-ink-muted leading-relaxed">
            <p>
              Tallyard calculators produce material estimates for planning.
              They are not engineering specifications, structural
              calculations, permit applications, or professional
              assessments. Several important things they do not account
              for:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Site-specific conditions (soil type, grading, drainage,
                existing structural problems)
              </li>
              <li>
                Local code amendments that differ from the model codes we
                reference
              </li>
              <li>
                Material availability and pricing in your specific market
              </li>
              <li>
                Labor costs, permit fees, and inspection requirements
              </li>
              <li>
                Structural load calculations (always get an engineer for
                load-bearing work)
              </li>
            </ul>
            <p>
              For structural, electrical, plumbing, or anything where
              safety is involved, hire a licensed professional. The
              calculator gives you a starting estimate for budgeting and
              material ordering; the professional gives you the final
              answer.
            </p>
          </div>
        </div>

        {/* Guide methodology */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">
            How guides are researched
          </h2>
          <div className="space-y-3 text-base text-ink-muted leading-relaxed">
            <p>
              Buying guides follow a separate process. Each guide is
              researched by the founder (Ash K.) against current industry
              data, with total-cost-of-ownership calculations showing their
              assumptions explicitly. Guide methodology notes (expandable at
              the top of each article) disclose energy price sources, cost
              data vintage, and modeling limitations. Sources are linked at
              the bottom.
            </p>
            <p>
              Guides do not accept sponsored content, paid placements, or
              affiliate commissions. Manufacturer names appear only when
              relevant to the recommendation (naming a specific cold-climate
              heat pump model, for example). No manufacturer pays for
              inclusion.
            </p>
          </div>
        </div>

        {/* Corrections */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">
            Corrections
          </h2>
          <p className="text-base text-ink-muted leading-relaxed">
            Found an error? Email{" "}
            <a
              href="mailto:hello@tallyard.com"
              className="text-accent hover:underline"
            >
              hello@tallyard.com
            </a>{" "}
            with the calculator name, what you expected, and what you got.
            We investigate and correct confirmed errors within 48 hours,
            noting the correction in the calculator&apos;s methodology
            section.
          </p>
        </div>
      </div>
    </div>
  );
}
