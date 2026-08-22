import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function FirstHourSVG() {
  const activities = [
    { label: "Shower (8 min)", gallons: 16 },
    { label: "Dishwasher cycle", gallons: 6 },
    { label: "Clothes washer (warm)", gallons: 12 },
    { label: "Hand washing (5 min)", gallons: 4 },
    { label: "Bath (full tub)", gallons: 36 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Hot water usage: shower 16 gallons, dishwasher 6, clothes washer 12, bath 36.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How fast you use hot water (peak hour demand)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Add up the gallons your household uses in its busiest hour to find your first-hour rating need.</text>
      {activities.map((a, i) => {
        const y = 65 + i * 28;
        const w = a.gallons * 8;
        return (
          <g key={a.label}>
            <text x="195" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{a.label}</text>
            <rect x="205" y={y} width={w} height="18" rx="3" fill={i === 4 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={213 + w} y={y + 13} fontSize="11" fontWeight="700" fill={i === 4 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{a.gallons} gal</text>
          </g>
        );
      })}
    </svg>
  );
}

function CostComparisonSVG() {
  const types = [
    { label: "Electric tank", cost: "$800 to 1,500", x: 50, hl: false },
    { label: "Gas tank", cost: "$1,000 to 2,000", x: 210, hl: false },
    { label: "Tankless gas", cost: "$2,500 to 5,000", x: 370, hl: false },
    { label: "Heat pump WH", cost: "$2,000 to 4,000", x: 530, hl: true },
  ];
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Installed cost by water heater type: electric tank $800 to 1,500, gas tank $1,000 to 2,000, tankless gas $2,500 to 5,000, heat pump water heater $2,000 to 4,000.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed cost by type</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Straight replacement into existing connections. New gas lines, venting, or circuits add to all four.</text>
      {types.map((t) => (
        <g key={t.label}>
          <rect x={t.x} y="60" width="140" height="80" rx="8"
            fill={t.hl ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft}
            stroke={t.hl ? GUIDE_SVG.accent : GUIDE_SVG.cool} strokeWidth="1.2" />
          <text x={t.x + 70} y="88" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={t.hl ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{t.label}</text>
          <text x={t.x + 70} y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>{t.cost}</text>
        </g>
      ))}
      <text x="20" y="176" fontSize="9" fill={GUIDE_SVG.inkFaint}>Heat pump water heaters qualify for a federal 25C credit and many utility rebates, which often closes the gap with a gas tank.</text>
    </svg>
  );
}

function FuelComparisonSVG() {
  const fuels = [
    { label: "Electric resistance tank", cost: "$500 to 600/yr", w: 240, hl: false },
    { label: "Gas tank", cost: "$250 to 350/yr", w: 140, hl: false },
    { label: "Tankless gas", cost: "$150 to 250/yr", w: 100, hl: false },
    { label: "Heat pump water heater", cost: "$150 to 250/yr", w: 100, hl: true },
  ];
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Annual operating cost by fuel type: electric resistance tank $500 to 600, gas tank $250 to 350, tankless gas $150 to 250, heat pump water heater $150 to 250 per year.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Annual operating cost, 50 gallon equivalent</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>A heat pump water heater runs on electricity at roughly gas prices, which is the whole argument for it</text>
      {fuels.map((f, i) => {
        const y = 62 + i * 30;
        return (
          <g key={f.label}>
            <text x="220" y={y + 14} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{f.label}</text>
            <rect x="230" y={y} width={f.w} height="18" rx="3" fill={f.hl ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={240 + f.w} y={y + 13} fontSize="11" fontWeight="700" fill={f.hl ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{f.cost}</text>
          </g>
        );
      })}
      <text x="20" y="184" fontSize="9" fill={GUIDE_SVG.inkFaint}>Assumes 13 cents per kWh and $1.20 per therm. Local rates shift these substantially.</text>
    </svg>
  );
}

export function WaterHeaterCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="August 9, 2026" reviewedAgainst="DOE water heater sizing methodology, ANSI Z21.10.1, IRC P2803 and P2903 relief and expansion requirements" />

      <h2>Tank size is not about how much water you store. It is about how fast you use it.</h2>

      <p>The number on a water heater (40 gallon, 50 gallon) is the storage capacity. But storage capacity alone does not tell you whether the heater can keep up with your household. What matters is the first-hour rating: how many gallons of hot water the unit delivers in its peak usage hour. A 40-gallon tank with a powerful burner might have a higher first-hour rating than a 50-gallon tank with a weak one. The calculator above sizes based on your household demand pattern, not just headcount.</p>
      <ComparisonTable
        caption="Starting point by household size. Tankless flow assumes a moderate temperature rise; in cold northern groundwater the same unit delivers considerably less."
        columns={[
          { title: "Tank size", highlight: true },
          { title: "Tankless flow" },
        ]}
        rows={[
          { label: "1 to 2 people", values: ["30 to 40 gal", "5 to 7 GPM"] },
          { label: "2 to 3 people", values: ["40 to 50 gal", "7 to 8 GPM"] },
          { label: "3 to 4 people", values: ["50 to 65 gal", "8 to 10 GPM"] },
          { label: "5 or more", values: ["65 to 80 gal", "10+ GPM"] },
        ]}
      />

      <MethodologyNote>
        <p>Sizing follows DOE first-hour rating methodology: sum of peak-hour hot water draws at the fixture level. GPM ratings for tankless units based on temperature rise requirements (groundwater temp to 120°F setpoint) by region. Cost data from plumber association surveys and manufacturer MSRP (2025-2026). Operating costs use EIA average residential utility rates.</p>
      </MethodologyNote>

      <h2>Understanding peak demand</h2>

      <Figure number={1} caption="Morning rush hour in a family of four: two showers, a dishwasher start, and hand washing can drain 40+ gallons in 45 minutes.">
        <FirstHourSVG />
      </Figure>

      <p>Add up the hot water draws in your busiest hour. Two showers back to back (32 gallons) plus a dishwasher (6 gallons) equals 38 gallons in one hour. Your water heater&apos;s first-hour rating needs to exceed this number. If it does not, the second shower goes cold before the rinse cycle finishes. Tankless units solve this differently: they heat water on demand at a fixed flow rate (GPM). As long as total simultaneous flow stays under the unit&apos;s GPM capacity, you never run out.</p>

      <h2>First hour rating, and the gallon numbers people search for</h2>
      <p>
        Every tank water heater carries a first hour rating, or FHR, on its
        EnergyGuide label, and that number matters more than the gallon
        capacity printed on the front. FHR is how much hot water the unit
        can deliver in one busy hour starting from a full tank, which is
        storage plus whatever the burner or element can recover while you
        are drawing. A 40 gallon gas heater and a 50 gallon electric can
        have nearly the same FHR, because gas recovers roughly twice as
        fast.
      </p>

      <ComparisonTable
        caption="Typical sizing by household. Gas and electric columns show the tank size that reaches a similar first hour rating, which is why a 50 gallon electric water heater and a 40 gallon gas one serve the same family."
        columns={[
          { title: "Peak hour demand" },
          { title: "Gas tank", highlight: true },
          { title: "Electric tank" },
        ]}
        rows={[
          { label: "1 to 2 people", values: ["25 to 35 gal", "30 gal", "30 to 40 gal"] },
          { label: "2 to 3 people", values: ["35 to 45 gal", "40 gal", "50 gal"] },
          { label: "3 to 4 people", values: ["45 to 60 gal", "40 to 50 gal", "50 to 65 gal"] },
          { label: "5 or more", values: ["60 to 80 gal", "50 to 75 gal", "66 to 80 gal"] },
        ]}
      />

      <p>
        Two consequences follow. A 50 gallon electric water heater is the
        volume seller in the US because it covers a typical family of four
        on electric service, and a 50 gallon gas water heater covers a
        larger household than its label suggests. And when a heater is
        replaced like for like without checking FHR, a household that grew
        since the last replacement ends up with the same cold shower it had
        before.
      </p>

      <Callout label="Groundwater temperature matters for tankless">A tankless unit in Minnesota heats incoming water from 40°F to 120°F (80° rise). The same unit in Florida heats from 72°F to 120°F (48° rise). The Florida unit delivers 40% more GPM at the same BTU input because it has less work to do. Tankless GPM ratings are always at a specific temperature rise. Check the spec for your region&apos;s groundwater temperature.</Callout>

      <h2>What each type costs to buy and run</h2>

      <Figure number={2} caption="Electric tanks are cheapest to buy. Heat pump water heaters cost more but use 60-70% less electricity. Gas tankless costs the most to install but the least to operate.">
        <CostComparisonSVG />
      </Figure>

      <Figure number={3} caption="Operating cost over 10 years: an electric resistance tank costs $5,000-6,000. A heat pump water heater costs $1,500-2,500. The savings pay for the upgrade.">
        <FuelComparisonSVG />
      </Figure>

      <Scenario location="Phoenix, AZ">
        A homeowner replaced a 12-year-old 50-gallon electric tank ($480/yr operating) with a 50-gallon heat pump water heater (Rheem ProTerra, $200/yr operating). Installed cost: $3,200. Federal 25C tax credit: -$2,000. Net cost: $1,200. Annual savings: $280. Payback after credit: 4.3 years. The heat pump unit also dehumidifies the garage where it is installed, reducing the AC load in summer.
      </Scenario>

      <ComparisonTable
        columns={[{title:"Tank"},{title:"Tankless"},{title:"Heat pump WH"}]}
        rows={[
          {label:"Hot water supply",values:["Limited by tank size","Unlimited (at flow rate)","Limited by tank size"]},
          {label:"Lifespan",values:["8 to 12 yr","15 to 20 yr","12 to 15 yr"]},
          {label:"Space needed",values:["Floor space for tank","Wall-mounted (small)","Floor space + clearance for airflow"]},
          {label:"Installation complexity",values:["Simple replacement","May need gas line/vent upgrade","Needs 240V circuit + condensate drain"]},
          {label:"Best for",values:["Budget, simple replacement","Endless hot water, gas homes","Max efficiency, tax credit, electric homes"]},
        ]}
        caption="For electric homes, heat pump water heaters are the best long-term value. For gas homes with high demand, tankless gas is the premium option."
      />

      <h2>Tankless vs tank water heater</h2>
      <p>
        The instant water heater vs tank question comes down to how you
        use hot water rather than which is better. A storage tank water heater holds a fixed
        amount and refills; a tankless heats on demand and never runs out,
        but it is limited by flow rate rather than volume. If two showers
        run at once, a tank with enough FHR handles it and a tankless only
        does if it can produce the combined gallons per minute at your
        temperature rise.
      </p>
      <p>
        That temperature rise is the part people miss. A tankless rated
        at 9 GPM is rated at some specific rise, usually 35 or 45 degrees.
        In Minnesota, incoming water near 40F needs an 80 degree rise to
        reach 120F, and that same unit will deliver closer to 4 GPM, which
        is two showers and nothing else. In Florida the same unit
        genuinely delivers 8 or 9. Any tankless comparison that does not
        state the temperature rise is not a comparison.
      </p>

      <ComparisonTable
        caption="Flow demand by fixture. Add the fixtures that realistically run at once, then check the tankless rating at your actual temperature rise, not the headline number."
        columns={[
          { title: "Flow, GPM" },
          { title: "Notes", highlight: true },
        ]}
        rows={[
          { label: "Shower", values: ["1.5 to 2.5", "Low flow heads at the bottom of the range"] },
          { label: "Bathroom faucet", values: ["0.5 to 1.5", "Rarely the constraint"] },
          { label: "Kitchen faucet", values: ["1.0 to 2.2", "Often runs during the evening peak"] },
          { label: "Dishwasher", values: ["1.0 to 2.5", "Many models heat their own water"] },
          { label: "Clothes washer", values: ["1.5 to 3.0", "Only on warm or hot cycles"] },
        ]}
      />

      <h2>Expansion tanks, venting, and the parts that get missed</h2>
      <p>
        A water heater expansion tank installation is required whenever the
        plumbing is a closed system, meaning a pressure reducing valve,
        check valve, or backflow preventer sits between the house and the
        street. Water expands as it heats and, with nowhere to push back
        to, that expansion drives system pressure up until the temperature
        and pressure relief valve weeps. The expansion tank absorbs it. A
        2 gallon tank covers most 40 to 50 gallon heaters and a 4.5 gallon
        covers 80s, and the tank must be precharged to match the static
        water pressure in the house or it does nothing.
      </p>
      <p>
        Venting decides where a gas heater can go. An atmospheric unit
        vents by natural draft up an existing flue and needs one. A power
        vent water heater uses a blower to push exhaust through PVC out a
        sidewall, which is what makes a basement installation possible
        with no chimney; it costs $300 to $600 more and needs a nearby
        electrical outlet. Direct vent draws combustion air from outside
        as well, which suits tight houses. Condensing units are the most
        efficient and produce acidic condensate that needs a drain and
        often neutralization.
      </p>
      <p>
        The maintenance item that actually determines lifespan is the
        anode rod. It is a sacrificial magnesium or aluminum rod that
        corrodes so the steel tank does not, and once it is consumed the
        tank starts rusting from the inside. Checking it every three to
        five years and replacing it when it is mostly gone can double the
        life of a tank for about $30. Most people never look at it, which
        is a large part of why tanks fail at 10 years rather than 20. A
        tank leaking from the bottom has already lost that race, and no
        repair returns it; a leak at the base means replacement.
      </p>

      <p>For <a href="/heat-pump-calculator">whole-house heat pump sizing</a>, use the heat pump calculator. If you are considering switching from gas to electric water heating as part of an electrification project, the <a href="/btu-calculator">BTU calculator</a> helps size the HVAC side of that transition.</p>
    </>
  );
}
