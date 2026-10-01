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
  { slug: "countertop-calculator", name: "Countertop calculator", desc: "Square footage for quartz, granite, or laminate. Edge profile costs." },
  { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinet calculator", desc: "Linear feet by layout type. Stock vs semi-custom vs custom pricing." },
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

          <p>A remodel involves materials with different measurement and ordering units. These tools provide separate estimates from the inputs shown; they are not a coordinated project takeoff, and not every product or installation material is covered.</p>

          <h2>Flooring and tile: begin with area and product coverage</h2>

          <p>The <Link href="/flooring-calculator" className="text-accent hover:underline">flooring package calculator</Link> and <Link href="/tile-calculator" className="text-accent hover:underline">tile package calculator</Link> use rectangular area, package coverage copied from the exact product label, and an allowance selected by the user. Neither chooses a waste factor by material or pattern, models a cut plan, nor guarantees a purchase quantity. Measure irregular rooms as separate non-overlapping sections and ask the installer to review the layout.</p>

          <h2>Tile projects need three calculations, not one</h2>

          <p>Tile quantity, grout, and the substrate or waterproofing system are separate planning questions. The <Link href="/tile-calculator" className="text-accent hover:underline">tile package calculator</Link> estimates packages from entered area and label coverage. The <Link href="/grout-calculator" className="text-accent hover:underline">grout package estimator</Link> also requires coverage for the exact grout product and package; it does not infer joint yield or select a grout type. The <Link href="/shower-tile-calculator" className="text-accent hover:underline">shower tile package calculator</Link> uses total tiled area entered by the user and does not design waterproofing, a shower pan, drainage, or substrate. Follow the selected system&apos;s instructions and get qualified project-specific advice.</p>

          <h2>Kitchen surfaces: counter, cabinet, backsplash</h2>

          <p>These measurements should come from the actual room plan and product specifications. <Link href="/kitchen-cabinet-calculator" className="text-accent hover:underline">Cabinets</Link>, <Link href="/countertop-calculator" className="text-accent hover:underline">countertops</Link>, and <Link href="/backsplash-calculator" className="text-accent hover:underline">backsplash</Link> have different dimensions and exclusions; none of these separate estimators is a coordinated fabrication or installation drawing. Verify dimensions, overhangs, openings, and clearances with the supplier or installer.</p>

          <p>The site also has a separate <Link href="/planner/remodel-a-bathroom" className="text-accent hover:underline">bathroom planner</Link>; it is not a kitchen-planning tool.</p>

          <h2>Bathroom: vanity sizing and clearance</h2>

          <p>The <Link href="/vanity-calculator" className="text-accent hover:underline">vanity calculator</Link> subtracts user-entered left and right clearances from a wall measurement. Confirm product dimensions, plumbing, door swing, accessibility, and local requirements separately.</p>

          <h2>How these tools chain together in a kitchen remodel</h2>

          <p>There is no fixed calculation sequence or universal floor/cabinet installation order. These are independent estimates only: enter measurements from the actual plan, verify overlap and exclusions, and coordinate dimensions and sequencing with the designer, supplier, and installer.</p>
        </div>
      </section>
    </article>
  );
}
