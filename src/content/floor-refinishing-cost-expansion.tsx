import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function RefinishDecisionSVG() {
  return (
    <svg viewBox="0 0 680 380" width="100%" height="auto" role="img" aria-label="Decision path for hardwood floors: water bead test determines whether a screen and recoat will work, wood thickness above the tongue determines whether a full sand is possible, and floors with too little wood left must be replaced">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Two tests decide what your floor needs</text>

      {/* Test 1 */}
      <rect x="16" y="44" width="300" height="86" rx="4" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="30" y="68" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>TEST 1: the water drop</text>
      <text x="30" y="88" fontSize="11" fill={GUIDE_SVG.inkMuted}>Put a few drops on a worn traffic path.</text>
      <text x="30" y="106" fontSize="11" fill={GUIDE_SVG.inkMuted}>Wait two minutes. Does it bead or soak in?</text>

      {/* Test 2 */}
      <rect x="364" y="44" width="300" height="86" rx="4" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="378" y="68" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>TEST 2: the vent cover</text>
      <text x="378" y="88" fontSize="11" fill={GUIDE_SVG.inkMuted}>Pull a floor vent and look at the board edge.</text>
      <text x="378" y="106" fontSize="11" fill={GUIDE_SVG.inkMuted}>How much wood sits above the tongue?</text>

      {/* arrows */}
      <line x1="166" y1="130" x2="166" y2="158" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <line x1="514" y1="130" x2="514" y2="158" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />

      {/* outcomes row 1 */}
      <rect x="16" y="158" width="144" height="82" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="88" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>BEADS UP</text>
      <text x="88" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Screen + recoat</text>
      <text x="88" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill={GUIDE_SVG.accent}>$1.20-2/ft²</text>
      <text x="88" y="234" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>one day</text>

      <rect x="172" y="158" width="144" height="82" rx="4" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="244" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.warm}>SOAKS IN</text>
      <text x="244" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Full sand needed</text>
      <text x="244" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>$3-5/ft²</text>
      <text x="244" y="234" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>check test 2 first</text>

      <rect x="364" y="158" width="144" height="82" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="436" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>3/16&#8243; OR MORE</text>
      <text x="436" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Sanding is fine</text>
      <text x="436" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill={GUIDE_SVG.accent}>$3-5/ft²</text>
      <text x="436" y="234" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>several passes left</text>

      <rect x="520" y="158" width="144" height="82" rx="4" fill="#FBEDEB" stroke="#B03A2E" strokeWidth="1.5" />
      <text x="592" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill="#B03A2E">LESS THAN 3/16&#8243;</text>
      <text x="592" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Replace instead</text>
      <text x="592" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="#B03A2E">$10-16/ft²</text>
      <text x="592" y="234" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>no sanding left</text>

      {/* cost bar comparison */}
      <text x="16" y="284" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>What each path costs on a 500 sq ft floor</text>
      <rect x="16" y="296" width="70" height="20" fill={GUIDE_SVG.accent} />
      <text x="94" y="311" fontSize="11" fill={GUIDE_SVG.inkMuted}>Screen and recoat  $750</text>
      <rect x="16" y="320" width="200" height="20" fill={GUIDE_SVG.cool} />
      <text x="224" y="335" fontSize="11" fill={GUIDE_SVG.inkMuted}>Full sand and refinish  $2,000</text>
      <rect x="16" y="344" width="650" height="20" fill={GUIDE_SVG.inkMuted} />
      <text x="640" y="358" textAnchor="end" fontSize="11" fill="#fff">Replace with new hardwood  $6,500</text>
    </svg>
  );
}

