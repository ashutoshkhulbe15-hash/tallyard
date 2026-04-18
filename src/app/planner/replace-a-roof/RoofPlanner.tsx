"use client";

import { useState } from "react";
import { PlannerWizard, MaterialList, type PlannerStep, type PlannerResult } from "@/components/Planner";

const steps: PlannerStep[] = [
  {
    id: "roof",
    title: "Roof dimensions",
    context: "Measure the footprint of your house (not the roof surface — the calculator applies the pitch multiplier). Include overhangs.",
    inputs: [
      { id: "footprintLength", label: "House length", type: "number", unit: "ft", defaultValue: 50, min: 10, step: 1 },
      { id: "footprintWidth", label: "House width", type: "number", unit: "ft", defaultValue: 30, min: 10, step: 1 },
      { id: "pitch", label: "Roof pitch", type: "select", defaultValue: 5, options: [
        { label: "3/12 (low slope)", value: 3 }, { label: "4/12 (standard)", value: 4 },
        { label: "5/12 (moderate)", value: 5 }, { label: "6/12 (medium)", value: 6 },
        { label: "8/12 (steep)", value: 8 }, { label: "12/12 (very steep)", value: 12 },
      ]},
      { id: "stories", label: "Stories", type: "select", defaultValue: 1, options: [
        { label: "1 story", value: 1 }, { label: "2 stories", value: 2 },
      ]},
    ],
  },
  {
    id: "material",
    title: "Shingle type",
    context: "Architectural shingles are the standard for 80%+ of residential roofs. 3-tab is budget. Premium mimics slate or cedar.",
    inputs: [
      { id: "shingleType", label: "Shingle grade", type: "select", defaultValue: "arch", options: [
        { label: "3-tab ($80–120/square)", value: "3tab" },
        { label: "Architectural ($130–200/square)", value: "arch" },
        { label: "Premium / designer ($250–500/square)", value: "premium" },
      ]},
      { id: "tearOff", label: "Tear off existing roof?", type: "select", defaultValue: "yes", options: [
        { label: "Yes — remove old shingles first", value: "yes" },
        { label: "No — overlay on existing (1 layer only)", value: "no" },
      ]},
    ],
  },
  {
    id: "extras",
    title: "Ventilation and gutters",
    context: "A new roof is the best time to upgrade ventilation and replace aging gutters. Both are cheaper to do during a roof job than separately.",
    inputs: [
      { id: "ridgeLength", label: "Ridge length (peak)", type: "number", unit: "ft", defaultValue: 40, min: 10, step: 1, help: "Usually close to the house length" },
      { id: "replaceGutters", label: "Replace gutters?", type: "select", defaultValue: "yes", options: [
        { label: "Yes — new gutters + downspouts", value: "yes" },
        { label: "No — existing gutters are fine", value: "no" },
      ]},
      { id: "gutterLF", label: "Gutter length (if replacing)", type: "number", unit: "ft", defaultValue: 120, min: 0, step: 1 },
    ],
  },
];

