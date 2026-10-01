import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concrete, brick, rebar, and asphalt calculators: Tallyard",
  description: "Masonry and paving quantity estimators for concrete, brick, rebar, and asphalt. Confirm structural and local-code requirements separately.",
  alternates: { canonical: "/calculators/masonry" },
};

const tools = [
  { slug: "concrete-calculator", name: "Concrete volume calculator", desc: "Geometric volume from a simple shape, entered dimensions, and selected allowance." },
  { slug: "brick-calculator", name: "Brick quantity estimate", desc: "Unit count from net wall area and entered product/layout coverage." },
  { slug: "rebar-calculator", name: "Rebar grid geometry", desc: "Gross straight-run length from a rectangle and user-selected spacing; not reinforcement design." },
  { slug: "asphalt-calculator", name: "Asphalt volume estimate", desc: "Approximate volume and weight from entered area, depth, and a stated density assumption." },
  { slug: "chimney-calculator", name: "Fireplace opening area", desc: "Rectangular opening area only; not flue or vent sizing." },
  { slug: "mortar-calculator", name: "Mortar package estimate", desc: "Bag count from unit count and coverage for the exact product and assembly." },
];

export default function MasonryPillar() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="pt-2 pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link>
            <span className="mx-2">·</span><span>Masonry</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Concrete, brick, rebar, and asphalt</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Six limited quantity and geometry estimators for masonry and exterior projects. They do not replace structural design, product specifications, or supplier confirmation.</p>
        </div>
      </section>

      <section className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group">
              <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-content pb-16">
        <div className="guide-prose">
          <h2>Use these quantity estimates alongside the project specifications</h2>

          <p>These calculators perform bounded quantity or geometry estimates from the inputs shown; they do not replace drawings, product specifications, engineering, local code review, or supplier confirmation. Actual work depends on site conditions and the specified assembly. Do not use an estimate here to make structural, fire-safety, or life-safety decisions.</p>

          <h2>Concrete: the foundation of everything else</h2>

          <p>Geometric concrete volume is area times thickness; cubic feet convert to cubic yards by dividing by 27. A 20 × 24 foot rectangle at an entered 4-inch thickness has a geometric volume of about 5.93 cubic yards before any user-selected allowance. The <Link href="/concrete-calculator" className="text-accent hover:underline">concrete volume calculator</Link> performs this arithmetic for rectangular or round shapes. Confirm actual dimensions, thickened sections, subgrade, mix specification, and supplier ordering quantities separately.</p>

          <p>This calculator does not recommend slab or footing thickness, reinforcement, mix design, or excavation depth. Those requirements depend on loads, use, soil, climate, design, and local rules; follow the construction documents and consult a qualified professional.</p>

          <h2>Reinforcement: rebar and wire mesh</h2>

          <p>Whether a slab needs reinforcement, what type, and how it is placed depend on its design, loads, exposure, and local requirements. The <Link href="/rebar-calculator" className="text-accent hover:underline">rebar grid estimator</Link> calculates gross straight-run length for a rectangular footprint at spacing you select from project documents. It excludes cover, laps, hooks, bends, openings, and cut planning; it does not determine reinforcement adequacy or provide an order list.</p>

          <h2>Brick: count, mortar, and the dye lot trap</h2>

          <p>Brick counts depend on actual unit dimensions, joints, openings, bond, wall construction, and breakage. The <Link href="/brick-calculator" className="text-accent hover:underline">brick estimator</Link> multiplies net wall area by coverage that you enter for the exact product and layout. The separate <Link href="/mortar-calculator" className="text-accent hover:underline">mortar package estimator</Link> uses unit count and exact package coverage; neither tool selects materials or estimates structural details. Confirm quantities against project drawings and current manufacturer or supplier data.</p>

          <h2>Asphalt: tonnage, base prep, and the sealcoat schedule</h2>

          <p>The <Link href="/asphalt-calculator" className="text-accent hover:underline">asphalt calculator</Link> estimates material volume and approximate weight from entered area and thickness using its stated density assumption. It does not design pavement, specify a base section, assess compaction, or predict service life. Obtain pavement and base specifications from a qualified designer or contractor.</p>

          <h2>Chimneys: fire safety sizing</h2>

          <p>The <Link href="/chimney-calculator" className="text-accent hover:underline">fireplace opening-area calculator</Link> computes only rectangular opening area. It does not size a chimney, liner, flue, or vent and makes no draft or code-compliance determination. Have venting systems assessed by a qualified professional; leave and seek emergency help if a carbon-monoxide alarm sounds or occupants have symptoms.</p>

          <h2>How these tools work together</h2>

          <p>These tools provide separate quantity estimates, not a coordinated patio design. The <Link href="/gravel-calculator" className="text-accent hover:underline">gravel calculator</Link> estimates aggregate volume and approximate weight from area and selected depth; the <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link> estimates concrete volume; and the <Link href="/paver-calculator" className="text-accent hover:underline">paver calculator</Link> estimates paver count from area and nominal face dimensions. The <Link href="/rebar-calculator" className="text-accent hover:underline">rebar calculator</Link> is a separate preliminary estimate, not reinforcement design. The <Link href="/planner/build-a-patio" className="text-accent hover:underline">paver area and count planner</Link> estimates only rectangular area and nominal paver quantity. Verify project-specific design, materials, and local requirements with a qualified professional.</p>
        </div>
      </section>
    </article>
  );
}
