import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function GridSpacingSVG() {
  const spacings = [
    { label: "12\" OC grid", bars: "More steel, stronger", use: "Driveways, structural slabs", color: GUIDE_SVG.accent },
    { label: "16\" OC grid", bars: "Standard residential", use: "Patios, walkways, pool decks", color: GUIDE_SVG.inkMuted },
    { label: "18\" OC grid", bars: "Moderate", use: "Light-duty slabs", color: GUIDE_SVG.slate },
    { label: "24\" OC grid", bars: "Minimum steel", use: "Non-structural, decorative", color: GUIDE_SVG.inkFaint },
  ];
  return (<svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Rebar grid spacing: 12 OC for driveways, 16 OC standard, 24 OC minimum.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Grid spacing by application</text>
    <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Tighter grid = more rebar = stronger slab. Most residential uses 16&quot; OC.</text>
    {spacings.map((s,i)=>{const y=60+i*30;return(<g key={s.label}><text x="120" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><rect x="130" y={y} width={200} height="20" rx="3" fill={s.color} opacity="0.5"/><text x="340" y={y+14} fontSize="10" fill={GUIDE_SVG.ink}>{s.use}</text></g>)})}
  </svg>);
}
function BarSizesSVG() {
  return (<svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Rebar sizes: #3 (3/8 inch) for patios, #4 (1/2 inch) for driveways, #5 (5/8 inch) for structural.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Common rebar sizes</text>
    {[{size:"#3 (3/8\")",diam:"0.375\"",weight:"0.376 lb/ft",use:"Patios, walkways",y:55},{size:"#4 (1/2\")",diam:"0.500\"",weight:"0.668 lb/ft",use:"Driveways, garage slabs",y:85},{size:"#5 (5/8\")",diam:"0.625\"",weight:"1.043 lb/ft",use:"Structural, footings, walls",y:115}].map(r=>(<g key={r.size}><text x="110" y={r.y+14} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.size}</text><text x="120" y={r.y+8} fontSize="10" fill={GUIDE_SVG.inkMuted}>⌀{r.diam} · {r.weight}</text><text x="120" y={r.y+24} fontSize="10" fill={GUIDE_SVG.inkFaint}>{r.use}</text></g>))}
  </svg>);
}
function LapSpliceSVG() {
  return (<svg viewBox="0 0 680 100" width="100%" height="auto" role="img" aria-label="Lap splice length: 30 diameters minimum. #4 bar needs 15 inch overlap.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Lap splice: where two bars overlap</text>
    <text x="20" y="50" fontSize="11" fill={GUIDE_SVG.inkMuted}>Minimum overlap = 30× bar diameter. #3 bar: 12&quot;. #4 bar: 15&quot;. #5 bar: 19&quot;.</text>
    <text x="20" y="75" fontSize="10" fill={GUIDE_SVG.inkFaint}>Every splice wastes material. Factor 10-15% extra for splices when ordering.</text>
  </svg>);
}
export function RebarCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="ACI 318, CRSI design guides, and IRC residential footing requirements" />
    <h2>Rebar turns a concrete slab from brittle to resilient</h2>
    <p>Concrete is strong in compression (it holds up weight) but weak in tension (it cracks when pulled or bent). Rebar handles the tension. A reinforced slab distributes load across the entire grid, so a crack at one point does not propagate across the surface. An unreinforced driveway slab cracks the first time a heavy truck parks on an edge. A reinforced one holds.</p>
    <Figure number={1} caption="Grid spacing determines how much rebar goes in the slab. 16-inch OC is standard for most residential work. Driveways and structural slabs use 12-inch."><GridSpacingSVG /></Figure>
    <MethodologyNote><p>Grid calculations: bars in each direction = (slab dimension ÷ spacing) + 1. Total length = bars × slab width (for one direction) + bars × slab length (for the other). Sticks = total length ÷ 20 ft. Lap splice requirements per ACI 318-19 Section 25.5.</p></MethodologyNote>
    <Figure number={2} caption="Residential slabs almost always use #3 or #4 rebar. #5 and larger are for structural footings, retaining walls, and commercial work."><BarSizesSVG /></Figure>
    <Callout label="Rebar must sit in the middle third of the slab">Set rebar on chairs or dobies (small concrete blocks) so it sits in the middle third of the slab thickness. Rebar on the ground does nothing for crack control. For a 4-inch slab, the rebar should be 1.5 to 2 inches above the subgrade. Chairs cost $0.10 each and space every 3 to 4 feet along each bar.</Callout>
    <Figure number={3} caption="When two bars meet, they overlap by at least 30 bar diameters. This overlap wastes material, so add 10-15% to your order."><LapSpliceSVG /></Figure>
    <Scenario location="Sacramento, CA">A contractor ordered rebar for a 20×30 driveway at 16&quot; OC grid (#4 bar). Calculated: 23 bars in each direction, ~720 linear feet, 36 sticks of 20-foot rebar. He ordered exactly 36 sticks. After accounting for lap splices at every joint (15 inches per splice, 12 splices), he was 3 sticks short. The 10% waste factor would have been 4 extra sticks ($40). Instead he made a second trip to the supply yard ($30 gas + 2 hours).</Scenario>
    <p>For the concrete volume underneath, use the <a href="/concrete-calculator">concrete calculator</a>. Rebar and concrete are always estimated together since thickness affects both the concrete yards and the rebar grid spacing.</p>
  </>);
}
