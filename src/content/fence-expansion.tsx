import { Figure, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function PostSpacingSVG() {
  return (
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Standard post spacing is 8 feet on center for wood and vinyl, 6-8 feet for metal. Corner posts are always required regardless of spacing.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Post spacing by fence type</text>
      {[
        {label:"Wood privacy (6 ft)",spacing:'8 ft OC',w:300,color:GUIDE_SVG.slate},
        {label:"Vinyl / PVC",spacing:'8 ft OC',w:300,color:GUIDE_SVG.inkFaint},
        {label:"Chain link",spacing:'10 ft OC',w:375,color:GUIDE_SVG.inkMuted},
        {label:"Aluminum / steel",spacing:'6–8 ft OC',w:260,color:GUIDE_SVG.accent},
      ].map((f,i)=>{const y=55+i*28;return(
        <g key={f.label}>
          <text x="160" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{f.label}</text>
          <rect x="170" y={y} width={f.w} height="18" rx="3" fill={f.color} opacity="0.5" />
          <text x={178+f.w} y={y+13} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{f.spacing}</text>
        </g>
      )})}
    </svg>
  );
}

function FenceCostSVG() {
  const types = [
    {label:"Pressure-treated wood",low:"$15",high:"$35",avg:"$25"},
    {label:"Cedar",low:"$20",high:"$40",avg:"$30"},
    {label:"Vinyl / PVC",low:"$20",high:"$45",avg:"$32"},
    {label:"Chain link (4 ft)",low:"$10",high:"$25",avg:"$17"},
    {label:"Aluminum",low:"$25",high:"$55",avg:"$40"},
    {label:"Wrought iron",low:"$30",high:"$100",avg:"$60"},
  ];
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Fence cost per linear foot installed, from $10-25 for chain link to $30-100 for wrought iron.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed fence cost per linear foot (2026)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Including posts, rails, infill, concrete, and labor</text>
      {types.map((t,i)=>{const y=65+i*30;const w=(parseInt(t.high.replace('$',''))-parseInt(t.low.replace('$','')))*4;const xStart=170+parseInt(t.low.replace('$',''))*4;return(
        <g key={t.label}>
          <text x="160" y={y+14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <rect x={xStart} y={y} width={w} height="20" rx="3" fill={i===0?GUIDE_SVG.accent:GUIDE_SVG.slate} opacity="0.5" />
          <text x={xStart-5} y={y+14} textAnchor="end" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.low}</text>
          <text x={xStart+w+5} y={y+14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.high}/ft</text>
        </g>
      )})}
    </svg>
  );
}

function ConcretePerPostSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Each fence post needs 1-2 bags of 80-pound concrete. A 100 linear foot fence with posts every 8 feet needs 14 posts and 14-28 bags.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Concrete per post</text>
      {[
        {label:"4×4 post, 24\" deep hole",bags:"1 bag (80 lb)",y:55},
        {label:"4×4 post, 36\" deep hole",bags:"1.5 bags (80 lb)",y:85},
        {label:"6×6 post, 36\" deep hole",bags:"2 bags (80 lb)",y:115},
      ].map(p=>(
        <g key={p.label}>
          <text x="260" y={p.y+14} textAnchor="end" fontSize="11" fill={GUIDE_SVG.ink}>{p.label}</text>
          <rect x="270" y={p.y} width="180" height="22" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="0.75" />
          <text x="360" y={p.y+15} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>{p.bags}</text>
        </g>
      ))}
      <text x="340" y="152" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Frost line depth determines hole depth: 36-48" in cold climates, 18-24" in warm.</text>
    </svg>
  );
}

