import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All calculators",
  description: "Every Tallyard calculator, organized by project type.",
};

const liveCalculators = [
  { slug: "paint-calculator", name: "Paint calculator", desc: "Gallons of paint for any room, with door and window subtraction", category: "Paint" },
  { slug: "wallpaper-calculator", name: "Wallpaper calculator", desc: "Rolls with pattern repeat, door, and window subtractions", category: "Paint" },
  { slug: "concrete-calculator", name: "Concrete calculator", desc: "Cubic yards for slabs, footings, and round pours — waste included", category: "Masonry" },
  { slug: "asphalt-calculator", name: "Asphalt calculator", desc: "Tons of asphalt for driveways, lots, and paving projects", category: "Masonry" },
  { slug: "rebar-calculator", name: "Rebar calculator", desc: "Lineal feet and 20-ft sticks for any concrete slab grid", category: "Masonry" },
  { slug: "brick-calculator", name: "Brick calculator", desc: "Bricks and mortar bags by size, joint width, and wall type", category: "Masonry" },
  { slug: "chimney-calculator", name: "Chimney calculator", desc: "Flue size for fireplaces and wood stoves (1/10 rule)", category: "Masonry" },
  { slug: "tile-calculator", name: "Tile calculator", desc: "Tiles and boxes needed for any floor, with waste and cuts", category: "Flooring" },
  { slug: "grout-calculator", name: "Grout calculator", desc: "Pounds of grout by tile size, joint width, and thickness", category: "Flooring" },
  { slug: "flooring-calculator", name: "Flooring calculator", desc: "Boxes of hardwood, laminate, or vinyl plank for any room", category: "Flooring" },
  { slug: "shower-tile-calculator", name: "Shower tile calculator", desc: "Tiles for three walls, floor, and optional niche", category: "Flooring" },
  { slug: "backsplash-calculator", name: "Backsplash calculator", desc: "Kitchen tile count with outlets and window subtractions", category: "Flooring" },
  { slug: "vanity-calculator", name: "Vanity calculator", desc: "Right size vanity with clearances and single/double sink", category: "Flooring" },
  { slug: "countertop-calculator", name: "Countertop calculator", desc: "Square feet and linear feet with island and cost estimate", category: "Flooring" },
  { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinet calculator", desc: "Linear feet of cabinets by kitchen layout and grade", category: "Flooring" },
  { slug: "mulch-calculator", name: "Mulch calculator", desc: "Cubic yards or bag count for any garden bed and depth", category: "Landscaping" },
  { slug: "gravel-calculator", name: "Gravel calculator", desc: "Cubic yards and tons for driveways, paths, and base layers", category: "Landscaping" },
  { slug: "fence-calculator", name: "Fence calculator", desc: "Posts, rails, pickets, and concrete for any fence length", category: "Landscaping" },
  { slug: "paver-calculator", name: "Paver calculator", desc: "Pavers, base gravel, bedding sand for any patio or path", category: "Landscaping" },
  { slug: "deck-calculator", name: "Deck calculator", desc: "Boards, joists, beams, and fasteners for any deck", category: "Landscaping" },
  { slug: "topsoil-calculator", name: "Topsoil calculator", desc: "Cubic yards or bags for garden beds, lawns, or fill projects", category: "Landscaping" },
  { slug: "sod-calculator", name: "Sod calculator", desc: "Slabs, rolls, and pallets for any lawn installation", category: "Landscaping" },
  { slug: "pool-chlorine-calculator", name: "Pool chlorine calculator", desc: "Dose for any pool volume — liquid, granular, trichlor, dichlor", category: "Landscaping" },
  { slug: "rainwater-calculator", name: "Rainwater calculator", desc: "Gallons collected from your roof, barrels or tanks", category: "Landscaping" },
  { slug: "drywall-calculator", name: "Drywall calculator", desc: "Sheets of drywall for walls and ceilings, with waste factor", category: "Drywall" },
  { slug: "roofing-calculator", name: "Roofing calculator", desc: "Shingle bundles and squares for any pitch and footprint", category: "Roofing" },
  { slug: "siding-calculator", name: "Siding calculator", desc: "Squares and linear feet for any house exterior", category: "Roofing" },
  { slug: "gutter-calculator", name: "Gutter calculator", desc: "Linear feet, downspouts, and hangers sized for your rainfall", category: "Roofing" },
  { slug: "attic-ventilation-calculator", name: "Attic ventilation calculator", desc: "NFVA intake and exhaust with the 1:300 rule", category: "Roofing" },
  { slug: "snow-load-calculator", name: "Snow load calculator", desc: "Roof snow load in psf vs. design capacity", category: "Roofing" },
  { slug: "garage-door-calculator", name: "Garage door calculator", desc: "Size, headroom, and opener HP for any garage", category: "Roofing" },
  { slug: "btu-calculator", name: "BTU calculator", desc: "Air conditioner size adjusted for climate, sun, and occupancy", category: "HVAC" },
  { slug: "heat-pump-calculator", name: "Heat pump calculator", desc: "Size in tons for heating and cooling — climate and insulation aware", category: "HVAC" },
  { slug: "water-heater-calculator", name: "Water heater calculator", desc: "Tank gallons or tankless GPM for any household", category: "HVAC" },
  { slug: "drain-pipe-calculator", name: "Drain pipe calculator", desc: "Pipe size by DFU loading per IPC/UPC codes", category: "HVAC" },
  { slug: "solar-calculator", name: "Solar panel calculator", desc: "System size and panel count based on your electricity use", category: "Solar" },
  { slug: "wire-size-calculator", name: "Wire size calculator", desc: "AWG gauge for any circuit, with voltage drop and distance", category: "Electrical" },
  { slug: "extension-cord-calculator", name: "Extension cord calculator", desc: "AWG gauge for any tool, appliance, or outdoor device", category: "Electrical" },
  { slug: "insulation-calculator", name: "Insulation calculator", desc: "R-value and bags for walls, attic, or floors — climate-matched", category: "Insulation" },
  { slug: "lumber-calculator", name: "Lumber calculator", desc: "Board feet and lineal feet for any framing order", category: "Lumber" },
  { slug: "stair-calculator", name: "Stair calculator", desc: "Rise, run, and stringer length for IRC-compliant stairs", category: "Lumber" },
  { slug: "stud-spacing-calculator", name: "Stud spacing calculator", desc: "Studs with headers, jacks, kings, and cripples for any wall", category: "Lumber" },
  { slug: "window-sizing-calculator", name: "Window sizing calculator", desc: "Egress, natural light, and rough opening dimensions", category: "Lumber" },
  { slug: "shed-calculator", name: "Shed calculator", desc: "Lumber, sheathing, and shingles for any backyard shed", category: "Lumber" },
];

const categoryOrder = [
  "Paint",
  "Masonry",
  "Flooring",
  "Landscaping",
  "Drywall",
  "Roofing",
  "HVAC",
  "Solar",
  "Electrical",
  "Insulation",
  "Lumber",
];

export default function CalculatorsIndexPage() {
  const byCategory = categoryOrder.map((cat) => ({
    category: cat,
    items: liveCalculators.filter((c) => c.category === cat),
  }));

  return (
    <div className="container-content py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
        Index
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        All calculators
      </h1>
      <p className="text-base text-ink-muted mb-10 max-w-prose leading-relaxed">
        Every Tallyard calculator, organized by project type.{" "}
        <span className="accent-italic">
          {liveCalculators.length} tools, all free, no signup required.
        </span>
      </p>

      <div className="space-y-10">
        {byCategory.map(({ category, items }) => (
          <section key={category}>
            <h2 className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
              {category} · {items.length}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
                >
                  <h3 className="text-base font-semibold mb-1">{c.name}</h3>
                  <p className="text-xs text-ink-muted">{c.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
