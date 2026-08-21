import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function AlcoveSVG() {
  return (
    <svg viewBox="0 0 680 290" width="100%" height="auto" role="img" aria-label="A standard 60 by 32 inch alcove shower: back wall 60 by 96 inches is 40 square feet, two side walls 32 by 96 inches are 21 square feet each, the floor is 13 square feet, and a 14 by 24 inch niche adds about 4 square feet of surfaces.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Where the square footage actually is</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>A standard 60 by 32 in alcove, tiled to 96 in. Walls are most of it, and people forget the curb.</text>

      <rect x="120" y="84" width="150" height="120" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="180" y="152" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.ink}>back wall</text>
      <text x="180" y="168" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkMuted}>60 x 96 in</text>
      <path d="M 60 108 L 120 84 L 120 204 L 60 228 Z" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="90" y="162" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkMuted}>side</text>
      <path d="M 330 108 L 270 84 L 270 204 L 330 228 Z" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="300" y="162" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkMuted}>side</text>
      <path d="M 60 228 L 120 204 L 270 204 L 330 228 Z" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="195" y="222" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={GUIDE_SVG.accent}>floor</text>
      <rect x="228" y="100" width="32" height="24" fill={GUIDE_SVG.bgWarm} stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="244" y="94" textAnchor="middle" fontSize="8.5" fill={GUIDE_SVG.warm}>niche</text>

      <g fontSize="11">
        <text x="392" y="92" fontWeight="600" fill={GUIDE_SVG.ink}>Back wall</text>
        <text x="392" y="108" fill={GUIDE_SVG.inkMuted}>60 x 96 in = 40 ft&#178;</text>
        <text x="392" y="132" fontWeight="600" fill={GUIDE_SVG.ink}>Two side walls</text>
        <text x="392" y="148" fill={GUIDE_SVG.inkMuted}>32 x 96 in each = 42 ft&#178;</text>
        <text x="392" y="172" fontWeight="600" fill={GUIDE_SVG.ink}>Floor</text>
        <text x="392" y="188" fill={GUIDE_SVG.inkMuted}>60 x 32 in = 13 ft&#178;</text>
        <text x="392" y="212" fontWeight="600" fill={GUIDE_SVG.ink}>Niche and curb</text>
        <text x="392" y="228" fill={GUIDE_SVG.inkMuted}>about 6 ft&#178; of small cuts</text>
        <text x="392" y="256" fontWeight="700" fill={GUIDE_SVG.accent}>101 ft&#178; before waste.</text>
        <text x="392" y="272" fontWeight="700" fill={GUIDE_SVG.accent}>At 10 percent, order 111 ft&#178;.</text>
      </g>
      <text x="20" y="284" fontSize="9" fill={GUIDE_SVG.inkFaint}>Wall and floor tile are usually different products, so keep the two numbers separate when you order.</text>
    </svg>
  );
}

function SlopeSVG() {
  return (
    <svg viewBox="0 0 680 236" width="100%" height="auto" role="img" aria-label="A shower floor slopes a quarter inch per foot to the drain, which is why small mosaic tile is used on the floor: large tile cannot follow a compound slope without lippage.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Why the floor gets small tile and the walls do not</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Code requires 1/4 in per ft of fall to the drain, in every direction at once</text>

      <line x1="60" y1="96" x2="300" y2="132" stroke={GUIDE_SVG.accent} strokeWidth="3" />
      <line x1="300" y1="132" x2="540" y2="96" stroke={GUIDE_SVG.accent} strokeWidth="3" />
      <circle cx="300" cy="134" r="7" fill="none" stroke={GUIDE_SVG.warm} strokeWidth="2" />
      <text x="300" y="160" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.warm}>drain</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={72 + i * 36} y={100 + i * 5.4} width="30" height="6" fill={GUIDE_SVG.slate} transform={`rotate(8.5 ${87 + i * 36} ${103 + i * 5.4})`} />
      ))}
      <text x="60" y="86" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>2 in mosaic follows the plane</text>

      <path d="M 380 189 L 500 189 L 500 213 Z" fill={GUIDE_SVG.warm} opacity="0.22" />
      <line x1="380" y1="186" x2="500" y2="186" stroke={GUIDE_SVG.inkMuted} strokeWidth="6" />
      <line x1="380" y1="189" x2="500" y2="213" stroke={GUIDE_SVG.warm} strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="466" y="207" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={GUIDE_SVG.warm}>void</text>
      <text x="512" y="186" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>12x24 bridges the</text>
      <text x="512" y="200" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>slope and holds</text>
      <text x="512" y="214" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>water at the edge</text>

      <text x="60" y="196" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Small tile conforms</text>
      <text x="60" y="212" fontSize="10" fill={GUIDE_SVG.inkMuted}>2 in and under, more grout, more grip</text>
      <text x="20" y="230" fontSize="9" fill={GUIDE_SVG.inkFaint}>Wet-area floor tile should also meet a DCOF of 0.42 or higher under ANSI A137.1.</text>
    </svg>
  );
}

