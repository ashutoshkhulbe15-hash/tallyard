import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function LayoutSVG() {
  return (<svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Backsplash area = counter length times height, minus window and outlet openings.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Measuring backsplash area</text>
    {[{step:"1",label:"Measure total counter length along the wall",y:55},{step:"2",label:"Standard height: 18\" (counter to upper cabinets) or full height to ceiling",y:80},{step:"3",label:"Subtract window openings and outlet covers (each ~0.5 ft²)",y:105}].map(s=>(<g key={s.step}><circle cx="30" cy={s.y+2} r="10" fill={GUIDE_SVG.accentSoft}/><text x="30" y={s.y+6} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>{s.step}</text><text x="50" y={s.y+6} fontSize="10" fill={GUIDE_SVG.ink}>{s.label}</text></g>))}
  </svg>);
}
function MaterialsSVG() {
  return (<svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Backsplash materials: ceramic $2-8, glass mosaic $8-25, natural stone $10-30, peel-and-stick $3-10.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Popular backsplash materials</text>
    {[{label:"Ceramic/porcelain subway",cost:"$2–8/ft²",note:"Classic, DIY-friendly",y:55},{label:"Glass mosaic sheets",cost:"$8–25/ft²",note:"Modern, reflective, harder to cut",y:85},{label:"Natural stone (marble, travertine)",cost:"$10–30/ft²",note:"Premium, needs sealing",y:115},{label:"Peel-and-stick tile",cost:"$3–10/ft²",note:"Rental-friendly, removable",y:145}].map(m=>(<g key={m.label}><text x="240" y={m.y+6} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text><text x="250" y={m.y+6} fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{m.cost}</text><text x="250" y={m.y+22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{m.note}</text></g>))}
  </svg>);
}
function CostSVG() {
  return (<svg viewBox="0 0 680 100" width="100%" height="auto" role="img" aria-label="Typical kitchen backsplash: 25-35 sq ft, $200-600 DIY, $500-1,500 installed.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What a kitchen backsplash costs</text>
    {[{label:"Small (20 ft²)",diy:"$100–250",pro:"$350–800",x:60},{label:"Standard (30 ft²)",diy:"$200–450",pro:"$500–1,200",x:270},{label:"Large/L-shaped (50 ft²)",diy:"$350–750",pro:"$800–2,000",x:470}].map(s=>(<g key={s.label}><rect x={s.x} y="50" width="170" height="35" rx="5" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={s.x+85} y="65" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><text x={s.x+85} y="80" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>DIY {s.diy} · Pro {s.pro}</text></g>))}
  </svg>);
}
export function BacksplashCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="TCNA installation standards and tile supplier pricing" />
    <h2>Kitchen backsplash: the smallest tile job with the biggest visual impact</h2>
    <p>A kitchen backsplash covers 25 to 35 square feet in a typical kitchen. That is small enough to complete in a weekend and cheap enough (under $500 in materials for most kitchens) to justify premium tile choices that would be prohibitively expensive on a full floor. It is the one tile project where DIY is genuinely practical for beginners because the area is small, the cuts are simple, and mistakes affect a $5 tile, not a $5,000 floor.</p>
    <Figure number={1} caption="Measure counter length, multiply by height (usually 18 inches from counter to cabinets), subtract openings."><LayoutSVG /></Figure>
    <MethodologyNote><p>Area calculation: total linear inches of counter × backsplash height in inches ÷ 144 = square feet. Subtract 0.5 ft² per outlet and window opening. Add 10% waste for straight layouts, 15% for diagonal or herringbone. Pricing from Floor &amp; Decor and Home Depot 2026 retail.</p></MethodologyNote>
    <Figure number={2} caption="Subway tile dominates the backsplash market because it is cheap, timeless, and easy to cut with a score-and-snap tool."><MaterialsSVG /></Figure>
    <Figure number={3} caption="A standard 30 sq ft backsplash costs $200-450 DIY or $500-1,200 installed. The labor premium is high relative to materials because backsplash installation involves many precision cuts."><CostSVG /></Figure>
    <Callout label="Subway tile layout trick">Start your first row at the counter, not at the cabinet. The bottom row is the most visible and should be full tiles. The top row (where it meets the cabinets) can be cut. Nobody sees the top edge once the cabinets are closed. If you start from the top, the visible bottom row gets the awkward cut.</Callout>
    <p>For grout quantities, use the <a href="/grout-calculator">grout calculator</a>. For full floor tile in the same kitchen, the <a href="/tile-calculator">tile calculator</a> handles the larger area.</p>
  </>);
}
