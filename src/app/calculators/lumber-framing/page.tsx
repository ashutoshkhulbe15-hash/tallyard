import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Lumber, framing, stair, and shed calculators — Tallyard", description: "Calculators for board feet, stair rise/run, stud spacing, window sizing, and shed materials with IRC references.", alternates: { canonical: "/calculators/lumber-framing" } };
const tools = [
  { slug: "lumber-calculator", name: "Lumber calculator", desc: "Board feet and linear feet by dimensions." },
  { slug: "stair-calculator", name: "Stair calculator", desc: "Rise, run, and stringers per IRC R311.7." },
  { slug: "stud-spacing-calculator", name: "Stud spacing calculator", desc: "Stud count including king, jack, and cripples." },
  { slug: "window-sizing-calculator", name: "Window sizing calculator", desc: "Egress, light, and ventilation per IRC." },
  { slug: "shed-calculator", name: "Shed calculator", desc: "Framing lumber, sheathing, and roofing." },
];
export default function LumberFramingPillar() { return (<article>
  <section className="container-wide pt-6 md:pt-8"><div className="bg-bg-warm rounded-xl p-8 md:p-10">
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Lumber + framing</span></nav>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Lumber, framing, and structural</h1>
    <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Five tools for the skeleton of any building project. Every dimension is code-mandated by the IRC.</p>
  </div></section>
  <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>))}</div></section>
  <section className="container-content pb-16"><div className="guide-prose">
    <h2>Framing is the one phase where every dimension is code-mandated</h2>
    <p>The <Link href="/stud-spacing-calculator" className="text-accent hover:underline">stud spacing calculator</Link> counts regular studs plus king, jack, and cripple studs at openings. The <Link href="/stair-calculator" className="text-accent hover:underline">stair calculator</Link> enforces IRC R311.7 (max 7.75&quot; rise, min 10&quot; run). The <Link href="/window-sizing-calculator" className="text-accent hover:underline">window sizing calculator</Link> checks egress, light, and ventilation requirements.</p>
    <h2>Lumber pricing: board feet vs linear feet</h2>
    <p>The <Link href="/lumber-calculator" className="text-accent hover:underline">lumber calculator</Link> converts between board feet and linear feet. A 2×4 at 8 feet is 5.33 board feet. The <Link href="/shed-calculator" className="text-accent hover:underline">shed calculator</Link> estimates full material lists for backyard sheds, which use the same framing principles at a smaller scale.</p>
  </div></section>
</article>); }