export function FloorRefinishingCostExpansion() {
  return (
    <>
      <GuideByline
        updated="July 29, 2026"
        reviewedAgainst="NWFA sand and finish guidelines, USDA Forest Products Laboratory wood data, and EPA indoor air quality guidance on finish VOCs"
      />

      <h2>What refinishing costs</h2>

      <p>$3 to $5 per square foot for a full sand and refinish, so roughly $1,500 to $2,500 on a 500 square foot floor. Adding a stain coat pushes it to $4 to $6. A screen and recoat, which skips sanding entirely, runs $1.20 to $2. Replacing the same floor with new hardwood costs $10 to $16 per square foot, which is the number that makes refinishing worth understanding properly.</p>

      <p>Most floors that look finished are not. Before pricing anything, two tests tell you which path you are actually on, and both take five minutes.</p>

      <Figure number={1} caption="The water drop test says whether the finish is still doing its job. The vent cover test says whether there is wood left to sand. Together they eliminate the wrong quote before you get it.">
        <RefinishDecisionSVG />
      </Figure>

      <MethodologyNote>
        <p>Rates reflect typical 2026 US contractor pricing. Coat counts and abrasive sequence follow NWFA sand and finish guidelines. Replacement comparison prices new hardwood at roughly $13 per square foot installed. Crew minimums apply on small jobs because mobilizing equipment costs the same regardless of room size.</p>
      </MethodologyNote>

      <h2>The water drop test</h2>

      <p>Put a few drops of water on the most worn traffic path you have, usually a doorway or the path from the kitchen. Wait two minutes. If the water sits in a bead, the finish is intact and only worn on the surface, which means a screen and recoat will bond and you can skip sanding entirely. If the water soaks in and darkens the wood, the finish is breached, the wood is now absorbing whatever lands on it, and a full sand is the only real option.</p>

      <p>This single test moves a 500 square foot job between $750 and $2,000, and plenty of homeowners pay for a full sand on a floor that only needed a recoat. Contractors will not always volunteer the cheaper option. Run the test yourself, then ask for both quotes.</p>

      <h2>The vent cover test</h2>

      <p>Pull up a floor register and look at the cut edge of the boards in cross-section. On solid 3/4 inch flooring you are looking for the distance from the surface down to the tongue, the little protrusion on the board edge. About 3/16 of an inch is the working threshold: each sanding removes roughly 1/32 inch, so 3/16 leaves several passes and a floor at or below that is at the end of its refinishing life.</p>

      <p>Engineered floors are a different question with a harder answer. What matters is wear layer thickness, the real wood above the plywood core. Under 2 mm cannot be sanded at all. Around 3 mm takes roughly one careful pass. At 6 mm it behaves like solid wood for several. If the original paperwork is gone, the vent cover cross-section is again where you look, and the layer line is usually visible.</p>

      <ComparisonTable
        columns={[{ title: "Cost" }, { title: "Time" }, { title: "When it applies" }]}
        rows={[
          { label: "Screen and recoat", values: ["$1.20-2/ft²", "1 day", "Finish worn, water still beads"] },
          { label: "Full sand and refinish", values: ["$3-5/ft²", "2-3 days", "Finish breached, wood exposed"] },
          { label: "Sand, stain, refinish", values: ["$4-6/ft²", "3-4 days", "Changing the color"] },
          { label: "Board replacement", values: ["$8-20/board", "add 1 day", "Pet stains, water damage"] },
          { label: "Replace the floor", values: [<strong key="a">$10-16/ft²</strong>, "3-5 days", "Under 3/16 in of wood left"] },
        ]}
        caption="Crew minimums of $700-900 apply to sanding jobs and around $450 for recoats, so a single small room prices well above the per-square-foot rate."
      />

      <h2>What the crew actually does over three days</h2>

      <p>Day one is the rough cut. A drum or belt sander takes the old finish and a thin layer of wood off in progressively finer grits, usually 36 then 60 then 80, with an edger working the perimeter the big machine cannot reach. This is the loud, dusty day, and modern dust containment captures most but never all of it.</p>

      <p>Day two is refinement and the first coat. The floor gets screened or buffed to blend the drum and edger scratch patterns, which is the step that separates a professional result from a rental-machine result, then vacuumed and tacked before finish goes down. Stain, if any, goes on here and needs overnight before anything covers it.</p>

      <p>Day three is coats two and three. Water-based finishes can take multiple coats in one day; oil-based needs overnight between them, which is why oil jobs run longer even though the sanding is identical. Then the floor is done and the clock switches from work time to cure time, which is the part homeowners underestimate.</p>

      <p>Worth asking any bidder: how do they handle dust containment, and do they screen between coats. Both answers separate crews faster than price does.</p>

      <h2>Which finish, and why it changes the schedule</h2>

      <ComparisonTable
        columns={[{ title: "Oil-based poly" }, { title: "Water-based poly", highlight: true }, { title: "Hardwax oil" }]}
        rows={[
          { label: "Added cost", values: ["Baseline", "+$0.90/ft²", "+$1.40/ft²"] },
          { label: "Color over time", values: ["Ambers noticeably", "Stays clear", "Warm, matte"] },
          { label: "Furniture back in", values: ["3-7 days", "1-2 days", "1-2 days"] },
          { label: "Rugs back down", values: ["30 days", "14 days", "14 days"] },
          { label: "Odor during cure", values: ["Strong, high VOC", "Mild", "Mild"] },
          { label: "Spot repairable later", values: ["No", "No", "Yes"] },
        ]}
        caption="The cure schedule matters more than people expect. Oil-based finishes are cheapest and hardest wearing, but a family cannot live normally around them for a week."
      />

      <p>Hardwax oil deserves a note because it is priced highest and often ends up cheapest over twenty years. It penetrates rather than filming over the surface, so a scratched area can be cleaned and re-oiled in place without redoing the room. Polyurethane cannot be spot repaired; a bad patch in one area eventually means recoating the whole floor.</p>

      <Callout label="Stain is a bigger decision than it looks">
        Changing color adds a day and about $1 per square foot, but the real risk is species. Maple and birch blotch badly under stain because their tight grain absorbs unevenly, and no amount of technique fully fixes it. Red oak takes stain beautifully. If the floor is maple and the goal is a dark color, get a sample panel done on your actual floor before committing the whole room.
      </Callout>

      <Scenario location="Milwaukee, Wisconsin">
        <p>A 1950s house with 620 square feet of original red oak, worn through in the kitchen doorway and hallway but sound elsewhere. Water soaked in at the doorway, so a recoat was out. The vent cover showed a healthy 5/16 inch above the tongue, so sanding was fine.</p>
        <p>Quote: full sand and refinish at $4 per square foot, $2,480. Water-based finish added $0.90 per square foot, $558. Two boards near a former radiator had black staining that would not sand out, replaced at $16 each, $32. Total $3,070, about $4.95 per square foot, three days of work with furniture back in two days later.</p>
        <p>Replacing the same floor in new white oak would have run roughly $8,060, and would have removed original quarter-sawn oak that no current product matches. The refinish came in at 38 percent of the replacement cost.</p>
      </Scenario>

      <h2>Where refinishing jobs go wrong</h2>

      <p>Sanding a floor that had no wood left. Once the sander reveals tongues, the floor is finished as a floor, and the discovery happens mid-job when everything is already torn apart. The vent cover check takes two minutes and prevents the single most expensive surprise in this work.</p>

      <p>DIY drum sanding. Rental is $60 to $100 a day and the machine is unforgiving in a specific way: leaving it stationary for even two seconds cuts a shallow dish into the boards, and dishes are invisible until the finish goes on and light rakes across them. Then they are permanent. If the goal is doing it yourself, a screen and recoat with a buffer is genuinely DIY-friendly and captures most of the savings.</p>

      <p>Rushing the cure. Furniture back too early leaves dents in soft finish, and rugs down too early trap solvent and cause cloudy patches that require redoing the area. Oil-based finishes need the full 30 days before rugs, which is not a suggestion the manufacturer added for fun.</p>

      <p>Refinishing when the floor is at the end of its life anyway. If the boards have gaps you can drop a coin into, cupping across most of the room, or under 3/16 inch left, the money goes further toward replacement. Price that path with the <a href="/hardwood-flooring-cost-calculator">hardwood flooring cost calculator</a>, and use the <a href="/flooring-calculator">flooring calculator</a> for the material quantities if you go that way.</p>
    </>
  );
}
