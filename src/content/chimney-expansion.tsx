import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function FlueRatioSVG() {
  return (
    <svg viewBox="0 0 680 280" width="100%" height="auto" role="img" aria-label="Flue sizing: a 36 by 30 inch fireplace opening is 1080 square inches. A round liner needs one twelfth of that, 90 square inches, which is a 12 inch round. A rectangular liner needs one tenth, 108 square inches, which is a 12 by 16.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Flue area is a fraction of the fireplace opening</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Per IRC Table R1003.11.1. The opening is what the room sees; the flue has to carry what it produces.</text>

      <rect x="55" y="90" width="150" height="125" fill={GUIDE_SVG.warm} opacity="0.18" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="130" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>36 x 30 in</text>
      <text x="130" y="166" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>opening</text>
      <text x="130" y="236" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.warm}>1,080 in&#178;</text>

      <text x="240" y="155" fontSize="22" fill={GUIDE_SVG.inkFaint}>&#8594;</text>

      <g>
        <circle cx="345" cy="130" r="34" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
        <text x="345" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>round</text>
        <text x="345" y="142" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.accent}>1/12</text>
        <text x="345" y="184" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>90 in&#178; needed</text>
        <text x="345" y="200" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>use 12 in round</text>
      </g>

      <g>
        <rect x="472" y="96" width="88" height="68" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
        <text x="516" y="126" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={GUIDE_SVG.cool}>rectangular</text>
        <text x="516" y="143" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.cool}>1/10</text>
        <text x="516" y="184" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>108 in&#178; needed</text>
        <text x="516" y="200" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>use 12 x 16</text>
      </g>

      <text x="20" y="268" fontSize="9" fill={GUIDE_SVG.inkFaint}>Round liners draw better at a smaller area because smoke does not stall in the corners. That is the whole reason for two ratios.</text>
    </svg>
  );
}

function Rule3210SVG() {
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="The 3-2-10 rule: a chimney must extend at least 3 feet above the roof where it passes through, and at least 2 feet above anything within 10 feet horizontally.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The 3-2-10 rule</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>IRC R1003.9. Both conditions apply; the taller answer wins.</text>

      <path d="M 60 240 L 240 140 L 420 240 Z" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <line x1="45" y1="240" x2="435" y2="240" stroke={GUIDE_SVG.inkMuted} strokeWidth="2" />

      <rect x="150" y="100" width="32" height="102" fill={GUIDE_SVG.warm} opacity="0.3" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <line x1="146" y1="188" x2="192" y2="188" stroke={GUIDE_SVG.line} strokeWidth="1" strokeDasharray="3 3" />

      <line x1="122" y1="188" x2="122" y2="100" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="114" y="140" textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>3 ft min</text>
      <text x="114" y="156" textAnchor="end" fontSize="9" fill={GUIDE_SVG.inkFaint}>above roof</text>

      <line x1="186" y1="96" x2="330" y2="96" stroke={GUIDE_SVG.line} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="240" y1="140" x2="240" y2="96" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="252" y="118" fontSize="11" fontWeight="700" fill={GUIDE_SVG.warm}>2 ft min</text>
      <text x="252" y="133" fontSize="9" fill={GUIDE_SVG.inkFaint}>above the ridge</text>

      <line x1="166" y1="262" x2="240" y2="262" stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="203" y="280" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.cool}>within 10 ft</text>

      <g fontSize="10.5">
        <text x="460" y="150" fontWeight="600" fill={GUIDE_SVG.ink}>Also worth knowing</text>
        <text x="460" y="172" fill={GUIDE_SVG.inkMuted}>Trees and neighboring roofs are</text>
        <text x="460" y="188" fill={GUIDE_SVG.inkMuted}>not in the code rule but still</text>
        <text x="460" y="204" fill={GUIDE_SVG.inkMuted}>spoil draft.</text>
        <text x="460" y="230" fill={GUIDE_SVG.inkMuted}>A chimney that passes 3-2-10</text>
        <text x="460" y="246" fill={GUIDE_SVG.inkMuted}>can still smoke if total height</text>
        <text x="460" y="262" fill={GUIDE_SVG.inkMuted}>is under 15 ft.</text>
      </g>
    </svg>
  );
}

