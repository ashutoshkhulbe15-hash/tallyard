import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function PitchMultiplierSVG() {
  const pitches = [
    { label: "Flat (1/12)", mult: "1.00", w: 100 },
    { label: "Low (3/12)", mult: "1.03", w: 103 },
    { label: "Standard (4/12)", mult: "1.05", w: 105 },
    { label: "Medium (6/12)", mult: "1.12", w: 112 },
    { label: "Steep (8/12)", mult: "1.20", w: 120 },
    { label: "Very steep (12/12)", mult: "1.41", w: 141 },
  ];
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Pitch multiplier chart showing that a 12/12 roof needs 41% more shingles than a flat roof for the same footprint.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Roof pitch multiplier</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Multiply your footprint area by this factor to get actual roof surface area</text>
      {pitches.map((p, i) => {
        const y = 65 + i * 30;
        return (
          <g key={p.label}>
            <text x="175" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{p.label}</text>
            <rect x="185" y={y} width={p.w * 2.5} height="20" rx="3" fill={i >= 4 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={193 + p.w * 2.5} y={y + 14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>×{p.mult}</text>
          </g>
        );
      })}
      <text x="340" y="255" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">A steep 12/12 pitch has 41% more surface than the same footprint at flat: that&apos;s 41% more shingles, underlayment, and labor.</text>
    </svg>
  );
}

function ShingleTypesSVG() {
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Three shingle tiers: 3-tab at $1-2 per square foot lasting 15-20 years, architectural at $2-4 lasting 25-30 years, and premium/designer at $5-10 lasting 40-50 years.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Asphalt shingle tiers</text>
      {[
        { label: "3-tab", price: "$1 to 2/ft²", life: "15 to 20 yr", note: "Flat, uniform, budget", x: 50, hl: false },
        { label: "Architectural", price: "$2 to 4/ft²", life: "25 to 30 yr", note: "Dimensional, standard", x: 260, hl: false },
        { label: "Premium", price: "$5 to 10/ft²", life: "40 to 50 yr", note: "Designer, slate-look", x: 470, hl: true },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y="55" width="180" height="110" rx="8" fill={s.hl ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={s.hl?GUIDE_SVG.accent:GUIDE_SVG.cool} strokeWidth="1.2" />
          <text x={s.x + 90} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={s.hl?GUIDE_SVG.accent:GUIDE_SVG.inkMuted}>{s.label.toUpperCase()}</text>
          <text x={s.x + 90} y="108" textAnchor="middle" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>{s.price}</text>
          <text x={s.x + 90} y="130" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{s.life}</text>
          <text x={s.x + 90} y="147" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
        </g>
      ))}
    </svg>
  );
}

function SquareExplainerSVG() {
  return (
    <svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="One roofing square equals 100 square feet. Three bundles make one square for standard architectural shingles.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What&apos;s a &quot;square&quot;?</text>
      <rect x="60" y="50" width="100" height="70" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="110" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>10 ft × 10 ft</text>
      <text x="110" y="96" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>= 100 ft²</text>
      <text x="200" y="90" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>=</text>
      <text x="240" y="78" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>1 square</text>
      <text x="240" y="98" fontSize="11" fill={GUIDE_SVG.inkMuted}>= 3 bundles (architectural)</text>
      <text x="240" y="115" fontSize="11" fill={GUIDE_SVG.inkFaint}>= 4 bundles (3-tab)</text>
    </svg>
  );
}

