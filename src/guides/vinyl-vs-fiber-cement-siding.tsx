import type { GuideConfig } from "@/lib/guides-types";
import {
  ComparisonTable,
  Callout,
  CalculatorCTA,
} from "@/components/GuideComponents";
import {
  Figure,
  GuideByline,
  MethodologyNote,
  Scenario,
  GUIDE_SVG,
} from "@/components/GuideChrome";

// ---------------------------------------------------------------------------
// SVG 1 — 30-year TCO side-by-side bar chart
// ---------------------------------------------------------------------------

function TCOBarChartSVG() {
  const base = 250;
  const maxVal = 25000;
  const pxPerDollar = 190 / maxVal;

  const items = [
    {
      label: "Vinyl",
      install: 8800,
      maint: 800,
      total: 9600,
      color: GUIDE_SVG.slate,
    },
    {
      label: "Fiber cement",
      install: 11000,
      maint: 12000,
      total: 23000,
      color: GUIDE_SVG.accent,
    },
  ];

  return (
    <svg viewBox="0 0 680 340" width="100%" height="auto" role="img"
      aria-label="Bar chart showing 30-year total cost of ownership. Vinyl siding totals $9,600. Fiber cement totals $23,000, with $12,000 of that being maintenance and repainting.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        30-year total cost of ownership
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        1,100 sq ft siding job, mid-grade materials, professional install + maintenance
      </text>

      {/* Y axis */}
      {[0, 5000, 10000, 15000, 20000, 25000].map((v) => {
        const y = base - v * pxPerDollar;
        return (
          <g key={v}>
            <text x="52" y={y + 4} textAnchor="end" fontSize="10" fill={GUIDE_SVG.inkFaint}>
              ${(v / 1000).toFixed(0)}k
            </text>
            <line x1="58" y1={y} x2="450" y2={y} stroke={GUIDE_SVG.inkFaint}
              strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
          </g>
        );
      })}
      <line x1="58" y1={base} x2="450" y2={base} stroke={GUIDE_SVG.ink} strokeWidth="1" />

      {/* Stacked bars */}
      {items.map((item, i) => {
        const x = 100 + i * 180;
        const installH = item.install * pxPerDollar;
        const maintH = item.maint * pxPerDollar;
        return (
          <g key={item.label}>
            {/* Install portion */}
            <rect x={x} y={base - installH} width="90" height={installH}
              fill={item.color} opacity="0.85" />
            {/* Maintenance stacked on top */}
            <rect x={x} y={base - installH - maintH} width="90" height={maintH}
              fill={item.color} opacity="0.45" />
            {/* Total label */}
            <text x={x + 45} y={base - installH - maintH - 10} textAnchor="middle"
              fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>
              ${item.total.toLocaleString()}
            </text>
            {/* Name */}
            <text x={x + 45} y={base + 20} textAnchor="middle"
              fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>
              {item.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(480, 100)">
        <rect x="0" y="0" width="12" height="12" fill={GUIDE_SVG.ink} opacity="0.8" />
        <text x="18" y="10" fontSize="11" fill={GUIDE_SVG.ink}>Installation</text>
        <rect x="0" y="22" width="12" height="12" fill={GUIDE_SVG.ink} opacity="0.4" />
        <text x="18" y="32" fontSize="11" fill={GUIDE_SVG.ink}>Maintenance + repaints</text>
      </g>

      {/* Annotation arrow to maintenance portion */}
      <g transform="translate(480, 170)">
        <text x="0" y="0" fontSize="10" fill={GUIDE_SVG.accent} fontWeight="600">
          2 repaints @ $4,500
        </text>
        <text x="0" y="15" fontSize="10" fill={GUIDE_SVG.accent}>
          + caulk refresh × 3
        </text>
        <text x="0" y="30" fontSize="10" fill={GUIDE_SVG.inkFaint}>
          = $12,000 over 30 years
        </text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 2 — Wall cross-section: siding layers
// ---------------------------------------------------------------------------

function WallCrossSectionSVG() {
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img"
      aria-label="Cross-section of a properly sided wall showing five layers: interior drywall, stud framing with insulation, sheathing, weather-resistive barrier, and siding on the exterior.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Siding isn&apos;t the waterproofing. The layers underneath are.
      </text>

      {/* Layer bars — left is interior, right is exterior */}
      {[
        { label: "Drywall", sub: "½\" gypsum", x: 50, w: 30, fill: "#E8E4DC" },
        { label: "Framing", sub: "2×4 or 2×6 stud + insulation", x: 90, w: 80, fill: "#F5E6C8" },
        { label: "Sheathing", sub: "½\" OSB or plywood", x: 180, w: 30, fill: "#D4C6A8" },
        { label: "WRB", sub: "Tyvek / housewrap", x: 220, w: 14, fill: GUIDE_SVG.accentSoft },
        { label: "Air gap", sub: "¼\" rain screen", x: 244, w: 14, fill: "#FFFFFF" },
        { label: "Siding", sub: "Vinyl or fiber cement", x: 268, w: 40, fill: GUIDE_SVG.slateSoft },
      ].map((layer) => (
        <g key={layer.label}>
          <rect x={layer.x} y="60" width={layer.w} height="170" fill={layer.fill}
            stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" />
          {/* Label line */}
          <line x1={layer.x + layer.w / 2} y1="240" x2={layer.x + layer.w / 2} y2="255"
            stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" />
          <text x={layer.x + layer.w / 2} y="268" textAnchor="middle" fontSize="10"
            fontWeight="600" fill={GUIDE_SVG.ink}>
            {layer.label}
          </text>
          <text x={layer.x + layer.w / 2} y="282" textAnchor="middle" fontSize="9"
            fill={GUIDE_SVG.inkFaint}>
            {layer.sub}
          </text>
        </g>
      ))}

      {/* Interior / Exterior labels */}
      <text x="50" y="52" fontSize="10" fontWeight="700" letterSpacing="1.5"
        fill={GUIDE_SVG.inkFaint}>INTERIOR</text>
      <text x="268" y="52" fontSize="10" fontWeight="700" letterSpacing="1.5"
        fill={GUIDE_SVG.inkFaint}>EXTERIOR</text>

      {/* Annotation box */}
      <g transform="translate(370, 80)">
        <rect x="0" y="0" width="280" height="130" rx="8" fill={GUIDE_SVG.bgWarm}
          stroke={GUIDE_SVG.accent} strokeWidth="0.75" />
        <text x="16" y="24" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>
          What actually keeps water out
        </text>
        <text x="16" y="46" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          1. WRB (weather-resistive barrier) sheds
        </text>
        <text x="28" y="60" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          bulk water that gets past siding
        </text>
        <text x="16" y="80" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          2. Head flashing over windows/doors
        </text>
        <text x="28" y="94" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          directs runoff away from openings
        </text>
        <text x="16" y="114" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          3. Siding is the rain screen, not the seal
        </text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 3 — Fire performance comparison
// ---------------------------------------------------------------------------

function FireRatingSVG() {
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img"
      aria-label="Fire rating comparison. Fiber cement has Class 1-A rating, non-combustible. Vinyl has no fire rating and melts at 165°F.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Fire performance
      </text>

      {/* Fiber cement */}
      <rect x="40" y="55" width="280" height="110" rx="8" fill={GUIDE_SVG.accentSoft}
        stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="60" y="82" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>
        FIBER CEMENT
      </text>
      <text x="60" y="105" fontSize="26" fontWeight="700" fill={GUIDE_SVG.ink}>
        Class 1(A)
      </text>
      <text x="60" y="125" fontSize="11" fill={GUIDE_SVG.inkMuted}>
        Highest fire spread rating available
      </text>
      <text x="60" y="148" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        Non-combustible · No toxic fumes · WUI-zone compliant
      </text>

      {/* Vinyl */}
      <rect x="360" y="55" width="280" height="110" rx="8" fill={GUIDE_SVG.slateSoft}
        stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="380" y="82" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>
        VINYL
      </text>
      <text x="380" y="105" fontSize="26" fontWeight="700" fill={GUIDE_SVG.ink}>
        No rating
      </text>
      <text x="380" y="125" fontSize="11" fill={GUIDE_SVG.inkMuted}>
        Melts at 165°F, ignites at higher temps
      </text>
      <text x="380" y="148" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        Does not meet WUI requirements · More fire-resistant than wood
      </text>

      {/* Context */}
      <text x="340" y="200" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}
        fontStyle="italic">
        Fire rating matters in WUI zones (CA, OR, WA, CO) and for insurance discounts (5–15% typical)
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 4 — Lifespan timeline
// ---------------------------------------------------------------------------

function LifespanTimelineSVG() {
  const startX = 60;
  const endX = 640;
  const totalYears = 55;
  const px = (endX - startX) / totalYears;

  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img"
      aria-label="Timeline showing vinyl siding lasting 20-40 years versus fiber cement lasting 50+ years. Fiber cement requires repainting at years 12 and 24.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Expected lifespan
      </text>

      {/* Year axis */}
      <line x1={startX} y1="145" x2={endX} y2="145" stroke={GUIDE_SVG.ink} strokeWidth="1" />
      {[0, 10, 20, 30, 40, 50].map((yr) => (
        <g key={yr}>
          <line x1={startX + yr * px} y1="142" x2={startX + yr * px} y2="148"
            stroke={GUIDE_SVG.ink} strokeWidth="1" />
          <text x={startX + yr * px} y="165" textAnchor="middle" fontSize="10"
            fill={GUIDE_SVG.inkFaint}>{yr} yr</text>
        </g>
      ))}

      {/* Vinyl bar (20-40 range shown as gradient) */}
      <rect x={startX} y="60" width={30 * px} height="24" rx="4"
        fill={GUIDE_SVG.slate} opacity="0.8" />
      <rect x={startX + 30 * px} y="60" width={10 * px} height="24" rx="0"
        fill={GUIDE_SVG.slate} opacity="0.3" />
      <text x={startX + 5} y="76" fontSize="11" fontWeight="600" fill="#FFFFFF">
        Vinyl: 20–40 years
      </text>

      {/* Fiber cement bar */}
      <rect x={startX} y="100" width={50 * px} height="24" rx="4"
        fill={GUIDE_SVG.accent} opacity="0.8" />
      <rect x={startX + 50 * px} y="100" width={5 * px} height="24" rx="0"
        fill={GUIDE_SVG.accent} opacity="0.3" />
      <text x={startX + 5} y="116" fontSize="11" fontWeight="600" fill="#FFFFFF">
        Fiber cement: 50+ years
      </text>

      {/* Repaint markers on fiber cement */}
      {[12, 24, 36, 48].map((yr) => (
        <g key={yr}>
          <line x1={startX + yr * px} y1="96" x2={startX + yr * px} y2="128"
            stroke={GUIDE_SVG.ink} strokeWidth="1.5" strokeDasharray="2,2" />
          <circle cx={startX + yr * px} cy="93" r="3" fill={GUIDE_SVG.ink} />
        </g>
      ))}
      <text x={startX + 12 * px + 4} y="90" fontSize="9" fill={GUIDE_SVG.inkFaint}>
        repaint cycles (~every 12 years)
      </text>

      {/* Vinyl failure modes annotation */}
      <text x={startX + 20 * px} y="55" fontSize="9" fill={GUIDE_SVG.slate} fontStyle="italic">
        UV fading begins
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Body content — three-factor structure (cost, durability, fire)
// ---------------------------------------------------------------------------

function Content() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="James Hardie specs, Vinyl Siding Institute standards, and Angi 2026 cost data"
      />

      <p>
        You need new siding. The old stuff is cracked, faded, or just
        embarrassing, and you&apos;ve narrowed the replacement down to two
        options that account for 70% of residential siding installed in the
        US: vinyl and fiber cement.
      </p>

      <p>
        Every comparison you&apos;ve read so far was either written by a
        vinyl manufacturer, a fiber cement manufacturer, or a lead-generation
        site that wants your zip code. None of them showed you the actual
        30-year cost of living with each material, because that math
        doesn&apos;t favor the narrative anyone is selling.
      </p>

      <p>
        This guide shows the math. Three factors decide this: cost over the
        ownership period, how each material actually holds up, and whether
        fire performance matters where you live. Everything else is noise.
      </p>

      <MethodologyNote>
        <p>
          Installed costs use mid-range 2026 pricing from Angi, HomeGuide,
          and NerdWallet. The 1,100 sq ft siding area reflects a typical
          two-story, 2,000 sq ft home after gables and window/door openings
          are subtracted. Repaint costs for fiber cement use professional
          rates; DIY drops them roughly 60%. Vinyl&apos;s maintenance cost
          covers periodic cleaning and occasional panel replacement after
          hail or impact damage.
        </p>
      </MethodologyNote>

      {/* ============================================================= */}
      {/* FACTOR 1: COST */}
      {/* ============================================================= */}

      <h2>Factor 1: What it actually costs over 30 years</h2>

      <p>
        Installed cost is where most comparisons begin and end. That&apos;s
        a mistake. The gap between vinyl and fiber cement at install is
        $2,000 to $3,000 for a typical job. Significant, but not dramatic.
        The gap over 30 years is $13,400, and nearly all of it comes from
        one thing most people don&apos;t think about when they&apos;re
        standing in a showroom: the repainting cycle.
      </p>

      <Figure
        number={1}
        caption="30-year total cost of ownership for 1,100 sq ft of siding. Fiber cement's maintenance burden — two professional repaints at $4,500 each plus three caulk refreshes at $800 each — drives total cost to 2.4× vinyl's."
      >
        <TCOBarChartSVG />
      </Figure>

      <ComparisonTable
        columns={[
          { title: "Vinyl", subtitle: "Color-through PVC" },
          { title: "Fiber cement", subtitle: "James Hardie or equiv." },
        ]}
        rows={[
          { label: "Material only", values: ["$2–6 / ft²", "$3–8 / ft²"] },
          { label: "Installed", values: ["$3–12 / ft²", "$5–14 / ft²"] },
          { label: "1,100 ft² job", values: ["$8,000–10,000", "$10,000–13,000"] },
          { label: "Repaints (30 yr)", values: ["$0", "$9,000 (2 cycles)"] },
          { label: "Caulk refresh", values: ["$0", "$2,400 (3 cycles)"] },
          { label: "Cleaning + repairs", values: ["$800", "$600"] },
          { label: "30-year total", values: [<strong key="v">$9,600</strong>, <strong key="f">$23,000</strong>] },
        ]}
        caption="Mid-range pricing, professional install and maintenance. Vinyl's maintenance is minimal; fiber cement's is dominated by the 12-year repaint cycle at ~$4,500 per round."
      />

      <p>
        Fiber cement&apos;s paint is the issue. The material underneath is
        nearly indestructible, but the factory finish or field paint on top
        chalks, fades, and peels on a 10-to-15-year cycle. Skip the repaint
        and your fiber cement looks like a house nobody cares about. Stay on
        schedule and you&apos;re writing a $4,500 check every decade or so.
      </p>

      <p>
        Vinyl doesn&apos;t have this problem. The color runs through the
        entire thickness of the panel. Nothing to repaint. Hose it off
        once a year, replace a cracked panel after a bad hailstorm, and
        that&apos;s it.
      </p>

      <Callout label="The hold-period shortcut">
        If you&apos;re selling within 10 years, the repaint cycle probably
        doesn&apos;t hit you at all. Fiber cement&apos;s resale premium
        ($3,000 to $8,000 on mid-to-upper-market homes) often recoups the
        install cost difference. The 30-year math is for people who plan
        to stay.
      </Callout>

      {/* ============================================================= */}
      {/* FACTOR 2: DURABILITY */}
      {/* ============================================================= */}

      <h2>Factor 2: What actually fails, and when</h2>

      <Figure
        number={2}
        caption="Vinyl typically lasts 20-40 years depending on climate and sun exposure. Fiber cement lasts 50+ years, but requires repainting (dots) approximately every 12 years to maintain appearance and coating integrity."
      >
        <LifespanTimelineSVG />
      </Figure>

      <p>
        Vinyl and fiber cement fail in completely different ways, and
        understanding the failure mode matters more than the lifespan number.
      </p>

      <p>
        Vinyl&apos;s problems are mechanical. A baseball thrown hard cracks
        it. A lawnmower kicks a rock and puts a hole in it. Below 20°F it
        gets brittle, and falling branches that would bounce off in August
        shatter panels in January. South-facing walls fade noticeably by
        year 15 in sunny climates. A grill or fire pit within two feet of
        vinyl siding will melt it. These are annoyances, not catastrophes.
        Individual panels are replaceable for $50 to $150 each.
      </p>

      <p>
        Fiber cement&apos;s failure mode is cosmetic, not structural. The
        material itself is sand, cement, and cellulose fiber. It doesn&apos;t
        crack from cold, doesn&apos;t melt from heat, doesn&apos;t dent
        from hail. What fails is the paint. Chalking starts around year 8,
        visible peeling by year 12. The siding is fine underneath. You&apos;re
        paying to maintain the finish, not the product.
      </p>

      <Figure
        number={3}
        caption="A properly installed wall assembly has five layers. The siding — vinyl or fiber cement — is the outermost rain screen. Water management happens at the WRB and flashing layer. A bad WRB install ruins either siding material; a good one makes either last."
      >
        <WallCrossSectionSVG />
      </Figure>

      <p>
        That cross-section is important because it explains something
        most siding salespeople won&apos;t tell you: the siding itself
        isn&apos;t what keeps water out of your walls. The weather-resistive
        barrier (Tyvek, Typar, or similar housewrap) underneath does that.
        The siding is a rain screen that deflects bulk water and protects
        the WRB from UV. Get the WRB and flashing right and either siding
        material will perform. Get them wrong and neither will save you.
      </p>

      <Scenario location="Raleigh, NC (Zone 4)">
        A homeowner replaced 20-year-old vinyl with new vinyl in 2023.
        During tearoff, the crew found extensive water damage behind the
        siding near two windows, both caused by missing head flashing
        during the original install. The vinyl itself was fine. The
        sheathing underneath was rotting. Total repair cost for the
        flashing failures: $4,200, more than the vinyl replacement itself.
        The lesson: the installer matters more than the material.
      </Scenario>

      {/* ============================================================= */}
      {/* FACTOR 3: FIRE */}
      {/* ============================================================= */}

      <h2>Factor 3: Fire performance — when it matters, when it doesn&apos;t</h2>

      <Figure
        number={4}
        caption="Fiber cement carries the highest available fire rating for exterior cladding. Vinyl melts but does not self-sustain a fire. In WUI zones (most of California, parts of Oregon, Washington, and Colorado), fiber cement may be required by code."
      >
        <FireRatingSVG />
      </Figure>

      <p>
        For 85% of American homeowners, fire performance is not going to be
        the deciding factor. If you live in a standard suburban neighborhood
        outside wildfire country, both materials are fine. Vinyl is more
        fire-resistant than wood (the material it usually replaces), and
        residential fires overwhelmingly start inside the house, not
        outside it.
      </p>

      <p>
        For three groups of homeowners, fire performance tips the decision:
      </p>

      <p>
        <strong>WUI zones.</strong> California&apos;s Chapter 7A, Oregon&apos;s
        wildfire building codes, and similar regulations in Colorado, Montana,
        and Washington increasingly require Class A rated exterior cladding
        in Wildland-Urban Interface areas. Fiber cement qualifies. Vinyl
        does not. If you live in a WUI zone, this factor alone may make
        the decision for you. Check with your local building department.
      </p>

      <p>
        <strong>Close-neighbor situations.</strong> If your house wall is
        10 feet or less from a neighboring structure, a fire at the neighbor&apos;s
        can generate enough radiant heat to melt vinyl before fire trucks
        arrive. Fiber cement provides a real buffer in dense housing.
      </p>

      <p>
        <strong>Insurance discounts.</strong> Some carriers offer 5 to 15%
        premium reductions for homes with Class A exterior cladding. Over 20
        years on a $2,400/year homeowner&apos;s policy, even a 5% discount
        ($120/year) compounds to $2,400 — enough to offset a meaningful
        portion of fiber cement&apos;s install premium. Call your insurer and
        ask for a quote with and without. It takes five minutes.
      </p>

      <CalculatorCTA
        name="Siding calculator"
        slug="siding-calculator"
        description="Get squares and linear feet for your house. Accounts for gables, openings, and material-specific waste factors."
      />

      {/* ============================================================= */}
      {/* THE DECISION */}
      {/* ============================================================= */}

      <h2>Making the call</h2>

      <p>
        There is no universally correct answer. Here are the situations
        where each material wins clearly:
      </p>

      <p>
        <strong>Vinyl</strong> is the right pick when your budget is under
        $10,000, you plan to sell within 10 years, you want zero ongoing
        maintenance, your house is a simple rectangle without complex trim
        details, or you&apos;re siding a rental property where appearance
        matters less than durability per dollar. Vinyl dominates the
        residential market for good reason. It is not a cheap or
        embarrassing choice.
      </p>

      <p>
        <strong>Fiber cement</strong> is worth the premium when you live in
        a WUI zone (non-negotiable), you&apos;ll own the house 20+ years
        and want the material to outlast you, you&apos;re on a premium
        home ($500K+) where buyer expectations default to fiber cement, you
        want a painted-wood look without wood&apos;s rot problems, or your
        insurance discount is large enough to offset the cost difference
        within 5 to 8 years.
      </p>

      <p>
        <strong>The middle option nobody mentions:</strong> insulated vinyl.
        Standard vinyl fused to a foam backer, adding R-2 to R-3 of
        continuous insulation and a sturdier feel. It costs $1 to $3 more
        per square foot than standard vinyl and closes the aesthetic gap
        with fiber cement without the repaint cycle. Worth pricing out if
        you want vinyl economics with a more substantial look.
      </p>

      <h2>What matters more than the material</h2>

      <p>
        A great installer doing vinyl will outperform a mediocre installer
        doing fiber cement. Every time. The four things to verify with any
        siding contractor regardless of material:
      </p>

      <ol>
        <li>
          <strong>House wrap installed correctly.</strong> Tyvek or
          equivalent WRB, lapped shingle-style from bottom to top, taped
          seams, integrated with window and door flashing. If the
          installer suggests skipping this, find another installer.
        </li>
        <li>
          <strong>Head flashing over every opening.</strong> Every window
          and door needs head flashing that integrates with the WRB.
          Every roof-to-wall junction needs kickout flashing. This is
          invisible once siding goes up and causes 80% of siding-related
          water damage when done wrong.
        </li>
        <li>
          <strong>Correct fastening.</strong> Vinyl nails should not be
          driven tight (expansion gaps are required). Fiber cement needs
          corrosion-resistant fasteners at manufacturer-specified spacing.
          Both are easy to get wrong and hard to detect until something
          buckles or cracks 5 years later.
        </li>
        <li>
          <strong>Ask for references on the specific material.</strong> An
          installer experienced with vinyl may not be experienced with
          fiber cement. Fiber cement is heavier (300 lb per 100 ft² vs
          60 lb for vinyl), harder to cut, and less forgiving. Ask how
          many fiber cement jobs they&apos;ve completed in the last year.
        </li>
      </ol>

      <p>
        Run the material quantities through the{" "}
        <a href="/siding-calculator">Tallyard siding calculator</a> before
        requesting bids. Knowing your actual square footage keeps
        contractors honest and lets you compare bids on an apples-to-apples
        per-square-foot basis.
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const vinylVsFiberCementGuide: GuideConfig = {
  slug: "vinyl-vs-fiber-cement-siding",
  title: "Vinyl vs fiber cement siding: the real 30-year cost",
  description:
    "Honest comparison of vinyl and fiber cement siding with 30-year TCO math, fire performance data, and installation guidance. No lead forms.",
  bannerHeadline: "Vinyl vs fiber cement siding.",
  bannerTags: ["30-year TCO", "Fire ratings", "Wall cross-section"],
  categoryLabel: "Roofing",
  category: "roofing",
  heroValue: "30-YEAR TCO",
  publishedAt: "2026-04-18",
  readTime: "11 min read",
  Content,
  faq: [
    {
      question: "Is fiber cement really twice as expensive as vinyl over 30 years?",
      answer:
        "At mid-range pricing with professional maintenance, yes. Fiber cement's 30-year TCO is approximately $23,000 vs vinyl's $9,600 for an 1,100 sq ft job. The gap is driven almost entirely by the repainting cycle ($4,500 per round, twice over 30 years) and caulk refreshes. If you DIY the repainting, the gap narrows to roughly 1.6×. If you sell within 10 years, the repaint cycle may not hit you at all.",
    },
    {
      question: "Does fiber cement add more resale value than vinyl?",
      answer:
        "On mid-to-upper-market homes ($500K+), fiber cement adds roughly $3,000 to $8,000 of resale premium. On entry-level and mid-market homes ($200K-$400K), the premium is smaller and may not offset the installation cost difference. On rental properties, the two appraise similarly.",
    },
    {
      question: "Can I paint vinyl siding?",
      answer:
        "Technically yes, but it voids most warranties and the paint fails faster than on fiber cement because vinyl expands and contracts with temperature. If you want a painted-look exterior, fiber cement is designed for it. Vinyl's strength is color-through: no painting required, ever.",
    },
    {
      question: "What about LP SmartSide (engineered wood)?",
      answer:
        "Engineered wood sits between vinyl and fiber cement on price ($5-10/ft² installed) and lifespan (25-40 years). It looks like real wood, is lighter than fiber cement, but still requires painting every 7-10 years. It's a reasonable middle option, especially for DIY-friendly installations.",
    },
    {
      question: "Does my area require Class A fire-rated siding?",
      answer:
        "Wildland-Urban Interface (WUI) zones in California, Oregon, Washington, Colorado, Montana, and parts of the Southwest increasingly require it. Call your local building department to check. Even outside WUI zones, some HOAs and insurance companies require or incentivize Class A cladding.",
    },
    {
      question: "Will my insurance drop if I switch to fiber cement?",
      answer:
        "Many major insurers offer 5-15% premium discounts for Class A exterior cladding, particularly in fire-prone regions. On a $2,400/year policy, even 5% saves $120/year, compounding to $2,400 over 20 years. Ask your agent to quote both scenarios before committing.",
    },
    {
      question: "Can I install fiber cement myself?",
      answer:
        "It's significantly harder than vinyl. Fiber cement weighs 300 lb per 100 sq ft (vs 60 lb for vinyl), requires carbide-tipped cutting tools, produces silica dust requiring respiratory protection, and has tighter installation tolerances. Most DIYers handle vinyl comfortably but hire professionals for fiber cement.",
    },
    {
      question: "What's more important: the siding material or the installer?",
      answer:
        "The installer. A properly installed vinyl job with correct WRB, flashing, and fastening will outperform a poorly installed fiber cement job. Water damage from flashing failures causes more siding-related repair costs than material failures. Vet the installer's recent work before choosing the material.",
    },
  ],
  sources: [
    {
      name: "James Hardie — Product Performance Specifications",
      url: "https://www.jameshardie.com/",
      note: "Manufacturer reference for fiber cement fire rating, lifespan, and paint warranty terms",
    },
    {
      name: "Vinyl Siding Institute — ASTM D3679 Certification",
      url: "https://www.vinylsiding.org/",
      note: "Industry certification program and performance standards for vinyl siding",
    },
    {
      name: "Angi — 2026 Siding Cost Data",
      url: "https://www.angi.com/articles/fiber-cement-siding-vs-vinyl-siding.htm",
      note: "Current installed cost ranges and project pricing data",
    },
    {
      name: "ICC — International WUI Code",
      url: "https://codes.iccsafe.org/",
      note: "Wildland-Urban Interface code requirements for fire-rated exterior cladding",
    },
    {
      name: "California Chapter 7A — Exterior Wildfire Standards",
      note: "State-specific fire-resistive construction requirements for WUI zones",
    },
  ],
  relatedCalculators: [
    { name: "Siding calculator", slug: "siding-calculator", description: "Squares and linear feet for any house exterior" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value for walls — critical for whole-wall performance" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons for the fiber cement repaint cycle" },
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Always pair new siding with drainage review" },
  ],
  relatedGuides: [
    { name: "Heat pump vs furnace + AC", slug: "heat-pump-vs-furnace", description: "Climate-zone cost comparison for HVAC replacement" },
    { name: "Composite vs PT vs cedar decking", slug: "composite-vs-pressure-treated-vs-cedar-deck", description: "20-year cost breakdown for decking materials" },
  ],
};
