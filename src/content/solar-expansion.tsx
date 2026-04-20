import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SystemSizingSVG() {
  const homes = [
    { label: "Small (600 kWh/mo)", kw: "4 kW", panels: "10–12", cost: "$10,000–14,000" },
    { label: "Average (900 kWh/mo)", kw: "6 kW", panels: "15–18", cost: "$15,000–21,000" },
    { label: "Large (1,200 kWh/mo)", kw: "8 kW", panels: "20–24", cost: "$20,000–28,000" },
    { label: "Very large (1,800 kWh/mo)", kw: "12 kW", panels: "30–36", cost: "$30,000–42,000" },
  ];
  const headerY = 70; const rowH = 30;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Solar system sizing: average home needs 6 kW, 15-18 panels, $15,000-21,000 before credits.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>System size by electricity usage (before tax credits)</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Usage",x:130},{l:"System size",x:290},{l:"Panels",x:410},{l:"Cost (before ITC)",x:550}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {homes.map((h,i)=>{const y=headerY+10+i*rowH;return(
        <g key={h.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="130" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{h.label}</text>
          <text x="290" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{h.kw}</text>
          <text x="410" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{h.panels}</text>
          <text x="550" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{h.cost}</text>
        </g>
      )})}
    </svg>
  );
}

function SunHoursSVG() {
  const regions = [
    { label: "Southwest (AZ, NV, NM)", hours: "6.0–7.0", w: 280 },
    { label: "South (TX, FL, CA)", hours: "5.0–6.0", w: 240 },
    { label: "Mid-Atlantic (NC, VA, MD)", hours: "4.5–5.0", w: 200 },
    { label: "Midwest (OH, IL, MN)", hours: "4.0–4.5", w: 180 },
    { label: "Pacific NW / Northeast", hours: "3.5–4.0", w: 160 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Peak sun hours by region: Southwest gets 6-7, Northeast gets 3.5-4.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Peak sun hours by region</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>More sun hours = fewer panels needed for the same energy output</text>
      {regions.map((r, i) => {
        const y = 65 + i * 28;
        return (
          <g key={r.label}>
            <text x="230" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
            <rect x="240" y={y} width={r.w} height="18" rx="3" fill={i <= 1 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={248 + r.w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.hours} hrs</text>
          </g>
        );
      })}
    </svg>
  );
}

function TaxCreditSVG() {
  return (
    <svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Federal ITC: 30% tax credit through 2032. A $20,000 system becomes $14,000 after credit.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Federal Investment Tax Credit (ITC)</text>
      <rect x="60" y="50" width="220" height="60" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="170" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.ink}>$20,000</text>
      <text x="170" y="94" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>System cost</text>
      <text x="320" y="84" fontSize="22" fontWeight="700" fill={GUIDE_SVG.accent}>−30%</text>
      <rect x="400" y="50" width="220" height="60" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="510" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill={GUIDE_SVG.accent}>$14,000</text>
      <text x="510" y="94" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>Net cost after ITC</text>
      <text x="340" y="135" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">30% ITC applies to all solar installations through 2032. Steps down to 26% in 2033, 22% in 2034.</text>
    </svg>
  );
}

function PaybackSVG() {
  const scenarios = [
    { label: "Southwest, $0.14/kWh", years: "6–8 yr", w: 140 },
    { label: "California, $0.30/kWh", years: "4–6 yr", w: 100 },
    { label: "Mid-Atlantic, $0.16/kWh", years: "8–10 yr", w: 180 },
    { label: "Northeast, $0.25/kWh", years: "6–9 yr", w: 150 },
    { label: "Midwest, $0.12/kWh", years: "10–14 yr", w: 240 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Solar payback period: 4-6 years in California, 10-14 in the Midwest.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Payback period by region and electricity rate</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Higher electricity rates mean faster payback. After payback, solar energy is essentially free.</text>
      {scenarios.map((s, i) => {
        const y = 65 + i * 28;
        return (
          <g key={s.label}>
            <text x="240" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
            <rect x="250" y={y} width={s.w} height="18" rx="3" fill={i <= 1 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={258 + s.w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{s.years}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function SolarCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="NREL PVWatts, EnergySage market data, and IRS Section 25D (ITC)" />

      <h2>Solar math starts with your electricity bill, not your roof</h2>

      <p>The question is not how many panels fit on your roof. It is how many kilowatt-hours you use per month and how many peak sun hours your location receives per day. Those two numbers determine your system size. Everything else follows from that: panel count, inverter capacity, cost, and payback period. A family using 900 kWh per month in North Carolina needs a different system than the same family using 900 kWh in Arizona, because Arizona gets 40 percent more sunlight.</p>

      <Figure number={1} caption="Start from your monthly kWh usage (on your electricity bill). System size in kW determines how many panels you need.">
        <SystemSizingSVG />
      </Figure>

      <MethodologyNote>
        <p>System sizing uses NREL PVWatts methodology: annual kWh ÷ 365 ÷ peak sun hours ÷ panel wattage × 1.2 (system losses). Peak sun hours from NREL solar resource data by region. Pricing from EnergySage 2025–2026 market reports ($2.50–3.50/watt installed before ITC). Tax credit information from IRS Section 25D and the Inflation Reduction Act (IRA) provisions.</p>
      </MethodologyNote>

      <h2>Peak sun hours determine panel count</h2>

      <Figure number={2} caption="Phoenix gets nearly double the usable sunlight of Seattle. Same house, same electricity usage, but Phoenix needs 40% fewer panels.">
        <SunHoursSVG />
      </Figure>

      <p>Peak sun hours are not the same as daylight hours. A peak sun hour is one hour of sunlight at 1,000 watts per square meter intensity. A cloudy day in Seattle might have 14 hours of daylight but only 3 peak sun hours of usable solar energy. Phoenix has fewer daylight hours in winter but 6 to 7 peak sun hours because the sunlight is more intense and cloud cover is rare.</p>

      <h2>The 30% federal tax credit changes the math</h2>

      <Figure number={3} caption="The ITC reduces your net cost by 30%. A $20,000 installation becomes $14,000. This credit applies through 2032.">
        <TaxCreditSVG />
      </Figure>

      <Callout label="This is a tax credit, not a deduction">The ITC reduces your federal tax liability dollar for dollar, not your taxable income. A $6,000 credit means you pay $6,000 less in federal taxes. If your tax liability in the installation year is less than the credit amount, the unused portion rolls forward to the next tax year. You need enough tax liability to use the credit. Consult a tax professional for your specific situation.</Callout>

      <h2>When does solar pay for itself?</h2>

      <Figure number={4} caption="Payback depends on electricity rate and sun exposure. High-rate states (CA, NY, CT) pay back in 4-6 years. Low-rate states (ID, WA, UT) take 10-14.">
        <PaybackSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"Buy (cash/loan)"},{title:"Lease / PPA"}]}
        rows={[
          {label:"Upfront cost",values:["$14,000–30,000 (after ITC)","$0"]},
          {label:"Monthly savings",values:["80–100% of electric bill","10–30% of electric bill"]},
          {label:"Own the system?",values:["Yes","No (company owns it)"]},
          {label:"Tax credit",values:["You claim 30% ITC","Company claims it"]},
          {label:"Home value impact",values:["+$15,000–25,000 (Zillow)","Minimal (lien on home)"]},
          {label:"Best for",values:["Homeowners staying 7+ years","Renters, low tax liability"]},
        ]}
        caption="Buying (with or without a solar loan) captures the full financial benefit. Leasing costs nothing up front but gives most of the savings to the leasing company."
      />

      <p>After the payback period, solar electricity is essentially free for the remaining 15 to 20 years of panel warranty life. A system that pays back in 7 years and lasts 25 years generates 18 years of free electricity. At $150 per month in electricity savings, that is $32,400 in total savings after payback. Use the <a href="/wire-size-calculator">wire size calculator</a> if you are running dedicated circuits from solar inverter to panel. For battery backup sizing, that will be a future Tallyard calculator.</p>
    </>
  );
}
