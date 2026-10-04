import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SizingByZoneSVG() {
  const zones = [
    { zone: "Zone 1-2", lo: 18, hi: 22, city: "Houston, Miami" },
    { zone: "Zone 3", lo: 22, hi: 25, city: "Atlanta, Phoenix" },
    { zone: "Zone 4", lo: 25, hi: 30, city: "Richmond, St Louis" },
    { zone: "Zone 5", lo: 28, hi: 35, city: "Chicago, Denver" },
    { zone: "Zone 6-7", lo: 35, hi: 45, city: "Minneapolis, Burlington" },
  ];
  const maxV = 45;
  return (
    <svg viewBox="0 0 680 262" width="100%" height="auto" role="img" aria-label="Heat pump capacity needed per square foot by climate zone: 18 to 22 BTU in zones 1 and 2, rising to 35 to 45 BTU in zones 6 and 7.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Capacity needed per square foot, by climate zone</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The same house needs roughly twice the capacity in Minneapolis that it needs in Houston</text>
      {zones.map((z, i) => {
        const y = 76 + i * 36;
        const x1 = 190 + (z.lo / maxV) * 300;
        const x2 = 190 + (z.hi / maxV) * 300;
        return (
          <g key={z.zone}>
            <text x="182" y={y + 12} textAnchor="end" fontSize="11.5" fontWeight="700" fill={GUIDE_SVG.ink}>{z.zone}</text>
            <line x1="190" y1={y + 8} x2="490" y2={y + 8} stroke={GUIDE_SVG.line} strokeWidth="1" />
            <rect x={x1} y={y} width={Math.max(8, x2 - x1)} height="16" rx="8" fill={i >= 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x="504" y={y + 12} fontSize="10.5" fontWeight="700" fill={i >= 3 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{z.lo} to {z.hi}</text>
            <text x="566" y={y + 12} fontSize="9" fill={GUIDE_SVG.inkFaint}>{z.city}</text>
          </g>
        );
      })}
      <text x="20" y="256" fontSize="9" fill={GUIDE_SVG.inkFaint}>BTU per hour per square foot. Multiply by conditioned area, then divide by 12,000 to get tons.</text>
    </svg>
  );
}

function COPCurveSVG() {
  const pts = [
    { t: "47F", cop: 3.75, x: 90 },
    { t: "35F", cop: 2.75, x: 200 },
    { t: "17F", cop: 2.0, x: 310 },
    { t: "5F", cop: 1.35, x: 420 },
  ];
  const cold = [
    { t: "17F", cop: 2.6, x: 310 },
    { t: "5F", cop: 2.1, x: 420 },
    { t: "-5F", cop: 1.75, x: 530 },
  ];
  const yFor = (cop: number) => 200 - ((cop - 1) / 3) * 110;
  return (
    <svg viewBox="0 0 680 264" width="100%" height="auto" role="img" aria-label="Heat pump COP falls as outdoor temperature drops, from about 3.75 at 47F to 1.35 at 5F for a standard unit. A cold climate model holds above 1.75 down to minus 5F. Electric resistance heat is always COP 1.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Efficiency falls with temperature, but never below resistance heat</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>COP is heat delivered divided by electricity used. COP 3.0 means three units of heat per unit of power.</text>

      <line x1="70" y1="200" x2="600" y2="200" stroke={GUIDE_SVG.inkMuted} strokeWidth="1.5" />
      <line x1="70" y1="72" x2="70" y2="200" stroke={GUIDE_SVG.inkMuted} strokeWidth="1.5" />
      {[1, 2, 3, 4].map((c) => (
        <g key={c}>
          <line x1="70" y1={yFor(c)} x2="600" y2={yFor(c)} stroke={GUIDE_SVG.line} strokeWidth="1" strokeDasharray="3 4" />
          <text x="62" y={yFor(c) + 4} textAnchor="end" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>COP {c}</text>
        </g>
      ))}

      <line x1="70" y1={yFor(1)} x2="600" y2={yFor(1)} stroke={GUIDE_SVG.warm} strokeWidth="2" />
      <text x="606" y={yFor(1) + 4} fontSize="9" fontWeight="700" fill={GUIDE_SVG.warm}>resistance</text>

      <polyline points={pts.map((p) => `${p.x},${yFor(p.cop)}`).join(" ")} fill="none" stroke={GUIDE_SVG.slate} strokeWidth="3" strokeLinecap="round" />
      <polyline points={cold.map((p) => `${p.x},${yFor(p.cop)}`).join(" ")} fill="none" stroke={GUIDE_SVG.accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="7 4" />
      {pts.map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={yFor(p.cop)} r="4.5" fill={GUIDE_SVG.slate} />
          <text x={p.x} y="218" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.ink}>{p.t}</text>
        </g>
      ))}
      <text x="530" y="218" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.ink}>-5F</text>
      {cold.map((p) => <circle key={p.t} cx={p.x} cy={yFor(p.cop)} r="4.5" fill={GUIDE_SVG.accent} />)}

      <rect x="360" y="72" width="14" height="4" fill={GUIDE_SVG.slate} />
      <text x="382" y="78" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>standard heat pump</text>
      <rect x="360" y="90" width="14" height="4" fill={GUIDE_SVG.accent} />
      <text x="382" y="96" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>cold climate model</text>

      <text x="20" y="242" fontSize="9.5" fill={GUIDE_SVG.inkMuted}>Even at its worst, a heat pump delivers more heat per watt than an electric resistance heater, which sits at COP 1 by definition.</text>
      <text x="20" y="258" fontSize="9" fill={GUIDE_SVG.inkFaint}>Outdoor temperature, left to right</text>
    </svg>
  );
}

