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
  { slug: "paint-calculator", name: "Paint", sub: "Gallons by room size, openings subtracted", f: "(2(L+W)×H − openings) × coats **÷ 350 sf/gal**", src: "MFR DATA", out: "gallons", cat: "paint", kw: "bedroom wall ceiling interior exterior gallon coat primer" },
  { slug: "wallpaper-calculator", name: "Wallpaper", sub: "Rolls with pattern repeat", f: "wall area **÷ (roll sf × repeat factor)**", src: "MFR DATA", out: "rolls", cat: "paint", kw: "roll pattern repeat accent wall" },
  { slug: "drywall-calculator", name: "Drywall", sub: "Sheets for walls and ceilings", f: "surface area **÷ 32 sf/sheet** × waste", src: "USG SPEC", out: "sheets", cat: "paint", kw: "sheetrock gypsum board mud tape screw basement" },
  // Masonry
  { slug: "concrete-calculator", name: "Concrete", sub: "Slabs, footings, round pours", f: "L × W × depth **÷ 27 = cu yd**, +10% spill", src: "ACI 318", out: "cu yd · bags", cat: "masonry", kw: "slab driveway footing sonotube cement bag pour patio yard" },
  { slug: "mortar-calculator", name: "Mortar", sub: "Bags for brick, block, stone", f: "wall sf **× bags per 100 sf** by unit type", src: "ASTM C270", out: "bags", cat: "masonry", kw: "type s n cmu block stone joint mix" },
  { slug: "asphalt-calculator", name: "Asphalt", sub: "Tons for driveways and lots", f: "L × W × depth × **145 lb/ft³ ÷ 2000**", src: "NAPA", out: "tons", cat: "masonry", kw: "blacktop hot mix driveway paving ton" },
  { slug: "rebar-calculator", name: "Rebar", sub: "Grid layout for slabs", f: "(L÷spacing+1)×W + (W÷spacing+1)×L", src: "ACI 318", out: "20-ft sticks", cat: "masonry", kw: "reinforcement grid stick slab mesh" },
  { slug: "brick-calculator", name: "Brick", sub: "Bricks + mortar by joint width", f: "wall sf × **~6.9 bricks/sf** (modular, ⅜\" joint)", src: "BIA TN10", out: "bricks · bags", cat: "masonry", kw: "veneer wall modular mortar joint" },
  { slug: "chimney-calculator", name: "Chimney", sub: "Flue sizing for fireplaces", f: "flue area **≥ fireplace opening ÷ 10**", src: "IRC R1003", out: "flue size", cat: "masonry", kw: "flue fireplace stove liner draft" },
  // Flooring + kitchen
  { slug: "tile-calculator", name: "Tile", sub: "Tiles and boxes with cut waste", f: "area ÷ tile sf × **(1 + 10–15% waste)**", src: "TCNA", out: "tiles · boxes", cat: "flooring", kw: "ceramic porcelain floor bathroom kitchen box waste" },
  { slug: "grout-calculator", name: "Grout", sub: "Pounds by joint dimensions", f: "(L+W)÷(L×W) × joint w × d × **1.86**", src: "TCNA", out: "pounds", cat: "flooring", kw: "sanded unsanded joint tile pound bag" },
  { slug: "flooring-calculator", name: "Flooring", sub: "Hardwood, laminate, vinyl plank", f: "area × (1+waste) **÷ box coverage**", src: "NWFA", out: "boxes", cat: "flooring", kw: "hardwood laminate lvp vinyl plank box room" },
  { slug: "shower-tile-calculator", name: "Shower tile", sub: "Three walls, floor, niche", f: "Σ(wall areas) + floor + niche, **+15% waste**", src: "TCNA", out: "sq ft · boxes", cat: "flooring", kw: "bathroom surround niche wall" },
  { slug: "backsplash-calculator", name: "Backsplash", sub: "Counter run minus outlets", f: "run × height − outlets, **+10% waste**", src: "TCNA", out: "sq ft", cat: "flooring", kw: "kitchen subway tile counter outlet" },
  { slug: "vanity-calculator", name: "Vanity", sub: "Size with code clearances", f: "wall span − **clearances (15\" CL toilet, 21\" front)**", src: "IRC R307", out: "vanity width", cat: "flooring", kw: "bathroom sink cabinet clearance double" },
  { slug: "countertop-calculator", name: "Countertop", sub: "Area with island + overhang", f: "(run × 25.5\" + island) **÷ 144**", src: "NKBA", out: "sq ft · $", cat: "flooring", kw: "granite quartz island kitchen overhang cost" },
  { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinets", sub: "Linear feet by layout", f: "Σ wall runs × **$/lf by grade**", src: "NKBA", out: "linear ft · $", cat: "flooring", kw: "stock semi custom layout linear cost remodel" },
  // Landscaping
  { slug: "mulch-calculator", name: "Mulch", sub: "Beds at any depth", f: "sf × depth(in) **÷ 324 = cu yd**", src: "VOLUME", out: "cu yd · bags", cat: "landscaping", kw: "bed garden bag yard depth wood chip" },
  { slug: "gravel-calculator", name: "Gravel", sub: "Driveways and base layers", f: "sf × depth ÷ 324 × **1.4 tons/yd**", src: "AGG SPEC", out: "cu yd · tons", cat: "landscaping", kw: "crushed stone driveway base ton pea" },
  { slug: "fence-calculator", name: "Fence", sub: "Posts, rails, pickets, concrete", f: "posts = L **÷ 8-ft spacing + 1**; pickets = L ÷ (w+gap)", src: "IRC", out: "full list", cat: "landscaping", kw: "post picket rail privacy wood yard gate" },
  { slug: "paver-calculator", name: "Paver", sub: "Pavers, base gravel, sand", f: "area ÷ paver sf ×1.05; base = sf×4\" ÷324", src: "ICPI", out: "pavers · yd", cat: "landscaping", kw: "patio walkway base sand brick stone" },
  { slug: "deck-calculator", name: "Deck", sub: "Boards, joists, beams, fasteners", f: "boards = area÷(w×L); joists = **W÷16\" o.c. +1**", src: "NADRA · IRC", out: "full list", cat: "landscaping", kw: "board joist beam composite trex footing screw" },
  { slug: "topsoil-calculator", name: "Topsoil", sub: "Beds and lawn leveling", f: "sf × depth(in) **÷ 324 = cu yd**", src: "VOLUME", out: "cu yd · bags", cat: "landscaping", kw: "dirt fill lawn garden yard bag" },
  { slug: "sod-calculator", name: "Sod", sub: "Slabs, rolls, pallets", f: "lawn sf ÷ **slab/roll coverage**, +5% cuts", src: "TPI", out: "pallets", cat: "landscaping", kw: "grass lawn pallet roll turf" },
  { slug: "pool-chlorine-calculator", name: "Pool chlorine", sub: "Dose by volume and chemical", f: "gal × Δppm × **0.00013 ÷ strength**", src: "CDC MAHC", out: "oz · lb", cat: "landscaping", kw: "shock ppm swimming chemical dose" },
  { slug: "rainwater-calculator", name: "Rainwater", sub: "Harvest from roof area", f: "roof sf × rainfall(in) × **0.623 gal**", src: "EPA", out: "gallons", cat: "landscaping", kw: "harvest barrel collection roof gallon" },
  // Roofing + exterior
  { slug: "roofing-calculator", name: "Roofing", sub: "Bundles by pitch and footprint", f: "footprint × **pitch factor** ÷ 100 = squares ×3", src: "GAF · ARMA", out: "bundles", cat: "roofing", kw: "shingle square bundle pitch slope replace" },
  { slug: "siding-calculator", name: "Siding", sub: "Squares for any exterior", f: "Σ wall areas − openings **÷ 100 = squares**", src: "VSI · MFR", out: "squares", cat: "roofing", kw: "vinyl hardie fiber cement square house" },
  { slug: "gutter-calculator", name: "Gutter", sub: "Runs, downspouts, hangers", f: "eave lf; downspouts = **1 per 35 ft**; hangers @24\"", src: "SMACNA", out: "lf · pieces", cat: "roofing", kw: "downspout hanger eave k-style rain" },
  { slug: "attic-ventilation-calculator", name: "Attic ventilation", sub: "NFVA intake + exhaust", f: "attic sf **÷ 300**, split 50/50 intake/exhaust", src: "IRC R806", out: "sq in NFVA", cat: "roofing", kw: "soffit ridge vent nfva intake exhaust" },
  { slug: "snow-load-calculator", name: "Snow load", sub: "Load vs design capacity", f: "depth × **density (psf/in by snow type)**", src: "ASCE 7", out: "psf", cat: "roofing", kw: "roof psf winter weight structural" },
  { slug: "garage-door-calculator", name: "Garage door", sub: "Size, headroom, opener HP", f: "opening + headroom req; **HP by door weight**", src: "DASMA", out: "size · HP", cat: "roofing", kw: "opener headroom torsion spring single double" },
  // HVAC + plumbing
  { slug: "btu-calculator", name: "BTU", sub: "AC sizing with adjustments", f: "sf × **20–25 BTU** × sun · occupancy · kitchen", src: "ACCA MAN-J", out: "BTU/hr", cat: "hvac", kw: "ac air conditioner window unit cooling size room" },
  { slug: "heat-pump-calculator", name: "Heat pump", sub: "Tonnage by climate zone", f: "sf × **BTU/sf (zone 1–7)** ÷ 12,000", src: "ACCA · DOE", out: "tons", cat: "hvac", kw: "ton mini split climate zone heating cooling" },
  { slug: "water-heater-calculator", name: "Water heater", sub: "Tank gallons or tankless GPM", f: "**peak-hour demand** Σ fixture gallons", src: "DOE · IPC", out: "gal · GPM", cat: "hvac", kw: "tank tankless gpm gallon shower hot" },
  { slug: "drain-pipe-calculator", name: "Drain pipe", sub: "Size by DFU loading", f: "Σ DFU → pipe size per **IPC table 710.1**", src: "IPC · UPC", out: "pipe dia.", cat: "hvac", kw: "dfu waste plumbing fixture sewer size" },
  // Electrical + solar
  { slug: "solar-calculator", name: "Solar", sub: "System size from usage", f: "kWh/mo ÷ (30 × sun-hrs × **0.8 derate**)", src: "NREL", out: "kW · panels", cat: "electrical", kw: "panel kwh system offset sun roof" },
  { slug: "wire-size-calculator", name: "Wire size", sub: "AWG with voltage drop", f: "VD = **2 × K × I × L ÷ CM**, cap 3%", src: "NEC 310", out: "AWG", cat: "electrical", kw: "awg gauge voltage drop subpanel circuit amp copper" },
  { slug: "extension-cord-calculator", name: "Extension cord", sub: "Gauge for any tool", f: "amps + length → AWG per **ampacity table**", src: "NEC · UL", out: "AWG", cat: "electrical", kw: "gauge awg tool outdoor amp length" },
  // Lumber + framing
  { slug: "insulation-calculator", name: "Insulation", sub: "R-value + bags needed", f: "area ÷ **bag coverage @ target R**", src: "IECC · MFR", out: "bags · R", cat: "lumber", kw: "r-value batt blown attic wall fiberglass" },
  { slug: "lumber-calculator", name: "Lumber", sub: "Board feet + lineal feet", f: "t × w × L **÷ 12 = BF**, × qty + waste", src: "WWPA", out: "BF · lineal", cat: "lumber", kw: "board feet lineal 2x4 2x6 framing order wood" },
  { slug: "stair-calculator", name: "Stair", sub: "IRC-compliant rise/run", f: "risers = height ÷ **7¾\" max**; run ≥ 10\"", src: "IRC R311", out: "stringer cut", cat: "lumber", kw: "riser tread stringer rise run deck basement" },
  { slug: "stud-spacing-calculator", name: "Stud spacing", sub: "Studs, headers, jacks, kings", f: "L ÷ **16\" o.c. + 1**, + opening framing", src: "IRC R602", out: "stud count", cat: "lumber", kw: "16 oc wall framing header jack king cripple" },
  { slug: "window-sizing-calculator", name: "Window sizing", sub: "Egress + rough opening", f: "egress ≥ **5.7 sf clear**; light ≥ 8% floor", src: "IRC R310", out: "min size · RO", cat: "lumber", kw: "egress rough opening bedroom light basement" },
  { slug: "shed-calculator", name: "Shed", sub: "Full material takeoff", f: "framing + sheathing + roofing **from footprint**", src: "IRC", out: "full list", cat: "lumber", kw: "framing sheathing shingles backyard takeoff material list" },
];

