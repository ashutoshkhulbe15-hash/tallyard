import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Fence Project Planning and Measurement Tools | Tallyard",
  description: "Fence planning links and limited straight-run estimates. No footing design, complete material list, property survey, or current quote.",
  alternates: { canonical: "/planner/install-a-fence" },
};

export default function FencePlannerPage() {
  return <>
    <section className="container-wide pt-7 md:pt-10"><div className="pb-8 md:pb-10 border-b border-line">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/planner" className="hover:text-accent transition-colors">Planner</Link><span className="mx-2">·</span><span>Fence</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink"><BannerHeadline text="Plan your fence." /></h1>
      <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">Fence layout and footing requirements depend on property boundaries, grade, soil, exposure, height, gates, materials, and local rules. These links support preliminary measurements, not installation design or a complete order list.</p>
    </div></section>
    <section className="container-content py-10"><div className="guide-prose">
      <h2>Map the actual fence line before estimating quantities</h2>
      <p>Sketch each straight segment between endpoints and corners, and mark every gate and grade change. Record segment lengths separately rather than treating a perimeter as one uninterrupted run. Select the fence height and product first; rail and picket dimensions, post spacing, gate assemblies, and slope transitions differ by system. The estimator below is a preliminary straight-run calculation, not a final order.</p>
      <ul>
        <li><Link href="/fence-calculator" className="text-accent hover:underline">Fence quantity estimator</Link> — limited straight-run counts from entered assumptions; not structural design.</li>
        <li><Link href="/concrete-calculator" className="text-accent hover:underline">Concrete volume calculator</Link> — volume from entered geometry; not footing sizing.</li>
        <li><Link href="/cost-to-build-a-fence" className="text-accent hover:underline">Fence bid-comparison guide</Link> — scope checklist, not a local quote.</li>
      </ul>
      <p>Confirm the boundary from reliable survey information before placing a fence. Check permit, setback, height, and neighborhood requirements with the relevant local authorities, and contact the local utility-location service before digging. Ask an installer to account for corners, gates, slopes, soil, exposure, and the selected system in the final material list.</p>
    </div></section>
  </>;
}
