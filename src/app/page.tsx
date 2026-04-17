import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export default function HomePage() {
  // Top 8 calculators shown on homepage — representative of each vertical
  const previewCalculators = [
    { slug: "paint-calculator", name: "Paint", desc: "Gallons needed by room size", category: "Paint" },
    { slug: "concrete-calculator", name: "Concrete", desc: "Cubic yards for any slab", category: "Masonry" },
    { slug: "flooring-calculator", name: "Flooring", desc: "Hardwood, laminate, vinyl", category: "Flooring" },
    { slug: "solar-calculator", name: "Solar", desc: "Panels for your electricity use", category: "Solar" },
    { slug: "deck-calculator", name: "Deck", desc: "Boards, joists, fasteners", category: "Landscaping" },
    { slug: "roofing-calculator", name: "Roofing", desc: "Shingles for any pitch", category: "Roofing" },
    { slug: "insulation-calculator", name: "Insulation", desc: "R-value by climate zone", category: "Insulation" },
    { slug: "paver-calculator", name: "Paver", desc: "Patio pavers, base, sand", category: "Landscaping" },
  ];

  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-14 overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Home improvement · DIY
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.02] mb-5 max-w-3xl">
            <BannerHeadline text="Calculators that show their work." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed mb-7">
            Transparent tools for home improvement and DIY. Every formula
            public, every source cited, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
            >
              Browse 16 calculators
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold text-ink border border-line-strong hover:border-accent hover:text-accent bg-surface rounded-md transition-colors"
            >
              How they work
            </Link>
          </div>
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
              The collection
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Popular calculators
            </h2>
          </div>
          <Link
            href="/calculators"
            className="text-sm text-ink-muted hover:text-accent transition-colors font-medium hidden sm:inline"
          >
            View all 16 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {previewCalculators.map((c) => (
            <Link
              key={`${c.slug}-${c.name}`}
              href={`/${c.slug}`}
              className="block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
            >
              <div className="text-[10px] uppercase tracking-[0.08em] text-ink-faint font-semibold mb-2">
                {c.category}
              </div>
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-base font-semibold">{c.name}</h3>
                <span className="text-[10px] uppercase tracking-wide text-accent font-semibold px-1.5 py-0.5 bg-accent-soft rounded">
                  Live
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-bg-warm border-t border-line">
        <div className="container-content py-16 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
            Principles
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
            What makes Tallyard <span className="accent-italic">different</span>
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