function WasteSVG() {
  const patterns = [
    { name: "Straight stack", pct: 10, note: "grid, aligned joints" },
    { name: "Running bond", pct: 10, note: "classic subway offset" },
    { name: "Large format 12x24", pct: 12, note: "fewer, bigger cuts" },
    { name: "Diagonal", pct: 15, note: "every edge is a cut" },
    { name: "Herringbone", pct: 18, note: "two cuts per perimeter tile" },
  ];
  const maxP = 18;
  return (
    <svg viewBox="0 0 680 290" width="100%" height="auto" role="img" aria-label="Waste factor by tile pattern: straight stack and running bond 10 percent, large format 12 percent, diagonal 15 percent, herringbone 18 percent.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factor by layout</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>A shower is a small room with a lot of edges, so waste runs higher than a floor of the same size</text>
      {patterns.map((p, i) => {
        const y = 74 + i * 42;
        const w = (p.pct / maxP) * 290;
        return (
          <g key={p.name}>
            <text x="168" y={y + 13} textAnchor="end" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>{p.name}</text>
            <rect x="180" y={y} width={w} height="18" rx="3" fill={p.pct >= 15 ? GUIDE_SVG.warm : GUIDE_SVG.slate} />
            <text x={180 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={p.pct >= 15 ? GUIDE_SVG.warm : GUIDE_SVG.inkMuted}>{p.pct}%</text>
            <text x="180" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{p.note}</text>
          </g>
        );
      })}
      <text x="20" y="284" fontSize="9" fill={GUIDE_SVG.inkFaint}>Add another 5 percent on any tile with a directional pattern or heavy shade variation, since some pieces get rejected.</text>
    </svg>
  );
}

export function ShowerTileCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="TCNA Handbook wet area methods, ANSI A118.10 waterproof membranes, ANSI A137.1 DCOF slip resistance, IRC P2708 shower compartments"
      />

      <h2>A shower is five surfaces, not one</h2>
      <p>
        Tiling a shower means covering a back wall, two side walls, a
        floor, usually a curb, and often a niche, and each of those wants
        its own number. The walls carry most of the square footage. The
        floor is small but takes different tile. The curb and niche are
        tiny in area and consume a surprising amount of time because
        almost every piece is a cut. Add them separately or the order
        comes up short.
      </p>
      <p>
        The calculator above takes your alcove dimensions and returns
        shower wall tile and shower floor tile quantities separately, with waste applied. This page covers how
        the areas break down, why the floor gets small tile and the walls
        do not, the slip resistance number that governs wet floors, what
        a tile-ready pan changes, and the waterproofing decision that
        matters more than any of it.
      </p>

      <Figure
        number={1}
        caption="The standard 60 by 32 inch alcove, tiled to 96 inches. Walls are 82 of the 101 square feet, which is why wall tile choice drives the budget and floor tile choice drives the safety."
      >
        <AlcoveSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Area math is straightforward geometry; the judgment is in waste
          and method. Installation practice follows the TCNA Handbook wet
          area methods, waterproofing membranes are specified to ANSI
          A118.10, and floor slip resistance follows ANSI A137.1, which
          sets a wet dynamic coefficient of friction of 0.42 as the
          threshold for level interior wet areas. Shower compartment size
          and slope requirements come from IRC Section P2708 and the
          plumbing code adopted locally.
        </p>
      </MethodologyNote>

      <h2>Shower sizes and the tile they need</h2>

      <ComparisonTable
        caption="Wall area assumes tiling to 96 inches, the common full-height finish. Tiling to 72 inches instead cuts wall area by about a quarter."
        columns={[
          { title: "Wall area to 96 in" },
          { title: "Floor area", highlight: true },
          { title: "With 10% waste" },
        ]}
        rows={[
          { label: '32 x 32 in corner', values: ["64 ft²", "7 ft²", "78 ft² total"] },
          { label: '48 x 32 in alcove', values: ["75 ft²", "11 ft²", "95 ft² total"] },
          { label: '60 x 32 in alcove', values: ["82 ft²", "13 ft²", "105 ft² total"] },
          { label: '60 x 36 in alcove', values: ["88 ft²", "15 ft²", "113 ft² total"] },
          { label: '72 x 42 in walk-in', values: ["101 ft²", "21 ft²", "134 ft² total"] },
        ]}
      />

      <p>
        Two notes on reading that. The IRC requires a shower compartment
        to have at least 900 square inches of floor area and to fit a 30
        inch circle, which is why 32 by 32 is the practical minimum and
        why anything smaller is a code problem rather than a tight
        squeeze. And a niche adds far more work than its four square feet
        suggest: it has a floor, a back, two sides, a top, and often a
        bullnose edge, all in small cut pieces.
      </p>

      <Figure
        number={2}
        caption="The floor pitches to the drain from every direction at once. A 2 inch mosaic sheet flexes across that compound curve; a 12 by 24 plank spans it and traps water at the low edge."
      >
        <SlopeSVG />
      </Figure>

      <h2>The best tile for a shower floor</h2>
      <p>
        A shower floor slopes a quarter inch per foot toward the drain,
        and it does so in every direction, which makes it a shallow cone
        rather than a plane. Tile has to follow that shape. Mosaic sheets
        at 2 inches and under articulate across the slope because each
        small piece can sit at a slightly different angle. Large format
        tile cannot: it bridges the curve, leaves voids under the middle,
        and holds standing water at the low edge. That is the entire
        reason showers pair big shower wall tile with small shower floor tile, and it is
        a physical constraint rather than a style convention.
      </p>
      <p>
        Slip resistance is the second constraint. ANSI A137.1 defines a
        wet dynamic coefficient of friction, DCOF, and 0.42 is the
        threshold for level interior areas expected to be walked on wet.
        Manufacturers publish the number on the spec sheet. Polished
        porcelain, which looks superb on a wall, generally fails it, and a
        polished tile on a shower floor is a genuine hazard rather than a
        preference. The extra grout lines in a mosaic help here too,
        which is a second argument for the same answer.
      </p>

      <ComparisonTable
        caption="What belongs where. The best tile for a shower floor is almost always a mosaic under 2 inches with a published DCOF at or above 0.42."
        columns={[
          { title: "Walls" },
          { title: "Floor", highlight: true },
        ]}
        rows={[
          { label: "Typical size", values: ['3x6 subway up to 12x24', '1x1 or 2x2 mosaic'] },
          { label: "Finish", values: ["Polished, matte, or glossy all fine", "Matte or textured, DCOF 0.42 or higher"] },
          { label: "Material", values: ["Porcelain, ceramic, glass, stone", "Porcelain or unglazed mosaic"] },
          { label: "Grout joints", values: ["1/16 to 1/8 in", "1/16 to 1/8 in, far more of them"] },
          { label: "Why", values: ["Flat plane, no traffic, appearance leads", "Compound slope plus wet footing"] },
        ]}
      />

      <Figure
        number={3}
        caption="Waste by layout. Order the whole job in one dye lot: a second order weeks later will not match, and in a space this small a shade difference is unmissable."
      >
        <WasteSVG />
      </Figure>

      <h2>Shower pans: mud bed or tile-ready</h2>
      <p>
        Under the floor tile sits a pan, and there are two ways to build
        one. The traditional method is a mortar bed sloped by hand over a
        membrane, which is inexpensive in materials, entirely dependent on
        the installer, and the source of most old shower failures. The
        modern method is a pre-sloped foam shower pan, sold as a tile ready shower pan
        or shower base for tile, with the slope moulded in and a bonded
        waterproofing sheet over the top.
      </p>
      <p>
        A tile ready shower pan costs $200 to $600 against perhaps $60 of mortar,
        and they are worth it for most people. The slope is correct by
        manufacture, the waterproofing is a tested system rather than a
        field assembly, and the whole thing goes in during one afternoon
        instead of two days with a cure between. They come in standard
        sizes matching the alcove dimensions in the table above, with
        center, offset, or linear drain options. The tile quantity does
        not change; what changes is whether the substrate under it is
        reliable.
      </p>

      <h2>Waterproofing is the part nobody sees</h2>
      <p>
        Cement board is not waterproof. This surprises people, and it is
        the single most consequential misunderstanding in shower
        construction. Backer board is a stable substrate that tolerates
        moisture; the waterproofing is a separate layer, either a sheet
        membrane bonded over the board or a liquid-applied membrane rolled
        on in two coats to a specified thickness. Both are specified to
        ANSI A118.10, and both are the reason the shower does not rot the
        framing behind it in six years.
      </p>
      <p>
        The corollary matters for the tile order: seams, corners, and the
        curb all need treatment before any tile goes on, and the niche
        needs waterproofing wrapped into it. If a quote does not name a
        waterproofing system, that is the question to ask before
        discussing tile at all. Tile and grout are water resistant, not
        waterproof; water passes through grout continuously and the
        membrane behind is what catches it.
      </p>

      <Scenario location="Portland, OR">
        <p>
          A 60 by 32 inch alcove replacing an old fiberglass surround.
          Walls tiled to 96 inches in 3 by 6 subway laid in running bond,
          floor in 2 by 2 porcelain mosaic, plus a 14 by 24 inch niche and
          a tiled curb.
        </p>
        <p>
          Walls: 82 ft&#178;. Floor: 13 ft&#178;. Niche and curb: about 6
          ft&#178; of surfaces, nearly all cuts. Subway at 10 percent
          waste means ordering 97 ft&#178; of wall tile; the mosaic at 10
          percent means 15 ft&#178;, which is four or five sheets more
          than the bare number because sheets come in fixed sizes. At $4
          per square foot for the subway and $12 for the mosaic, tile runs
          about $570. The tile-ready pan adds $380, the waterproofing
          system about $250, and thinset, grout, and trim another $200.
          Materials land near $1,400, with the tile itself less than half
          of it, which is the part homeowners consistently misjudge.
        </p>
      </Scenario>

      <h2>Where shower tile jobs go wrong</h2>
      <p>
        <strong>Ordering wall and floor as one number.</strong> They are
        different products at different prices with different waste. A
        combined square footage buys the wrong quantity of both.
      </p>
      <p>
        <strong>Large tile on the shower floor.</strong> Covered above,
        and it keeps happening because the plank looks continuous with the
        bathroom floor. It cannot follow the slope, and the result is
        ponding and eventually a failed installation.
      </p>
      <p>
        <strong>Forgetting the niche and curb are all cuts.</strong> Six
        square feet of surfaces can consume fifteen square feet of tile
        once every piece is trimmed with a bullnose or mitred edge. Bump
        the waste factor rather than the area.
      </p>
      <p>
        <strong>Buying in two orders.</strong> Tile is made in dye lots
        and shade varies between them. In a space where every wall is
        within arm&apos;s reach, a lot mismatch reads instantly. Order the
        whole job at once and keep the leftovers for future repairs.
      </p>

      <Callout label="The 900 square inch rule and the 30 inch circle">
        IRC P2708 requires a shower compartment to provide at least 900
        square inches of floor area and to accommodate a 30 inch circle
        clear of the door swing, measured from the finished interior
        surfaces. When you tile inside an existing framed opening you lose
        an inch or so per wall to backer board, membrane, thinset, and
        tile, which occasionally drops a marginal shower below the
        minimum. Check the finished dimension, not the framed one.
      </Callout>

      <h2>The rest of the bathroom</h2>
      <p>
        Shower tile is one line in a bathroom budget. Grout for all those
        joints runs through the{" "}
        <a href="/grout-calculator">grout calculator</a>, the vanity on
        the opposite wall is a{" "}
        <a href="/vanity-calculator">vanity calculator</a> question, and
        backer board quantities come from the{" "}
        <a href="/drywall-calculator">drywall calculator</a>. If the drain
        or supply lines are moving, size them with the{" "}
        <a href="/drain-pipe-calculator">drain pipe calculator</a>.
      </p>
      <p>
        Measure each wall, add the floor separately, run it through the
        calculator above, and order both in one go. The tile is the easy
        part; what goes behind it is what lasts.
      </p>
    </>
  );
}
