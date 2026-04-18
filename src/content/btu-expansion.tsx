import { Figure, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

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
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="BTU requirements by room size: 100 sq ft needs 5,000 BTU, 2,000 sq ft whole house needs 60,000 BTU or 5 tons.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>BTU requirements by room size (cooling)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Baseline estimate at 25 BTU/ft². Adjust up for sun, occupancy, kitchens.</text>
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
    { label: "Heavy sun (south/west facing)", adj: "+10%", color: GUIDE_SVG.accent },
    { label: "Heavy shade (north facing)", adj: "−10%", color: GUIDE_SVG.slate },
    { label: "Kitchen", adj: "+4,000 BTU", color: GUIDE_SVG.accent },
    { label: "Per additional person (>2)", adj: "+600 BTU each", color: GUIDE_SVG.inkMuted },
    { label: "Poor insulation / old windows", adj: "+15–20%", color: GUIDE_SVG.accent },
    { label: "Cathedral / vaulted ceiling", adj: "+20%", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Adjustment factors: south-facing adds 10%, kitchens add 4,000 BTU, each extra person adds 600, poor insulation adds 15-20%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Common adjustment factors</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Apply these to the baseline BTU/ft² calculation</text>
      {factors.map((f,i)=>{const y=60+i*28;return(
        <g key={f.label}>
          <text x="330" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{f.label}</text>
          <rect x="340" y={y} width="140" height="20" rx="4" fill={f.adj.startsWith("-")?GUIDE_SVG.slateSoft:GUIDE_SVG.accentSoft} stroke={f.color} strokeWidth="0.75" />
          <text x="410" y={y+14} textAnchor="middle" fontSize="11" fontWeight="700" fill={f.color}>{f.adj}</text>
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
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Annual cooling cost by SEER rating: a 10 SEER unit costs $720 per year, while a 20 SEER2 unit costs $360 — half the operating cost.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Annual cooling cost by SEER rating</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>2,000 sq ft home, 1,200 cooling hours/yr, $0.16/kWh</text>
      {ratings.map((r,i)=>{const y=65+i*34;return(
        <g key={r.label}>
          <text x="195" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
          <rect x="205" y={y} width={r.w} height="22" rx="3" fill={r.color} opacity="0.6" />
          <text x={213+r.w} y={y+14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{r.annual}/yr</text>
        </g>
      )})}
      <text x="340" y="210" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Upgrading from 10 SEER to 16 SEER2 saves ~$270/yr. The upgrade pays for itself in 5–8 years.</text>
    </svg>
  );
}

function OversizingProblemSVG() {
  return (
    <svg viewBox="0 0 680 180" width="100%" height="auto" role="img" aria-label="Oversized AC problems: short cycling, humidity not removed, higher energy bills, and premature compressor failure.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Why bigger isn&apos;t better: oversized AC problems</text>
      {[
        {icon:"✗",label:"Short cycling — compressor turns on/off every 5–8 minutes",sub:"Wears components 3× faster than normal cycling"},
        {icon:"✗",label:"Humidity stays high — air cools before moisture is removed",sub:"Room feels clammy at 72°F; thermostat says it's comfortable"},
        {icon:"✗",label:"Higher bills — startup draws 3× running power",sub:"More starts per hour = more peak-draw events"},
        {icon:"✗",label:"Premature failure — compressor rated for 100K cycles, burns through them in 8 years",sub:"Right-sized unit lasts 12–15 years"},
      ].map((p,i)=>{const y=50+i*32;return(
        <g key={p.label}>
          <circle cx="30" cy={y+8} r="8" fill="#FCEBEB" />
          <text x="30" y={y+12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B53629">{p.icon}</text>
          <text x="48" y={y+6} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{p.label}</text>
          <text x="48" y={y+20} fontSize="9" fill={GUIDE_SVG.inkFaint}>{p.sub}</text>
        </g>
      )})}
    </svg>
  );
}

export function BTUCalculatorExpansion() {
  return (
    <>
      <h2>The complete guide to calculating BTU and AC sizing</h2>
      <p>BTU stands for British Thermal Unit — the amount of energy needed to raise one pound of water by one degree Fahrenheit. For air conditioning, BTU/hr measures how much heat the system can remove from your space per hour. A 12,000 BTU/hr system is called &quot;1 ton&quot; of cooling (the term comes from the heat absorption capacity of melting a ton of ice). Getting the tonnage right is the most important decision in HVAC — more important than brand, SEER rating, or price.</p>

      <h2>Quick BTU lookup by room size</h2>
      <Figure number={1} caption="Baseline calculation uses 25 BTU per square foot for an average room with standard 8-foot ceilings. Adjust up or down based on the factors below.">
        <BTUByRoomSVG />
      </Figure>
      <Callout label="Tons vs BTU">1 ton = 12,000 BTU/hr. Residential systems come in 1.5, 2, 2.5, 3, 3.5, 4, and 5 ton units. A 2,000 sq ft house typically needs 3–5 tons depending on climate, insulation, and window area. The calculator above gives you the BTU number; divide by 12,000 to get tons.</Callout>

      <h2>Adjustment factors that change the answer</h2>
      <Figure number={2} caption="The baseline 25 BTU/ft² assumes average insulation, standard windows, and moderate climate. South-facing rooms, kitchens, and poorly insulated houses need significantly more.">
        <AdjustmentFactorsSVG />
      </Figure>
      <p>The adjustment factors above are why a 150 sq ft south-facing kitchen with 3 people cooking in it needs dramatically more cooling than a 150 sq ft north-facing bedroom with one person sleeping. The calculator above applies these factors automatically based on your inputs.</p>

      <h2>Why oversizing your AC is worse than undersizing</h2>
      <Figure number={3} caption="An oversized AC cools too fast, shuts off before removing humidity, then restarts minutes later. This short-cycling wastes energy, leaves the house clammy, and kills the compressor early.">
        <OversizingProblemSVG />
      </Figure>
      <p>Most contractors oversize by one-half to one full ton because a customer who complains about being hot is worse than a customer paying too much. But oversized systems create the exact comfort problems the customer is trying to avoid — particularly in humid climates where dehumidification matters as much as temperature. An undersized system that runs continuously on the hottest day is better than an oversized one that short-cycles all summer.</p>

      <h2>SEER ratings and what they cost you</h2>
      <Figure number={4} caption="Higher SEER ratings use less electricity for the same cooling. Upgrading from a 10-year-old 10 SEER unit to a new 16 SEER2 cuts annual cooling cost nearly in half.">
        <SEERComparisonSVG />
      </Figure>
      <ComparisonTable
        columns={[{title:"Window unit"},{title:"Mini-split"},{title:"Central AC"}]}
        rows={[
          {label:"Cooling capacity",values:["5,000–25,000 BTU","9,000–48,000 BTU","18,000–60,000 BTU"]},
          {label:"Installed cost",values:["$200–800","$3,000–7,000","$3,500–8,000"]},
          {label:"Efficiency",values:["8–12 CEER","16–22 SEER2","14–20 SEER2"]},
          {label:"Best for",values:["Single room, renters","Additions, ductless homes","Whole house with ducts"]},
        ]}
        caption="Mini-splits are 30-50% more efficient than window units and dramatically quieter. Central AC is the standard for ducted homes. Window units are the budget option for single rooms."
      />
      <p>For whole-house cooling, central AC or a ducted heat pump is the standard. If you&apos;re replacing an aging system, see our <a href="/heat-pump-calculator">heat pump calculator</a> to compare heat pump vs traditional AC sizing — a heat pump does both heating and cooling in one unit, which often pencils out better than replacing AC and furnace separately.</p>
    </>
  );
}
