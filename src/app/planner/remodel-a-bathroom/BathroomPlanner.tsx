"use client";

import { useState } from "react";
import { PlannerWizard, MaterialList, type PlannerStep, type PlannerResult } from "@/components/Planner";

const steps: PlannerStep[] = [
  {
    id: "room",
    title: "Bathroom dimensions",
    context: "Measure the room footprint and ceiling height. These drive floor tile, wall paint, and ventilation calculations.",
    inputs: [
      { id: "bathLength", label: "Room length", type: "number", unit: "ft", defaultValue: 9, min: 4, step: 0.5 },
      { id: "bathWidth", label: "Room width", type: "number", unit: "ft", defaultValue: 7, min: 4, step: 0.5 },
      { id: "bathCeiling", label: "Ceiling height", type: "number", unit: "ft", defaultValue: 8, min: 7, max: 10, step: 0.5 },
    ],
  },
  {
    id: "floor",
    title: "Floor tile",
    context: "Bathroom floors are almost always tile — ceramic or porcelain. Budget 10-15% waste for cuts around the toilet, vanity, and doorway.",
    inputs: [
      { id: "floorTileSize", label: "Tile size", type: "select", defaultValue: "12x12", options: [
        { label: '12×12" (standard)', value: "12x12" },
        { label: '12×24" (large format)', value: "12x24" },
        { label: '6×6" (small format)', value: "6x6" },
        { label: '2×2" mosaic', value: "mosaic" },
      ]},
      { id: "floorTileCost", label: "Tile cost", type: "select", defaultValue: 4, options: [
        { label: "Budget ceramic ($1–3/ft²)", value: 2 },
        { label: "Mid-range porcelain ($3–7/ft²)", value: 4 },
        { label: "Premium porcelain ($7–15/ft²)", value: 10 },
      ]},
    ],
  },
  {
    id: "shower",
    title: "Shower or tub surround",
    context: "A standard tub/shower combo is about 60\" × 30\" with 3 walls to tile. A walk-in shower may be larger. Measure all tiled walls.",
    inputs: [
      { id: "showerType", label: "Shower configuration", type: "select", defaultValue: "tub", options: [
        { label: "Tub/shower combo (60 × 30, 3 walls)", value: "tub" },
        { label: "Walk-in shower (36 × 48, 3 walls)", value: "walkin" },
        { label: "Walk-in large (48 × 60, 3 walls)", value: "walkinlg" },
        { label: "No shower tile needed", value: "none" },
      ]},
      { id: "showerTileHeight", label: "Tile height on walls", type: "select", defaultValue: 72, options: [
        { label: '6 ft (standard tub surround)', value: 72 },
        { label: '7 ft (shower door height)', value: 84 },
        { label: '8 ft (floor to ceiling)', value: 96 },
      ]},
      { id: "showerTileCost", label: "Shower wall tile cost", type: "select", defaultValue: 5, options: [
        { label: "Budget ($2–4/ft²)", value: 3 },
        { label: "Mid-range ($4–8/ft²)", value: 5 },
        { label: "Premium subway/glass ($8–20/ft²)", value: 12 },
      ]},
    ],
  },
  {
    id: "fixtures",
    title: "Vanity and paint",
    context: "Size the vanity to fit your countertop and sink needs. Remaining wall area gets painted — typically satin or semi-gloss in bathrooms.",
    inputs: [
      { id: "vanityWidth", label: "Vanity width", type: "select", defaultValue: 36, options: [
        { label: '24" (small bath, single sink)', value: 24 },
        { label: '30" (standard single)', value: 30 },
        { label: '36" (comfortable single)', value: 36 },
        { label: '48" (single with storage)', value: 48 },
        { label: '60" (double sink)', value: 60 },
      ]},
      { id: "paintCoats", label: "Wall paint coats", type: "select", defaultValue: 2, options: [
        { label: "1 coat (same color refresh)", value: 1 },
        { label: "2 coats (standard)", value: 2 },
      ]},
    ],
  },
];

