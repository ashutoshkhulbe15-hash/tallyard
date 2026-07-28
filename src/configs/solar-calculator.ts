import { SolarCalculatorExpansion } from "@/content/solar-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const solarCalculatorConfig: CalculatorConfig = {
  slug: "solar-calculator",
  title: "Solar Panel Calculator",
  description:
    "Solar system size for your electricity usage. Accounts for sun hours by region, panel wattage, and system losses so you size right the first time.",
  categoryLabel: "Solar",
  category: "solar",

  bannerHeadline: "Size sunny.",
  bannerTags: ["kWh-based sizing", "Sun hours by region", "400W panels"],

  inputs: [
    {
      id: "monthlyKwh",
      label: "Monthly electricity use",
      type: "number",
      unitImperial: "kWh",
      defaultImperial: 900,
      min: 100,
      step: 50,
      help: "US average: ~900 kWh/month. Check your utility bill for your actual number.",
    },
    {
      id: "sunHours",
      label: "Peak sun hours (daily average)",
      type: "select",
      defaultImperial: 4.5,
      options: [
        { label: "3.5 · Pacific NW, UK, N. Europe", value: 3.5 },
        { label: "4.0 · Midwest, NE, Central Europe", value: 4.0 },
        { label: "4.5 · Mid-Atlantic, S. Europe", value: 4.5 },
        { label: "5.0 · California, Texas", value: 5.0 },
        { label: "5.5 · Arizona, Australia, India", value: 5.5 },
        { label: "6.0 · Desert SW, equatorial", value: 6.0 },
      ],
      help: "How many hours of full-strength sun you get each day on average",
    },
    {
      id: "panelWatts",
      label: "Panel wattage",
      type: "select",
      defaultImperial: 400,
      options: [
        { label: "300W (older residential)", value: 300 },
        { label: "350W (common)", value: 350 },
        { label: "400W (modern residential)", value: 400 },
        { label: "450W (premium)", value: 450 },
      ],
    },
    {
      id: "efficiency",
      label: "System efficiency",
      type: "select",
      defaultImperial: 80,
      options: [
        { label: "75% (older system)", value: 75 },
        { label: "80% (typical)", value: 80 },
        { label: "85% (high-efficiency)", value: 85 },
      ],
      help: "Accounts for wiring, inverter, shading, and temperature losses",
    },
  ],

  calculate: (values) => {
    const monthlyKwh = Number(values.monthlyKwh) || 900;
    const sunHours = Number(values.sunHours) || 4.5;
    const panelWatts = Number(values.panelWatts) || 400;
    const efficiency = Number(values.efficiency) || 80;

    // Daily kWh
    const dailyKwh = monthlyKwh / 30;

    // System size needed (kW DC) = daily kWh / (sun hours × efficiency)
    const systemSizeKw = dailyKwh / (sunHours * (efficiency / 100));

    // Number of panels
    const panelsNeeded = Math.ceil((systemSizeKw * 1000) / panelWatts);

    // Actual system size based on whole-panel rounding
    const actualSystemKw = (panelsNeeded * panelWatts) / 1000;

    // Roof area needed (assuming ~18 sq ft per 400W panel for modern residential)
    const sqFtPerPanel = panelWatts >= 400 ? 20 : panelWatts >= 350 ? 18 : 17;
    const roofAreaNeeded = panelsNeeded * sqFtPerPanel;

    return {
      value: panelsNeeded,
      unit: panelsNeeded === 1 ? "panel" : "panels",
      valueRounded: panelsNeeded,
      breakdown: [
        { label: "system size", value: `${formatNumber(round(actualSystemKw, 2))} kW DC` },
        { label: "daily production", value: `${formatNumber(round(actualSystemKw * sunHours * (efficiency / 100), 1))} kWh` },
        { label: "roof area", value: `~${formatNumber(roofAreaNeeded)} sq ft` },
      ],
      formulaSteps: [
        `daily use = ${monthlyKwh} ÷ 30 = ${formatNumber(round(dailyKwh, 1))} kWh/day`,
        `system size = ${formatNumber(round(dailyKwh, 1))} ÷ (${sunHours} × ${efficiency / 100}) = ${formatNumber(round(systemSizeKw, 2))} kW`,
        `panels = ⌈${formatNumber(round(systemSizeKw, 2))} × 1000 ÷ ${panelWatts}⌉ = ${panelsNeeded} panels`,
        `actual system = ${panelsNeeded} × ${panelWatts}W = ${formatNumber(round(actualSystemKw, 2))} kW DC`,
        `roof area ≈ ${panelsNeeded} × ${sqFtPerPanel} sq ft = ${formatNumber(roofAreaNeeded)} sq ft`,
      ],
      composition: {
        unit: "W",
        total: panelsNeeded * panelWatts,
        segments: [
          {
            label: "Production",
            amount: Math.round(systemSizeKw * 1000),
            shade: "primary",
          },
          {
            label: "Buffer",
            amount: Math.max(0, panelsNeeded * panelWatts - Math.round(systemSizeKw * 1000)),
            shade: "secondary",
          },
        ],
      },
    };
  },

  ContentExpansion: SolarCalculatorExpansion,

  formulaDescription:
    "panels = ⌈(daily kWh ÷ (sun hours × efficiency) × 1000) ÷ panel watts⌉",

  methodology: [
    "The calculator starts with your monthly electricity consumption (from your utility bill) and divides by 30 to get daily kWh. System size in kilowatts is daily kWh divided by peak sun hours, divided by system efficiency.",
    "Peak sun hours is the daily equivalent of full-strength (1 kW/m²) sunshine your location receives. Arizona and the desert Southwest get 6+ hours; the UK and Pacific Northwest get 3-4; most of North America and Europe falls in the 4-5 range. Use NREL's PVWatts tool for your exact ZIP code if you want precision.",
    "System efficiency accounts for real-world losses that the pure math doesn't capture: inverter conversion losses (~4%), wiring resistance (~2%), temperature derate on hot days (~8%), soiling from dust and pollen (~3%), and shading (variable). 80% is a reasonable default for a clean, well-installed system in typical conditions.",
    "Panel count rounds up to whole panels. Because panels come in discrete wattages, your actual installed system will be slightly larger than the calculated need. That's normal, and it and provides a small production buffer for cloudy weeks. The calculator shows both the computed need and the actual installed size.",
    "Rough rule for roof area: about 17-20 sq ft per panel depending on panel size. A 10-panel system needs roughly 170-200 sq ft of unobstructed, south-facing roof. Complex roof shapes and shading from trees can reduce usable area significantly.",
  ],

  sources: [
    {
      name: "NREL PVWatts Calculator",
      url: "https://pvwatts.nrel.gov/",
      note: "Official US DOE tool for location-specific sun hours, loss assumptions, and production",
    },
    {
      name: "DOE Homeowner's Guide to Going Solar",
      url: "https://www.energy.gov/eere/solar/homeowners-guide-going-solar",
      note: "US Department of Energy guidance on sizing, siting, and contracts",
    },
    {
      name: "EIA - Electricity Use in Homes",
      url: "https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php",
      note: "Source of the ~900 kWh/month US average consumption figure",
    },
    {
      name: "NFPA 70 (NEC) Article 690",
      url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70",
      note: "Electrical code governing solar PV systems and interconnection",
    },
    {
      name: "SEIA State Solar Data",
      url: "https://seia.org/states-map",
      note: "State-level installed cost and market data behind the cost table",
    },
  ],

  related: [
    { name: "BTU calculator", slug: "btu-calculator", description: "AC size adjusted for climate and sun" },
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "AWG for solar panel circuits" },
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Check the roof before panels go up" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value for reducing electrical load" },
  ],

  howTo: {
    name: "How to calculate how many solar panels you need",
    description: "Size a residential solar system from your utility bill in five steps, using peak sun hours and real-world system losses.",
    steps: [
      { name: "Find your monthly kWh", text: "Pull a recent utility bill and find your electricity use in kWh. Use an annual average if usage swings between seasons; the US average is about 900 kWh per month." },
      { name: "Convert to daily use", text: "Divide monthly kWh by 30. A 900 kWh month is 30 kWh per day, which is what the system must produce on an average day." },
      { name: "Look up peak sun hours", text: "Find your region's daily peak sun hours: about 3.0-3.5 in the Pacific Northwest, 4.0-4.5 across the middle of the country, 5.5-6.5 in the desert Southwest. NREL PVWatts gives an exact figure by ZIP code." },
      { name: "Size the system with losses", text: "Divide daily kWh by peak sun hours, then divide by 0.85 to cover inverter, wiring, soiling, and temperature losses. The result is system size in kW." },
      { name: "Divide by panel wattage and round up", text: "Multiply system kW by 1,000 and divide by panel wattage (400 W is standard). Round up to whole panels and allow roughly 20 square feet of unshaded roof per panel." },
    ],
  },

  faq: [
    {
      question: "How many solar panels do I need for a 2,000 sq ft house?",
      answer:
        "Not directly related to square footage. It depends on your electricity usage. A typical 2,000 sq ft home uses about 900-1,200 kWh/month and needs 15-20 panels (400W each) in a sunny region, or 20-25 panels in a cloudy region. Pull your utility bill for actual kWh; the calculator above uses that number.",
    },
    {
      question: "What are peak sun hours?",
      answer:
        "Peak sun hours measure how much equivalent full-strength sun your location gets per day. The sun is 'peak' at about 1 kilowatt per square meter, roughly midday on a clear day. Weaker morning/evening sun is added up and converted to the equivalent number of peak hours. 5 peak sun hours doesn't mean 5 hours of sun. It means 5 hours of full-strength equivalent.",
    },
    {
      question: "Should I size for 100% of my usage?",
      answer:
        "For most homes, yes: size the system to match annual usage. In net metering states, excess summer production offsets winter deficit. In states without net metering, slightly undersizing (80-90% of usage) can make more financial sense because you avoid producing excess you can't use or sell.",
    },
    {
      question: "Will the system produce exactly what the calculator shows?",
      answer:
        "It's an estimate, and real production varies seasonally. Summer production is 30-50% above average; winter is 30-50% below. Over a full year, the actual number should be within 10% of the calculated estimate, assuming no shading issues or atypical weather.",
    },
    {
      question: "Can I install solar myself?",
      answer:
        "Technically possible in most jurisdictions but rarely recommended. DIY installation voids most panel warranties, requires passing a utility-approved inspection for grid connection, and usually disqualifies you from state rebates (which require licensed installers). The cost savings are typically 20-30%, not enough to justify the warranty and safety tradeoffs for most homeowners.",
    },
    {
      question: "How long until solar pays for itself?",
      answer:
        "Payback depends on electricity rates and installation cost. For cash purchases in the 2026 US market, 9-13 years is typical now that the federal residential credit has ended. High electricity rates (California, Northeast) and state rebates shorten it; cheap power lengthens it. Rising utility rates shorten it every year after install.",
    },
    {
      question: "How much do solar panels cost in 2026?",
      answer:
        "Typical quoted cash prices for purchased rooftop systems run $2.50-3.00 per watt installed, so an 8 kW system lands around $20,000-24,000. Sunbelt states like Texas and Florida often quote $2.20-2.70 per watt; California and the Northeast run higher. Always get three quotes; same-city spreads of $0.50 per watt are common.",
    },
    {
      question: "Is the federal solar tax credit still available?",
      answer:
        "No, not for purchased residential systems. The 30% residential clean energy credit ended for expenditures after December 31, 2025. Third-party-owned systems (leases and PPAs) may still benefit from a separate commercial credit passed through by the installer, and many state and utility incentives remain. Check your state energy office for current programs.",
    },
    {
      question: "Do I need a battery?",
      answer:
        "Not for grid-tied net metering: you export excess and pull from the grid at night. Batteries add cost for backup during outages or to avoid time-of-use peak rates. Most residential solar without batteries is about $2.50-3.50/watt installed; adding batteries pushes that to $4-5.50/watt.",
    },
    {
      question: "What roof works best for solar?",
      answer:
        "South-facing with 15-40 degree pitch is ideal in the Northern Hemisphere. East and west-facing roofs produce about 15% less. North-facing is rarely worth it. Flat roofs work with tilted racks. Most importantly: no significant shading between 10 AM and 2 PM when panels produce 70%+ of their daily total.",
    },
  ],
};
