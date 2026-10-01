import type { GuideConfig } from "@/lib/guides-types";

function Content() {
  return (
    <>
      <p>A heat pump can provide heating and cooling; a furnace provides heat and may be paired with a separate air conditioner. There is no universal winner. Compare proposals using your home&apos;s loads, local energy tariffs, exact equipment performance, and the complete installation scope.</p>
      <h2>Ask for comparable designs</h2>
      <p>Request a project-specific heating and cooling load calculation, proposed model numbers, capacity at local design conditions, and any backup-heat plan. Have contractors state whether the existing ducts, electrical service, gas piping, refrigerant lines, and controls are included or need changes. Square footage or the old unit&apos;s nameplate alone does not establish the correct replacement size.</p>
      <h2>Compare costs using your own data</h2>
      <p>Compare itemized cash prices and financing separately. For operating costs, use your own utility rates and the proposed equipment&apos;s performance data across the temperatures your home experiences. Include maintenance, fixed gas charges that would remain, and likely replacement costs. A generic annual-savings or payback claim is not transferable to every home.</p>
      <h2>Check incentives at the source</h2>
      <p>Federal home-energy credit eligibility changed for property placed in service or expenditures after December 31, 2025. Consult current IRS guidance or a qualified tax professional for your specific facts. State, local, and utility programs have separate eligibility and funding rules; verify directly with the administering program before relying on them.</p>
      <h2>Useful starting points</h2>
      <p>The <a href="https://www.energy.gov/energysaver/heat-pump-systems">Department of Energy heat-pump overview</a> describes common system types. The <a href="https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb">IRS credit guidance</a> explains the current federal termination dates. Neither replaces a site-specific design or tax advice.</p>
    </>
  );
}

export const heatPumpVsFurnaceGuide: GuideConfig = {
  slug: "heat-pump-vs-furnace",
  title: "Heat pump vs furnace + AC: comparing project-specific costs",
  description: "Compare system designs, complete installation scope, local energy prices, and current incentives for your home.",
  bannerHeadline: "Compare the whole system.",
  bannerTags: ["Local design", "Itemized bids", "Verify incentives"],
  categoryLabel: "HVAC",
  category: "hvac",
  heroValue: "LOCAL DATA",
  readTime: "4 min read",
  verdict: "Neither system wins everywhere: compare project-specific designs, installed scope, and operating costs using your local energy rates.",
  Content,
  faq: [
    { question: "Can heat pumps operate in cold weather?", answer: "Operating limits and capacity vary by model and outdoor temperature. Review the exact product's performance data at the local design temperature with a qualified HVAC designer." },
    { question: "Will existing ducts work with a heat pump?", answer: "That depends on duct size, condition, airflow, equipment, and the home's loads. Ask the contractor to inspect and document the duct plan." },
    { question: "Is there a federal home-energy credit for a 2026 project?", answer: "The IRS states that Sections 25C and 25D are not allowed for applicable property placed in service or expenditures after December 31, 2025. Confirm your specific tax treatment with the IRS guidance or a qualified tax professional." },
    { question: "How should I compare annual operating costs?", answer: "Use local utility tariffs, the home's loads, and the proposed equipment's rated performance across relevant temperatures. This guide does not provide a universal savings estimate." },
  ],
  sources: [
    { name: "U.S. Department of Energy: Heat Pump Systems", url: "https://www.energy.gov/energysaver/heat-pump-systems", note: "Overview of residential heat-pump types and operation." },
    { name: "Internal Revenue Service: Home Energy Credit FAQs", url: "https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb", note: "Federal termination dates and timing guidance; taxpayer circumstances may differ." },
  ],
  relatedCalculators: [
    { name: "Heating/cooling load conversion", slug: "heat-pump-calculator", description: "Converts loads supplied by project documents; does not size equipment." },
    { name: "Room AC capacity guide", slug: "btu-calculator", description: "Limited room-area guide; not central HVAC sizing." },
    { name: "Furnace quote worksheet", slug: "furnace-replacement-cost-calculator", description: "Adds line items from a written quote." },
  ],
};
