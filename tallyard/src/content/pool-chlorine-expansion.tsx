import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function DoseBarSVG() {
  const bars = [
    { label: "Trichlor tabs (90%)", oz: 1.3, note: "strongest by weight, adds CYA" },
    { label: "Cal-hypo (65%)", oz: 1.8, note: "fast shock, adds calcium" },
    { label: "Dichlor (55%)", oz: 2.1, note: "fast dissolve, adds CYA" },
    { label: "Liquid (10%)", oz: 10.5, note: "bulky but clean, nothing left behind" },
  ];
  const maxOz = 10.5;
  const barMaxW = 300;
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Ounces of product needed to raise 10,000 gallons by 1 ppm: trichlor 1.3 oz, cal-hypo 1.8 oz, dichlor 2.1 oz, liquid chlorine 10.5 oz.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How much product raises 10,000 gallons by 1 ppm</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Stronger concentration means a smaller dose. What each product leaves behind matters more.</text>
      {bars.map((b, i) => {
        const y = 70 + i * 46;
        const w = Math.max(14, (b.oz / maxOz) * barMaxW);
        return (
          <g key={b.label}>
            <text x="180" y={y + 13} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{b.label}</text>
            <rect x="192" y={y} width={w} height="18" rx="3" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={192 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{b.oz} oz</text>
            <text x="192" y={y + 32} fontSize="9" fill={GUIDE_SVG.inkFaint}>{b.note}</text>
          </g>
        );
      })}
      <text x="20" y="252" fontSize="9" fill={GUIDE_SVG.inkFaint}>Scale linearly: a 20,000 gallon pool needs double, a 3 ppm raise needs triple. The calculator does both at once.</text>
    </svg>
  );
}

