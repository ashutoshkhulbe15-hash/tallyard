import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to remodel a bathroom?",
  description: "Build a bathroom-remodel budget from a defined scope, itemized bids, and a clearly dated national benchmark.",
  alternates: { canonical: "/cost-to-remodel-a-bathroom" },
};

export default function CostToRemodelABathroom() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="pt-2 pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to remodel a bathroom?</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Define the work first. Replacing finishes, moving plumbing, and repairing hidden damage are different cost scopes.</p>
        </div>
      </section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>A dated benchmark, not your quote</h2>
        <p>The <a href="https://www.jlconline.com/cost-vs-value/2025/national/">2025 Cost vs. Value report</a> lists a $26,138 national average job cost for its defined midrange bathroom remodel and $81,612 for its defined upscale remodel. These are published 2025 estimates for standardized scopes, not a promise that your bathroom will cost that amount in 2026. Read the project definition and compare it with the size and work you actually plan.</p>
        <h2>Write the scope before requesting bids</h2>
        <p>Specify which fixtures and finishes stay, which are replaced, and whether the toilet, shower, and sink move. Ask bidders to list demolition, disposal, waterproofing, plumbing, electrical work, ventilation, tile, fixtures, permits, inspections, and finishing separately. Make clear who purchases each fixture and what product allowance is included.</p>
        <p>Moving pipes or wiring can change both labor and permit needs; concealed water damage may only become visible after demolition. Ask contractors to describe how they price unforeseen work and require written change orders before it proceeds. A contingency is prudent, but no single percentage fits every bathroom&apos;s condition or contract.</p>
        <h2>Compare outcomes, not a claimed universal ROI</h2>
        <p>The report&apos;s cost-recouped figures describe a modeled resale scenario, not cash returned to every homeowner. They should not be used as a guarantee of sale price or as a reason to add work you do not need. For your budget, compare bids for an identical scope, check licenses and insurance where applicable, and review the payment and change-order terms.</p>
        <p>The <Link href="/planner/remodel-a-bathroom" className="text-accent hover:underline">bathroom remodel planner</Link> can help list tasks and materials, but a contractor must assess concealed conditions and local code requirements.</p>
        <h2>Source and limits</h2>
        <p>The national figures above come directly from the publisher&apos;s 2025 report. Tallyard has not analyzed 200 contractor bids or verified a current local price range for your bathroom; obtain site-specific written quotes before committing.</p>
      </div></section>
    </article>
  );
}
