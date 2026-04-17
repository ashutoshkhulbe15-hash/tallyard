import type { GuideConfig } from "@/lib/guides-types";
import {
  VerdictCard,
  ComparisonTable,
  Callout,
  StatGrid,
  CalculatorCTA,
} from "@/components/GuideComponents";

function Content() {
  return (
    <>
      <p>
        HVAC replacement is one of the most expensive decisions a
        homeowner makes, and the pitch you&apos;re getting from your
        contractor probably isn&apos;t neutral. Most contractors default
        to whatever they&apos;ve installed for 20 years — often a gas
        furnace paired with an AC condenser. Meanwhile, heat pump
        technology has advanced dramatically since 2018, federal tax
        credits of up to $2,000 are active through 2032, and in many
        climates a heat pump is now simply the right answer.
      </p>

      <p>
        We&apos;re going to walk through the real cost comparison — both
        installation and 15-year operating cost — across actual climate
        zones. No corporate agenda; just the math.
      </p>

      <VerdictCard verdict="In most of the country, a heat pump now costs less to operate than a gas furnace + AC. In zones 1–5, it&apos;s usually the right choice. In zones 6–7 with cheap natural gas, a dual-fuel setup or furnace + AC can still win.">
        Federal 25C tax credits through 2032 cover up to $2,000 of heat
        pump installation. Some state IRA-funded rebates add $4,000–$8,000
        for income-qualified households. These programs dramatically change
        the math in favor of heat pumps for most buyers.
      </VerdictCard>

      <h2>How heat pumps actually work</h2>

      <p>
        A heat pump isn&apos;t a new invention — it&apos;s an AC unit that
        can run in reverse. The same refrigeration cycle that moves heat
        out of your house in summer can move heat from the outdoor air
        into your house in winter. &quot;But it&apos;s freezing outside,
        how can it extract heat from cold air?&quot; is the usual question.
      </p>

      <p>
        Even 20°F air contains a lot of thermal energy relative to a
        refrigerant evaporating at -10°F. The heat pump uses electricity
        to run a compressor that concentrates that thermal energy and
        delivers it to your indoor air handler. Modern cold-climate heat
        pumps can extract usable heat down to -15°F with inverter-driven
        compressors and enhanced defrost cycles.
      </p>

      <StatGrid
        items={[
          {
            value: "3–4×",
            label: "Heat pump efficiency",
            note: "For every 1 kWh of electricity, delivers 3-4 kWh of heat",
          },
          {
            value: "95–97%",
            label: "Modern gas furnace",
            note: "Burns 1 unit of gas, delivers 0.95 units as heat",
          },
          {
            value: "$2,000",
            label: "Federal 25C tax credit",
            note: "30% of cost, capped at $2,000 through 2032",
          },
        ]}
      />

      <p>
        That 3–4× efficiency figure is the core of why heat pumps are
        winning. A gas furnace converts chemical energy (methane) into
        heat with some losses. A heat pump <em>moves</em> existing heat
        from outside to inside, which takes far less energy than creating
        new heat. In warm and moderate climates, this is an enormous
        advantage. In very cold climates, the advantage shrinks but
        doesn&apos;t disappear.
      </p>

      <h2>The installation cost comparison</h2>

      <p>
        New system installation for a typical 2,000 sq ft single-family
        home. Note that &quot;furnace + AC&quot; is two separate pieces of
        equipment; a heat pump is one piece that handles both functions.
      </p>

      <ComparisonTable
        columns={[
          { title: "Heat pump (ducted)", subtitle: "3-ton SEER2 16" },
          { title: "Furnace + AC", subtitle: "95% AFUE + 14 SEER2" },
          { title: "Dual-fuel", subtitle: "Heat pump + backup furnace" },
        ]}
        rows={[
          {
            label: "Equipment only",
            values: ["$5,000–10,000", "$4,500–9,000", "$7,500–14,000"],
          },
          {
            label: "Installation labor",
            values: ["$2,000–4,000", "$2,000–4,500", "$2,500–5,000"],
          },
          {
            label: "Total installed",
            values: ["$7,000–14,000", "$6,500–13,500", "$10,000–19,000"],
          },
          {
            label: "Federal 25C credit",
            values: [
              "-$2,000",
              "-$600 (furnace only)",
              "-$2,000",
            ],
          },
          {
            label: "Net cost",
            values: [
              <strong key="hp">$5,000–12,000</strong>,
              <strong key="fa">$5,900–12,900</strong>,
              <strong key="df">$8,000–17,000</strong>,
            ],
          },
        ]}
        caption="Pricing for mid-efficiency residential equipment, Jan 2026. Cold-climate heat pumps (Mitsubishi Hyper-Heat, Fujitsu XLTH) cost ~$2,000-5,000 more. IRA HEEHRA rebates of $4,000-8,000 are available for income-qualified households through state programs."
      />

      <p>
        After federal tax credits, the installation cost difference between
        a heat pump and a furnace + AC setup is often within $1,000 —
        sometimes the heat pump is cheaper. The dual-fuel option (heat
        pump for most of the year, gas furnace kicks in below 25°F) costs
        more up front but can make sense in colder climates.
      </p>

      <Callout label="About the IRA rebates">
        The Inflation Reduction Act created $4,500 HEEHRA rebates for
        low-income households and $1,600 for moderate-income households
        — on top of the 25C tax credit. These rolled out state-by-state
        starting in 2024 and are widely available by 2026. Check your
        state&apos;s energy office for current program status and income
        limits.
      </Callout>

      <h2>The 15-year operating cost — where it gets real</h2>

      <p>
        Operating cost is where heat pumps really separate from gas. The
        math depends heavily on climate zone and local energy prices, but
        the general pattern holds: heat pumps save money in moderate and
        warm climates, break even in cold climates, and struggle only in
        very cold climates with cheap natural gas.
      </p>

      <p>
        Here&apos;s estimated annual heating + cooling costs for a 2,000
        sq ft home by climate zone, using average 2025 US energy prices
        ($0.16/kWh electricity, $1.40/therm natural gas):
      </p>

      <ComparisonTable
        columns={[
          { title: "Climate zone", subtitle: "Example cities" },
          { title: "Heat pump", subtitle: "Annual energy cost" },
          { title: "Furnace + AC", subtitle: "Annual energy cost" },
        ]}
        rows={[
          {
            label: "Zone 1–2 (hot)",
            values: [
              "Miami, Houston, Phoenix",
              "$800–1,100",
              "$1,200–1,500 (more AC use)",
            ],
          },
          {
            label: "Zone 3 (warm)",
            values: [
              "Atlanta, Dallas, San Diego",
              "$900–1,200",
              "$1,200–1,500",
            ],
          },
          {
            label: "Zone 4 (mixed)",
            values: [
              "DC, Nashville, San Jose",
              "$1,100–1,400",
              "$1,400–1,700",
            ],
          },
          {
            label: "Zone 5 (cold)",
            values: [
              "Chicago, Denver, NYC",
              "$1,400–1,800",
              "$1,500–1,900",
            ],
          },
          {
            label: "Zone 6 (cold)",
            values: [
              "Minneapolis, Maine, Montana",
              "$1,800–2,400",
              "$1,700–2,300",
            ],
          },
          {
            label: "Zone 7 (very cold)",
            values: [
              "Alaska, Upper MN, N. VT",
              "$2,500–3,500 (needs cold-climate HP)",
              "$2,000–3,000",
            ],
          },
        ]}
        caption="Annual operating cost estimates. Actual numbers vary significantly with home envelope (insulation, windows, air sealing), thermostat setpoints, and local energy prices. In areas with very low natural gas prices, the crossover shifts toward furnace + AC."
      />

      <p>
        The pattern is clear: heat pumps save meaningful money in zones
        1–4 (hot to moderate climates), break roughly even in zone 5
        (cold), and only lose to gas in zones 6–7 (very cold) — and
        even there, cold-climate heat pumps close most of the gap.
      </p>

      <p>
        Over 15 years, a $300/year operating cost savings compounds into
        $4,500 of pure savings. In zones where heat pumps save $400–600
        per year, that&apos;s $6,000–9,000 over the equipment&apos;s
        lifespan — enough to completely offset any installation premium.
      </p>

      <h2>Cold-climate heat pumps: the game-changers</h2>

      <p>
        Through 2018, the &quot;heat pumps don&apos;t work in cold
        climates&quot; critique had some truth. Standard heat pumps lose
        efficiency below 30°F and typically stop providing useful heat
        below 15°F, requiring electric resistance backup (expensive) or
        gas furnace backup (dual-fuel).
      </p>

      <p>
        Modern cold-climate heat pumps — primarily Mitsubishi Hyper-Heat,
        Fujitsu XLTH, and Daikin Aurora — work efficiently down to -5°F
        to -15°F with inverter-driven variable-speed compressors. They
        achieve 1.5–2.0 COP (coefficient of performance) at 5°F, meaning
        they still deliver 1.5–2× their energy input as heat even in
        genuinely cold weather.
      </p>

      <Callout label="The spec to look for">
        Compare heat pumps on their HSPF2 rating (Heating Seasonal
        Performance Factor, 2023 test standard). 7.7 is the federal
        minimum. 9.0+ is good. 10.0+ is premium. Cold-climate models with
        HSPF2 of 10+ handle zone 5-6 winters without breaking a sweat.
      </Callout>

      <CalculatorCTA
        name="Heat pump calculator"
        slug="heat-pump-calculator"
        description="Size a heat pump for your home. Accounts for climate zone, insulation quality, and both heating and cooling loads."
      />

      <h2>When a furnace + AC still wins</h2>

      <p>
        Heat pumps aren&apos;t automatically the right answer. Four
        specific situations where a traditional gas furnace + AC still
        makes sense:
      </p>

      <ul>
        <li>
          <strong>Very cold climate + cheap natural gas.</strong> In zones
          6–7 with natural gas under $1.20/therm (Minnesota, North Dakota,
          parts of Wisconsin), a 95% AFUE furnace beats even a
          cold-climate heat pump on operating cost during the heating
          season.
        </li>
        <li>
          <strong>Electric service constraints.</strong> A 3-ton heat pump
          needs a 30-amp 240V circuit. In older homes with 100-amp panels
          already near capacity, upgrading to 200-amp service costs
          $2,000–$4,000 before you can even consider a heat pump.
        </li>
        <li>
          <strong>Existing ductwork designed for furnace.</strong> Heat
          pump airflow runs 20–30% higher than furnace airflow for the
          same heating output. Undersized ductwork causes rooms to feel
          underheated. Addressing duct issues can add $1,500–$5,000 to a
          heat pump install.
        </li>
        <li>
          <strong>You&apos;re replacing equipment at end of life right
          now.</strong> If your AC just died and your furnace is 15 years
          old, the cost of waiting to coordinate a full heat pump replacement
          vs. just replacing what failed is real. Emergency replacements
          rarely pencil out for heat pumps.
        </li>
      </ul>

      <h2>The dual-fuel option</h2>

      <p>
        If you&apos;re in zone 5–6 and on the fence, dual-fuel systems
        (also called &quot;hybrid&quot; systems) are the practical
        compromise. A heat pump handles most of the year (when it&apos;s
        efficient), and a smaller gas furnace kicks in when temperatures
        drop below a crossover point (typically 25–35°F).
      </p>

      <p>
        The dual-fuel approach:
      </p>

      <ul>
        <li>Costs about 30% more than either heat pump alone or furnace + AC alone ($10,000–19,000 installed).</li>
        <li>Qualifies for the federal 25C tax credit.</li>
        <li>Optimizes operating cost automatically based on current temperatures.</li>
        <li>Gives the resilience of gas backup during extended cold snaps or power outages.</li>
        <li>Handles zones 5–6 winters without any cold-performance anxiety.</li>
      </ul>

      <p>
        For many homeowners in cold climates, dual-fuel is the right
        answer: you get heat pump efficiency for 80% of the year and
        furnace reliability for the coldest 20%. The downside is
        complexity — two systems means two things that can fail.
      </p>

      <h2>Installation considerations you should know</h2>

      <p>
        Beyond the equipment choice, four practical issues affect the
        decision:
      </p>

      <ul>
        <li>
          <strong>Outdoor unit placement.</strong> Heat pumps need the
          outdoor unit clear of snow accumulation. In snow country, mount
          on a stand 12–18 inches above grade, and keep it away from
          places where roof snow dumps onto it. Single-story homes with
          roof-heavy snow shed are particularly tricky.
        </li>
        <li>
          <strong>Ductwork assessment.</strong> Have the contractor do a
          proper duct inspection before committing. Heat pumps move more
          air at lower temperatures than furnaces, so undersized ducts
          cause comfort complaints. Some homes need trunk extensions or
          larger returns, adding $1,000–3,000.
        </li>
        <li>
          <strong>Electric panel capacity.</strong> A 3-ton heat pump pulls
          up to 30 amps at 240V. If your panel is 100 amps and already
          near 80% load, you&apos;ll need a service upgrade ($2,000–4,000)
          or load management equipment ($500–1,500).
        </li>
        <li>
          <strong>Indoor unit location.</strong> Heat pumps work best with
          a matched indoor air handler in a conditioned space (basement
          or mechanical room), not in a hot attic. Attic placement is the
          single worst thing for heat pump efficiency — it can cut system
          capacity 20–30%.
        </li>
      </ul>

      <h2>Bottom line</h2>

      <p>
        For most of the country in 2026, a heat pump is the right answer
        to &quot;what should I replace my HVAC with?&quot;. Specific
        recommendations:
      </p>

      <ul>
        <li>
          <strong>Zones 1–4 (most of the US):</strong> Heat pump. Standard
          efficiency is fine. Federal tax credits make the cost
          essentially even with furnace + AC, and you&apos;ll save
          $300–500 per year on operating costs.
        </li>
        <li>
          <strong>Zone 5 (northern tier):</strong> Heat pump with cold-climate
          rating (HSPF2 ≥ 9.0). Consider dual-fuel if you have existing
          gas service and want the resilience.
        </li>
        <li>
          <strong>Zones 6–7 (far north):</strong> Dual-fuel or cold-climate
          heat pump (Mitsubishi Hyper-Heat class). In regions with cheap
          natural gas, traditional furnace + AC still has legitimate
          arguments.
        </li>
      </ul>

      <p>
        Before committing to any HVAC replacement, run a proper load
        calculation (ACCA Manual J) — don&apos;t let a contractor size
        equipment by square footage alone. Oversized heat pumps short
        cycle, create comfort problems, and cost more to run. Our{" "}
        <a href="/heat-pump-calculator">heat pump calculator</a>{" "}
        provides a starting estimate; for a permit-ready install, insist
        on Manual J from your installer.
      </p>
    </>
  );
}

