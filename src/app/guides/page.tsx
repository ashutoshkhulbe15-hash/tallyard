import Link from "next/link";
import type { Metadata } from "next";
import { getAllGuides } from "@/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "In-depth buying guides for home improvement. Real cost math, lifespan data, and decision frameworks — no lead forms, no signups.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const allGuides = getAllGuides();

  return (
    <>
      {/* Banner */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-12">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Guides
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            Decisions that actually{" "}
            <span className="accent-italic">require thinking</span>.
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Deep buying guides for the home-improvement decisions with
            real trade-offs. Total cost math over the ownership horizon,
            no lead forms, no affiliate bias.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="container-content py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-4 font-semibold">
          {allGuides.length} {allGuides.length === 1 ? "guide" : "guides"}
        </p>
        <div className="space-y-3">
          {allGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block p-6 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint font-semibold">
                  {guide.categoryLabel}
                </p>
                <p className="text-xs text-ink-faint font-normal shrink-0">
                  {guide.readTime}
                </p>
              </div>
              <h2 className="text-xl font-bold tracking-tight mb-2 text-ink">
                {guide.title}
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-3">
                {guide.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {guide.bannerTags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-accent-soft text-accent px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Principles section */}
      <section className="bg-bg-warm border-t border-line">
        <div className="container-content py-16">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
            Principles
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            How Tallyard guides are <span className="accent-italic">different</span>
          </h2>
          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Real total cost of ownership
              </h3>
              <p className="text-base text-ink-muted max-w-prose leading-relaxed">
                Most comparison articles stop at installed cost. We
                calculate ownership cost over the actual decision
                horizon — 15, 20, or 30 years — including the
                maintenance cycles that dominate real spending.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                No lead forms, no affiliate bias
              </h3>
              <p className="text-base text-ink-muted max-w-prose leading-relaxed">
                Tallyard doesn&apos;t sell your email, collect quotes,
                or take affiliate commissions. Guides reflect what the
                numbers actually say, not which link pays best.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Paired with tools</h3>
              <p className="text-base text-ink-muted max-w-prose leading-relaxed">
                Each guide links to the Tallyard calculators you&apos;ll
                need to run the math on your specific project. The guide
                tells you which option; the calculator tells you how
                much.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
