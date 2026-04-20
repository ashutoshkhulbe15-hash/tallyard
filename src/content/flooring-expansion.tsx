import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function MaterialComparisonSVG() {
  const materials = [
    { label: "Vinyl plank (LVP)", cost: "$2–7", life: "15–25 yr", diy: "Easy", y: 65 },
    { label: "Laminate", cost: "$1–5", life: "15–25 yr", diy: "Easy", y: 100 },
    { label: "Engineered hardwood", cost: "$4–14", life: "20–40 yr", diy: "Moderate", y: 135 },
    { label: "Solid hardwood", cost: "$6–18", life: "50–100 yr", diy: "Hard", y: 170 },
    { label: "Tile (porcelain)", cost: "$3–15", life: "50+ yr", diy: "Hard", y: 205 },
  ];
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img"
      aria-label="Flooring material comparison showing cost per square foot, lifespan, and DIY difficulty for five common materials from vinyl plank to tile.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Flooring materials at a glance</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Material cost only — add $3–10/ft² for professional installation</text>
      <rect x="40" y={50} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Material", x: 130 }, { l: "Cost/ft²", x: 300 }, { l: "Lifespan", x: 420 }, { l: "DIY level", x: 560 }].map((h) => (
        <text key={h.l} x={h.x} y={66} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {materials.map((m, i) => (
        <g key={m.label}>
          {i % 2 === 0 && <rect x="40" y={m.y - 4} width="600" height="30" fill={GUIDE_SVG.bgWarm} opacity="0.3" />}
          <text x="130" y={m.y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
          <text x="300" y={m.y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{m.cost}</text>
          <text x="420" y={m.y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{m.life}</text>
          <text x="560" y={m.y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{m.diy}</text>
        </g>
      ))}
    </svg>
  );
}

function WasteByPatternSVG() {
  const patterns = [
    { label: "Straight lay", waste: "5%", w: 75, color: GUIDE_SVG.slate },
    { label: "Staggered (1/3 offset)", waste: "7%", w: 105, color: GUIDE_SVG.inkFaint },
    { label: "Diagonal (45°)", waste: "15%", w: 225, color: GUIDE_SVG.accent },
    { label: "Herringbone", waste: "18%", w: 270, color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img"
      aria-label="Waste factor by installation pattern. Straight lay wastes 5%, staggered 7%, diagonal 15%, herringbone 18%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factor by lay pattern</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Diagonal and herringbone cuts produce more offcuts that can&apos;t be reused</text>
      {patterns.map((p, i) => {
        const y = 65 + i * 34;
        return (
          <g key={p.label}>
            <text x="210" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{p.label}</text>
            <rect x="220" y={y} width={p.w} height="20" rx="3" fill={p.color} opacity="0.6" />
            <text x={228 + p.w} y={y + 14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>+{p.waste}</text>
          </g>
        );
      })}
    </svg>
  );
}

function CostPerRoomSVG() {
  const rooms = [
    { label: "Bathroom (50 ft²)", lvp: "$250", lam: "$175", hw: "$600", tile: "$500" },
    { label: "Bedroom (150 ft²)", lvp: "$600", lam: "$450", hw: "$1,500", tile: "$1,200" },
    { label: "Living room (300 ft²)", lvp: "$1,200", lam: "$900", hw: "$3,000", tile: "$2,400" },
    { label: "Whole house (1,200 ft²)", lvp: "$4,800", lam: "$3,600", hw: "$12,000", tile: "$9,600" },
  ];
  const headerY = 70;
  const rowH = 30;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img"
      aria-label="Material cost by room size for four flooring types showing costs from bathroom to whole house.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What flooring actually costs by room (materials only)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Mid-range pricing, before installation labor</text>
      <rect x="30" y={headerY - 18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Room", x: 120 }, { l: "LVP", x: 280 }, { l: "Laminate", x: 370 }, { l: "Hardwood", x: 470 }, { l: "Tile", x: 570 }].map((h) => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {rooms.map((r, i) => {
        const y = headerY + 10 + i * rowH;
        return (
          <g key={r.label}>
            {i % 2 === 0 && <rect x="30" y={y - 4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
            <text x="120" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
            <text x="280" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent}>{r.lvp}</text>
            <text x="370" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.lam}</text>
            <text x="470" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.hw}</text>
            <text x="570" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{r.tile}</text>
          </g>
        );
      })}
    </svg>
  );
}

function AcclimationSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img"
      aria-label="Acclimation timeline: vinyl plank needs 48 hours, laminate 48-72 hours, engineered hardwood 3-5 days, solid hardwood 7-14 days in the room before installation.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Acclimation time before installation</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Leave unopened boxes in the room at room temperature. Skip this and boards buckle.</text>
      {[
        { label: "LVP", days: "48 hrs", w: 60, x: 60, color: GUIDE_SVG.slate },
        { label: "Laminate", days: "48–72 hrs", w: 90, x: 200, color: GUIDE_SVG.inkFaint },
        { label: "Engineered HW", days: "3–5 days", w: 140, x: 370, color: GUIDE_SVG.inkMuted },
        { label: "Solid hardwood", days: "7–14 days", w: 240, x: 370, color: GUIDE_SVG.accent },
      ].map((m, i) => {
        const y = 65 + (i > 1 ? (i - 2) * 38 + 38 : i * 38);
        const row = i < 2 ? 0 : 1;
        const yPos = 65 + i * 24;
        return (
          <g key={m.label}>
            <text x="140" y={65 + i * 24 + 10} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
            <rect x="150" y={65 + i * 24} width={m.w} height="16" rx="3" fill={m.color} opacity="0.6" />
            <text x={158 + m.w} y={65 + i * 24 + 12} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{m.days}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function FlooringCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="NWFA installation guidelines and manufacturer specs from Shaw, Mohawk, and LifeProof"
      />

      <h2>Why 400 square feet of floor needs 430 square feet of flooring</h2>
      <p>My uncle installed laminate in his basement in 2022. He measured the room at 400 square feet, drove to Home Depot, and bought 400 square feet of flooring. Sixteen boxes. He ran out with two rows left against the far wall. The problem wasn&apos;t his measurement — the room was 400 square feet. The problem was the 38 cuts he made along walls, around a support column, and at the doorway transition. Each cut created an offcut too short to start the next row. Those offcuts went in the trash. He needed 430 square feet to finish 400.</p>

      <MethodologyNote>
        <p>
          Waste factors are based on National Wood Flooring Association
          (NWFA) installation guidelines. Material pricing reflects 2026
          retail from Home Depot, Lowe&apos;s, and Floor &amp; Decor.
          Acclimation times are from Shaw, Mohawk, and Armstrong product
          specifications. Coverage per box varies by brand — always check
          your specific product before ordering.
        </p>
      </MethodologyNote>

      <h2>Choosing your material</h2>
      <Figure number={1} caption="Five common residential flooring types compared on cost, lifespan, and DIY difficulty. LVP dominates the market because it's cheap, waterproof, and click-together installation works for beginners.">
        <MaterialComparisonSVG />
      </Figure>
      <p>The market has shifted dramatically since 2020. Luxury vinyl plank (LVP) now outsells all other flooring types combined in US residential renovation. The reasons are practical: it&apos;s waterproof, it clicks together without glue or nails, it handles temperature swings, and at $2–7 per square foot it undercuts everything except budget laminate. If you&apos;re replacing carpet in a rental or doing a quick whole-house refresh, LVP is the default choice for good reason.</p>
      <p>Solid hardwood remains the premium option for homeowners who want a floor that lasts 50–100 years and can be sanded and refinished 5–8 times over its life. The catch is installation: it needs a nail gun, requires careful moisture management, and expands and contracts with humidity more aggressively than any other material. It&apos;s not a weekend DIY project.</p>

      <h2>How much waste to order</h2>
      <Figure number={2} caption="Your lay pattern determines waste. Straight runs waste 5% (the offcuts from the last plank of each row start the next row). Diagonal and herringbone create short offcuts that can't be reused.">
        <WasteByPatternSVG />
      </Figure>
      <Callout label="The box math">Flooring is sold in boxes covering a fixed area (typically 20–25 sq ft per box). You can&apos;t buy half a box. So even after calculating the right waste percentage, round up to the next full box. That last partial box is your replacement supply — keep it for when a plank gets damaged in year 3.</Callout>

      <h2>What flooring costs by room</h2>
      <Figure number={3} caption="Material cost only — installation adds $3–10/ft² for professional labor. A 1,200 sq ft whole-house LVP job runs about $4,800 in materials vs $12,000 for solid hardwood.">
        <CostPerRoomSVG />
      </Figure>

      <ComparisonTable
        columns={[{ title: "DIY" }, { title: "Professional" }]}
        rows={[
          { label: "Material (200 ft² LVP)", values: ["$800", "$800"] },
          { label: "Underlayment", values: ["$60", "Included"] },
          { label: "Transition strips + trim", values: ["$40", "Included"] },
          { label: "Tool rental (saw, spacers)", values: ["$50", "Included"] },
          { label: "Labor", values: ["$0 (6–8 hours)", "$600–2,000"] },
          { label: "Total for 200 ft²", values: [<strong key="d">$950</strong>, <strong key="p">$1,400–2,800</strong>] },
        ]}
        caption="LVP is the most DIY-friendly flooring. Hardwood and tile should be hired out unless you have experience."
      />

      <h2>The step everyone skips: acclimation</h2>
      <Figure number={4} caption="All flooring materials need time to adjust to your room's temperature and humidity before installation. Solid hardwood is the most sensitive — install too soon and it will buckle or gap as it adjusts.">
        <AcclimationSVG />
      </Figure>
      <p>Acclimation means leaving the unopened boxes of flooring in the room where they&apos;ll be installed, at normal living temperature, for a set period. The material absorbs or releases moisture to match the room conditions. Install before it&apos;s acclimated and the boards will expand or contract after they&apos;re locked in — causing buckles, gaps, or both.</p>
      <p>LVP is the most forgiving — 48 hours is usually enough. Solid hardwood is the least forgiving — skip the 7–14 day acclimation and you may see cupping or crowning within the first season.</p>

      <Scenario location="Portland, OR">
        A couple installed 800 sq ft of LVP (LifeProof Sterling Oak) in
        their 1960s ranch. They ordered 840 sq ft (5% waste). The house
        had 14 doorway transitions and a diagonal hallway. Actual waste
        was 11% — the hallway angle created short offcuts on every row.
        They were 48 sq ft short and had to wait 10 days for the same
        dye lot to ship. The mismatched section from a different lot is
        visible in the hallway. Lesson: bump to 10% for rooms with
        angles or many transitions.
      </Scenario>

      <h2>Subfloor: what needs to happen before flooring goes down</h2>
      <p>Your subfloor determines what flooring you can install and how much prep work is needed. Three checks to do before ordering materials:</p>
      <ul>
        <li><strong>Level.</strong> Place a 6-foot straightedge on the subfloor. Gaps over 3/16 inch need leveling compound ($0.50–1.00/ft²). Most click-together products require a flat subfloor to prevent bouncing and joint failure.</li>
        <li><strong>Moisture.</strong> Test concrete subfloors with a calcium chloride kit. Readings over 3 lb per 1,000 ft² per 24 hours mean you need a moisture barrier, and some solid hardwoods can&apos;t be installed at all. LVP handles moisture best.</li>
        <li><strong>Structure.</strong> Bounce test: walk across the room. If the subfloor flexes noticeably, the joists may need sistering or blocking before tile or stone goes down. Flexible subfloors crack rigid flooring.</li>
      </ul>
      <p>If your project involves tile instead of plank flooring, the <a href="/tile-calculator">tile calculator</a> and <a href="/grout-calculator">grout calculator</a> handle the different waste and grout math. For rooms with both tile (bathroom) and plank (bedroom), calculate each area separately.</p>
    </>
  );
}
