import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to install siding?",
  description: "Compare siding replacement quotes by measured wall area, removal, repairs, trim, and material—not an unsupported national 2026 price.",
  alternates: { canonical: "/cost-to-install-siding" },
};

export default function CostToInstallSiding() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="pt-2 pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to install siding?</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Measure the exterior wall area and compare complete bids for the same work. Floor area alone does not tell you how much siding the house needs.</p>
        </div>
      </section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>Use a published benchmark carefully</h2>
        <p>The <a href="https://www.jlconline.com/cost-vs-value/2025/national/">2025 Cost vs. Value report</a> lists national average job costs of $17,950 for its defined vinyl-siding replacement project and $21,485 for its defined fiber-cement project. These are 2025 report figures for specific project scopes—not 2026 prices, local quotes, or a per-square-foot rate that applies to every home. Compare the report&apos;s project definitions with your own scope before using it as a budget reference.</p>
        <h2>What changes your actual quote</h2>
        <p>Request a measured siding area and an itemized scope covering removal and disposal, any damaged sheathing, weather barrier, flashing, trim, corners, caulking, finish, access equipment, permits, and cleanup. Ask whether a quoted price includes both materials and labor. A wall with many windows, stories, or complex details can cost more to install than an equal area of simple wall.</p>
        <p>Compare vinyl, fiber cement, and wood on the same measured area and the same inclusion list. Document the manufacturer, product line, finish, warranty terms, and installation requirements. Some materials require periodic finish work; the interval and price depend on product, exposure, and maintenance, so a universal 30-year ownership-cost winner is not supportable from an installation quote alone.</p>
        <h2>Do not assume an insurance discount</h2>
        <p>A fire classification for a material does not by itself establish a discount on your homeowner&apos;s policy. Ask your insurer whether the installed assembly and your address qualify, and get any premium change in writing. Do not subtract a hypothetical discount from the siding bid.</p>
        <p>Use the <Link href="/siding-calculator" className="text-accent hover:underline">siding calculator</Link> for a preliminary quantity estimate. Have bidders verify dimensions and assess the wall condition on site.</p>
        <h2>Source and limits</h2>
        <p>The numerical benchmark above is attributed to the publisher&apos;s 2025 national report. Tallyard has not independently verified current local material or contractor prices for your project; written local bids are the basis for a purchasing decision.</p>
      </div></section>
    </article>
  );
}
