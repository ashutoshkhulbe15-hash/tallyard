import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function AmpacitySVG() {
  const wires = [
    { awg: "14", amps: 15, use: "lighting, general outlets" },
    { awg: "12", amps: 20, use: "kitchen, bath, laundry, garage" },
    { awg: "10", amps: 30, use: "dryer, water heater, small AC" },
    { awg: "8", amps: 40, use: "range, 32 A EV charger" },
    { awg: "6", amps: 55, use: "subpanel, 48 A EV charger" },
  ];
  const maxA = 55;
  return (
    <svg viewBox="0 0 680 306" width="100%" height="auto" role="img" aria-label="Copper wire ampacity at the 60 degree C column: 14 AWG carries 15 amps, 12 AWG 20 amps, 10 AWG 30 amps, 8 AWG 40 amps, 6 AWG 55 amps.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Copper ampacity, 60 degree C column</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The column that applies to NM-B cable in a house, which is nearly every branch circuit</text>
      {wires.map((w, i) => {
        const y = 74 + i * 42;
        const bar = (w.amps / maxA) * 300;
        return (
          <g key={w.awg}>
            <text x="118" y={y + 13} textAnchor="end" fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>{w.awg} AWG</text>
            <rect x="132" y={y} width={bar} height="18" rx="3" fill={i === 1 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={132 + bar + 10} y={y + 13} fontSize="11.5" fontWeight="700" fill={i === 1 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{w.amps} A</text>
            <text x="132" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{w.use}</text>
          </g>
        );
      })}
      <text x="20" y="300" fontSize="9" fill={GUIDE_SVG.inkFaint}>Aluminum carries roughly two sizes less: 8 AWG aluminum matches 10 AWG copper at 30 amps.</text>
    </svg>
  );
}

function TempColumnSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="NM-B cable is printed 90 degrees C but must be used at the 60 degree C column: 12 AWG is 20 amps, not the 30 amps the 90 degree column shows.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The 90 degree trap on Romex</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The jacket says 90 C. NEC 334.80 says size it from the 60 C column anyway.</text>

      <rect x="55" y="78" width="250" height="30" rx="4" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="180" y="98" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>12/2 NM-B  600V  90 C  (printed)</text>

      <text x="180" y="140" textAnchor="middle" fontSize="24" fill={GUIDE_SVG.inkFaint}>&#8595;</text>

      <rect x="55" y="160" width="250" height="34" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="180" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.accent}>Use as 20 A, not 30 A</text>

      <g fontSize="11">
        <text x="360" y="92" fontWeight="600" fill={GUIDE_SVG.ink}>Why the higher rating is printed</text>
        <text x="360" y="110" fill={GUIDE_SVG.inkMuted}>The insulation itself is rated 90 C, which</text>
        <text x="360" y="126" fill={GUIDE_SVG.inkMuted}>matters only for derating calculations.</text>
        <text x="360" y="158" fontWeight="600" fill={GUIDE_SVG.ink}>Why you cannot use it</text>
        <text x="360" y="176" fill={GUIDE_SVG.inkMuted}>Breakers, receptacles, and panel lugs are</text>
        <text x="360" y="192" fill={GUIDE_SVG.inkMuted}>listed at 60 or 75 C. The weakest link in</text>
        <text x="360" y="208" fill={GUIDE_SVG.inkMuted}>the chain sets the legal ampacity.</text>
      </g>
      <text x="20" y="240" fontSize="9" fill={GUIDE_SVG.inkFaint}>This single rule is behind most undersized DIY circuits: 12 AWG on a 30 amp breaker is a fire, not a shortcut.</text>
    </svg>
  );
}

