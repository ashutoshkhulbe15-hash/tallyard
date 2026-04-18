import Link from "next/link";

const calcColumns = [
  {
    heading: "Paint + walls",
    links: [
      { name: "Paint", slug: "paint-calculator" },
      { name: "Wallpaper", slug: "wallpaper-calculator" },
      { name: "Drywall", slug: "drywall-calculator" },
    ],
  },
  {
    heading: "Masonry",
    links: [
      { name: "Concrete", slug: "concrete-calculator" },
      { name: "Brick", slug: "brick-calculator" },
      { name: "Rebar", slug: "rebar-calculator" },
      { name: "Asphalt", slug: "asphalt-calculator" },
      { name: "Chimney", slug: "chimney-calculator" },
    ],
  },
  {
    heading: "Flooring + kitchen",
    links: [
      { name: "Tile", slug: "tile-calculator" },
      { name: "Flooring", slug: "flooring-calculator" },
      { name: "Grout", slug: "grout-calculator" },
      { name: "Backsplash", slug: "backsplash-calculator" },
      { name: "Countertop", slug: "countertop-calculator" },
      { name: "Kitchen cabinets", slug: "kitchen-cabinet-calculator" },
      { name: "Shower tile", slug: "shower-tile-calculator" },
      { name: "Vanity", slug: "vanity-calculator" },
    ],
  },
  {
    heading: "Landscaping",
    links: [
      { name: "Deck", slug: "deck-calculator" },
      { name: "Fence", slug: "fence-calculator" },
      { name: "Paver", slug: "paver-calculator" },
      { name: "Mulch", slug: "mulch-calculator" },
      { name: "Gravel", slug: "gravel-calculator" },
      { name: "Topsoil", slug: "topsoil-calculator" },
      { name: "Sod", slug: "sod-calculator" },
      { name: "Pool chlorine", slug: "pool-chlorine-calculator" },
      { name: "Rainwater", slug: "rainwater-calculator" },
    ],
  },
  {
    heading: "Roofing + exterior",
    links: [
      { name: "Roofing", slug: "roofing-calculator" },
      { name: "Siding", slug: "siding-calculator" },
      { name: "Gutter", slug: "gutter-calculator" },
      { name: "Attic ventilation", slug: "attic-ventilation-calculator" },
      { name: "Snow load", slug: "snow-load-calculator" },
      { name: "Garage door", slug: "garage-door-calculator" },
    ],
  },
  {
    heading: "HVAC + plumbing",
    links: [
      { name: "Heat pump", slug: "heat-pump-calculator" },
      { name: "BTU", slug: "btu-calculator" },
      { name: "Water heater", slug: "water-heater-calculator" },
      { name: "Drain pipe", slug: "drain-pipe-calculator" },
    ],
  },
  {
    heading: "Electrical + solar",
    links: [
      { name: "Solar", slug: "solar-calculator" },
      { name: "Wire size", slug: "wire-size-calculator" },
      { name: "Extension cord", slug: "extension-cord-calculator" },
    ],
  },
  {
    heading: "Lumber + framing",
    links: [
      { name: "Lumber", slug: "lumber-calculator" },
      { name: "Stair", slug: "stair-calculator" },
      { name: "Stud spacing", slug: "stud-spacing-calculator" },
      { name: "Window sizing", slug: "window-sizing-calculator" },
      { name: "Shed", slug: "shed-calculator" },
      { name: "Insulation", slug: "insulation-calculator" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-walnut mt-24">
      <div className="container-wide pt-14 pb-8">
        {/* Top: brand + tagline */}
        <div className="pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-lg font-bold tracking-tighter text-white mb-3"
            aria-label="Tallyard home"
          >
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: "#D4691C" }}
              aria-hidden="true"
            />
            Tallyard
          </Link>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Free, transparent calculators and buying guides for home
            improvement. Every formula public, every source cited.
          </p>
        </div>

        {/* Calculator categories grid */}
        <div
          className="py-10 border-b grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-8"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {calcColumns.map((col) => (
            <div key={col.heading}>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/${link.slug}`}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Guides + pages row */}
        <div
          className="py-8 border-b grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Guides
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/guides/vinyl-vs-fiber-cement-siding"
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Vinyl vs fiber cement siding
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/composite-vs-pressure-treated-vs-cedar-deck"
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Composite vs PT vs cedar decking
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/heat-pump-vs-furnace"
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Heat pump vs furnace + AC
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Learn
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/guides" className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  All guides
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  About Tallyard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Company
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/contact" className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Tallyard · All formulas public and cited
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Built by{" "}
            <Link href="/about" style={{ color: "rgba(255,255,255,0.35)" }}>
              Ash K.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
