import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SpeciesChartSVG() {
  const species = [
    ["Walnut", 1010, 12, "#6B4A2F"],
    ["Brazilian cherry", 2350, 9.5, "#8C3B26"],
    ["Red oak", 1290, 6.5, "#B9791A"],
    ["White oak", 1360, 8, "#A8894F"],
    ["Maple", 1450, 7.5, "#D8C08A"],
    ["Hickory", 1820, 8.5, "#9C6B3F"],
  ] as const;
  const maxJanka = 2400;
  return (
    <svg viewBox="0 0 680 360" width="100%" height="auto" role="img" aria-label="Chart comparing hardwood species by Janka hardness rating and typical material cost per square foot: walnut 1010, red oak 1290, white oak 1360, maple 1450, hickory 1820, Brazilian cherry 2350">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Hardness against price, six common species</text>
      <text x="16" y="42" fontSize="11" fill={GUIDE_SVG.inkMuted}>Janka rating measures dent resistance. Red oak at 1290 is the reference every other species is judged against.</text>

      {species.map(([name, janka, price, color], i) => {
        const y = 70 + i * 42;
        const w = (janka / maxJanka) * 340;
        return (
          <g key={i}>
            <text x="16" y={y + 14} fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>{name}</text>
            <rect x="150" y={y} width={w} height="20" fill={color} stroke={GUIDE_SVG.ink} strokeWidth="1" />
            <text x={150 + w + 8} y={y + 15} fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.inkMuted}>{janka}</text>
            <text x="664" y={y + 15} textAnchor="end" fontSize="12" fontWeight="600" fontFamily="monospace" fill={GUIDE_SVG.accent}>
              ${price.toFixed(2)}/ft&#178;
            </text>
          </g>
        );
      })}

      {/* red oak reference line at 1290 */}
      <line x1={150 + (1290 / maxJanka) * 340} y1="64" x2={150 + (1290 / maxJanka) * 340} y2="318" stroke={GUIDE_SVG.accent} strokeWidth="1.2" strokeDasharray="4,4" />
      <text x={150 + (1290 / maxJanka) * 340} y="332" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent}>red oak baseline</text>

      <line x1="16" y1="342" x2="664" y2="342" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="358" fontSize="11" fill={GUIDE_SVG.inkMuted}>Prices are mid-grade material only, before waste, labor, or finishing. Hardness and price do not track together.</text>
    </svg>
  );
}

