import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flooring, tile, and kitchen calculators — Tallyard",
  description: "Calculators for flooring, tile, grout, backsplash, countertop, vanity, and kitchen cabinets. Free tools with waste factors and cost estimates.",
  alternates: { canonical: "/calculators/flooring-kitchen" },
};

const tools = [
  { slug: "flooring-calculator", name: "Flooring calculator", desc: "Square footage with waste factor by material type and pattern." },
  { slug: "tile-calculator", name: "Tile calculator", desc: "Tile count by size, pattern, and waste factor. Handles diagonal and herringbone." },
  { slug: "grout-calculator", name: "Grout calculator", desc: "Pounds of grout by tile size and joint width. Sanded vs unsanded." },
  { slug: "shower-tile-calculator", name: "Shower tile calculator", desc: "Three-wall layout with niche openings. Includes waterproofing area." },
  { slug: "backsplash-calculator", name: "Backsplash calculator", desc: "Kitchen backsplash area minus outlets and windows." },
  { slug: "countertop-calculator", name: "Countertop calculator", desc: "Square footage for quartz, granite, or laminate. Edge profile costs." },
  { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinet calculator", desc: "Linear feet by layout type. Stock vs semi-custom vs custom pricing." },
  { slug: "vanity-calculator", name: "Vanity calculator", desc: "Bathroom vanity sizing with clearance checking." },
];

export default function FlooringKitchenPillar() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link>
            <span className="mx-2">·</span><span>Flooring + kitchen</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Flooring, tile, and kitchen</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Eight calculators for the most detail-intensive rooms in any house. Kitchens and bathrooms have more materials per square foot than any other space.</p>
        </div>
      </section>

      <section className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {tools.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group">
              <h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-content pb-16">
        <div className="guide-prose">
          <h2>Kitchens and bathrooms have the highest material density per square foot</h2>

          <p>A bedroom renovation involves paint and maybe flooring. A kitchen renovation involves flooring, tile (backsplash and possibly floor), countertops, cabinets, and sometimes a vanity in the adjacent bathroom. Each material has its own measurement method, waste factor, and ordering unit. The eight calculators above cover every surface in a kitchen or bathroom project.</p>

          <h2>Flooring: waste factor is the number one mistake</h2>

          <p>Every flooring material has waste, but the amount depends on the material and the pattern. Straight-lay LVP in a rectangular room wastes 5 to 7 percent. Diagonal tile wastes 15 percent. Herringbone hardwood wastes 18 to 20 percent. The <Link href="/flooring-calculator" className="text-accent hover:underline">flooring calculator</Link> applies the correct waste factor by material type. For tile specifically, the <Link href="/tile-calculator" className="text-accent hover:underline">tile calculator</Link> adjusts waste by both tile size and pattern — large format tiles create bigger offcuts at walls, increasing waste even in straight layouts.</p>

          <h2>Tile projects need three calculations, not one</h2>

          <p>Tile, grout, and substrate. The <Link href="/tile-calculator" className="text-accent hover:underline">tile calculator</Link> gives you tile count. The <Link href="/grout-calculator" className="text-accent hover:underline">grout calculator</Link> gives you pounds of grout (surprisingly sensitive to joint width — doubling the joint nearly triples the grout). And you need cement backer board under any tile floor (about $0.50 to $1.00 per square foot). For showers, the <Link href="/shower-tile-calculator" className="text-accent hover:underline">shower tile calculator</Link> handles the three-wall geometry and includes waterproofing membrane in the material list.</p>

          <h2>Kitchen surfaces: counter, cabinet, backsplash</h2>

          <p>These three are measured differently but specified together. <Link href="/kitchen-cabinet-calculator" className="text-accent hover:underline">Cabinets</Link> are measured in linear feet. <Link href="/countertop-calculator" className="text-accent hover:underline">Countertops</Link> are measured in square feet (length times depth, typically 25.5 inches). <Link href="/backsplash-calculator" className="text-accent hover:underline">Backsplash</Link> is measured in square feet (counter length times the 18-inch gap between counter and upper cabinets). The three measurements interact: cabinet linear footage determines countertop length, which determines backsplash length. Change one and the others change.</p>

          <p>For a full kitchen remodel, the <Link href="/planner/remodel-a-bathroom" className="text-accent hover:underline">bathroom planner</Link> chains the tile, vanity, and paint calculations for bathrooms. A kitchen-specific planner is on our roadmap.</p>

          <h2>Bathroom: vanity sizing and clearance</h2>

          <p>The <Link href="/vanity-calculator" className="text-accent hover:underline">vanity calculator</Link> checks not just whether the cabinet fits but whether NKBA clearance requirements are met (21 inches minimum in front, 15 inches from sink center to wall). In small bathrooms (5 × 8 feet), the largest vanity that physically fits often violates clearance guidelines, making the room feel cramped and failing to meet accessibility standards.</p>

          <h2>How these tools chain together in a kitchen remodel</h2>

          <p>Start with cabinets (they determine the room layout). Then countertops (they sit on the cabinets). Then backsplash (it fills the gap between counter and uppers). Then flooring (it goes under the cabinets in most installations, or up to the cabinet toe kicks in others). Finally, paint for the non-tiled walls. Each calculator handles one surface; together they cover the entire room.</p>
        </div>
      </section>
    </article>
  );
}
