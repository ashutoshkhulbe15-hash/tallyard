import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Bathroom Remodel Measurement Tools | Tallyard",
  description: "Separate area and package estimators for bathroom surfaces. No waterproofing, plumbing, electrical, installation design, or complete cost takeoff.",
  alternates: { canonical: "/planner/remodel-a-bathroom" },
};

export default function BathroomPlannerPage() {
  return <>
    <section className="container-wide pt-7 md:pt-10"><div className="pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/planner" className="hover:text-accent transition-colors">Planner</Link><span className="mx-2">·</span><span>Bathroom</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink"><BannerHeadline text="Plan your bathroom remodel." /></h1>
      <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">Use separate measurement estimators for individual surfaces. They do not create a coordinated remodel takeoff, construction sequence, installation plan, or project quote.</p>
    </div></section>
    <section className="container-content py-10"><div className="guide-prose">
      <h2>Keep quantity estimates separate from system design</h2>
      <p>The previous planner inferred tile, grout, waterproofing, vanity, paint, accessories, quantities, installation steps, and prices from a small set of room dimensions. Those outputs depended on unverified assumptions and could not specify a compatible waterproofing assembly, plumbing, electrical work, clearances, or a complete bill of materials, so the combined takeoff is no longer offered.</p>
      <ul>
        <li><Link href="/tile-calculator" className="text-accent hover:underline">Tile package estimator</Link> — area and exact package coverage.</li>
        <li><Link href="/shower-tile-calculator" className="text-accent hover:underline">Shower tile package estimator</Link> — user-measured tiled area and product coverage; no waterproofing design.</li>
        <li><Link href="/grout-calculator" className="text-accent hover:underline">Grout package estimator</Link> — area and exact package coverage; no grout-type selection.</li>
        <li><Link href="/vanity-calculator" className="text-accent hover:underline">Vanity size estimator</Link> — preliminary dimensions only; not code or accessibility approval.</li>
        <li><Link href="/paint-calculator" className="text-accent hover:underline">Paint estimator</Link> — confirm product coverage and surface conditions.</li>
      </ul>
      <p>Bathroom construction involves waterproofing, drainage, plumbing, electrical safety, ventilation, substrate compatibility, and accessibility requirements. Follow the specified manufacturer system and approved plans; obtain qualified trades and local review for work that requires it. Compare current local bids using an equivalent written scope.</p>
      <p>For cost scoping, see the <Link href="/cost-to-remodel-a-bathroom" className="text-accent hover:underline">bathroom bid-comparison guide</Link>; it is not an estimate for your specific project.</p>
    </div></section>
  </>;
}