export const heatPumpVsFurnaceGuide: GuideConfig = {
  slug: "heat-pump-vs-furnace",
  title: "Heat pump vs furnace + AC: which wins in your climate?",
  description:
    "Honest comparison of heat pumps vs traditional furnace + AC. Installation costs, 15-year operating costs by climate zone, and federal tax credits.",
  bannerHeadline: "Heat pump vs furnace + AC.",
  bannerTags: ["Climate zone math", "IRA tax credits", "15-year TCO"],
  categoryLabel: "HVAC",
  category: "hvac",
  heroValue: "BY CLIMATE ZONE",
  publishedAt: "2026-04-18",
  readTime: "14 min read",
  Content,
  faq: [
    {
      question: "Do heat pumps really work in cold climates?",
      answer:
        "Modern cold-climate heat pumps (Mitsubishi Hyper-Heat, Fujitsu XLTH, Daikin Aurora) work efficiently down to -5°F and provide some heat output to -15°F. Standard heat pumps lose efficiency below 30°F. For zones 5-6, specify an HSPF2 rating of 9.0 or higher. For zone 7 (far north), pair with backup heat (resistance or gas) for extreme cold.",
    },
    {
      question: "What&apos;s the difference between SEER2 and HSPF2?",
      answer:
        "SEER2 (Seasonal Energy Efficiency Ratio, 2023 test standard) measures cooling efficiency. HSPF2 (Heating Seasonal Performance Factor) measures heating efficiency. Modern heat pumps report both. Federal tax credit requires 15+ SEER2 and 8.5+ HSPF2 for ducted systems. Higher is better; premium cold-climate models reach 22 SEER2 and 11+ HSPF2.",
    },
    {
      question: "Can I use a heat pump with my existing ductwork?",
      answer:
        "Usually yes, but have the contractor assess airflow. Heat pumps need 20-30% more airflow than furnaces for equivalent heating. Undersized ducts cause cold rooms in winter. In some homes this requires trunk extensions, larger returns, or additional supply runs — budget $1,500-3,000 for potential duct modifications.",
    },
    {
      question: "How much is the federal heat pump tax credit?",
      answer:
        "The 25C Residential Energy Efficient Home Improvement Tax Credit covers 30% of heat pump installation costs, capped at $2,000 per year through 2032. Equipment must meet efficiency thresholds (SEER2 ≥ 15, HSPF2 ≥ 8.5). In addition, the IRA HEEHRA rebate program offers $4,500-8,000 for income-qualified households through state programs.",
    },
    {
      question: "What about a heat pump water heater?",
      answer:
        "Separate product, separate decision. Heat pump water heaters (HPWH) are 3-4× more efficient than electric resistance water heaters and pay back in 3-5 years in most climates. Budget $2,500-4,500 installed. See our water heater calculator for sizing.",
    },
    {
      question: "Can I keep my gas furnace as backup with a heat pump?",
      answer:
        "Yes — that&apos;s the dual-fuel or hybrid configuration. A heat pump handles most of the year; the gas furnace kicks in below a crossover point (usually 25-35°F). Costs ~30% more than either system alone but qualifies for the tax credit and optimizes operating cost automatically. Good choice for zones 5-6 with existing gas service.",
    },
    {
      question: "How long do heat pumps last compared to furnaces?",
      answer:
        "Typical heat pumps: 12-15 years. Gas furnaces: 15-20 years. Air conditioners: 10-15 years. Properly maintained equipment reaches the high end; neglected equipment fails at the low end. Heat pumps run year-round (both heating and cooling), so they see more hours than a furnace that only runs in winter — which partially explains the slightly shorter lifespan.",
    },
    {
      question: "Are mini-split heat pumps a good option?",
      answer:
        "Yes, especially for homes without ductwork, additions, or specific rooms that need independent control. Mini-splits (ductless heat pumps) are 25-30% more efficient than central systems and offer zoned control. Installation cost $3,000-7,000 per zone. For whole-house replacement of ducted system, centralized ducted heat pump usually wins on total cost. For additions or problem rooms, mini-splits are often the right answer.",
    },
  ],
  sources: [
    {
      name: "Department of Energy — Heat Pump Guidance",
      url: "https://www.energy.gov/energysaver/heat-pump-systems",
      note: "Official DOE reference for heat pump performance and tax credit eligibility",
    },
    {
      name: "Energy Star — Heat Pump Qualifying Products",
      url: "https://www.energystar.gov/products/heat_pumps",
      note: "Current efficiency standards and qualifying model list",
    },
    {
      name: "ACCA Manual J — Residential Load Calculation",
      url: "https://www.acca.org/standards",
      note: "Industry standard for HVAC sizing calculations",
    },
    {
      name: "IRS Form 5695 — Residential Energy Credits",
      url: "https://www.irs.gov/forms-pubs/about-form-5695",
      note: "Official form for claiming 25C tax credit",
    },
    {
      name: "HEEHRA State Program Directory",
      url: "https://www.energy.gov/scep/home-energy-rebate-programs",
      note: "IRA-funded home electrification rebate programs by state",
    },
  ],
  relatedCalculators: [
    {
      name: "Heat pump calculator",
      slug: "heat-pump-calculator",
      description: "Size in tons by climate zone and insulation quality",
    },
    {
      name: "BTU calculator",
      slug: "btu-calculator",
      description: "Cooling load for any room or home",
    },
    {
      name: "Insulation calculator",
      slug: "insulation-calculator",
      description: "R-value by climate zone — critical for heat pump sizing",
    },
    {
      name: "Water heater calculator",
      slug: "water-heater-calculator",
      description: "Consider a heat pump water heater too",
    },
  ],
};
