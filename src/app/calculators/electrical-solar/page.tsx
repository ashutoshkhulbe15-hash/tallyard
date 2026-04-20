import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Solar, electrical, and wire calculators — Tallyard", description: "Calculators for solar panels, wire gauge, and extension cords with NEC references.", alternates: { canonical: "/calculators/electrical-solar" } };
const tools = [
  { slug: "solar-calculator", name: "Solar calculator", desc: "System size, panel count, cost, and payback period." },
  { slug: "wire-size-calculator", name: "Wire size calculator", desc: "AWG gauge by amperage and distance per NEC." },
  { slug: "extension-cord-calculator", name: "Extension cord calculator", desc: "Correct gauge by tool amperage and cord length." },
];
export default function ElectricalSolarPillar() { return (<article>
  <section className="container-wide pt-6 md:pt-8"><div className="bg-bg-warm rounded-xl p-8 md:p-10">
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Electrical + solar</span></nav>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Solar, wire sizing, and electrical</h1>
    <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Three tools for the most code-regulated category. Electrical sizing references NEC tables because the consequences of undersizing are severe.</p>
  </div></section>
  <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>))}</div></section>
  <section className="container-content pb-16"><div className="guide-prose">
    <h2>Electrical calculations are safety calculations</h2>
    <p>Undersized wire overheats and starts fires. The <Link href="/wire-size-calculator" className="text-accent hover:underline">wire size calculator</Link> references NEC Table 310.16. The <Link href="/extension-cord-calculator" className="text-accent hover:underline">extension cord calculator</Link> prevents the 3,300 cord fires per year caused by undersized cords.</p>
    <h2>Solar: sizing starts with your electric bill</h2>
    <p>The <Link href="/solar-calculator" className="text-accent hover:underline">solar calculator</Link> sizes arrays by monthly kWh and peak sun hours. The 30% federal ITC applies through 2032. Payback ranges from 4 to 14 years depending on electricity rate and location.</p>
  </div></section>
</article>); }
