import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SandedUnsandedSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Sanded grout is used in joints one eighth inch and wider; unsanded grout is used in joints narrower than one eighth inch. Sanded grout shrinks less because the sand resists it.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The joint width decides the grout</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>One eighth of an inch is the dividing line, and it is not a preference</text>

      <rect x="60" y="80" width="106" height="70" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <rect x="172" y="80" width="106" height="70" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <rect x="166" y="80" width="6" height="70" fill={GUIDE_SVG.cool} opacity="0.5" />
      <text x="169" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.cool}>under 1/8 in</text>
      <text x="169" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>Unsanded</text>
      <text x="169" y="202" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>smooth, fits narrow gaps</text>
      <text x="169" y="218" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>polished stone, glass, rectified</text>

      <rect x="372" y="80" width="102" height="70" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <rect x="490" y="80" width="102" height="70" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <rect x="474" y="80" width="16" height="70" fill={GUIDE_SVG.accent} opacity="0.45" />
      <text x="482" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>1/8 in and wider</text>
      <text x="482" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>Sanded</text>
      <text x="482" y="202" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>sand resists shrinkage</text>
      <text x="482" y="218" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>floors, most wall tile, stone</text>

      <text x="20" y="242" fontSize="9" fill={GUIDE_SVG.inkFaint}>Unsanded in a wide joint cracks as it cures. Sanded in a narrow joint will not pack, and the sand scratches soft stone and glass.</text>
    </svg>
  );
}

function CoverageSVG() {
  const rows = [
    { tile: '12 x 12', j: '1/8 in', lbs: 3.2 },
    { tile: '12 x 24', j: '1/8 in', lbs: 2.4 },
    { tile: '3 x 6 subway', j: '1/16 in', lbs: 2.0 },
    { tile: '2 x 2 mosaic', j: '1/8 in', lbs: 9.6 },
    { tile: '24 x 24', j: '1/8 in', lbs: 1.6 },
  ];
  const maxL = 9.6;
  return (
    <svg viewBox="0 0 680 274" width="100%" height="auto" role="img" aria-label="Grout needed per 100 square feet: 12 by 12 tile takes about 3.2 pounds, 12 by 24 takes 2.4, subway 2.0, 2 by 2 mosaic 9.6, and 24 by 24 takes 1.6 pounds.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Pounds of grout per 100 square feet</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Smaller tile means more linear feet of joint, which is where the grout goes</text>
      {rows.map((r, i) => {
        const y = 74 + i * 38;
        const w = (r.lbs / maxL) * 300;
        return (
          <g key={r.tile}>
            <text x="150" y={y + 12} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.tile}</text>
            <text x="188" y={y + 12} textAnchor="end" fontSize="9" fill={GUIDE_SVG.inkFaint}>{r.j}</text>
            <rect x="198" y={y} width={w} height="16" rx="3" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={198 + w + 10} y={y + 12} fontSize="11" fontWeight="700" fill={i === 3 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{r.lbs} lb</text>
          </g>
        );
      })}
      <text x="20" y="268" fontSize="9" fill={GUIDE_SVG.inkFaint}>Mosaic takes six times the grout of large format at the same joint width. Tile thickness raises all of these figures.</text>
    </svg>
  );
}

function TimelineSVG() {
  const steps = [
    { t: "0 to 30 min", d: ["grout, then strike", "the joints"] },
    { t: "30 to 60 min", d: ["first haze wipe with", "a damp sponge"] },
    { t: "24 hours", d: ["light foot traffic,", "no water"] },
    { t: "72 hours", d: ["cured enough to", "seal and to shower"] },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Grout timeline: strike the joints within 30 minutes, wipe haze at 30 to 60 minutes, light traffic at 24 hours, seal and use at 72 hours.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How long grout takes to dry</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Cementitious grout. Epoxy sets faster but has a much shorter working window.</text>
      <line x1="70" y1="82" x2="616" y2="82" stroke={GUIDE_SVG.line} strokeWidth="2" />
      {steps.map((s, i) => {
        const x = 92 + i * 168;
        return (
          <g key={s.t}>
            <circle cx={x} cy="82" r="7" fill={i < 2 ? GUIDE_SVG.warm : GUIDE_SVG.accent} />
            <text x={x} y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{s.t}</text>
            {s.d.map((ln, j) => (
              <text key={j} x={x} y={128 + j * 14} textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>{ln}</text>
            ))}
          </g>
        );
      })}
      <text x="20" y="182" fontSize="10" fill={GUIDE_SVG.inkMuted}>Sealing too early traps moisture in the joint. Waiting past a week is fine; sealing at 24 hours is not.</text>
      <text x="20" y="196" fontSize="9" fill={GUIDE_SVG.inkFaint}>Cold or humid rooms extend every step. Epoxy grout needs no sealing at all.</text>
    </svg>
  );
}

