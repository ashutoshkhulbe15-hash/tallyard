import type { GuideConfig } from "@/lib/guides-types";

function Content() {
  return (
    <>
      <p>Pressure-treated lumber, cedar, and composite decking differ in appearance, product requirements, maintenance instructions, and quoted cost. There is no material that is the lowest-cost or longest-lasting choice in every setting. Compare exact products and the complete deck design rather than relying on a generic 20-year cost ranking.</p>
      <h2>Compare the same project scope</h2>
      <p>Ask each contractor to identify the decking and framing products, deck dimensions, stairs, guards, footings, demolition, disposal, permits, and site work included in the proposal. Confirm that any required framing changes for the selected decking are included and match that manufacturer&apos;s current installation instructions.</p>
      <h2>Evaluate ownership requirements</h2>
      <p>Review the product&apos;s maintenance instructions, cleaning method, warranty exclusions, color and finish options, heat and moisture performance information, and replacement-board availability. Consider who will perform upkeep and how much variation in appearance is acceptable. A warranty is not the same as a service-life guarantee.</p>
      <h2>Keep structure and surface separate</h2>
      <p>The walking surface does not determine the deck&apos;s structural design. Framing, connections, footings, guards, stairs, and ledger attachment must be specified for the site, loads, locally adopted requirements, and chosen product. Use approved plans, manufacturer documents, and qualified design or installation advice; the linked calculators do not design a deck.</p>
      <h2>Use measured quantities as a starting point</h2>
      <p>The <a href="/deck-calculator">deck estimator</a> provides limited surface-area and board-count arithmetic from its entered assumptions. It does not produce a complete purchasing list or establish a safe structure. Use a measured plan and written supplier or contractor quotes for the actual project.</p>
    </>
  );
}

export const compositeVsPTVsCedarDeckGuide: GuideConfig = {
  slug: "composite-vs-pressure-treated-vs-cedar-deck",
  title: "Composite vs pressure-treated vs cedar decking",
  description: "Compare exact decking products, maintenance instructions, warranty scope, and complete project quotes without a generic lifecycle-cost verdict.",
  bannerHeadline: "Choose for your project.",
  bannerTags: ["Exact product data", "Same quote scope", "No universal cost winner"],
  categoryLabel: "Landscaping",
  category: "landscaping",
  heroValue: "COMPARE PRODUCTS",
  readTime: "4 min read",
  verdict: "Compare the specific product, site requirements, maintenance instructions, and complete local bids; no material is a universal winner.",
  Content,
  faq: [
    { question: "Which decking material has the lowest long-term cost?", answer: "That depends on the selected products, local installed quotes, maintenance, site exposure, and ownership period. This guide does not model a universal lifecycle cost." },
    { question: "Can composite boards use any framing layout?", answer: "No generic spacing rule is provided here. Follow the current installation instructions for the exact product and have the framing checked against the project's design requirements." },
    { question: "Does a product warranty guarantee its service life?", answer: "No. Read the specific warranty, including exclusions, maintenance conditions, and remedies; a warranty term is not a prediction of actual service life." },
  ],
  sources: [],
  relatedCalculators: [
    { name: "Deck surface estimator", slug: "deck-calculator", description: "Area and rough board count from entered assumptions; not structural design." },
    { name: "Lumber quantity worksheet", slug: "lumber-calculator", description: "Nominal board-foot arithmetic only; not a framing takeoff." },
  ],
  relatedGuides: [
    { name: "Vinyl vs fiber cement siding", slug: "vinyl-vs-fiber-cement-siding", description: "Compare product documentation and written project quotes." },
  ],
};
