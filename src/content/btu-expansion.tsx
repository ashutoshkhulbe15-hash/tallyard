import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function OversizingProblemSVG() {
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Oversized AC: short cycling, humidity stays high, higher bills, premature compressor failure.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Why bigger is worse: oversized AC problems</text>
      {[
        {icon:"✗",label:"Short cycling: compressor on/off every 5–8 minutes",sub:"Wears components 3× faster than normal cycling"},
        {icon:"✗",label:"Humidity stays high: air cools before moisture is removed",sub:"Room feels clammy at 72°F even though thermostat is satisfied"},
        {icon:"✗",label:"Higher bills: startup draws 3× running power",sub:"More starts per hour means more peak-draw events on your meter"},
        {icon:"✗",label:"Premature failure: compressor burns through its cycle rating in 8 years",sub:"Right-sized unit lasts 12–15 years doing the same cooling work"},
      ].map((p,i)=>{const y=50+i*34;return(
        <g key={p.label}>
          <circle cx="30" cy={y+8} r="8" fill="#FCEBEB" />
          <text x="30" y={y+12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B53629">{p.icon}</text>
          <text x="48" y={y+6} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{p.label}</text>
          <text x="48" y={y+21} fontSize="9" fill={GUIDE_SVG.inkFaint}>{p.sub}</text>
        </g>
      )})}
    </svg>
  );
}

function BTUByRoomSVG() {
  const rooms = [
    { label: "Small bedroom (100 ft²)", btu: "5,000", tons: "0.4" },
    { label: "Standard bedroom (150 ft²)", btu: "7,500", tons: "0.6" },
    { label: "Living room (300 ft²)", btu: "15,000", tons: "1.25" },
    { label: "Open floor plan (500 ft²)", btu: "25,000", tons: "2.1" },
    { label: "Whole house (2,000 ft²)", btu: "60,000", tons: "5.0" },
  ];
  const headerY=70;const rowH=30;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="BTU by room size: 100 sq ft needs 5,000 BTU, 2,000 sq ft whole house needs 60,000 BTU.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>BTU requirements by room size (cooling)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Baseline at 25 BTU/ft². Adjust for sun, occupancy, insulation quality.</text>
      <rect x="40" y={headerY-18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Room",x:170},{l:"BTU needed",x:380},{l:"Tons",x:530}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {rooms.map((r,i)=>{const y=headerY+10+i*rowH;return(
        <g key={r.label}>{i%2===0&&<rect x="40" y={y-4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="170" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
          <text x="380" y={y+14} textAnchor="middle" fontSize="12" fill={GUIDE_SVG.accent} fontWeight="700">{r.btu}</text>
          <text x="530" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.tons}</text>
        </g>
      )})}
    </svg>
  );
}

