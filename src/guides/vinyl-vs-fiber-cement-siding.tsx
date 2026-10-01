import type { GuideConfig } from "@/lib/guides-types";

function Content() {
  return (
    <>
      <p>Vinyl and fiber-cement siding are different cladding products with distinct installation instructions, appearance, maintenance, and project costs. No generic lifespan, fire rating, insurance discount, resale premium, or 30-year cost comparison can determine the right choice for a particular home.</p>
      <h2>Compare exact products and assemblies</h2>
      <p>Record the manufacturer and product line, finish, exposure, warranty, substrate requirements, flashing and water-management details, fastening method, clearances, and any required maintenance. Check the local authority&apos;s requirements for the property and assembly. Product fire or weather claims apply only under their stated test and installation conditions.</p>
      <h2>Compare itemized bids</h2>
      <p>Ask contractors to identify measured wall area, removal and disposal, sheathing or moisture repairs, water-resistive barrier and flashing, insulation if included, trim, permits, labor, cleanup, and exclusions. Compare the same scope and product grade. A material price or area estimator is not an installed quote.</p>
      <h2>Use a measured area carefully</h2>
      <p>The <a href="/siding-calculator">siding area worksheet</a> applies a user-selected allowance to net area that you provide. It does not determine wall geometry, product quantities, trim, flashing, or installation design. Have the surfaces measured and the cladding system specified for the actual building.</p>
    </>
  );
}

export const vinylVsFiberCementGuide: GuideConfig = {
  slug: "vinyl-vs-fiber-cement-siding",
  title: "Vinyl vs fiber-cement siding: compare products and bids",
  description: "Compare exact siding products, installation scope, maintenance instructions, and local written quotes for your home.",
  bannerHeadline: "Compare the whole cladding system.",
  bannerTags: ["Exact product data", "Itemized scope", "Local requirements"],
  categoryLabel: "Roofing",
  category: "roofing",
  heroValue: "COMPARE SCOPE",
  readTime: "3 min read",
  verdict: "Choose using exact product documentation, the required wall assembly, maintenance needs, and equivalent local bids—not a generic cost or lifespan ranking.",
  Content,
  faq: [
    { question: "Which siding costs less over 30 years?", answer: "That cannot be answered universally without exact product prices, installation scope, maintenance, repair history, and the period of ownership. This guide does not publish a lifecycle-cost winner." },
    { question: "Does fiber cement lower home insurance?", answer: "A material label alone does not establish an insurance discount. Ask your insurer about the exact installed assembly and address, and request any price change in writing." },
    { question: "Does this calculator tell me how many cartons to order?", answer: "No. It reports area from your measurement and chosen allowance. Convert that to product quantities using the exact manufacturer's coverage and installation plan." },
  ],
  sources: [],
  relatedCalculators: [
    { name: "Siding area worksheet", slug: "siding-calculator", description: "Measured net area with a user-selected allowance; no product takeoff." },
    { name: "Wallpaper roll coverage", slug: "wallpaper-calculator", description: "Roll estimate from exact label coverage; no layout model." },
  ],
};
