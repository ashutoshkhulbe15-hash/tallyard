import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SizeScaleSVG() {
  const sizes = [
    { w: 24, label: "24 in", note: "powder" },
    { w: 30, label: "30 in", note: "common" },
    { w: 36, label: "36 in", note: "roomier" },
    { w: 48, label: "48 in", note: "big single" },
    { w: 60, label: "60 in", note: "double min" },
    { w: 72, label: "72 in", note: "true double" },
  ];
  const scale = 1.5;
  let cursor = 32;
  const placed = sizes.map((s) => {
    const x = cursor;
    cursor += s.w * scale + 22;
    return { ...s, x, wpx: s.w * scale };
  });
  return (
    <svg viewBox="0 0 680 206" width="100%" height="auto" role="img" aria-label="Standard bathroom vanity widths drawn to scale in plan view: 24, 30, 36, 48, 60, and 72 inches. Double sinks start at 60 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Standard vanity widths, drawn to scale</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Seen from above. Depth is 21 in and height 32 or 36 in on nearly all of them. Width is the choice.</text>
      {placed.map((s) => {
        const isDouble = s.w >= 60;
        return (
          <g key={s.label}>
            <rect x={s.x} y={100} width={s.wpx} height={32} fill={isDouble ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={isDouble ? GUIDE_SVG.accent : GUIDE_SVG.cool} strokeWidth="1.5" />
            {isDouble ? (
              <>
                <circle cx={s.x + s.wpx * 0.27} cy={116} r="9" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="1.2" />
                <circle cx={s.x + s.wpx * 0.73} cy={116} r="9" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="1.2" />
              </>
            ) : (
              <circle cx={s.x + s.wpx / 2} cy={116} r="9" fill="none" stroke={GUIDE_SVG.cool} strokeWidth="1.2" />
            )}
            <text x={s.x + s.wpx / 2} y="152" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={isDouble ? GUIDE_SVG.accent : GUIDE_SVG.ink}>{s.label}</text>
            <text x={s.x + s.wpx / 2} y="167" textAnchor="middle" fontSize="8.5" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
          </g>
        );
      })}
      <text x="20" y="198" fontSize="9" fill={GUIDE_SVG.inkFaint}>Widths also come in 18, 42, and 54 inches, but the six above are what sits in stock at any big box store.</text>
    </svg>
  );
}

function ClearanceSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Vanity clearances in plan view: 15 inches minimum from the sink centerline to a side wall, 21 inches of clear floor space in front, and 30 inches between sink centerlines on a double vanity.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The clearances a bathroom actually needs</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Plan view. Code minimums from IRC R307.1; the roomier numbers are NKBA recommendations.</text>

      <line x1="60" y1="72" x2="140" y2="72" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="100" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>15 in min</text>

      <line x1="58" y1="84" x2="330" y2="84" stroke={GUIDE_SVG.inkMuted} strokeWidth="3" />
      <text x="336" y="88" fontSize="9" fill={GUIDE_SVG.inkFaint}>back wall</text>
      <line x1="58" y1="84" x2="58" y2="212" stroke={GUIDE_SVG.inkMuted} strokeWidth="3" />
      <text x="34" y="150" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} transform="rotate(-90,34,150)">side wall</text>

      <rect x="60" y="86" width="230" height="44" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <circle cx="140" cy="108" r="11" fill="none" stroke={GUIDE_SVG.cool} strokeWidth="1.3" />
      <line x1="140" y1="72" x2="140" y2="97" stroke={GUIDE_SVG.accent} strokeWidth="1" strokeDasharray="3 3" />

      <line x1="60" y1="196" x2="290" y2="196" stroke={GUIDE_SVG.warm} strokeWidth="1.2" strokeDasharray="4 4" />
      <line x1="180" y1="130" x2="180" y2="196" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="192" y="167" fontSize="10" fontWeight="700" fill={GUIDE_SVG.warm}>21 in clear</text>
      <text x="192" y="181" fontSize="9" fill={GUIDE_SVG.inkFaint}>floor in front</text>

      <g fontSize="10.5">
        <text x="400" y="120" fontWeight="600" fill={GUIDE_SVG.ink}>Centerline to side wall</text>
        <text x="400" y="138" fill={GUIDE_SVG.inkMuted}>15 in code, 20 in comfortable</text>
        <text x="400" y="164" fontWeight="600" fill={GUIDE_SVG.ink}>Clear floor in front</text>
        <text x="400" y="182" fill={GUIDE_SVG.inkMuted}>21 in code, 30 in comfortable</text>
        <text x="400" y="208" fontWeight="600" fill={GUIDE_SVG.ink}>Between two sink centerlines</text>
        <text x="400" y="226" fill={GUIDE_SVG.inkMuted}>30 in minimum, 36 in comfortable</text>
      </g>
      <text x="20" y="244" fontSize="9" fill={GUIDE_SVG.inkFaint}>A door that swings into the 21 inch zone is the most common clearance failure in a small bathroom remodel.</text>
    </svg>
  );
}

