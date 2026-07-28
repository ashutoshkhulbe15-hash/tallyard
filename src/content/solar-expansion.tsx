import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SolarSizingFlowSVG() {
  return (
    <svg viewBox="0 0 680 452" width="100%" height="auto" role="img" aria-label="Diagram showing the four-step solar panel sizing calculation from monthly electricity use to panel count, a scale of peak sun hours by US region, and the same house sized in three cities">
      {/* flow boxes */}
      <rect x="16" y="40" width="132" height="72" rx="4" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="82" y="72" textAnchor="middle" fontSize="21" fontWeight="700" fill={GUIDE_SVG.ink}>900 kWh</text>
      <text x="82" y="94" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>monthly use (bill)</text>

      <line x1="148" y1="76" x2="192" y2="76" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="170" y="62" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.inkMuted}>&#247; 30</text>

      <rect x="192" y="40" width="132" height="72" rx="4" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="258" y="72" textAnchor="middle" fontSize="21" fontWeight="700" fill={GUIDE_SVG.ink}>30 kWh</text>
      <text x="258" y="94" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>per day</text>

      <line x1="324" y1="76" x2="368" y2="76" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="346" y="62" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.inkMuted}>&#247; 4.5</text>
      <text x="346" y="94" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>sun hrs</text>

      <rect x="368" y="40" width="132" height="72" rx="4" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="434" y="72" textAnchor="middle" fontSize="21" fontWeight="700" fill={GUIDE_SVG.ink}>7.8 kW</text>
      <text x="434" y="94" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>system size</text>

      <line x1="500" y1="76" x2="544" y2="76" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="522" y="62" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.inkMuted}>&#247; 0.4</text>
      <text x="522" y="94" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>kW/panel</text>

      <rect x="544" y="40" width="120" height="72" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="2" />
      <text x="604" y="72" textAnchor="middle" fontSize="21" fontWeight="700" fill={GUIDE_SVG.accent}>20</text>
      <text x="604" y="94" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>400 W panels</text>

      <text x="16" y="142" fontSize="11" fill={GUIDE_SVG.inkMuted}>System size includes an 85% derate for inverter loss, wiring, dirt, and heat (NREL PVWatts default).</text>

      {/* sun hours scale */}
      <text x="16" y="184" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Peak sun hours by region (yearly average)</text>
      <rect x="16" y="196" width="129" height="32" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.ink} />
      <rect x="145" y="196" width="129" height="32" fill={GUIDE_SVG.slate} stroke={GUIDE_SVG.ink} />
      <rect x="274" y="196" width="129" height="32" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.ink} />
      <rect x="403" y="196" width="129" height="32" fill="#8FCBA8" stroke={GUIDE_SVG.ink} />
      <rect x="532" y="196" width="129" height="32" fill={GUIDE_SVG.accent} stroke={GUIDE_SVG.ink} />
      <text x="80" y="217" textAnchor="middle" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>3.0-3.5</text>
      <text x="209" y="217" textAnchor="middle" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>3.5-4.0</text>
      <text x="338" y="217" textAnchor="middle" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>4.0-4.5</text>
      <text x="467" y="217" textAnchor="middle" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>4.5-5.5</text>
      <text x="596" y="217" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">5.5-6.5</text>
      <text x="80" y="246" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>Pacific NW</text>
      <text x="209" y="246" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>Midwest, NE</text>
      <text x="338" y="246" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>Mid-Atlantic</text>
      <text x="467" y="246" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>TX, FL, Plains</text>
      <text x="596" y="246" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>Southwest</text>

      {/* three cities table */}
      <text x="16" y="296" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The same house in three cities (900 kWh/mo, 400 W panels)</text>
      <text x="16" y="322" fontSize="11" fill={GUIDE_SVG.inkMuted}>City</text>
      <text x="420" y="322" textAnchor="end" fontSize="11" fill={GUIDE_SVG.inkMuted}>System size</text>
      <text x="664" y="322" textAnchor="end" fontSize="11" fill={GUIDE_SVG.inkMuted}>Panels</text>
      <line x1="16" y1="330" x2="664" y2="330" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="354" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>Phoenix (6.0 sun hrs)</text>
      <text x="420" y="354" textAnchor="end" fontSize="14" fill={GUIDE_SVG.ink}>5.9 kW</text>
      <text x="664" y="354" textAnchor="end" fontSize="18" fontWeight="700" fill={GUIDE_SVG.accent}>15</text>
      <line x1="16" y1="366" x2="664" y2="366" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" strokeDasharray="2,3" />
      <text x="16" y="390" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>Dallas (5.0 sun hrs)</text>
      <text x="420" y="390" textAnchor="end" fontSize="14" fill={GUIDE_SVG.ink}>7.1 kW</text>
      <text x="664" y="390" textAnchor="end" fontSize="18" fontWeight="700" fill={GUIDE_SVG.accent}>18</text>
      <line x1="16" y1="402" x2="664" y2="402" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" strokeDasharray="2,3" />
      <text x="16" y="426" fontSize="14" fontWeight="600" fill={GUIDE_SVG.ink}>Seattle (3.3 sun hrs)</text>
      <text x="420" y="426" textAnchor="end" fontSize="14" fill={GUIDE_SVG.ink}>10.7 kW</text>
      <text x="664" y="426" textAnchor="end" fontSize="18" fontWeight="700" fill={GUIDE_SVG.accent}>27</text>
    </svg>
  );
}

