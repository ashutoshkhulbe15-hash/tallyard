import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roofing and Exterior Measurement Tools | Tallyard",
  description: "Limited measurement estimators for roof area, siding, gutters, attic ventilation, snow weight, and garage-door openings.",
  alternates: { canonical: "/calculators/roofing-exterior" },
};

const tools = [
  { slug: "roofing-calculator", name: "Roof area estimator", desc: "Planar area from a simple footprint and entered pitch; not a complete roof takeoff." },
  { slug: "siding-calculator", name: "Siding area worksheet", desc: "Net measured area with a user-selected allowance; no material or trim takeoff." },
  { slug: "gutter-calculator", name: "Gutter-run length worksheet", desc: "Measured run-length arithmetic only; no drainage or component sizing." },
  { slug: "attic-ventilation-calculator", name: "Attic ventilation worksheet", desc: "Illustrative net-free-area calculation; not a ventilation design." },
  { slug: "snow-load-calculator", name: "Snow weight estimator", desc: "Weight estimate from entered snow/ice values; not a structural safety check." },
  { slug: "garage-door-calculator", name: "Garage door opening estimator", desc: "Dimensions from entered opening; confirm hardware compatibility with manufacturer." },
];

export default function RoofingExteriorPillar() {
  return <article>
    <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Roofing + exterior</span></nav>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Roofing, siding, and exterior measurements</h1>
      <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Six limited estimators for surface area, entered dimensions, or illustrative calculations. None is a coordinated construction takeoff or code/design determination.</p>
    </div></section>
    <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>)}</div></section>
    <section className="container-content pb-16"><div className="guide-prose">
      <h2>Measurement estimates are not assembly design</h2>
      <p>Roof planes, cladding, drainage, ventilation, snow loading, and garage-door hardware are related building systems but require different measurements and specifications. These separate tools do not combine into a coordinated takeoff or establish code compliance, structural capacity, water management, or product compatibility.</p>
      <p>The <Link href="/roofing-calculator" className="text-accent hover:underline">roof area estimator</Link> covers simple planar geometry only; it does not model multiple planes, valleys, dormers, overhangs, or material ordering. The <Link href="/siding-calculator" className="text-accent hover:underline">siding estimator</Link> uses entered dimensions and does not determine a cladding system or trim/flashing quantities. Verify actual surfaces and product coverage against the project plan and supplier data.</p>
      <p>The <Link href="/gutter-calculator" className="text-accent hover:underline">gutter estimator</Link> is not hydraulic sizing. Runoff capacity depends on roof catchment, rainfall intensity, slope, outlets, and product details. The <Link href="/attic-ventilation-calculator" className="text-accent hover:underline">attic ventilation worksheet</Link> is not a ventilation design; net-free-area needs, distribution, air barriers, and moisture control depend on the assembly and applicable requirements.</p>
      <p>The <Link href="/snow-load-calculator" className="text-accent hover:underline">snow estimator</Link> does not assess structural capacity or say whether a roof is safe. For a particular structure, visible distress, or snow-removal decision, contact a qualified professional. The <Link href="/garage-door-calculator" className="text-accent hover:underline">garage-door estimator</Link> does not verify track, spring, opener, or framing compatibility; check manufacturer specifications and use a qualified installer.</p>
      <p>For project scoping, see the <Link href="/cost-to-replace-a-roof" className="text-accent hover:underline">roof replacement</Link> and <Link href="/cost-to-install-siding" className="text-accent hover:underline">siding bid-comparison guides</Link>. Their benchmarks are not quotes; compare the same written scope with local contractors.</p>
    </div></section>
  </article>;
}
