import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function BagsPerBricksSVG() {
  const combos = [
    { label: 'Standard brick, 3/8" joint', bags: "7 bags", per: "per 1,000 bricks", color: GUIDE_SVG.accent },
    { label: 'Standard brick, 1/2" joint', bags: "9 bags", per: "per 1,000 bricks", color: GUIDE_SVG.inkMuted },
    { label: 'King brick, 3/8" joint', bags: "5 bags", per: "per 1,000 bricks", color: GUIDE_SVG.slate },
    { label: 'Concrete block, 3/8" joint', bags: "28 bags", per: "per 1,000 blocks", color: GUIDE_SVG.inkFaint },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Mortar bags per 1,000 bricks: 7 bags for standard with 3/8 joint, 9 for 1/2 joint, 28 for concrete block.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>80-lb bags of mortar per 1,000 units</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Wider joints use dramatically more mortar. Block uses 4× more than brick because the joints are longer.</text>
      {combos.map((c, i) => {
        const y = 65 + i * 32;
        const w = parseInt(c.bags) * 12;
        return (
          <g key={c.label}>
            <text x="240" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{c.label}</text>
            <rect x="250" y={y} width={w} height="20" rx="3" fill={c.color} opacity="0.6" />
            <text x={258 + w} y={y + 14} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{c.bags}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MortarTypesSVG() {
  return (
    <svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Mortar types: Type S for exterior and structural, Type N for interior, Type M for below-grade.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Which mortar type to use</text>
      {[
        { type: "Type S", use: "Exterior walls, structural, chimneys", strength: "1,800 psi", x: 40, color: GUIDE_SVG.accent },
        { type: "Type N", use: "Interior, above-grade, non-structural", strength: "750 psi", x: 260, color: GUIDE_SVG.inkMuted },
        { type: "Type M", use: "Below-grade, retaining walls, foundations", strength: "2,500 psi", x: 470, color: GUIDE_SVG.slate },
      ].map(t => (
        <g key={t.type}>
          <rect x={t.x} y="50" width="185" height="70" rx="8" fill={t.type === "Type S" ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={t.color} strokeWidth="1" />
          <text x={t.x + 92} y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill={t.color}>{t.type}</text>
          <text x={t.x + 92} y="90" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.ink}>{t.use}</text>
          <text x={t.x + 92} y="108" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.strength} compressive</text>
        </g>
      ))}
    </svg>
  );
}

function CoverageSVG() {
  const walls = [
    { label: "Small garden wall (50 ft²)", bricks: "340", bags: "3" },
    { label: "Fence-height wall (100 ft²)", bricks: "675", bags: "5" },
    { label: "Garage wall (200 ft²)", bricks: "1,350", bags: "10" },
    { label: "House wall (400 ft²)", bricks: "2,700", bags: "19" },
  ];
  const hY = 65; const rH = 28;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Mortar needed by wall size: 50 sq ft needs 3 bags, 400 sq ft needs 19 bags.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Mortar bags by wall size (standard brick, 3/8&quot; joint)</text>
      <rect x="30" y={hY - 18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Wall", x: 150 }, { l: "Bricks", x: 370 }, { l: "80-lb bags", x: 530 }].map(h => (
        <text key={h.l} x={h.x} y={hY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {walls.map((w, i) => { const y = hY + 10 + i * rH; return (
        <g key={w.label}>{i % 2 === 0 && <rect x="30" y={y - 4} width="620" height={rH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
          <text x="150" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{w.label}</text>
          <text x="370" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{w.bricks}</text>
          <text x="530" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="700">{w.bags}</text>
        </g>
      ); })}
    </svg>
  );
}

function MixingTipsSVG() {
  const tips = [
    { icon: "✓", label: "Add water to the mixer first, then dry mix", sub: "Prevents clumps and dry pockets at the bottom" },
    { icon: "✓", label: "Mix for 3-5 minutes until uniform consistency", sub: "Undermixing leaves weak spots in the joint" },
    { icon: "✗", label: "Never re-temper mortar that has started to set", sub: "Adding water to stiffening mortar weakens the bond permanently" },
    { icon: "✗", label: "Never mix more than you can use in 90 minutes", sub: "Mortar begins to set after 90 min. Discard unused mix." },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Mortar mixing tips: water first, mix 3-5 minutes, never re-temper, use within 90 minutes.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Mixing rules that prevent weak joints</text>
      {tips.map((t, i) => {
        const y = 55 + i * 36;
        const isGood = t.icon === "✓";
        return (
          <g key={t.label}>
            <circle cx="30" cy={y + 8} r="8" fill={isGood ? "#EAF3DE" : "#FCEBEB"} />
            <text x="30" y={y + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill={isGood ? "#2D7F46" : "#B53629"}>{t.icon}</text>
            <text x="48" y={y + 6} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
            <text x="48" y={y + 22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function MortarCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 29, 2026"
        reviewedAgainst="BIA Technical Note 8 (Mortar for Brick Masonry), ASTM C270, and PCA mortar specifications"
      />

      <h2>Mortar is not grout, and the difference matters</h2>

      <p>
        People search for "mortar calculator" and land on grout calculators.
        The two products are not interchangeable. Mortar bonds bricks,
        blocks, or stones together. It contains Portland cement, lime, and
        sand in a ratio that gives it body and adhesion. Grout fills the
        narrow joints between tiles. It contains cement and fine aggregate
        with no lime, formulated to flow into thin gaps. Using grout
        between bricks creates a weak bond that crumbles within a year.
        Using mortar between tiles leaves a rough, oversized joint that
        looks terrible and traps dirt. The calculator above is specifically
        for mortar — bed joints and head joints in masonry walls.
      </p>

      <p>
        If your project involves tile, use the
        <a href="/grout-calculator"> grout calculator</a> instead. If it
        involves bricks, blocks, or stone, you are in the right place.
      </p>

      <Figure number={1} caption="Standard bricks with 3/8-inch joints need 7 bags per 1,000 bricks. Wider joints or concrete blocks need significantly more. This is the number one underestimation in masonry projects.">
        <BagsPerBricksSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Mortar volume per brick calculated from joint geometry: (bed
          joint length × width × depth) + (head joint height × width ×
          depth) per brick face. Coverage per 80-lb bag approximately 450
          cubic inches of mixed mortar (BIA Technical Note 8). Waste
          factor of 10% applied for drops, tooling, and cleanup. Mortar
          type specifications per ASTM C270 (proportion specification).
        </p>
      </MethodologyNote>

      <h2>Choosing the right mortar type</h2>

      <Figure number={2} caption="Type S is the default for anything exposed to weather. Type N for interior decorative work. Type M for anything below grade or under heavy load.">
        <MortarTypesSVG />
      </Figure>

      <p>
        The type designation is not a quality grade. Type M is not "better"
        than Type S. Each is formulated for a specific application. Type S
        has the best balance of bond strength and flexibility, making it
        the default for exterior walls, chimneys, and any structural
        masonry above grade. Type N has lower compressive strength but
        higher workability, which makes it easier to tool and better for
        interior accent walls and veneer where structural load is not a
        concern. Type M has the highest compressive strength (2,500 psi)
        but the lowest bond strength, which makes it the wrong choice for
        walls exposed to wind load but the right choice for retaining
        walls and foundations where compressive force dominates.
      </p>

      <Callout label="Pre-mixed vs site-mixed">
        Pre-mixed mortar (just add water) costs $7 to $10 per 80-lb bag
        and is the practical choice for any project under 500 bricks.
        Site-mixed mortar (separate Portland cement, lime, and sand
        proportioned on site) costs less per cubic foot but requires a
        mixer, precise proportioning, and consistency between batches.
        For residential projects, pre-mixed bags are standard and are
        what the calculator estimates.
      </Callout>

      <h2>How many bags for your wall</h2>

      <Figure number={3} caption="Quick reference for common wall sizes. A typical garden wall (4 feet tall, 25 feet long, 100 sq ft) needs about 675 bricks and 5 bags of mortar.">
        <CoverageSVG />
      </Figure>

      <Scenario location="Cincinnati, OH">
        A homeowner built a 120 square foot brick mailbox surround and
        garden wall using standard bricks with 3/8-inch joints. The
        calculator said 810 bricks and 6 bags of mortar. He bought
        exactly 6 bags. By the end of the project he had used 5.5 bags
        on the wall and had nothing left for the cap row. Mortar for
        cap stones uses more material per unit because the joint is wider
        (the full top surface of the brick). The 10% waste factor in the
        calculator covers this, but he had been sloppy with mixing —
        letting a half-batch set up before he could use it. He bought
        one more bag ($7.50) to finish. The lesson: do not let mixed
        mortar sit. Mix only what you can lay in 90 minutes.
      </Scenario>

      <h2>Mixing mortar correctly</h2>

      <Figure number={4} caption="Four rules. Water first. Mix thoroughly. Never re-temper. Use within 90 minutes. These prevent the most common mortar failures.">
        <MixingTipsSVG />
      </Figure>

      <p>
        The consistency you want is often described as "peanut butter" — 
        thick enough to hold its shape on the trowel when you flip it
        upside down, but wet enough to spread easily into a bed joint.
        Too dry and the mortar will not bond to the brick surface. Too
        wet and it squeezes out of the joint and runs down the wall face,
        staining the brick. Start with about 5 quarts of water per 80-lb
        bag and adjust by small amounts. The correct consistency depends
        on temperature and humidity. Hot dry days require slightly more
        water. Cold damp days require less.
      </p>

      <ComparisonTable
        columns={[{ title: "Pre-mixed bags" }, { title: "Site-mixed" }]}
        rows={[
          { label: "Cost per bag equiv.", values: ["$7–10", "$4–6"] },
          { label: "Consistency", values: ["Reliable batch to batch", "Varies with proportioning"] },
          { label: "Best for", values: ["Under 500 bricks, DIY", "Large jobs, experienced masons"] },
          { label: "Mixing", values: ["Add water only", "Proportion cement + lime + sand"] },
          { label: "Shelf life", values: ["12 months sealed", "Cement: 3 months, sand: indefinite"] },
        ]}
        caption="For residential projects, pre-mixed bags are the standard. The cost premium over site-mixed is small and the consistency is guaranteed."
      />

      <h2>How mortar quantity connects to brick quantity</h2>

      <p>
        The <a href="/brick-calculator">brick calculator</a> estimates
        brick count and includes a mortar line item. This mortar calculator
        gives you a more detailed breakdown with mortar type selection and
        mixing guidance. For projects that need both tools, start with the
        brick calculator for the brick count, then use this calculator to
        verify the mortar quantity with your specific joint width and
        mortar type.
      </p>

      <p>
        For the concrete footings under a brick wall, the
        <a href="/concrete-calculator"> concrete calculator</a> handles
        footing volume. For reinforcement in the footing or within a
        block wall (rebar in filled cores), the
        <a href="/rebar-calculator"> rebar calculator</a> estimates bar
        count and total length.
      </p>
    </>
  );
}
