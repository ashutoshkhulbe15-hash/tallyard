import type { GuideConfig } from "@/lib/guides-types";
import {
  ComparisonTable,
  Callout,
  CalculatorCTA,
} from "@/components/GuideComponents";
import {
  Figure,
  GuideByline,
  MethodologyNote,
  Scenario,
  GUIDE_SVG,
} from "@/components/GuideChrome";

// ---------------------------------------------------------------------------
// SVG 1 — 20-year TCO line chart showing cost accumulation over time
// ---------------------------------------------------------------------------

function TCOOverTimeSVG() {
  // Chart area: x=60 to x=640 (580px), y=40 to y=240 (200px)
  // X: 0 to 20 years. Y: $0 to $30,000
  const xScale = (yr: number) => 60 + yr * (580 / 20);
  const yScale = (cost: number) => 240 - cost * (200 / 30000);

  // Cumulative cost at key milestones
  const pt = [
    { yr: 0, cost: 12000 },
    { yr: 2, cost: 12600 },
    { yr: 4, cost: 13200 },
    { yr: 6, cost: 13800 },
    { yr: 8, cost: 14400 },
    { yr: 10, cost: 15000 },
    { yr: 12, cost: 15600 },
    { yr: 14, cost: 16200 },
    { yr: 15, cost: 27800 }, // replacement
    { yr: 17, cost: 28400 },
    { yr: 20, cost: 29300 },
  ];
  const cedar = [
    { yr: 0, cost: 12000 },
    { yr: 3, cost: 12250 },
    { yr: 6, cost: 12750 },
    { yr: 9, cost: 13250 },
    { yr: 12, cost: 13750 },
    { yr: 15, cost: 14100 },
    { yr: 18, cost: 14600 },
    { yr: 20, cost: 14950 },
  ];
  const comp = [
    { yr: 0, cost: 19000 },
    { yr: 5, cost: 19200 },
    { yr: 10, cost: 19450 },
    { yr: 15, cost: 19700 },
    { yr: 20, cost: 19950 },
  ];

  const toPoints = (data: { yr: number; cost: number }[]) =>
    data.map((d) => `${xScale(d.yr).toFixed(0)},${yScale(d.cost).toFixed(0)}`).join(" ");

  return (
    <svg viewBox="0 0 680 330" width="100%" height="auto" role="img"
      aria-label="Line chart showing cumulative cost over 20 years. Pressure-treated starts cheapest but spikes at year 15 due to replacement, ending at $29,300. Cedar rises slowly to $14,950. Composite starts highest at $19,000 but barely rises, ending at $19,950.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Cumulative cost over 20 years
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        320 sq ft deck, mid-range install, professional maintenance
      </text>

      {/* Y axis */}
      {[0, 10000, 20000, 30000].map((v) => (
        <g key={v}>
          <text x="52" y={yScale(v) + 4} textAnchor="end" fontSize="10" fill={GUIDE_SVG.inkFaint}>
            ${(v / 1000).toFixed(0)}k
          </text>
          <line x1="58" y1={yScale(v)} x2="640" y2={yScale(v)}
            stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
        </g>
      ))}
      <line x1="58" y1="240" x2="640" y2="240" stroke={GUIDE_SVG.ink} strokeWidth="1" />

      {/* X axis */}
      {[0, 5, 10, 15, 20].map((yr) => (
        <text key={yr} x={xScale(yr)} y="258" textAnchor="middle" fontSize="10"
          fill={GUIDE_SVG.inkFaint}>{yr} yr</text>
      ))}

      {/* PT line */}
      <polyline points={toPoints(pt)} fill="none" stroke={GUIDE_SVG.inkFaint}
        strokeWidth="2" strokeLinecap="round" />
      {pt.map((d, i) => (
        <circle key={i} cx={xScale(d.yr)} cy={yScale(d.cost)} r="2" fill={GUIDE_SVG.inkFaint} />
      ))}

      {/* Cedar line */}
      <polyline points={toPoints(cedar)} fill="none" stroke="#8B6B3D"
        strokeWidth="2" strokeLinecap="round" />
      {cedar.map((d, i) => (
        <circle key={i} cx={xScale(d.yr)} cy={yScale(d.cost)} r="2" fill="#8B6B3D" />
      ))}

      {/* Composite line */}
      <polyline points={toPoints(comp)} fill="none" stroke={GUIDE_SVG.accent}
        strokeWidth="2.5" strokeLinecap="round" />
      {comp.map((d, i) => (
        <circle key={i} cx={xScale(d.yr)} cy={yScale(d.cost)} r="2.5" fill={GUIDE_SVG.accent} />
      ))}

      {/* PT replacement spike annotation */}
      <text x={xScale(15) + 6} y={yScale(27800) - 4} fontSize="9"
        fill={GUIDE_SVG.inkFaint} fontStyle="italic">
        decking replaced
      </text>

      {/* Legend */}
      <g transform="translate(60, 280)">
        <line x1="0" y1="6" x2="18" y2="6" stroke={GUIDE_SVG.inkFaint} strokeWidth="2" />
        <text x="24" y="10" fontSize="11" fill={GUIDE_SVG.ink}>Pressure-treated ($29,300)</text>

        <line x1="190" y1="6" x2="208" y2="6" stroke="#8B6B3D" strokeWidth="2" />
        <text x="214" y="10" fontSize="11" fill={GUIDE_SVG.ink}>Cedar ($14,950)</text>

        <line x1="340" y1="6" x2="358" y2="6" stroke={GUIDE_SVG.accent} strokeWidth="2.5" />
        <text x="364" y="10" fontSize="11" fill={GUIDE_SVG.ink}>Composite ($19,950)</text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 2 — Deck anatomy: frame vs surface
// ---------------------------------------------------------------------------

function DeckAnatomySVG() {
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img"
      aria-label="Simplified deck cross-section showing that the frame underneath is always pressure-treated lumber regardless of what decking material you choose for the surface.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Deck anatomy: your material choice only affects the top layer
      </text>

      {/* Frame (PT always) */}
      <rect x="60" y="120" width="560" height="60" rx="4" fill="#F5E6C8"
        stroke="#C4A86C" strokeWidth="1" />
      <text x="340" y="148" textAnchor="middle" fontSize="12" fontWeight="600"
        fill={GUIDE_SVG.ink}>Frame: always pressure-treated</text>
      <text x="340" y="166" textAnchor="middle" fontSize="10"
        fill={GUIDE_SVG.inkFaint}>Joists, beams, posts, ledger — same cost regardless</text>

      {/* Surface boards (choice) */}
      <rect x="60" y="65" width="176" height="45" rx="4" fill={GUIDE_SVG.slateSoft}
        stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="148" y="88" textAnchor="middle" fontSize="11" fontWeight="600"
        fill={GUIDE_SVG.ink}>Pressure-treated</text>
      <text x="148" y="102" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.inkFaint}>$3–6 / ft²</text>

      <rect x="252" y="65" width="176" height="45" rx="4" fill="#F0E4D0"
        stroke="#8B6B3D" strokeWidth="1" />
      <text x="340" y="88" textAnchor="middle" fontSize="11" fontWeight="600"
        fill={GUIDE_SVG.ink}>Cedar</text>
      <text x="340" y="102" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.inkFaint}>$4–8 / ft²</text>

      <rect x="444" y="65" width="176" height="45" rx="4" fill={GUIDE_SVG.accentSoft}
        stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="532" y="88" textAnchor="middle" fontSize="11" fontWeight="600"
        fill={GUIDE_SVG.ink}>Composite</text>
      <text x="532" y="102" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.inkFaint}>$5–14 / ft²</text>

      <text x="340" y="55" textAnchor="middle" fontSize="10" fontWeight="700"
        letterSpacing="1.2" fill={GUIDE_SVG.inkFaint}>SURFACE — YOUR CHOICE</text>

      <text x="340" y="210" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}
        fontStyle="italic">
        The surface is ~40% of total material cost. Switching from PT to composite adds $2,000–$4,000, not double.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 3 — Maintenance cycle comparison
