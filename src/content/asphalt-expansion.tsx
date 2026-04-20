import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function ThicknessSVG() {
  const uses = [
    { label: "Residential overlay", thick: '1.5–2"', tons: "0.11 tons/ft²", color: GUIDE_SVG.slate },
    { label: "Standard driveway", thick: '2–3"', tons: "0.17 tons/ft²", color: GUIDE_SVG.inkMuted },
    { label: "Heavy-duty / commercial", thick: '3–4"', tons: "0.22 tons/ft²", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Asphalt thickness: residential 2-3 inches, heavy-duty 3-4 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Thickness by application</text>
      {uses.map((u, i) => { const y = 60 + i * 30; return (
        <g key={u.label}>
          <text x="175" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{u.label}</text>
          <rect x="185" y={y} width={parseFloat(u.tons)*1200} height="20" rx="3" fill={u.color} opacity="0.6" />
          <text x={195+parseFloat(u.tons)*1200} y={y+14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{u.thick} · {u.tons}</text>
        </g>
      )})}
    </svg>
  );
}

function CostSVG() {
  return (
    <svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Asphalt driveway cost: $3-7 per square foot installed.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Driveway cost (installed, 2026)</text>
      {[
        { label: "Small (300 ft²)", cost: "$1,500–2,500", x: 50 },
        { label: "Standard (600 ft²)", cost: "$2,500–4,500", x: 260 },
        { label: "Large (1,000 ft²)", cost: "$4,000–7,000", x: 470 },
      ].map(s => (
        <g key={s.label}>
          <rect x={s.x} y="50" width="180" height="55" rx="6" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
          <text x={s.x+90} y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x={s.x+90} y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill={GUIDE_SVG.accent}>{s.cost}</text>
        </g>
      ))}
    </svg>
  );
}

function VsConcreteSVG() {
  const rows = [
    { label: "Installed cost/ft²", asph: "$3–7", conc: "$6–15" },
    { label: "Lifespan", asph: "15–20 yr", conc: "30–50 yr" },
    { label: "Maintenance", asph: "Sealcoat every 3–5 yr", conc: "Minimal" },
    { label: "Cold climate", asph: "Flexible (handles freeze)", conc: "Cracks from freeze-thaw" },
    { label: "Repair", asph: "Patch easily", conc: "Difficult, visible patches" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Asphalt vs concrete driveways comparison.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Asphalt vs concrete driveway</text>
      <rect x="60" y={headerY-18} width="560" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"",x:180},{l:"Asphalt",x:370},{l:"Concrete",x:520}].map(h=>(
        <text key={h.l+h.x} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {rows.map((r,i)=>{const y=headerY+10+i*rowH;return(
        <g key={r.label}>{i%2===0&&<rect x="60" y={y-4} width="560" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="180" y={y+14} textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
          <text x="370" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.accent} fontWeight="600">{r.asph}</text>
          <text x="520" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{r.conc}</text>
        </g>
      )})}
    </svg>
  );
}

export function AsphaltCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="Asphalt Institute MS-17 and state DOT residential paving specs" />
      <h2>Asphalt is sold by the ton, and thickness determines everything</h2>
      <p>Asphalt tonnage depends on three variables: area, thickness, and the density of hot-mix asphalt (about 145 pounds per cubic foot). A standard residential driveway at 2 to 3 inches thick uses roughly 0.17 tons per square foot. That means a 600-square-foot two-car driveway needs about 10 to 12 tons. At $100 to $150 per ton for hot-mix delivered, the material alone runs $1,000 to $1,800. Installation labor and base prep bring the total to $3 to $7 per square foot.</p>
      <Figure number={1} caption="Thickness determines tonnage. A residential overlay at 1.5 inches uses half the material of a heavy-duty 3-inch pour.">
        <ThicknessSVG />
      </Figure>
      <MethodologyNote><p>Formula: tons = area (ft²) × thickness (in) × 145 lb/ft³ ÷ 12 ÷ 2,000. Density of 145 pcf is the Asphalt Institute standard for dense-graded HMA. Pricing reflects 2026 paving contractor rates from regional asphalt associations.</p></MethodologyNote>

      <h2>What a driveway actually costs</h2>
      <Figure number={2} caption="Most residential driveways fall between $2,500 and $4,500. Prices vary by region, base condition, and access difficulty.">
        <CostSVG />
      </Figure>
      <p>The base is half the job. Asphalt over a properly compacted gravel base (4 to 6 inches of process stone) lasts 20 years. Asphalt over bare clay lasts 5 to 8 years before cracking and settling. If your existing base is compromised, the paving contractor needs to excavate and rebuild it, adding $2 to $4 per square foot to the project.</p>
      <Callout label="Sealcoating extends life by 5–8 years">Apply a coal-tar or asphalt emulsion sealcoat every 3 to 5 years ($0.15–0.25/ft² DIY, $0.30–0.50/ft² professional). Sealcoating does not fix structural damage but it prevents UV degradation, water infiltration, and oxidation that cause surface cracking. A $200 sealcoat job every 4 years adds 5 to 8 years to driveway life.</Callout>

      <h2>Asphalt vs concrete: which driveway</h2>
      <Figure number={3} caption="Asphalt costs half as much as concrete but lasts half as long. In cold climates, asphalt handles freeze-thaw better because it flexes instead of cracking.">
        <VsConcreteSVG />
      </Figure>
      <Scenario location="Minneapolis, MN">
        A homeowner chose concrete for a 700 ft² driveway ($7,000 installed). After three winters, freeze-thaw cycling cracked two slabs. Repair cost: $1,200. The neighbor&apos;s asphalt driveway ($3,500 installed the same year) had no structural damage after the same winters. Asphalt flexes with frost heave; concrete does not. In zones 5-7 with significant freeze-thaw, asphalt is the more durable surface per dollar spent.
      </Scenario>
      <p>For the base layer under asphalt, use the <a href="/gravel-calculator">gravel calculator</a> to estimate tons of process stone. For concrete driveway comparisons, the <a href="/concrete-calculator">concrete calculator</a> gives yard quantities.</p>
    </>
  );
}
