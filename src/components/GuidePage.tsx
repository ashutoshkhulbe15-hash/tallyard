import Link from "next/link";
import { BannerHeadline } from "./BannerHeadline";
import { PageRail } from "./PageRail";

import type { GuideConfig } from "@/lib/guides-types";

interface GuidePageProps {
  config: GuideConfig;
}

/**
 * Guide layout in the full-height sidebar shell (matches calculator pages):
 * 1. Sticky left rail: in-guide nav + "run the numbers" tools + more guides
 * 2. page-main: editorial header, then article body capped for reading
 *    measure, then FAQ, sources, related calculators, related guides.
 */
export function GuidePage({ config }: GuidePageProps) {
  const Content = config.Content;

  const railNav = [
    { href: "#article", label: "The guide" },
    ...(config.faq.length > 0
      ? [{ href: "#faq", label: "Frequently asked" }]
      : []),
    ...(config.sources.length > 0
      ? [{ href: "#sources", label: "Sources" }]
      : []),
    ...(config.relatedCalculators.length > 0
      ? [{ href: "#related", label: "Related calculators" }]
      : []),
  ];

  const toolGroups = [];
  if (config.relatedCalculators.length > 0) {
    toolGroups.push({
      heading: "Run the numbers",
      tools: config.relatedCalculators.slice(0, 3).map((r) => ({
        href: `/${r.slug}`,
        name: r.name,
      })),
    });
  }
  if (config.relatedGuides && config.relatedGuides.length > 0) {
    toolGroups.push({
      heading: "More guides",
      tools: config.relatedGuides.slice(0, 3).map((r) => ({
        href: `/guides/${r.slug}`,
        name: r.name,
      })),
    });
  }

  return (
    <div className="page-shell">
      <PageRail
        navHeading="In this guide"
        nav={railNav}
        toolGroups={toolGroups}
        footLines={["TALLYARD EDITORIAL", "NO LEAD FORMS", "SOURCES CITED"]}
      />

      <article className="page-main">
        {/* Editorial header */}
        <section id="article" className="scroll-mt-20">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[13px] text-ink-muted mb-5"
          >
            <Link href="/guides" className="hover:text-accent transition-colors">
              Guides
            </Link>
            <span className="mx-2 text-ink-faint">·</span>
            <span>{config.categoryLabel}</span>
            <span className="mx-2 text-ink-faint">·</span>
            <span className="text-ink-faint">{config.readTime}</span>
          </nav>
          <h1 className="text-4xl md:text-[52px] font-bold tracking-tighter leading-[1.03] mb-5 text-ink max-w-[16ch]">
            <BannerHeadline text={config.bannerHeadline} />
          </h1>
          <p className="text-[18px] md:text-xl text-ink-muted max-w-[60ch] leading-relaxed">
            {config.description}
          </p>
          {config.bannerTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-7">
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
        </section>

        {/* Article body */}
        <section className="pt-10 md:pt-12 pb-10 max-w-[720px]">
          {config.verdict && (
            <div className="guide-verdict mb-8 rounded-xl border border-[#BEE3CC] bg-accent-soft px-6 py-5">
              <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-accent mb-2">
                The verdict
              </div>
              <p className="text-[17px] md:text-lg font-semibold text-ink leading-snug tracking-tight">
                {config.verdict}
              </p>
            </div>
          )}
          <div className="guide-prose">
            <Content />
          </div>
        </section>

        {/* FAQ */}
        {config.faq.length > 0 && (
          <section id="faq" className="pb-12 scroll-mt-20 max-w-[720px]">
            <div className="pt-10 border-t border-line">
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
            </div>
          </section>
        )}

        {/* Sources */}
        {config.sources.length > 0 && (
          <section id="sources" className="pb-12 scroll-mt-20 max-w-[720px]">
            <h2 className="text-2xl font-bold tracking-tight mb-5">Sources</h2>
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
                    <span className="text-ink font-medium">{source.name}</span>
                  )}
                  {source.note && (
                    <span className="text-ink-faint"> — {source.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related calculators */}
        {config.relatedCalculators.length > 0 && (
          <section id="related" className="pb-12 scroll-mt-20 max-w-[900px]">
            <div className="pt-10 border-t border-line">
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Related calculators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.relatedCalculators.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${rel.slug}`}
                    className="block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
                  >
                    <h3 className="text-base font-semibold mb-1">{rel.name}</h3>
                    <p className="text-[13px] text-ink-muted">
                      {rel.description}
                    </p>
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
                More guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.relatedGuides.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/guides/${rel.slug}`}
                    className="block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
                  >
                    <h3 className="text-base font-semibold mb-1">{rel.name}</h3>
                    <p className="text-[13px] text-ink-muted">
                      {rel.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
