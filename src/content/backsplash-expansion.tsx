import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function HeightsSVG() {
  const zones = [
    { h: 4, label: '4 in', use: "vanity or short counter run", px: 22 },
    { h: 18, label: '18 in', use: "the kitchen standard", px: 68, hl: true },
    { h: 30, label: '30 in', use: "behind a range, up to the hood", px: 108 },
    { h: 54, label: "full", use: "counter to ceiling, no uppers", px: 150 },
  ];
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Backsplash heights: 4 inches for a vanity, 18 inches counter to upper cabinets in a kitchen, 30 inches behind a range to the hood, and full height from counter to ceiling.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The four heights, drawn to scale</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Height times linear feet is the whole area calculation. Height is the decision people get wrong.</text>
      {zones.map((z, i) => {
        const x = 60 + i * 158;
        return (
          <g key={z.label}>
            <line x1={x - 6} y1="200" x2={x + 96} y2="200" stroke={GUIDE_SVG.inkMuted} strokeWidth="3" />
            <rect x={x} y={200 - z.px} width="84" height={z.px}
              fill={z.hl ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft}
              stroke={z.hl ? GUIDE_SVG.accent : GUIDE_SVG.cool} strokeWidth="1.5" />
            <text x={x + 42} y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill={z.hl ? GUIDE_SVG.accent : GUIDE_SVG.ink}>{z.label}</text>
            <text x={x + 42} y="236" textAnchor="middle" fontSize="8.5" fill={GUIDE_SVG.inkFaint}>{z.use}</text>
          </g>
        );
      })}
      <text x="20" y="66" fontSize="9" fill={GUIDE_SVG.inkFaint}>Counter line shown at the base of each</text>
    </svg>
  );
}

function AreaMathSVG() {
  return (
    <svg viewBox="0 0 680 244" width="100%" height="auto" role="img" aria-label="A 14 linear foot kitchen at 18 inches high is 21 square feet, minus about 1 square foot for four outlets, plus 10 percent waste, equals 22 square feet ordered.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>From linear feet to a tile order</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>An 18 inch backsplash is 1.5 square feet per linear foot of counter. That is the shortcut.</text>

      <rect x="50" y="86" width="240" height="46" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="50" y1="132" x2="290" y2="132" stroke={GUIDE_SVG.inkMuted} strokeWidth="3" />
      {[86, 134, 182, 230].map((x) => (
        <rect key={x} x={x} y="98" width="14" height="22" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.warm} strokeWidth="1.2" />
      ))}
      <text x="170" y="152" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>14 linear ft of counter, 4 outlets</text>

      <g fontSize="11">
        <text x="356" y="94" fontWeight="600" fill={GUIDE_SVG.ink}>1. Gross area</text>
        <text x="356" y="110" fill={GUIDE_SVG.inkMuted}>14 ft x 1.5 = 21 ft&#178;</text>
        <text x="356" y="136" fontWeight="600" fill={GUIDE_SVG.ink}>2. Outlets</text>
        <text x="356" y="152" fill={GUIDE_SVG.inkMuted}>subtract nothing, they are cuts</text>
        <text x="356" y="178" fontWeight="600" fill={GUIDE_SVG.ink}>3. Waste at 10 percent</text>
        <text x="356" y="194" fill={GUIDE_SVG.inkMuted}>21 x 1.10 = 23 ft&#178;</text>
        <text x="356" y="222" fontWeight="700" fill={GUIDE_SVG.accent}>Order 23 ft&#178;, or 3 boxes</text>
      </g>
      <text x="20" y="238" fontSize="9" fill={GUIDE_SVG.inkFaint}>Outlets do not reduce the order. Each one turns whole tiles into cut pieces, which raises consumption rather than lowering it.</text>
    </svg>
  );
}

