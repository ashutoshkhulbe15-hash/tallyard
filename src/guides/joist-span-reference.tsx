import type { GuideConfig } from "@/lib/guides-types";
import { GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SpanVariablesSVG() {
  return (
    <svg viewBox="0 0 680 340" width="100%" height="auto" role="img" aria-label="Diagram showing the five variables that set a joist span: depth, spacing, species and grade, load, and deflection limit, with a joist drawn between two bearing walls">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Five things set a span. Change any one and the answer changes.</text>

      {/* bearing walls */}
      <rect x="40" y="120" width="26" height="90" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <rect x="374" y="120" width="26" height="90" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.ink} strokeWidth="1.5" />

      {/* joist with deflection curve */}
      <path d="M 66 120 Q 220 140 374 120" fill="none" stroke={GUIDE_SVG.ink} strokeWidth="2" />
      <path d="M 66 132 Q 220 152 374 132" fill="none" stroke={GUIDE_SVG.ink} strokeWidth="2" />
      <line x1="66" y1="120" x2="66" y2="132" stroke={GUIDE_SVG.ink} strokeWidth="2" />
      <line x1="374" y1="120" x2="374" y2="132" stroke={GUIDE_SVG.ink} strokeWidth="2" />

      {/* load arrows */}
      {[110, 160, 220, 280, 330].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="70" x2={x} y2="106" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
          <path d={`M ${x - 4} 100 L ${x} 108 L ${x + 4} 100`} fill="none" stroke={GUIDE_SVG.warm} strokeWidth="1.5" />
        </g>
      ))}
      <text x="220" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.warm}>load (live + dead, in psf)</text>

      {/* span dimension */}
      <line x1="66" y1="238" x2="374" y2="238" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="66" y1="232" x2="66" y2="244" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="374" y1="232" x2="374" y2="244" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="220" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.accent}>clear span, face of support to face of support</text>

      {/* deflection callout */}
      <line x1="220" y1="146" x2="300" y2="196" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="304" y="200" fontSize="11" fill={GUIDE_SVG.inkMuted}>deflection limit L/360: a 12 ft span may sag 0.4&#8243;</text>

      {/* variable list */}
      <text x="430" y="120" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>1. Depth</text>
      <text x="430" y="136" fontSize="11" fill={GUIDE_SVG.inkMuted}>2x10 spans far more than 2x8</text>
      <text x="430" y="160" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>2. Spacing</text>
      <text x="430" y="176" fontSize="11" fill={GUIDE_SVG.inkMuted}>16&#8243; o.c. vs 24&#8243; o.c.</text>
      <text x="430" y="200" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>3. Species and grade</text>
      <text x="430" y="216" fontSize="11" fill={GUIDE_SVG.inkMuted}>SYP &gt; DF-L &gt; SPF &gt; Hem-Fir</text>
      <text x="430" y="240" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>4. Load</text>
      <text x="430" y="256" fontSize="11" fill={GUIDE_SVG.inkMuted}>40 psf living, 30 psf sleeping</text>
      <text x="430" y="280" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>5. Deflection limit</text>
      <text x="430" y="296" fontSize="11" fill={GUIDE_SVG.inkMuted}>L/360 floors, L/240 many roofs</text>

      <line x1="16" y1="312" x2="664" y2="312" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="330" fontSize="11" fill={GUIDE_SVG.inkMuted}>A span figure quoted without all five of these is not a span figure. It is a guess.</text>
    </svg>
  );
}

