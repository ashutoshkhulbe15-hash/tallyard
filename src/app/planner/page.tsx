import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project planner: complete material lists for home improvement",
  description:
    "Plan an entire home improvement project in one tool. Enter your dimensions once and get a complete material list with cost estimates. Then compare against contractor quotes.",
  alternates: { canonical: "/planner" },
};

interface Project {
  slug: string;
  n: string;
  title: string;
  desc: string;
  chainCount: string;
  steps: string[];
}

// Ordered by chain depth — deepest planners first (most compelling).
const projects: Project[] = [
  {
    slug: "remodel-a-bathroom",
    n: "01",
    title: "Remodel a bathroom",
    desc: "Floor tile, shower tile, vanity, paint, grout",
    chainCount: "5 CALCULATORS CHAINED",
    steps: ["Floor tile", "Shower tile", "Vanity", "Paint", "Grout"],
  },
  {
    slug: "build-a-deck",
    n: "02",
    title: "Build a deck",
    desc: "Decking, frame, concrete footings, stairs, railing, fasteners",
    chainCount: "4 CALCULATORS CHAINED",
    steps: [
      "Deck boards + joists",
      "Concrete footings",
      "Stairs",
      "Railing + fasteners",
    ],
  },
  {
    slug: "replace-a-roof",
    n: "03",
    title: "Replace a roof",
    desc: "Shingles, underlayment, ventilation, gutters, flashing",
    chainCount: "3 CALCULATORS CHAINED",
    steps: ["Shingles + underlayment", "Ventilation", "Gutters + flashing"],
  },
  {
    slug: "build-a-patio",
    n: "04",
    title: "Build a patio",
    desc: "Pavers, base gravel, bedding sand, edge restraint",
    chainCount: "3 CALCULATORS CHAINED",
    steps: ["Pavers", "Base gravel", "Bedding sand + edging"],
  },
  {
    slug: "install-a-fence",
    n: "05",
    title: "Install a fence",
    desc: "Posts, rails, pickets or panels, concrete, gates",
    chainCount: "2 CALCULATORS CHAINED",
    steps: ["Posts + rails + pickets", "Concrete + gates"],
  },
  {
    slug: "paint-a-room",
    n: "06",
    title: "Paint a room",
    desc: "Paint, primer, ceiling paint, supplies, and cost estimate",
    chainCount: "2 CALCULATORS CHAINED",
    steps: ["Wall paint + primer", "Ceiling paint + supplies"],
  },
];

export default function PlannerIndexPage() {
  return (
    <>
      {/* Editorial header */}
      <section className="container-content pt-7 md:pt-10">
        <nav className="font-mono text-xs text-ink-muted mb-5">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-faint">·</span>
          <span>Planner</span>
        </nav>
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint mb-4 flex items-center gap-2.5">
          Project planner ·{" "}
          <span className="text-accent">one input set → full material list</span>
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.04] mb-4 text-ink">
          Plan the whole <span className="accent-italic">project.</span>
        </h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
          A calculator answers one material. A planner chains several — enter
          your dimensions once and get a complete, buyable material list for the
          entire build, ready to check against a contractor&apos;s quote.
        </p>
      </section>

      {/* Build sheets */}
      <section className="container-content pt-10 md:pt-12 pb-4">
        <div className="flex flex-col gap-4">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/planner/${p.slug}`}
              className="group border border-line rounded-xl bg-surface overflow-hidden hover:border-accent transition-colors"
            >
              <div
                className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 border-b border-line"
                style={{ background: "linear-gradient(#FCFDFB,#F6F8F4)" }}
              >
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-xs text-accent font-bold border border-line rounded-md px-2 py-1 bg-surface">
                    {p.n}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold tracking-tight">
                    {p.title}
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-ink-faint tracking-[0.04em] hidden sm:block">
                  {p.chainCount}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 px-5 md:px-6 py-5 md:items-center">
                <div className="flex items-center flex-wrap gap-2">
                  {p.steps.map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-surface-alt border border-line rounded-lg px-3 py-2">
                        <span className="font-mono text-[10px] text-accent">
                          {i + 1}
                        </span>
                        {s}
                      </span>
                      {i < p.steps.length - 1 && (
                        <span className="font-mono text-xs text-ink-faint">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5 font-mono text-xs text-ink-muted whitespace-nowrap md:pl-5 md:border-l border-dashed border-line">
                  <span className="w-7 h-7 rounded-lg bg-accent-soft text-accent grid place-items-center text-sm shrink-0">
                    ▤
                  </span>
                  <span>
                    <b className="text-ink font-semibold block text-[12.5px]">
                      Full material list
                    </b>
                    <span className="text-[10.5px] text-ink-faint">
                      + cost estimate
                    </span>
                  </span>
                </div>
              </div>

              <div className="px-5 md:px-6 pb-4 pt-3.5 border-t border-dashed border-line flex items-center justify-between gap-3">
                <p className="text-[12.5px] text-ink-faint">{p.desc}</p>
                <span className="font-mono text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Open planner →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator vs planner — one ledger comparison */}
      <section className="container-content py-12 md:py-16">
        <div className="border border-line rounded-xl bg-surface overflow-hidden">
          <div className="flex justify-between items-center px-5 md:px-6 py-3.5 bg-walnut text-white font-mono text-[11px] tracking-[0.14em] uppercase">
            <span>Calculator vs planner</span>
            <span style={{ color: "#8FBF9F" }}>Same math · more of it</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 border-b md:border-b-0 md:border-r border-line">
              <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Calculator
              </div>
              <h3 className="text-lg font-bold mb-2">One material</h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                The deck calculator tells you boards. Concrete tells you bags.
                Stairs tells you treads. You run each, then assemble the list
                yourself.
              </p>
              <div className="font-mono text-[11px] text-ink-faint mt-3 p-2.5 bg-surface-alt rounded">
                deck-calculator → 42 boards
              </div>
            </div>
            <div className="p-6">
              <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-2">
                Planner
              </div>
              <h3 className="text-lg font-bold mb-2 text-accent">
                The whole project
              </h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                Enter dimensions once; the planner runs all the tools together
                and returns one material list — boards, frame, footings, stairs,
                railing, fasteners — with a cost estimate to check against a
                quote.
              </p>
              <div className="font-mono text-[11px] text-ink-faint mt-3 p-2.5 bg-surface-alt rounded">
                build-a-deck → 42 boards · 18 joists · 9 bags · 14 balusters · 1
                box screws
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
