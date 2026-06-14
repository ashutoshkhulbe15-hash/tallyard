import Link from "next/link";
import type { Metadata } from "next";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  title: "Project planner — complete material lists for home improvement",
  description:
    "Plan an entire home improvement project in one tool. Enter your dimensions once and get a complete material list with cost estimates. Then compare against contractor quotes.",
  alternates: { canonical: "/planner" },
};

const projects = [
  {
    slug: "build-a-deck",
    title: "Build a deck",
    desc: "Decking, frame, concrete footings, stairs, railing, fasteners",
    calcs: "4 calculators chained",
    status: "live" as const,
  },
  {
    slug: "install-a-fence",
    title: "Install a fence",
    desc: "Posts, rails, pickets or panels, concrete, gates",
    calcs: "2 calculators chained",
    status: "live" as const,
  },
  {
    slug: "paint-a-room",
    title: "Paint a room",
    desc: "Paint, primer, ceiling paint, supplies, and cost estimate",
    calcs: "2 calculators chained",
    status: "live" as const,
  },
  {
    slug: "replace-a-roof",
    title: "Replace a roof",
    desc: "Shingles, underlayment, ventilation, gutters, flashing",
    calcs: "3 calculators chained",
    status: "live" as const,
  },
  {
    slug: "build-a-patio",
    title: "Build a patio",
    desc: "Pavers, base gravel, bedding sand, edge restraint",
    calcs: "3 calculators chained",
    status: "live" as const,
  },
  {
    slug: "remodel-a-bathroom",
    title: "Remodel a bathroom",
    desc: "Floor tile, shower tile, vanity, paint, grout",
    calcs: "5 calculators chained",
    status: "live" as const,
  },
];

export default function PlannerIndexPage() {
  return (
    <>
      {/* Banner */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-12">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Project planner
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan the whole project." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your dimensions once. Get a complete material list that
            chains multiple calculators together — decking + footings +
            stairs + railing, all from one set of inputs. Then compare
            against your contractor&apos;s quote.
          </p>
        </div>
      </section>

      {/* Project cards */}
      <section className="container-content py-12 md:py-16">
        <div className="space-y-3">
          {projects.map((project) => {
            const isLive = project.status === "live";
            const cardClass = `block p-6 bg-surface border border-line rounded-lg transition-all ${
              isLive
                ? "hover:border-accent hover:-translate-y-0.5"
                : "opacity-60"
            }`;
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-bold tracking-tight text-ink">
                    {project.title}
                  </h2>
                  <span
                    className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded shrink-0 ${
                      isLive
                        ? "text-accent bg-accent-soft"
                        : "text-ink-faint bg-bg-warm"
                    }`}
                  >
                    {isLive ? "Live" : "Coming soon"}
                  </span>
                </div>
                <p className="text-sm text-ink-muted mb-2">{project.desc}</p>
                <p className="text-xs text-ink-faint">{project.calcs}</p>
              </>
            );

            return isLive ? (
              <Link
                key={project.slug}
                href={`/planner/${project.slug}`}
                className={cardClass}
              >
                {inner}
              </Link>
            ) : (
              <div key={project.slug} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg-warm border-t border-line">
        <div className="container-content py-14">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            How planners are{" "}
            <span className="accent-italic">different</span> from
            calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-ink mb-1.5">
                Calculators = one material
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                The deck calculator tells you how many boards you need.
                The concrete calculator tells you how many bags. The stair
                calculator tells you how many treads. You run each one
                separately and assemble the list yourself.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-ink mb-1.5">
                Planners = the whole project
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                The deck planner asks for your dimensions once and runs
                all four calculators together. You get a single material
                list covering boards, frame, footings, stairs, railing,
                and fasteners — with a cost estimate you can compare
                against a contractor&apos;s quote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
