import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to replace a roof?",
  description: "Compare roofing replacement quotes by measured roof area, tear-off, decking, flashing, ventilation, and defined material scope.",
  alternates: { canonical: "/cost-to-replace-a-roof" },
};

export default function CostToReplaceARoof() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides</nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to replace a roof?</h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">A useful estimate starts with the roof planes and a complete scope—not the house&apos;s floor area or a national headline price.</p>
      </div></section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>A national benchmark has a defined scope</h2>
        <p>The <a href="https://www.jlconline.com/cost-vs-value/2025/national/">2025 Cost vs. Value report</a> lists a $31,871 national average job cost for its defined asphalt-shingle roof replacement. This is a historical 2025 benchmark, not a 2026 quote for your roof. Roof complexity, area, material, local labor, and repair needs can change the price.</p>
        <h2>Measure roof area rather than floor area</h2>
        <p>For one simple roof plane, roof surface area equals its horizontal plan area multiplied by a pitch factor. With rise in inches per 12 inches of run, the factor is the square root of 1 + (rise ÷ 12)². A 6-in-12 pitch has a factor of about 1.118: 2,000 square feet of horizontal area would represent about 2,236 square feet of sloped plane before overhangs, hips, valleys, openings, and waste. Real roofs must be measured plane by plane. The <Link href="/roofing-calculator" className="text-accent hover:underline">roofing calculator</Link> gives a preliminary material quantity, not a contractor survey or installation price.</p>
        <h2>Compare the same roofing system</h2>
        <p>Ask for written line items for tear-off and disposal, decking repair allowance and per-sheet price, underlayment, ice barrier where applicable, flashing and penetrations, drip edge, shingles by manufacturer and product, ventilation, permits, cleanup, and warranty terms. A low bid that omits damaged decking or flashing work is not directly comparable with a complete bid.</p>
        <p>The <a href="https://www.asphaltroofing.org/reroofing-replacement-vs-recover/">Asphalt Roofing Manufacturers Association explains</a> that replacing and covering over an existing roof are different processes. Existing deck condition, shingle condition, ventilation, code, and manufacturer requirements affect whether an overlay is appropriate. Do not assume an overlay saves a fixed percentage or that it is allowed on your roof.</p>
        <h2>Before signing</h2>
        <p>Request multiple written estimates, check licensing and insurance where required, and document how concealed repairs will be approved. The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam">FTC&apos;s contractor guidance</a> recommends that written estimates describe the work, materials, completion date, and price. Do not treat an online estimate as an inspection of the roof&apos;s condition.</p>
        <h2>Source and limits</h2>
        <p>The dated national figure comes directly from the report linked above. The area example is geometry, not a job quote. Tallyard has not verified a current local roofing price for your address; use written bids for purchasing decisions.</p>
      </div></section>
    </article>
  );
}
