import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SizingByZoneSVG() {
  const zones = [
    { zone: "1–2", factor: "18–22", tons2k: "3.0–3.7", color: GUIDE_SVG.slate },
    { zone: "3", factor: "22–25", tons2k: "3.7–4.2", color: GUIDE_SVG.inkFaint },
    { zone: "4", factor: "25–30", tons2k: "4.2–5.0", color: GUIDE_SVG.inkMuted },
    { zone: "5", factor: "28–35", tons2k: "4.7–5.8", color: GUIDE_SVG.accent },
    { zone: "6–7", factor: "35–45", tons2k: "5.8–7.5", color: GUIDE_SVG.accent },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Heat pump sizing by climate zone: warmer zones need fewer BTU per square foot.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Heat pump sizing by climate zone</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>BTU/ft² factor increases with colder climate. A 2,000 ft² home in zone 5 needs 4.7–5.8 tons.</text>
      <rect x="50" y={headerY-18} width="580" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Zone",x:120},{l:"BTU/ft²",x:270},{l:"Tons (2,000 ft² home)",x:460}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {zones.map((z,i)=>{const y=headerY+10+i*rowH;return(
        <g key={z.zone}>{i%2===0&&<rect x="50" y={y-4} width="580" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="120" y={y+14} textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>Zone {z.zone}</text>
          <text x="270" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{z.factor}</text>
          <text x="460" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{z.tons2k}</text>
        </g>
      )})}
    </svg>
  );
}

function COPCurveSVG() {
  const temps = [
    { temp: "47°F", cop: "3.5–4.0", eff: "350–400%", color: GUIDE_SVG.accent },
    { temp: "35°F", cop: "2.5–3.0", eff: "250–300%", color: GUIDE_SVG.inkMuted },
    { temp: "17°F", cop: "1.8–2.2", eff: "180–220%", color: GUIDE_SVG.slate },
    { temp: "5°F", cop: "1.2–1.5", eff: "120–150%", color: GUIDE_SVG.inkFaint },
    { temp: "-5°F (cold climate HP)", cop: "1.5–2.0", eff: "150–200%", color: GUIDE_SVG.accent },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Heat pump COP drops as temperature falls. At 47°F COP is 3.5-4.0. At 5°F it drops to 1.2-1.5.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How cold affects heat pump efficiency (COP)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>COP = heat output ÷ electrical input. COP 3.0 means 300% efficient (3x the heat per watt vs resistance heat).</text>
      <rect x="40" y={headerY-18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Outdoor temp",x:140},{l:"COP",x:310},{l:"Efficiency vs resistance",x:500}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {temps.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.temp}>{i%2===0&&<rect x="40" y={y-4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="140" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.temp}</text>
          <text x="310" y={y+14} textAnchor="middle" fontSize="11" fill={t.color} fontWeight="600">{t.cop}</text>
          <text x="500" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.eff}</text>
        </g>
      )})}
    </svg>
  );
}

function CostWithCreditsSVG() {
  return (
    <svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Heat pump installed cost $12,000-20,000. After 30% ITC and HEEHRA rebate: $5,000-12,000 net.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Heat pump cost after incentives</text>
      <rect x="40" y="50" width="180" height="70" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="130" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.slate}>INSTALLED</text>
      <text x="130" y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.ink}>$12,000–20,000</text>
      <text x="260" y="88" fontSize="16" fontWeight="700" fill={GUIDE_SVG.accent}>→</text>
      <rect x="300" y="50" width="160" height="70" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="380" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>AFTER 30% ITC</text>
      <text x="380" y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.ink}>$8,400–14,000</text>
      <text x="500" y="88" fontSize="16" fontWeight="700" fill={GUIDE_SVG.accent}>→</text>
      <rect x="540" y="50" width="120" height="70" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="600" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.accent}>+ HEEHRA</text>
      <text x="600" y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.accent}>$5,000–12,000</text>
      <text x="340" y="142" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">HEEHRA rebates ($2,000–8,000) depend on income level. Can stack with ITC for qualifying households.</text>
    </svg>
  );
}

function HPvsGasSVG() {
  const zones = [
    { zone: "1–3 (warm)", hp: "$800–1,200/yr", gas: "$1,200–1,800/yr", winner: "HP" },
    { zone: "4 (moderate)", hp: "$1,000–1,500/yr", gas: "$1,000–1,500/yr", winner: "Tie" },
    { zone: "5 (cold)", hp: "$1,400–2,000/yr", gas: "$1,000–1,400/yr", winner: "Gas*" },
    { zone: "6–7 (very cold)", hp: "$1,800–2,800/yr", gas: "$1,200–1,600/yr", winner: "Gas*" },
  ];
  const headerY = 70; const rowH = 30;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Annual heating cost: heat pump wins in zones 1-3, gas wins in zones 5-7, tie in zone 4.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Annual heating cost: heat pump vs gas furnace</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>*Cold climate heat pumps narrow the gap significantly in zones 5–6</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Climate zone",x:120},{l:"Heat pump",x:300},{l:"Gas furnace",x:450},{l:"Winner",x:580}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {zones.map((z,i)=>{const y=headerY+10+i*rowH;return(
        <g key={z.zone}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="120" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{z.zone}</text>
          <text x="300" y={y+14} textAnchor="middle" fontSize="11" fill={z.winner==="HP"?GUIDE_SVG.accent:GUIDE_SVG.inkMuted}>{z.hp}</text>
          <text x="450" y={y+14} textAnchor="middle" fontSize="11" fill={z.winner.startsWith("Gas")?GUIDE_SVG.accent:GUIDE_SVG.inkMuted}>{z.gas}</text>
          <text x="580" y={y+14} textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>{z.winner}</text>
        </g>
      )})}
    </svg>
  );
}

