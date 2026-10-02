import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Project Measurement Guides | Tallyard",
  description:
    "Browse limited measurement estimators for home projects. Outputs are not complete material takeoffs, construction plans, or quotes.",
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

// Project pages expose separate estimators and planning guidance, not chained takeoffs.
const projects: Project[] = [
  {
    slug: "remodel-a-bathroom",
    n: "01",
    title: "Remodel a bathroom",
    desc: "Separate tile, grout, vanity, and paint estimators",
    chainCount: "SEPARATE TOOLS",
    steps: ["Tile packages", "Grout packages", "Vanity dimensions"],
  },
  {
    slug: "build-a-deck",
    n: "02",
    title: "Build a deck",
    desc: "Surface-area estimate and related geometry tools",
    chainCount: "SEPARATE TOOLS",
    steps: ["Deck surface", "Concrete volume", "Stair geometry"],
  },
  {
    slug: "replace-a-roof",
    n: "03",
    title: "Replace a roof",
    desc: "Roof-area, ventilation worksheet, and gutter measurements",
    chainCount: "SEPARATE TOOLS",
    steps: ["Roof area", "Ventilation worksheet", "Gutter measurements"],
  },
  {
    slug: "build-a-patio",
    n: "04",
    title: "Build a patio",
    desc: "Rectangular area and paver count estimate",
    chainCount: "AREA ESTIMATE",
    steps: ["Rectangular area", "Nominal paver size", "Selected allowance"],
  },
  {
    slug: "install-a-fence",
    n: "05",
    title: "Install a fence",
    desc: "Limited straight-run counts and separate volume estimator",
    chainCount: "SEPARATE TOOLS",
    steps: ["Fence quantities", "Concrete volume", "Site requirements"],
  },
  {
    slug: "paint-a-room",
    n: "06",
    title: "Paint a room",
    desc: "Paint quantity estimate using displayed coverage assumptions",
    chainCount: "SINGLE ESTIMATE",
    steps: ["Measure surfaces", "Check product coverage", "Set coat assumptions"],
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
          Project planning ·{" "}
          <span className="text-accent">separate measurement tools</span>
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.04] mb-4 text-ink">
          Plan your <span className="accent-italic">measurements.</span>
        </h1>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
          These pages collect limited estimators for common project measurements.
          They do not combine into construction-ready plans, complete material
          takeoffs, or project-specific price quotes. Verify each result against
          current product data, project documents, and qualified local advice.
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
                style={{ background: "linear-gradient(#FFFFFF,#FAFCF9)" }}
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
                    <b className="text-ink font-semibold block text-[12.5px]">Limited estimates</b>
                    <span className="text-[10.5px] text-ink-faint">not a complete takeoff</span>
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

      <section className="container-content py-12 md:py-16">
        <div className="guide-prose border-t border-line pt-8">
          <h2>What to gather before you start</h2>
          <p>Have a sketch or photos, dimensions with units, the exact product label or package coverage, and any project drawings ready. For a renovation, note what stays, what moves, and which surfaces are included. For outdoor work, record boundaries, slopes, gates, and access for delivery. These details help you choose the right calculator inputs and make estimates easier to review with a supplier or contractor.</p>
          <p>Measure the actual area or dimensions requested by each calculator, confirm unit consistency, and keep separate materials in separate calculations. A surface estimate is not a coordinated design or complete bill of materials. For structural, electrical, plumbing, waterproofing, fire-safety, or other regulated work, rely on approved project documents and qualified professionals.</p>
        </div>
      </section>
    </>
  );
}
