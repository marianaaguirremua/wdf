// A PLC on a control network: SCADA above, and HMI, robot and field I/O on the bus below.
const DATA = "M230 92 V150 M230 210 V262 M70 262 H390 M90 262 V316 M230 262 V316 M370 262 V316";

const box = { fill: "#fff", stroke: "var(--petroleum)", strokeWidth: 2 } as const;

/** Control-network diagram, drawn in the light-section line style with data flowing in the accent. */
export function ControlNetworkDiagram({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 460 440" fill="none" role="img" aria-label={label} className="h-full w-full">
      <path d={DATA} stroke="var(--paper-foreground)" strokeOpacity="0.18" strokeWidth="2" />
      <path d={DATA} stroke="var(--accent)" strokeWidth="2" className="motif-flow" />

      {/* SCADA workstation */}
      <rect x="180" y="34" width="100" height="58" rx="4" {...box} />
      <path d="M196 76 l16 -14 l14 8 l20 -20 l18 12" stroke="var(--accent)" strokeWidth="2" />

      {/* PLC rack */}
      <rect x="170" y="150" width="120" height="60" rx="3" {...box} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={182 + i * 20}
          y="162"
          width="12"
          height="36"
          fill="var(--accent)"
          fillOpacity={i === 0 ? 1 : 0.25}
        />
      ))}

      {/* HMI panel */}
      <rect x="56" y="316" width="68" height="52" rx="4" {...box} />
      <rect x="66" y="326" width="48" height="28" fill="var(--accent)" fillOpacity="0.2" />

      {/* Robot arm */}
      <path
        d="M206 372 h48 M230 372 v-22 l-18 -22 l26 -14"
        stroke="var(--petroleum)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="230" cy="350" r="5" {...box} />
      <circle cx="212" cy="328" r="5" {...box} />

      {/* Field I/O */}
      <rect x="340" y="316" width="60" height="52" rx="3" {...box} />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={356 + i * 14}
          cy="342"
          r="4"
          fill="var(--accent)"
          fillOpacity={i === 1 ? 1 : 0.35}
        />
      ))}

      <text x="296" y="68" className="label-mono" fill="var(--paper-muted)">
        SCADA
      </text>
      <text x="300" y="186" className="label-mono" fill="var(--paper-muted)">
        PLC
      </text>
      <text x="62" y="396" className="label-mono" fill="var(--paper-muted)">
        HMI
      </text>
      <text x="350" y="396" className="label-mono" fill="var(--paper-muted)">
        I/O
      </text>
      <text x="396" y="258" className="label-mono" fill="var(--paper-muted)">
        NET
      </text>
    </svg>
  );
}
