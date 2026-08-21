import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SnowWeightSVG() {
  const types = [
    { name: "Fresh powder", psf: 0.4, note: "5 lb/ft³, right after it falls" },
    { name: "Settled snow", psf: 1.25, note: "15 lb/ft³, a few days old" },
    { name: "Wet or melting", psf: 2.1, note: "25 lb/ft³, after a thaw or rain" },
    { name: "Ice layer", psf: 4.7, note: "57 lb/ft³, the dangerous one" },
  ];
  const maxP = 4.7;
  return (
    <svg viewBox="0 0 680 262" width="100%" height="auto" role="img" aria-label="Snow weight per inch of depth per square foot: fresh powder 0.4 pounds, settled snow 1.25, wet snow 2.1, ice 4.7 pounds per inch per square foot.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What one inch of snow weighs, per square foot</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Depth tells you almost nothing on its own. Density is the whole story.</text>
      {types.map((t, i) => {
        const y = 74 + i * 42;
        const w = (t.psf / maxP) * 280;
        return (
          <g key={t.name}>
            <text x="146" y={y + 13} textAnchor="end" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>{t.name}</text>
            <rect x="158" y={y} width={w} height="18" rx="3" fill={i === 3 ? GUIDE_SVG.warm : GUIDE_SVG.slate} />
            <text x={158 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i === 3 ? GUIDE_SVG.warm : GUIDE_SVG.inkMuted}>{t.psf} psf/in</text>
            <text x="158" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
          </g>
        );
      })}
      <text x="20" y="256" fontSize="9" fill={GUIDE_SVG.inkFaint}>Two feet of powder is about 10 psf. Two inches of ice is about the same. The roof cannot tell the difference.</text>
    </svg>
  );
}

function ConversionSVG() {
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Snow load conversion: ground snow load times 0.7 and adjustment factors gives flat roof snow load, then the slope factor gives sloped roof snow load.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Ground snow load is not roof snow load</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>ASCE 7 converts one to the other in two steps, and both usually reduce the number</text>

      <rect x="40" y="80" width="150" height="58" rx="4" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="115" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>Ground snow</text>
      <text x="115" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>pg, from your county</text>

      <text x="205" y="115" fontSize="18" fill={GUIDE_SVG.inkFaint}>&#8594;</text>
      <text x="238" y="98" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>x 0.7</text>
      <text x="238" y="112" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>x exposure</text>
      <text x="238" y="126" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>x thermal</text>

      <rect x="320" y="80" width="150" height="58" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="395" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>Flat roof snow</text>
      <text x="395" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.accent}>pf</text>

      <text x="485" y="115" fontSize="18" fill={GUIDE_SVG.inkFaint}>&#8594;</text>
      <text x="516" y="106" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>x slope</text>
      <text x="516" y="120" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>factor Cs</text>

      <rect x="576" y="80" width="86" height="58" rx="4" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="619" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>Sloped</text>
      <text x="619" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>ps</text>

      <text x="40" y="176" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Worked: a 40 psf county, heated house, ordinary exposure</text>
      <text x="40" y="196" fontSize="11" fill={GUIDE_SVG.inkMuted}>40 x 0.7 x 1.0 x 1.0 = 28 psf flat roof load</text>
      <text x="40" y="214" fontSize="11" fill={GUIDE_SVG.inkMuted}>A steep slippery metal roof sheds more and reduces further; asphalt shingles at 6:12 do not.</text>
      <text x="20" y="234" fontSize="9" fill={GUIDE_SVG.inkFaint}>A minimum load applies regardless, so the calculation never returns an unrealistically small number.</text>
    </svg>
  );
}

