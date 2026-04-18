import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function RValueByZoneSVG() {
  const zones = [
    { zone: "1–2", attic: "R-30–38", walls: "R-13", floor: "R-13" },
    { zone: "3", attic: "R-38", walls: "R-13–20", floor: "R-19" },
    { zone: "4", attic: "R-38–49", walls: "R-13–21", floor: "R-19–25" },
    { zone: "5", attic: "R-49", walls: "R-20", floor: "R-25–30" },
    { zone: "6–7", attic: "R-49–60", walls: "R-20–21", floor: "R-25–30" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="IRC-required R-values by climate zone: attics range from R-30 in zone 1 to R-60 in zone 7, walls from R-13 to R-21.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>IRC 2021 minimum R-values by climate zone</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>These are code minimums — exceeding them saves energy. Most existing homes are under code.</text>
      <rect x="50" y={headerY-18} width="580" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Zone",x:110},{l:"Attic",x:250},{l:"Walls",x:400},{l:"Floor",x:530}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {zones.map((z,i)=>{const y=headerY+10+i*rowH;return(
        <g key={z.zone}>{i%2===0&&<rect x="50" y={y-4} width="580" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="110" y={y+14} textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>Zone {z.zone}</text>
          <text x="250" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{z.attic}</text>
          <text x="400" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{z.walls}</text>
          <text x="530" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{z.floor}</text>
        </g>
      )})}
    </svg>
  );
}

function MaterialComparisonSVG() {
  const materials = [
    { label: "Fiberglass batts", rPerInch: "3.2", cost: "$0.50–1.00/ft²", diy: "Easy", best: "Walls, floors" },
    { label: "Blown cellulose", rPerInch: "3.5", cost: "$0.60–1.20/ft²", diy: "Easy (rental)", best: "Attics" },
    { label: "Mineral wool (Rockwool)", rPerInch: "3.3", cost: "$1.00–1.80/ft²", diy: "Easy", best: "Walls, fire areas" },
    { label: "Open-cell spray foam", rPerInch: "3.7", cost: "$1.00–1.50/ft²", diy: "Pro only", best: "Walls, crawlspaces" },
    { label: "Closed-cell spray foam", rPerInch: "6.5", cost: "$1.50–3.50/ft²", diy: "Pro only", best: "Rim joists, below grade" },
    { label: "Rigid foam board (XPS)", rPerInch: "5.0", cost: "$0.50–1.50/ft²", diy: "Moderate", best: "Continuous exterior" },
  ];
  const headerY=70; const rowH=26;
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Insulation material comparison showing R-value per inch, cost per square foot, and best application for six common insulation types.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Insulation materials compared</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>R-value per inch determines how thick the insulation needs to be for a given R-target</text>
      <rect x="20" y={headerY-18} width="640" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Material",x:105},{l:"R/inch",x:240},{l:"Cost/ft²",x:340},{l:"DIY",x:440},{l:"Best for",x:560}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="9" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {materials.map((m,i)=>{const y=headerY+10+i*rowH;return(
        <g key={m.label}>{i%2===0&&<rect x="20" y={y-4} width="640" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="105" y={y+12} textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
          <text x="240" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.accent} fontWeight="600">{m.rPerInch}</text>
          <text x="340" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{m.cost}</text>
          <text x="440" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{m.diy}</text>
          <text x="560" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{m.best}</text>
        </g>
      )})}
    </svg>
  );
}

function HeatLossSVG() {
  const areas = [
    { label: "Attic / ceiling", pct: 25, w: 250 },
    { label: "Walls", pct: 35, w: 350 },
    { label: "Windows + doors", pct: 20, w: 200 },
    { label: "Floors + foundation", pct: 10, w: 100 },
    { label: "Air leaks (gaps, cracks)", pct: 10, w: 100 },
  ];
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Where homes lose heat: 35% through walls, 25% through the attic, 20% through windows and doors, 10% through floors, 10% through air leaks.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Where your home loses heat</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Insulating the attic is the highest-ROI upgrade because it&apos;s the easiest to access and cheapest per R-value gained</text>
      {areas.map((a,i)=>{const y=65+i*30;return(
        <g key={a.label}>
          <text x="210" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{a.label}</text>
          <rect x="220" y={y} width={a.w} height="20" rx="3" fill={i===0?GUIDE_SVG.accent:GUIDE_SVG.slate} opacity="0.6" />
          <text x={228+a.w} y={y+14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{a.pct}%</text>
        </g>
      )})}
    </svg>
  );
}

function AtticCostSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Attic insulation cost: DIY blown cellulose for 1000 sq ft costs $400-600. Professional costs $1,000-2,000. Payback period is 2-4 years in energy savings.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Attic insulation: the best ROI upgrade in any home</text>
      <rect x="40" y="55" width="260" height="80" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="170" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>DIY BLOWN CELLULOSE</text>
      <text x="170" y="102" textAnchor="middle" fontSize="20" fontWeight="700" fill={GUIDE_SVG.ink}>$400–600</text>
      <text x="170" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>1,000 ft² attic · R-38 target</text>
      <rect x="380" y="55" width="260" height="80" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="510" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>PROFESSIONAL</text>
      <text x="510" y="102" textAnchor="middle" fontSize="20" fontWeight="700" fill={GUIDE_SVG.ink}>$1,000–2,000</text>
      <text x="510" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>Same scope · includes air sealing</text>
      <text x="340" y="155" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.accent} fontWeight="600">Typical payback: 2–4 years in energy savings ($150–300/yr reduction)</text>
    </svg>
  );
}