function calculateResults(values: Record<string, number | string>): PlannerResult[] {
  const bathL = Number(values.bathLength) || 9;
  const bathW = Number(values.bathWidth) || 7;
  const ceilH = Number(values.bathCeiling) || 8;
  const floorTileSize = String(values.floorTileSize || "12x12");
  const floorCost = Number(values.floorTileCost) || 4;
  const showerType = String(values.showerType || "tub");
  const tileH = Number(values.showerTileHeight) || 72;
  const showerCost = Number(values.showerTileCost) || 5;
  const vanityW = Number(values.vanityWidth) || 36;
  const paintCoats = Number(values.paintCoats) || 2;

  const floorArea = bathL * bathW;
  const wasteMap: Record<string, number> = { "12x12": 0.10, "12x24": 0.12, "6x6": 0.08, "mosaic": 0.10 };
  const floorWaste = wasteMap[floorTileSize] || 0.10;
  const floorTileArea = Math.ceil(floorArea * (1 + floorWaste));
  const floorTileCost = Math.round(floorTileArea * floorCost);

  const results: PlannerResult[] = [
    {
      group: "Floor tile",
      items: [
        { category: "Floor", item: `${floorTileSize}" floor tile (+${Math.round(floorWaste * 100)}% waste)`, quantity: String(floorTileArea), unit: "sq ft" },
        { category: "Floor", item: "Thinset mortar (50 lb bags)", quantity: String(Math.ceil(floorTileArea / 40)), unit: "bags" },
        { category: "Floor", item: "Floor grout (25 lb bags)", quantity: String(Math.ceil(floorTileArea / 50)), unit: "bags" },
      ],
      subtotal: String(floorTileCost + Math.ceil(floorTileArea / 40) * 18 + Math.ceil(floorTileArea / 50) * 20),
    },
  ];

  if (showerType !== "none") {
    const dims: Record<string, { w: number; d: number }> = {
      tub: { w: 60, d: 30 }, walkin: { w: 48, d: 36 }, walkinlg: { w: 60, d: 48 },
    };
    const s = dims[showerType] || dims.tub;
    const backWall = (s.w / 12) * (tileH / 12);
    const sideWalls = 2 * (s.d / 12) * (tileH / 12);
    const showerFloorArea = (s.w / 12) * (s.d / 12);
    const totalShower = Math.ceil((backWall + sideWalls + showerFloorArea) * 1.12);
    const showerTileCost = Math.round(totalShower * showerCost);

    results.push({
      group: "Shower / tub tile",
      items: [
        { category: "Shower", item: `Wall tile (3 walls to ${tileH / 12} ft, +12% waste)`, quantity: String(totalShower), unit: "sq ft" },
        { category: "Shower", item: "Waterproof membrane (Kerdi or RedGard)", quantity: String(Math.ceil(totalShower / 50)), unit: "rolls or gallons" },
        { category: "Shower", item: "Wall thinset (50 lb bags)", quantity: String(Math.ceil(totalShower / 35)), unit: "bags" },
        { category: "Shower", item: "Shower grout (25 lb bags)", quantity: String(Math.ceil(totalShower / 40)), unit: "bags" },
      ],
      subtotal: String(showerTileCost + Math.ceil(totalShower / 50) * 40 + Math.ceil(totalShower / 35) * 18),
    });
  }

  results.push({
    group: "Vanity",
    items: [
      { category: "Vanity", item: `${vanityW}" bathroom vanity with top and sink`, quantity: "1", unit: "unit", estimatedCost: vanityW <= 30 ? "$200–600" : vanityW <= 48 ? "$400–1,200" : "$600–2,000" },
      { category: "Vanity", item: "Faucet", quantity: "1", unit: "unit", estimatedCost: "$80–300" },
    ],
    subtotal: String(vanityW <= 30 ? 500 : vanityW <= 48 ? 900 : 1500),
  });

  const perimeter = 2 * (bathL + bathW);
  const grossWall = perimeter * ceilH;
  const paintableWall = grossWall - 20 - 15 - (vanityW / 12) * 3;
  const paintGal = Math.ceil(paintableWall * paintCoats / 350 * 10) / 10;

  results.push({
    group: "Wall paint",
    items: [
      { category: "Paint", item: `Satin interior latex (${paintCoats} coats)`, quantity: String(Math.ceil(paintGal)), unit: "gallons", estimatedCost: "~$42/gal" },
      { category: "Paint", item: "Paintable wall area", quantity: String(Math.round(paintableWall)), unit: "sq ft" },
    ],
    subtotal: String(Math.ceil(paintGal) * 42),
  });

  results.push({
    group: "Accessories and supplies",
    items: [
      { category: "Supplies", item: "Toilet (if replacing)", quantity: "1", unit: "unit", estimatedCost: "$150–500" },
      { category: "Supplies", item: "Towel bars, toilet paper holder, mirror", quantity: "1", unit: "set", estimatedCost: "$50–200" },
      { category: "Supplies", item: "Exhaust fan (if replacing, 50–110 CFM)", quantity: "1", unit: "unit", estimatedCost: "$60–200" },
      { category: "Supplies", item: "Caulk (kitchen/bath silicone)", quantity: "3", unit: "tubes" },
    ],
    subtotal: String(400),
  });

  return results;
}

export default function BathroomPlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [desc, setDesc] = useState("");

  const handleComplete = (values: Record<string, number | string>) => {
    setResults(calculateResults(values));
    setDesc(`${values.bathLength} × ${values.bathWidth} ft bathroom remodel`);
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
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">1</span><span>Floor tile with waste, thinset, and grout</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">2</span><span>Shower wall tile with waterproofing</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">3</span><span>Vanity, faucet, and countertop</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">4</span><span>Wall paint (satin for moisture areas)</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">5</span><span>Accessories: toilet, exhaust fan, hardware</span></li>
          </ul>
        </div>
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Individual calculators</h4>
          <ul className="space-y-1.5 text-sm">
            <li><a href="/tile-calculator" className="text-accent hover:underline">Tile calculator</a></li>
            <li><a href="/shower-tile-calculator" className="text-accent hover:underline">Shower tile calculator</a></li>
            <li><a href="/vanity-calculator" className="text-accent hover:underline">Vanity calculator</a></li>
            <li><a href="/paint-calculator" className="text-accent hover:underline">Paint calculator</a></li>
            <li><a href="/grout-calculator" className="text-accent hover:underline">Grout calculator</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
