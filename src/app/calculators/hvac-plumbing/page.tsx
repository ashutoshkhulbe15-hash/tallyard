import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HVAC, Insulation, and Plumbing Worksheets | Tallyard",
  description: "Limited planning worksheets for room cooling, heat-pump context, hot water, insulation, and fixture-unit examples.",
  alternates: { canonical: "/calculators/hvac-plumbing" },
};

const tools = [
  { slug: "btu-calculator", name: "Room air-conditioner capacity guide", desc: "Area-based room guide with stated adjustments; not a whole-home load calculation." },
  { slug: "heat-pump-calculator", name: "Heating/cooling load conversion", desc: "Converts documented loads to ton-equivalents; does not calculate loads or select equipment." },
  { slug: "water-heater-calculator", name: "Water-heating rate conversion", desc: "Idealized heat-rate arithmetic from entered flow and temperature rise; not equipment sizing." },
  { slug: "insulation-calculator", name: "Insulation package estimator", desc: "Package count from measured area and exact product-label coverage; no R-value recommendation." },
  { slug: "drain-pipe-calculator", name: "Fixture-unit worksheet", desc: "Illustrative IPC 2021 example DFU subtotal; not pipe sizing or code approval." },
];

export default function HVACPlumbingPillar() {
  return <article>
    <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>HVAC + plumbing</span></nav>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">HVAC, insulation, and plumbing worksheets</h1>
      <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">These tools offer limited planning estimates. They are not substitutes for load calculations, equipment submittals, code review, or site-specific design.</p>
    </div></section>
    <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>)}</div></section>
    <section className="container-content pb-16"><div className="guide-prose">
      <h2>Equipment selection needs project-specific analysis</h2>
      <p>Heating and cooling loads depend on climate, building enclosure, windows, air leakage, occupancy, ventilation, and equipment performance. A simple area guide cannot account for all of these. Do not use a room or area estimate to select whole-home equipment; ask a qualified HVAC professional for the appropriate load calculation and equipment selection.</p>
      <p>The <Link href="/btu-calculator" className="text-accent hover:underline">room air-conditioner guide</Link> is limited to its stated area chart and adjustments; it is not central-air sizing. The <Link href="/heat-pump-calculator" className="text-accent hover:underline">heat-pump estimator</Link> is not a Manual J calculation, site survey, or guarantee of capacity, efficiency, operating cost, or comfort. Compare equipment submittals and itemized local bids rather than treating a calculator result as a recommendation.</p>
      <h2>Insulation and water heating</h2>
      <p>The <Link href="/insulation-calculator" className="text-accent hover:underline">insulation estimator</Link> does not determine a code-required R-value or diagnose moisture, air leakage, thermal bridging, or assembly compatibility. Requirements vary by location and assembly; confirm them with current local rules and product documentation. The <Link href="/water-heater-calculator" className="text-accent hover:underline">water-heater worksheet</Link> is not a product selection or plumbing design. Actual hot-water demand, recovery, temperature rise, fuel, flow, and installation requirements must be evaluated for the household and exact equipment.</p>
      <h2>Drainage examples are not pipe sizing</h2>
      <p>The <Link href="/drain-pipe-calculator" className="text-accent hover:underline">fixture-unit worksheet</Link> totals selected illustrative fixture-unit values only. It does not determine drainage or vent pipe diameter, slope, developed length, branch limits, permitted connections, or local-code compliance. Plumbing requirements depend on the adopted code and complete system; have the design reviewed by a qualified plumbing professional and authority having jurisdiction.</p>
      <p>For installed project costs, use the <Link href="/cost-to-replace-hvac" className="text-accent hover:underline">HVAC bid-comparison guide</Link> to compare equivalent written scope. Its benchmarks are not quotes or savings guarantees.</p>
    </div></section>
  </article>;
}
