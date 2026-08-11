import type { GuideConfig } from "@/lib/guides-types";
import { GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function WasteFactorScaleSVG() {
  return (
    <svg viewBox="0 0 680 300" width="100%" height="auto" role="img" aria-label="Scale of typical construction waste factors from 5 percent for simple rectangular work up to 20 percent for diagonal tile and patterned wallpaper, with common materials placed along it">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factors, low to high, and what drives them up</text>

      {/* scale bar */}
      <rect x="16" y="46" width="162" height="30" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.ink} />
      <rect x="178" y="46" width="162" height="30" fill="#8FCBA8" stroke={GUIDE_SVG.ink} />
      <rect x="340" y="46" width="162" height="30" fill={GUIDE_SVG.slate} stroke={GUIDE_SVG.ink} />
      <rect x="502" y="46" width="162" height="30" fill={GUIDE_SVG.warm} stroke={GUIDE_SVG.ink} />
      <text x="97" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>5%</text>
      <text x="259" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>10%</text>
      <text x="421" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>15%</text>
      <text x="583" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">20%</text>

      <text x="97" y="96" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>simple, square</text>
      <text x="259" y="96" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>standard job</text>
      <text x="421" y="96" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>cut-heavy</text>
      <text x="583" y="96" textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>diagonal, patterned</text>

      {/* material placements */}
      <line x1="16" y1="120" x2="664" y2="120" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      {[
        ["Paint (2 coats, roller)", 55, "5%"],
        ["Concrete slab", 75, "5-10%"],
        ["Drywall, rectangular room", 100, "10%"],
        ["Laminate / vinyl plank", 155, "10%"],
        ["Roofing shingles, simple gable", 130, "10%"],
        ["Hardwood, straight lay", 180, "10%"],
        ["Tile, straight lay", 210, "10%"],
        ["Sod", 90, "5-10%"],
        ["Pavers, running bond", 200, "10%"],
        ["Deck boards, straight", 145, "10%"],
      ].map(([label, x, val], i) => {
        const row = i % 5;
        const col = i < 5 ? 0 : 1;
        return (
          <g key={i}>
            <text x={col === 0 ? 16 : 356} y={144 + row * 22} fontSize="12" fill={GUIDE_SVG.ink}>
              {label}
            </text>
            <text
              x={col === 0 ? 330 : 664}
              y={144 + row * 22}
              textAnchor="end"
              fontSize="12"
              fontWeight="600"
              fill={GUIDE_SVG.accent}
              fontFamily="monospace"
            >
              {val}
            </text>
          </g>
        );
      })}

      <line x1="16" y1="266" x2="664" y2="266" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="284" fontSize="11" fill={GUIDE_SVG.inkMuted}>Add 5 points for diagonal or herringbone layouts, patterned repeats, hips and valleys, or any room that is</text>
      <text x="16" y="298" fontSize="11" fill={GUIDE_SVG.inkMuted}>not a rectangle. Add another 5 for first-time DIY on a cut-heavy material.</text>
    </svg>
  );
}

