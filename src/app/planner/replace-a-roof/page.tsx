import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Roof Replacement Measurement Guide | Tallyard",
  description: "Separate roof-area, ventilation, and gutter worksheets. No shingle order, code design, current cost estimate, or complete roof takeoff.",
  alternates: { canonical: "/planner/replace-a-roof" },
};

export default function RoofPlannerPage() {
  return <>
    <section className="container-wide pt-7 md:pt-10"><div className="pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/planner" className="hover:text-accent transition-colors">Planner</Link><span className="mx-2">·</span><span>Roof</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink"><BannerHeadline text="Plan your roof replacement." /></h1>
      <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">Roof area is only one part of replacement scope. Use the linked worksheets for limited measurements, and get the actual roof assembly, quantities, code requirements, and price from a qualified local roofing professional.</p>
    </div></section>
    <section className="container-content py-10"><div className="guide-prose">
      <h2>Record roof planes and replacement scope</h2>
      <p>Do not use the home’s floor footprint as roof area. A roof has sloped planes, and hips, valleys, dormers, overhangs, and penetrations change both measurement and installation scope. The linked area estimator covers simple entered geometry only; for a real replacement, get field measurements and an itemized takeoff from the roofer. Do not climb onto a roof to measure if access is unsafe.</p>
      <ul>
        <li><Link href="/roofing-calculator" className="text-accent hover:underline">Roof area estimator</Link> — simple planar area only; not material ordering.</li>
        <li><Link href="/attic-ventilation-calculator" className="text-accent hover:underline">Attic ventilation worksheet</Link> — illustrative net-free-area arithmetic, not a ventilation design.</li>
        <li><Link href="/gutter-calculator" className="text-accent hover:underline">Gutter measurement estimator</Link> — not hydraulic capacity or drainage design.</li>
        <li><Link href="/cost-to-replace-a-roof" className="text-accent hover:underline">Roofing bid-comparison guide</Link> — checklist for equivalent written bids, not a current local quote.</li>
      </ul>
      <p>When comparing bids, ask each roofer to identify the roof areas measured, material manufacturer and product, number of existing layers and removal/disposal scope, likely deck repairs and how they are priced, flashing, ventilation, cleanup, warranty, permits, and exclusions. Verify permits and inspection requirements locally. These worksheets cannot determine whether a roof is structurally safe.</p>
    </div></section>
  </>;
}
