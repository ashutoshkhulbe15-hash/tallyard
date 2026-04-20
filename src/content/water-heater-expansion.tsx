import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function TankSizingSVG() {
  const sizes = [
    { people: "1–2", gallons: "30–40 gal", tankless: "5–7 GPM" },
    { people: "2–3", gallons: "40–50 gal", tankless: "7–8 GPM" },
    { people: "3–4", gallons: "50–65 gal", tankless: "8–10 GPM" },
    { people: "5+", gallons: "65–80 gal", tankless: "10+ GPM" },
  ];
  const headerY = 70; const rowH = 30;
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Water heater sizing: 1-2 people need 30-40 gallons, 5+ need 65-80.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Right size by household</text>
      <rect x="60" y={headerY-18} width="560" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"People",x:160},{l:"Tank size",x:340},{l:"Tankless flow",x:510}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {sizes.map((s,i)=>{const y=headerY+10+i*rowH;return(
        <g key={s.people}>{i%2===0&&<rect x="60" y={y-4} width="560" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="160" y={y+14} textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{s.people}</text>
          <text x="340" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{s.gallons}</text>
          <text x="510" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{s.tankless}</text>
        </g>
      )})}
    </svg>
  );
}

function FuelComparisonSVG() {
  return (
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Annual operating cost: electric tank $500-600, gas tank $250-350, tankless gas $150-250, heat pump $150-250.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Annual operating cost by fuel type (50-gal equivalent)</text>
      {[
        {label:"Electric resistance tank",cost:"$500–600/yr",w:240,color:GUIDE_SVG.slate},
        {label:"Gas tank",cost:"$250–350/yr",w:140,color:GUIDE_SVG.inkFaint},
        {label:"Tankless gas",cost:"$150–250/yr",w:100,color:GUIDE_SVG.inkMuted},
        {label:"Heat pump water heater",cost:"$150–250/yr",w:100,color:GUIDE_SVG.accent},
      ].map((f,i)=>{const y=55+i*28;return(
        <g key={f.label}>
          <text x="220" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{f.label}</text>
          <rect x="230" y={y} width={f.w} height="18" rx="3" fill={f.color} opacity="0.6" />
          <text x={238+f.w} y={y+13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{f.cost}</text>
        </g>
      )})}
    </svg>
  );
}

function CostComparisonSVG() {
  return (
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Installed cost: electric tank $800-1,500; gas tank $1,000-2,000; tankless $2,500-5,000; heat pump $2,000-4,000.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed cost by type</text>
      {[
        {label:"Electric tank",cost:"$800–1,500",x:50,color:GUIDE_SVG.slate},
        {label:"Gas tank",cost:"$1,000–2,000",x:210,color:GUIDE_SVG.inkFaint},
        {label:"Tankless gas",cost:"$2,500–5,000",x:370,color:GUIDE_SVG.inkMuted},
        {label:"Heat pump WH",cost:"$2,000–4,000",x:530,color:GUIDE_SVG.accent},
      ].map(t=>(
        <g key={t.label}>
          <rect x={t.x} y="55" width="140" height="80" rx="8" fill={t.label.includes("Heat")?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={t.color} strokeWidth="1" />
          <text x={t.x+70} y="78" textAnchor="middle" fontSize="10" fontWeight="700" fill={t.color}>{t.label.toUpperCase()}</text>
          <text x={t.x+70} y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>{t.cost}</text>
        </g>
      ))}
      <text x="340" y="160" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Heat pump water heaters qualify for $2,000 federal tax credit (25C) and many state/utility rebates.</text>
    </svg>
  );
}

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
            <rect x="205" y={y} width={w} height="18" rx="3" fill={i === 4 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={213 + w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{a.gallons} gal</text>
          </g>
        );
      })}
    </svg>
  );
}

