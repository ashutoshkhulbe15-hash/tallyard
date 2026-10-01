import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to build a fence?",
  description: "Estimate fence quantities and compare written bids for the same length, material, gates, site work, and permits.",
  alternates: { canonical: "/cost-to-build-a-fence" },
};

export default function CostToBuildAFence() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides</nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to build a fence?</h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Measure the proposed fence line and define the gates, material, height, and ground conditions before comparing prices.</p>
      </div></section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>Build the estimate from your layout</h2>
        <p>Walk and measure each straight segment. Record corners, changes in grade, gates, and where the fence would meet a building. For a single straight 200-foot run with posts at no more than 8-foot intervals, the arithmetic is 25 intervals and 26 end-to-end post positions. Actual layout can require additional posts or different spacing for gates, corners, wind exposure, and the chosen system. Use the <Link href="/fence-calculator" className="text-accent hover:underline">fence calculator</Link> as a preliminary takeoff, then have the installer verify the layout.</p>
        <h2>Get like-for-like written bids</h2>
        <p>Specify the fence type and product line, height, exact length, number and width of gates, post and footing details, hardware, finish, removal of old fencing, haul-away, grading, permits, and cleanup. Ask whether the bid includes rock excavation or other difficult ground conditions. A per-linear-foot number without those inclusions is not a complete project price.</p>
        <p>There is no verified national 2026 installed-price survey behind this page, so we do not assign one price range to every yard. Obtain multiple local written estimates and compare their scope and exclusions. The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam">FTC recommends written estimates</a> that describe work, materials, timing, and price.</p>
        <h2>Confirm the boundary and utilities before digging</h2>
        <p>Do not treat an existing fence as proof of the legal property line. Check your survey and local setback, height, permit, and homeowners-association requirements as applicable. Rules vary by jurisdiction; no universal number of inches inside the line applies everywhere.</p>
        <p>In the U.S., <a href="https://811beforeyoudig.com/Before-You-Dig/">contact 811 before any post-hole digging</a> and wait for the required utility responses. If a contractor is doing the work, confirm who will request the locate. Utility marks indicate approximate locations; follow the local 811 center&apos;s instructions for digging near them.</p>
        <h2>Source and limits</h2>
        <p>The post-count example is layout arithmetic, not a design or quote. FTC and 811 guidance support the bidding and digging steps. Material suitability, structural details, and the project price require site-specific verification.</p>
      </div></section>
    </article>
  );
}
