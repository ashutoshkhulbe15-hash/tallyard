import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import PaintPlannerClient from "./PaintPlanner";

export const metadata: Metadata = {
  title: "Paint a room — complete material planner",
  description: "Plan a room painting project: wall paint, primer, ceiling paint, and all supplies. Get quantities and cost, then compare against quotes.",
  alternates: { canonical: "/planner/paint-a-room" },
};

export default function PaintPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Paint</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your paint job." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your room dimensions. Get paint, primer, ceiling paint, and supply quantities with cost estimates.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12"><PaintPlannerClient /></section>

      <section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>Painting a room right: prep, technique, and cleanup</h2>

            <p>A room painting project is 70 percent prep and 30 percent painting. Most people spend all their mental energy choosing a color and almost none on the steps that determine whether that color looks good six months from now. Here is the sequence that professional painters follow.</p>

            <h3>Step 1: Prep the room (1–2 hours)</h3>
            <p>Move furniture to the center and cover it with drop cloths. Remove switch plates and outlet covers (put the screws back in the plates so they do not get lost). Fill nail holes and small cracks with lightweight spackle. Let it dry 30 minutes, then sand smooth with 120-grit sandpaper. Wipe the walls with a damp cloth to remove dust. This step is boring and it is the difference between a professional-looking result and a paint job that shows every imperfection.</p>

            <h3>Step 2: Tape and protect (30 minutes)</h3>
            <p>Apply painter&apos;s tape along ceiling lines, trim, and window frames. Use the 1.5-inch blue tape (3M ScotchBlue or equivalent). Press the tape edge firmly with a putty knife to prevent paint bleed. Lay drop cloths on the floor along every wall you are painting. Canvas drop cloths grip the floor better than plastic, which slides underfoot when you are on a ladder.</p>

            <h3>Step 3: Prime if needed (2–3 hours including dry time)</h3>
            <p>You need primer in three situations: bare drywall, a drastic color change (dark to light or light to dark), or stained surfaces (water marks, smoke damage, marker). Primer costs $25 to $35 per gallon, covers about 300 square feet, and dries in 1 to 2 hours. Priming bare drywall is not optional. The paper face absorbs paint unevenly and you will see every seam and screw patch through the topcoat without it. For same-color repaints over existing paint in good condition, skip primer entirely.</p>

            <h3>Step 4: Cut in edges (1 hour per room)</h3>
            <p>Use a 2.5-inch angled sash brush to paint a 2 to 3 inch band along ceilings, corners, trim, and around outlets. This is called cutting in. Do one wall at a time and roll that wall immediately after cutting in, while the cut-in edge is still wet. If you cut in the entire room and then go back to roll, the cut-in edges dry before the roller reaches them, leaving visible lap marks where the two applications meet.</p>

            <h3>Step 5: Roll the walls (1–2 hours per coat)</h3>
            <p>Use a 9-inch roller with a 3/8-inch nap cover for smooth walls, 1/2-inch for light texture, 3/4-inch for heavy texture. Load the roller in the tray, roll off excess on the grate, and apply in a W pattern on the wall before evening out with straight vertical passes. Work in 4-foot-wide sections. Overlap slightly into the wet edge of the previous section. Two coats is standard. Wait 2 to 4 hours between coats (check the can for recoat time).</p>

            <h3>Step 6: Ceiling (optional, 1–2 hours)</h3>
            <p>If painting the ceiling, do it before the walls. Use flat white ceiling paint (different from wall paint, with a thicker formula that reduces drips). Cut in along the perimeter, then roll in one direction, overlapping each pass by 3 inches. One coat is usually enough for ceilings.</p>

            <h3>Timeline for one room</h3>
            <p>A single bedroom with two coats and no primer takes 4 to 6 hours including prep and dry time between coats. With primer, add 3 hours. Most people can paint one room per day. A professional painter does 2 to 3 rooms per day because they skip the learning curve on cutting in and work faster on prep.</p>

            <h3>What this planner calculates</h3>
            <p>The planner chains wall paint, primer (if needed), ceiling paint (if selected), and supplies into a single material list from your room dimensions. It accounts for door and window subtractions, multiple coats, and coverage rate differences between paint grades. The quote comparison at the bottom shows material cost versus a contractor&apos;s bid, with the gap representing labor and markup.</p>

            <p>For paint quantity only, use the <Link href="/paint-calculator" className="text-accent hover:underline">paint calculator</Link>. For new-construction drywall estimating, use the <Link href="/drywall-calculator" className="text-accent hover:underline">drywall calculator</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
