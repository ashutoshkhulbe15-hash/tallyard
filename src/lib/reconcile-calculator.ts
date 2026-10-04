import type { CalculatorConfig, CalculatorResult, UnitSystem } from "./types";
import { convertCalculatorValues, validateCalculatorValues, validateCalculatorResult } from "./calculator-values";
import { round } from "./format";

// Restored inputs are evaluated in one canonical physical unit system. This
// avoids the old per-tool metric approximations and preset reinterpretation.
const primaryConversions: Record<string, [number, string]> = {
  "cubic yards": [0.764554857984, "cubic meters"],
  "gallons": [3.785411784, "liters"],
  "fl oz": [29.5735295625, "mL"],
  "oz": [28.349523125, "g"],
  "lb": [0.45359237, "kg"],
  "lb total weight on roof": [0.45359237, "kg total estimated weight on roof"],
  "tons": [0.90718474, "tonnes"],
  "lineal ft": [0.3048, "lineal m"],
  "linear ft": [0.3048, "linear m"],
  "ft": [0.3048, "m"],
  "ft wide": [0.3048, "m wide"],
  "ft²": [0.09290304, "m²"],
  "ft² footprint": [0.09290304, "m² footprint"],
  "ft² glass": [0.09290304, "m² glass"],
  "sq in NFVA": [6.4516, "cm² NFVA"],
  "sq ft net clear": [0.09290304, "m² net clear"],
  "in per riser": [2.54, "cm per riser"],
  "inches": [2.54, "cm"],
  "in² flue area": [6.4516, "cm² flue area"],
  "gallon tank": [3.785411784, "liter tank"],
  "GPM needed": [3.785411784, "L/min needed"],
};
const financial = /cost-calculator$|countertop|kitchen-cabinet|lumber/;
const ruleTools = /stair|egress|window-sizing|snow-load|garage-door|chimney|stud-spacing|wire-size|extension-cord|drain-pipe|attic-ventilation|heat-pump|water-heater/;
const creditFix = "For new 2026 residential work, do not assume federal 25C/25D credits: the relevant eligibility ended after December 31, 2025. Verify current IRS rules and separate state/utility programs.";

