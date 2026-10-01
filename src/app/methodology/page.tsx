import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology and limitations",
  description: "How to read Tallyard's planning worksheets, their inputs and assumptions, and where independent project verification is required.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <main className="container-content py-12 md:py-16">
      <p className="font-mono text-xs text-ink-muted mb-5">Methodology</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">How to use these <span className="accent-italic">worksheets</span></h1>
      <p className="text-base text-ink-muted leading-relaxed max-w-prose mb-10">Tallyard tools are limited planning aids. Each page should be read on its own terms: identify the inputs, units, assumptions, outputs, and stated limitations before applying a result to a real project.</p>
      <div className="space-y-10 max-w-prose text-base text-ink-muted leading-relaxed">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">Inputs and arithmetic</h2>
          <p>Use measured project dimensions and values from the exact product label, quote, or project documents where requested. Check that units match. Some worksheets perform geometric conversions or arithmetic only; others may include an illustrative or editable assumption. Do not treat a default as a recommendation, verified product specification, or universal standard.</p>
          <p className="mt-3">Review the individual page for its formula or explanation. Inputs, coverage, rounding, included items, and limitations differ by tool; a formula or source is not necessarily applicable to every project.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">Sources and changing requirements</h2>
          <p>Where references are provided, they are starting points for checking the cited topic. Product data can change, codes and amendments vary by jurisdiction, and external references may be revised. Confirm current product instructions and applicable requirements with the manufacturer, local authority, supplier, or qualified professional.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">Planning estimates are not approvals</h2>
          <p>These tools do not replace a site inspection, coordinated takeoff, engineering, electrical or plumbing design, permit review, trade quote, or professional advice. Site conditions, waste, access, labor, availability, local rules, and product installation requirements may materially change the result. Obtain written, project-specific bids and approved documents where needed.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">Buying guides</h2>
          <p>Guides describe considerations and references for the specific topic on each page. They do not establish a universal product winner, lifespan, savings amount, or local price. Compare exact products and complete written project scope, and verify current details directly with the relevant source.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold tracking-tight text-ink mb-3">Corrections and questions</h2>
          <p>If you find a calculation, source, or description that needs correction, contact <a className="text-accent hover:underline" href="mailto:hello@tallyard.com?subject=Correction">hello@tallyard.com</a> with the page and relevant details.</p>
        </section>
      </div>
    </main>
  );
}
