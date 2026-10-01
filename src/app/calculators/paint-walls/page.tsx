import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paint, Wallpaper, and Drywall Estimators | Tallyard",
  description: "Limited surface-area and material estimators for paint, wallpaper, and drywall. Confirm product coverage and project requirements separately.",
  alternates: { canonical: "/calculators/paint-walls" },
};

const tools = [
  { slug: "paint-calculator", name: "Paint quantity estimator", desc: "Estimated quantity from entered surfaces, openings, coats, and stated coverage assumptions." },
  { slug: "wallpaper-calculator", name: "Wallpaper roll estimator", desc: "Roll count from net area and exact label coverage; pattern layout is not modeled." },
  { slug: "drywall-calculator", name: "Drywall quantity estimator", desc: "Sheet and related quantity estimates; not a board specification or installation plan." },
];

export default function PaintWallsPillar() {
  return <article>
    <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Paint + walls</span></nav>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Paint, wallpaper, and drywall estimates</h1>
      <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">These tools estimate quantities from entered dimensions and assumptions. Product coverage, substrate conditions, layout, openings, and local requirements can change the final takeoff.</p>
    </div></section>
    <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>)}</div></section>
    <section className="container-content pb-16"><div className="guide-prose">
      <h2>Measure each surface and check the product data</h2>
      <p>Room dimensions can provide a starting point, but irregular walls, ceilings, openings, trim, texture, repairs, application method, and number of coats affect actual material use. Use measurements from the space and the current coverage information for the selected product. Treat any allowance as a planning assumption, not a guarantee of the amount to purchase.</p>
      <p>The <Link href="/paint-calculator" className="text-accent hover:underline">paint estimator</Link> calculates from its displayed inputs and coverage assumption; actual spreading rate depends on product and surface. The <Link href="/wallpaper-calculator" className="text-accent hover:underline">wallpaper estimator</Link> is sensitive to roll dimensions and pattern-repeat assumptions; verify usable coverage and repeat information on the exact roll. Neither provides a professional job quote or installation specification.</p>
      <p>The <Link href="/drywall-calculator" className="text-accent hover:underline">drywall estimator</Link> is not a framing layout, fire-resistance assembly, moisture-control plan, board-type selection, or code check. Board requirements vary by use and assembly. Follow approved plans, manufacturer instructions, and local rules; use a qualified professional for fire-rated, wet-area, structural, or other regulated assemblies.</p>
      <p>For finish and material choices, check the manufacturer’s current product documentation and confirm the work scope with the installer. Separate calculators do not coordinate sequencing, compatibility, labor, or complete material lists.</p>
    </div></section>
  </article>;
}
