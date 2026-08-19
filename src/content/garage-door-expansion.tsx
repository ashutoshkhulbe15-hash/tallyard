import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function ClearanceSVG() {
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="Garage door clearances: 12 inches of headroom above the opening for standard track, 3-3/4 inches of side room each side, and backroom equal to door height plus 18 inches, or plus 4 feet with an opener.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The three clearances that decide which track fits</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Measured from the finished opening, not the framing. Check all three before ordering.</text>

      <rect x="70" y="120" width="230" height="145" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="185" y="198" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>door opening</text>
      <line x1="70" y1="265" x2="300" y2="265" stroke={GUIDE_SVG.inkMuted} strokeWidth="2" />

      <line x1="70" y1="80" x2="300" y2="80" stroke={GUIDE_SVG.line} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="185" y1="82" x2="185" y2="118" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="195" y="105" fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.accent}>headroom 12&quot;</text>
      <text x="70" y="72" fontSize="9" fill={GUIDE_SVG.inkFaint}>ceiling or nearest obstruction</text>

      <line x1="34" y1="180" x2="68" y2="180" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="30" y="168" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={GUIDE_SVG.warm}>side</text>
      <text x="30" y="196" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={GUIDE_SVG.warm}>3-3/4&quot;</text>

      <g fontSize="11">
        <text x="360" y="96" fontWeight="600" fill={GUIDE_SVG.ink}>Headroom</text>
        <text x="360" y="114" fill={GUIDE_SVG.inkMuted}>12 in standard track</text>
        <text x="360" y="130" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>Low-headroom kit works at 4-1/2 in;</text>
        <text x="360" y="144" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>a wall-mount opener needs none above.</text>

        <text x="360" y="180" fontWeight="600" fill={GUIDE_SVG.ink}>Side room</text>
        <text x="360" y="198" fill={GUIDE_SVG.inkMuted}>3-3/4 in each side, minimum</text>
        <text x="360" y="214" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>5-1/2 in if the track gets a jamb bracket.</text>

        <text x="360" y="250" fontWeight="600" fill={GUIDE_SVG.ink}>Backroom</text>
        <text x="360" y="268" fill={GUIDE_SVG.inkMuted}>door height + 18 in</text>
        <text x="360" y="284" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>Add about 4 ft total when an opener rides the ceiling.</text>
      </g>
    </svg>
  );
}

