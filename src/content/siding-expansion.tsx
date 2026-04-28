import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SidingCostSVG() {
  const types = [
    { label: "Vinyl", range: "$3–8", life: "25–40 yr", maint: "None" },
    { label: "Fiber cement (Hardie)", range: "$6–13", life: "30–50 yr", maint: "Repaint 10–15 yr" },
    { label: "Engineered wood (LP)", range: "$5–10", life: "20–30 yr", maint: "Repaint 8–12 yr" },
    { label: "Cedar/redwood", range: "$8–16", life: "20–40 yr", maint: "Stain 3–5 yr" },
    { label: "Aluminum", range: "$4–8", life: "30–50 yr", maint: "Repaint 15–20 yr" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Siding cost per square foot installed: vinyl $3-8, fiber cement $6-13, cedar $8-16.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Siding cost, lifespan, and maintenance</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Material",x:120},{l:"Cost/ft²",x:280},{l:"Lifespan",x:400},{l:"Maintenance",x:550}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="120" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="280" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.range}</text>
          <text x="400" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{t.life}</text>
          <text x="550" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.maint}</text>
        </g>
      )})}
    </svg>
  );
}

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
  return (
    <svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Installation methods: nailed over house wrap for vinyl, nailed with caulked joints for fiber cement.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installation method by material</text>
      {[
        {mat:"Vinyl",method:"Hangs on nailing hem, floats for expansion",diy:"Moderate",x:50,color:GUIDE_SVG.slate},
        {mat:"Fiber cement",method:"Face-nailed, caulked joints, pre-primed",diy:"Hard (heavy boards)",x:260,color:GUIDE_SVG.inkMuted},
        {mat:"Wood/LP",method:"Nailed, requires stain/paint before install",diy:"Moderate",x:470,color:GUIDE_SVG.accent},
      ].map(s=>(
        <g key={s.mat}>
          <rect x={s.x} y="50" width="180" height="70" rx="6" fill={s.mat==="Fiber cement"?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={s.color} strokeWidth="1" />
          <text x={s.x+90} y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill={s.color}>{s.mat}</text>
          <text x={s.x+90} y="88" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.ink}>{s.method.substring(0,35)}</text>
          <text x={s.x+90} y="104" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>DIY: {s.diy}</text>
        </g>
      ))}
    </svg>
  );
}

export function SidingCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="James Hardie, CertainTeed, LP SmartSide installation specs" />

      <h2>Siding is measured in squares, but priced per square foot</h2>

      <p>The siding industry uses "squares" the same way roofing does: one square equals 100 square feet of wall coverage. A 2,000 square foot house exterior needs 20 squares. But when you shop for siding at a supply yard or big-box store, prices are listed per square foot. This creates a translation step that trips people up. A fiber cement siding priced at $8 per square foot costs $800 per square. If you need 20 squares, your material bill is $16,000 before labor or trim.</p>

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

      <Figure number={3} caption="Vinyl is cheapest installed. Fiber cement costs double but lasts longer and has better fire and impact ratings. Cedar is the premium natural option.">
        <SidingCostSVG />
      </Figure>

      <Scenario location="Raleigh, NC">
        A homeowner got two bids to reside a 1,800 sq ft house (about 2,200 sq ft of wall area after gables). Bid A: vinyl at $14,000 installed. Bid B: fiber cement (James Hardie) at $26,000 installed. The fiber cement costs nearly double up front, but the vinyl needs replacement in 25 years while the Hardie lasts 40+. The vinyl never needs paint. The Hardie needs repainting at year 12 and year 24 ($4,500 each time). Over 30 years, the vinyl costs $14,000 total. The Hardie costs $35,000. See our <a href="/guides/vinyl-vs-fiber-cement-siding">vinyl vs fiber cement buying guide</a> for the full 30-year TCO analysis.
      </Scenario>

      <ComparisonTable
        columns={[{title:"Vinyl"},{title:"Fiber cement"},{title:"Cedar"}]}
        rows={[
          {label:"Install cost (2,000 ft² home)",values:["$6,000–16,000","$12,000–26,000","$16,000–32,000"]},
          {label:"Fire rating",values:["Melts (not rated)","Class A (1 hour)","Class C (limited)"]},
          {label:"Impact resistance",values:["Cracks in cold","Excellent","Good"]},
          {label:"Can be painted?",values:["No (color-through)","Yes (must be painted)","Yes (stain or paint)"]},
          {label:"Insurance discount?",values:["Rarely","Often (fire rating)","Rarely"]},
        ]}
        caption="Fiber cement is the contractor's default for new construction. Vinyl dominates the retrofit and budget market."
      />

      <h2>Installation: what goes under the siding</h2>

      <Figure number={4} caption="All siding installs over house wrap (Tyvek, Typar) which serves as the moisture barrier. The siding itself is the UV and impact protection layer.">
        <InstallMethodSVG />
      </Figure>

      <p>No matter which material you choose, the installation layers are the same. Sheathing (OSB or plywood) provides structure. House wrap (Tyvek or equivalent) provides the air and moisture barrier. Siding goes over the house wrap with a nailing pattern that allows drainage behind the cladding. Fiber cement boards are heavy (a 12-foot plank weighs 30+ pounds) and require two people to handle. Vinyl is light and clicks into a nailing hem, which makes it the most DIY-friendly siding material.</p>

      <h2>Siding installation cost per square foot</h2>

      <p>The installed price per square foot is the number contractors quote and the number you need for budgeting. It includes material, labor, house wrap, trim, and basic flashing. It does not include removal of old siding (add $1 to $3 per square foot if tear-off is needed).</p>

      <ComparisonTable
        columns={[{title:"Material/ft²"},{title:"Labor/ft²"},{title:"Total installed/ft²"}]}
        rows={[
          {label:"Vinyl",values:["$2–4","$2–4","$3–8"]},
          {label:"Fiber cement (Hardie)",values:["$3–6","$4–7","$6–13"]},
          {label:"Engineered wood (LP)",values:["$3–5","$3–5","$5–10"]},
          {label:"Cedar lap",values:["$5–9","$4–7","$8–16"]},
          {label:"Aluminum",values:["$2–4","$3–5","$4–8"]},
        ]}
        caption="Labor is 40-55% of the installed price for most siding types. Fiber cement labor is the highest because the boards are heavy and require precise face-nailing with caulked joints."
      />

      <p>For a full cost analysis with 30-year total cost of ownership, see the <a href="/cost-to-install-siding">cost to install siding</a> guide. For the <a href="/gutter-calculator">gutter</a> and <a href="/insulation-calculator">insulation</a> calculators, use those tools alongside this one since all three are typically part of the same exterior renovation project.</p>
    </>
  );
}
