import Link from "next/link";

export default function HomePage() {
  const previewCalculators = [
    { slug: "paint-calculator", name: "Paint", desc: "Gallons needed by room size" },
    { slug: "concrete-calculator", name: "Concrete", desc: "Cubic yards for any slab" },
    { slug: "tile-calculator", name: "Tile", desc: "Square footage and box count" },
    { slug: "mulch-calculator", name: "Mulch", desc: "Cubic yards by bed dimensions" },
    { slug: "drywall-calculator", name: "Drywall", desc: "Sheets for any wall area" },
    { slug: "roofing-calculator", name: "Roofing", desc: "Shingles and squares needed" },
    { slug: "btu-calculator", name: "BTU", desc: "Air conditioner sizing" },
    { slug: "solar-panel-calculator", name: "Solar panels", desc: "System size for your usage" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container-content pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-xs uppercase tracking-wide text-ink-faint mb-4">
          Home improvement · DIY
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
          Calculators that show their work.
        </h1>
        <p className="text-lg text-ink-muted max-w-prose">
          Transparent, well-designed calculators for home improvement and DIY projects.
          Every formula is public, every number is explained, and nothing is hidden behind a signup.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/calculators"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-ink text-bg rounded hover:bg-ink/90 transition-colors"
          >
            Browse calculators
          </Link>
          <Link
            href="/methodology"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-ink border border-line-strong rounded hover:border-ink transition-colors"
          >
            How they work
          </Link>
        </div>
      </section>

      {/* Calculator grid preview */}
      <section className="container-wide pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Popular calculators
          </h2>
          <Link href="/calculators" className="text-sm text-ink-muted hover:text-ink transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {previewCalculators.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block p-4 bg-surface border border-line rounded-md hover:border-line-strong hover:-translate-y-0.5 transition-all"
            >
              <h3 className="text-base font-medium mb-1">{c.name}</h3>
              <p className="text-xs text-ink-muted">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-surface">
        <div className="container-content py-20">
          <h2 className="text-xl font-semibold tracking-tight mb-8">
            What makes Tallyard different
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-medium mb-1.5">The math is visible</h3>
              <p className="text-sm text-ink-muted max-w-prose">
                Every calculator shows the formula it used. You can verify the answer,
                understand the inputs, and adjust for your specific situation.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium mb-1.5">No signup, no email capture</h3>
              <p className="text-sm text-ink-muted max-w-prose">
                Tools are free and unrestricted. No walls, no trials, no dark patterns.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium mb-1.5">Sources are cited</h3>
              <p className="text-sm text-ink-muted max-w-prose">
                Coverage rates, conversion factors, and sizing formulas come from manufacturer
                specifications and industry references. Linked on every methodology page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
