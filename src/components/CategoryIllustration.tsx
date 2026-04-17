import type { CalculatorCategory } from "@/lib/types";

interface CategoryIllustrationProps {
  category: CalculatorCategory;
  /** The big value to display on the illustration (e.g. "2.8 GAL") */
  valueLabel?: string;
}

/**
 * One small SVG illustration per vertical. The same motif is used across
 * all calculators in that category — 8 illustrations total, not 40. Each
 * is decorative and echoes the calculator's subject.
 */
export function CategoryIllustration({
  category,
  valueLabel,
}: CategoryIllustrationProps) {
  const common = {
    width: 200,
    height: 180,
    viewBox: "0 0 200 180",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (category) {
    case "paint":
      return (
        <svg {...common}>
          {/* Simple room floorplan with paint can */}
          <rect
            x="50"
            y="40"
            width="100"
            height="110"
            fill="#fff"
            stroke="#D4691C"
            strokeWidth="1.5"
            rx="4"
          />
          <rect x="65" y="55" width="70" height="45" fill="#FFE9D0" rx="2" />
          <rect x="65" y="110" width="32" height="32" fill="#F5EFE0" rx="2" />
          <rect x="103" y="110" width="32" height="32" fill="#F5EFE0" rx="2" />
          <circle cx="120" cy="65" r="4" fill="#D4691C" />
          {valueLabel && (
            <text
              x="100"
              y="37"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="10"
              fill="#D4691C"
              fontWeight="600"
              textAnchor="middle"
            >
              {valueLabel}
            </text>
          )}
          {/* Paint can */}
          <path
            d="M 155 70 L 175 85 L 175 115 L 155 130 Z"
            fill="#1A1814"
          />
          <circle cx="160" cy="78" r="2" fill="#D4691C" />
          {/* Decorative arrow */}
          <path
            d="M 30 100 Q 25 120 40 135"
            fill="none"
            stroke="#D4691C"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="40" cy="135" r="3" fill="#D4691C" />
        </svg>
      );

    case "concrete":
      return (
        <svg {...common}>
          {/* Simple concrete slab with grid */}
          <rect x="30" y="70" width="140" height="60" fill="#E8E2D0" stroke="#D4691C" strokeWidth="1.5" rx="2" />
          <path d="M 60 70 L 60 130 M 100 70 L 100 130 M 140 70 L 140 130 M 30 100 L 170 100" stroke="#D4691C" strokeWidth="1" opacity="0.4" />
          {valueLabel && (
            <text x="100" y="60" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
          {/* Trowel */}
          <path d="M 40 35 L 60 30 L 65 45 L 45 50 Z" fill="#1A1814" />
          <rect x="60" y="38" width="20" height="3" fill="#1A1814" rx="1" />
          {/* Depth indicator */}
          <path d="M 175 70 L 185 70 L 185 130 L 175 130" stroke="#D4691C" strokeWidth="1.5" fill="none" />
        </svg>
      );

    case "flooring":
      return (
        <svg {...common}>
          {/* Tile grid pattern */}
          <rect x="40" y="40" width="120" height="100" fill="#fff" stroke="#D4691C" strokeWidth="1.5" rx="2" />
          <g stroke="#D4691C" strokeWidth="1" opacity="0.5">
            <line x1="70" y1="40" x2="70" y2="140" />
            <line x1="100" y1="40" x2="100" y2="140" />
            <line x1="130" y1="40" x2="130" y2="140" />
            <line x1="40" y1="70" x2="160" y2="70" />
            <line x1="40" y1="100" x2="160" y2="100" />
            <line x1="40" y1="130" x2="160" y2="130" />
          </g>
          <rect x="70" y="70" width="30" height="30" fill="#FFE9D0" />
          <rect x="100" y="100" width="30" height="30" fill="#FFE9D0" />
          {valueLabel && (
            <text x="100" y="30" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
        </svg>
      );

    case "landscaping":
      return (
        <svg {...common}>
          {/* Garden bed with mulch pile */}
          <rect x="30" y="90" width="140" height="50" fill="#8B6A3A" opacity="0.2" rx="4" />
          <path d="M 50 130 Q 70 100 90 130 Q 110 100 130 130 Q 150 105 170 130" fill="#8B6A3A" opacity="0.4" />
          {/* Plant */}
          <circle cx="100" cy="60" r="18" fill="#D4691C" opacity="0.3" />
          <path d="M 100 78 L 100 95" stroke="#1A1814" strokeWidth="2" />
          <path d="M 90 55 Q 85 45 95 40 M 110 55 Q 115 45 105 40" stroke="#D4691C" strokeWidth="2" fill="none" />
          {valueLabel && (
            <text x="100" y="30" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
        </svg>
      );

    case "roofing":
      return (
        <svg {...common}>
          {/* House roof */}
          <path d="M 40 120 L 100 60 L 160 120 Z" fill="#fff" stroke="#D4691C" strokeWidth="1.5" />
          <path d="M 60 105 L 140 105 M 55 115 L 145 115" stroke="#D4691C" strokeWidth="1" opacity="0.5" />
          <rect x="50" y="120" width="100" height="30" fill="#F5EFE0" stroke="#D4691C" strokeWidth="1" />
          {valueLabel && (
            <text x="100" y="50" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
        </svg>
      );

    case "hvac":
      return (
        <svg {...common}>
          {/* Room with fan/heating symbol */}
          <rect x="40" y="50" width="120" height="90" fill="#fff" stroke="#D4691C" strokeWidth="1.5" rx="4" />
          <circle cx="100" cy="95" r="22" fill="none" stroke="#D4691C" strokeWidth="1.5" />
          <path d="M 100 73 L 100 95 L 115 95" stroke="#1A1814" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 100 85 A 10 10 0 0 1 110 95" stroke="#D4691C" strokeWidth="1" fill="none" />
          <path d="M 100 95 A 10 10 0 0 1 90 105" stroke="#D4691C" strokeWidth="1" fill="none" />
          {valueLabel && (
            <text x="100" y="40" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
        </svg>
      );

    case "drywall":
      return (
        <svg {...common}>
          {/* Drywall sheets stacked */}
          <rect x="40" y="50" width="80" height="100" fill="#fff" stroke="#D4691C" strokeWidth="1.5" rx="2" />
          <rect x="55" y="60" width="80" height="100" fill="#F5EFE0" stroke="#D4691C" strokeWidth="1.5" rx="2" />
          <rect x="70" y="70" width="80" height="100" fill="#FFE9D0" stroke="#D4691C" strokeWidth="1.5" rx="2" />
          {valueLabel && (
            <text x="100" y="40" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
        </svg>
      );

    case "solar":
      return (
        <svg {...common}>
          {/* Sun + solar panel */}
          <circle cx="55" cy="55" r="15" fill="#D4691C" />
          <g stroke="#D4691C" strokeWidth="2" strokeLinecap="round">
            <line x1="55" y1="30" x2="55" y2="36" />
            <line x1="55" y1="74" x2="55" y2="80" />
            <line x1="30" y1="55" x2="36" y2="55" />
            <line x1="74" y1="55" x2="80" y2="55" />
            <line x1="38" y1="38" x2="42" y2="42" />
            <line x1="68" y1="68" x2="72" y2="72" />
            <line x1="72" y1="38" x2="68" y2="42" />
            <line x1="42" y1="68" x2="38" y2="72" />
          </g>
          {/* Panel */}
          <path d="M 95 140 L 120 70 L 180 70 L 155 140 Z" fill="#1A1814" stroke="#D4691C" strokeWidth="1.5" />
          <g stroke="#D4691C" strokeWidth="0.5" opacity="0.6">
            <line x1="105" y1="123" x2="165" y2="123" />
            <line x1="115" y1="105" x2="175" y2="105" />
            <line x1="125" y1="88" x2="180" y2="88" />
            <line x1="135" y1="70" x2="135" y2="140" />
            <line x1="150" y1="70" x2="145" y2="140" />
          </g>
          {valueLabel && (
            <text x="140" y="160" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#D4691C" fontWeight="600" textAnchor="middle">{valueLabel}</text>
          )}
        </svg>
      );

    default:
      return null;
  }
}
