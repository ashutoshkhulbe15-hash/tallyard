import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function TonsVsYardsSVG() {
  const materials = [
    { label: "Pea gravel", density: 1.4, color: GUIDE_SVG.slate },
    { label: "Crushed stone (#57)", density: 1.4, color: GUIDE_SVG.inkFaint },
    { label: "Process/road base", density: 1.5, color: GUIDE_SVG.inkMuted },
    { label: "River rock (3-5\")", density: 1.3, color: GUIDE_SVG.accent },
    { label: "Decomposed granite", density: 1.5, color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Gravel density: 1 cubic yard weighs 1.3 to 1.5 tons depending on type.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Tons per cubic yard by gravel type</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Order in tons if buying by weight, yards if buying by volume. They are not interchangeable.</text>
      {materials.map((m, i) => {
        const y = 65 + i * 30;
        const w = m.density * 220;
        return (
          <g key={m.label}>
            <text x="185" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
            <rect x="195" y={y} width={w} height="20" rx="3" fill={m.color} opacity="0.6" />
            <text x={203 + w} y={y + 14} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{m.density} tons/yd³</text>
          </g>
        );
      })}
    </svg>
  );
}

function DepthCoverageSVG() {
  const depths = [
    { label: '2"', sqft: 162, use: "Decorative topping" },
    { label: '3"', sqft: 108, use: "Walkway, garden path" },
    { label: '4"', sqft: 81, use: "Driveway base, patio sub-base" },
    { label: '6"', sqft: 54, use: "Heavy traffic, structural base" },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="One yard of gravel covers 162 sq ft at 2 inches, 54 sq ft at 6 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Coverage per cubic yard by depth</text>
      {depths.map((d, i) => {
        const y = 60 + i * 32;
        const w = d.sqft * 0.7;
        return (
          <g key={d.label}>
            <text x="45" y={y + 14} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{d.label}</text>
            <rect x="55" y={y} width={w} height="20" rx="3" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={63 + w} y={y + 14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{d.sqft} ft²</text>
            <text x={63 + w + 50} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{d.use}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GravelTypesSVG() {
  const types = [
    { label: "Pea gravel", cost: "$30–50/ton", best: "Paths, between pavers, drainage" },
    { label: "#57 crushed stone", cost: "$25–45/ton", best: "Driveways, drainage, French drains" },
    { label: "Road base / process", cost: "$20–35/ton", best: "Patio sub-base, driveway base" },
    { label: "River rock (3–5\")", cost: "$60–120/ton", best: "Decorative, dry creek beds, erosion" },
    { label: "Decomposed granite", cost: "$35–55/ton", best: "Paths, xeriscape, patio surface" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Gravel types: pea gravel, crushed stone, road base, river rock, decomposed granite.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Gravel types and what they cost</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Type",x:130},{l:"Cost/ton",x:310},{l:"Best for",x:500}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="130" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="310" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.cost}</text>
          <text x="500" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.best}</text>
        </g>
      )})}
    </svg>
  );
}

function CompactionSVG() {
  return (
    <svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Gravel compacts 15-20%. Order 1.2 times the calculated volume.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Compaction: why you need 20% more than the math says</text>
      <rect x="60" y="50" width="200" height="55" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="160" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Loose volume</text>
      <text x="160" y="90" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>What you order</text>
      <text x="310" y="82" fontSize="18" fontWeight="700" fill={GUIDE_SVG.accent}>→ −20%</text>
      <rect x="380" y="50" width="160" height="55" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="460" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Compacted volume</text>
      <text x="460" y="90" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>What you end up with</text>
    </svg>
  );
}

export function GravelCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="ASTM gravel gradation specs and landscape supply industry pricing" />

      <h2>Tons and yards are not the same thing, and it matters</h2>

      <p>The most common gravel ordering mistake is confusing tons with cubic yards. A landscape supply yard quotes you in tons. You calculated cubic yards. One cubic yard of crushed stone weighs about 1.4 tons. Order 5 cubic yards when you meant 5 tons and you get 30 percent more gravel than you need (and pay for the overage). Order 5 tons when you meant 5 yards and you are 30 percent short. The calculator above outputs both units so you can match whichever your supplier uses.</p>

      <Figure number={1} caption="Different gravel types have different densities. Crushed stone and process gravel run about 1.4-1.5 tons per yard. Lighter river rock is closer to 1.3.">
        <TonsVsYardsSVG />
      </Figure>

      <MethodologyNote>
        <p>Volume formula: area (ft²) × depth (in) ÷ 12 ÷ 27 = cubic yards. Ton conversion uses ASTM gradation-specific density factors. Pricing reflects 2026 landscape supply yard rates. Compaction factor of 1.2× is standard for crushed angular aggregate per ASTM D698.</p>
      </MethodologyNote>

      <h2>How depth determines your project type</h2>

      <Figure number={2} caption="Two inches is decorative. Four inches is structural. Six inches is heavy-duty base. The depth you choose depends on what sits on top of the gravel and how much weight it carries.">
        <DepthCoverageSVG />
      </Figure>

      <p>A garden path needs 2 to 3 inches of pea gravel over landscape fabric. A <a href="/paver-calculator">paver patio</a> base needs 4 to 6 inches of crushed stone, compacted in lifts. A gravel driveway that parks vehicles needs 6 to 8 inches of road base with a 2-inch topping layer of smaller stone. Each inch of depth across a 200-square-foot area adds 0.6 cubic yards to the order. That is roughly one ton and $30 to $50 in material.</p>

      <h2>Picking the right gravel for the job</h2>

      <Figure number={3} caption="Not all gravel is interchangeable. Angular crushed stone locks together under compaction. Round pea gravel and river rock shift under load and should never be used as structural base.">
        <GravelTypesSVG />
      </Figure>

      <Callout label="Never use round stone as base">Pea gravel and river rock are round. Round stones roll against each other under weight. If you use pea gravel as the base under a patio or walkway, it will shift and settle unevenly within one season. Structural base must be angular (crushed stone, process gravel, or decomposed granite) because the sharp edges lock together during compaction. Save the round stuff for decorative topping and drainage fill.</Callout>

      <ComparisonTable
        columns={[{title:"Angular (crushed)"},{title:"Round (river/pea)"}]}
        rows={[
          {label:"Compaction",values:["Locks tight, excellent","Shifts, poor"]},
          {label:"Drainage",values:["Good through voids","Excellent through voids"]},
          {label:"Walkability",values:["Firm surface","Loose, sinks underfoot"]},
          {label:"Best for",values:["Base layers, driveways, under pavers","Decorative, drainage trenches, between flagstone"]},
          {label:"Cost",values:["$20–45/ton","$30–120/ton"]},
        ]}
        caption="Most projects need angular crushed stone as the base layer. Round stone goes on top for appearance, or in drainage applications where compaction is not needed."
      />

      <h2>Order 20% more than the formula says</h2>

      <Figure number={4} caption="Crushed gravel compacts 15-20% when you run a plate compactor over it. If your math says 5 yards, order 6. Coming up short means a second delivery fee.">
        <CompactionSVG />
      </Figure>

      <Scenario location="Nashville, TN">
        A homeowner ordered 4 cubic yards of crushed stone for a 12 × 16 paver patio base at 4 inches deep. The math was right: 192 sq ft × 4 in ÷ 12 ÷ 27 = 2.4 yd³. But she needed compacted volume, not loose volume. After running the plate compactor, the 4 yards of loose stone compressed to about 3.2 yards of base. She was short by 8 square feet of coverage in one corner. The second delivery cost $75 in delivery fee plus $35 for a quarter yard of stone. Ordering 5 yards from the start would have cost $25 more and saved the second trip.
      </Scenario>

      <h2>Delivery logistics</h2>

      <p>Gravel comes in dump trucks. A standard tandem axle dump truck holds 12 to 16 tons (8 to 11 cubic yards). A single axle holds 5 to 8 tons. Delivery fees range from $50 to $150 depending on distance. Most suppliers charge a flat delivery fee per trip regardless of load size, so it costs the same to deliver 3 yards or 10 yards. Fill the truck.</p>

      <p>Where the truck dumps matters. Gravel cannot be scooped back up easily once it is on the ground. Have the driver place the pile as close to the work area as possible. If the pile goes in the driveway and the project is in the back yard, you are moving every pound by wheelbarrow. Ten yards of crushed stone is about 14 tons. That is a lot of wheelbarrow loads.</p>

      <p>For projects that also need <a href="/topsoil-calculator">topsoil</a> or <a href="/mulch-calculator">mulch</a>, order everything from the same supplier on the same truck when possible. Most landscape yards will split-load two or three materials on one delivery, saving you $100 or more in delivery fees.</p>
    </>
  );
}
