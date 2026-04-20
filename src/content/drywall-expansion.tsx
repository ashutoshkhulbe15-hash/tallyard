import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SheetSizesSVG() {
  const sizes = [
    { label: "4×8 ft (standard)", sqft: 32, best: "Walls, most rooms", color: GUIDE_SVG.slate },
    { label: "4×10 ft", sqft: 40, best: "9-10 ft ceilings, fewer joints", color: GUIDE_SVG.inkFaint },
    { label: "4×12 ft", sqft: 48, best: "Long walls, pro use", color: GUIDE_SVG.inkMuted },
    { label: "4×14/16 ft", sqft: 56, best: "Commercial, requires lift", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Drywall sheet sizes from 4x8 (32 sq ft) to 4x16 (64 sq ft).">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Drywall sheet sizes</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Longer sheets mean fewer joints to tape, but they are heavier and harder to maneuver</text>
      {sizes.map((s, i) => {
        const y = 65 + i * 30;
        const w = s.sqft * 5;
        return (
          <g key={s.label}>
            <text x="140" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
            <rect x="150" y={y} width={w} height="20" rx="3" fill={s.color} opacity="0.6" />
            <text x={158 + w} y={y + 14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.sqft} ft²</text>
            <text x={158 + w + 45} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.best}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ThicknessSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Drywall thickness: 1/4 inch for curves, 3/8 for resurfacing, 1/2 standard, 5/8 ceilings and fire.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Which thickness to use</text>
      {[
        {thick:'1/4"',use:"Curved walls, resurfacing over old plaster",code:"Not structural",y:55,color:GUIDE_SVG.inkFaint},
        {thick:'3/8"',use:"Resurfacing, non-load walls in mobile homes",code:"Rarely specified",y:85,color:GUIDE_SVG.slate},
        {thick:'1/2"',use:"Standard walls, most residential rooms",code:"Default residential",y:115,color:GUIDE_SVG.accent},
        {thick:'5/8"',use:"Ceilings (sag-resistant), garage walls (fire code)",code:"Required by code in many applications",y:145,color:GUIDE_SVG.accent},
      ].map(t=>(
        <g key={t.thick}>
          <text x="40" y={t.y+12} fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>{t.thick}</text>
          <text x="85" y={t.y+6} fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{t.use}</text>
          <text x="85" y={t.y+22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{t.code}</text>
        </g>
      ))}
    </svg>
  );
}

function MudTapeSVG() {
  const items = [
    { label: "Joint compound (mud)", qty: "1 gallon per 100 ft² of drywall", note: "3 coats: tape, fill, finish" },
    { label: "Paper tape", qty: "1 roll (250 ft) per 500 ft²", note: "Every seam, inside corner, and butt joint" },
    { label: "Corner bead", qty: "1 piece per outside corner", note: "Metal or paper-faced. 8 ft or 10 ft lengths" },
    { label: "Drywall screws", qty: "~30 screws per 4×8 sheet", note: "1-1/4\" for 1/2\" drywall, 1-5/8\" for 5/8\"" },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Drywall finishing supplies: joint compound, tape, corner bead, screws.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Finishing supplies you&apos;ll need beyond the sheets</text>
      {items.map((item, i) => {
        const y = 55 + i * 35;
        return (
          <g key={item.label}>
            <circle cx="35" cy={y + 8} r="8" fill={GUIDE_SVG.accentSoft} />
            <text x="35" y={y + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill={GUIDE_SVG.accent}>{i + 1}</text>
            <text x="55" y={y + 6} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{item.label}: {item.qty}</text>
            <text x="55" y={y + 22} fontSize="10" fill={GUIDE_SVG.inkFaint}>{item.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

function HangingSequenceSVG() {
  return (
    <svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Hanging order: ceilings first, then top row of walls, then bottom row.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Hanging order</text>
      {[
        {step:"1",label:"Ceilings first",note:"Gravity holds wall sheets against ceiling edge",x:60},
        {step:"2",label:"Top row of walls",note:"Tight to ceiling. Easier to shim bottom.",x:270},
        {step:"3",label:"Bottom row of walls",note:"Gap at floor hidden by baseboard trim",x:480},
      ].map(s=>(
        <g key={s.step}>
          <rect x={s.x} y="50" width="170" height="65" rx="6" fill={s.step==="1"?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={s.step==="1"?GUIDE_SVG.accent:GUIDE_SVG.slate} strokeWidth="1" />
          <text x={s.x+85} y="72" textAnchor="middle" fontSize="18" fontWeight="700" fill={s.step==="1"?GUIDE_SVG.accent:GUIDE_SVG.slate}>{s.step}</text>
          <text x={s.x+85} y="92" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x={s.x+85} y="106" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
        </g>
      ))}
    </svg>
  );
}

export function DrywallCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="USG (United States Gypsum) installation guides and IRC Section R702" />

      <h2>How many sheets of drywall — and everything else you need to finish them</h2>

      <p>Counting drywall sheets is the easy part: divide your wall and ceiling area by 32 (the square footage of a standard 4×8 sheet), add 10 percent for waste, and round up. A 12 × 14 room with 8-foot ceilings needs about 18 sheets for the walls and 6 for the ceiling. The part people forget is everything that comes after hanging: joint compound (mud), tape, screws, corner bead, and 3 rounds of sanding. The finishing supplies often cost as much as the drywall itself.</p>

      <Figure number={1} caption="Longer sheets mean fewer joints but are heavier and harder to handle solo. A 4×12 sheet weighs 77 pounds. Most DIYers stick with 4×8.">
        <SheetSizesSVG />
      </Figure>

      <MethodologyNote>
        <p>Sheet counts use wall area ÷ sheet size with 10% waste for cuts and breakage. Finishing supply quantities from USG (United States Gypsum) application guides. Thickness requirements per IRC Section R702 for fire-rated assemblies. Pricing reflects 2026 Home Depot and Lowe&apos;s retail.</p>
      </MethodologyNote>

      <h2>Thickness: it depends on what the wall does</h2>

      <Figure number={2} caption="Most residential walls use 1/2 inch. Ceilings use 5/8 to prevent sag. Garage walls attached to living space require 5/8 Type X for fire rating.">
        <ThicknessSVG />
      </Figure>

      <Callout label="Fire-rated walls (Type X)">IRC requires 5/8-inch Type X drywall on the garage side of any wall or ceiling between a garage and living space. This provides a 1-hour fire rating. Using standard 1/2-inch drywall here fails code inspection and is a genuine safety issue. Type X costs about $2 more per sheet. Do not skip it.</Callout>

      <h2>Finishing: mud, tape, and three coats of patience</h2>

      <Figure number={3} caption="These supplies add $150-300 to a typical room project. Budget for them or you will make a separate trip to the store mid-project.">
        <MudTapeSVG />
      </Figure>

      <p>Taping and mudding is three coats minimum. First coat embeds the tape in a thin layer of compound. Second coat fills the joint to near-flat. Third coat feathers the edges wide (12 to 14 inches) for an invisible transition. Each coat needs to dry completely before sanding and applying the next. In summer this takes 12 to 24 hours per coat. In winter with no heat in the space, it can take 48 hours. Three coats plus drying time means finishing a single room takes 3 to 5 days even though the actual work time is only a few hours.</p>

      <Scenario location="Columbus, OH">
        A homeowner finishing a basement applied two coats of mud instead of three and sanded aggressively to try to make the joints smooth. After <a href="/paint-calculator">painting</a>, every joint showed as a visible ridge in raking light from the windows. The only fix was to apply the third coat (which he should have done originally), re-sand, re-prime, and repaint. The shortcut added two days to the project instead of saving one.
      </Scenario>

      <h2>Hanging order matters</h2>

      <Figure number={4} caption="Hang ceilings first, then top row of walls tight to the ceiling, then bottom row. The baseboard covers the gap at the floor.">
        <HangingSequenceSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Drywall (20 sheets)",values:["$280–400","$280–400"]},
          {label:"Mud, tape, screws, corner bead",values:["$80–150","Included"]},
          {label:"Drywall lift rental (ceilings)",values:["$40–60/day","Own equipment"]},
          {label:"Labor (hang + finish)",values:["$0 (3–5 weekends)","$1.50–3.00/ft²"]},
          {label:"Total for a 12×14 room",values:[<strong key="d">$400–610</strong>,<strong key="p">$1,200–2,800</strong>]},
        ]}
        caption="Hanging drywall is hard physical labor but not technically difficult. Finishing (taping and mudding) is the skill-dependent part. Many DIYers hang themselves and hire a finisher."
      />

      <p>For projects that involve <a href="/insulation-calculator">insulation</a> behind the drywall, calculate insulation quantities first since the insulation goes in before the sheets go up. If you are painting afterward, the <a href="/paint-calculator">paint calculator</a> uses the same wall area measurement.</p>
    </>
  );
}