function RegionSVG() {
  const places = [
    { name: "Dallas, TX", pg: 5 },
    { name: "Denver, CO", pg: 25 },
    { name: "Chicago, IL", pg: 25 },
    { name: "Boston, MA", pg: 40 },
    { name: "Syracuse, NY", pg: 50 },
    { name: "Marquette, MI", pg: 80 },
  ];
  const maxP = 80;
  return (
    <svg viewBox="0 0 680 268" width="100%" height="auto" role="img" aria-label="Typical ground snow loads: Dallas 5 psf, Denver 25, Chicago 25, Boston 40, Syracuse 50, Marquette Michigan 80 pounds per square foot.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Typical ground snow loads, pg</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Representative values only. The legal number comes from your building department, not a map on the internet.</text>
      {places.map((p, i) => {
        const y = 70 + i * 30;
        const w = (p.pg / maxP) * 320;
        return (
          <g key={p.name}>
            <text x="140" y={y + 12} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{p.name}</text>
            <rect x="152" y={y} width={w} height="16" rx="3" fill={p.pg >= 50 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={152 + w + 10} y={y + 12} fontSize="10.5" fontWeight="700" fill={p.pg >= 50 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{p.pg} psf</text>
          </g>
        );
      })}
      <text x="20" y="264" fontSize="9" fill={GUIDE_SVG.inkFaint}>Mountain counties are often case-study areas with no published value at all, where a local engineer sets the number.</text>
    </svg>
  );
}

export function SnowLoadCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="ASCE 7-22 Chapter 7 snow loads, IRC 2021 Table R301.2(1), FEMA snow load safety guidance"
      />

      <h2>Depth is the wrong question. Weight is the question.</h2>
      <p>
        Two feet of fresh powder weighs about 10 pounds per square foot.
        Two inches of ice weighs roughly the same. A roof does not know or
        care how deep the snow looks; it responds to the weight, and
        weight depends almost entirely on density. That is why the
        neighbor with less snow can be in more trouble than you are, and
        why the dangerous moment in a winter is usually not the blizzard
        but the rain that lands on top of it three days later.
      </p>
      <p>
        The calculator above converts what is actually on your roof right
        now into pounds per square foot and compares it against your
        design load. This page covers both halves of the subject: how much
        snow weighs by type, and how to find the design snow load your
        roof was built to, which is a different number from the ground
        snow load your county publishes.
      </p>

      <Figure
        number={1}
        caption="Weight per inch of depth, by snow type. The jump from powder to ice is more than tenfold, which is why a mid-winter thaw and refreeze can quietly double the load without adding an inch of depth."
      >
        <SnowWeightSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Snow density figures follow FEMA snow load safety guidance and
          standard engineering values: roughly 5 lb/ft³ for fresh
          low-density snow, 15 for settled snow, 25 for wet snow, and 40 to
          57 for ice. Design load conversion follows ASCE 7-22 Chapter 7,
          where flat roof snow load pf equals 0.7 times exposure, thermal,
          and importance factors times ground snow load pg. Ground snow
          loads are set by the authority having jurisdiction, referencing
          IRC Table R301.2(1). This page is a planning and awareness tool,
          not a structural analysis.
        </p>
      </MethodologyNote>

      <h2>Snow weight by depth: the table to keep</h2>

      <ComparisonTable
        caption="Load in pounds per square foot for a given depth and snow type. Find your depth, read across to your snow type, and compare against the design load in the section below."
        columns={[
          { title: "Fresh powder" },
          { title: "Settled snow", highlight: true },
          { title: "Wet snow" },
          { title: "Ice" },
        ]}
        rows={[
          { label: "6 inches", values: ["2 psf", "8 psf", "13 psf", "28 psf"] },
          { label: "12 inches", values: ["5 psf", "15 psf", "25 psf", "57 psf"] },
          { label: "18 inches", values: ["7 psf", "23 psf", "38 psf", "85 psf"] },
          { label: "24 inches", values: ["10 psf", "30 psf", "50 psf", "114 psf"] },
          { label: "36 inches", values: ["15 psf", "45 psf", "75 psf", "171 psf"] },
        ]}
      />

      <p>
        Read that table next to a typical residential design load of 20 to
        40 psf and the picture gets clear fast. Three feet of powder is a
        non-event on almost any roof in snow country. One foot of wet snow
        is already at the design limit for a mild-climate roof. And any
        significant thickness of ice is a serious problem anywhere, which
        is the practical reason ice dams matter structurally and not just
        as a leak source.
      </p>

      <Figure
        number={2}
        caption="The two-step conversion. Most people find their county's ground snow load, assume that is what the roof carries, and overestimate the load by about 30 percent."
      >
        <ConversionSVG />
      </Figure>

      <h2>Ground snow load vs roof snow load</h2>
      <p>
        These are different numbers and confusing them is the most common
        error in this subject. Ground snow load, written pg, is a
        statistical value for your location: roughly the snow load with a 2
        percent annual probability of being exceeded, measured on open
        ground. Roof snow load is what the structure is designed to carry,
        and ASCE 7 derives it from pg rather than using it directly.
      </p>
      <p>
        The first step multiplies by 0.7, because wind and melting mean a
        roof rarely holds as much as open ground. Then exposure and
        thermal factors adjust it: a windswept roof holds less, a sheltered
        one in trees holds more, and an unheated structure like a detached
        garage holds more than a heated house because nothing melts from
        below. The second step applies a slope factor, which reduces the
        load on steep slippery roofs that shed and does essentially nothing
        for asphalt shingles at ordinary residential pitches. For a typical
        heated house in a 40 psf county, the flat roof design load works
        out near 28 psf.
      </p>

      <ComparisonTable
        caption="The adjustment factors in plain terms. An unheated detached garage in an open field and a heated house in dense trees can end up with very different design loads from the same county number."
        columns={[
          { title: "What raises the load" },
          { title: "What lowers it", highlight: true },
        ]}
        rows={[
          { label: "Exposure", values: ["Sheltered by trees or taller buildings", "Windswept and fully exposed"] },
          { label: "Heating", values: ["Unheated garage, barn, or carport", "Heated living space below"] },
          { label: "Roof slope", values: ["Low slope, or any rough surface", "Steep and slippery, such as standing seam metal"] },
          { label: "Geometry", values: ["Valleys, dormers, and roof steps that collect drift", "Simple gable with no obstructions"] },
          { label: "Occupancy", values: ["Essential buildings, higher importance factor", "Ordinary houses and accessory structures"] },
        ]}
      />

      <h2>Finding your ground snow load</h2>
      <p>
        There is no single national map you can trust for a legal answer,
        and this is the part people find frustrating. The IRC publishes
        Table R301.2(1) as a blank form precisely because each
        jurisdiction fills in its own values. ASCE 7-22 replaced the old
        printed contour map with a location-based database, and the ASCE
        Hazard Tool returns a value for a specific latitude and longitude.
        Many states and counties publish their own adopted table, and
        where they do, that number governs over anything else.
      </p>
      <p>
        Mountain regions add a further wrinkle. Large parts of the western
        US are designated case study areas, meaning snow load varies so
        sharply with elevation that no single published value applies and
        a local engineer has to establish the number. If you are building
        at altitude, expect to be told exactly that, and expect the answer
        to be considerably higher than the nearest town in the valley. The
        practical sequence is always the same: call the building
        department, ask for the adopted ground snow load, and use their
        number.
      </p>

      <Figure
        number={3}
        caption="Representative values to calibrate expectations, not to design from. Note that Denver and Chicago land in the same place despite very different winters, because ground snow load is about accumulation, not snowfall totals."
      >
        <RegionSVG />
      </Figure>

      <h2>Carports, canopies, and temporary garages</h2>
      <p>
        Portable car shelters and fabric canopies are the structures most
        likely to fail under snow, and they usually carry a manufacturer
        rating rather than a code-derived design load. Many are rated
        somewhere between 10 and 20 psf, which the table above tells you is
        about eight inches of settled snow or four inches of wet snow.
        These are not roofs in the structural sense; they are meant to be
        cleared after every meaningful snowfall, and the instructions
        generally say so.
      </p>
      <p>
        The same caution applies to attached patio covers, aluminum awnings,
        and older sunroom roofs. They are frequently the first thing to go
        in a heavy winter because they were designed to a lower standard
        than the house, they often have a low slope that sheds nothing, and
        they sit exactly where snow sliding off the main roof lands. If
        your house has one, it deserves clearing long before the main roof
        does.
      </p>

      <Scenario location="Syracuse, NY">
        <p>
          A 1970s ranch with a 6:12 asphalt shingle roof, 1,800 square feet
          of footprint. The county publishes a 50 psf ground snow load, so
          the flat roof design load is roughly 50 x 0.7 = 35 psf, and the
          6:12 asphalt slope contributes essentially no reduction.
        </p>
        <p>
          In late January the roof carries 20 inches of settled snow: 20 x
          1.25 = 25 psf, comfortably inside the 35 psf design load. Then a
          warm front brings an inch of rain, which the snowpack absorbs.
          The same depth now behaves as wet snow at roughly 2.1 psf per
          inch, or 42 psf, past the design load. Nothing on the roof looked
          different from the driveway. This sequence, snow followed by
          rain, is the mechanism behind most residential roof collapses in
          the Northeast, and it is why the calculator asks about snow type
          rather than just depth.
        </p>
      </Scenario>

      <h2>Warning signs and what to do about them</h2>
      <p>
        A structure under distress usually says so before it fails. Doors
        and windows on interior walls that suddenly stick, new cracks in
        drywall near the ceiling, visible sagging in a ridge line, and
        creaking or popping sounds from the framing are the recognized
        signs. Sprinkler heads dropping below ceiling tiles is the
        commercial version. Any of these in a heavy snow winter is a reason
        to leave the building and call someone, not a reason to go up on
        the roof.
      </p>
      <p>
        On clearing: a roof rake used from the ground is the safe method,
        and clearing the lower three or four feet of roof is usually enough
        to relieve both drift load and ice damming. Do not use a shovel or
        anything metal on a shingle roof, do not climb onto a snow-covered
        roof, and do not chip at ice. Falls and cardiac events during snow
        clearing injure far more people every winter than roof collapses
        do.
      </p>

      <Callout label="This is a screening tool, not a structural analysis">
        The calculator estimates the load currently on a roof and compares
        it to a design load you supply. It cannot assess the actual
        capacity of your structure, which depends on framing, span,
        condition, past modifications, and drift geometry. If a roof is
        near or past its design load, or showing any of the distress signs
        above, that is a licensed structural engineer question. Snow load
        problems are also one of the few building issues where waiting a
        day genuinely matters.
      </Callout>

      <h2>The rest of the winter roof</h2>
      <p>
        Snow load sits next to several other roof questions. Framing
        capacity starts with the{" "}
        <a href="/guides/joist-span-reference">joist span reference</a>,
        the{" "}
        <a href="/roofing-calculator">roofing calculator</a> handles
        squares and material for a reroof, and ice damming is largely an
        attic problem the{" "}
        <a href="/insulation-calculator">insulation calculator</a> and{" "}
        <a href="/attic-ventilation-calculator">attic ventilation
        calculator</a> address together. Meltwater volume is a{" "}
        <a href="/gutter-calculator">gutter calculator</a> question.
      </p>
      <p>
        Measure the depth, identify the snow type honestly, and run the
        numbers. Knowing you are at 25 psf against a 35 psf design is worth
        more than any amount of looking at the roof and guessing.
      </p>
    </>
  );
}
