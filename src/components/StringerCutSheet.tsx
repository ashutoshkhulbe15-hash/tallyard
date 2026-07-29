"use client";

import type { CalculatorResult } from "@/lib/types";

const INK = "#111814";
const INK_MUTED = "#3D3D3A";
const INK_FAINT = "#888780";
const ACCENT = "#147A46";
const ACCENT_SOFT = "#E7F3EC";
const WARM = "#B9791A";
const FAIL = "#B03A2E";

/** Inches to a readable fraction to the nearest 1/16, e.g. 6.875 -> 6-7/8" */
function toFraction(value: number): string {
  const whole = Math.floor(value);
  const sixteenths = Math.round((value - whole) * 16);
  if (sixteenths === 0) return `${whole}"`;
  if (sixteenths === 16) return `${whole + 1}"`;
  let num = sixteenths;
  let den = 16;
  while (num % 2 === 0) {
    num /= 2;
    den /= 2;
  }
  return whole === 0 ? `${num}/${den}"` : `${whole}-${num}/${den}"`;
}

export function StringerCutSheet({ result }: { result: CalculatorResult }) {
  const d = result.diagramData;
  if (!d) return null;

  const risers = Number(d.risers);
  const treads = Number(d.treads);
  const riserH = Number(d.riserHeight);
  const treadRun = Number(d.treadRun);
  const totalRise = Number(d.totalRise);
  const totalRun = Number(d.totalRun);
  const stringerLen = Number(d.stringerLength);
  const width = Number(d.width);
  const stringerCount = Number(d.stringerCount);
  const treadBoards = Number(d.treadBoards);
  const boardLabel = String(d.boardLabel);
  const angle = Number(d.angle);
  const treadThickness = Number(d.treadThickness);

  const riserOk = Boolean(d.riserOk);
  const runOk = Boolean(d.runOk);
  const widthOk = Boolean(d.widthOk);
  const guardsRequired = Boolean(d.guardsRequired);

  // Scale the sawtooth to fit the left region (max ~250px wide, ~185px tall)
  const scale = Math.min(250 / Math.max(totalRun, 1), 185 / Math.max(totalRise, 1), 3.2);
  const rPx = riserH * scale;
  const tPx = treadRun * scale;

  const baseY = 380;
  const startX = 70;
  let x = startX;
  let y = baseY;
  const pts: string[] = [`M ${x.toFixed(1)} ${y.toFixed(1)}`];
  for (let i = 0; i < risers; i++) {
    y -= rPx;
    pts.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
    if (i < risers - 1) {
      x += tPx;
      pts.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
  }
  const path = pts.join(" ");
  const topX = x;
  const topY = y;

  const checkRow = (label: string, ok: boolean, cy: number) => (
    <>
      <text x="412" y={cy} fontSize="12" fill={INK_MUTED}>
        {label}
      </text>
      <text
        x="652"
        y={cy}
        textAnchor="end"
        fontSize="11"
        fontWeight="700"
        fill={ok ? ACCENT : FAIL}
      >
        {ok ? "PASS" : "FAIL"}
      </text>
    </>
  );

  const allPass = riserOk && runOk && widthOk;

  return (
    <div>
      <div className="flex items-center justify-between mb-2 no-print">
        <span className="text-[11px] uppercase tracking-[0.14em] text-accent font-medium">
          Stringer cut sheet
        </span>
        <button
          onClick={() => window.print()}
          className="text-[12px] text-ink-muted hover:text-ink border border-line rounded px-2.5 py-1 font-medium"
        >
          Print cut sheet
        </button>
      </div>
      <div className="border border-line rounded bg-white p-2">
        <svg
          viewBox="0 0 680 510"
          width="100%"
          height="auto"
          role="img"
          aria-label={`Dimensioned stair stringer cut diagram: ${risers} risers at ${toFraction(
            riserH
          )}, ${treads} treads at ${toFraction(treadRun)}, with IRC R311.7 checks`}
        >
          <text x="16" y="24" fontSize="14" fontWeight="700" fill={INK}>
            STRINGER CUT SHEET
          </text>
          <text x="16" y="40" fontSize="10.5" fill={INK_MUTED}>
            tallyard.com/deck-stair-calculator &middot; total rise {toFraction(totalRise)} &middot;
            checked against IRC R311.7
          </text>
          <line x1="16" y1="50" x2="664" y2="50" stroke={INK} strokeWidth="1.5" />

          {/* board line */}
          <line
            x1={startX - 14}
            y1={baseY + 32}
            x2={topX + 27}
            y2={topY - 12}
            stroke={INK_FAINT}
            strokeWidth="1"
            strokeDasharray="6,4"
          />

          {/* sawtooth */}
          <path d={path} fill="none" stroke={INK} strokeWidth="2" />
          <line x1={startX} y1={baseY} x2={startX + 48} y2={baseY} stroke={INK} strokeWidth="2" />
          <text x={startX + 54} y={baseY + 4} fontSize="10.5" fill={INK_MUTED}>
            level cut &middot; sits on pad
          </text>
          <line x1={topX} y1={topY} x2={topX} y2={topY + 38} stroke={INK} strokeWidth="2" />
          <text x={topX + 7} y={topY + 12} fontSize="10.5" fill={INK_MUTED}>
            plumb cut
          </text>
          <text x={topX + 7} y={topY + 26} fontSize="10.5" fill={INK_MUTED}>
            meets rim
          </text>

          {/* riser dimension */}
          <line x1="58" y1={baseY} x2="58" y2={baseY - rPx} stroke={ACCENT} strokeWidth="1.5" />
          <line x1="53" y1={baseY} x2="63" y2={baseY} stroke={ACCENT} strokeWidth="1.5" />
          <line
            x1="53"
            y1={baseY - rPx}
            x2="63"
            y2={baseY - rPx}
            stroke={ACCENT}
            strokeWidth="1.5"
          />
          <text
            x="46"
            y={baseY - rPx / 2 + 4}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill={ACCENT}
          >
            {toFraction(riserH)}
          </text>
          <text x="46" y={baseY - rPx / 2 + 18} textAnchor="end" fontSize="10.5" fill={INK_MUTED}>
            riser
          </text>

          {/* run dimension on the second tread */}
          {risers > 2 && (
            <>
              <line
                x1={startX + tPx}
                y1={baseY - 2 * rPx + 10}
                x2={startX + 2 * tPx}
                y2={baseY - 2 * rPx + 10}
                stroke={ACCENT}
                strokeWidth="1.5"
              />
              <line
                x1={startX + tPx}
                y1={baseY - 2 * rPx + 5}
                x2={startX + tPx}
                y2={baseY - 2 * rPx + 15}
                stroke={ACCENT}
                strokeWidth="1.5"
              />
              <line
                x1={startX + 2 * tPx}
                y1={baseY - 2 * rPx + 5}
                x2={startX + 2 * tPx}
                y2={baseY - 2 * rPx + 15}
                stroke={ACCENT}
                strokeWidth="1.5"
              />
              <text
                x={startX + 1.5 * tPx}
                y={baseY - 2 * rPx + 2}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={ACCENT}
              >
                {toFraction(treadRun)}
              </text>
            </>
          )}

          {/* drop-the-bottom callout */}
          <circle cx={startX + 18} cy={baseY - 6} r="4" fill="none" stroke={WARM} strokeWidth="1.5" />
          <line x1={startX + 22} y1={baseY - 2} x2={startX + 78} y2={baseY + 24} stroke={WARM} strokeWidth="1" />
          <text x={startX + 82} y={baseY + 28} fontSize="10.5" fontWeight="600" fill={WARM}>
            drop bottom riser {toFraction(treadThickness)} (tread thickness)
          </text>

          <text x="16" y="436" fontSize="10.5" fill={INK_MUTED}>
            framing square: {toFraction(riserH)} on the tongue, {toFraction(treadRun)} on the blade
          </text>
          <text x="16" y="452" fontSize="10.5" fill={INK_MUTED}>
            stair angle {angle.toFixed(1)}&deg; &middot; dashed line: the {boardLabel} the stringer cuts from
          </text>

          {/* cut list */}
          <text x="400" y="84" fontSize="14" fontWeight="700" fill={INK}>
            Cut list
          </text>
          <line x1="400" y1="92" x2="664" y2="92" stroke={INK_FAINT} strokeWidth="1" />
          {[
            ["Risers", `${risers} @ ${toFraction(riserH)}`],
            ["Treads", `${treads} @ ${toFraction(treadRun)}`],
            ["Total run", toFraction(totalRun)],
            ["Stringer cut length", toFraction(stringerLen)],
            [`Stringers (${toFraction(width)} wide)`, `${stringerCount} × ${boardLabel}`],
            ["Tread boards (5/4×6)", `${treadBoards} @ ${toFraction(width)}`],
          ].map(([label, val], i) => (
            <g key={i}>
              <text x="400" y={112 + i * 22} fontSize="12" fontWeight="600" fill={INK}>
                {label}
              </text>
              <text
                x="664"
                y={112 + i * 22}
                textAnchor="end"
                fontSize="12"
                fontWeight="600"
                fill={INK}
                fontFamily="monospace"
              >
                {val}
              </text>
            </g>
          ))}

          {/* IRC checks */}
          <rect
            x="400"
            y="244"
            width="264"
            height="132"
            fill={allPass ? ACCENT_SOFT : "#FBEDEB"}
            stroke={allPass ? ACCENT : FAIL}
            strokeWidth="1.5"
            rx="4"
          />
          <text x="412" y="266" fontSize="14" fontWeight="700" fill={allPass ? ACCENT : FAIL}>
            IRC R311.7 checks
          </text>
          {checkRow(`Riser ≤ 7-3/4" (R311.7.5.1)`, riserOk, 290)}
          {checkRow(`Run ≥ 10" (R311.7.5.2)`, runOk, 312)}
          {checkRow(`Width ≥ 36" (R311.7.1)`, widthOk, 334)}
          {checkRow(`Nosing, run under 11" (R311.7.5.3)`, treadRun < 11, 356)}

          <text x="400" y="398" fontSize="10.5" fill={INK_MUTED}>
            {guardsRequired
              ? `Rise over 30": guards required (R312).`
              : `Rise under 30": guards not required.`}
          </text>
          <text x="400" y="414" fontSize="10.5" fill={INK_MUTED}>
            Handrail per R311.7.8.
          </text>

          <line x1="16" y1="466" x2="664" y2="466" stroke={INK_FAINT} strokeWidth="1" />
          <text x="16" y="484" fontSize="10.5" fill={INK_MUTED}>
            All risers equal within 3/8&quot; (R311.7.5.1). Cut one stringer, test-fit it against the deck, then use
          </text>
          <text x="16" y="500" fontSize="10.5" fill={INK_MUTED}>
            it as the template for the rest. Confirm with your local building department; local amendments apply.
          </text>
        </svg>
      </div>
    </div>
  );
}
