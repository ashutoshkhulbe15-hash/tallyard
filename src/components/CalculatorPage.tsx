import Link from "next/link";
import { Calculator } from "./Calculator";
import { getConfig } from "@/configs";

interface CalculatorPageProps {
  slug: string;
}

/**
 * Renders the full calculator page (server-side): breadcrumb, title,
 * calculator widget, methodology, sources, related calculators, FAQ.
 *
 * Takes only a slug. Looks up the config server-side for rendering the
 * serializable content (titles, FAQ text, methodology), and hands the
 * slug to the client-side Calculator component which looks up its own
 * calculate function. No functions cross the Server/Client boundary.
 */
export function CalculatorPage({ slug }: CalculatorPageProps) {
  const config = getConfig(slug);

  if (!config) {
    return (
      <div className="container-content py-16">
        <h1 className="text-3xl font-semibold mb-4">Calculator not found</h1>
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
    <article className="container-content py-12 md:py-16">
      <nav
        aria-label="Breadcrumb"
        className="text-xs uppercase tracking-wide text-ink-faint mb-3"
      >
        <Link href="/calculators" className="hover:text-ink transition-colors">
          Calculators
        </Link>
        <span className="mx-2">·</span>
        <span>{config.category}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          {config.title}
        </h1>
        <p className="text-lg text-ink-muted max-w-prose">{config.description}</p>
      </header>

      <Calculator slug={slug} />

      {config.methodology.length > 0 && (
        <section className="mt-14 pt-10 border-t border-line">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            How we calculated this
          </h2>
          <div className="space-y-3 text-base">
            {config.methodology.map((paragraph, i) => (
              <p key={i} className="text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {config.sources.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-ink-muted">
            {config.sources.map((source, i) => (
              <li key={i}>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {source.name}
                  </a>
                ) : (
                  <span className="text-ink">{source.name}</span>
                )}
                {source.note && (
                  <span className="text-ink-faint"> — {source.note}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {config.faq.length > 0 && (
        <section className="mt-14 pt-10 border-t border-line">
          <h2 className="text-xl font-semibold tracking-tight mb-5">
            Frequently asked
          </h2>
          <div className="space-y-6">
            {config.faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold mb-1.5">{item.question}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {config.related.length > 0 && (
        <section className="mt-14 pt-10 border-t border-line">
          <h2 className="text-xl font-semibold tracking-tight mb-5">
            Related calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="block p-4 bg-surface border border-line rounded-md hover:border-line-strong hover:-translate-y-0.5 transition-all"
              >
                <h3 className="text-base font-medium mb-1">{rel.name}</h3>
                <p className="text-xs text-ink-muted">{rel.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
