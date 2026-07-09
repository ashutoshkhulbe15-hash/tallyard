import { Figure, GuideByline, Scenario } from "@/components/GuideChrome";
import { GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

/**
 * Gutter system cross-section. The linkable hero asset: every part the
 * calculator counts, shown assembled at the roof edge. All labels sit in
 * clear space on the right so nothing overlaps the drawing.
 */
function GutterSystemSVG() {
  return (
    <svg
      viewBox="0 0 680 430"
      width="100%"
      height="auto"
      role="img"
      aria-label="Cross-section of a gutter system on a roof edge showing shingles, drip edge, fascia board, gutter with hanger, outlet, downspout with upper and lower elbows, and the discharge extension away from the foundation."
    >
      <defs>
        <linearGradient id="gutterfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7F3EC" />
          <stop offset="1" stopColor="#C7E5D3" />
        </linearGradient>
      </defs>
      <text x="20" y="26" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>
        How a gutter system assembles at the roof edge
      </text>

      {/* roof */}
      <polygon points="150,160 430,80 430,108 180,182" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1.5" />
      <line x1="200" y1="162" x2="430" y2="94" stroke={GUIDE_SVG.slate} strokeWidth="0.8" opacity="0.6" />
      <line x1="240" y1="170" x2="430" y2="100" stroke={GUIDE_SVG.slate} strokeWidth="0.8" opacity="0.6" />
      <text x="310" y="120" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.inkMuted} transform="rotate(-15 310 120)">
        roof / shingles
      </text>

      {/* fascia */}
      <rect x="168" y="172" width="14" height="66" fill={GUIDE_SVG.warm} opacity="0.35" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      {/* drip edge */}
      <path d="M 152,160 L 182,178 L 182,186" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="2" />

      {/* gutter */}
      <path d="M 134,188 L 134,218 Q 134,230 146,230 L 180,230 L 180,188 Z" fill="url(#gutterfill)" stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <path d="M 137,214 L 137,217 Q 137,226 146,226 L 177,226 L 177,214 Z" fill={GUIDE_SVG.cool} opacity="0.4" />

      {/* hanger */}
      <line x1="180" y1="195" x2="140" y2="195" stroke={GUIDE_SVG.ink} strokeWidth="2.5" />
      <circle cx="178" cy="195" r="2.5" fill={GUIDE_SVG.ink} />

      {/* outlet + downspout */}
      <rect x="142" y="230" width="26" height="14" fill={GUIDE_SVG.accent} opacity="0.5" />
      <path d="M 146,244 L 146,258 L 190,258 L 190,244" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <rect x="186" y="256" width="12" height="118" fill="url(#gutterfill)" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      {/* wall */}
      <rect x="198" y="185" width="8" height="205" fill={GUIDE_SVG.warm} opacity="0.15" />
      <line x1="206" y1="185" x2="206" y2="390" stroke={GUIDE_SVG.slate} strokeWidth="1" />
      {/* lower elbow + extension */}
      <path d="M 192,374 L 192,390 L 250,390" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      {/* ground */}
      <rect x="120" y="398" width="540" height="12" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <path d="M 255,390 l 14,0 l -4,-4 m 4,4 l -4,4" fill="none" stroke={GUIDE_SVG.cool} strokeWidth="2" />
      <text x="275" y="394" fontSize="9" fontFamily="monospace" fill={GUIDE_SVG.cool}>
        away from foundation (4-6 ft)
      </text>

      {/* labels on the right */}
      <g fontFamily="monospace" fontSize="10.5" fill={GUIDE_SVG.ink}>
        <line x1="380" y1="92" x2="500" y2="78" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="81">roof drains into gutter</text>
        <line x1="178" y1="176" x2="500" y2="150" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="153">fascia board</text>
        <line x1="176" y1="182" x2="500" y2="180" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="183">drip edge</text>
        <line x1="175" y1="195" x2="500" y2="210" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="213">hanger (24-32&quot; OC)</text>
        <line x1="178" y1="208" x2="500" y2="240" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="243">gutter (5&quot; or 6&quot;)</text>
        <line x1="168" y1="237" x2="500" y2="270" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="273">outlet + end cap</text>
        <line x1="192" y1="252" x2="500" y2="300" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="303">upper elbow</text>
        <line x1="198" y1="320" x2="500" y2="330" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="333">downspout (1 per 40 ft)</text>
        <line x1="195" y1="384" x2="500" y2="362" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="365">lower elbow</text>
      </g>
    </svg>
  );
}