function LinerAreaSVG() {
  const liners = [
    { name: '8 x 8 clay', area: 33, fits: "small stove, gas appliance" },
    { name: '8 x 12 clay', area: 51, fits: "up to ~510 in² opening" },
    { name: '12 x 12 clay', area: 79, fits: "up to ~790 in² opening" },
    { name: '12 x 16 clay', area: 108, fits: "up to ~1,080 in² opening" },
    { name: '16 x 16 clay', area: 142, fits: "up to ~1,420 in² opening" },
  ];
  const maxA = 142;
  return (
    <svg viewBox="0 0 680 296" width="100%" height="auto" role="img" aria-label="Net flue area of clay liners: 8 by 8 is 33 square inches, 8 by 12 is 51, 12 by 12 is 79, 12 by 16 is 108, 16 by 16 is 142 square inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Net area of standard clay flue liners</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Nominal size is the outside. What matters is the net inside area, which is a lot smaller.</text>
      {liners.map((l, i) => {
        const y = 74 + i * 42;
        const w = (l.area / maxA) * 290;
        return (
          <g key={l.name}>
            <text x="146" y={y + 13} textAnchor="end" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>{l.name}</text>
            <rect x="158" y={y} width={w} height="18" rx="3" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={158 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{l.area} in&#178;</text>
            <text x="158" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{l.fits}</text>
          </g>
        );
      })}
      <text x="20" y="290" fontSize="9" fill={GUIDE_SVG.inkFaint}>A nominal 12 x 12 liner has roughly 79 square inches inside, not 144. Sizing off the nominal number oversizes every flue.</text>
    </svg>
  );
}

function AnatomySVG() {
  const parts = [
    { y: 96, label: "Cap", note: "keeps rain, birds, and embers out of the flue" },
    { y: 128, label: "Crown", note: "sloped concrete wash that sheds water off the top" },
    { y: 160, label: "Chase cover", note: "the metal lid on a framed prefab chimney" },
    { y: 192, label: "Flashing", note: "step and counter flashing where it meets the roof" },
    { y: 224, label: "Cricket", note: "a small peaked roof on the upslope side" },
    { y: 256, label: "Damper", note: "throat or top-sealing, closes the flue when cold" },
  ];
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="Chimney anatomy: cap, crown, chase cover, flashing, cricket, and damper, listed with what each one does.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The parts above the roofline</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Nearly every chimney leak traces to one of the top four</text>

      <rect x="52" y="84" width="66" height="150" fill={GUIDE_SVG.warm} opacity="0.22" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <rect x="44" y="76" width="82" height="10" fill={GUIDE_SVG.inkMuted} opacity="0.5" />
      <rect x="66" y="58" width="38" height="18" rx="2" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <path d="M 16 246 L 150 196 L 150 246 Z" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.2" />
      <text x="83" y="266" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>roof slope</text>

      {parts.map((p, i) => (
        <g key={p.label}>
          <circle cx="196" cy={p.y - 4} r="4" fill={i < 4 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
          <text x="210" y={p.y} fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>{p.label}</text>
          <text x="322" y={p.y} fontSize="10" fill={GUIDE_SVG.inkFaint}>{p.note}</text>
        </g>
      ))}
      <text x="20" y="290" fontSize="9" fill={GUIDE_SVG.inkFaint}>A cricket is required by IRC R1003.20 whenever the chimney is wider than 30 inches across the slope.</text>
    </svg>
  );
}

export function ChimneyCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="IRC 2021 Table R1003.11.1 flue areas, IRC R1003.9 chimney termination, NFPA 211, ASTM C315 clay liner specification"
      />

      <h2>A flue is sized as a fraction of the opening it serves</h2>
      <p>
        Chimney sizing has one governing idea: the flue has to carry what
        the firebox produces, and the code expresses that as a simple
        ratio of the fireplace opening. A round flue needs at least one
        twelfth of the opening area. A square or rectangular liner needs
        one tenth. A tall rectangular liner, where one side is twice the
        other or more, needs one eighth. Those three fractions, from IRC
        Table R1003.11.1, decide almost every masonry fireplace flue in
        the country.
      </p>
      <p>
        Wood stoves work differently and more simply: match the
        appliance&apos;s flue collar, which is 6 inches on most residential
        stoves, and resist every instinct to go bigger. The calculator
        above handles both paths. This page carries the flue size chart,
        the net areas of standard liners, the 3-2-10 height rule, and the
        reasons a correctly sized chimney still smokes into the room.
      </p>

      <Figure
        number={1}
        caption="The worked version of the most common question. A 36 by 30 opening is 1,080 square inches, which needs a 12 inch round or a 12 by 16 rectangular liner. Round wins on area because smoke moves through a circle without stalling in corners."
      >
        <FlueRatioSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Flue area ratios follow IRC 2021 Table R1003.11.1: one twelfth
          of the fireplace opening for round liners, one tenth for square
          and rectangular liners with a side ratio under 2, and one eighth
          for ratios of 2 or more. Height requirements follow IRC R1003.9,
          the 3-2-10 rule. Liner net areas reflect standard clay liners
          made to ASTM C315. Appliance venting practice follows NFPA 211.
          A listed appliance&apos;s own installation instructions override
          all of it, and the IRC says so explicitly.
        </p>
      </MethodologyNote>

      <h2>The chimney flue size chart</h2>

      <ComparisonTable
        caption="Minimum flue for a masonry fireplace by opening size. Openings are width times height of the finished firebox face. When a size lands between two liners, go up, never down."
        columns={[
          { title: "Opening area" },
          { title: "Round liner", highlight: true },
          { title: "Rectangular liner" },
        ]}
        rows={[
          { label: '24 x 24 in', values: ["576 in²", '8 in round', '8 x 12'] },
          { label: '30 x 26 in', values: ["780 in²", '10 in round', '12 x 12'] },
          { label: '36 x 30 in', values: ["1,080 in²", '12 in round', '12 x 16'] },
          { label: '42 x 32 in', values: ["1,344 in²", '12 in round', '16 x 16'] },
          { label: '48 x 32 in', values: ["1,536 in²", '15 in round', '16 x 16'] },
          { label: '60 x 34 in', values: ["2,040 in²", '15 in round', '16 x 20'] },
        ]}
      />

      <p>
        Two readings people miss. The nominal liner size is the outside
        dimension, and the number that matters is the net area inside: a
        nominal 12 by 12 clay liner has about 79 square inches of opening,
        not 144. And the ratio is a minimum, not a target. Doubling the
        flue area does not double the draft; it slows the smoke, lets it
        cool, and deposits creosote on the way up, which is why an
        oversized flue is a genuine defect rather than a harmless
        overbuild.
      </p>

      <Figure
        number={2}
        caption="Net inside area of the standard clay liners. This is the chart to price a rebuild from, because the mason orders by nominal size and the code checks the net area."
      >
        <LinerAreaSVG />
      </Figure>

      <h2>Wood stoves: match the collar, then stop</h2>
      <p>
        A wood stove is a closed appliance with a known output, so it does
        not use the fireplace ratios at all. The rule is to vent it to the
        diameter of its own flue collar, which is 6 inches on the large
        majority of residential stoves, 7 or 8 inches on larger units. The
        manufacturer&apos;s instructions are the governing document, and
        NFPA 211 permits a modest increase in some situations but never an
        arbitrary one.
      </p>
      <p>
        This is where the most expensive chimney mistake in the country
        happens. A homeowner installs a 6 inch stove into an existing
        masonry chimney built for an open fireplace, with a 12 by 12 clay
        liner at 79 square inches against the stove&apos;s 28. The flue
        gas from a modern efficient stove is far cooler than an open
        fire&apos;s, and in a cavern that size it cools further, stalls,
        and condenses into creosote at a rate that produces a chimney fire
        risk within a season. The correct fix is a 6 inch stainless liner
        run inside the masonry chimney, insulated, from the stove to the
        top. It costs $1,500 to $3,500 installed and it is not optional.
      </p>

      <Figure
        number={3}
        caption="Both conditions have to be satisfied at once. On a steep roof the 2 foot rule usually governs and pushes the chimney far above the 3 foot minimum."
      >
        <Rule3210SVG />
      </Figure>

      <h2>Height, and why draft is not just height</h2>
      <p>
        The termination rule, IRC R1003.9, is easy to state: a chimney
        must extend at least 3 feet above the point where it passes
        through the roof, and at least 2 feet above any part of the
        building within 10 feet measured horizontally. Both apply, and
        whichever produces the taller chimney is the answer. On a low
        slope roof the 3 foot minimum usually governs; on a steep roof
        near the ridge, the 2 foot rule can add several more feet.
      </p>
      <p>
        Draft itself comes from the temperature difference between the
        flue gases and the outside air, multiplied by height. That is why
        the same chimney drafts hard in January and lazily in October, and
        why a chimney under about 15 feet of total height from the firebox
        struggles no matter how well it passes 3-2-10. It also explains
        the exterior chimney problem: a flue running up an outside wall
        loses heat to the outdoors on all sides, so it starts cold, stays
        cooler, and drafts worse than an identical flue running through
        the middle of the house.
      </p>

      <h2>Liner types and what they cost</h2>

      <ComparisonTable
        caption="Installed cost for a typical two-story chimney. Stainless liners carry a listing to UL 1777 and are the standard answer for relining an existing masonry chimney."
        columns={[
          { title: "Installed cost" },
          { title: "Life" },
          { title: "Best for", highlight: true },
        ]}
        rows={[
          { label: "Clay tile", values: ["$2,500-6,000", "40-50 yr", "New masonry chimneys built from scratch"] },
          { label: "Stainless, rigid", values: ["$2,000-4,500", "20 yr+", "Straight runs, wood stoves"] },
          { label: "Stainless, flexible", values: ["$1,500-3,500", "15-20 yr", "Offset chimneys, relining without demo"] },
          { label: "Cast-in-place", values: ["$4,000-10,000", "50 yr", "Structurally weak old chimneys"] },
          { label: "Aluminum", values: ["$800-1,800", "10-15 yr", "Gas appliances only, never wood"] },
        ]}
      />

      <p>
        One line in that table is a safety rule rather than a preference:
        aluminum liners are for gas appliances only. Wood and coal produce
        flue temperatures and acids that destroy aluminum, and a wood
        stove vented into an aluminum liner is a chimney fire waiting for
        a cold night.
      </p>

      <Scenario location="Burlington, VT">
        <p>
          A 1920s house with an exterior masonry chimney and a 12 by 12
          clay liner, originally serving an open fireplace with a 36 by 28
          inch opening. The owner is installing a 6 inch wood stove into
          the fireplace opening. Chimney height above the firebox: 22
          feet. Roof penetration is 4 feet down-slope from the ridge.
        </p>
        <p>
          Height check first: 3 feet above the roof penetration, and 2
          feet above the ridge, which on this roof pitch works out to
          about 3 feet 8 inches. The 2 foot rule governs, so the chimney
          gets built to the taller number. Flue check: the stove needs 28
          square inches and the existing liner offers 79, so the masonry
          flue is nearly three times too large for it. A 6 inch insulated
          stainless flexible liner runs the full 22 feet, quoted at
          $2,900. In a Vermont winter that insulation earns its keep
          twice, since an exterior chimney on the north wall would
          otherwise run cold all season and lay down creosote on every
          low burn.
        </p>
      </Scenario>

      <h2>Caps, crowns, flashing: the parts that actually leak</h2>
      <p>
        Sizing decides whether a chimney drafts. The hardware on top
        decides whether it leaks, and water is what destroys chimneys.
        Freeze-thaw cycling on saturated masonry spalls brick, rusts
        dampers, and cracks crowns, and almost every one of those failures
        starts with a missing or failed component you can see from the
        ground with binoculars.
      </p>

      <Figure
        number={4}
        caption="Six parts, four of which are the usual suspects in a leak. On a masonry chimney the crown is the concrete wash on top; on a framed prefab chimney the equivalent is a metal chase cover."
      >
        <AnatomySVG />
      </Figure>

      <ComparisonTable
        caption="Typical 2026 installed costs. A cap is the cheapest preventive spend on the whole house relative to what water damage costs."
        columns={[
          { title: "What it does" },
          { title: "Installed cost", highlight: true },
          { title: "Failure sign" },
        ]}
        rows={[
          { label: "Chimney cap", values: ["Blocks rain, animals, and embers", "$150-500", "Rust streaks, nesting, rain in the firebox"] },
          { label: "Multi-flue cap", values: ["One cap over several flues", "$400-1,200", "Same, on a chimney with two or more liners"] },
          { label: "Crown", values: ["Sloped wash sheds water off the top", "$300-1,500", "Cracks, missing overhang, spalled brick below"] },
          { label: "Chase cover", values: ["Metal lid on a framed prefab chase", "$400-1,200", "Standing water, rust, staining down the siding"] },
          { label: "Flashing", values: ["Seals the roof-to-chimney joint", "$500-1,500", "Ceiling stains near the chimney after rain"] },
          { label: "Cricket", values: ["Diverts water around the upslope side", "$300-800", "Debris and ice piling behind the chimney"] },
        ]}
      />

      <p>
        Four things worth knowing about that list. A stainless steel cap
        outlasts a galvanized one by decades for perhaps $60 more, and
        copper costs more than either while doing the same job; on a cap
        this is one of the rare cases where the upgrade is obviously
        worth it. A crown is not a mortar smear, which is what most
        failed crowns turn out to be; a proper one is cast concrete with
        an overhang and a drip edge so water leaves the chimney instead
        of running down the brick. Flashing is two layers, step flashing
        woven into the shingles and counter flashing let into the mortar
        joint, and roofers who caulk over the joint instead are buying
        you about two years. And a cricket is code, not an upgrade: IRC
        R1003.20 requires one whenever the chimney measures more than 30
        inches across the slope and does not sit on the ridge.
      </p>
      <p>
        Dampers get their own note because they interact with everything
        on this page. A traditional throat damper sits just above the
        firebox and warps, rusts, and seals badly with age; a top-sealing
        damper mounts at the top of the flue with a gasket and a cable
        down to the firebox, seals far better, and keeps the flue warmer
        between fires, which helps the cold-start draft problem described
        below. It runs $250 to $600 installed and doubles as a rain cap.
      </p>

      <h2>Why a correctly sized chimney still smokes</h2>
      <p>
        <strong>The house is winning.</strong> Modern tight houses,
        bathroom fans, range hoods, and dryers all pull air out, and a
        fireplace needs makeup air to draw. If the fire smokes when the
        kitchen hood runs, that is the diagnosis, and cracking a window
        near the fireplace confirms it in thirty seconds.
      </p>
      <p>
        <strong>Cold flue, stalled column.</strong> A cold chimney holds a
        plug of dense air that the first smoke cannot push through.
        Warming the flue with a rolled newspaper torch held up in the
        damper opening for a minute solves it, and top-sealing dampers
        prevent it by keeping the flue warmer between fires.
      </p>
      <p>
        <strong>Opening enlarged, flue not.</strong> Someone removes the
        original firebox surround or opens the face, and the ratio that
        used to work no longer does. Enlarging a fireplace opening without
        resizing the flue is the most common cause of a fireplace that
        used to draw fine and suddenly does not.
      </p>
      <p>
        <strong>Oversized flue.</strong> Covered above, and worth
        repeating because the instinct runs the other way. Bigger is not
        better in a chimney. It is the single most common misconception in
        this subject.
      </p>

      <Callout label="The annual inspection is the real safety control">
        CSIA and NFPA 211 both call for a chimney inspection every year
        and cleaning as needed. Creosote accumulation is the mechanism
        behind residential chimney fires, and it builds fastest in exactly
        the conditions this page describes: oversized flues, exterior
        chimneys, cool-burning modern stoves, and unseasoned wood.
        Inspections come in three levels: Level 1 is a visual check of
        accessible parts on an unchanged system, Level 2 adds a camera
        scan of the full flue and is required whenever the appliance
        changes or the house is sold, and Level 3 involves opening up
        concealed construction when a serious hazard is suspected. If you
        are putting a stove into an old fireplace, Level 2 is the one you
        want, and it typically runs $200 to $500.
      </Callout>

      <h2>The rest of the masonry</h2>
      <p>
        A chimney rebuild is a masonry project first. The{" "}
        <a href="/brick-calculator">brick calculator</a> counts the brick
        for a stack or a crown rebuild, the{" "}
        <a href="/mortar-calculator">mortar calculator</a> covers the bags
        and sand for the joints, and a chimney footing below frost depth
        runs through the{" "}
        <a href="/concrete-calculator">concrete calculator</a>. If the
        chimney work is happening alongside a roof, the{" "}
        <a href="/roofing-calculator">roofing calculator</a> handles the
        squares around the new flashing.
      </p>
      <p>
        Measure the opening, run it through the calculator above, then
        check the height against 3-2-10. Those two numbers settle most of
        what a chimney contractor will ask you.
      </p>
    </>
  );
}
