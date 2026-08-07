import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function PipeSizeSVG() {
  const pipes = [
    { size: '1-1/2"', dfuBranch: 3, note: "lav, bar sink, tub tail" },
    { size: '2"', dfuBranch: 6, note: "shower, laundry standpipe, kitchen sink" },
    { size: '3"', dfuBranch: 20, note: "any line with a toilet; most house branches" },
    { size: '4"', dfuBranch: 160, note: "building drain and sewer for whole houses" },
  ];
  const maxD = 160;
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Horizontal branch DFU capacity by pipe size: 1.5 inch carries 3 DFU, 2 inch carries 6, 3 inch carries 20, 4 inch carries 160.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What each pipe size can carry (horizontal branch, IPC)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Capacity is not linear. Going from 3 to 4 inches multiplies capacity by eight.</text>
      {pipes.map((p, i) => {
        const y = 70 + i * 46;
        const w = Math.max(16, Math.sqrt(p.dfuBranch / maxD) * 330);
        return (
          <g key={p.size}>
            <text x="90" y={y + 13} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{p.size}</text>
            <rect x="104" y={y} width={w} height="18" rx="9" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={104 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{p.dfuBranch} DFU</text>
            <text x="104" y={y + 32} fontSize="9" fill={GUIDE_SVG.inkFaint}>{p.note}</text>
          </g>
        );
      })}
      <text x="20" y="252" fontSize="9" fill={GUIDE_SVG.inkFaint}>Bar width drawn on a square-root scale so the small pipes stay visible. The numbers are the code values.</text>
    </svg>
  );
}

function SlopeSVG() {
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Drain slope: quarter inch per foot for pipe 2.5 inches and smaller, eighth inch per foot allowed for 3 inch and larger. A 20 foot run drops 5 inches at quarter inch per foot.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Slope: the quarter-inch rule</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Too flat leaves solids behind. Too steep outruns them with the water. Both end in a clog.</text>
      <line x1="60" y1="90" x2="480" y2="90" stroke={GUIDE_SVG.line} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="60" y1="90" x2="480" y2="132" stroke={GUIDE_SVG.accent} strokeWidth="4" strokeLinecap="round" />
      <text x="270" y="80" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>level reference</text>
      <line x1="480" y1="90" x2="480" y2="132" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
      <text x="492" y="115" fontSize="11" fontWeight="700" fill={GUIDE_SVG.warm}>5&quot; drop</text>
      <text x="492" y="131" fontSize="9" fill={GUIDE_SVG.inkFaint}>over 20 ft</text>
      <g fontSize="11">
        <text x="60" y="175" fontWeight="600" fill={GUIDE_SVG.ink}>Pipe 2-1/2&quot; and smaller</text>
        <text x="60" y="192" fill={GUIDE_SVG.inkMuted}>1/4 inch per foot minimum (2 percent)</text>
        <text x="360" y="175" fontWeight="600" fill={GUIDE_SVG.ink}>Pipe 3&quot; and larger</text>
        <text x="360" y="192" fill={GUIDE_SVG.inkMuted}>1/8 inch per foot allowed (1 percent)</text>
      </g>
      <text x="60" y="220" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>Drop = run in feet x slope. Plan the drop before you open the wall, not after.</text>
    </svg>
  );
}

