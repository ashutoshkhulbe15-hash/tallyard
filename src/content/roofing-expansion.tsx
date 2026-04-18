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
            <rect x="185" y={y} width={p.w * 2.5} height="20" rx="3" fill={i >= 4 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={193 + p.w * 2.5} y={y + 14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>×{p.mult}</text>
          </g>
        );
      })}
      <text x="340" y="255" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">A steep 12/12 pitch has 41% more surface than the same footprint at flat — that&apos;s 41% more shingles, underlayment, and labor.</text>
    </svg>
  );
}

function ShingleTypesSVG() {
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Three shingle tiers: 3-tab at $1-2 per square foot lasting 15-20 years, architectural at $2-4 lasting 25-30 years, and premium/designer at $5-10 lasting 40-50 years.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Asphalt shingle tiers</text>
      {[
        { label: "3-tab", price: "$1–2/ft²", life: "15–20 yr", note: "Flat, uniform, budget", x: 50, color: GUIDE_SVG.slate },
        { label: "Architectural", price: "$2–4/ft²", life: "25–30 yr", note: "Dimensional, standard", x: 260, color: GUIDE_SVG.inkMuted },
        { label: "Premium", price: "$5–10/ft²", life: "40–50 yr", note: "Designer, slate-look", x: 470, color: GUIDE_SVG.accent },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y="55" width="180" height="110" rx="8" fill={s.label === "Premium" ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={s.color} strokeWidth="1" />
          <text x={s.x + 90} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>{s.label.toUpperCase()}</text>
          <text x={s.x + 90} y="108" textAnchor="middle" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>{s.price}</text>
          <text x={s.x + 90} y="130" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{s.life} · {s.note}</text>
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

function RoofCostSVG() {
  const sizes = [
    { label: "1,000 ft²", sq: 10, cost3: "$3,500", costA: "$6,500", costP: "$12,000" },
    { label: "1,500 ft²", sq: 15, cost3: "$5,200", costA: "$9,800", costP: "$18,000" },
    { label: "2,000 ft²", sq: 20, cost3: "$7,000", costA: "$13,000", costP: "$24,000" },
    { label: "2,500 ft²", sq: 25, cost3: "$8,800", costA: "$16,200", costP: "$30,000" },
  ];
  const headerY = 70;
  const rowH = 30;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Roof replacement cost by size and shingle type, from $3,500 for a small 3-tab job to $30,000 for a large premium installation.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Roof replacement cost (installed)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Including tear-off, underlayment, flashing, and labor</text>
      <rect x="40" y={headerY - 18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Roof size", x: 120 }, { l: "Squares", x: 240 }, { l: "3-tab", x: 350 }, { l: "Architectural", x: 470 }, { l: "Premium", x: 580 }].map((h) => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {sizes.map((r, i) => {
        const y = headerY + 10 + i * rowH;
        return (
          <g key={r.label}>
            {i % 2 === 0 && <rect x="40" y={y - 4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
            <text x="120" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
            <text x="240" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{r.sq}</text>
            <text x="350" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.cost3}</text>
            <text x="470" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{r.costA}</text>
            <text x="580" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{r.costP}</text>
          </g>
        );
      })}
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

      <h2>The complete guide to calculating roofing materials</h2>
      <p>A roofer in Connecticut described the most common estimation mistake he sees: homeowners measure their house footprint, multiply by a pitch factor they found online, and come up with a number that&apos;s 15% too low because they forgot the eaves, rake overhangs, and hips. On a 2,000 sq ft footprint, that&apos;s 300 square feet of missing roof — 3 squares, 9 bundles, about $450 in shingles that aren&apos;t on the truck when the crew shows up.</p>

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
      <p>When a roofer quotes &quot;20 squares,&quot; they mean 2,000 square feet of actual roof surface. Architectural shingles (the industry standard since roughly 2010) come 3 bundles per square. Older 3-tab shingles come 4 bundles per square. The bundles weigh 60–80 lbs each, which matters for staging and delivery — 60 bundles is about 2 tons of material going up the ladder.</p>
      <Callout label="Waste factor for roofing">Standard residential roofs need 10–15% waste factor. Complex roofs with many hips, valleys, dormers, and skylights need 15–20%. The cuts at hips and valleys create short pieces that can&apos;t be reused elsewhere. Ridge cap shingles are ordered separately — roughly 35 linear feet per bundle.</Callout>

      <h2>Asphalt shingle tiers</h2>
      <Figure number={3} caption="Three tiers dominate the residential market. Architectural shingles account for 80%+ of new installations. 3-tab is the budget option; premium is for homes where curb appeal justifies the cost.">
        <ShingleTypesSVG />
      </Figure>
      <ComparisonTable
        columns={[{ title: "3-tab" }, { title: "Architectural" }, { title: "Premium" }]}
        rows={[
          { label: "Warranty", values: ["20–25 yr", "30–lifetime", "50 yr–lifetime"] },
          { label: "Wind rating", values: ["60 mph", "110–130 mph", "130+ mph"] },
          { label: "Look", values: ["Flat, uniform strips", "Dimensional shadow lines", "Mimics slate, cedar, tile"] },
          { label: "Brands", values: ["GAF Royal Sovereign", "GAF Timberline, Owens Duration", "CertainTeed Grand Manor, GAF Camelot"] },
        ]}
        caption="Architectural shingles are the sweet spot for most homes. They cost 50-100% more than 3-tab but last nearly twice as long and have much better wind resistance."
      />

      <h2>What a new roof actually costs</h2>
      <Figure number={4} caption="Total installed cost including tear-off, underlayment, flashing, and labor. The jump from 3-tab to architectural roughly doubles the cost, but the roof lasts 50-70% longer.">
        <RoofCostSVG />
      </Figure>
      <p>Labor is typically 60% of a roofing job. Materials are 40%. A crew of 4–6 can tear off and reshingle a standard 2,000 sq ft roof in 2–3 days. The materials stage on the roof the morning of the tear-off, old shingles come off into a dumpster, underlayment and drip edge go down the same day, and shingling starts from the bottom working up.</p>
      <p>Two cost items people forget: the dumpster rental ($300–600 for a 20-yard container) and the permit fee ($100–500 depending on municipality). Both are non-negotiable on a full replacement.</p>

      <Scenario location="Minneapolis, MN">
        After a 2024 hailstorm, a homeowner got three roofing bids for
        a 1,800 sq ft hip roof (6/12 pitch). Actual roof surface: 2,016
        sq ft (1,800 × 1.12). The cheapest bid quoted 18 squares. The
        middle bid quoted 22 squares. The most expensive quoted 24. The
        difference? The cheapest contractor forgot the pitch multiplier
        and didn&apos;t account for waste on the hips. He would have run
        out 4 squares short. The 22-square bid was correct (20.2 squares
        + 10% waste = 22.2, rounded to 22).
      </Scenario>

      <h2>Beyond shingles: what else goes on the roof</h2>
      <ComparisonTable
        columns={[{ title: "Component" }, { title: "Purpose" }, { title: "Cost" }]}
        rows={[
          { label: "Underlayment", values: ["Synthetic felt (moisture barrier)", "$0.15–0.50/ft²"] },
          { label: "Ice and water shield", values: ["Self-adhering membrane at eaves, valleys", "$1.50–3.00/ft²"] },
          { label: "Drip edge", values: ["Metal flashing at roof edges", "$1–3 per linear foot"] },
          { label: "Ridge vent", values: ["Continuous exhaust ventilation at peak", "$3–6 per linear foot"] },
          { label: "Pipe boots", values: ["Flashing around plumbing vents", "$10–30 each"] },
          { label: "Step flashing", values: ["Where roof meets a wall or chimney", "$5–10 per linear foot"] },
        ]}
        caption="These items are not optional. A shingle-only estimate that doesn't include underlayment and flashing is either incomplete or the roofer is cutting corners."
      />
      <p>The underlayment and ice barrier are invisible once shingles go down, but they&apos;re doing most of the waterproofing work. Synthetic underlayment has almost entirely replaced 15-lb or 30-lb felt paper — it&apos;s lighter, lays flatter, and doesn&apos;t wrinkle when wet. Ice and water shield is required by code along the first 24 inches of eaves in cold climates to prevent ice dam leaks.</p>
    </>
  );
}
