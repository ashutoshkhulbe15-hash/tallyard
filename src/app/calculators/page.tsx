import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All 44 calculators — free home improvement tools",
  description:
    "Browse 44 free calculators for home improvement: paint, concrete, roofing, HVAC, landscaping, electrical, and more. Every formula public, no signup required.",
  alternates: { canonical: "/calculators" },
};

const sections = [
  {
    category: "Paint + walls",
    desc: "Surface coverage calculators for interior and exterior painting, wallpaper, and drywall.",
    items: [
      { slug: "paint-calculator", name: "Paint", desc: "Gallons by room size, door and window subtraction" },
      { slug: "wallpaper-calculator", name: "Wallpaper", desc: "Rolls with pattern repeat and opening subtractions" },
      { slug: "drywall-calculator", name: "Drywall", desc: "Sheets for walls and ceilings with waste factor" },
    ],
  },
  {
    category: "Masonry",
    desc: "Volume and unit calculators for concrete, brick, rebar, asphalt, and chimney construction.",
    items: [
      { slug: "concrete-calculator", name: "Concrete", desc: "Cubic yards for slabs, footings, and round pours" },
      { slug: "mortar-calculator", name: "Mortar", desc: "Bags of mortar mix for brick, block, and stone walls" },
      { slug: "asphalt-calculator", name: "Asphalt", desc: "Tons for driveways, lots, and paving" },
      { slug: "rebar-calculator", name: "Rebar", desc: "Lineal feet and 20-ft sticks for slab grids" },
      { slug: "brick-calculator", name: "Brick", desc: "Bricks and mortar bags by size and joint width" },
      { slug: "chimney-calculator", name: "Chimney", desc: "Flue size for fireplaces and stoves (1/10 rule)" },
    ],
  },
  {
    category: "Flooring + kitchen",
    desc: "Material calculators for tile, hardwood, laminate, countertops, cabinets, and bathroom fixtures.",
    items: [
      { slug: "tile-calculator", name: "Tile", desc: "Tiles and boxes with waste and cut allowances" },
      { slug: "grout-calculator", name: "Grout", desc: "Pounds by tile size, joint width, and thickness" },
      { slug: "flooring-calculator", name: "Flooring", desc: "Boxes of hardwood, laminate, or vinyl plank" },
      { slug: "shower-tile-calculator", name: "Shower tile", desc: "Three walls, floor, and optional niche" },
      { slug: "backsplash-calculator", name: "Backsplash", desc: "Kitchen tile with outlet and window subtractions" },
      { slug: "vanity-calculator", name: "Vanity", desc: "Right size with clearances, single or double sink" },
      { slug: "countertop-calculator", name: "Countertop", desc: "Square feet with island and cost estimate" },
      { slug: "kitchen-cabinet-calculator", name: "Kitchen cabinets", desc: "Linear feet by layout and cabinet grade" },
    ],
  },
  {
    category: "Landscaping",
    desc: "Outdoor project calculators for decks, fences, patios, gardens, and water features.",
    items: [
      { slug: "mulch-calculator", name: "Mulch", desc: "Cubic yards or bag count for any bed depth" },
      { slug: "gravel-calculator", name: "Gravel", desc: "Cubic yards and tons for driveways and base layers" },
      { slug: "fence-calculator", name: "Fence", desc: "Posts, rails, pickets, and concrete" },
      { slug: "paver-calculator", name: "Paver", desc: "Pavers, base gravel, and bedding sand" },
      { slug: "deck-calculator", name: "Deck", desc: "Boards, joists, beams, and fasteners" },
      { slug: "topsoil-calculator", name: "Topsoil", desc: "Cubic yards or bags for garden beds and lawns" },
      { slug: "sod-calculator", name: "Sod", desc: "Slabs, rolls, and pallets for any lawn area" },
      { slug: "pool-chlorine-calculator", name: "Pool chlorine", desc: "Dose for any pool volume and chemical type" },
      { slug: "rainwater-calculator", name: "Rainwater", desc: "Gallons collected from your roof area" },
    ],
  },
  {
    category: "Roofing + exterior",
    desc: "Calculators for shingles, siding, gutters, ventilation, snow load, and garage doors.",
    items: [
      { slug: "roofing-calculator", name: "Roofing", desc: "Bundles and squares for any pitch and footprint" },
      { slug: "siding-calculator", name: "Siding", desc: "Squares and linear feet for any house exterior" },
      { slug: "gutter-calculator", name: "Gutter", desc: "Linear feet, downspouts, and hangers" },
      { slug: "attic-ventilation-calculator", name: "Attic ventilation", desc: "NFVA intake and exhaust (1:300 rule)" },
      { slug: "snow-load-calculator", name: "Snow load", desc: "Roof load in psf vs design capacity" },
      { slug: "garage-door-calculator", name: "Garage door", desc: "Size, headroom, and opener HP" },
    ],
  },
  {
    category: "HVAC + plumbing",
    desc: "Sizing calculators for heating, cooling, water heating, and drain pipe systems.",
    items: [
      { slug: "btu-calculator", name: "BTU", desc: "AC size adjusted for climate, sun, and occupancy" },
      { slug: "heat-pump-calculator", name: "Heat pump", desc: "Tonnage for heating and cooling by climate zone" },
      { slug: "water-heater-calculator", name: "Water heater", desc: "Tank gallons or tankless GPM" },
      { slug: "drain-pipe-calculator", name: "Drain pipe", desc: "Pipe size by DFU loading (IPC/UPC)" },
    ],
  },
  {
    category: "Electrical + solar",
    desc: "Wire sizing, panel sizing, and cord selection for residential electrical projects.",
    items: [
      { slug: "solar-calculator", name: "Solar", desc: "System size and panel count from electricity use" },
      { slug: "wire-size-calculator", name: "Wire size", desc: "AWG gauge with voltage drop and distance" },
      { slug: "extension-cord-calculator", name: "Extension cord", desc: "AWG for any tool, appliance, or outdoor device" },
    ],
  },
  {
    category: "Lumber + framing",
    desc: "Structural calculators for framing, stairs, studs, windows, and outbuildings.",
    items: [
      { slug: "insulation-calculator", name: "Insulation", desc: "R-value and bags for walls, attic, or floors" },
      { slug: "lumber-calculator", name: "Lumber", desc: "Board feet and lineal feet for framing orders" },
      { slug: "stair-calculator", name: "Stair", desc: "Rise, run, and stringer for IRC-compliant stairs" },
      { slug: "stud-spacing-calculator", name: "Stud spacing", desc: "Studs with headers, jacks, kings, and cripples" },
      { slug: "window-sizing-calculator", name: "Window sizing", desc: "Egress, natural light, and rough opening" },
      { slug: "shed-calculator", name: "Shed", desc: "Lumber, sheathing, and shingles for any backyard shed" },
    ],
  },
];

