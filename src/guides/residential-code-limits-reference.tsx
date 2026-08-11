import type { GuideConfig } from "@/lib/guides-types";
import { GuideByline, MethodologyNote, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function CodeLimitsSVG() {
  return (
    <svg viewBox="0 0 680 320" width="100%" height="auto" role="img" aria-label="The most-checked residential code limits: stair riser 7 and 3 quarter inches maximum, tread 10 inches minimum, guard height 36 inches, guards required above 30 inches, egress opening 5.7 square feet, ceiling height 7 feet">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The six numbers inspectors check most (2021 IRC)</text>

      {[
        ["7-3/4\u2033", "max stair riser", "R311.7.5.1"],
        ["10\u2033", "min tread depth", "R311.7.5.2"],
        ["36\u2033", "min guard height", "R312.1.2"],
        ["30\u2033", "guards required above", "R312.1.1"],
        ["5.7 sq ft", "min egress opening", "R310.2.1"],
        ["7 ft", "min ceiling height", "R305.1"],
      ].map(([val, label, sec], i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 16 + col * 220;
        const y = 46 + row * 108;
        return (
          <g key={i}>
            <rect x={x} y={y} width="204" height="88" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
            <text x={x + 102} y={y + 38} textAnchor="middle" fontSize="26" fontWeight="700" fill={GUIDE_SVG.accent}>{val}</text>
            <text x={x + 102} y={y + 58} textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>{label}</text>
            <text x={x + 102} y={y + 76} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={GUIDE_SVG.inkMuted}>{sec}</text>
          </g>
        );
      })}

      <line x1="16" y1="284" x2="664" y2="284" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="302" fontSize="11" fill={GUIDE_SVG.inkMuted}>Figures are the 2021 IRC, the edition most US jurisdictions currently enforce. Local amendments can be</text>
      <text x="16" y="316" fontSize="11" fill={GUIDE_SVG.inkMuted}>stricter, and a few states amend these numbers outright. Confirm with your building department.</text>
    </svg>
  );
}

function CodeLimitsContent() {
  return (
    <>
      <GuideByline
        updated="July 29, 2026"
        reviewedAgainst="2021 International Residential Code, Chapters 3 and 8, as published by the International Code Council"
      />

      <h2>What this is</h2>

      <p>The residential code numbers that come up constantly, in one place, each with the section it comes from. Not the code itself, which runs to hundreds of pages, but the dimensional limits a homeowner or builder actually hits: stairs, guards, handrails, egress, ceilings, landings, attic access.</p>

      <p>Every figure here is the 2021 IRC, and every one cites its section so you can check it against the source rather than trusting this page. That matters more than usual with code, because a number without a section number is a rumor.</p>

      <figure>
        <CodeLimitsSVG />
        <figcaption>Figure 1. The limits that generate the most failed inspections in residential work.</figcaption>
      </figure>

      <MethodologyNote>
        <p>All figures are from the 2021 International Residential Code unless noted. The IRC is a model code: it has legal force only where a state or local jurisdiction adopts it, and jurisdictions routinely amend individual sections. Pennsylvania, for example, amends the maximum riser height upward. This page is a reference for the model code, not a substitute for your local amendments.</p>
      </MethodologyNote>

      <h2>Stairs (R311.7)</h2>

      <ComparisonTable
        columns={[{ title: "Limit" }, { title: "Section" }]}
        rows={[
          { label: "Maximum riser height", values: ["7-3/4 in", "R311.7.5.1"] },
          { label: "Minimum tread depth", values: ["10 in", "R311.7.5.2"] },
          { label: "Riser variation within a flight", values: ["3/8 in max", "R311.7.5.1"] },
          { label: "Tread variation within a flight", values: ["3/8 in max", "R311.7.5.2"] },
          { label: "Minimum clear width above handrail", values: ["36 in", "R311.7.1"] },
          { label: "Clear width with one handrail", values: ["31-1/2 in", "R311.7.1"] },
          { label: "Clear width with two handrails", values: ["27 in", "R311.7.1"] },
          { label: "Minimum headroom", values: ["6 ft 8 in", "R311.7.2"] },
          { label: "Maximum vertical rise per flight", values: ["12 ft 7 in", "R311.7.3"] },
          { label: "Nosing projection, treads under 11 in", values: ["3/4 to 1-1/4 in", "R311.7.5.3"] },
          { label: "Landing depth, direction of travel", values: ["36 in min", "R311.7.6"] },
          { label: "Open riser opening", values: ["No 4 in sphere", "R311.7.5.1"] },
          { label: "Spiral stair minimum width", values: ["26 in", "R311.7.10.1"] },
          { label: "Spiral stair maximum riser", values: ["9-1/2 in", "R311.7.10.1"] },
        ]}
        caption="The 3/8 inch variation rule is the single most commonly failed stair requirement, and it usually traces back to a total rise measured before finish flooring went down."
      />

      <Callout label="The 2024 edition changes the stair numbers">
        The 2024 IRC raises the maximum riser to 8-1/4 inches and lowers the minimum tread to 9 inches, the first change to residential stair geometry in decades. Very few jurisdictions enforce it yet: adoption typically lags publication by two to five years, and most of the country is still on the 2021 or 2018 edition. Build to whatever edition your jurisdiction has adopted, and if in doubt, build to the tighter 2021 numbers, which pass under both.
      </Callout>

      <p>Riser geometry is the limit most flights miss, and it is missed by fractions rather than inches. The <a href="/stair-calculator">stair calculator</a> holds every riser identical and flags the 3/8 inch variation limit; deck flights run through the <a href="/deck-stair-calculator">deck stair calculator</a>, which applies the same R311.7 checks to an outdoor stringer.</p>

      <h2>Guards and handrails (R311.7.8, R312)</h2>

      <ComparisonTable
        columns={[{ title: "Limit" }, { title: "Section" }]}
        rows={[
          { label: "Guards required above", values: ["30 in drop", "R312.1.1"] },
          { label: "Minimum guard height", values: ["36 in", "R312.1.2"] },
          { label: "Guard opening limit", values: ["No 4 in sphere", "R312.1.3"] },
          { label: "Triangular opening at stair treads", values: ["No 6 in sphere", "R312.1.3"] },
          { label: "Handrail required at", values: ["4 or more risers", "R311.7.8"] },
          { label: "Handrail height above nosing", values: ["34 to 38 in", "R311.7.8.1"] },
          { label: "Circular handrail diameter", values: ["1-1/4 to 2 in", "R311.7.8.5"] },
          { label: "Non-circular handrail perimeter", values: ["4 to 6-1/4 in", "R311.7.8.5"] },
          { label: "Handrail projection into stair width", values: ["4-1/2 in max each side", "R311.7.1"] },
        ]}
        caption="Graspability is why a flat 2x4 laid on edge fails as a handrail in most jurisdictions: it exceeds the maximum cross-section dimension."
      />

      <h2>Emergency escape openings (R310)</h2>

      <ComparisonTable
        columns={[{ title: "Limit" }, { title: "Section" }]}
        rows={[
          { label: "Minimum net clear opening", values: ["5.7 sq ft", "R310.2.1"] },
          { label: "Grade-floor opening", values: ["5.0 sq ft", "R310.2.1"] },
          { label: "Minimum clear width", values: ["20 in", "R310.2.1"] },
          { label: "Minimum clear height", values: ["24 in", "R310.2.1"] },
          { label: "Maximum sill height above floor", values: ["44 in", "R310.2.2"] },
          { label: "Window well floor area", values: ["9 sq ft", "R310.2.3"] },
          { label: "Window well projection", values: ["36 in", "R310.2.3"] },
          { label: "Ladder required when well is deeper than", values: ["44 in", "R310.2.3.1"] },
        ]}
        caption="Required in every sleeping room and in basements with habitable space. The dimensional minimums do not multiply to a passing opening: 20 by 24 inches is only 3.3 square feet."
      />

      <p>That last point catches people mid-remodel, because a window can satisfy every individual minimum and still fail the area requirement. The <a href="/egress-window-calculator">egress window calculator</a> checks a proposed opening against all four R310 limits at once and tells you which one it misses.</p>

      <h2>Rooms, ceilings, and access</h2>

      <ComparisonTable
        columns={[{ title: "Limit" }, { title: "Section" }]}
        rows={[
          { label: "Minimum ceiling height, habitable rooms", values: ["7 ft", "R305.1"] },
          { label: "Minimum ceiling height, basements without habitable space", values: ["6 ft 8 in", "R305.1.1"] },
          { label: "Minimum hallway width", values: ["36 in", "R311.6"] },
          { label: "Egress door minimum size", values: ["32 in wide, 78 in tall", "R311.2"] },
          { label: "Landing at doors, depth", values: ["36 in", "R311.3"] },
          { label: "Attic access opening", values: ["22 by 30 in", "R807.1"] },
          { label: "Attic access headroom above opening", values: ["30 in", "R807.1"] },
          { label: "Attic ventilation ratio", values: ["1:150, or 1:300 balanced", "R806.2"] },
          { label: "Minimum room area, habitable rooms", values: ["70 sq ft", "R304.1"] },
          { label: "Minimum horizontal room dimension", values: ["7 ft", "R304.2"] },
        ]}
        caption="Ceiling height and room area are what separate a finished basement room from a legal bedroom, alongside the egress opening above."
      />

      <Callout label="Cite these figures">
        Free to reference with attribution to Tallyard. Every number above carries its IRC section so a reader can verify it at the source, and the calculators on this site check user inputs against these same limits.
      </Callout>

      <h2>Which edition applies to you</h2>

      <p>The IRC is a model code with no legal force by itself. It applies where a state or local jurisdiction adopts it, and adoption is uneven. The IRC is in use in some form in 49 states plus the District of Columbia, but the edition varies widely: adoption typically lags publication by two to five years, so at any moment the country is spread across three or four editions.</p>

      <p>The variation runs deeper than edition numbers. Some states adopt statewide with amendments. Some leave it to cities and counties, which is why unincorporated areas in parts of the country have no residential code at all. Some maintain their own code built on the IRC, and a handful amend specific numbers, which is how a state can legally allow a taller stair riser than the model code.</p>

      <p>Two consequences for anyone using numbers off a page like this one. First, the model code figure is the safe default: building to the tighter number passes under both a stricter and a looser local amendment. Second, when a project turns on a specific limit, call the building department. A five-minute call is the difference between a passed inspection and a torn-out flight of stairs, and no reference table, this one included, can substitute for the amendment list your jurisdiction actually enforces.</p>

      <p>For the current adoption status in your state, the International Code Council maintains the official adoption map, linked in the sources below. Treat third-party adoption charts with care; they contradict each other and go stale quickly.</p>
    </>
  );
}

export const codeLimitsGuide: GuideConfig = {
  slug: "residential-code-limits-reference",
  title: "Residential Building Code Limits: IRC Quick Reference Table",
  description:
    "Every IRC dimensional limit builders check: stair risers and treads, guards, handrails, egress openings, ceiling heights, and attic access, each with its code section.",
  bannerHeadline: "Check the number.",
  bannerTags: ["2021 IRC", "Section cited", "Free to cite"],
  categoryLabel: "Reference",
  category: "drywall",
  heroValue: "7-3/4\u2033",
  publishedAt: "2026-07-29",
  readTime: "7 min read",
  verdict:
    "Under the 2021 IRC, stair risers max at 7-3/4 inches with treads at least 10 inches, guards are required above a 30 inch drop and must be 36 inches tall, emergency escape openings need 5.7 square feet of net clear opening, and habitable rooms need 7 foot ceilings.",
  Content: CodeLimitsContent,

  faq: [
    {
      question: "What is the maximum stair riser height under the IRC?",
      answer:
        "7-3/4 inches under the 2021 IRC (R311.7.5.1), with all risers in a flight equal within 3/8 inch. The 2024 edition raises the maximum to 8-1/4 inches, but few jurisdictions enforce it yet. Some states amend the figure: Pennsylvania allows 8-1/4 inches under its Uniform Construction Code.",
    },
    {
      question: "When are guards required on a deck or stair?",
      answer:
        "Whenever a walking surface is more than 30 inches above the floor or grade below, measured at any point within 36 inches horizontally of the open edge (R312.1.1). Required guards must be at least 36 inches tall and must not allow a 4 inch sphere to pass through their openings.",
    },
    {
      question: "How tall should a handrail be?",
      answer:
        "Between 34 and 38 inches, measured vertically from the sloped plane along the tread nosings (R311.7.8.1). A handrail is required on at least one side of any flight with four or more risers, and it must be graspable: circular sections 1-1/4 to 2 inches in diameter, or non-circular sections with a 4 to 6-1/4 inch perimeter.",
    },
    {
      question: "What is the minimum ceiling height for a habitable room?",
      answer:
        "7 feet (R305.1). Basements without habitable space can go down to 6 feet 8 inches, and beams or ducts may project below the required height within limits. A basement room also needs at least 70 square feet of floor area and a compliant egress opening before it counts as a bedroom.",
    },
    {
      question: "Which IRC edition applies to my project?",
      answer:
        "Whichever edition your state or local jurisdiction has adopted, plus its amendments. Adoption lags publication by two to five years, so most of the country enforces the 2021 or 2018 edition while the 2024 edition rolls out. Check the ICC adoption map, then confirm amendments with your local building department.",
    },
    {
      question: "Is the IRC the law?",
      answer:
        "Not by itself. The IRC is a model code published by the International Code Council; it carries legal force only where a jurisdiction adopts it, and jurisdictions frequently amend specific provisions. Some areas, including many unincorporated counties, have no adopted residential code at all.",
    },
  ],

  sources: [
    {
      name: "2021 IRC Chapter 3, Building Planning (ICC Digital Codes)",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "Source for every stair, guard, handrail, egress, and room dimension on this page",
    },
    {
      name: "2021 IRC Chapter 8, Roof-Ceiling Construction",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-8-roof-ceiling-construction",
      note: "Attic access and ventilation requirements",
    },
    {
      name: "ICC Code Adoption Map",
      url: "https://www.iccsafe.org/adoptions/code-adoption-map/IRC",
      note: "Official record of which edition each state has adopted",
    },
    {
      name: "ICC Digital Codes Library",
      url: "https://codes.iccsafe.org/",
      note: "Free read-only access to adopted code text, including many state amendments",
    },
  ],

  relatedCalculators: [
    { name: "Deck stair calculator", slug: "deck-stair-calculator", description: "Stringer cut sheet with R311.7 pass/fail checks" },
    { name: "Egress window calculator", slug: "egress-window-calculator", description: "Checks a window against R310" },
    { name: "Stair calculator", slug: "stair-calculator", description: "Interior stair rise, run, and stringers" },
    { name: "Attic ventilation calculator", slug: "attic-ventilation-calculator", description: "Net free area under R806" },
  ],

  relatedGuides: [
    {
      name: "Joist span reference",
      slug: "joist-span-reference",
      description: "Planning spans for floors, decks, and headers",
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
