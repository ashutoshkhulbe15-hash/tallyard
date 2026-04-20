import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function RollCoverageSVG() {
  const rolls = [
    { label: "US single roll (27\" × 27 ft)", sqft: 36, usable: 30 },
    { label: "US double roll (27\" × 27 ft ×2)", sqft: 72, usable: 60 },
    { label: "Euro roll (21\" × 33 ft)", sqft: 57, usable: 47 },
    { label: "Wide-format (36\" × 24 ft)", sqft: 72, usable: 60 },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Wallpaper roll sizes: US double roll covers 60 usable sq ft.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Wallpaper roll sizes and usable coverage</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Usable coverage accounts for trimming waste. Pattern repeat further reduces it.</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Roll type",x:170},{l:"Total ft²",x:380},{l:"Usable ft²",x:530}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {rolls.map((r,i)=>{const y=headerY+10+i*rowH;return(
        <g key={r.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="170" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
          <text x="380" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.sqft} ft²</text>
          <text x="530" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{r.usable} ft²</text>
        </g>
      )})}
    </svg>
  );
}

function PatternRepeatSVG() {
  const repeats = [
    { label: "No repeat (solid/texture)", waste: "0%", w: 10 },
    { label: "Small repeat (6–8\")", waste: "5–10%", w: 100 },
    { label: "Medium repeat (12–18\")", waste: "10–15%", w: 150 },
    { label: "Large repeat (21–24\")", waste: "15–25%", w: 250 },
  ];
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Pattern repeat waste: no repeat 0%, large repeat 15-25% extra material needed.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Extra material needed by pattern repeat</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Larger pattern repeats waste more material aligning the design between strips</text>
      {repeats.map((r, i) => {
        const y = 65 + i * 28;
        return (
          <g key={r.label}>
            <text x="220" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
            <rect x="230" y={y} width={r.w} height="18" rx="3" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={238 + r.w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>+{r.waste}</text>
          </g>
        );
      })}
    </svg>
  );
}

function CostRangeSVG() {
  const types = [
    { label: "Peel-and-stick (removable)", cost: "$1–4/ft²", note: "Rentals, accent walls, temporary" },
    { label: "Vinyl-coated (standard)", cost: "$1–5/ft²", note: "Kitchens, bathrooms, durable" },
    { label: "Non-woven (paste-the-wall)", cost: "$2–8/ft²", note: "Most common for living spaces" },
    { label: "Designer / grasscloth", cost: "$5–25/ft²", note: "Premium, natural fibers, delicate" },
  ];
  const headerY = 65; const rowH = 28;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Wallpaper cost: peel-and-stick $1-4, designer $5-25 per square foot.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Wallpaper cost per square foot</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Type",x:140},{l:"Cost/ft²",x:330},{l:"Best for",x:520}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="140" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="330" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.cost}</text>
          <text x="520" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
        </g>
      )})}
    </svg>
  );
}

export function WallpaperCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="Wallcoverings Association standards and York/Graham & Brown product specs" />

      <h2>Pattern repeat is the variable that ruins every wallpaper estimate</h2>

      <p>Wallpaper rolls have a stated coverage in square feet. Most US double rolls cover about 72 square feet. After trimming top and bottom and losing material to alignment, usable coverage drops to about 60 square feet for a solid or textured paper. Add a pattern repeat and it drops further. A 21-inch pattern repeat on a wallpaper for a 9-foot ceiling means every strip wastes up to 21 inches aligning the pattern with the strip beside it. On a room that needs 15 strips, that is 26 feet of wasted wallpaper just for pattern matching.</p>

      <Figure number={1} caption="Usable coverage is always less than the label says. A US double roll covers 72 sq ft total but only 60 sq ft after trimming waste.">
        <RollCoverageSVG />
      </Figure>

      <MethodologyNote>
        <p>Roll coverage uses Wallcoverings Association standard dimensions. Pattern repeat waste factors follow industry estimating practice: (ceiling height + repeat) ÷ repeat × strip width. The calculator accounts for doors and windows by subtracting 15-20 sq ft each and recalculating strip count.</p>
      </MethodologyNote>

      <h2>How pattern repeat changes the math</h2>

      <Figure number={2} caption="A solid texture wallpaper wastes almost nothing. A large botanical print with a 24-inch repeat can waste 25% of the material.">
        <PatternRepeatSVG />
      </Figure>

      <Callout label="Drop match vs straight match">Straight match: the pattern aligns at the same point on every strip. Drop match: alternating strips shift down by half the repeat. Drop match wastes more material because you are essentially working with a repeat that is twice the stated size. If the label says &quot;21-inch drop match,&quot; treat it as a 42-inch repeat for estimating purposes.</Callout>

      <Scenario location="Brooklyn, NY">
        A couple ordered 6 double rolls for a 12 × 14 dining room accent wall (one wall, 14 feet wide, 9-foot ceilings). The paper had a 24-inch straight-match repeat. Six rolls should have been enough for the wall area. After hanging 5 strips and matching every pattern seam, they needed a 7th roll to finish the last strip cleanly. The remaining 18 inches on the 6th roll did not leave enough material for a full-height pattern-matched strip. One extra roll. Same dye lot. $85. The alternative was a visible mismatch on the most prominent wall in the room.
      </Scenario>

      <h2>What wallpaper costs</h2>

      <Figure number={3} caption="Peel-and-stick is cheapest and removable. Designer grasscloth can run $25/ft² before installation.">
        <CostRangeSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Wallpaper (12×14 room, 4 walls)",values:["$300–800","$300–800"]},
          {label:"Paste / adhesive",values:["$15–30","Included"]},
          {label:"Tools (smoother, knife, seam roller)",values:["$20–30","Own tools"]},
          {label:"Labor",values:["$0 (full day per room)","$400–800"]},
          {label:"Total per room",values:[<strong key="d">$335–860</strong>,<strong key="p">$700–1,600</strong>]},
        ]}
        caption="Peel-and-stick is genuinely DIY-friendly. Traditional paste-the-wall paper is moderate. Pre-pasted paper is easiest of the traditional types."
      />

      <p>For rooms where you are choosing between <a href="/paint-calculator">paint</a> and wallpaper, paint is 3 to 5 times cheaper in materials and much faster to apply. Wallpaper makes sense for accent walls, dining rooms, and spaces where you want a pattern or texture that paint cannot achieve. Most homeowners wallpaper one or two rooms and paint the rest.</p>
    </>
  );
}