export function GroutCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="ANSI A118.6 cementitious grout, ANSI A118.3 epoxy grout, TCNA Handbook grouting and movement joint requirements"
      />

      <h2>Grout volume is joint length times joint size</h2>
      <p>
        Grout quantity has almost nothing to do with how much tile you
        bought and everything to do with how many joints that tile
        creates. A hundred square feet of 24 by 24 porcelain has about 100
        linear feet of joint. The same hundred square feet in 2 by 2
        mosaic has roughly 1,200. That is why one takes under two pounds
        of grout and the other takes ten, and why a coverage chart printed
        on a bag is useless until you know your tile size, joint width,
        and tile thickness.
      </p>
      <p>
        The calculator above works out all three and returns pounds. This
        page covers the choice the calculator cannot make for you: sanded
        or unsanded, cement or epoxy, whether to seal and when, plus the
        drying timeline, grout haze, and the places caulk belongs instead
        of grout.
      </p>

      <Figure
        number={1}
        caption="One eighth of an inch is the line. Below it, unsanded; at or above it, sanded. Using the wrong one produces cracking on one side and scratched tile on the other."
      >
        <SandedUnsandedSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Coverage figures follow manufacturer published charts for
          cementitious grout, which vary by a few percent between brands;
          the calculator applies typical values and rounds to whole bags.
          Cementitious grout is specified to ANSI A118.6 and A118.7, epoxy
          grout to ANSI A118.3. Joint width guidance and movement joint
          requirements follow the TCNA Handbook, including EJ171, which
          governs where grout must stop and a flexible sealant must take
          over.
        </p>
      </MethodologyNote>

      <h2>Sanded vs unsanded grout</h2>
      <p>
        Sanded grout contains fine aggregate. Unsanded does not. The rule
        is that joints one eighth of an inch and wider take sanded, and
        joints narrower than an eighth take unsanded, and both halves of
        that rule exist for a physical reason. Cement shrinks as it cures,
        and in a wide joint pure cement paste shrinks enough to crack; the
        sand is there to resist it. In a narrow joint the sand simply will
        not pack in, leaving voids, and on polished marble or glass the
        aggregate scratches the tile face as you work it.
      </p>
      <p>
        A few practical extensions. Rectified porcelain set at a 1/16 inch
        joint takes unsanded. Standard 12 by 12 at 1/8 inch takes sanded.
        Polished stone at any width takes unsanded, or an epoxy formulated
        for stone, because the scratching risk outweighs the shrinkage
        risk. And if a joint width lands right at 1/8, sanded is the safer
        choice for anything but soft or polished surfaces.
      </p>

      <ComparisonTable
        caption="The three grout families and where each belongs. Cementitious covers most residential work; epoxy earns its cost in specific places."
        columns={[
          { title: "Cementitious", highlight: true },
          { title: "Epoxy" },
          { title: "Single-component" },
        ]}
        rows={[
          { label: "Cost per bag or unit", values: ["$15-30", "$60-120", "$40-80"] },
          { label: "Sealing needed", values: ["Yes, annually", "Never", "Never"] },
          { label: "Stain resistance", values: ["Moderate, porous", "Excellent", "Very good"] },
          { label: "Working time", values: ["Forgiving, 30 min", "Short, 45 min pot life", "Long, stays workable"] },
          { label: "Difficulty", values: ["Beginner friendly", "Demanding, sticky", "Easy but slow curing"] },
          { label: "Best for", values: ["Most floors and walls", "Showers, kitchens, commercial", "Small jobs, DIY showers"] },
        ]}
      />

      <p>
        On epoxy grout for a shower, which is the pairing people ask about
        most: it is genuinely the better material there. It does not
        absorb water, never needs sealing, and resists the soap and
        mineral staining that turns cement grout grey within a couple of
        years. The cost is real and so is the difficulty. Epoxy is sticky,
        it sets on a fixed clock regardless of how far along you are, and
        haze left behind hardens into something that has to be ground off.
        For a first-time DIY shower, a single-component grout is the
        compromise worth knowing about: most of the stain resistance,
        none of the pot life panic.
      </p>

      <Figure
        number={2}
        caption="Grout per 100 square feet at typical joint widths. The mosaic figure is not a rounding error; small tile genuinely consumes several times the grout."
      >
        <CoverageSVG />
      </Figure>

      <h2>Sealing: what it does and does not do</h2>
      <p>
        Cementitious grout is porous, so a penetrating tile grout sealer soaks in and
        makes the surface repel water and oil for a while. It buys time to
        wipe a spill before it stains. It does not make grout waterproof,
        it does not prevent cracking, and it wears off, which is why the
        usual recommendation is to reseal every year or two in wet areas.
        Epoxy and single-component grouts need no sealer at all, and
        applying one to them accomplishes nothing.
      </p>
      <p>
        Two products get confused here. A penetrating sealer is invisible
        and soaks in. A colour sealer, sold as grout color sealing or a grout
        sealer colorant, is a pigmented coating that sits on
        the surface, changes the colour, and effectively refinishes
        discoloured grout without regrouting. The second is a legitimate
        way to rescue stained grout, but it is a coating: it can peel if
        applied over dirty or damp joints, and it needs the joints
        genuinely clean first.
      </p>

      <Figure
        number={3}
        caption="The timeline that matters. The two early steps are on a clock measured in minutes; the later ones are measured in days, and sealing early is the common mistake."
      >
        <TimelineSVG />
      </Figure>

      <h2>Drying time, haze, and the sponge</h2>
      <p>
        Cementitious grout is firm enough for light foot traffic at about
        24 hours and cured enough to seal or to get wet at 72. Those
        figures stretch in a cold or humid room and shrink in a warm dry
        one. Work the grout in diagonally across the joints with a rubber grout
        float held at about 45 degrees, then strike off the excess with the
        float on edge. The instruction that matters more than either: do
        not flood
        fresh grout with water to clean it. Excess water pulls cement to
        the surface, weakens the joint, and produces blotchy colour that
        cannot be fixed afterward. A barely damp sponge, wrung until it
        stops dripping, is the correct tool.
      </p>
      <p>
        Grout haze is the thin cement film left on the tile face, and it
        is normal rather than a mistake. Wiped at the right moment, 30 to
        60 minutes after grouting when the joints have firmed but the haze
        is still soft, it comes off with a damp sponge and then a dry
        cloth. Left overnight it needs a haze remover, which is a mild
        acid, and left for a week on porous or polished stone it can etch.
        The window is the whole game.
      </p>

      <h2>Where grout stops and caulk begins</h2>
      <p>
        Every change of plane gets flexible sealant, not grout. That means
        inside corners where two walls meet, the joint where walls meet the
        floor or shower pan, around tub and shower bases, and where tile
        meets a different material. The TCNA calls these movement joints
        and covers them in EJ171. The reason is simple: those junctions
        move as the building expands, contracts, and settles, and rigid
        cement grout in a moving joint cracks every time.
      </p>
      <p>
        Grout manufacturers sell colour-matched sealant, often sold as grout
        caulk, for exactly this,
        which is why a shower has grout on the field and caulk in the
        corners in the same colour. The most common repair call in tiled
        showers is cracked grout in a vertical corner, and the correct fix
        is never more grout. It is raking out the failed joint and running
        the matching sealant.
      </p>

      <Scenario location="Nashville, TN">
        <p>
          A 60 by 32 inch shower: 82 square feet of 3 by 6 subway on the
          walls at 1/16 inch joints, and 13 square feet of 2 by 2 mosaic on
          the floor at 1/8 inch.
        </p>
        <p>
          The walls at a 1/16 joint need unsanded grout, roughly 1.6
          pounds, so one 10 pound bag covers it several times over. The
          floor mosaic at 1/8 needs sanded, about 1.3 pounds despite being
          a sixth of the area, because the joint count is enormous. Two
          different grouts, two small quantities, and the practical
          decision is whether to run epoxy on both for a Nashville
          bathroom that sees daily use. Epoxy adds about $90 over
          cementitious across this shower and removes annual sealing
          forever, which is the trade most people take once they see the
          numbers side by side. Corners and the pan junction get
          colour-matched sealant either way.
        </p>
      </Scenario>

      <h2>Where grout jobs go wrong</h2>
      <p>
        <strong>Too much water.</strong> Covered above and worth repeating
        because it is the single most common cause of weak, patchy, and
        crumbling grout. Wring the sponge until it barely dampens your
        palm.
      </p>
      <p>
        <strong>Grout in the corners.</strong> Rigid grout in a moving
        joint cracks. Corners, plane changes, and perimeters take sealant.
      </p>
      <p>
        <strong>Sealing too early.</strong> Sealer applied at 24 hours
        traps moisture inside a joint that has not finished curing, which
        can cause discolouration and a hazy film. Wait the full 72 hours.
      </p>
      <p>
        <strong>Mixing bags separately.</strong> Grout colour varies
        slightly between bags and between mixes with different water
        content. On a large floor, mix consistently, keep the water
        measured rather than eyeballed, and where possible use bags from
        the same lot.
      </p>

      <Callout label="Grout is not waterproofing">
        Water passes through cementitious grout continuously; that is
        normal and it is why showers need a waterproofing membrane behind
        the tile. Sealing grout slows surface absorption and helps with
        staining, but no grout and no sealer makes an assembly waterproof.
        If a shower is leaking, the problem is behind the tile, and more
        sealer will not reach it.
      </Callout>

      <h2>The rest of the tile job</h2>
      <p>
        Grout is the last step of a longer sequence. Tile quantities come
        from the <a href="/tile-calculator">tile calculator</a>, a shower
        splits into walls and floor through the{" "}
        <a href="/shower-tile-calculator">shower tile calculator</a>, and a
        kitchen run belongs to the{" "}
        <a href="/backsplash-calculator">backsplash calculator</a>. If the
        substrate is going in at the same time, the{" "}
        <a href="/drywall-calculator">drywall calculator</a> covers backer
        board.
      </p>
      <p>
        Enter your tile size, joint width, and thickness above, buy one
        bag more than the number says, and keep the leftover sealed for
        repairs. Matching grout years later is harder than matching tile.
      </p>
    </>
  );
}
