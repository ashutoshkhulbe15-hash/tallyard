import type { GuideConfig } from "@/lib/guides-types";
import {
  Figure,
  GuideByline,
  MethodologyNote,
  Scenario,
  GUIDE_SVG,
} from "@/components/GuideChrome";

// ---------------------------------------------------------------------------
// SVG 1 — How a heat pump actually moves energy
// ---------------------------------------------------------------------------

function HeatPumpMechanicsSVG() {
  return (
    <svg
      viewBox="0 0 680 300"
      width="100%"
      height="auto"
      role="img"
      aria-label="Diagram showing a heat pump moving 3 kWh of thermal energy from 20°F outdoor air to indoor air, using 1 kWh of electricity, delivering 4 kWh of heat"
    >
      <defs>
        <marker
          id="hpArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1 L8 5 L2 9"
            fill="none"
            stroke={GUIDE_SVG.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </marker>
        <marker
          id="hpArrowGrey"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1 L8 5 L2 9"
            fill="none"
            stroke={GUIDE_SVG.inkFaint}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </marker>
      </defs>

      {/* Outdoor side */}
      <rect
        x="20"
        y="40"
        width="180"
        height="180"
        rx="8"
        fill={GUIDE_SVG.slateSoft}
        stroke={GUIDE_SVG.slate}
        strokeWidth="1"
      />
      <text
        x="110"
        y="66"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
        fill={GUIDE_SVG.inkMuted}
      >
        OUTDOOR
      </text>
      <text
        x="110"
        y="108"
        textAnchor="middle"
        fontSize="36"
        fontWeight="700"
        fill={GUIDE_SVG.ink}
      >
        20°F
      </text>
      <text
        x="110"
        y="130"
        textAnchor="middle"
        fontSize="11"
        fill={GUIDE_SVG.inkFaint}
      >
        cold winter air
      </text>
      {/* thermal energy dots */}
      <g transform="translate(110,172)">
        <circle cx="-28" cy="-2" r="3" fill={GUIDE_SVG.cool} opacity="0.7" />
        <circle cx="-12" cy="6" r="2.5" fill={GUIDE_SVG.cool} opacity="0.55" />
        <circle cx="4" cy="-4" r="3" fill={GUIDE_SVG.cool} opacity="0.7" />
        <circle cx="18" cy="4" r="2.5" fill={GUIDE_SVG.cool} opacity="0.55" />
        <circle cx="30" cy="-2" r="3" fill={GUIDE_SVG.cool} opacity="0.7" />
        <text
          x="2"
          y="30"
          textAnchor="middle"
          fontSize="10"
          fill={GUIDE_SVG.cool}
        >
          thermal energy
        </text>
      </g>

      {/* Heat pump */}
      <rect
        x="250"
        y="95"
        width="180"
        height="85"
        rx="8"
        fill={GUIDE_SVG.walnut}
      />
      <text
        x="340"
        y="128"
        textAnchor="middle"
        fontSize="15"
        fontWeight="600"
        fill="#FFFFFF"
      >
        Heat pump
      </text>
      <text
        x="340"
        y="152"
        textAnchor="middle"
        fontSize="11"
        fill={GUIDE_SVG.accent}
      >
        compressor + refrigerant
      </text>

      {/* Arrow: outdoor → heat pump */}
      <path
        d="M205 140 L245 140"
        stroke={GUIDE_SVG.accent}
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#hpArrow)"
      />
      <text
        x="225"
        y="130"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={GUIDE_SVG.accent}
      >
        3 kWh
      </text>

      {/* Arrow: heat pump → indoor */}
      <path
        d="M435 140 L475 140"
        stroke={GUIDE_SVG.accent}
        strokeWidth="3.5"
        fill="none"
        markerEnd="url(#hpArrow)"
      />
      <text
        x="455"
        y="130"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={GUIDE_SVG.accent}
      >
        4 kWh
      </text>

      {/* Electricity in from below */}
      <path
        d="M340 255 L340 195"
        stroke={GUIDE_SVG.inkFaint}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3,3"
        markerEnd="url(#hpArrowGrey)"
      />
      <text
        x="340"
        y="275"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={GUIDE_SVG.ink}
      >
        1 kWh electricity
      </text>

      {/* Indoor side */}
      <rect
        x="480"
        y="40"
        width="180"
        height="180"
        rx="8"
        fill={GUIDE_SVG.accentSoft}
        stroke={GUIDE_SVG.accent}
        strokeWidth="1"
      />
      <text
        x="570"
        y="66"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
        fill={GUIDE_SVG.inkMuted}
      >
        INDOOR
      </text>
      <text
        x="570"
        y="108"
        textAnchor="middle"
        fontSize="36"
        fontWeight="700"
        fill={GUIDE_SVG.ink}
      >
        72°F
      </text>
      <text
        x="570"
        y="130"
        textAnchor="middle"
        fontSize="11"
        fill={GUIDE_SVG.inkFaint}
      >
        comfortable
      </text>
      {/* warm air waves */}
      <g transform="translate(570,175)">
        <path
          d="M-30 0 Q-22 -6, -15 0 T 0 0 T 15 0 T 30 0"
          fill="none"
          stroke={GUIDE_SVG.accent}
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M-30 10 Q-22 4, -15 10 T 0 10 T 15 10 T 30 10"
          fill="none"
          stroke={GUIDE_SVG.accent}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <text
          x="0"
          y="30"
          textAnchor="middle"
          fontSize="10"
          fill={GUIDE_SVG.accent}
        >
          heat delivered
        </text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 2 — Annual operating cost by climate zone
// ---------------------------------------------------------------------------

function OperatingCostByZoneSVG() {
  // Bar scale: max $3000 → 150px. Baseline y=230.
  const scale = 0.05;
  const base = 230;
  const zones = [
    { label: "Zone 1–2", sub: "Hot", hp: 950, fac: 1350, x: 70 },
    { label: "Zone 3", sub: "Warm", hp: 1050, fac: 1350, x: 160 },
    { label: "Zone 4", sub: "Mixed", hp: 1250, fac: 1550, x: 250 },
    { label: "Zone 5", sub: "Cold", hp: 1600, fac: 1700, x: 340 },
    { label: "Zone 6", sub: "Colder", hp: 2100, fac: 2000, x: 430 },
    { label: "Zone 7", sub: "Very cold", hp: 3000, fac: 2500, x: 520 },
  ];

  return (
    <svg
      viewBox="0 0 680 330"
      width="100%"
      height="auto"
      role="img"
      aria-label="Bar chart comparing annual heating and cooling costs for heat pump vs furnace plus AC across seven climate zones. Heat pump wins in zones 1 through 5. Furnace plus AC wins in zones 6 and 7."
    >
      <text
        x="20"
        y="26"
        fontSize="13"
        fontWeight="600"
        fill={GUIDE_SVG.ink}
      >
        Annual heating + cooling cost by climate zone
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        2,000 sq ft home, 2025 average US energy prices
      </text>

      {/* Y axis labels */}
      <text
        x="52"
        y="83"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        $3,000
      </text>
      <text
        x="52"
        y="133"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        $2,000
      </text>
      <text
        x="52"
        y="183"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        $1,000
      </text>
      <text
        x="52"
        y="233"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        $0
      </text>

      {/* Grid lines */}
      {[80, 130, 180].map((y) => (
        <line
          key={y}
          x1="58"
          y1={y}
          x2="660"
          y2={y}
          stroke={GUIDE_SVG.inkFaint}
          strokeWidth="0.5"
          strokeDasharray="2,2"
          opacity="0.3"
        />
      ))}
      <line
        x1="58"
        y1={base}
        x2="660"
        y2={base}
        stroke={GUIDE_SVG.ink}
        strokeWidth="1"
      />

      {/* Bars */}
      {zones.map((z) => {
        const hpH = z.hp * scale;
        const facH = z.fac * scale;
        return (
          <g key={z.label} transform={`translate(${z.x},0)`}>
            <rect
              x="0"
              y={base - hpH}
              width="25"
              height={hpH}
              fill={GUIDE_SVG.accent}
            />
            <rect
              x="28"
              y={base - facH}
              width="25"
              height={facH}
              fill={GUIDE_SVG.slate}
            />
            <text
              x="27"
              y="250"
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={GUIDE_SVG.ink}
            >
              {z.label}
            </text>
            <text
              x="27"
              y="264"
              textAnchor="middle"
              fontSize="9"
              fill={GUIDE_SVG.inkFaint}
            >
              {z.sub}
            </text>
          </g>
        );
      })}

      {/* Crossover annotation */}
      <line
        x1="410"
        y1="100"
        x2="410"
        y2={base}
        stroke={GUIDE_SVG.accent}
        strokeWidth="0.75"
        strokeDasharray="4,3"
        opacity="0.55"
      />
      <text
        x="410"
        y="95"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill={GUIDE_SVG.accent}
      >
        crossover
      </text>

      {/* Legend */}
      <g transform="translate(70,295)">
        <rect x="0" y="0" width="12" height="12" fill={GUIDE_SVG.accent} />
        <text
          x="18"
          y="10"
          fontSize="11"
          fill={GUIDE_SVG.ink}
        >
          Heat pump
        </text>
        <rect x="112" y="0" width="12" height="12" fill={GUIDE_SVG.slate} />
        <text
          x="130"
          y="10"
          fontSize="11"
          fill={GUIDE_SVG.ink}
        >
          Furnace + AC
        </text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 3 — COP vs outdoor temperature (cold-climate performance)
// ---------------------------------------------------------------------------

function COPvsTempSVG() {
  // Chart area: x from 60 to 660 (600px), y from 40 (top, COP 4) to 260 (bottom, COP 0)
  // X axis: -20°F to 70°F (90° range)
  // X scale: (temp + 20) * (600/90)
  // Y scale: COP maps 0 to 4 → 260 to 40 (so COP = (260 - y)/55)
  const tToX = (t: number) => 60 + (t + 20) * (600 / 90);
  const cToY = (c: number) => 260 - c * 55;

  const standardCurve = [
    { t: 70, c: 3.8 },
    { t: 47, c: 3.5 },
    { t: 32, c: 3.0 },
    { t: 20, c: 2.2 },
    { t: 10, c: 1.5 },
    { t: 0, c: 1.0 },
  ];

  const coldClimateCurve = [
    { t: 70, c: 4.0 },
    { t: 47, c: 3.8 },
    { t: 32, c: 3.3 },
    { t: 17, c: 2.8 },
    { t: 5, c: 2.2 },
    { t: -5, c: 1.9 },
    { t: -15, c: 1.65 },
  ];

  const stdPoints = standardCurve
    .map((p) => `${tToX(p.t).toFixed(1)},${cToY(p.c).toFixed(1)}`)
    .join(" ");
  const ccPoints = coldClimateCurve
    .map((p) => `${tToX(p.t).toFixed(1)},${cToY(p.c).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 680 330"
      width="100%"
      height="auto"
      role="img"
      aria-label="Line chart showing that a standard heat pump loses efficiency below 20°F and drops to COP 1.0 at 0°F, while a cold-climate heat pump maintains COP above 1.6 down to -15°F"
    >
      <text
        x="20"
        y="26"
        fontSize="13"
        fontWeight="600"
        fill={GUIDE_SVG.ink}
      >
        Efficiency (COP) as outdoor temperature drops
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        COP 1.0 = same efficiency as electric resistance. Higher is better.
      </text>

      {/* Y axis labels */}
      <text
        x="52"
        y="45"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        COP 4
      </text>
      <text
        x="52"
        y="100"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        3
      </text>
      <text
        x="52"
        y="155"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        2
      </text>
      <text
        x="52"
        y="210"
        textAnchor="end"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        1
      </text>

      {/* X axis labels */}
      <text
        x={tToX(-15)}
        y="278"
        textAnchor="middle"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        -15°F
      </text>
      <text
        x={tToX(0)}
        y="278"
        textAnchor="middle"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        0°F
      </text>
      <text
        x={tToX(20)}
        y="278"
        textAnchor="middle"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        20°F
      </text>
      <text
        x={tToX(47)}
        y="278"
        textAnchor="middle"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        47°F (rated)
      </text>
      <text
        x={tToX(70)}
        y="278"
        textAnchor="middle"
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
      >
        70°F
      </text>

      {/* Grid */}
      {[100, 155, 210].map((y) => (
        <line
          key={y}
          x1="58"
          y1={y}
          x2="660"
          y2={y}
          stroke={GUIDE_SVG.inkFaint}
          strokeWidth="0.5"
          strokeDasharray="2,2"
          opacity="0.3"
        />
      ))}
      <line
        x1="58"
        y1="45"
        x2="58"
        y2="260"
        stroke={GUIDE_SVG.ink}
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="260"
        x2="660"
        y2="260"
        stroke={GUIDE_SVG.ink}
        strokeWidth="1"
      />

      {/* Backup-heat needed zone (below COP 1.5) */}
      <rect
        x="58"
        y={cToY(1.5)}
        width="602"
        height={260 - cToY(1.5)}
        fill={GUIDE_SVG.slate}
        opacity="0.12"
      />
      <text
        x="450"
        y={cToY(0.6)}
        fontSize="10"
        fill={GUIDE_SVG.inkFaint}
        fontStyle="italic"
      >
        backup heat needed here
      </text>

      {/* Standard heat pump curve */}
      <polyline
        points={stdPoints}
        fill="none"
        stroke={GUIDE_SVG.slate}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {standardCurve.map((p, i) => (
        <circle
          key={i}
          cx={tToX(p.t)}
          cy={cToY(p.c)}
          r="2.5"
          fill={GUIDE_SVG.slate}
        />
      ))}
      <text
        x={tToX(0) + 6}
        y={cToY(1.0) - 8}
        fontSize="10"
        fill={GUIDE_SVG.slate}
        fontWeight="600"
      >
        Standard HP
      </text>

      {/* Cold-climate heat pump curve */}
      <polyline
        points={ccPoints}
        fill="none"
        stroke={GUIDE_SVG.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {coldClimateCurve.map((p, i) => (
        <circle
          key={i}
          cx={tToX(p.t)}
          cy={cToY(p.c)}
          r="2.5"
          fill={GUIDE_SVG.accent}
        />
      ))}
      <text
        x={tToX(-10)}
        y={cToY(1.9) - 8}
        fontSize="10"
        fill={GUIDE_SVG.accent}
        fontWeight="600"
      >
        Cold-climate HP
      </text>

      {/* Legend */}
      <g transform="translate(70,300)">
        <line
          x1="0"
          y1="6"
          x2="18"
          y2="6"
          stroke={GUIDE_SVG.accent}
          strokeWidth="2.5"
        />
        <text x="24" y="10" fontSize="11" fill={GUIDE_SVG.ink}>
          Cold-climate (Mitsubishi FH, Fujitsu XLTH)
        </text>
        <line
          x1="300"
          y1="6"
          x2="318"
          y2="6"
          stroke={GUIDE_SVG.slate}
          strokeWidth="2"
        />
        <text x="324" y="10" fontSize="11" fill={GUIDE_SVG.ink}>
          Standard residential heat pump
        </text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 4 — Install cost with and without 25C federal tax credit
// ---------------------------------------------------------------------------

function InstallCostSVG() {
  // Bar region x=145 to x=640 = 495px. Max $15,000 → 495px. Scale = 0.033
  const scale = 0.033;
  const rows = [
    { label: "Heat pump", before: 11000, after: 9000, y: 75 },
    { label: "Furnace + AC", before: 10500, after: 9900, y: 158 },
    { label: "Dual-fuel", before: 15000, after: 13000, y: 241 },
  ];

  return (
    <svg
      viewBox="0 0 680 320"
      width="100%"
      height="auto"
      role="img"
      aria-label="Horizontal bar chart showing installation costs before and after the federal 25C tax credit. Heat pump: $11,000 before, $9,000 after. Furnace plus AC: $10,500 before, $9,900 after. Dual-fuel: $15,000 before, $13,000 after."
    >
      <text
        x="20"
        y="26"
        fontSize="13"
        fontWeight="600"
        fill={GUIDE_SVG.ink}
      >
        Install cost with federal 25C tax credit
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        3-ton residential equipment, 2026 ENERGY STAR-qualifying models
      </text>

      {rows.map((row) => (
        <g key={row.label}>
          <text
            x="135"
            y={row.y + 13}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill={GUIDE_SVG.ink}
          >
            {row.label}
          </text>
          {/* Sticker bar (slate) */}
          <rect
            x="145"
            y={row.y}
            width={row.before * scale}
            height="14"
            fill={GUIDE_SVG.slate}
          />
          <text
            x={150 + row.before * scale}
            y={row.y + 11}
            fontSize="10"
            fill={GUIDE_SVG.inkMuted}
          >
            ${row.before.toLocaleString()} sticker
          </text>
          {/* After-credit bar (accent) */}
          <rect
            x="145"
            y={row.y + 18}
            width={row.after * scale}
            height="14"
            fill={GUIDE_SVG.accent}
          />
          <text
            x={150 + row.after * scale}
            y={row.y + 29}
            fontSize="10"
            fontWeight="700"
            fill={GUIDE_SVG.accent}
          >
            ${row.after.toLocaleString()} after credit
          </text>
        </g>
      ))}

      {/* X axis */}
      <line
        x1="145"
        y1="290"
        x2="640"
        y2="290"
        stroke={GUIDE_SVG.inkFaint}
        strokeWidth="0.5"
      />
      {[0, 5000, 10000, 15000].map((v) => (
        <g key={v}>
          <text
            x={145 + v * scale}
            y="307"
            textAnchor="middle"
            fontSize="9"
            fill={GUIDE_SVG.inkFaint}
          >
            ${v.toLocaleString()}
          </text>
          <line
            x1={145 + v * scale}
            y1="287"
            x2={145 + v * scale}
            y2="293"
            stroke={GUIDE_SVG.inkFaint}
            strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Body content
// ---------------------------------------------------------------------------

function Content() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="DOE, EPA Energy Star, and ACCA Manual J guidance"
      />

      <p>
        Your furnace dies in the middle of January. Or it&apos;s going to,
        sometime this year, probably. You called three HVAC contractors for
        quotes. Two of them wrote you a bid for a new gas furnace plus a
        matching AC unit, the same two-machine setup most houses have had
        since the 1980s. The third one mentioned heat pumps in passing,
        then spent more time explaining them than recommending them.
      </p>

      <p>
        Now you&apos;re on the internet trying to figure out whether the
        heat pump people have a point, or whether the contractors you
        trust with your money know something the internet doesn&apos;t.
      </p>

      <p>
        Short version: in most of the country in 2026, the heat pump
        people are right. Operating cost has dropped below gas-furnace
        economics in five of seven US climate zones, federal tax credits
        of up to $2,000 close most of what&apos;s left of the
        installation gap, and cold-climate models from Mitsubishi,
        Fujitsu, and Daikin now keep houses warm at minus fifteen
        degrees. What matters is which climate zone you live in, how
        cheap your natural gas is, and whether your electrical panel can
        handle the load. That&apos;s what this guide walks through, with
        actual numbers.
      </p>

      <MethodologyNote>
        <p>
          Operating cost estimates use 2025 US average energy prices from
          the EIA: $0.16/kWh electricity and $1.40/therm natural gas. Heat
          load assumes 2,000 sq ft with IECC-zone-appropriate insulation
          (R-49 attic, R-20 walls in colder zones). Heat pump efficiency
          uses HSPF2 ratings from Energy Star&apos;s current qualifying
          product list. Numbers will drift if your local electricity is
          cheap (parts of the Pacific Northwest) or gas is cheap (Upper
          Midwest). Directionally correct; not a substitute for a Manual J
          load calculation from a licensed HVAC contractor.
        </p>
      </MethodologyNote>

      <h2>How a heat pump actually works</h2>

      <p>
        A heat pump isn&apos;t a new invention. It&apos;s an air
        conditioner running in reverse. The same refrigeration cycle that
        moves heat out of your house in summer can be pointed the other
        way in winter, pulling heat from outdoor air and delivering it
        indoors. That sounds implausible when the outdoor air is 20°F, but
        the physics work fine: even freezing air contains thermal energy
        relative to refrigerant evaporating at -10°F.
      </p>

      <Figure
        number={1}
        caption="Energy conservation for a heat pump at COP 4. Each kWh of electricity moves three kWh of thermal energy from outdoor air into the house, delivering four kWh of heat total. A gas furnace, by comparison, burns one kWh of fuel and delivers 0.95 kWh of heat."
      >
        <HeatPumpMechanicsSVG />
      </Figure>

      <p>
        That 4-to-1 ratio is the entire reason heat pumps keep winning
        against gas furnaces. Furnaces convert chemical energy into heat
        with some losses. Heat pumps move energy that already exists. For
        most outdoor temperatures most of the year, moving heat takes far
        less energy than creating it.
      </p>

      <h2>Why climate zone is the deciding factor</h2>

      <p>
        Every article you&apos;ll read online tells you &quot;it
        depends.&quot; It mostly depends on one thing: outdoor air
        temperature during heating season. A heat pump in Houston is
        operating at COP 3.5 nearly every winter night. A heat pump in
        International Falls, Minnesota is operating at COP 1.8 on the
        coldest mornings. The efficiency advantage shrinks as the
        outdoor air gets colder.
      </p>

      <p>
        The IECC splits the US into seven climate zones based on heating
        degree days. Zone 1 is South Florida. Zone 7 is northern
        Minnesota, the Upper Peninsula, parts of interior Alaska. Your
        zone is the single best predictor of whether a heat pump or a
        furnace-plus-AC will cost less to run.
      </p>

      <Figure
        number={2}
        caption="Annual energy costs at 2025 average US prices. Heat pumps save $300–$500/year in zones 1–4, break roughly even in zone 5, and lose to gas furnaces in zones 6–7. Over the 15-year life of typical equipment, zone 4 savings compound to $4,500–7,500."
      >
        <OperatingCostByZoneSVG />
      </Figure>

      <p>The pattern in that chart is what you need to remember:</p>

      <p>
        <strong>Zones 1 through 4</strong> (most of the US, including
        everything south of a line from Richmond through St. Louis to San
        Francisco). Heat pumps save meaningful money, usually $300 to
        $500 per year. The house runs on electricity with no gas line
        required. There&apos;s essentially no argument for a gas furnace
        anymore.
      </p>

      <p>
        <strong>Zone 5</strong> (Chicago, Denver, Philadelphia, Boston).
        Operating costs are within $100 per year either way. The decision
        comes down to installed cost and which fuel you&apos;d rather
        depend on. Federal tax credits usually make the heat pump the
        rational pick.
      </p>

      <p>
        <strong>Zones 6 and 7</strong> (Minneapolis, Fargo, northern
        Vermont, Alaska). Natural gas still wins on operating cost,
        especially where gas is cheap. But cold-climate heat pumps and
        dual-fuel hybrids close the gap substantially. Neither answer is
        wrong in these zones; context matters.
      </p>

      <Scenario location="Burlington, Vermont (Zone 6)">
        The Murphys replaced a 20-year-old oil furnace with a Mitsubishi
        Hyper-Heat cold-climate system in 2024. Their first full winter,
        total heating cost was $1,860 on electricity, compared to roughly
        $2,400 they&apos;d been paying for oil. They took the 25C tax
        credit ($2,000) and a Vermont state rebate ($1,200), making the
        net install cost about $1,500 more than the gas furnace + AC
        option their contractor had originally bid.
      </Scenario>

      <h2>The cold-climate question</h2>

      <p>
        For 30 years, the standard critique of heat pumps was that they
        stop working when it gets really cold. It was true until about
        2018. Standard heat pumps do lose efficiency below 30°F and
        typically can&apos;t produce useful heat below 15°F without
        expensive electric resistance backup kicking in.
      </p>

      <p>
        That&apos;s the old product. Modern cold-climate heat pumps are
        different machines. Inverter-driven variable-speed compressors
        and enhanced refrigerant circuits let them maintain a COP above
        1.8 down to -5°F and still deliver usable heat at -15°F. The
        benchmark brands are Mitsubishi Hyper-Heat (FH series), Fujitsu
        XLTH, and Daikin Aurora, though most major manufacturers now
        offer a cold-climate line.
      </p>

      <Figure
        number={3}
        caption="Coefficient of performance vs outdoor temperature for two heat pump classes. Standard equipment (NEEP-listed, HSPF2 ≈ 8) drops below COP 1.5 around 10°F. Cold-climate models maintain COP 1.9 at -5°F, a 60% efficiency advantage when it matters most."
      >
        <COPvsTempSVG />
      </Figure>

      <p>
        The spec that matters is <strong>HSPF2</strong> (Heating Seasonal
        Performance Factor, 2023 test standard). Federal minimum is 7.7.
        Zone 5 performance needs HSPF2 at or above 9.0. For zones 6 and
        7, look for 10.0 or higher, which typically means cold-climate
        certified under the NEEP (Northeast Energy Efficiency
        Partnerships) Cold Climate Air-Source Heat Pump Specification.
      </p>

      <h2>The tax credit accelerant</h2>

      <p>
        The Inflation Reduction Act extended and expanded the 25C
        Residential Energy Efficient Home Improvement Tax Credit through
        2032. For heat pumps that meet efficiency thresholds (SEER2 ≥ 16
        and HSPF2 ≥ 9 for split systems), it covers 30% of installation
        cost, capped at $2,000 per year. Most installed heat pump systems
        above $7,000 hit the cap.
      </p>

      <p>
        Separately, the HEEHRA rebate program (also IRA-funded) provides
        point-of-sale rebates up to $8,000 for income-qualified
        households, rolling out state by state. Check the DOE&apos;s
        program directory for current availability. In many states these
        stack with the 25C credit, which means some buyers pay nothing
        out of pocket for equipment costing $10,000+.
      </p>

      <Figure
        number={4}
        caption="Installation cost comparison after applying the 25C federal tax credit. Heat pumps qualify for the full $2,000. Gas furnaces qualify for $600 (95% AFUE minimum). Dual-fuel systems qualify for the heat pump&apos;s $2,000. Sticker prices vary by region and contractor; net cost after credit is what shows up on your tax return."
      >
        <InstallCostSVG />
      </Figure>

      <p>
        The furnace + AC option qualifies for the credit too, but only
        the furnace portion, and only if it&apos;s 95% AFUE or better.
        That&apos;s a $600 credit against a $10,500 install. The heat
        pump&apos;s $2,000 credit closes most of the gap, and in many
        real bids it reverses it.
      </p>

      <Scenario location="Dallas, TX (Zone 3)">
        A 2,200 sq ft house quoted at $11,800 for a heat pump (3.5 ton,
        Trane XR17, SEER2 17) or $9,900 for a 95% AFUE gas furnace plus
        14 SEER2 AC. After federal credits, net prices were $9,800 and
        $9,300. The $500 installation difference was recovered in the
        first two years of operating cost savings, after which the heat
        pump saves about $350/year for the remaining 13 years of
        expected equipment life.
      </Scenario>

      <h2>When heat pumps are the wrong answer</h2>

      <p>
        The case against is narrow but real. Four situations where a
        gas furnace plus AC still makes legitimate sense:
      </p>

      <p>
        <strong>Very cold climate plus cheap natural gas.</strong> In
        parts of Minnesota, North Dakota, and Wisconsin where natural
        gas delivers below $1.00/therm, a 95% AFUE furnace still beats
        even a cold-climate heat pump on annual operating cost. The gap
        is typically $300 to $600 per year, which compounds to $4,500 to
        $9,000 over a 15-year equipment life. That&apos;s enough to
        justify the furnace, especially if your existing gas service is
        already installed.
      </p>

      <p>
        <strong>An electrical panel that can&apos;t handle it.</strong> A
        3-ton heat pump draws up to 30 amps at 240V. Most houses built
        before 1990 have 100-amp service, and many are already near
        capacity with modern appliance loads. Upgrading to a 200-amp panel
        runs $2,000 to $4,000 and takes a day. That cost has to be added
        to the heat pump bid. Sometimes it flips the math.
      </p>

      <p>
        <strong>Ductwork sized for a furnace.</strong> Heat pump supply
        air is cooler than furnace supply air (typically 95–105°F vs
        125–140°F), which means more volume is needed to deliver the same
        heat. Undersized ducts cause cold rooms and comfort complaints.
        Proper duct modifications can add $1,500 to $5,000 to a heat pump
        install. Most contractors will skip the duct assessment unless
        you ask.
      </p>

      <p>
        <strong>Emergency replacement in February.</strong> If your AC
        died yesterday and your furnace is already 15 years old, the
        time to plan a heat pump conversion isn&apos;t now. Replace what
        failed with like equipment, then plan a heat pump conversion for
        5 to 8 years from now when the furnace wants replacing. Rushed
        heat pump installs rarely go well.
      </p>

      <h2>Before you sign the contract</h2>

      <p>
        Once you&apos;ve decided on heat pump vs furnace + AC, the next
        risk is a bad install. These are the four things to verify with
        any contractor before signing:
      </p>

      <ol>
        <li>
          <strong>Ask for a Manual J load calculation.</strong> Not
          square-foot rules of thumb. Not what your old equipment was
          sized for. An actual ACCA Manual J calculation takes 1–2 hours
          and accounts for insulation, windows, orientation, air
          leakage, and local design temperature. Contractors who refuse
          or hand-wave this are the ones who oversize your equipment.
          Oversized heat pumps short-cycle, wear out fast, and make rooms
          feel clammy.
        </li>
        <li>
          <strong>Verify the outdoor unit will clear snow.</strong> In
          any zone that gets snow, the outdoor unit needs to be mounted
          12–18 inches above grade on a stand or pad. It also needs to
          sit clear of anywhere roof snow slides off. Installations with
          the outdoor unit on the ground at a snow drop get buried and
          lose capacity every storm.
        </li>
        <li>
          <strong>Check electrical panel capacity.</strong> Get the
          contractor to calculate your current load (or do it yourself
          from the panel spec and plug-in appliance tags). If you&apos;re
          above 80 amps on a 100-amp service, budget for a panel upgrade
          before you budget for the heat pump.
        </li>
        <li>
          <strong>Specify the model number.</strong> &quot;A 3-ton
          heat pump&quot; is not a spec. &quot;Mitsubishi MSZ-FS18NA with
          SUZ-KA18NAHZ outdoor unit, HSPF2 10.5&quot; is a spec. Put the
          exact model on the contract. Substitutions happen all the
          time, and a SEER2 16 unit doesn&apos;t qualify for the tax
          credit where a SEER2 14 doesn&apos;t.
        </li>
      </ol>

      <p>
        Run a gut check on the install bid with the{" "}
        <a href="/heat-pump-calculator">Tallyard heat pump calculator</a>
        {" "}to see if the tonnage the contractor quoted matches the load
        math. A properly sized heat pump is usually smaller than a
        contractor&apos;s first guess. Oversizing is the single most
        common mistake in residential HVAC.
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const heatPumpVsFurnaceGuide: GuideConfig = {
  slug: "heat-pump-vs-furnace",
  title: "Heat pump vs furnace + AC: which wins in your climate?",
  description:
    "Climate-zone-by-zone comparison of heat pump vs gas furnace + AC. Install cost, 15-year operating cost, federal tax credits, cold-climate performance data.",
  bannerHeadline: "Heat pump vs furnace + AC.",
  bannerTags: ["Climate zone math", "IRA tax credits", "15-year TCO"],
  categoryLabel: "HVAC",
  category: "hvac",
  heroValue: "BY CLIMATE ZONE",
  publishedAt: "2026-04-18",
  readTime: "14 min read",
  Content,
  faq: [
    {
      question: "Do modern heat pumps really work below freezing?",
      answer:
        "Yes. Cold-climate heat pumps (Mitsubishi Hyper-Heat, Fujitsu XLTH, Daikin Aurora) maintain a coefficient of performance above 1.9 at -5°F and continue producing usable heat at -15°F. Standard residential heat pumps, by contrast, lose efficiency below 30°F and typically require backup heat below 15°F. For zones 5-7, specify HSPF2 ≥ 9.0 (zone 5) or ≥ 10.0 with NEEP cold-climate certification (zones 6-7).",
    },
    {
      question: "What's the difference between SEER2, HSPF2, and COP?",
      answer:
        "SEER2 (Seasonal Energy Efficiency Ratio, 2023) rates cooling efficiency across a typical cooling season. HSPF2 rates heating efficiency across a typical heating season. COP (Coefficient of Performance) is an instantaneous measure at a specific outdoor temperature. You'll see COP in technical specs; SEER2 and HSPF2 are what qualify for federal tax credits (SEER2 ≥ 16, HSPF2 ≥ 9 for the 25C credit on split systems).",
    },
    {
      question: "Will my existing ducts work with a heat pump?",
      answer:
        "Usually yes, but verify. Heat pumps deliver cooler supply air than furnaces, so they need 20-30% more airflow to transfer the same heat. Undersized trunks or returns cause cold rooms and comfort complaints. A contractor doing proper due diligence will inspect duct sizing during the estimate. Budget $1,500-$3,000 for potential modifications if issues surface.",
    },
    {
      question: "How much is the federal heat pump tax credit in 2026?",
      answer:
        "The 25C Residential Energy Efficient Home Improvement Tax Credit pays 30% of heat pump installation cost, capped at $2,000 per year, through 2032. Equipment must meet efficiency thresholds: SEER2 ≥ 16 and HSPF2 ≥ 9 for split systems; SEER2 ≥ 15.2 and HSPF2 ≥ 8.1 for packaged systems. Claim via IRS Form 5695.",
    },
    {
      question: "What are HEEHRA rebates and do I qualify?",
      answer:
        "HEEHRA (Home Electrification and Appliance Rebates) is an IRA-funded program administered state-by-state. Rebates go up to $8,000 for heat pumps for low-income households (under 80% area median income) and $4,000 for moderate-income households (80-150% AMI). They stack with the 25C federal tax credit in most states. Check the DOE's program directory for your state's rollout status.",
    },
    {
      question: "How long does a heat pump last compared to a furnace?",
      answer:
        "Heat pumps: 12-15 years typical. Gas furnaces: 15-20 years. Air conditioners: 10-15 years. Heat pumps run year-round while furnaces only run in winter, which partially explains the slightly shorter lifespan. Factor this into 20-year TCO comparisons: you may replace a heat pump once during the period you'd only need to replace a furnace once and an AC twice.",
    },
    {
      question: "Can I keep my gas furnace as backup?",
      answer:
        "Yes. This is the dual-fuel configuration. The heat pump handles most of the heating season; the gas furnace automatically kicks in when outdoor temperatures drop below a crossover point (usually 25-35°F, set at install). You get heat pump efficiency for 70-80% of the year and gas-furnace reliability for the coldest days. Qualifies for the 25C credit based on the heat pump.",
    },
    {
      question: "Are mini-split heat pumps a different product?",
      answer:
        "Same technology, different distribution. Ducted heat pumps send air through central ducts, like a conventional furnace. Mini-splits use wall-mounted indoor units connected to an outdoor condenser via refrigerant lines, with no ducts. Mini-splits are 20-30% more efficient (no duct losses), offer zoned control, and are the right answer for homes without ductwork, for additions, or for problem rooms. For whole-house replacement in a ducted home, centralized ducted heat pumps typically win on total cost.",
    },
  ],
  sources: [
    {
      name: "DOE — Heat Pump Systems",
      url: "https://www.energy.gov/energysaver/heat-pump-systems",
      note: "Department of Energy reference for residential heat pump performance and efficiency standards",
    },
    {
      name: "EPA Energy Star — Heat Pump Qualifying Products",
      url: "https://www.energystar.gov/products/heat_pumps",
      note: "Current federal efficiency thresholds and searchable qualifying product database",
    },
    {
      name: "NEEP — Cold Climate Air-Source Heat Pump Specification",
      url: "https://neep.org/",
      note: "Northeast Energy Efficiency Partnerships specification for cold-climate heat pump certification",
    },
    {
      name: "ACCA Manual J — Residential Load Calculation",
      url: "https://www.acca.org/standards/technical-manuals",
      note: "Industry-standard load calculation methodology; required for proper heat pump sizing",
    },
    {
      name: "EIA — Electric Power Monthly",
      url: "https://www.eia.gov/electricity/monthly/",
      note: "US Energy Information Administration data for state-level electricity and natural gas pricing",
    },
    {
      name: "IRS Form 5695 — Residential Energy Credits",
      url: "https://www.irs.gov/forms-pubs/about-form-5695",
      note: "Official form for claiming the 25C tax credit on heat pump installation",
    },
    {
      name: "DOE — HEEHRA State Program Directory",
      url: "https://www.energy.gov/scep/home-energy-rebate-programs",
      note: "State-by-state rollout status for IRA home electrification rebates",
    },
  ],
  relatedCalculators: [
    {
      name: "Heat pump calculator",
      slug: "heat-pump-calculator",
      description: "Size in tons by climate zone and insulation quality",
    },
    {
      name: "BTU calculator",
      slug: "btu-calculator",
      description: "Cooling load for any room or home",
    },
    {
      name: "Insulation calculator",
      slug: "insulation-calculator",
      description: "R-value by climate zone — critical for proper heat pump sizing",
    },
    {
      name: "Water heater calculator",
      slug: "water-heater-calculator",
      description: "Consider a heat pump water heater too",
    },
  ],
};