function WasteSVG() {
  const kinds = [
    { n: "Subway, running bond", pct: 10 },
    { n: "Large format 12x24", pct: 12 },
    { n: "Mosaic sheets", pct: 12 },
    { n: "Diagonal or herringbone", pct: 15 },
    { n: "Zellige or handmade", pct: 20 },
  ];
  const maxP = 20;
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Backsplash waste factor: subway running bond 10 percent, large format and mosaic 12 percent, diagonal or herringbone 15 percent, zellige or handmade tile 20 percent.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factor by tile type</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Handmade tile is the outlier: irregular edges mean you reject pieces as well as cut them</text>
      {kinds.map((k, i) => {
        const y = 74 + i * 34;
        const w = (k.pct / maxP) * 290;
        return (
          <g key={k.n}>
            <text x="196" y={y + 12} textAnchor="end" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>{k.n}</text>
            <rect x="208" y={y} width={w} height="16" rx="3" fill={k.pct >= 15 ? GUIDE_SVG.warm : GUIDE_SVG.slate} />
            <text x={208 + w + 10} y={y + 12} fontSize="11" fontWeight="700" fill={k.pct >= 15 ? GUIDE_SVG.warm : GUIDE_SVG.inkMuted}>{k.pct}%</text>
          </g>
        );
      })}
      <text x="20" y="244" fontSize="9" fill={GUIDE_SVG.inkFaint}>A backsplash is a small area with many edges and openings, so waste runs higher per square foot than a floor.</text>
    </svg>
  );
}

