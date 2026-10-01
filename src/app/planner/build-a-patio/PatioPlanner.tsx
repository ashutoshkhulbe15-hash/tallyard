"use client";

import { useState } from "react";
import { PlannerWizard, MaterialList, type PlannerStep, type PlannerResult } from "@/components/Planner";

const steps: PlannerStep[] = [
  {
    id: "dimensions",
    title: "Rectangular area",
    context: "Enter the dimensions of a rectangular paved area. Divide an irregular layout into sections and calculate separately.",
    inputs: [
      { id: "patioLength", label: "Length", type: "number", unit: "ft", defaultValue: 16, min: 0.1, step: 0.5 },
      { id: "patioWidth", label: "Width", type: "number", unit: "ft", defaultValue: 12, min: 0.1, step: 0.5 },
    ],
  },
  {
    id: "pavers",
    title: "Nominal paver size and allowance",
    context: "Use supplier-confirmed product dimensions. The allowance is a scenario you select and does not model pattern, cuts, or layout.",
    inputs: [
      { id: "paverSize", label: "Nominal face size", type: "select", defaultValue: "6x9", options: [
        { label: "4 × 8 in", value: "4x8" }, { label: "6 × 9 in", value: "6x9" }, { label: "12 × 12 in", value: "12x12" },
      ]},
      { id: "allowance", label: "Planning allowance", type: "select", defaultValue: 0.1, options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 }, { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ]},
    ],
  },
];

function calculateResults(values: Record<string, number | string>): PlannerResult[] {
  const length = Number(values.patioLength) || 0;
  const width = Number(values.patioWidth) || 0;
  const paverSize = String(values.paverSize || "6x9");
  const allowance = Number(values.allowance) || 0;
  const sizes: Record<string, [number, number]> = { "4x8": [4, 8], "6x9": [6, 9], "12x12": [12, 12] };
  const [a, b] = sizes[paverSize] || sizes["6x9"];
  const areaSqFt = length * width;
  const paverAreaSqFt = (a * b) / 144;
  const count = Math.ceil((areaSqFt / paverAreaSqFt) * (1 + allowance));
  return [{
    group: "Paver quantity estimate",
    items: [
      { category: "Area", item: "Rectangular project area", quantity: String(Math.round(areaSqFt * 100) / 100), unit: "sq ft" },
      { category: "Pavers", item: `Nominal ${paverSize} in face dimensions; ${Math.round(allowance * 100)}% selected allowance`, quantity: String(count), unit: "pavers" },
    ],
  }];
}

export default function PatioPlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [desc, setDesc] = useState("");
  const handleComplete = (values: Record<string, number | string>) => {
    setResults(calculateResults(values));
    setDesc(`${values.patioLength} × ${values.patioWidth} ft rectangular paved area`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
      <div className="bg-surface border border-line rounded-lg p-6 md:p-7">
        <PlannerWizard steps={steps} onComplete={handleComplete}>
          {results && <MaterialList results={results} projectName={desc} />}
        </PlannerWizard>
      </div>
      <aside className="lg:self-start lg:sticky lg:top-20 bg-bg-warm rounded-lg p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">Estimate limits</h2>
        <p className="text-sm text-ink-muted leading-relaxed">This planner estimates rectangular area and a paver count from nominal face dimensions. It does not design the project or estimate base, bedding, jointing, excavation, drainage, edge restraint, costs, or structural suitability. Confirm actual installed coverage and project-specific details with the supplier and a qualified professional.</p>
      </aside>
    </div>
  );
}
