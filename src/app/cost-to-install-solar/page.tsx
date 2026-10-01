import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How much does it cost to install solar panels?",
  description:
    "Compare solar installation quotes, estimate production and payback, and check which incentives actually apply to a new installation.",
  alternates: { canonical: "/cost-to-install-solar" },
};

export default function CostToInstallSolar() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="pt-2 pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">·</span>Cost guides
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">
            How much does it cost to install solar panels?
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            The useful price is the installed quote for your roof, equipment, and utility rules—not a national after-credit estimate.
          </p>
        </div>
      </section>
      <section className="container-content py-10 md:py-14">
        <div className="guide-prose">
          <h2>Start with comparable installed quotes</h2>
          <p>
            Ask at least three installers for an itemized cash price, system size in DC watts, annual production estimate,
            equipment models, roof and electrical work, warranties, and a separate financing offer. Divide the installed
            cash price by DC watts to compare dollars per watt. A battery, roof repair, or panel upgrade can make two
            otherwise similar proposals very different; compare those items separately.
          </p>
          <p>
            For an illustration of the arithmetic only, a $18,000 quote for a 6,000-watt array is $3.00 per watt.
            That is not a claim that this is the current average price, nor a quote for your home. Marketplace averages
            change with geography, system size, and the period sampled. Check the source and date before using any
            published benchmark.
          </p>
          <h2>Do not subtract an expired federal credit</h2>
          <p>
            The IRS says the Section 25D residential clean-energy credit is not available for expenditures after
            December 31, 2025. For this purpose, the IRS generally treats the expenditure as made when the original
            installation is completed. A new residential installation completed in 2026 should not be priced as though
            it receives the former 30% credit. See the <a href="https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb">IRS guidance on the expiration and timing rule</a>.
          </p>
          <p>
            State, utility, and local incentives vary. Verify availability, eligibility, funding, and application timing
            with the administering program before subtracting any amount from a quote. An installer&apos;s projected
            incentive is not a guarantee.
          </p>
          <h2>Estimate payback from your own bill and tariff</h2>
          <p>
            Use <a href="https://pvwatts.nrel.gov/">NREL PVWatts</a> to estimate annual generation for your location
            and array. Apply your utility&apos;s current import rate, export-credit or net-metering rules, fixed charges,
            and any time-of-use rates. Then account for financing cost, maintenance, and likely equipment replacement.
            Simple payback is the net installed cost divided by estimated annual bill savings; it is not a guarantee
            of future savings or a substitute for a lifetime cash-flow comparison.
          </p>
          <p>
            The <Link href="/solar-calculator" className="text-accent hover:underline">solar calculator</Link> can
            illustrate panel-count arithmetic from entered assumptions; it does not size or forecast a solar array. Obtain a site-specific shade, roof, and electrical assessment
            before signing a contract.
          </p>
          <h2>Sources and scope</h2>
          <p>
            The federal-credit timing above comes from the IRS. For a dated marketplace price benchmark, see
            <a href="https://www.energysage.com/data/"> EnergySage&apos;s published marketplace reports</a>.
            Those samples are not a substitute for current local bids. Production estimates depend on the assumptions
            entered in PVWatts. This guide does not provide tax advice.
          </p>
        </div>
      </section>
    </article>
  );
}