function calculateResults(values: Record<string, number | string>): PlannerResult[] {
  const fpL = Number(values.footprintLength) || 50;
  const fpW = Number(values.footprintWidth) || 30;
  const pitch = Number(values.pitch) || 5;
  const shingleType = String(values.shingleType || "arch");
  const tearOff = values.tearOff === "yes";
  const ridgeLen = Number(values.ridgeLength) || 40;
  const replaceGutters = values.replaceGutters === "yes";
  const gutterLF = Number(values.gutterLF) || 120;

  const footprint = fpL * fpW;
  const pitchMult = Math.sqrt(1 + Math.pow(pitch / 12, 2));
  const roofArea = Math.round(footprint * pitchMult);
  const squares = Math.ceil(roofArea / 100 * 1.12);

  const bundlesPerSq = shingleType === "3tab" ? 4 : 3;
  const totalBundles = squares * bundlesPerSq;

  const costPerSquare: Record<string, number> = { "3tab": 100, arch: 165, premium: 375 };
  const shingleCost = squares * (costPerSquare[shingleType] || 165);

  const underlaymentRolls = Math.ceil(roofArea / 400);
  const iceBarrierRolls = Math.ceil((fpL * 2 + fpW * 2) * 3 / 75);
  const dripEdgeLF = Math.ceil((fpL + fpW) * 2 * 1.1);
  const ridgeCapBundles = Math.ceil(ridgeLen / 25);

  const accessoryCost = Math.round(
    underlaymentRolls * 120 + iceBarrierRolls * 95 + dripEdgeLF * 2 + ridgeCapBundles * 35
  );

  const results: PlannerResult[] = [
    {
      group: "Shingles",
      items: [
        { category: "Shingles", item: `${shingleType === "3tab" ? "3-tab" : shingleType === "arch" ? "Architectural" : "Premium"} shingles`, quantity: String(totalBundles), unit: "bundles" },
        { category: "Shingles", item: "Roofing squares (with 12% waste)", quantity: String(squares), unit: "squares" },
        { category: "Shingles", item: "Roof surface area", quantity: String(roofArea), unit: "sq ft" },
        { category: "Shingles", item: "Ridge cap shingles", quantity: String(ridgeCapBundles), unit: "bundles" },
      ],
      subtotal: String(shingleCost),
    },
    {
      group: "Underlayment and accessories",
      items: [
        { category: "Underlay", item: "Synthetic underlayment rolls (4 ft × 100 ft)", quantity: String(underlaymentRolls), unit: "rolls" },
        { category: "Ice barrier", item: "Ice & water shield rolls (eaves, valleys)", quantity: String(iceBarrierRolls), unit: "rolls" },
        { category: "Drip edge", item: "Aluminum drip edge", quantity: String(dripEdgeLF), unit: "linear feet" },
      ],
      subtotal: String(accessoryCost),
    },
    {
      group: "Ventilation",
      items: [
        { category: "Vent", item: `Ridge vent (continuous, ${ridgeLen} ft)`, quantity: String(Math.ceil(ridgeLen / 4)), unit: "sections (4 ft)" },
        { category: "Vent", item: "Soffit intake vents", quantity: String(Math.ceil((fpL * 2) / 8)), unit: "vents (8\" × 16\")" },
      ],
      subtotal: String(Math.round(ridgeLen * 4 + fpL * 2 / 8 * 12)),
    },
  ];

  if (tearOff) {
    results.push({
      group: "Tear-off",
      items: [
        { category: "Tear-off", item: "Dumpster rental (20-yard)", quantity: "1", unit: "dumpster", estimatedCost: "$350–600" },
        { category: "Tear-off", item: "Tear-off labor", quantity: String(roofArea), unit: "sq ft", estimatedCost: "$1–2/ft²" },
      ],
      subtotal: String(Math.round(roofArea * 1.5 + 475)),
    });
  }

  if (replaceGutters) {
    const downspouts = Math.ceil(gutterLF / 40);
    results.push({
      group: "Gutters",
      items: [
        { category: "Gutters", item: '5" seamless aluminum gutters', quantity: String(gutterLF), unit: "linear feet", estimatedCost: "$6–12/LF installed" },
        { category: "Gutters", item: "3×4 downspouts", quantity: String(downspouts), unit: "downspouts" },
      ],
      subtotal: String(Math.round(gutterLF * 9)),
    });
  }

  return results;
}

export default function RoofPlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [desc, setDesc] = useState("");

  const handleComplete = (values: Record<string, number | string>) => {
    setResults(calculateResults(values));
    setDesc(`${values.footprintLength} × ${values.footprintWidth} ft roof, ${values.pitch}/12 pitch, ${values.shingleType} shingles`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
      <div className="bg-surface border border-line rounded-lg p-6 md:p-7">
        <PlannerWizard steps={steps} onComplete={handleComplete}>
          {results && <MaterialList results={results} projectName={desc} />}
        </PlannerWizard>
      </div>
      <div className="lg:self-start lg:sticky lg:top-20 space-y-4">
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">What this planner calculates</h4>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">1</span><span>Shingle bundles with pitch multiplier and waste</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">2</span><span>Underlayment, ice barrier, drip edge</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">3</span><span>Ridge vent and soffit intake ventilation</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">4</span><span>Tear-off and dumpster (if applicable)</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">5</span><span>Gutter replacement (if applicable)</span></li>
          </ul>
        </div>
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Individual calculators</h4>
          <ul className="space-y-1.5 text-sm">
            <li><a href="/roofing-calculator" className="text-accent hover:underline">Roofing calculator</a></li>
            <li><a href="/attic-ventilation-calculator" className="text-accent hover:underline">Attic ventilation calculator</a></li>
            <li><a href="/gutter-calculator" className="text-accent hover:underline">Gutter calculator</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