export function BacksplashCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="NKBA Kitchen Planning Guidelines, TCNA Handbook interior wall methods, NEC 314.20 outlet box extension requirements"
      />

      <h2>An 18 inch backsplash is 1.5 square feet per linear foot</h2>
      <p>
        Backsplash math is the simplest on this site once you know the
        height. The standard kitchen gap between countertop and upper
        cabinets is 18 inches, which is a foot and a half, so every linear
        foot of counter produces 1.5 square feet of backsplash. Fourteen
        feet of counter is 21 square feet. Add waste and you are done.
      </p>
      <p>
        Everything interesting sits around that number: what height to use
        where, why outlets increase the order rather than reduce it, how
        much extra handmade tile like zellige demands, and whether peel and
        stick is a real option or a temporary one. The calculator above
        handles the arithmetic including outlet count and windows. If you
        are working out how to tile a backsplash rather than how much to
        buy, the sequence and the decisions feeding it are below.
      </p>

      <Figure
        number={1}
        caption="The four heights that cover nearly every job. Eighteen inches is the kitchen default; four inches is the short vanity or counter run; behind a range the tile usually climbs to the hood."
      >
        <HeightsSVG />
      </Figure>

      <MethodologyNote>
        <p>
          The 18 inch counter-to-cabinet dimension follows NKBA kitchen
          planning practice and is the near-universal US standard.
          Installation methods for interior wall tile follow the TCNA
          Handbook. The outlet box requirement comes from NEC 314.20,
          which requires boxes in non-combustible walls to be flush or set
          back no more than a quarter inch, meaning tile depth usually
          calls for box extenders. Waste percentages reflect typical
          industry practice and rise with irregular or handmade tile.
        </p>
      </MethodologyNote>

      <h2>How high should a backsplash be</h2>

      <ComparisonTable
        caption="Height by location. The kitchen standard is fixed by cabinet layout rather than taste; the others are genuine choices."
        columns={[
          { title: "Height" },
          { title: "Square feet per linear foot", highlight: true },
          { title: "Notes" },
        ]}
        rows={[
          { label: "Bathroom vanity backsplash", values: ['4 in', "0.33", "Matches the countertop slab, cheapest option"] },
          { label: "Kitchen standard", values: ['18 in', "1.5", "Counter to upper cabinets, the default"] },
          { label: "Behind a range", values: ['30 in or to hood', "2.5", "Often continues past the 18 in line"] },
          { label: "Tall or open shelving", values: ['24 in', "2.0", "Where uppers sit higher than standard"] },
          { label: "Full height", values: ['Counter to ceiling', "3.0 to 4.5", "No uppers, or a feature wall"] },
        ]}
      />

      <p>
        Two of those deserve comment. A bathroom vanity backsplash at 4
        inches is usually a piece of the countertop material rather than
        tile, which is why it costs almost nothing and why the tile
        version, running full height behind the sink, looks like a
        deliberate upgrade. And behind a range, the tile normally rises
        above the 18 inch line to meet the hood or reach 30 inches; this
        is the section that gets the decorative treatment in most
        kitchens, so it is worth pricing separately if the tile there
        differs.
      </p>

      <Figure
        number={2}
        caption="The whole calculation. Note that outlets are added to consumption, not subtracted from area, which is the reverse of what people expect."
      >
        <AreaMathSVG />
      </Figure>

      <h2>Outlets: why they add tile rather than save it</h2>
      <p>
        A typical kitchen has four to eight outlets and switches in the
        backsplash zone, because code requires receptacles along countertop
        runs at regular intervals. Each one occupies about 0.15 square feet
        of wall, which is negligible, and each one converts two to four
        whole tiles into cut pieces, which is not. Do not subtract outlet
        area from the order. If anything, raise the waste factor slightly
        on a kitchen with many of them.
      </p>
      <p>
        The part that catches people mid-install is depth. Adding tile and
        thinset moves the finished wall surface out by roughly half an
        inch, which leaves the existing outlet boxes recessed behind it.
        NEC 314.20 does not allow that, and the fix is a box extender, a
        plastic or metal collar that brings the box flush with the new
        surface. They cost a couple of dollars each, they are sold at every
        hardware store, and buying one per opening before starting saves an
        irritating trip. The receptacle screws then need slightly longer
        machine screws to reach.
      </p>

      <h2>Zellige, handmade tile, and the waste problem</h2>

      <Figure
        number={3}
        caption="Waste by tile type. The zellige figure is not padding: handmade tile arrives with genuine size and colour variation, and some pieces get set aside rather than cut."
      >
        <WasteSVG />
      </Figure>

      <p>
        Zellige has become one of the most requested backsplash tiles in
        the US, and it behaves unlike anything mass-produced. Each piece is
        hand-formed and glazed, so edges are irregular, thickness varies,
        and colour shifts across the lot. That variation is the appeal, and
        it also means you will discard pieces that are too warped to sit
        flat, on top of the ones you cut. Twenty percent waste is the
        working figure, and ordering the whole quantity in one lot matters
        more here than with any factory tile.
      </p>
      <p>
        Two installation consequences follow. Handmade tile is usually set
        with minimal or no grout joint, which means the wall behind it must
        be genuinely flat, because there is no joint width to absorb
        variation. And it takes considerably longer to install than
        machine-made tile of the same area, so a quote for zellige that
        matches a quote for subway is a quote from someone who has not
        installed zellige.
      </p>

      <ComparisonTable
        caption="Installed cost per square foot, 2026 US averages. A standard 21 square foot kitchen backsplash spans roughly $250 in peel and stick to $2,000 or more in handmade tile."
        columns={[
          { title: "Material $/ft²" },
          { title: "Installed $/ft²", highlight: true },
          { title: "Behind a range?" },
        ]}
        rows={[
          { label: "Peel and stick", values: ["$5-12", "DIY, $8-15", "No, not behind a cooktop"] },
          { label: "Ceramic subway", values: ["$2-8", "$15-30", "Yes"] },
          { label: "Porcelain and large format", values: ["$4-15", "$18-38", "Yes"] },
          { label: "Glass tile", values: ["$8-30", "$25-50", "Yes, needs white thinset"] },
          { label: "Marble and natural stone", values: ["$10-35", "$28-55", "Yes, but seal it"] },
          { label: "Zellige and handmade", values: ["$20-60", "$45-95", "Yes"] },
        ]}
      />

      <h2>Peel and stick: where it works</h2>
      <p>
        Peel and stick backsplash is a legitimate product with a narrow
        brief. It is genuinely cheap, it goes up in an afternoon with no
        thinset or grout, and it is removable, which makes it the obvious
        answer for a rental or a kitchen you plan to redo properly later.
        The good versions are vinyl or gel with a printed surface; the
        cheap versions look like what they cost.
      </p>
      <p>
        Its limits are real. It needs a smooth, clean, fully cured surface
        to adhere to, so textured drywall has to be skimmed first. It is
        not rated for the heat directly behind a cooktop, and most
        manufacturers say so explicitly. Steam and heat at the edges cause
        lifting over time, particularly above a dishwasher or kettle. And
        it does not add value in a sale the way tile does. As a two to
        three year solution it is excellent; as a permanent one it is a
        compromise you will notice.
      </p>

      <Scenario location="Charleston, SC">
        <p>
          A galley kitchen with 14 linear feet of counter, an 18 inch gap
          to the upper cabinets, six outlets, and a 30 inch wide range with
          the tile continuing to a hood 30 inches above the cooktop.
        </p>
        <p>
          Main run: 14 x 1.5 = 21 ft&#178;. The range wall adds another 12
          inches of height across 30 inches of width, roughly 2.5 ft&#178;
          more. Gross: 23.5 ft&#178;. In a white subway tile backsplash at 10 percent waste,
          order 26 ft&#178;, which is three or four boxes depending on
          coverage. Materials at $6 per square foot come to about $160,
          plus $40 of thinset and grout and $15 of box extenders for the
          six openings. Installed by a tiler at $22 per square foot the job
          lands near $700 all in. Had the owners chosen zellige, the same
          kitchen at 20 percent waste and $70 installed would be closer to
          $2,000, which is the honest reason the subway version is on more
          walls.
        </p>
      </Scenario>

      <h2>Where backsplash jobs go wrong</h2>
      <p>
        <strong>Subtracting the outlets.</strong> Covered above and the
        most common error in this specific calculation. Openings raise tile
        consumption; they do not lower it.
      </p>
      <p>
        <strong>Measuring cabinet to cabinet instead of counter to
        cabinet.</strong> The height that matters is from the countertop
        surface to the bottom of the upper cabinets, and it is not always
        exactly 18 inches in an older kitchen. Measure it at both ends of
        each run, because floors and cabinets are rarely level.
      </p>
      <p>
        <strong>Forgetting the range wall.</strong> If the tile rises
        behind the cooktop, that section can add 10 to 20 percent to the
        whole job and often uses a different tile. Price it as its own
        area.
      </p>
      <p>
        <strong>Buying tile before the countertop is in.</strong> The
        backsplash sits on the counter, so the counter has to be
        templated, fabricated, and installed first. Tiling to a line you
        expect the counter to reach is how a gap appears at the bottom.
      </p>

      <Callout label="Where the tile stops, sealant starts">
        The joint where the backsplash meets the countertop is a change of
        plane and gets flexible sealant, not grout. Counters move
        seasonally and cabinets settle, and rigid grout in that joint
        cracks within a year. Use a colour-matched silicone or a
        manufacturer sealant that matches the grout, run a clean bead, and
        the line where two materials meet stops being a maintenance item.
      </Callout>

      <h2>The rest of the kitchen</h2>
      <p>
        A backsplash goes in after the counter and before the paint. The{" "}
        <a href="/countertop-calculator">countertop calculator</a> sizes
        what it sits on, the{" "}
        <a href="/kitchen-cabinet-calculator">kitchen cabinet
        calculator</a> handles the run above and below, and grout for all
        those joints comes from the{" "}
        <a href="/grout-calculator">grout calculator</a>. The bathroom
        version of the same job pairs with the{" "}
        <a href="/vanity-calculator">vanity calculator</a>.
      </p>
      <p>
        Measure each counter run, multiply by the real height, add the
        range wall separately, and let the calculator apply waste. Buy the
        box extenders at the same time as the tile.
      </p>
    </>
  );
}