export function HardwoodFlooringCostExpansion() {
  return (
    <>
      <GuideByline
        updated="July 29, 2026"
        reviewedAgainst="NWFA installation guidelines and species data, USDA Forest Products Laboratory Wood Handbook, and EPA TSCA Title VI"
      />

      <h2>What hardwood flooring costs</h2>

      <p>$10 to $16 per square foot installed for a common species, prefinished, nailed down over a wood subfloor. White oak and hickory push that to $13 to $18. Walnut and exotics run $18 to $25. Material is roughly half the number; labor, supplies, and finishing are the other half, which is the part most online estimates leave out.</p>

      <p>For a 400 square foot living room in red oak, that means somewhere around $4,000 to $5,500 installed. The calculator above splits it by species, construction, install method, and finish so you can see which of your choices is actually moving the number, because usually it is not the one people focus on.</p>

      <Figure number={1} caption="Hardness and price are close to unrelated. Walnut is the softest species here and the most expensive; Brazilian cherry is nearly twice as hard as red oak for less money than walnut.">
        <SpeciesChartSVG />
      </Figure>

      <MethodologyNote>
        <p>Prices are typical 2026 US retail for mid-grade material. Waste is applied at 10 percent per NWFA cutting and grading practice. Labor rates reflect installation only and exclude subfloor repair, old floor removal, and furniture moving. Janka figures come from published NWFA and USDA Forest Products Laboratory data.</p>
      </MethodologyNote>

      <h2>Species, priced and rated</h2>

      <ComparisonTable
        columns={[{ title: "Material $/ft²" }, { title: "Janka" }, { title: "Worth knowing" }]}
        rows={[
          { label: "Red oak", values: ["$4-7", "1290", "The baseline. Takes stain evenly, easy to match later."] },
          { label: "White oak", values: ["$6-10", "1360", "Tighter grain, cooler tone, currently the design default."] },
          { label: "Maple", values: ["$6-9", "1450", "Blotches under stain. Buy it natural or buy something else."] },
          { label: "Hickory", values: ["$7-10", "1820", "Hardest common species, dramatic color variation."] },
          { label: "Brazilian cherry", values: ["$8-11", "2350", "Very hard, darkens noticeably with light exposure."] },
          { label: "Walnut", values: ["$10-14", "1010", "Softest here. Dents. People buy it anyway for the color."] },
          { label: "Ash", values: ["$5-8", "1320", "Oak-like grain, lighter, supply varies by region."] },
          { label: "Birch", values: ["$4-7", "1260", "Budget alternative, similar blotching problem to maple."] },
        ]}
        caption="Grade matters as much as species: character or #2 common grades run 20-30 percent under select grade of the same wood, and the knots and color variation are a look people pay extra for elsewhere."
      />

      <p>The Janka number gets over-weighted in buying decisions. It measures resistance to denting, from a dropped can or a chair leg, and nothing else. Scratches, which are what actually make a floor look tired, are a function of the finish, not the wood underneath it. A hickory floor with a worn finish looks worse than a walnut floor with a fresh one. If a dog and a busy hallway are the concern, spend the money on finish quality and a species that hides wear through grain and color variation, not on the hardest wood available.</p>

      <h2>What grade actually means on the label</h2>

      <p>Grade describes appearance, not strength, and it is where the biggest price swings hide. Select and Better means long boards, minimal knots, consistent color. #1 Common allows more variation and shorter pieces. #2 Common or Character allows knots, mineral streaks, and real color range. All three are structurally identical, cut from the same trees, and installed the same way.</p>

      <p>Two consequences worth acting on. First, character grade in white oak often costs less than select grade in red oak while landing much closer to the look people actually want right now, so grade shopping beats species shopping for a lot of budgets. Second, lower grades come in shorter average board lengths, which means more end joints and a slightly higher waste factor, so the discount is not quite as large as the shelf price suggests. Ask for the average length, not just the grade name.</p>

      <h2>Solid or engineered</h2>

      <ComparisonTable
        columns={[{ title: "Solid 3/4 in" }, { title: "Engineered", highlight: true }]}
        rows={[
          { label: "Material cost", values: ["Baseline", "10-15% less"] },
          { label: "Over concrete slab", values: ["Not permitted", "Yes, glue or float"] },
          { label: "Below grade (basement)", values: ["No", "Yes"] },
          { label: "Refinishes over its life", values: ["4-6 times", "0-3, by wear layer"] },
          { label: "Reaction to humidity swings", values: ["Expands and contracts", "Dimensionally stable"] },
          { label: "Install methods", values: ["Nail or staple", "Nail, glue, or float"] },
        ]}
        caption="Wear layer is the number that matters when buying engineered: under 2 mm cannot be sanded at all, 3 mm takes about one refinish, 6 mm takes several and behaves like solid wood underfoot."
      />

      <p>The decision is usually made for you by the subfloor. Concrete slab or basement means engineered, because solid wood over concrete will cup as moisture moves through the slab regardless of how well it is sealed. Wood subfloor above grade allows either. In that case the question is time horizon: a floor you intend to keep for thirty years and sand twice justifies solid, while a floor in a house you will sell in seven does not.</p>

      <h2>Prefinished or site-finished</h2>

      <p>Prefinished flooring arrives with an aluminum-oxide factory finish cured under UV lamps, which is harder than anything applied in a house. It costs less installed because there is no sanding stage, and you walk on it the same day. The tradeoff is the micro-bevel between boards, a small V groove that collects dust and reads as a visible line between planks.</p>

      <p>Site finishing gives a flat, continuous surface with no bevels, and any stain color you want, which matters when matching an existing floor in an adjacent room. It costs about $3 more per square foot, adds three to five days, and fills the house with sanding dust followed by finish fumes. Most retrofits go prefinished. Whole-house installs and restorations go site-finished, and the flat unbroken surface is the reason.</p>

      <Callout label="The cheapest hardwood option is usually the floor you already have">
        Sanding and refinishing runs $3 to $5 per square foot against $10 to $16 to replace. If the existing floor is solid, sound, and still has about 3/16 inch of wood above the tongue, refinishing produces a functionally new floor for a third of the money. Pull a floor vent cover and look at the board edge; that cross-section tells you what you have left.
      </Callout>

      <Scenario location="Charlotte, North Carolina">
        <p>A 480 square foot living and dining area, existing carpet over plywood subfloor, above grade. The owners choose prefinished white oak, solid 3/4 inch, nail-down. Order area: 480 &#215; 1.10 = 528 square feet. Material at $8 per square foot: $4,224. Underlayment, cleats, transitions, and shoe molding at $0.80: $422. Installation labor at $5 per square foot on the net 480: $2,400.</p>
        <p>Subtotal $7,046, about $14.70 per square foot installed. Two line items sat outside that number and appeared on the quote: $1.25 per square foot to tear out and haul the carpet and pad ($600), and $340 to level two dips in the subfloor found once the carpet came up. Final: $7,986. The subfloor surprise is the normal one, and it is why quotes get written as ranges until the old floor is off.</p>
      </Scenario>

      <h2>Plank width changes more than looks</h2>

      <p>Wide planks read as current and cost more per square foot, but the real cost is in behavior. A 7 inch board moves roughly twice as much across its width with seasonal humidity as a 3-1/4 inch strip, so wide solid planks gap more visibly in winter. That is why wide format is overwhelmingly sold as engineered: the plywood core holds the width stable.</p>

      <p>Installation changes too. Many manufacturers require glue assist in addition to nails above a certain width, adding adhesive cost and labor time. If wide planks are the goal, engineered is the path of least regret, and if solid wide planks are non-negotiable, budget for tighter humidity control year round.</p>

      <h2>Where hardwood budgets go wrong</h2>

      <p>Skipping acclimation. Wood moves with humidity, and flooring delivered from a cold warehouse into a heated house needs to reach equilibrium with the room before it is fastened down. NWFA guidance is to bring the material into the installation space with the HVAC running at normal living conditions and let it stabilize. Install too soon and the floor gaps in winter or cups in summer, and neither is a warranty claim, because the installer skipped a documented step.</p>

      <p>Forgetting removal and subfloor work. The per-square-foot numbers everyone quotes are for installing new flooring on a flat, sound subfloor. Tearing out carpet runs about $1 per square foot; tile runs $2 to $4 and is genuinely miserable work. Leveling dips, replacing water-damaged sheathing, or adding a layer to meet the height of an adjacent floor all appear after demolition, which is why quotes stay ranges until then.</p>

      <p>Under-ordering. Hardwood ships in lots, and a lot difference in the same species is visible across a room. Running short means either a second lot with a color mismatch or waiting on a reorder with the floor half done. The 10 percent waste factor exists for straight-lay rectangles; diagonal layouts and rooms full of closets and jogs want 15. The <a href="/guides/waste-factor-reference">waste factor reference</a> covers when to move off the default, and the <a href="/flooring-calculator">flooring calculator</a> converts area into actual box counts.</p>

      <p>Last one, cheap to avoid: buying a species you will not be able to match. Red oak is available everywhere, forever, from any supplier. Exotic and boutique species come and go with import markets, and a repair in eight years after a dishwasher leak means either a visible patch or refinishing the whole floor to blend it. That is not a reason to avoid them, only a reason to buy an extra box and put it in the attic.</p>
    </>
  );
}
