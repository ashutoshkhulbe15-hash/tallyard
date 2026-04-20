import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import BathroomPlannerClient from "./BathroomPlanner";

export const metadata: Metadata = {
  title: "Remodel a bathroom — complete material planner",
  description: "Plan a bathroom remodel: floor tile, shower tile, vanity, paint, and accessories. One form, complete material list with quote comparison.",
  alternates: { canonical: "/planner/remodel-a-bathroom" },
};

export default function BathroomPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Bathroom</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your bathroom remodel." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter room and shower dimensions. Get floor tile, shower tile, vanity, paint, and supplies with cost estimates.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12"><BathroomPlannerClient /></section>

      <section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>Bathroom remodels have the tightest sequence of any home project</h2>

            <p>A bathroom remodel touches every trade: plumbing, electrical, tile, carpentry, and paint. In a 50 to 70 square foot room. The sequence matters more here than almost any other renovation because each trade&apos;s work is covered by the next trade&apos;s work. Tile goes over waterproofing. Waterproofing goes over backer board. Backer board goes over framing. If any layer is wrong, the only way to fix it is to tear out everything on top of it.</p>

            <h3>Phase 1: Demo (1 day)</h3>
            <p>Remove the old vanity, toilet, and any existing tile. If the tub or shower is staying, protect it with a drop cloth and cardboard. If the tub is being replaced, now is the time. Shut off water supply to the bathroom at the shutoff valves (not the main, unless you have no local shutoffs). Disconnect the toilet at the supply line, remove the tank bolts, and lift it off the flange. Cap the drain to prevent sewer gas.</p>

            <h3>Phase 2: Rough plumbing and electrical (1–2 days)</h3>
            <p>Move any drains, supply lines, or vent stacks that need to change for the new layout. This is the most expensive phase per hour because it involves licensed trades working inside walls. If you are keeping plumbing in the same locations, this phase is minimal. Add or move electrical outlets, light fixtures, and the exhaust fan. Current code (NEC) requires all bathroom outlets to be GFCI protected. If your bathroom does not have GFCI outlets, this is the time to upgrade.</p>

            <h3>Phase 3: Backer board and waterproofing (1 day)</h3>
            <p>Install cement backer board (Durock, HardieBacker) on all surfaces that will receive tile. This includes the shower walls, shower floor (if applicable), and the bathroom floor. Apply waterproof membrane (Schluter Kerdi, Laticrete Hydro Ban, or RedGard) to the shower area. The waterproofing goes on top of the backer board and under the tile. Every seam, screw hole, and corner gets membrane or membrane tape. This layer is what actually keeps water out of your walls. The tile is decorative. The membrane is functional.</p>

            <h3>Phase 4: Tile (2–3 days)</h3>
            <p>Shower walls first (top to bottom, so drips fall on untiled surface). Then the shower floor. Then the bathroom floor. Use a wet saw for all cuts. Set tile in unmodified thinset for floors, modified thinset for walls. Let the thinset cure 24 hours before grouting. Grout all joints, clean excess with a damp sponge, and let cure 24 to 72 hours before sealing. Seal the grout with a penetrating sealer to prevent staining and moisture absorption.</p>

            <h3>Phase 5: Vanity, toilet, and fixtures (1 day)</h3>
            <p>Install the vanity and connect plumbing. Set the toilet on a new wax ring (never reuse the old one). Install faucets, towel bars, toilet paper holder, and mirror. Caulk the vanity-to-wall joint, the tub-to-tile joint, and the toilet base with kitchen-and-bath silicone caulk. Do not use grout at these joints. Grout cracks where different surfaces meet. Caulk flexes.</p>

            <h3>Phase 6: Paint and trim (half day)</h3>
            <p>Paint the non-tiled walls with satin or semi-gloss interior latex. These sheens resist moisture and clean easily. Flat paint in a bathroom is a maintenance headache. Reinstall trim, baseboard, and door casing. Install the exhaust fan cover. Turn the water back on and check every connection for leaks. Run the shower for 10 minutes and check behind the walls from the other side if accessible.</p>

            <h3>Timeline and budget</h3>
            <p>A typical bathroom remodel takes 2 to 3 weeks for a professional crew, or 4 to 8 weekends for a DIYer. The limiting factor for DIY is the sequential drying and curing times: thinset needs 24 hours, grout needs 24 to 72 hours, paint needs overnight. You cannot compress these. Budget range for a standard 50 sq ft bathroom with mid-range finishes: $5,000 to $8,000 DIY, $10,000 to $25,000 professional, depending on whether plumbing moves and the scope of tile work.</p>

            <h3>What this planner calculates</h3>
            <p>The planner chains five calculations: floor tile (with waste by tile size), shower wall tile (3 walls to your specified height, with waterproofing membrane), vanity sizing, wall paint, and accessories (toilet, exhaust fan, hardware). The quote comparison shows material cost versus a contractor&apos;s bid.</p>

            <p>For individual calculations, use the <Link href="/tile-calculator" className="text-accent hover:underline">tile calculator</Link>, <Link href="/shower-tile-calculator" className="text-accent hover:underline">shower tile calculator</Link>, <Link href="/vanity-calculator" className="text-accent hover:underline">vanity calculator</Link>, <Link href="/paint-calculator" className="text-accent hover:underline">paint calculator</Link>, or <Link href="/grout-calculator" className="text-accent hover:underline">grout calculator</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
