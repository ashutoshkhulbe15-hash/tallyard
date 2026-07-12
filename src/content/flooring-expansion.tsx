import { Figure, GuideByline, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

/**
 * Square-footage measurement diagram. The linkable hero: an L-shaped room
 * broken into labeled rectangles. Serves the "how to figure square footage
 * for flooring" cluster visually.
 */
function SquareFootageSVG() {
  return (
    <svg
      viewBox="0 0 680 400"
      width="100%"
      height="auto"
      role="img"
      aria-label="An L-shaped room broken into three rectangles A, B, and C to calculate total flooring square footage, with a closet added and dimensions labeled on each section, then a waste factor added."
    >
      <text x="20" y="26" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>
        Figuring square footage: break the room into rectangles
      </text>

      <rect x="80" y="70" width="260" height="160" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <text x="210" y="145" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.accent}>A</text>
      <text x="210" y="165" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.inkMuted}>14 x 12 = 168 ft²</text>

      <rect x="340" y="130" width="150" height="100" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <text x="415" y="175" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.accent}>B</text>
      <text x="415" y="194" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.inkMuted}>8 x 6 = 48 ft²</text>

      <rect x="80" y="230" width="90" height="60" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.accent} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="125" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.accent}>C</text>
      <text x="125" y="272" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.inkMuted}>4x5=20</text>
      <text x="125" y="305" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={GUIDE_SVG.inkFaint}>closet (add it)</text>

      <text x="210" y="60" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm}>14 ft</text>
      <line x1="80" y1="64" x2="340" y2="64" stroke={GUIDE_SVG.warm} strokeWidth="0.75" />
      <text x="66" y="150" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm} transform="rotate(-90 66 150)">12 ft</text>
      <line x1="72" y1="70" x2="72" y2="230" stroke={GUIDE_SVG.warm} strokeWidth="0.75" />

      <rect x="400" y="285" width="220" height="86" rx="8" fill={GUIDE_SVG.accent} opacity="0.08" stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="510" y="312" textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="700" fill={GUIDE_SVG.accent}>A + B + C</text>
      <text x="510" y="333" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={GUIDE_SVG.ink}>168 + 48 + 20 = 236 ft²</text>
      <text x="510" y="356" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.warm}>+ 10% waste = 260 ft²</text>

      <text x="80" y="360" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.inkFaint}>Measure each rectangle, add them,</text>
      <text x="80" y="375" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.inkFaint}>then add a waste factor. Buy to that number.</text>
    </svg>
  );
}

