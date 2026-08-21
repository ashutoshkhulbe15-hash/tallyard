import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function RuleSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="The 1 to 300 rule: a 1,500 square foot attic needs 5 square feet of net free area, split half at the soffit and half at the ridge, which is 720 square inches at each.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The 1:300 rule, worked</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>IRC R806.2. One square foot of net free area for every 300 square feet of attic floor.</text>

      <rect x="44" y="86" width="146" height="56" rx="4" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="117" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>1,500 ft&#178;</text>
      <text x="117" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>attic floor</text>

      <text x="204" y="120" fontSize="16" fill={GUIDE_SVG.inkFaint}>&#247; 300 =</text>

      <rect x="286" y="86" width="146" height="56" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="359" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>5 ft&#178; NFA</text>
      <text x="359" y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.accent}>720 square inches</text>

      <text x="446" y="120" fontSize="16" fill={GUIDE_SVG.inkFaint}>split</text>

      <rect x="508" y="76" width="150" height="34" rx="4" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="583" y="98" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.warm}>360 in&#178; intake</text>
      <rect x="508" y="118" width="150" height="34" rx="4" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="583" y="140" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.warm}>360 in&#178; exhaust</text>

      <text x="44" y="186" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Why 1:150 sometimes applies instead</text>
      <text x="44" y="204" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>Without a vapor retarder on the attic floor, or without a balanced upper and lower split, the code doubles</text>
      <text x="44" y="220" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>the requirement to 1 square foot per 150. Meeting the balance condition is what earns the easier ratio.</text>
      <text x="20" y="244" fontSize="9" fill={GUIDE_SVG.inkFaint}>Net free area is the open area of a vent, not its outside dimensions. Screens and louvers cut it roughly in half.</text>
    </svg>
  );
}

function BalanceSVG() {
  return (
    <svg viewBox="0 0 680 262" width="100%" height="auto" role="img" aria-label="Air enters at the soffit vents and exits at the ridge. Intake must at least equal exhaust, otherwise the system pulls conditioned air from the house instead.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Air has to come in before it can go out</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Half the net free area at the soffit, half at or near the ridge</text>

      <path d="M 80 190 L 330 96 L 580 190 Z" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <line x1="60" y1="190" x2="600" y2="190" stroke={GUIDE_SVG.inkMuted} strokeWidth="2.5" />

      <rect x="316" y="88" width="28" height="8" fill={GUIDE_SVG.accent} />
      <text x="368" y="78" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>ridge vent</text>
      <line x1="330" y1="84" x2="330" y2="64" stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <path d="M 330 56 L 325 66 L 335 66 Z" fill={GUIDE_SVG.accent} />

      <rect x="92" y="182" width="30" height="8" fill={GUIDE_SVG.warm} />
      <rect x="538" y="182" width="30" height="8" fill={GUIDE_SVG.warm} />
      <text x="107" y="210" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.warm}>soffit</text>
      <text x="553" y="210" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.warm}>soffit</text>

      <path d="M 122 178 L 210 152 L 302 120" fill="none" stroke={GUIDE_SVG.warm} strokeWidth="2" strokeDasharray="6 4" />
      <path d="M 302 120 L 296 130 L 308 128 Z" fill={GUIDE_SVG.warm} />
      <path d="M 538 178 L 450 152 L 358 120" fill="none" stroke={GUIDE_SVG.warm} strokeWidth="2" strokeDasharray="6 4" />
      <path d="M 358 120 L 364 130 L 352 128 Z" fill={GUIDE_SVG.warm} />

      <text x="330" y="168" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>air warms, rises, carries moisture out</text>

      <text x="20" y="240" fontSize="10.5" fontWeight="600" fill={GUIDE_SVG.ink}>Under-vented intake is the most common defect</text>
      <text x="20" y="256" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>With too little soffit area, a ridge vent pulls air from the house through ceiling gaps instead, taking heated air with it.</text>
    </svg>
  );
}

