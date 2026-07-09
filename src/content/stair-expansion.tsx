import { Figure, GuideByline, Scenario } from "@/components/GuideChrome";
import { GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

/**
 * Stair cross-section. The linkable hero asset and a ranked keyword in its own
 * right ("stair calculator with diagram"). Labels every part of a staircase.
 */
function StairSectionSVG() {
  return (
    <svg
      viewBox="0 0 680 440"
      width="100%"
      height="auto"
      role="img"
      aria-label="Cross-section of a staircase showing total rise, total run, individual rise and run, tread, riser, nosing, stringer, and throat depth, built to IRC dimensions."
    >
      <text x="20" y="26" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>
        The parts of a staircase (7-inch rise, 11-inch run)
      </text>

      {/* stringer */}
      <polygon points="120,380 470,150 470,175 150,405 120,405" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="2" opacity="0.85" />
      {/* step profile */}
      <polyline
        points="120,380 120,334 190,334 190,288 260,288 260,242 330,242 330,196 400,196 400,150 470,150"
        fill="none"
        stroke={GUIDE_SVG.accent}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* tread top faces */}
      {[[120, 330], [190, 284], [260, 238], [330, 192], [400, 146]].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="70" height="4" fill={GUIDE_SVG.warm} opacity="0.5" />
      ))}

      {/* total rise dimension */}
      <line x1="90" y1="380" x2="90" y2="150" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="86" y1="380" x2="94" y2="380" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="86" y1="150" x2="94" y2="150" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <text x="80" y="270" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.cool} transform="rotate(-90 80 270)">
        total rise
      </text>

      {/* total run dimension */}
      <line x1="120" y1="418" x2="470" y2="418" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="120" y1="414" x2="120" y2="422" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="470" y1="414" x2="470" y2="422" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <text x="295" y="431" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.cool}>
        total run
      </text>

      {/* single rise + run */}
      <line x1="278" y1="288" x2="278" y2="242" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      <text x="284" y="268" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm}>rise (7&quot;)</text>
      <line x1="330" y1="228" x2="400" y2="228" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      <text x="345" y="223" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm}>run (11&quot;)</text>

      {/* labels right */}
      <g fontFamily="monospace" fontSize="10.5" fill={GUIDE_SVG.ink}>
        <line x1="435" y1="150" x2="560" y2="130" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="564" y="133">tread (step surface)</text>
        <line x1="400" y1="173" x2="560" y2="165" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="564" y="168">riser (vertical face)</text>
        <line x1="400" y1="196" x2="560" y2="200" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="564" y="203">nosing (the lip)</text>
        <line x1="300" y1="330" x2="560" y2="330" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="564" y="333">stringer</text>
        <line x1="260" y1="370" x2="560" y2="370" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="564" y="373">throat (min 3.5&quot;)</text>
      </g>
    </svg>
  );
}

