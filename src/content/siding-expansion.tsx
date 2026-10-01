import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SquareExplainerSVG() {
  return (
    <svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="One siding square equals 100 square feet of wall coverage.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Siding is sold by the &quot;square&quot;</text>
      <rect x="60" y="50" width="80" height="50" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="100" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>10 × 10</text>
      <text x="100" y="88" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>= 100 ft²</text>
      <text x="180" y="80" fontSize="18" fontWeight="700" fill={GUIDE_SVG.ink}>=</text>
      <text x="220" y="73" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>1 square</text>
      <text x="220" y="93" fontSize="10" fill={GUIDE_SVG.inkFaint}>A 2,000 ft² house exterior = 20 squares</text>
    </svg>
  );
}

function WallAreaSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Wall area formula: perimeter times wall height minus windows, doors, and gable areas.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Measuring wall area for siding</text>
      {[
        {step:"1",label:"Measure house perimeter (all exterior walls)",y:55},
        {step:"2",label:"Multiply by average wall height (eave to foundation)",y:85},
        {step:"3",label:"Add gable triangles: (base × rise) ÷ 2 for each gable end",y:115},
        {step:"4",label:"Subtract windows (15 ft² each) and doors (20 ft² each)",y:145},
      ].map(s=>(
        <g key={s.step}>
          <circle cx="35" cy={s.y+2} r="10" fill={GUIDE_SVG.accentSoft} />
          <text x="35" y={s.y+6} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>{s.step}</text>
          <text x="55" y={s.y+6} fontSize="11" fill={GUIDE_SVG.ink}>{s.label}</text>
        </g>
      ))}
    </svg>
  );
}

function InstallMethodSVG() {
  const cards = [
    { mat: "Vinyl", lines: ["Hangs on a nailing hem and", "floats for expansion"], diy: "Moderate", x: 44, hl: false },
    { mat: "Fiber cement", lines: ["Face-nailed, caulked joints,", "arrives pre-primed"], diy: "Hard, heavy boards", x: 250, hl: true },
    { mat: "Wood and panel", lines: ["Nailed to studs, sealed on", "all faces before install"], diy: "Moderate", x: 456, hl: false },
  ];
  return (
    <svg viewBox="0 0 680 196" width="100%" height="auto" role="img" aria-label="Installation method by material: vinyl hangs on a nailing hem and floats for expansion, fiber cement is face-nailed with caulked joints, wood and panel siding is nailed to studs and sealed on all faces.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installation method by material</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>How each family attaches determines the tools, the labour rate, and whether it is a realistic DIY job</text>
      {cards.map((c) => (
        <g key={c.mat}>
          <rect x={c.x} y="62" width="180" height="102" rx="8"
            fill={c.hl ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft}
            stroke={c.hl ? GUIDE_SVG.accent : GUIDE_SVG.cool} strokeWidth="1.2" />
          <text x={c.x + 90} y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill={c.hl ? GUIDE_SVG.accent : GUIDE_SVG.ink}>{c.mat}</text>
          {c.lines.map((ln, j) => (
            <text key={j} x={c.x + 90} y={112 + j * 15} textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkMuted}>{ln}</text>
          ))}
          <text x={c.x + 90} y="152" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={GUIDE_SVG.inkFaint}>DIY: {c.diy}</text>
        </g>
      ))}
      <text x="20" y="188" fontSize="9" fill={GUIDE_SVG.inkFaint}>Fiber cement cutting produces silica dust and requires a rated blade and respiratory protection.</text>
    </svg>
  );
}

