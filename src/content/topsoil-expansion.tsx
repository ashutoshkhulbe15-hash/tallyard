import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function DepthSVG() {
  return (<svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Topsoil depth: 2 inches for overseeding, 4-6 for new garden beds, 8-12 for raised beds.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How deep to go</text>
    {[{label:"Overseeding / top-dress",depth:'1–2"',y:55},{label:"New garden beds",depth:'4–6"',y:85},{label:"Raised beds / new lawn",depth:'8–12"',y:115}].map(d=>(<g key={d.label}><text x="220" y={d.y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{d.label}</text><rect x="230" y={d.y} width={parseInt(d.depth)*18} height="20" rx="3" fill={GUIDE_SVG.accent} opacity="0.5"/><text x={238+parseInt(d.depth)*18} y={d.y+14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{d.depth}</text></g>))}
  </svg>);
}
function CostSVG() {
  return (<svg viewBox="0 0 680 110" width="100%" height="auto" role="img" aria-label="Topsoil costs $20-40 per cubic yard bulk, $4-7 per bag.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Topsoil pricing (2026)</text>
    {[{label:"Bulk (per yd³)",cost:"$20–40",note:"Delivery $50–100",x:80},{label:"Bags (40 lb)",cost:"$4–7 each",note:"~1 cu ft per bag",x:310},{label:"Screened/amended",cost:"$35–60/yd³",note:"Premium garden mix",x:480}].map(s=>(<g key={s.label}><rect x={s.x} y="50" width="160" height="45" rx="6" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={s.x+80} y="70" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}: {s.cost}</text><text x={s.x+80} y="85" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.note}</text></g>))}
  </svg>);
}
function QualitySVG() {
  return (<svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="Topsoil quality: screened is best for gardens, fill-grade for grading only.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Know what you are ordering</text>
    {[{label:"Fill-grade",desc:"Cheap, may contain clay/rocks. Grading only.",y:55},{label:"Screened",desc:"Sifted to remove debris. Standard for gardens.",y:80},{label:"Amended/garden mix",desc:"Screened + compost. Ready to plant.",y:105}].map(q=>(<g key={q.label}><text x="140" y={q.y+10} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{q.label}</text><text x="150" y={q.y+10} fontSize="10" fill={GUIDE_SVG.inkMuted}>{q.desc}</text></g>))}
  </svg>);
}
export function TopsoilCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="USDA soil classification and landscape supply industry standards" />
    <h2>Topsoil is not all the same, and the cheap stuff costs you twice</h2>
    <p>Topsoil comes in three grades: fill, screened, and amended. Fill-grade topsoil is the cheapest ($20-25/yd³) and the worst for planting. It contains clay clumps, rocks, and sometimes construction debris. Order it for grading and filling low spots, never for gardens. Screened topsoil ($30-40/yd³) is sifted through a mesh to remove debris. It is the standard for new garden beds and lawn areas. Amended topsoil ($35-60/yd³) is screened soil mixed with compost, making it ready to plant without additional amendment.</p>
    <Figure number={1} caption="Depth depends on what you are growing. Grass needs 4-6 inches of quality soil. Vegetable gardens need 8-12 inches."><DepthSVG /></Figure>
    <MethodologyNote><p>Volume: area (ft²) × depth (in) ÷ 324 = cubic yards. Same formula as mulch. Bulk pricing from landscape supply yards, 2026. Bag counts use 1 cu ft per 40-lb bag (27 bags per cubic yard).</p></MethodologyNote>
    <Figure number={2} caption="Bulk is 60-70% cheaper per yard than bags. At 2+ yards, order bulk."><CostSVG /></Figure>
    <Figure number={3} caption="Always ask what grade you are getting. 'Topsoil' without a qualifier could be anything from screened garden soil to construction backfill."><QualitySVG /></Figure>
    <Callout label="Test before you buy">Ask for a sample before ordering 10 yards. Squeeze a handful: good topsoil holds together when moist but crumbles when poked. If it forms a hard ball like clay or falls apart like sand, it needs amendment. A $15 soil test from your county extension office tells you pH and nutrient levels.</Callout>
    <p>For mulch to go on top of the soil, use the <a href="/mulch-calculator">mulch calculator</a>. For raised bed projects that need both soil and lumber, the <a href="/lumber-calculator">lumber calculator</a> estimates the frame.</p>
  </>);
}
