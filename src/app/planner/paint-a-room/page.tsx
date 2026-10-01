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
      <h2>Use product coverage, not a universal price or yield</h2>
      <p>The previous planner assigned generic paint grades, prices, primer and ceiling quantities, and supplies from room dimensions. It could not verify the selected product, surface condition, openings, preparation, application rate, or current local price, so those outputs are no longer presented as a project takeoff or quote.</p>
      <p>Measure each wall and ceiling surface you intend to coat and account for openings and non-painted areas. Check the chosen paint and primer labels for coverage and recoat instructions, and ask the supplier or painter to review the quantity. Primer choice depends on the surface and product system; follow manufacturer and project guidance.</p>
      <ul>
        <li><Link href="/paint-calculator" className="text-accent hover:underline">Paint quantity estimator</Link> — use its displayed coverage assumptions and confirm them against the product label.</li>
        <li><Link href="/drywall-calculator" className="text-accent hover:underline">Drywall estimator</Link> — separate sheet/finish-material estimates, not installation specification.</li>
        <li><Link href="/cost-to-paint-a-house" className="text-accent hover:underline">Painting bid-comparison guide</Link> — compare written scopes; it is not a local quote.</li>
      </ul>
    </div></section>
  </>;
}