export function RoofingCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="GAF, Owens Corning, and CertainTeed product catalogs + IRC 2021 Chapter 9"
      />

      <h2>Your roof has more surface area than your house. Here is why that matters.</h2>
      <p>A roof takeoff needs the pitched surface area, overhangs, and waste from cuts at hips and valleys. A hypothetical 2,000 sq ft footprint underestimated by 15% would miss 300 sq ft, or 3 roofing squares, before accounting for the selected shingle&apos;s bundle coverage. This is a calculation example, not a reported contractor job.</p>

      <MethodologyNote>
        <p>
          Pitch multipliers use the geometric formula √(1 + (rise/12)²).
          Shingle coverage is based on GAF Timberline HDZ (3 bundles per
          square) and CertainTeed Landmark (3 bundles per square). Cost
          data reflects 2026 installed prices from roofing contractor
          associations and HomeAdvisor regional reports. Underlayment and
          accessory specs follow IRC 2021 Chapter 9 requirements.
        </p>
      </MethodologyNote>

      <Figure number={1} caption="The pitch multiplier is the most commonly missed step in roof estimation. It converts your horizontal footprint to actual sloped surface area.">
        <PitchMultiplierSVG />
      </Figure>

      <h2>How roofing squares work</h2>
      <Figure number={2} caption="Roofing industry measures in 'squares.' One square = 100 sq ft = 3 bundles of architectural shingles. A 2,000 sq ft roof is 20 squares = 60 bundles before waste.">
        <SquareExplainerSVG />
      </Figure>
      <p>When a roofer quotes &quot;20 squares,&quot; they mean 2,000 square feet of actual roof surface. Architectural shingles (the industry standard since roughly 2010) come 3 bundles per square. Older 3-tab shingles come 4 bundles per square. The bundles weigh 60 to 80 lbs each, which matters for staging and delivery: 60 bundles is about 2 tons of material going up the ladder.</p>
      <Callout label="Waste factor for roofing">Standard residential roofs need 10 to 15% waste factor. Complex roofs with many hips, valleys, dormers, and skylights need 15 to 20%. The cuts at hips and valleys create short pieces that can&apos;t be reused elsewhere. Ridge cap shingles are ordered separately, roughly 35 linear feet per bundle.</Callout>

      <h2>Asphalt shingle tiers</h2>
      <Figure number={3} caption="Three tiers dominate the residential market. Architectural shingles account for 80%+ of new installations. 3-tab is the budget option; premium is for homes where curb appeal justifies the cost.">
        <ShingleTypesSVG />
      </Figure>
      <ComparisonTable
        columns={[{ title: "3-tab" }, { title: "Architectural" }, { title: "Premium" }]}
        rows={[
          { label: "Warranty", values: ["20 to 25 yr", "30 to lifetime", "50 yr to lifetime"] },
          { label: "Wind rating", values: ["60 mph", "110 to 130 mph", "130+ mph"] },
          { label: "Look", values: ["Flat, uniform strips", "Dimensional shadow lines", "Mimics slate, cedar, tile"] },
          { label: "Brands", values: ["GAF Royal Sovereign", "GAF Timberline, Owens Duration", "CertainTeed Grand Manor, GAF Camelot"] },
        ]}
        caption="Architectural shingles are the sweet spot for most homes. They cost 50-100% more than 3-tab but last nearly twice as long and have much better wind resistance."
      />

      <h2>What a new roof actually costs</h2>
      <p>Labor is typically 60% of a roofing job. Materials are 40%. A crew of 4 to 6 can tear off and reshingle a standard 2,000 sq ft roof in 2 to 3 days. The materials stage on the roof the morning of the tear-off, old shingles come off into a dumpster, underlayment and drip edge go down the same day, and shingling starts from the bottom working up.</p>
      <p>Two cost items people forget: the dumpster rental ($300 to 600 for a 20-yard container) and the permit fee ($100 to 500 depending on municipality). Both are non-negotiable on a full replacement.</p>

      <Scenario location="1,800 ft² footprint, 6/12 pitch">
        For a hypothetical roof with a 1,800 ft² footprint and a 6/12 pitch,
        the simple pitch factor is about 1.118, giving about 2,012 ft²
        before overhangs and waste. With an illustrative 10% waste allowance,
        the estimate is about 2,213 ft², or 22.13 roofing squares. Round the
        purchase quantity according to the actual product coverage and roof
        geometry; no real bids or completed job are represented here.
      </Scenario>

      <ComparisonTable
        caption="Installed roof replacement cost by size and shingle tier, including tear-off, underlayment, flashing, and labour. Steep or complex roofs run above these figures because of access and waste."
        columns={[
          { title: "Squares" },
          { title: "3-tab" },
          { title: "Architectural", highlight: true },
          { title: "Premium" },
        ]}
        rows={[
          { label: "1,000 ft² roof", values: ["10", "$3,500", "$6,500", "$12,000"] },
          { label: "1,500 ft² roof", values: ["15", "$5,200", "$9,800", "$18,000"] },
          { label: "2,000 ft² roof", values: ["20", "$7,000", "$13,000", "$24,000"] },
          { label: "2,500 ft² roof", values: ["25", "$8,800", "$16,200", "$30,000"] },
        ]}
      />

      <h2>Roof shape changes the area and the waste</h2>
      <p>
        Pitch multiplies the footprint into actual surface area, but shape
        decides how much of that surface gets cut into. A simple gable is
        two rectangles and produces very little scrap. A hip roof covers
        about the same area for the same footprint and pitch, yet consumes
        noticeably more material, because every hip and valley means
        angled cuts and the ridge caps run along four edges instead of one.
      </p>

      <ComparisonTable
        caption="Waste factor by roof shape, applied after the pitch multiplier. Complexity, not size, is what drives the number: a small roof with three dormers wastes more than a large plain one."
        columns={[
          { title: "Waste factor", highlight: true },
          { title: "Why" },
        ]}
        rows={[
          { label: "Simple gable", values: ["10%", "Two planes, cuts only at the rake and ridge"] },
          { label: "Hip roof", values: ["15%", "Four planes, angled cuts at every hip"] },
          { label: "Gambrel roof", values: ["12 to 15%", "Two pitches per side, a break line to detail"] },
          { label: "Mansard roof", values: ["15 to 18%", "Steep lower slope, often with dormers"] },
          { label: "Multiple valleys or dormers", values: ["15 to 20%", "Every valley is a full-length angled cut"] },
        ]}
      />

      <p>
        A gambrel roof, the barn profile, has two pitches on each side: a
        steep lower slope and a shallow upper one. Each has to be measured
        and multiplied separately, because applying one pitch factor to the
        whole side understates the steep portion badly. A mansard does the
        same thing on all four sides, which is why mansard roofs carry both
        the hip complexity and the two-pitch problem at once. In both
        cases, measure each slope plane as its own rectangle and add them.
      </p>

      <h2>Metal roofing and low slope membranes</h2>
      <p>
        Metal roofing is not sold by the square the way shingles are. It
        comes in panels, typically 3 feet of coverage width in lengths cut
        to your rafter run, so the useful calculation is panel count rather
        than squares: roof width divided by 3 feet of coverage, then panel
        length matched to the rafter length plus overhang. Standing seam,
        with concealed fasteners and raised seams, runs $10 to $18 per
        square foot installed. Exposed-fastener corrugated or ribbed panels
        run $5 to $10 and are the agricultural and outbuilding standard.
      </p>
      <p>
        Below about 2:12 pitch, shingles stop being an option. Water moves
        too slowly to shed reliably and the IRC restricts asphalt shingles
        to 2:12 as an absolute minimum with doubled underlayment, with 4:12
        the normal threshold. Low slope and flat roofs take a membrane
        instead. TPO, a white single-ply sheet welded at the seams, is the
        current commercial default at roughly $6 to $12 per square foot
        installed and reflects heat well. EPDM, the black rubber
        alternative, costs slightly less and absorbs heat. Modified bitumen
        is the torch-applied option still common on residential flat
        sections. All three are sold and quoted by the square foot rather
        than by the roofing square.
      </p>

      <h2>Beyond shingles: what else goes on the roof</h2>
      <ComparisonTable
        columns={[{ title: "Purpose" }, { title: "Cost" }]}
        rows={[
          { label: "Underlayment", values: ["Synthetic felt (moisture barrier)", "$0.15 to 0.50/ft²"] },
          { label: "Ice & water shield", values: ["Self-adhering membrane at eaves, valleys", "$1.50 to 3.00/ft²"] },
          { label: "Drip edge", values: ["Metal flashing at roof edges", "$1 to 3 per linear foot"] },
          { label: "Ridge vent", values: ["Continuous exhaust ventilation at peak", "$3 to 6 per linear foot"] },
          { label: "Pipe boots", values: ["Flashing around plumbing vents", "$10 to 30 each"] },
          { label: "Step flashing", values: ["Where roof meets a wall or chimney", "$5 to 10 per linear foot"] },
        ]}
        caption="These items are not optional. A shingle-only estimate that doesn't include underlayment and flashing is either incomplete or the roofer is cutting corners."
      />
      <p>Use the <a href="/attic-ventilation-calculator">attic ventilation calculator</a> to size ridge vent and soffit intake for your roof area, and the <a href="/gutter-calculator">gutter calculator</a> for downspout count. The underlayment and ice barrier are invisible once shingles go down, but they&apos;re doing most of the waterproofing work. Synthetic underlayment has almost entirely replaced 15-lb or 30-lb felt paper: it&apos;s lighter, lays flatter, and doesn&apos;t wrinkle when wet. Ice and water shield is required by code along the first 24 inches of eaves in cold climates to prevent ice dam leaks.</p>
      <p>If the exterior renovation includes a garage, the <a href="/garage-door-calculator">garage door calculator</a> checks sizing, headroom, and opener HP requirements. For the starter, hip, and ridge allowances behind the roofing waste percentage, the <a href="/guides/waste-factor-reference">waste factor reference</a> shows the ARMA and NRCA figures the number comes from.</p>
    </>
  );
}
