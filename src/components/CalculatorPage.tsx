import Link from "next/link";
import { Calculator } from "./Calculator";
import { getConfig } from "@/configs";

interface CalculatorPageProps {
  slug: string;
}

/**
 * Full calculator page with D2 treatment: dark hero (header flows into it),
 * then white card on warm body. Accent word in hero is orange italic serif.
 */
export function CalculatorPage({ slug }: CalculatorPageProps) {
  const config = getConfig(slug);

  if (!config) {
    return (
      <div className="container-content py-20">
        <h1 className="text-3xl font-bold mb-4">Calculator not found</h1>
        <p className="text-ink-muted">
          This calculator hasn't been built yet. Check{" "}
          <Link href="/calculators" className="text-accent hover:underline">
            all calculators
          </Link>{" "}
          for what's available.
        </p>
      </div>
    );
  }

  return (
    <article>
      {/* Dark hero section */}
      <section className="bg-dark dark-section text-white hero-glow">
        <div className="container-content py-16 md:py-24">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-dark-ink-muted mb-6 font-medium"
          >
            <Link
              href="/calculators"
              className="text-accent hover:text-accent-light transition-colors"
            >
              Calculators
            </Link>
            <span className="mx-2 text-dark-ink-faint">·</span>
            <span>{config.category}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-5 max-w-3xl">
            {renderTitleWithAccent(config.title)}
          </h1>
          <p className="text-lg md:text-xl text-dark-ink-muted max-w-2xl leading-relaxed">
            {config.description}
          </p>
        </div>
      </section>

      {/* Calculator on light body */}
      <section className="container-content py-10 md:py-12">
        <div className="bg-surface border border-line rounded-xl p-6 md:p-8 shadow-soft">
          <Calculator slug={slug} />
        </div>
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
        <section className="container-content pb-16">
          <div className="pt-10 border-t border-line">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Related calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="block p-5 bg-surface border border-line rounded-lg hover:border-line-strong hover:-translate-y-0.5 transition-all"
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

/**
 * Simple heuristic: italicize and accent-color the last word of the title
 * when it's short (<=12 chars). For "Paint Calculator" this gives us
 * "Paint <em>Calculator</em>" in orange script. This creates the D2
 * signature look on every calculator page automatically.
 */
function renderTitleWithAccent(title: string): React.ReactNode {
  const words = title.split(" ");
  if (words.length < 2) return title;

  const lastWord = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");

  // Only style the last word if it's reasonably short
  if (lastWord.length > 14) return title;

  return (
    <>
      {rest}{" "}
      <span className="font-serif italic font-medium text-accent">
        {lastWord}
      </span>
    </>
  );
}