function AdjustmentFactorsSVG() {
  const factors = [
    { label: "Heavy sun (south/west windows)", adj: "+10%", color: GUIDE_SVG.accent },
    { label: "Heavy shade (north facing)", adj: "−10%", color: GUIDE_SVG.slate },
    { label: "Kitchen", adj: "+4,000 BTU", color: GUIDE_SVG.accent },
    { label: "Per extra person (beyond 2)", adj: "+600 BTU each", color: GUIDE_SVG.inkMuted },
    { label: "Poor insulation or old windows", adj: "+15–20%", color: GUIDE_SVG.accent },
    { label: "Cathedral or vaulted ceiling", adj: "+20%", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Adjustment factors: south sun adds 10%, kitchens add 4,000 BTU, each extra person adds 600.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Common adjustment factors</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Apply these to the baseline 25 BTU/ft² calculation</text>
      {factors.map((f,i)=>{const y=60+i*28;return(
        <g key={f.label}>
          <text x="300" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{f.label}</text>
          <rect x="310" y={y} width="150" height="20" rx="4" fill={f.adj.startsWith("−")?GUIDE_SVG.slateSoft:GUIDE_SVG.accentSoft} stroke={f.color} strokeWidth="0.75" />
          <text x="385" y={y+14} textAnchor="middle" fontSize="11" fontWeight="700" fill={f.color}>{f.adj}</text>
        </g>
      )})}
    </svg>
  );
}

function SEERComparisonSVG() {
  const ratings = [
    { label: "Old (10 SEER)", annual: "$720", color: GUIDE_SVG.slate, w: 260 },
    { label: "Minimum (14 SEER2)", annual: "$510", color: GUIDE_SVG.inkFaint, w: 185 },
    { label: "Good (16 SEER2)", annual: "$450", color: GUIDE_SVG.inkMuted, w: 163 },
    { label: "Premium (20+ SEER2)", annual: "$360", color: GUIDE_SVG.accent, w: 130 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Annual cooling cost by SEER: 10 SEER costs $720/year, 20 SEER2 costs $360.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Annual cooling cost by SEER rating</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>2,000 ft² home, 1,200 cooling hours/yr, $0.16/kWh</text>
      {ratings.map((r,i)=>{const y=65+i*34;return(
        <g key={r.label}>
          <text x="195" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
          <rect x="205" y={y} width={r.w} height="22" rx="3" fill={r.color} opacity="0.6" />
          <text x={213+r.w} y={y+14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{r.annual}/yr</text>
        </g>
      )})}
      <text x="340" y="210" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Upgrading from 10 SEER to 16 SEER2 saves ~$270/yr. Pays for itself in 5–8 years.</text>
    </svg>
  );
}

function SystemTypesSVG() {
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Three system types: window units $200-800, mini-splits $3,000-7,000, central AC $3,500-8,000.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Cooling system types at a glance</text>
      {[
        {label:"Window unit",range:"$200–800",eff:"8–12 CEER",best:"Single room, renters",x:50,color:GUIDE_SVG.slate},
        {label:"Mini-split",range:"$3,000–7,000",eff:"16–22 SEER2",best:"Additions, ductless homes",x:260,color:GUIDE_SVG.inkMuted},
        {label:"Central AC",range:"$3,500–8,000",eff:"14–20 SEER2",best:"Whole house with ducts",x:470,color:GUIDE_SVG.accent},
      ].map(s=>(
        <g key={s.label}>
          <rect x={s.x} y="50" width="180" height="110" rx="8" fill={s.label==="Central AC"?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={s.color} strokeWidth="1" />
          <text x={s.x+90} y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>{s.label.toUpperCase()}</text>
          <text x={s.x+90} y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.ink}>{s.range}</text>
          <text x={s.x+90} y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{s.eff}</text>
          <text x={s.x+90} y="138" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.best}</text>
        </g>
      ))}
    </svg>
  );
}

export function BTUCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="ACCA Manual J methodology, Energy Star sizing guidance, and AHRI certified product data"
      />

      <h2>The most common HVAC mistake costs $3,000 and makes your house less comfortable</h2>

      <p>
        An HVAC technician in Houston described the service call he gets more than any other. A homeowner bought a new air conditioner two summers ago. The contractor installed a 4-ton unit in a house that needs 3 tons, because the contractor said it would cool faster, and the homeowner figured bigger is better. The system does cool fast. Too fast. It reaches the thermostat setpoint in 8 minutes, shuts off, and the indoor humidity is still at 62 percent because the coil did not run long enough to condense moisture out of the air. Six minutes later, the temperature drifts up 2 degrees and the system restarts. This cycle repeats 6 to 8 times per hour, all summer.
      </p>

      <p>
        The house is 72 degrees and feels clammy. The compressor, rated for 100,000 start-stop cycles over its lifetime, burns through that number in 8 years instead of 15. The homeowner paid $3,000 more for the bigger unit and got worse comfort and a shorter equipment lifespan. Correct sizing is not a nice-to-have. It is the single most important HVAC decision.
      </p>

      <Figure number={1} caption="An oversized AC system creates four compounding problems. Each one makes the house less comfortable and more expensive to run.">
        <OversizingProblemSVG />
      </Figure>

      <MethodologyNote>
        <p>
          The 25 BTU/ft² baseline follows ACCA Manual J simplified residential load calculation methodology. Adjustment factors for sun exposure, occupancy, kitchen heat, and insulation quality are from the same source. SEER rating energy costs use 2025 EIA average residential electricity rates ($0.16/kWh) and assume 1,200 cooling hours per year (typical for zones 3-4). Equipment efficiency from the AHRI certified ratings directory.
        </p>
      </MethodologyNote>

      <h2>How to size your AC: the 25 BTU rule</h2>

      <p>
        The baseline calculation is straightforward. Multiply your conditioned square footage by 25. That gives you the approximate BTU per hour of cooling capacity needed. A 2,000 square foot house needs roughly 50,000 BTU/hr, which is about 4 tons (1 ton equals 12,000 BTU/hr). Residential systems come in half-ton increments: 1.5, 2, 2.5, 3, 3.5, 4, and 5 ton units.
      </p>

      <Figure number={2} caption="Quick sizing reference. These are baselines only. Adjust up or down based on the factors in the next section. A 2,000 ft² house could need 3 tons (well-insulated, shaded) or 5 tons (poor insulation, south-facing glass).">
        <BTUByRoomSVG />
      </Figure>

      <Callout label="Tons vs BTU">
        1 ton = 12,000 BTU/hr. The term comes from ice: one ton of ice absorbs 12,000 BTU as it melts over 24 hours. When a contractor says your house needs &quot;a 3-ton system,&quot; they mean 36,000 BTU/hr of cooling capacity. The calculator above outputs BTU. Divide by 12,000 to get tons, then round to the nearest half-ton size that is commercially available.
      </Callout>

      <h2>What changes the number</h2>

      <p>
        The 25 BTU/ft² baseline assumes average insulation, standard windows, moderate climate, and 8-foot ceilings. Real houses deviate from this in every direction. A well-insulated house with double-pane low-E windows in a mild climate might need only 18 BTU/ft². A poorly insulated house with single-pane windows facing south in Phoenix might need 35.
      </p>

      <Figure number={3} caption="A 150 sq ft south-facing kitchen with 3 people cooking needs dramatically more cooling than a 150 sq ft north-facing bedroom with one person sleeping. Same square footage, completely different load.">
        <AdjustmentFactorsSVG />
      </Figure>

      <p>
        The calculator at the top of this page applies these factors automatically based on your inputs. If you are doing the math manually, start with area times 25, then apply each applicable factor. Round up to the next available unit size, but never go more than half a ton above the calculated number. That half-ton buffer accounts for the imprecision of simplified load calculations without crossing into the oversizing danger zone.
      </p>

      <Scenario location="Tampa, FL (Zone 2)">
        A homeowner replaced a 15-year-old 3-ton 10-SEER system with a new 3.5-ton 16-SEER2 unit because the contractor recommended going bigger. The house is 1,600 sq ft with good insulation. A Manual J calculation says it needs 2.5 tons. The 3.5-ton system short-cycles constantly: 8 minutes running, 6 minutes off. Indoor humidity sits at 62 percent even with the thermostat at 73°F. A properly sized 2.5-ton system would run longer cycles, pull more moisture from the air, and the house would feel comfortable at 75°F with lower electricity bills.
      </Scenario>

      <h2>SEER ratings: what efficiency actually costs you</h2>

      <p>
        SEER (Seasonal Energy Efficiency Ratio) measures how much cooling a system produces per watt of electricity consumed over a typical cooling season. Higher SEER means lower electricity bills. The current federal minimum for new installations is 14 SEER2 in northern states and 15 SEER2 in southern states. Systems from 10 to 15 years ago were commonly 10 to 13 SEER.
      </p>

      <Figure number={4} caption="Upgrading from a 10 SEER system to 16 SEER2 cuts annual cooling cost nearly in half. The $270/year savings pays back the efficiency premium in 5 to 8 years.">
        <SEERComparisonSVG />
      </Figure>

      <p>
        The diminishing returns kick in above 18 SEER2. Going from 14 to 16 saves about $60 per year. Going from 16 to 20 saves another $90. Going from 20 to 25 saves about $40. Meanwhile, the equipment cost jumps $1,000 to $2,000 per SEER point at the high end. For most homeowners, 16 SEER2 is the sweet spot: meaningfully better than minimum, with a payback period under 8 years.
      </p>

      <h2>Window unit vs mini-split vs central: which system type</h2>

      <Figure number={5} caption="Mini-splits are 30-50% more efficient than window units and dramatically quieter. Central AC is the standard for homes with existing ductwork.">
        <SystemTypesSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"Window unit"},{title:"Mini-split"},{title:"Central AC"}]}
        rows={[
          {label:"Cooling capacity",values:["5,000–25,000 BTU","9,000–48,000 BTU","18,000–60,000 BTU"]},
          {label:"Installed cost",values:["$200–800","$3,000–7,000","$3,500–8,000"]},
          {label:"Efficiency",values:["8–12 CEER","16–22 SEER2","14–20 SEER2"]},
          {label:"Noise level",values:["50–60 dB (noticeable)","20–40 dB (whisper quiet)","50–70 dB (outdoor unit)"]},
          {label:"Best for",values:["Single room, renters, budget","Additions, ductless, zone control","Whole house with existing ducts"]},
        ]}
        caption="If you have ducts, central AC or a heat pump is the default. If you don't, mini-splits are far better than window units for anything other than temporary or budget cooling."
      />

      <p>
        For whole-house cooling, central AC or a ducted heat pump is the standard if your house already has ductwork. If you are replacing an aging system, the <a href="/heat-pump-calculator">heat pump calculator</a> can help you compare heat pump vs traditional AC sizing. A heat pump does both heating and cooling in one unit, which often pencils out better than replacing AC and furnace separately.
      </p>

      <p>
        Mini-splits deserve serious consideration for homes without ductwork, for additions, and for rooms that are consistently too hot or too cold. They are 30 to 50 percent more efficient than window units, nearly silent indoors, and allow zone-by-zone temperature control. The installed cost ($3,000 to $7,000 for a single-zone system) is higher than window units but lower than adding ductwork to a house that does not have it. For homes where <a href="/insulation-calculator">insulation upgrades</a> have reduced the heating and cooling load, a mini-split may be all you need. For hot water sizing, the <a href="/water-heater-calculator">water heater calculator</a> determines tank or tankless capacity by household size.
      </p>
    </>
  );
}
