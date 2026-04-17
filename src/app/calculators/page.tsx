import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All calculators",
  description: "Every Tallyard calculator, organized by project type.",
};

const liveCalculators = [
  {
    slug: "paint-calculator",
    name: "Paint calculator",
    desc: "Gallons of paint for any room, with door and window subtraction",
    category: "Paint",
  },
  {
    slug: "concrete-calculator",
    name: "Concrete calculator",
    desc: "Cubic yards for slabs, footings, and round pours — waste included",
    category: "Masonry",
  },
  {
    slug: "tile-calculator",
    name: "Tile calculator",
    desc: "Tiles and boxes needed for any floor, with waste and cuts",
    category: "Flooring",
  },
  {
    slug: "mulch-calculator",
    name: "Mulch calculator",
    desc: "Cubic yards or bag count for any garden bed and depth",
    category: "Landscaping",
  },
];

const comingSoon = [
  "Drywall", "Roofing", "BTU", "Solar panels",
  "Gravel", "Topsoil", "Flooring", "Grout",
  "Paver", "Deck", "Fence", "Lumber",
  "Wire size", "Stair", "Brick", "Wallpaper",
  "Sod", "Rebar", "Insulation", "Asphalt",
];

export default function CalculatorsIndexPage() {
  return (
    <div className="container-content py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
        Index
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        All calculators
      </h1>
      <p className="text-base text-ink-muted mb-10 max-w-prose leading-relaxed">
        Transparent calculators for home improvement and DIY projects. More are
        rolling out weekly — the goal is 40 calculators by launch.
      </p>

      <section className="mb-12">
        <h2 className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
          Available now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {liveCalculators.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
            >
              <div className="text-[10px] uppercase tracking-[0.08em] text-ink-faint font-semibold mb-2">
                {c.category}
              </div>
              <h3 className="text-base font-semibold mb-1">{c.name}</h3>
              <p className="text-xs text-ink-muted">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
          Coming soon
        </h2>
        <div className="flex flex-wrap gap-2">
          {comingSoon.map((name) => (
            <span
              key={name}
              className="inline-flex items-center px-3 py-1.5 text-xs text-ink-muted bg-surface border border-line rounded-full"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
