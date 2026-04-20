import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function JointWidthSVG() {
  return (<svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Grout usage increases dramatically with wider joints.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How joint width changes grout quantity</text>
    {[{width:'1/16"',lbPerFt:"0.4",use:"Rectified tile, minimal joint",y:55},{width:'1/8"',lbPerFt:"0.7",use:"Standard — most common",y:85},{width:'1/4"',lbPerFt:"1.7",use:"Rustic look, natural stone",y:115},{width:'3/8"',lbPerFt:"2.8",use:"Saltillo, handmade tile",y:145}].map(j=>(<g key={j.width}><text x="80" y={j.y+14} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{j.width}</text><rect x="90" y={j.y} width={j.lbPerFt as unknown as number * 80} height="20" rx="3" fill={GUIDE_SVG.accent} opacity="0.5"/><text x={98+parseFloat(j.lbPerFt)*80} y={j.y+14} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{j.lbPerFt} lb/ft² (12×12 tile)</text><text x={98+parseFloat(j.lbPerFt)*80+130} y={j.y+14} fontSize="9" fill={GUIDE_SVG.inkFaint}>{j.use}</text></g>))}
  </svg>);
}
function TypeSVG() {
  return (<svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="Sanded grout for joints over 1/8 inch, unsanded for 1/8 and narrower, epoxy for wet areas.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Grout type by joint width</text>
    {[{type:"Unsanded",joint:"1/8\" and narrower",best:"Polished tile, glass mosaic, walls",x:50},{type:"Sanded",joint:"1/8\" to 1/2\"",best:"Floors, natural stone, most residential",x:260},{type:"Epoxy",joint:"Any width",best:"Showers, pools, food-prep areas",x:470}].map(t=>(<g key={t.type}><rect x={t.x} y="50" width="180" height="50" rx="6" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={t.x+90} y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.ink}>{t.type}: {t.joint}</text><text x={t.x+90} y="88" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.best}</text></g>))}
  </svg>);
}
function SealingSVG() {
  return (<svg viewBox="0 0 680 80" width="100%" height="auto" role="img" aria-label="Seal grout 72 hours after installation. Re-seal annually in showers.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Sealing schedule</text>
    <text x="20" y="50" fontSize="11" fill={GUIDE_SVG.inkMuted}>First seal: 48–72 hours after grouting (after full cure).</text>
    <text x="20" y="70" fontSize="11" fill={GUIDE_SVG.inkMuted}>Re-seal: annually in showers/wet areas, every 2–3 years on floors. Epoxy grout: no sealing needed.</text>
  </svg>);
}
export function GroutCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="TCNA Handbook and Mapei/Laticrete grout product specifications" />
    <h2>Joint width doubles, grout quantity nearly triples</h2>
    <p>Grout usage is not linear with joint width. Doubling the joint from 1/8 inch to 1/4 inch does not double the grout; it nearly triples it because grout fills a rectangular cross-section (width × depth), and both dimensions increase together. A 100 square foot floor with 12×12 tile and 1/8-inch joints needs about 2 bags of grout. The same floor with 1/4-inch joints needs 5 bags. That is a real cost and time difference.</p>
    <Figure number={1} caption="The relationship is not linear. Small changes in joint width create large changes in grout volume."><JointWidthSVG /></Figure>
    <MethodologyNote><p>Grout coverage calculated from joint cross-section geometry: (joint width × joint depth × tile perimeter) ÷ tile face area × density. Standard grout density ~100 lb/ft³. Coverage per bag from Mapei Keracolor and Laticrete Permacolor product data sheets.</p></MethodologyNote>
    <Figure number={2} caption="Match grout type to joint width. Sanded grout in narrow joints is hard to work. Unsanded in wide joints cracks."><TypeSVG /></Figure>
    <Callout label="Sanded vs unsanded is not a preference">Sanded grout contains fine sand that fills the joint and prevents shrinkage cracking in widths over 1/8 inch. Unsanded grout is smooth paste that works into narrow joints but shrinks and cracks in anything wider than 1/8 inch. Using the wrong type is the most common grout failure. It is not a style choice.</Callout>
    <Figure number={3} caption="Seal sanded and unsanded grout after curing. Epoxy grout is self-sealing and never needs reapplication."><SealingSVG /></Figure>
    <p>For the tile quantity itself, use the <a href="/tile-calculator">tile calculator</a>. For shower-specific layouts with three walls and a floor, the <a href="/shower-tile-calculator">shower tile calculator</a> handles the geometry.</p>
  </>);
}