export function SolarCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="July 29, 2026" reviewedAgainst="NREL PVWatts loss assumptions, NEC Article 690, and EIA residential electricity data" />

      <h2>How many solar panels you need: the whole answer</h2>

      <p>Most US homes need 15 to 22 panels of 400 watts each. The exact count is your daily electricity use in kWh, divided by your region&apos;s peak sun hours and a system loss factor, divided by panel wattage, rounded up. That is the entire formula. Installers use the same math; the difference here is that you can see every number.</p>

      <p>Notice what is not in that formula: your square footage. A 3,000 square foot house with gas heat and no AC can use less electricity than a 1,400 square foot house with electric everything. Solar is sized to your bill, not your floor plan. Pull a utility bill, find the kWh, and you have the only input that really matters.</p>

      <Figure number={1} caption="The sizing chain from bill to panel count. Same house, same usage: 15 panels in Phoenix, 27 in Seattle. Sun hours move the answer more than any other input.">
        <SolarSizingFlowSVG />
      </Figure>

      <MethodologyNote>
        <p>Panel counts use daily kWh divided by peak sun hours and an 85 percent system efficiency factor, matching NREL PVWatts default loss assumptions (inverter conversion, wiring, soiling, temperature). Sun hour ranges come from NREL solar resource maps. Cost figures reflect typical 2026 quoted cash prices per watt; the federal residential tax credit ended December 31, 2025, so no credit is assumed. Electrical requirements reference NEC Article 690.</p>
      </MethodologyNote>

      <h2>The math, one step at a time</h2>

      <p>Take a house using 900 kWh a month, right at the national average the EIA reports. Divide by 30: 30 kWh a day. That is what the panels must produce on an average day across the year.</p>

      <p>Now the sun. Peak sun hours are not daylight hours. They are the equivalent hours of full-strength sun (1 kW per square meter) your location receives daily, averaged across the whole year, cloudy November included. Dallas gets about 5. Cleveland gets about 4. Seattle gets 3.3 on a good year. The map bands in Figure 1 put you close enough; NREL&apos;s PVWatts tool will give you the exact number for your ZIP code.</p>

      <p>Divide 30 kWh by 4.5 sun hours and you get 6.7 kW of panels, in theory. Theory loses about 15 percent in practice. Inverters eat 3 to 4 percent converting DC to AC. Wiring loses a couple percent. Dust and pollen sit on the glass. Heat, ironically, cuts output on the sunniest days because panel voltage drops as temperature rises. Divide by 0.85 and the honest number is 7.8 kW.</p>

      <p>Last step. A modern residential panel is 400 watts, so 7.8 kW needs 7,800 &#247; 400 = 19.5 panels. You cannot buy half a panel. Twenty it is, and the spare half panel becomes a small buffer for a cloudy month. Figure on roughly 20 square feet of unshaded roof per panel, about 400 square feet for this system.</p>

      <h2>What a 400 watt panel actually produces</h2>

      <p>The wattage on the spec sheet is a lab number: output under standardized test conditions that your roof will meet for maybe an hour on a perfect spring day. What you actually get from a 400 watt panel is roughly 1.5 to 2 kWh per day depending on where you live. Per month, call it 45 to 60 kWh per panel. Anyone promising more is quoting the lab.</p>

      <ComparisonTable
        columns={[{title:"350 W panel"},{title:"400 W panel",highlight:true},{title:"450 W panel"}]}
        rows={[
          {label:"Daily output at 4.5 sun hours",values:["1.3 kWh","1.5 kWh","1.7 kWh"]},
          {label:"Daily output at 6.0 sun hours",values:["1.8 kWh","2.0 kWh","2.3 kWh"]},
          {label:"Monthly output (typical US)",values:["40-54 kWh","45-60 kWh","51-69 kWh"]},
          {label:"Panels for a 900 kWh/mo home",values:["20-23","18-20","16-18"]},
        ]}
        caption="Real-world output per panel, including the 85 percent system derate. 400 W is the current residential standard; 450 W panels are physically larger, not more efficient per square foot by much."
      />

      <p>Why does this matter for sizing? Because the panel count moves less than people expect when you buy bigger panels. Going from 400 to 450 watts drops a 20 panel system to 18. If roof space is tight, that matters. If it is not, price per watt should decide, and mid-range panels usually win that fight.</p>

      <h2>What solar panels cost by state in 2026</h2>

      <p>Solar is priced per watt of installed capacity, hardware and labor and permitting together. National quotes in 2026 mostly land between $2.50 and $3.00 per watt cash. Sunbelt states run cheaper because the installer market is crowded and permitting is faster; the Northeast and California run higher on labor and soft costs.</p>

      <ComparisonTable
        columns={[{title:"$/watt (cash)"},{title:"8 kW system"}]}
        rows={[
          {label:"Texas",values:["$2.20-2.60","$17,600-20,800"]},
          {label:"Florida",values:["$2.20-2.70","$17,600-21,600"]},
          {label:"North Carolina",values:["$2.40-2.90","$19,200-23,200"]},
          {label:"California",values:["$2.70-3.30","$21,600-26,400"]},
          {label:"US typical",values:[<strong key="a">$2.50-3.00</strong>,<strong key="b">$20,000-24,000</strong>]},
        ]}
        caption="Typical quoted ranges for purchased rooftop systems, mid 2026. Get three quotes; spreads of $0.50/watt between installers in the same city are normal."
      />

      <Callout label="The federal residential credit is gone">The 30 percent federal residential clean energy credit ended for systems paid for after December 31, 2025. Prices in this table are what you pay, full stop. Leased and PPA systems can still pass through a separate commercial credit in some cases, which is partly why lease offers suddenly look more competitive against cash purchases than they did in 2025. State and utility incentives still exist and vary widely; check your state energy office before signing anything.</Callout>

      <p>Why does the same hardware cost 40 percent more in one state than another? Mostly soft costs. The panels and inverters are commodity items priced nationally; what varies is labor, permitting time, inspection queues, and how many installers are competing for your roof. A Texas suburb with a dozen solar companies and same-week permits prices very differently from a jurisdiction where the permit alone takes six weeks. None of that shows up on the spec sheet, all of it shows up on the quote.</p>

      <p>Which is also the case for getting three quotes minimum. Not two. Three. Per-watt pricing has no sticker price, and the first quote calibrates nothing because you have nothing to compare it against. The second tells you if the first was high. The third tells you what the market actually is. An hour of extra phone calls routinely saves two thousand dollars on an 8 kW system, which is a better hourly rate than most people earn doing anything.</p>

      <h2>What solar costs after the install</h2>

      <p>Panels themselves are boring to own. No moving parts, 25 year warranties, output degrading about half a percent a year. The costs that do show up are the ones nobody quotes on the sales call.</p>

      <ComparisonTable
        columns={[{title:"Typical cost"},{title:"How often"}]}
        rows={[
          {label:"Inspection and checkup",values:["$150-300","Every 1-2 years, optional"]},
          {label:"Panel cleaning",values:["$10-25 per panel","Rarely needed where it rains"]},
          {label:"Inverter replacement",values:["$1,500-3,000","Once, around year 10-15"]},
          {label:"Remove and reinstall for a reroof",values:["$1,500-6,000","If the roof needs replacing"]},
        ]}
        caption="The inverter is the one component that will not last the life of the panels. Budget for it. Microinverter systems spread this cost out; string inverter systems take it in one hit."
      />

      <p>That last row is the expensive lesson. Panels outlive shingles. If your roof has less than 10 years left, replace it before the panels go up, or you will pay a crew twice: once to take the array down and once to put it back. Run the <a href="/roofing-calculator">roofing calculator</a> first if you are not sure what shape the roof is in.</p>

      <Scenario location="Dallas, Texas">
        <p>A 2,100 square foot house in Dallas averages 1,100 kWh a month across the year, AC-heavy summers included. Daily use: 1,100 &#247; 30 = 36.7 kWh. Dallas gets 5.0 peak sun hours. System size: 36.7 &#247; (5.0 &#215; 0.85) = 8.6 kW. Panel count: 8,600 &#247; 400 = 21.5, round up to 22 panels, an 8.8 kW system needing about 440 square feet of south or west facing roof.</p>
        <p>At $2.40 per watt, the cash price is 8,800 &#215; $2.40 = about $21,100. The system produces roughly 8.8 &#215; 5.0 &#215; 0.85 &#215; 365 = 13,650 kWh a year, essentially the full 13,200 kWh the house uses. At Texas retail rates around 15 cents per kWh, that is about $2,000 a year in avoided electricity, a 10 to 11 year simple payback with no federal credit. Faster if rates keep rising, and they have not gone down yet.</p>
      </Scenario>

      <h2>Do you have the roof for it</h2>

      <p>Orientation first. In the Northern Hemisphere, south facing panels produce the most; east or west facing give up about 15 percent, which you can compensate for with two or three extra panels rather than abandoning the idea. North facing is almost never worth wiring up. Pitch matters less than people think: anything from 15 to 40 degrees performs within a few percent of ideal, and flat roofs work fine with tilted racking, at a small extra cost.</p>

      <p>Then space. Twenty panels at 20 square feet each is 400 square feet of roof, and it has to be contiguous-ish, unshaded, and structurally sound. Skylights, vents, and chimneys chop up the usable area faster than the math suggests. A quick sanity check: stand across the street at noon and look at the biggest clean rectangle of roof you own. If it is not facing somewhere between east and west through south, or a tree owns it from 10 to 2, the honest answer may be a smaller system than the formula wants, sized to the roof you have instead of the bill you have.</p>

      <h2>Where solar sizing goes wrong</h2>

      <p>Sizing by square footage. Already covered, still the number one error. The second worst is trusting nameplate watts: multiply 20 panels by 400 watts by 12 daylight hours and you get a fantasy number nearly triple what the roof will deliver. Every honest estimate runs through sun hours and the derate.</p>

      <p>Ignoring your utility&apos;s rules comes next. Net metering, where the utility credits your excess at retail rates, is shrinking or gone in many states. If your utility credits exports at 3 cents while charging you 15, a system sized to 100 percent of annual usage overproduces into a bad deal, and sizing to 80 or 90 percent pencils out better. One phone call to the utility before you sign. That is the whole defense.</p>

      <p>Then the physical stuff. Shading between 10 AM and 2 PM, when panels earn 70 percent of their keep, quietly wrecks production in ways the sales rendering never shows. A panel string is only as strong as its most shaded panel unless you pay for microinverters or optimizers. And oversizing for a future EV sounds smart until the inverter or your electrical panel becomes the bottleneck; NEC Article 690 and your service panel rating cap what you can interconnect, and upgrading a 100 amp panel adds real money. Size for the usage you have, with the <a href="/wire-size-calculator">wire size calculator</a> handy if you are checking conductor requirements, and confirm the interconnection limit before falling in love with a bigger array.</p>

      <p>If the goal is a smaller bill rather than solar specifically, cheaper fixes come first. The <a href="/insulation-calculator">insulation calculator</a> and <a href="/btu-calculator">BTU calculator</a> shrink the load a system has to cover, and shrinking the load shrinks the array. An electric or heat pump <a href="/water-heater-calculator">water heater</a> moves usage the other way, so size for it now if one is coming. Every kWh you do not use is a panel you do not buy.</p>
    </>
  );
}