export function SidingCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="James Hardie, CertainTeed, LP SmartSide installation specs" />

      <h2>Siding is measured in squares, but priced per square foot</h2>

      <p>The siding industry uses &quot;squares&quot; the same way roofing does: one square equals 100 square feet of wall coverage. A 2,000 square foot house exterior needs 20 squares. But when you shop for siding at a supply yard or big-box store, prices are listed per square foot. This creates a translation step that trips people up. A fiber cement siding priced at $8 per square foot costs $800 per square. If you need 20 squares, your material bill is $16,000 before labor or trim.</p>

      <Figure number={1} caption="One square = 100 sq ft. When comparing quotes, make sure both contractors are quoting the same unit.">
        <SquareExplainerSVG />
      </Figure>

      <MethodologyNote>
        <p>Wall area calculations use perimeter × height with standard deductions for openings (20 ft² per door, 15 ft² per window). Gable area uses the triangle formula. Pricing reflects 2026 installed costs from contractor associations and James Hardie, CertainTeed, and LP SmartSide distributor pricing. Waste factor of 10% applied for standard rectangular homes.</p>
      </MethodologyNote>

      <h2>Measuring your walls</h2>

      <Figure number={2} caption="Walk the house perimeter with a tape measure, multiply by wall height, add gable triangles, subtract openings. The calculator does this automatically.">
        <WallAreaSVG />
      </Figure>

      <p>The tricky part is gable ends. Gable triangles add significant area on steep-pitched homes. A 30-foot-wide gable with a 6/12 pitch adds about 112 square feet per gable end. A ranch with hip roofs has no gables. A Colonial with two gable ends might add 200+ square feet to the total. The calculator above handles this if you enter your gable dimensions.</p>

      <h2>What siding costs installed</h2>

      <Scenario location="Raleigh, NC">
        A homeowner got two bids to reside a 1,800 sq ft house (about 2,200 sq ft of wall area after gables). Bid A: vinyl at $14,000 installed. Bid B: fiber cement (James Hardie) at $26,000 installed. The fiber cement costs nearly double up front, but the vinyl needs replacement in 25 years while the Hardie lasts 40+. The vinyl never needs paint. The Hardie needs repainting at year 12 and year 24 ($4,500 each time). Over 30 years, the vinyl costs $14,000 total. The Hardie costs $35,000. See our <a href="/guides/vinyl-vs-fiber-cement-siding">vinyl vs fiber cement buying guide</a> for the full 30-year TCO analysis.
      </Scenario>

      <ComparisonTable
        columns={[{title:"Vinyl"},{title:"Fiber cement"},{title:"Cedar"}]}
        rows={[
          {label:"Install cost (2,000 ft² home)",values:["$6,000 to 16,000","$12,000 to 26,000","$16,000 to 32,000"]},
          {label:"Fire rating",values:["Melts (not rated)","Class A (1 hour)","Class C (limited)"]},
          {label:"Impact resistance",values:["Cracks in cold","Excellent","Good"]},
          {label:"Can be painted?",values:["No (color-through)","Yes (must be painted)","Yes (stain or paint)"]},
          {label:"Insurance discount?",values:["Rarely","Often (fire rating)","Rarely"]},
        ]}
        caption="Fiber cement is the contractor's default for new construction. Vinyl dominates the retrofit and budget market."
      />

      <h2>Panel siding and lap siding are different calculations</h2>
      <p>
        Lap siding, which covers vinyl, fiber cement, cedar, and clapboard,
        installs in overlapping horizontal courses. What matters is the
        exposure, meaning the visible height of each course after the
        overlap. Shiplap siding works the same way, with a milled rabbet setting the
        overlap instead of a simple lap. An 8-1/4 inch fiber cement board
        typically shows 7 inches,
        so it covers 7 square feet per 12 foot board rather than 8-1/4.
        Vinyl is named for its exposure directly: a D4 panel is a double
        4 inch profile with 8 inches of exposure, and a D5 shows 10.
      </p>
      <p>
        Panel siding is a different product entirely and it is where most
        estimating mistakes happen. T1-11 siding, board and batten, and
        most log siding come as 4 by 8, 4 by 9, or 4 by 10 sheets, so they
        are bought by the sheet rather than by the square. A 4 by 8 sheet
        covers 32 square feet, so a 1,200 square foot wall takes 38 sheets
        before waste. Because panels have to land on studs, the practical
        number is usually higher: cuts at corners and openings cannot be
        reused the way a lap course offcut can.
      </p>

      <ComparisonTable
        caption="How each family is sold and covered. Panel products are ordered in sheets; lap products are ordered in squares and converted by exposure."
        columns={[
          { title: "Sold as" },
          { title: "Coverage", highlight: true },
          { title: "Order by" },
        ]}
        rows={[
          { label: "Vinyl lap (D4 or D5)", values: ["Boxes of 2 squares", '8 or 10 in exposure', "Squares"] },
          { label: "Fiber cement lap", values: ["Boards, 12 ft", '7 in exposure typical', "Squares, then boards"] },
          { label: "Cedar bevel or clapboard", values: ["Boards by the foot", '4 to 6 in exposure', "Squares, then linear ft"] },
          { label: "T1-11 panel", values: ["4x8, 4x9, 4x10 sheets", "32 to 40 ft² per sheet", "Sheets"] },
          { label: "Board and batten", values: ["Sheets plus batten stock", '32 ft² plus battens at 12 to 24 in', "Sheets and linear ft"] },
          { label: "Cedar shake", values: ["Bundles or panels", "25 ft² per bundle typical", "Squares"] },
          { label: "Shiplap siding", values: ["Boards, tongue and groove", "Face width less the lap", "Squares, then linear ft"] },
        ]}
      />

      <h2>Siding materials, honestly compared</h2>

      <ComparisonTable
        caption="Installed cost per square foot, 2026 US averages. Life expectancy assumes the material is installed and maintained correctly, which for the wood products is a real condition rather than a formality."
        columns={[
          { title: "Installed $/ft²" },
          { title: "Life", highlight: true },
          { title: "The honest trade-off" },
        ]}
        rows={[
          { label: "Vinyl", values: ["$4 to 9", "20 to 40 yr", "Cheapest and lowest upkeep; can warp near heat"] },
          { label: "Aluminum siding", values: ["$5 to 10", "30 to 40 yr", "Dents permanently; mostly a repair market now"] },
          { label: "T1-11 panel", values: ["$4 to 9", "20 to 30 yr", "Cheap and fast; fails at the bottom edge if unsealed"] },
          { label: "Engineered wood siding", values: ["$6 to 12", "25 to 40 yr", "LP SmartSide and similar; better rot resistance than plywood"] },
          { label: "Board and batten vinyl", values: ["$5 to 10", "20 to 40 yr", "The look without the maintenance"] },
          { label: "Fiber cement, hardie plank", values: ["$8 to 16", "40 to 50 yr", "Heavy, needs specific tools, excellent longevity"] },
          { label: "Cedar shake or clapboard", values: ["$9 to 20", "30 to 50 yr", "Best appearance, wants stain every 5 to 8 years"] },
        ]}
      />

      <p>
        A few notes the price table cannot carry. T1-11 siding is plywood
        or OSB with milled grooves, and its weakness is the bottom edge:
        left unprimed or in contact with grade, it wicks water and
        delaminates. Priming all six faces before installation and keeping
        6 inches of clearance to soil is the difference between 15 years
        and 30. Engineered wood siding, sold as LP SmartSide and similar,
        is the modern answer to the same brief with resin treatment that
        resists exactly that failure.
      </p>
      <p>
        Masonite siding deserves a specific mention because people search
        for it by name and often own it without knowing. It was a hardboard
        product widely installed from the 1980s through the 1990s, it
        swelled and rotted at the edges in wet climates, and it was the
        subject of a major class action settlement before being
        discontinued. If you have hardboard siding that is soft or
        mushrooming at the butt joints, that is what you are looking at,
        and patching rarely holds; it is a replacement conversation.
      </p>
      <p>
        On the question people ask most about vinyl: yes, you can paint
        vinyl siding, with two conditions. The paint must be a
        vinyl-safe acrylic formulated for the purpose, and the colour must
        be no darker than the original. Vinyl expands with heat, and a dark
        colour on a substrate not engineered for it absorbs enough
        additional heat to warp the panels. Clean thoroughly, prime where
        the manufacturer calls for it, and expect 8 to 10 years before a
        repaint.
      </p>

      <h2>Installation: what goes under the siding</h2>

      <Figure number={3} caption="How each family attaches. All three install over a water resistive barrier, which is the layer actually keeping water out of the wall.">
        <InstallMethodSVG />
      </Figure>

      <p>No matter which material you choose, the installation layers are the same. Sheathing (OSB or plywood) provides structure. House wrap (Tyvek or equivalent) provides the air and moisture barrier. Siding goes over the house wrap with a nailing pattern that allows drainage behind the cladding. Fiber cement boards are heavy (a 12-foot plank weighs 30+ pounds) and require two people to handle. Vinyl is light and clicks into a nailing hem, which makes it the most DIY-friendly siding material.</p>

      <Callout label="Siding is a water management system, not a skin">
        Every siding product is designed to shed the majority of water and
        let the rest drain and dry behind it. That means the water
        resistive barrier, the flashing at every opening, and the
        clearance at the bottom edge matter more to how long the wall
        lasts than which material sits on the outside. A premium siding
        installed over failed flashing rots the sheathing behind it just
        as fast as a cheap one. When comparing bids, the line items about
        housewrap, flashing, and starter strips are the ones worth
        reading.
      </Callout>

      <h2>Siding installation cost per square foot</h2>

      <p>The installed price per square foot is the number contractors quote and the number you need for budgeting. It includes material, labor, house wrap, trim, and basic flashing. It does not include removal of old siding (add $1 to $3 per square foot if tear-off is needed).</p>

      <ComparisonTable
        columns={[{title:"Material/ft²"},{title:"Labor/ft²"},{title:"Total installed/ft²"}]}
        rows={[
          {label:"Vinyl",values:["$2 to 4","$2 to 4","$3 to 8"]},
          {label:"Fiber cement (Hardie)",values:["$3 to 6","$4 to 7","$6 to 13"]},
          {label:"Engineered wood (LP)",values:["$3 to 5","$3 to 5","$5 to 10"]},
          {label:"Cedar lap",values:["$5 to 9","$4 to 7","$8 to 16"]},
          {label:"Aluminum",values:["$2 to 4","$3 to 5","$4 to 8"]},
        ]}
        caption="Labor is 40-55% of the installed price for most siding types. Fiber cement labor is the highest because the boards are heavy and require precise face-nailing with caulked joints."
      />

      <p>For a full cost analysis with 30-year total cost of ownership, see the <a href="/cost-to-install-siding">cost to install siding</a> guide. For the <a href="/gutter-calculator">gutter</a> and <a href="/insulation-calculator">insulation</a> calculators, use those tools alongside this one since all three are typically part of the same exterior renovation project.</p>
    </>
  );
}
