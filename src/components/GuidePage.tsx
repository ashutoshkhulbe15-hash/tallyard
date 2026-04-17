import Link from "next/link";
import { BannerHeadline } from "./BannerHeadline";
import { CategoryIllustration } from "./CategoryIllustration";
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
      {/* Banner */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-center overflow-hidden">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"
            >
              <Link
                href="/guides"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                Guides
              </Link>
              <span className="mx-2 text-ink-faint">·</span>
              <span>{config.categoryLabel}</span>
              <span className="mx-2 text-ink-faint">·</span>
              <span className="text-ink-faint font-normal">
                {config.readTime}
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
              <BannerHeadline text={config.bannerHeadline} />
            </h1>
            <p className="text-base md:text-lg text-ink-muted max-w-md leading-relaxed">
              {config.description}
            </p>
            {config.bannerTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {config.bannerTags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-accent-soft text-accent px-2.5 py-1 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <CategoryIllustration
              category={config.category}
              valueLabel={config.heroValue}
            />
          </div>
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
