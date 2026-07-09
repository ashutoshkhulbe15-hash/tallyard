import Link from "next/link";
import { Calculator } from "./Calculator";
import { BannerHeadline } from "./BannerHeadline";
import { FeedbackWidget } from "./FeedbackWidget";
import { PageRail } from "./PageRail";
import { StickyCalc } from "./StickyCalc";
import { getConfig } from "@/configs";
import { getReviewedDate } from "@/lib/schema";

interface CalculatorPageProps {
  slug: string;
  /** @deprecated Ledger layout: the live calculator panel is the hero
   *  visual, so the illustration value is no longer rendered. Kept so
   *  existing page files compile unchanged. */
  illustrationValue?: string;
}

/**
 * Ledger page layout:
 * 1. Header (from layout.tsx)
 * 2. Hero grid on graph paper: breadcrumb + headline + lede + tags +
 *    "reviewed against" card on the left; the working calculator panel
 *    (sticky) on the right — the tool itself is the hero visual.
 * 3. Formula callout + methodology → article → sources → FAQ → related
 */
export function CalculatorPage({ slug }: CalculatorPageProps) {
  const config = getConfig(slug);

  if (!config) {
    return (
      <div className="container-content py-20">
        <h1 className="text-3xl font-bold mb-4">Calculator not found</h1>
        <p className="text-ink-muted">
          This calculator hasn't been built yet. Check{" "}
          <Link
            href="/calculators"
            className="text-accent hover:underline font-medium"
          >
            all calculators
          </Link>{" "}
          for what's available.
        </p>
      </div>
    );
  }

  const reviewedNames = config.sources
    .slice(0, 2)
    .map((s) => s.name)
    .join(" and ");

  const railNav = [
    { href: "#calculator", label: "The calculator" },
    ...(config.methodology.length > 0
      ? [{ href: "#methodology", label: "How we calculated" }]
      : []),
    ...(config.faq.length > 0
      ? [{ href: "#faq", label: "Frequently asked" }]
      : []),
    ...(config.sources.length > 0
      ? [{ href: "#sources", label: "Sources" }]
      : []),
    ...(config.related.length > 0
      ? [{ href: "#related", label: "Related calculators" }]
      : []),
  ];

  const railToolGroups =
    config.related.length > 0
      ? [
          {
            heading: "Related tools",
            tools: config.related.slice(0, 4).map((r) => ({
              href: `/${r.slug}`,
              name: r.name,
            })),
          },
        ]
      : [];

  return (
    <div className="page-shell">
      <PageRail
        navHeading="On this page"
        nav={railNav}
        toolGroups={railToolGroups}
        footLines={["✓ FORMULA SHOWN", "SOURCE CITED", "NO SIGNUP · FREE"]}
      />

      <article className="page-main">
        {/* Hero: copy left, working calculator right */}
        <section id="calculator" className="pb-12 md:pb-16 scroll-mt-20">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_460px] lg:grid-rows-[auto_1fr] gap-10 lg:gap-x-12 lg:gap-y-0 items-start">
            {/* Intro: order 1 everywhere. Desktop: col 1 row 1. */}
            <div className="order-1 pt-1 lg:col-start-1 lg:row-start-1">
              <nav
                aria-label="Breadcrumb"
                className="font-mono text-[13px] text-ink-muted mb-5"
              >
                <Link
                  href="/calculators"
                  className="hover:text-accent transition-colors"
                >
                  Calculators
                </Link>
                <span className="mx-2 text-ink-faint">·</span>
                <span>{config.categoryLabel}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">
                <BannerHeadline text={config.bannerHeadline} />
              </h1>
              <p className="text-[17px] md:text-lg text-ink-muted max-w-md leading-relaxed">
                {config.description}
              </p>
              {config.bannerTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {config.bannerTags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-[11.5px] tracking-[0.06em] uppercase text-accent bg-accent-soft px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {reviewedNames && (
                <div className="mt-8 max-w-md flex gap-2.5 items-start p-4 bg-surface border border-line rounded-md text-[13.5px] text-ink-muted leading-relaxed">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#147A46" }}
                    aria-hidden
                  />
                  <span>
                    <b className="text-ink font-semibold">Reviewed against</b>{" "}
                    {reviewedNames}. Formula and sources published below.
                    <span className="block mt-1.5 font-mono text-[11px] text-ink-faint">
                      Last reviewed {getReviewedDate(slug).display}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Calculator: order 2 on mobile (right after intro), spans the
                right column across both rows on desktop so it stays sticky
                beside the article. */}
            <div className="order-2 w-full lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <StickyCalc>
                <Calculator slug={slug} panelTitle={config.title} />
              </StickyCalc>
            </div>

            {/* Article: order 3 on mobile (after the calculator). Desktop:
                col 1 row 2, directly under the intro, beside the calculator. */}
            <div className="order-3 w-full min-w-0 lg:col-start-1 lg:row-start-2">
              {config.methodology.length > 0 && (
                <section
                  id="methodology"
                  className="mt-10 pt-8 border-t border-line scroll-mt-20"
                >
                  <h2 className="text-2xl font-bold tracking-tight mb-5">
                    How we calculated this
                  </h2>
                  <div className="bg-surface border border-line border-l-[3px] border-l-accent rounded-md px-6 py-5 mb-6 font-mono text-sm text-ink leading-relaxed">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-accent mb-1.5">
                      The formula
                    </span>
                    {config.formulaDescription}
                  </div>
                  <div className="space-y-4">
                    {config.methodology.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-[16.5px] text-ink-muted leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {config.ContentExpansion && (
                <section className="mt-10 pt-8 border-t border-line">
                  <div className="guide-prose">
                    <config.ContentExpansion />
                  </div>
                </section>
              )}

              {config.faq.length > 0 && (
                <section
                  id="faq"
                  className="mt-10 pt-8 border-t border-line scroll-mt-20"
                >
                  <h2 className="text-2xl font-bold tracking-tight mb-6">
                    Frequently asked
                  </h2>
                  <div className="space-y-7">
                    {config.faq.map((item, i) => (
                      <div key={i}>
                        <h3 className="text-[17px] font-semibold mb-2">
                          {item.question}
                        </h3>
                        <p className="text-[15px] text-ink-muted leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {config.sources.length > 0 && (
                <section
                  id="sources"
                  className="mt-10 pt-8 border-t border-line scroll-mt-20"
                >
                  <h2 className="text-2xl font-bold tracking-tight mb-5">
                    Sources
                  </h2>
                  <ul className="space-y-2.5 text-[15px] text-ink-muted">
                    {config.sources.map((source, i) => (
                      <li key={i}>
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline font-medium"
                          >
                            {source.name}
                          </a>
                        ) : (
                          <span className="text-ink font-medium">
                            {source.name}
                          </span>
                        )}
                        {source.note && (
                          <span className="text-ink-faint">
                            {" "}
                            - {source.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </section>

      {/* Related */}
      {config.related.length > 0 && (
        <section id="related" className="pb-12 scroll-mt-20 max-w-[900px]">
          <div className="pt-10 border-t border-line">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Related calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {config.related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group block p-5 bg-surface border border-line rounded-md hover:border-accent transition-colors"
                >
                  <h3 className="text-base font-semibold mb-1">{rel.name}</h3>
                  <p className="text-xs text-ink-muted mb-2.5">
                    {rel.description}
                  </p>
                  <span className="font-mono text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related guides */}
      {config.relatedGuides && config.relatedGuides.length > 0 && (
        <section className="pb-16 max-w-[900px]">
          <div className="pt-10 border-t border-line">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Buying guides
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {config.relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block p-5 bg-surface border border-line rounded-md hover:border-accent transition-colors"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                    Guide
                  </p>
                  <h3 className="text-base font-semibold mb-1">{guide.name}</h3>
                  <p className="text-xs text-ink-muted">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Feedback */}
      <section className="max-w-[760px]">
        <FeedbackWidget slug={slug} />
      </section>
      </article>
    </div>
  );
}
