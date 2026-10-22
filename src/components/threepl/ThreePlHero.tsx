import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { TranslationDraft } from "./TranslationDraft";

const ROUTE = "M40 70 H150 V210 H300 V330 H420";

/** Two sides of the border joined by one routed flow, in the division-motif line style. */
function CrossBorderDrawing({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 460 400" fill="none" role="img" aria-label={label} className="h-full w-full">
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={30 + c * 68}
            y={30 + r * 72}
            width="52"
            height="52"
            stroke="currentColor"
            strokeOpacity="0.07"
          />
        )),
      )}
      <path d="M0 200 H460" stroke="var(--teal)" strokeOpacity="0.55" strokeDasharray="6 6" />
      <text x="30" y="186" className="label-mono" fill="currentColor" fillOpacity="0.55">
        US
      </text>
      <text x="30" y="226" className="label-mono" fill="currentColor" fillOpacity="0.55">
        MX
      </text>
      <path d={ROUTE} stroke="currentColor" strokeOpacity="0.18" />
      <path d={ROUTE} stroke="var(--teal)" pathLength="1" className="draw" />
      {(
        [
          [40, 70],
          [150, 210],
          [420, 330],
        ] as const
      ).map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 8}
          y={y - 8}
          width="16"
          height="16"
          fill="var(--ink)"
          stroke="var(--teal)"
        />
      ))}
      <g style={{ offsetPath: `path("${ROUTE}")` } as CSSProperties} className="motif-route">
        <rect x="-6" y="-6" width="12" height="12" fill="var(--teal)" />
      </g>
    </svg>
  );
}

export function ThreePlHero() {
  const { locale, t } = useI18n();
  const h = t.threepl.hero;

  return (
    <section
      aria-labelledby="threepl-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden
        className="blueprint absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(90%_80%_at_80%_40%,#000_20%,transparent_75%)]"
      />
      <div aria-hidden className="column-rules -z-10" />

      <div className="container-wdf grid items-end gap-14 pb-20 pt-[calc(var(--header-h)+4.5rem)] md:pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="lg:col-span-7">
          <div
            className="fade-up flex flex-wrap items-center gap-4"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            <p className="label-mono text-primary">{h.eyebrow}</p>
            <TranslationDraft className="text-ink-muted" />
          </div>
          <h1
            id="threepl-title"
            className="display mt-7 text-[clamp(2.6rem,6.2vw,5.6rem)] font-semibold"
          >
            {h.title.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties} className={i ? "text-primary" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="fade-up mt-10 max-w-[36rem] text-[1.0625rem] leading-relaxed text-ink-muted md:text-xl"
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
                className="label-mono rounded-sm border border-ink-border px-3 py-2 text-[0.65rem] text-ink-foreground/80"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="fade-up mt-10" style={{ "--d": "800ms" } as CSSProperties}>
            <ButtonLink to="/{-$locale}/contact" params={{ locale: localeParam(locale) }}>
              {h.primary}
            </ButtonLink>
          </div>
        </div>

        <div
          className="fade-up mx-auto aspect-[46/40] w-full max-w-[30rem] text-ink-foreground lg:col-span-5 lg:max-w-none"
          style={{ "--d": "400ms" } as CSSProperties}
        >
          <CrossBorderDrawing label={h.drawingLabel} />
        </div>
      </div>
    </section>
  );
}
