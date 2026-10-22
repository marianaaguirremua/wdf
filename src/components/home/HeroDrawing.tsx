import type { CSSProperties } from "react";

// Decorative engineering drawing for the hero: a flanged, machined part in front and side
// view with centerlines, dimensions and a title block. Pure SVG + CSS (no libraries); lines
// draw in on load, a protractor ring turns slowly and an inspection line scans the part.

// Round trig output so server and browser render identical attribute strings (hydration).
const r2 = (n: number) => Math.round(n * 100) / 100;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const C = { x: 250, y: 270 };
const bolts = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3 + Math.PI / 6;
  return { x: r2(C.x + 118 * Math.cos(a)), y: r2(C.y + 118 * Math.sin(a)) };
});
const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

export function HeroDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="scan-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--teal)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--teal)" stopOpacity="0.22" />
        </linearGradient>
        <clipPath id="front-clip">
          <circle cx={C.x} cy={C.y} r="150" />
        </clipPath>
        <pattern
          id="hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="var(--teal)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Sheet frame + rulers */}
      <g stroke="var(--ink-muted)" strokeOpacity="0.35" strokeWidth="1">
        <rect
          className="draw"
          style={d(0)}
          pathLength={1}
          x="20.5"
          y="20.5"
          width="559"
          height="559"
        />
        {Array.from({ length: 23 }, (_, i) => (
          <line
            key={`t${i}`}
            x1={45 + i * 23.5}
            y1="20"
            x2={45 + i * 23.5}
            y2={i % 4 === 0 ? 32 : 26}
          />
        ))}
        {Array.from({ length: 23 }, (_, i) => (
          <line
            key={`l${i}`}
            x1="20"
            y1={45 + i * 23.5}
            x2={i % 4 === 0 ? 32 : 26}
            y2={45 + i * 23.5}
          />
        ))}
      </g>

      {/* Protractor ring (slow rotation) */}
      <g className="spin-slow" stroke="var(--ink-muted)" strokeOpacity="0.4">
        <circle cx={C.x} cy={C.y} r="182" strokeDasharray="1 5" />
        {ticks.map((deg) => {
          const a = (deg * Math.PI) / 180;
          const inner = deg % 30 === 0 ? 172 : 177;
          return (
            <line
              key={deg}
              x1={r2(C.x + 182 * Math.cos(a))}
              y1={r2(C.y + 182 * Math.sin(a))}
              x2={r2(C.x + inner * Math.cos(a))}
              y2={r2(C.y + inner * Math.sin(a))}
            />
          );
        })}
      </g>

      {/* Centerlines */}
      <g
        stroke="var(--teal)"
        strokeOpacity="0.45"
        strokeDasharray="18 4 3 4"
        className="fade-up"
        style={d(900)}
      >
        <line x1="70" y1={C.y} x2="560" y2={C.y} />
        <line x1={C.x} y1="80" x2={C.x} y2="460" />
        <circle cx={C.x} cy={C.y} r="118" />
      </g>

      {/* Front view */}
      <g stroke="var(--teal)" strokeWidth="1.5">
        <circle className="draw" style={d(200)} pathLength={1} cx={C.x} cy={C.y} r="150" />
        <circle className="draw" style={d(450)} pathLength={1} cx={C.x} cy={C.y} r="70" />
        <circle className="draw" style={d(650)} pathLength={1} cx={C.x} cy={C.y} r="38" />
        {bolts.map((b, i) => (
          <circle
            key={i}
            className="draw"
            style={d(800 + i * 90)}
            pathLength={1}
            cx={b.x}
            cy={b.y}
            r="10"
          />
        ))}
      </g>

      {/* Inspection scan across the front view */}
      <g clipPath="url(#front-clip)">
        <g className="scan" style={{ "--scan": "290px" } as CSSProperties}>
          <rect x="90" y="80" width="320" height="40" fill="url(#scan-grad)" />
          <line x1="90" y1="120" x2="410" y2="120" stroke="var(--teal)" strokeOpacity="0.8" />
        </g>
      </g>

      {/* Side section view */}
      <g stroke="var(--teal)" strokeWidth="1.5">
        <path
          className="draw"
          style={d(500)}
          pathLength={1}
          d="M450 120 H478 V200 H528 V340 H478 V420 H450 Z"
        />
        <path
          d="M450 120 H478 V200 H528 V232 H450 Z M450 308 H528 V340 H478 V420 H450 Z"
          fill="url(#hatch)"
          stroke="none"
          className="fade-up"
          style={d(1400)}
        />
        <g strokeDasharray="5 4" strokeOpacity="0.6" strokeWidth="1">
          <line x1="450" y1="232" x2="528" y2="232" />
          <line x1="450" y1="308" x2="528" y2="308" />
        </g>
      </g>

      {/* Dimensions */}
      <g
        stroke="var(--ink-muted)"
        strokeOpacity="0.7"
        strokeWidth="1"
        className="fade-up"
        style={d(1200)}
      >
        <line x1="100" y1="96" x2="100" y2="262" strokeOpacity="0.35" />
        <line x1="400" y1="96" x2="400" y2="262" strokeOpacity="0.35" />
        <line x1="100" y1="104" x2="400" y2="104" />
        <path d="M100 104 l9 -3 v6 Z M400 104 l-9 -3 v6 Z" fill="var(--ink-muted)" stroke="none" />
        <line x1="548" y1="120" x2="548" y2="420" />
        <line x1="482" y1="120" x2="556" y2="120" strokeOpacity="0.35" />
        <line x1="482" y1="420" x2="556" y2="420" strokeOpacity="0.35" />
        <path d="M548 120 l-3 9 h6 Z M548 420 l-3 -9 h6 Z" fill="var(--ink-muted)" stroke="none" />
        <polyline points={`${bolts[5]!.x + 7},${bolts[5]!.y - 7} 398,140 470,140`} />
      </g>
      <g
        fill="var(--ink-muted)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="1.5"
        className="fade-up"
        style={d(1500)}
      >
        <text x="250" y="96" textAnchor="middle">
          Ø 300.00
        </text>
        <text x="562" y="274" transform="rotate(90 562 274)" textAnchor="middle">
          300.00
        </text>
        <text x="396" y="134">
          6× Ø 20
        </text>
        <text x="450" y="108">
          SECTION A–A
        </text>
      </g>

      {/* Title block */}
      <g className="fade-up" style={d(1700)}>
        <g stroke="var(--ink-muted)" strokeOpacity="0.45">
          <rect x="360.5" y="470.5" width="200" height="90" />
          <line x1="360" y1="500" x2="560" y2="500" />
          <line x1="360" y1="530" x2="560" y2="530" />
          <line x1="460" y1="500" x2="460" y2="560" />
        </g>
        <g fill="var(--ink-muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6">
          <text x="372" y="490" fill="var(--ink-foreground)" fontWeight="500">
            WDF
          </text>
          <text x="548" y="490" textAnchor="end">
            SHEET 01
          </text>
          <text x="372" y="519">
            SCALE 1:2
          </text>
          <text x="472" y="519">
            UNITS MM
          </text>
          <text x="372" y="549">
            REV A
          </text>
          <text x="472" y="549">
            THIRD ANGLE
          </text>
        </g>
      </g>

      {/* Center mark */}
      <g stroke="var(--ink-foreground)" strokeOpacity="0.8">
        <line x1={C.x - 8} y1={C.y} x2={C.x + 8} y2={C.y} />
        <line x1={C.x} y1={C.y - 8} x2={C.x} y2={C.y + 8} />
      </g>
      <circle cx={C.x} cy={C.y} r="2.5" fill="var(--teal)" className="blink" />
    </svg>
  );
}