export function FlooringCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 20, 2026"
        reviewedAgainst="NWFA installation guidelines, ASTM F710 subfloor moisture standards, and flooring manufacturer acclimation specs"
      />

      <h2>Flooring is sold by the square foot, so measuring is the whole game</h2>
      <p>
        Every flooring project comes down to one number: how many square feet you
        need to buy. Get it right and the job goes smoothly. Get it wrong and you
        either run out three rows from the finish, with the same lot number now
        sold out, or you overbuy by 40 percent and eat the cost. The calculator up
        top turns your room into a material count, but the number it needs from you
        is the square footage, and that is the part people fumble. So this page
        starts there: how to actually figure the square footage of a room, including
        the awkward ones that are not simple rectangles.
      </p>
      <p>
        The good news is that a room of almost any shape is just a few rectangles
        stuck together. Measure each rectangle, add them up, add a waste factor for
        the pieces you will cut and throw away, and that is your number. Here is the
        method on an L-shaped room.
      </p>

      <Figure
        number={1}
        caption="Any room is a set of rectangles. Split it, measure each piece in feet, multiply length by width, and add the pieces together. Add closets and alcoves. Then add a waste factor and buy to that total."
      >
        <SquareFootageSVG />
      </Figure>

      <h2>How to figure square footage for flooring</h2>
      <p>
        Start by drawing the room from above, roughly to scale, on a piece of paper.
        Then divide it into rectangles along the walls. A plain rectangular bedroom
        is one rectangle. An L-shaped living room is two. A room with a bumped-out
        bay or a closet is that many more. The goal is to end up with shapes you can
        measure with a straight tape: length times width.
      </p>
      <p>
        Measure each rectangle in feet, and if a dimension lands between feet, use
        the decimal, so 12 feet 6 inches is 12.5 feet. Multiply length by width for
        each rectangle, then add all the rectangles together. In the diagram, a 14
        by 12 main area is 168 square feet, an 8 by 6 extension is 48, and a 4 by 5
        closet is 20, for 236 square feet of actual floor. Do not skip the closet.
        Flooring usually runs into closets, and a forgotten closet is exactly the
        kind of small miss that leaves you a box short.
      </p>
      <p>
        A few rules keep this honest. Measure to the wall, not to the baseboard,
        since the baseboard comes off. Do not subtract for kitchen islands or
        cabinets that are already in place unless they are permanent and staying,
        because the difference is small and the safety margin is worth more than the
        savings. And do not try to subtract for doorways, since you want flooring to
        run into them. Once you have the raw square footage, you are ready for the
        part that trips up even careful people: waste.
      </p>

      <h2>The waste factor is not optional</h2>
      <p>
        You never buy exactly your square footage. Every cut at a wall leaves an
        offcut, and only some of those offcuts are long enough to start the next
        row. The rest are scrap. So you buy extra, and how much extra depends
        entirely on how you lay the floor. A simple straight layout wastes little. A
        diagonal or a herringbone pattern wastes a lot, because the angled cuts at
        every wall produce triangular scrap that cannot be reused.
      </p>

      <ComparisonTable
        columns={[
          { title: "Lay pattern", highlight: true },
          { title: "Add for waste" },
          { title: "Why" },
        ]}
        rows={[
          { label: "Straight lay", values: ["5%", "Clean cuts, most offcuts reusable"] },
          { label: "Staggered (1/3 offset)", values: ["7 to 10%", "The standard for plank; slight extra cutting"] },
          { label: "Diagonal (45 degrees)", values: ["15%", "Angled wall cuts make triangular scrap"] },
          { label: "Herringbone", values: ["18 to 20%", "Every piece is cut; heavy offcut loss"] },
        ]}
        caption="Add the waste percentage to your measured square footage before you buy. On a 236 square foot room, a staggered plank floor at 10 percent means buying about 260 square feet."
      />

      <p>
        Buy one extra factor beyond waste too: an extra box for the future. Floors
        get damaged, and dye lots change, so the plank that matches today will not
        match in three years. One spare box in the closet is cheap insurance against
        a repair that otherwise means refloring the whole room. Add it to the order,
        not to the waste math, so you can see it as the deliberate choice it is.
      </p>

      <h2>What each material costs</h2>
      <p>
        The material you choose drives both the price and the install difficulty,
        and the spread is enormous, from about a dollar a square foot for cheap
        laminate to eighteen for solid hardwood before anyone lifts a tool. Here is
        the honest comparison in 2026 dollars, material only, before installation.
      </p>

      <ComparisonTable
        columns={[
          { title: "Vinyl plank (LVP)", highlight: true },
          { title: "Laminate" },
          { title: "Engineered wood" },
          { title: "Solid hardwood" },
          { title: "Tile" },
        ]}
        rows={[
          { label: "Material per ft²", values: ["$2 to 7", "$1 to 5", "$4 to 14", "$6 to 18", "$3 to 15"] },
          { label: "Install per ft²", values: ["$3 to 6", "$3 to 6", "$4 to 8", "$6 to 12", "$7 to 14"] },
          { label: "Lifespan", values: ["15 to 25 yr", "15 to 25 yr", "20 to 40 yr", "50 to 100 yr", "50+ yr"] },
          { label: "DIY difficulty", values: ["Easy", "Easy", "Moderate", "Hard", "Hard"] },
          { label: "Wet rooms", values: ["Excellent", "Poor", "Fair", "Poor", "Excellent"] },
        ]}
        caption="Vinyl plank is the value pick for most rooms and the only easy DIY option that also handles bathrooms and basements. Solid hardwood lasts generations but costs the most and is the hardest to install. Tile is forever but slow and skilled work."
      />

      <p>
        The install cost is the part people forget when they compare flooring by the
        sticker price. Labor often matches or exceeds the material, so a $5 per
        square foot hardwood becomes $11 to 17 installed, while a $3 vinyl plank
        becomes $6 to 9. On a 1,200 square foot house, that is the difference between
        roughly $7,000 and $18,000 all in. If you want a full installed estimate,
        the <a href="/cost-to-install-flooring">cost to install flooring</a> guide
        breaks it down by material and region.
      </p>

      <Scenario location="1,200 ft² whole-house LVP install">
        A homeowner measures 1,200 square feet across the living areas and bedrooms,
        planning a staggered vinyl plank layout. Waste at 10 percent brings the buy
        to 1,320 square feet, plus one spare box of about 20 square feet, so 1,340
        total. At $4 a square foot for mid-grade LVP, material runs about $5,360.
        Hiring the install at $4 a foot on the measured 1,200 adds $4,800, for
        roughly $10,160 all in. Doing it themselves saves that $4,800, and LVP is the
        material where DIY is realistic, which is a big part of why it has taken over
        the market.
      </Scenario>

      <h2>Acclimation and expansion gaps: the two rules that prevent buckling</h2>
      <p>
        Wood and laminate move with humidity. They swell when the air is damp and
        shrink when it is dry, and a floor installed without allowing for that
        movement will buckle up in the middle or gap open at the seams within a
        season. Two habits prevent it, and both are free.
      </p>
      <p>
        First, acclimate the flooring. Bring the boxes into the actual room where
        they will be installed, open or loosely stack them, and leave them for the
        time the manufacturer specifies, usually 48 to 72 hours for wood and
        laminate. This lets the material reach the room's normal temperature and
        humidity before it is locked down, so it is not going to make a big move
        after installation. Skipping this step is the single most common cause of a
        floor that fails.
      </p>
      <p>
        Second, leave an expansion gap. Every wood, laminate, and vinyl plank floor
        needs a gap of about a quarter to a half inch around the entire perimeter,
        against every wall and every fixed object, so the floor has room to expand
        without pushing against anything. The baseboard and shoe molding hide the
        gap. Butt a floating floor tight to the walls and it has nowhere to go when
        it swells, so it lifts. The gap is invisible when the job is done and
        essential while it works.
      </p>

      <Callout label="Subfloor first">
        Flooring only goes down as flat as what is under it. A subfloor should be
        flat within about 3/16 inch over 10 feet, clean, dry, and solid. Fix squeaks
        and high spots before the new floor goes down, because every dip and bump
        telegraphs through, especially with thin vinyl and laminate. For concrete
        slabs, test for moisture first (ASTM F710), since a slab that reads wet will
        ruin wood and laminate from below.
      </Callout>

      <h2>Underlayment and transitions</h2>
      <p>
        Most floating floors need an underlayment, a thin foam or cork layer between
        the subfloor and the planks that cushions the floor, quiets it underfoot,
        and in many products adds a moisture barrier. Some vinyl planks come with
        underlayment already attached, in which case adding more can actually void
        the warranty, so check the product before buying a separate roll. Match the
        underlayment to the material and the subfloor, and use a moisture barrier
        over any concrete.
      </p>
      <p>
        Where the new floor meets another floor or a doorway, you need a transition
        strip, and it is easy to forget to buy them. Count your doorways and the
        spots where flooring changes, since each one needs a T-molding, a reducer, or
        a threshold. If you are also redoing the walls or trim in the same room, the{" "}
        <a href="/tile-calculator">tile calculator</a> handles any tiled areas like a
        bathroom or entry, and the{" "}
        <a href="/grout-calculator">grout calculator</a> covers the grout for those.
      </p>

      <h2>Where flooring jobs go wrong</h2>
      <p>
        The failures are mostly measuring and prep mistakes, and all of them are
        cheaper to avoid than to fix. Underbuying tops the list, usually from
        forgetting the waste factor or a closet, and it is the worst one because the
        matching lot sells out. Right behind it is skipping acclimation, which shows
        up weeks later as a buckled or gapped floor that has to come up and go back
        down.
      </p>
      <p>
        Then the prep misses. Laying a floor over a subfloor that was never
        flattened, so every dip shows. Butting a floating floor tight to the walls
        with no expansion gap, so it lifts in humid weather. Putting laminate in a
        bathroom, where the first spill swells the seams. And forgetting the
        transition strips and spare box, small items that turn into a second trip to
        the store mid-project. None of these are hard. Measure carefully, add your
        waste, acclimate the material, prep the subfloor, and leave the gap, and the
        floor you buy is the floor that lasts.
      </p>
    </>
  );
}
