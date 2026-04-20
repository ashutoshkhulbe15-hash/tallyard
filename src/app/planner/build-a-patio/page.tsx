import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import PatioPlannerClient from "./PatioPlanner";

export const metadata: Metadata = {
  title: "Build a patio — complete material planner",
  description: "Plan a paver patio: pavers, gravel base, bedding sand, edge restraint, and joint sand. Full material list with cost estimates.",
  alternates: { canonical: "/planner/build-a-patio" },
};

export default function PatioPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Patio</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your patio." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter patio dimensions and paver choice. Get pavers, gravel, sand, and edge materials with cost estimates.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12"><PatioPlannerClient /></section>

      <section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>A paver patio is an excavation project, not a surface project</h2>

            <p>The pavers are the last thing you install. The first 80 percent of the work happens underground: excavation, grading, compaction, base gravel, more compaction, bedding sand, screeding. If the base is wrong, the pavers shift, sink, and separate within two years regardless of how carefully you laid them. If the base is right, the patio lasts 25 to 30 years with almost zero maintenance.</p>

            <h3>Step 1: Excavation (half day to full day)</h3>
            <p>Mark your patio outline with stakes and string. Excavate to a depth of base gravel thickness plus 1 inch of bedding sand plus the paver thickness (usually about 10 to 12 inches total for a 6-inch gravel base with standard 2.375-inch pavers). Grade the excavation to slope away from the house at 1/4 inch per foot for drainage. This slope is non-negotiable. Water pooling against the foundation causes basement leaks and erosion. Rent a plate compactor ($80 to $120/day) and compact the soil at the bottom of the excavation.</p>

            <h3>Step 2: Gravel base (half day)</h3>
            <p>Fill with 3/4-inch crushed stone (also called process gravel or road base). The angular shape locks together under compaction, unlike round river rock which shifts under load. Install in 2-inch lifts: spread 2 inches, compact with the plate compactor, add 2 more inches, compact again. Repeat until you reach the target base depth. Six inches is standard for patios. Eight inches for driveways or areas where vehicles will park.</p>

            <h3>Step 3: Bedding sand (2–3 hours)</h3>
            <p>Screed a 1-inch layer of concrete sand over the compacted gravel. Screeding means dragging a straight board across guide rails (two 1-inch-diameter pipes laid parallel on the gravel) to create a perfectly flat, even surface. Do not compact the sand layer. The pavers push down into it when you compact the finished surface. This is the step where level accuracy matters most. Any high or low spot in the sand shows up as a bump or dip in the finished patio.</p>

            <h3>Step 4: Lay pavers (half day to full day)</h3>
            <p>Start in one corner and work outward. Place pavers tight against each other. Do not slide them across the sand, which pushes sand into ridges. Set each paver straight down. Cut edge pieces with a masonry saw or rent a paver splitter ($50/day) for straight cuts. For curves, mark the cut line with a pencil and use a masonry blade on a circular saw with water.</p>

            <h3>Step 5: Edge restraint and joint sand (2–3 hours)</h3>
            <p>Install edge restraint (plastic paver edging or concrete border) around the entire perimeter. This is what keeps the pavers from creeping outward over time. Spike the edging every 12 inches with 10-inch landscape spikes. Then sweep polymeric joint sand into all the gaps between pavers. Mist with water to activate the polymer, which hardens and locks the sand in place. Regular sand washes out in rain. Polymeric sand stays put and prevents weed growth.</p>

            <h3>Step 6: Final compaction</h3>
            <p>Run the plate compactor over the entire patio surface with a piece of carpet or rubber mat under it (to prevent scuffing the paver faces). This seats the pavers into the bedding sand and levels the surface. After compaction, sweep in more polymeric sand to fill any joints that settled, and mist again.</p>

            <h3>Timeline</h3>
            <p>A 12 × 16 patio (192 sq ft) takes a DIYer 2 to 3 weekends from excavation to finished surface. Professionals complete the same patio in 2 to 3 days. The plate compactor rental is the biggest logistics constraint. Rent it for the full project duration rather than returning it between phases.</p>

            <h3>What this planner calculates</h3>
            <p>The planner estimates pavers (with waste by pattern), gravel base (in tons, accounting for compaction and overfill), bedding sand, polymeric joint sand, edge restraint, and landscape fabric. The quote comparison shows whether a contractor&apos;s installed price is in line with the material cost.</p>

            <p>For individual calculations, use the <Link href="/paver-calculator" className="text-accent hover:underline">paver calculator</Link> or <Link href="/gravel-calculator" className="text-accent hover:underline">gravel calculator</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
