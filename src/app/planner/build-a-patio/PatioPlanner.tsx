"use client";

import { useState } from "react";
import { PlannerWizard, MaterialList, type PlannerStep, type PlannerResult } from "@/components/Planner";

const steps: PlannerStep[] = [
  {
    id: "dimensions",
    title: "Patio size",
    context: "Measure the area you want to pave. For irregular shapes, use the bounding rectangle and add 10% for waste.",
    inputs: [
      { id: "patioLength", label: "Length", type: "number", unit: "ft", defaultValue: 16, min: 4, step: 0.5 },
      { id: "patioWidth", label: "Width", type: "number", unit: "ft", defaultValue: 12, min: 4, step: 0.5 },
    ],
  },
  {
    id: "pavers",
    title: "Paver type and pattern",
    context: "Paver size and pattern affect both appearance and waste. Herringbone is strongest for driveways. Running bond is simplest for patios.",
    inputs: [
      { id: "paverSize", label: "Paver size", type: "select", defaultValue: "6x9", options: [
        { label: '4×8" (standard brick)', value: "4x8" },
        { label: '6×9" (large format)', value: "6x9" },
        { label: '12×12" (stepping stone)', value: "12x12" },
      ]},
      { id: "pattern", label: "Pattern", type: "select", defaultValue: "running", options: [
        { label: "Running bond (5% waste)", value: "running" },
        { label: "Herringbone (10% waste)", value: "herringbone" },
        { label: "Basketweave (7% waste)", value: "basketweave" },
      ]},
      { id: "paverCost", label: "Paver price range", type: "select", defaultValue: 4, options: [
        { label: "Budget ($2–3/ft²)", value: 2.5 },
        { label: "Mid-range ($3–6/ft²)", value: 4 },
        { label: "Premium ($6–12/ft²)", value: 9 },
      ]},
    ],
  },
  {
    id: "base",
    title: "Base materials",
    context: "A paver patio needs a compacted gravel base (4–6 inches) and a bedding sand layer (1 inch). These are what make the patio level and stable.",
    inputs: [
      { id: "baseDepth", label: "Gravel base depth", type: "select", defaultValue: 6, options: [
        { label: '4" (walkways, light use)', value: 4 },
        { label: '6" (patios, standard)', value: 6 },
        { label: '8" (driveways, heavy use)', value: 8 },
      ]},
      { id: "edgeRestraint", label: "Edge restraint", type: "select", defaultValue: "plastic", options: [
        { label: "Plastic paver edging ($1–2/LF)", value: "plastic" },
        { label: "Concrete curb ($4–8/LF)", value: "concrete" },
        { label: "Soldier course (pavers turned sideways)", value: "soldier" },
      ]},
    ],
  },
];

