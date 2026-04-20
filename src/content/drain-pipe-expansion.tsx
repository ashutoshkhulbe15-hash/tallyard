import { Figure, GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";
function DFUTableSVG() {
  return (<svg viewBox="0 0 680 180" width="100%" height="auto" role="img" aria-label="Drain fixture units: toilet 4 DFU, bathtub 2, lavatory 1, kitchen sink 2, washing machine 2.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Drain fixture units (DFU) by fixture</text>
    {[{fixture:"Toilet (water closet)",dfu:"4",y:55},{fixture:"Bathtub/shower",dfu:"2",y:80},{fixture:"Lavatory (bathroom sink)",dfu:"1",y:105},{fixture:"Kitchen sink",dfu:"2",y:130},{fixture:"Washing machine",dfu:"2",y:155}].map(f=>(<g key={f.fixture}><text x="230" y={f.y+10} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{f.fixture}</text><rect x="240" y={f.y} width={parseInt(f.dfu)*50} height="18" rx="3" fill={GUIDE_SVG.accent} opacity="0.5"/><text x={248+parseInt(f.dfu)*50} y={f.y+13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{f.dfu} DFU</text></g>))}
  </svg>);
}
function PipeSizeSVG() {
  return (<svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Pipe size by DFU load: 1.5 inch for up to 3 DFU, 2 inch up to 6, 3 inch up to 20, 4 inch up to 160.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Pipe size by total DFU load (IPC Table 710.1)</text>
    {[{size:'1.5"',maxDFU:"3 DFU",use:"Single lav or bar sink",y:55},{size:'2"',maxDFU:"6 DFU",use:"Shower + lav, or kitchen sink",y:80},{size:'3"',maxDFU:"20 DFU",use:"Toilet branch, bathroom group",y:105},{size:'4"',maxDFU:"160 DFU",use:"Building drain, main stack",y:130}].map(p=>(<g key={p.size}><text x="50" y={p.y+10} fontSize="14" fontWeight="700" fill={GUIDE_SVG.accent}>{p.size}</text><text x="90" y={p.y+4} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>Up to {p.maxDFU}</text><text x="90" y={p.y+20} fontSize="9" fill={GUIDE_SVG.inkFaint}>{p.use}</text></g>))}
  </svg>);
}
function SlopeSVG() {
  return (<svg viewBox="0 0 680 80" width="100%" height="auto" role="img" aria-label="Drain pipe slope: 1/4 inch per foot for pipes 3 inches and smaller, 1/8 inch for 4 inches and larger.">
    <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Required slope (IPC 704.1)</text>
    <text x="20" y="55" fontSize="11" fill={GUIDE_SVG.inkMuted}>Pipes 3&quot; and smaller: 1/4&quot; per foot minimum. Pipes 4&quot; and larger: 1/8&quot; per foot minimum.</text>
    <text x="20" y="75" fontSize="10" fill={GUIDE_SVG.inkFaint}>Too little slope: waste settles and clogs. Too much slope: water outruns solids, also clogs.</text>
  </svg>);
}
export function DrainPipeCalculatorExpansion() {
  return (<>
    <GuideByline updated="April 20, 2026" reviewedAgainst="IPC (International Plumbing Code) Tables 710.1 and 704.1" />
    <h2>Drain pipe sizing is a code requirement, not a guess</h2>
    <p>Every drain pipe in your house is sized based on how many fixtures flow into it, measured in Drain Fixture Units (DFU). A toilet is 4 DFU. A bathroom sink is 1. A kitchen sink is 2. The total DFU loading on any pipe determines the minimum pipe diameter per the International Plumbing Code (IPC) or Uniform Plumbing Code (UPC), depending on your jurisdiction. Undersizing a drain causes slow drainage and frequent clogs. Oversizing wastes money on larger pipe and fittings.</p>
    <Figure number={1} caption="Each fixture has a fixed DFU value. Add all fixtures that drain into a pipe to get the total load."><DFUTableSVG /></Figure>
    <MethodologyNote><p>DFU values and pipe sizing from IPC Table 710.1 (2021). Slope requirements from IPC Section 704.1. Some jurisdictions use UPC instead of IPC — DFU values are similar but not identical. Check which code your jurisdiction enforces.</p></MethodologyNote>
    <Figure number={2} caption="Pipe diameter jumps at specific DFU thresholds. A 2-inch pipe handles 6 DFU. Add one more fixture and you need a 3-inch pipe."><PipeSizeSVG /></Figure>
    <Figure number={3} caption="Slope matters as much as diameter. Too flat and waste settles. Too steep and water outruns solids."><SlopeSVG /></Figure>
    <Callout label="The toilet rule">A toilet (4 DFU) requires a minimum 3-inch drain. No exceptions. You cannot connect a toilet to a 2-inch pipe regardless of total DFU loading. This is a code absolute in both IPC and UPC.</Callout>
  </>);
}
