import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function MeasureSVG() {
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="Measuring an L-shaped countertop: measure each leg along the wall, multiply by depth in feet, add the island, then add 10 percent waste.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Measuring an L-shaped kitchen</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Measure along the wall at the back. Depth converts inches to feet: 25.5 in = 2.125 ft</text>
      <path d="M 50 80 L 250 80 L 250 130 L 100 130 L 100 210 L 50 210 Z" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <rect x="150" y="165" width="90" height="45" rx="2" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="195" y="192" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.accent}>island 5 x 3 ft</text>
      <text x="150" y="72" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink}>10 ft leg</text>
      <text x="40" y="148" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink} transform="rotate(-90,40,148)">6 ft leg</text>
      <g fontSize="11">
        <text x="330" y="86" fontWeight="600" fill={GUIDE_SVG.ink}>1. Perimeter run</text>
        <text x="330" y="104" fill={GUIDE_SVG.inkMuted}>10 ft + 6 ft = 16 linear ft</text>
        <text x="330" y="134" fontWeight="600" fill={GUIDE_SVG.ink}>2. Counter area</text>
        <text x="330" y="152" fill={GUIDE_SVG.inkMuted}>16 ft x 2.125 ft depth = 34 ft&#178;</text>
        <text x="330" y="182" fontWeight="600" fill={GUIDE_SVG.ink}>3. Island</text>
        <text x="330" y="200" fill={GUIDE_SVG.inkMuted}>5 ft x 3 ft = 15 ft&#178;</text>
        <text x="330" y="230" fontWeight="600" fill={GUIDE_SVG.ink}>4. Waste at 10%</text>
        <text x="330" y="248" fill={GUIDE_SVG.inkMuted}>(34 + 15) x 1.10 = 54 ft&#178;</text>
        <text x="330" y="278" fontWeight="700" fill={GUIDE_SVG.accent}>Order 54 ft&#178;. Slabs sell whole,</text>
        <text x="330" y="294" fontWeight="700" fill={GUIDE_SVG.accent}>so 54 ft&#178; usually means two slabs.</text>
      </g>
    </svg>
  );
}

function WeightSVG() {
  const mats = [
    { name: "Laminate", psf: 4, note: "any stock cabinet carries it" },
    { name: "Butcher block (1.5 in)", psf: 9, note: "standard cabinets fine" },
    { name: "Quartz 2cm", psf: 11, note: "standard cabinets fine" },
    { name: "Quartz / granite 3cm", psf: 19, note: "island overhangs need brackets past 10 in" },
    { name: "Concrete (2 in)", psf: 25, note: "check cabinet bracing and floor" },
  ];
  const maxP = 25;
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="Countertop weight per square foot: laminate 4 pounds, butcher block 9, 2cm quartz 11, 3cm quartz or granite about 19, concrete 25.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Weight per square foot by material</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>A 54 ft&#178; kitchen in 3cm stone puts about half a ton on the cabinets</text>
      {mats.map((m, i) => {
        const y = 70 + i * 42;
        const w = (m.psf / maxP) * 300;
        return (
          <g key={m.name}>
            <text x="185" y={y + 13} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{m.name}</text>
            <rect x="196" y={y} width={w} height="18" rx="3" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={196 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{m.psf} lb/ft&#178;</text>
            <text x="196" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{m.note}</text>
          </g>
        );
      })}
      <text x="20" y="292" fontSize="9" fill={GUIDE_SVG.inkFaint}>3cm (1-1/4 in) is the US standard for stone installed without a plywood substrate.</text>
    </svg>
  );
}