function CostWithCreditsSVG() {
  return (
    <svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Illustrative heat pump installed cost $12,000-20,000. No new residential 25C credit for 2026 work; subtract only a confirmed eligible rebate.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Heat pump cost after incentives: 2026 planning</text>
      <rect x="40" y="50" width="180" height="70" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.2" />
      <text x="130" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.inkMuted}>INSTALLED</text>
      <text x="130" y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.ink}>$12,000 to 20,000</text>
      <text x="260" y="88" fontSize="16" fontWeight="700" fill={GUIDE_SVG.accent}>→</text>
      <rect x="300" y="50" width="160" height="70" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="380" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>NEW 25C CREDIT</text>
      <text x="380" y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.ink}>$0 for 2026 work</text>
      <text x="500" y="88" fontSize="16" fontWeight="700" fill={GUIDE_SVG.accent}>→</text>
      <rect x="540" y="50" width="120" height="70" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="600" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.accent}>LOCAL REBATE</text>
      <text x="600" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>Verify eligibility</text>
      <text x="340" y="142" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} >Net cost = written installed quote minus confirmed eligible rebates. Do not assume a federal tax credit.</text>
    </svg>
  );
}

export function HeatPumpCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="August 8, 2026" reviewedAgainst="ACCA Manual J, AHRI performance data, IRS 25C/25D, DOE HEEHRA guidance" />

      <h2>A heat pump replaces two machines with one. The math changes everything.</h2>

      <p>A conventional home has two systems: an air conditioner for summer and a furnace for winter. A heat pump does both. In summer it moves heat out of your house (cooling). In winter it reverses and moves heat in (heating). This matters for sizing because you are sizing one machine to handle the larger of two loads, not two separate machines. In most US climates, the heating load is larger than the cooling load, so the heat pump is sized to heating.</p>

      <Figure number={1} caption="Capacity demand roughly doubles from the Gulf Coast to the upper Midwest. A 2,000 square foot home needs about 3 tons in Houston and closer to 5 in Chicago.">
        <SizingByZoneSVG />
      </Figure>

      <MethodologyNote>
        <p>The calculator uses the explicit area, climate and insulation factors in its methodology, not an ACCA Manual J calculation. The climate and COP diagrams are illustrative comparisons, not certified performance for a chosen unit; consult exact AHRI product data. Cost ranges are original illustrative benchmarks, not verified 2026 market averages. Ordinary air-source heat pumps were covered by the separate Section 25C rules, not the geothermal Section 25D category. IRS Form 5695 instructions confirm the relevant new-work credit cutoff after December 31, 2025; state and utility rebates require separate eligibility checks.</p>
      </MethodologyNote>

      <h2>Why heat pumps lose efficiency in cold weather (and why it matters less than you think)</h2>

      <Figure number={2} caption="The line that matters is the flat one at COP 1: electric resistance heat. A heat pump stays above it at every temperature, which is why the efficiency question is about how far above, not whether.">
        <COPCurveSVG />
      </Figure>

      <p>The biggest misconception about heat pumps is that they stop working in cold weather. They don&apos;t. They get less efficient. At 47°F, a standard heat pump produces 3.5 to 4.0 units of heat for every unit of electricity (COP of 3.5-4.0). At 5°F, that drops to 1.2 to 1.5. That is still more efficient than any electric heater (which has a COP of exactly 1.0). Cold climate heat pumps (Mitsubishi Hyper Heat, Daikin Aurora, Bosch) maintain COP 1.5 to 2.0 down to -13°F.</p>

      <Callout label="Dual fuel: the cold-climate compromise">In zones 5 through 7, many homeowners pair a heat pump with a gas furnace. The heat pump handles heating above 30-35°F (roughly 80% of winter hours). The gas furnace kicks in below that threshold when the heat pump&apos;s COP drops below the cost-equivalent of natural gas. This dual-fuel setup captures most of the heat pump&apos;s efficiency advantage without the very-cold-weather penalty. See our <a href="/guides/heat-pump-vs-furnace">heat pump vs furnace buying guide</a> for the full climate-zone-by-zone analysis.</Callout>

      <h2>What a heat pump costs after incentives</h2>

      <Figure number={3} caption="Illustrative installed-cost range before confirmed rebates. New 2026 residential work does not receive the former 25C credit; state and utility program availability and eligibility must be checked separately.">
        <CostWithCreditsSVG />
      </Figure>

      <Scenario location="Richmond, VA (Zone 4)">
        In this hypothetical 2026 scenario, a homeowner replaces a 20-year-old 80% AFUE gas furnace and 10-SEER AC with a 3-ton 16-SEER2 ducted heat pump. Assumed installed cost: $14,500. New residential 25C tax credit: $0. Net cost before any confirmed rebate: $14,500. Assumed previous annual heating + cooling: $2,400; new annual cost: $1,600; annual savings: $800. Simple full-cost payback: $14,500 ÷ $800 = 18.1 years, excluding financing, maintenance and replacement costs. This is not an incremental replacement-cost comparison. Under the prior rules, qualifying air-source heat pumps had a separate $2,000 annual limit, not an uncapped $4,350 credit. Check actual energy bills, written quotes and any eligible state or utility rebate before calculating your own payback.
      </Scenario>

      <h2>Heat pump vs gas furnace: operating cost by climate</h2>

      <ComparisonTable
        caption="Annual heating cost by climate zone. Cold climate heat pumps narrow the gap considerably in zones 5 and 6, and dual fuel setups capture most of the advantage without the penalty."
        columns={[
          { title: "Heat pump" },
          { title: "Gas furnace" },
          { title: "Lower running cost", highlight: true },
        ]}
        rows={[
          { label: "Zones 1 to 3, warm", values: ["$800 to 1,200/yr", "$1,200 to 1,800/yr", "Heat pump"] },
          { label: "Zone 4, moderate", values: ["$1,000 to 1,500/yr", "$1,000 to 1,500/yr", "About even"] },
          { label: "Zone 5, cold", values: ["$1,400 to 2,000/yr", "$1,000 to 1,400/yr", "Gas, unless cold climate model"] },
          { label: "Zones 6 to 7, very cold", values: ["$1,800 to 2,800/yr", "$1,200 to 1,600/yr", "Gas, or dual fuel"] },
        ]}
      />

      <ComparisonTable
        columns={[{title:"Heat pump"},{title:"Gas furnace + AC"}]}
        rows={[
          {label:"Equipment cost",values:["$12,000 to 20,000","$8,000 to 15,000 (combined)"]},
          {label:"Lifespan",values:["15 to 20 yr","Furnace 20 to 25 yr, AC 15 to 20 yr"]},
          {label:"Fuel type",values:["Electricity only","Gas + electricity"]},
          {label:"Carbon footprint",values:["Lower (especially with solar)","Higher (combustion)"]},
          {label:"Tax credits available?",values:["No new residential 25C credit for 2026 work; verify separate rebates","No new residential 25C credit for 2026 work"]},
        ]}
        caption="Illustrative equipment comparisons, not current quotations or guaranteed savings. Compare project-specific installed costs, energy rates and confirmed rebates; no new residential 25C credit is assumed for 2026 work."
      />

      <h2>Tons, BTU, and what SEER2 actually means</h2>
      <p>
        Heat pumps are sold by the ton, and a ton is not a weight. It is
        12,000 BTU per hour of capacity, a holdover from the days when
        cooling was measured against the heat absorbed by melting a ton of
        ice in 24 hours. So a 3 ton unit is 36,000 BTU/h and a 4 ton is
        48,000. Many residential equipment ranges use half-ton nominal
        sizes, but nominal size is not verified heating output at your
        winter design temperature. This calculator returns an illustrative
        load-equivalent scenario, using the listed half-ton examples where
        applicable and showing the uncapped equivalent above that list.
        It does not select equipment: the default 80,000 BTU/h scenario
        displays 6.67 ton-equivalent, not a recommendation to buy that size.
      </p>
      <p>
        Two efficiency ratings sit on every label. SEER2 measures cooling
        efficiency across a season and replaced the older SEER metric in
        2023 with more realistic test conditions, so a SEER2 number is
        roughly 4.5 percent lower than the SEER figure for the same
        equipment. HSPF2 does the same job for heating. Federal minimums
        are 14.3 SEER2 in the south and 13.4 in the north; premium
        equipment runs 18 to 22 SEER2. Higher ratings cost more up front
        and matter most where the system runs many hours a year, which
        means a 20 SEER2 unit pays back quickly in Phoenix and slowly in
        Seattle.
      </p>

      <ComparisonTable
        caption="Original illustrative installed-cost benchmarks by size, not verified 2026 US averages. Ductless mini split pricing is per zone and assumes no existing ductwork. Obtain dated local quotes; listed floor areas are not equipment-selection rules."
        columns={[
          { title: "BTU/h" },
          { title: "Ducted installed cost", highlight: true },
          { title: "Roughly suits" },
        ]}
        rows={[
          { label: "2 ton", values: ["24,000", "$8,000 to 13,000", "1,000 to 1,300 ft² in a mild zone"] },
          { label: "2.5 ton", values: ["30,000", "$9,000 to 14,500", "1,300 to 1,600 ft²"] },
          { label: "3 ton", values: ["36,000", "$10,000 to 16,000", "1,600 to 2,000 ft²"] },
          { label: "4 ton", values: ["48,000", "$12,000 to 19,000", "2,000 to 2,600 ft²"] },
          { label: "5 ton", values: ["60,000", "$14,000 to 22,000", "2,600 to 3,200 ft²"] },
        ]}
      />

      <p>
        Those ranges are for a straightforward replacement into existing
        ductwork. Heat pump installation cost climbs when the job includes
        new or reworked ducts, an electrical panel upgrade to carry the
        new circuit, or removal of an old oil or gas system. A ductless
        mini split runs roughly $3,500 to $6,000 per indoor head installed
        and is the usual answer for additions, garages, and houses with no
        ducts at all.
      </p>
      <p>
        One sizing caution that applies to every number above. Bigger is
        not safer with a heat pump. An oversized unit satisfies the
        thermostat quickly, short cycles, and never runs long enough to
        dehumidify, which produces a house that is cold and clammy and
        equipment that wears out early. This is why ACCA Manual J exists
        and why a contractor who sizes by square footage alone, or who
        simply matches whatever was there before, is guessing. A heat pump
        replacement is the right moment to have the load actually
        calculated.
      </p>

      <p>For <a href="/btu-calculator">BTU sizing</a> of the cooling side, use the BTU calculator. For <a href="/insulation-calculator">insulation upgrades</a> that reduce the load your heat pump needs to handle, better insulation directly translates to a smaller and cheaper heat pump. The <a href="/water-heater-calculator">water heater calculator</a> covers the heat pump water heater, which is a separate appliance sized on a different basis.</p>
    </>
  );
}
