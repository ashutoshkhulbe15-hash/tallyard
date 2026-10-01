import type { GuideConfig } from "@/lib/guides-types";

function WasteFactorContent() {
  return (
    <>
      <h2>Set an allowance from the product and layout</h2>
      <p>There is no universal construction waste percentage. The amount to order depends on the material&apos;s package coverage, cut pattern, room or roof geometry, defects and breakage, installer method, and the supplier&apos;s return policy. Follow product instructions and ask the installer or supplier to document the allowance used for the estimate.</p>
      <p>Measure the net area or length first, then apply the project-specific allowance and round up to whole cartons, bundles, or other purchase units. Keep the net measurement, allowance, package coverage, and rounded order quantity visible so the result can be checked.</p>
      <h2>Items to confirm before ordering</h2>
      <ul><li>Does the manufacturer&apos;s coverage already account for overlaps, exposure, pattern repeat, or application method?</li><li>Will cuts, layout direction, openings, edges, and obstacles change usable coverage?</li><li>Are replacement pieces likely to match a later production lot or dye lot?</li><li>Can unopened units be returned, and are freight or restocking charges involved?</li></ul>
      <p>A calculator&apos;s default allowance is only an editable planning assumption, not an industry standard or a guarantee. Check the assumptions shown in the specific worksheet and replace them with the product and project requirements.</p>
    </>
  );
}

export const wasteFactorGuide: GuideConfig = {
  slug: "waste-factor-reference",
  title: "Construction Material Allowance: Plan Waste by Project",
  description: "How to set and verify a project-specific material allowance using product coverage, layout, and supplier terms.",
  bannerHeadline: "Make the allowance explicit.",
  bannerTags: ["Product coverage", "Layout dependent", "Check returns"],
  categoryLabel: "Reference",
  category: "concrete",
  heroValue: "PROJECT-SPECIFIC",
  readTime: "3 min read",
  verdict: "Use product-specific coverage and project layout to set an editable allowance; no single percentage fits every material or job.",
  Content: WasteFactorContent,
  faq: [
    { question: "How much extra material should I order?", answer: "There is no one percentage for every product and layout. Check manufacturer coverage, layout, cuts, installation method, and supplier return terms, then document the allowance used." },
    { question: "When should I round material quantities?", answer: "After calculating the net quantity and applying the documented project allowance, round up to the product's whole purchase units. Check the package coverage and any manufacturer instructions." },
  ],
  sources: [],
  relatedCalculators: [],
  relatedGuides: [],
};
