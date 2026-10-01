import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to paint a house?",
  description: "Compare house-painting estimates by measured surface, preparation, repairs, coating system, access, and cleanup.",
  alternates: { canonical: "/cost-to-paint-a-house" },
};

export default function CostToPaintHouse() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides</nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to paint a house?</h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Price depends on the area being painted and its condition. Compare bids that describe the same preparation, repairs, coating, and access.</p>
      </div></section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>Separate interior and exterior scopes</h2>
        <p>Interior estimates should identify rooms and surfaces, ceiling height, number of coats, patching, furniture protection, trim and doors, primer, and cleanup. Exterior estimates should specify measured siding or masonry area, scraping and sanding, caulking, repairs, primer, coats, masking, ladders or lifts, weather constraints, and cleanup. House floor area alone is not the paintable surface area.</p>
        <h2>Compare the written bids line by line</h2>
        <p>Ask bidders to name the coating manufacturer and product line, sheen, preparation steps, number of coats, included repairs, and exclusions. Confirm whether the quoted price includes materials, labor, taxes, and disposal. A low price can reflect a different prep or coating scope, so do not compare totals without those details.</p>
        <p>For an initial material quantity, the <Link href="/paint-calculator" className="text-accent hover:underline">paint calculator</Link> estimates gallons from the dimensions and coverage assumptions you enter. Check the product label for its coverage and surface preparation instructions. The <Link href="/planner/paint-a-room" className="text-accent hover:underline">room painting planner</Link> helps list materials and tasks. Neither estimates current local contractor labor prices.</p>
        <h2>Primer and surface condition</h2>
        <p>Primer choice depends on the substrate, stains, prior coating, and the finish paint system. Follow the coating manufacturer&apos;s instructions and ask the contractor to specify where primer is included. This guide does not assign a universal cost saving or lifespan to a paint grade: coverage and service life depend on the product, surface, application, exposure, and maintenance.</p>
        <h2>Source and limits</h2>
        <p>No current, project-matched national painting-price dataset was verified for this guide, so it does not publish a generic 2026 price range. Obtain local written bids for your surfaces and condition.</p>
      </div></section>
    </article>
  );
}
