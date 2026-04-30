import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concrete, brick, rebar, and asphalt calculators — Tallyard",
  description: "Masonry and paving calculators: concrete yards, brick counts, rebar grids, and asphalt tonnage. Free tools with code-compliant specifications.",
  alternates: { canonical: "/calculators/masonry" },
};

const tools = [
  { slug: "concrete-calculator", name: "Concrete calculator", desc: "Cubic yards for slabs, footings, and columns. Bags vs ready-mix breakpoint." },
  { slug: "brick-calculator", name: "Brick calculator", desc: "Brick count by wall area, mortar joint width, and bond pattern." },
  { slug: "rebar-calculator", name: "Rebar calculator", desc: "Bar count, total length, and sticks for grid reinforcement in slabs and footings." },
  { slug: "asphalt-calculator", name: "Asphalt calculator", desc: "Tons of hot-mix by area and thickness. Driveway and parking area sizing." },
  { slug: "chimney-calculator", name: "Chimney calculator", desc: "Flue sizing by fireplace opening area. Height requirements per IRC R1003." },
  { slug: "mortar-calculator", name: "Mortar calculator", desc: "Bags of mortar mix by wall area, brick size, and joint width. Type S, N, and M." },
];

export default function MasonryPillar() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link>
            <span className="mx-2">·</span><span>Masonry</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Concrete, brick, rebar, and asphalt</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Five tools for projects where getting the quantity wrong means an expensive second delivery or a structural problem. Masonry does not forgive mistakes the way paint does.</p>
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
          <h2>Masonry projects share one unforgiving trait: you cannot undo them</h2>

          <p>Paint washes off. Flooring pulls up. Drywall patches. Concrete cures permanently. Once a slab is poured, a wall is laid, or asphalt is rolled, the material is committed. This makes quantity accuracy more important for masonry than any other category of home improvement. Ordering a quarter-yard short of concrete means a cold joint in the middle of your driveway (a crack waiting to happen). Ordering 200 bricks short means a second delivery with a potentially different dye lot. Skipping rebar in a slab means accepting that it will crack within two years.</p>

          <h2>Concrete: the foundation of everything else</h2>

          <p>Concrete is measured in cubic yards (27 cubic feet per yard). The formula is area times thickness divided by 324 for inches, or divided by 27 for feet. A 20 × 24 foot driveway at 4 inches thick needs 5.9 cubic yards. The <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link> handles the unit conversion and tells you the breakpoint between bags and ready-mix delivery (usually around 1.5 yards — below that, bags are practical; above that, a delivery truck saves hours of mixing).</p>

          <p>The thickness decision is structural, not budgetary. A 4-inch slab is code minimum for residential. Driveways that park heavy vehicles (trucks, RVs) should be 5 to 6 inches. Footings under posts and columns have minimum depth requirements set by local code (usually 12 × 12 × 12 inches minimum for deck footings, deeper in cold climates where frost line drives the depth).</p>

          <h2>Reinforcement: rebar and wire mesh</h2>

          <p>Every concrete slab benefits from reinforcement, and many are required to have it by code. The <Link href="/rebar-calculator" className="text-accent hover:underline">rebar calculator</Link> estimates bars for a grid layout at your chosen spacing (16 inches on center is standard residential). Two critical details: rebar must sit in the middle third of the slab (on chairs, not lying on the ground), and lap splices where bars overlap must be at least 30 bar diameters long. Both of these requirements exist because rebar that is not properly positioned does not resist cracking.</p>

          <h2>Brick: count, mortar, and the dye lot trap</h2>

          <p>Brick projects are measured in two units: bricks per square foot (6.75 for standard size with 3/8-inch mortar joints) and bags of mortar per thousand bricks (about 7 bags of 80-lb Type S for standard joints). The <Link href="/brick-calculator" className="text-accent hover:underline">brick calculator</Link> handles both. The detail that catches people is dye lot variation: bricks are manufactured in batches, and color varies between batches. Order all your brick from one batch. If you run short mid-project, the replacement batch may be visibly different on the finished wall.</p>

          <h2>Asphalt: tonnage, base prep, and the sealcoat schedule</h2>

          <p>Asphalt is measured in tons (not yards) because it is sold by weight. A standard 2 to 3 inch residential driveway uses about 0.17 tons per square foot. The <Link href="/asphalt-calculator" className="text-accent hover:underline">asphalt calculator</Link> converts your area and thickness to tons. The material is only half the equation — the gravel base underneath determines whether the asphalt lasts 8 years or 20. Four to six inches of compacted process stone is the standard residential base. Use the <Link href="/gravel-calculator" className="text-accent hover:underline">gravel calculator</Link> for the base layer tonnage.</p>

          <h2>Chimneys: fire safety sizing</h2>

          <p>The <Link href="/chimney-calculator" className="text-accent hover:underline">chimney calculator</Link> sizes flue diameter based on fireplace opening area. This is a fire safety calculation, not an aesthetic choice. An undersized flue allows combustion gases (including carbon monoxide) to spill into the room. The minimum height requirement (3 feet above the roof penetration, 2 feet above anything within 10 horizontal feet) ensures adequate draft.</p>

          <h2>How these tools work together</h2>

          <p>A typical patio project chains three masonry calculators. First, the <Link href="/gravel-calculator" className="text-accent hover:underline">gravel calculator</Link> for the compacted base layer. Then the <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link> for the slab (if poured concrete) or the <Link href="/paver-calculator" className="text-accent hover:underline">paver calculator</Link> for pavers on sand. Finally, the <Link href="/rebar-calculator" className="text-accent hover:underline">rebar calculator</Link> for slab reinforcement. The <Link href="/planner/build-a-patio" className="text-accent hover:underline">patio project planner</Link> chains these calculations automatically from a single set of dimensions.</p>
        </div>
      </section>
    </article>
  );
}