function WasteFactorContent() {
  return (
    <>
      <GuideByline
        updated="July 29, 2026"
        reviewedAgainst="TCNA Handbook tile guidance, NWFA installation guidelines, ARMA and NRCA roofing practice, and APA panel construction data"
      />

      <h2>The short version</h2>

      <p>Order 10 percent extra for most materials. Order 15 percent for anything cut on a diagonal, anything with a pattern repeat, and any room that is not a rectangle. Order 5 percent for materials that do not get cut much: paint, concrete, bulk fill.</p>

      <p>That covers most jobs. The table below is the version to use when the job is not most jobs, and it is the one to cite when you need a number with a reason behind it rather than a rule of thumb someone repeated on a forum.</p>

      <figure>
        <WasteFactorScaleSVG />
        <figcaption>Figure 1. Where common materials sit on the waste scale, and the two conditions that push any of them higher.</figcaption>
      </figure>

      <MethodologyNote>
        <p>These figures reflect published trade-association installation guidance and common contractor practice for residential work. Tile percentages follow TCNA Handbook practice; wood flooring follows NWFA guidance on cutting and grading allowance; roofing follows ARMA and NRCA practice for starter, hip, and ridge cuts. Percentages are applied to net measured area, not to a rounded-up purchase quantity, and they cover cutting waste and defects, not breakage in transit or future repairs.</p>
      </MethodologyNote>

      <h2>Waste factors by material</h2>

      <ComparisonTable
        columns={[{ title: "Standard" }, { title: "Complex layout" }, { title: "Why" }]}
        rows={[
          { label: "Interior paint", values: ["5%", "10%", "Touch-ups and a second color cut-in"] },
          { label: "Drywall", values: ["10%", "15%", "Sheet ends, openings, ceiling cuts"] },
          { label: "Tile, straight lay", values: ["10%", "15%", "Perimeter cuts and breakage"] },
          { label: "Tile, diagonal or herringbone", values: ["15%", "20%", "Every perimeter piece is a cut"] },
          { label: "Mosaic and small format", values: ["15%", "20%", "Sheet cuts waste more area"] },
          { label: "Hardwood, straight lay", values: ["10%", "15%", "End cuts plus grading allowance"] },
          { label: "Hardwood, diagonal", values: ["15%", "20%", "Angle cuts at every wall"] },
          { label: "Laminate and vinyl plank", values: ["10%", "15%", "Stagger pattern discards short ends"] },
          { label: "Carpet", values: ["10%", "20%", "Roll width forces seam planning"] },
          { label: "Roofing, simple gable", values: ["10%", "12%", "Starter, ridge, and rake cuts"] },
          { label: "Roofing, hips and valleys", values: ["15%", "20%", "Every hip and valley is a cut line"] },
          { label: "Siding", values: ["10%", "15%", "Corners, windows, and course starts"] },
          { label: "Concrete", values: ["5%", "10%", "Subgrade variation and spillage"] },
          { label: "Pavers, running bond", values: ["10%", "15%", "Perimeter and border cuts"] },
          { label: "Pavers, herringbone", values: ["15%", "20%", "45-degree cuts on all edges"] },
          { label: "Deck boards", values: ["10%", "15%", "Picture frame and angled sections"] },
          { label: "Framing lumber", values: ["10%", "15%", "Cull rate plus cut waste"] },
          { label: "Insulation batts", values: ["5%", "10%", "Compression and cavity trimming"] },
          { label: "Wallpaper, no repeat", values: ["10%", "15%", "Drop matching at ceiling and floor"] },
          { label: "Wallpaper, large repeat", values: ["20%", "30%", "Each drop wastes up to a full repeat"] },
          { label: "Sod", values: ["5%", "10%", "Curved bed edges force cuts"] },
          { label: "Mulch and gravel", values: ["5%", "10%", "Settling and spread variance"] },
        ]}
        caption="Standard means a rectangular area with straight edges. Complex means diagonal or patterned layout, an irregular room, or numerous obstacles. Apply the percentage to net measured area."
      />

      <Callout label="Cite this table">
        These figures are free to reference with attribution to Tallyard. Every calculator on this site applies the same numbers, and each one shows the formula it used, so a reader can check the arithmetic rather than trusting it.
      </Callout>

      <h2>What the percentage actually pays for</h2>

      <p>Three separate things hide inside a waste factor, and knowing which one dominates tells you whether to round up or down within the range.</p>

      <p>Cutting waste is the biggest and the most predictable. Every piece that meets a wall gets cut, and the offcut is usually too short to use elsewhere. This is why the percentage scales with perimeter rather than area: a long narrow hallway wastes far more per square foot than an open room of the same size, and a diagonal layout wastes more than either because it turns every straight edge into an angle.</p>

      <p>Defect and grading allowance is next, and it applies mostly to natural materials. A bundle of hardwood carries boards with knots, splits, or color that will not blend, and NWFA guidance treats a small percentage as normal and expected rather than a claim against the supplier. Lumber has the same issue in a cruder form: pull a cart of studs and a few will be crooked enough to reject.</p>

      <p>Breakage is last and smallest, but concentrated in brittle materials. Tile chips at the corners, especially large-format and thin porcelain, and it happens during the cut as often as during transport. The <a href="/tile-calculator">tile calculator</a> applies the TCNA-based percentage before converting to boxes, which is where breakage allowance has to land to be useful.</p>

      <h2>When to go above the table</h2>

      <p>Push higher for a discontinued or dye-lot-sensitive material, because in that case the risk is not wasted money but a job you cannot finish in matching material. Tile, wallpaper, and carpet all have lot numbers. Buying short and returning later means a visible seam between lots.</p>

      <p>Push higher for a first-time installation of a cut-heavy material. Professional waste factors assume professional cutting, and the difference between a tile setter's offcut pile and a first-timer's is real. Adding five points to a first tile job is cheaper than a second trip and a second delivery fee.</p>

      <p>Push higher when the shortfall would stop the job. A pallet of pavers arriving three days late is an inconvenience; a truck of concrete arriving short is a cold joint in a slab you cannot un-pour. Materials that must be placed in one continuous operation deserve the top of their range every time, which is why the <a href="/concrete-calculator">concrete calculator</a> defaults to the high end of the range rather than the middle.</p>

      <h2>When to go below it</h2>

      <p>Drop toward the low end when returns are easy and local. If the supplier takes back full unopened boxes and is fifteen minutes away, buying tight and topping up costs a trip rather than money. Big-box flooring and tile usually qualify. Special-order material almost never does.</p>

      <p>Drop when the layout is genuinely simple and you have measured carefully rather than estimated. A perfectly rectangular room with two doorways and a straight-lay plank floor is the case the 10 percent figure was built for, and careful measurement can justify 8.</p>

      <p>What does not justify dropping the percentage: a tight budget. Running short mid-install costs a return trip, a possible dye-lot mismatch, and sometimes a partially completed floor sitting exposed over a weekend. The waste factor is the cheapest insurance in the project.</p>

      <h2>Applying it correctly</h2>

      <p>Apply the percentage to net measured area, then round up to whole purchase units. Both steps in that order. A 240 square foot floor at 10 percent is 264 square feet, which at 22.5 square feet per box is 11.7 boxes, so 12 boxes. Rounding to boxes first and adding waste after quietly changes the answer, usually downward. The <a href="/flooring-calculator">flooring calculator</a> runs that sequence for you and shows both numbers, so you can see what the waste factor actually bought.</p>

      <p>Do not stack waste factors. If a calculator already applies one, adding your own on top double-counts, and on a large job that is real money sitting in a garage. Every Tallyard calculator states the waste factor it used in the receipt, so you can see whether it is already in the number.</p>

      <p>And subtract only the openings that matter. Standard practice deducts windows and doors from wall area for drywall and siding, but not from paint, where the trim work around an opening consumes what the opening saved. Deducting everything on every trade is the most common way estimates come in short.</p>
    </>
  );
}

