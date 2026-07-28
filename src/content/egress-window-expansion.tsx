import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function EgressCodeSVG() {
  return (
    <svg viewBox="0 0 680 430" width="100%" height="auto" role="img" aria-label="Egress window minimums under IRC R310: 20 inch minimum clear width, 24 inch minimum clear height, 5.7 square feet net clear opening, 44 inch maximum sill height, with window well requirements of 9 square feet and 36 inch projection">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The four numbers that make a window an egress window (IRC R310)</text>

      <rect x="40" y="48" width="280" height="310" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <line x1="16" y1="358" x2="352" y2="358" stroke={GUIDE_SVG.ink} strokeWidth="2" />
      <text x="16" y="374" fontSize="11" fill={GUIDE_SVG.inkMuted}>floor</text>
      <rect x="100" y="90" width="160" height="150" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <text x="180" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>net clear</text>
      <text x="180" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>&#8805; 5.7 sq ft</text>
      <text x="180" y="190" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>(5.0 at grade floor)</text>

      <line x1="100" y1="76" x2="260" y2="76" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="100" y1="70" x2="100" y2="82" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="260" y1="70" x2="260" y2="82" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="180" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>min clear width 20&#8243;</text>

      <line x1="84" y1="90" x2="84" y2="240" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="78" y1="90" x2="90" y2="90" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="78" y1="240" x2="90" y2="240" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="72" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent} transform="rotate(-90 72 168)">min clear height 24&#8243;</text>

      <line x1="276" y1="240" x2="276" y2="358" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="270" y1="240" x2="282" y2="240" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="270" y1="358" x2="282" y2="358" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="292" y="296" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>max sill</text>
      <text x="292" y="312" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>44&#8243; to floor</text>

      <text x="390" y="68" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>R310 minimums</text>
      <line x1="390" y1="78" x2="664" y2="78" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="390" y="100" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Net clear opening</text><text x="664" y="100" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>5.7 sq ft</text>
      <text x="390" y="116" fontSize="11" fill={GUIDE_SVG.inkMuted}>grade-level floor</text><text x="664" y="116" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>5.0 sq ft</text>
      <text x="390" y="140" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Min clear width</text><text x="664" y="140" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>20 in</text>
      <text x="390" y="164" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Min clear height</text><text x="664" y="164" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>24 in</text>
      <text x="390" y="188" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Max sill above floor</text><text x="664" y="188" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>44 in</text>

      <text x="390" y="228" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Below grade: the well</text>
      <line x1="390" y1="238" x2="664" y2="238" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="390" y="260" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Well floor area</text><text x="664" y="260" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>9 sq ft</text>
      <text x="390" y="284" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Projection from wall</text><text x="664" y="284" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>36 in</text>
      <text x="390" y="308" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Ladder or steps</text><text x="664" y="308" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>if deeper than 44 in</text>
      <text x="390" y="332" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Cover, if fitted</text><text x="664" y="332" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>opens without tools</text>

      <line x1="16" y1="392" x2="664" y2="392" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="410" fontSize="11" fill={GUIDE_SVG.inkMuted}>Net clear opening is the hole you crawl through with the window fully open. Not the glass size, not the rough</text>
      <text x="16" y="426" fontSize="11" fill={GUIDE_SVG.inkMuted}>opening. A casement passes at sizes where a slider fails, because the whole frame opens clear.</text>
    </svg>
  );
}