function SpanContent() {
  return (
    <>
      <GuideByline
        updated="July 29, 2026"
        reviewedAgainst="AWC Span Calculator and Wood Frame Construction Manual, IRC Chapter 5 floor framing provisions, and AWC DCA 6 deck construction guidance"
      />

      <h2>How to use this page</h2>

      <p>Span tables are published by the American Wood Council and adopted into the IRC. They are the authority, they are free to read, and they are linked below. What this page does is different: it explains what drives a span, gives conservative planning figures for the handful of cases that come up constantly, and points you at the real table before you buy lumber.</p>

      <p>Read the numbers here as a sanity check, not as a substitute. Every figure below is rounded down from the published values, so a joist that works here works in the table. The reverse is not guaranteed.</p>

      <figure>
        <SpanVariablesSVG />
        <figcaption>Figure 1. The five inputs behind every span number. Quoting a span without stating species, grade, spacing, and load is how bad advice spreads on forums.</figcaption>
      </figure>

      <MethodologyNote>
        <p>Planning figures below are conservative roundings drawn from AWC span calculator output for common residential cases, at L/360 deflection for floors and standard 10 psf dead load. They are provided as a planning aid, not as a reproduction of the published tables. For the values that govern a permit application, use the AWC Span Calculator or the span tables in IRC Chapter 5 as adopted by your jurisdiction, both linked in the sources. Engineered lumber (LVL, LSL, I-joists) is not covered by these tables at all; use the manufacturer&apos;s span charts.</p>
      </MethodologyNote>

      <h2>Floor joists: conservative planning spans</h2>

      <p>Residential floor framing, 40 psf live load (general living areas), 16 inches on center, L/360 deflection, No. 2 grade. Round down, verify before buying.</p>

      <ComparisonTable
        columns={[{ title: "SPF No. 2" }, { title: "Hem-Fir No. 2" }, { title: "SYP No. 2" }]}
        rows={[
          { label: "2x6", values: ["~8 ft", "~8 ft", "~9 ft"] },
          { label: "2x8", values: ["~11 ft", "~11 ft", "~12 ft"] },
          { label: "2x10", values: ["~14 ft", "~14 ft", "~15 ft"] },
          { label: "2x12", values: ["~16 ft", "~16 ft", "~18 ft"] },
        ]}
        caption="Rounded down from AWC span calculator output at 16 in on center, 40 psf live, 10 psf dead, L/360. Going to 24 in on center costs roughly 15 percent of span; dropping to 30 psf live (bedrooms) gains roughly 10 percent."
      />

      <p>The pattern worth internalizing is that depth beats everything. Doubling the number of joists by halving the spacing buys about 15 percent. Going from a 2x8 to a 2x10 buys about 30 percent, for less lumber than doubling up. When a floor is bouncy or a span is short, the answer is almost always deeper joists rather than more of them.</p>

      <h2>Deck joists and beams</h2>

      <p>Deck framing follows AWC DCA 6, not the interior floor tables, because the loads and the wood are different: 40 psf live plus 10 psf dead, pressure-treated southern pine or equivalent, wet-service conditions.</p>

      <ComparisonTable
        columns={[{ title: "12 in o.c." }, { title: "16 in o.c." }, { title: "24 in o.c." }]}
        rows={[
          { label: "2x6 joist", values: ["~9 ft", "~8 ft", "~7 ft"] },
          { label: "2x8 joist", values: ["~12 ft", "~11 ft", "~9 ft"] },
          { label: "2x10 joist", values: ["~15 ft", "~14 ft", "~11 ft"] },
          { label: "2x12 joist", values: ["~18 ft", "~16 ft", "~13 ft"] },
        ]}
        caption="Conservative planning figures for pressure-treated southern pine deck joists under DCA 6 conditions. Cantilevers beyond the beam are limited to roughly a quarter of the backspan, and DCA 6 caps them by joist size."
      />

      <p>Two deck-specific traps. First, the span is measured to the face of the beam, not to the end of the joist, so a cantilevered joist has a backspan and an overhang and both are limited. Second, composite decking often requires tighter joist spacing than the joists themselves need: many brands specify 16 inches on center for straight lay and 12 inches for a 45 degree lay, and stair treads tighter still. That requirement comes from the decking manufacturer, and it overrides the joist table. The <a href="/deck-calculator">deck calculator</a> counts joists at whatever spacing the decking demands, which is the number that actually goes on the order.</p>

      <h2>Headers over openings</h2>

      <p>Headers carry whatever sits above them, so the span depends on how many floors and roofs are stacking load onto that wall, and whether it is a bearing wall at all. That makes single-number rules of thumb unusually dangerous here.</p>

      <ComparisonTable
        columns={[{ title: "Non-bearing wall" }, { title: "Bearing, roof only" }, { title: "Bearing, floor + roof" }]}
        rows={[
          { label: "Doubled 2x6", values: ["~5 ft", "~4 ft", "~3 ft"] },
          { label: "Doubled 2x8", values: ["~7 ft", "~5 ft", "~4 ft"] },
          { label: "Doubled 2x10", values: ["~8 ft", "~6 ft", "~5 ft"] },
          { label: "Doubled 2x12", values: ["~9 ft", "~7 ft", "~6 ft"] },
        ]}
        caption="Deliberately conservative planning figures only. Header sizing depends on building width, snow load, and the number of stories above, and the IRC header tables are keyed to all three. Anything structural or marginal gets checked against the real table or an engineer."
      />

      <Callout label="When to stop using tables">
        Tables cover repetitive, conventional framing. They stop applying when you have point loads (a post landing mid-span), an unusual roof geometry concentrating load, heavy finishes like stone or a tile floor over a wood frame, or a removed bearing wall. Those cases want an engineer, and the fee is small next to the cost of being wrong.
      </Callout>

      <h2>Notching and boring: the rules that void a span</h2>

      <p>A correctly sized joist can be ruined by a plumber. The IRC sets limits on what can be cut out of dimensional lumber, and they exist because a notch in the wrong place removes exactly the fibers doing the work.</p>

      <ComparisonTable
        columns={[{ title: "Limit" }]}
        rows={[
          { label: "Holes in joists, maximum diameter", values: ["1/3 of joist depth"] },
          { label: "Holes, minimum distance from edges", values: ["2 in"] },
          { label: "Notches at ends of joists", values: ["1/4 of depth max"] },
          { label: "Notches elsewhere, depth", values: ["1/6 of depth max"] },
          { label: "Notches in the middle third of span", values: ["Not permitted"] },
          { label: "Notch length limit", values: ["1/3 of joist depth"] },
        ]}
        caption="IRC R502.8.1 for sawn lumber joists. Engineered I-joists have entirely different and stricter rules set by the manufacturer, and a notched I-joist flange is usually unrepairable."
      />

      <p>The practical version: bore holes near the middle of the depth and near the middle of the span, never notch the bottom edge anywhere in the middle third, and keep away from the top and bottom two inches. When a run has to cross joists in a bad place, the answer is a soffit or a rerouted line, not a bigger hole. Sizing that rerouted line is the <a href="/drain-pipe-calculator">drain pipe calculator</a>&apos;s job, since a larger pipe needs a deeper joist bay to keep its slope.</p>

      <h2>Reading a real span table</h2>

      <p>When you go to the AWC calculator or the IRC tables, four inputs decide the answer, and getting any of them wrong invalidates the result. Species and grade come off the grade stamp on the lumber itself, not off the shelf tag. Spacing is on-center, not clear distance. Live load is 40 psf for general living areas and 30 psf for sleeping rooms, which is why a bedroom floor can span slightly further than a living room floor of identical framing. And deflection is L/360 for floors with a plaster or drywall ceiling below, which is the case for most residential work.</p>

      <p>Clear span is measured face of support to face of support, not stud to stud and not overall joist length. A 16 foot joist bearing 3 inches on each end has a clear span of about 15 feet 6 inches, and the table asks for the latter. People routinely check the wrong number and end up a size short. Once the size is settled, the <a href="/lumber-calculator">lumber calculator</a> converts the joist schedule into board feet and a delivered price.</p>

      <p>Finally, grade stamps matter more than people expect. Two 2x10s from the same aisle can carry different design values if one is No. 2 and the other Stud grade or a different species group. When the span is anywhere near the limit, buy the whole run from the same lift and read the stamp.</p>
    </>
  );
}

