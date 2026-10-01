import type { GuideConfig } from "@/lib/guides-types";

function CodeLimitsContent() {
  return (
    <>
      <h2>There is no single code edition for every home</h2>
      <p>Building requirements depend on the code edition adopted by the state or local jurisdiction, local amendments, the project type, and sometimes the permit date. A model-code value quoted without those details is a starting point for research—not confirmation that a design complies.</p>
      <p>Before planning stairs, guards, emergency escape openings, ceilings, or structural work, ask the local building department which code and amendments apply. Then verify the specific section and exceptions for your situation. Existing buildings and permitted alterations may be treated differently from new construction.</p>
      <h2>Practical verification checklist</h2>
      <ul><li>Confirm the jurisdiction and adopted code edition with the authority having jurisdiction.</li><li>Check amendments, occupancy/use, measurement definitions, and applicable exceptions.</li><li>Use official code text and permit guidance, not an undated summary table.</li><li>Ask the building official or a qualified design professional when conditions are unusual or safety-critical.</li></ul>
      <p>This site provides planning worksheets and general information; it does not determine code compliance or replace permit review.</p>
    </>
  );
}

export const codeLimitsGuide: GuideConfig = {
  slug: "residential-code-limits-reference",
  title: "Residential Code Reference: Verify Local Requirements",
  description: "A practical checklist for identifying the code edition, local amendments, and project-specific rules that apply to residential work.",
  bannerHeadline: "Check the local code.",
  bannerTags: ["Jurisdiction first", "Official text", "Project-specific"],
  categoryLabel: "Reference",
  category: "roofing",
  heroValue: "LOCAL CODE",
  readTime: "3 min read",
  verdict: "Verify requirements against the edition and amendments adopted by your local building department; model-code summaries are not universal approval.",
  Content: CodeLimitsContent,
  faq: [
    { question: "Which residential building code applies to my project?", answer: "The applicable edition and amendments are determined by the jurisdiction. Confirm them with the local building department for your project and permit date." },
    { question: "Can an online code summary confirm compliance?", answer: "No. Summaries may omit local amendments, exceptions, definitions, or project-specific provisions. Check official requirements and ask the authority having jurisdiction when uncertain." },
  ],
  sources: [
    { name: "ICC Digital Codes", url: "https://codes.iccsafe.org/", note: "Model-code text; confirm local adoption and amendments separately." },
  ],
  relatedCalculators: [],
  relatedGuides: [],
};
