import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import DeckPlannerClient from "./DeckPlanner";

export const metadata: Metadata = {
  title: "Build a deck — complete material planner",
  description:
    "Plan your entire deck project in one tool. Get a complete material list for decking, frame, concrete footings, stairs, railing, and fasteners. Compare against contractor quotes.",
  alternates: { canonical: "/planner/build-a-deck" },
  openGraph: {
    title: "Build a deck — complete material planner",
    description: "Plan your entire deck project: decking, frame, footings, stairs, railing, and fasteners in one tool.",
    url: "https://www.tallyard.com/planner/build-a-deck",
    type: "website",
  },
};

export default function DeckPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Deck</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your deck." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your dimensions once. Get a complete material list for decking, frame, concrete footings, stairs, railing, and fasteners. Then compare it against your contractor&apos;s quote.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12">
        <DeckPlannerClient />
      </section>

      {/* Project guide content */}
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
    </>
  );
}
