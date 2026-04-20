import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Roofing, siding, gutter, and exterior calculators — Tallyard", description: "Calculators for roofing, siding, gutters, attic ventilation, snow load, and garage doors.", alternates: { canonical: "/calculators/roofing-exterior" } };
const tools = [
  { slug: "roofing-calculator", name: "Roofing calculator", desc: "Squares of shingles by footprint and pitch." },
  { slug: "siding-calculator", name: "Siding calculator", desc: "Squares of siding by wall area with deductions." },
  { slug: "gutter-calculator", name: "Gutter calculator", desc: "Linear feet and downspout count." },
  { slug: "attic-ventilation-calculator", name: "Attic ventilation calculator", desc: "Net free vent area per IRC R806." },
  { slug: "snow-load-calculator", name: "Snow load calculator", desc: "Roof snow load per ASCE 7." },
  { slug: "garage-door-calculator", name: "Garage door calculator", desc: "Door sizing and headroom check." },
];
export default function RoofingExteriorPillar() { return (<article>
  <section className="container-wide pt-6 md:pt-8"><div className="bg-bg-warm rounded-xl p-8 md:p-10">
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Roofing + exterior</span></nav>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Roofing, siding, and exterior</h1>
    <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Six calculators for the building envelope. Roof, walls, gutters, and ventilation work as one system.</p>
  </div></section>
  <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>))}</div></section>
  <section className="container-content pb-16"><div className="guide-prose">
    <h2>The building envelope is one system, not four separate projects</h2>
    <p>Roof, siding, gutters, and attic ventilation work together. Replace the roof without upgrading ventilation and the new shingles bake from underneath. Replace siding without fixing gutters and water runs behind the new cladding. These calculators cover each component individually, but the best time to address all of them is during the same renovation.</p>
    <h2>Roofing: pitch changes everything</h2>
    <p>A 6/12 pitch has 12% more surface area than the footprint. A 12/12 pitch has 41% more. The <Link href="/roofing-calculator" className="text-accent hover:underline">roofing calculator</Link> applies pitch multipliers automatically. For siding, the <Link href="/siding-calculator" className="text-accent hover:underline">siding calculator</Link> measures wall area separately. Our <Link href="/guides/vinyl-vs-fiber-cement-siding" className="text-accent hover:underline">siding buying guide</Link> compares 30-year costs.</p>
    <h2>Ventilation and snow load</h2>
    <p>The <Link href="/attic-ventilation-calculator" className="text-accent hover:underline">attic ventilation calculator</Link> sizes vents per IRC R806. The <Link href="/snow-load-calculator" className="text-accent hover:underline">snow load calculator</Link> checks whether your roof can handle the weight. The <Link href="/planner/replace-a-roof" className="text-accent hover:underline">roof replacement planner</Link> chains shingles, ventilation, and gutters into one material list.</p>
  </div></section>
</article>); }
