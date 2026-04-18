"use client";

import { useState } from "react";
import { PlannerWizard, MaterialList, type PlannerStep, type PlannerResult } from "@/components/Planner";

const steps: PlannerStep[] = [
  {
    id: "room",
    title: "Room dimensions",
    context: "Measure each wall at the floor from corner to corner. Multiply the perimeter by ceiling height for total wall area.",
    inputs: [
      { id: "wallA", label: "Wall A length", type: "number", unit: "ft", defaultValue: 14, min: 4, step: 0.5 },
      { id: "wallB", label: "Wall B length", type: "number", unit: "ft", defaultValue: 12, min: 4, step: 0.5 },
      { id: "ceilingHeight", label: "Ceiling height", type: "number", unit: "ft", defaultValue: 8, min: 7, max: 14, step: 0.5 },
      { id: "doors", label: "Doors", type: "number", defaultValue: 1, min: 0, step: 1 },
      { id: "windows", label: "Windows", type: "number", defaultValue: 2, min: 0, step: 1 },
    ],
  },
  {
    id: "paint",
    title: "Paint and scope",
    context: "Choose your paint quality and whether you need primer and ceiling paint. Two coats is standard for walls; one coat for ceilings.",
    inputs: [
      { id: "paintGrade", label: "Paint grade", type: "select", defaultValue: "mid", options: [
        { label: "Budget ($20–30/gal, 300 ft²/gal)", value: "budget" },
        { label: "Mid-range ($35–50/gal, 350 ft²/gal)", value: "mid" },
        { label: "Premium ($55–75/gal, 400 ft²/gal)", value: "premium" },
      ]},
      { id: "coats", label: "Wall coats", type: "select", defaultValue: 2, options: [
        { label: "1 coat (same color repaint)", value: 1 },
        { label: "2 coats (standard)", value: 2 },
        { label: "3 coats (drastic color change)", value: 3 },
      ]},
      { id: "needPrimer", label: "Primer needed?", type: "select", defaultValue: "no", options: [
        { label: "No — repainting over existing paint", value: "no" },
        { label: "Yes — bare drywall, dark color, or stains", value: "yes" },
      ]},
      { id: "paintCeiling", label: "Paint the ceiling?", type: "select", defaultValue: "no", options: [
        { label: "No", value: "no" },
        { label: "Yes (flat white, 1 coat)", value: "yes" },
      ]},
    ],
  },
];

function calculateResults(values: Record<string, number | string>): PlannerResult[] {
  const wallA = Number(values.wallA) || 14;
  const wallB = Number(values.wallB) || 12;
  const ceilH = Number(values.ceilingHeight) || 8;
  const doors = Number(values.doors) || 0;
  const windows = Number(values.windows) || 0;
  const grade = String(values.paintGrade || "mid");
  const coats = Number(values.coats) || 2;
  const needPrimer = values.needPrimer === "yes";
  const paintCeiling = values.paintCeiling === "yes";

  const perimeter = 2 * (wallA + wallB);
  const grossWall = perimeter * ceilH;
  const netWall = grossWall - doors * 20 - windows * 15;
  const ceilArea = wallA * wallB;

  const coverage: Record<string, number> = { budget: 300, mid: 350, premium: 400 };
  const price: Record<string, number> = { budget: 25, mid: 42, premium: 65 };
  const cov = coverage[grade] || 350;
  const pricePerGal = price[grade] || 42;

  const wallGallons = Math.ceil((netWall * coats / cov) * 10) / 10;
  const wallBuy = Math.ceil(wallGallons);
  const wallCost = wallBuy * pricePerGal;

  const results: PlannerResult[] = [
    {
      group: "Wall paint",
      items: [
        { category: "Paint", item: `${grade === "budget" ? "Budget" : grade === "mid" ? "Mid-range" : "Premium"} interior latex (${coats} coats)`, quantity: String(wallBuy), unit: "gallons", estimatedCost: `$${pricePerGal}/gal` },
        { category: "Paint", item: `Paintable wall area`, quantity: String(Math.round(netWall)), unit: "sq ft" },
      ],
      subtotal: String(Math.round(wallCost)),
    },
  ];

  if (needPrimer) {
    const primerGal = Math.ceil(netWall / 300);
    results.push({
      group: "Primer",
      items: [
        { category: "Primer", item: "Interior primer (1 coat, 300 ft²/gal)", quantity: String(primerGal), unit: "gallons", estimatedCost: "~$30/gal" },
      ],
      subtotal: String(primerGal * 30),
    });
  }

  if (paintCeiling) {
    const ceilGal = Math.ceil(ceilArea / 350);
    results.push({
      group: "Ceiling paint",
      items: [
        { category: "Ceiling", item: "Flat white ceiling paint (1 coat)", quantity: String(ceilGal), unit: "gallons", estimatedCost: "~$25/gal" },
        { category: "Ceiling", item: "Ceiling area", quantity: String(Math.round(ceilArea)), unit: "sq ft" },
      ],
      subtotal: String(ceilGal * 25),
    });
  }

  results.push({
    group: "Supplies",
    items: [
      { category: "Supplies", item: "Roller covers (3/8\" nap for smooth walls)", quantity: "2", unit: "pack" },
      { category: "Supplies", item: "Roller frame + extension pole", quantity: "1", unit: "set" },
      { category: "Supplies", item: "Painter's tape (1.5\" × 60 yd)", quantity: String(Math.ceil(perimeter / 60) + 1), unit: "rolls" },
      { category: "Supplies", item: "Drop cloths (9 × 12 ft)", quantity: String(Math.ceil(ceilArea / 108)), unit: "cloths" },
      { category: "Supplies", item: "Cut-in brush (2.5\" angled sash)", quantity: "1", unit: "brush" },
    ],
    subtotal: String(55),
  });

  return results;
}

export default function PaintPlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [desc, setDesc] = useState("");

  const handleComplete = (values: Record<string, number | string>) => {
    setResults(calculateResults(values));
    setDesc(`${values.wallA} × ${values.wallB} ft room, ${values.ceilingHeight} ft ceilings, ${values.coats} coats`);
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
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">1</span><span>Wall paint gallons with door/window subtraction</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">2</span><span>Primer if needed (bare drywall, dark colors)</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">3</span><span>Ceiling paint (optional, flat white)</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">4</span><span>Supplies: rollers, tape, drop cloths, brush</span></li>
          </ul>
        </div>
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Individual calculators</h4>
          <ul className="space-y-1.5 text-sm">
            <li><a href="/paint-calculator" className="text-accent hover:underline">Paint calculator</a></li>
            <li><a href="/drywall-calculator" className="text-accent hover:underline">Drywall calculator</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
