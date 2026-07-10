import { Figure, GuideByline, Scenario } from "@/components/GuideChrome";
import { GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

/**
 * Rainwater harvesting system cross-section. The linkable hero asset: roof to
 * garden hose, every part labeled. Pairs with the gutter page.
 */
function HarvestSystemSVG() {
  return (
    <svg
      viewBox="0 0 680 430"
      width="100%"
      height="auto"
      role="img"
      aria-label="Rainwater harvesting system: rain falls on the roof, runs to the gutter and downspout, passes a first-flush diverter, fills a storage tank with an overflow outlet, and feeds a garden hose or spigot."
    >
      <text x="20" y="26" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>
        How a rainwater harvesting system works
      </text>

      {/* rain */}
      <g stroke={GUIDE_SVG.cool} strokeWidth="2" opacity="0.5">
        <line x1="120" y1="50" x2="115" y2="66" />
        <line x1="170" y1="45" x2="165" y2="61" />
        <line x1="220" y1="52" x2="215" y2="68" />
        <line x1="270" y1="46" x2="265" y2="62" />
      </g>

      {/* roof */}
      <polygon points="90,120 300,72 300,100 130,140" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1.5" />
      <line x1="140" y1="122" x2="300" y2="86" stroke={GUIDE_SVG.slate} strokeWidth="0.8" opacity="0.6" />
      <text x="195" y="105" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.inkMuted} transform="rotate(-13 195 105)">
        roof (catchment area)
      </text>

      {/* gutter */}
      <path d="M 78,132 L 78,150 Q 78,158 88,158 L 130,158 L 130,138 Z" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <path d="M 81,148 L 81,151 Q 81,155 88,155 L 127,155 L 127,148 Z" fill={GUIDE_SVG.cool} opacity="0.4" />
      {/* downspout */}
      <rect x="80" y="158" width="12" height="120" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      {/* first-flush diverter */}
      <rect x="60" y="220" width="10" height="60" rx="4" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <line x1="80" y1="230" x2="70" y2="230" stroke={GUIDE_SVG.warm} strokeWidth="2" />
      {/* pipe to tank */}
      <path d="M 86,278 L 86,300 L 200,300" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

      {/* tank */}
      <rect x="200" y="230" width="150" height="150" rx="10" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="2.5" />
      <rect x="206" y="290" width="138" height="84" rx="6" fill={GUIDE_SVG.cool} opacity="0.35" />
      <text x="275" y="255" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.accent} fontWeight="700">storage</text>
      <text x="275" y="270" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.accent} fontWeight="700">tank</text>
      {/* overflow */}
      <path d="M 350,255 L 380,255 L 380,380" fill="none" stroke={GUIDE_SVG.slate} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* spigot + hose */}
      <rect x="200" y="360" width="18" height="10" fill={GUIDE_SVG.accent} />
      <path d="M 200,365 L 160,365 L 160,385" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="5" strokeLinecap="round" />
      {/* ground */}
      <rect x="40" y="388" width="600" height="12" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />

      {/* labels */}
      <g fontFamily="monospace" fontSize="10.5" fill={GUIDE_SVG.ink}>
        <line x1="120" y1="150" x2="470" y2="140" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="143">gutter collects runoff</text>
        <line x1="92" y1="200" x2="470" y2="185" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="188">downspout</text>
        <line x1="60" y1="250" x2="470" y2="230" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="233">first-flush diverter</text>
        <text x="474" y="246" fill={GUIDE_SVG.inkFaint}>(dumps dirty first rain)</text>
        <line x1="350" y1="230" x2="470" y2="280" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="283">storage tank / barrel</text>
        <line x1="380" y1="320" x2="470" y2="325" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="328">overflow outlet</text>
        <line x1="160" y1="380" x2="470" y2="368" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="371">spigot to garden hose</text>
      </g>
    </svg>
  );
}