function ChemistryTargetsSVG() {
  const rows = [
    { label: "Free chlorine", low: "1 ppm", high: "3 ppm", note: "MAHC allows up to 10 ppm; above 4 ppm is unpleasant to swim in" },
    { label: "pH", low: "7.2", high: "7.6", note: "at pH 8.0 most of your chlorine stops killing anything" },
    { label: "Cyanuric acid (CYA)", low: "30 ppm", high: "50 ppm", note: "outdoor pools; above 100 ppm chlorine locks up" },
  ];
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Target water chemistry: free chlorine 1 to 3 ppm, pH 7.2 to 7.6, cyanuric acid 30 to 50 ppm.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The three numbers that decide whether chlorine works</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Ranges follow the CDC Model Aquatic Health Code and PHTA residential standards</text>
      {rows.map((r, i) => {
        const y = 72 + i * 40;
        return (
          <g key={r.label}>
            <text x="150" y={y + 6} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.label}</text>
            <rect x="165" y={y - 8} width="120" height="22" rx="11" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
            <text x="225" y={y + 7} textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>{r.low} to {r.high}</text>
            <text x="300" y={y + 6} fontSize="9.5" fill={GUIDE_SVG.inkFaint}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

function VolumeFormulaSVG() {
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Pool volume formulas: rectangular pools use length times width times average depth times 7.5. Round pools use diameter squared times average depth times 5.9.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Finding your gallons</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Average depth = (shallow end + deep end) divided by 2</text>
      <rect x="40" y="70" width="170" height="90" rx="4" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="125" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>rectangular</text>
      <circle cx="125" cy="205" r="26" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="168" y="209" fontSize="10" fill={GUIDE_SVG.inkFaint}>round</text>
      <g fontSize="11">
        <text x="290" y="86" fontWeight="600" fill={GUIDE_SVG.ink}>Rectangular</text>
        <text x="290" y="104" fill={GUIDE_SVG.inkMuted}>length x width x avg depth x 7.5</text>
        <text x="290" y="122" fontSize="10" fill={GUIDE_SVG.inkFaint}>16 x 32 x 5 ft avg = 19,200 gallons</text>
        <text x="290" y="156" fontWeight="600" fill={GUIDE_SVG.ink}>Round</text>
        <text x="290" y="174" fill={GUIDE_SVG.inkMuted}>diameter squared x avg depth x 5.9</text>
        <text x="290" y="192" fontSize="10" fill={GUIDE_SVG.inkFaint}>24 ft x 24 ft x 4 ft = 13,594 gallons</text>
        <text x="290" y="222" fontWeight="700" fill={GUIDE_SVG.accent}>Kidney or freeform: use the rectangle</text>
        <text x="290" y="238" fontWeight="700" fill={GUIDE_SVG.accent}>formula, then knock off 15 percent.</text>
      </g>
    </svg>
  );
}

export function PoolChlorineCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="CDC Model Aquatic Health Code (MAHC) Ch. 5, ANSI/APSP/ICC-11 water quality standard, EPA product label requirements"
      />

      <h2>The dose is arithmetic. The guessing is the problem.</h2>
      <p>
        For a typical 15,000 gallon pool sitting at 0 ppm, it takes about 47
        fluid ounces of 10 percent liquid chlorine to reach 3 ppm. Not a
        &quot;glug.&quot; Not &quot;half the jug, roughly.&quot; Forty-seven
        ounces. Pool chlorine is one of the few home maintenance jobs where the
        exact right answer is three multiplications away, and yet most owners
        dose by feel all summer and then wonder why the water swings between
        green and swimsuit-bleaching.
      </p>
      <p>
        The math needs three inputs: how many gallons you have, how far you
        need to raise the chlorine level, and which product you are pouring.
        The calculator above handles all of it, including the conversion into
        gallons of liquid, pounds of granular, or a count of 3 inch tablets.
        This page covers the parts a calculator cannot do for you: finding
        your true volume, choosing between the four common products, and
        figuring out what went wrong when the test strip says zero the morning
        after you dosed.
      </p>

      <Figure
        number={1}
        caption="Ounces of each product needed to raise 10,000 gallons by 1 ppm. Trichlor looks efficient by weight, but it adds cyanuric acid with every dose, and that bill comes due."
      >
        <DoseBarSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Dosing factors are standard industry values: 10.5 oz of 10 percent
          sodium hypochlorite, 1.8 oz of 65 percent calcium hypochlorite, 1.3
          oz of 90 percent trichlor, or 2.1 oz of 55 percent dichlor, each per
          10,000 gallons per 1 ppm. Target chemistry ranges follow the CDC
          Model Aquatic Health Code Chapter 5 and the ANSI/APSP/ICC-11
          standard published by the Pool &amp; Hot Tub Alliance. Product labels
          are EPA-registered and legally binding: if a label disagrees with
          any calculator, the label wins.
        </p>
      </MethodologyNote>

      <h2>The one number that runs everything</h2>
      <p>
        Every chemical decision you will ever make for this pool divides by
        its volume. Get the gallons wrong by 30 percent and every dose you
        pour for the next decade is wrong by 30 percent. It is worth twenty
        minutes with a tape measure to nail it once.
      </p>
      <p>
        Rectangular pools are easy: length times width times average depth
        times 7.5. The 7.5 is gallons per cubic foot (7.48, rounded the way
        the trade rounds it). Average depth is the shallow end plus the deep
        end, divided by two. A 16 by 32 pool that runs 3 feet to 7 feet
        averages 5 feet deep and holds 19,200 gallons. Round pools square the
        diameter, multiply by average depth, then by 5.9. Freeform and kidney
        shapes resist clean formulas, so measure the longest length and widest
        width, run the rectangle math, and subtract 15 percent. Close enough
        for chlorine.
      </p>

      <Figure
        number={2}
        caption="Volume formulas for the two shapes that cover most residential pools. Measure water depth, not wall height. An above-ground pool with 52 inch walls holds about 48 inches of water."
      >
        <VolumeFormulaSVG />
      </Figure>

      <h2>Above-ground pool sizes and what they actually hold</h2>
      <p>
        Above-ground owners have it easier, because the pools come in standard
        diameters and nearly all of them run 48 inches of water inside 52 inch
        walls. If you know the size printed on the box, you know the gallons.
        The table below also shows the liquid chlorine needed to raise each
        size by 3 ppm, which is the full dose for a freshly filled or fully
        depleted pool.
      </p>

      <ComparisonTable
        caption="Nominal capacities for round above-ground pools at 48 inches of water depth. Oval pools: multiply length x width x 4 x 5.9. Doses use 10 percent liquid chlorine."
        columns={[
          { title: "Gallons", subtitle: "48 in water" },
          { title: "Liquid to raise 3 ppm", subtitle: "10% sodium hypochlorite", highlight: true },
        ]}
        rows={[
          { label: "12 ft round", values: ["3,400", "11 fl oz"] },
          { label: "15 ft round", values: ["5,300", "17 fl oz"] },
          { label: "18 ft round", values: ["7,600", "24 fl oz"] },
          { label: "21 ft round", values: ["10,400", "33 fl oz"] },
          { label: "24 ft round", values: ["13,600", "43 fl oz"] },
          { label: "27 ft round", values: ["17,200", "54 fl oz"] },
          { label: "30 ft round", values: ["21,200", "67 fl oz"] },
          { label: "33 ft round", values: ["25,700", "81 fl oz"] },
        ]}
      />

      <p>
        Two things jump out of that table. First, even the big 33 footer needs
        less than a gallon of liquid to fully chlorinate from zero, so buying
        chlorine by the case is about convenience, not necessity. Second, the
        common 24 foot pool holds nearly 14,000 gallons. People routinely
        guess 8,000 and then cannot understand why their &quot;full dose&quot;
        barely moves the needle.
      </p>

      <h2>Liquid, tablets, granular: pick one lane</h2>
      <p>
        Four products dominate the residential market, and they are not
        interchangeable. Each carries a different concentration of available
        chlorine and, more importantly, each leaves something different behind
        in the water. The concentration decides the dose. The leftovers decide
        what your water chemistry looks like in August.
      </p>

      <ComparisonTable
        caption="What each product costs you beyond the price tag. CYA is cyanuric acid, the stabilizer that accumulates and eventually smothers chlorine activity."
        columns={[
          { title: "Liquid 10%", subtitle: "sodium hypochlorite", highlight: true },
          { title: "Cal-hypo 65%", subtitle: "granular" },
          { title: "Trichlor 90%", subtitle: "3 in tablets" },
          { title: "Dichlor 55%", subtitle: "granular" },
        ]}
        rows={[
          {
            label: "Dose per 10k gal per ppm",
            values: ["10.5 fl oz", "1.8 oz", "1.3 oz", "2.1 oz"],
          },
          {
            label: "Speed",
            values: ["Immediate", "Fast, pre-dissolve", "Slow release over days", "Fast dissolve"],
          },
          {
            label: "What it adds",
            values: ["A little salt", "Calcium hardness", "CYA, drops pH", "CYA"],
          },
          {
            label: "Best for",
            values: ["Daily maintenance", "Shock treatment", "Vacation cover, feeders", "Spot dosing, spas"],
          },
          {
            label: "Watch out for",
            values: ["Loses strength in storage", "Cloudy if poured dry", "CYA buildup by July", "Priciest per ppm"],
          },
        ]}
      />

      <p>
        If you want one recommendation: liquid for the routine, cal-hypo for
        the weekly shock. It is the boring answer and the right one. Liquid
        chlorine adds nothing that accumulates, which means your water in
        September behaves like your water in June. The tablet-only routine
        feels effortless right up until the stabilizer it quietly deposits
        crosses 100 ppm and your chlorine stops working no matter how much you
        add. More on that failure below, because it is the single most common
        one.
      </p>

      <h2>Tablets and floaters, done right</h2>
      <p>
        Trichlor tablets are genuinely useful in two places: a floating
        dispenser while you are away for a week, and an inline feeder plumbed
        after the filter. A standard 3 inch tablet weighs 8 ounces and
        dissolves over roughly 3 to 7 days depending on water temperature and
        how far open the floater vents are. One tablet per 5,000 gallons is
        the working rule, so a 15,000 gallon pool floats three at a time.
      </p>
      <p>
        Three tablet rules people learn the hard way. Never throw tablets
        straight into the pool; they sink, sit on the liner, and bleach a
        permanent white ring into it. Pull the floater out, or tether it away
        from the swim area, while people are in the water, since it is a
        concentrated acid puck a curious kid can grab. And never load trichlor
        into a feeder or floater that has ever held cal-hypo. The two react,
        and the reaction is violent enough that product labels warn about it
        in bold. Different products, different containers, always.
      </p>

      <Figure
        number={3}
        caption="The chemistry that has to be right before any dose lands. Fix pH first: chlorine poured into pH 8.0 water is mostly wasted."
      >
        <ChemistryTargetsSVG />
      </Figure>

      <h2>Test before you pour, and fix pH first</h2>
      <p>
        A chlorine dose is only as good as the test that preceded it. Strips
        are fine for a Tuesday check. A drop-based kit (the Taylor K-2006 is
        the one pool forums have canonized, for good reason) is worth owning
        for anything you plan to act on, because strips read badly at the
        exact moments that matter: very low chlorine and very high chlorine.
      </p>
      <p>
        The reading that outranks chlorine is pH. Chlorine kills as
        hypochlorous acid, and the share of your chlorine in that active form
        collapses as pH rises: roughly half at pH 7.5, down near 20 percent at
        pH 8.0. Pour a full dose into high-pH water and most of it sits there
        in a lazy, ineffective form while the algae carries on. The order of
        operations is always the same. Test. Adjust pH into the 7.2 to 7.6
        window. Then chlorinate. Then retest after 30 to 60 minutes of pump
        circulation before trusting the number.
      </p>

      <Scenario location="Phoenix, AZ">
        <p>
          A 16 by 32 foot inground pool, 3 ft shallow to 7 ft deep, so 5 ft
          average: 16 x 32 x 5 x 7.5 = 19,200 gallons. It is July, the water
          is 92 degrees, and the afternoon test reads 1 ppm free chlorine
          with pH at 7.4.
        </p>
        <p>
          Routine top-up to 3 ppm means raising 2 ppm: (19,200 / 10,000) x 2
          x 10.5 = 40 fl oz of 10 percent liquid, a quart and a splash,
          poured slowly in front of the return jet with the pump running.
          After a Saturday pool party, shocking from 1 ppm to 10 ppm means
          raising 9: (19,200 / 10,000) x 9 x 10.5 = 181 fl oz, about 1.4
          gallons, added at dusk so the desert sun does not burn it off
          before it finishes working. In Phoenix heat with daily UV load,
          this pool eats chlorine fast enough that liquid dosing every
          evening beats tablets, which would push stabilizer past 100 ppm by
          the end of June.
        </p>
      </Scenario>

      <h2>Where pool chlorine goes wrong</h2>
      <p>
        <strong>The test reads zero the morning after a full dose.</strong>{" "}
        This is almost never a testing error. Something in the water consumed
        the chlorine overnight: an early algae bloom you cannot see yet,
        ammonia from heavy bather load, or debris after a storm. A pool that
        loses all its chlorine overnight is telling you the demand is higher
        than the dose. Shock it, then retest at sunrise. If it holds
        overnight, you are done. If it zeroes again, shock again. Chlorine
        demand always wins until it is satisfied.
      </p>
      <p>
        <strong>Total chlorine is fine but the water smells and stings.</strong>{" "}
        Test kits report two numbers, and the difference between them is the
        diagnosis. Free chlorine is the active sanitizer. Total chlorine
        includes chloramines, the used-up combined form that causes the sharp
        &quot;chlorine smell&quot; and red eyes. A strong pool smell means too
        little active chlorine, not too much. The fix is counterintuitive: a
        shock dose high enough to burn the chloramines off, which the MAHC
        annex describes as breakpoint chlorination.
      </p>
      <p>
        <strong>Chlorine lock.</strong> Months of trichlor tablets push
        cyanuric acid past 100 ppm, and at that level CYA binds chlorine
        faster than the chlorine can work. The test shows adequate free
        chlorine while algae grows anyway. No product pours CYA back down.
        The only realistic fix is draining a third of the pool, refilling,
        and switching the routine to liquid. Test CYA monthly if tablets are
        your main feed; it climbs about 3 ppm for every ppm of chlorine the
        tablets deliver.
      </p>
      <p>
        <strong>Granular poured straight in.</strong> Cal-hypo scattered dry
        across the surface clouds the water and can bleach vinyl liners where
        the grains settle. Pre-dissolve it in a bucket of pool water, stir
        with a stick that is not your hand, and pour the slurry around the
        perimeter. Always chemical into water, never water into chemical.
      </p>

      <h2>How long before you can swim</h2>
      <ComparisonTable
        caption="Working rules for residential pools. When in doubt, test: swim when free chlorine is at or below 4 ppm and the water is clear."
        columns={[
          { title: "After this dose" },
          { title: "Wait", highlight: true },
          { title: "Why" },
        ]}
        rows={[
          {
            label: "Liquid, routine",
            values: ["Maintenance dose to 3 ppm", "30 min of circulation", "Needs to disperse, nothing to dissolve"],
          },
          {
            label: "Granular",
            values: ["Pre-dissolved cal-hypo or dichlor", "2 to 4 hours", "Undissolved grains bleach suits and skin"],
          },
          {
            label: "Shock",
            values: ["Any product to 10 ppm", "4 to 8 hours, test first", "Levels must fall to 4 ppm or below"],
          },
          {
            label: "Tablets",
            values: ["Tabs in floater or feeder", "No wait", "Slow release never spikes the pool"],
          },
        ]}
      />

      <h2>Does chlorine go bad? Yes, and faster than you think.</h2>
      <p>
        Liquid chlorine is the perishable one. At 10 percent strength it loses
        potency month by month, and a jug that spent a summer in a hot garage
        can be down to half strength by the next season. Buy liquid in
        quantities you will use within 4 to 8 weeks, store it cool and dark,
        and if you are dosing correctly with old liquid and the numbers still
        will not move, the jug is the suspect. Trichlor tablets hold 3 to 5
        years sealed and dry. Cal-hypo lasts a couple of years but is the
        touchiest to store: it must stay bone dry and nowhere near anything
        organic or flammable, per its own label. Old algaecide, since people
        ask: it keeps for years, but separated or gelled product goes in the
        hazardous waste drop-off, not the pool.
      </p>

      <Callout label="The label is the law, literally">
        Every chlorine product sold in the US carries an EPA-registered label,
        and the application rates on it are federally enforceable
        instructions, not suggestions. This calculator gets you a precise
        starting dose from published industry factors, but if the jug in your
        hand says something different, follow the jug. And never mix chlorine
        products with each other or with acid in any container, ever. The
        reaction produces chlorine gas, and pool chemical incidents send
        thousands of people to US emergency rooms every year, most of them
        from exactly this shortcut.
      </Callout>

      <h2>The rest of the pool project</h2>
      <p>
        Chlorine math is usually one line item in a bigger backyard plan. If
        the pool surround is on the list, the{" "}
        <a href="/paver-calculator">paver calculator</a> covers deck pavers
        and their base depth, and the{" "}
        <a href="/concrete-calculator">concrete calculator</a> handles a
        poured deck or equipment pad in cubic yards. Landscaping the
        perimeter runs through the{" "}
        <a href="/mulch-calculator">mulch calculator</a>. And if you are
        capturing roof runoff to top the pool off, the{" "}
        <a href="/rainwater-calculator">rainwater calculator</a> will tell
        you what an inch of rain on your roof is actually worth in gallons.
      </p>
      <p>
        Run your numbers in the calculator above, write the result on the
        test kit lid, and stop guessing. A season of exact doses costs less,
        smells like nothing, and never once turns green.
      </p>
    </>
  );
}
