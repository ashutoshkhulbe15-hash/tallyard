import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to pour concrete?",
  description: "Calculate slab volume and compare complete concrete quotes covering preparation, mix, delivery, placement, finishing, and curing.",
  alternates: { canonical: "/cost-to-pour-concrete" },
};

export default function CostToPourConcrete() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides</nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to pour concrete?</h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Volume is only the material starting point. Preparation, access, reinforcement, delivery, finishing, and curing determine the complete installed price.</p>
      </div></section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>Calculate volume before requesting a price</h2>
        <p>For a uniform rectangular slab, cubic yards equal length in feet × width in feet × thickness in feet ÷ 27. A 12-by-16-foot slab at a nominal 4-inch thickness is 12 × 16 × (4 ÷ 12) ÷ 27, or about 2.37 cubic yards before any allowance for uneven subgrade, thickened edges, or other deviations. Measure the actual form and base; a small thickness change affects the amount ordered. The <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link> can help with an initial volume estimate.</p>
        <p>The <a href="https://www.nrmca.org/wp-content/uploads/2021/01/08pr.pdf">National Ready Mixed Concrete Association explains</a> that ready-mixed concrete is sold by volume and that differences between assumed and actual dimensions can cause apparent shortages. Do not treat the nominal calculation as a guaranteed delivery quantity.</p>
        <h2>Compare the same installed scope</h2>
        <p>Ask each bidder to itemize excavation and disposal, base preparation and compaction, forms, reinforcement if specified, mix requirements, delivery or short-load charges, pumping or wheelbarrow access, placement, finish, joints, curing, permits, and cleanup. The mixture and slab design depend on loads, exposure, local requirements, and the intended use. A driveway, patio, walkway, and structural footing should not be priced as though they are the same slab.</p>
        <h2>Bags or ready-mix?</h2>
        <p>There is no universal 1.5-cubic-yard cutoff at which a truck becomes the cheaper or safer option. Compare the delivered ready-mix quote and its minimum-load fees with the bag quantity, bag yield, equipment, labor, and ability to place and finish the concrete continuously. The <a href="https://www.nrmca.org/wp-content/uploads/2021/01/31pr.pdf">NRMCA&apos;s ordering guidance</a> stresses matching the mixture and delivery to the project requirements. Ask a concrete professional about mix, placement, joints, and curing before committing to a substantial slab.</p>
        <p>This page does not state a universal 2026 price per square foot because no current, project-matched survey has been verified for it. Obtain local written quotes for the same specifications and site conditions; an online volume estimate cannot inspect your subgrade or determine structural adequacy.</p>
        <h2>Sources and limits</h2>
        <p>NRMCA publications support the volume and ordering discussion above. The worked example is geometry, not a quote or construction specification.</p>
      </div></section>
    </article>
  );
}