function ProjectCostSVG() {
  const projects = [
    {label:"Small yard (100 LF)",wood:"$2,500",vinyl:"$3,200",chain:"$1,700"},
    {label:"Medium yard (200 LF)",wood:"$5,000",vinyl:"$6,400",chain:"$3,400"},
    {label:"Large yard (350 LF)",wood:"$8,750",vinyl:"$11,200",chain:"$5,950"},
  ];
  const headerY=70;const rowH=32;
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Total fence project cost by yard size: small 100 linear foot yards from $1,700 to $3,200, large 350 foot yards from $5,950 to $11,200.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Total project cost by yard size</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>6-foot privacy fence, professional installation, standard gate included</text>
      <rect x="40" y={headerY-18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Yard size",x:140},{l:"Wood (PT)",x:310},{l:"Vinyl",x:440},{l:"Chain link",x:560}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {projects.map((p,i)=>{const y=headerY+10+i*rowH;return(
        <g key={p.label}>{i%2===0&&<rect x="40" y={y-4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="140" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{p.label}</text>
          <text x="310" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{p.wood}</text>
          <text x="440" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{p.vinyl}</text>
          <text x="560" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{p.chain}</text>
        </g>
      )})}
    </svg>
  );
}

export function FenceCalculatorExpansion() {
  return (
    <>
      <h2>The complete guide to calculating fence materials</h2>
      <p>Fence material estimates have three parts: posts, rails, and infill (pickets, panels, or mesh). Posts are set at regular intervals — usually 8 feet on center for wood and vinyl — and each post needs concrete in its hole. Rails connect the posts horizontally (typically 2 for a 4-foot fence, 3 for 6-foot). Infill goes between the rails. The calculator above handles all three, but understanding the components helps you check the numbers against what your contractor quotes.</p>

      <h2>Post spacing and why it matters</h2>
      <Figure number={1} caption="Standard spacing is 8 feet for most residential fences. Tighter spacing (6 ft) adds cost but increases wind resistance — important for solid privacy panels in exposed locations.">
        <PostSpacingSVG />
      </Figure>
      <Callout label="Corner and gate posts">Every corner needs a post regardless of spacing. Gate posts are heavier (typically 6×6 instead of 4×4) and need deeper holes and more concrete. Count your corners and gate locations before calculating — they&apos;re easy to forget and expensive to retrofit.</Callout>

      <h2>How much concrete each post needs</h2>
      <Figure number={2} caption="Concrete per post depends on post size and hole depth. Frost line determines minimum hole depth — 36-48 inches in cold climates, 18-24 in warm.">
        <ConcretePerPostSVG />
      </Figure>
      <p>A 200 linear foot fence with posts every 8 feet has 26 posts (200 ÷ 8 + 1). At 1.5 bags per post (standard 4×4 in 36-inch holes), that&apos;s 39 bags of 80-lb concrete — about $280 in materials. Use the <a href="/concrete-calculator">concrete calculator</a> for exact per-hole volumes.</p>

      <h2>What fences cost installed</h2>
      <Figure number={3} caption="Cost per linear foot includes posts, rails, infill, concrete, and labor. Wood privacy is the most popular residential fence; chain link is the budget option.">
        <FenceCostSVG />
      </Figure>
      <Figure number={4} caption="Total project cost for three common yard sizes. A standard 200 LF wood privacy fence runs about $5,000 installed.">
        <ProjectCostSVG />
      </Figure>
      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Materials (200 LF wood)",values:["$2,200–3,000","$2,200–3,000"]},
          {label:"Post hole digging",values:["$0 (manual auger) or $200 (rental)","Included"]},
          {label:"Concrete",values:["$280","Included"]},
          {label:"Labor",values:["$0 (2–4 weekends)","$2,000–4,000"]},
          {label:"Total",values:[<strong key="d">$2,500–3,500</strong>,<strong key="p">$4,500–7,000</strong>]},
        ]}
        caption="Fence installation is one of the most labor-intensive DIY projects. Post hole digging alone takes a full day for 25 holes. A power auger rental ($200/day) makes it manageable."
      />

      <h2>Permit and property line rules</h2>
      <p>Two things to verify before ordering materials: your property line and your local fence code. Most jurisdictions require fences to be set 2–6 inches inside your property line, not on it. A fence on the wrong side of the line is your neighbor&apos;s fence, legally. Get a survey if there&apos;s any ambiguity — a $300 survey is cheaper than tearing out a $5,000 fence.</p>
      <p>Height limits vary by municipality: 6 feet in the back yard is standard, 4 feet in the front yard is common, and some HOAs restrict materials and colors. Check before you build.</p>
    </>
  );
}
