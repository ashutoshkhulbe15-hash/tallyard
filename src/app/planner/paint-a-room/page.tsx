import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Room Painting Measurement Guide | Tallyard",
  description: "Measure a room and estimate paint using product-specific coverage. No assumed current prices or guaranteed material list.",
  alternates: { canonical: "/planner/paint-a-room" },
};

export default function PaintPlannerPage() {
  return <>
    <section className="container-wide pt-7 md:pt-10"><div className="pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/planner" className="hover:text-accent transition-colors">Planner</Link><span className="mx-2">·</span><span>Paint</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink"><BannerHeadline text="Plan your paint job." /></h1>
      <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">Estimate paint with measured surfaces, the exact product&apos;s stated coverage, and coat count. Actual use depends on substrate, preparation, application, and product instructions.</p>
    </div></section>
    <section className="container-content py-10"><div className="guide-prose">
      <h2>Measure only the surfaces you plan to coat</h2>
      <p>Record each wall’s width and height, then add the ceiling or other surfaces only if they will be painted. Note doors, windows, built-ins, and areas with a different finish; use the calculator’s displayed opening assumptions and review large or unusual openings yourself. Keep the number of coats separate from the area measurement.</p>
      <p>Enter coverage from the exact paint label, not a generic “gallons per room” rule. Coverage can change with texture, porosity, color change, preparation, application method, and the product. Primer is a separate product decision: follow the substrate and coating manufacturer’s instructions and include it only where specified. The result is a planning quantity, not a guaranteed purchase amount or quote.</p>
      <ul>
        <li><Link href="/paint-calculator" className="text-accent hover:underline">Paint quantity estimator</Link> — use its displayed coverage assumptions and confirm them against the product label.</li>
        <li><Link href="/drywall-calculator" className="text-accent hover:underline">Drywall estimator</Link> — separate sheet/finish-material estimates, not installation specification.</li>
        <li><Link href="/cost-to-paint-a-house" className="text-accent hover:underline">Painting bid-comparison guide</Link> — compare written scopes; it is not a local quote.</li>
      </ul>
    </div></section>
  </>;
}
