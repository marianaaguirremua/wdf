// Line icons and flags for the 3PL cross-border section. Icons inherit `currentColor` and work
// both in HTML and nested inside the map SVG (pass x/y/size there).

import type { ReactNode } from "react";

type IconProps = { className?: string; x?: number; y?: number; size?: number };

function Icon({ className, x, y, size = 24, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      x={x}
      y={y}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </Icon>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </Icon>
  );
}

export function AnchorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14M8 11h8M5 14a7 7 0 0 0 14 0" />
    </Icon>
  );
}

type FlagProps = { x: number; y: number; w: number };

/** Simplified U.S. flag (stripes and canton), 19:10. */
export function UsFlag({ x, y, w }: FlagProps) {
  const h = (w * 10) / 19;
  const stripe = h / 13;
  return (
    <g aria-hidden>
      <rect x={x} y={y} width={w} height={h} fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={x} y={y + i * 2 * stripe} width={w} height={stripe} fill="#b22234" />
      ))}
      <rect x={x} y={y} width={w * 0.4} height={stripe * 7} fill="#3c3b6e" />
    </g>
  );
}

/** Simplified Mexican flag (tricolor with the emblem as a dot), 7:4. */
export function MxFlag({ x, y, w }: FlagProps) {
  const h = (w * 4) / 7;
  return (
    <g aria-hidden>
      <rect x={x} y={y} width={w / 3} height={h} fill="#006847" />
      <rect x={x + w / 3} y={y} width={w / 3} height={h} fill="#fff" />
      <rect x={x + (2 * w) / 3} y={y} width={w / 3} height={h} fill="#ce1126" />
      <circle cx={x + w / 2} cy={y + h / 2} r={h * 0.16} fill="#8a5a2b" />
    </g>
  );
}
