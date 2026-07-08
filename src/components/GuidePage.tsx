import Link from "next/link";
import { BannerHeadline } from "./BannerHeadline";

import type { GuideConfig } from "@/lib/guides-types";

interface GuidePageProps {
  config: GuideConfig;
}

/**
 * V3 guide layout, consistent with the calculator page:
 * 1. Banner (warm cream, headline auto-italicized, tags, illustration)
 * 2. Article body (Content component, rendered inside a prose container)
 * 3. FAQ
 * 4. Sources
 * 5. Related calculators + guides
 */
export function GuidePage({ config }: GuidePageProps) {
  const Content = config.Content;

  return (
    <article>
      {/* Editorial header */}
      <section className="container-wide pt-7 md:pt-10">
        <div className="pb-8 md:pb-10 border-b border-line">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-xs text-ink-muted mb-5"
          >
            <Link
              href="/guides"
              className="hover:text-accent transition-colors"
            >
              Guides
            </Link>
            <span className="mx-2 text-ink-faint">·</span>
            <span>{config.categoryLabel}</span>
            <span className="mx-2 text-ink-faint">·</span>
            <span className="text-ink-faint">{config.readTime}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-4 text-ink max-w-3xl">
            <BannerHeadline text={config.bannerHeadline} />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            {config.description}
          </p>
          {config.bannerTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {config.bannerTags.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-soft px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article body */}
      <section className="container-content pt-10 md:pt-14 pb-10">
        <div className="guide-prose">
          <Content />
        </div>
      </section>

      {/* FAQ */}
      {config.faq.length > 0 && (
        <section className="container-content pb-12">
          <div className="pt-10 border-t border-line">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Frequently asked
            </h2>
            <div className="space-y-7">
              {config.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="text-base font-semibold mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
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
        <section className="container-content pb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-5">Sources</h2>
          <ul className="space-y-2.5 text-sm text-ink-muted">
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
        <section className="container-content pb-12">
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
                  <p className="text-xs text-ink-muted">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related guides */}
      {config.relatedGuides && config.relatedGuides.length > 0 && (
        <section className="container-content pb-16">
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
                  <p className="text-xs text-ink-muted">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
