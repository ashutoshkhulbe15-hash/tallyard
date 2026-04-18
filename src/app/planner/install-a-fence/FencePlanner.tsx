"use client";

import { useState } from "react";
import {
  PlannerWizard,
  MaterialList,
  type PlannerStep,
  type PlannerResult,
} from "@/components/Planner";

const steps: PlannerStep[] = [
  {
    id: "layout",
    title: "Fence layout",
    context:
      "Measure the total linear footage you need fenced. Include all sides but subtract any existing walls or structures that serve as boundaries.",
    inputs: [
      { id: "totalLength", label: "Total fence length", type: "number", unit: "ft", defaultValue: 200, min: 10, step: 1 },
      { id: "fenceHeight", label: "Fence height", type: "select", defaultValue: 6, options: [
        { label: "4 ft (front yard / decorative)", value: 4 },
        { label: "6 ft (standard privacy)", value: 6 },
        { label: "8 ft (maximum privacy / commercial)", value: 8 },
      ]},
      { id: "gates", label: "Gate openings", type: "number", defaultValue: 1, min: 0, step: 1, help: "Each gate subtracts ~4 ft of fence and adds gate hardware" },
    ],
  },
  {
    id: "material",
    title: "Material and style",
    context:
      "Material choice affects cost, lifespan, and maintenance. Pressure-treated wood is cheapest. Vinyl costs more but needs zero maintenance.",
    inputs: [
      { id: "fenceMaterial", label: "Fence material", type: "select", defaultValue: "wood", options: [
        { label: "Pressure-treated wood ($15–35/LF)", value: "wood" },
        { label: "Cedar ($20–40/LF)", value: "cedar" },
        { label: "Vinyl / PVC ($20–45/LF)", value: "vinyl" },
        { label: "Chain link ($10–25/LF)", value: "chainlink" },
      ]},
      { id: "postSpacing", label: "Post spacing", type: "select", defaultValue: 8, options: [
        { label: "6 ft (wind-resistant, stronger)", value: 6 },
        { label: "8 ft (standard residential)", value: 8 },
      ]},
    ],
  },
  {
    id: "footings",
    title: "Post footings",
    context:
      "Every post needs a concrete footing below the frost line. Depth depends on your climate — deeper in cold regions to prevent frost heave.",
    inputs: [
      { id: "frostDepth", label: "Frost line depth", type: "select", defaultValue: 36, options: [
        { label: '18" (Southern US)', value: 18 },
        { label: '24" (Mid-Atlantic)', value: 24 },
        { label: '36" (Northeast, Midwest)', value: 36 },
        { label: '48" (Far North)', value: 48 },
      ]},
      { id: "postSize", label: "Post size", type: "select", defaultValue: "4x4", options: [
        { label: "4×4 (standard)", value: "4x4" },
        { label: "6×6 (gate posts, heavy-duty)", value: "6x6" },
      ]},
    ],
  },
];

function calculateResults(values: Record<string, number | string>): PlannerResult[] {
  const totalLength = Number(values.totalLength) || 200;
  const height = Number(values.fenceHeight) || 6;
  const gates = Number(values.gates) || 0;
  const material = String(values.fenceMaterial || "wood");
  const spacing = Number(values.postSpacing) || 8;
  const frostDepth = Number(values.frostDepth) || 36;
  const postSize = String(values.postSize || "4x4");

  const fenceLength = totalLength - gates * 4;
  const postCount = Math.ceil(fenceLength / spacing) + 1 + gates * 2;
  const railCount = height <= 4 ? 2 : 3;
  const totalRails = postCount * railCount;
  const picketCount = Math.ceil(fenceLength * 12 / 3.5 * 1.05);

  const holeDia = postSize === "6x6" ? 14 : 12;
  const holeRadius = holeDia / 2 / 12;
  const cuFtPerHole = Math.PI * holeRadius * holeRadius * (frostDepth / 12);
  const bagsPerPost = Math.ceil(cuFtPerHole / 0.6);
  const totalBags = postCount * bagsPerPost;

  const costPerLF: Record<string, number> = { wood: 25, cedar: 30, vinyl: 32, chainlink: 17 };
  const materialCost = Math.round(fenceLength * (costPerLF[material] || 25));
  const concreteCost = Math.round(totalBags * 7.5);
  const gateCost = gates * 150;

  const results: PlannerResult[] = [
    {
      group: "Posts",
      items: [
        { category: "Posts", item: `${postSize} PT posts, ${Math.ceil(height + frostDepth / 12 + 0.5)} ft each`, quantity: String(postCount), unit: "posts" },
      ],
      subtotal: String(Math.round(postCount * (postSize === "6x6" ? 28 : 14))),
    },
    {
      group: "Rails and infill",
      items: [
        { category: "Rails", item: `2×4 PT rails, 8 ft each (${railCount} per bay)`, quantity: String(totalRails), unit: "pieces" },
        ...(material !== "chainlink" ? [{ category: "Pickets", item: `${material === "vinyl" ? "Vinyl" : "Wood"} pickets / panels`, quantity: String(material === "vinyl" ? Math.ceil(fenceLength / 8) : picketCount), unit: material === "vinyl" ? "panels" : "pickets" }] : []),
        ...(material === "chainlink" ? [{ category: "Mesh", item: "Chain link mesh roll", quantity: String(Math.ceil(fenceLength / 50)), unit: "rolls (50 ft)" }] : []),
      ],
      subtotal: String(Math.round(materialCost * 0.6)),
    },
    {
      group: "Concrete footings",
      items: [
        { category: "Concrete", item: `80-lb bags (${holeDia}" hole × ${frostDepth}" deep)`, quantity: String(totalBags), unit: "bags", estimatedCost: "~$7.50/bag" },
      ],
      subtotal: String(concreteCost),
    },
  ];

  if (gates > 0) {
    results.push({
      group: "Gates",
      items: [
        { category: "Gates", item: `${height}-ft gate with hardware`, quantity: String(gates), unit: "gates", estimatedCost: "~$150 each" },
      ],
      subtotal: String(gateCost),
    });
  }

  results.push({
    group: "Hardware",
    items: [
      { category: "Hardware", item: "Deck screws / nails (stainless or galv.)", quantity: String(Math.ceil(fenceLength / 50)), unit: "boxes" },
      { category: "Hardware", item: "Post caps", quantity: String(postCount), unit: "pieces" },
    ],
    subtotal: String(Math.round(postCount * 5 + fenceLength / 50 * 35)),
  });

  return results;
}

export default function FencePlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [desc, setDesc] = useState("");

  const handleComplete = (values: Record<string, number | string>) => {
    setResults(calculateResults(values));
    setDesc(`${values.totalLength} LF ${values.fenceMaterial} fence, ${values.fenceHeight} ft tall`);
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
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">1</span><span>Posts sized to your fence height + frost depth</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">2</span><span>Rails and pickets/panels by material</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">3</span><span>Concrete bags for every post footing</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">4</span><span>Gate hardware and post caps</span></li>
          </ul>
        </div>
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Individual calculators</h4>
          <ul className="space-y-1.5 text-sm">
            <li><a href="/fence-calculator" className="text-accent hover:underline">Fence calculator</a></li>
            <li><a href="/concrete-calculator" className="text-accent hover:underline">Concrete calculator</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
