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
    id: "dimensions",
    title: "Deck size and height",
    context:
      "Start with the basic footprint. These dimensions drive everything else — boards, joists, beams, posts, and concrete footings.",
    inputs: [
      {
        id: "length",
        label: "Deck length",
        type: "number",
        unit: "ft",
        defaultValue: 20,
        min: 6,
        step: 1,
      },
      {
        id: "width",
        label: "Deck width",
        type: "number",
        unit: "ft",
        defaultValue: 16,
        min: 6,
        step: 1,
      },
      {
        id: "height",
        label: "Deck height above ground",
        type: "number",
        unit: "ft",
        defaultValue: 3,
        min: 0.5,
        max: 12,
        step: 0.5,
        help: "Ground-level decks (under 1 ft) need fewer posts. Second-story decks (8+ ft) need longer posts and more bracing.",
      },
    ],
  },
  {
    id: "material",
    title: "Decking material",
    context:
      "Your material choice only affects the walking surface and cost. The frame underneath is always pressure-treated regardless of what you pick here.",
    inputs: [
      {
        id: "deckMaterial",
        label: "Surface material",
        type: "select",
        defaultValue: "pt",
        options: [
          { label: "Pressure-treated pine ($3–6/ft²)", value: "pt" },
          { label: "Cedar ($4–8/ft²)", value: "cedar" },
          { label: "Composite — Trex/TimberTech ($5–14/ft²)", value: "composite" },
        ],
      },
      {
        id: "boardWidth",
        label: "Board width",
        type: "select",
        defaultValue: 5.5,
        options: [
          { label: '5.5" (standard 2×6 or composite)', value: 5.5 },
          { label: '3.5" (2×4 — narrow look)', value: 3.5 },
        ],
      },
      {
        id: "joistSpacing",
        label: "Joist spacing",
        type: "select",
        defaultValue: 16,
        options: [
          { label: '16" on center (standard)', value: 16 },
          { label: '12" on center (composite diagonal / heavy loads)', value: 12 },
        ],
        help: "Composite manufacturers require 12\" OC for diagonal patterns. Check your product spec.",
      },
    ],
  },
  {
    id: "stairs",
    title: "Stairs and railing",
    context:
      "Decks over 30 inches above grade require stairs and railing by code (IRC R507.2). The stair length depends on your deck height.",
    inputs: [
      {
        id: "needStairs",
        label: "Stairs needed?",
        type: "select",
        defaultValue: "yes",
        options: [
          { label: "Yes — full staircase to ground", value: "yes" },
          { label: "No — ground-level or existing stairs", value: "no" },
        ],
      },
      {
        id: "stairWidth",
        label: "Stair width",
        type: "select",
        defaultValue: 36,
        options: [
          { label: '36" (code minimum)', value: 36 },
          { label: '48" (comfortable for two people)', value: 48 },
        ],
      },
      {
        id: "railingLF",
        label: "Railing (linear feet)",
        type: "number",
        unit: "ft",
        defaultValue: 50,
        min: 0,
        step: 1,
        help: "Measure the perimeter of the deck minus the house wall. Typically 2 sides + 1 end.",
      },
    ],
  },
  {
    id: "footings",
    title: "Footings and foundation",
    context:
      "Every post sits on a concrete footing that reaches below the frost line. Footing count depends on beam spacing and deck size.",
    inputs: [
      {
        id: "frostDepth",
        label: "Frost line depth in your area",
        type: "select",
        defaultValue: 36,
        options: [
          { label: '18" (Southern US)', value: 18 },
          { label: '24" (Mid-Atlantic, lower Midwest)', value: 24 },
          { label: '36" (Northeast, Upper Midwest)', value: 36 },
          { label: '48" (Far North, mountains)', value: 48 },
        ],
      },
      {
        id: "holeDiameter",
        label: "Footing hole diameter",
        type: "select",
        defaultValue: 12,
        options: [
          { label: '10" (4×4 posts)', value: 10 },
          { label: '12" (standard — most 4×4 and 6×6)', value: 12 },
          { label: '14" (6×6 posts, heavy loads)', value: 14 },
        ],
      },
    ],
  },
];

