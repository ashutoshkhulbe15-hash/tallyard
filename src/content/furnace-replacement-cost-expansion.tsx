import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function FurnaceCostAnatomySVG() {
  return (
    <svg viewBox="0 0 680 500" width="100%" height="auto" role="img" aria-label="Cost anatomy of a typical 6,800 dollar gas furnace replacement, and a ladder of common furnace repair costs from flame sensor to heat exchanger with the fifty percent repair-or-replace threshold marked">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Where $6,800 goes in a typical gas furnace replacement (80,000 BTU, 96% AFUE)</text>
      <rect x="16" y="40" width="301" height="34" fill={GUIDE_SVG.accent} />
      <rect x="317" y="40" width="198" height="34" fill={GUIDE_SVG.cool} />
      <rect x="515" y="40" width="56" height="34" fill={GUIDE_SVG.warm} />
      <rect x="571" y="40" width="33" height="34" fill={GUIDE_SVG.slate} />
      <rect x="604" y="40" width="28" height="34" fill={GUIDE_SVG.inkFaint} />
      <rect x="632" y="40" width="24" height="34" fill={GUIDE_SVG.inkMuted} />
      <text x="166" y="61" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">$3,200</text>
      <text x="416" y="61" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">$2,100</text>
      <rect x="16" y="90" width="10" height="10" fill={GUIDE_SVG.accent} /><text x="32" y="99" fontSize="12" fill={GUIDE_SVG.inkMuted}>Equipment (furnace itself)  $3,200</text>
      <rect x="16" y="110" width="10" height="10" fill={GUIDE_SVG.cool} /><text x="32" y="119" fontSize="12" fill={GUIDE_SVG.inkMuted}>Labor (6-10 hrs, two techs)  $2,100</text>
      <rect x="16" y="130" width="10" height="10" fill={GUIDE_SVG.warm} /><text x="32" y="139" fontSize="12" fill={GUIDE_SVG.inkMuted}>Venting / flue changes  $600</text>
      <rect x="360" y="90" width="10" height="10" fill={GUIDE_SVG.slate} /><text x="376" y="99" fontSize="12" fill={GUIDE_SVG.inkMuted}>Electrical + thermostat  $350</text>
      <rect x="360" y="110" width="10" height="10" fill={GUIDE_SVG.inkFaint} /><text x="376" y="119" fontSize="12" fill={GUIDE_SVG.inkMuted}>Permit + inspection  $300</text>
      <rect x="360" y="130" width="10" height="10" fill={GUIDE_SVG.inkMuted} /><text x="376" y="139" fontSize="12" fill={GUIDE_SVG.inkMuted}>Old unit disposal  $250</text>

      <text x="16" y="184" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Common repair costs, and where replacement starts to win</text>
      <text x="16" y="216" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Flame sensor</text><rect x="210" y="204" width="22" height="16" fill={GUIDE_SVG.accent} /><text x="664" y="216" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$150-250</text>
      <text x="16" y="244" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Ignitor</text><rect x="210" y="232" width="33" height="16" fill={GUIDE_SVG.accent} /><text x="664" y="244" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$200-400</text>
      <text x="16" y="272" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Pressure switch</text><rect x="210" y="260" width="30" height="16" fill={GUIDE_SVG.accent} /><text x="664" y="272" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$200-350</text>
      <text x="16" y="300" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Inducer motor</text><rect x="210" y="288" width="61" height="16" fill={GUIDE_SVG.accent} /><text x="664" y="300" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$400-700</text>
      <text x="16" y="328" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Gas valve</text><rect x="210" y="316" width="66" height="16" fill={GUIDE_SVG.accent} /><text x="664" y="328" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$400-800</text>
      <text x="16" y="356" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Blower motor</text><rect x="210" y="344" width="94" height="16" fill={GUIDE_SVG.warm} /><text x="664" y="356" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$500-1,200</text>
      <text x="16" y="384" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Control board</text><rect x="210" y="372" width="94" height="16" fill={GUIDE_SVG.warm} /><text x="664" y="384" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$500-1,200</text>
      <text x="16" y="412" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Heat exchanger</text><rect x="210" y="400" width="248" height="16" fill={GUIDE_SVG.inkMuted} /><text x="664" y="412" textAnchor="end" fontSize="12" fill={GUIDE_SVG.inkMuted}>$1,500-3,000</text>

      <line x1="584" y1="196" x2="584" y2="420" stroke={GUIDE_SVG.warm} strokeWidth="1.5" strokeDasharray="5,4" />
      <text x="584" y="434" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>50% of replacement ($3,400)</text>
      <text x="16" y="466" fontSize="11" fill={GUIDE_SVG.inkMuted}>Prices are parts plus labor, 2026 typical. Past the 50% line on a furnace older than 12 years,</text>
      <text x="16" y="482" fontSize="11" fill={GUIDE_SVG.inkMuted}>replacement usually wins: a cracked heat exchanger is a replacement, not a repair.</text>
    </svg>
  );
}

