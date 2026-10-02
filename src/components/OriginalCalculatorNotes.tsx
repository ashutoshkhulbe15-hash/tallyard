import editorial from "@/content/original-calculator-editorial.json";
import type { CalculatorFAQ, CalculatorSource } from "@/lib/types";

type OriginalNotes = {
  description: string;
  formulaDescription: string;
  methodology: string[];
  sources: CalculatorSource[];
  faq: CalculatorFAQ[];
};

export function OriginalCalculatorNotes({ slug }: { slug: string }) {
  const notes = (editorial as Record<string, OriginalNotes>)[slug];
  if (!notes) return null;
  return <div className="mt-10 pt-8 border-t border-line">
    <h2>Original guide assumptions and questions</h2>
    <p className="text-sm text-ink-muted">The following material preserves the original guide&apos;s explanation and worked assumptions. Some passages describe the earlier calculator&apos;s inputs or outputs. For the current interactive tool, use the inputs, formula, and limitations shown above; these reference examples are not equipment selections, code approvals, or current quotes.</p>
    <p>{notes.description}</p>
    <h3>Reference formula and assumptions</h3>
    <p className="font-mono text-sm">{notes.formulaDescription}</p>
    {notes.methodology.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    {notes.faq.length > 0 && <>
      <h2>Questions from the original guide</h2>
      {notes.faq.map((item, index) => <div key={index}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
    </>}
    {notes.sources.length > 0 && <>
      <h2>Original guide references</h2>
      <ul>{notes.sources.map((source, index) => <li key={index}><a className="text-accent underline" href={source.url}>{source.name}</a>{source.note && <> — {source.note}</>}</li>)}</ul>
    </>}
  </div>;
}
