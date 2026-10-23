import type { Messages } from "@/i18n";
import {
  BORDER,
  GULF,
  MAP_H,
  MAP_W,
  PACIFIC,
  PLACES,
  SALTON_SEA,
  STATE_LINES,
  pathOf,
  project,
} from "./border-region";

type MapCopy = Messages["threepl"]["hero"]["map"];

const P = Object.fromEntries(Object.entries(PLACES).map(([k, v]) => [k, project(v)])) as Record<
  keyof typeof PLACES,
  [number, number]
>;

const TEAL = "var(--teal)";
const MUTED = "var(--ink-muted)";

// Quadratic route from a to b, bowed by `bend` px perpendicular to the chord.
function arc([x1, y1]: [number, number], [x2, y2]: [number, number], bend: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const cx = mx + (-(y2 - y1) / len) * bend;
  const cy = my + ((x2 - x1) / len) * bend;
  return `M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}

const route = {
  stroke: TEAL,
  strokeWidth: 2.5,
  strokeDasharray: "1 9",
  strokeLinecap: "round",
  fill: "none",
} as const;

function Label({
  x,
  y,
  children,
  anchor = "start",
  className = "",
  size = 15,
  fill = MUTED,
  spacing = "0.32em",
  italic = false,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  className?: string;
  size?: number;
  fill?: string;
  spacing?: string;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill={fill}
      letterSpacing={spacing}
      fontStyle={italic ? "italic" : undefined}
      className={className}
    >
      {children}
    </text>
  );
}

function Card({
  x,
  y,
  w,
  h,
  region,
  name,
  role,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  region: string;
  name: string;
  role: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="var(--ink-2)"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
      />
      <Label x={x + 22} y={y + 36} size={16} fill={TEAL} className="font-mono uppercase">
        {region}
      </Label>
      <Label
        x={x + 22}
        y={y + 80}
        size={34}
        fill="var(--ink-foreground)"
        spacing="-0.01em"
        className="font-semibold"
      >
        {name}
      </Label>
      <Label
        x={x + 22}
        y={y + 112}
        size={21}
        fill="var(--ink-foreground)"
        spacing="0"
        className="opacity-80"
      >
        {role}
      </Label>
    </g>
  );
}

function Pin({ at: [x, y] }: { at: [number, number] }) {
  return (
    <g>
      <circle cx={x} cy={y} r="22" fill={TEAL} fillOpacity="0.2" className="pin-pulse" />
      <circle cx={x} cy={y} r="12" fill={TEAL} stroke="var(--ink)" strokeWidth="4" />
    </g>
  );
}

function Dot({
  at: [x, y],
  name,
  dx = 12,
  dy = 5,
}: {
  at: [number, number];
  name: string;
  dx?: number;
  dy?: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="5" fill={MUTED} />
      <Label
        x={x + dx}
        y={y + dy}
        size={20}
        spacing="0"
        fill="var(--ink-foreground)"
        className="opacity-75"
      >
        {name}
      </Label>
    </g>
  );
}

/**
 * Illustrative map of the Mexicali–Yuma border region: WDF locations as pins, the cross-border
 * link between them, and the gateways and trade lanes they connect to as dotted routes.
 * Labels are anchored to coordinates so they follow the map frame.
 */
export function BorderMap({ copy }: { copy: MapCopy }) {
  const at = (lon: number, lat: number) => project([lon, lat]);
  const salton = project(SALTON_SEA.center);
  const [bx, by] = at(-116.45, 32.6);
  const exitUS: [number, number] = [MAP_W - 16, 96];
  const exitMX: [number, number] = [MAP_W - 16, 600];
  const exitLA: [number, number] = [16, 92];
  const region = { size: 19, className: "font-mono uppercase" } as const;
  const gateway = { size: 22, fill: TEAL, spacing: "0", className: "font-semibold" } as const;
  const detail = {
    size: 20,
    fill: "var(--ink-foreground)",
    spacing: "0",
    className: "opacity-80",
  } as const;
  const [yx, yy] = P.yuma;
  const [mx, my] = P.mexicali;

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="img"
      aria-label={copy.label}
      className="block h-auto w-full"
    >
      <defs>
        <marker
          id="map-arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill={TEAL} />
        </marker>
        <pattern id="map-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M100 0V100M0 100H100" stroke="var(--ink-border)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Land, water, grid */}
      <rect width={MAP_W} height={MAP_H} fill="var(--ink-2)" />
      <path d={pathOf(PACIFIC, true)} fill="var(--ink)" />
      <path d={pathOf(GULF, true)} fill="var(--ink)" />
      <ellipse
        cx={salton[0]}
        cy={salton[1]}
        rx={SALTON_SEA.rx}
        ry={SALTON_SEA.ry}
        transform={`rotate(${SALTON_SEA.tilt} ${salton[0]} ${salton[1]})`}
        fill="var(--ink)"
      />
      <rect width={MAP_W} height={MAP_H} fill="url(#map-grid)" />

      {/* Boundaries */}
      {STATE_LINES.map((line, i) => (
        <path
          key={i}
          d={pathOf(line)}
          fill="none"
          stroke={MUTED}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      ))}
      <path
        d={pathOf(BORDER)}
        fill="none"
        stroke={MUTED}
        strokeOpacity="0.7"
        strokeWidth="2.5"
        strokeDasharray="14 9"
      />
      <Label
        x={bx}
        y={by - 12}
        anchor="middle"
        {...region}
        size={17}
        className="font-mono uppercase"
      >
        {copy.border}
      </Label>

      {/* Region names */}
      <Label
        x={at(-115.25, 33.9)[0]}
        y={at(-115.25, 33.9)[1]}
        {...region}
        size={22}
        spacing="0.42em"
      >
        {copy.unitedStates}
      </Label>
      <Label x={at(-116.75, 33.05)[0]} y={at(-116.75, 33.05)[1]} {...region}>
        {copy.california}
      </Label>
      <Label x={at(-113.3, 32.45)[0]} y={at(-113.3, 32.45)[1]} {...region}>
        {copy.arizona}
      </Label>
      <Label x={at(-113.15, 31.35)[0]} y={at(-113.15, 31.35)[1]} {...region}>
        {copy.sonora}
      </Label>
      <Label x={at(-115.75, 31.3)[0]} y={at(-115.75, 31.3)[1]} anchor="middle" {...region}>
        {copy.bajaCalifornia}
      </Label>
      <Label
        x={at(-115.75, 31.3)[0]}
        y={at(-115.75, 31.3)[1] + 36}
        anchor="middle"
        {...region}
        size={22}
        spacing="0.42em"
      >
        {copy.mexico}
      </Label>
      <Label x={at(-117.3, 31.35)[0]} y={at(-117.3, 31.35)[1]} size={21} italic spacing="0">
        {copy.pacific}
      </Label>
      <Label
        x={at(-113.95, 31.05)[0]}
        y={at(-113.95, 31.05)[1]}
        size={21}
        italic
        spacing="0"
        anchor="middle"
      >
        {copy.gulf}
      </Label>

      {/* Gateways and trade lanes (dotted) */}
      <path d={arc(P.mexicali, exitLA, -70)} {...route} markerEnd="url(#map-arrow)" />
      <path d={arc(P.mexicali, P.ensenada, 80)} {...route} />
      <path
        d={`M${P.yuma.join(" ")}Q${P.gilaBend.join(" ")} ${P.phoenix.join(" ")}T${exitUS.join(" ")}`}
        {...route}
        markerEnd="url(#map-arrow)"
      />
      <path
        d={`M${P.mexicali.join(" ")}Q${P.sanLuis[0] - 20} ${P.sanLuis[1] + 70} ${P.sonoyta.join(" ")}T${exitMX.join(" ")}`}
        {...route}
        markerEnd="url(#map-arrow)"
      />

      {/* One operation: Mexicali ↔ Yuma */}
      <path
        d={arc(P.mexicali, P.yuma, -46)}
        stroke={TEAL}
        strokeWidth="5"
        fill="none"
        className="motif-flow"
      />

      {/* Gateway and city labels */}
      <rect
        x={P.ensenada[0] - 10}
        y={P.ensenada[1] - 10}
        width="20"
        height="20"
        fill="var(--ink)"
        stroke={TEAL}
        strokeWidth="3"
      />
      <Label x={P.ensenada[0] - 10} y={P.ensenada[1] + 48} {...gateway}>
        {copy.ensenada}
      </Label>
      <Label x={44} y={44} {...gateway}>
        {copy.ports.name}
      </Label>
      <Label x={44} y={72} {...detail}>
        {copy.ports.detail}
      </Label>
      <Label x={MAP_W - 32} y={44} anchor="end" {...gateway}>
        {copy.interiorUS.name}
      </Label>
      <Label x={MAP_W - 32} y={72} anchor="end" {...detail}>
        {copy.interiorUS.detail}
      </Label>
      <Label x={MAP_W - 32} y={exitMX[1] + 44} anchor="end" {...gateway}>
        {copy.interiorMX.name}
      </Label>
      <Label x={MAP_W - 32} y={exitMX[1] + 72} anchor="end" {...detail}>
        {copy.interiorMX.detail}
      </Label>
      <Dot at={P.sanDiego} name="San Diego" dx={14} dy={-10} />
      <Dot at={P.tijuana} name="Tijuana" dx={14} dy={24} />
      <Dot at={P.phoenix} name="Phoenix" dx={-24} dy={34} />
      <Dot at={P.sanLuis} name="San Luis R.C." dx={16} dy={26} />

      {/* WDF locations */}
      <line x1={yx} y1={yy} x2={yx} y2={yy - 92} stroke="var(--ink-3)" strokeWidth="2" />
      <line x1={mx} y1={my} x2={mx} y2={my + 92} stroke="var(--ink-3)" strokeWidth="2" />
      <Card x={yx - 40} y={yy - 222} w={250} h={130} {...copy.yuma} />
      <Card x={mx - 30} y={my + 92} w={330} h={130} {...copy.mexicali} />
      <Pin at={P.mexicali} />
      <Pin at={P.yuma} />
    </svg>
  );
}
