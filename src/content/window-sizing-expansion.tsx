import { Figure, GuideByline, Scenario } from "@/components/GuideChrome";
import { GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

/**
 * Window anatomy + egress diagram. The linkable hero asset: shows the clear
 * opening, its width/height minimums, sill height, and the rough opening.
 * Serves the "egress window size" search cluster visually.
 */
function WindowSVG() {
  return (
    <svg
      viewBox="0 0 680 440"
      width="100%"
      height="auto"
      role="img"
      aria-label="Window diagram showing the frame, sash, glass, clear egress opening of at least 5.7 square feet, minimum 20 inch width and 24 inch height, sill height maximum 44 inches from the floor, and the rough opening around the unit."
    >
      <text x="20" y="26" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>
        Window anatomy and egress opening
      </text>

      <rect x="60" y="60" width="380" height="340" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      {/* rough opening */}
      <rect x="120" y="110" width="260" height="230" fill="none" stroke={GUIDE_SVG.warm} strokeWidth="1.5" strokeDasharray="6 4" />
      {/* frame */}
      <rect x="130" y="120" width="240" height="210" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.accent} strokeWidth="3" />
      {/* sashes */}
      <rect x="142" y="132" width="216" height="95" fill="#C7E5D3" opacity="0.5" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <rect x="142" y="230" width="216" height="88" fill={GUIDE_SVG.cool} opacity="0.30" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="142" y1="228" x2="358" y2="228" stroke={GUIDE_SVG.accent} strokeWidth="2.5" />
      <line x1="165" y1="140" x2="150" y2="180" stroke="#fff" strokeWidth="2" opacity="0.6" />
      <line x1="185" y1="140" x2="170" y2="180" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
      {/* clear opening */}
      <rect x="146" y="234" width="208" height="80" fill={GUIDE_SVG.accent} opacity="0.12" />
      <text x="250" y="270" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.accent} fontWeight="700">clear opening</text>
      <text x="250" y="286" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.accent}>min 5.7 ft²</text>
      {/* floor */}
      <line x1="60" y1="400" x2="440" y2="400" stroke={GUIDE_SVG.ink} strokeWidth="2" />
      <text x="70" y="416" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.inkMuted}>finished floor</text>
      {/* sill height */}
      <line x1="100" y1="400" x2="100" y2="318" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="96" y1="400" x2="104" y2="400" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="96" y1="318" x2="104" y2="318" stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <text x="90" y="360" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.cool} transform="rotate(-90 90 360)">
        sill height (max 44&quot;)
      </text>
      {/* width */}
      <line x1="146" y1="100" x2="354" y2="100" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      <line x1="146" y1="96" x2="146" y2="104" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      <line x1="354" y1="96" x2="354" y2="104" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      <text x="250" y="94" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm}>clear width (min 20&quot;)</text>
      {/* height */}
      <line x1="372" y1="234" x2="372" y2="314" stroke={GUIDE_SVG.warm} strokeWidth="1" />
      <text x="378" y="278" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm}>clear ht</text>
      <text x="378" y="290" fontSize="10" fontFamily="monospace" fill={GUIDE_SVG.warm}>(min 24&quot;)</text>

      {/* labels */}
      <g fontFamily="monospace" fontSize="10.5" fill={GUIDE_SVG.ink}>
        <line x1="380" y1="115" x2="500" y2="105" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="108">rough opening</text>
        <text x="504" y="121" fill={GUIDE_SVG.inkFaint}>(unit + 1/2&quot; each side)</text>
        <line x1="360" y1="130" x2="500" y2="150" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="153">frame</text>
        <line x1="300" y1="180" x2="500" y2="185" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="188">upper sash (glass)</text>
        <line x1="300" y1="228" x2="500" y2="225" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="228">meeting rail</text>
        <line x1="300" y1="300" x2="500" y2="300" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="504" y="303">lower sash (opens)</text>
      </g>
    </svg>
  );
}

