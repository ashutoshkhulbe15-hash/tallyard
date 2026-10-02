import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function HeatLossSVG() {
  const areas = [
    { label: "Walls", pct: 35, w: 350 },
    { label: "Attic / ceiling", pct: 25, w: 250 },
    { label: "Windows + doors", pct: 20, w: 200 },
    { label: "Floors + foundation", pct: 10, w: 100 },
    { label: "Air leaks (gaps, cracks)", pct: 10, w: 100 },
  ];
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Where homes lose heat: 35% walls, 25% attic, 20% windows, 10% floors, 10% air leaks.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Where your home loses heat</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Walls lose the most, but attics are the cheapest and easiest to fix</text>
      {areas.map((a,i)=>{const y=65+i*30;return(
        <g key={a.label}>
          <text x="210" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{a.label}</text>
          <rect x="220" y={y} width={a.w} height="20" rx="3" fill={i===1?GUIDE_SVG.accent:GUIDE_SVG.slate} opacity="0.6" />
          <text x={228+a.w} y={y+14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{a.pct}%</text>
        </g>
      )})}
    </svg>
  );
}

function RValueByZoneSVG() {
  const zones = [
    { zone: "1–2", attic: "R-30–38", walls: "R-13", floor: "R-13" },
    { zone: "3", attic: "R-38", walls: "R-13–20", floor: "R-19" },
    { zone: "4", attic: "R-38–49", walls: "R-13–21", floor: "R-19–25" },
    { zone: "5", attic: "R-49", walls: "R-20", floor: "R-25–30" },
    { zone: "6–7", attic: "R-49–60", walls: "R-20–21", floor: "R-25–30" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="IRC R-values by climate zone: attics R-30 to R-60, walls R-13 to R-21.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>IRC 2021 minimum R-values by climate zone</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Code minimums. Most existing homes built before 2000 are well below these.</text>
      <rect x="50" y={headerY-18} width="580" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Zone",x:110},{l:"Attic",x:250},{l:"Walls",x:400},{l:"Floor",x:530}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {zones.map((z,i)=>{const y=headerY+10+i*rowH;return(
        <g key={z.zone}>{i%2===0&&<rect x="50" y={y-4} width="580" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="110" y={y+14} textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>Zone {z.zone}</text>
          <text x="250" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{z.attic}</text>
          <text x="400" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{z.walls}</text>
          <text x="530" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{z.floor}</text>
        </g>
      )})}
    </svg>
  );
}

function MaterialComparisonSVG() {
  const materials = [
    { label: "Fiberglass batts", rPerInch: "3.2", cost: "$0.50–1.00", diy: "Easy", best: "Walls, floors" },
    { label: "Blown cellulose", rPerInch: "3.5", cost: "$0.60–1.20", diy: "Easy (rental)", best: "Attics" },
    { label: "Mineral wool", rPerInch: "3.3", cost: "$1.00–1.80", diy: "Easy", best: "Walls, fire areas" },
    { label: "Open-cell spray", rPerInch: "3.7", cost: "$1.00–1.50", diy: "Pro only", best: "Walls, crawlspaces" },
    { label: "Closed-cell spray", rPerInch: "6.5", cost: "$1.50–3.50", diy: "Pro only", best: "Rim joists, below grade" },
    { label: "Rigid foam (XPS)", rPerInch: "5.0", cost: "$0.50–1.50", diy: "Moderate", best: "Exterior continuous" },
  ];
  const headerY=70; const rowH=26;
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Insulation materials: R-value per inch, cost, DIY feasibility, and best use.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Insulation materials compared</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>R-value per inch determines how thick insulation needs to be for a given target</text>
      <rect x="20" y={headerY-18} width="640" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Material",x:105},{l:"R/inch",x:240},{l:"Cost/ft²",x:340},{l:"DIY",x:440},{l:"Best for",x:560}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="9" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {materials.map((m,i)=>{const y=headerY+10+i*rowH;return(
        <g key={m.label}>{i%2===0&&<rect x="20" y={y-4} width="640" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="105" y={y+12} textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
          <text x="240" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.accent} fontWeight="600">{m.rPerInch}</text>
          <text x="340" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{m.cost}</text>
          <text x="440" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{m.diy}</text>
          <text x="560" y={y+12} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{m.best}</text>
        </g>
      )})}
    </svg>
  );
}

function AtticCostSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="DIY attic insulation: $400-600. Professional: $1,000-2,000. Payback: 2-4 years.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Attic insulation cost (1,000 ft² attic, R-38 target)</text>
      <rect x="40" y="55" width="260" height="80" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="170" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>DIY BLOWN CELLULOSE</text>
      <text x="170" y="102" textAnchor="middle" fontSize="20" fontWeight="700" fill={GUIDE_SVG.ink}>$400–600</text>
      <text x="170" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>Blower free with 20+ bag purchase</text>
      <rect x="380" y="55" width="260" height="80" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="510" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>PROFESSIONAL</text>
      <text x="510" y="102" textAnchor="middle" fontSize="20" fontWeight="700" fill={GUIDE_SVG.ink}>$1,000–2,000</text>
      <text x="510" y="120" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>Includes air sealing</text>
      <text x="340" y="155" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.accent} fontWeight="600">Typical payback: 2–4 years in energy savings ($150–300/yr reduction)</text>
    </svg>
  );
}

function AirSealingSVG() {
  const targets = [
    { label: "Top plates of interior walls", impact: "High", y: 55 },
    { label: "Recessed light housings (IC-rated)", impact: "High", y: 85 },
    { label: "Plumbing and wiring penetrations", impact: "Medium", y: 115 },
    { label: "Attic hatch or pull-down stairs", impact: "High", y: 145 },
    { label: "Duct boots and HVAC connections", impact: "Medium", y: 175 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Air sealing targets before insulating: top plates, light housings, plumbing penetrations, attic hatch, duct boots.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Seal these before you insulate</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Insulation without air sealing is a sweater without a windbreaker</text>
      {targets.map((t) => (
        <g key={t.label}>
          <circle cx="35" cy={t.y + 8} r="8" fill={t.impact === "High" ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} />
          <text x="35" y={t.y + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill={t.impact === "High" ? GUIDE_SVG.accent : GUIDE_SVG.slate}>!</text>
          <text x="55" y={t.y + 6} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="55" y={t.y + 22} fontSize="10" fill={GUIDE_SVG.inkFaint}>Impact: {t.impact}</text>
        </g>
      ))}
    </svg>
  );
}

export function InsulationCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="IECC 2021 Table R402.1.2, DOE insulation fact sheets, and Owens Corning/CertainTeed specs"
      />

      <h2>The $500 upgrade that pays for itself twice a year</h2>

      <p>
        A building scientist in Wisconsin runs a company that audits existing homes for energy performance. He told me that in 90 percent of the houses he inspects, including ones built in the 2000s, the attic insulation is below current code minimums. Not by a little. The average existing home in climate zone 5 has R-19 in the attic. Code minimum is R-49. That gap means 30 percent more heat escaping through the ceiling than necessary, every winter, for the life of the house.
      </p>

      <p>
        Fixing it costs $400 to $600 in blown cellulose and a Saturday afternoon. Home Depot and Lowe&apos;s lend the blowing machine for free when you buy 20 or more bags of insulation. No walls to open. No contractor to schedule. No permits in most jurisdictions. It is the highest-return home improvement available to any homeowner, and almost nobody does it because it happens in the attic where nobody looks.
      </p>

      <Figure number={1} caption="DIY blown cellulose is the cheapest way to hit R-38 in an existing attic. Professional installation adds air sealing, which matters more than most people realize.">
        <AtticCostSVG />
      </Figure>

      <Scenario location="Chicago, IL (Zone 5)">
        A couple bought a 1985 colonial with R-11 fiberglass batts in the attic, well below the R-49 code minimum. Their winter gas bills averaged $285 per month. They rented a cellulose blower from Home Depot (free with material purchase), spent $520 on 24 bags, and blew R-38 over the existing batts in one Saturday. Combined R-value went from R-11 to R-49. Their first full winter after the upgrade: $195 per month average. Annual savings: about $1,080. The $520 investment paid back in six months.
      </Scenario>

      <MethodologyNote>
        <p>
          R-value requirements follow IECC 2021 Table R402.1.2 (the table most local codes reference, sometimes with amendments). Material R-values per inch from Owens Corning, CertainTeed, and Rockwool product data sheets. Cost ranges reflect 2026 pricing from Home Depot, Lowe&apos;s, and insulation contractor associations. Energy savings estimates from DOE residential insulation fact sheets and Oak Ridge National Laboratory building envelope research.
        </p>
      </MethodologyNote>

      <h2>Where your heat actually goes</h2>

      <p>
        Walls lose the most heat in absolute terms because they have the most surface area. But attics are the cheapest to insulate because they are open, accessible, and you can blow loose-fill material across the entire floor without opening anything. The cost per R-value gained is lower in the attic than anywhere else in the house. That is why every energy auditor and weatherization program starts there.
      </p>

      <Figure number={2} caption="Walls account for 35% of heat loss but are expensive to insulate in existing homes (requires opening walls or blowing from outside). The attic is 25% of loss and costs a fraction to fix.">
        <HeatLossSVG />
      </Figure>

      <h2>What R-value your climate zone requires</h2>

      <Figure number={3} caption="IECC 2021 code minimums. Zone 1-2 is the Gulf Coast. Zone 5 is the northern tier. Zone 6-7 is Minnesota, Montana, Maine.">
        <RValueByZoneSVG />
      </Figure>

      <Callout label="Finding your climate zone">
        The IECC maps climate zones by ZIP code. Zones 1 and 2 cover the Gulf Coast and southern tip of the US. Zone 3 is the South and Southwest. Zone 4 is the Mid-Atlantic and lower Midwest. Zone 5 covers most of the northern tier. Zones 6 and 7 are the coldest regions. Your zone determines the R-value target; the calculator above uses it automatically.
      </Callout>

      <p>
        Most existing homes built before 2000 have significantly less insulation than these code minimums. Homes built in the 1960s through 1980s commonly have R-11 to R-19 in the attic. Homes from the 1990s through early 2000s are better but still typically R-30 to R-38, which is below the current R-49 requirement for zones 4 and above. If your home is more than 20 years old, it almost certainly needs more attic insulation.
      </p>

      <h2>Materials: which one for which job</h2>

      <Figure number={4} caption="Closed-cell spray foam achieves R-6.5 per inch, half the thickness of fiberglass for the same R-value. But it costs 3-5 times more and requires professional installation.">
        <MaterialComparisonSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"Fiberglass batts"},{title:"Blown cellulose"},{title:"Spray foam"}]}
        rows={[
          {label:"Best application",values:["Open walls during remodel","Attic floors, enclosed walls","Rim joists, crawlspaces, cathedral ceilings"]},
          {label:"Air sealing ability",values:["None. Needs separate caulk/foam","Moderate. Fills gaps partially","Excellent. Seals and insulates in one step"]},
          {label:"Moisture behavior",values:["Does not absorb or block","Absorbs and releases safely","Closed: vapor barrier. Open: breathable"]},
          {label:"DIY feasibility",values:["Yes. Cut and friction-fit","Yes. Rent blower ($0 with material)","No. Professional equipment required"]},
          {label:"Cost for R-38 attic (1,000 ft²)",values:["$500–800","$400–600","$2,500–4,000"]},
        ]}
        caption="Start with blown cellulose in the attic (cheapest, DIY-friendly). Add spray foam only at rim joists (small area, huge air-sealing payoff). Fiberglass batts for open wall cavities during remodels."
      />

      <p>
        Most homeowners should start with blown cellulose in the attic. It is the highest-ROI insulation upgrade because the material is cheap, the blower is free with purchase, and you can do it in a day without opening any walls. After the attic, the next highest-ROI target is rim joists in the basement. Rim joists are the short vertical boards where the floor framing meets the foundation wall. They are typically uninsulated and leak enormous amounts of air. Two cans of spray foam ($15 each) and a Saturday morning can cut your basement heat loss by 20 percent. Better insulation directly reduces the <a href="/btu-calculator">BTU load</a> your HVAC system handles. Upgrading from R-19 to R-49 in the attic can drop your required <a href="/heat-pump-calculator">heat pump</a> tonnage by half a ton.
      </p>

      <h2>Air sealing: the step that matters more than the insulation itself</h2>

      <Figure number={5} caption="These five areas account for most attic air leakage. Seal them with caulk and canned spray foam BEFORE blowing insulation on top.">
        <AirSealingSVG />
      </Figure>

      <p>
        This is the part most DIYers skip and most articles do not emphasize enough. Insulation slows heat transfer through solid materials (conduction). Air sealing stops warm air from physically flowing through gaps into the attic (convection). In a typical home, convective losses through air leaks account for 25 to 40 percent of total heat loss. You can pile R-60 of cellulose on the attic floor and still lose a quarter of your heating energy through the plumbing chase, the recessed light cans, and the gap around the attic hatch.
      </p>

      <p>
        Before blowing any insulation, spend 2 to 3 hours with a caulk gun and a few cans of expanding spray foam. Seal around every plumbing penetration, every electrical wire chase, every recessed light housing (use fire-rated covers if the lights are not IC-rated), and the top plates of all interior walls. The top plates are the biggest single source of attic air leakage because they run the full length of every wall and are rarely sealed during construction. Then weatherstrip the attic hatch or pull-down stair opening. Then blow insulation on top. This sequence, air seal first and insulate second, delivers 30 to 50 percent better energy savings than insulation alone.
      </p>
    </>
  );
}
