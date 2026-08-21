import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function GaugeGridSVG() {
  const gauges = ["16 AWG", "14 AWG", "12 AWG", "10 AWG"];
  const lengths = ["25 ft", "50 ft", "100 ft", "150 ft"];
  const amps = [
    [13, 10, 0, 0],
    [15, 15, 13, 0],
    [20, 20, 15, 10],
    [30, 30, 20, 15],
  ];
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Extension cord amp capacity by gauge and length. 16 AWG carries 13 amps at 25 feet and 10 amps at 50 feet. 12 AWG carries 20 amps at 25 and 50 feet, 15 at 100 feet. 10 AWG carries 30 amps at 25 and 50 feet.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Amps a cord can carry, by gauge and length</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Lower gauge number means thicker wire. Length is why the same cord fails at 100 ft.</text>
      {lengths.map((l, c) => (
        <text key={l} x={200 + c * 106} y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{l}</text>
      ))}
      {gauges.map((g, r) => (
        <g key={g}>
          <text x="132" y={112 + r * 40} textAnchor="end" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{g}</text>
          {lengths.map((l, c) => {
            const a = amps[r][c];
            const x = 200 + c * 106;
            const ok = a > 0;
            return (
              <g key={l}>
                <rect x={x - 44} y={92 + r * 40} width="88" height="28" rx="4"
                  fill={ok ? (a >= 20 ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft) : "none"}
                  stroke={ok ? (a >= 20 ? GUIDE_SVG.accent : GUIDE_SVG.cool) : GUIDE_SVG.line} strokeWidth="1.2" />
                <text x={x} y={111 + r * 40} textAnchor="middle" fontSize="11.5" fontWeight="700"
                  fill={ok ? (a >= 20 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted) : GUIDE_SVG.inkFaint}>
                  {ok ? `${a} A` : "no"}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="20" y="252" fontSize="9" fill={GUIDE_SVG.inkFaint}>A 16 gauge cord at 100 ft is not a light-duty option, it is the wrong cord. Buy the gauge for the length you actually need.</text>
    </svg>
  );
}

function JacketCodeSVG() {
  const letters = [
    { l: "S", m: "Service, rated 600 volts" },
    { l: "J", m: "Junior, 300 volts, lighter duty" },
    { l: "T", m: "Thermoplastic jacket (vinyl)" },
    { l: "O", m: "Oil resistant" },
    { l: "W", m: "Weather rated, outdoor safe" },
    { l: "E", m: "Elastomer, flexible in cold" },
  ];
  return (
    <svg viewBox="0 0 680 244" width="100%" height="auto" role="img" aria-label="Extension cord jacket code letters: S is service 600 volt, J is junior 300 volt, T is thermoplastic, O is oil resistant, W is weather rated for outdoor use, E is elastomer for cold flexibility.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Reading the letters printed on the jacket</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The W is the one that matters outdoors. No W means indoor only, whatever the packaging says.</text>

      <rect x="46" y="72" width="180" height="34" rx="5" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="136" y="95" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.accent} fontFamily="monospace">SJTW 12/3</text>
      <text x="136" y="124" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>a typical outdoor cord</text>
      <text x="136" y="140" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>12 gauge, 3 conductors</text>

      {letters.map((x, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i % 3;
        const px = 286 + col * 196;
        const py = 84 + row * 34;
        return (
          <g key={x.l}>
            <text x={px} y={py} fontSize="13" fontWeight="700" fill={GUIDE_SVG.accent} fontFamily="monospace">{x.l}</text>
            <text x={px + 20} y={py} fontSize="10" fill={GUIDE_SVG.inkMuted}>{x.m}</text>
          </g>
        );
      })}
      <text x="20" y="204" fontSize="10.5" fontWeight="600" fill={GUIDE_SVG.ink}>The number after the gauge is conductor count</text>
      <text x="20" y="222" fontSize="10" fill={GUIDE_SVG.inkMuted}>12/3 is 12 gauge with three conductors, meaning it has a ground. 12/2 has no ground and no place on a jobsite.</text>
      <text x="20" y="240" fontSize="9" fill={GUIDE_SVG.inkFaint}>Anything with a tool, a wet location, or a generator wants three conductors and a W in the code.</text>
    </svg>
  );
}

function CoiledSVG() {
  return (
    <svg viewBox="0 0 680 236" width="100%" height="auto" role="img" aria-label="A coiled extension cord traps heat and must be derated, while an uncoiled cord sheds heat to the air and carries its full rating.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Why a cord on a reel runs hot</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Every conductor makes heat under load. Coiled, it has nowhere to go.</text>

      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx="130" cy="122" r={16 + i * 11} fill="none" stroke={GUIDE_SVG.warm} strokeWidth="4" opacity={0.85 - i * 0.12} />
      ))}
      <text x="130" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.warm}>Coiled on the reel</text>
      <text x="130" y="202" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>heat builds in the middle</text>

      <path d="M 300 122 C 340 92, 380 152, 420 122 S 500 92, 540 122" fill="none" stroke={GUIDE_SVG.accent} strokeWidth="4" strokeLinecap="round" />
      <text x="420" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>Fully unwound</text>
      <text x="420" y="202" textAnchor="middle" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>carries its full rating</text>

      <text x="20" y="230" fontSize="9" fill={GUIDE_SVG.inkFaint}>Reel manufacturers publish two ratings for this reason: one wound, one unwound, and the wound figure is often half.</text>
    </svg>
  );
}

export function ExtensionCordCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="UL 817 cord sets and power supply cords, OSHA 1926.405 temporary wiring, NEC Article 400 flexible cords, ESFI seasonal safety guidance"
      />

      <h2>Gauge and length are one decision, not two</h2>
      <p>
        A 16 gauge cord runs a circular saw beautifully at 25 feet and
        starves it at 100. Nothing about the cord changed; the length did.
        Resistance accumulates over distance, voltage arrives lower than it
        left, and the motor compensates by pulling more current and running
        hotter. That is the entire subject in one sentence, and it is why
        the only correct question is what gauge for this length at this
        amperage.
      </p>
      <p>
        The calculator above takes the load, the distance, and where the
        cord will live, then returns a gauge. This page carries the full
        gauge chart, how to read the letter codes stamped on the jacket,
        why a cord left coiled on a reel is derated, what a generator needs
        that an ordinary cord cannot give it, and the specific rules for
        holiday lights.
      </p>

      <Figure
        number={1}
        caption="The whole answer in one grid. Read down to your gauge and across to your length. Anything marked no means that combination has no safe amperage worth using."
      >
        <GaugeGridSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Capacity figures reflect standard published cord set ratings
          consistent with UL 817 and OSHA 1926.405 practice for temporary
          wiring, derated for length to hold voltage drop near 3 percent.
          Jacket letter codes follow NEC Article 400 nomenclature.
          Manufacturer ratings on a specific cord always govern; where a
          cord is stamped with a lower amperage than this chart suggests,
          the stamp wins.
        </p>
      </MethodologyNote>

      <h2>The extension cord gauge chart</h2>

      <ComparisonTable
        caption="Maximum continuous amps by gauge and length. Cords are usually sold as 16, 14, 12, and 10 gauge; the lower the number, the thicker the copper and the heavier the cord."
        columns={[
          { title: "25 ft" },
          { title: "50 ft", highlight: true },
          { title: "100 ft" },
          { title: "150 ft" },
        ]}
        rows={[
          { label: "16 AWG", values: ["13 A", "10 A", "Not suitable", "Not suitable"] },
          { label: "14 AWG", values: ["15 A", "15 A", "13 A", "Not suitable"] },
          { label: "12 AWG", values: ["20 A", "20 A", "15 A", "10 A"] },
          { label: "10 AWG", values: ["30 A", "30 A", "20 A", "15 A"] },
        ]}
      />

      <p>
        The practical reading: 16 gauge is a lamp and laptop cord, fine in
        a bedroom and out of its depth anywhere near a tool. 14 gauge
        covers most household use up to 50 feet. 12 gauge is the honest
        general-purpose jobsite cord and the right default if you are
        buying one cord to own. 10 gauge exists for generators, welders,
        and long runs, and it is heavy enough that nobody buys it by
        accident.
      </p>

      <ComparisonTable
        caption="Common loads and the gauge they need at 50 and 100 feet. Nameplate amps are on the tool; when only watts are listed, divide by 120 to get amps."
        columns={[
          { title: "Typical draw" },
          { title: "At 50 ft" },
          { title: "At 100 ft", highlight: true },
        ]}
        rows={[
          { label: "String lights, laptop, radio", values: ["Under 3 A", "16 AWG", "14 AWG"] },
          { label: "Drill, sander, box fan", values: ["4-7 A", "16 AWG", "14 AWG"] },
          { label: "Circular saw, pressure washer", values: ["10-13 A", "14 AWG", "12 AWG"] },
          { label: "Space heater, table saw", values: ["12-15 A", "14 AWG", "12 AWG"] },
          { label: "Compressor, large miter saw", values: ["15-20 A", "12 AWG", "10 AWG"] },
          { label: "Generator feed, welder", values: ["20-30 A", "10 AWG", "10 AWG"] },
        ]}
      />

      <Figure
        number={2}
        caption="The jacket tells you everything if you can read it. SJTW 12/3 is the code on most decent outdoor contractor cords, and the W is the letter that makes it legal outside."
      >
        <JacketCodeSVG />
      </Figure>

      <h2>Indoor, outdoor, and the letter that separates them</h2>
      <p>
        Every cord carries a code stamped along the jacket, and the letters
        are not decoration. S means service grade at 600 volts and SJ means
        junior at 300. T is a thermoplastic jacket, O adds oil resistance,
        E is an elastomer that stays flexible in cold, and W means weather
        rated, which is the only letter that authorizes outdoor use. A cord
        without a W is an indoor cord no matter how heavy it feels or what
        the packaging photo shows.
      </p>
      <p>
        The number after the gauge is conductor count. A 12/3 cord has
        three conductors, meaning hot, neutral, and ground, and that ground
        is why a three prong cord belongs on anything with a metal housing.
        Two conductor cords have no ground path at all. For outdoor and
        tool use the specification worth memorizing is simple: three
        conductors, a W in the code, and a gauge chosen from the grid
        above.
      </p>

      <Figure
        number={3}
        caption="The reel problem. A cord rated 15 amps unwound may be rated 7 or 8 amps while still on the drum, and the packaging usually says so in small print."
      >
        <CoiledSVG />
      </Figure>

      <h2>Cord reels and the coiling problem</h2>
      <p>
        Retractable reels are genuinely convenient and they introduce a
        hazard most people never hear about. A conductor under load
        generates heat, and an uncoiled cord sheds that heat to the air
        along its whole length. Wound on a drum, the inner turns are
        insulated by the outer ones and the temperature climbs. Reel
        manufacturers publish two ratings for exactly this reason, and the
        wound figure is often around half the unwound one.
      </p>
      <p>
        The rule is to unwind the full cord before drawing any real load,
        even if you only need ten feet of it. If a reel gets warm to the
        touch during use, that is the failure mode announcing itself. This
        applies to cords coiled on the floor too, not just reels: a cord
        run in a tight loop behind a workbench is doing the same thing on a
        smaller scale.
      </p>

      <h2>Generator cords are a different product</h2>
      <p>
        A generator cord is not a heavy extension cord with a different
        label. Portable generators output through locking connectors,
        typically an L14-30 for 30 amp 240 volt or an L5-30 for 30 amp 120
        volt, and the cord that mates with them is usually 10 gauge with
        four conductors for the 240 volt version. It is built to carry the
        full output of the unit continuously, and it locks so vibration
        cannot shake it loose.
      </p>
      <p>
        Two hard rules go with them. Never backfeed a generator into a wall
        outlet with a double-male cord, which energizes the utility lines
        and can kill a lineman; a transfer switch or interlock is the only
        correct connection to house wiring. And run the generator outdoors
        only, well away from windows and doors, because carbon monoxide
        from portable generators kills people every storm season. The cord
        exists so the generator can stay far outside while the load stays
        inside.
      </p>

      <Scenario location="Tampa, FL">
        <p>
          A three day outage after a storm. A 7,500 watt portable generator
          sits 40 feet from the house, running a refrigerator at 6 amps, a
          window AC unit at 9 amps, and a few lights and chargers at 3
          amps, all on 120 volts.
        </p>
        <p>
          Combined draw is 18 amps, which needs 12 gauge at 50 feet and
          would be marginal on 14. The right answer is a single 10 gauge
          50 foot generator cord to a powered distribution box near the
          house, then short 12 gauge cords from there to each appliance,
          rather than three long cords daisy-chained back to the unit.
          Total cost is about $180 in cords, which is the cheapest line
          item in a hurricane kit and the one people skip. In Florida
          humidity every cord in that chain needs the W rating, since
          afternoon rain is not optional.
        </p>
      </Scenario>

      <h2>Christmas lights and daisy chaining</h2>
      <p>
        Christmas and other string lights are a low-draw load with a very
        high connection count, which makes them the seasonal exception
        worth stating separately.
        The limit is not the cord, it is the manufacturer&apos;s maximum
        number of strings connected end to end, printed on the tag: often
        three to five for older incandescent sets and considerably more for
        LEDs. Exceeding it overloads the wiring inside the first string,
        not the extension cord.
      </p>
      <p>
        The cord rules for Christmas lights are otherwise ordinary. Use an outdoor
        rated cord with a W. Do not connect two extension cords together to
        reach further, because every junction is a resistance point and a
        place water gets in; buy the length you need instead. Keep
        connections off the ground and out of standing water, or use a cord
        connector cover. And a cord run under a rug or through a doorway is
        being crushed and abraded every time someone walks over it, which is
        how the jacket fails and the fire starts.
      </p>

      <h2>Where extension cords go wrong</h2>
      <p>
        <strong>Chaining cords to reach.</strong> Two 50 foot cords make a
        100 foot run with an extra connection and the voltage drop of the
        full distance. If the chart says 12 gauge at 100 feet, two 50 foot
        14 gauge cords do not satisfy it.
      </p>
      <p>
        <strong>Using an indoor cord outside.</strong> Common, and the
        reason is that indoor cords are cheaper and feel adequate. Moisture
        and UV degrade a non-W jacket, and the failure shows up months
        later.
      </p>
      <p>
        <strong>Ignoring warmth.</strong> A cord that is warm along its
        length is undersized for what it is carrying. That is not normal
        operation and it does not settle down.
      </p>
      <p>
        <strong>Treating a cord as permanent wiring.</strong> Extension
        cords are for temporary use. A cord powering a freezer in a garage
        year round, run through a wall, or stapled to a baseboard has
        become permanent wiring, which is both a code violation and the
        scenario behind a large share of cord related fires. If a location
        needs power permanently, it needs a receptacle, which is a{" "}
        <a href="/wire-size-calculator">wire size calculator</a> question.
      </p>

      <Callout label="Damaged cords do not get repaired">
        A cord with a cut jacket, exposed conductor, missing ground pin, or
        a plug that has melted or discolored is finished. Taping a nick is
        not a repair; the tape hides the damage without restoring the
        insulation, and the ground pin someone snapped off was the safety
        path. Cords are inexpensive relative to what they power and to what
        they can cause. Replace rather than nurse them along.
      </Callout>

      <h2>The rest of the power question</h2>
      <p>
        A cord is a temporary answer to a wiring question. Permanent
        circuits size through the{" "}
        <a href="/wire-size-calculator">wire size calculator</a>, a shop
        or garage circuit often sits alongside a{" "}
        <a href="/garage-door-calculator">garage door calculator</a>{" "}
        opener install, and if the reason for all the cords is a solar or
        battery setup, the{" "}
        <a href="/solar-calculator">solar calculator</a> sizes the system
        itself.
      </p>
      <p>
        Match the gauge to the length and the load, buy one cord long
        enough instead of two that reach, and unwind the reel before you
        pull the trigger.
      </p>
    </>
  );
}
