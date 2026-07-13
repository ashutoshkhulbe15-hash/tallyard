import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function WallFramingSVG() {
  return (
    <svg viewBox="0 0 680 340" width="100%" height="auto" role="img" aria-label="Cross-section of a framed wall with a window and door opening, labeling double top plate, bottom plate, king studs, jack studs, header, cripple studs, common studs at 16 inches on center, and a three-stud corner.">
      <defs>
        <pattern id="studWood" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill={GUIDE_SVG.bgWarm} />
          <line x1="0" y1="0" x2="0" y2="5" stroke={GUIDE_SVG.warm} strokeWidth="0.6" opacity="0.35" />
        </pattern>
      </defs>
      <text x="20" y="22" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Anatomy of a framed wall</text>
      <text x="20" y="38" fontSize="10" fill={GUIDE_SVG.inkFaint}>Common studs at 16&quot; on center, plus the extra studs every opening requires</text>

      <rect x="40" y="60" width="430" height="14" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="40" y="74" width="430" height="8" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="40" y="286" width="430" height="14" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />

      <rect x="40" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="48" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="40" y="82" width="6" height="30" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />

      <rect x="96" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="150" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />

      <rect x="204" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="212" y="120" width="6" height="120" fill="url(#studWood)" stroke={GUIDE_SVG.accent} />
      <rect x="212" y="112" width="86" height="12" fill="url(#studWood)" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <rect x="212" y="240" width="86" height="8" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="292" y="120" width="6" height="120" fill="url(#studWood)" stroke={GUIDE_SVG.accent} />
      <rect x="300" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="240" y="82" width="5" height="30" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="262" y="82" width="5" height="30" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="240" y="248" width="5" height="38" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="262" y="248" width="5" height="38" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />

      <rect x="352" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />

      <rect x="400" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="408" y="120" width="6" height="166" fill="url(#studWood)" stroke={GUIDE_SVG.accent} />
      <rect x="408" y="112" width="56" height="12" fill="url(#studWood)" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <rect x="458" y="120" width="6" height="166" fill="url(#studWood)" stroke={GUIDE_SVG.accent} />
      <rect x="464" y="82" width="6" height="204" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />
      <rect x="428" y="82" width="5" height="30" fill="url(#studWood)" stroke={GUIDE_SVG.slate} />

      <g fontSize="9.5" fill={GUIDE_SVG.ink}>
        <line x1="470" y1="70" x2="500" y2="70" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.7" />
        <text x="504" y="66" fontWeight="600">Double top plate</text>
        <text x="504" y="78" fill={GUIDE_SVG.inkFaint} fontSize="8.5">ties walls together</text>

        <line x1="298" y1="118" x2="500" y2="118" stroke={GUIDE_SVG.accent} strokeWidth="0.7" />
        <text x="504" y="115" fontWeight="600" fill={GUIDE_SVG.accent}>Header</text>
        <text x="504" y="127" fill={GUIDE_SVG.inkFaint} fontSize="8.5">carries load over opening</text>

        <line x1="306" y1="160" x2="500" y2="160" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.7" />
        <text x="504" y="157" fontWeight="600">King stud</text>
        <text x="504" y="169" fill={GUIDE_SVG.inkFaint} fontSize="8.5">full height, both sides</text>

        <line x1="292" y1="200" x2="500" y2="200" stroke={GUIDE_SVG.accent} strokeWidth="0.7" />
        <text x="504" y="197" fontWeight="600" fill={GUIDE_SVG.accent}>Jack stud</text>
        <text x="504" y="209" fill={GUIDE_SVG.inkFaint} fontSize="8.5">supports the header</text>

        <line x1="267" y1="265" x2="500" y2="265" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.7" />
        <text x="504" y="262" fontWeight="600">Cripple studs</text>
        <text x="504" y="274" fill={GUIDE_SVG.inkFaint} fontSize="8.5">above/below openings</text>

        <line x1="470" y1="293" x2="500" y2="293" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.7" />
        <text x="504" y="296" fontWeight="600">Bottom plate</text>
      </g>

      <g fontSize="8.5" fill={GUIDE_SVG.inkFaint}>
        <text x="43" y="318">3-stud corner</text>
        <text x="126" y="318" textAnchor="middle">common studs, 16&quot; OC</text>
      </g>
    </svg>
  );
}

