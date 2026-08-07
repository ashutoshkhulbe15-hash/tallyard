import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function BrickSizeSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="A modular brick measures 7-5/8 by 3-5/8 by 2-1/4 inches. With a 3/8 inch mortar joint it lays out to a nominal 8 by 4 by 2-2/3 inches, and about 6.9 bricks cover one square foot of wall.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The modular brick, measured honestly</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Actual size plus a 3/8 inch mortar joint equals the nominal size the wall math uses</text>
      <g>
        <path d="M 60 150 L 200 150 L 200 190 L 60 190 Z" fill={GUIDE_SVG.warm} opacity="0.25" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
        <path d="M 60 150 L 90 128 L 230 128 L 200 150 Z" fill={GUIDE_SVG.warm} opacity="0.4" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
        <path d="M 200 150 L 230 128 L 230 168 L 200 190 Z" fill={GUIDE_SVG.warm} opacity="0.55" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
        <text x="130" y="208" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink}>7-5/8&quot; long</text>
        <text x="240" y="185" fontSize="10" fill={GUIDE_SVG.ink}>2-1/4&quot; high</text>
        <text x="238" y="122" fontSize="10" fill={GUIDE_SVG.ink}>3-5/8&quot; deep</text>
      </g>
      <g fontSize="11">
        <text x="380" y="90" fontWeight="600" fill={GUIDE_SVG.ink}>Actual (what you hold)</text>
        <text x="380" y="108" fill={GUIDE_SVG.inkMuted}>7-5/8 x 3-5/8 x 2-1/4 in</text>
        <text x="380" y="140" fontWeight="600" fill={GUIDE_SVG.ink}>Nominal (with 3/8&quot; joint)</text>
        <text x="380" y="158" fill={GUIDE_SVG.inkMuted}>8 x 4 x 2-2/3 in</text>
        <text x="380" y="190" fontWeight="700" fill={GUIDE_SVG.accent}>Coverage: about 6.9 bricks</text>
        <text x="380" y="208" fontWeight="700" fill={GUIDE_SVG.accent}>per square foot of wall face</text>
      </g>
      <text x="20" y="240" fontSize="9" fill={GUIDE_SVG.inkFaint}>Three nominal courses stack to exactly 8 inches, which is why block and brick walls line up.</text>
    </svg>
  );
}

function WallMathSVG() {
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Brick wall math: a 20 by 6 foot wall is 120 square feet. At 6.9 bricks per square foot that is 828 bricks, plus 5 percent waste, order 870.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>From wall to order quantity</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Single wythe (one brick thick), running bond, modular brick</text>
      <rect x="50" y="70" width="220" height="110" fill={GUIDE_SVG.warm} opacity="0.18" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      {[0,1,2,3,4].map(r => (
        <line key={r} x1="50" y1={70+22*(r+0)} x2="270" y2={70+22*r} stroke={GUIDE_SVG.warm} strokeWidth="0.75" opacity="0.5" />
      ))}
      <text x="160" y="200" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink}>20 ft</text>
      <text x="40" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink} transform="rotate(-90,40,128)">6 ft</text>
      <g fontSize="11">
        <text x="330" y="86" fontWeight="600" fill={GUIDE_SVG.ink}>1. Wall area</text>
        <text x="330" y="104" fill={GUIDE_SVG.inkMuted}>20 ft x 6 ft = 120 ft&#178;</text>
        <text x="330" y="132" fontWeight="600" fill={GUIDE_SVG.ink}>2. Bricks per ft&#178;</text>
        <text x="330" y="150" fill={GUIDE_SVG.inkMuted}>120 x 6.9 = 828 bricks</text>
        <text x="330" y="178" fontWeight="600" fill={GUIDE_SVG.ink}>3. Waste at 5%</text>
        <text x="330" y="196" fill={GUIDE_SVG.inkMuted}>828 x 1.05 = 870 bricks</text>
        <text x="330" y="226" fontWeight="700" fill={GUIDE_SVG.accent}>Order 870. Cubes hold about 500, so two cubes.</text>
      </g>
    </svg>
  );
}

