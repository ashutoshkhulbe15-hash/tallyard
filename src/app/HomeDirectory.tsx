"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface DirRow {
  cat: string;
  href: string;
  tools: string[];
  count: number;
  formula: string;
  kw: string;
}

const ROWS: DirRow[] = [
  {
    cat: "Paint + walls",
    href: "/calculators/paint-walls",
    tools: ["PAINT", "WALLPAPER", "DRYWALL"],
    count: 3,
    formula: "(2(L+W)×H − openings) ÷ 350 sf/gal",
    kw: "paint wallpaper drywall gallon roll sheet bedroom wall ceiling coat primer interior exterior",
  },
  {
    cat: "Masonry",
    href: "/calculators/masonry",
    tools: ["CONCRETE", "BRICK", "REBAR", "MORTAR", "ASPHALT"],
    count: 6,
    formula: "L × W × depth ÷ 27 = cu yd",
    kw: "concrete brick rebar mortar asphalt chimney slab driveway footing cement bag pour patio",
  },
  {
    cat: "Flooring + kitchen",
    href: "/calculators/flooring-kitchen",
    tools: ["TILE", "HARDWOOD", "CABINETS"],
    count: 8,
    formula: "area × (1 + waste) ÷ box coverage",
    kw: "tile grout flooring hardwood laminate vinyl backsplash vanity countertop cabinet kitchen bathroom shower",
  },
  {
    cat: "Landscaping",
    href: "/calculators/landscaping",
    tools: ["DECK", "FENCE", "MULCH", "GRAVEL"],
    count: 9,
    formula: "posts = L ÷ 8-ft spacing + 1",
    kw: "deck fence mulch gravel paver topsoil sod pool rainwater patio garden lawn yard post picket",
  },
  {
    cat: "Roofing + exterior",
    href: "/calculators/roofing-exterior",
    tools: ["SHINGLES", "SIDING", "GUTTERS"],
    count: 6,
    formula: "footprint × pitch factor ÷ 100 = squares",
    kw: "roofing shingle siding gutter attic ventilation snow load garage door square pitch bundle",
  },
  {
    cat: "HVAC + plumbing",
    href: "/calculators/hvac-plumbing",
    tools: ["HEAT PUMP", "BTU", "WATER HEATER"],
    count: 4,
    formula: "sf × 20–25 BTU × adjustments",
    kw: "hvac heat pump btu ac air conditioner water heater tankless drain pipe furnace cooling heating ton",
  },
  {
    cat: "Electrical + solar",
    href: "/calculators/electrical-solar",
    tools: ["PANELS", "WIRE GAUGE", "CORDS"],
    count: 3,
    formula: "VD = 2 × K × I × L ÷ CM, cap 3%",
    kw: "electrical solar panel wire size awg gauge voltage drop extension cord subpanel circuit amp",
  },
  {
    cat: "Lumber + framing",
    href: "/calculators/lumber-framing",
    tools: ["BOARD FEET", "STAIRS", "STUDS"],
    count: 6,
    formula: "t × w × L ÷ 12 = BF, × qty + waste",
    kw: "lumber board feet stair stud spacing window sizing shed insulation framing 2x4 2x6 riser tread",
  },
];

export function HomeDirectory() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!q) return ROWS;
    return ROWS.filter((r) => {
      const hay =
        `${r.cat} ${r.tools.join(" ")} ${r.formula} ${r.kw}`.toLowerCase();
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [q]);

  const toolCount = visible.reduce((s, r) => s + r.count, 0);

  return (
    <div>
      <div className="flex items-center bg-surface border-[1.5px] border-ink rounded-md overflow-hidden shadow-[0_10px_30px_-18px_rgba(17,24,20,0.3)]">
        <label
          htmlFor="home-dir-search"
          className="self-stretch flex items-center font-mono text-[13px] text-accent bg-accent-soft px-4 border-r border-line"
        >
          FIND
        </label>
        <input
          id="home-dir-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="deck, concrete slab, paint a bedroom, wire a subpanel…"
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent border-0 text-base py-3.5 px-4 text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <Link
          href="/calculators"
          className="hidden sm:block font-mono text-[11px] text-ink-muted border border-line rounded px-2 py-0.5 mr-3.5 hover:border-accent hover:text-accent transition-colors"
        >
          ⌘K
        </Link>
      </div>
      <div className="font-mono text-xs text-ink-muted mt-3 ml-0.5">
        Showing <b className="text-ink font-medium">{visible.length}</b>{" "}
        {visible.length === 1 ? "category" : "categories"} ·{" "}
        <b className="text-ink font-medium">{toolCount}</b> calculators
      </div>

      <div className="mt-5 border border-line rounded-xl bg-surface overflow-hidden">
        <div className="hidden md:grid grid-cols-[200px_1fr_150px_80px] gap-5 px-5 py-2.5 border-b border-ink font-mono text-[9.5px] tracking-[0.16em] uppercase text-ink-faint">
          <span>Category</span>
          <span>Example formula</span>
          <span>Tools</span>
          <span className="text-right"> </span>
        </div>

        {visible.map((r) => (
          <Link
            key={r.cat}
            href={r.href}
            className="group grid grid-cols-1 md:grid-cols-[200px_1fr_150px_80px] gap-1 md:gap-5 px-5 py-3.5 md:py-3 border-b border-line last:border-b-0 md:items-baseline hover:bg-[#F5F9F4] transition-colors"
          >
            <span className="font-bold text-[14px] tracking-tight">
              {r.cat}
              <span className="block font-mono font-medium text-[10px] text-accent tracking-[0.02em] mt-0.5">
                {r.tools.join(" · ")}
              </span>
            </span>
            <span className="font-mono text-[11.5px] text-ink-muted md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
              {r.formula}
            </span>
            <span className="text-[12.5px] text-ink-muted">
              {r.count} tools
            </span>
            <span className="font-mono text-[11px] text-ink md:text-right">
              open
              <span className="text-accent ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </span>
          </Link>
        ))}

        {visible.length === 0 && (
          <div className="px-5 py-12 text-center text-[14.5px] text-ink-muted">
            No category matches that.
            <span className="block font-mono text-accent text-[12.5px] mt-1.5">
              Try &quot;concrete&quot;, &quot;tile&quot;, &quot;deck&quot;, or
              &quot;wire&quot;.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