export function FurnaceReplacementCostExpansion() {
  return (
    <>
      <GuideByline updated="July 29, 2026" reviewedAgainst="DOE AFUE efficiency standards, ACCA Manual J sizing methodology, and EPA Section 608 refrigerant rules" />

      <h2>What a furnace replacement costs in 2026</h2>

      <p>A typical gas furnace replacement costs $4,500 to $8,000 installed. Bundle a central AC into the same visit and the project runs $9,000 to $14,000. Electric furnaces come in cheaper, $3,000 to $5,500, because the units are simple. Oil runs highest, $6,000 to $9,500, because the equipment is expensive and fewer techs work on it.</p>

      <p>Those are wide ranges, and the spread is not random. It comes from four things: the size of the unit, the efficiency tier you pick, what the install actually involves beyond swapping boxes, and whether the AC rides along. The calculator above prices all four. The rest of this page explains where each dollar goes, so a quote can&apos;t hide anything from you.</p>

      <Figure number={1} caption="Top: the anatomy of a real replacement quote. Equipment is less than half the money. Bottom: what individual repairs cost, and the line past which repairing an old furnace stops making sense.">
        <FurnaceCostAnatomySVG />
      </Figure>

      <MethodologyNote>
        <p>Sizing uses a simplified 45 BTU per square foot heating load rounded to standard cabinet sizes; a real install should be confirmed with an ACCA Manual J calculation. Equipment and labor figures reflect typical 2026 contractor pricing. Efficiency tiers follow DOE AFUE standards. AC bundle pricing assumes current A2L refrigerant equipment (R-454B/R-32) and EPA Section 608 certified handling.</p>
      </MethodologyNote>

      <p>Region moves the number too. Metro labor rates in the Northeast and West Coast push installed prices 15 to 25 percent over the national middle, while much of the South and Midwest sits under it. Late fall is peak season and prices firm up when the first cold snap fills the schedule; the same replacement quoted in April often comes in a few hundred dollars lighter, and you are not negotiating against a dead furnace.</p>

      <h2>What actually happens on install day</h2>

      <p>A straight swap is a one-day job, and knowing the sequence helps you spot a thin quote. The crew shuts gas and power, disconnects the flue, plenum, and gas line, and hauls the old unit out; that is the first hour. Setting the new furnace, adapting the plenum sheet metal to the new cabinet, and reconnecting gas, flue, and low-voltage wiring eats the middle of the day. Startup is the part worth being home for: a combustion check, gas pressure adjustment, temperature rise measured against the data plate, and the thermostat cycled through its stages. Four to eight hours, two techs, heat by dinner.</p>

      <p>The add-ons are what stretch it. New PVC venting for a condensing unit means drilling the rim joist and running pipe, half a day. Duct or plenum modifications, a fuel switch, or a furnace living in a crawlspace can push the job to two days. None of that is a problem. All of it should be itemized before the truck shows up, which is exactly what the complexity input above prices.</p>

      <h2>Repair or replace: the 50 percent rule</h2>

      <p>Before pricing a new furnace, make sure you need one. The industry shorthand is the 50 percent rule: if the repair costs more than half the price of replacement and the furnace is past 12 years old, put the money toward the new unit. It is a rule of thumb, not physics, but it holds up because an old furnace that just ate a $1,400 control board is still an old furnace. The blower is next. Then the inducer.</p>

      <p>One exception in each direction. A cracked heat exchanger ends the discussion regardless of age: it can leak combustion gases into your air, most techs will red-tag the unit on the spot, and at $1,500 to $3,000 the fix costs half a furnace anyway. And in the other direction, cheap sensor-level fixes are worth doing even on a 15 year old unit. A $200 flame sensor buying two more winters is fine math.</p>

      <ComparisonTable
        columns={[{title:"Situation"},{title:"Call"}]}
        rows={[
          {label:"Under 10 years old, repair under $1,000",values:["Any failed component","Repair"]},
          {label:"12-15 years old, repair under 50% of new",values:["Sensors, switches, ignitor","Repair, start saving"]},
          {label:"12-15 years old, repair over 50% of new",values:["Blower, control board, gas valve","Replace"]},
          {label:"Any age",values:["Cracked heat exchanger","Replace, no debate"]},
          {label:"Past 15 years, any major repair",values:["Anything over ~$700","Replace"]},
        ]}
        caption="The 50 percent rule in table form. The age threshold matters as much as the dollar threshold: half of gas furnaces are done by year 18."
      />

      <h2>What each component costs to fix</h2>

      <p>Furnaces fail in predictable order, and the prices are predictable too. Sensors and switches go first and cost the least. Motors and boards go next and cost real money. The heat exchanger goes last and takes the furnace with it.</p>

      <ComparisonTable
        columns={[{title:"Parts + labor"},{title:"What it does when it fails"}]}
        rows={[
          {label:"Flame sensor",values:["$150-250","Furnace lights, then shuts off in seconds"]},
          {label:"Hot surface ignitor",values:["$200-400","Clicks, hums, never lights"]},
          {label:"Pressure switch",values:["$200-350","Won't start; error code before ignition"]},
          {label:"Inducer motor",values:["$400-700","Loud whine or grinding at startup"]},
          {label:"Gas valve",values:["$400-800","No gas flow; furnace runs cold air"]},
          {label:"Blower motor",values:["$500-1,200","No airflow, or airflow that never stops"]},
          {label:"Control board",values:["$500-1,200","Random behavior; the furnace's brain"]},
          {label:"Heat exchanger",values:["$1,500-3,000","Red tag. Replace the furnace."]},
        ]}
        caption="2026 typical prices, parts plus labor. A $95 diagnostic fee usually gets waived if you do the repair with the same company."
      />

      <p>Worth knowing before the tech arrives: half of these failures announce themselves the same way, a furnace that tries to start and gives up. The difference is in the error code blinking on the control board behind the lower panel. Count the flashes, look up the code on the door sticker, and you will walk into the repair conversation knowing whether you are buying a $200 sensor or a $900 motor. Techs quote differently to people who counted the flashes.</p>

      <h2>80% or 96%: the efficiency decision</h2>

      <p>AFUE is the percentage of fuel that becomes heat in your house instead of going up the flue. An 80% furnace wastes one dollar in five; a 96% condensing furnace wastes four cents. The condensing unit pulls that extra heat out of the exhaust until the water vapor in it literally condenses, which is why it needs a PVC vent out the sidewall and a condensate drain instead of a chimney.</p>

      <ComparisonTable
        columns={[{title:"80% AFUE"},{title:"96% AFUE",highlight:true}]}
        rows={[
          {label:"Equipment (80k BTU)",values:["$2,600","$3,800"]},
          {label:"Venting",values:["Existing metal flue","New PVC + condensate, ~$600-900"]},
          {label:"Annual gas cost (cold climate, ~$1,000/yr heat)",values:["$1,000","$835"]},
          {label:"Payback on the difference",values:["n/a","7-11 years, faster where winters bite"]},
        ]}
        caption="The efficiency upgrade is a climate decision. Minnesota pays it back. Georgia mostly doesn't."
      />

      <p>The trap in this decision is the orphaned water heater. In many older homes the furnace and water heater share a chimney flue. Pull the furnace off to sidewall PVC and the water heater is suddenly venting alone into a flue sized for two appliances, which drafts poorly and can require a chimney liner at $800 to $1,500. Good installers flag it in the quote. Bad ones let the inspector find it. If your <a href="/water-heater-calculator">water heater</a> shares the flue, ask about the liner before you sign, not after.</p>

      <h2>Should the AC go in the same truck</h2>

      <p>If your air conditioner is past 10 years old, replace it with the furnace. Not because a salesperson said so, but because three things line up. The labor is shared: the crew is already there, the refrigerant lines and plenum are already open, and doing both in one visit typically saves $500 to $1,000 versus separate installs. The coil is matched: your indoor evaporator coil sits on top of the furnace and should be paired to both the new furnace airflow and the new condenser. And the refrigerant era changed: new AC equipment moved to A2L refrigerants (R-454B and R-32) after the R-410A phase-down, so patching an aging R-410A condenser onto a new furnace is spending money on a dead platform.</p>

      <p>The counter-case is real too. An AC under 8 years old with no issues is not a bundle candidate; run it out. And if cooling barely matters in your climate, the bundle just inflates the project. The calculator prices both paths, so compare them with your numbers instead of the salesperson&apos;s.</p>

      <Scenario location="Columbus, Ohio">
        <p>A 1,800 square foot two-story in Columbus needs 1,800 &#215; 45 = 81,000 BTU, which rounds to an 80,000 BTU cabinet (Manual J on this house comes in a touch lower; the cabinet size holds). The owners pick a 96% condensing furnace for the Ohio winters: $3,800 equipment, $2,100 labor, $900 for the new PVC venting and condensate pump, $550 permit and disposal. Their AC is six years old, so it stays.</p>
        <p>Total: $7,350, right in the middle of the $6,400-8,500 quotes they collected. The 96% unit saves about $165 a year in gas over the 80% option at Columbia Gas rates, paying back the roughly $1,700 efficiency premium in 10 years, with the furnace warrantied for 10 and expected to run 18. The quote also included the chimney liner check: their water heater has its own flue. No liner needed. That question cost nothing to ask.</p>
      </Scenario>

      <h2>Where furnace quotes go wrong</h2>

      <p>Oversizing is the classic. An installer who sizes the new furnace by copying the old one, or worse by upsizing it "for comfort", is skipping the load calculation. An oversized furnace short cycles: blasts, shuts off, blasts again. It wears components faster, heats unevenly, and costs more up front for the privilege. Insist on a Manual J. If the quote does not mention one, that is your answer about the installer. Cross-check the size yourself with the <a href="/btu-calculator">BTU calculator</a>.</p>

      <p>The other patterns are quieter. Quotes that bundle "miscellaneous materials" without itemizing venting. The permit that is not in the quote at all, which means it is not being pulled, which surfaces when you sell the house. And single-quote pricing: furnace installs have per-job spreads of $2,000 between reputable companies in the same city, so a single quote tells you nothing about the market. Three itemized quotes. Same rule as solar, same reason.</p>

      <p>Last one, and it deserves its own paragraph: before buying heating capacity, check whether you need less of it. Attic insulation is the cheapest heat you will ever buy, and a house that leaks less can sometimes drop a cabinet size. Price it with the <a href="/insulation-calculator">insulation calculator</a>. And if you are replacing both furnace and AC anyway, price a <a href="/heat-pump-calculator">heat pump</a> against the bundle: one system doing both jobs, increasingly viable in cold climates, and sometimes cheaper than furnace plus condenser once state electrification rebates land.</p>
    </>
  );
}