function calculateResults(values: Record<string, number | string>): PlannerResult[] {
  const length = Number(values.patioLength) || 16;
  const width = Number(values.patioWidth) || 12;
  const paverSize = String(values.paverSize || "6x9");
  const pattern = String(values.pattern || "running");
  const paverCostPerFt = Number(values.paverCost) || 4;
  const baseDepthIn = Number(values.baseDepth) || 6;
  const edgeType = String(values.edgeRestraint || "plastic");

  const area = length * width;
  const perimeter = 2 * (length + width);
  const wasteMap: Record<string, number> = { running: 0.05, herringbone: 0.10, basketweave: 0.07 };
  const waste = wasteMap[pattern] || 0.05;
  const paverArea = Math.ceil(area * (1 + waste));

  const paverSizeMap: Record<string, { w: number; h: number; perSqFt: number }> = {
    "4x8": { w: 4, h: 8, perSqFt: 4.5 },
    "6x9": { w: 6, h: 9, perSqFt: 2.7 },
    "12x12": { w: 12, h: 12, perSqFt: 1 },
  };
  const pInfo = paverSizeMap[paverSize] || paverSizeMap["6x9"];
  const paverCount = Math.ceil(paverArea * pInfo.perSqFt);
  const paverCost = Math.round(paverArea * paverCostPerFt);

  const baseCuYd = Math.round(area * (baseDepthIn / 12) / 27 * 1.3 * 10) / 10;
  const baseTons = Math.round(baseCuYd * 1.4 * 10) / 10;
  const baseCost = Math.round(baseTons * 35);

  const sandCuYd = Math.round(area * (1 / 12) / 27 * 10) / 10;
  const sandTons = Math.round(sandCuYd * 1.3 * 10) / 10;
  const sandCost = Math.round(sandTons * 40);

  const edgeCostMap: Record<string, number> = { plastic: 1.5, concrete: 6, soldier: 0 };
  const edgeCost = edgeType === "soldier" ? 0 : Math.round(perimeter * (edgeCostMap[edgeType] || 1.5));

  const results: PlannerResult[] = [
    {
      group: "Pavers",
      items: [
        { category: "Pavers", item: `${paverSize}" pavers (${pattern} pattern, +${Math.round(waste * 100)}% waste)`, quantity: String(paverCount), unit: "pavers" },
        { category: "Pavers", item: "Coverage area (with waste)", quantity: String(paverArea), unit: "sq ft" },
      ],
      subtotal: String(paverCost),
    },
    {
      group: "Base gravel",
      items: [
        { category: "Gravel", item: `Crushed stone base (${baseDepthIn}" deep, compacted)`, quantity: String(baseTons), unit: "tons", estimatedCost: "~$35/ton" },
        { category: "Gravel", item: "Volume", quantity: String(baseCuYd), unit: "cubic yards" },
      ],
      subtotal: String(baseCost),
    },
    {
      group: "Bedding sand",
      items: [
        { category: "Sand", item: 'Concrete sand bedding (1" layer)', quantity: String(sandTons), unit: "tons", estimatedCost: "~$40/ton" },
        { category: "Sand", item: "Polymeric joint sand", quantity: String(Math.ceil(area / 60)), unit: "bags (50 lb)" },
      ],
      subtotal: String(sandCost + Math.ceil(area / 60) * 25),
    },
    {
      group: "Edge restraint",
      items: [
        { category: "Edge", item: `${edgeType === "plastic" ? "Plastic paver edging" : edgeType === "concrete" ? "Concrete curb" : "Soldier course (no extra cost)"}`, quantity: String(Math.round(perimeter)), unit: "linear feet" },
        ...(edgeType === "plastic" ? [{ category: "Edge", item: "10\" landscape spikes", quantity: String(Math.ceil(perimeter / 1.5)), unit: "spikes" }] : []),
      ],
      subtotal: String(edgeCost),
    },
    {
      group: "Tools and supplies",
      items: [
        { category: "Supplies", item: "Landscape fabric (under base)", quantity: String(Math.ceil(area / 300)), unit: "rolls (3×50 ft)" },
        { category: "Supplies", item: "Plate compactor rental", quantity: "1", unit: "day rental", estimatedCost: "$80–120" },
      ],
      subtotal: String(Math.ceil(area / 300) * 30 + 100),
    },
  ];

  return results;
}

export default function PatioPlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [desc, setDesc] = useState("");

  const handleComplete = (values: Record<string, number | string>) => {
    setResults(calculateResults(values));
    setDesc(`${values.patioLength} × ${values.patioWidth} ft paver patio, ${values.pattern} pattern`);
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
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">1</span><span>Paver count with pattern-specific waste</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">2</span><span>Gravel base volume and tonnage</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">3</span><span>Bedding sand and polymeric joint sand</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">4</span><span>Edge restraint by perimeter</span></li>
          </ul>
        </div>
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Individual calculators</h4>
          <ul className="space-y-1.5 text-sm">
            <li><a href="/paver-calculator" className="text-accent hover:underline">Paver calculator</a></li>
            <li><a href="/gravel-calculator" className="text-accent hover:underline">Gravel calculator</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
