import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function BricksPerSqFtSVG() {
  const sizes = [
    { label: "Standard (3.5×2.25×8\")", count: "6.75", color: GUIDE_SVG.accent },
    { label: "Modular (3.5×2.25×7.5\")", count: "7.0", color: GUIDE_SVG.inkMuted },
    { label: "King (3×2.75×9.75\")", count: "5.0", color: GUIDE_SVG.slate },
  ];
  return (<svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Bricks per sq ft by size.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Bricks per square foot (with 3/8&quot; mortar joint)</text>
    {sizes.map((s,i)=>{const y=55+i*30;return(<g key={s.label}><text x="240" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><rect x="250" y={y} width={parseFloat(s.count)*30} height="20" rx="3" fill={s.color} opacity="0.6"/><text x={258+parseFloat(s.count)*30} y={y+14} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{s.count} bricks/ft²</text></g>)})}
  </svg>);
}
function MortarSVG() {
  return (<svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="Mortar: 7 bags per 1000 bricks for standard joint.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Mortar needed</text>
    <text x="20" y="50" fontSize="11" fill={GUIDE_SVG.inkMuted}>Standard 3/8&quot; joint: ~7 bags (80 lb) of Type S mortar per 1,000 bricks</text>
    <text x="20" y="70" fontSize="11" fill={GUIDE_SVG.inkMuted}>Wider 1/2&quot; joint: ~9 bags per 1,000 bricks</text>
    <text x="20" y="95" fontSize="10" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Type S mortar is standard for exterior walls. Type N for interior and above-grade only.</text>
  </svg>);
}
function BrickCostSVG() {
  return (<svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Brick cost: $0.50-1.50 each, $6-12 per sq ft installed.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Brick cost (2026)</text>
    {[{label:"Material only",cost:"$0.50–1.50/brick",sub:"$3–10/ft²",x:50},{label:"Installed",cost:"$10–25/ft²",sub:"Including mortar + labor",x:260},{label:"Veneer (thin brick)",cost:"$6–15/ft²",sub:"Over existing wall",x:470}].map(s=>(<g key={s.label}><rect x={s.x} y="50" width="180" height="55" rx="6" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={s.x+90} y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><text x={s.x+90} y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>{s.cost}</text></g>))}
  </svg>);
}
export function BrickCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="BIA Technical Notes, ASTM C62/C216 brick classifications" />
    <h2>Brick counts depend on three things you have to decide first</h2>
    <p>Before counting bricks, you need to know your brick size (standard, modular, or king), your mortar joint width (3/8 inch is standard, 1/2 inch is common for rustic looks), and your bond pattern (running bond, stack bond, or Flemish). Each combination produces a different count per square foot. The calculator above handles all three variables, but understanding them helps you verify the output against a supplier quote.</p>
    <Figure number={1} caption="Standard bricks run about 6.75 per square foot with a 3/8-inch joint. King-size bricks are larger and need only 5 per square foot."><BricksPerSqFtSVG /></Figure>
    <MethodologyNote><p>Brick counts per ft² calculated from brick face dimensions plus mortar joint width. Mortar quantities from Brick Industry Association (BIA) Technical Note 8. Pricing reflects 2026 masonry supply yard rates.</p></MethodologyNote>
    <Figure number={2} caption="Mortar is the forgotten material. A 200 sq ft wall needs about 1,350 bricks and 10 bags of mortar."><MortarSVG /></Figure>
    <Callout label="Add 5-10% waste">Bricks break during cutting and handling. Order 5% extra for walls with few openings, 10% for walls with multiple windows, arches, or decorative patterns. Brick dye lots vary between production runs. Order everything from one batch.</Callout>
    <h2>What brick walls cost</h2>
    <Figure number={3} caption="Full brick walls cost $10-25/ft² installed. Thin brick veneer over existing walls costs $6-15/ft² and gives the same appearance."><BrickCostSVG /></Figure>
    <Scenario location="Philadelphia, PA">A homeowner calculated 1,800 bricks for a 250 sq ft garden wall (7.2 bricks/ft² with 3/8&quot; joints). He ordered exactly 1,800. By the time the mason cut bricks for the cap row and around a gate opening, 87 bricks were wasted as unusable halves and chips. He was 60 bricks short and waited a week for the same color batch. An extra 10% (180 bricks, $135) would have avoided the delay.</Scenario>
    <ComparisonTable columns={[{title:"Full brick"},{title:"Brick veneer"},{title:"Faux brick panel"}]} rows={[{label:"Thickness",values:["3.5–4\"","0.5–1\"","0.25\""]},{label:"Structural?",values:["Yes","No (decorative)","No"]},{label:"Cost/ft²",values:["$10–25","$6–15","$3–8"]},{label:"Installation",values:["Mason required","Mason or skilled DIY","DIY-friendly"]}]} caption="Full brick is structural and permanent. Veneer gives the look at a fraction of the weight and cost." />
    <p>For the mortar and footing calculations, the <a href="/concrete-calculator">concrete calculator</a> handles the footing volume. For walls that combine brick with concrete block backup, calculate each material separately.</p>
    <h2>How to calculate mortar for brick walls</h2>
    <p>Mortar quantity depends on joint width and brick size. For standard bricks (3.5 × 2.25 × 8 inches) with 3/8-inch joints, you need approximately 7 bags of 80-lb Type S mortar per 1,000 bricks. With wider 1/2-inch joints (common in rustic or colonial styles), that increases to about 9 bags per 1,000 bricks. A 200 square foot wall using 1,350 bricks needs roughly 10 bags of mortar at standard joint width.</p>
    <p>Type S mortar is the default for exterior walls and any structural application. Type N is acceptable for interior walls and above-grade non-structural work. Type M is for below-grade applications like retaining walls and foundation repairs. Using the wrong mortar type does not just affect strength; it affects bond durability and water resistance over the life of the wall.</p>
  </>);
}
