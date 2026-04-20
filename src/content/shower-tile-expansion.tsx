import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function ThreeWallSVG() {
  return (<svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Shower tile covers back wall plus two side walls plus optional floor.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What gets tiled in a shower</text>
    {[{label:"Back wall",formula:"Width × tile height",y:55},{label:"Two side walls",formula:"2 × depth × tile height",y:85},{label:"Floor (walk-in only)",formula:"Width × depth",y:115}].map(s=>(<g key={s.label}><text x="180" y={s.y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text><text x="190" y={s.y+14} fontSize="10" fill={GUIDE_SVG.inkMuted}>{s.formula}</text></g>))}
  </svg>);
}
function WaterproofingSVG() {
  return (<svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="Waterproofing options: Kerdi membrane, RedGard liquid, or Hydroban.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waterproofing goes UNDER the tile</text>
    {[{method:"Schluter Kerdi",type:"Sheet membrane",cost:"$1.50–2.50/ft²",x:50},{method:"RedGard",type:"Liquid-applied",cost:"$0.75–1.25/ft²",x:260},{method:"Laticrete Hydroban",type:"Liquid-applied",cost:"$0.80–1.50/ft²",x:470}].map(w=>(<g key={w.method}><rect x={w.x} y="50" width="180" height="50" rx="6" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1"/><text x={w.x+90} y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.ink}>{w.method}</text><text x={w.x+90} y="88" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{w.type} · {w.cost}</text></g>))}
  </svg>);
}
function NicheSVG() {
  return (<svg viewBox="0 0 680 80" width="100%" height="auto" role="img" aria-label="Shower niche: subtract the niche opening from wall area, but add the niche interior surfaces.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Niches: less wall tile, more small cuts</text>
    <text x="20" y="50" fontSize="11" fill={GUIDE_SVG.inkMuted}>A 12×24&quot; niche subtracts 2 ft² from the wall but adds ~3.5 ft² of interior surfaces (back, sides, top, bottom, sill).</text>
    <text x="20" y="70" fontSize="10" fill={GUIDE_SVG.inkFaint}>Net effect: about 1.5 ft² more tile than a flat wall, plus 6 additional cuts. Budget extra waste.</text>
  </svg>);
}
export function ShowerTileCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="TCNA Handbook and Schluter/Laticrete waterproofing specifications" />
    <h2>Shower tile is a waterproofing job with tile on top</h2>
    <p>The tile in your shower is decorative. The waterproofing membrane underneath is what actually keeps water out of your walls. Every failed shower tile job (mold behind the wall, rotted studs, water stains on the ceiling below) is a waterproofing failure, not a tile failure. The membrane must cover every square inch of the shower enclosure with sealed seams at every corner, every niche, and every penetration for the shower valve and showerhead.</p>
    <Figure number={1} caption="The calculator measures three surfaces: back wall, two side walls, and optional floor. Tile height is adjustable from tub surround (6 ft) to floor-to-ceiling (8 ft)."><ThreeWallSVG /></Figure>
    <MethodologyNote><p>Area calculations use the standard tub/shower dimensions (60×30 for tub combo, 36×48 for walk-in) with user-adjustable tile height. Waste factor of 12% accounts for cuts at corners and around plumbing penetrations. Waterproofing quantities from Schluter and Laticrete installation guides.</p></MethodologyNote>
    <Figure number={2} caption="Three common waterproofing systems. Sheet membrane (Kerdi) is faster to install. Liquid-applied (RedGard) is cheaper but requires two coats with drying time between."><WaterproofingSVG /></Figure>
    <Figure number={3} caption="Niches add complexity and cost. The net tile area increases slightly, but the number of precision cuts increases significantly."><NicheSVG /></Figure>
    <Callout label="Cement backer board is not waterproof">This is the single most misunderstood fact in bathroom tiling. Durock and HardieBacker are moisture-resistant, not waterproof. Water passes through them. You must apply a waterproof membrane (Kerdi, RedGard, Hydroban) over the backer board before tiling. Skipping this step is the #1 cause of shower failures.</Callout>
    <p>For floor tile outside the shower, use the <a href="/tile-calculator">tile calculator</a>. For grout quantities, the <a href="/grout-calculator">grout calculator</a> handles any tile size and joint width combination.</p>
  </>);
}