export const wasteFactorGuide: GuideConfig = {
  slug: "waste-factor-reference",
  title: "Construction Waste Factor Reference: Every Material, One Table",
  description:
    "Waste factor percentages for tile, flooring, drywall, roofing, siding, concrete, and more, with the reason behind each number and when to go higher or lower.",
  bannerHeadline: "Order extra, exactly.",
  bannerTags: ["22 materials", "Standard and complex", "Free to cite"],
  categoryLabel: "Reference",
  category: "concrete",
  heroValue: "10%",
  publishedAt: "2026-07-29",
  readTime: "8 min read",
  verdict:
    "Order 10 percent extra for most materials, 15 percent for diagonal layouts, patterned repeats, or irregular rooms, and 5 percent for materials that are not cut much such as paint, concrete, and bulk fill.",
  Content: WasteFactorContent,

  faq: [
    {
      question: "What is a waste factor in construction?",
      answer:
        "A waste factor is the extra material ordered above the measured area to cover cutting waste, defective pieces, and breakage. It is expressed as a percentage of net measured area: a 10 percent waste factor on 200 square feet means ordering 220 square feet.",
    },
    {
      question: "How much waste factor should I add for tile?",
      answer:
        "10 percent for a straight lay in a rectangular room, 15 percent for diagonal or herringbone patterns, and 15-20 percent for mosaic and small-format tile. Add 5 points on top for a first-time DIY installation, since professional figures assume professional cutting.",
    },
    {
      question: "What waste factor should I use for flooring?",
      answer:
        "10 percent for straight-lay hardwood, laminate, or vinyl plank in a rectangular room. 15 percent for diagonal layouts, irregular rooms, or lots of closets and doorways. Hardwood's figure includes a grading allowance for boards rejected on color or defects, which NWFA guidance treats as normal.",
    },
    {
      question: "Is 10 percent waste enough for roofing?",
      answer:
        "For a simple gable roof, yes: 10 percent covers starter course, ridge caps, and rake cuts. Roofs with hips and valleys need 15 percent, and complex roofs with multiple planes, dormers, and valleys need up to 20 percent, because every hip and valley is a full cut line.",
    },
    {
      question: "Do I apply waste factor before or after rounding to boxes?",
      answer:
        "Before. Apply the percentage to net measured area, then round up to whole boxes, bundles, or pallets. Rounding first and adding waste after produces a smaller number and is a common source of short orders.",
    },
    {
      question: "Should I subtract windows and doors before adding waste?",
      answer:
        "For drywall and siding, yes: standard practice deducts openings from wall area. For paint, no: the cutting-in and trim work around an opening consumes roughly what the opening saved. Deducting openings on every trade is a frequent cause of underestimates.",
    },
  ],

  sources: [
    {
      name: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation",
      url: "https://www.tcnatile.com/products/tcna-handbook/",
      note: "Industry reference behind the tile cutting allowances",
    },
    {
      name: "NWFA Installation Guidelines",
      url: "https://nwfa.org/publications/",
      note: "Wood flooring guidance including grading and cutting allowance",
    },
    {
      name: "NRCA Roofing Manual",
      url: "https://www.nrca.net/store/technical-manuals",
      note: "Roofing practice for starter, hip, valley, and ridge material",
    },
    {
      name: "ARMA Asphalt Roofing Residential Manual",
      url: "https://www.asphaltroofing.org/technical-resources/",
      note: "Asphalt shingle application and coverage practice",
    },
    {
      name: "APA Engineered Wood Construction Guide",
      url: "https://www.apawood.org/publication-search",
      note: "Panel layout and cutting practice for sheathing and subfloor",
    },
  ],

  relatedCalculators: [
    { name: "Tile calculator", slug: "tile-calculator", description: "Boxes of tile with waste applied and shown" },
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Square footage, waste, and installation cost" },
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Squares of shingles for any roof pitch" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets, mud, tape, and screws" },
  ],

  relatedGuides: [
    {
      name: "Residential code limits reference",
      slug: "residential-code-limits-reference",
      description: "IRC dimensional limits with sections cited",
      type: "guide",
    },
    {
      name: "Composite vs pressure-treated vs cedar decking",
      slug: "composite-vs-pressure-treated-vs-cedar-deck",
      description: "Decking material comparison",
      type: "guide",
    },
  ],
};