export function GutterCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 20, 2026"
        reviewedAgainst="SMACNA Architectural Sheet Metal Manual (gutter sizing tables), IRC 2021 roof drainage provisions, aluminum coil manufacturer specs"
      />

      <h2>Gutters are sized to your roof, not your house</h2>
      <p>
        Here is the thing most people get backward. The size of gutter you need
        has almost nothing to do with how big your house is. It comes down to how
        much roof drains into each run of gutter, how steep that roof is, and how
        hard it rains where you live. A small house with a steep roof in Florida
        can need bigger gutters than a sprawling ranch with a low roof in Oregon.
        Water does not care about your square footage. It cares about how fast it
        arrives.
      </p>
      <p>
        A gutter system is simple once you see it laid out. Rain runs off the
        roof, hits the drip edge, and drops into the gutter hung off the fascia
        board. The gutter slopes gently toward an outlet, the outlet feeds a
        downspout, and the downspout carries the water down the wall and away
        from the foundation. The calculator up top sizes every piece of that from
        your roof numbers. The diagram below shows how it all fits together.
      </p>

      <Figure
        number={1}
        caption="The whole system, from the roof edge to the ground. The calculator counts every part shown here: gutter length, downspouts, hangers, elbows, outlets, and end caps."
      >
        <GutterSystemSVG />
      </Figure>

      <h2>How to measure your gutters</h2>
      <p>
        Start with a tape measure and the eaves. Gutters run along the eaves, the
        low horizontal edges of the roof where the water sheets off. They do not
        run up the gable ends, the sloped edges. So the linear feet of gutter you
        need is the total length of all the eaves you want to protect, not the
        perimeter of the whole house.
      </p>
      <p>
        For a plain rectangular house, that is usually the two long sides. A 30 by
        40 foot ranch with gutters on both long eaves needs about 80 feet of
        gutter. Put gutters on all four sides and it is closer to 140. Measure
        each eave at ground level along the wall below it, since the gutter length
        matches the wall length underneath. Add it all up and that is your gutter
        run. The calculator turns that number into hangers, end caps, and outlets
        automatically.
      </p>
      <p>
        The other number you need is roof area, and specifically the area that
        drains into your longest single run of gutter. That is what sizes the
        gutter itself. A gutter is only as good as its ability to carry away the
        water from the worst section, so the calculator sizes to the busiest run,
        not the average.
      </p>

      <h2>Five inch or six inch: what size gutter you need</h2>
      <p>
        Almost every house in America runs 5-inch K-style gutters. They are the
        default at every home center, they handle the great majority of
        residential roofs, and they are what a contractor hangs unless something
        about your roof says otherwise. The question is really just: does your
        roof push enough water to need the bigger 6-inch size?
      </p>

      <Callout label="The quick rule vs the precise one">
        Quick rule: a single run draining more than about 2,500 square feet of
        roof, or a steep roof, or a high-rainfall region, points to 6-inch. The
        precise version, which is what the calculator runs: it takes your roof
        area, multiplies by a pitch factor and by your regional rainfall rate to
        get an effective drainage area, and switches to 6-inch when that number
        clears roughly 5,500 square feet. The two agree. The quick rule is just
        the precise one with the pitch and rainfall math already folded in for a
        typical case.
      </Callout>

      <p>
        Why the two multipliers matter: a steep roof throws water into the gutter
        faster than a shallow one, so the gutter has to move it faster, which is
        the same as needing more capacity. And rain intensity is regional. The Gulf
        Coast and Florida see cloudbursts that drop 9 inches an hour in the worst
        five minutes of a storm, while the Pacific Northwest rains constantly but
        gently and rarely tops 5 inches an hour. Same roof, different gutter, purely
        because of the sky above it. When you are on the line between sizes, go
        bigger. Six-inch gutters cost only a little more per foot and the extra
        capacity is cheap insurance against the one storm a year that overwhelms an
        undersized run.
      </p>

      <h2>Slope: the part everyone forgets</h2>
      <p>
        A gutter is not level. If you hang it dead flat it will hold standing
        water, breed mosquitoes, sag under the weight, and eventually pull off the
        fascia. Gutters need a slope, sometimes called the fall, that tips them
        toward the downspout so water actually moves. The standard is about a
        quarter inch of drop for every 10 feet of run.
      </p>
      <p>
        That is subtle enough that you cannot eyeball it, but it adds up. On a
        40-foot run, a quarter inch per 10 feet means the downspout end sits a full
        inch lower than the far end. Chalk a line from your high point down to the
        outlet before you hang a single bracket, because fixing the slope after the
        gutter is up means taking the whole run back down. On a very long eave,
        contractors often slope from a high point in the middle down to a downspout
        at each end, so no single stretch has to fall too far and drop the gutter
        awkwardly below the roofline.
      </p>

      <Scenario location="40-foot eave, single downspout at one end">
        Total run: 40 feet. Target slope: a quarter inch per 10 feet. Total fall
        from the high end to the outlet: 40 divided by 10, times a quarter inch,
        which is 1 inch. So you snap a chalk line that starts at the top of the
        fascia at the far end and drops exactly 1 inch by the time it reaches the
        downspout end. Hang every hanger to that line. If the eave were 60 feet
        with a downspout at each end, each half is 30 feet and falls three quarters
        of an inch from a high point in the middle, which keeps the gutter tighter
        to the roofline and looks better from the street.
      </Scenario>

      <h2>Downspouts: how many, and where they go</h2>
      <p>
        Downspouts are the limiting part of the whole system. You can hang perfect
        gutters at a perfect slope and still get water pouring over the front edge
        in a hard rain if you did not give it enough places to drain. The baseline
        rule is one downspout for every 40 feet of gutter run, and more if the roof
        area feeding that run is large. A 120-foot run of gutter needs three
        downspouts minimum, and often four.
      </p>
      <p>
        Placement matters as much as count. Downspouts go at the low ends of each
        sloped run, which is where the water is heading anyway. Then the discharge
        has to go somewhere sensible. Never aim a downspout at the foundation, at a
        walkway that sends the water back toward the house, or onto a neighbor's
        property. Get it 4 to 6 feet away from the foundation with an extension or
        a buried drain line. A downspout dumping against the foundation is one of
        the most common causes of a wet basement, and it is entirely avoidable.
      </p>

      <h2>Hangers, and why spacing is not optional</h2>
      <p>
        Hangers are the brackets that hold the gutter to the fascia. Space them 24
        to 32 inches apart in most of the country. The calculator uses 32-inch
        spacing, which is standard for climates that do not get heavy snow. If you
        live where snow piles up on the roof and slides into the gutter, tighten
        that to 16 to 20 inches. A gutter full of wet snow and ice is astonishingly
        heavy, and widely-spaced hangers are exactly how a gutter ends up hanging
        off the house by one bracket in February. Hangers cost a few dollars each,
        so tighter spacing adds almost nothing to the bill and saves you a spring
        repair.
      </p>

      <h2>Materials and what they actually cost</h2>
      <p>
        The material you pick sets both the price and how long the gutters last.
        Here is the honest comparison, installed, in 2026 dollars.
      </p>

      <ComparisonTable
        columns={[
          { title: "Aluminum", subtitle: "seamless", highlight: true },
          { title: "Vinyl" },
          { title: "Steel", subtitle: "galvanized" },
          { title: "Copper" },
        ]}
        rows={[
          {
            label: "Cost per linear foot",
            values: ["$6 - 12", "$3 - 6", "$8 - 14", "$25 - 50"],
          },
          {
            label: "Lifespan",
            values: ["20 - 30 yr", "10 - 15 yr", "20 - 30 yr", "50+ yr"],
          },
          {
            label: "Cold climate",
            values: ["Excellent", "Cracks below 20F", "Good", "Excellent"],
          },
          {
            label: "The catch",
            values: [
              "None worth mentioning",
              "Brittle, short life",
              "Can rust over time",
              "Premium price",
            ],
          },
        ]}
        caption="Seamless aluminum is the default for good reason: no rust, a long life, and a price most people can live with. Vinyl is cheapest up front and the most likely to disappoint. Copper is beautiful and lasts a lifetime, at a lifetime price."
      />

      <p>
        Seamless aluminum earns its place at the top. It is formed on site from a
        continuous coil, so a 40-foot run is one unbroken piece with no seams to
        leak. That single fact matters more than anything else, because the seams
        are where roughly all gutter leaks start. Sectional gutters, the 10-foot
        snap-together pieces from the home center, are the DIY-friendly option and
        they work fine, but every joint is a future leak waiting for its moment.
      </p>

      <Scenario location="Portland, OR">
        A homeowner with 140 feet of gutter chose vinyl at $3.50 a foot to save
        money over aluminum at $9 a foot. The vinyl saved about $770 up front.
        After three winters, two 10-foot sections cracked in a cold snap and
        started leaking behind the fascia. The repair ran $400, plus another $600
        to fix the fascia that had rotted while the leak went unnoticed. The
        aluminum would have lasted 25 years without a crack. In any climate that
        reaches freezing, skip vinyl.
      </Scenario>

      <ComparisonTable
        columns={[
          { title: "Seamless aluminum", highlight: true },
          { title: "Sectional aluminum" },
          { title: "Vinyl" },
        ]}
        rows={[
          {
            label: "Leak risk",
            values: [
              "Very low, no seams",
              "Moderate, seams every 10 ft",
              "Moderate, joints loosen",
            ],
          },
          {
            label: "DIY installable",
            values: ["No, needs a forming machine", "Yes, snap together", "Yes, snap together"],
          },
          {
            label: "Best for",
            values: [
              "Anyone hiring a pro",
              "DIY on a mild-climate house",
              "Sheds and outbuildings only",
            ],
          },
        ]}
        caption="If a contractor is doing the work, seamless aluminum is the answer nearly every time. If you are installing it yourself, sectional aluminum gives you most of the durability without the forming machine."
      />

      <Callout label="Gutter guards">
        Leaf guards and mesh screens cut how often you clean the gutters but they
        do not end it. Fine debris like pine needles, shingle grit, and seed pods
        still works through most guards. Budget $7 to 15 a foot for quality guards
        installed. The cheap foam and brush inserts at $2 to 3 a foot clog within a
        couple of years and drain worse than an open gutter, so they are a false
        economy.
      </Callout>

      <h2>Where gutter jobs go wrong</h2>
      <p>
        The failures repeat, and they are all preventable. Hanging the gutter flat
        with no slope tops the list, because it looks fine on install day and only
        reveals itself as standing water and sagging months later. Too few
        downspouts is next, and it shows up as water sheeting over the front edge
        in the first hard storm. Then there is the downspout that dumps straight at
        the foundation, quietly filling a basement one rain at a time.
      </p>
      <p>
        The rest are material and spacing mistakes. Vinyl in a freezing climate,
        which cracks. Hangers spaced too far apart, which pull loose under snow.
        And undersizing the gutter to save a few dollars a foot, then watching it
        overflow every time the sky really opens up. None of these are hard
        problems. They are planning problems, which means getting the numbers right
        before you buy solves almost all of them. If you are replacing gutters as
        part of a{" "}
        <a href="/roofing-calculator">roof replacement</a>, do both at once and let
        the <a href="/planner/replace-a-roof">roof replacement planner</a> chain
        the quantities together. If you are steep-roof or snow country, the{" "}
        <a href="/snow-load-calculator">snow load calculator</a> tells you what that
        roof is really carrying, and for capturing the runoff instead of just
        shedding it, the <a href="/rainwater-calculator">rainwater calculator</a>{" "}
        sizes a tank from the same roof area.
      </p>
    </>
  );
}
