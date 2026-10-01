"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Ledger master index: no hero, no pill chips, no card grids.
 * A search-first console over a dense index table where every row
 * shows the calculator's actual formula and source standard inline —
 * the "show your work" promise made structural.
 */

interface Row {
  slug: string;
  name: string;
  sub: string;
  /** Formula string; text between ** ** renders in verify green */
  f: string;
  src: string;
  out: string;
  cat: string;
  kw: string;
}

const CATS: { id: string; label: string; guide: string }[] = [
  { id: "paint", label: "Paint + walls", guide: "/calculators/paint-walls" },
  { id: "masonry", label: "Masonry", guide: "/calculators/masonry" },
  { id: "flooring", label: "Flooring + kitchen", guide: "/calculators/flooring-kitchen" },
  { id: "landscaping", label: "Landscaping", guide: "/calculators/landscaping" },
  { id: "roofing", label: "Roofing + exterior", guide: "/calculators/roofing-exterior" },
  { id: "hvac", label: "HVAC + plumbing", guide: "/calculators/hvac-plumbing" },
  { id: "electrical", label: "Electrical + solar", guide: "/calculators/electrical-solar" },
  { id: "lumber", label: "Lumber + framing", guide: "/calculators/lumber-framing" },
];

const ROWS: Row[] = [
  // Paint + walls
  { slug: "paint-calculator", name: "Paint quantity", sub: "Estimate from entered surfaces and coverage assumptions", f: "entered surface area × entered coats ÷ assumed coverage", src: "Check product label", out: "quantity estimate", cat: "paint", kw: "bedroom wall ceiling interior exterior gallon coat primer" },
  { slug: "wallpaper-calculator", name: "Wallpaper roll coverage", sub: "Roll count from net area and exact product-label coverage", f: "ceil(adjusted area ÷ label coverage)", src: "Product label", out: "roll estimate", cat: "paint", kw: "wallpaper rolls area coverage" },
  { slug: "drywall-calculator", name: "Drywall panel area", sub: "Panel count from net area, nominal panel size, and selected allowance", f: "ceil(adjusted area ÷ selected panel area)", src: "Area arithmetic", out: "panel estimate", cat: "paint", kw: "sheetrock gypsum board panel area" },
  // Masonry
  { slug: "concrete-calculator", name: "Concrete volume", sub: "Geometric volume from entered shape and dimensions", f: "area × thickness × (1 + selected allowance)", src: "Volume geometry", out: "yd³ · m³", cat: "masonry", kw: "slab driveway footing sonotube cement bag pour patio yard" },
  { slug: "mortar-calculator", name: "Mortar packages", sub: "From unit count and exact package coverage", f: "ceil((units × (1 + selected allowance)) ÷ units per bag)", src: "Product label", out: "bags", cat: "masonry", kw: "masonry brick block stone mortar package coverage" },
  { slug: "asphalt-calculator", name: "Asphalt volume/weight estimate", sub: "Entered thickness and stated density assumption", f: "rectangular area × entered depth; weight uses assumed density", src: "Assumption shown", out: "volume · approx. weight", cat: "masonry", kw: "blacktop hot mix driveway paving ton" },
  { slug: "rebar-calculator", name: "Rebar grid geometry", sub: "Gross straight-run length at selected spacing", f: "run counts = ceil(perpendicular dimension ÷ spacing) + 1", src: "Geometry only", out: "lineal length", cat: "masonry", kw: "reinforcement grid layout geometry gross length" },
  { slug: "brick-calculator", name: "Brick quantity", sub: "From net wall area and product/layout coverage", f: "ceil(net wall area × entered coverage × (1 + allowance))", src: "Product/layout input", out: "bricks", cat: "masonry", kw: "brick wall net area coverage unit count" },
  { slug: "chimney-calculator", name: "Fireplace opening area", sub: "Rectangular opening area only—not flue sizing", f: "opening area = width × height", src: "Geometry only", out: "opening area", cat: "masonry", kw: "fireplace opening area width height" },
  // Flooring + kitchen
  { slug: "tile-calculator", name: "Tile packages", sub: "Packages from area and exact label coverage", f: "ceil((area × (1 + selected allowance)) ÷ label coverage)", src: "Product label", out: "packages", cat: "flooring", kw: "ceramic porcelain floor bathroom kitchen box quantity" },
  { slug: "grout-calculator", name: "Grout packages", sub: "From measured area and exact product coverage", f: "ceil((area × (1 + selected allowance)) ÷ package coverage)", src: "Product label", out: "packages", cat: "flooring", kw: "grout tile area package coverage quantity" },
  { slug: "flooring-calculator", name: "Flooring packages", sub: "Packages from area and exact label coverage", f: "ceil((area × (1 + selected allowance)) ÷ label coverage)", src: "Product label", out: "packages", cat: "flooring", kw: "hardwood laminate lvp vinyl plank box room" },
  { slug: "shower-tile-calculator", name: "Shower tile packages", sub: "Packages from measured tiled area and label coverage", f: "ceil((measured area × (1 + selected allowance)) ÷ label coverage)", src: "Product label", out: "packages", cat: "flooring", kw: "bathroom surround shower niche wall" },
  { slug: "backsplash-calculator", name: "Backsplash packages", sub: "From measured tile area and exact label coverage", f: "ceil((net area × (1 + selected allowance)) ÷ package coverage)", src: "Product label", out: "packages", cat: "flooring", kw: "kitchen backsplash tile package area coverage" },
  { slug: "vanity-calculator", name: "Vanity wall-width worksheet", sub: "Remaining width after entered clearances; no product or code assessment", f: "wall width − left and right clearances", src: "User inputs", out: "remaining width", cat: "flooring", kw: "vanity wall width measurement" },
  { slug: "countertop-calculator", name: "Countertop surface area", sub: "Surface estimate from entered dimensions", f: "entered rectangular surfaces × dimensions", src: "User inputs", out: "area estimate", cat: "flooring", kw: "granite quartz island kitchen overhang cost" },
  { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinets", sub: "Layout-based estimate; verify scope and pricing", f: "entered wall runs × selected assumptions", src: "Assumptions shown", out: "estimate", cat: "flooring", kw: "stock semi custom layout linear cost remodel" },
  { slug: "hardwood-flooring-cost-calculator", name: "Hardwood flooring quote", sub: "Subtotal from area and quoted rates", f: "area × entered rates + fixed extras", src: "Written quote inputs", out: "USD subtotal", cat: "flooring", kw: "hardwood floor installation quote cost" },
  { slug: "hardwood-floor-refinishing-cost-calculator", name: "Floor refinishing quote", sub: "Subtotal from area and quoted rates", f: "area × quoted rate + fixed extras", src: "Written quote inputs", out: "USD subtotal", cat: "flooring", kw: "hardwood floor sanding refinishing quote cost" },
  // Landscaping
  { slug: "deck-stair-calculator", name: "Deck stair geometry", sub: "Equal-rise geometry from entered dimensions", f: "riser count = round(total rise ÷ target rise)", src: "Geometry only", out: "geometry estimate", cat: "landscaping", kw: "deck stairs riser tread rise run" },
  { slug: "mulch-calculator", name: "Mulch", sub: "Volume or nominal bag count", f: "area × selected depth", src: "Volume geometry", out: "yd³/m³ · bags", cat: "landscaping", kw: "bed garden bag yard depth wood chip" },
  { slug: "gravel-calculator", name: "Gravel", sub: "Aggregate volume and approximate weight", f: "volume = area × selected depth", src: "Density is approximate", out: "volume · weight estimate", cat: "landscaping", kw: "aggregate crushed stone gravel volume weight" },
  { slug: "fence-calculator", name: "Fence quantity estimate", sub: "Straight-run quantities from entered assumptions", f: "quantity depends on entered layout and spacing", src: "User inputs", out: "limited quantities", cat: "landscaping", kw: "post picket rail privacy wood yard gate" },
  { slug: "paver-calculator", name: "Paver", sub: "Count from area and nominal paver size", f: "ceil(area ÷ nominal face area × (1 + selected allowance))", src: "", out: "pavers", cat: "landscaping", kw: "patio walkway paver count brick stone" },
  { slug: "deck-calculator", name: "Deck", sub: "Surface area and rough board count", f: "rows = width÷(board face + selected gap)", src: "Geometry only", out: "board estimate", cat: "landscaping", kw: "deck board decking area material quantity" },
  { slug: "topsoil-calculator", name: "Soil volume", sub: "Rectangular area and selected depth", f: "area × selected depth", src: "Volume geometry", out: "yd³/m³ · bag estimate", cat: "landscaping", kw: "soil fill lawn garden volume bag" },
  { slug: "sod-calculator", name: "Sod area and pieces", sub: "Selected package format and allowance", f: "area × (1 + allowance) ÷ coverage", src: "Supplier coverage required", out: "area · pieces", cat: "landscaping", kw: "grass lawn sod slabs rolls coverage" },
  { slug: "pool-chlorine-calculator", name: "Pool chlorine mass", sub: "Theoretical mass from measured values and label strength", f: "volume(L) × ppm gap ÷ 1000 ÷ label mass fraction", src: "User-entered label value", out: "g · kg", cat: "landscaping", kw: "pool chlorine mass ppm label strength" },
  { slug: "rainwater-calculator", name: "Rainfall runoff", sub: "Event runoff volume estimate", f: "area(m²) × rainfall(mm) × selected factor", src: "", out: "liters · gallons", cat: "landscaping", kw: "rainfall runoff roof catchment volume" },
  // Roofing + exterior
  { slug: "roofing-calculator", name: "Roof area", sub: "Planar area for a simple footprint and pitch", f: "footprint × √(1 + pitch²)", src: "Geometry only", out: "area estimate", cat: "roofing", kw: "roof surface area pitch footprint" },
  { slug: "siding-calculator", name: "Siding area worksheet", sub: "Net measured area with a user-selected allowance; no material takeoff", f: "entered area × (1 + selected allowance)", src: "User inputs", out: "area and square equivalents", cat: "roofing", kw: "cladding siding area measured wall surfaces" },
  { slug: "gutter-calculator", name: "Gutter-run length worksheet", sub: "Sum measured runs with a user-selected allowance; no drainage sizing", f: "sum of entered runs × (1 + allowance)", src: "User inputs", out: "length estimate", cat: "roofing", kw: "gutter run length measured eave" },
  { slug: "attic-ventilation-calculator", name: "Attic area-ratio worksheet", sub: "Illustrative arithmetic; not net-free-area or design", f: "entered attic area ÷ selected ratio scenario", src: "Scenario only", out: "area scenario", cat: "roofing", kw: "attic ventilation area ratio scenario" },
  { slug: "snow-load-calculator", name: "Snow/ice weight estimate", sub: "Entered depth and assumed density; not capacity", f: "depth × selected density assumption", src: "Assumption shown", out: "weight estimate", cat: "roofing", kw: "roof psf winter weight structural" },
  { slug: "garage-door-calculator", name: "Garage door opening", sub: "Dimensions from user-entered opening", f: "entered opening and clearance dimensions", src: "Verify manufacturer", out: "dimensions", cat: "roofing", kw: "opener headroom torsion spring single double" },
  // HVAC + plumbing
  { slug: "btu-calculator", name: "Room AC capacity", sub: "ENERGY STAR area guide and adjustments", f: "area band + sun · occupants · kitchen", src: "ENERGY STAR", out: "BTU/hr guide", cat: "hvac", kw: "room air conditioner AC cooling capacity BTU size" },
  { slug: "heat-pump-calculator", name: "Heating/cooling load conversion", sub: "Converts documented loads; does not calculate loads or select equipment", f: "entered BTU/h ÷ 12,000", src: "Arithmetic only", out: "ton-equivalent", cat: "hvac", kw: "heat pump heating cooling load ton conversion" },
  { slug: "water-heater-calculator", name: "Water-heating rate conversion", sub: "Theoretical rate from entered flow and temperature rise", f: "flow × temperature rise × water heat-capacity factor", src: "Idealized arithmetic", out: "heat-transfer rate", cat: "hvac", kw: "water heater flow temperature rise heat rate" },
  { slug: "drain-pipe-calculator", name: "Fixture-unit worksheet", sub: "Illustrative IPC 2021 DFU subtotal—not pipe sizing", f: "Σ fixture count × selected DFU value", src: "IPC 2021 examples", out: "DFU subtotal", cat: "hvac", kw: "dfu drainage fixture unit subtotal plumbing" },
  { slug: "furnace-replacement-cost-calculator", name: "Furnace replacement quote", sub: "Sum itemized quote amounts", f: "sum of entered quote line items", src: "Written quote inputs", out: "USD subtotal", cat: "hvac", kw: "furnace replacement installation quote cost" },
  // Electrical + solar
  { slug: "solar-calculator", name: "Solar energy-use scenario", sub: "Panel-count arithmetic from entered usage and assumptions; not a forecast or design", f: "usage ÷ (days × entered sun-hours × entered derate)", src: "User assumptions", out: "scenario only", cat: "electrical", kw: "solar panel energy usage scenario arithmetic" },
  { slug: "wire-size-calculator", name: "Conductor voltage-drop worksheet", sub: "Limited lookup and drop calculation—not circuit design", f: "voltage-drop calculation for entered conductor assumptions", src: "Not code approval", out: "estimate", cat: "electrical", kw: "awg gauge voltage drop subpanel circuit amp copper" },
  { slug: "extension-cord-calculator", name: "Extension cord voltage drop", sub: "Estimate drop for a selected conductor size—not a safety rating", f: "2 × I × R × one-way length", src: "Resistive estimate", out: "voltage drop", cat: "electrical", kw: "extension cord voltage drop length wire gauge" },
  // Lumber + framing
  { slug: "insulation-calculator", name: "Insulation package coverage", sub: "Package count from measured area and exact product-label coverage", f: "ceil(adjusted area ÷ entered package coverage)", src: "Product label", out: "package estimate", cat: "lumber", kw: "insulation area package product coverage" },
  { slug: "lumber-calculator", name: "Lumber quantity worksheet", sub: "Nominal board-foot and lineal length arithmetic; no weight or price", f: "nominal thickness × width × length ÷ 12", src: "Arithmetic only", out: "board feet · lineal feet", cat: "lumber", kw: "board feet lineal length nominal lumber" },
  { slug: "stair-calculator", name: "Stair geometry estimate", sub: "User-selected rise/run arithmetic; not a cut sheet", f: "riser count = round(total rise ÷ selected target)", src: "Geometry only", out: "geometry estimate", cat: "lumber", kw: "riser tread rise run stair geometry" },
  { slug: "stud-spacing-calculator", name: "Straight-wall spacing count", sub: "Position count only; not stud or framing takeoff", f: "ceil(length ÷ selected interval) + 1", src: "Arithmetic only", out: "positions", cat: "lumber", kw: "wall length spacing positions" },
  { slug: "window-sizing-calculator", name: "Window rectangle area", sub: "Area arithmetic only; no egress or code assessment", f: "entered width × entered height", src: "Geometry only", out: "area", cat: "lumber", kw: "window rectangle area dimensions" },
  { slug: "egress-window-calculator", name: "Clear-opening area", sub: "Area from user-entered clear dimensions; not an egress verdict", f: "entered clear width × entered clear height", src: "Geometry only", out: "area", cat: "lumber", kw: "clear opening area window dimensions" },
  { slug: "shed-calculator", name: "Shed surface estimate", sub: "Limited area and sheet estimates; not material takeoff", f: "entered floor and wall geometry", src: "Geometry only", out: "area estimate", cat: "lumber", kw: "framing sheathing shingles backyard takeoff material list" },
];

const COST_GUIDES = [
  { slug: "cost-to-build-a-deck", name: "Cost to build a deck", r: "Scope + bids" },
  { slug: "cost-to-replace-a-roof", name: "Cost to replace a roof", r: "Measure + bids" },
  { slug: "cost-to-build-a-fence", name: "Cost to build a fence", r: "Measure + bids" },
  { slug: "cost-to-paint-a-house", name: "Cost to paint a house", r: "Scope + bids" },
  { slug: "cost-to-install-flooring", name: "Cost to install flooring", r: "Measure + bids" },
  { slug: "cost-to-remodel-a-bathroom", name: "Cost to remodel a bathroom", r: "Scope + bids" },
  { slug: "cost-to-pour-concrete", name: "Cost to pour concrete", r: "Volume + bids" },
  { slug: "cost-to-install-siding", name: "Cost to install siding", r: "Measure + bids" },
  { slug: "cost-to-install-solar", name: "Cost to install solar", r: "Compare quotes" },
  { slug: "cost-to-replace-hvac", name: "Cost to replace HVAC", r: "Compare quotes" },
];

/** Renders a formula string, bolding **wrapped** segments in verify green. */
function Formula({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <b key={i} className="text-accent font-medium">
            {p}
          </b>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export function CalculatorIndex() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses the index search (⌘K stays with the global header search)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    return ROWS.filter((r) => {
      if (cat !== "all" && r.cat !== cat) return false;
      if (!q) return true;
      const hay =
        `${r.name} ${r.sub} ${r.f} ${r.src} ${r.out} ${r.kw}`.toLowerCase();
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [q, cat]);

  const shownCats = CATS.filter((c) =>
    visible.some((r) => r.cat === c.id)
  ).map((c) => c.id);

  return (
    <>
      {/* Console header: search IS the page */}
      <div className="container-wide pt-9 md:pt-11">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h1 className="text-2xl md:text-[26px] font-bold tracking-tight">
            Calculator index
            <span className="font-mono text-[13px] text-accent font-medium ml-2.5 tracking-normal">
              {ROWS.length} TOOLS · ALL FREE
            </span>
          </h1>
          <div className="font-mono text-[11.5px] text-ink-muted">
            REVIEW EACH TOOL&apos;S INPUTS + LIMITATIONS
          </div>
        </div>
        <div className="mt-4 flex items-center bg-surface border-[1.5px] border-ink rounded-md overflow-hidden shadow-[0_10px_30px_-18px_rgba(17,24,20,0.3)]">
          <label
            htmlFor="calc-search"
            className="self-stretch flex items-center font-mono text-[13px] text-accent bg-accent-soft px-4 border-r border-line"
          >
            FIND
          </label>
          <input
            ref={searchRef}
            id="calc-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your project: deck, concrete slab, paint a bedroom, wire a subpanel…"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent border-0 text-base py-3.5 px-4 text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <span className="hidden sm:block font-mono text-[11px] text-ink-muted border border-line rounded px-2 py-0.5 mr-3.5">
            /
          </span>
        </div>
        <div className="font-mono text-xs text-ink-muted mt-3 ml-0.5">
          Showing <b className="text-ink font-medium">{visible.length}</b> of {ROWS.length}
          calculators
        </div>
      </div>

      {/* Two-pane: category rail + master index */}
      <div className="container-wide mt-5 pb-16 grid grid-cols-1 lg:grid-cols-[212px_1fr] gap-5 lg:gap-9 items-start">
        <aside className="lg:sticky lg:top-20 flex lg:block gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
          <div className="hidden lg:block font-mono text-[10px] tracking-[0.16em] uppercase text-ink-faint pb-2.5 pl-0.5">
            Filter by category
          </div>
          <button
            onClick={() => setCat("all")}
            className={`shrink-0 lg:w-full flex justify-between items-center gap-3 text-left text-[13.5px] font-medium px-3.5 py-2 transition-colors whitespace-nowrap rounded-full lg:rounded-none border lg:border-0 lg:border-l-2 ${
              cat === "all"
                ? "border-accent lg:border-l-accent text-ink bg-accent-soft lg:bg-gradient-to-r lg:from-accent-soft lg:to-transparent"
                : "border-line lg:border-l-transparent text-ink-muted hover:text-ink"
            }`}
          >
            All calculators
            <span
              className={`font-mono text-[11px] ${cat === "all" ? "text-accent" : "text-ink-faint"}`}
            >
              {ROWS.length}
            </span>
          </button>
          {CATS.map((c) => {
            const n = ROWS.filter((r) => r.cat === c.id).length;
            const on = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(on ? "all" : c.id)}
                className={`shrink-0 lg:w-full flex justify-between items-center gap-3 text-left text-[13.5px] font-medium px-3.5 py-2 transition-colors whitespace-nowrap rounded-full lg:rounded-none border lg:border-0 lg:border-l-2 ${
                  on
                    ? "border-accent lg:border-l-accent text-ink bg-accent-soft lg:bg-gradient-to-r lg:from-accent-soft lg:to-transparent"
                    : "border-line lg:border-l-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {c.label}
                <span
                  className={`font-mono text-[11px] ${on ? "text-accent" : "text-ink-faint"}`}
                >
                  {n}
                </span>
              </button>
            );
          })}
          <div className="hidden lg:block mt-6 p-3.5 border border-dashed border-line rounded-md text-[11.5px] text-ink-muted leading-normal">
            <b className="text-accent font-semibold">
              Why formulas are on this page:
            </b>{" "}
            if we can&apos;t show the math at the index level, we don&apos;t publish the
            tool. Open any row for the full worked method.
          </div>
        </aside>

        <main className="border border-line rounded-lg bg-surface overflow-hidden">
          {/* Column headers */}
          <div className="hidden lg:grid grid-cols-[210px_1fr_100px_92px] gap-5 px-5 py-2.5 border-b border-ink font-mono text-[9.5px] tracking-[0.16em] uppercase text-ink-faint">
            <span>Calculator</span>
            <span>Formula</span>
            <span>Source</span>
            <span className="text-right">Answers in</span>
          </div>

          {CATS.map((c) => {
            if (!shownCats.includes(c.id)) return null;
            const rows = visible.filter((r) => r.cat === c.id);
            return (
              <div key={c.id}>
                <div
                  className="flex justify-between items-center px-5 py-2 border-y border-line"
                  style={{ background: "linear-gradient(#F4F7F2,#EFF3ED)" }}
                >
                  <h2 className="text-[13.5px] font-bold tracking-normal">
                    {c.label}
                  </h2>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-ink-faint">
                      {rows.length} TOOLS
                    </span>
                    <Link
                      href={c.guide}
                      className="font-mono text-[10px] tracking-[0.06em] text-accent hover:underline"
                    >
                      GUIDE →
                    </Link>
                  </span>
                </div>
                {rows.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-[210px_1fr_100px_92px] gap-1 lg:gap-5 px-5 py-3.5 lg:py-3 border-b border-line last:border-b-0 lg:items-baseline hover:bg-[#F5F9F4] transition-colors"
                  >
                    <span className="font-semibold text-[14.5px] tracking-tight">
                      {r.name}
                      <span className="block font-normal text-xs text-ink-muted mt-px">
                        {r.sub}
                      </span>
                    </span>
                    <span className="font-mono text-[11.5px] text-ink-muted lg:overflow-hidden lg:text-ellipsis lg:whitespace-nowrap">
                      <Formula text={r.f} />
                    </span>
                    <span className="font-mono text-[10px] text-amber tracking-[0.04em] whitespace-nowrap">
                      {r.src}
                    </span>
                    <span className="font-mono text-[11px] text-ink lg:text-right whitespace-nowrap">
                      {r.out}
                      <span className="text-accent ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            );
          })}

          {visible.length === 0 && (
            <div className="px-5 py-12 text-center text-[14.5px] text-ink-muted">
              No calculator matches that yet.
              <span className="block font-mono text-accent text-[12.5px] mt-1.5">
                Try a material: &quot;concrete&quot;, &quot;tile&quot;,
                &quot;wire&quot;, or a project, &quot;deck&quot;,
                &quot;shed&quot;.
              </span>
            </div>
          )}
        </main>
      </div>

      {/* Cost guides + colophon */}
      <div className="container-wide pb-20 grid grid-cols-1 lg:grid-cols-[212px_1fr] gap-9">
        <div className="hidden lg:block" />
        <div>
          <div className="border border-line rounded-lg bg-surface overflow-hidden">
            <div
              className="flex justify-between items-center px-5 py-2 border-b border-line"
              style={{ background: "linear-gradient(#F4F7F2,#EFF3ED)" }}
            >
              <h2 className="text-[13.5px] font-bold tracking-normal flex items-baseline gap-2.5">
                Cost guides
                <span className="font-mono text-[10px] font-normal tracking-[0.1em] text-ink-faint">
                  PROJECT SCOPE · QUOTE COMPARISON
                </span>
              </h2>
              <span className="font-mono text-[10px] tracking-[0.1em] text-ink-faint">
                10 GUIDES
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {COST_GUIDES.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className={`flex justify-between items-baseline gap-4 px-5 py-3 text-[13.5px] font-medium border-b border-line hover:bg-[#F5F9F4] hover:text-accent transition-colors sm:odd:border-r ${
                    i >= COST_GUIDES.length - 2 ? "sm:last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0" : ""
                  }`}
                >
                  {c.name}
                  <span className="font-mono text-[11px] text-ink-faint">
                    {c.r}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-7 text-[13px] text-ink-muted max-w-[70ch] leading-relaxed">
            <b className="text-ink">About this index.</b> These tools provide
            limited planning calculations from the inputs shown. Accuracy and
            scope vary by tool, and no universal error range is promised. Review
            its assumptions and references, then verify project quantities and
            requirements independently: see our{" "}
            <Link
              href="/methodology"
              className="text-accent hover:underline font-medium"
            >
              methodology
            </Link>
            . Some tools offer shareable links; check the individual page for
            that option before saving or sending a calculation.
          </p>
        </div>
      </div>
    </>
  );
}
