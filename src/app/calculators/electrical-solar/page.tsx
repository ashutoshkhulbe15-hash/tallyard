import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solar and Electrical Planning Worksheets | Tallyard",
  description: "Limited solar and electrical estimates. Outputs are not electrical designs, code checks, or equipment recommendations.",
  alternates: { canonical: "/calculators/electrical-solar" },
};

const tools = [
  { slug: "solar-calculator", name: "Solar energy-use scenario", desc: "Panel-count arithmetic from entered usage and assumptions; not a production forecast or system design." },
  { slug: "wire-size-calculator", name: "Conductor voltage-drop worksheet", desc: "Limited lookup and voltage-drop estimate; not a conductor or circuit safety determination." },
  { slug: "extension-cord-calculator", name: "Extension-cord voltage-drop estimator", desc: "Estimate voltage drop for selected inputs; does not rate a cord or load as safe." },
];

export default function ElectricalSolarPillar() {
  return <article>
    <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Electrical + solar</span></nav>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Solar and electrical planning estimates</h1>
      <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Electrical and photovoltaic work can create serious safety risks. These calculators are limited estimates only—not circuit design, code approval, product selection, or permission to perform electrical work.</p>
    </div></section>
    <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>)}</div></section>
    <section className="container-content pb-16"><div className="guide-prose">
      <h2>Do not use estimates as wiring instructions</h2>
      <p>Permitted conductor ampacity depends on more than current and distance: conductor material and insulation, terminal temperature ratings, installation method, ambient conditions, bundling, overcurrent protection, equipment instructions, and locally adopted electrical code all matter. A voltage-drop calculation cannot establish ampacity or safety.</p>
      <p>The <Link href="/wire-size-calculator" className="text-accent hover:underline">conductor worksheet</Link> does not replace a complete code-based circuit design. The <Link href="/extension-cord-calculator" className="text-accent hover:underline">extension-cord estimator</Link> only estimates voltage drop for selected values; it does not establish a cord&apos;s ampacity, listing, condition, suitability, or safe use. Use properly listed equipment and consult a licensed electrician for wiring and cord-selection questions.</p>
      <p>To discuss a circuit with an electrician, have the equipment nameplate, supply voltage, overcurrent-device information, conductor material, one-way route length, installation conditions, and applicable plans available. Do not infer the wire from a voltage-drop result alone. Never use this worksheet to justify an undersized, damaged, unlisted, or overloaded cord.</p>
      <h2>Solar calculations are site-specific</h2>
      <p>The <Link href="/solar-calculator" className="text-accent hover:underline">solar estimator</Link> uses entered energy and solar-resource assumptions. It does not model roof orientation, shading, weather variation, equipment losses in detail, utility tariffs, export compensation, interconnection, storage, structural capacity, or fire/setback requirements. A qualified installer must assess the site and provide system design and production estimates.</p>
      <p>For a solar consultation, gather 12 months of electricity bills or interval usage if available, the utility rate plan, roof-plane directions and shading notes, and the main-panel/equipment details. Ask the installer to state the assumed production, system losses, export rules, storage behavior, and incentive eligibility separately. The calculator’s assumed panel count is not a promised annual yield or a permit-ready design.</p>
      <p>Incentives, utility programs, and rules can change. Verify any potential incentive directly with the administering government agency or utility before relying on it. The <Link href="/cost-to-install-solar" className="text-accent hover:underline">solar cost guide</Link> is a bid-comparison aid, not a current quote, incentive determination, or payback guarantee.</p>
    </div></section>
  </article>;
}
