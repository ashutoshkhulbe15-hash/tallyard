import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const windowSizingCalculatorConfig: CalculatorConfig = {
  slug: "window-sizing-calculator",
  title: "Window Sizing Calculator",
  description:
    "Right window size for any room. Checks code-required egress, natural light minimums, and recommends rough opening dimensions.",
  categoryLabel: "Lumber",
  category: "drywall",

  bannerHeadline: "Size smartly.",
  bannerTags: ["IRC egress", "Light + ventilation", "Rough opening"],

  inputs: [
    {
      id: "roomType",
      label: "Room type",
      type: "select",
      defaultImperial: "bedroom",
      options: [
        { label: "Bedroom (egress required)", value: "bedroom" },
        { label: "Living / family room", value: "living" },
        { label: "Kitchen", value: "kitchen" },
        { label: "Bathroom", value: "bathroom" },
        { label: "Basement / below-grade", value: "basement" },
      ],
    },
    {
      id: "roomArea",
      label: "Room floor area",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 150,
      defaultMetric: 14,
      min: 40,
      step: 10,
    },
    {
      id: "width",
      label: "Window width",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 36,
      defaultMetric: 91,
      min: 12,
      step: 1,
    },
    {
      id: "height",
      label: "Window height",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 48,
      defaultMetric: 122,
      min: 12,
      step: 1,
    },
    {
      id: "windowType",
      label: "Window type",
      type: "select",
      defaultImperial: "doublehung",
      options: [
        { label: "Double-hung", value: "doublehung" },
        { label: "Single-hung", value: "singlehung" },
        { label: "Casement (crank)", value: "casement" },
        { label: "Sliding (horizontal)", value: "sliding" },
        { label: "Fixed (non-opening)", value: "fixed" },
        { label: "Awning / hopper", value: "awning" },
      ],
    },
  ],

  calculate: (values, units) => {
    const roomType = String(values.roomType || "bedroom");
    const roomAreaInput = Number(values.roomArea) || 0;
    const widthInput = Number(values.width) || 0;
    const heightInput = Number(values.height) || 0;
    const windowType = String(values.windowType || "doublehung");

    // Convert to imperial for checks
    const roomArea = units === "metric" ? roomAreaInput * 10.764 : roomAreaInput;
    const widthIn = units === "metric" ? widthInput / 2.54 : widthInput;
    const heightIn = units === "metric" ? heightInput / 2.54 : heightInput;

    // Total glass area
    const totalGlassArea = (widthIn * heightIn) / 144; // ft²

    // Openable area depends on window type
    const openableRatio: Record<string, number> = {
      doublehung: 0.5, // half opens
      singlehung: 0.5,
      casement: 0.9, // nearly all opens
      sliding: 0.5,
      fixed: 0,
      awning: 0.7,
    };
    const openableArea = totalGlassArea * (openableRatio[windowType] || 0.5);

    // Minimum dimensions per IRC for egress:
    // - 5.7 sq ft openable (24\" × 20\" or larger opening, both dimensions at min)
    // - Minimum width: 20 inches (clear opening)
    // - Minimum height: 24 inches (clear opening)
    // - Maximum sill height: 44\" above finished floor
    // Ground floor windows: 5.0 sq ft allowed
    const minEgressAreaReq = 5.7;
    const minEgressWidth = 20;
    const minEgressHeight = 24;

    // Clear opening dimensions (approximation — actual clear opening for double-hung is height × half the width)
    let clearWidth = widthIn;
    let clearHeight = heightIn;
    if (windowType === "doublehung" || windowType === "singlehung") {
      clearHeight = heightIn / 2;
    } else if (windowType === "sliding") {
      clearWidth = widthIn / 2;
    }

    const egressChecks: string[] = [];
    if (roomType === "bedroom" || roomType === "basement") {
      if (openableArea < minEgressAreaReq) {
        egressChecks.push(`⚠ openable area ${round(openableArea, 2)} ft² < 5.7 ft² required`);
      }
      if (clearWidth < minEgressWidth) {
        egressChecks.push(`⚠ clear width ${round(clearWidth, 1)}" < 20" required`);
      }
      if (clearHeight < minEgressHeight) {
        egressChecks.push(`⚠ clear height ${round(clearHeight, 1)}" < 24" required`);
      }
    }

    // Natural light requirement (IRC R303.1): 8% of floor area
    const minLightArea = roomArea * 0.08;
    const lightOK = totalGlassArea >= minLightArea;

    // Natural ventilation (IRC R303.1): 4% of floor area (unless mechanical ventilation)
    const minVentArea = roomArea * 0.04;
    const ventOK = openableArea >= minVentArea;

    // Rough opening: window dimensions + 0.5" each side for shims
    const roughWidth = widthIn + 1;
    const roughHeight = heightIn + 1;

    const status = egressChecks.length > 0 ? "code issues flagged" : "OK";

    return {
      value: round(totalGlassArea, 1),
      unit: "ft² glass",
      valueRounded: Math.ceil(totalGlassArea),
      breakdown: [
        { label: "window size", value: `${round(widthIn, 0)}" × ${round(heightIn, 0)}"` },
        { label: "glass area", value: `${round(totalGlassArea, 1)} ft²` },
        { label: "openable area", value: `${round(openableArea, 1)} ft² (${windowType})` },
        { label: "rough opening", value: `${round(roughWidth, 0)}" × ${round(roughHeight, 0)}"` },
        { label: "light ≥ 8% floor", value: `${lightOK ? "✓" : "✗"} (need ${round(minLightArea, 1)} ft²)` },
        { label: "vent ≥ 4% floor", value: `${ventOK ? "✓" : "✗"} (need ${round(minVentArea, 1)} ft²)` },
        { label: "egress", value: status },
      ],
      formulaSteps: [
        `window = ${round(widthIn, 0)}" × ${round(heightIn, 0)}" = ${round(totalGlassArea, 2)} ft² glass area`,
        `window type = ${windowType} (${Math.round(openableRatio[windowType] * 100)}% openable)`,
        `openable area = ${round(totalGlassArea, 2)} × ${openableRatio[windowType]} = ${round(openableArea, 2)} ft²`,
        `room area = ${round(roomArea, 0)} ft²`,
        `light requirement (8%) = ${round(minLightArea, 1)} ft² — ${lightOK ? "OK" : "fail"}`,
        `vent requirement (4%) = ${round(minVentArea, 1)} ft² — ${ventOK ? "OK" : "fail"}`,
        roomType === "bedroom" || roomType === "basement"
          ? `egress req: 5.7 ft² openable, 20" wide, 24" tall clear opening`
          : "egress: not required for this room type",
        ...egressChecks,
        `rough opening = window + 1" = ${round(roughWidth, 0)}" × ${round(roughHeight, 0)}"`,
      ],
    };
  },

  formulaDescription:
    "openable = glass × window type factor; egress = 5.7 ft² min + 20\"w × 24\"h clear; light = room × 8%; vent = room × 4%",

  methodology: [
    "IRC 2021 (Section R310) requires every sleeping room to have at least one window or door that meets egress requirements — a path out of the room in case of fire. Egress windows must have at least 5.7 square feet of openable area, with minimum clear opening dimensions of 20 inches wide and 24 inches tall. The maximum sill height is 44 inches above the finished floor. Ground floor bedrooms can use 5.0 square feet openable area.",
    "Openable area depends heavily on window type. Double-hung and single-hung: only about half the total glass area opens (the sash). Casement windows crank outward and open about 90% of the glass area. Sliding horizontal windows: half opens. Fixed windows don't open at all. Awning and hopper windows: about 70% openable. The calculator applies the appropriate factor automatically.",
    "Natural light and ventilation (IRC R303.1): habitable rooms need total glazing equal to 8% of floor area for light. For an 150 sq ft bedroom, that's 12 sq ft of window glass. For ventilation (unless mechanical ventilation is provided), 4% of floor area must be openable — 6 sq ft for the same bedroom. Kitchens and bathrooms may have mechanical ventilation (exhaust fan) that exempts them from the 4% openable requirement.",
    "Rough opening dimensions add about 1/2 inch on each side to the window's actual dimensions to allow for shimming and adjustment during installation. A 36 × 48 inch window needs a 37 × 49 inch rough opening. Manufacturer specs sometimes require more (up to 1 inch each side for specific brands) — always verify with the exact window you're buying before cutting the framing.",
    "For basements, egress requirements are the same as bedrooms — basement bedrooms must have compliant egress windows or a direct exit door. Window wells are required for any egress window whose sill is below grade; the well itself has minimum size requirements (9 sq ft area, 36 inches projection) and must include a permanent ladder for wells deeper than 44 inches.",
    "Not captured: energy performance ratings (U-factor, SHGC for ENERGY STAR compliance), impact-resistance ratings (required in hurricane zones), triple-pane upgrades, glazing type, tempered glass requirements (within 24\" of doors, floors, or wet areas), and egress window cost ($300-1,000 per window installed depending on type and size).",
  ],

  sources: [
    {
      name: "IRC 2021 Section R310 — Emergency Escape and Rescue Openings",
      url: "https://codes.iccsafe.org/content/IRC2021P2",
      note: "Code-required egress window dimensions and locations",
    },
    {
      name: "IRC 2021 Section R303 — Light, Ventilation, Heating",
      url: "https://codes.iccsafe.org/",
      note: "Natural light and ventilation requirements for habitable rooms",
    },
  ],

  related: [
    { name: "Stud spacing calculator", slug: "stud-spacing-calculator", description: "Headers and framing around windows" },
    { name: "Siding calculator", slug: "siding-calculator", description: "Siding with window openings" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value in framed walls" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets for walls with openings" },
  ],

  faq: [
    {
      question: "What's the minimum window size for a bedroom?",
      answer:
        "Per IRC egress rules: 5.7 square feet openable area, minimum 20\" clear width, minimum 24\" clear height. A 32 × 48 inch double-hung barely meets this (with 1-inch frame deduction). A 36 × 48 inch double-hung or a 30 × 36 inch casement gives plenty of margin. Ground-floor bedrooms can use 5.0 sq ft openable.",
    },
    {
      question: "Why are casement windows better for egress?",
      answer:
        "Casements open ~90% of their glass area (the whole sash swings outward on a hinge). Double-hung windows only open ~50% because only one sash moves at a time. For the same egress opening, a casement can be much smaller overall — practical for tight spaces where you can't fit a large double-hung.",
    },
    {
      question: "How do I calculate rough opening size?",
      answer:
        "Standard rule: add 1/2 inch to each side of the window's advertised dimensions. A 36 × 48 window needs a 37 × 49 rough opening. Some brands specify more — Andersen often calls for 5/8\" each side, Pella varies. Always verify with the installation instructions for the specific window you're buying.",
    },
    {
      question: "Do I need egress windows in the basement?",
      answer:
        "If the basement has any sleeping rooms, yes — those rooms need compliant egress windows. If the basement is purely storage/utility, egress is not required per IRC but may be required locally. Egress windows in basements need window wells (below-grade excavated space) with minimum 9 sq ft area and a permanent ladder for deep wells.",
    },
    {
      question: "What does 'rough opening' mean?",
      answer:
        "The framed opening in the wall before the window is installed. The window fits inside, with shims adjusting position and flashing sealing the perimeter. Rough opening must be larger than the window: typically 0.5-1 inch on each side. Too small: window won't fit. Too large: more shimming required, weaker connection.",
    },
    {
      question: "How much natural light do I need per room?",
      answer:
        "IRC requires 8% of floor area as glass for habitable rooms (bedrooms, living rooms, dining rooms, kitchens). For a 150 sq ft bedroom: 12 sq ft of glass minimum. A single 36 × 48\" window is 12 sq ft — just meeting code. For comfortable light, double this. The calculator flags rooms where the window is too small.",
    },
    {
      question: "Can I use a skylight for egress or light?",
      answer:
        "Skylights count for light (when overhead, they provide more lumens per sq ft than wall windows due to direct sky view). Skylights do NOT count for egress — you can't climb out of a skylight in a fire. Skylights can count for ventilation if they're operable. For bedrooms: always need at least one wall window or door for egress.",
    },
    {
      question: "What about window wells?",
      answer:
        "Required for egress windows with sills below grade. Minimum well dimensions: 9 sq ft horizontal area, 36-inch projection from the foundation. Minimum 44\" depth needs a permanent ladder. Wells over 44\" need attached ladders or steps, never a removable ladder. Budget $500-2,000 for a pre-fab well, $1,500-5,000 for a custom well with ladder and drain.",
    },
  ],
};
