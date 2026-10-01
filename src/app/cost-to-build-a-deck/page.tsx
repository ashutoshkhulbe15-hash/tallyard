import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to build a deck?",
  description: "Compare complete deck bids by size, structure, decking, stairs, railings, permits, and site conditions, with a dated national benchmark.",
  alternates: { canonical: "/cost-to-build-a-deck" },
};

export default function CostToBuildADeck() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides</nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to build a deck?</h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">The decking boards are only one part of the price. Compare the same structure, site work, access, stairs, guards, and finish in every quote.</p>
      </div></section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>Use a dated reference, not a universal price</h2>
        <p>The <a href="https://www.jlconline.com/cost-vs-value/2025/national/">2025 Cost vs. Value report</a> lists national average job costs of $18,263 for its defined wood-deck addition and $25,096 for its defined composite-deck addition. These are 2025 report benchmarks for specific project scopes, not 2026 contractor quotes. Deck height, size, soil, access, local code, material line, and included features can change the price substantially.</p>
        <h2>Specify the whole build</h2>
        <p>Give each bidder the same dimensions and ask for a plan showing footings, posts, beams, joists, attachment to the house or freestanding design, decking, stairs, guards, hardware, and drainage details. Get demolition, disposal, grading, permits, inspections, lighting, and finishing listed separately. An elevated or unusually configured deck may need an engineered design; do not infer structural adequacy from an online material estimate.</p>
        <p>For a simple quantity example, a 12-by-16-foot rectangle has 192 square feet of plan area. It does not follow that every 192-square-foot deck has the same material or installation cost. The <Link href="/deck-calculator" className="text-accent hover:underline">deck calculator</Link> can start a takeoff, but a designer or qualified contractor must verify the structure and local requirements.</p>
        <h2>Safety and quote checks</h2>
        <p>The <a href="https://awc.org/collection/design-for-code-acceptance/">American Wood Council&apos;s deck construction guidance</a> explains prescriptive details for certain residential wood decks; its scope and the locally adopted code must be checked for your project. Pay particular attention to the load path, footings, lateral attachment, stairs, and guards. Ask the contractor to identify the applicable code edition and to show how the design is approved.</p>
        <p>The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam">FTC recommends multiple written estimates</a> describing the work, materials, schedule, and price. Compare exclusions as carefully as totals, and require written approval for changes. The lowest number is not necessarily the lowest final cost if it omits required work.</p>
        <h2>Source and limits</h2>
        <p>Only the two dated national benchmark figures above are taken from the publisher&apos;s report. They should not be applied as a per-square-foot rate or resale guarantee for a different design. Current local written bids are needed to price your deck.</p>
      </div></section>
    </article>
  );
}
