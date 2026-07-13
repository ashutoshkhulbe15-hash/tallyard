import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SheetSizesSVG() {
  const sizes = [
    { label: "4×8 ft (standard)", sqft: 32, best: "Walls, most rooms", color: GUIDE_SVG.slate },
    { label: "4×10 ft", sqft: 40, best: "9-10 ft ceilings, fewer joints", color: GUIDE_SVG.inkFaint },
    { label: "4×12 ft", sqft: 48, best: "Long walls, pro use", color: GUIDE_SVG.inkMuted },
    { label: "4×14/16 ft", sqft: 56, best: "Commercial, requires lift", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Drywall sheet sizes from 4x8 (32 sq ft) to 4x16 (56 sq ft).">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Drywall sheet sizes</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Longer sheets mean fewer joints to tape, but they are heavier and harder to maneuver</text>
      {sizes.map((s, i) => {
        const y = 65 + i * 30;
        const w = s.sqft * 5;
        return (
          <g key={s.label}>
            <text x="140" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
            <rect x="150" y={y} width={w} height="20" rx="3" fill={s.color} opacity="0.6" />
            <text x={158 + w} y={y + 14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.sqft} ft²</text>
            <text x={158 + w + 45} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.best}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ThicknessSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Drywall thickness: 1/4 inch for curves, 3/8 for resurfacing, 1/2 standard, 5/8 ceilings and fire.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Which thickness to use</text>
      {[
        {thick:'1/4"',use:"Curved walls, resurfacing over old plaster",code:"Not structural",y:55,color:GUIDE_SVG.inkFaint},
        {thick:'3/8"',use:"Resurfacing, non-load walls in mobile homes",code:"Rarely specified",y:85,color:GUIDE_SVG.slate},
        {thick:'1/2"',use:"Standard walls, most residential rooms",code:"Default residential",y:115,color:GUIDE_SVG.accent},
        {thick:'5/8"',use:"Ceilings (sag-resistant), garage walls (fire code)",code:"Required by code in many applications",y:145,color:GUIDE_SVG.accent},
      ].map(t=>(
        <g key={t.thick}>
          <text x="40" y={t.y+12} fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>{t.thick}</text>
          <text x="85" y={t.y+6} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{t.use}</text>
          <text x="85" y={t.y+22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.code}</text>
        </g>
      ))}
    </svg>
  );
}

function FinishLevelsSVG() {
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Drywall finish levels 0 to 5 shown as wall cross-sections with progressively more joint compound coverage, from bare board to a full skim coat.">
      <defs>
        <pattern id="drywallMud" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={GUIDE_SVG.accentSoft} />
          <line x1="0" y1="0" x2="0" y2="6" stroke={GUIDE_SVG.accent} strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>
      <text x="20" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Drywall finish levels (GA-214)</text>
      <text x="20" y="41" fontSize="10" fill={GUIDE_SVG.inkFaint}>Green shows where joint compound goes. More green means more mud, sanding, and labor.</text>

      <g transform="translate(20,60)">
        <rect width="90" height="46" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} />
        <line x1="45" y1="0" x2="45" y2="46" stroke={GUIDE_SVG.inkFaint} strokeWidth="2" />
      </g>
      <text x="65" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.inkFaint}>0</text>
      <text x="65" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>Bare board</text>
      <text x="65" y="150" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.inkFaint}>no tape</text>

      <g transform="translate(130,60)">
        <rect width="90" height="46" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} />
        <rect x="38" width="14" height="46" fill="url(#drywallMud)" />
        <line x1="45" y1="0" x2="45" y2="46" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      </g>
      <text x="175" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.slate}>1</text>
      <text x="175" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>Tape set</text>
      <text x="175" y="150" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.inkFaint}>seam only</text>

      <g transform="translate(240,60)">
        <rect width="90" height="46" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} />
        <rect x="30" width="30" height="46" fill="url(#drywallMud)" />
      </g>
      <text x="285" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.slate}>2</text>
      <text x="285" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>One coat</text>
      <text x="285" y="150" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.inkFaint}>garages</text>

      <g transform="translate(350,60)">
        <rect width="90" height="46" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} />
        <rect x="22" width="46" height="46" fill="url(#drywallMud)" />
      </g>
      <text x="395" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.cool}>3</text>
      <text x="395" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>Two coats</text>
      <text x="395" y="150" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.inkFaint}>texture next</text>

      <g transform="translate(460,60)">
        <rect width="90" height="46" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} />
        <rect x="10" width="70" height="46" fill="url(#drywallMud)" />
      </g>
      <text x="505" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.accent}>4</text>
      <text x="505" y="138" textAnchor="middle" fontSize="9" fontWeight="700" fill={GUIDE_SVG.ink}>Three coats</text>
      <text x="505" y="150" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.accent}>standard</text>

      <g transform="translate(570,60)">
        <rect width="90" height="46" fill="url(#drywallMud)" stroke={GUIDE_SVG.slate} />
      </g>
      <text x="615" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.accent}>5</text>
      <text x="615" y="138" textAnchor="middle" fontSize="9" fontWeight="700" fill={GUIDE_SVG.ink}>Skim coat</text>
      <text x="615" y="150" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.accent}>whole wall</text>

      <line x1="20" y1="170" x2="660" y2="170" stroke={GUIDE_SVG.slateSoft} />
      <text x="20" y="188" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>
        <tspan fontWeight="700" fill={GUIDE_SVG.ink}>Level 4</tspan> is the residential standard. <tspan fontWeight="700" fill={GUIDE_SVG.ink}>Level 5</tspan> is for gloss paint or raking light. <tspan fontWeight="700" fill={GUIDE_SVG.ink}>Levels 0-2</tspan> are hidden or utility spaces, never paint-ready.
      </text>
    </svg>
  );
}

