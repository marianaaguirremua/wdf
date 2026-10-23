// Energized path through the single-line diagram: incoming line → breaker → transformer → bus.
const FEED = "M230 30 V120 M230 168 V236 M230 300 V350 M90 350 H370 M130 350 V400 M330 350 V400";

/** Single-line diagram of a small substation, drawn in the light-section line style. */
export function SingleLineDiagram({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 460 440" fill="none" role="img" aria-label={label} className="h-full w-full">
      <path d={FEED} stroke="var(--paper-foreground)" strokeOpacity="0.18" strokeWidth="2" />
      <path d={FEED} stroke="var(--accent)" strokeWidth="2" className="motif-flow" />
      {/* Breaker */}
      <rect
        x="208"
        y="120"
        width="44"
        height="48"
        fill="#fff"
        stroke="var(--petroleum)"
        strokeWidth="2"
      />
      <path d="M214 160 L246 128" stroke="var(--petroleum)" strokeWidth="2" />
      {/* Transformer: two coupled windings */}
      <circle cx="230" cy="252" r="26" fill="#fff" stroke="var(--petroleum)" strokeWidth="2" />
      <circle cx="230" cy="284" r="26" fill="none" stroke="var(--petroleum)" strokeWidth="2" />
      {/* Feeders */}
      {[130, 330].map((x) => (
        <g key={x}>
          <rect
            x={x - 14}
            y="400"
            width="28"
            height="22"
            fill="#fff"
            stroke="var(--petroleum)"
            strokeWidth="2"
          />
          <path d={`M${x - 6} 411 h12`} stroke="var(--petroleum)" strokeWidth="2" />
        </g>
      ))}
      <text x="270" y="150" className="label-mono" fill="var(--paper-muted)">
        52
      </text>
      <text x="270" y="272" className="label-mono" fill="var(--paper-muted)">
        HV / MV
      </text>
      <text x="380" y="345" className="label-mono" fill="var(--paper-muted)">
        BUS
      </text>
      {/* Source */}
      <circle cx="230" cy="30" r="22" fill="var(--accent)" />
      <path d="M233 14 222 31h7l-2 15 11-18h-7l2-14Z" fill="var(--ink)" />
    </svg>
  );
}