export function HeatPumpCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="ACCA Manual J, AHRI performance data, IRS 25C/25D, DOE HEEHRA guidance" />

      <h2>A heat pump replaces two machines with one. The math changes everything.</h2>

      <p>A conventional home has two systems: an air conditioner for summer and a furnace for winter. A heat pump does both. In summer it moves heat out of your house (cooling). In winter it reverses and moves heat in (heating). This matters for sizing because you are sizing one machine to handle the larger of two loads, not two separate machines. In most US climates, the heating load is larger than the cooling load, so the heat pump is sized to heating.</p>

      <Figure number={1} caption="Warmer zones need less capacity per square foot. A 2,000 ft² home in zone 2 (Houston) needs 3.0-3.7 tons. The same home in zone 5 (Chicago) needs 4.7-5.8 tons.">
        <SizingByZoneSVG />
      </Figure>

      <MethodologyNote>
        <p>Sizing follows ACCA Manual J load calculation methodology with climate zone adjustments. COP (coefficient of performance) data from AHRI certified product ratings for ducted split-system heat pumps. Cost data from EnergySage and contractor association surveys (2025-2026). Federal tax credit details per IRS Section 25D (ITC) and DOE HEEHRA program guidelines.</p>
      </MethodologyNote>

      <h2>Why heat pumps lose efficiency in cold weather (and why it matters less than you think)</h2>

      <Figure number={2} caption="COP drops as outdoor temperature falls. But even at 17°F, a heat pump produces 180-220% as much heat per watt as electric resistance. It is always more efficient than a space heater.">
        <COPCurveSVG />
      </Figure>

      <p>The biggest misconception about heat pumps is that they stop working in cold weather. They don&apos;t. They get less efficient. At 47°F, a standard heat pump produces 3.5 to 4.0 units of heat for every unit of electricity (COP of 3.5-4.0). At 5°F, that drops to 1.2 to 1.5. That is still more efficient than any electric heater (which has a COP of exactly 1.0). Cold climate heat pumps (Mitsubishi Hyper Heat, Daikin Aurora, Bosch) maintain COP 1.5 to 2.0 down to -13°F.</p>

      <Callout label="Dual fuel: the cold-climate compromise">In zones 5 through 7, many homeowners pair a heat pump with a gas furnace. The heat pump handles heating above 30-35°F (roughly 80% of winter hours). The gas furnace kicks in below that threshold when the heat pump&apos;s COP drops below the cost-equivalent of natural gas. This dual-fuel setup captures most of the heat pump&apos;s efficiency advantage without the very-cold-weather penalty. See our <a href="/guides/heat-pump-vs-furnace">heat pump vs furnace buying guide</a> for the full climate-zone-by-zone analysis.</Callout>

      <h2>What a heat pump costs after incentives</h2>

      <Figure number={3} caption="Federal ITC (30%) plus HEEHRA rebates ($2,000-8,000 for qualifying households) can cut the net cost by 40-65%.">
        <CostWithCreditsSVG />
      </Figure>

      <Scenario location="Richmond, VA (Zone 4)">
        A homeowner replaced a 20-year-old 80% AFUE gas furnace and 10-SEER AC with a 3-ton 16-SEER2 ducted heat pump. Installed cost: $14,500. Federal ITC (30%): -$4,350. Net cost: $10,150. Previous annual heating + cooling: $2,400. New annual cost: $1,600. Annual savings: $800. Simple payback after tax credit: 12.7 years. With HEEHRA rebate (income-dependent): payback drops to 7-9 years.
      </Scenario>

      <h2>Heat pump vs gas furnace: operating cost by climate</h2>

      <Figure number={4} caption="Heat pumps win on operating cost in zones 1-3 where heating loads are light. Gas furnaces win in zones 5-7 with standard heat pumps, but cold-climate models narrow the gap.">
        <HPvsGasSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"Heat pump"},{title:"Gas furnace + AC"}]}
        rows={[
          {label:"Equipment cost",values:["$12,000–20,000","$8,000–15,000 (combined)"]},
          {label:"Lifespan",values:["15–20 yr","Furnace 20–25 yr, AC 15–20 yr"]},
          {label:"Fuel type",values:["Electricity only","Gas + electricity"]},
          {label:"Carbon footprint",values:["Lower (especially with solar)","Higher (combustion)"]},
          {label:"Tax credits available?",values:["Yes: 30% ITC + HEEHRA","Limited (high-efficiency furnace only)"]},
        ]}
        caption="Heat pumps cost more up front but qualify for larger incentives. In zones 1-4, the operating cost advantage makes the total cost of ownership lower over 15 years."
      />

      <p>For <a href="/btu-calculator">BTU sizing</a> of the cooling side, use the BTU calculator. For <a href="/insulation-calculator">insulation upgrades</a> that reduce the load your heat pump needs to handle, better insulation directly translates to a smaller (cheaper) heat pump.</p>
    </>
  );
}
