import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lumber and Framing Estimators | Tallyard",
  description: "Limited estimators for lumber quantities, stair geometry, stud counts, window openings, and shed surfaces. Not structural design or code approval.",
  alternates: { canonical: "/calculators/lumber-framing" },
};

const tools = [
  { slug: "lumber-calculator", name: "Lumber quantity worksheet", desc: "Nominal board-foot and lineal-length arithmetic; no structural takeoff, price, or weight." },
  { slug: "stair-calculator", name: "Stair geometry estimator", desc: "Equal-rise and run geometry from user-selected dimensions; not a cut sheet or code check." },
  { slug: "stud-spacing-calculator", name: "Straight-wall spacing count", desc: "Position count from length and selected interval; not a stud takeoff or framing design." },
  { slug: "window-sizing-calculator", name: "Window rectangle area", desc: "Area arithmetic only; no egress, glazing, or code assessment." },
  { slug: "shed-calculator", name: "Shed surface estimator", desc: "Limited surface and sheet estimates; not a framing plan or permit determination." },
];

export default function LumberFramingPillar() {
  return <article>
    <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Lumber + framing</span></nav>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Lumber, framing, and geometry</h1>
      <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">These are limited quantity and geometry estimates. They do not size structural members, establish safe construction, or determine code or permit compliance.</p>
    </div></section>
    <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>)}</div></section>
    <section className="container-content pb-16"><div className="guide-prose">
      <h2>Structural work requires plans and local review</h2>
      <p>Member sizing, connections, bracing, load paths, foundations, species and grade, spans, moisture exposure, and local code requirements cannot be resolved from a simple quantity calculator. Do not build stairs, walls, decks, sheds, or openings from these outputs alone. Obtain project-specific plans and qualified review, and confirm permits and requirements with the local authority.</p>
      <p>The <Link href="/stud-spacing-calculator" className="text-accent hover:underline">spacing worksheet</Link> counts evenly spaced positions on a straight line only; it is not a count of studs and excludes openings and connections. The <Link href="/stair-calculator" className="text-accent hover:underline">stair geometry estimator</Link> reports simple rise/run arithmetic, not a construction-ready stringer cut or code check.</p>
      <p>The <Link href="/window-sizing-calculator" className="text-accent hover:underline">window rectangle-area calculator</Link> performs area arithmetic only. It does not calculate glazing, rough openings, or emergency egress. A separate <Link href="/egress-window-calculator" className="text-accent hover:underline">net clear-opening area calculator</Link> also reports area only and cannot establish life-safety compliance. Consult the local authority and qualified professionals for a specific opening.</p>
      <p>The <Link href="/lumber-calculator" className="text-accent hover:underline">lumber estimator</Link> performs quantity arithmetic from entered dimensions, not member selection. The <Link href="/shed-calculator" className="text-accent hover:underline">shed estimator</Link> covers limited surfaces and sheet quantities; it does not determine framing, roofing system, site conditions, setbacks, or permit exemptions. Confirm materials and approvals for the specific site before construction.</p>
      <p>For installation costs, compare written bids with equivalent scope using the <Link href="/cost-to-build-a-deck" className="text-accent hover:underline">deck</Link> or <Link href="/cost-to-build-a-fence" className="text-accent hover:underline">fence cost guide</Link> as applicable. Those guides are not structural plans or local quotes.</p>
    </div></section>
  </article>;
}