export function BrickCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="Brick Industry Association Technical Notes 10 and 10B (dimensioning), ASTM C216 facing brick standard"
      />

      <h2>A brick is not the size you think it is</h2>
      <p>
        The standard US modular brick measures 7-5/8 by 3-5/8 by 2-1/4
        inches. Not 8 by 4. The missing 3/8 inch on each dimension is the
        mortar joint, so brick plus joint lays out to a clean nominal 8 by
        4 by 2-2/3 inches, and three courses stack to exactly 8 inches.
        Every wall dimension in masonry is built on that trick, and every
        brick order that comes up short traces back to someone doing the
        math with the number stamped in the catalog instead of the brick
        plus its joint.
      </p>
      <p>
        The working number that falls out of it: about 6.9 modular bricks
        cover one square foot of single-wythe wall. Call it 7 for
        head math. The calculator above runs the exact figure for your
        wall size, brick type, and waste factor. This page covers the
        size chart, the per-square-foot coverage for every common brick,
        what bricks cost in 2026, and the ordering mistakes that strand
        projects half a cube short.
      </p>

      <Figure
        number={1}
        caption="Actual versus nominal. The 3/8 inch mortar joint is part of the layout, which is why 6.9 bricks, not 8, cover a square foot."
      >
        <BrickSizeSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Dimensions and coverage follow Brick Industry Association
          Technical Notes 10 and 10B, which define modular sizing and
          coursing. Facing brick quality is governed by ASTM C216 and
          building brick by ASTM C62. Coverage figures assume a 3/8 inch
          joint and running bond; stack bond and wider joints change the
          count slightly.
        </p>
      </MethodologyNote>

      <h2>The brick size chart</h2>

      <ComparisonTable
        caption="Common US brick sizes per BIA Technical Note 10B. Coverage is face bricks per square foot of wall with a 3/8 inch mortar joint."
        columns={[
          { title: "Actual size (in)" },
          { title: "Bricks per ft²", highlight: true },
        ]}
        rows={[
          { label: "Modular", values: ["7-5/8 x 3-5/8 x 2-1/4", "6.9"] },
          { label: "Standard", values: ["8 x 3-5/8 x 2-1/4", "6.6"] },
          { label: "Queen", values: ["7-5/8 x 3-1/8 x 2-3/4", "5.8"] },
          { label: "King", values: ["9-5/8 x 3-1/8 x 2-5/8", "4.8"] },
          { label: "Engineer modular", values: ["7-5/8 x 3-5/8 x 2-13/16", "5.6"] },
          { label: "Utility", values: ["11-5/8 x 3-5/8 x 3-5/8", "3.0"] },
        ]}
      />

      <p>
        Two answers to the questions people actually type. How many bricks
        in one square foot: 6.9 for modular, so a 4 inch single-wythe
        wall runs about 7 bricks per square foot, and a double-wythe 8
        inch wall doubles it to 14. How much wall do 1,000 bricks build:
        1,000 divided by 6.9 is about 145 square feet of single-wythe
        face, or a wall 20 feet long and 7 feet high with a few bricks
        left for the inevitable cuts.
      </p>

      <h2>What bricks cost in 2026</h2>
      <p>
        Common facing brick runs $0.50 to $0.90 per brick at masonry
        yards, which lands at $350 to $650 per thousand. Big box stores
        sell smaller quantities at $0.60 to $1.20 each. Specialty runs
        higher: glazed, thin veneer, and reclaimed brick each command
        $1.50 to $4.00 per unit, with genuine reclaimed Chicago common at
        the top of that range. Delivery matters more than people budget:
        a cube of brick weighs around 2,000 pounds, most yards charge
        $75 to $150 per drop, and nobody hauls 870 bricks in a sedan.
        Mortar rides on top at roughly one 80 lb bag of premix per 35 to
        40 bricks, which the{" "}
        <a href="/mortar-calculator">mortar calculator</a> figures
        exactly.
      </p>

      <Figure
        number={2}
        caption="The whole estimate in three steps. Cubes (also called cages or straps) hold roughly 500 modular bricks depending on the plant, so confirm the count on the quote."
      >
        <WallMathSVG />
      </Figure>

      <Scenario location="St. Louis, MO">
        <p>
          A garden wall along a patio: 20 feet long, 6 feet high, single
          wythe in modular brick, running bond. Area: 120 ft&#178;. Count:
          120 x 6.9 = 828 bricks. With 5 percent waste for cuts and
          breakage: 870 bricks ordered, which is two 500-count cubes.
        </p>
        <p>
          At a St. Louis yard price of $0.68 per brick, the brick bill is
          about $592 plus one $95 delivery. Mortar at one bag per 38
          bricks is 23 bags of Type N premix, about $210. A wall this
          height also wants a concrete footing below frost depth and a
          cap course on top; the footing concrete is its own line item
          through the concrete calculator. Total masonry materials land
          near $900 before the footing.
        </p>
      </Scenario>

      <h2>Where brick orders go wrong</h2>
      <p>
        <strong>Ordering from the nominal size.</strong> Nominal 8 x 4
        math on actual walls undercounts by the mortar volume. Use the
        per-square-foot figures above; they already include the joint.
      </p>
      <p>
        <strong>Skipping the second delivery problem.</strong> Brick
        color varies by kiln run. Order the whole job at once and have
        the mason blend from three cubes as they lay, because a
        top-up order six weeks later will not match, and a color-banded
        wall is forever.
      </p>
      <p>
        <strong>Forgetting openings cut both ways.</strong> Subtract
        windows and doors from the wall area, but add bricks back for
        the cut units around every opening. Five percent waste covers a
        clean rectangular wall; use 10 percent when the wall has arches,
        angles, or more than a couple of openings.
      </p>
      <p>
        <strong>Treating veneer like structure.</strong> A single wythe
        of brick over a frame house is cladding, not a bearing wall, and
        it needs brick ties to the studs every 16 inches vertically and
        weep holes at the base per BIA detailing. A freestanding garden
        wall over 4 feet usually needs an engineered footing and, in
        many jurisdictions, a permit.
      </p>

      <Callout label="Cubes are not a standard number">
        Plants strap bricks in cubes of roughly 400 to 530 depending on
        the size and maker. Two suppliers quoting &quot;two cubes&quot;
        can be quoting counts 200 bricks apart. Compare quotes per
        thousand bricks, never per cube.
      </Callout>

      <h2>The rest of the masonry math</h2>
      <p>
        Brick rarely shows up alone. The{" "}
        <a href="/mortar-calculator">mortar calculator</a> covers the
        bags and sand for the joints, the{" "}
        <a href="/concrete-calculator">concrete calculator</a> handles
        the footing under any freestanding wall, and a brick walkway
        beside the wall is a base-and-pattern problem the{" "}
        <a href="/paver-calculator">paver calculator</a> already solves.
      </p>
      <p>
        Measure the wall, run the calculator above, and order once. The
        color-match rule alone pays for the five minutes of math.
      </p>
    </>
  );
}
