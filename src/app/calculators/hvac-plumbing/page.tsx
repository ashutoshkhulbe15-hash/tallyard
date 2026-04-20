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
    <p>An oversized AC costs $3,000 more and makes the house less comfortable through short-cycling. The <Link href="/btu-calculator" className="text-accent hover:underline">BTU calculator</Link> and <Link href="/heat-pump-calculator" className="text-accent hover:underline">heat pump calculator</Link> use ACCA Manual J methodology to size correctly. Better <Link href="/insulation-calculator" className="text-accent hover:underline">insulation</Link> reduces the load. The <Link href="/guides/heat-pump-vs-furnace" className="text-accent hover:underline">heat pump vs furnace guide</Link> covers the full comparison.</p>
    <h2>Plumbing: code-driven pipe sizing</h2>
    <p>The <Link href="/drain-pipe-calculator" className="text-accent hover:underline">drain pipe calculator</Link> sizes pipes by DFU loading per the International Plumbing Code. A toilet requires a minimum 3-inch drain regardless of other factors. This is code, not recommendation.</p>
  </div></section>
</article>); }
