import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "HVAC, heat pump, and plumbing calculators — Tallyard", description: "Calculators for BTU sizing, heat pump, water heater, insulation, and drain pipe.", alternates: { canonical: "/calculators/hvac-plumbing" } };
const tools = [
  { slug: "btu-calculator", name: "BTU calculator", desc: "Cooling capacity by room size and conditions." },
  { slug: "heat-pump-calculator", name: "Heat pump calculator", desc: "System sizing by climate zone with cost comparison." },
  { slug: "water-heater-calculator", name: "Water heater calculator", desc: "Tank or tankless sizing by household size." },
  { slug: "insulation-calculator", name: "Insulation calculator", desc: "R-value by climate zone with material comparison." },
  { slug: "drain-pipe-calculator", name: "Drain pipe calculator", desc: "Pipe diameter by DFU load per IPC." },
];
export default function HVACPlumbingPillar() { return (<article>
  <section className="container-wide pt-6 md:pt-8"><div className="bg-bg-warm rounded-xl p-8 md:p-10">
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>HVAC + plumbing</span></nav>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">HVAC, insulation, and plumbing</h1>
    <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Five tools for the systems you pay for monthly. Heating, cooling, hot water, insulation, and drainage determine your utility bills.</p>
  </div></section>
  <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>))}</div></section>
  <section className="container-content pb-16"><div className="guide-prose">
    <h2>Sizing HVAC equipment is the highest-stakes calculation in home improvement</h2>
    <p>An oversized air conditioner costs $3,000 more than the correct size and makes the house less comfortable. It short-cycles: reaching the thermostat setpoint too quickly, shutting off before it has removed humidity from the air, then restarting 6 minutes later. The house sits at 72 degrees and feels clammy. The compressor wears out in 8 years instead of 15. An undersized system runs continuously on the hottest days and cannot maintain the setpoint. Both mistakes cost thousands and last a decade.</p>
    <p>The <Link href="/btu-calculator" className="text-accent hover:underline">BTU calculator</Link> sizes cooling capacity from room dimensions, sun exposure, insulation quality, and occupancy. The baseline is 25 BTU per square foot, adjusted up or down by 10 to 20 percent for each factor. A 2,000 square foot house needs roughly 50,000 BTU (about 4 tons) as a starting point. The calculator applies the adjustments automatically so you get a number you can compare against a contractor&apos;s recommendation.</p>
    <h2>Heat pump vs furnace: a $3,000 decision</h2>
    <p>The <Link href="/heat-pump-calculator" className="text-accent hover:underline">heat pump calculator</Link> sizes heat pumps by climate zone and compares operating cost against gas furnaces. A heat pump replaces both your furnace and your air conditioner in one unit. After the 30 percent federal tax credit (IRA, through 2032), a heat pump often costs less than buying a furnace and AC separately. The <Link href="/guides/heat-pump-vs-furnace" className="text-accent hover:underline">heat pump vs furnace buying guide</Link> covers the full comparison with operating cost numbers by climate zone. The <Link href="/cost-to-replace-hvac" className="text-accent hover:underline">cost to replace HVAC</Link> guide breaks down installed pricing for both options.</p>
    <h2>Insulation: the upgrade that makes everything else smaller</h2>
    <p>Better insulation directly reduces the heating and cooling load your HVAC system handles. Upgrading attic insulation from R-19 to R-49 (the current code minimum in climate zone 5) can drop your required system size by half a ton and cut annual heating and cooling costs by $500 to $1,000. The <Link href="/insulation-calculator" className="text-accent hover:underline">insulation calculator</Link> tells you what R-value your climate zone requires (per IECC 2021) and how much material you need. Attic insulation is the single highest-ROI home improvement: $400 to $600 in materials, DIY in one Saturday, payback in 2 to 4 years.</p>
    <h2>Water heater sizing</h2>
    <p>The <Link href="/water-heater-calculator" className="text-accent hover:underline">water heater calculator</Link> sizes tank or tankless systems by household size and peak demand. A family of four with two bathrooms needs a different system than a couple in a one-bathroom apartment. Undersizing a tank water heater means running out of hot water mid-shower. Undersizing a tankless unit means the water temperature drops when two fixtures run simultaneously.</p>
    <h2>Plumbing: drain pipe sizing is code-driven</h2>
    <p>The <Link href="/drain-pipe-calculator" className="text-accent hover:underline">drain pipe calculator</Link> sizes drain pipes by Drain Fixture Unit (DFU) loading per the International Plumbing Code (IPC). Every fixture has a fixed DFU value: a toilet is 4, a bathtub is 2, a lavatory is 1. The total DFU on any pipe determines its minimum diameter. A toilet always requires a minimum 3-inch drain regardless of total loading. Undersizing causes slow drainage and frequent clogs. Oversizing wastes money on larger pipe and fittings but is not a code violation.</p>
    <h2>How these tools work together</h2>
    <p>The typical HVAC project sequence: first, calculate insulation needs and upgrade the attic (cheapest, highest ROI). Then recalculate the BTU load with the improved insulation. Then size the heat pump or furnace to the reduced load. This sequence can drop a 4-ton system to 3 tons, saving $1,500 to $2,500 in equipment cost on top of the ongoing energy savings.</p>
  </div></section>
</article>); }