function HangingSequenceSVG() {
  return (
    <svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Hanging order: ceilings first, then top row of walls, then bottom row.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Hanging order</text>
      {[
        {step:"1",label:"Ceilings first",note:"Gravity holds wall sheets against ceiling edge",x:60},
        {step:"2",label:"Top row of walls",note:"Tight to ceiling. Easier to shim bottom.",x:270},
        {step:"3",label:"Bottom row of walls",note:"Gap at floor hidden by baseboard trim",x:480},
      ].map(s=>(
        <g key={s.step}>
          <rect x={s.x} y="50" width="170" height="65" rx="6" fill={s.step==="1"?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={s.step==="1"?GUIDE_SVG.accent:GUIDE_SVG.slate} strokeWidth="1" />
          <text x={s.x+85} y="72" textAnchor="middle" fontSize="18" fontWeight="700" fill={s.step==="1"?GUIDE_SVG.accent:GUIDE_SVG.slate}>{s.step}</text>
          <text x={s.x+85} y="92" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x={s.x+85} y="106" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
        </g>
      ))}
    </svg>
  );
}

export function DrywallCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="July 13, 2026" reviewedAgainst="Gypsum Association GA-216 and GA-214, USG installation guides, IRC Section R702, and ASTM C1396" />

      <h2>How many sheets of drywall you need, and everything the sheets don&apos;t include</h2>

      <p>Counting the sheets is the easy part. Take the square footage of every wall and ceiling you&apos;re covering, divide by 32 (a standard 4×8 sheet), add 10 percent for cuts and breakage, and round up. A 12 × 14 room with 9-foot ceilings works out to about 22 sheets of 4×8 with the ceiling included. Done.</p>

      <p>The part that catches people out is that the sheets are maybe half the job. Once they&apos;re hung you still need joint compound, tape, screws, corner bead, and three rounds of mudding and sanding before a single drop of primer goes on. The finishing materials routinely cost as much as the drywall itself, and the finishing labor is where a weekend turns into two. This page counts the sheets and then does the thing most calculators skip: it tells you how much mud, tape, and screws to buy so you don&apos;t make a second trip.</p>

      <Figure number={1} caption="Longer sheets mean fewer joints to tape, but a 4×12 sheet weighs 77 pounds and needs two people. Most DIYers stick with 4×8. Pros use 4×12 to cut down on seams.">
        <SheetSizesSVG />
      </Figure>

      <MethodologyNote>
        <p>Sheet counts use total wall and ceiling area divided by sheet size, with a 10 percent waste factor for cuts and breakage. Finishing quantities follow Gypsum Association GA-216 coverage rates: roughly 1 gallon of joint compound per 100 square feet per coat, one 500-foot roll of tape per 500 square feet, and about 1 pound of screws per 300 square feet. Thickness and fire-rating requirements are from IRC Section R702. Pricing reflects 2026 Home Depot and Lowe&apos;s retail.</p>
      </MethodologyNote>

      <h2>Figuring drywall square footage</h2>

      <p>The measurement is simpler than it looks. For the walls, take the perimeter of the room (add up all four wall lengths) and multiply by the ceiling height. For a 12 × 14 room that&apos;s a 52-foot perimeter times 9 feet, or 468 square feet of wall. If you&apos;re drywalling the ceiling too, add length times width, another 168 square feet. Total: 636 square feet.</p>

      <p>Here is the counterintuitive part, and it trips up nearly everyone who does this for the first time. Do not subtract doors and windows. It feels wrong. There&apos;s an obvious hole in the wall, so surely you buy less drywall? No. When you cut a sheet to fit around a window, the piece you remove is rarely large enough or the right shape to use somewhere else. It becomes scrap. Subtracting the opening from your total leaves you short by exactly the amount you thought you were saving. The only openings worth subtracting are genuinely large ones, like a garage door or a wide cased opening between two rooms. For a standard door and a couple of windows, leave them in and let the waste factor absorb the cuts.</p>

      <p>Once you have the square footage, the sheet count is just division. Total area divided by 32 for 4×8 sheets, or 48 for 4×12. The calculator above does this and applies the waste factor automatically. If you&apos;d rather sanity-check by hand: 636 square feet divided by 32 is 19.9 sheets, times 1.1 for waste is 21.9, round up to 22 sheets of 4×8.</p>

      <h2>What to buy besides the sheets</h2>

      <p>This is the list that turns a clean estimate into a finished wall. The quantities below come straight from Gypsum Association coverage rates, scaled to the square footage the calculator gives you. For a 636-square-foot room (the 12 × 14 example), here&apos;s the full shopping list.</p>

      <ComparisonTable
        columns={[{title:"Material"},{title:"How much"},{title:"For 636 ft²"}]}
        rows={[
          {label:"Joint compound (mud)",values:["1 gal per 100 ft², 3 coats","~19 gal (four 5-gal buckets)"]},
          {label:"Paper joint tape",values:["1 roll (500 ft) per 500 ft²","2 rolls"]},
          {label:"Drywall screws",values:["~1 lb per 300 ft²","2-3 lb (one 5 lb box)"]},
          {label:"Corner bead",values:["1 length per outside corner","measure your corners"]},
          {label:"Sheets (4×8)",values:[<strong key="s1">area ÷ 32 + waste</strong>,<strong key="s2">22 sheets</strong>]},
        ]}
        caption="Coverage rates per Gypsum Association GA-216. Joint compound is the big surprise on most first projects. Three coats over every seam and screw head adds up fast, and a 5-gallon bucket goes quicker than you expect."
      />

      <p>A few notes on that list. Buy the compound in 5-gallon buckets, not gallon tubs, if your project is over 100 square feet. The per-gallon price drops by nearly half and it stores fine sealed. For screws, a single 5-pound box of 1-1/4 inch screws handles a whole small room; use 1-5/8 inch screws for 5/8 inch drywall. And whatever you calculate for corner bead, count your actual outside corners rather than guessing, because it&apos;s the one item you can&apos;t improvise a substitute for mid-project.</p>

      <h2>Drywall thickness depends on what the wall does</h2>

      <Figure number={2} caption="Most residential walls use 1/2 inch. Ceilings use 5/8 to resist sag between joists. Garage walls that share a surface with living space require 5/8 Type X for the fire rating.">
        <ThicknessSVG />
      </Figure>

      <p>Thickness doesn&apos;t change the sheet count, since a sheet is a sheet regardless of how thick it is, but it changes what you buy and in a couple of cases it&apos;s not optional. Half-inch is the residential default and covers the vast majority of walls. Quarter-inch exists for curved walls and for laying a fresh skin over old plaster. Three-eighths shows up mostly in mobile homes and resurfacing work and you can usually ignore it.</p>

      <p>Five-eighths is the one to pay attention to. It&apos;s standard for ceilings because the extra thickness resists sagging between joists, especially where joists are spaced 24 inches apart. And it&apos;s required, not suggested, on any wall or ceiling between a garage and living space.</p>

      <Callout label="Fire-rated walls (Type X)">IRC Section R702 requires 5/8-inch Type X drywall on the garage side of any wall or ceiling shared with living space. This gives the assembly a one-hour fire rating. Standard 1/2-inch here fails inspection and is a genuine safety problem, not a technicality. Type X runs about $2 more per sheet. Do not substitute it away to save a few dollars.</Callout>

      <h2>Finish levels: the thing that decides how much mud and labor</h2>

      <p>Ask a drywall pro for a quote and the first question back is usually what level of finish you want. Most homeowners have never heard the term, which is a shame, because the finish level is what actually determines how much joint compound you buy and how many days of sanding you sign up for. It&apos;s a standard scale, Level 0 through Level 5, defined by the Gypsum Association in GA-214.</p>

      <Figure number={3} caption="The finish level is really a measure of how much of the wall gets covered in compound. Level 1 is just the taped seam. Level 5 is the entire surface skim-coated. The higher you go, the more mud, sanding, and labor.">
        <FinishLevelsSVG />
      </Figure>

      <p>Here&apos;s what the levels mean in practice. Levels 0 through 2 are for spaces nobody looks at closely: behind-wall areas, attics, garages, and surfaces that will be tiled over. Seams get taped and maybe one coat, and that&apos;s it. Not paint-ready. Level 3 is two coats, appropriate when a heavy texture or wallpaper will hide the surface underneath.</p>

      <p>Level 4 is the one you want for a normal room. Three coats over every seam and screw head, feathered wide and sanded smooth, ready for flat paint and light texture. When this page and most drywall guides talk about finished drywall, Level 4 is the assumption. It&apos;s also the finish the three-coat mud quantity on this page is calculated for.</p>

      <p>Level 5 adds a thin skim coat of compound over the entire wall surface, not just the seams. You need it in exactly two situations: when the wall will be painted in a gloss or semi-gloss that reflects every imperfection, or when it sits in raking light, meaning light from a window or fixture crosses it at a shallow angle and throws every ridge into shadow. A long hallway with a window at the end is the classic Level 5 candidate. If neither of those describes your room, Level 4 is genuinely fine and Level 5 is wasted money and effort.</p>

      <h2>Mudding is three coats and mostly waiting</h2>

      <p>Taping and mudding is a minimum of three coats, and the reason it takes days rather than hours is drying time, not work time. The first coat embeds the tape in a thin layer of compound. The second fills the joint to nearly flat. The third feathers the edges out 12 to 14 inches wide so the transition to bare drywall disappears. Each coat has to dry completely before you sand it and apply the next.</p>

      <p>In warm, dry summer conditions that&apos;s 12 to 24 hours per coat. In an unheated basement in winter it can stretch to 48 hours. Three coats plus drying plus sanding means a single room takes three to five days from the last screw to primer-ready, even though your hands are only busy for a few hours of that. Plan the calendar around the drying, not the labor, and you won&apos;t be frustrated.</p>

      <Figure number={4} caption="Hang ceilings first, then the top row of walls tight to the ceiling, then the bottom row. The baseboard covers the deliberate gap at the floor.">
        <HangingSequenceSVG />
      </Figure>

      <h2>Where drywall projects go wrong</h2>

      <p>The mistakes on a drywall job are predictable, which is good news, because predictable mistakes are avoidable ones. A few worth knowing before you start.</p>

      <p><strong>Skipping the third coat.</strong> This is the big one. Two coats and aggressive sanding feels like a shortcut that saves a day. It doesn&apos;t. Every joint shows as a visible ridge the moment light hits it at an angle, and the only fix is to apply the coat you skipped, re-sand, re-prime, and repaint. The shortcut costs two days instead of saving one.</p>

      <p><strong>Sanding to fix bad mudding.</strong> Sanding is for smoothing a good coat, not for correcting a lumpy one. If you find yourself sanding hard enough to raise dust clouds and expose the paper tape, the problem is your mudding technique, not your sanding. Feather wider and use thinner coats.</p>

      <p><strong>Butting tapered edges against cut edges.</strong> Drywall sheets have a slight factory taper along the long edges so two sheets meeting there form a shallow valley for the tape and mud to fill flush. The cut ends have no taper. When a tapered edge meets a cut end, you get a raised butt joint that&apos;s much harder to hide. Plan your layout so tapered edges meet tapered edges wherever possible.</p>

      <p><strong>Under-buying compound.</strong> People consistently underestimate mud. Three coats over every seam and every screw head across a whole room is more compound than it seems, and running out mid-coat means a hardware run right when you had momentum. Buy the extra bucket. It stores.</p>

      <Scenario location="Columbus, OH">
        A homeowner finishing a basement rec room applied two coats of compound instead of three and sanded hard to try to flatten the joints. After <a href="/paint-calculator">painting</a>, every seam telegraphed through as a visible line in the raking light from the basement windows. The fix was to apply the third coat he&apos;d skipped, re-sand the whole room, re-prime, and repaint. Two extra days, plus another bucket of mud and a gallon of primer, to save what he thought was an afternoon.
      </Scenario>

      <h2>DIY versus hiring it out</h2>

      <p>Hanging drywall is hard physical work but it isn&apos;t technically difficult. Lifting sheets overhead for a ceiling is the worst of it, and a rented drywall lift solves that. Finishing, on the other hand, is a real skill. A clean Level 4 finish from someone who&apos;s done a hundred rooms looks nothing like a first-timer&apos;s. This is why a common split is to hang the drywall yourself and hire a finisher for the taping and mudding.</p>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Drywall (22 sheets)",values:["$280-400","$280-400"]},
          {label:"Mud, tape, screws, corner bead",values:["$80-150","Included"]},
          {label:"Drywall lift rental (ceilings)",values:["$40-60/day","Own equipment"]},
          {label:"Labor (hang and finish)",values:["$0 (3-5 weekends)","$1.50-3.00/ft²"]},
          {label:"Total for a 12×14 room",values:[<strong key="d">$400-610</strong>,<strong key="p">$1,200-2,800</strong>]},
        ]}
        caption="The professional range depends heavily on finish level. A Level 5 finish runs well above a Level 4 because of the full skim coat. Materials are cheap; the labor and the finish quality are what you're really paying for."
      />

      <p>If you&apos;re building out a space from bare studs, a few of these calculators pair naturally. Run the <a href="/insulation-calculator">insulation calculator</a> first, since insulation goes in the wall cavity before the drywall goes up. Use the <a href="/stud-spacing-calculator">stud spacing calculator</a> to confirm your framing is on 16 or 24 inch centers so the sheet edges land on studs. And once the walls are finished, the <a href="/paint-calculator">paint calculator</a> uses the same square footage you measured here.</p>
    </>
  );
}
