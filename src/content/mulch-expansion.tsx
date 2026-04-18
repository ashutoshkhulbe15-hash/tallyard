import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function DepthCoverageSVG() {
  const depths = [
    { label: '1"', sqft: 324, use: "Top-up existing beds", color: GUIDE_SVG.slate },
    { label: '2"', sqft: 162, use: "Standard refresh", color: GUIDE_SVG.inkFaint },
    { label: '3"', sqft: 108, use: "New beds, weed suppression", color: GUIDE_SVG.accent },
    { label: '4"', sqft: 81, use: "Playground, path base", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="One cubic yard of mulch covers 324 sq ft at 1 inch depth, 162 at 2 inches, 108 at 3 inches, and 81 at 4 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How far does 1 cubic yard of mulch go?</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Coverage drops fast as depth increases — going from 2" to 3" uses 50% more mulch</text>
      {depths.map((d, i) => {
        const y = 65 + i * 34;
        const w = d.sqft * 0.8;
        return (
          <g key={d.label}>
            <text x="50" y={y + 14} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{d.label}</text>
            <rect x="60" y={y} width={w} height="22" rx="3" fill={d.color} opacity="0.6" />
            <text x={68 + w} y={y + 14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{d.sqft} ft²</text>
            <text x={68 + w + 55} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{d.use}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BulkVsBagSVG() {
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Bulk mulch costs $25-55 per yard delivered. Bagged mulch costs $75-120 per yard equivalent. Crossover is at about 2 cubic yards.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Bulk delivery vs bags</text>
      <rect x="40" y="55" width="270" height="100" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="175" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>BULK DELIVERY</text>
      <text x="175" y="106" textAnchor="middle" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>$25–55/yd³</text>
      <text x="175" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>Minimum 2–3 yd³ · needs driveway access</text>
      <rect x="370" y="55" width="270" height="100" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="505" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>BAGS (2 cu ft)</text>
      <text x="505" y="106" textAnchor="middle" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>$3–6/bag</text>
      <text x="505" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>13.5 bags per yd³ · $75–120/yd³ equiv.</text>
      <text x="340" y="180" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">At 2+ cubic yards, bulk delivery saves 50-60% vs bags and eliminates 27+ trips from the car to the garden bed.</text>
    </svg>
  );
}

function MulchTypesSVG() {
  const types = [
    { label: "Hardwood bark", cost: "$30–45/yd³", life: "1–2 yr", note: "Most common, dark brown" },
    { label: "Cedar", cost: "$35–55/yd³", life: "2–3 yr", note: "Insect-repelling, aromatic" },
    { label: "Pine bark", cost: "$28–40/yd³", life: "1–2 yr", note: "Acidic, good for azaleas" },
    { label: "Rubber mulch", cost: "$80–120/yd³", life: "10+ yr", note: "Playgrounds, doesn't decompose" },
    { label: "River rock", cost: "$50–80/yd³", life: "Permanent", note: "No decomposition, weed barrier needed" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Mulch types comparison: hardwood bark is cheapest at $30-45 per yard, cedar lasts longest among organic options at 2-3 years, rubber mulch lasts 10+ years.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Mulch types compared</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Type",x:120},{l:"Cost (bulk)",x:290},{l:"Lasts",x:410},{l:"Notes",x:550}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="120" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="290" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.cost}</text>
          <text x="410" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{t.life}</text>
          <text x="550" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
        </g>
      )})}
    </svg>
  );
}

function ApplicationTipsSVG() {
  const tips = [
    { icon: "✓", label: "Keep mulch 3–6 inches away from tree trunks", sub: "Piling against bark causes rot ('volcano mulching')" },
    { icon: "✓", label: "Install landscape fabric under rock mulch only", sub: "Fabric under organic mulch traps moisture and causes problems" },
    { icon: "✓", label: "Water beds before mulching, not after", sub: "Wet soil under dry mulch retains moisture better" },
    { icon: "✗", label: "Don't dye-match existing old mulch", sub: "New and old mulch will look different regardless — refresh the whole bed" },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Mulch application tips: keep away from tree trunks, skip landscape fabric under organic mulch, water before mulching.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Application rules that save your plants</text>
      {tips.map((t, i) => {
        const y = 55 + i * 38;
        const isGood = t.icon === "✓";
        return (
          <g key={t.label}>
            <circle cx="40" cy={y + 10} r="10" fill={isGood ? "#EAF3DE" : "#FCEBEB"} />
            <text x="40" y={y + 15} textAnchor="middle" fontSize="12" fontWeight="700" fill={isGood ? "#2D7F46" : "#B53629"}>{t.icon}</text>
            <text x="60" y={y + 8} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
            <text x="60" y={y + 24} fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function MulchCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="University extension service guidelines (Clemson, Penn State, UMN) and MULCH product specs"
      />

      <h2>The complete guide to calculating mulch</h2>
      <p>Every April, the parking lots at Home Depot and Lowe&apos;s fill up with pickup trucks stacked with 2-cubic-foot bags of mulch. Those bags weigh about 20 pounds each. A typical 300 sq ft garden bed at 3 inches deep needs 2.8 cubic yards — that&apos;s 38 bags, 760 pounds, and at least 6 trips from the car to the garden bed. The same 2.8 yards delivered in bulk costs about $100 instead of $190 in bags and shows up in one dump truck load. The only reason to buy bags is if you need less than 2 yards or your driveway can&apos;t fit a dump truck.</p>

      <MethodologyNote>
        <p>
          Coverage formula: area (ft²) × depth (in) ÷ 324 = cubic yards.
          The 324 constant is 27 cubic feet per yard × 12 inches per foot.
          Bulk pricing reflects 2026 landscape supply yard rates in the
          Mid-Atlantic and Midwest. Bag pricing from Home Depot and
          Lowe&apos;s 2 cu ft bags. Mulch type characteristics from
          Clemson Cooperative Extension HGIC 1604 and Penn State
          Extension mulching guidelines.
        </p>
      </MethodologyNote>

      <h2>How far does mulch go?</h2>
      <Figure number={1} caption="Depth matters more than area. Going from 2 inches to 3 inches on a 500 sq ft bed adds 50% more mulch — roughly 1.5 extra cubic yards, or $45–75 more in material.">
        <DepthCoverageSVG />
      </Figure>
      <Callout label="The right depth">New beds: 3 inches for weed suppression. Annual refresh on existing beds: 1–2 inches to top off what decomposed. Playground surfaces: 4–6 inches for fall protection. Going deeper than 4 inches on garden beds is counterproductive — thick mulch mats down, repels water, and suffocates roots.</Callout>

      <h2>Bulk vs bags: when each makes sense</h2>
      <Figure number={2} caption="Bulk delivery costs 50-60% less per cubic yard than bags. The crossover point is about 2 cubic yards — under that, bags avoid the delivery fee and minimum order.">
        <BulkVsBagSVG />
      </Figure>

      <h2>Mulch types and what they cost</h2>
      <Figure number={3} caption="Organic mulches (bark, cedar, pine) decompose and need annual refreshing. Inorganic options (rubber, rock) last years but don't improve soil.">
        <MulchTypesSVG />
      </Figure>
      <ComparisonTable
        columns={[{title:"Organic mulch"},{title:"Inorganic (rock/rubber)"}]}
        rows={[
          {label:"Cost per year",values:["$30–55/yd³ annually","$50–120/yd³ once"]},
          {label:"Soil benefit",values:["Adds nutrients as it decomposes","None — sits on top permanently"]},
          {label:"Weed control",values:["Good for 1 season, then refresh","Good with fabric underneath"]},
          {label:"Best for",values:["Garden beds, trees, shrubs","Foundation plantings, xeriscape, paths"]},
        ]}
        caption="Organic mulch is cheaper per application but needs annual refresh. Rock costs more up front but is a one-time expense."
      />

      <Scenario location="Richmond, VA">
        A homeowner mulched 6 garden beds totaling 480 sq ft at 3 inches
        deep. She calculated 4.4 cubic yards and ordered 5 yards of
        hardwood bark delivered ($185 including delivery). Her neighbor
        across the street did the same size job with bags from Lowe&apos;s:
        60 bags at $3.48 each = $209, plus 4 hours loading and unloading.
        Bulk saved $24 in cost and a full afternoon of hauling. At anything
        over 3 yards the math isn&apos;t close.
      </Scenario>

      <h2>How to apply mulch without killing your plants</h2>
      <Figure number={4} caption="Four rules that protect your plants. The most common mistake — piling mulch against tree trunks — kills more trees than any disease.">
        <ApplicationTipsSVG />
      </Figure>
      <p>Volcano mulching — piling mulch into a cone against a tree trunk — is the single most common landscaping mistake in America. It holds moisture against the bark, promotes fungal growth, and can kill a mature tree in 3–5 years. Keep a 3–6 inch gap between mulch and any trunk or stem. The mulch ring should look like a donut, not a volcano.</p>
    </>
  );
}