export function CountertopCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="Natural Stone Institute installation standards, Marble Institute of America dimension stone guidance"
      />

      <h2>Counters are sold in square feet and installed in slabs</h2>
      <p>
        A countertop quote lives or dies on one number: your square
        footage, measured the way fabricators measure it. Along the wall,
        times the depth, island added, sink cutouts NOT subtracted, 10
        percent waste on top. Homeowners who walk in with that number get
        a real quote. Homeowners who walk in with &quot;it is a normal
        kitchen&quot; get a range wide enough to hide a thousand dollars
        in.
      </p>
      <p>
        The calculator above produces the fabricator number from your
        wall measurements. This page covers the part after the number:
        what the materials actually cost installed, the granite versus
        quartz question everyone asks, what the stone weighs and when
        that matters, and the measuring mistakes that turn a clean quote
        into a change order.
      </p>

      <Figure
        number={1}
        caption="A 16 linear foot L-kitchen with a 5 by 3 island comes to 54 square feet with waste. Cutouts for sinks and cooktops are never subtracted: you pay for the whole rectangle the piece is cut from."
      >
        <MeasureSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Measurement conventions follow Natural Stone Institute
          fabrication practice: gross rectangle per piece, cutouts
          included, seams placed by the fabricator. Cost ranges reflect
          typical 2026 installed prices across US metro markets and vary
          with slab grade, edge profile, and local labor. Weight figures
          use standard material densities at nominal thicknesses.
        </p>
      </MethodologyNote>

      <h2>Granite vs quartz: the question everyone asks</h2>
      <p>
        The short answer, since half the internet asks it as a yes or no
        question: entry-level granite is usually cheaper than
        entry-level quartz, and mid-range quartz and mid-range granite
        cost about the same. The material bill is rarely what should
        decide it. What should: quartz is engineered, consistent, and
        nonporous, so it never needs sealing and shrugs off wine and
        lemon juice, but a hot pan can scorch its resin. Granite is
        stone, unique slab to slab, takes heat without complaint, and
        wants a wipe of sealer once a year or so. Neither is the
        &quot;durable one.&quot; They fail differently.
      </p>

      <ComparisonTable
        caption="Typical installed cost per square foot, 2026 US metro averages. A 54 square foot kitchen spans roughly $2,200 in laminate to $5,400 or more in premium stone."
        columns={[
          { title: "Installed $/ft²" },
          { title: "Heat" },
          { title: "Sealing" },
          { title: "Watch out for", highlight: true },
        ]}
        rows={[
          { label: "Laminate", values: ["$25-50", "No hot pans", "Never", "Visible seams, no undermount sinks"] },
          { label: "Butcher block", values: ["$40-90", "Trivets", "Oil monthly", "Water damage at the sink"] },
          { label: "Granite", values: ["$45-100", "Excellent", "Yearly", "Porous if sealing lapses"] },
          { label: "Quartz", values: ["$55-120", "Trivets", "Never", "Resin scorches above ~300F"] },
          { label: "Quartzite (natural)", values: ["$70-160", "Excellent", "Yearly", "Often mislabeled; harder to fabricate"] },
          { label: "Solid surface (Corian)", values: ["$50-95", "Trivets", "Never", "Scratches, but sands out"] },
        ]}
      />

      <p>
        One naming trap deserves its own sentence: quartz and quartzite
        are different products. Quartz is engineered resin and ground
        stone. Quartzite is a natural metamorphic rock, harder than
        granite, priced above both, and regularly confused with quartz
        by showroom labels. If a &quot;quartzite&quot; price looks like
        a quartz price, ask which one it actually is.
      </p>

      <Figure
        number={2}
        caption="Weight is the quiet constraint. Standard cabinets carry 3cm stone fine, but island overhangs past 10 inches need steel brackets or corbels, and a big concrete top can need floor blocking below."
      >
        <WeightSVG />
      </Figure>

      <h2>Thickness, overhangs, and what the stone weighs</h2>
      <p>
        US stone counters come in two thicknesses: 2cm (3/4 inch) and
        3cm (1-1/4 inch). 3cm is the default in most of the country
        because it installs directly on cabinets with no plywood
        substrate and takes overhangs up to about 10 inches
        unsupported. At roughly 19 pounds per square foot for 3cm quartz
        or granite, a 54 square foot kitchen is carrying close to 1,000
        pounds, which ordinary base cabinets handle without drama. Where
        weight starts making decisions: island overhangs past 10 inches
        want steel flat bar or corbels, 2cm tops want a plywood deck
        under them, and full-height stone backsplashes hang load on the
        wall studs, not the cabinets.
      </p>

      <h2>Seams, sinks, and edges: where quotes grow</h2>
      <p>
        Slabs run about 55 by 120 inches for quartz and vary for
        granite, so almost any real kitchen has at least one seam. A
        good fabricator puts it near the sink or a corner where the eye
        skips it; a template appointment is where you get a say. The
        line items that move a quote after the square footage is fixed:
        edge profile (eased and quarter-round are usually included;
        ogee and waterfall edges are not), sink cutouts ($100-300 each
        depending on mount), cooktop cutouts, and tear-out of the old
        top ($300-500 for most kitchens). None of these are scams. All
        of them belong in the quote before you sign it, not after.
      </p>

      <Scenario location="Charlotte, NC">
        <p>
          An L-shaped kitchen, 10 foot and 6 foot legs at standard 25.5
          inch depth, plus a 5 by 3 foot island. Counter area: 16 x
          2.125 = 34 ft&#178;. Island: 15 ft&#178;. With 10 percent
          waste: 54 ft&#178; ordered.
        </p>
        <p>
          Mid-grade quartz at $75 installed: about $4,050. Comparable
          granite at $65: about $3,510. Add an undermount sink cutout
          ($200), tear-out of the old laminate ($400), and an eased edge
          at no charge. The quartz kitchen lands near $4,650, the
          granite near $4,110, and the $540 gap is small enough that the
          decision comes down to the heat-versus-sealing question, which
          is where it belonged all along. Two quartz slabs cover 54
          ft&#178; with one seam placed at the sink.
        </p>
      </Scenario>

      <h2>Where countertop measuring goes wrong</h2>
      <p>
        <strong>Subtracting the sink.</strong> The cutout piece is waste
        the fabricator cuts and discards from your slab; you pay for the
        rectangle. Every first-time measurer subtracts the sink and then
        wonders why the quote is 4 square feet bigger than their number.
      </p>
      <p>
        <strong>Measuring the old counter instead of the wall.</strong>{" "}
        Old tops are often cut short of the wall or trimmed at an angle.
        Measure the cabinet run along the wall and let the standard
        depth handle the rest.
      </p>
      <p>
        <strong>Forgetting the overhang side of an island.</strong> A
        seating overhang adds real square footage: a 12 inch overhang on
        a 5 foot island is 5 more square feet of stone plus the bracket
        hardware to hold it up.
      </p>
      <p>
        <strong>Trusting a showroom per-foot price as the final
        number.</strong> The advertised number is usually material plus
        basic fabrication on the cheapest slab grade. Installed price
        with your edge, your cutouts, and your tear-out is the only
        number worth comparing between shops, so ask every shop for
        exactly that.
      </p>

      <Callout label="Get the template appointment right">
        Fabricators measure once with a laser template after cabinets
        are set, and that template is the contract. Have the sink,
        faucet, and cooktop physically on site that day: the cutouts
        are made to the actual fixtures, and a sink that arrives after
        templating is the most common cause of a week-long delay.
      </Callout>

      <h2>The rest of the kitchen math</h2>
      <p>
        Counters rarely travel alone. A backsplash to go with the new
        top runs through the{" "}
        <a href="/backsplash-calculator">backsplash calculator</a>, and
        if the cabinets are changing too, the{" "}
        <a href="/kitchen-cabinet-calculator">kitchen cabinet
        calculator</a> prices the run the counter sits on. Painting the
        room after install is the{" "}
        <a href="/paint-calculator">paint calculator</a>&apos;s job.
      </p>
      <p>
        Measure the walls, run the calculator above, and carry one
        clean number into every showroom. The quotes get honest fast
        when you already know your square footage.
      </p>
    </>
  );
}
