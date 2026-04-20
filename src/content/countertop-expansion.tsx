import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function MaterialsSVG() {
  const mats = [{label:"Laminate",cost:"$10–40/ft²",life:"10–15 yr"},{label:"Butcher block",cost:"$40–80/ft²",life:"20+ yr"},{label:"Quartz (engineered)",cost:"$50–120/ft²",life:"25+ yr"},{label:"Granite",cost:"$50–150/ft²",life:"50+ yr"},{label:"Marble",cost:"$75–200/ft²",life:"50+ yr"}];
  const headerY=65;const rowH=28;
  return (<svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Countertop materials: laminate $10-40, quartz $50-120, granite $50-150 per sq ft installed.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Countertop materials and cost (installed)</text>
    <rect x="60" y={headerY-18} width="560" height="26" rx="4" fill={GUIDE_SVG.bgWarm}/>
    {[{l:"Material",x:160},{l:"Cost/ft² (installed)",x:370},{l:"Lifespan",x:530}].map(h=>(<text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>))}
    {mats.map((m,i)=>{const y=headerY+10+i*rowH;return(<g key={m.label}>{i%2===0&&<rect x="60" y={y-4} width="560" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}<text x="160" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text><text x="370" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{m.cost}</text><text x="530" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{m.life}</text></g>)})}
  </svg>);
}
function MeasuringSVG() {
  return (<svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="Countertop measuring: length times depth, add overhangs, add island separately.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How to measure countertop area</text>
    {[{step:"1",label:"Measure each counter section length along the wall",y:55},{step:"2",label:"Standard depth is 25.5\" (with 1.5\" overhang from 24\" base cabinets)",y:80},{step:"3",label:"Add island separately: length × depth. Islands typically add 15-25 ft²",y:105}].map(s=>(<g key={s.step}><circle cx="30" cy={s.y+2} r="10" fill={GUIDE_SVG.accentSoft}/><text x="30" y={s.y+6} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>{s.step}</text><text x="50" y={s.y+6} fontSize="10" fill={GUIDE_SVG.ink}>{s.label}</text></g>))}
  </svg>);
}
function EdgeSVG() {
  return (<svg viewBox="0 0 680 100" width="100%" height="auto" role="img" aria-label="Edge profiles: eased is free/cheap, bullnose $5-10/LF, ogee $10-20/LF, waterfall $15-30/LF.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Edge profile costs (stone/quartz only)</text>
    {[{label:"Eased/straight",cost:"Included",x:50},{label:"Bullnose/half-round",cost:"$5–10/LF",x:210},{label:"Ogee/dupont",cost:"$10–20/LF",x:380},{label:"Waterfall/mitered",cost:"$15–30/LF",x:520}].map(e=>(<g key={e.label}><text x={e.x} y="55" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{e.label}</text><text x={e.x} y="72" fontSize="10" fill={GUIDE_SVG.accent}>{e.cost}</text></g>))}
  </svg>);
}
export function CountertopCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="MSI, Caesarstone, and Cambria quartz specs; granite industry pricing" />
    <h2>Countertops are priced by the square foot, but quoted by the slab</h2>
    <p>When you shop for stone or quartz countertops, the fabricator quotes a per-square-foot price that includes material, cutting, polishing, and installation. But the actual slab is rectangular, and your counter is L-shaped or U-shaped. The fabricator cuts your counter from the slab and the leftover pieces are waste. A 35 sq ft L-shaped counter might require a slab with 50 sq ft of usable surface. You pay for 35 sq ft but the slab cost includes the waste. This is why fabricator quotes vary: one shop nests your pieces efficiently on the slab, another wastes more and charges more.</p>
    <Figure number={1} caption="Standard counter depth is 25.5 inches. Multiply each section length by the depth, convert to sq ft, add the island separately."><MeasuringSVG /></Figure>
    <MethodologyNote><p>Area = sum of all section lengths × depth (25.5&quot; standard) ÷ 144. Island added separately. Standard overhang: 1.5&quot; at front, 0&quot; at wall. Pricing reflects 2026 fabricator rates for templated, cut, polished, and installed countertops.</p></MethodologyNote>
    <Figure number={2} caption="Material choice is the biggest cost driver. Laminate at $10-40/ft² vs marble at $75-200/ft² can mean a $3,000 vs $10,000 kitchen."><MaterialsSVG /></Figure>
    <Figure number={3} caption="Edge profiles add $5-30 per linear foot on stone/quartz. A 15 LF kitchen with ogee edges adds $150-300 to the project."><EdgeSVG /></Figure>
    <ComparisonTable columns={[{title:"Quartz"},{title:"Granite"},{title:"Marble"}]} rows={[{label:"Maintenance",values:["None (non-porous)","Seal annually","Seal every 6 months"]},{label:"Heat resistance",values:["Moderate (use trivet)","Excellent","Excellent"]},{label:"Scratch resistance",values:["Excellent","Good","Poor (soft stone)"]},{label:"Stain resistance",values:["Excellent","Good (if sealed)","Poor (etches from acid)"]}]} caption="Quartz is the low-maintenance default. Granite for heat resistance. Marble for beauty if you accept the upkeep." />
    <Callout label="Get a template, not just a quote">Reputable fabricators template your counters with a laser or digital measurer before cutting. This captures every angle, outlet cutout, and sink opening precisely. A quote without templating is a guess. Template visits are usually free if you order from that fabricator.</Callout>
    <p>For cabinet sizing underneath, use the <a href="/kitchen-cabinet-calculator">kitchen cabinet calculator</a>.</p>
  </>);
}
