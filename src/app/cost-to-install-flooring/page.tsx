import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to install flooring?",
  description: "Compare flooring bids for equal room area, product, subfloor preparation, removal, transitions, installation, and cleanup.",
  alternates: { canonical: "/cost-to-install-flooring" },
};

export default function CostToInstallFlooring() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/" className="hover:text-accent transition-colors">Home</Link><span className="mx-2">·</span>Cost guides</nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">How much does it cost to install new flooring?</h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">A comparable flooring quote includes more than the price on the box. Define the product, subfloor condition, preparation, and removal before comparing bids.</p>
      </div></section>
      <section className="container-content py-10 md:py-14"><div className="guide-prose">
        <h2>Define the room and product</h2>
        <p>Measure each room and note closets, thresholds, stairs, and transitions. Specify the exact product line, format, thickness or wear layer where relevant, finish, and installation method. Order quantities depend on layout and cuts; use the <Link href="/flooring-calculator" className="text-accent hover:underline">flooring calculator</Link> for a preliminary material estimate and check the manufacturer&apos;s installation instructions for acclimation, underlayment, and substrate requirements.</p>
        <h2>Make sure bids include the same work</h2>
        <p>Request separate line items for existing-floor removal and disposal, subfloor inspection and leveling, moisture mitigation if needed, underlayment, adhesive or fasteners, installation labor, transitions, trim, appliance or furniture handling, permits where applicable, and cleanup. Ask how concealed subfloor damage will be handled and require approval before extra work begins.</p>
        <p>Installation scope differs by material and product system. Floating click-lock products may have different substrate and underlayment requirements than glue-down, nail-down, or tile installations. Do not assume new flooring can be installed over an existing surface; check the chosen manufacturer&apos;s instructions and have the installer assess flatness, moisture, and compatibility.</p>
        <h2>Separate material quantity from installed price</h2>
        <p>The <Link href="/flooring-calculator" className="text-accent hover:underline">flooring calculator</Link> estimates quantity from area and a selected allowance. It does not know current retail prices, local labor rates, subfloor repairs, or removal costs. The <Link href="/tile-calculator" className="text-accent hover:underline">tile calculator</Link> and <Link href="/grout-calculator" className="text-accent hover:underline">grout calculator</Link> can help estimate quantities for tile work, but do not size structural support or verify substrate suitability.</p>
        <h2>Source and limits</h2>
        <p>No current, project-matched national installation-price survey was verified for this guide, so it does not state a generic 2026 price range. Compare local written bids for the same area, product, and work scope.</p>
      </div></section>
    </article>
  );
}
