import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function DepthCoverageSVG() {
  const depths = [
    { label: '1"', sqft: 324, use: "Top-up existing beds", color: GUIDE_SVG.slate },
    { label: '2"', sqft: 162, use: "Standard refresh", color: GUIDE_SVG.inkFaint },
    { label: '3"', sqft: 108, use: "New beds, weed suppression", color: GUIDE_SVG.accent },
    { label: '4"', sqft: 81, use: "Playground, path base", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="One cubic yard of mulch covers 324 sq ft at 1 inch depth, down to 81 sq ft at 4 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How far does 1 cubic yard of mulch go?</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Coverage drops fast as depth increases. Going from 2 to 3 inches uses 50% more mulch.</text>
      {depths.map((d, i) => {
        const y = 65 + i * 34;
        const w = d.sqft * 0.8;
        return (
          <g key={d.label}>
            <text x="50" y={y + 14} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{d.label}</text>
            <rect x="60" y={y} width={w} height="22" rx="3" fill={d.color} opacity="0.6" />
            <text x={68 + w} y={y + 14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{d.sqft} ft²</text>
            <text x={68 + w + 55} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{d.use}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BulkVsBagSVG() {
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Bulk mulch costs $25-55 per yard. Bagged mulch costs $75-120 per yard equivalent. Crossover at about 2 cubic yards.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Bulk delivery vs bags</text>
      <rect x="40" y="55" width="270" height="100" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="175" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>BULK DELIVERY</text>
      <text x="175" y="106" textAnchor="middle" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>$25–55/yd³</text>
      <text x="175" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>Minimum 2–3 yd³ · needs driveway access</text>
      <rect x="370" y="55" width="270" height="100" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="505" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>BAGS (2 cu ft)</text>
      <text x="505" y="106" textAnchor="middle" fontSize="22" fontWeight="700" fill={GUIDE_SVG.ink}>$3–6/bag</text>
      <text x="505" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>13.5 bags per yd³ · $75–120/yd³ equiv.</text>
      <text x="340" y="180" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">At 2+ cubic yards, bulk saves 50-60% vs bags and eliminates 27+ trips from car to garden.</text>
    </svg>
  );
}

function MulchTypesSVG() {
  const types = [
    { label: "Hardwood bark", cost: "$30–45/yd³", life: "1–2 yr", note: "Most common, dark brown" },
    { label: "Cedar", cost: "$35–55/yd³", life: "2–3 yr", note: "Insect-repelling, aromatic" },
    { label: "Pine bark", cost: "$28–40/yd³", life: "1–2 yr", note: "Acidic, good for azaleas" },
    { label: "Rubber mulch", cost: "$80–120/yd³", life: "10+ yr", note: "Playgrounds only" },
    { label: "River rock", cost: "$50–80/yd³", life: "Permanent", note: "Weed barrier needed" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Mulch types comparison: hardwood bark cheapest at $30-45, cedar lasts longest among organics, rubber for playgrounds.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Mulch types compared</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Type",x:120},{l:"Cost (bulk)",x:290},{l:"Lasts",x:410},{l:"Notes",x:550}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="120" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="290" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.cost}</text>
          <text x="410" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{t.life}</text>
          <text x="550" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
        </g>
      )})}
    </svg>
  );
}

function ApplicationTipsSVG() {
  const tips = [
    { icon: "✓", label: "Keep mulch 3–6 inches away from tree trunks", sub: "Piling against bark causes rot and fungal disease" },
    { icon: "✓", label: "Water beds before mulching, not after", sub: "Wet soil under dry mulch retains moisture much better" },
    { icon: "✗", label: "Don't use landscape fabric under organic mulch", sub: "Fabric traps moisture and prevents decomposition benefits" },
    { icon: "✗", label: "Don't pile deeper than 4 inches on garden beds", sub: "Thick mulch mats down, repels water, suffocates roots" },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Mulch application dos and don'ts: keep away from trunks, water first, skip fabric under organic.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Application rules that protect your plants</text>
      {tips.map((t, i) => {
        const y = 55 + i * 38;
        const isGood = t.icon === "✓";
        return (
          <g key={t.label}>
            <circle cx="40" cy={y + 10} r="10" fill={isGood ? "#EAF3DE" : "#FCEBEB"} />
            <text x="40" y={y + 15} textAnchor="middle" fontSize="12" fontWeight="700" fill={isGood ? "#2D7F46" : "#B53629"}>{t.icon}</text>
            <text x="60" y={y + 8} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
            <text x="60" y={y + 24} fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

function SeasonalTimingSVG() {
  const seasons = [
    { label: "Late spring (May–Jun)", best: true, note: "Soil warm, weeds starting. Best time for new beds." },
    { label: "Fall (Sep–Oct)", best: true, note: "Protects roots over winter. Second-best time." },
    { label: "Midsummer (Jul–Aug)", best: false, note: "Works but mulch dries fast. Water soil thoroughly first." },
    { label: "Winter (Dec–Feb)", best: false, note: "Frozen ground. Wait for spring unless protecting perennials." },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Best times to mulch: late spring and fall are ideal. Midsummer works but dries fast. Avoid winter.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>When to mulch</text>
      {seasons.map((s, i) => {
        const y = 55 + i * 35;
        return (
          <g key={s.label}>
            <circle cx="35" cy={y + 8} r="8" fill={s.best ? "#EAF3DE" : GUIDE_SVG.slateSoft} />
            <text x="35" y={y + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill={s.best ? "#2D7F46" : GUIDE_SVG.slate}>{s.best ? "✓" : "—"}</text>
            <text x="55" y={y + 6} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
            <text x="55" y={y + 22} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function MulchCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="University extension service guidelines (Clemson, Penn State, UMN) and landscape supplier pricing"
      />

      <h2>Volcano mulching is killing your trees</h2>

      <p>
        Before getting into the math, here is the single most important thing about mulch that most people get wrong. Every spring, landscaping crews across the country pile mulch into tall cones against tree trunks. It looks tidy. It is slowly killing the tree. The practice is called volcano mulching, and arborists have been fighting it for decades with limited success because it looks intentional.
      </p>

      <p>
        What happens: mulch piled against bark holds moisture against the wood. The bark, which evolved to shed water, stays perpetually damp. Fungal colonies establish. The cambium layer (the living tissue just under the bark) rots. Secondary roots grow into the mulch cone instead of spreading outward. Within 3 to 5 years, a mature tree that survived decades of weather can decline and die from the base up. The fix costs nothing: keep a 3 to 6 inch gap between mulch and any trunk or stem. The mulch ring should look like a donut, not a volcano.
      </p>

      <Figure number={1} caption="Four rules that protect your plants. The mulch-away-from-trunks rule is the most important and the most ignored.">
        <ApplicationTipsSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Coverage formula: area (ft²) × depth (in) ÷ 324 = cubic yards. The 324 constant is 27 cubic feet per yard × 12 inches per foot. Bulk pricing reflects 2026 landscape supply yard rates across the Mid-Atlantic and Midwest. Bag pricing from Home Depot and Lowe&apos;s 2 cu ft bags. Mulch characteristics from Clemson Cooperative Extension HGIC 1604 and Penn State Extension mulching guidelines.
        </p>
      </MethodologyNote>

      <h2>How depth changes everything</h2>

      <p>
        The formula is simple: area times depth divided by 324 gives you cubic yards. But the depth choice is where most people waste money, either overspending on mulch they do not need or underspending on mulch that will not suppress weeds.
      </p>

      <Figure number={2} caption="One cubic yard covers 324 sq ft at 1 inch or just 81 sq ft at 4 inches. Depth is the biggest cost variable in any mulch project.">
        <DepthCoverageSVG />
      </Figure>

      <p>
        New beds need 3 inches for effective weed suppression. That is the depth at which sunlight cannot reach the soil surface, preventing most annual weed seeds from germinating. Thinner than 2 inches and weeds push through within weeks. Thicker than 4 inches and the mulch itself becomes a problem: it mats down, repels rainfall instead of absorbing it, and can suffocate shallow root systems.
      </p>

      <p>
        Annual top-ups on existing beds need only 1 to 2 inches. Organic mulch decomposes about an inch per year, so adding 1.5 inches each spring maintains the target depth without building up excess. If your existing mulch is still 2 inches thick, add 1 inch. If it has decomposed to a thin film, add 2 inches. Do not pile fresh mulch over 3 inches of existing mulch. The total depth, old plus new, should stay at 3 inches.
      </p>

      <Callout label="Playground mulch is different">
        Playground safety standards (ASTM F1292) require 6 inches minimum of loose-fill material under equipment with a fall height up to 7 feet. Increase to 9 inches for equipment up to 10 feet. This is a safety standard, not a landscaping preference. Engineered wood fiber (EWF) or rubber mulch are the standard materials. Regular hardwood bark does not meet the impact attenuation requirements.
      </Callout>

      <h2>Bulk delivery vs bags: the $90 question</h2>

      <Figure number={3} caption="Bulk mulch costs half what bags cost per cubic yard. At 2+ yards, the savings cover the delivery fee and then some.">
        <BulkVsBagSVG />
      </Figure>

      <Scenario location="Richmond, VA">
        A homeowner mulched 6 garden beds totaling 480 sq ft at 3 inches deep. She calculated 4.4 cubic yards and ordered 5 yards of hardwood bark delivered for $185 including delivery. Her neighbor across the street did the same job with bags from Lowe&apos;s: 60 bags at $3.48 each for $209, plus 4 hours loading and unloading her SUV. Bulk saved $24 in cost and an entire afternoon of hauling bags. At anything over 3 yards the math is not close.
      </Scenario>

      <p>
        The crossover point is about 2 cubic yards. Below that, bags are practical because bulk suppliers charge $40 to $75 for delivery on small orders, which erases the per-yard savings. Above 2 yards, bulk wins on cost and saves hours of loading, driving, and unloading 27+ bags per yard. One cubic yard weighs 400 to 800 pounds depending on moisture content. That is a lot of bags to carry from your car to the back yard.
      </p>

      <p>
        Order bulk mulch by calling a local landscape supply yard, not a big-box store. Supply yards charge $25 to $45 per yard for hardwood bark. Home Depot and Lowe&apos;s delivery services charge $50 to $80 per yard for the same product because they are reselling from the same yards with a markup. Search &quot;landscape supply near me&quot; and call for pricing. Most deliver within 24 to 48 hours.
      </p>

      <h2>Picking your mulch type</h2>

      <Figure number={4} caption="Five common mulch types. Organic mulches decompose and feed the soil. Inorganic options last years but add nothing to soil health.">
        <MulchTypesSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"Organic mulch"},{title:"Inorganic (rock/rubber)"}]}
        rows={[
          {label:"Cost per year",values:["$30–55/yd³ annually","$50–120/yd³ once"]},
          {label:"Soil benefit",values:["Adds nutrients as it decomposes","None"]},
          {label:"Weed control",values:["Good for 1 season","Good with fabric underneath"]},
          {label:"Best for",values:["Garden beds, trees, shrubs","Foundation plantings, xeriscape"]},
          {label:"Common mistake",values:["Piling too deep (>4\")","Skipping weed barrier underneath"]},
        ]}
        caption="Organic mulch is cheaper per application but needs annual refresh. Rock costs more up front but is permanent. Use landscape fabric under rock only, not under organic mulch."
      />

      <p>
        Dyed mulch (red, black, brown) is worth addressing because it is everywhere. The dye itself is either iron oxide (safe) or carbon-based (safe). The concern is not the dye. It is the wood source. Dyed mulch is often made from recycled pallets, construction debris, and demolition wood. Some of that wood was treated with CCA (chromated copper arsenate), which leaches arsenic into soil. If you use dyed mulch, buy from a supplier that certifies their wood source. If the price seems too low, the wood source is probably questionable.
      </p>

      <h2>When to mulch</h2>

      <Figure number={5} caption="Late spring and early fall are ideal. Spring mulching suppresses the season's weeds before they establish. Fall mulching insulates roots through winter.">
        <SeasonalTimingSVG />
      </Figure>

      <p>
        Timing matters more than most people realize. Mulching too early in spring (before soil warms) keeps the ground cold and delays perennial emergence. Mulching in midsummer works but the soil dries faster in heat, so water thoroughly before laying mulch. Fall mulching protects root systems through winter and gives the mulch time to begin decomposing before the next growing season.
      </p>

      <p>
        For lawn projects, pair mulching with the <a href="/topsoil-calculator">topsoil calculator</a> for garden bed prep or the <a href="/sod-calculator">sod calculator</a> for new lawn areas adjacent to your beds. If you are building raised beds and need to calculate soil volume, the <a href="/gravel-calculator">gravel calculator</a> uses the same cubic yard formula and handles rectangular and irregular shapes.
      </p>

      <h2>How much does mulch cost for your yard?</h2>

      <ComparisonTable
        columns={[{title:"Bags (DIY)"},{title:"Bulk (DIY)"},{title:"Bulk (installed)"}]}
        rows={[
          {label:"500 sq ft at 3\"",values:["$200–280 (38 bags)","$120–165 (4.6 yd³)","$300–420"]},
          {label:"1,000 sq ft at 3\"",values:["$400–560 (76 bags)","$230–330 (9.3 yd³)","$575–840"]},
          {label:"2,000 sq ft at 2\"",values:["$550–770 (105 bags)","$310–440 (12.3 yd³)","$740–1,100"]},
        ]}
        caption="Professional mulch installation runs about $65-90 per cubic yard including material and labor. DIY cuts that to $35-55 per yard (bulk) but takes a full day for anything over 5 yards."
      />

      <p>
        A typical suburban property with 500 to 800 sq ft of garden beds needs 4 to 7 cubic yards of mulch per year. At bulk prices, that is $120 to $300 in materials. The labor is the bigger cost: spreading 5 yards of mulch takes one person 4 to 6 hours with a wheelbarrow and rake. Two people cut it to 2 to 3 hours. This is why most landscape companies charge $65 to $90 per installed yard. You are paying for the hauling and spreading, not the mulch itself.
      </p>
    </>
  );
}