const categoryLinks: Record<string, string> = {
  "Paint + walls": "/calculators/paint-walls",
  "Masonry": "/calculators/masonry",
  "Flooring + kitchen": "/calculators/flooring-kitchen",
  "Landscaping": "/calculators/landscaping",
  "Roofing + exterior": "/calculators/roofing-exterior",
  "HVAC + plumbing": "/calculators/hvac-plumbing",
  "Electrical + solar": "/calculators/electrical-solar",
  "Lumber + framing": "/calculators/lumber-framing",
};

export default function CalculatorsIndexPage() {
  const totalCount = sections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <>
      {/* Hero banner */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-12">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            All tools
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            {totalCount} calculators, all{" "}
            <span className="accent-italic">free</span>
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Every tool shows its formula, cites its sources, and gives you
            a number you can verify. Organized by project type below.
          </p>
        </div>
      </section>

      {/* Intro prose */}
      <section className="container-content py-8">
        <div className="guide-prose">
          <p>Tallyard calculators cover every measurable step in a home improvement project. Need paint gallons for a bedroom? Concrete yards for a driveway? Rebar sticks for a slab grid? Each calculator shows the formula it uses, the sources behind the numbers, and an exact result you can hand to a contractor or carry to the supply yard. No signup, no email, no affiliate links.</p>
          <p>The tools are organized into eight categories by project type. Each category has a <strong>full guide page</strong> that explains how the calculators in that group work together, what codes apply, and how to sequence a project that uses multiple tools.</p>
        </div>
      </section>

      {/* Quick jump nav */}
      <section className="container-wide py-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.category}
              href={`#${s.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="text-xs font-semibold px-3 py-1.5 bg-surface border border-line rounded-full text-ink-muted hover:border-accent hover:text-accent transition-colors"
            >
              {s.category}
              <span className="ml-1.5 text-ink-faint">{s.items.length}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Category sections */}
      <section className="container-wide pb-10">
        <div className="space-y-12">
          {sections.map((section) => {
            const anchor = section.category
              .toLowerCase()
              .replace(/[^a-z]+/g, "-");
            const guideHref = categoryLinks[section.category];
            return (
              <div key={section.category} id={anchor}>
                <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="text-xl font-bold tracking-tight text-ink">
                    {section.category}
                    <span className="text-sm font-normal text-ink-faint ml-2">
                      {section.items.length}
                    </span>
                  </h2>
                  {guideHref && (
                    <Link
                      href={guideHref}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      Full category guide →
                    </Link>
                  )}
                </div>
                <p className="text-sm text-ink-muted mb-4">{section.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {section.items.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/${calc.slug}`}
                      className="block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
                    >
                      <h3 className="text-base font-semibold mb-1">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-ink-muted">{calc.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cost guides section */}
      <section className="container-content pb-10">
        <div className="guide-prose">
          <h2>Cost guides</h2>
          <p>How much does a project actually cost? These standalone cost guides break down material + labor pricing by project type, with DIY vs professional comparisons, regional multipliers, and real contractor scenarios.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[
            { slug: "cost-to-build-a-deck", name: "Cost to build a deck" },
            { slug: "cost-to-replace-a-roof", name: "Cost to replace a roof" },
            { slug: "cost-to-build-a-fence", name: "Cost to build a fence" },
            { slug: "cost-to-paint-a-house", name: "Cost to paint a house" },
            { slug: "cost-to-install-flooring", name: "Cost to install flooring" },
            { slug: "cost-to-remodel-a-bathroom", name: "Cost to remodel a bathroom" },
            { slug: "cost-to-pour-concrete", name: "Cost to pour concrete" },
            { slug: "cost-to-install-siding", name: "Cost to install siding" },
            { slug: "cost-to-install-solar", name: "Cost to install solar" },
            { slug: "cost-to-replace-hvac", name: "Cost to replace HVAC" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block p-4 bg-surface border border-line rounded-lg hover:border-accent transition-colors text-sm font-semibold text-ink hover:text-accent"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-content pb-16">
        <div className="guide-prose">
          <h2>Frequently asked questions</h2>
          <h3>Are the calculators free?</h3>
          <p>Yes. Every calculator on Tallyard is free, with no signup, no email capture, and no usage limits. The formulas are published on each calculator page so you can verify the math independently.</p>
          <h3>Where do the formulas come from?</h3>
          <p>Each calculator cites its sources in a methodology section. Sources include the International Residential Code (IRC), ASHRAE standards, manufacturer product specifications (Trex, GAF, Owens Corning, etc.), and industry associations (NWFA, TCNA, ACI, ACCA). See our <Link href="/methodology" className="text-accent hover:underline">methodology page</Link> for the full approach.</p>
          <h3>How accurate are the estimates?</h3>
          <p>The material quantity estimates are within 5 to 10 percent for standard residential projects. Cost estimates use 2026 national averages and should be treated as ballparks. Actual costs vary by region, contractor, and site conditions. Always get multiple bids for professional work.</p>
          <h3>Can I save my calculation?</h3>
          <p>Yes. Every calculator has a &quot;Copy link&quot; button that creates a URL with your inputs encoded. Share it, bookmark it, or paste it into an email to your contractor.</p>
        </div>
      </section>
    </>
  );
}
