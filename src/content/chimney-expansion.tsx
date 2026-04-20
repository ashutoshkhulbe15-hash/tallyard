import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function FlueSizeSVG() {
  return (<svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Flue sizing: 1/10 of fireplace opening area for round flues, 1/8 for rectangular.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The 1/10 rule for chimney flue sizing</text>
    {[{label:"Round flue",rule:"Flue area ≥ 1/10 of fireplace opening",note:"Most efficient shape, used with metal liners",y:55},{label:"Rectangular flue",rule:"Flue area ≥ 1/8 of fireplace opening",note:"Clay tile liners, less efficient airflow",y:90},{label:"Wood stove",rule:"Match flue to stove collar diameter",note:"Typically 6\" or 8\" round",y:125}].map(r=>(<g key={r.label}><text x="160" y={r.y+6} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.label}</text><text x="170" y={r.y+6} fontSize="10" fill={GUIDE_SVG.inkMuted}>{r.rule}</text><text x="170" y={r.y+22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{r.note}</text></g>))}
  </svg>);
}
function HeightSVG() {
  return (<svg viewBox="0 0 680 100" width="100%" height="auto" role="img" aria-label="Chimney height: minimum 3 feet above roof penetration, 2 feet above anything within 10 feet.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Minimum chimney height (IRC R1003.9)</text>
    <text x="20" y="55" fontSize="11" fill={GUIDE_SVG.inkMuted}>At least 3 ft above the roof where it penetrates, AND at least 2 ft above anything within 10 ft horizontally.</text>
    <text x="20" y="80" fontSize="10" fill={GUIDE_SVG.inkFaint}>This is a fire safety code requirement, not a performance suggestion. Shorter chimneys backdraft.</text>
  </svg>);
}
function CostSVG() {
  return (<svg viewBox="0 0 680 100" width="100%" height="auto" role="img" aria-label="Chimney liner: $1,500-5,000 installed. Full chimney rebuild: $5,000-15,000.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Chimney project costs (2026)</text>
    {[{label:"Stainless liner install",cost:"$1,500–5,000",x:60},{label:"Cap + crown repair",cost:"$300–1,000",x:270},{label:"Full rebuild (above roof)",cost:"$5,000–15,000",x:470}].map(c=>(<g key={c.label}><rect x={c.x} y="50" width="170" height="35" rx="5" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={c.x+85} y="65" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>{c.label}</text><text x={c.x+85} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>{c.cost}</text></g>))}
  </svg>);
}
export function ChimneyCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="IRC R1003 (masonry chimneys) and NFPA 211 (chimneys and venting)" />
    <h2>Chimney sizing is a fire safety calculation, not a style choice</h2>
    <p>An undersized flue does not just reduce draft. It allows combustion gases (including carbon monoxide) to spill back into the room. An oversized flue drafts too strongly and wastes heat up the chimney. The correct flue size balances airflow so combustion gases exit efficiently while heat transfers to the room. For fireplaces, the sizing rule is simple: the flue cross-sectional area must be at least 1/10 of the fireplace opening area (for round flues) or 1/8 (for rectangular).</p>
    <Figure number={1} caption="The 1/10 rule: a fireplace opening of 36×24 inches (864 in²) needs a round flue with at least 86.4 in² of area — roughly a 10.5-inch diameter."><FlueSizeSVG /></Figure>
    <MethodologyNote><p>Flue sizing per IRC R1003.15 and NFPA 211. Height requirements per IRC R1003.9. Chimney cap and crown specs from Chimney Safety Institute of America (CSIA) guidelines.</p></MethodologyNote>
    <Figure number={2} caption="Height requirements are absolute minimums set by fire code. They ensure adequate draft and prevent roof fires from sparks."><HeightSVG /></Figure>
    <Figure number={3} caption="Relining with stainless steel is the most common chimney project. A full rebuild above the roofline is needed when masonry has deteriorated."><CostSVG /></Figure>
    <Callout label="Annual inspection: $150–300">CSIA recommends annual chimney inspection. Level 1 (visual, no tools) for regularly used chimneys. Level 2 (camera inspection) when selling a home or after a chimney fire. The inspection often pays for itself by catching deteriorated liners or cracked crowns before they cause water damage or fire.</Callout>
  </>);
}
