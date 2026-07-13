import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function MeasureWallSVG() {
  return (
    <svg viewBox="0 0 680 280" width="100%" height="auto" role="img" aria-label="How to measure a room for wallpaper: add all wall widths for the perimeter, multiply by wall height, then subtract doors and windows.">
      <text x="20" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How to measure a room for wallpaper</text>
      <text x="20" y="41" fontSize="10" fill={GUIDE_SVG.inkFaint}>Perimeter (all wall widths added) times height, then subtract large openings</text>

      <rect x="40" y="70" width="200" height="130" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="140" y="64" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink}>14 ft</text>
      <text x="140" y="216" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink}>14 ft</text>
      <text x="30" y="138" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink} transform="rotate(-90,30,138)">12 ft</text>
      <text x="252" y="138" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink} transform="rotate(90,252,138)">12 ft</text>
      <rect x="110" y="196" width="30" height="8" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.warm} />
      <text x="125" y="235" textAnchor="middle" fontSize="8.5" fill={GUIDE_SVG.warm}>door</text>
      <rect x="236" y="110" width="8" height="30" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.warm} />
      <text x="200" y="128" textAnchor="middle" fontSize="8.5" fill={GUIDE_SVG.warm}>window</text>
      <text x="140" y="140" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>room floor plan</text>

      <g fontSize="11">
        <text x="320" y="80" fontWeight="600" fill={GUIDE_SVG.ink}>1. Perimeter</text>
        <text x="320" y="98" fill={GUIDE_SVG.inkMuted}>14 + 14 + 12 + 12 = 52 ft</text>

        <text x="320" y="128" fontWeight="600" fill={GUIDE_SVG.ink}>2. Gross wall area</text>
        <text x="320" y="146" fill={GUIDE_SVG.inkMuted}>52 ft × 9 ft height = 468 ft²</text>

        <text x="320" y="176" fontWeight="600" fill={GUIDE_SVG.ink}>3. Subtract openings</text>
        <text x="320" y="194" fill={GUIDE_SVG.inkMuted}>1 door (21) + 1 window (15) = 36 ft²</text>

        <text x="320" y="222" fontWeight="700" fill={GUIDE_SVG.accent}>4. Net area to cover</text>
        <text x="320" y="240" fontWeight="700" fill={GUIDE_SVG.accent}>468 - 36 = 432 ft²</text>
        <text x="320" y="256" fontSize="9" fill={GUIDE_SVG.inkFaint}>Then divide by roll coverage, adding pattern-repeat waste.</text>
      </g>
    </svg>
  );
}

