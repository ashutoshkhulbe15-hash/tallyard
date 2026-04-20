import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import RoofPlannerClient from "./RoofPlanner";

export const metadata: Metadata = {
  title: "Replace a roof — complete material planner",
  description: "Plan a full roof replacement: shingles, underlayment, ventilation, gutters, and tear-off. Complete material list with quote comparison.",
  alternates: { canonical: "/planner/replace-a-roof" },
};

export default function RoofPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Roof</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your roof replacement." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your house footprint and pitch. Get shingles, underlayment, ventilation, gutters, and tear-off materials.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12"><RoofPlannerClient /></section>

      <section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>What happens during a roof replacement</h2>

            <p>A roof replacement is one of the most expensive home improvements and one of the fastest. A professional crew of 4 to 6 can tear off and reshingle a standard 2,000-square-foot roof in 2 to 3 days. The speed is deceptive. A lot of decisions need to happen before day one, and several of them affect the final cost by thousands of dollars.</p>

            <h3>Getting bids: what to compare</h3>
            <p>Get three bids minimum. Every bid should itemize separately: shingles (by brand, model, and color), underlayment type (synthetic felt vs 30-lb felt), ice and water shield (required at eaves in cold climates), drip edge, ridge vent, pipe boots, step flashing, and the dumpster. If a bid lumps everything into one line item per square, ask for an itemized breakdown. The difference between a $9,000 bid and a $13,000 bid is usually in the accessories, not the shingles. A contractor who skips ice and water shield or uses 15-lb felt instead of synthetic saves $400 and costs you a leak in three winters.</p>

            <h3>Day 1: Tear-off and underlayment</h3>
            <p>The crew strips old shingles into a dumpster (20-yard container, $350 to $600 rental). They inspect the decking underneath for rot or damage. Any soft spots get cut out and replaced with new OSB or plywood ($2 to $4 per square foot for deck repair, budgeted as a contingency). Synthetic underlayment goes down the same day, stapled to the deck. Ice and water shield is self-adhered along the eaves (24 inches past the interior wall line per code) and in all valleys. Drip edge is nailed along all roof edges.</p>

            <h3>Day 2–3: Shingling</h3>
            <p>Shingles go on from the bottom up, starting at the eave and working toward the ridge. Each row overlaps the one below by a specified amount (5 to 5.625 inches of exposure for most architectural shingles). Hips and valleys require more cuts and more waste. Ridge cap shingles finish the peak. The crew installs pipe boots around plumbing vents and step flashing where the roof meets any wall or chimney.</p>

            <h3>Ventilation</h3>
            <p>A new roof is the best and cheapest time to upgrade ventilation. Continuous ridge vent along the peak paired with soffit intake vents at the eaves creates a natural convection loop that removes hot air in summer and moisture in winter. The rule of thumb is 1 square foot of net free vent area per 150 square feet of attic floor (or 1:300 with a vapor barrier). Use the <Link href="/attic-ventilation-calculator" className="text-accent hover:underline">attic ventilation calculator</Link> for exact sizing.</p>

            <h3>Gutters</h3>
            <p>Replacing gutters during a roof job saves the cost of a second mobilization. A gutter crew coming separately costs $800 to $1,500 just in setup and access fees. Adding gutters to an active roof job costs 20 to 30 percent less because the scaffolding and access are already in place. Use the <Link href="/gutter-calculator" className="text-accent hover:underline">gutter calculator</Link> for downspout count and linear footage.</p>

            <h3>Permits and inspections</h3>
            <p>Most jurisdictions require a permit for a full roof replacement. The permit fee is $100 to $500. The inspection checks that the underlayment type, fastener pattern, and flashing details meet code. Your contractor should pull the permit. If they ask you to pull it yourself, that is a red flag. Contractors pull permits under their own license, which means they are responsible for the work meeting code.</p>

            <h3>Cost ranges (2026)</h3>
            <p>A standard 2,000 sq ft roof with architectural shingles costs $7,000 to $13,000 installed, including tear-off, underlayment, and accessories. 3-tab shingles save 30 to 40 percent but last half as long. Premium designer shingles (slate-look, cedar-shake-look) double the cost. The biggest variable after material choice is decking condition. If 10 percent of your decking needs replacement, add $800 to $1,500 to the total.</p>

            <h3>What this planner does</h3>
            <p>The planner chains three calculations: shingles (with pitch multiplier and waste), ventilation (ridge vent and soffit sizing), and optional gutter replacement (linear feet and downspout count). It also estimates tear-off cost including dumpster rental. The quote comparison shows your contractor&apos;s bid against the estimated material cost so you can see the labor and markup breakdown.</p>

            <p>For individual calculations, use the <Link href="/roofing-calculator" className="text-accent hover:underline">roofing calculator</Link>, <Link href="/attic-ventilation-calculator" className="text-accent hover:underline">attic ventilation calculator</Link>, or <Link href="/gutter-calculator" className="text-accent hover:underline">gutter calculator</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
