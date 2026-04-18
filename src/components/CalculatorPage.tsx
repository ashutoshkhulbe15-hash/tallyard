import Link from "next/link";
import { Calculator } from "./Calculator";
import { BannerHeadline } from "./BannerHeadline";
import { CategoryIllustration } from "./CategoryIllustration";
import { getConfig } from "@/configs";

interface CalculatorPageProps {
  slug: string;
  /** Optional value label for the banner illustration (e.g. "2.8 GAL") */
  illustrationValue?: string;
}

/**
 * V3 page layout:
 * 1. Header (flows above, comes from layout.tsx)
 * 2. Warm cream banner with breadcrumb, headline, description, tags, and illustration
 * 3. Split calculator below (input card + dark walnut result card)
 * 4. Methodology → Sources → FAQ → Related sections
 */
export function CalculatorPage({
  slug,
  illustrationValue,
}: CalculatorPageProps) {
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

  return (
    <article>
      {/* V3 banner */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-center overflow-hidden">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"
            >
              <Link
                href="/calculators"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                Calculators
              </Link>
              <span className="mx-2 text-ink-faint">·</span>
              <span>{config.categoryLabel}</span>
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
              valueLabel={illustrationValue}
            />
          </div>
        </div>
      </section>

      {/* Split calculator */}
      <section className="container-wide pt-5 md:pt-6 pb-12">
        <Calculator slug={slug} />
      </section>

      {/* Methodology */}
      {config.methodology.length > 0 && (
        <section className="container-content pb-12">
          <div className="pt-10 border-t border-line">
            <h2 className="text-2xl font-bold tracking-tight mb-5">
              How we calculated this
            </h2>
            <div className="space-y-4">
              {config.methodology.map((paragraph, i) => (
                <p key={i} className="text-base text-ink-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content expansion (rich article below the calculator) */}
      {config.ContentExpansion && (
        <section className="container-content pb-12">
          <div className="pt-10 border-t border-line">
            <div className="guide-prose">
              <config.ContentExpansion />
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

      {/* Related */}
      {config.related.length > 0 && (
        <section className="container-content pb-12">
          <div className="pt-10 border-t border-line">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Related calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.related.map((rel) => (
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
              Buying guides
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {config.relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block p-5 bg-bg-warm border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
                >
                  <p className="text-[10px] uppercase tracking-[0.08em] text-accent font-bold mb-1.5">
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
    </article>
  );
}
