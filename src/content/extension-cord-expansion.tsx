import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function GaugeSVG() {
  return (<svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Extension cord gauge: 16 AWG for light duty, 14 AWG standard, 12 AWG heavy, 10 AWG industrial.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Extension cord gauge guide</text>
    {[{gauge:"16 AWG",amps:"10A max",use:"Lamps, phone chargers, fans",length:"Up to 50 ft",y:55},{gauge:"14 AWG",amps:"15A max",use:"Power tools, vacuums, heaters",length:"Up to 50 ft",y:85},{gauge:"12 AWG",amps:"20A max",use:"Table saws, compressors, welders",length:"Up to 100 ft",y:115}].map(g=>(<g key={g.gauge}><text x="65" y={g.y+10} fontSize="13" fontWeight="700" fill={GUIDE_SVG.accent}>{g.gauge}</text><text x="140" y={g.y+4} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{g.amps} · {g.use}</text><text x="140" y={g.y+20} fontSize="9" fill={GUIDE_SVG.inkFaint}>{g.length}</text></g>))}
  </svg>);
}
function VoltageSVG() {
  return (<svg viewBox="0 0 680 80" width="100%" height="auto" role="img" aria-label="Voltage drop: keep under 5%. Longer cords need thicker gauge.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Voltage drop and why cord length matters</text>
    <text x="20" y="55" fontSize="11" fill={GUIDE_SVG.inkMuted}>NEC recommends total voltage drop under 5%. A 100-foot 16 AWG cord drops 8% at 10A — too much. Use 12 AWG for long runs.</text>
    <text x="20" y="75" fontSize="10" fill={GUIDE_SVG.inkFaint}>Symptoms of excessive drop: tool runs hot, motor struggles, lights dim. Can damage motors permanently.</text>
  </svg>);
}
function SafetySVG() {
  return (<svg viewBox="0 0 680 120" width="100%" height="auto" role="img" aria-label="Extension cord safety: never daisy-chain, never run under rugs, always fully uncoil.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Three rules that prevent fires</text>
    {[{icon:"✗",label:"Never daisy-chain cords (plug one into another)",y:55},{icon:"✗",label:"Never run under rugs or through walls (traps heat)",y:80},{icon:"✓",label:"Always fully uncoil before use (coiled cord overheats at high loads)",y:105}].map((r,i)=>(<g key={r.label}><circle cx="30" cy={r.y+2} r="8" fill={r.icon==="✓"?"#EAF3DE":"#FCEBEB"}/><text x="30" y={r.y+6} textAnchor="middle" fontSize="9" fontWeight="700" fill={r.icon==="✓"?"#2D7F46":"#B53629"}>{r.icon}</text><text x="48" y={r.y+6} fontSize="10" fill={GUIDE_SVG.ink}>{r.label}</text></g>))}
  </svg>);
}
export function ExtensionCordCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="NEC Article 400 (flexible cords) and UL safety guidelines" />
    <h2>The wrong extension cord can burn down your garage</h2>
    <p>Extension cord fires cause an estimated 3,300 home fires per year in the US according to the Electrical Safety Foundation. Nearly all are caused by one of three things: using an undersized cord for the load, daisy-chaining multiple cords, or running a cord under a rug where heat cannot dissipate. The calculator above sizes the correct gauge based on your tool&apos;s amperage draw and the cord length. Using a thicker gauge than recommended is always safe. Using a thinner gauge than recommended is a fire risk.</p>
    <Figure number={1} caption="Lower gauge number = thicker wire = more capacity. A 12 AWG cord handles 20 amps. A 16 AWG handles only 10."><GaugeSVG /></Figure>
    <MethodologyNote><p>Ampacity ratings from NEC Table 400.5. Voltage drop calculation: Vd = (2 × length × amps × resistance per foot) ÷ 1000. Resistance per foot from NEC Chapter 9, Table 8.</p></MethodologyNote>
    <Figure number={2} caption="Long cords drop voltage. A 100-foot 16 AWG cord at full load drops 8% — enough to damage a motor."><VoltageSVG /></Figure>
    <Figure number={3} caption="Three simple rules prevent nearly all extension cord fires. Never daisy-chain. Never run under rugs. Always uncoil completely."><SafetySVG /></Figure>
    <p>For permanent wiring, the <a href="/wire-size-calculator">wire size calculator</a> handles circuit sizing with NEC ampacity tables and voltage drop calculations.</p>
  </>);
}
