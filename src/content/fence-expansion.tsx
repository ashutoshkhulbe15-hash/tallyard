import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function PostSpacingSVG() {
  return (
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Standard post spacing is 8 feet on center for wood and vinyl, 6-8 feet for metal.">
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
    {label:"Pressure-treated wood",low:"$15",high:"$35"},
    {label:"Cedar",low:"$20",high:"$40"},
    {label:"Vinyl / PVC",low:"$20",high:"$45"},
    {label:"Chain link (4 ft)",low:"$10",high:"$25"},
    {label:"Aluminum",low:"$25",high:"$55"},
    {label:"Wrought iron",low:"$30",high:"$100"},
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
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Each fence post needs 1-2 bags of 80-pound concrete depending on hole size and depth.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Concrete per post</text>
      {[
        {label:'4×4 post, 24" deep hole',bags:"1 bag (80 lb)",y:55},
        {label:'4×4 post, 36" deep hole',bags:"1.5 bags (80 lb)",y:85},
        {label:'6×6 post, 36" deep hole',bags:"2 bags (80 lb)",y:115},
      ].map(p=>(
        <g key={p.label}>
          <text x="260" y={p.y+14} textAnchor="end" fontSize="11" fill={GUIDE_SVG.ink}>{p.label}</text>
          <rect x="270" y={p.y} width="180" height="22" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="0.75" />
          <text x="360" y={p.y+15} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>{p.bags}</text>
        </g>
      ))}
      <text x="340" y="152" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Frost line depth determines hole depth: 36-48&quot; in cold climates, 18-24&quot; in warm.</text>
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
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Total fence project cost by yard size from $1,700 to $11,200.">
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

function LifespanSVG() {
  const materials = [
    { label: "Pressure-treated pine", years: 15, color: GUIDE_SVG.inkFaint },
    { label: "Chain link (galvanized)", years: 20, color: GUIDE_SVG.slate },
    { label: "Cedar", years: 20, color: "#8B6B3D" },
    { label: "Vinyl / PVC", years: 30, color: GUIDE_SVG.inkMuted },
    { label: "Aluminum", years: 40, color: GUIDE_SVG.accent },
    { label: "Wrought iron", years: 50, color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Fence material lifespan from 15 years for pressure-treated to 50+ for wrought iron.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How long each fence material lasts</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>With normal maintenance. PT requires staining every 2-3 years; vinyl and aluminum need almost none.</text>
      {materials.map((m, i) => {
        const y = 65 + i * 30;
        const w = (m.years / 50) * 350;
        return (
          <g key={m.label}>
            <text x="195" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
            <rect x="205" y={y} width={w} height="20" rx="3" fill={m.color} opacity="0.6" />
            <text x={213 + w} y={y + 14} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{m.years} yr</text>
          </g>
        );
      })}
    </svg>
  );
}

export function FenceCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="IRC 2021 R301.5 (frost depth), AFA guidelines, and regional contractor bid data"
      />

      <h2>What does a fence actually cost?</h2>

      <p>
        Start with the number most people care about. A standard 200 linear foot wood privacy fence, professionally installed, costs between $4,500 and $7,000 in most US markets. That includes posts, rails, pickets, concrete for every post hole, one gate, and labor. The range is wide because labor rates in the Northeast run 40 to 60 percent higher than in the Southeast, and material prices swing with lumber futures.
      </p>

      <p>
        Do the work yourself and the total drops nearly in half. Materials for the same 200-foot fence run $2,200 to $3,000. The catch is 26 post holes, concrete in every one, and two to four full weekends of labor. Not complicated work. Just physically exhausting.
      </p>

      <Figure number={1} caption="Installed cost per linear foot varies from $10 for basic chain link to $100 for ornamental wrought iron. Pressure-treated wood privacy at $15-35/LF is the most common residential fence in the US.">
        <FenceCostSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Materials (200 LF wood)",values:["$2,200–3,000","$2,200–3,000"]},
          {label:"Post hole digging",values:["$0 (manual) or $200 (auger rental)","Included"]},
          {label:"Concrete (26 posts)",values:["$280","Included"]},
          {label:"Labor",values:["$0 (2–4 weekends)","$2,000–4,000"]},
          {label:"Total",values:[<strong key="d">$2,500–3,500</strong>,<strong key="p">$4,500–7,000</strong>]},
        ]}
        caption="Post hole digging is the hardest part of DIY fence installation. A power auger rental ($200/day) turns a 2-day job into a 4-hour job."
      />

      <MethodologyNote>
        <p>
          Post spacing follows American Fence Association residential guidelines (8 ft OC for wood/vinyl). Concrete per post is calculated from hole geometry using IRC R301.5 frost depth requirements. Cost data reflects 2026 installed pricing from HomeAdvisor, Angi, and Fixr regional databases. Material lifespan figures from manufacturer warranty terms and AFA longevity studies.
        </p>
      </MethodologyNote>

      <h2>Picking the right material</h2>

      <p>
        Material choice determines three things: what the fence looks like on day one, how much maintenance it needs, and when you replace it. Pressure-treated pine is the cheapest to install and the most expensive to own over 20 years because it needs staining or sealing every 2 to 3 years. Skip the stain and the wood grays, warps, and eventually rots where it meets the concrete.
      </p>

      <p>
        Cedar costs 20 to 30 percent more up front but resists rot naturally. It weathers to a silver gray that looks intentional rather than neglected. Many homeowners prefer the look of 5-year-old cedar to freshly stained pressure-treated pine.
      </p>

      <Figure number={2} caption="Maintenance is the hidden cost. Pressure-treated pine lasts 15 years with regular staining. Vinyl and aluminum need virtually nothing and outlast it by a decade or more.">
        <LifespanSVG />
      </Figure>

      <p>
        Vinyl panels click together, never need paint, never rot, and last 25 to 30 years. The tradeoff: they look like plastic, they crack in extreme cold, and wind can pop panels out of the track if posts are spaced too wide. Aluminum is the most durable residential option short of masonry. No rust, no paint, good wind handling. But at $25 to $55 per linear foot installed, it costs roughly double what wood does.
      </p>

      <ComparisonTable
        columns={[{title:"Wood (PT)"},{title:"Cedar"},{title:"Vinyl"},{title:"Aluminum"}]}
        rows={[
          {label:"Installed cost/LF",values:["$15–35","$20–40","$20–45","$25–55"]},
          {label:"Lifespan",values:["15 yr","20 yr","25–30 yr","40+ yr"]},
          {label:"Maintenance",values:["Stain every 2–3 yr","Seal or let gray","None","None"]},
          {label:"Wind resistance",values:["Good","Good","Fair","Excellent"]},
          {label:"DIY difficulty",values:["Moderate","Moderate","Easy (panels)","Hard"]},
        ]}
        caption="For most homeowners, pressure-treated wood is the practical choice. Cedar for natural beauty. Vinyl for zero maintenance."
      />

      <h2>Survey and permits: before you order anything</h2>

      <Scenario location="Kansas City, MO">
        A homeowner got two bids for a 220 LF wood privacy fence. Bid A quoted $4,800 with posts at 8 ft OC (28 posts). Bid B came in at $6,200 with posts at 6 ft OC (37 posts). He picked the cheaper bid. Two years later a windstorm pushed over a 40-foot section. The 8-foot spans acted like sails. Posts snapped at ground level where the concrete met the wood. Bid B&apos;s tighter spacing would have survived. In windy or exposed locations, 6-foot spacing costs 30 percent more up front and saves a $2,000 repair when the first big storm hits.
      </Scenario>

      <p>
        Two things to verify before buying a single board.
      </p>
      <p>
        First: your property line. Most jurisdictions require fences to sit 2 to 6 inches inside your property boundary. A fence built on the wrong side of the line belongs to your neighbor. If there is any uncertainty, get a professional survey. A $300 survey is far cheaper than ripping out a $5,000 fence.
      </p>
      <p>
        Second: your local fence code. Height limits vary. Back yard: 6 feet is standard, 8 feet sometimes allowed with a variance. Front yard: 4 feet is typical. Some HOAs restrict material and color in front-facing applications. Some jurisdictions require a building permit for any fence over 4 feet. Call your building department before you order materials. The number is on your county website and the call takes five minutes.
      </p>

      <h2>Post spacing and post holes</h2>

      <p>
        Post spacing determines how many posts you buy, how much concrete you pour, and how well the fence handles wind. Standard residential spacing is 8 feet on center for wood and vinyl. A 200-foot fence at that spacing has 26 posts (200 divided by 8, plus 1 for the end). Every corner, gate, and direction change adds an extra post regardless of spacing.
      </p>

      <Figure number={3} caption="8-foot spacing works for sheltered yards. Exposed locations, coastal areas, and regions with regular 40+ mph winds should use 6-foot spacing.">
        <PostSpacingSVG />
      </Figure>

      <Callout label="Gate posts take the most abuse">
        Gates carry their own weight, absorb daily open-close impact, and resist wind on the gate panel. Use 6×6 posts for gates instead of 4×4, dig 6 inches deeper, and add an extra bag of concrete. This $40 upgrade per gate prevents the most common fence repair: a sagging gate that drags on the ground.
      </Callout>

      <h2>Concrete for every post</h2>

      <p>
        Every post sits in a concrete footing. Hole diameter is typically 10 to 12 inches (about 3 times the post width). Depth depends on your frost line. Southern US: 18 to 24 inches. Midwest and Northeast: 36 inches. Minnesota, Montana, parts of Maine: 48 inches. Set the post shallower than the frost line and winter freeze-thaw will heave it out of the ground within two seasons.
      </p>

      <Figure number={4} caption="Standard 4×4 posts in 36-inch holes need 1.5 bags of 80-lb concrete each. Gate posts (6×6 in deeper holes) need 2 bags. A 200-foot fence uses about 39 bags total.">
        <ConcretePerPostSVG />
      </Figure>

      <p>
        The math for a 200-foot fence: 26 posts at 1.5 bags each is 39 bags of 80-lb mix. At $7.50 per bag, concrete for the entire fence costs about $290. Add 2 bags each for 2 gate posts and you are at 43 bags, roughly $320. Use the <a href="/concrete-calculator">concrete calculator</a> for exact per-hole volumes if your post size or hole depth differs.
      </p>

      <h2>Total project cost by yard size</h2>

      <Figure number={5} caption="Total installed cost scales linearly with length. A medium yard (200 LF) in wood runs about $5,000. The same yard in vinyl costs $6,400 but needs zero maintenance for 25 years.">
        <ProjectCostSVG />
      </Figure>

      <p>
        These numbers assume professional installation, a 6-foot privacy fence, one standard gate, and typical soil. Rocky soil increases post hole labor by 30 to 50 percent. Sloped yards require stepped or racked panels, adding 10 to 20 percent to material costs.
      </p>

      <h2>DIY logistics: what to rent, what to skip</h2>

      <p>
        The single most important rental for a DIY fence is a two-person power auger. Digging 26 post holes by hand with a clamshell digger takes two full days in good soil. The power auger does it in 3 to 4 hours. Rent it for one day ($200), dig all holes in the morning, set posts and pour concrete in the afternoon.
      </p>

      <p>
        Other tools you need: a string line to keep posts aligned, a 4-foot level, a speed square, a circular saw for cutting rails and pickets, and a drill with a framing bit. You probably own most of these already. The string line is the one people skip, and it determines whether the fence looks straight from the street. A wavy fence is structurally fine but visually terrible. Run the string between corner posts before setting intermediate ones, and align each post to it.
      </p>

      <p>
        What to skip: do not rent a trencher unless you are setting a bottom rail or concrete mow strip. And do not bother with premixed fence post concrete (the pour-dry-add-water type). Regular 80-lb bags mixed in a wheelbarrow are stronger, cheaper per bag, and set within 24 to 48 hours. The premixed products cost twice as much and set so fast you cannot adjust the post if it shifts.
      </p>

      <h2>Maintenance over 20 years</h2>

      <ComparisonTable
        columns={[{title:"Year 1"},{title:"Years 2–5"},{title:"Years 5–15"},{title:"Years 15+"}]}
        rows={[
          {label:"Pressure-treated",values:["Let cure 6 months, then stain","Re-stain every 2–3 yr","Check base for rot, replace boards","Full replacement likely"]},
          {label:"Cedar",values:["Seal or let weather","Re-seal every 3–5 yr (optional)","Boards gray, replace splits","Still solid if maintained"]},
          {label:"Vinyl",values:["Nothing","Hose off annually","Check posts for lean","Panels may yellow slightly"]},
          {label:"Aluminum",values:["Nothing","Nothing","Touch up scratches","Still like new"]},
        ]}
        caption="Staining alone costs $300-600 per application for a 200 LF fence. Over 15 years that adds $1,500-3,600 on top of the original install price."
      />

      <p>
        The real cost of a pressure-treated fence is not the $2,500 you spend on materials. It is the $300 to $600 you spend every two to three years on stain, brushes, and a weekend of your time. Over 15 years, maintenance on a PT fence costs $1,500 to $3,600 in stain alone, plus 6 to 8 lost weekends. Cedar cuts that schedule in half. Vinyl and aluminum cut it to near zero. The cheapest fence to install is often the most expensive fence to own.
      </p>
    </>
  );
}