function VentTypesSVG() {
  const vents = [
    { n: "Continuous soffit", nfa: 9, unit: "in² per lin ft", role: "intake" },
    { n: "Rectangular soffit vent", nfa: 26, unit: "in² each (8x16)", role: "intake" },
    { n: "Ridge vent", nfa: 18, unit: "in² per lin ft", role: "exhaust" },
    { n: "Box or roof vent", nfa: 50, unit: "in² each", role: "exhaust" },
    { n: "Gable vent", nfa: 70, unit: "in² each (12x18)", role: "exhaust" },
  ];
  const maxN = 70;
  return (
    <svg viewBox="0 0 680 292" width="100%" height="auto" role="img" aria-label="Typical net free area: continuous soffit vent 9 square inches per linear foot, rectangular soffit vent 26 square inches each, ridge vent 18 per linear foot, box vent 50 each, gable vent 70 each.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Typical net free area by vent type</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Representative figures. Note the units differ: soffit and ridge are per linear foot, box and gable are per vent.</text>
      {vents.map((v, i) => {
        const y = 74 + i * 34;
        const w = (v.nfa / maxN) * 250;
        return (
          <g key={v.n}>
            <text x="196" y={y + 12} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{v.n}</text>
            <rect x="208" y={y} width={w} height="16" rx="3" fill={v.role === "intake" ? GUIDE_SVG.warm : GUIDE_SVG.accent} />
            <text x={208 + w + 10} y={y + 12} fontSize="10.5" fontWeight="700" fill={v.role === "intake" ? GUIDE_SVG.warm : GUIDE_SVG.accent}>{v.nfa}</text>
            <text x="500" y={y + 12} fontSize="9" fill={GUIDE_SVG.inkFaint}>{v.unit}</text>
          </g>
        );
      })}
      <rect x="208" y="256" width="12" height="10" fill={GUIDE_SVG.warm} />
      <text x="226" y="265" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>intake, at the soffit</text>
      <rect x="360" y="256" width="12" height="10" fill={GUIDE_SVG.accent} />
      <text x="378" y="265" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>exhaust, at or near the ridge</text>
      <text x="20" y="286" fontSize="9" fill={GUIDE_SVG.inkFaint}>Bar length compares magnitude within each unit, not across them. A 40 ft run of soffit vent at 9 in&#178; per foot is 360 in&#178;.</text>
    </svg>
  );
}

