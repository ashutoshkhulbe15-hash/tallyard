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

<section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>How a deck project actually unfolds</h2>

            <p>Most people think of a deck as a surface you walk on. The actual project is a small construction job with five phases that have to happen in the right order. Skipping a phase or doing them out of sequence creates problems that are expensive to fix once the decking goes down.</p>

            <h3>Phase 1: Design and permits (1–2 weeks)</h3>
            <p>Start by drawing the deck footprint on paper with dimensions. Decide on height, stairs, and railing locations. Then check your local building code. Most municipalities require a permit for any attached deck over 200 square feet or any deck more than 30 inches above grade. The permit application typically needs a site plan showing setbacks from property lines and a structural drawing showing footing locations, beam spans, and joist sizing. Permit fees range from $100 to $500. Turnaround is 1 to 2 weeks in most jurisdictions, sometimes same-day for simple decks.</p>

            <h3>Phase 2: Footings (1 day)</h3>
            <p>Dig post holes to frost line depth (18 inches in the South, 36 to 48 inches in the North). Pour concrete and set post brackets. This is the foundation of the entire structure. The footings need 24 to 48 hours to cure before you load them with posts and beams. A power auger rental ($200/day) makes 8 to 12 holes manageable in a morning. Digging by hand with a clamshell digger takes a full day for the same number of holes.</p>

            <h3>Phase 3: Framing (1–2 days)</h3>
            <p>Set posts on the cured footings. Install the ledger board against the house (if the deck is attached) with lag bolts and proper flashing. The ledger is the most structurally critical connection in any attached deck. Run beams across the posts, then set joists on joist hangers at the spacing your decking material requires. Check that the frame is level and square before moving on. Everything after this step depends on the frame being right.</p>

            <h3>Phase 4: Decking surface (1–2 days)</h3>
            <p>Lay boards starting from the house wall and working outward. Leave a 1/8-inch gap between boards for drainage and expansion (composite expands more than wood in heat). Use the correct fastener type for your material: ACQ-rated screws for pressure-treated, stainless for cedar, hidden clips for composite. The last board along the outside edge usually needs to be ripped to width on a table saw.</p>

            <h3>Phase 5: Stairs, railing, and finish (1–2 days)</h3>
            <p>Build stairs to IRC code: maximum 7.75-inch rise, minimum 10-inch run, 36-inch minimum width. Install railing posts through the deck frame (not surface-mounted, which pulls out under load). Balusters spaced no more than 4 inches apart per code. Apply finish if using wood: one coat of penetrating stain on all six sides of every board for maximum protection.</p>

            <h3>Realistic timeline</h3>
            <p>A DIY deck for a first-timer takes 4 to 6 weekends from permit application to finished stairs. A professional crew completes the same deck in 3 to 5 days of on-site work, plus the permit wait. The permit wait is the same either way.</p>

            <h3>Tools you need</h3>
            <p>Circular saw, drill/driver, impact driver, speed square, 4-foot level, chalk line, string line, clamps, tape measure, post hole digger or power auger (rental). For composite decking: add a miter saw for clean cuts and hidden clip installation jig. For stairs: add a framing square with stair gauges.</p>

            <h3>What this planner does differently</h3>
            <p>Most online deck calculators estimate boards only. This planner chains four calculations together from one set of dimensions: decking surface with waste factor, frame lumber (joists, beams, posts sized to your height), concrete for every footing (sized to your frost line), and stairs with IRC-compliant rise and run. The quote comparison at the bottom shows you whether a contractor&apos;s bid is in line with the estimated material cost.</p>

            <p>For detailed calculations on individual components, use the <Link href="/deck-calculator" className="text-accent hover:underline">deck calculator</Link>, <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link>, <Link href="/stair-calculator" className="text-accent hover:underline">stair calculator</Link>, or <Link href="/lumber-calculator" className="text-accent hover:underline">lumber calculator</Link> individually.</p>
          </div>
        </div>
      </section>
</>;
}