const COST_GUIDES = [
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

  const visibleSlugs = new Set(visible.map((r) => r.slug));
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
              45 TOOLS · ALL FREE
            </span>
          </h1>
          <div className="font-mono text-[11.5px] text-ink-muted">
            EVERY ROW: <b className="text-accent font-medium">FORMULA + SOURCE</b>{" "}
            · NO SIGNUP
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
            placeholder="Type your project — deck, concrete slab, paint a bedroom, wire a subpanel…"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent border-0 text-base py-3.5 px-4 text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <span className="hidden sm:block font-mono text-[11px] text-ink-muted border border-line rounded px-2 py-0.5 mr-3.5">
            /
          </span>
        </div>
        <div className="font-mono text-xs text-ink-muted mt-3 ml-0.5">
          Showing <b className="text-ink font-medium">{visible.length}</b> of 45
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
              45
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
            if we can't show the math at the index level, we don't publish the
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
                Try a material — &quot;concrete&quot;, &quot;tile&quot;,
                &quot;wire&quot; — or a project — &quot;deck&quot;,
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
                  MATERIAL + LABOR · 2026 AVERAGES
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
            <b className="text-ink">About this index.</b> Every calculator is
            free — no signup, no email capture, no usage limits. Estimates land
            within 5–10% for standard residential projects; formulas come from
            the IRC, NEC, IPC, ASHRAE, ACI, TCNA, and manufacturer data sheets,
            cited on each page — see our{" "}
            <Link
              href="/methodology"
              className="text-accent hover:underline font-medium"
            >
              methodology
            </Link>
            . Every tool has a Copy-link button that encodes your inputs in the
            URL, so you can bookmark a calculation or send it to your
            contractor.
          </p>
        </div>
      </div>
    </>
  );
}