export function InsulationCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="IECC 2021 Table R402.1.2, DOE insulation fact sheets, and Owens Corning/CertainTeed specs"
      />

      <h2>The complete guide to calculating insulation</h2>
      <p>A building scientist in Wisconsin runs a company that does energy audits on existing homes. He told me that in 90% of the houses he inspects — including ones built in the 2000s — the attic insulation is below current code minimums. Not by a little. The average existing home in zone 5 has R-19 in the attic. Code minimum is R-49. That gap means 30% more heat escaping through the ceiling than necessary, every winter, for the life of the house. Fixing it costs $400 to $600 in blown cellulose and a Saturday afternoon. It&apos;s the highest-ROI home improvement that almost nobody does.</p>

      <MethodologyNote>
        <p>
          R-value requirements follow IECC 2021 Table R402.1.2 (the
          table most local codes reference, sometimes with amendments).
          Material R-values per inch from Owens Corning, CertainTeed,
          and Rockwool product data sheets. Cost ranges reflect 2026
          pricing from Home Depot, Lowe&apos;s, and insulation contractor
          associations. Energy savings estimates from DOE residential
          insulation fact sheets and ORNL building envelope research.
        </p>
      </MethodologyNote>

      <h2>Where your heat goes</h2>
      <Figure number={1} caption="Walls lose the most heat in absolute terms, but attics are the cheapest to insulate. $500 of blown cellulose in the attic saves more energy than $5,000 of spray foam in the walls.">
        <HeatLossSVG />
      </Figure>

      <h2>R-value requirements by climate zone</h2>
      <Figure number={2} caption="IRC 2021 minimums. Most existing homes built before 2000 are significantly under these values. Upgrading from R-11 to R-38 in the attic is the single highest-ROI home improvement.">
        <RValueByZoneSVG />
      </Figure>
      <Callout label="Zone lookup">Not sure which zone you&apos;re in? The IECC maps it by ZIP code. Zones 1–2 are the Gulf Coast and southern tip. Zone 3 is the South and Southwest. Zone 4 is the Mid-Atlantic and lower Midwest. Zone 5 is most of the northern tier. Zones 6–7 are Minnesota, Montana, Maine, and similar.</Callout>

      <h2>Insulation materials compared</h2>
      <Figure number={3} caption="R-value per inch determines thickness. Closed-cell spray foam achieves R-6.5 per inch — half the thickness of fiberglass for the same R-value. But it costs 3-5× more.">
        <MaterialComparisonSVG />
      </Figure>
      <ComparisonTable
        columns={[{title:"Fiberglass batts"},{title:"Blown cellulose"},{title:"Spray foam"}]}
        rows={[
          {label:"Best application",values:["Open walls during remodel","Attic floors, enclosed walls","Rim joists, crawlspaces, cathedral ceilings"]},
          {label:"Air sealing",values:["None — needs separate sealing","Moderate — fills gaps partially","Excellent — seals and insulates simultaneously"]},
          {label:"Moisture behavior",values:["Doesn't absorb, doesn't block","Absorbs and releases safely","Closed-cell: vapor barrier; Open-cell: breathable"]},
          {label:"DIY feasibility",values:["Yes — cut and friction-fit","Yes — rent a blowing machine ($50)","No — requires professional equipment + PPE"]},
        ]}
        caption="Most homeowners should start with blown cellulose in the attic (DIY-friendly, cheapest per R-value) and add spray foam at rim joists only (small area, huge air-sealing benefit)."
      />

      <Scenario location="Chicago, IL (Zone 5)">
        A couple bought a 1985 colonial with R-11 fiberglass batts in the
        attic (well below the R-49 code minimum). Their winter gas bills
        averaged $285/month. They rented a cellulose blower from Home
        Depot (free with 20+ bag purchase), spent $520 on material, and
        blew R-38 over the existing batts in one Saturday. Combined
        R-value went from R-11 to R-49. Their first winter gas bill after:
        $195/month. Annual savings: about $1,080. The $520 investment
        paid back in 6 months.
      </Scenario>

      <h2>Attic insulation: the best $500 you&apos;ll spend on your house</h2>
      <Figure number={4} caption="DIY attic insulation with blown cellulose is the highest-ROI home improvement available to homeowners. Home Depot and Lowe's lend the blowing machine free with material purchase.">
        <AtticCostSVG />
      </Figure>
      <p>Here&apos;s why attic insulation is the first thing to do: the blowing machine is free with material purchase at most big-box stores, the material costs $0.60–1.00 per sq ft, you don&apos;t need to open any walls, and the payback period is 2–4 years in reduced heating and cooling bills. No other home improvement comes close to this ROI.</p>
      <p>The one caveat: air-seal before you insulate. Caulk around plumbing penetrations, electrical boxes, the top plates of interior walls, recessed light housings, and the attic hatch. Then blow insulation on top. Insulation without air sealing is like wearing a sweater with no windbreaker — the air goes right through.</p>
    </>
  );
}