export function DrainPipeCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="IPC 2021 Tables 709.1 and 710.1 (drainage fixture units), UPC 2021 Chapter 7"
      />

      <h2>Every fixture is a number. Add the numbers.</h2>
      <p>
        Plumbing codes solved drain sizing decades ago with a system so plain
        it feels like cheating: every fixture gets a rating in drainage
        fixture units, you add up the ratings on a line, and a table tells
        you the pipe size. A toilet is 3 or 4 DFU depending on flush volume.
        A kitchen sink is 2. A shower is 2. A washing machine standpipe is
        2 to 3. There is no judgment call in it, which is exactly the
        point: the inspector reads the same table you do.
      </p>
      <p>
        The calculator above does the addition and the table lookup for
        you. What it cannot do is stop the two mistakes that generate most
        drain problems: sizing a pipe by what fits the hole instead of what
        the table says, and getting the slope wrong. This page covers the
        full DFU chart, the pipe capacity table, the quarter-inch rule, and
        the one oversizing myth that refuses to die.
      </p>

      <Figure
        number={1}
        caption="Horizontal branch capacity per IPC Table 710.1(2). The jump from 3 to 4 inches is the big one: 20 DFU to 160 DFU, which is why one 4 inch building drain serves an entire house."
      >
        <PipeSizeSVG />
      </Figure>

      <MethodologyNote>
        <p>
          DFU ratings follow IPC 2021 Table 709.1; pipe capacities follow
          Tables 710.1(1) and 710.1(2). The UPC uses slightly different
          numbers for some fixtures, and local amendments override both.
          This calculator applies the IPC values, which most US states
          adopt. Confirm your jurisdiction before cutting pipe.
        </p>
      </MethodologyNote>

      <h2>The DFU chart people actually search for</h2>
      <p>
        This is the fixture table, straight from the code. Print it, tape
        it inside a cabinet door, and the sizing conversation is over.
      </p>

      <ComparisonTable
        caption="Drainage fixture unit values per IPC 2021 Table 709.1. Trap size is the minimum; you can run a larger trap arm, never a smaller one."
        columns={[
          { title: "DFU value", highlight: true },
          { title: "Min trap size" },
        ]}
        rows={[
          { label: "Toilet (1.6 gpf or less)", values: ["3", "built in"] },
          { label: "Toilet (over 1.6 gpf)", values: ["4", "built in"] },
          { label: "Kitchen sink (with or without disposal)", values: ["2", '1-1/2"'] },
          { label: "Bathroom sink (lavatory)", values: ["1", '1-1/4"'] },
          { label: "Shower stall", values: ["2", '2"'] },
          { label: "Bathtub (with or without shower)", values: ["2", '1-1/2"'] },
          { label: "Washing machine standpipe", values: ["2", '2"'] },
          { label: "Dishwasher (separate trap)", values: ["2", '1-1/2"'] },
          { label: "Laundry tub", values: ["2", '1-1/2"'] },
          { label: "Floor drain (2 inch)", values: ["2", '2"'] },
          { label: "Full bathroom group (toilet, lav, tub/shower)", values: ["5", "per fixture"] },
        ]}
      />

      <p>
        Two readings of that table matter more than the rest. A full
        bathroom group counts as 5 DFU, not the 6 you get adding the
        fixtures individually, because the code assumes they are never all
        draining at once. And the washing machine earns a 2 inch standpipe
        as a hard minimum: a modern washer pumps out faster than a 1-1/2
        inch line can swallow, and the overflow ends up on the laundry
        room floor.
      </p>

      <h2>From DFU total to pipe size</h2>

      <ComparisonTable
        caption="Maximum DFU per pipe size, IPC 2021 Tables 710.1(1) and 710.1(2). Stacks carry more than horizontal branches because gravity works harder in vertical pipe."
        columns={[
          { title: "Horizontal branch", highlight: true },
          { title: "Vertical stack", subtitle: "3 stories or less" },
          { title: "Building drain", subtitle: "at 1/8 in per ft" },
        ]}
        rows={[
          { label: '1-1/2" pipe', values: ["3", "4", "not permitted"] },
          { label: '2" pipe', values: ["6", "10", "not permitted"] },
          { label: '3" pipe', values: ["20", "48", "36"] },
          { label: '4" pipe', values: ["160", "240", "180"] },
        ]}
      />

      <p>
        The rule that trips people up sits underneath the table: any line
        carrying a toilet must be 3 inch minimum regardless of its DFU
        total. A powder room with a toilet and a lav adds up to only 4
        DFU, which a 2 inch pipe could theoretically carry. It still gets
        a 3 inch line, because solids need the diameter, not just the
        capacity.
      </p>

      <Figure
        number={2}
        caption="The quarter-inch rule in one picture. A 20 foot horizontal run at 1/4 inch per foot needs 5 inches of drop, which decides joist routing before the first cut."
      >
        <SlopeSVG />
      </Figure>

      <h2>Slope: why more is not better</h2>
      <p>
        Code minimum is 1/4 inch of fall per foot of horizontal run for
        pipe 2-1/2 inches and smaller, and 1/8 inch per foot is permitted
        at 3 inches and up. The part almost nobody believes until they see
        a camera inspection: a drain sloped much steeper than about 1/2
        inch per foot clogs more, not less. Water accelerates ahead of the
        solids and leaves them stranded in a drying pipe. If a run needs
        to lose a lot of elevation, the clean solution is a 45 degree
        drop with proper fittings, not a long ramp.
      </p>
      <p>
        Do the drop arithmetic before opening anything. Drop equals run in
        feet times slope. A 12 foot branch at 1/4 inch per foot needs 3
        inches, which fits inside a joist bay. A 30 foot run needs 7-1/2
        inches, which probably does not, and you want to know that while
        the drywall is still on the wall.
      </p>

      <Scenario location="Columbus, OH">
        <p>
          A basement bathroom rough-in: one toilet (1.28 gpf, so 3 DFU),
          one lavatory (1 DFU), one shower (2 DFU), plus a laundry
          standpipe (2 DFU) joining the same horizontal branch on its way
          to the stack. Total: 8 DFU.
        </p>
        <p>
          Eight DFU fits in a 2 inch branch on capacity, but the toilet
          forces the line to 3 inch, which then carries the whole 8 DFU
          with room for 20. The branch runs 16 feet to the stack: at 1/4
          inch per foot that is a 4 inch drop, set with a laser level
          before cementing a single joint. The shower keeps its own 2
          inch trap arm, the standpipe gets its 2 inch minimum, and the
          inspector reads the same two tables printed above and signs
          off in ten minutes.
        </p>
      </Scenario>

      <h2>Where drain sizing goes wrong</h2>
      <p>
        <strong>Oversizing on purpose.</strong> The instinct says a bigger
        pipe drains better. Below roughly half-full, a drain line depends
        on the water depth to float solids along, and a 4 inch pipe
        carrying one bathroom runs so shallow that paper strands and dries.
        Size to the table, not above it. The code maximums exist to keep
        pipes self-scouring, and this is the single most common mistake in
        DIY drain work.
      </p>
      <p>
        <strong>The flat spot in the middle.</strong> A run that averages
        1/4 inch per foot but sags level for three feet in the middle
        clogs at the sag, every time. Strap horizontal pipe every 4 feet
        for PVC and check the whole run with a level, not just the two
        ends.
      </p>
      <p>
        <strong>Forgetting the vent.</strong> DFU tables assume every trap
        is vented. An unvented or poorly vented line siphons traps dry,
        which is what that gurgle after the toilet flushes is telling
        you. Vent sizing is its own table in Chapter 9 of the IPC; if the
        drain math above changed your pipe sizes, the vent sizes likely
        move with them.
      </p>
      <p>
        <strong>Mixing code books mid-project.</strong> The IPC and UPC
        disagree on some DFU values and some sizing limits. Neither is
        wrong; they are different documents. Pick the one your
        jurisdiction adopted and stay in it, because an inspector will
        not average two tables for you.
      </p>

      <Callout label="Permits are not optional here">
        Drain, waste, and vent work is permitted work in essentially
        every US jurisdiction, including basement bathroom rough-ins.
        The tables on this page let you plan the job and check a
        plumber&apos;s proposal line by line, and an unpermitted DWV
        alteration is exactly the kind of thing that surfaces during a
        home sale inspection.
      </Callout>

      <h2>Planning the rest of the rough-in</h2>
      <p>
        Drain sizing usually happens alongside the rest of a bathroom or
        basement build. The <a href="/stud-spacing-calculator">stud
        spacing calculator</a> lays out the wet wall the pipes run
        through, and a concrete cut for a new basement drain line means
        the <a href="/concrete-calculator">concrete calculator</a> for
        the patch-back. If a water heater is moving as part of the same
        project, size it with the{" "}
        <a href="/water-heater-calculator">water heater calculator</a>{" "}
        before the walls close.
      </p>
      <p>
        Count your fixtures in the calculator above, hold the result
        against the two tables on this page, and the pipe aisle stops
        being a guessing game.
      </p>
    </>
  );
}