// ---------------------------------------------------------------------------

function MaintenanceCycleSVG() {
  const startX = 60;
  const px = 28; // pixels per year

  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img"
      aria-label="Maintenance timeline over 20 years. Pressure-treated needs sealing every 1-2 years (10 events). Cedar needs sealing every 2-3 years (7 events). Composite needs only occasional cleaning.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Maintenance events over 20 years
      </text>

      {/* Year axis */}
      <line x1={startX} y1="195" x2={startX + 20 * px} y2="195"
        stroke={GUIDE_SVG.ink} strokeWidth="1" />
      {[0, 5, 10, 15, 20].map((yr) => (
        <text key={yr} x={startX + yr * px} y="212" textAnchor="middle"
          fontSize="10" fill={GUIDE_SVG.inkFaint}>{yr}</text>
      ))}

      {/* PT — seal every 2 years */}
      <text x={startX - 5} y="75" textAnchor="end" fontSize="10" fontWeight="600"
        fill={GUIDE_SVG.ink}>PT</text>
      <line x1={startX} y1="70" x2={startX + 20 * px} y2="70"
        stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" />
      {[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((yr) => (
        <g key={yr}>
          <rect x={startX + yr * px - 3} y="60" width="6" height="20" rx="2"
            fill={GUIDE_SVG.inkFaint} />
        </g>
      ))}
      <text x={startX + 20 * px + 8} y="75" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        10 seals
      </text>

      {/* Cedar — seal every 3 years */}
      <text x={startX - 5} y="125" textAnchor="end" fontSize="10" fontWeight="600"
        fill="#8B6B3D">Cedar</text>
      <line x1={startX} y1="120" x2={startX + 20 * px} y2="120"
        stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" />
      {[1, 4, 7, 10, 13, 16, 19].map((yr) => (
        <g key={yr}>
          <rect x={startX + yr * px - 3} y="110" width="6" height="20" rx="2"
            fill="#8B6B3D" />
        </g>
      ))}
      <text x={startX + 20 * px + 8} y="125" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        7 seals
      </text>

      {/* Composite — cleaning only */}
      <text x={startX - 5} y="175" textAnchor="end" fontSize="10" fontWeight="600"
        fill={GUIDE_SVG.accent}>Comp.</text>
      <line x1={startX} y1="170" x2={startX + 20 * px} y2="170"
        stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" />
      {[5, 10, 15, 20].map((yr) => (
        <g key={yr}>
          <circle cx={startX + yr * px} cy="170" r="4" fill="none"
            stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
        </g>
      ))}
      <text x={startX + 20 * px + 8} y="175" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        4 cleanings
      </text>

      <text x="340" y="235" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}
        fontStyle="italic">
        ■ = sealing/staining event ($150–300 each) · ○ = power wash ($50–100)
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 4 — Climate suitability matrix
// ---------------------------------------------------------------------------

function ClimateSuitabilitySVG() {
  const cols = [
    { label: "Hot + sunny", sub: "AZ, TX, FL", x: 200 },
    { label: "Hot + humid", sub: "SE coast, Gulf", x: 330 },
    { label: "Freeze-thaw", sub: "NE, MW, Rockies", x: 460 },
    { label: "Mild", sub: "PNW, mid-Atlantic", x: 590 },
  ];
  const rows = [
    { label: "Pressure-treated", y: 95, scores: ["OK", "Poor", "OK", "Good"] },
    { label: "Cedar", y: 135, scores: ["Good", "OK", "OK", "Good"] },
    { label: "Composite", y: 175, scores: ["Caution*", "Good", "Good", "Good"] },
  ];
  const scoreColor = (s: string) =>
    s === "Good" ? "#2D7F46" : s === "OK" ? GUIDE_SVG.inkFaint : s === "Poor" ? "#B53629" : GUIDE_SVG.accent;

  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img"
      aria-label="Climate suitability matrix. Composite is good in most climates but gets hot in direct sun. Cedar is good everywhere but humid. Pressure-treated struggles in hot humid climates.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Climate suitability
      </text>

      {/* Column headers */}
      {cols.map((col) => (
        <g key={col.label}>
          <text x={col.x} y="62" textAnchor="middle" fontSize="10" fontWeight="600"
            fill={GUIDE_SVG.ink}>{col.label}</text>
          <text x={col.x} y="75" textAnchor="middle" fontSize="9"
            fill={GUIDE_SVG.inkFaint}>{col.sub}</text>
        </g>
      ))}

      {/* Row headers + scores */}
      {rows.map((row) => (
        <g key={row.label}>
          <text x="135" y={row.y} textAnchor="end" fontSize="11" fontWeight="600"
            fill={GUIDE_SVG.ink}>{row.label}</text>
          <line x1="145" y1={row.y - 10} x2="650" y2={row.y - 10}
            stroke={GUIDE_SVG.inkFaint} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
          {row.scores.map((score, i) => (
            <text key={i} x={cols[i].x} y={row.y} textAnchor="middle"
              fontSize="11" fontWeight="600" fill={scoreColor(score)}>
              {score}
            </text>
          ))}
        </g>
      ))}

      <text x="340" y="215" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}
        fontStyle="italic">
        *Composite in hot sun: choose light colors. Dark composite reaches 140°F+ barefoot.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Body content — material-profile structure
// ---------------------------------------------------------------------------

function Content() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="NADRA guidelines, Trex install specs, and AWC span tables"
      />

      <p>
        A deck is one of the few home projects where the up-front price
        and the true cost are almost unrelated. Pressure-treated pine is
        the cheapest thing to install, but it needs sealing every two
        years and usually wants replacing by year 15. Composite decking
        costs twice as much to install and then costs almost nothing for
        the next 25 years. Cedar sits in between and wins on pure
        aesthetics if you actually maintain it.
      </p>

      <p>
        We ran the 20-year cost for a standard 320 square foot deck
        (16 × 20 feet, attached, one story). The answer surprised us.
      </p>

      <MethodologyNote>
        <p>
          Installed costs use mid-range 2026 pricing from HomeGuide, Angi,
          and Trex&apos;s published project costs. The 320 sq ft size
          represents a typical residential attached deck. Frame costs
          (joists, beams, posts) are constant across materials because the
          frame is pressure-treated regardless of surface. Sealing costs
          assume DIY material ($40–75 per application) plus labor time
          valued at $0 (DIY) or professional rates ($150–300 per visit).
          We used the professional rate as the baseline since most
          homeowners stop DIY-sealing after year 4.
        </p>
      </MethodologyNote>

      <Figure
        number={1}
        caption="Cumulative cost over 20 years. Pressure-treated starts cheapest but spikes at year 15 when the decking boards (not the frame) need replacing. Cedar's gentle slope reflects the sealing cycle. Composite's line is nearly flat after installation."
      >
        <TCOOverTimeSVG />
      </Figure>

      <p>
        That chart is the whole story. Pressure-treated is the most
        expensive material over 20 years. Not the cheapest. The most
        expensive. The sealing costs add up quietly, and the mid-life
        replacement hits hard. Cedar is actually the cheapest over 20
        years if you stay on the sealing schedule. Composite is the
        middle option on pure cost, but it&apos;s the cheapest option
        when you account for your time.
      </p>

      <ComparisonTable
        columns={[
          { title: "Pressure-treated", subtitle: "Southern yellow pine" },
          { title: "Cedar", subtitle: "Western red cedar" },
          { title: "Composite", subtitle: "Trex / TimberTech / Azek" },
        ]}
        rows={[
          { label: "Material", values: ["$3–6 / ft²", "$4–8 / ft²", "$5–14 / ft²"] },
          { label: "Total installed", values: ["$25–50 / ft²", "$30–47 / ft²", "$40–80 / ft²"] },
          { label: "320 ft² installed", values: ["$12,000", "$12,000", "$19,000"] },
          { label: "Lifespan (surface)", values: ["10–15 years", "15–25 years", "25–50 years"] },
          { label: "Seal frequency", values: ["Every 1–2 yr", "Every 2–3 yr", "None"] },
          { label: "20-year total", values: [<strong key="p">$29,300</strong>, <strong key="c">$14,950</strong>, <strong key="m">$19,950</strong>] },
        ]}
        caption="Installed costs at mid-range pricing. Frame is pressure-treated in all cases. PT total includes replacement of surface boards at year 15. Cedar assumes sealing maintained on schedule."
      />

      <Figure
        number={2}
        caption="Your material choice only affects the walking surface. The frame underneath — joists, beams, posts, ledger board — is pressure-treated regardless, and represents about 60% of total material cost."
      >
        <DeckAnatomySVG />
      </Figure>

      <h2>Pressure-treated: the cheapest start, the hardest commitment</h2>

      <p>
        Pressure-treated Southern yellow pine is the default. It&apos;s at
        every lumberyard, every Home Depot, and on every contractor&apos;s
        truck. The wood is infused with copper-based preservative
        (copper azole or MCA, not the old arsenic-based CCA that was
        discontinued for residential use in 2003) to resist rot and
        insects.
      </p>

      <p>
        The material itself is fine. The problem is what it demands from
        you afterward. Fresh PT lumber ships wet. It has a greenish cast
        from the copper treatment. As it dries over the first 3 to 6
        months, boards warp, twist, and cup. A good installer lets them
        acclimate before fastening. A cheap one screws them down off the
        truck and your deck has a rippled surface by fall.
      </p>

      <p>
        Once it dries, you seal it. Then you seal it again in two years.
        And again. Skip a cycle and the wood checks, splits, and grays.
        Skip three cycles and boards are soft enough to punch through
        with a screwdriver. The sealing treadmill is why most
        pressure-treated decks look rough by year 8 and get torn off by
        year 15.
      </p>

      <Scenario location="Columbus, OH (Zone 5)">
        A homeowner built a 300 sq ft PT deck in 2019 for $9,200. He
        sealed it the first year, then got busy with a new baby and
        didn&apos;t touch it for three years. By 2023 the boards were
        checking badly. By 2025 two boards near the stairs were soft
        enough to be unsafe. Total cost through 2025: the original
        $9,200 plus $1,800 for partial re-decking. He&apos;s now pricing
        composite for the replacement. Total ownership cost will be
        roughly $30,000 for a deck that should have lasted 20.
      </Scenario>

      <h2>Cedar: beautiful if you do the work</h2>

      <p>
        Western red cedar is a naturally rot-resistant softwood. No
        chemical treatment, no green tint, no copper-fastener worries.
        It lies flat, stays straight, has a warm reddish-brown color that
        most people find prettier than PT or composite, and it weathers
        to a silver-gray if you leave it alone. Some people prefer the
        weathered look and skip sealing entirely. The wood survives; it
        just changes color.
      </p>

      <p>
        Cedar&apos;s downside is softness. It dents easily. A dropped
        can of beer, a dog&apos;s claws, a dragged Adirondack chair.
        Every interaction leaves a mark. If your deck hosts kids, dogs,
        grills, and parties, cedar shows wear faster than anything else.
        That&apos;s the trade for the aesthetic.
      </p>

      <p>
        Availability is regional. Cedar is cheap and everywhere in the
        Pacific Northwest where it&apos;s harvested. East of the
        Mississippi, it&apos;s a special order. In some Eastern markets
        cedar decking costs more than mid-range composite, which flips
        the 20-year TCO math.
      </p>

      <h2>Composite: the one that costs more and asks for less</h2>

      <p>
        Modern composite decking from Trex, TimberTech, and Azek is not
        the product it was in 2010. The early versions faded, stained,
        grew mold, and felt like plastic underfoot. Current capped
        composites have polymer shells that resist all of those things,
        come with 25-to-50-year fade and stain warranties, and from ten
        feet away look convincingly like wood.
      </p>

      <p>
        Two flavors exist. WPC (wood-plastic composite) blends recycled
        wood fiber with plastic. Trex is the category inventor and
        dominant brand. PVC boards like Azek are fully synthetic, lighter,
        slightly cooler in sun, and more expensive. Both work. WPC feels
        more like wood. PVC lasts longer and resists moisture better.
      </p>

      <p>
        The one thing composite still can&apos;t solve is heat. Dark
        composite in direct afternoon sun reaches 140°F and above. That
        will burn bare feet, keep dogs off the surface, and make the deck
        unusable during the hottest hours. If your deck faces south or
        west with no shade, choose light composite colors or stick with
        wood. Lighter composite stays 30 to 40 degrees cooler than dark.
      </p>

      <Figure
        number={3}
        caption="Maintenance events over 20 years. Pressure-treated demands 10 sealing sessions. Cedar demands 7. Composite needs only periodic power washing. Each sealing event costs $150-300 if hired out, or $40-75 in materials plus a Saturday afternoon if you DIY."
      >
        <MaintenanceCycleSVG />
      </Figure>

      <CalculatorCTA
        name="Deck calculator"
        slug="deck-calculator"
        description="Boards, joists, beams, fasteners, and concrete for your specific deck dimensions. Includes material selector."
      />

      <h2>Climate compatibility</h2>

      <p>
        Where you live changes which material makes sense. This isn&apos;t
        discussed enough. A material that performs beautifully in San Diego
        might be a poor choice in Minneapolis.
      </p>

      <Figure
        number={4}
        caption="Climate suitability by material and region. 'Poor' means the material will underperform or require significantly more maintenance. 'Caution' means usable with specific precautions (light colors for composite in hot sun)."
      >
        <ClimateSuitabilitySVG />
      </Figure>

      <p>
        <strong>Hot and humid</strong> (Southeast, Gulf Coast) is the worst
        environment for pressure-treated. Mold, mildew, and algae thrive
        on the porous surface between sealing cycles. Composite with
        anti-mold capstock handles it best. Cedar does OK with annual
        cleaning.
      </p>

      <p>
        <strong>Freeze-thaw</strong> (Northeast, Upper Midwest, Rockies)
        is hardest on sealed surfaces. Water gets into micro-cracks, freezes,
        and pops the seal off. PT decks in snow country lose their finish
        faster than anywhere else. Composite wins here because there&apos;s
        nothing to crack or peel.
      </p>

      <p>
        <strong>Hot and sunny</strong> (Southwest, inland California, Texas)
        is the one climate where composite requires a specific precaution:
        use light colors. Dark composite in Phoenix or Tucson is genuinely
        unusable without shoes during summer afternoons.
      </p>

      <Callout label="The ledger flashing rule">
        Whatever material you choose, make sure the contractor properly
        flashes the ledger board where the deck attaches to the house.
        Failed ledger flashing is the number one cause of deck rot and
        structural failure, and it has nothing to do with which decking
        material you pick. A $30 piece of aluminum Z-flashing prevents
        $10,000 of rim-joist damage.
      </Callout>

      <h2>Installation details that affect longevity</h2>

      <p>
        <strong>Fasteners.</strong> PT requires stainless steel or
        ACQ-rated fasteners. Standard galvanized screws corrode in contact
        with copper-treated wood. Cedar takes any corrosion-resistant
        fastener. Composite uses hidden fastener systems or color-matched
        screws for a clean surface.
      </p>

      <p>
        <strong>Gapping.</strong> All three materials expand and contract
        differently. PT needs the largest gap (1/4 inch between boards)
        because it ships wet and shrinks as it dries. Cedar gaps at 1/8
        inch. Composite requires manufacturer-specified gapping; Trex
        calls for 1/4 inch end-to-end on 16-foot boards and 3/16 inch
        side-to-side.
      </p>

      <p>
        <strong>Joist spacing.</strong> Wood decking (PT and cedar): 16
        inches on center standard. Composite: 16 inches for straight
        runs, 12 inches for diagonal or picture-frame installs. Wider
        spacing causes composite to sag between joists. This is a
        framing decision that happens before any decking goes down. Get
        it wrong and the fix is tearing up the entire surface to add
        blocking.
      </p>

      <h2>Making the call</h2>

      <p>
        <strong>Selling within 5 years:</strong> pressure-treated. No
        reason to invest in longevity you won&apos;t see.
      </p>

      <p>
        <strong>Staying 10+ years and honest about hating maintenance:</strong>{" "}
        composite. It costs more today and saves you 10 Saturdays and
        $3,000+ over the next decade.
      </p>

      <p>
        <strong>Want a real-wood look and will actually maintain it:</strong>{" "}
        cedar. Cheapest 20-year option on paper, but only if you keep
        the sealing schedule. Be honest with yourself about whether that
        will happen.
      </p>

      <p>
        <strong>Hot sunny climate:</strong> wood (either kind) or
        light-colored composite. Dark composite in full sun is a deal
        breaker.
      </p>

      <p>
        Before ordering materials, run the board count through the{" "}
        <a href="/deck-calculator">Tallyard deck calculator</a>. Knowing
        your exact joist, beam, and decking quantities keeps contractors
        honest and avoids the surprise mid-project lumber run that always
        happens with a bad estimate.
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const compositeVsPTVsCedarDeckGuide: GuideConfig = {
  slug: "composite-vs-pressure-treated-vs-cedar-deck",
  title: "Composite vs pressure-treated vs cedar decking: 20-year cost breakdown",
  description:
    "Real 20-year total cost of ownership for composite, pressure-treated, and cedar decking. Maintenance cycles, climate suitability, and when each material wins.",
  bannerHeadline: "Composite vs PT vs cedar.",
  bannerTags: ["20-year TCO", "Maintenance cycles", "Climate matrix"],
  categoryLabel: "Landscaping",
  category: "landscaping",
  heroValue: "20-YEAR TCO",
  publishedAt: "2026-04-18",
  readTime: "12 min read",
  Content,
  faq: [
    {
      question: "Is pressure-treated really the most expensive option over 20 years?",
      answer:
        "If you include sealing costs ($150-300 per application × 10 applications = $1,500-3,000) and the near-certain need to replace surface boards around year 15 ($8,000-12,000), yes. Total 20-year cost for a 320 sq ft deck reaches $27,000-30,000. Cedar totals $14,000-15,000. Composite totals $19,000-20,000. The cheapest to install is the most expensive to own.",
    },
    {
      question: "How long does composite decking actually last?",
      answer:
        "Modern capped composite (Trex Transcend, TimberTech AZEK, etc.) carries 25-50 year warranties against fade and stain. Real-world data is still accumulating since the capped products only date to ~2015. First-generation uncapped composite from the 2000s had significant problems; current products are a different material. Expect 30+ years from any premium brand installed correctly.",
    },
    {
      question: "Does composite get too hot to walk on barefoot?",
      answer:
        "Dark colors in direct afternoon sun absolutely do — surface temperatures can reach 140°F+. Light colors (sandy browns, tans, grays) stay 30-40°F cooler. PVC boards (Azek) run slightly cooler than WPC (Trex). If your deck faces south or west in a warm climate, light composite or wood is the right call.",
    },
    {
      question: "Can I mix composite surface boards with a pressure-treated frame?",
      answer:
        "That's the standard approach. The frame (joists, beams, posts, ledger) is always pressure-treated regardless of surface material. Your material choice only affects the walking surface, which represents about 40% of total material cost.",
    },
    {
      question: "Why does cedar cost less than composite over 20 years?",
      answer:
        "Cedar's installed cost is similar to PT ($12,000 for 320 sq ft at mid-range), and it doesn't need replacing at year 15 like PT does. The sealing cycle costs less because cedar only needs it every 2-3 years (7 events) vs PT's every 1-2 years (10 events). But this only holds if you actually maintain the sealing schedule. Most people don't.",
    },
    {
      question: "What's the difference between WPC and PVC composite?",
      answer:
        "WPC (wood-plastic composite) is ~40% wood fiber mixed with plastic — Trex is the classic example. PVC is fully synthetic — Azek pioneered this. PVC is lighter, slightly cooler in sun, more moisture-resistant, and more expensive. WPC feels more like wood and costs less. Both are valid; the choice is mostly about feel and budget.",
    },
    {
      question: "Do I need to let pressure-treated lumber dry before building?",
      answer:
        "Ideally yes. PT ships wet. Boards that are fastened immediately will warp and cup as they dry over 3-6 months. Good installers let PT acclimate for 2-4 weeks in a flat stack with stickers between layers. Many contractors skip this step — ask directly whether they acclimate and push back if they don't.",
    },
    {
      question: "How do I know my joist spacing is right for composite?",
      answer:
        "Check the manufacturer's installation guide for your specific product. Standard: 16\" on center for straight runs, 12\" for diagonal or picture-frame layouts. Trex Transcend also requires 12\" OC for 45°+ angles. Wider spacing causes visible sag between joists and voids the warranty. This must be decided at the framing stage before any decking goes down.",
    },
  ],
  sources: [
    {
      name: "NADRA — North American Deck and Railing Association",
      url: "https://www.nadra.org/",
      note: "Industry reference for deck construction standards and best practices",
    },
    {
      name: "Trex — Installation and Technical Guide",
      url: "https://www.trex.com/",
      note: "Joist spacing, gapping, and fastener requirements for capped composite decking",
    },
    {
      name: "AWC — American Wood Council Span Tables",
      url: "https://awc.org/",
      note: "Structural reference for deck framing with PT, cedar, and engineered lumber",
    },
    {
      name: "HomeGuide — 2026 Deck Cost Report",
      url: "https://homeguide.com/costs/cost-to-build-a-deck",
      note: "Current installed cost ranges for all residential deck materials",
    },
    {
      name: "Angi — 2026 Deck Building Costs",
      url: "https://www.angi.com/articles/how-much-does-it-cost-build-deck.htm",
      note: "Labor and material cost data by material type and deck size",
    },
  ],
  relatedCalculators: [
    { name: "Deck calculator", slug: "deck-calculator", description: "Boards, joists, beams, and fasteners for any deck" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for framing and decking orders" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Footings for deck support posts" },
    { name: "Stair calculator", slug: "stair-calculator", description: "Code-compliant stairs from deck to ground" },
  ],
  relatedGuides: [
    { name: "Vinyl vs fiber cement siding", slug: "vinyl-vs-fiber-cement-siding", description: "30-year cost comparison for exterior cladding" },
    { name: "Heat pump vs furnace + AC", slug: "heat-pump-vs-furnace", description: "Climate-zone cost comparison for HVAC" },
  ],
};