function SpacingSVG() {
  return (
    <svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="Stud spacing: 16 inches on center standard load-bearing, 24 inches non-bearing interior, 12 inches high-load.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Stud spacing by wall type</text>
      {[
        {spacing:'16" OC',use:"Standard load-bearing and exterior walls",code:"IRC R602.3 default",y:55},
        {spacing:'24" OC',use:"Interior non-bearing walls, some 2×6 exterior",code:"Allowed by IRC with restrictions",y:85},
        {spacing:'12" OC',use:"High-load areas: garage headers, tall walls",code:"Engineer-specified",y:115},
      ].map(s=>(
        <g key={s.spacing}>
          <text x="75" y={s.y+10} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>{s.spacing}</text>
          <text x="85" y={s.y+4} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.use}</text>
          <text x="85" y={s.y+20} fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.code}</text>
        </g>
      ))}
    </svg>
  );
}

export function StudSpacingCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="July 13, 2026" reviewedAgainst="IRC Sections R602.3, R602.7, and R602.7.1, the AWC Wood Frame Construction Manual, and APA framing guidance" />

      <h2>Stud count is more than wall length divided by spacing</h2>

      <p>The formula everyone starts with is wall length in inches divided by the spacing, plus one. A 12-foot wall at 16 inches on center: 144 inches divided by 16 is 9, plus 1 is 10 studs. That number is correct, and it&apos;s also incomplete, because a real wall is never just a row of evenly spaced studs. Every door and window needs king studs, jack studs, a header, and cripples. Every corner needs a stud assembly for drywall backing. A 20-foot wall with two windows and a door needs 10 to 12 more studs than the simple formula predicts, and if you order to the simple formula you come up short on framing day.</p>

      <p>This page walks through the whole count: the common studs, the spacing rules that set them, and the extra studs that openings and corners demand. The calculator above handles all of it once you tell it the wall length and how many openings you have.</p>

      <Figure number={1} caption="A framed wall is common studs on a grid, interrupted by opening assemblies (king, jack, header, cripple) and anchored by plates top and bottom. The green parts are the load path around each opening.">
        <WallFramingSVG />
      </Figure>

      <MethodologyNote>
        <p>Common stud spacing follows IRC Section R602.3. King, jack, and header requirements at openings follow IRC R602.7 and the header span tables. Cripple studs above and below openings follow R602.7.1. Corner assemblies provide drywall backing per standard framing practice. The calculator adds king and jack studs per opening, cripples, and corner studs on top of the common-stud grid. It does not size headers or model shear bracing; use the sources below and your local code for those.</p>
      </MethodologyNote>

      <h2>The parts of a stud wall</h2>

      <p>Before the count makes sense, the vocabulary has to. A stud wall is simpler than it looks once the pieces have names.</p>

      <p>The <strong>plates</strong> are the horizontal members. The bottom plate (or sole plate) runs along the floor; the top plate is doubled in most walls, two members stacked, which is how walls lock together at corners and carry load along their length. The <strong>common studs</strong> are the vertical members that fill the wall on a regular spacing. Everything else exists to frame an opening or a corner.</p>

      <p>At a door or window, a <strong>king stud</strong> runs full height on each side, plate to plate. Inside the kings, a <strong>jack stud</strong> (also called a trimmer) is cut shorter and nailed to the king, and its job is to hold up the <strong>header</strong>, the beam that spans the opening and carries the load that would otherwise pass straight down through studs that aren&apos;t there anymore. Above the header, and below a window sill, short <strong>cripple studs</strong> keep the framing grid going so sheathing and drywall have something to fasten to. That&apos;s the whole cast: plates, common studs, kings, jacks, headers, cripples, and corner assemblies.</p>

      <h2>Standard stud spacing, and where it starts from the corner</h2>

      <Figure number={2} caption="16 inches on center is the default for load-bearing and exterior walls. 24 inches is allowed for non-bearing interior walls and some engineered 2x6 exterior walls.">
        <SpacingSVG />
      </Figure>

      <p>Studs are spaced 16 inches on center in most residential walls, and the phrase &quot;on center&quot; is doing important work: it&apos;s the distance from the center of one stud to the center of the next, not the gap between them. This matters because 4-foot-wide sheet goods (drywall, plywood, OSB) are built around it. At 16-inch centers, the edge of a 4-foot sheet lands dead center on a stud every time, three studs across, giving you a fastening surface exactly where the sheets meet. At 24-inch centers, the same holds for a 4-foot sheet across two bays. Break the spacing and your sheet edges float in mid-air with nothing to screw into.</p>

      <p>Here&apos;s the detail that trips people up, and that almost no calculator explains: the layout doesn&apos;t start at 16 inches from the corner. It starts so that the <em>center</em> of the first common stud lands at 16 inches from the end of the wall. In practice framers pull their tape and make the first mark at 15-1/4 inches, then every 16 inches after, because the first stud sits at the very end of the wall and you want the next stud&apos;s center, not its edge, to hit 16. Get this right and the first full sheet of drywall breaks on a stud. Get it wrong by 3/4 of an inch and every sheet down the wall is off, and you&apos;re adding blocking to catch the edges.</p>

      <p>When to use 24-inch spacing instead: interior non-bearing partition walls are the easy case, and it saves lumber with no downside. On exterior and bearing walls, 24-inch spacing (part of what&apos;s called advanced or optimum-value framing) is allowed by the IRC but comes with conditions on stud size, story height, and the roof and floor loads above. If you&apos;re framing a bearing wall and thinking about 24 inches to save studs, confirm it against your local code first rather than assuming.</p>

      <h2>The studs the formula misses</h2>

      <p>Openings are where stud counts blow past the simple formula. Each door or window adds, at minimum, two kings and two jacks, so four studs before you count a single cripple. A standard window also adds a sill and the cripples below it, plus cripples above the header. Tally it for a single window and you&apos;re often at six to eight pieces of framing for one opening.</p>

      <p>Corners are the other place the formula falls short. A traditional three-stud corner uses a full stud at the corner plus two more behind it, angled to give drywall a nailing surface on the inside of both walls. That&apos;s two extra studs per corner beyond the common-stud grid. There&apos;s an energy-efficient two-stud corner (with drywall clips or scrap-ply backing) that leaves room for insulation to reach the corner, but the extra-stud math is similar enough that the calculator adds two per corner either way.</p>

      <Callout label="Headers are counted, not sized">The calculator counts the studs, including the kings and jacks that carry a header. It does not size the header itself. Header size depends on span and load: a doubled 2×6 handles short openings, and you step up to 2×8, 2×10, or 2×12 as the span grows, with engineered lumber (LVL or glulam) beyond roughly 10 feet. Size yours against IRC header span tables, and use the <a href="/lumber-calculator">lumber calculator</a> to order the header stock.</Callout>

      <h2>2x4 or 2x6: which stud to frame with</h2>

      <p>The choice between 2x4 and 2x6 studs isn&apos;t about spacing, it&apos;s about wall depth, and it mostly comes down to insulation and whether the wall is exterior. The count of studs is the same for a given spacing regardless of size; what changes is the lumber you order and what the wall can hold.</p>

      <ComparisonTable
        columns={[{title:"2x4 wall"},{title:"2x6 wall"}]}
        rows={[
          {label:"Actual depth",values:["3-1/2 in","5-1/2 in"]},
          {label:"Typical use",values:["Interior walls, most partitions","Exterior walls in cold climates"]},
          {label:"Insulation it holds",values:["R-13 to R-15 batt","R-19 to R-21 batt"]},
          {label:"Common spacing",values:['16" OC','16" or 24" OC']},
          {label:"Cost per stud",values:[<strong key="a">Lower</strong>,<strong key="b">~40-60% more</strong>]},
        ]}
        caption="2x6 exterior walls are increasingly standard in cold climates because the deeper cavity holds more insulation, which pairs with 24-inch spacing to offset the higher lumber cost. Interior partitions almost always stay 2x4."
      />

      <p>If you&apos;re framing an exterior wall in a heating-dominated climate, 2x6 at 24 inches on center is the common modern choice: fewer studs, deeper insulation cavity, less thermal bridging through the framing. Interior partition walls that carry no load and hold no insulation have no reason to be anything but 2x4 at 16 inches. Once you settle the stud size, the <a href="/insulation-calculator">insulation calculator</a> tells you how much batt the cavities take.</p>

      <Scenario location="Denver, CO">
        A homeowner framing a 24-foot basement wall with two egress windows counted studs the simple way: 24 feet at 16 inches on center is 19 common studs, so he bought 21 to have a couple spare. On framing day he was eight studs short. The two windows needed four kings, four jacks, a sill and cripples each, and the two corners where the wall met the foundation walls needed their assemblies. He made the hardware run he&apos;d been trying to avoid. Counting the openings and corners up front, the way the calculator does, would have put the right number of studs on the truck the first time.
      </Scenario>

      <h2>Counting a real wall, start to finish</h2>

      <p>Numbers make the method concrete, so here&apos;s a full count for a common wall: 24 feet long, one exterior door, two windows, framed at 16 inches on center with corners at each end.</p>

      <p>Start with the common studs. 24 feet is 288 inches, divided by 16 is 18, plus 1 is 19 common studs. That&apos;s the grid. Now the openings. The door adds two king studs, two jack studs, and two cripples above the header: six pieces. Each window adds two kings, two jacks, two cripples above the header, and two cripples below the sill: eight pieces per window, sixteen for the pair. The two corners add two studs each, four total. Add it up: 19 common plus 6 for the door plus 16 for the windows plus 4 for the corners is 45 studs.</p>

      <p>Notice how far that is from the naive answer. The simple length-over-spacing formula gave 19. The real wall needs 45. More than half the studs in this wall are doing something other than filling the grid, and every one of them is required by the framing, not optional. Then, on top of 45, order roughly 10 percent spare for warp and splits, so put 50 studs on the truck. This is exactly the tally the calculator above produces once you enter the openings, and it&apos;s why counting openings by hand and hoping is how framing days end with a hardware run.</p>

      <h2>Where framing counts go wrong</h2>

      <p><strong>Counting openings as savings.</strong> The instinct is that a door or window means fewer studs, since there&apos;s a hole where studs would be. It&apos;s the opposite. An opening removes one or two common studs and adds four to eight framing members around it. Openings cost studs, they don&apos;t save them.</p>

      <p><strong>Starting the layout at the wrong point.</strong> Covered above, but it&apos;s the single most common framing error: laying out the first stud center at 16 inches from the corner instead of accounting for the corner stud, so sheet edges miss the studs all the way down the wall.</p>

      <p><strong>Forgetting the doubled top plate.</strong> The top plate is two members, not one, and the second plate laps the joints so walls tie together. People ordering plate stock for the linear footage of one plate come up exactly half short.</p>

      <p><strong>Skipping the spares.</strong> Framing lumber warps, splits, and shows up with unusable crowns. Order about 10 percent over your calculated count. A warped stud you can cull is cheaper than a framing day cut short.</p>

      <p>Once the wall is stood and sheathed, the framing feeds directly into the next steps: the <a href="/drywall-calculator">drywall calculator</a> uses the same wall dimensions for sheet count, and the <a href="/insulation-calculator">insulation calculator</a> uses your stud size and spacing to figure how much batt goes in the cavities.</p>
    </>
  );
}
