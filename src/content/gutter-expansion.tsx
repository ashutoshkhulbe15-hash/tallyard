import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function GutterSizingSVG() {
  const sizes = [
    { label: '5" K-style', capacity: "Standard residential", roof: "Up to 2,500 ft²", color: GUIDE_SVG.accent },
    { label: '6" K-style', capacity: "High-capacity residential", roof: "2,500+ ft² or steep pitch", color: GUIDE_SVG.inkMuted },
    { label: '6" half-round', capacity: "Historic, decorative", roof: "Up to 2,000 ft²", color: GUIDE_SVG.slate },
  ];
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Gutter sizing: 5-inch K-style handles most homes, 6-inch for large roofs.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Gutter size by roof area</text>
      {sizes.map((s, i) => {
        const y = 60 + i * 30;
        return (
          <g key={s.label}>
            <text x="120" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
            <rect x="130" y={y} width="200" height="20" rx="3" fill={s.color} opacity="0.5" />
            <text x="340" y={y + 14} fontSize="10" fill={GUIDE_SVG.ink}>{s.capacity}</text>
            <text x="540" y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.roof}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DownspoutRuleSVG() {
  return (
    <svg viewBox="0 0 680 110" width="100%" height="auto" role="img" aria-label="One downspout per 30-40 feet of gutter. More for steep or large roof areas.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Downspout spacing rule</text>
      <text x="20" y="48" fontSize="11" fill={GUIDE_SVG.ink}>1 downspout per 30–40 linear feet of gutter</text>
      <text x="20" y="68" fontSize="10" fill={GUIDE_SVG.inkFaint}>A 120-foot gutter run needs 3–4 downspouts. Each downspout drains about 1,200 sq ft of roof area.</text>
      <text x="20" y="92" fontSize="10" fill={GUIDE_SVG.accent} fontWeight="600">More downspouts = less overflow during heavy rain. Fewer = simpler look but overflow risk.</text>
    </svg>
  );
}

function MaterialCostSVG() {
  const types = [
    { label: "Aluminum (seamless)", cost: "$6–12/LF", life: "20–30 yr", note: "Most common, no rust" },
    { label: "Vinyl", cost: "$3–6/LF", life: "10–15 yr", note: "Budget, cracks in cold" },
    { label: "Steel (galvanized)", cost: "$8–14/LF", life: "20–30 yr", note: "Strong, can rust" },
    { label: "Copper", cost: "$25–50/LF", life: "50+ yr", note: "Premium, develops patina" },
  ];
  const headerY = 65; const rowH = 28;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Gutter materials: aluminum $6-12/LF, vinyl $3-6, steel $8-14, copper $25-50.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Gutter cost by material (installed)</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Material",x:130},{l:"Cost/LF",x:310},{l:"Lifespan",x:430},{l:"Notes",x:560}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="130" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="310" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.cost}</text>
          <text x="430" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{t.life}</text>
          <text x="560" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
        </g>
      )})}
    </svg>
  );
}

export function GutterCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="SMACNA gutter sizing standards and manufacturer specs" />

      <h2>Gutters are sized to your roof, not your house</h2>

      <p>A gutter system catches rainwater from the roof and routes it away from the foundation. The size of gutter you need depends on your roof area and local rainfall intensity, not the size of the house itself. A small house with a steep roof collects more water per linear foot of gutter than a large house with a low-slope roof. The calculator above sizes gutters and downspouts based on your roof dimensions.</p>

      <Figure number={1} caption="5-inch K-style handles 90% of residential homes. Go to 6-inch if your roof area exceeds 2,500 sq ft or your pitch is 8/12 or steeper.">
        <GutterSizingSVG />
      </Figure>

      <MethodologyNote>
        <p>Gutter sizing follows SMACNA (Sheet Metal and Air Conditioning Contractors&apos; National Association) residential standards. Downspout spacing at 1 per 30-40 LF of gutter run per standard practice. Cost data from gutter contractor surveys and material suppliers (2025-2026).</p>
      </MethodologyNote>

      <Figure number={2} caption="Place downspouts at the low end of each gutter run. One per 30-40 feet keeps flow velocity manageable and prevents overflow at corners.">
        <DownspoutRuleSVG />
      </Figure>

      <h2>Materials and what they cost</h2>

      <Figure number={3} caption="Aluminum seamless gutters are the industry standard. They are formed on-site from a continuous coil so there are no seams to leak.">
        <MaterialCostSVG />
      </Figure>

      <Scenario location="Portland, OR">
        A homeowner with 140 LF of gutters chose vinyl ($3.50/LF) to save money over aluminum ($9/LF). The vinyl saved $770 on installation. After three winters, two 10-foot sections cracked in a cold snap and started leaking behind the fascia board. The repair cost $400 plus $600 in fascia rot repair. The aluminum would have lasted 25 years with no cracking. In any climate that reaches freezing, skip vinyl gutters.
      </Scenario>

      <ComparisonTable
        columns={[{title:"Seamless aluminum"},{title:"Sectional aluminum"},{title:"Vinyl"}]}
        rows={[
          {label:"Leak risk",values:["Very low (no seams)","Moderate (seams every 10 ft)","Moderate (joints loosen)"]},
          {label:"DIY installable?",values:["No (requires forming machine)","Yes (snap-together sections)","Yes (snap-together)"]},
          {label:"Color options",values:["25+ factory colors","Limited","White, brown, gray"]},
          {label:"Cold climate?",values:["Excellent","Good","Cracks below 20°F"]},
        ]}
        caption="Seamless aluminum is the professional standard because it eliminates the joints where 90% of gutter leaks occur. DIYers who want to self-install use sectional aluminum or vinyl."
      />

      <Callout label="Gutter guards">Leaf guards and mesh screens reduce cleaning frequency but do not eliminate it. Fine debris (pine needles, shingle grit, seed pods) still gets through most guards. Budget $7-15/LF installed for quality guards. Cheap foam or brush inserts ($2-3/LF) clog within 2 years and create worse drainage problems than open gutters.</Callout>

      <p>If you are replacing gutters as part of a <a href="/roofing-calculator">roof replacement</a>, do both at the same time. The <a href="/planner/replace-a-roof">roof replacement planner</a> chains gutter and roofing quantities together from one set of inputs.</p>
    </>
  );
}
