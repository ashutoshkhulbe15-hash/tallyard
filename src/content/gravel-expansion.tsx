import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function TonsVsYardsSVG() {
  const materials = [
    { label: "Pea gravel", density: 1.4, hl: false },
    { label: "Crushed stone (#57)", density: 1.4, hl: true },
    { label: "Crusher run / road base", density: 1.5, hl: true },
    { label: "River rock, 3 to 5 in", density: 1.3, hl: false },
    { label: "Decomposed granite", density: 1.5, hl: false },
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
            <text x="185" y={y + 14} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{m.label}</text>
            <rect x="195" y={y} width={w} height="20" rx="3" fill={m.hl?GUIDE_SVG.accent:GUIDE_SVG.slate} />
            <text x={203 + w} y={y + 14} fontSize="11" fontWeight="700" fill={m.hl?GUIDE_SVG.accent:GUIDE_SVG.inkMuted}>{m.density} tons/yd³</text>
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
            <rect x="55" y={y} width={w} height="20" rx="3" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={63 + w} y={y + 14} fontSize="11" fontWeight="700" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{d.sqft} ft²</text>
            <text x="330" y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{d.use}</text>
          </g>
        );
      })}
    </svg>
  );
}

function CompactionSVG() {
  return (
    <svg viewBox="0 0 680 176" width="100%" height="auto" role="img" aria-label="Gravel compacts about 20 percent, so a project needing 10 compacted cubic yards requires ordering 12 loose cubic yards.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Compaction: why you order more than the math says</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Aggregate arrives loose and loses roughly a fifth of its volume once rolled</text>

      <rect x="52" y="66" width="196" height="62" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.2" />
      <text x="150" y="90" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>12 yd&#179; ordered</text>
      <text x="150" y="110" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>loose, as delivered</text>

      <line x1="266" y1="97" x2="330" y2="97" stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <path d="M 338 97 L 326 91 L 326 103 Z" fill={GUIDE_SVG.accent} />
      <text x="300" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>compact</text>
      <text x="300" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.warm}>lose 20%</text>

      <rect x="356" y="66" width="196" height="62" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="454" y="90" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.accent}>10 yd&#179; in place</text>
      <text x="454" y="110" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>what the project needs</text>

      <text x="20" y="168" fontSize="9" fill={GUIDE_SVG.inkFaint}>Multiply the calculated volume by 1.2 for anything that gets compacted. Loose decorative gravel does not need the allowance.</text>
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

      <Callout label="Never use round stone as base">Pea gravel and river rock are round. Round stones roll against each other under weight. If you use pea gravel as the base under a patio or walkway, it will shift and settle unevenly within one season. Structural base must be angular (crushed stone, process gravel, or decomposed granite) because the sharp edges lock together during compaction. Save the round stuff for decorative topping and drainage fill.</Callout>

      <ComparisonTable
        columns={[{title:"Angular (crushed)"},{title:"Round (river/pea)"}]}
        rows={[
          {label:"Compaction",values:["Locks tight, excellent","Shifts, poor"]},
          {label:"Drainage",values:["Good through voids","Excellent through voids"]},
          {label:"Walkability",values:["Firm surface","Loose, sinks underfoot"]},
          {label:"Best for",values:["Base layers, driveways, under pavers","Decorative, drainage trenches, between flagstone"]},
          {label:"Cost",values:["$20 to 45/ton","$30 to 120/ton"]},
        ]}
        caption="Most projects need angular crushed stone as the base layer. Round stone goes on top for appearance, or in drainage applications where compaction is not needed."
      />

      <h2>Gravel types by number, and what each one does</h2>
      <p>
        Aggregate is graded by number, and the numbers describe size and
        whether fines are present. That second part decides everything.
        Gravel with fines compacts into a hard, load-bearing surface but
        drains slowly. Gravel washed clean of fines drains freely but never
        locks together, so it stays loose underfoot forever. Choosing the
        wrong one is the single most common gravel mistake, and it is not
        recoverable without digging it back out.
      </p>

      <ComparisonTable
        caption="The aggregates you will actually be offered by name. Crusher run and crush and run are the same product; so are ABC and dense grade aggregate in most of the country."
        columns={[
          { title: "Size" },
          { title: "Fines?", highlight: true },
          { title: "What it is for" },
        ]}
        rows={[
          { label: "Crusher run, crush and run", values: ['Dust to 1 in', "Yes, packed with them", "Base layers, compacts rock hard"] },
          { label: "#57 gravel", values: ['3/4 in', "No, washed clean", "Drainage, French drains, driveway top"] },
          { label: "#8 gravel", values: ['3/8 in', "No", "Finer top layer, paver bedding"] },
          { label: "#3 or #4 gravel", values: ['1.5 to 2.5 in', "No", "Deep base under a new driveway"] },
          { label: "Pea gravel", values: ['3/8 in, rounded', "No", "Patios, paths, playgrounds, dog runs"] },
          { label: "Decomposed granite", values: ['Fines to 1/4 in', "Yes", "Paths that need a firm walking surface"] },
        ]}
      />

      <p>
        Two practical readings. Crush and run gravel, sold as crusher run,
        ABC, or dense grade depending on where you are, is what goes down
        first on a driveway because the fines act as a binder and the
        angular pieces lock. It is the cheapest aggregate per ton and the
        one most people should be buying more of. And #57 gravel is the
        drainage workhorse: it is the standard fill for a French drain and
        the usual top course on a gravel driveway, because water passes
        straight through it rather than sitting on the surface.
      </p>
      <p>
        Pea gravel is the exception that catches people. It is rounded
        rather than crushed, which is why it is comfortable underfoot and
        why it will not compact. On a patio or a path with edging it is
        excellent. On a driveway it migrates under tyres, ruts, and ends up
        in the lawn, which is why a pea gravel driveway is a maintenance
        commitment rather than a surface. If you want the look, use it as a
        thin top course over a compacted crusher run base and accept the
        raking.
      </p>

      <h2>Building a gravel driveway in layers</h2>
      <p>
        A driveway that lasts is not one gravel, it is two or three in
        sequence, each compacted before the next goes on. The usual build
        over stable subgrade is 4 inches of #3 or crusher run as base, then
        2 to 3 inches of #57 as the running surface. Over soft or clay soil
        the base goes deeper and a woven geotextile fabric underneath keeps
        the stone from disappearing into the mud, which is a $200 roll that
        routinely saves several tons of aggregate.
      </p>
      <p>
        Compaction is what separates a driveway from a gravel pile. Each
        lift should be no more than 4 inches before rolling, because a
        plate compactor cannot densify a deeper layer, and the surface
        should crown slightly so water runs to the sides rather than down
        the middle. Skipping compaction is why some gravel driveways rut in
        their first wet season and others last a decade with a top-up.
      </p>

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
