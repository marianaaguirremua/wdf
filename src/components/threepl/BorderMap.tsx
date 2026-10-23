import type { Messages } from "@/i18n";
import { THREEPL_LOCATIONS } from "@/lib/site";
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
import { AnchorIcon, MxFlag, UsFlag } from "./icons";

type MapCopy = Messages["threepl"]["hero"]["map"];

const P = Object.fromEntries(Object.entries(PLACES).map(([k, v]) => [k, project(v)])) as Record<
  keyof typeof PLACES,
  [number, number]
>;

// The map sits on slate-blue land so the navy cards and teal routes stand out against it.
const LAND = "#2f4c68";
const WATER = "#1c3047";
const TEAL = "var(--teal)";
const TEAL_TEXT = "#5ad3cc"; // lighter teal for labels on the slate land
const REGION = "#b8c6d2";
const TEXT = "var(--ink-foreground)";

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
  size = 19,
  fill = REGION,
  spacing = "0",
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

/** A WDF location card: region, name and role, then a rule and contact lines. */
function Card({
  x,
  y,
  w,
  region,
  name,
  role,
  lines,
}: {
  x: number;
  y: number;
  w: number;
  region: string;
  name: string;
  role: string;
  lines: readonly string[];
}) {
  const h = 152 + lines.length * 26;
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
        filter="url(#card-shadow)"
      />
      <Label
        x={x + 22}
        y={y + 36}
        size={16}
        fill={TEAL_TEXT}
        spacing="0.3em"
        className="font-mono uppercase"
      >
        {region}
      </Label>
      <Label
        x={x + 22}
        y={y + 80}
        size={34}
        fill={TEXT}
        spacing="-0.01em"
        className="font-semibold"
      >
        {name}
      </Label>
      <Label x={x + 22} y={y + 110} size={21} fill={TEXT} className="opacity-80">
        {role}
      </Label>
      <line
        x1={x + 22}
        y1={y + 132}
        x2={x + w - 22}
        y2={y + 132}
        stroke="var(--ink-3)"
        strokeWidth="1.5"
      />
      {lines.map((line, i) => (
        <Label
          key={line}
          x={x + 22}
          y={y + 162 + i * 26}
          size={19}
          fill={TEXT}
          className="opacity-90"
        >
          {line}
        </Label>
      ))}
    </g>
  );
}

function Pin({ at: [x, y] }: { at: [number, number] }) {
  return (
    <g>
      <circle cx={x} cy={y} r="22" fill={TEAL} fillOpacity="0.22" className="pin-pulse" />
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
      <circle cx={x} cy={y} r="5" fill={REGION} />
      <Label x={x + dx} y={y + dy} size={20} fill={TEXT} className="opacity-85">
        {name}
      </Label>
    </g>
  );
}

/** Region name in tracked monospace, optionally followed by a flag. */
function Region({
  at: [x, y],
  text,
  size = 19,
  flag,
  anchor = "start",
}: {
  at: [number, number];
  text: string;
  size?: number;
  flag?: "us" | "mx";
  anchor?: "start" | "middle";
}) {
  // Monospace advance (0.6em) plus 0.42em tracking per character.
  const width = text.length * size * 1.02;
  const start = anchor === "middle" ? x - width / 2 : x;
  const fx = start + width + 6;
  const fy = y - size * 0.82;
  return (
    <g>
      <Label
        x={x}
        y={y}
        size={size}
        anchor={anchor}
        spacing="0.42em"
        className="font-mono uppercase"
      >
        {text}
      </Label>
      {flag === "us" && <UsFlag x={fx} y={fy} w={size * 1.9} />}
      {flag === "mx" && <MxFlag x={fx} y={fy} w={size * 1.75} />}
    </g>
  );
}

/**
 * Illustrative map of the Mexicali–Yuma border region: WDF locations as pins with their cards,
 * the cross-border link between them, and the seaports and trade lanes they connect to.
 * Labels are anchored to coordinates so they follow the map frame.
 */