export function AtticVentilationCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="IRC 2021 Section R806 attic ventilation, ASHRAE moisture control guidance, DOE Building America attic recommendations"
      />

      <h2>One square foot of vent per 300 square feet of attic</h2>
      <p>
        The code requirement is a ratio and nothing more complicated. IRC
        R806.2 asks for one square foot of net free ventilating area for
        every 300 square feet of attic floor, provided the vents are split
        roughly evenly between low and high and the ceiling below has a
        vapor retarder. Miss either of those conditions and the ratio
        doubles to 1:150. A 1,500 square foot attic therefore needs 5
        square feet of opening, which is 720 square inches, half of it at
        the soffit and half at the ridge.
      </p>
      <p>
        The calculator above runs that math and converts it into a vent
        count. What it cannot do is tell you the two things that make most
        attics fail their own arithmetic: that net free area is not the
        size of the vent, and that intake is almost always the half that
        comes up short.
      </p>

      <Figure
        number={1}
        caption="The ratio applied to a typical attic. Note the split: the code wants the opening divided between low and high, not concentrated wherever it was easiest to cut."
      >
        <RuleSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Ratios follow IRC 2021 Section R806.2, which permits 1:300 when
          the ventilation is balanced between upper and lower openings and
          a Class I or II vapor retarder is installed on the warm side of
          the ceiling, and requires 1:150 otherwise. Net free area figures
          are typical published values; every vent product lists its own
          NFA and that figure governs. Section R806.3 requires a minimum
          1 inch airspace above insulation at eaves, which is what baffles
          preserve.
        </p>
      </MethodologyNote>

      <h2>Net free area is not vent size</h2>
      <p>
        A 16 by 8 inch soffit vent measures 128 square inches. Its net free
        area is closer to 26, because the louvers and the insect screen
        occupy most of the opening. This is the single largest source of
        error in attic ventilation, and it runs in the dangerous direction:
        people count the outside dimensions, conclude they have four times
        the ventilation they actually have, and stop. Manufacturers print
        the NFA on the packaging or the spec sheet precisely because the
        two numbers differ so much, and the printed figure is the one the
        inspector uses.
      </p>

      <Figure
        number={2}
        caption="Typical net free area by vent type, with intake in amber and exhaust in green. Continuous soffit vent at 9 square inches per linear foot means a 40 foot eave contributes 360 square inches."
      >
        <VentTypesSVG />
      </Figure>

      <ComparisonTable
        caption="How the common vents behave in a system. Mixing two exhaust types on the same attic is the classic mistake, covered below."
        columns={[
          { title: "Role" },
          { title: "Works with", highlight: true },
          { title: "Watch out for" },
        ]}
        rows={[
          { label: "Continuous soffit", values: ["Intake", "Any exhaust type", "Insulation blocking the eave"] },
          { label: "Rectangular soffit vents", values: ["Intake", "Any exhaust type", "Too few of them to reach the number"] },
          { label: "Ridge vent", values: ["Exhaust", "Soffit intake only", "Needs a continuous ridge to work"] },
          { label: "Box or roof vents", values: ["Exhaust", "Soffit intake", "Uneven coverage across a long roof"] },
          { label: "Gable vents", values: ["Exhaust", "Alone, or as intake with ridge", "Short-circuiting a ridge vent"] },
          { label: "Powered attic fan", values: ["Exhaust", "Abundant soffit intake", "Depressurizing the house"] },
        ]}
      />

      <h2>Balance, and why intake is usually the problem</h2>
      <p>
        Attic ventilation works by convection: cooler air enters low at the
        soffits, warms, rises, and leaves at the ridge, carrying moisture
        with it. That only functions if there is enough intake to feed the
        exhaust. When soffit area falls short, the ridge vent does not
        simply move less air. It finds air somewhere else, and the nearest
        source is the house itself, through recessed lights, attic hatches,
        and every gap around plumbing and wiring. The attic then vents your
        heated or cooled air, and pulls humidity from the living space up
        into the roof structure along the way.
      </p>
      <p>
        Two things cause intake shortfalls. The first is insulation pushed
        into the eaves, which physically blocks the soffit. The fix is
        baffles, sometimes called rafter vents or insulation stops: rigid
        channels stapled between rafters that hold a clear path from the
        soffit up past the insulation. IRC R806.3 requires at least a one
        inch airspace there, and blown insulation in an unbaffled attic
        will fill it every time. Soffit attic ventilation also fails a second way: soffits that were
        never vented at all, or were vented and then painted over, which is common on
        older houses and worth checking from the ground with binoculars
        before buying any exhaust vents.
      </p>

      <Figure
        number={3}
        caption="The intended airflow. Ventilation is a stack effect, so the intake and exhaust are two halves of one system rather than two separate features."
      >
        <BalanceSVG />
      </Figure>

      <h2>Do not mix exhaust types</h2>
      <p>
        Combining a ridge vent with gable vents, or with box vents, is one
        of the most common defects found on inspections. The ridge vent is
        the highest opening, so it wants to draw from the lowest ones. When
        a gable vent sits partway up, the ridge pulls air from the gable
        instead of from the soffits, and the lower two thirds of the attic
        stops ventilating entirely. The area near the ridge gets excellent
        airflow, the eaves get none, and moisture collects exactly where
        the sheathing is coldest.
      </p>
      <p>
        The fix is to pick one exhaust strategy. If you are installing a
        ridge vent, block or remove the gable vents, or convert them to
        intake if the soffits are inadequate and cannot be opened up.
        Powered attic fans deserve the same caution and one more: a fan
        moving more air than the intake can supply will pull conditioned
        air out of the house, and in the worst case can backdraft a
        combustion appliance. Solar powered versions are popular and have
        the same requirement. If a powered vent is the plan, the soffit
        intake needs to be generous first.
      </p>

      <Scenario location="Nashville, TN">
        <p>
          A 1,500 square foot ranch with a 50 foot ridge, continuous
          soffits along both 50 foot eaves, and a vapor retarder on the
          ceiling. Ratio: 1:300, so 5 square feet or 720 square inches of
          net free area, split 360 intake and 360 exhaust.
        </p>
        <p>
          Intake: 100 linear feet of continuous soffit vent at 9 square
          inches per foot gives 900 square inches, comfortably past the
          360 required. Exhaust: ridge vent at 18 square inches per foot
          across 50 feet gives 900, also well past. On paper the attic is
          strongly ventilated. In practice the inspection found blown
          insulation packed into both eaves with no baffles, so the real
          intake was near zero and the ridge vent had been pulling
          conditioned air through the attic hatch for years. The fix was
          $180 of baffles and an afternoon, not new vents. This is the
          usual outcome: the numbers were never the problem.
        </p>
      </Scenario>

      <h2>Signs of poor attic ventilation</h2>
      <p>
        The symptoms are seasonal and specific. In winter: frost or
        condensation on the underside of the roof sheathing, damp or
        compressed insulation, rusty nail points, and ice dams at the eaves,
        which form when escaping heat melts snow that then refreezes over
        the cold overhang. In summer: attic temperatures far above outdoor
        ambient, upstairs rooms that will not cool, and shingles aging
        faster on one slope than another. Year round: a musty smell,
        mildew on the framing, or dark staining on the sheathing.
      </p>
      <p>
        Worth separating from ventilation, because they get blamed on it:
        bathroom and dryer exhaust fans that terminate inside the attic
        instead of through the roof or wall. That single defect dumps
        enormous moisture directly into the space and no amount of
        ventilation fully compensates. If an attic has a moisture problem,
        checking where the bath fans actually discharge is the first
        thing to do.
      </p>

      <ComparisonTable
        caption="Vent count for common attic sizes at 1:300, split evenly. Continuous soffit and ridge figures are linear feet; box and gable figures are unit counts."
        columns={[
          { title: "Total NFA needed" },
          { title: "Soffit (continuous)", highlight: true },
          { title: "Exhaust options" },
        ]}
        rows={[
          { label: "900 ft² attic", values: ["432 in²", "24 lin ft", "12 lin ft ridge, or 5 box vents"] },
          { label: "1,200 ft² attic", values: ["576 in²", "32 lin ft", "16 lin ft ridge, or 6 box vents"] },
          { label: "1,500 ft² attic", values: ["720 in²", "40 lin ft", "20 lin ft ridge, or 8 box vents"] },
          { label: "2,000 ft² attic", values: ["960 in²", "54 lin ft", "27 lin ft ridge, or 10 box vents"] },
          { label: "2,500 ft² attic", values: ["1,200 in²", "67 lin ft", "34 lin ft ridge, or 12 box vents"] },
        ]}
      />

      <Callout label="Some roofs are meant to have no ventilation at all">
        An unvented conditioned attic, insulated at the roof deck with
        spray foam rather than at the ceiling, is a different assembly
        governed by IRC R806.5 and it deliberately has no vents. Adding
        soffit or ridge ventilation to one defeats the design and can
        cause condensation inside the foam. Before adding vents to any
        attic, confirm which type you have. If the insulation follows the
        roof slope rather than lying on the ceiling, stop and get advice
        specific to that assembly.
      </Callout>

      <h2>The rest of the roof and attic</h2>
      <p>
        Ventilation works alongside insulation rather than against it. The{" "}
        <a href="/insulation-calculator">insulation calculator</a> sizes
        the R-value on the attic floor, the{" "}
        <a href="/roofing-calculator">roofing calculator</a> covers a
        reroof when the ridge vent goes in, and ice damming at the eaves
        ties into both the{" "}
        <a href="/gutter-calculator">gutter calculator</a> and the{" "}
        <a href="/snow-load-calculator">snow load calculator</a>.
      </p>
      <p>
        Measure the attic floor, divide by 300, split the result in half,
        and check the published net free area on whatever vents you buy.
        Then go look at the eaves, because that is where the number
        usually falls apart.
      </p>
    </>
  );
}
