import Link from "next/link";

export default function HomePage() {
  const previewCalculators = [
    { slug: "paint-calculator", name: "Paint", desc: "Gallons needed by room size", live: true },
    { slug: "calculators", name: "Concrete", desc: "Cubic yards for any slab", live: false },
    { slug: "calculators", name: "Tile", desc: "Square footage and box count", live: false },
    { slug: "calculators", name: "Mulch", desc: "Cubic yards by bed dimensions", live: false },
    { slug: "calculators", name: "Drywall", desc: "Sheets for any wall area", live: false },
    { slug: "calculators", name: "Roofing", desc: "Shingles and squares needed", live: false },
    { slug: "calculators", name: "BTU", desc: "Air conditioner sizing", live: false },
    { slug: "calculators", name: "Solar", desc: "System size for your usage", live: false },
  ];

  return (
    <>
      {/* Dark hero section */}
      <section className="bg-dark dark-section text-white hero-glow">
        <div className="container-content py-20 md:py-28">
          <p className="text-xs uppercase tracking-wide text-dark-ink-muted mb-5 font-medium">
            Home improvement · DIY
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6 max-w-4xl">
            Calculators that{" "}
            <span className="font-serif italic font-medium text-accent">
              actually
            </span>{" "}
            show their work.
          </h1>
          <p className="text-lg md:text-xl text-dark-ink-muted max-w-2xl leading-relaxed mb-8">
            Transparent tools for home improvement and DIY. Every formula is
            public, every number explained, nothing hidden behind a signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
            >
              Browse calculators
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white border border-white/15 hover:border-white/40 rounded-md transition-colors"
            >
              How they work
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator grid on light surface */}
      <section className="container-wide py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint mb-2 font-medium">
              The collection
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Popular calculators
            </h2>
          </div>
          <Link
            href="/calculators"
            className="text-sm text-ink-muted hover:text-ink transition-colors font-medium hidden sm:inline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {previewCalculators.map((c) => (
            <Link
              key={`${c.slug}-${c.name}`}
              href={`/${c.slug}`}
              className="block p-5 bg-surface border border-line rounded-lg hover:border-line-strong hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-base font-semibold">{c.name}</h3>
                {c.live && (
                  <span className="text-[10px] uppercase tracking-wide text-accent font-semibold px-1.5 py-0.5 bg-accent-soft rounded">
                    Live
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Principles section */}
      <section className="bg-surface-alt border-t border-line">
        <div className="container-content py-20">
          <p className="text-xs uppercase tracking-wide text-ink-faint mb-2 font-medium">
            Principles
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
            What makes Tallyard different
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">The math is visible</h3>
              <p className="text-base text-ink-muted max-w-prose leading-relaxed">
                Every calculator shows the formula it used. You can verify the
                answer, understand the inputs, and adjust for your specific
                situation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                No signup, no email capture
              </h3>
              <p className="text-base text-ink-muted max-w-prose leading-relaxed">
                Tools are free and unrestricted. No walls, no trials, no dark
                patterns.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sources are cited</h3>
              <p className="text-base text-ink-muted max-w-prose leading-relaxed">
                Coverage rates, conversion factors, and sizing formulas come
                from manufacturer specifications and industry references.
                Linked on every methodology page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