export function StairCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 20, 2026"
        reviewedAgainst="IRC 2021 Section R311.7 (stairways), AWC Wood Frame Construction Manual, AWC span tables for 2x12 stringers"
      />

      <h2>Stairs are the one thing on your project the inspector will measure</h2>
      <p>
        Most of a build has some give in it. A wall an inch off, a joist a little
        long, nobody notices. Stairs are different. The building code sets the
        rise and the run to fractions of an inch, an inspector shows up with a
        tape measure, and a staircase that misses the numbers does not get signed
        off. It gets torn out. So this is the one place where getting the math
        right before you cut is not about tidiness. It is about not building the
        thing twice.
      </p>
      <p>
        The good news is the math is not hard, and the calculator above does it
        for you. Give it your total rise, the vertical distance from one finished
        floor to the next, and it hands back the number of steps, the exact rise
        and run of each one, the stringer length, and how many stringers you need.
        The rest of this page explains what those numbers mean and where people go
        wrong, starting with what every part of a staircase is actually called.
      </p>

      <h2>The parts of a staircase</h2>
      <p>
        Before the numbers make sense, the vocabulary has to. A staircase is a
        handful of parts with specific names, and every stair calculator, code
        book, and lumber list uses them. Here is the whole thing in one drawing.
      </p>

      <Figure
        number={1}
        caption="Every part the calculator sizes. Total rise and total run are the overall dimensions; rise and run are the single-step versions. The stringer is the sawtooth board carrying it all, and the throat is the wood left after the notches are cut."
      >
        <StairSectionSVG />
      </Figure>

      <p>
        The <strong>tread</strong> is the part you step on. The{" "}
        <strong>riser</strong> is the vertical face between one tread and the next,
        the height you lift your foot. The <strong>nosing</strong> is the small lip
        where the tread overhangs the riser below it, which gives your foot a
        little extra depth without adding to the run. The <strong>stringer</strong>{" "}
        is the sawtooth-cut board, usually a 2x12, that carries the whole staircase
        on a diagonal. And the <strong>throat</strong> is the narrowest strip of
        wood left in the stringer after the step notches are cut out. That last one
        matters more than people expect, because if you cut the notches too deep the
        stringer loses its strength.
      </p>
      <p>
        Two more terms run through every calculation. <strong>Total rise</strong> is
        the full vertical height the stairs climb, floor to floor. <strong>Total
        run</strong> is the full horizontal distance they cover. Divide those by the
        number of steps and you get the single-step <strong>rise</strong> and{" "}
        <strong>run</strong>, the two numbers the code cares about most.
      </p>

      <h2>Rise and run: the numbers the code sets</h2>
      <p>
        Start with total rise. Measure floor to floor, in inches, and be exact,
        because everything downstream depends on it. Divide that by a target riser
        height, and the sweet spot is 7 to 7.5 inches per step. Round up to a whole
        number of steps, then divide the total rise back by that step count to get
        the actual rise per step. A 48-inch total rise divided by 7.5 is 6.4, which
        rounds up to 7 steps, giving an actual rise of about 6.86 inches each.
      </p>
      <p>
        Every riser has to be the same height. Not close. The same. The code allows
        a maximum variation of three eighths of an inch between the tallest and
        shortest riser in a flight, and that is the rule most do-it-yourselfers
        fail. If your first step is 7.5 inches and your last is 7 inches because the
        floor was not level, that half inch fails inspection and it is also a real
        trip hazard, because a foot expecting one height and finding another is how
        people fall. The calculator keeps every riser identical, which is the whole
        point of doing the math instead of eyeballing it.
      </p>

      <Callout label="The 7-11 rule">
        Professional stair builders aim for a 7-inch rise and an 11-inch run. It
        meets code with room to spare, it feels natural underfoot, and it produces a
        staircase angle right around 32 degrees. Push the rise toward the 7.75-inch
        code maximum and the stairs start to feel steep and cramped. Drop the rise
        below about 6.5 inches and they feel like a ramp and eat up floor space you
        probably do not have.
      </Callout>

      <h2>What angle should stairs be</h2>
      <p>
        Angle is just rise and run wearing a different hat. A staircase built to the
        7-11 rule sits at about 32 degrees from horizontal, which is the comfortable
        middle most interior stairs land on. The code does not state an angle
        directly, it states the rise and run limits, but those limits box you into a
        range of roughly 30 to 37 degrees for a normal staircase. Go steeper than
        that and you are into ship ladders and attic pull-downs, which have their own
        separate rules. Go shallower and you are building a ramp.
      </p>
      <p>
        The practical takeaway: you do not pick an angle, you pick a comfortable rise
        and run, and the angle falls out of them. If someone asks you the angle of a
        staircase, the honest answer is that a good one is about 32 to 35 degrees,
        and anything a person would call comfortable to climb lives in that band.
      </p>

      <h2>How many stair stringers do I need, and how long</h2>
      <p>
        The stringer is the backbone. Its length comes straight out of the
        Pythagorean theorem, because the stringer is the hypotenuse of a triangle
        whose legs are your total rise and total run. Square each, add them, take the
        square root. A staircase climbing 108 inches over 130 inches of run needs a
        stringer at least the square root of 108 squared plus 130 squared, which is
        about 169 inches, or 14 feet and an inch. Buy 16-foot 2x12 boards for a run
        like that. Anything shorter will not reach, and anything narrower than a 2x12
        does not survive the notching.
      </p>

      <Scenario location="Minneapolis, MN">
        A homeowner building deck stairs measured a total rise of 42 inches and
        ordered three 8-foot 2x12 stringers. The calculator called for 6 steps at 7
        inches each, a total run of 60 inches, and a stringer length of 73 inches. An
        8-foot board is 96 inches, so length was fine. The catch was the throat. With
        a 7-inch rise and a 10-inch run, the notch cuts left exactly 3.5 inches of
        wood at the narrowest point, which is the code minimum. He was right at the
        line. Had he built to a 7.5-inch rise, the throat would have dropped below
        3.5 inches and failed. The lesson: the stringer that looks fine on paper can
        still fail on the saw, so check the throat before you cut all three.
      </Scenario>

      <p>
        How many stringers is a separate question, and it comes down to width and
        tread material. A 36-inch-wide staircase, the code minimum, takes 3
        stringers: one under each edge and one down the middle. Every extra 16 to 18
        inches of width adds a stringer, so a 48-inch stair takes 4. If your treads
        are composite or thin decking rather than solid 2x lumber, tighten that
        spacing to every 12 to 16 inches, because those materials flex more and a
        tread that bounces underfoot is a tread that needs more support beneath it.
      </p>

      <ComparisonTable
        columns={[
          { title: "36 in wide", subtitle: "code minimum", highlight: true },
          { title: "48 in wide" },
          { title: "60 in wide" },
        ]}
        rows={[
          { label: "Stringers", values: ["3", "4", "4 to 5"] },
          { label: "Spacing between", values: ["18 in", "16 in", "15 to 16 in"] },
          {
            label: "With composite treads",
            values: ["Add 1", "Add 1", "Add 1"],
          },
        ]}
        caption="Center stringers stop treads from bouncing. The quick test: if a tread flexes when you step in the middle of it, you needed another stringer under it."
      />

      <h2>The IRC numbers every staircase has to hit</h2>
      <p>
        These are not preferences. They are the limits an inspector checks, and a
        staircase outside them does not pass. Keep this table handy, because it is
        the whole rulebook for a standard residential stair.
      </p>

      <ComparisonTable
        columns={[{ title: "IRC requirement" }, { title: "What it means in practice" }]}
        rows={[
          {
            label: "Max riser height, 7.75 in",
            values: ["7.75 in", "No step can be taller than this. Most builders target 7 to 7.5."],
          },
          {
            label: "Min tread depth, 10 in",
            values: ["10 in", "Measured nose to nose. 10.5 to 11 is the comfortable standard."],
          },
          {
            label: "Min width, 36 in",
            values: ["36 in", "Clear width between the walls or railings."],
          },
          {
            label: "Max riser variation, 3/8 in",
            values: ["3/8 in", "Tallest riser minus shortest. The rule DIYers fail most."],
          },
          {
            label: "Min headroom, 80 in",
            values: ["80 in", "Measured straight up from the nosing to whatever is above."],
          },
          {
            label: "Min throat, 3.5 in",
            values: ["3.5 in", "Wood left in the stringer after notching. Below this it is not strong enough."],
          },
        ]}
        caption="The 3/8-inch variation rule and the 3.5-inch throat are the two that catch people. The calculator holds every riser identical and warns you when a rise and run combination cuts the throat too thin."
      />

      <h2>Treads, landings, and deck stairs</h2>
      <p>
        The tread count is always one less than the riser count, because the top
        tread is the floor you are stepping onto. A 14-riser staircase has 13 treads.
        For interior stairs the tread is usually a 1-inch hardwood board about 11.25
        inches deep, giving a 10-inch run plus a 1.25-inch nosing. For deck and
        exterior stairs, two 2x6 pressure-treated boards or a single composite stair
        tread do the same job.
      </p>
      <p>
        A landing becomes mandatory once a straight run climbs more than 12 feet of
        total rise, roughly 19 risers, and landings are also how L-shaped and
        U-shaped stairs turn a corner. A landing has to be at least 36 inches deep in
        the direction you walk and at least as wide as the stairs. When a landing
        splits a staircase, treat each flight as its own separate calculation with
        its own total rise, run, and stringer, and frame the landing as a platform in
        between.
      </p>
      <p>
        Deck stairs follow the same code as interior stairs with a couple of extras.
        Any deck more than 30 inches above grade needs stairs, the total rise is
        measured from the deck surface down to the ground, and the whole run projects
        5 to 6 feet out from the deck, which is often the thing that decides whether
        the stairs even fit the yard. If the stairs are part of a bigger deck build,
        the <a href="/deck-calculator">deck calculator</a> and the{" "}
        <a href="/planner/build-a-deck">deck planner</a> roll the stair numbers into
        the full material list, and the{" "}
        <a href="/lumber-calculator">lumber calculator</a> converts the stringer and
        tread stock into board feet for pricing.
      </p>

      <ComparisonTable
        columns={[
          { title: "Interior stairs", highlight: true },
          { title: "Deck / exterior stairs" },
        ]}
        rows={[
          {
            label: "Stringer",
            values: ["2x12 SPF or Douglas fir", "2x12 pressure-treated"],
          },
          {
            label: "Tread",
            values: ["Hardwood or LVP on plywood", "PT, composite, or cedar"],
          },
          {
            label: "Railing",
            values: ["Required at 4+ risers", "Required at 30 in+ above grade"],
          },
          {
            label: "Risers",
            values: ["Closed, for the finished look", "Open allowed by most codes"],
          },
        ]}
        caption="Everything on an exterior stair is pressure-treated or rated for weather. Interior stairs use plain dimensional lumber for the stringers and finished material for the treads."
      />

      <h2>Where stairs go wrong</h2>
      <p>
        The failures repeat, and every one of them is a math or planning miss rather
        than a skill problem. The unequal risers top the list, usually because the
        total rise got measured off a floor that was not level, and the fix after the
        fact means rebuilding the whole flight. Cutting the stringer notches too deep
        is next, leaving a throat under 3.5 inches and a stringer that flexes or
        cracks under load.
      </p>
      <p>
        After those come the planning misses. Forgetting that the run projects 5 or 6
        feet out and discovering the stairs do not fit the space. Building too few
        stringers and feeling the treads bounce. Skipping the landing on a tall
        straight run. And the quiet one, forgetting that the tread count is one less
        than the riser count, then coming up a board short. None of these are hard to
        avoid. They come down to getting the numbers right first, which is exactly
        what the calculator is for, and then checking the throat on the real board
        before you commit the cuts to all of them.
      </p>
    </>
  );
}