export function WaterHeaterCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="DOE EnergyGuide standards, AHRI ratings, and plumber bid data" />

      <h2>Tank size is not about how much water you store. It is about how fast you use it.</h2>

      <p>The number on a water heater (40 gallon, 50 gallon) is the storage capacity. But storage capacity alone does not tell you whether the heater can keep up with your household. What matters is the first-hour rating: how many gallons of hot water the unit delivers in its peak usage hour. A 40-gallon tank with a powerful burner might have a higher first-hour rating than a 50-gallon tank with a weak one. The calculator above sizes based on your household demand pattern, not just headcount.</p>

      <Figure number={1} caption="A family of 4 typically needs a 50-65 gallon tank or an 8-10 GPM tankless unit. Undersizing means cold showers when the dishwasher and laundry run simultaneously.">
        <TankSizingSVG />
      </Figure>

      <MethodologyNote>
        <p>Sizing follows DOE first-hour rating methodology: sum of peak-hour hot water draws at the fixture level. GPM ratings for tankless units based on temperature rise requirements (groundwater temp to 120°F setpoint) by region. Cost data from plumber association surveys and manufacturer MSRP (2025-2026). Operating costs use EIA average residential utility rates.</p>
      </MethodologyNote>

      <h2>Understanding peak demand</h2>

      <Figure number={2} caption="Morning rush hour in a family of four: two showers, a dishwasher start, and hand washing can drain 40+ gallons in 45 minutes.">
        <FirstHourSVG />
      </Figure>

      <p>Add up the hot water draws in your busiest hour. Two showers back to back (32 gallons) plus a dishwasher (6 gallons) equals 38 gallons in one hour. Your water heater&apos;s first-hour rating needs to exceed this number. If it does not, the second shower goes cold before the rinse cycle finishes. Tankless units solve this differently: they heat water on demand at a fixed flow rate (GPM). As long as total simultaneous flow stays under the unit&apos;s GPM capacity, you never run out.</p>

      <Callout label="Groundwater temperature matters for tankless">A tankless unit in Minnesota heats incoming water from 40°F to 120°F (80° rise). The same unit in Florida heats from 72°F to 120°F (48° rise). The Florida unit delivers 40% more GPM at the same BTU input because it has less work to do. Tankless GPM ratings are always at a specific temperature rise. Check the spec for your region&apos;s groundwater temperature.</Callout>

      <h2>What each type costs to buy and run</h2>

      <Figure number={3} caption="Electric tanks are cheapest to buy. Heat pump water heaters cost more but use 60-70% less electricity. Gas tankless costs the most to install but the least to operate.">
        <CostComparisonSVG />
      </Figure>

      <Figure number={4} caption="Operating cost over 10 years: an electric resistance tank costs $5,000-6,000. A heat pump water heater costs $1,500-2,500. The savings pay for the upgrade.">
        <FuelComparisonSVG />
      </Figure>

      <Scenario location="Phoenix, AZ">
        A homeowner replaced a 12-year-old 50-gallon electric tank ($480/yr operating) with a 50-gallon heat pump water heater (Rheem ProTerra, $200/yr operating). Installed cost: $3,200. Federal 25C tax credit: -$2,000. Net cost: $1,200. Annual savings: $280. Payback after credit: 4.3 years. The heat pump unit also dehumidifies the garage where it is installed, reducing the AC load in summer.
      </Scenario>

      <ComparisonTable
        columns={[{title:"Tank"},{title:"Tankless"},{title:"Heat pump WH"}]}
        rows={[
          {label:"Hot water supply",values:["Limited by tank size","Unlimited (at flow rate)","Limited by tank size"]},
          {label:"Lifespan",values:["8–12 yr","15–20 yr","12–15 yr"]},
          {label:"Space needed",values:["Floor space for tank","Wall-mounted (small)","Floor space + clearance for airflow"]},
          {label:"Installation complexity",values:["Simple replacement","May need gas line/vent upgrade","Needs 240V circuit + condensate drain"]},
          {label:"Best for",values:["Budget, simple replacement","Endless hot water, gas homes","Max efficiency, tax credit, electric homes"]},
        ]}
        caption="For electric homes, heat pump water heaters are the best long-term value. For gas homes with high demand, tankless gas is the premium option."
      />

      <p>For <a href="/heat-pump-calculator">whole-house heat pump sizing</a>, use the heat pump calculator. If you are considering switching from gas to electric water heating as part of an electrification project, the <a href="/btu-calculator">BTU calculator</a> helps size the HVAC side of that transition.</p>
    </>
  );
}
