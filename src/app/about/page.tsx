import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tallyard — who we are and why this exists",
  description:
    "Tallyard was founded by Ash K. to build free, transparent home improvement calculators. Learn about our editorial process, sourcing standards, and what we don't do.",
  alternates: { canonical: "/about" },
};

function AboutSchema() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tallyard",
      url: "https://www.tallyard.com",
      description:
        "Free, transparent home improvement calculators and guides.",
      founder: {
        "@type": "Person",
        name: "Ash K.",
        jobTitle: "Founder",
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ash K.",
      jobTitle: "Founder",
      worksFor: {
        "@type": "Organization",
        name: "Tallyard",
        url: "https://www.tallyard.com",
      },
      knowsAbout: [
        "Home improvement cost estimation",
        "Construction material calculations",
        "HVAC system sizing",
        "Residential building codes",
      ],
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutSchema />

      <div className="container-content py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          About <span className="accent-italic">Tallyard</span>
        </h1>

        <div className="space-y-6 text-base text-ink-muted leading-relaxed max-w-prose">
          <p>
            Tallyard builds free calculators and buying guides for home
            improvement projects. Every tool shows its formula, every
            guide shows its math, and nothing on this site asks for your
            email, phone number, or credit card.
          </p>

          <p>
            That sounds like an obvious approach, but it&apos;s not how
            most of the internet works. Most online calculators exist to
            collect your contact information and sell it to contractors.
            Most comparison articles exist to send you to a lead form.
            Tallyard exists because somebody needed to just show the math
            and get out of the way.
          </p>
        </div>

        {/* Founder section — E-E-A-T: named person with expertise context */}
        <div className="mt-12 pt-10 border-t border-line">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Founder
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Ash K.
          </h2>
          <div className="space-y-4 text-base text-ink-muted leading-relaxed max-w-prose">
            <p>
              Ash K. is the founder and editor of Tallyard. He started
              the project after spending an afternoon trying to figure out
              how many bags of concrete he needed for a set of fence post
              footings and finding that every online calculator either
              asked him to sign up, hid the formula, or gave a different
              answer.
            </p>
            <p>
              Ash has been building digital products for over five years,
              with a focus on tools that solve real problems for people
              who aren&apos;t being served well by existing options. He
              researches each calculator&apos;s formulas against
              manufacturer specifications, building codes (IRC, IPC,
              NEC), and industry references (ACCA, NADRA, APA) before
              publishing.
            </p>
            <p>
              He personally reviews and fact-checks every guide, with
              operating cost data sourced from the EIA, efficiency ratings
              from Energy Star&apos;s qualified product database, and
              installation costs cross-referenced against HomeGuide, Angi,
              and contractor bid data.
            </p>
          </div>
        </div>

        {/* Editorial process — E-E-A-T: transparency about how content is produced */}
        <div className="mt-12 pt-10 border-t border-line">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Editorial process
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            How we build calculators and write guides
          </h2>
          <div className="space-y-5 text-base text-ink-muted leading-relaxed max-w-prose">
            <div>
              <h3 className="text-base font-semibold text-ink mb-1">
                Calculator formulas
              </h3>
              <p>
                Every formula is derived from manufacturer specifications,
                industry standards, or building codes. Coverage rates (how
                much a gallon of paint covers, how many bricks per square
                foot) are sourced from product data sheets, not guesswork.
                Each calculator&apos;s methodology section cites specific
                sources so you can check our work.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-ink mb-1">
                Guide research
              </h3>
              <p>
                Buying guides are researched against current pricing data
                (Angi, HomeGuide, NerdWallet cost reports), manufacturer
                technical specifications (James Hardie, Trex, Mitsubishi),
                federal program details (IRS Form 5695, DOE HEEHRA program
                pages), and building codes (IRC 2021, IPC 2021). Total cost
                of ownership calculations show their assumptions explicitly
                so readers can adjust for their situation.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-ink mb-1">
                What we don&apos;t do
              </h3>
              <p>
                We don&apos;t accept payment from manufacturers, retailers,
                or contractors to influence calculator results or guide
                recommendations. We don&apos;t collect personal information.
                We don&apos;t run affiliate links. Calculator inputs are
                processed entirely in your browser. We have no financial
                relationship with any brand mentioned on this site.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-ink mb-1">
                Corrections
              </h3>
              <p>
                If you find a formula error, an outdated cost figure, or a
                factual mistake in any calculator or guide, email{" "}
                <a
                  href="mailto:hello@tallyard.com"
                  className="text-accent hover:underline"
                >
                  hello@tallyard.com
                </a>
                . We review and update within 48 hours for confirmed errors.
                Calculator updates note the correction in the methodology
                section.
              </p>
            </div>
          </div>
        </div>

        {/* The name — E-E-A-T: explains the entity */}
        <div className="mt-12 pt-10 border-t border-line">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Why &ldquo;Tallyard&rdquo;
          </p>
          <p className="text-base text-ink-muted leading-relaxed max-w-prose">
            A tallyard is an old English word for a measuring rod used in
            construction. Builders carried one to measure lengths, check
            squareness, and verify that materials fit before committing to
            a cut. The name fits what this site does: measure twice, cut
            once.
          </p>
        </div>
      </div>
    </>
  );
}
