import type { GuideConfig } from "@/lib/guides-types";

function SpanContent() {
  return (
    <>
      <h2>Use the table that applies to your project</h2>
      <p>A joist span is not determined by lumber depth alone. Species, grade, spacing, loads, bearing conditions, moisture exposure, deflection limits, and the locally adopted code all matter. A generic span figure cannot confirm that a particular floor or deck is safe.</p>
      <p>For sawn-lumber floor framing, check the American Wood Council span calculator or the span table in the code adopted by your building department. For decks, use the applicable deck guide and local requirements. Engineered joists require the exact manufacturer and product-series span chart.</p>
      <h2>Before relying on a span calculation</h2>
      <ul><li>Read species and grade from the lumber stamp.</li><li>Measure the clear span and joist spacing; record support and bearing details.</li><li>Identify the loads, use, exposure, and applicable deflection criteria.</li><li>Confirm the locally adopted code edition and amendments with the authority having jurisdiction.</li></ul>
      <p>Do not use this page or a material takeoff calculator to size structural members. For unusual loads, alterations, damage, or uncertain framing, ask a qualified local design professional or building official.</p>
    </>
  );
}

export const spanReferenceGuide: GuideConfig = {
  slug: "joist-span-reference",
  title: "Joist Span Reference: Inputs to Verify Before Building",
  description: "Learn which project details determine joist spans and where to verify structural requirements for your location.",
  bannerHeadline: "Verify the span.",
  bannerTags: ["Project inputs", "Official references", "Local code"],
  categoryLabel: "Reference",
  category: "landscaping",
  heroValue: "VERIFY",
  readTime: "3 min read",
  verdict: "Use the applicable span table or manufacturer chart with verified project inputs; a generic online span is not a structural approval.",
  Content: SpanContent,
  faq: [
    { question: "How far can a joist span?", answer: "It depends on the member's species, grade and product, spacing, loads, supports, exposure and governing code. Check the applicable official span table or manufacturer chart for the actual project." },
    { question: "Can a calculator confirm my joist is safe?", answer: "A generic material calculator cannot approve structural design. Verify requirements with the locally adopted code and a qualified professional when needed." },
  ],
  sources: [
    { name: "American Wood Council Span Calculator", url: "https://awc.org/codes-standards/calculators-software/spancalc/", note: "Reference for sawn-lumber span checks; confirm that its assumptions match your project and jurisdiction." },
    { name: "American Wood Council DCA 6", url: "https://awc.org/publications/dca6/", note: "Deck construction reference; local adoption and amendments may differ." },
  ],
  relatedCalculators: [{ name: "Lumber calculator", slug: "lumber-calculator", description: "A takeoff worksheet, not a structural sizing tool" }],
  relatedGuides: [],
};
