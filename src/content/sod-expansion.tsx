import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function PalletSVG() {
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="A pallet of sod covers 450 to 500 square feet in most US markets and weighs 1500 to 3000 pounds. A 2000 square foot lawn needs about 4.5 pallets.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The pallet is the unit that matters</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Farms cut in rolls or slabs, but they sell and deliver by the pallet</text>
      <g>
        <rect x="60" y="120" width="150" height="16" fill={GUIDE_SVG.warm} opacity="0.5" />
        {[0,1,2,3].map(r => (
          <rect key={r} x={68} y={120-18*(r+1)} width="134" height="16" rx="2" fill={GUIDE_SVG.accent} opacity={0.35 + r*0.12} />
        ))}
        <text x="135" y="160" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>one pallet</text>
      </g>
      <g fontSize="11">
        <text x="280" y="70" fontWeight="600" fill={GUIDE_SVG.ink}>Coverage</text>
        <text x="280" y="88" fill={GUIDE_SVG.inkMuted}>450-500 ft&#178; typical (400-700 by region)</text>
        <text x="280" y="116" fontWeight="600" fill={GUIDE_SVG.ink}>Weight</text>
        <text x="280" y="134" fill={GUIDE_SVG.inkMuted}>1,500-3,000 lb; wet sod is the heavy end</text>
        <text x="280" y="162" fontWeight="600" fill={GUIDE_SVG.ink}>Price installed vs DIY</text>
        <text x="280" y="180" fill={GUIDE_SVG.inkMuted}>Material $150-450 per pallet; install doubles it</text>
        <text x="280" y="210" fontWeight="700" fill={GUIDE_SVG.accent}>2,000 ft&#178; lawn at 470 ft&#178; per pallet = 4.5,</text>
        <text x="280" y="228" fontWeight="700" fill={GUIDE_SVG.accent}>so order 5 and confirm the farm&apos;s cut size.</text>
      </g>
    </svg>
  );
}

function LayTimelineSVG() {
  const steps = [
    { t: "Day 0", lines: ["Sod arrives; lay within", "24 hours, 12 in heat"] },
    { t: "Weeks 1-2", lines: ["Water daily; soil under", "the sod stays moist"] },
    { t: "Weeks 3-4", lines: ["Tug test: rooted sod", "resists; taper watering"] },
    { t: "Week 4+", lines: ["First mow on a high", "setting; normal schedule"] },
  ];
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Sod timeline: lay within 24 hours of delivery, water daily for two weeks, tug test at week three, first mow around week four.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The four weeks that decide whether sod takes</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Sod is a perishable product with a countdown that starts at the farm</text>
      <line x1="60" y1="80" x2="620" y2="80" stroke={GUIDE_SVG.line} strokeWidth="2" />
      {steps.map((s, i) => {
        const x = 95 + i * 158;
        return (
          <g key={s.t}>
            <circle cx={x} cy="80" r="7" fill={i === 0 ? GUIDE_SVG.warm : GUIDE_SVG.accent} />
            <text x={x} y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{s.t}</text>
            {s.lines.map((ln, j) => (
              <text key={j} x={x} y={126 + j * 14} textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>{ln}</text>
            ))}
          </g>
        );
      })}
      <text x="20" y="180" fontSize="9" fill={GUIDE_SVG.inkFaint}>Twice-daily water in summer heat for the first two weeks; the taper teaches roots to chase moisture down.</text>
    </svg>
  );
}

