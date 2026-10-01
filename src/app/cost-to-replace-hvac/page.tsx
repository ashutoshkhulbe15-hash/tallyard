import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to replace an HVAC system?",
  description:
    "Compare itemized furnace, AC, and heat-pump replacement quotes without assuming expired federal tax credits or universal payback figures.",
  alternates: { canonical: "/cost-to-replace-hvac" },
};

export default function CostToReplaceHVAC() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="pt-2 pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">·</span>Cost guides
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">
            How much does it cost to replace your HVAC system?
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            Compare the complete installed cost and expected operating cost of each system for your home.
          </p>
        </div>
      </section>
      <section className="container-content py-10 md:py-14">
        <div className="guide-prose">
          <h2>Get quotes for equivalent work</h2>
          <p>
            A furnace-plus-AC replacement and a heat pump can both heat and cool, but they may require different
            duct, electrical, refrigerant-line, or backup-heating work. Ask contractors to itemize equipment and
            model numbers, installation labor, permits, electrical or gas modifications, duct repairs, disposal,
            warranty, and financing cost. A low equipment price can hide expensive required work.
          </p>
          <p>
            Ask for a room-by-room heating and cooling load calculation rather than sizing the replacement solely
            from the old unit&apos;s nameplate or square footage. Compare proposed equipment at the same design
            temperatures and ask how the system will handle the coldest local conditions. The
            <Link href="/heat-pump-calculator" className="text-accent hover:underline"> heat pump calculator</Link>
            is a preliminary estimate, not a contractor load calculation.
          </p>
          <h2>Check incentive rules before comparing net prices</h2>
          <p>
            The IRS says the Section 25C Energy Efficient Home Improvement Credit is not allowed for property
            placed in service after December 31, 2025. Do not subtract the former federal heat-pump credit from
            a new 2026 installation. See the <a href="https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb">IRS expiration guidance</a>.
            Local rebates may still exist, but eligibility, amounts, and program funding vary; verify them with the
            administering agency before treating them as a discount.
          </p>
          <h2>Model operating costs separately</h2>
          <p>
            Compare expected annual electricity and gas use using your local tariffs, the equipment&apos;s rated
            performance, and your home&apos;s heating and cooling load. Include fixed gas charges only if you will
            actually disconnect gas service. Heat-pump performance varies with outdoor temperature, so a universal
            annual savings or payback claim would be misleading. Compare cash and financed totals over the expected
            ownership period, not just the monthly payment.
          </p>
          <p>
            For an initial sizing discussion, use the <Link href="/btu-calculator" className="text-accent hover:underline">BTU calculator</Link>.
            The <Link href="/guides/heat-pump-vs-furnace" className="text-accent hover:underline">heat pump vs furnace guide</Link>
            explains the system tradeoffs. Neither replaces a site-specific design or written contractor quote.
          </p>
          <h2>Sources and scope</h2>
          <p>
            Federal-credit status is based on the current IRS guidance linked above. The quote checklist is a
            comparison method, not a national 2026 price survey. We do not claim a typical installed price or
            guaranteed payback without verifiable market and home-specific data.
          </p>
        </div>
      </section>
    </article>
  );
}