function RollCoverageSVG() {
  const rolls = [
    { label: 'US single roll (27" × 27 ft)', sqft: 36, usable: 30 },
    { label: 'US double roll (27" × 27 ft ×2)', sqft: 72, usable: 60 },
    { label: 'Euro roll (21" × 33 ft)', sqft: 57, usable: 47 },
    { label: 'Wide-format (36" × 24 ft)', sqft: 72, usable: 60 },
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
    { label: 'Small repeat (6-8")', waste: "5-10%", w: 100 },
    { label: 'Medium repeat (12-18")', waste: "10-15%", w: 150 },
    { label: 'Large repeat (21-24")', waste: "15-25%", w: 250 },
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
    { label: "Peel-and-stick (removable)", cost: "$1-4/ft²", note: "Rentals, accent walls, temporary" },
    { label: "Vinyl-coated (standard)", cost: "$1-5/ft²", note: "Kitchens, bathrooms, durable" },
    { label: "Non-woven (paste-the-wall)", cost: "$2-8/ft²", note: "Most common for living spaces" },
    { label: "Designer / grasscloth", cost: "$5-25/ft²", note: "Premium, natural fibers, delicate" },
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
      <GuideByline updated="July 13, 2026" reviewedAgainst="Wallcoverings Association estimating standards, ASTM F793 wallcovering classifications, and York and Graham & Brown product specifications" />

      <h2>How to measure a wall for wallpaper</h2>

      <p>Every wallpaper estimate starts the same way: measure the walls, subtract the big openings, and you have the area to cover. Add up the width of every wall you&apos;re papering to get the perimeter, then multiply by the ceiling height. A 12 by 14 room has a perimeter of 52 feet, and at a 9-foot ceiling that&apos;s 468 square feet of gross wall. If you&apos;re only papering an accent wall, just use that one wall&apos;s width times the height.</p>

      <Figure number={1} caption="Add the four wall widths for the perimeter, multiply by ceiling height, then subtract doors and large windows. What's left is the net area the calculator turns into rolls.">
        <MeasureWallSVG />
      </Figure>

      <p>Then subtract the openings, but only the large ones. A standard door is about 21 square feet and a typical window about 15, so a room with one of each drops from 468 to 432 square feet. Small windows and anything you&apos;ll paper around tightly aren&apos;t worth subtracting, because the offcuts rarely reuse cleanly, and the leftover margin protects you against a miscut. That net area is what the calculator above needs, along with the roll size and pattern repeat, to give you a roll count.</p>

      <MethodologyNote>
        <p>Roll coverage uses Wallcoverings Association standard dimensions. Net area is gross wall area (perimeter times height) minus roughly 21 square feet per door and 15 per window. Pattern-repeat waste follows industry estimating practice: usable strip length is reduced by up to one full repeat per strip. The calculator subtracts openings, applies the repeat waste, and divides by usable roll coverage.</p>
      </MethodologyNote>

      <h2>Wallpaper roll sizes: single, double, and metric</h2>

      <Figure number={2} caption="A US double roll is the common unit and covers about 60 usable square feet after trimming. European and metric rolls differ, so always buy by usable coverage, not the label.">
        <RollCoverageSVG />
      </Figure>

      <p>The most confusing thing about buying wallpaper is that it&apos;s priced and sold in a unit that isn&apos;t the unit that hangs on your wall. In the US, wallpaper is almost always sold as a double roll: two single rolls&apos; worth of paper on one bolt. A double roll is the standard purchase unit even though the price tag sometimes quotes the single-roll figure, which trips up first-time buyers into thinking they need twice as many as they do. A US double roll holds about 72 square feet on the bolt and covers roughly 60 after you trim the top and bottom of each strip.</p>

      <p>European and metric rolls run narrower and longer, so their coverage is different, and grasscloth and wide-format papers differ again. The single rule that survives all of it: buy by usable square feet, not by the number on the label. The calculator&apos;s roll-size selector is built around usable coverage precisely so the roll count reflects what actually reaches the wall.</p>

      <Callout label="Buy all your rolls in one dye lot">Wallpaper is printed in batches, and color varies slightly between batches. Every roll carries a dye lot (or batch) number, and rolls from different lots can differ enough to show a seam on the wall. Buy every roll for a room in a single dye lot, and buy the extra roll up front, because coming back weeks later for one more roll in a matching lot is often impossible.</Callout>

      <h2>Pattern repeat is the variable that ruins every estimate</h2>

      <p>Roll coverage tells you how much paper is on the bolt. Pattern repeat tells you how much of it you&apos;ll actually use, and it&apos;s the number that separates a clean estimate from an ugly surprise. The repeat is the vertical distance before the design starts over. To align the pattern across two adjacent strips, you often have to cut each strip longer than the wall height and discard the difference, and that discard can be as much as one full repeat per strip.</p>

      <Figure number={3} caption="A solid texture wastes almost nothing. A large botanical print with a 24-inch repeat can waste a quarter of the material to pattern matching alone.">
        <PatternRepeatSVG />
      </Figure>

      <p>Put numbers on it. A 21-inch repeat on paper for a 9-foot (108-inch) ceiling means each strip has to be cut to the next multiple of the repeat above the wall height. So instead of 108 inches per strip you cut to 126 inches, and 18 inches goes in the bin. On a room that needs 15 strips, that&apos;s over 22 feet of wallpaper wasted purely on pattern matching, which is often a full extra roll. The bigger the repeat, the more you lose, which is why a bold large-scale print always needs more rolls than a plain texture covering the identical wall.</p>

      <Callout label="Drop match vs straight match">Straight match: the pattern aligns at the same height on every strip. Drop match: alternating strips shift down by half the repeat. Drop match wastes more, because you are effectively working with a repeat twice the stated size. If the label says a 21-inch drop match, estimate it as a 42-inch repeat.</Callout>

      <Scenario location="Brooklyn, NY">
        A couple ordered 6 double rolls for a 14-foot accent wall with 9-foot ceilings. The paper had a 24-inch straight-match repeat. By wall area alone, 6 rolls looked like plenty. After hanging 5 strips and matching every seam, the 18 inches left on the 6th roll was not enough for a full-height pattern-matched strip, so they needed a 7th roll to finish. One extra roll, same dye lot, about $85. The alternative was a visible mismatch on the most prominent wall in the room. Ordering the repeat waste up front, the way the calculator does, would have put 7 rolls in the cart from the start.
      </Scenario>

      <h2>What wallpaper costs</h2>

      <Figure number={4} caption="Peel-and-stick is cheapest and removable. Designer grasscloth can run $25 per square foot before installation.">
        <CostRangeSVG />
      </Figure>

      <p>Material cost swings widely by type. Peel-and-stick is the budget, renter-friendly option and the easiest to hang. Standard vinyl and non-woven papers sit in the middle and cover most living spaces. Designer papers and natural grasscloth are where the price climbs, and grasscloth adds the complication that it has no repeat to match but shows seams and shading, so it&apos;s less forgiving to hang despite the simple math.</p>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Wallpaper (12×14 room, 4 walls)",values:["$300-800","$300-800"]},
          {label:"Paste / adhesive",values:["$15-30","Included"]},
          {label:"Tools (smoother, knife, seam roller)",values:["$20-30","Own tools"]},
          {label:"Labor",values:["$0 (full day per room)","$400-800"]},
          {label:"Total per room",values:[<strong key="d">$335-860</strong>,<strong key="p">$700-1,600</strong>]},
        ]}
        caption="Peel-and-stick is genuinely DIY-friendly. Traditional paste-the-wall paper is moderate. Pre-pasted paper is the easiest of the traditional types."
      />

      <h2>Prep the wall before the first strip</h2>

      <p>The measurement gets the rolls right, but the wall underneath decides whether they stay up. Wallpaper needs a smooth, clean, sealed surface, and the prep is where most bad results actually start, not the hanging. Bare new drywall has to be primed first, because the porous paper face grabs adhesive unevenly and, worse, bonds so hard that the wallpaper becomes nearly impossible to remove later without tearing the drywall face off with it. A coat of wallpaper primer (sometimes called sizing) seals the surface and gives a uniform grip.</p>

      <p>Previously painted walls usually just need cleaning and a light scuff, though glossy paint should be dulled so the adhesive can bite. Existing wallpaper should come off entirely rather than getting papered over, since hanging new paper over old traps the seams and bubbles of the layer beneath and telegraphs them through. And any holes or dents should be filled and sanded flush first, because wallpaper highlights a bad surface rather than hiding it, especially in raking light. Skipping prep is the false economy that turns a clean roll count into a peeling, bubbled wall a month later.</p>

      <h2>Where wallpaper estimates go wrong</h2>

      <p><strong>Ignoring the pattern repeat.</strong> The biggest and most expensive miss. Estimating from wall area alone, with no repeat waste, leaves you one or two rolls short on any patterned paper, and by the time you notice you&apos;re mid-project and the dye lot is gone. Always add the repeat.</p>

      <p><strong>Confusing single and double rolls.</strong> US wallpaper is sold in double rolls but sometimes priced by the single. Order &quot;10 rolls&quot; when you meant 10 double rolls and you might get half what you need, or double. Confirm the unit before you buy.</p>

      <p><strong>Buying across dye lots.</strong> Splitting an order across two batches, or going back for one more later, risks a visible color shift on the wall. One lot, bought all at once, with the spare roll included.</p>

      <p><strong>Subtracting every little opening.</strong> Taking out small windows and outlets to save paper backfires, because those offcuts almost never reuse and the missing margin leaves you short on the next miscut. Subtract only doors and large windows.</p>

      <p>If you&apos;re still weighing wallpaper against a simpler finish, the <a href="/paint-calculator">paint calculator</a> uses the same wall measurements you took here, and paint runs three to five times cheaper in materials and far faster to apply. Most homeowners wallpaper one or two feature rooms and paint the rest. If you&apos;re papering over new drywall, the <a href="/drywall-calculator">drywall calculator</a> covers the surface underneath.</p>
    </>
  );
}