export function RainwaterCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 20, 2026"
        reviewedAgainst="ARCSA rainwater harvesting design guidance, NOAA precipitation normals, EPA WaterSense harvesting guidance"
      />

      <h2>Your roof is a rain magnet you are not using</h2>
      <p>
        A 1,500 square foot roof in a place that gets 30 inches of rain a year
        sheds about 28,000 gallons. That water lands, runs down the gutters, and
        vanishes into the storm drain. All of it. A single rain barrel catches a
        thimbleful of it. A tank sized to your actual garden can catch enough to
        cut your summer water bill to almost nothing.
      </p>
      <p>
        The idea is old and simple. Point your downspout into a container instead
        of at the lawn, and keep the water for the dry stretch when your plants
        actually need it. The calculator up top tells you how many gallons your
        specific roof will yield from a given rain, and how big a tank you need to
        hold a useful amount of it. The rest of this page is the how and the why,
        starting with the single number the whole thing turns on: how much water
        an inch of rain really is.
      </p>

      <Figure
        number={1}
        caption="The whole system, roof to hose. Rain hits the roof, the gutter and downspout carry it down, a first-flush diverter throws away the dirty first rinse, and the rest fills a tank you draw from with a spigot. The overflow handles the storms that fill the tank."
      >
        <HarvestSystemSVG />
      </Figure>

      <h2>How much water is one inch of rain, really?</h2>
      <p>
        People underestimate this badly. An inch of rain sounds like nothing, a
        damp afternoon. But rain is measured as depth over an area, and roofs are
        large, so the volumes add up fast. One inch of rain falling on one square
        foot of roof is 0.623 gallons. That 0.623 is the number that runs every
        rainwater calculation, and it is just unit conversion: a square foot of
        surface, one inch deep, is 144 cubic inches of water, which works out to
        0.623 gallons.
      </p>
      <p>
        Now scale it to a real roof. One inch of rain on a 1,500 square foot roof
        is 1,500 times 0.623, which is 934 gallons. From one inch. On a 2,000
        square foot roof, that same inch delivers about 1,246 gallons. So when the
        forecast says an inch of rain, your roof is quietly handling close to a
        thousand gallons, and if you have nowhere to put it, all of it runs off.
        That is the whole case for harvesting in a single number.
      </p>

      <Callout label="Is one inch of rain a lot?">
        For the sky, no, an inch is a routine soaking. For your roof, yes. An inch
        over an average house roof is roughly a thousand gallons, which is about
        eighteen full 55-gallon rain barrels. That gap between how small an inch
        sounds and how much water it actually is on a roof is exactly why a single
        barrel overflows in the first ten minutes of a real storm.
      </Callout>

      <h2>The collection formula, and what it leaves out</h2>
      <p>
        The math is one line. Gallons equals roof area in square feet, times
        rainfall in inches, times 0.623. That is the theoretical maximum, the
        water that lands on the roof. What you actually capture is less, because
        real systems lose some along the way. Plan on catching 75 to 90 percent of
        the theoretical number once you account for the first-flush diverter
        throwing away the first rinse, a bit of gutter overflow in hard downpours,
        splash, and evaporation off a wet roof before the water reaches the tank.
      </p>

      <Scenario location="Austin, TX (32 inches of rain a year)">
        A 1,800 square foot roof. Theoretical annual yield: 1,800 times 32 times
        0.623, which is about 35,900 gallons a year. Apply an 85 percent real-world
        capture rate and you land near 30,500 usable gallons. Spread across a
        typical 200-day growing season, that is roughly 150 gallons a day of free
        irrigation water, which covers a large vegetable garden and a good stretch
        of landscape beds. The catch is timing: most of that water falls in a few
        big storms, so the question is never really the annual total. It is how
        much you can store between rains.
      </Scenario>

      <h2>Sizing the tank to how you actually use it</h2>
      <p>
        This is where most first systems go wrong. People buy one 55-gallon barrel,
        feel good about it, and then watch it fill and overflow in the first ten
        minutes of the first storm. A barrel is a fine start for hand-watering a
        few beds. It is not a water supply. Size the storage to what you draw
        between rains, not to what feels tidy next to the house.
      </p>

      <ComparisonTable
        columns={[
          { title: "Rain barrel", subtitle: "50 to 80 gal", highlight: true },
          { title: "IBC tote", subtitle: "275 gal" },
          { title: "Cistern", subtitle: "500 to 5,000+ gal" },
        ]}
        rows={[
          { label: "Cost installed", values: ["$80 to 150", "$150 to 350", "$500 to 3,000+"] },
          {
            label: "Fills from",
            values: ["A light rain", "One moderate storm", "A few storms"],
          },
          {
            label: "Good for",
            values: [
              "A few beds, hand watering",
              "A medium garden",
              "Whole landscape, dry-season supply",
            ],
          },
          {
            label: "Footprint",
            values: ["Tiny, sits on pavers", "A 4x4 pad", "Needs real space or burial"],
          },
        ]}
        caption="A 55-gallon barrel empties in one weekend of watering. If you are irrigating anything real, chain several barrels together or step up to a tote or a cistern. Storage, not roof size, is almost always the limiting factor."
      />

      <p>
        The honest rule: match your storage to about a week of dry-season use.
        Figure out how many gallons your garden drinks in a week without rain, and
        size the tank to hold at least that much, so one good storm carries you
        through the next dry stretch. Barrels are cheap and modular, so the common
        move is to link three or four of them with connector kits before jumping to
        a tote. Tie the roof area math to the storage math with the calculator
        above, and if you are also planning the gutters that feed the system, the{" "}
        <a href="/gutter-calculator">gutter calculator</a> sizes the downspouts that
        actually deliver the water.
      </p>

      <h2>First flush and filtration: keeping the water usable</h2>
      <p>
        Roof runoff is not clean. The first water off the roof in any storm carries
        whatever has been sitting up there since the last rain: bird droppings,
        pollen, dust, shingle grit, the occasional dead leaf. A first-flush
        diverter is a simple standpipe that catches and dumps that dirty first
        rinse, usually the first ten gallons or so, and only lets the roof drain
        into your tank once the surface has been washed. It costs $20 to 40 and it
        is the single most important part on any system where the water will touch
        food plants. Skip it and your tank grows a film you will regret.
      </p>
      <p>
        Past the diverter, a basic inlet screen keeps leaves and mosquitoes out,
        and that is genuinely all most irrigation systems need. Mosquitoes are the
        real nuisance, not contamination, so every opening on the tank should be
        screened, because a barrel of standing water is a mosquito nursery
        otherwise. If you ever intend to use the water for anything beyond
        watering, the filtration requirements jump sharply, which is the next
        thing worth being clear about.
      </p>

      <h2>What you can and cannot use it for</h2>
      <p>
        Rainwater is excellent for the things plants and outdoor chores need:
        garden and landscape irrigation, filling watering cans, topping off a pond,
        washing the car, hosing down the driveway. Plants often prefer it to tap
        water because it has no chlorine and sits at a slightly acidic pH they
        like. For all of that, a screen and a first-flush diverter are enough.
      </p>
      <p>
        Drinking, cooking, and bathing are a completely different category. Potable
        use means real treatment: sediment filtration, then a carbon stage, then
        disinfection by UV light or chlorination, plus regular water testing. It is
        doable, and plenty of off-grid homes run their whole supply this way, but
        it is a designed system with ongoing maintenance, not a barrel under a
        downspout. Do not drink from an irrigation setup. The gap between the two is
        the difference between a screen and a multi-stage treatment train.
      </p>

      <h2>Is rainwater collection even legal?</h2>
      <p>
        Almost everywhere in the United States, yes, and a growing number of states
        actively encourage it with rebates. But the rules are genuinely local, so
        this is worth a five-minute check before you buy anything. A handful of
        Western states tied to old water-rights law have had restrictions.
        Colorado, famously, banned most residential collection for years and only
        legalized it in 2016, and still caps most households at two barrels of
        about 55 gallons each. Utah requires registration above a certain volume.
        Most other states have no meaningful limit at all, and many, including
        Texas and several in the Southwest, offer tax exemptions or rebates that
        can knock $50 to a few hundred dollars off a system.
      </p>
      <p>
        The practical move: search your state plus the phrase rainwater harvesting
        law, and check your city or HOA separately, since local rules can be
        stricter than the state. It is almost never a hard no. It is usually either
        wide open or a simple volume cap you will not hit with a barrel or two.
      </p>

      <h2>Where rainwater systems go wrong</h2>
      <p>
        The mistakes cluster around one theme: underbuilding the storage and
        overbuilding nothing else. The classic is the lone 55-gallon barrel that
        overflows in the first storm and then runs dry after one weekend of
        watering, which leaves people thinking harvesting does not work when the
        real problem was a tank a tenth the size it needed to be. Right behind it is
        skipping the first-flush diverter and ending up with a slick, smelly tank
        within a month.
      </p>
      <p>
        The rest are small and preventable. Leaving a tank opening unscreened and
        breeding mosquitoes. Forgetting the overflow, so a full tank backs water up
        the downspout and against the foundation, which is the exact wet-basement
        problem good gutters are supposed to prevent. Placing a heavy tank on bare
        soft ground so it tilts as it fills, since water weighs about 8.3 pounds a
        gallon and a 275-gallon tote full is well over a ton. And putting the tank
        uphill of the garden by accident, giving up the free gravity pressure that
        makes a spigot-and-hose setup work without a pump. None of these are hard.
        They are planning misses, and the fix for all of them is getting the roof,
        rainfall, and storage numbers straight before you buy the first barrel.
      </p>
    </>
  );
}
