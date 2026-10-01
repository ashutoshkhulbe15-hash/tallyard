import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function BagsPerUnitSVG() {
  const rows = [
    { label: "Modular brick, 3/8 in joint", bags: 30, hl: true },
    { label: "Modular brick, 1/2 in joint", bags: 40, hl: false },
    { label: "King brick, 3/8 in joint", bags: 32, hl: false },
    { label: "Concrete block, 3/8 in joint", bags: 81, hl: false },
  ];
  const maxB = 81;
  return (
    <svg viewBox="0 0 680 232" width="100%" height="auto" role="img" aria-label="Eighty pound bags of mortar per 1,000 units: modular brick at 3/8 inch joints takes 30 bags, at 1/2 inch 40 bags, king brick 32 bags, and concrete block 81 bags.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>80 lb bags of mortar per 1,000 units</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Block takes nearly three times the mortar of brick, because each unit has far more joint length</text>
      {rows.map((r, i) => {
        const y = 74 + i * 36;
        const w = (r.bags / maxB) * 290;
        return (
          <g key={r.label}>
            <text x="212" y={y + 13} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.label}</text>
            <rect x="224" y={y} width={w} height="18" rx="3" fill={r.hl ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={224 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={r.hl ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{r.bags} bags</text>
          </g>
        );
      })}
      <text x="20" y="226" fontSize="9" fill={GUIDE_SVG.inkFaint}>Based on manufacturer coverage: one 80 lb bag lays about 35 bricks or 13 blocks at a 3/8 inch joint.</text>
    </svg>
  );
}

function MixingTipsSVG() {
  const tips = [
    { icon: "✓", label: "Add water to the mixer first, then dry mix", sub: "Prevents clumps and dry pockets at the bottom" },
    { icon: "✓", label: "Mix for 3-5 minutes until uniform consistency", sub: "Undermixing leaves weak spots in the joint" },
    { icon: "✗", label: "Retemper only for evaporation, never after stiffening", sub: "Adding water once hydration starts weakens the bond for good" },
    { icon: "✗", label: "Mix only what you can place in 2.5 hours", sub: "ASTM C270 board life limit; discard anything older" },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Mortar mixing rules: add water first, mix 3 to 5 minutes, retemper only for evaporation, and place within 2.5 hours.">
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
        People search for &quot;mortar calculator&quot; and land on grout calculators.
        The two products are not interchangeable. Mortar bonds bricks,
        blocks, or stones together. It contains Portland cement, lime, and
        sand in a ratio that gives it body and adhesion. Grout fills the
        narrow joints between tiles. It contains cement and fine aggregate
        with no lime, formulated to flow into thin gaps. Using grout
        between bricks creates a weak bond that crumbles within a year.
        Using mortar between tiles leaves a rough, oversized joint that
        looks terrible and traps dirt. The calculator above is specifically
        for mortar: bed joints and head joints in masonry walls.
      </p>

      <p>
        If your project involves tile, use the
        <a href="/grout-calculator"> grout calculator</a> instead. If it
        involves bricks, blocks, or stone, you are in the right place.
      </p>

      <Figure number={1} caption="Coverage from manufacturer published rates. Underestimating mortar is the most common ordering error in masonry, and running out mid-wall means a cold joint.">
        <BagsPerUnitSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Coverage is calibrated to manufacturer published rates rather
          than to nominal joint geometry alone. Joint geometry suggests
          roughly 13 cubic inches of mortar per modular brick, but real
          masonry consumes closer to 30 once furrowed bed joints,
          generously buttered head joints, and board loss are included,
          which is why Quikrete publishes 37 bricks per 80 lb bag and
          Sakrete about 40. This calculator uses 35 bricks or 13 concrete
          blocks per 80 lb bag at a 3/8 inch joint, with a 5 percent
          margin on top. Mortar type proportions follow ASTM C270.
        </p>
      </MethodologyNote>

      <h2>Choosing the right mortar type</h2>

      <p>
        The type designation is not a quality grade. Type M is not &quot;better&quot;
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

      <h2>Type O, repointing, and the mnemonic worth knowing</h2>
      <p>
        There is a fourth type most tables leave out. Type O is a low
        strength mortar at roughly 350 psi, soft enough to be sacrificial,
        and it exists for one job: repointing old masonry. Historic brick
        is softer than modern brick, and filling its joints with a hard
        modern mortar transfers stress into the units themselves, which
        then spall and crack. The mortar is supposed to be the weakest part
        of the wall so that it fails first and can be replaced. Repointing
        a nineteenth century wall with Type S is a common and expensive
        mistake.
      </p>
      <p>
        The order is easy to remember once you see it. Write out MASON
        WORK and take every other letter: M, S, N, O, K. That is the
        sequence from strongest to weakest, and Type K, softer still at
        around 75 psi, is reserved for genuine historic restoration under
        a conservator&apos;s direction.
      </p>

      <ComparisonTable
        caption="ASTM C270 mortar types by strength and job. Proportions are cement to lime to sand by volume, which is what a site mix follows when premixed bags are not used."
        columns={[
          { title: "Strength" },
          { title: "Proportions", highlight: true },
          { title: "Where it belongs" },
        ]}
        rows={[
          { label: "Type M", values: ["2,500 psi", "1 : 0.25 : 3.5", "Below grade, foundations, retaining walls"] },
          { label: "Type S", values: ["1,800 psi", "1 : 0.5 : 4.5", "Exterior at or near grade, chimneys, patios"] },
          { label: "Type N", values: ["750 psi", "1 : 1 : 6", "General above-grade exterior and interior"] },
          { label: "Type O", values: ["350 psi", "1 : 2 : 9", "Repointing older masonry, interior non-load-bearing"] },
        ]}
      />

      <h2>Thinset is tile mortar, not masonry mortar</h2>
      <p>
        Searches for thinset mortar and thinset tile mortar land on mortar
        pages constantly, and the two products are not interchangeable.
        Masonry mortar bonds brick and block into a wall and is specified
        to ASTM C270. Thinset is a cement, sand, and polymer adhesive that
        bonds tile to a substrate, specified to ANSI A118.1 for unmodified
        and A118.4 for modified. It is applied in a thin notched layer
        rather than a bed joint, and it will not build a wall.
      </p>
      <p>
        Coverage is also calculated differently. Masonry mortar is
        estimated per brick or block; thinset is estimated per square foot
        by trowel notch size. A 50 pound bag covers roughly 90 square feet
        at a 1/4 by 1/4 inch notch, about 45 at 1/2 by 1/2, and closer to
        30 with large format tile where back-buttering is required. If you
        are setting tile, the{" "}
        <a href="/tile-calculator">tile calculator</a> and the{" "}
        <a href="/grout-calculator">grout calculator</a> are the right
        tools; this page is for the mortar that holds masonry units
        together.
      </p>

      <h2>How many bags for your wall</h2>
      <ComparisonTable
        caption="Bags for common wall sizes in modular brick at 3/8 inch joints, including a 5 percent margin. Concrete block walls of the same area take roughly three times as many."
        columns={[
          { title: "Bricks" },
          { title: "80 lb bags", highlight: true },
        ]}
        rows={[
          { label: "Small garden wall, 50 ft²", values: ["350", "11"] },
          { label: "Fence-height wall, 100 ft²", values: ["700", "21"] },
          { label: "Garage wall, 200 ft²", values: ["1,400", "42"] },
          { label: "House wall, 400 ft²", values: ["2,800", "84"] },
        ]}
      />

      <Scenario location="Cincinnati, OH">
        A homeowner built a 120 square foot brick mailbox surround and
        garden wall using standard bricks with 3/8-inch joints. The
        calculator said 810 bricks and 6 bags of mortar. He bought
        exactly 6 bags. By the end of the project he had used 5.5 bags
        on the wall and had nothing left for the cap row. Mortar for
        cap stones uses more material per unit because the joint is wider
        (the full top surface of the brick). The 10% waste factor in the
        calculator covers this, but he had been sloppy with mixing: 
        letting a half-batch set up before he could use it. He bought
        one more bag ($7.50) to finish. The lesson: do not let mixed
        mortar sit. ASTM C270 sets the board life at 2.5 hours from initial
        mixing, so mix only what you can lay in that window.
      </Scenario>

      <h2>Mixing mortar correctly</h2>

      <Figure number={4} caption="Four rules that prevent most mortar failures. The retempering one is the subtle case: replacing evaporated water is acceptable, adding water once hydration has begun is not.">
        <MixingTipsSVG />
      </Figure>

      <p>
        The consistency you want is often described as &quot;peanut butter&quot;:
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
          { label: "Cost per bag equiv.", values: ["$7 to 10", "$4 to 6"] },
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
