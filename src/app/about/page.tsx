import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tallyard: who we are and why this exists",
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
      sameAs: ["https://www.linkedin.com/in/ash-k-5baa5016a/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ash K.",
      jobTitle: "Founder",
      image: "https://www.tallyard.com/ash-k.jpg",
      url: "https://www.tallyard.com/about",
      sameAs: ["https://www.linkedin.com/in/ash-k-5baa5016a/"],
      worksFor: {
        "@type": "Organization",
        name: "Tallyard",
        url: "https://www.tallyard.com",
      },
      knowsAbout: [
        "Programmatic web tools",
        "Data-driven reference products",
        "Home improvement cost estimation",
        "Construction material calculations",
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
        <p className="font-mono text-xs text-ink-muted mb-5">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          About <span className="accent-italic">Tallyard</span>
        </h1>

        <div className="space-y-6 text-base text-ink-muted leading-relaxed max-w-prose">
          <p>
            Tallyard builds free calculators, measurement worksheets, and
            buying guides for home improvement projects. Tools vary in scope;
            review each page&apos;s inputs, assumptions, references, and
            limitations. The site does not require an email, phone number, or
            credit card to use its calculators.
          </p>

          <p>
            That is the approach I wanted for project planning: make the
            inputs and limitations easier to inspect, without requiring a
            lead form to use the calculators.
          </p>
        </div>

        {/* Founder section: E-E-A-T: named person with photo and LinkedIn */}
        <div className="mt-12 pt-10 border-t border-line">
          <p className="font-mono text-xs text-ink-muted mb-5">
            Founder
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ash-k.jpg"
              alt="Ash K., founder of Tallyard"
              width={120}
              height={120}
              className="rounded-xl object-cover w-[120px] h-[120px] shrink-0"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">
                Ash K.
              </h2>
              <a
                href="https://www.linkedin.com/in/ash-k-5baa5016a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                LinkedIn →
              </a>
            </div>
          </div>
          <div className="space-y-4 text-base text-ink-muted leading-relaxed max-w-prose mt-6">
            <p>
              I build data-driven web tools. Tallyard started because I
              needed a concrete calculator that showed its working and
              could not find one. Every result on every other site was a
              black box: enter your numbers, get an answer, no idea how
              it was calculated or what assumptions it used. So I built one
              that showed its working. The tools have since expanded to
              cover other planning questions.
            </p>
            <p>
              I am not a contractor, an electrician, or an HVAC technician.
              These tools are not professional designs or trade advice. Some
              pages link to product or industry references; coverage and
              citations vary by tool, so use each page&apos;s references as a
              starting point and confirm current requirements with the
              relevant manufacturer, local authority, or qualified
              professional.
            </p>
            <p>
              Before Tallyard, I built JaankariHub and other reference
              tools that serve millions of users. The approach is the same
              across all of them: find a question people search for, find
              the authoritative source for the answer, build a tool that
              makes the answer accessible without requiring expertise to
              interpret it.
            </p>
          </div>
        </div>

        {/* Editorial process: E-E-A-T: transparency about how content is produced */}
        <div className="mt-12 pt-10 border-t border-line">
          <p className="font-mono text-xs text-ink-muted mb-5">
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
                Calculator pages show the formulas and assumptions used for
                their estimates. Source references are listed where relevant;
                some values vary by product, location, and code edition. Check
                the actual product data and local requirements before buying
                materials or making safety-critical decisions.
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
                recommendations. Calculator inputs are processed entirely in
                your browser. Where a link earns a commission, it is disclosed,
                and it never changes what a calculator returns or which product
                a guide recommends.
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

        {/* The name: E-E-A-T: explains the entity */}
        <div className="mt-12 pt-10 border-t border-line">
          <p className="font-mono text-xs text-ink-muted mb-5">
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
