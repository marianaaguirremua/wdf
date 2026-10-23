import type { Messages } from "@/i18n";

type Copy = Messages["threepl"]["hero"]["graphic"];

// Flat schematic of the Mexicali–Calexico crossing: U.S. side on navy-2, Mexico on navy-3, the
// border as a sand line, and a terracotta route from Mexicali, B.C. to California and Arizona.
const W = 600;
const H = 480;
const BORDER_Y = 250;
const MEXICALI: [number, number] = [170, 382];
const CROSSING: [number, number] = [300, BORDER_Y];
const CALEXICO: [number, number] = [300, 196];
const MARKETS = { x: 368, y: 64, w: 210, h: 62 };
const ROUTE = `M${MEXICALI.join(" ")}C190 318 300 318 ${CROSSING.join(" ")}S384 132 ${MARKETS.x} ${MARKETS.y + MARKETS.h / 2}`;

export function CrossingGraphic({ copy }: { copy: Copy }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={copy.label}
      className="block h-auto w-full"
    >
      <defs>
        <marker
          id="crossing-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0L10 5L0 10Z" fill="var(--accent)" />
        </marker>
        <pattern id="crossing-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0V60M0 60H60" stroke="#fff" strokeOpacity="0.05" />
        </pattern>
      </defs>

      {/* Two sides of the border */}
      <rect width={W} height={BORDER_Y} fill="var(--ink-2)" />
      <rect y={BORDER_Y} width={W} height={H - BORDER_Y} fill="var(--ink-3)" />
      <rect width={W} height={H} fill="url(#crossing-grid)" />

      <text
        x="28"
        y="44"
        className="font-mono uppercase"
        fontSize="16"
        letterSpacing="0.3em"
        fill="var(--ink-muted)"
      >
        {copy.us}
      </text>
      <text
        x="28"
        y={H - 30}
        className="font-mono uppercase"
        fontSize="16"
        letterSpacing="0.3em"
        fill="var(--ink-muted)"
      >
        {copy.mx}
      </text>

      {/* Border */}
      <line
        x1="0"
        y1={BORDER_Y}
        x2={W}
        y2={BORDER_Y}
        stroke="var(--sand)"
        strokeWidth="3"
        strokeDasharray="14 8"
      />
      <text
        x={W - 28}
        y={BORDER_Y + 30}
        textAnchor="end"
        className="font-mono uppercase"
        fontSize="15"
        letterSpacing="0.14em"
        fill="var(--sand)"
      >
        {copy.border}
      </text>

      {/* Destination: California and Arizona markets */}
      <rect
        {...{ x: MARKETS.x, y: MARKETS.y, width: MARKETS.w, height: MARKETS.h }}
        rx="4"
        fill="var(--ink)"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <text
        x={MARKETS.x + MARKETS.w / 2}
        y={MARKETS.y + 38}
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="var(--ink-foreground)"
      >
        {copy.markets}
      </text>

      {/* Route: Mexicali → crossing → markets */}
      <path d={ROUTE} fill="none" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d={ROUTE}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="route-flow"
        markerEnd="url(#crossing-arrow)"
      />

      {/* Calexico, across the border */}
      <circle cx={CALEXICO[0]} cy={CALEXICO[1]} r="5" fill="var(--ink-muted)" />
      <text
        x={CALEXICO[0] - 14}
        y={CALEXICO[1] + 5}
        textAnchor="end"
        fontSize="18"
        fill="var(--ink-foreground)"
      >
        {copy.calexico}
      </text>

      {/* Crossing point */}
      <circle
        cx={CROSSING[0]}
        cy={CROSSING[1]}
        r="17"
        fill="var(--ink)"
        stroke="var(--accent)"
        strokeWidth="3"
      />
      <circle cx={CROSSING[0]} cy={CROSSING[1]} r="6" fill="var(--sand)" />
      <text
        x={W - 24}
        y={CROSSING[1] - 14}
        textAnchor="end"
        className="font-mono uppercase"
        fontSize="14"
        letterSpacing="0.1em"
        fill="var(--sand)"
      >
        {copy.crossing}
      </text>

      {/* Origin: Mexicali, B.C. */}
      <rect
        x={MEXICALI[0] - 11}
        y={MEXICALI[1] - 11}
        width="22"
        height="22"
        rx="3"
        fill="var(--accent)"
      />
      <text
        x={MEXICALI[0]}
        y={MEXICALI[1] + 40}
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="var(--ink-foreground)"
      >
        {copy.mexicali}
      </text>
    </svg>
  );
}