export function EgressWindowExpansion() {
  return (
    <>
      <GuideByline updated="July 29, 2026" reviewedAgainst="IRC Section R310 (2021), InterNACHI egress inspection standards, and USFA escape planning guidance" />

      <h2>What makes a window an egress window</h2>

      <p>An egress window is any window big enough to escape through and be rescued through. The code puts four numbers on that: a net clear opening of at least 5.7 square feet (5.0 where the sill sits at or below grade), at least 20 inches of clear width, at least 24 inches of clear height, and a sill no more than 44 inches above the floor. That is IRC Section R310, and every sleeping room needs one, basements with habitable space included.</p>

      <p>The calculator above runs all four checks and tells you exactly which one fails and by how much. The rest of this page covers the part the calculator can&apos;t do for you: measuring the right opening in the first place, what it costs to create one where none exists, and the window well rules that ambush basement projects.</p>

      <Figure number={1} caption="IRC R310 drawn out. The dimensional minimums and the area minimum are independent checks: a 20 by 24 inch opening clears both minimums and still fails at 3.3 square feet.">
        <EgressCodeSVG />
      </Figure>

      <MethodologyNote>
        <p>All requirements follow IRC Section R310, Emergency Escape and Rescue Openings, 2021 edition. Net clear opening figures should come from the window manufacturer&apos;s egress spec sheet. Cost figures reflect typical 2026 contractor pricing for the work described. Local amendments can be stricter than the model code; the building department has the final word.</p>
      </MethodologyNote>

      <h2>Which rooms actually need one</h2>

      <p>Every sleeping room, full stop. Not just bedrooms on paper: any room used for sleeping needs its own escape opening, and a door to the hallway does not substitute, because the hallway is where the smoke is. Basements containing habitable space need one too, even without a bedroom down there, and every basement bedroom needs its own opening inside the room itself. One well in the laundry area does not cover a bedroom behind two doors.</p>

      <p>The enforcement mechanism is not a code officer knocking on your door. It is the appraisal. A basement room without compliant egress is not legally a bedroom no matter how nice the carpet is, so the "4 bedroom" house sells as a 3 bedroom, and the difference is usually tens of thousands of dollars. This is why the egress window is the first invoice in any serious basement finishing project, not the last: it is the one that makes the rest of the money real.</p>

      <p>Existing homes get some grace. A house built to an older code is generally not forced to upgrade windows that met the rules when built, until you renovate. Convert an office to a bedroom, finish a basement, or pull a permit that touches the room, and current R310 applies to it. The renovation is the trigger. Plan for it in the budget rather than discovering it at final inspection.</p>

      <h2>Net clear opening: the number everyone measures wrong</h2>

      <p>Three different sizes get confused on every egress project. The rough opening is the framed hole in the wall; you size it with the <a href="/window-sizing-calculator">window sizing calculator</a>. The unit size is the window including its frame. The net clear opening is smaller than both: it is the actual unobstructed hole you get when the window is open as far as it goes. That last one is the only number R310 cares about, and it is routinely 20 to 30 percent smaller than the glass makes it look.</p>

      <p>Operating style decides how much smaller. A casement swings its entire sash out of the way, so nearly the whole frame opening counts. A double-hung only ever opens its bottom half. A slider only opens one side. Same unit size, wildly different egress math, which is why casements dominate basement egress installs: they pass at overall sizes where a double-hung is not even close.</p>

      <ComparisonTable
        columns={[{title:"How it opens"},{title:"Smallest typical compliant unit",highlight:false}]}
        rows={[
          {label:"Casement",values:["Full sash swings clear","~2'8\" × 4'0\""]},
          {label:"Double-hung",values:["Bottom half only","~2'10\" × 5'8\""]},
          {label:"Horizontal slider",values:["One side only","~4'0\" × 4'0\""]},
          {label:"Awning",values:["Sash blocks the opening","Rarely qualifies"]},
        ]}
        caption="Approximate smallest overall unit sizes that reach 5.7 sq ft net clear. Every manufacturer publishes exact net clear figures per model; use those, not this table, to buy."
      />

      <p>One arithmetic trap worth spelling out. The 20 inch width and 24 inch height minimums do not multiply to a passing window: 20 &#215; 24 is 480 square inches, 3.3 square feet, a hard fail. Hold the width at the 20 inch minimum and you need about 41 inches of height. Hold the height at 24 and you need about 34 inches of width. The area requirement is the one doing the real work.</p>

      <h2>What an egress window costs</h2>

      <p>The cost question is really three different projects wearing one name. Swapping a window that already sits in a big enough opening is a few hundred dollars. Enlarging an above-grade opening means framing: a new header, king studs, siding and drywall patching. Cutting a brand new opening into a basement foundation wall is a different animal entirely, and its price is dominated by concrete sawing and the well, not the window.</p>

      <ComparisonTable
        columns={[{title:"Typical installed cost"},{title:"What drives it"}]}
        rows={[
          {label:"Replace window in a compliant opening",values:["$400-1,200","Just the unit and trim-out"]},
          {label:"Enlarge an above-grade opening",values:["$1,500-3,500","Header, framing, siding and drywall repair"]},
          {label:"Cut a new basement egress",values:[<strong key="a">$3,500-8,000</strong>,"Concrete sawing, lintel, well, drainage, permit"]},
          {label:"Permit and inspection",values:["$100-350","Required essentially everywhere"]},
        ]}
        caption="2026 typical ranges. Basement cut-ins land at the high end in poured walls with interior finishes to repair, and the low end in open block walls."
      />

      <p>Why the basement number is what it is: a crew wet-saws a roughly 4 foot opening through 8 inches of concrete, installs a steel or precast lintel above it, excavates outside for the well, sets the well and ties its base into gravel or the drain tile so it does not become a bathtub, then finally installs the window, which is the cheapest part of the day. It is loud, wet, one-to-two-day work. It is also the single highest-value legal change you can make to a basement, because it is what turns basement space into a bedroom the appraiser can count.</p>

      <h2>The well has its own rulebook</h2>

      <p>Below grade, R310 keeps going. The well in front of the window needs 9 square feet of horizontal area and must project 36 inches out from the foundation wall, enough room for an adult to stand and for a firefighter to work. Deeper than 44 inches, it needs a permanent ladder or steps built in. And if you cover it against leaves and snow, the cover must open from inside without keys, tools, or special knowledge; a bolted-down cover converts your escape route back into a wall.</p>

      <p>Two well details that separate good installs from callbacks. Drainage first: the well base should sit on gravel connected to the foundation drain, because an undrained well fills in a storm and tests your window&apos;s flashing from the wrong side. And when buying a cover, measure the well&apos;s outside dimensions and its projection, not the window; covers are sized to the well, and the common failure is a cover that spans the well but cannot be pushed open from below by a child. Buy hinged or lightweight domed, skip anything that needs two hands and a good grip.</p>

      <Scenario location="Minneapolis, Minnesota">
        <p>A homeowner finishing a basement bedroom needs egress where none exists. The contractor cuts a 44 by 32 inch opening in the poured wall and installs a casement with a manufacturer net clear of 32.5 by 26 inches: 32.5 &#215; 26 &#247; 144 = 5.87 square feet. Pass, with margin. Sill lands 42 inches above the slab, under the 44 inch cap. The grade outside puts the well at 48 inches deep, past the 44 inch line, so the steel well comes with a bolt-on ladder.</p>
        <p>The invoice: $1,150 concrete cutting and lintel, $680 casement unit, $950 framing and install, $780 well with ladder, $320 gravel and drain tie-in, $210 permit. Total $4,090, mid-range for a Minneapolis cut-in. The appraisal six months later counts the new bedroom, which moved the home&apos;s value by a multiple of the invoice. The inspector&apos;s only note: swap the well cover for one that opens without tools. Ten minutes and $140.</p>
      </Scenario>

      <h2>Where egress projects go wrong</h2>

      <p>Measuring the glass. The daylight opening on the sticker is not the net clear opening, and a window bought off the sticker fails inspection by exactly the width of its frame and hardware. Pull the egress spec sheet, every manufacturer publishes one, and check the model you are actually ordering; net clear varies between models of the same nominal size.</p>

      <p>The insert-replacement shrinkage trap catches renovators. Insert replacements slide a new frame inside the old one, and the new frame eats an inch or two of opening in each direction. A bedroom window that met egress in 1995 can quietly stop meeting it the day the replacement goes in, and some jurisdictions check exactly this at permit. If the existing window is anywhere near the minimums, price a full-frame replacement instead.</p>

      <p>The rest are one-line lessons. Bars, grilles, and storm covers over an egress window must open from inside without tools, same rule as the well cover. Furniture does not fix a 48 inch sill; a built platform might, but ask the inspector before building it. Call utility locate before the well excavation, because gas services love foundation walls. And enlarging an opening means a real header sized for the load above it, which is framing work, not window work; the <a href="/stud-spacing-calculator">stud spacing calculator</a> covers the king and jack studs around it.</p>

      <p>Finishing the rest of the basement after the window is in? The <a href="/drywall-calculator">drywall calculator</a> and <a href="/insulation-calculator">insulation calculator</a> pick up where this page leaves off, and the insulation matters more than usual: you just installed a large hole in a below-grade wall, so the assembly around it should earn its keep.</p>
    </>
  );
}
