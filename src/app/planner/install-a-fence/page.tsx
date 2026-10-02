import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Fence Project Planning and Measurement Tools | Tallyard",
  description: "Fence planning links and limited straight-run estimates. No footing design, complete material list, property survey, or current quote.",
  alternates: { canonical: "/planner/install-a-fence" },
};

export default function FencePlannerPage() {
  return <>
    <section className="container-wide pt-7 md:pt-10"><div className="pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/planner" className="hover:text-accent transition-colors">Planner</Link><span className="mx-2">·</span><span>Fence</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink"><BannerHeadline text="Plan your fence." /></h1>
      <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">Fence layout and footing requirements depend on property boundaries, grade, soil, exposure, height, gates, materials, and local rules. These links support preliminary measurements, not installation design or a complete order list.</p>
    </div></section>
    <section className="container-content py-10"><div className="guide-prose">
      <h2>Map the actual fence line before estimating quantities</h2>
      <p>Sketch each straight segment between endpoints and corners, and mark every gate and grade change. Record segment lengths separately rather than treating a perimeter as one uninterrupted run. Select the fence height and product first; rail and picket dimensions, post spacing, gate assemblies, and slope transitions differ by system. The estimator below is a preliminary straight-run calculation, not a final order.</p>
      <ul>
        <li><Link href="/fence-calculator" className="text-accent hover:underline">Fence quantity estimator</Link> — limited straight-run counts from entered assumptions; not structural design.</li>
        <li><Link href="/concrete-calculator" className="text-accent hover:underline">Concrete volume calculator</Link> — volume from entered geometry; not footing sizing.</li>
        <li><Link href="/cost-to-build-a-fence" className="text-accent hover:underline">Fence bid-comparison guide</Link> — scope checklist, not a local quote.</li>
      </ul>
      <p>Confirm the boundary from reliable survey information before placing a fence. Check permit, setback, height, and neighborhood requirements with the relevant local authorities, and contact the local utility-location service before digging. Ask an installer to account for corners, gates, slopes, soil, exposure, and the selected system in the final material list.</p>
    </div></section>

<section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>Building a fence from survey to stain</h2>

            <h3>Before you buy anything: the property line</h3>
            <p>The most expensive fence mistake has nothing to do with materials. It is building on the wrong side of the property line. Most municipalities require fences to sit 2 to 6 inches inside your property boundary. A fence on the wrong side belongs to your neighbor, legally. If you are unsure where the line is, hire a surveyor ($300 to $500). That cost is trivial compared to tearing out a finished fence.</p>

            <h3>Permits and height limits</h3>
            <p>Many jurisdictions require a building permit for fences over 4 feet tall. Back yards typically allow 6 feet; front yards are usually limited to 4 feet or less. HOAs add another layer of rules on materials, colors, and sometimes even which direction the finished side faces. Call your building department and check your HOA covenants before ordering materials. Both calls take five minutes and save thousands in potential rework.</p>

            <h3>Order of operations</h3>
            <p>A fence project has four phases. First, mark the layout with stakes and string. Run the string from corner to corner and mark post locations at your chosen spacing (8 feet is standard for wood and vinyl). Second, dig post holes. Hole depth depends on your frost line: 18 to 24 inches in the South, 36 to 48 inches in the North. A power auger rental ($200/day) is worth every penny if you have more than 10 holes. Third, set posts in concrete. Plumb each post with a level, brace it, and pour concrete around it. Let the concrete cure 24 to 48 hours before attaching rails. Fourth, attach rails and infill. Two horizontal rails for 4-foot fences, three for 6-foot. Then pickets, panels, or mesh depending on your material.</p>

            <h3>Timeline</h3>
            <p>DIY with a helper: 2 to 4 weekends for a 200-foot fence, depending on soil conditions. Rocky or clay soil can double the post-hole phase. Professional crews finish the same fence in 2 to 3 days. The permit wait (if required) adds 1 to 2 weeks regardless.</p>

            <h3>Tools for DIY</h3>
            <p>Post hole digger or power auger, 4-foot level, string line, speed square, circular saw, drill/driver, wheelbarrow for mixing concrete, rubber mallet, and a tape measure. If you are cutting fence boards to length, a miter saw speeds things up but a circular saw works fine.</p>

            <h3>Common mistakes this planner helps you avoid</h3>
            <p>Buying too few posts (forgetting corners and gates each add extra posts), underestimating concrete (every post needs 1 to 2 bags depending on hole depth), and not accounting for gate hardware. The planner calculates all of these from your linear footage, post spacing, and gate count.</p>

            <p>For individual component calculations, use the <Link href="/fence-calculator" className="text-accent hover:underline">fence calculator</Link> or <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link>.</p>
          </div>
        </div>
      </section>
</>;
}