export function reconcileCalculator(config: CalculatorConfig, checked?: CalculatorConfig): void {
  if (checked) {
    config.inputs = checked.inputs;
    config.calculate = checked.calculate;
    config.formulaDescription = checked.formulaDescription;
  }
  // HowTo is not emitted by the reconciled release; article/website markup remains.
  delete config.howTo;
  if(config.slug === "pool-chlorine-calculator") {
    config.inputs = config.inputs.map(input => input.id === "targetPpm" ? {
      id:"targetPpm",label:"Target from applicable guidance/product instructions",type:"number",unitImperial:"ppm",defaultImperial:"",min:0.1,max:10,step:0.1,
      help:"The calculator does not prescribe treatment or a safe-to-swim target.",
    } : input);
    config.inputs.push(
      {id:"availableChlorinePct",label:"Label available chlorine by weight",type:"number",unitImperial:"%",defaultImperial:"",min:0.1,max:100,step:0.1,help:"Use available chlorine by weight, not an assumed product-type strength."},
      {id:"density",label:"Liquid product density, if converting mass to volume",type:"number",unitImperial:"g/mL",defaultImperial:0,min:0,step:0.01,help:"Use exact product data. Leave zero to report mass only."},
    );
    config.calculate = values => {
      const liters=Number(values.volume)*3.785411784;
      const gap=Math.max(0,Number(values.targetPpm)-Number(values.currentPpm));
      const grams=liters*gap/1000/(Number(values.availableChlorinePct)/100);
      const density=Number(values.density);const liquid=values.chlorineType === "liquid";
      const volume=liquid&&density>0;
      const amount=volume?grams/density/29.5735295625:grams;
      return {value:amount,valueRounded:round(amount,2),unit:volume?"fl oz":"g",
        breakdown:[{label:"ppm gap",value:`${gap} ppm`},{label:"product type",value:String(values.chlorineType)},{label:"theoretical product mass",value:`${round(grams,2)} g`},{label:"liquid volume",value:volume?`${round(amount,2)} fl oz from entered density`:"not inferred without exact density"}],
        formulaSteps:[`water = ${liters} L; chlorine mass = liters × ppm gap ÷ 1000`,`product mass = chlorine mass ÷ (${values.availableChlorinePct}% / 100)`,"Exact product label controls use, handling, and application. This is mass-balance arithmetic, not treatment or swimming-safety advice."]};
    };
    config.formulaDescription="product mass = water volume (L) × entered ppm gap ÷ 1000 ÷ label available-chlorine fraction; liquid volume only from exact entered density";
    config.methodology[1]="Use the exact product label's available-chlorine percentage by weight. Generic product categories do not establish label strength or density. The tool estimates mass by mass balance and converts liquid mass to volume only when exact density is entered.";
    config.methodology[2]="The tool does not prescribe a target or shock-treatment schedule, or determine safe swimming conditions. Follow applicable public-health guidance and the exact product label; pH, stabilizer and test limits affect interpretation.";
    config.methodology[4]="Follow the exact product's application instructions. Do not mix chemicals. Pre-dissolve only if the product label explicitly directs it; follow its order of addition and required precautions.";
    config.description="Estimate chlorine product mass from pool volume, measured free chlorine, an entered target and exact label strength. Optional liquid volume uses entered product density; not a treatment recommendation.";
  }
  for (const input of config.inputs) {
    if (input.type === "number" && input.unitImperial && input.unitMetric && input.unitImperial !== input.unitMetric) {
      input.defaultMetric = convertCalculatorValues([input], { [input.id]: input.defaultImperial }, "imperial", "metric")[input.id];
    }
  }
  config.planningNotice = "Planning estimate from the entered assumptions—not a professional design, approval, supplier order or current quotation. Verify exact product requirements and local project conditions.";
  if(financial.test(config.slug)) config.planningNotice += " Built-in prices are illustrative original benchmarks, not verified current market rates; compare dated written local quotes.";
  config.faq = config.faq.map(item => {
    let answer = item.answer;
    if (/through 2032|tax credit.*(?:\bavailable\b|\bqualif)|30%.*(?:ITC|credit)/i.test(answer)) {
      answer = answer.split(/(?<=[.!?])\s+/).filter(sentence => !/2032|tax credit|30%.*(?:ITC|credit)/i.test(sentence)).join(" ") + " " + creditFix;
    }
    if (/meets IRC|code.compliant|safe to|safe load|safety verdict/i.test(answer)) answer += " This calculator checks only the stated assumptions or reference dimensions, not complete project compliance or safety.";
    return { ...item, answer };
  });
  if(config.slug === "heat-pump-calculator") {
    config.description = "Explore an illustrative heat-pump load estimate from home area, climate and insulation assumptions. This rule-of-thumb scenario is not Manual J or an equipment selection.";
    config.methodology[0] = "This illustrative calculator compares heating and cooling scenarios using the explicit square-foot factors below. These are rule-of-thumb assumptions, not an ACCA Manual J calculation or a recommendation to buy a particular system. Obtain a qualified project-specific load calculation and equipment performance selection.";
    config.faq[0].answer = "The result depends on the entered scenario factors. The default 2,000 ft² Zone 5 case yields 80,000 BTU/h (6.67 ton-equivalent) under these illustrative assumptions, outside the listed example sizes. It does not select equipment; obtain a project-specific load calculation and exact equipment performance data.";
  }
  if(config.slug === "stud-spacing-calculator") {
    config.description = "Estimate line studs and illustrative extra studs for entered corners, doors and windows. Header design and complete structural/code compliance are not assessed.";
    config.methodology[4]="Header sizing depends on actual opening span, lumber species and grade, supported loads, building geometry and the locally adopted code. The stud-count worksheet does not select a header or establish a permissible span. Use the applicable approved span tables or a project-specific engineered design.";
    const header=config.faq.find(item=>item.question==="What size header do I need?");
    if(header) header.answer="There is no universal header size for an opening width. Species, grade, supported loads and building geometry affect the applicable span table or engineered design. This worksheet counts illustrative framing extras only; it does not select a header. Obtain the project-specific design and verify the locally adopted requirements.";
  }
  if(config.slug === "egress-window-calculator") {
    config.description = "Compare entered net-clear width, height, opening area and sill height with the listed IRC reference dimensions. This partial comparison is not complete code compliance or an installation approval.";
    config.bannerTags = ["Listed reference dimensions", "Net-clear opening", "Local requirements vary"];
  }
  if(config.slug === "snow-load-calculator") {
    config.description = "Estimate snow and ice weight from depth, roof area and illustrative density assumptions. A selected reference pressure is not your roof's verified structural capacity.";
    config.bannerHeadline = "Estimate snow weight.";
    const reference=config.inputs.find(input=>input.id==="designLoad");
    if(reference) {reference.label="Reference pressure for arithmetic comparison";reference.help="This is not a verified roof capacity, design approval or ground-to-roof snow-load calculation.";}
  }
  if(config.slug === "furnace-replacement-cost-calculator") config.planningNotice += " Built-in equipment and labor figures are illustrative original benchmarks, not verified current quotes.";
  const calculate = config.calculate;
  config.calculate = (values, units: UnitSystem): CalculatorResult => {
    validateCalculatorValues(config, values, units);
    const canonical = units === "metric" ? convertCalculatorValues(config.inputs, values, "metric", "imperial") : values;
    const result = calculate(canonical, "imperial");
    if(config.slug === "extension-cord-calculator") {
      const capacity=Number.parseFloat(String(result.breakdown.find(row=>row.label==="rated for")?.value));
      const load=Number.parseFloat(String(result.breakdown.find(row=>row.label==="load")?.value));
      if(load>capacity) throw new Error("No listed cord-table entry supports this load and length. Do not substitute the largest listed gauge; check the exact cord label and consult an electrician.");
    }
    if(config.slug === "drain-pipe-calculator") {
      const utilization=Number.parseFloat(String(result.breakdown.find(row=>row.label==="at capacity")?.value));
      if(utilization>100) throw new Error("Fixture load exceeds the listed example table. No pipe size is selected; obtain a project-specific plumbing design.");
    }
    if(config.slug === "snow-load-calculator") {
      result.breakdown=result.breakdown.map(row=>row.label==="remaining capacity" ? {label:"difference from selected reference",value:`${round(Number(canonical.designLoad)-Number(result.breakdown.find(r=>r.label==="total pressure")?.value.split(" ")[0]),1)} psf; not spare roof capacity`} : row.label==="design limit (R301.6)" ? {label:"selected reference pressure",value:`${canonical.designLoad} psf; not verified roof capacity`} : row);
      result.formulaSteps=result.formulaSteps.filter(step=>!/design capacity|% of capacity|within capacity|EXCEEDS design load|CAUTION/.test(step));
    }
    // Reference checks remain visible, but a partial check is not whole-project approval.
    if(ruleTools.test(config.slug)) {
      result.breakdown = result.breakdown.map(row => row.label === "verdict" || /IRC R311\.7$/.test(row.label)
        ? {label:"limited reference checks",value:"Review the individual dimensions above; complete compliance/safety is not assessed."}
        : row.label === "header size" ? {label:"header/member design",value:"Not selected; use project-specific approved design."} : row);
      result.formulaSteps = result.formulaSteps.map(step => /^verdict:|^compliance:|^recommended header size:/.test(step) ? "Only listed reference dimensions are compared; no member selection or overall compliance/safety verdict." : step);
    }
    if(config.slug === "heat-pump-calculator") result.breakdown.push({label:"equipment selection",value:"not performed; illustrative assumptions only"});
    if(config.slug === "stud-spacing-calculator") {
      const lengthIn=Number(canonical.wallLength)*12;
      const spacingIn=Number(canonical.spacing);
      const remainder=lengthIn-Math.floor(lengthIn/spacingIn)*spacingIn;
      result.breakdown.push({label:"selected nominal line-stud spacing",value:`${spacingIn} in OC`});
      result.breakdown.push({label:"terminal interval",value:`${round(remainder < 1e-8 ? spacingIn : remainder,2)} in; selected grid plus end position, not evenly redistributed`});
    }
    if(units === "metric") {
      const conversion=primaryConversions[result.unit];
      if(conversion) {
        result.value *= conversion[0]; result.valueRounded = round(result.valueRounded * conversion[0], 3); result.unit=conversion[1];
      }
      result.breakdown.unshift({label:"unit presentation",value:"Dimensioned main results use metric where applicable; counts and AWG designations do not change. Original stock sizes, rates and supporting calculation details below remain explicitly in US reference units."});
      result.formulaSteps.unshift("Entered metric measurements are converted exactly to US reference units before evaluation; fixed stock/code presets keep their labelled units.");
    }
    validateCalculatorResult(result);
    return result;
  };
}