export function BorderMap({ copy }: { copy: MapCopy }) {
  const at = (lon: number, lat: number) => project([lon, lat]);
  const salton = project(SALTON_SEA.center);
  const [bx, by] = at(-116.45, 32.6);
  const exitUS: [number, number] = [MAP_W - 16, 118];
  const exitMX: [number, number] = [MAP_W - 16, 600];
  const exitLA: [number, number] = [16, 92];
  const gateway = { size: 22, fill: TEAL_TEXT, className: "font-semibold" } as const;
  const detail = { size: 20, fill: TEXT, className: "opacity-80" } as const;
  const [yx, yy] = P.yuma;
  const [mx, my] = P.mexicali;
  const [ex, ey] = P.ensenada;
  const mexicoAt = at(-115.75, 31.3);

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
        <pattern id="map-grid" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M120 0V120M0 120H120" stroke="#fff" strokeOpacity="0.06" strokeWidth="1.5" />
        </pattern>
        <linearGradient id="map-land" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={LAND} stopOpacity="0.85" />
          <stop offset="1" stopColor={LAND} />
        </linearGradient>
        <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#050b14" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Land, water, grid */}
      <rect width={MAP_W} height={MAP_H} fill="var(--ink)" />
      <rect width={MAP_W} height={MAP_H} fill="url(#map-land)" />
      <path d={pathOf(PACIFIC, true)} fill={WATER} />
      <path d={pathOf(GULF, true)} fill={WATER} />
      <ellipse
        cx={salton[0]}
        cy={salton[1]}
        rx={SALTON_SEA.rx}
        ry={SALTON_SEA.ry}
        transform={`rotate(${SALTON_SEA.tilt} ${salton[0]} ${salton[1]})`}
        fill={WATER}
      />
      <rect width={MAP_W} height={MAP_H} fill="url(#map-grid)" />

      {/* Boundaries */}
      {STATE_LINES.map((line, i) => (
        <path
          key={i}
          d={pathOf(line)}
          fill="none"
          stroke={REGION}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      ))}
      <path
        d={pathOf(BORDER)}
        fill="none"
        stroke="#dfe7ee"
        strokeOpacity="0.75"
        strokeWidth="2.5"
        strokeDasharray="14 9"
      />
      <Label
        x={bx}
        y={by - 12}
        anchor="middle"
        size={17}
        spacing="0.32em"
        className="font-mono uppercase"
      >
        {copy.border}
      </Label>

      {/* Region names */}
      <Region at={at(-115.25, 33.9)} text={copy.unitedStates} size={22} flag="us" />
      <Region at={at(-116.75, 33.05)} text={copy.california} />
      <Region at={at(-113.3, 32.45)} text={copy.arizona} />
      <Region at={at(-113.15, 31.35)} text={copy.sonora} />
      <Region at={mexicoAt} text={copy.bajaCalifornia} anchor="middle" />
      <Region
        at={[mexicoAt[0], mexicoAt[1] + 38]}
        text={copy.mexico}
        size={22}
        anchor="middle"
        flag="mx"
      />
      <Label x={at(-117.3, 31.35)[0]} y={at(-117.3, 31.35)[1]} size={21} italic>
        {copy.pacific}
      </Label>
      <Label x={at(-113.95, 31.05)[0]} y={at(-113.95, 31.05)[1]} size={21} italic anchor="middle">
        {copy.gulf}
      </Label>

      {/* Gateways and trade lanes (dotted) */}
      <path d={arc(P.mexicali, exitLA, -70)} {...route} markerEnd="url(#map-arrow)" />
      <path d={arc(P.mexicali, [ex, ey - 20], 80)} {...route} />
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

      {/* Seaport gateways (anchors): not WDF facilities */}
      <circle cx={ex} cy={ey} r="20" fill={WATER} stroke={TEAL} strokeWidth="2.5" />
      <g color={TEAL_TEXT}>
        <AnchorIcon x={ex - 12} y={ey - 12} size={24} />
      </g>
      <Label x={ex - 10} y={ey + 52} {...gateway}>
        {copy.ensenada}
      </Label>
      <g color={TEAL_TEXT}>
        <AnchorIcon x={40} y={24} size={28} />
      </g>
      <Label x={80} y={44} {...gateway}>
        {copy.ports.name}
      </Label>
      <Label x={80} y={72} {...detail}>
        {copy.ports.detail}
      </Label>

      {/* Inland trade lanes */}
      <Label x={MAP_W - 32} y={64} anchor="end" {...gateway}>
        {copy.interiorUS.name}
      </Label>
      <Label x={MAP_W - 32} y={92} anchor="end" {...detail}>
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
      <line x1={yx} y1={yy} x2={yx} y2={yy - 80} stroke="var(--ink-3)" strokeWidth="2" />
      <line x1={mx} y1={my} x2={mx} y2={my + 80} stroke="var(--ink-3)" strokeWidth="2" />
      <Card
        x={yx - 40}
        y={yy - 80 - 178}
        w={270}
        {...copy.yuma}
        lines={[THREEPL_LOCATIONS.yuma.phone]}
      />
      <Card
        x={mx - 30}
        y={my + 80}
        w={330}
        {...copy.mexicali}
        lines={THREEPL_LOCATIONS.mexicali.address}
      />
      <Pin at={P.mexicali} />
      <Pin at={P.yuma} />
    </svg>
  );
}