function calculateResults(
  values: Record<string, number | string>
): PlannerResult[] {
  const length = Number(values.length) || 20;
  const width = Number(values.width) || 16;
  const height = Number(values.height) || 3;
  const material = String(values.deckMaterial || "pt");
  const boardW = Number(values.boardWidth) || 5.5;
  const joistOC = Number(values.joistSpacing) || 16;
  const needStairs = values.needStairs === "yes";
  const stairWidth = Number(values.stairWidth) || 36;
  const railingLF = Number(values.railingLF) || 0;
  const frostDepth = Number(values.frostDepth) || 36;
  const holeDia = Number(values.holeDiameter) || 12;

  const area = length * width;

  // --- Decking boards ---
  const boardsPerRow = Math.ceil((width * 12) / boardW);
  const rowsNeeded = Math.ceil(length / 1); // 1-ft increments
  const deckingBF = Math.ceil(area * 1.1); // 10% waste
  const materialCostPerSqFt =
    material === "pt" ? 4.5 : material === "cedar" ? 6 : 9.5;
  const deckingCost = Math.round(deckingBF * materialCostPerSqFt);

  // --- Frame ---
  const joistCount = Math.ceil((length * 12) / joistOC) + 1;
  const joistLength = width; // each joist spans the width
  const joistBF = joistCount * joistLength; // lineal feet of 2×8 or 2×10

  // Beams: typically 2 beams for decks under 16ft wide, 3 for wider
  const beamCount = width <= 12 ? 1 : width <= 16 ? 2 : 3;
  const beamLength = length;

  // Posts: 1 per beam end + 1 every 6-8ft along each beam
  const postsPerBeam = Math.ceil(length / 7) + 1;
  const totalPosts = beamCount * postsPerBeam;

  // Post length = deck height + frost depth + 12" above footing
  const postLength = Math.ceil(height + frostDepth / 12 + 1);

  // Frame cost estimate (PT lumber roughly $1.50/LF for 2×8)
  const frameCost = Math.round(
    joistCount * joistLength * 1.5 +
      beamCount * beamLength * 3 + // doubled 2×10 or 2×12
      totalPosts * postLength * 2 // 4×4 or 6×6 posts
  );

  // --- Concrete footings ---
  const holeRadius = holeDia / 2 / 12; // radius in feet
  const holeDepthFt = frostDepth / 12;
  const cuFtPerHole = Math.PI * holeRadius * holeRadius * holeDepthFt;
  const bagsPerHole = Math.ceil(cuFtPerHole / 0.6); // 80-lb bag = ~0.6 cu ft
  const totalBags = totalPosts * bagsPerHole;
  const concreteCost = Math.round(totalBags * 7.5);

  // --- Stairs ---
  let stairResults: PlannerResult | null = null;
  if (needStairs && height > 0.5) {
    const risePerStep = 7.5; // inches (IRC max 7.75)
    const totalRise = height * 12;
    const stepCount = Math.ceil(totalRise / risePerStep);
    const runPerStep = 10; // inches
    const totalRun = stepCount * runPerStep;
    const stringerLength = Math.ceil(
      Math.sqrt(totalRise * totalRise + totalRun * totalRun) / 12
    );
    const stringerCount = Math.ceil((stairWidth / 12 - 1) / 1.33) + 1; // stringer every 16"
    const treadCount = stepCount;
    const stairCost = Math.round(
      stringerCount * stringerLength * 3 + treadCount * (stairWidth / 12) * 4
    );

    stairResults = {
      group: "Stairs",
      items: [
        {
          category: "Stairs",
          item: `Stringers (${stringerLength} ft each)`,
          quantity: String(stringerCount),
          unit: "pieces",
        },
        {
          category: "Stairs",
          item: `Treads (${stairWidth}" wide)`,
          quantity: String(treadCount),
          unit: "pieces",
        },
        {
          category: "Stairs",
          item: `Steps total (${risePerStep}" rise, ${runPerStep}" run)`,
          quantity: String(stepCount),
          unit: "steps",
        },
      ],
      subtotal: String(stairCost),
    };
  }

  // --- Fasteners + hardware ---
  const joistHangers = joistCount;
  const screwBoxes = Math.ceil(area / 100); // ~1 box per 100 sq ft
  const hardwareCost = Math.round(joistHangers * 3 + screwBoxes * 45);

  // --- Railing ---
  const railingCost = Math.round(railingLF * 25); // basic wood railing ~$25/LF

  // --- Build results ---
  const results: PlannerResult[] = [
    {
      group: "Decking surface",
      items: [
        {
          category: "Decking",
          item: `${material === "pt" ? "Pressure-treated" : material === "cedar" ? "Cedar" : "Composite"} decking boards`,
          quantity: String(deckingBF),
          unit: "sq ft (incl. 10% waste)",
          estimatedCost: `$${materialCostPerSqFt}/ft²`,
        },
      ],
      subtotal: String(deckingCost),
    },
    {
      group: "Frame (joists, beams, posts)",
      items: [
        {
          category: "Frame",
          item: `Joists — 2×8 PT, ${joistLength} ft each, ${joistOC}" OC`,
          quantity: String(joistCount),
          unit: "pieces",
        },
        {
          category: "Frame",
          item: `Beams — doubled 2×10 PT, ${beamLength} ft each`,
          quantity: String(beamCount),
          unit: "beams",
        },
        {
          category: "Frame",
          item: `Posts — 4×4 or 6×6 PT, ${postLength} ft each`,
          quantity: String(totalPosts),
          unit: "posts",
        },
      ],
      subtotal: String(frameCost),
    },
    {
      group: "Concrete footings",
      items: [
        {
          category: "Concrete",
          item: `80-lb bags (${holeDia}" hole × ${frostDepth}" deep)`,
          quantity: String(totalBags),
          unit: "bags",
          estimatedCost: "~$7.50/bag",
        },
        {
          category: "Concrete",
          item: "Post count",
          quantity: String(totalPosts),
          unit: "footings",
        },
      ],
      subtotal: String(concreteCost),
    },
  ];

  if (stairResults) results.push(stairResults);

  results.push({
    group: "Hardware and fasteners",
    items: [
      {
        category: "Hardware",
        item: "Joist hangers",
        quantity: String(joistHangers),
        unit: "pieces",
      },
      {
        category: "Hardware",
        item: `Deck screw boxes (${material === "composite" ? "hidden clips" : "stainless"})`,
        quantity: String(screwBoxes),
        unit: "boxes",
      },
      {
        category: "Hardware",
        item: "Ledger board hardware (lag bolts, flashing)",
        quantity: "1",
        unit: "kit",
      },
    ],
    subtotal: String(hardwareCost),
  });

  if (railingLF > 0) {
    results.push({
      group: "Railing",
      items: [
        {
          category: "Railing",
          item: "Wood or composite railing system",
          quantity: String(railingLF),
          unit: "linear feet",
          estimatedCost: "~$25/LF",
        },
      ],
      subtotal: String(railingCost),
    });
  }

  return results;
}

