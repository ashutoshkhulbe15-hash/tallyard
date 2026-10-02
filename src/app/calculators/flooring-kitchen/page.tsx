import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flooring, tile, and kitchen calculators: Tallyard",
  description: "Area and package estimators for flooring and tile, plus separate kitchen and bathroom planning tools with stated scope limits.",
  alternates: { canonical: "/calculators/flooring-kitchen" },
};

const tools = [
  { slug: "flooring-calculator", name: "Flooring package calculator", desc: "Package count from room area, label coverage, and selected allowance." },
  { slug: "tile-calculator", name: "Tile package calculator", desc: "Package count from area, label coverage, and selected allowance." },
  { slug: "grout-calculator", name: "Grout package estimator", desc: "Package count from measured tiled area and coverage for the exact product." },
  { slug: "shower-tile-calculator", name: "Shower tile package calculator", desc: "Package count from user-measured tiled area and label coverage; no waterproofing design." },
  { slug: "backsplash-calculator", name: "Backsplash tile package estimator", desc: "Package count from measured tile area and exact label coverage." },
  { slug: "countertop-calculator", name: "Countertop area estimator", desc: "Surface-area estimate from entered counter length, selected depth, island preset, and allowance; not a fabrication plan or price quote." },
  { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinet run estimator", desc: "Gross wall-run length and rough 24-inch module count; openings and actual cabinet widths are not resolved." },
  { slug: "vanity-calculator", name: "Vanity wall-width worksheet", desc: "Remaining wall width after user-entered clearances; no code or product assessment." },
];

export default function FlooringKitchenPillar() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="pt-2 pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link>
            <span className="mx-2">·</span><span>Flooring + kitchen</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Flooring, tile, and kitchen</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Eight separate estimators for floor and wall finishes, grout, counters, cabinets, and vanity clearances. Start with measured surfaces and the coverage on the exact product you are considering.</p>
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
          <h2>Choose the tool by the quantity you need</h2>

          <p>For floor covering or tile, measure each floor area and use package coverage from the product label. For a backsplash or shower, measure the actual surfaces that will receive tile, including returns only if you intend to tile them. Use the grout estimator separately with coverage for the exact grout product and package. These tools do not infer a cut layout or convert one product&apos;s coverage into another&apos;s.</p>

          <p>For cabinets and counters, the estimators answer narrower questions: gross cabinet run length and a rough module count, or approximate counter surface area. Neither creates a cabinet layout, fabrication template, installed price, or coordinated purchase list. Treat their outputs as an early measurement note to discuss with a supplier or installer.</p>

          <h2>Measure floors in separate sections</h2>

          <p>For an L-shaped room, split the floor into rectangles that do not overlap, calculate each area, then add them. For example, a 12 × 10 ft main area plus a 4 × 3 ft alcove is 120 + 12 = 132 sq ft. Enter the measured total and the package coverage printed for the exact floor product. A doorway, closet, angled wall, plank direction, tile pattern, and damaged subfloor can affect the order beyond this area arithmetic; ask the installer to check the layout and allowance.</p>

          <h2>Tile, grout, and shower assemblies have different inputs</h2>

          <p>Tile coverage alone does not determine grout use: joint width, tile thickness, tile dimensions, and the chosen grout all matter, so enter the coverage the manufacturer gives for that product and assembly. The <Link href="/shower-tile-calculator" className="text-accent hover:underline">shower tile estimator</Link> only counts packages from user-measured tiled area. It does not specify a waterproofing membrane, pan, drain, slope, substrate, or compatible assembly. Follow the complete selected system instructions and have any required waterproofing work reviewed by a qualified professional.</p>

          <h2>Keep cabinet, counter, and backsplash measurements separate</h2>

          <p>Cabinet runs are measured along the walls; counter surface area depends on both run length and depth. Backsplash area is measured on the wall between the counter and the planned upper termination, with openings and returns considered in the layout. The <Link href="/countertop-calculator" className="text-accent hover:underline">counter estimator</Link> uses a selected depth and simple island presets, so measure unusual depths and islands with the fabricator. The <Link href="/kitchen-cabinet-calculator" className="text-accent hover:underline">cabinet estimator</Link> reports gross run and approximate modules; it does not subtract appliances, corners, fillers, or openings. Use an approved plan for ordering.</p>

          <h2>Check vanity fit in the room, not only along the wall</h2>

          <p>The <Link href="/vanity-calculator" className="text-accent hover:underline">vanity worksheet</Link> subtracts the left and right clearances you enter from a wall width. Before selecting a product, also check the vanity&apos;s actual width and depth, door and drawer swing, plumbing location, adjacent fixtures, and any required accessible clearances. This arithmetic does not decide whether a product fits or complies.</p>

          <h2>Use the results as measurement notes</h2>

          <p>Record the room, surface, units, product, package coverage, and allowance alongside each result. Do not add floor, backsplash, and counter areas together as if they were one material. Confirm cut layouts, transitions, substrate preparation, waterproofing, delivery quantities, and installation sequence with the project plan and trades who will do the work.</p>
        </div>
      </section>
    </article>
  );
}
