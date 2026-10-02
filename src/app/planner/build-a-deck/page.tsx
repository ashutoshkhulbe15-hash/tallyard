import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Deck Project Planning and Measurement Tools | Tallyard",
  description: "Deck planning links and limited area estimates. No structural design, footing takeoff, complete material list, or current price quote.",
  alternates: { canonical: "/planner/build-a-deck" },
};

export default function DeckPlannerPage() {
  return <>
    <section className="container-wide pt-7 md:pt-10"><div className="pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/planner" className="hover:text-accent transition-colors">Planner</Link><span className="mx-2">·</span><span>Deck</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink"><BannerHeadline text="Plan your deck." /></h1>
      <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">A simple calculator cannot create a safe deck plan from footprint and height alone. Use the surface estimator only for its stated geometry; get structural plans, material specifications, and local approvals separately.</p>
    </div></section>
    <section className="container-content py-10"><div className="guide-prose">
      <h2>Start with the deck surface, then get a design</h2>
      <p>Measure the planned deck footprint in feet and multiply length by width for a simple rectangular surface. A 12 × 16 ft rectangle is 192 sq ft; an L-shaped outline should be divided into non-overlapping rectangles and added. This area is a starting measurement, not a board order: board direction, spacing, edge details, stairs, waste, and product dimensions change the takeoff.</p>
      <ul>
        <li><Link href="/deck-calculator" className="text-accent hover:underline">Deck surface estimator</Link> — area and rough surface-board quantity only.</li>
        <li><Link href="/deck-stair-calculator" className="text-accent hover:underline">Stair geometry estimator</Link> — user-selected geometry, not a cut sheet or code review.</li>
        <li><Link href="/concrete-calculator" className="text-accent hover:underline">Concrete volume calculator</Link> — geometric volume for entered shapes only.</li>
      </ul>
      <p>Before requesting a design or quote, note the dimensions, height above grade, whether and where the deck attaches to the house, planned stairs and guards, site slope, and preferred product. Deck design also depends on loads, spans, connections, ledger attachment, soil and footing conditions, materials, and local requirements. Obtain plans and qualified review and confirm permits with the local authority. Do not build from these calculators.</p>
    </div></section>
  </>;
}
