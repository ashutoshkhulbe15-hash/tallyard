import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function ElevationSVG() {
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="Standard kitchen cabinet dimensions: base cabinets 34.5 inches tall and 24 deep, countertop brings it to 36. An 18 inch backsplash gap, then wall cabinets 12 inches deep in heights from 30 to 42 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The dimensions every cabinet line shares</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Heights and depths are fixed by the industry; only widths vary, in 3 inch steps</text>
      <line x1="60" y1="270" x2="330" y2="270" stroke={GUIDE_SVG.inkMuted} strokeWidth="2" />
      <rect x="80" y="180" width="120" height="88" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <rect x="76" y="172" width="128" height="8" fill={GUIDE_SVG.inkMuted} />
      <rect x="80" y="70" width="120" height="66" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="140" y="228" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>base</text>
      <text x="140" y="106" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.accent}>wall</text>
      <g fontSize="10" fill={GUIDE_SVG.ink}>
        <text x="216" y="226">34-1/2&quot; box + 1-1/2&quot; top = 36&quot;</text>
        <text x="216" y="242" fill={GUIDE_SVG.inkFaint}>24&quot; deep</text>
        <text x="216" y="158" fill={GUIDE_SVG.warm}>18&quot; splash gap</text>
        <text x="216" y="100">30 / 36 / 42&quot; tall options</text>
        <text x="216" y="116" fill={GUIDE_SVG.inkFaint}>12&quot; deep</text>
      </g>
      <g fontSize="11">
        <text x="420" y="86" fontWeight="600" fill={GUIDE_SVG.ink}>Fixed by standard</text>
        <text x="420" y="104" fill={GUIDE_SVG.inkMuted}>Counter height 36&quot;, depth 24&quot;/12&quot;</text>
        <text x="420" y="136" fontWeight="600" fill={GUIDE_SVG.ink}>Chosen by you</text>
        <text x="420" y="154" fill={GUIDE_SVG.inkMuted}>Widths, in 3&quot; increments: 9 to 48&quot;</text>
        <text x="420" y="186" fontWeight="700" fill={GUIDE_SVG.accent}>Any wall length fills with</text>
        <text x="420" y="204" fontWeight="700" fill={GUIDE_SVG.accent}>standard widths + one filler strip.</text>
        <text x="420" y="234" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>Tall pantry cabinets: 84, 90, or 96 inches,</text>
        <text x="420" y="248" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>matching the wall cabinet top line.</text>
      </g>
    </svg>
  );
}

function CostBarsSVG() {
  const tiers = [
    { name: "Stock (RTA/big box)", lo: 100, hi: 300, note: "3 inch increments, set styles, fastest" },
    { name: "Semi-custom", lo: 200, hi: 650, note: "standard sizes, modified depths and finishes" },
    { name: "Custom", lo: 500, hi: 1200, note: "any dimension, built to the wall" },
  ];
  const maxV = 1200;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Installed cabinet cost per linear foot: stock 100 to 300 dollars, semi-custom 200 to 650, custom 500 to 1200 and up.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed cost per linear foot, 2026</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Ranges cover cabinets and installation, not counters or appliances</text>
      {tiers.map((t, i) => {
        const y = 76 + i * 48;
        const x1 = 190 + (t.lo / maxV) * 380;
        const x2 = 190 + (t.hi / maxV) * 380;
        return (
          <g key={t.name}>
            <text x="180" y={y + 12} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{t.name}</text>
            <line x1="190" y1={y + 8} x2="570" y2={y + 8} stroke={GUIDE_SVG.line} strokeWidth="1" />
            <rect x={x1} y={y} width={x2 - x1} height="16" rx="8" fill={i === 0 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={x1 - 6} y={y + 12} textAnchor="end" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>${t.lo}</text>
            <text x={x2 + 6} y={y + 12} fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>${t.hi}{i === 2 ? "+" : ""}</text>
            <text x="190" y={y + 32} fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
          </g>
        );
      })}
      <text x="20" y="222" fontSize="9" fill={GUIDE_SVG.inkFaint}>The industry benchmark &quot;10x10 kitchen&quot; is about 20 linear feet, so multiply these by 20 for a quick whole-kitchen range.</text>
    </svg>
  );
}

