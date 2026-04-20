import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function IRCCodeSVG() {
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="IRC stair code: max 7.75 inch rise, min 10 inch run, min 36 inch width, max 4 inch baluster spacing.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>IRC R311.7 stair requirements</text>
      {[
        {rule:"Maximum riser height",value:'7.75"',note:"Most builders target 7.0–7.5\" for comfort",y:60},
        {rule:"Minimum tread depth",value:'10"',note:"Measured from nose to nose. 10.5–11\" is standard.",y:95},
        {rule:"Minimum stair width",value:'36"',note:"Clear width between walls or railings",y:130},
        {rule:"Maximum baluster spacing",value:'4"',note:"A 4\" sphere cannot pass through any opening",y:165},
      ].map(r=>(
        <g key={r.rule}>
          <text x="250" y={r.y+6} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.rule}</text>
          <rect x="260" y={r.y-8} width="70" height="24" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="0.75" />
          <text x="295" y={r.y+6} textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>{r.value}</text>
          <text x="340" y={r.y+6} fontSize="10" fill={GUIDE_SVG.inkFaint}>{r.note}</text>
        </g>
      ))}
    </svg>
  );
}

function RiseRunSVG() {
  const examples = [
    { totalRise: '36"', steps: 5, rise: '7.2"', run: '10"', stringer: '49"' },
    { totalRise: '48"', steps: 7, rise: '6.86"', run: '10"', stringer: '77"' },
    { totalRise: '72"', steps: 10, rise: '7.2"', run: '10"', stringer: '106"' },
    { totalRise: '96"', steps: 13, rise: '7.38"', run: '10"', stringer: '136"' },
    { totalRise: '108"', steps: 15, rise: '7.2"', run: '10"', stringer: '155"' },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Rise and run by total height: 36 inches needs 5 steps, 108 inches needs 15.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Steps and stringer length by total rise</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Total rise",x:100},{l:"Steps",x:210},{l:"Rise each",x:310},{l:"Run each",x:410},{l:"Stringer length",x:550}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {examples.map((e,i)=>{const y=headerY+10+i*rowH;return(
        <g key={e.totalRise}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="100" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{e.totalRise}</text>
          <text x="210" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{e.steps}</text>
          <text x="310" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{e.rise}</text>
          <text x="410" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{e.run}</text>
          <text x="550" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{e.stringer}</text>
        </g>
      )})}
    </svg>
  );
}

function StringerCountSVG() {
  return (
    <svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Stringer count: 36 inch stairs need 3 stringers, 48 inch need 4.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How many stringers?</text>
      {[
        {width:'36" (code minimum)',stringers:"3",spacing:'18" OC',y:55},
        {width:'42" (comfortable)',stringers:"3",spacing:'21" OC',y:85},
        {width:'48" (two-person)',stringers:"4",spacing:'16" OC',y:115},
      ].map(s=>(
        <g key={s.width}>
          <text x="220" y={s.y+12} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.width}</text>
          <rect x="230" y={s.y} width="100" height="22" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="0.75" />
          <text x="280" y={s.y+15} textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>{s.stringers} stringers</text>
          <text x="345" y={s.y+12} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.spacing}</text>
        </g>
      ))}
    </svg>
  );
}

export function StairCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="IRC 2021 R311.7 (stairways), AWC span tables" />

      <h2>Building code sets the numbers. Comfort decides where inside those numbers you land.</h2>

      <p>Stair design is one of the few areas where building code dictates the exact dimensions of what you build. Maximum riser height, minimum tread depth, minimum width, baluster spacing, headroom, handrail height. These are not suggestions. An inspector will measure them, and a staircase that fails code cannot be signed off. The calculator above computes rise and run from your total height using these IRC requirements.</p>

      <Figure number={1} caption="IRC R311.7 sets the boundaries. Within those limits, comfort comes from targeting 7.0–7.5 inch rise and 10.5–11 inch run. The 7-11 rule.">
        <IRCCodeSVG />
      </Figure>

      <MethodologyNote>
        <p>Rise and run calculations follow IRC 2021 R311.7. Stringer length uses the Pythagorean theorem: √(total_rise² + total_run²). Stringer spacing per AWC span tables for 2×12 southern pine or Douglas fir. All dimensions assume standard residential interior or deck stairs.</p>
      </MethodologyNote>

      <h2>Rise and run from your total height</h2>

      <Figure number={2} caption="Total rise ÷ maximum riser height gives you the minimum number of steps. Then divide total rise by step count for the actual rise per step.">
        <RiseRunSVG />
      </Figure>

      <p>The formula is: divide your total rise (in inches) by the target riser height (7.5 inches is the sweet spot). Round up to get the step count. Then divide total rise by step count for the actual rise per step. A 48-inch total rise divided by 7.5 gives 6.4, rounded up to 7 steps, with an actual rise of 6.86 inches each. Every step must be the same height. Variation of more than 3/8 inch between any two risers fails inspection and is a trip hazard.</p>

      <Callout label="The 7-11 rule">Professional stair builders target a 7-inch rise and 11-inch run. This ratio feels natural to walk, meets code with margin, and produces a stringer angle of about 32 degrees. Steeper stairs (closer to the 7.75-inch code maximum) feel cramped. Shallower stairs (under 6.5-inch rise) feel like ramps and waste floor space.</Callout>

      <h2>Stringers: how many and how long</h2>

      <Figure number={3} caption="Standard 36-inch stairs need 3 stringers. Wider stairs add a stringer every 16 inches of width. Stringers are cut from 2×12 lumber.">
        <StringerCountSVG />
      </Figure>

      <Scenario location="Minneapolis, MN">
        A homeowner building <a href="/deck-calculator">deck stairs</a> measured his total rise at 42 inches and ordered three 8-foot 2×12 stringers. The calculator said he needed 6 steps at 7.0 inches each with a total run of 60 inches, giving a stringer length of 73 inches. An 8-foot (96-inch) 2×12 gives enough length, but the notch cuts remove so much wood that the remaining throat (the narrowest part of the stringer after cuts) was only 3.5 inches. Code requires a minimum 3.5-inch throat. He was at the absolute limit. A 2×12 with a 7-inch rise and 10-inch run leaves exactly 3.5 inches of throat. If his rise had been 7.5 inches, the throat would have failed inspection.
      </Scenario>

      <ComparisonTable
        columns={[{title:"Interior stairs"},{title:"Deck/exterior stairs"}]}
        rows={[
          {label:"Stringer material",values:["2×12 SPF or Douglas fir","2×12 pressure-treated"]},
          {label:"Tread material",values:["Hardwood, LVP on plywood","PT, composite, or cedar"]},
          {label:"Railing required?",values:["Yes if 4+ risers","Yes if 30\"+ above grade"]},
          {label:"Open or closed risers?",values:["Closed (finished look)","Open allowed by most codes"]},
          {label:"Landing required?",values:["At top and bottom, 36\" min","At top, 36\" min"]},
        ]}
        caption="Exterior stairs use pressure-treated lumber throughout. Interior stairs use dimensional lumber for stringers and finished wood or LVP for treads."
      />

      <p>For deck projects where stairs are part of a larger build, the <a href="/deck-calculator">deck calculator</a> and the <a href="/planner/build-a-deck">deck planner</a> chain the stair calculation with decking, framing, and footing quantities automatically.</p>
    </>
  );
}