export default function DeckPlannerClient() {
  const [results, setResults] = useState<PlannerResult[] | null>(null);
  const [projectDesc, setProjectDesc] = useState("");

  const handleComplete = (values: Record<string, number | string>) => {
    const r = calculateResults(values);
    setResults(r);
    const mat =
      values.deckMaterial === "pt"
        ? "pressure-treated"
        : values.deckMaterial === "cedar"
          ? "cedar"
          : "composite";
    setProjectDesc(
      `${values.length} × ${values.width} ft ${mat} deck, ${values.height} ft high`
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
      <div className="bg-surface border border-line rounded-lg p-6 md:p-7">
        <PlannerWizard steps={steps} onComplete={handleComplete}>
          {results && (
            <MaterialList results={results} projectName={projectDesc} />
          )}
        </PlannerWizard>
      </div>

      {/* Context sidebar */}
      <div className="lg:self-start lg:sticky lg:top-20 space-y-4">
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">
            What this planner calculates
          </h4>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">1</span>
              <span>Decking boards with 10% waste factor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">2</span>
              <span>Joists, beams, and posts for the frame</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">3</span>
              <span>Concrete bags for every post footing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">4</span>
              <span>Stairs sized to your deck height (IRC-compliant rise/run)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">5</span>
              <span>Fasteners, joist hangers, and ledger hardware</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">6</span>
              <span>Railing by linear foot</span>
            </li>
          </ul>
        </div>
        <div className="bg-bg-warm rounded-lg p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">
            Need individual calculators?
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a href="/deck-calculator" className="text-accent hover:underline">
                Deck calculator
              </a>
            </li>
            <li>
              <a href="/concrete-calculator" className="text-accent hover:underline">
                Concrete calculator
              </a>
            </li>
            <li>
              <a href="/stair-calculator" className="text-accent hover:underline">
                Stair calculator
              </a>
            </li>
            <li>
              <a href="/lumber-calculator" className="text-accent hover:underline">
                Lumber calculator
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