function WeightSVG() {
  const doors = [
    { name: "Single 9x7 steel", lb: 95, note: "non-insulated, 25 gauge" },
    { name: "Single 9x7 insulated", lb: 130, note: "polyurethane core" },
    { name: "Double 16x7 steel", lb: 155, note: "the common two-car door" },
    { name: "Double 16x7 insulated", lb: 210, note: "R-12 to R-18" },
    { name: "Double 16x7 wood", lb: 375, note: "carriage or overlay" },
  ];
  const maxLb = 375;
  return (
    <svg viewBox="0 0 680 306" width="100%" height="auto" role="img" aria-label="Garage door weight: single 9 by 7 steel about 95 pounds, insulated single 130, double 16 by 7 steel 155, insulated double 210, wood double 375 pounds.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What a garage door weighs</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Weight sets the spring size and the opener rating. It is the number nobody asks for until the door will not lift.</text>
      {doors.map((d, i) => {
        const y = 74 + i * 42;
        const w = (d.lb / maxLb) * 300;
        return (
          <g key={d.name}>
            <text x="192" y={y + 13} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{d.name}</text>
            <rect x="204" y={y} width={w} height="18" rx="3" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={204 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{d.lb} lb</text>
            <text x="204" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{d.note}</text>
          </g>
        );
      })}
      <text x="20" y="300" fontSize="9" fill={GUIDE_SVG.inkFaint}>Springs carry the weight, not the opener. A correctly balanced door lifts with two fingers at any height.</text>
    </svg>
  );
}

function SizeGridSVG() {
  const sizes = [
    { w: 8, label: '8 x 7', fit: "compact car, workshop" },
    { w: 9, label: '9 x 7', fit: "the standard single" },
    { w: 10, label: '10 x 8', fit: "pickup, roof rack" },
    { w: 16, label: '16 x 7', fit: "the standard double" },
  ];
  return (
    <svg viewBox="0 0 680 214" width="100%" height="auto" role="img" aria-label="Standard garage door sizes drawn to scale: 8 by 7 and 9 by 7 singles, 10 by 8 tall single, and 16 by 7 double.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Standard sizes, drawn to scale</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Widths step in 1 ft or 2 ft; heights are 7 or 8 ft. Anything else is a special order.</text>
      {sizes.map((s, i) => {
        const scale = 9.5;
        const x = 45 + i * 160;
        const h = (s.label.endsWith("8") ? 8 : 7) * scale;
        const w = s.w * scale;
        return (
          <g key={s.label}>
            <rect x={x} y={164 - h} width={w} height={h} fill={i === 3 ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.cool} strokeWidth="1.5" />
            <line x1={x} y1="166" x2={x + w} y2="166" stroke={GUIDE_SVG.inkMuted} strokeWidth="1.5" />
            <text x={x + w / 2} y="186" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.ink}>{s.label} ft</text>
            <text x={x + w / 2} y="202" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.fit}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function GarageDoorCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="ANSI/DASMA 102 residential door specification, ANSI/DASMA 108 wind load, IRC 2021 Table R602.7(1) header spans, UL 325 opener entrapment protection"
      />

      <h2>The door is the easy part. The three clearances are not.</h2>
      <p>
        Garage doors come in a short list of standard sizes, and almost
        every American garage takes one of four: 8x7 or 9x7 for a single,
        10x8 when a pickup lives inside, 16x7 for a two-car opening. That
        part takes thirty seconds. What sends people back to the supplier
        is the space around the opening, because a door that fits the hole
        can still be impossible to install. Standard track needs 12 inches
        of headroom above the opening, 3-3/4 inches of side room on each
        side, and backroom equal to the door height plus 18 inches, which
        grows to roughly the door height plus four feet once an opener
        hangs from the ceiling.
      </p>
      <p>
        The calculator above checks your opening against all of it and
        tells you which track style you need. This page covers the size
        chart, the clearances in detail, what a door actually weighs, the
        header span question that comes up on every new opening, and how
        to size an opener without paying for horsepower you cannot use.
      </p>

      <Figure
        number={1}
        caption="Sizes drawn to scale. The 16x7 double is roughly twice the panel area of a 9x7 single, which is why it needs a different spring, a stronger opener, and a header that usually cannot be solid lumber."
      >
        <SizeGridSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Size and clearance figures follow ANSI/DASMA 102, the residential
          sectional door specification, and DASMA technical data sheets on
          headroom and backroom. Header guidance references IRC 2021 Table
          R602.7(1). Opener safety requirements follow UL 325, which has
          mandated photo-eye entrapment protection on residential openers
          since 1993. Wind load ratings follow ANSI/DASMA 108. Costs
          reflect typical 2026 US installed pricing and vary by region and
          door line.
        </p>
      </MethodologyNote>

      <h2>The garage door size chart</h2>

      <ComparisonTable
        caption="Standard residential sizes. The rough framed opening matches the door size: a 16x7 door goes in a 16 ft by 7 ft finished opening, with the header above it."
        columns={[
          { title: "Door size (w x h)" },
          { title: "Fits", highlight: true },
          { title: "Typical use" },
        ]}
        rows={[
          { label: "Single, standard", values: ['8 x 7 or 9 x 7 ft', "One car", "The default single bay"] },
          { label: "Single, tall", values: ['9 x 8 or 10 x 8 ft', "Pickup, roof box", "Trucks and SUVs with racks"] },
          { label: "Single, oversized", values: ['10 x 10 or 12 x 12 ft', "RV, boat, van", "Detached shops and RV bays"] },
          { label: "Double, standard", values: ['16 x 7 ft', "Two cars", "The most common two-car door"] },
          { label: "Double, tall", values: ['16 x 8 or 18 x 8 ft', "Two trucks", "Wider or taller two-car bays"] },
        ]}
      />

      <p>
        On rough opening: for a sectional garage door, the rough framed
        opening is the door size. A 16x7 door goes into a 16 foot by 7
        foot finished opening, and unlike a window or an entry door you
        do not add clearance around it. The jambs are attached inside the
        rough opening and the door seals against them, which is why
        ordering by the old panel dimension instead of the opening is the
        error that comes up below.
      </p>
      <p>
        Two things about that chart. Widths step in one foot increments
        through the singles and two feet across the doubles, so 9x7 and
        16x7 are stocked everywhere while 11x7 is a special order at a 20
        to 40 percent premium and a multi-week lead time. And door height
        is not the same as the ceiling: the door needs its own headroom
        above the opening, so an 8 foot door in a garage with a 9 foot
        ceiling leaves exactly 12 inches, which is the standard track
        minimum with nothing to spare.
      </p>

      <Figure
        number={2}
        caption="Measure all three before ordering anything. Headroom is the one that kills installations, and it is measured to the lowest obstruction, which is often a light fixture or a sprinkler line rather than the ceiling."
      >
        <ClearanceSVG />
      </Figure>

      <h2>When you do not have the clearance</h2>
      <p>
        Low headroom is the most common installation surprise, and it has
        three fixes at three prices. A low-headroom track kit uses a double
        horizontal track and works down to about 4-1/2 inches, adding $100
        to $250. A high-lift conversion, which raises the door higher
        before it turns horizontal, suits shops with tall ceilings and a
        car lift. And a wall-mount, or jackshaft, opener mounts beside the
        torsion shaft rather than on the ceiling, freeing the entire
        overhead area; it runs $350 to $600 versus $200 to $350 for a
        standard opener, and it is the right answer in any garage where
        storage or a lift is planned above the door.
      </p>
      <p>
        Side room is less flexible. Below about 3-3/4 inches per side,
        there is nowhere to mount the vertical track, and the framing has
        to change. Backroom shortfalls are rarer, but a garage that is
        shallow front to back can leave the open door hanging over the
        parked car; measure from the opening straight back and confirm the
        door height plus 18 inches of clear ceiling before ordering, plus
        the opener rail if it is ceiling mounted.
      </p>

      <Figure
        number={3}
        caption="Weight is what the springs are sized against. Replacing a non-insulated door with an insulated one on the same springs is the classic mistake: the old springs are now undersized, and the door slams."
      >
        <WeightSVG />
      </Figure>

      <h2>Weight, springs, and why balance matters more than the opener</h2>
      <p>
        A two-car steel door weighs about 155 pounds bare and 210 or more
        insulated; a wood carriage door of the same size can pass 375. The
        answer people expect to that question is the opener, and it is
        wrong. Torsion springs carry essentially all of the weight. The
        opener only overcomes friction and gets the door moving, which is
        why a properly balanced door stays put when you lift it halfway by
        hand and let go. If it drops or flies up, the springs are wrong for
        the weight, and no opener upgrade fixes that.
      </p>
      <p>
        This matters most on replacement. Swapping a bare steel door for an
        insulated one adds 50 to 60 pounds, and the existing springs were
        wound for the old weight. Any reputable installer re-springs with
        the door; if a quote does not mention springs, ask before signing.
        Springs are also rated in cycles: 10,000 cycles is standard, 20,000
        or 25,000 cycle springs cost $50 to $150 more and roughly double
        the service life, which is worth it on a door opened four times a
        day.
      </p>

      <h2>How a garage door spring is specified</h2>
      <p>
        Spring sizing is a real calculation, and knowing the spec is
        useful even though the winding itself is not homeowner work. A
        torsion spring is described by four numbers: wire diameter,
        inside diameter, overall length, and wind direction. Wire
        diameter runs from about 0.207 to 0.283 inches on residential
        doors and is the number that does the most work; inside diameter
        is almost always 1-3/4, 2, or 2-1/4 inches; length grows with
        door weight and height. The pair together has to deliver enough
        inch-pounds per turn to lift the door weight through the drum
        radius, which is the actual physics under every spring chart.
      </p>
      <p>
        Measuring an existing spring is straightforward and worth doing
        before you call anyone. Wire diameter: measure across 20 tightly
        wound coils and divide by 20, which is far more accurate than
        measuring one coil. Inside diameter is stamped on the stationary
        cone on most springs. Length is the coiled portion only, not
        including the cones. Wind direction matters because a door
        usually has one spring of each hand, and the cones are color
        coded, though the convention varies enough between manufacturers
        that it is worth confirming rather than assuming. Extension
        springs, the kind that run along the horizontal tracks on older
        doors, are simpler: they are rated by the door weight they lift,
        and DASMA color codes them in 10 pound steps.
      </p>
      <p>
        The rule that turns weight into spring: the springs must balance
        the door, so a 210 pound insulated door needs meaningfully more
        spring than the 155 pound bare steel door it replaced. Cycle
        rating is the other lever. A standard spring is rated 10,000
        cycles, which is roughly seven years at four openings a day.
        High-cycle springs at 25,000 cycles cost $50 to $150 more per
        pair and last two to three times as long, which is the better
        buy on any door that also serves as the main entrance to the
        house.
      </p>

      <h2>Door styles, insulation, and what they cost</h2>
      <p>
        Replacement cost splits into three line items that quotes often
        blur together: the door itself, installation labor, and the
        hardware that comes with it. The table below is installed cost,
        meaning door plus labor. Installation alone runs $200 to $500 for
        a straightforward single and $300 to $700 for a double, so if one
        quote looks far below another, check whether it includes labor,
        haul-away of the old door, and new springs sized to the new
        door&apos;s weight.
      </p>

      <ComparisonTable
        caption="Installed cost for a 16x7 double door, 2026 US averages. Single doors run roughly 55 to 65 percent of these figures."
        columns={[
          { title: "Installed cost" },
          { title: "R-value" },
          { title: "Upkeep", highlight: true },
        ]}
        rows={[
          { label: "Steel, non-insulated", values: ["$1,000-1,800", "R-0", "None; dents easily"] },
          { label: "Steel, polystyrene core", values: ["$1,400-2,600", "R-6 to R-9", "None"] },
          { label: "Steel, polyurethane core", values: ["$1,800-3,500", "R-12 to R-18", "None; quietest"] },
          { label: "Aluminum and glass", values: ["$2,500-6,000", "R-0 to R-6", "Clean the glass"] },
          { label: "Carriage or wood overlay", values: ["$3,000-8,000", "R-6 to R-12", "Refinish every 3-5 years"] },
          { label: "Solid wood", values: ["$4,000-10,000+", "R-2 to R-5", "Refinish every 2-3 years"] },
        ]}
      />

      <p>
        On insulation, the honest version: an uninsulated garage door is
        usually the largest uninsulated surface in the house, and upgrading
        it is the easiest single improvement to a cold garage. But the
        payoff depends entirely on whether the garage itself is sealed and
        whether it shares walls or a floor with living space. In an
        attached garage under a bedroom, a polyurethane door in the R-12 to
        R-18 range is money well spent and noticeably quieter. In a
        detached, uninsulated shell with gaps around the frame, an R-18
        door buys very little, and the weather seal and the walls should
        come first. Polyurethane outperforms polystyrene at the same
        thickness because it is foamed in place and bonds the panel skins
        together, which is also why those doors feel more solid and rattle
        less.
      </p>

      <h2>The header above the opening</h2>
      <p>
        Every garage door opening is a hole in a load-bearing wall, and the
        header carries whatever the wall was carrying. IRC Table R602.7(1)
        gives prescriptive spans for solid-sawn headers, and the practical
        reading of it is this: single-door openings around 8 or 9 feet can
        often be spanned with doubled 2x10s or 2x12s depending on the load
        above and the snow load in your area, while a 16 or 18 foot
        double-door opening is almost always past what dimensional lumber
        can do and needs an engineered beam, usually LVL. That is not a
        detail to eyeball, and it is the one part of a garage door project
        where the wrong answer sags a roof rather than annoying you.
      </p>
      <p>
        If you are replacing a door in an existing opening, the header is
        already there and none of this applies. If you are widening an
        opening, cutting a new one, or building a garage, the header size
        comes from the code table for your actual snow load, wall height,
        and what stacks above it, and any wide opening should be sized by
        the truss supplier, the lumberyard design desk, or an engineer. The
        permit will require it anyway.
      </p>

      <h2>Sizing the opener</h2>
      <p>
        Openers are rated two ways now, and the old horsepower numbers are
        the less useful of them. The working rules: 1/2 HP handles a
        standard single steel door, 3/4 HP is the right default for any
        16 foot double, and 1 HP or better belongs on insulated doubles,
        wood doors, and any door taller than 8 feet. Newer DC openers list
        a force rating instead and often pair a lower nominal horsepower
        with more usable lifting force, so compare within a brand rather
        than across the label.
      </p>
      <p>
        Drive type matters more than the horsepower number for how you
        experience it. Belt drives are the quiet option and the obvious
        choice under a bedroom. Chain drives cost $50 to $100 less and are
        louder. Wall-mount jackshaft units are quietest of all and free the
        ceiling. Every opener sold in the US since 1993 must have photo-eye
        entrapment protection under UL 325, and if the eyes on an existing
        opener are missing or misaligned, that is a safety defect to fix
        rather than a nuisance to bypass. Battery backup is worth the $50
        to $100 in any area with outages, since a door with a dead opener
        and a torsion spring under load is not something to wrestle in the
        dark.
      </p>

      <Scenario location="Kansas City, MO">
        <p>
          A 1990s attached two-car garage with a bedroom above. The
          existing door is a bare steel 16x7 with a chain opener that wakes
          the house. Measured clearances: 13 inches of headroom, 6 inches
          of side room, 22 feet of backroom. Everything clears standard
          track.
        </p>
        <p>
          The replacement is a polyurethane-core insulated steel 16x7 at
          R-16. Door and installation quote at $2,400, plus new springs at
          25,000 cycles for $180, since the new door lands near 210 pounds
          against the old door&apos;s 155 and the original springs would be
          badly undersized. A belt-drive 3/4 HP opener with battery backup
          adds $520 installed. Total: about $3,100. The room above the
          garage is the reason two of those three line items are worth
          paying for; in a detached shop, the same money would go to a bare
          steel door and wall insulation instead.
        </p>
      </Scenario>

      <h2>Where garage door projects go wrong</h2>
      <p>
        <strong>Measuring the door instead of the opening.</strong> Order
        by finished opening width and height. A 16x7 door fits a 16 by 7
        foot opening; the panel itself is slightly larger and overlaps the
        jambs by design. Measuring the old door panel and ordering that
        size gets you a door too small for the hole.
      </p>
      <p>
        <strong>Forgetting what hangs from the ceiling.</strong> Headroom
        is measured to the lowest thing above the opening. A light fixture,
        a gas line, a sprinkler head, or a garage door opener rail from a
        previous install all count, and installers discover them on the day.
      </p>
      <p>
        <strong>Reusing springs on a heavier door.</strong> Covered above,
        and worth repeating because it is the most common way a brand new
        door ends up slamming shut and burning out an opener within a year.
      </p>
      <p>
        <strong>Ignoring wind load requirements.</strong> Coastal counties
        and much of Florida and the Gulf require doors rated to a specific
        design pressure under ANSI/DASMA 108, and a standard door will fail
        inspection there. A garage door is the largest opening in the house
        and the one hurricanes exploit first; the rating is on a label on
        the door, and if the quote does not mention it in a rated
        jurisdiction, the quote is wrong.
      </p>

      <Callout label="Torsion springs are the one part to leave alone">
        The spring above your door stores enough energy to break bones, and
        winding cones under load are the reason garage door repair carries
        the injury statistics it does. Replacing panels, weather seal,
        rollers, or an opener is reasonable homeowner work. Adjusting or
        replacing torsion springs is not, regardless of how many videos
        make it look manageable. This is a $150 to $350 service call, and
        it is the cheapest safety decision in the project.
      </Callout>

      <h2>The rest of the garage</h2>
      <p>
        A door replacement often travels with the rest of the bay. Framing
        a new or widened opening runs through the{" "}
        <a href="/stud-spacing-calculator">stud spacing calculator</a>, a
        new or extended slab is the{" "}
        <a href="/concrete-calculator">concrete calculator</a>&apos;s job,
        and if the door upgrade is part of making the space usable
        year-round, the{" "}
        <a href="/insulation-calculator">insulation calculator</a> covers
        the walls and ceiling that have to come with it. The opener circuit
        is a{" "}
        <a href="/wire-size-calculator">wire size calculator</a> question.
      </p>
      <p>
        Measure the opening, then measure the three clearances, then run
        the calculator above. In that order, the supplier conversation
        takes five minutes and produces a door that actually goes in.
      </p>
    </>
  );
}
