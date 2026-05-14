import Link from "next/link";
import type { Metadata } from "next";
import { getAllGuides } from "@/guides";

export const metadata: Metadata = {
  title: "Buying guides — real cost math for home improvement decisions",
  description:
    "In-depth buying guides for home improvement: vinyl vs fiber cement siding, composite vs pressure-treated decking, heat pump vs furnace. Real total cost of ownership math.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const allGuides = getAllGuides();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Home Improvement Guides",
    description: "Buying guides and cost guides for home improvement projects.",
    url: "https://www.tallyard.com/guides",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allGuides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.title,
        url: `https://www.tallyard.com/guides/${g.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {/* Hero */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-12">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Buying guides
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            Decisions that need{" "}
            <span className="accent-italic">real math</span>
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Deep cost comparisons for the home improvement choices where the
            wrong pick costs you thousands over the ownership period. Total
            cost of ownership, not just sticker price.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="container-content py-12 md:py-16">
        <div className="space-y-4">
          {allGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.08em] font-bold text-accent bg-accent-soft px-2 py-0.5 rounded">
                    {guide.categoryLabel}
                  </span>
                  <span className="text-[10px] text-ink-faint">
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2 text-ink group-hover:text-accent transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed mb-4 max-w-2xl">
                  {guide.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.bannerTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold text-ink-faint bg-bg-warm px-2 py-0.5 rounded-full border border-line"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Related calculators preview */}
              <div className="px-6 md:px-7 pb-5 pt-3 border-t border-line bg-bg-warm/50">
                <span className="text-[10px] uppercase tracking-wider text-ink-faint font-semibold">
                  Uses:
                </span>{" "}
                {guide.relatedCalculators.slice(0, 3).map((calc, i) => (
                  <span key={calc.slug} className="text-xs text-ink-muted">
                    {i > 0 && " · "}
                    {calc.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What makes guides different */}
      <section className="bg-bg-warm border-t border-line">
        <div className="container-content py-14 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
            Principles
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            How these guides are{" "}
            <span className="accent-italic">different</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-surface border border-line rounded-lg">
              <div className="text-2xl font-bold tracking-tighter text-accent leading-none mb-2">
                01
              </div>
              <h3 className="text-base font-semibold text-ink mb-1.5">
                Real ownership cost
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Most comparisons stop at installed cost. We calculate 15, 20,
                or 30-year total cost including the maintenance cycles that
                dominate real spending.
              </p>
            </div>
            <div className="p-5 bg-surface border border-line rounded-lg">
              <div className="text-2xl font-bold tracking-tighter text-accent leading-none mb-2">
                02
              </div>
              <h3 className="text-base font-semibold text-ink mb-1.5">
                No affiliate bias
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Tallyard doesn&apos;t take commissions, collect leads, or
                accept sponsored placements. Recommendations reflect what the
                numbers say, not which link pays.
              </p>
            </div>
            <div className="p-5 bg-surface border border-line rounded-lg">
              <div className="text-2xl font-bold tracking-tighter text-accent leading-none mb-2">
                03
              </div>
              <h3 className="text-base font-semibold text-ink mb-1.5">
                Paired with tools
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Each guide links to the Tallyard calculators you need to run
                the math for your specific project. The guide tells you which
                option. The calculator tells you how much.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro prose */}
      <section className="container-content py-8">
        <div className="guide-prose">
          <h2>Two types of guides for two types of decisions</h2>
          <p>Tallyard publishes two kinds of guides. <strong>Buying guides</strong> compare two or three materials for the same job (vinyl vs fiber cement, composite vs cedar) using 20 to 30 year total cost of ownership math — not just sticker price. <strong>Cost guides</strong> break down what a project actually costs: materials, labor, permits, and the hidden line items most online estimates leave out.</p>
          <p>Both types link directly to the calculators you need for your specific project. The guide tells you which option. The calculator tells you how much.</p>
        </div>
      </section>

      {/* Cost guides grid */}
      <section className="container-wide pb-10">
        <h2 className="text-xl font-bold tracking-tight text-ink mb-4 px-1">Cost guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { slug: "cost-to-build-a-deck", name: "Cost to build a deck" },
            { slug: "cost-to-replace-a-roof", name: "Cost to replace a roof" },
            { slug: "cost-to-build-a-fence", name: "Cost to build a fence" },
            { slug: "cost-to-paint-a-house", name: "Cost to paint a house" },
            { slug: "cost-to-install-flooring", name: "Cost to install flooring" },
            { slug: "cost-to-remodel-a-bathroom", name: "Cost to remodel a bathroom" },
            { slug: "cost-to-pour-concrete", name: "Cost to pour concrete" },
            { slug: "cost-to-install-siding", name: "Cost to install siding" },
            { slug: "cost-to-install-solar", name: "Cost to install solar" },
            { slug: "cost-to-replace-hvac", name: "Cost to replace HVAC" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block p-4 bg-surface border border-line rounded-lg hover:border-accent transition-colors text-sm font-semibold text-ink hover:text-accent"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA to calculators */}
      <section className="container-wide py-14 md:py-16">
        <div className="bg-walnut rounded-xl p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-1">
              Ready to run the numbers?
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Pick a calculator and enter your measurements.
            </p>
          </div>
          <Link
            href="/calculators"
            className="inline-flex items-center px-5 py-3 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors shrink-0"
          >
            Browse 44 calculators
          </Link>
        </div>
      </section>
    </>
  );
}
