import Link from "next/link";
import type { Metadata } from "next";
import { getAllGuides } from "@/guides";

export const metadata: Metadata = {
  title: "Buying guides — real cost math for home improvement decisions",
  description:
    "In-depth buying guides for home improvement: vinyl vs fiber cement siding, composite vs pressure-treated decking, heat pump vs furnace. Real total cost of ownership math.",
  alternates: { canonical: "/guides" },
};

// Editorial verdicts + tool chips, keyed by slug. The verdict is the answer a
// reader came for; **wrapped** words render in verify green. Drawn from each
// guide's own conclusion.
const guideMeta: Record<
  string,
  { verdict: string; uses: string[] }
> = {
  "vinyl-vs-fiber-cement-siding": {
    verdict:
      "Fiber cement lasts **50+ years** to vinyl's 20–40 and wins on 30-year cost — if you're staying long enough to bank it.",
    uses: ["Siding calculator", "Cost to install siding"],
  },
  "composite-vs-pressure-treated-vs-cedar-deck": {
    verdict:
      "Over 20 years **pressure-treated ends up most expensive** — its boards need replacing around year 15.",
    uses: ["Deck calculator", "Cost to build a deck"],
  },
  "heat-pump-vs-furnace": {
    verdict:
      "Heat pumps save **$300–500/yr in zones 1–4**, break even in zone 5, and lose to gas in zones 6–7.",
    uses: ["Heat pump calculator", "Cost to replace HVAC"],
  },
};

const costGuides = [
  { slug: "cost-to-build-a-deck", name: "Cost to build a deck", r: "$4.4K–11.2K" },
  { slug: "cost-to-replace-a-roof", name: "Cost to replace a roof", r: "$6.7K–12.5K" },
  { slug: "cost-to-build-a-fence", name: "Cost to build a fence", r: "$1.9K–4.5K" },
  { slug: "cost-to-paint-a-house", name: "Cost to paint a house", r: "$1.8K–4.4K" },
  { slug: "cost-to-install-flooring", name: "Cost to install flooring", r: "$3–22/sf" },
  { slug: "cost-to-remodel-a-bathroom", name: "Cost to remodel a bathroom", r: "$6.6K–17.5K" },
  { slug: "cost-to-pour-concrete", name: "Cost to pour concrete", r: "$4–8/sf" },
  { slug: "cost-to-install-siding", name: "Cost to install siding", r: "$5.6K–17K" },
  { slug: "cost-to-install-solar", name: "Cost to install solar", r: "$15K–25K" },
  { slug: "cost-to-replace-hvac", name: "Cost to replace HVAC", r: "$5K–12.5K" },
];

/** Renders verdict text, bolding **wrapped** spans in verify green. */
function Verdict({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function GuidesIndexPage() {
  const allGuides = getAllGuides();

  return (
    <>
      {/* Editorial header */}
      <section className="container-content pt-7 md:pt-10">
        <nav className="font-mono text-xs text-ink-muted mb-5">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-faint">·</span>
          <span>Guides</span>
        </nav>
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint mb-4 flex items-center gap-2.5">
          Buying guides ·{" "}
          <span className="text-accent">the answer, then the math</span>
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.04] mb-4 text-ink">
          Decisions that need <span className="accent-italic">real math.</span>
        </h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
          For the choices where the wrong pick costs thousands over the
          ownership period. We lead with the verdict, then show the 20–30 year
          total-cost math behind it — and link the calculators to run it for
          your project.
        </p>
      </section>

      {/* Buying guides — verdict-forward rows */}
      <section className="container-content pt-10 md:pt-12">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint mb-5 flex items-center gap-3">
          Buying guides ·{" "}
          <span className="text-accent">which option wins</span>
          <span className="flex-1 h-px bg-line" />
        </div>
        <div className="flex flex-col gap-4">
          {allGuides.map((guide) => {
            const meta = guideMeta[guide.slug];
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group border border-line rounded-xl bg-surface overflow-hidden hover:border-accent transition-colors"
              >
                <div
                  className="flex items-center gap-2.5 px-5 md:px-6 py-3.5 border-b border-line"
                  style={{ background: "linear-gradient(#FCFDFB,#F6F8F4)" }}
                >
                  <span className="font-mono text-[10px] text-amber tracking-[0.06em]">
                    {guide.categoryLabel.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint ml-auto">
                    {guide.readTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
                  <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-line">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2 group-hover:text-accent transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-[13px] text-ink-muted leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                  {meta && (
                    <div className="p-5 md:p-6 bg-accent-soft flex flex-col justify-center">
                      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent mb-2">
                        The verdict
                      </div>
                      <div className="font-display text-[15px] md:text-base font-bold tracking-tight leading-snug text-ink">
                        <Verdict text={meta.verdict} />
                      </div>
                    </div>
                  )}
                </div>

                {meta && (
                  <div className="flex items-center gap-2 flex-wrap px-5 md:px-6 py-3 border-t border-line font-mono text-[11px] text-ink-soft">
                    <span className="text-ink-faint tracking-[0.06em]">
                      USES
                    </span>
                    {meta.uses.map((u) => (
                      <span
                        key={u}
                        className="text-accent border border-line rounded-md px-2 py-0.5 bg-surface"
                      >
                        {u}
                      </span>
                    ))}
                    <span className="ml-auto text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read the math →
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Cost guides — dense ledger with price ranges */}
      <section className="container-content pt-12 md:pt-14">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint mb-5 flex items-center gap-3">
          Cost guides ·{" "}
          <span className="text-accent">what a project actually costs</span>
          <span className="flex-1 h-px bg-line" />
        </div>
        <div className="border border-line rounded-xl bg-surface overflow-hidden">
          <div
            className="flex justify-between items-center px-5 md:px-6 py-3 border-b border-line"
            style={{ background: "linear-gradient(#F4F7F2,#EFF3ED)" }}
          >
            <h3 className="text-[15px] font-bold">Cost guides</h3>
            <span className="font-mono text-[10px] text-ink-faint tracking-[0.1em]">
              MATERIAL + LABOR · 2026 AVERAGES
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {costGuides.map((c, i) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className={`flex justify-between items-baseline gap-3 px-5 md:px-6 py-3 text-[13.5px] font-medium border-b border-line hover:bg-[#F5F9F4] hover:text-accent transition-colors sm:odd:border-r ${
                  i >= costGuides.length - 2 ? "sm:[&:nth-last-child(-n+2)]:border-b-0" : ""
                } last:border-b-0`}
              >
                {c.name}
                <span className="font-mono text-[11px] text-ink-faint">
                  {c.r}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — one three-cell strip */}
      <section className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-line rounded-xl bg-surface overflow-hidden">
          {[
            {
              n: "01",
              title: "Real ownership cost",
              body: "Most comparisons stop at installed price. We run 15-, 20-, or 30-year totals including the maintenance cycles that dominate real spending.",
            },
            {
              n: "02",
              title: "No affiliate bias",
              body: "No commissions, no lead collection, no sponsored placements. The recommendation follows the numbers, not which link pays.",
            },
            {
              n: "03",
              title: "Paired with tools",
              body: "Every guide links the calculators you need to run the math for your own project. The guide picks the option; the tool sizes it.",
            },
          ].map((p, i) => (
            <div
              key={p.n}
              className={`p-6 border-line ${i < 2 ? "border-b md:border-b-0 md:border-r" : ""}`}
            >
              <div className="font-mono text-[11px] text-accent mb-2.5">
                {p.n}
              </div>
              <h3 className="text-[15px] font-semibold mb-1.5">{p.title}</h3>
              <p className="text-[12.5px] text-ink-muted leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