function DoubleThresholdSVG() {
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Why double sinks need 60 inches: two sinks need 30 inches between centerlines plus 15 inches from each centerline to the end, which totals 60 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Why a double sink needs 60 inches</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The arithmetic, not a manufacturer preference</text>

      <rect x="70" y="86" width="480" height="60" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <circle cx="190" cy="116" r="14" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="1.4" />
      <circle cx="430" cy="116" r="14" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="1.4" />

      <line x1="72" y1="166" x2="190" y2="166" stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="131" y="182" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.cool}>15 in</text>
      <line x1="190" y1="166" x2="430" y2="166" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="310" y="182" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.warm}>30 in between centerlines</text>
      <line x1="430" y1="166" x2="548" y2="166" stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="489" y="182" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.cool}>15 in</text>

      <text x="310" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>15 + 30 + 15 = 60 inches minimum</text>
      <text x="20" y="226" fontSize="9" fill={GUIDE_SVG.inkFaint}>At 72 in the spacing grows to 36 in between sinks, which is where two people stop bumping elbows.</text>
    </svg>
  );
}

export function VanityCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="IRC 2021 Section R307.1 fixture clearances, NKBA Bathroom Planning Guidelines, ICC A117.1 accessible design, KCMA/ANSI A161.1 cabinet standard"
      />

      <h2>Vanities come in six widths and one depth</h2>
      <p>
        Bathroom vanities are sold in a short list of widths: 24, 30, 36,
        48, 60, and 72 inches cover almost everything on a showroom floor,
        with 18, 42, and 54 available if you look. Depth is 21 inches on
        nearly all of them. Height is either 32 inches, the old standard,
        or 36 inches, marketed as comfort height and matching a kitchen
        counter. So the entire decision is width, and width is decided by
        the wall you have and whether you want one sink or two.
      </p>
      <p>
        The calculator above takes your wall length and clearances and
        returns the largest vanity that actually fits. This page carries
        the size chart, the clearance rules that shrink the usable wall
        more than people expect, the reason 60 inches is the hard floor
        for a double sink, and what the whole thing costs installed.
      </p>

      <Figure
        number={1}
        caption="The six stocked widths at true relative scale. Everything at 60 inches and up can carry two sinks; everything below it is a single, no matter what the marketing photo shows."
      >
        <SizeScaleSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Clearances follow IRC 2021 Section R307.1, which requires 15
          inches from the centerline of a lavatory to any sidewall and 21
          inches of clear floor space in front. Roomier figures come from
          the NKBA Bathroom Planning Guidelines, which are
          recommendations rather than code. Cabinet construction
          standards follow KCMA/ANSI A161.1. Accessible bathrooms follow
          ICC A117.1, which sets different and generally larger
          clearances than the residential minimums used here.
        </p>
      </MethodologyNote>

      <h2>The vanity size chart</h2>

      <ComparisonTable
        caption="Standard widths with the wall each one needs. Wall required assumes the code minimum 15 inches from the outer sink centerline to any side wall, so a tight corner needs the larger number."
        columns={[
          { title: "Sinks" },
          { title: "Counter you get", highlight: true },
          { title: "Fits a bathroom that is" },
        ]}
        rows={[
          { label: '24 in', values: ["One", "Almost none, sink only", "A powder room or a very tight half bath"] },
          { label: '30 in', values: ["One", "About 8 in of usable counter", "The standard small full bath"] },
          { label: '36 in', values: ["One", "Room for a soap dish and a cup", "A comfortable single bath"] },
          { label: '48 in', values: ["One", "Real counter, drawers both sides", "A primary bath with one user"] },
          { label: '60 in', values: ["One or two", "Two sinks, tight between them", "A shared bath, minimum for double"] },
          { label: '72 in', values: ["Two", "36 in between sink centers", "A primary bath for two people"] },
        ]}
      />

      <p>
        Two points that decide most of these choices. A 30 inch vanity,
        the most searched size in the country, gives you roughly eight
        inches of usable counter once the sink is in, which is why people
        who buy one often wish they had gone to 36 when the wall allowed
        it. And going from 60 to 72 inches on a double is not vanity for
        its own sake: it moves the sinks from 30 inches apart to 36, which
        is the difference between two people using it at once and two
        people taking turns.
      </p>

      <Figure
        number={2}
        caption="Wall length is not usable length. Fifteen inches from each outer sink centerline to a side wall, plus 21 inches of clear floor in front, is what turns a 66 inch wall into a 60 inch vanity."
      >
        <ClearanceSVG />
      </Figure>

      <h2>Clearances: where the wall goes</h2>
      <p>
        Code sets two numbers and the NKBA suggests roomier versions of
        both. From the centerline of the sink to any side wall: 15 inches
        minimum under IRC R307.1, with 20 recommended. In front of the
        vanity: 21 inches of clear floor space required, 30 recommended.
        Neither number is negotiable in an inspection, and the second one
        is what catches people, because a door swinging into that 21 inch
        zone fails even if the vanity itself fits the wall.
      </p>
      <p>
        The practical sequence is to measure the wall, subtract anything
        that intrudes, then check the door swing before choosing a size.
        Toilets have their own clearance, 15 inches from the toilet
        centerline to any obstruction, so a vanity next to a toilet takes
        that space out of the wall too. In a small bathroom these three
        rules interact, and the result is usually one size smaller than
        the tape measure suggested.
      </p>

      <Figure
        number={3}
        caption="The 60 inch minimum is not a marketing decision. It falls out of the code clearance applied twice plus the minimum spacing between two sinks."
      >
        <DoubleThresholdSVG />
      </Figure>

      <h2>Single or double, and the 60 inch question</h2>
      <p>
        Two sinks need 30 inches between their centerlines at minimum,
        with 36 recommended. Each outer sink needs 15 inches to the wall.
        Add it up and 60 inches is the arithmetic floor for a double
        vanity, which is exactly why the industry sells its double sink
        cabinets starting at that width. A 60 inch double works, but the
        sinks sit at the bare minimum spacing and the counter between them
        is a strip rather than a surface.
      </p>
      <p>
        The honest recommendation for a 60 inch wall: consider a single
        sink with drawers instead. A 60 inch single gives one person a
        genuinely large counter, real drawer storage, and no plumbing
        under the middle of the cabinet. Two sinks in that width buy the
        appearance of a double bath and very little of the function.
        Above 66 inches the calculus flips and the double is clearly
        better.
      </p>

      <h2>Freestanding, floating, and what goes underneath</h2>
      <p>
        A freestanding vanity sits on the floor and hides the plumbing
        behind a cabinet, which is why it is the default: it forgives
        rough-in locations that are slightly off. A floating or wall-mount
        vanity hangs from the wall, shows the floor underneath, makes a
        small bathroom read larger, and is far less forgiving. It needs
        solid blocking between the studs, installed before the drywall
        goes on, and the drain has to exit the wall rather than the floor.
        Retrofitting one into a bathroom with a floor drain means opening
        the wall to move the plumbing.
      </p>
      <p>
        The other under-cabinet issue is the P-trap. Drawer vanities look
        excellent and then meet the trap, which occupies the exact space
        the top drawer wants. Manufacturers solve it with U-shaped
        notched drawers, and it is worth confirming a drawer model has
        them before buying rather than discovering the top drawer is
        decorative. Rough-in heights are typically 18 to 20 inches to the
        drain center and 20 to 22 inches to the supply lines, but the
        vanity you buy sets the real numbers, so buy the cabinet before
        the plumber sets the rough-in if you can.
      </p>

      <h2>What a vanity costs installed</h2>

      <ComparisonTable
        caption="Typical 2026 US pricing for cabinet plus top. Installation adds $200 to $600 for a straight swap, more if plumbing moves. Faucets are usually separate."
        columns={[
          { title: "Cabinet + top" },
          { title: "Installed total", highlight: true },
          { title: "Note" },
        ]}
        rows={[
          { label: '24 in single', values: ["$200-600", "$400-1,100", "Big box stock, fastest to get"] },
          { label: '30 in single', values: ["$250-800", "$450-1,400", "The volume size, widest selection"] },
          { label: '36 in single', values: ["$350-1,000", "$550-1,600", "Best value per inch of counter"] },
          { label: '48 in single', values: ["$500-1,500", "$750-2,200", "Drawer storage becomes real here"] },
          { label: '60 in double', values: ["$800-2,500", "$1,200-3,400", "Second sink adds plumbing labor"] },
          { label: '72 in double', values: ["$1,000-3,500", "$1,500-4,600", "Often special order, 4-8 week lead"] },
        ]}
      />

      <p>
        Counter material moves the number as much as size does. Cultured
        marble tops with an integrated sink run $100 to $300 and are the
        reason a complete 30 inch vanity can cost under $400. Quartz runs
        $300 to $800 on a vanity-sized top, granite slightly less, and
        both usually arrive as a separate top with an undermount sink,
        which adds a fabrication step. On a small vanity the material
        difference is a few hundred dollars, which is the one place in a
        bathroom where upgrading is genuinely cheap compared to doing the
        same upgrade in a kitchen.
      </p>

      <Scenario location="Raleigh, NC">
        <p>
          A shared hall bathroom being remodeled. The vanity wall measures
          68 inches from corner to corner. The door swings in and its edge
          lands 4 inches off the left corner, so that corner cannot take
          cabinet depth.
        </p>
        <p>
          Usable wall after the door: 64 inches. A 60 inch vanity fits
          with 4 inches to spare, and the outer sink centerlines land 15
          inches from each end, meeting IRC R307.1 exactly. Clear floor in
          front measures 34 inches, comfortably past the 21 inch minimum.
          The owners chose a 60 inch double at $1,650 for cabinet and
          quartz top, plus $600 to add the second drain and supply set,
          landing at $2,250. The alternative they considered, a 60 inch
          single with a bank of drawers, would have cost about $700 less
          and given one person far more counter; with two teenagers
          sharing the bathroom, the double was the right call anyway.
        </p>
      </Scenario>

      <h2>Where vanity projects go wrong</h2>
      <p>
        <strong>Measuring the wall, not the usable wall.</strong> Door
        swings, toilet clearance, baseboard, and out-of-square corners all
        take inches. Measure at counter height as well as at the floor,
        because old walls are rarely parallel.
      </p>
      <p>
        <strong>Forgetting the top overhangs.</strong> A vanity top
        typically overhangs the cabinet by about an inch on each exposed
        side, so a 60 inch cabinet needs 61 to 62 inches of clear wall.
        Buying to the exact wall dimension is how a top ends up needing to
        be cut.
      </p>
      <p>
        <strong>Assuming the old rough-in will work.</strong> Vanity
        heights changed. Moving from a 32 inch cabinet to a 36 inch
        comfort height raises everything, and a floating vanity needs the
        drain in the wall rather than the floor. Confirm before demolition,
        not after.
      </p>
      <p>
        <strong>Buying a double for a 60 inch wall by reflex.</strong>{" "}
        Covered above, and the most common regret in this category. Two
        sinks at minimum spacing serve two people worse than one sink with
        a real counter serves either of them.
      </p>

      <Callout label="Accessible bathrooms use a different rulebook">
        If the bathroom needs to be usable from a wheelchair, ICC A117.1
        governs instead of the residential minimums here: the lavatory
        needs knee clearance underneath, which means a wall-mount or
        open-front vanity, a rim no higher than 34 inches, and a clear
        floor space of 30 by 48 inches at the fixture. Those requirements
        change the cabinet choice entirely, so establish them before
        shopping rather than after.
      </Callout>

      <h2>The rest of the bathroom</h2>
      <p>
        A vanity swap rarely travels alone. The{" "}
        <a href="/countertop-calculator">countertop calculator</a> prices
        the top if you are buying it separately, tile behind and around
        the vanity runs through the{" "}
        <a href="/backsplash-calculator">backsplash calculator</a>, and
        the shower in the same room is the{" "}
        <a href="/shower-tile-calculator">shower tile calculator</a>&apos;s
        job. If the plumbing is moving, the{" "}
        <a href="/drain-pipe-calculator">drain pipe calculator</a> sizes
        the lines by fixture units.
      </p>
      <p>
        Measure the usable wall, subtract for the door, then run the
        calculator above. It will tell you the largest size that fits and
        whether two sinks are honestly an option.
      </p>
    </>
  );
}