export const spanReferenceGuide: GuideConfig = {
  slug: "joist-span-reference",
  title: "Joist Span Reference: Floor, Deck, and Header Planning Spans",
  description:
    "Conservative planning spans for floor joists, deck joists, and headers, plus the five variables that set any span and the IRC notching limits that void one.",
  bannerHeadline: "Span it safely.",
  bannerTags: ["Floor and deck joists", "Notch and bore limits", "AWC sourced"],
  categoryLabel: "Reference",
  category: "landscaping",
  heroValue: "2x10",
  publishedAt: "2026-07-29",
  readTime: "8 min read",
  verdict:
    "As a conservative planning figure, a No. 2 grade 2x8 floor joist at 16 inches on center spans about 11 feet, a 2x10 about 14 feet, and a 2x12 about 16 feet under a 40 psf live load, but species, grade, spacing, load, and deflection limit all change the answer, so verify against the AWC span calculator before buying.",
  Content: SpanContent,

  faq: [
    {
      question: "How far can a 2x8 floor joist span?",
      answer:
        "About 11 feet as a conservative planning figure: No. 2 grade SPF or Hem-Fir at 16 inches on center, 40 psf live load, L/360 deflection. Southern yellow pine gains roughly a foot. Bedrooms at 30 psf gain a little more, and 24 inch spacing loses roughly 15 percent. Verify against the AWC span calculator before ordering.",
    },
    {
      question: "How far can a 2x10 joist span?",
      answer:
        "Roughly 14 feet for No. 2 SPF or Hem-Fir at 16 inches on center under a 40 psf live load, and about 15 feet for southern yellow pine. Deck joists in pressure-treated southern pine span similarly at 16 inches on center under DCA 6, but cantilever limits apply beyond the beam.",
    },
    {
      question: "What are the five things that change a span?",
      answer:
        "Joist depth, spacing on center, species and grade, the load it carries (live plus dead), and the deflection limit. A span figure quoted without all five is meaningless. Depth has the largest effect: going from a 2x8 to a 2x10 buys about 30 percent more span, while halving the spacing buys about 15 percent.",
    },
    {
      question: "Can I drill holes in a floor joist?",
      answer:
        "Yes, within limits. Under IRC R502.8.1, holes in sawn lumber joists can be up to one third of the joist depth and must stay at least 2 inches from the top and bottom edges. Notches are limited to one sixth of depth, one quarter at the ends, and are not permitted at all in the middle third of the span. Engineered I-joists follow the manufacturer's stricter rules.",
    },
    {
      question: "Do deck joists use the same span table as floor joists?",
      answer:
        "No. Deck framing follows AWC DCA 6, which accounts for wet-service conditions and pressure-treated lumber. Deck spans also have cantilever limits beyond the beam, and composite decking often requires tighter joist spacing than the joists themselves need, which is a manufacturer requirement that overrides the span table.",
    },
    {
      question: "When do I need an engineer instead of a span table?",
      answer:
        "When there are point loads landing mid-span, unusual roof geometry concentrating load, heavy finishes such as stone or tile over wood framing, or any removed bearing wall. Span tables assume repetitive conventional framing; outside that, they do not apply.",
    },
  ],

  sources: [
    {
      name: "AWC Span Calculator",
      url: "https://awc.org/codes-standards/calculators-software/spancalc/",
      note: "The free official tool that produces the governing span values for sawn lumber",
    },
    {
      name: "AWC Wood Frame Construction Manual",
      url: "https://awc.org/publications/wfcm/",
      note: "Published basis for the IRC span and header tables",
    },
    {
      name: "AWC DCA 6 Prescriptive Residential Deck Construction Guide",
      url: "https://awc.org/publications/dca6/",
      note: "Deck joist, beam, and cantilever spans, free to download",
    },
    {
      name: "IRC Chapter 5, Floors (ICC Digital Codes)",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-5-floors",
      note: "Adopted span tables and the R502.8 notching and boring limits",
    },
  ],

  relatedCalculators: [
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for a framing order" },
    { name: "Deck calculator", slug: "deck-calculator", description: "Joists, boards, and fasteners for a deck" },
    { name: "Stud spacing calculator", slug: "stud-spacing-calculator", description: "Wall framing layout and counts" },
    { name: "Deck stair calculator", slug: "deck-stair-calculator", description: "Stringer layout with code checks" },
  ],

  relatedGuides: [
    {
      name: "Residential code limits reference",
      slug: "residential-code-limits-reference",
      description: "IRC dimensional limits with sections cited",
      type: "guide",
    },
    {
      name: "Construction waste factor reference",
      slug: "waste-factor-reference",
      description: "Waste percentages for every material",
      type: "guide",
    },
  ],
};