function VoltageDropSVG() {
  const runs = [
    { awg: "14 AWG", volts: "15 A at 120 V", ft: 38 },
    { awg: "12 AWG", volts: "20 A at 120 V", ft: 46 },
    { awg: "10 AWG", volts: "30 A at 240 V", ft: 96 },
    { awg: "8 AWG", volts: "40 A at 240 V", ft: 115 },
    { awg: "6 AWG", volts: "55 A at 240 V", ft: 133 },
  ];
  const maxFt = 133;
  return (
    <svg viewBox="0 0 680 306" width="100%" height="auto" role="img" aria-label="Maximum one-way run at 3 percent voltage drop: 14 AWG 38 feet, 12 AWG 46 feet, 10 AWG 96 feet, 8 AWG 115 feet, 6 AWG 133 feet.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How far each size runs before voltage drop bites</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>One-way distance at 3 percent drop, copper, at the full rated load of the circuit</text>
      {runs.map((r, i) => {
        const y = 74 + i * 42;
        const bar = (r.ft / maxFt) * 300;
        return (
          <g key={r.awg}>
            <text x="118" y={y + 13} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{r.awg}</text>
            <rect x="132" y={y} width={bar} height="18" rx="3" fill={i === 1 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={132 + bar + 10} y={y + 13} fontSize="11.5" fontWeight="700" fill={i === 1 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{r.ft} ft</text>
            <text x="132" y={y + 31} fontSize="9" fill={GUIDE_SVG.inkFaint}>{r.volts}</text>
          </g>
        );
      })}
      <text x="20" y="300" fontSize="9" fill={GUIDE_SVG.inkFaint}>240 V circuits run about twice as far as 120 V at the same drop, which is why detached shops are fed at 240 V.</text>
    </svg>
  );
}

export function WireSizeCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="NEC (NFPA 70) Table 310.16 ampacity, 240.4(D) small conductor limits, 334.80 NM cable ampacity, 310.12 dwelling services"
      />

      <h2>Two rules decide the wire, and only one of them is on the label</h2>
      <p>
        Wire sizing answers two separate questions, and skipping the second
        is how a legal circuit ends up with dim lights and a hot motor.
        First, ampacity: can the conductor carry the current without
        overheating? That is a table lookup, and for ordinary house wiring
        it is short enough to memorize. 14 AWG copper is 15 amps, 12 AWG is
        20, 10 AWG is 30, 8 AWG is 40, 6 AWG is 55. Second, voltage drop:
        over the distance you are running, does enough voltage actually
        arrive? A 12 AWG circuit is fine at 30 feet and marginal at 80,
        even though the table never changes.
      </p>
      <p>
        The calculator above answers both at once and returns the larger of
        the two answers, which is the one that governs. This page covers
        the full ampacity chart for copper and aluminum, the 60 degree
        column rule that catches nearly every DIY mistake, the wire sizes
        for common appliances and services, and how far each gauge really
        runs.
      </p>

      <Figure
        number={1}
        caption="The five sizes that cover nearly all residential branch circuits. The 12 AWG at 20 amps is the workhorse: kitchen, bathroom, laundry, and garage receptacle circuits are all required to be 20 amp."
      >
        <AmpacitySVG />
      </Figure>

      <MethodologyNote>
        <p>
          Ampacity values follow NEC Table 310.16 at the 60 and 75 degree C
          columns. Branch circuits using NM-B cable are limited to the 60
          degree column by NEC 334.80 regardless of the cable&apos;s printed
          rating. The 15, 20, and 30 amp ceilings on 14, 12, and 10 AWG
          copper come from NEC 240.4(D), which caps overcurrent protection
          on small conductors below their table ampacity. Voltage drop
          figures use the 3 percent branch circuit target from the
          informational note to NEC 210.19(A) and standard conductor
          resistance. Local amendments and inspector judgment override all
          of it.
        </p>
      </MethodologyNote>

      <h2>The wire size chart</h2>

      <ComparisonTable
        caption="Copper and aluminum sizes for common breaker ratings. Aluminum runs roughly two gauge sizes larger for the same current, which is why service entrance cable is usually aluminum: it is cheaper per amp delivered."
        columns={[
          { title: "Copper", highlight: true },
          { title: "Aluminum" },
          { title: "Typical load" },
        ]}
        rows={[
          { label: "15 A", values: ["14 AWG", "not used", "Lighting, bedroom outlets"] },
          { label: "20 A", values: ["12 AWG", "not used", "Kitchen, bath, laundry, garage"] },
          { label: "30 A", values: ["10 AWG", "8 AWG", "Dryer, water heater, window AC"] },
          { label: "40 A", values: ["8 AWG", "6 AWG", "Electric range, 32 A EV charger"] },
          { label: "50 A", values: ["6 AWG", "4 AWG", "Range, 40 A EV charger, small subpanel"] },
          { label: "60 A", values: ["6 AWG", "4 AWG", "Subpanel, shop feeder"] },
          { label: "100 A", values: ["4 AWG", "2 AWG", "Subpanel or small service"] },
          { label: "125 A", values: ["2 AWG", "1/0 AWG", "Service on a smaller or older house"] },
          { label: "150 A", values: ["1 AWG", "2/0 AWG", "Service or large subpanel"] },
          { label: "200 A", values: ["2/0 AWG", "4/0 AWG", "Standard modern house service"] },
        ]}
      />

      <p>
        The rows people search for, stated plainly. A 20 amp circuit takes
        12 AWG copper, never 14, and this is the single most common wiring
        error in DIY work because 14 AWG is cheaper and easier to bend.
        For 50 amp wire size, use 6 AWG copper or 4 AWG aluminum. The 100
        amp service wire size is 4 AWG copper or 2 AWG aluminum, and 125
        amp service, common on houses upgraded in the 1980s, takes 2 AWG
        copper or 1/0 aluminum. The 200 amp service wire size is 2/0
        copper or 4/0 aluminum;
        service entrance conductors for dwellings get a small allowance
        under NEC 310.12 that lets them run slightly smaller than a general
        feeder of the same rating, which is why the service table looks
        generous next to the subpanel numbers.
      </p>

      <Figure
        number={2}
        caption="The mistake this prevents: reading 12 AWG off the 90 degree column, seeing 30 amps, and putting it on a 30 amp breaker. The cable is rated 90 degrees; the terminations it lands on are not."
      >
        <TempColumnSVG />
      </Figure>

      <h2>Why the cable says 90 C and you still use 60</h2>
      <p>
        Every roll of NM-B cable is printed with a 90 degree C rating, and
        the 90 degree column of Table 310.16 shows 12 AWG at 30 amps. Both
        are true, and neither lets you put 12 AWG on a 30 amp breaker. NEC
        334.80 requires NM cable to be sized from the 60 degree column, and
        the reason is the hardware at each end: breakers, receptacles, and
        panel lugs are listed for 60 or 75 degree terminations, so the
        weakest link governs the whole circuit. The 90 degree rating exists
        for derating math, where you start from the higher number and
        subtract for bundling or ambient heat, but the final answer can
        never exceed the 60 degree value.
      </p>
      <p>
        Two derating cases come up in real houses. Bundling: once more than
        three current-carrying conductors share a conduit or pass bundled
        through more than 24 inches of framing, ampacity drops, 80 percent
        for four to six conductors and 70 percent for seven to nine.
        Ambient heat: an attic in Phoenix can run above 100 degrees F, and
        conductors up there lose ampacity accordingly, which is why long
        attic runs sometimes need the next size up even though the length
        alone would not demand it.
      </p>

      <h2>Voltage drop and how far a circuit really runs</h2>

      <Figure
        number={3}
        caption="Distances at full rated load, which is conservative. A 20 amp circuit carrying a typical 8 amp load runs much farther before dropping 3 percent, but sizing to the breaker rather than the load is the safer habit."
      >
        <VoltageDropSVG />
      </Figure>

      <p>
        Voltage drop is not a code violation. NEC 210.19 puts the 3 percent
        branch circuit and 5 percent total targets in an informational note,
        which means recommended rather than required. It is still worth
        respecting, because the symptoms are real: motors draw more current
        at lower voltage and run hotter, incandescent and some LED fixtures
        dim visibly, and heating elements lose output roughly with the
        square of the voltage. A detached garage 120 feet away on 12 AWG at
        120 volts is the classic complaint, and the fix at the design stage
        costs one wire size.
      </p>
      <p>
        Two structural facts make long runs easier. Doubling voltage
        roughly doubles the distance you can run at the same drop, which is
        why a detached shop is fed at 240 volts with a subpanel rather than
        by extending 120 volt circuits. And drop is proportional to
        current, so a lightly loaded long run is fine while a fully loaded
        one is not. If the load is a continuous one, such as an EV charger
        or electric heat, the 125 percent continuous load rule in NEC
        210.19 already pushes the conductor up before voltage drop enters
        the picture.
      </p>

      <h2>Low-voltage DC: solar, automotive, and speaker wire</h2>
      <p>
        Wire sizing for 12, 24, and 48 volt DC follows the same two rules,
        but the balance between them flips completely. At 12 volts,
        voltage drop governs almost every run, because a 3 percent budget
        on 12 volts is only 0.36 volts. A 20 amp accessory circuit that
        would take 12 AWG in a house needs 10 AWG at 10 feet and 6 AWG at
        25 feet in a 12 volt system. This is why marine and RV wiring
        looks absurdly oversized to anyone used to household work: it is
        not overbuilt, it is correctly built for the voltage.
      </p>
      <p>
        Three practical notes for DC work. Stranded wire, not solid, for
        anything that vibrates or flexes, which is every vehicle and most
        boats. Solar arrays are usually wired at higher DC voltage
        specifically to escape this problem, which is why a 48 volt
        battery bank moves the same power through a quarter of the copper
        a 12 volt bank needs. And speaker wire is the one case where the
        3 percent rule is the wrong target: speaker runs are sized against
        the load impedance, and the common guidance is to keep total wire
        resistance under about 5 percent of the speaker impedance, which
        for an 8 ohm speaker means 16 AWG covers most residential runs and
        14 AWG handles long ones. Set the voltage selector on the
        calculator above to 12, 24, or 48 volts and it applies the DC math
        directly.
      </p>

      <h2>Aluminum: fine on feeders, a problem in old branch circuits</h2>
      <p>
        Modern aluminum building wire, the AA-8000 series alloy, is a
        legitimate and common choice for service entrances and large
        feeders. It is meaningfully cheaper per amp, it is what most
        utilities run to the meter, and 4/0 aluminum feeding a 200 amp
        panel is completely ordinary. It needs the right treatment:
        connectors listed AL or CU-AL, antioxidant compound on the
        terminations, and torque set with a torque screwdriver rather than
        by feel, because aluminum creeps under pressure in a way copper
        does not.
      </p>
      <p>
        The bad reputation comes from a different product. Houses wired
        between roughly 1965 and 1973 used solid aluminum in 15 and 20 amp
        branch circuits, and the CPSC found those connections far more
        likely to reach fire hazard conditions than copper. If you open a
        receptacle box and find solid aluminum branch wiring, that is an
        evaluation-by-an-electrician situation and not a DIY repair; the
        accepted repairs are specific listed connectors or a rewire, and
        simply replacing devices does not fix it.
      </p>

      <Scenario location="Austin, TX">
        <p>
          A Level 2 EV charger in a detached garage, 85 feet of run from
          the main panel. The charger is a 48 amp unit, which is a
          continuous load, so NEC 210.19 requires the circuit at 125
          percent: 48 x 1.25 = 60 amps. That sets a 60 amp breaker and 6
          AWG copper from the ampacity table.
        </p>
        <p>
          Now the distance check. Six AWG copper at 60 amps over 85 feet at
          240 volts drops about 2.7 percent, just inside the 3 percent
          target, so 6 AWG holds on both counts. Had the run been 120 feet,
          the drop would pass 3.8 percent and the sensible answer is 4 AWG,
          about $1.40 more per foot and roughly $170 on this job. In an
          Austin garage that hits 110 degrees F in August, the ambient
          derating is worth checking with the electrician too, since a hot
          garage is exactly where the margin disappears. The permit and
          inspection are required either way.
        </p>
      </Scenario>

      <h2>Where wire sizing goes wrong</h2>
      <p>
        <strong>Using 14 AWG on a 20 amp circuit.</strong> The most common
        one, and the most consequential. The breaker protects the wire, not
        the device; a 20 amp breaker will happily let 18 amps flow through
        a conductor rated for 15 until the insulation fails somewhere
        inside a wall.
      </p>
      <p>
        <strong>Upsizing the breaker instead of the wire.</strong> When a
        breaker trips repeatedly, the breaker is doing its job. Replacing a
        15 amp breaker with a 20 to stop the nuisance leaves 14 AWG
        protected at 20 amps, which is the textbook cause of an electrical
        fire.
      </p>
      <p>
        <strong>Ignoring the continuous load rule.</strong> Anything
        running three hours or more without a break, such as EV charging,
        electric heat, or shop lighting, is sized at 125 percent of its
        load. A 40 amp charger is a 50 amp circuit, not a 40 amp one.
      </p>
      <p>
        <strong>Forgetting the neutral and ground.</strong> A 240 volt
        appliance circuit may need a neutral depending on the appliance,
        and the equipment ground sizing comes from its own table, NEC
        250.122, not from the ampacity table. Buying 6/2 cable when the
        range needs 6/3 is a return trip.
      </p>

      <Callout label="This is a permit-and-inspection domain">
        Branch circuits, subpanels, and service upgrades are permitted work
        nearly everywhere in the US, and anything at the service entrance
        or the meter involves the utility as well. Use the numbers on this
        page to plan the job, check a quote, and understand what an
        electrician is proposing. Panel work in particular has bus bars
        that stay energized with the main breaker off, which is why service
        changes are not a learn-as-you-go project.
      </Callout>

      <h2>Circuits are part of a larger plan</h2>
      <p>
        Wire sizing usually shows up inside a bigger job. A new EV or shop
        circuit often accompanies a{" "}
        <a href="/solar-calculator">solar calculator</a> estimate on the
        same panel, portable tools raise the separate question the{" "}
        <a href="/extension-cord-calculator">extension cord calculator</a>{" "}
        answers, and sizing the cooling load that a new circuit will serve
        runs through the <a href="/btu-calculator">BTU calculator</a>.
      </p>
      <p>
        Run your amps, volts, and distance through the calculator above,
        take the larger of the two answers, and bring that number to the
        electrician. Being right about the wire is the cheapest part of any
        electrical project.
      </p>
    </>
  );
}
