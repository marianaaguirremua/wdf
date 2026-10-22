import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Bolt } from "./Bolt";

// Energized path through the single-line diagram: incoming line → breaker → transformer → bus.
const FEED = "M230 30 V120 M230 168 V236 M230 300 V350 M90 350 H370 M130 350 V400 M330 350 V400";

/** Single-line diagram of a small substation, drawn in the light-section line style. */
function SingleLineDiagram({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 460 440" fill="none" role="img" aria-label={label} className="h-full w-full">
      <path d={FEED} stroke="var(--paper-foreground)" strokeOpacity="0.18" strokeWidth="2" />
      <path d={FEED} stroke="var(--mustard)" strokeWidth="2" className="motif-flow" />
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
      <circle cx="230" cy="30" r="22" fill="var(--mustard)" />
      <path d="M233 14 222 31h7l-2 15 11-18h-7l2-14Z" fill="var(--ink)" />
    </svg>
  );
}

export function EnergyHero() {
  const { locale, t } = useI18n();
  const h = t.energy.hero;

  return (
    <section
      aria-labelledby="energy-title"
      className="relative isolate overflow-hidden bg-white text-paper-foreground"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(90%_80%_at_75%_40%,#000_25%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--mustard-soft),transparent)]"
      />

      <div className="container-wdf grid items-center gap-14 pb-20 pt-[calc(var(--header-h)+4.5rem)] md:pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="lg:col-span-7">
          <p
            className="label-mono fade-up inline-flex items-center gap-2.5 text-mustard-deep"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            <Bolt className="size-4 text-mustard" />
            {h.eyebrow}
          </p>
          <h1
            id="energy-title"
            className="display mt-7 text-[clamp(2.6rem,6.2vw,5.6rem)] font-semibold"
          >
            {h.title.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties}>
                  {i ? (
                    <span className="bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--mustard)_55%,transparent)_62%)] box-decoration-clone">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="fade-up mt-10 max-w-[36rem] text-[1.0625rem] leading-relaxed text-paper-muted md:text-xl"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            {h.body}
          </p>
          <ul
            className="fade-up mt-8 flex flex-wrap gap-2"
            style={{ "--d": "700ms" } as CSSProperties}
          >
            {h.tags.map((tag) => (
              <li
                key={tag}
                className="label-mono inline-flex items-center gap-2 rounded-sm border border-paper-foreground/15 bg-white px-3 py-2 text-[0.65rem] text-paper-foreground/80"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-mustard" />
                {tag}
              </li>
            ))}
          </ul>
          <div className="fade-up mt-10" style={{ "--d": "800ms" } as CSSProperties}>
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="mustard"
            >
              {h.primary}
            </ButtonLink>
          </div>
        </div>

        <div
          className="fade-up mx-auto aspect-[46/44] w-full max-w-[26rem] lg:col-span-5 lg:max-w-none"
          style={{ "--d": "400ms" } as CSSProperties}
        >
          <SingleLineDiagram label={h.drawingLabel} />
        </div>
      </div>
    </section>
  );
}