export function KitchenCabinetCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="KCMA/ANSI A161.1 cabinet standard, NKBA Kitchen Planning Guidelines"
      />

      <h2>Every cabinet line is a 3-inch ruler</h2>
      <p>
        The entire US cabinet industry runs on one quiet convention:
        widths come in 3 inch increments, from a 9 inch tray base up to
        48 inches, while heights and depths are fixed. That is the
        &quot;3 inch increment cabinet line&quot; people go hunting
        spreadsheets for, and it is why a kitchen designer can fill any
        wall with stock boxes plus one filler strip. Base cabinets are
        34-1/2 inches tall and 24 deep; the countertop brings the work
        surface to 36. Wall cabinets are 12 deep in heights of 30, 36,
        or 42. Tall pantries run 84, 90, or 96 to meet the wall cabinet
        top line.
      </p>
      <p>
        Once the sizing system clicks, cabinet estimating collapses into
        one number: linear feet of run. The calculator above converts
        your layout and wall lengths into linear feet and a budget range
        by cabinet grade. This page carries the full size chart, the
        cost-per-linear-foot table quotes are actually built from, and
        the layout rules that decide how many boxes a wall really
        holds.
      </p>

      <Figure
        number={1}
        caption="The standard elevation. Heights and depths never change between brands; the KCMA standard is why a stock box from one maker sits flush beside another's."
      >
        <ElevationSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Dimensions follow the KCMA/ANSI A161.1 cabinet standard and
          NKBA planning guidelines. Cost ranges reflect typical 2026
          installed pricing across US markets for the three industry
          grades; the benchmark &quot;10x10 kitchen&quot; (two 10 foot
          walls, about 20 linear feet) is the unit shops use to compare
          lines, and this calculator prices your actual footage the
          same way.
        </p>
      </MethodologyNote>

      <h2>The 3-inch increment size chart</h2>

      <ComparisonTable
        caption="Standard widths by cabinet type. Every width between the ends exists in 3 inch steps; sink bases and drawer bases share the base widths."
        columns={[
          { title: "Widths (3 in steps)", highlight: true },
          { title: "Height" },
          { title: "Depth" },
        ]}
        rows={[
          { label: "Base", values: ['9" to 48"', '34-1/2"', '24"'] },
          { label: "Sink base", values: ['24" to 42"', '34-1/2"', '24"'] },
          { label: "Wall", values: ['9" to 48"', '30", 36", 42"', '12"'] },
          { label: "Wall over fridge/range", values: ['24" to 36"', '12", 15", 18", 24"', '12" or 24"'] },
          { label: "Tall pantry / oven", values: ['18" to 33"', '84", 90", 96"', '24"'] },
          { label: "Corner (lazy susan)", values: ['33" or 36"', '34-1/2"', '24"'] },
        ]}
      />

      <p>
        Two working answers from that chart. Cabinets per linear foot:
        there is no fixed count, because a 10 foot wall might be four 30
        inch boxes or eight 15s, but budget math does not care; kitchens
        price by the linear foot regardless of how the widths divide it.
        And the filler question: no wall is an exact multiple of 3
        inches, so every run ends with a filler strip of 1 to 3 inches
        scribed to the wall. A layout that needs more than about 4
        inches of filler is a layout that should swap one box size.
      </p>

      <h2>Cost per linear foot: the number quotes are built from</h2>

      <Figure
        number={2}
        caption="The three grades. Stock at the bottom is not a euphemism for bad: KCMA-certified stock boxes carry the same plywood options the mid tier does, in fewer finishes."
      >
        <CostBarsSVG />
      </Figure>

      <ComparisonTable
        caption="What moves a quote inside each grade. Installed prices; a 20 linear foot kitchen spans roughly $2,000 in RTA stock to $24,000 or more in custom."
        columns={[
          { title: "Stock", highlight: true },
          { title: "Semi-custom" },
          { title: "Custom" },
        ]}
        rows={[
          { label: "$/linear ft installed", values: ["$100-300", "$200-650", "$500-1,200+"] },
          { label: "Lead time", values: ["Days (RTA) to 2 weeks", "4-8 weeks", "8-16 weeks"] },
          { label: "Sizing", values: ['3" increments + fillers', '3" increments, mod depths', "Built to the wall, no fillers"] },
          { label: "Box construction", values: ["Particleboard or plywood", "Plywood common", "Plywood standard"] },
          { label: "Best fit", values: ["Rentals, flips, tight budgets", "Most owner remodels", "Odd walls, forever kitchens"] },
        ]}
      />

      <p>
        The upgrade ladder inside any grade is predictable: plywood box
        over particleboard adds 10 to 20 percent, soft-close hardware is
        standard in the mid tier and a cheap retrofit below it, drawer
        bases cost more than door bases but win on function every time,
        and finish choice moves price more than wood species does.
        Installation runs $50 to $150 per cabinet on top of material
        when it is quoted separately, which is worth knowing when one
        bid is &quot;installed&quot; and another is not.
      </p>

      <Scenario location="Minneapolis, MN">
        <p>
          An L-shaped kitchen, 12 foot and 8 foot walls: 20 linear feet,
          the classic 10x10-equivalent. The run takes a 36 inch sink
          base, a 30 inch drawer base, two 24 inch door bases, a 33
          inch lazy susan in the corner, and wall cabinets in 36 inch
          heights above, with a 2-1/4 inch filler at each dead end.
        </p>
        <p>
          Priced three ways from the same footage: KCMA-certified stock
          in a painted shaker at $185/LF installed is about $3,700.
          Semi-custom with plywood boxes and two depth modifications at
          $340/LF is about $6,800. A local custom shop quotes the same
          layout at $520/LF, about $10,400, with no fillers and a
          matching hood surround. The boxes are a third of a full
          remodel: counters, backsplash, and appliances ride on top of
          all three numbers.
        </p>
      </Scenario>

      <h2>Where cabinet estimates go wrong</h2>
      <p>
        <strong>Measuring the floor instead of the walls.</strong>{" "}
        Cabinet runs follow walls and stop at appliances. Measure each
        wall, then subtract the range, the fridge, and the dishwasher
        opening (30, 36, and 24 inches are the usual holes), because
        those linear feet cost zero cabinet dollars.
      </p>
      <p>
        <strong>Forgetting the corner eats two runs.</strong> An L or U
        corner consumes about 36 inches from each wall it touches. Two
        10 foot walls hold roughly 17 usable linear feet of boxes, not
        20, once the corner unit takes its share.
      </p>
      <p>
        <strong>Comparing quotes across different scopes.</strong> One
        bid includes demo, install, crown, and toe kicks; another is
        boxes on a pallet. Normalize everything to installed cost per
        linear foot for the same box construction, and the spread
        between shops usually shrinks to something explainable.
      </p>
      <p>
        <strong>Buying wall cabinets short.</strong> The 30 inch wall
        cabinet exists for soffited kitchens. In a modern 8 or 9 foot
        room with no soffit, 36 or 42 inch uppers to the ceiling cost
        maybe 10 percent more and add a third more storage, and no one
        has ever remodeled back to the gap above the cabinets.
      </p>

      <Callout label="The KCMA seal is the spec sheet shortcut">
        KCMA/ANSI A161.1 certification means the cabinet passed
        structural, finish, and moisture testing: shelves loaded, doors
        slammed, finishes hit with vinegar and coffee. A stock line
        with the seal beats an unlabeled boutique box for durability
        claims, and it is the one line on a spec sheet worth checking
        before any showroom conversation.
      </Callout>

      <h2>The rest of the kitchen stack</h2>
      <p>
        Cabinets set the geometry everything else follows. The counter
        that sits on the run is the{" "}
        <a href="/countertop-calculator">countertop calculator</a>&apos;s
        job, the wall between counter and uppers belongs to the{" "}
        <a href="/backsplash-calculator">backsplash calculator</a>, and
        a bathroom vanity is the same math at 22 inch depth in the{" "}
        <a href="/vanity-calculator">vanity calculator</a>.
      </p>
      <p>
        Measure the walls, subtract the appliances, run the calculator
        above, and carry linear feet into every showroom. It is the
        only number all three grades quote in.
      </p>
    </>
  );
}
