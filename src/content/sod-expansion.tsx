import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function CoverageSVG() {
  return (<svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Sod coverage: 1 pallet covers 400-700 sq ft depending on slab size.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How sod is sold</text>
    {[{label:"Individual slabs (16×24\")",sqft:"2.67 ft² each",note:"Buy by the piece for small patches",y:55},{label:"Rolls (2×5 ft)",sqft:"10 ft² each",note:"Easier to lay, fewer seams",y:85},{label:"Pallet",sqft:"400–700 ft² per pallet",note:"Best price per ft²; delivered by truck",y:115}].map(s=>(<g key={s.label}><text x="215" y={s.y+6} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><text x="225" y={s.y+6} fontSize="10" fill={GUIDE_SVG.accent} fontWeight="600">{s.sqft}</text><text x="225" y={s.y+22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.note}</text></g>))}
  </svg>);
}
function PrepSVG() {
  return (<svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Sod prep: kill weeds, grade soil, add 2 inches topsoil, rake smooth, water before laying.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Ground prep before sod goes down</text>
    {[{step:"1",label:"Kill existing weeds/grass (herbicide or sod cutter)",y:55},{step:"2",label:"Grade soil: slope away from foundation at 1% minimum",y:80},{step:"3",label:"Add 2–4 inches of screened topsoil if existing soil is poor",y:105},{step:"4",label:"Rake smooth, remove rocks, water lightly the day before",y:130}].map(s=>(<g key={s.step}><circle cx="30" cy={s.y+2} r="10" fill={GUIDE_SVG.accentSoft}/><text x="30" y={s.y+6} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>{s.step}</text><text x="50" y={s.y+6} fontSize="10" fill={GUIDE_SVG.ink}>{s.label}</text></g>))}
  </svg>);
}
function CostSVG() {
  return (<svg viewBox="0 0 680 110" width="100%" height="auto" role="img" aria-label="Sod cost: $0.30-0.80 per sq ft material, $1-2 installed.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Sod cost (2026)</text>
    {[{label:"Material (per ft²)",cost:"$0.30–0.80",x:80},{label:"Installed (per ft²)",cost:"$1.00–2.00",x:310},{label:"1,000 ft² lawn (installed)",cost:"$1,000–2,000",x:480}].map(s=>(<g key={s.label}><rect x={s.x} y="50" width="160" height="40" rx="6" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={s.x+80} y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><text x={s.x+80} y="83" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>{s.cost}</text></g>))}
  </svg>);
}
export function SodCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="Turfgrass Producers International and university extension lawn establishment guides" />
    <h2>Sod gives you a lawn in a day, but the prep takes a week</h2>
    <p>The appeal of sod is instant gratification. Seed takes 2 to 3 weeks to germinate and 8 to 12 weeks to fill in. Sod is a finished lawn the day it goes down. But that instant lawn only survives if the ground underneath is properly prepared. Sod laid over compacted clay, old grass, or rocky soil dies within 30 days because the roots cannot penetrate. Prep is 80 percent of a successful sod installation.</p>
    <Figure number={1} caption="Buy by the pallet for large areas. Individual slabs for patches. Always order 5% extra for cuts at edges and curves."><CoverageSVG /></Figure>
    <MethodologyNote><p>Slab counts use the standard slab size (16×24 inches = 2.67 ft²) or roll size (2×5 ft = 10 ft²). Pallet coverage varies by farm; confirm with your supplier. Pricing reflects 2026 sod farm and landscape supply pricing across the Southeast and Midwest.</p></MethodologyNote>
    <Figure number={2} caption="Ground prep determines whether the sod lives or dies. These four steps are non-negotiable."><PrepSVG /></Figure>
    <Callout label="Install sod the day it arrives">Sod is a living product. It starts dying the moment it is harvested. In summer heat, a pallet of sod that sits for 24 hours begins yellowing on the inside. Order delivery for the morning you plan to install, and finish laying before sunset. Water immediately after laying, then daily for the first two weeks.</Callout>
    <Figure number={3} caption="Material runs $0.30-0.80/ft² depending on grass type. Bermuda and fescue are cheapest. Zoysia and St. Augustine cost more."><CostSVG /></Figure>
    <p>For soil preparation, the <a href="/topsoil-calculator">topsoil calculator</a> estimates how many yards of screened soil to add. For larger landscape projects that include garden beds, use the <a href="/mulch-calculator">mulch calculator</a> alongside this one.</p>
  </>);
}