export function WindowSizingCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 20, 2026"
        reviewedAgainst="IRC 2021 R310 (emergency escape), R303 (light and ventilation), and AAMA/WDMA/CSA 101 installation standards"
      />

      <h2>A window is one of the few things in your house the code can force you to make bigger</h2>
      <p>
        Pick any style you like. Paint the frame any color. But three code rules
        set the minimum size of a window before taste gets a vote, and two of them
        exist because a firefighter has to be able to get in and you have to be
        able to get out. Egress, natural light, and ventilation. Miss the egress
        rule on a bedroom window and the room legally stops being a bedroom. This
        is the rare place in a build where the inspector can tell you the window is
        too small and mean it.
      </p>
      <p>
        The calculator up top checks all three against your room. Give it the floor
        area and it tells you the minimum glass for light, the minimum operable
        opening for ventilation, and whether a given window clears the egress
        escape minimum. This page explains those rules, then covers the other
        window job people actually search for more than any of them: how to measure
        an existing window so the replacement fits.
      </p>

      <Figure
        number={1}
        caption="The parts that matter for code. The clear opening is the actual hole a body can pass through when the window is open, which is smaller than the glass and smaller than the frame. Egress is measured on that clear opening, never on the window's nominal size."
      >
        <WindowSVG />
      </Figure>

      <h2>Egress: the rule that turns a room into a bedroom</h2>
      <p>
        An egress window is an emergency exit. Every sleeping room and every
        habitable basement space needs at least one, and the numbers are specific
        because a person in full firefighting gear has to fit through it in the
        dark. The clear opening, the actual gap when the window is open all the
        way, has to be at least 5.7 square feet on a ground or upper floor, or 5.0
        square feet at grade level. On top of that area, the opening has to be at
        least 20 inches wide and at least 24 inches tall, and the sill can sit no
        higher than 44 inches above the floor so you can actually climb out.
      </p>
      <p>
        Here is the trap that catches people. Those three numbers work against each
        other. A window that is exactly 20 inches wide would need to be more than 41
        inches tall to hit 5.7 square feet, and a window exactly 24 inches tall
        would need to be over 34 inches wide. Meeting the width minimum and the
        height minimum does not mean you meet the area minimum. All three have to be
        true at once, on the clear opening, which is why a casement window (which
        swings fully open) often passes where a double-hung of the same size fails,
        since the double-hung only ever opens half its height.
      </p>

      <ComparisonTable
        columns={[{ title: "Egress requirement" }, { title: "The number" }, { title: "Measured on" }]}
        rows={[
          { label: "Min clear opening area, upper floors", values: ["5.7 ft²", "5.7 ft²", "The open gap, not the glass"] },
          { label: "Min clear opening area, at grade", values: ["5.0 ft²", "5.0 ft²", "The open gap"] },
          { label: "Min clear width", values: ["20 in", "20 in", "The open gap"] },
          { label: "Min clear height", values: ["24 in", "24 in", "The open gap"] },
          { label: "Max sill height above floor", values: ["44 in", "44 in", "Floor to bottom of opening"] },
        ]}
        caption="Every number is measured on the clear opening with the window fully open. A window's catalog size is always larger than its clear opening, so never size egress off the nominal dimensions."
      />

      <h2>How to measure a window for replacement</h2>
      <p>
        This is the job most people are actually here for, and it is easy to get
        wrong in a way you do not discover until the new window shows up too big or
        too small. The golden rule: measure the opening, not the old window, and
        measure it in three places for each dimension, then use the smallest number.
        Frames go out of square as houses settle, and ordering to the widest point
        means the window will not fit the narrow point.
      </p>
      <p>
        For width, measure the inside of the window frame from left jamb to right
        jamb at the top, the middle, and the bottom. Write down all three and take
        the smallest. For height, measure from the sill to the top of the opening on
        the left side, the middle, and the right side, and again take the smallest.
        Then check that the opening is square by measuring the two diagonals corner
        to corner. If those diagonals differ by more than a quarter inch, the
        opening is out of square and you will need to shim the new window to make it
        plumb.
      </p>

      <Scenario location="Measuring a double-hung for replacement">
        Width came in at 32.25 inches at the top, 32.125 in the middle, and 32.0 at
        the bottom. Order to 32.0, the smallest. Height read 47.75, 47.875, and
        47.75. Order to 47.75. Diagonals: 57.1 inches one way, 57.4 the other, a
        difference of 0.3 inch, so the opening is slightly out of square and the
        installer will shim it. The replacement window is ordered a further 1/4 inch
        under the smallest opening dimension, giving a 31.75 by 47.5 unit, because a
        replacement has to slide into the existing frame with clearance to spare. New
        construction windows are ordered differently, sized to the rough opening
        rather than the existing frame.
      </Scenario>

      <Callout label="Replacement or new construction?">
        These are two different products and buying the wrong one guarantees a bad
        fit. A replacement (or insert) window slides into your existing frame and is
        sized about 1/4 inch under the opening. A new construction window has a
        nailing flange that fastens to the framing and is sized to the rough opening.
        If the existing frame is sound and you are keeping it, order replacement. If
        you are framing a brand new opening or the old frame is rotted out, order new
        construction. The words are not interchangeable at the counter.
      </Callout>

      <h2>Standard window sizes</h2>
      <p>
        Windows come in standard sizes, and staying on the grid saves real money.
        Custom sizes cost more and take longer, so unless a custom opening is
        already framed, most people pick the nearest standard. Sizes are written
        width by height, and the trade uses a shorthand where a 3040 window is 3
        feet 0 inches wide by 4 feet 0 inches tall. Here are the common ones.
      </p>

      <ComparisonTable
        columns={[
          { title: "Type", highlight: true },
          { title: "Common widths" },
          { title: "Common heights" },
        ]}
        rows={[
          { label: "Double-hung", values: ["24 to 48 in", "36 to 72 in"] },
          { label: "Casement", values: ["18 to 36 in", "24 to 72 in"] },
          { label: "Sliding", values: ["36 to 84 in", "24 to 60 in"] },
          { label: "Picture (fixed)", values: ["24 to 96 in", "12 to 96 in"] },
        ]}
        caption="Standard double-hung sizes step in 2-inch increments. When a room needs a specific glass area for light, it is usually cheaper to use two standard windows than one custom unit."
      />

      <h2>Natural light and ventilation</h2>
      <p>
        Beyond egress, the code wants habitable rooms to have daylight and fresh
        air, and it states both as a percentage of the floor. The glass area has to
        equal at least 8 percent of the room's floor area, and the operable opening,
        the part that actually opens, has to equal at least 4 percent. A 150 square
        foot bedroom needs at least 12 square feet of glass and at least 6 square
        feet that opens.
      </p>
      <p>
        One catch worth knowing: the 8 percent is glass area, not window size. The
        frame and sash eat 15 to 25 percent of a window's overall dimensions, so a
        window has to be noticeably bigger than 12 square feet to deliver 12 square
        feet of actual glass. The calculator works in glass area to keep you honest.
        If mechanical ventilation is present, some jurisdictions relax the operable
        opening requirement, but the light requirement almost always stands.
      </p>

      <h2>Rough opening and the header above it</h2>
      <p>
        The rough opening is the framed hole the window drops into, and it is always
        larger than the window unit so there is room to shim it plumb and level. The
        standard is the window unit width plus half an inch on each side, and the
        unit height plus half an inch at the top. A 36 by 48 inch window wants a 37
        by 48.5 inch rough opening. Manufacturers publish exact rough opening
        dimensions, so check the spec sheet, because a few brands want more or less
        than the half-inch rule.
      </p>
      <p>
        Framing a new opening means a header over it to carry the load the missing
        studs used to. A 36-inch opening takes a doubled 2x6 header in a non-bearing
        wall, and a doubled 2x8 to 2x10 in a bearing wall depending on what sits
        above. The <a href="/stud-spacing-calculator">stud spacing calculator</a>{" "}
        counts the king studs and jack studs each opening needs, and if you are
        residing around the new window, the{" "}
        <a href="/siding-calculator">siding calculator</a> handles the squares of
        siding and the trim.
      </p>

      <h2>Egress window wells for basements</h2>
      <p>
        A basement bedroom needs an egress window like any other, and below grade
        that means a window well outside it. The well has to give a person room to
        climb out: at least 9 square feet of floor area and at least 36 inches of
        horizontal projection out from the foundation. Go deeper than 44 inches and
        the well needs a permanently attached ladder or steps, because at that depth
        a person cannot climb out unaided in an emergency.
      </p>
      <p>
        Well covers are sized to the well, not the window, and they have to be
        releasable from inside without tools or special knowledge, which rules out
        anything bolted shut. Standard covers come in a handful of sizes such as 44
        by 38, 49 by 37, and 56 by 38 inches, so measure the well opening at its
        widest before ordering. A cover that is too small leaves a gap, and one that
        is too large will not seat.
      </p>

      <h2>Where window jobs go wrong</h2>
      <p>
        The failures are almost all measuring and ordering mistakes. Sizing egress
        off the window's catalog dimensions instead of the clear opening tops the
        list, and it fails inspection because the actual gap is always smaller than
        the nominal size. Measuring the old window instead of the opening is next,
        and it produces a replacement that binds or rattles. Ordering to the widest
        of three measurements rather than the smallest guarantees the window will not
        fit the tight spot.
      </p>
      <p>
        Then the mix-ups. Buying a new construction window with a flange for an
        opening that needed a frame-in replacement, or the reverse. Forgetting that
        the frame steals a fifth of the glass area and coming up short on the light
        requirement. And skipping the diagonal check, then fighting an out-of-square
        opening with a window that was never going to sit plumb. None of these are
        hard to avoid. Measure the opening in three places, take the smallest, check
        the diagonals, and size egress on the clear opening, and the window that
        shows up will be the window that fits.
      </p>
    </>
  );
}