export function SodCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="Turfgrass Producers International guidelines, university extension turf establishment guidance (UF/IFAS, Clemson)"
      />

      <h2>Sod math is easy. Sod logistics are the job.</h2>
      <p>
        The measuring part takes ten minutes: length times width per
        section, add the sections, add 5 to 10 percent for cuts along
        curves and edges. The calculator above does it, converts to
        pallets, and prices it. What separates a lawn that takes from a
        compost pile of expensive grass is everything around the math:
        sod is alive, it starts dying on the pallet within a day, and
        the ground it lands on decides whether the roots take before
        the rolls dry out.
      </p>
      <p>
        This page covers the pallet numbers farms quote in, what sod
        costs by grass variety in 2026, the direct answer to the
        500-square-foot question, and the prep-and-watering timeline
        that protects the money.
      </p>

      <Figure
        number={1}
        caption="Pallet coverage varies by farm and region: 450 to 500 square feet is typical, but Texas St. Augustine often cuts at 400 and some northern farms strap 700. Ask, then run the math."
      >
        <PalletSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Coverage and handling figures follow Turfgrass Producers
          International guidance. Variety pricing reflects typical 2026
          US farm and installed prices; regional supply moves these
          numbers, especially for St. Augustine in the Gulf states and
          bluegrass in the north. Establishment practice follows
          university extension recommendations.
        </p>
      </MethodologyNote>

      <h2>What sod costs by variety</h2>

      <ComparisonTable
        caption="Typical 2026 US pricing. Material is picked up or delivered sod only; installed includes labor and light grading, not soil correction."
        columns={[
          { title: "Material $/ft²" },
          { title: "Installed $/ft²", highlight: true },
          { title: "Region / note" },
        ]}
        rows={[
          { label: "Bermuda", values: ["$0.30-0.55", "$0.85-1.60", "South; full sun only"] },
          { label: "Tall fescue", values: ["$0.35-0.60", "$0.90-1.70", "Transition zone workhorse"] },
          { label: "Kentucky bluegrass", values: ["$0.40-0.70", "$1.00-1.90", "North; the classic lawn"] },
          { label: "Zoysia", values: ["$0.50-0.90", "$1.20-2.20", "South and transition; slow but dense"] },
          { label: "St. Augustine", values: ["$0.45-0.85", "$1.10-2.00", "Gulf states; the shade option"] },
          { label: "Centipede", values: ["$0.35-0.65", "$0.90-1.70", "Southeast; low maintenance"] },
        ]}
      />

      <p>
        The two questions people type, answered plainly. How much is 500
        square feet of sod: at material prices above, $175 to $350 for
        the common varieties, or roughly one pallet plus a delivery fee.
        How much is a pallet of zoysia: at $0.50 to $0.90 per square
        foot on a 450 ft&#178; pallet, $225 to $400 for material, with
        delivery running $75 to $150 on top. Zoysia sits at the top of
        the warm-season price list because it grows slowly at the farm,
        which is the same reason it crowds weeds out slowly and
        beautifully in a yard.
      </p>

      <h2>Prep is 80 percent of whether it takes</h2>
      <p>
        Sod roots need bare, loose, damp soil to knit into. The sequence
        that works: kill or strip the old grass, grade to fall away from
        the house, spread an inch or two of quality topsoil where the
        existing dirt is poor (the{" "}
        <a href="/topsoil-calculator">topsoil calculator</a> converts
        that to cubic yards), rake smooth, and water the bare ground
        lightly the morning the truck comes. Laying sod on hard, dry
        clay is how people convert $1,500 of grass into mulch. Stagger
        the joints brick-style, butt seams tight without stretching,
        and run a roller half full of water over the finished lawn to
        press roots into soil contact.
      </p>

      <Figure
        number={2}
        caption="The countdown. Every day sod sits rolled on the pallet in summer costs roots; farms cut to order for exactly this reason."
      >
        <LayTimelineSVG />
      </Figure>

      <Scenario location="Atlanta, GA">
        <p>
          A 2,000 square foot front yard going from tired fescue to
          zoysia. With 8 percent waste for the curved bed lines: 2,160
          ft&#178;. At the local farm&apos;s 450 ft&#178; pallets that is
          4.8, so five pallets ordered, cut Thursday for Friday
          delivery.
        </p>
        <p>
          Material at $0.62/ft&#178; runs about $1,340 plus $95
          delivery. Two yards of topsoil to correct the low spots adds
          $110. DIY install over a weekend keeps the total near $1,550;
          the same job installed quotes around $3,200 in the Atlanta
          market. Watering twice daily through a Georgia July for the
          first two weeks is non-negotiable, and the tug test at week
          three tells you when to back off.
        </p>
      </Scenario>

      <h2>Where sod projects go wrong</h2>
      <p>
        <strong>Ordering before measuring the weird bits.</strong>{" "}
        Curves, tree rings, and walkway edges consume more sod than the
        square footage suggests, because every cut wastes a strip. Use
        10 percent waste on a shaped yard, 5 on a rectangle.
      </p>
      <p>
        <strong>Letting the pallet sit.</strong> Rolled sod composts
        itself: the middle of a pallet heats up like a compost pile
        within a day in summer. Schedule delivery for the morning you
        lay, not the weekend before.
      </p>
      <p>
        <strong>Watering like an established lawn.</strong> New sod has
        no roots to drink with. The top inch of soil under it must stay
        moist for two weeks, which means daily water, twice daily in
        heat, and then a deliberate taper so roots chase moisture
        downward.
      </p>
      <p>
        <strong>Wrong grass for the light.</strong> Bermuda dies in
        shade; St. Augustine tolerates it; fescue splits the
        difference in the transition zone. The cheapest pallet is
        expensive if the variety cannot live where you put it, so match
        grass to sun before price.
      </p>

      <Callout label="Sod farms cut to order">
        Most farms cut your pallets the day before delivery, which is
        why the fresh stuff takes so much better than day-old rolls
        from a parking lot. Order two to three days ahead, confirm the
        pallet coverage number on the invoice, and have the ground
        ready before the truck is scheduled, not after.
      </Callout>

      <h2>The rest of the yard math</h2>
      <p>
        A sod job usually travels with dirt and edges. The{" "}
        <a href="/topsoil-calculator">topsoil calculator</a> handles
        the base correction, the{" "}
        <a href="/mulch-calculator">mulch calculator</a> covers the
        beds the new lawn wraps around, and keeping the whole thing
        watered off a rain barrel is the{" "}
        <a href="/rainwater-calculator">rainwater calculator</a>&apos;s
        department.
      </p>
      <p>
        Measure the yard, run the calculator above, and time the
        delivery to the morning you lay. Fresh sod on ready ground is
        nearly foolproof; everything else is negotiable.
      </p>
    </>
  );
}
