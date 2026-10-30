import type { CSSProperties } from "react";
import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { NA_LAND, NA_US_MX_BORDER, NA_VIEWBOX, naProject } from "./north-america";

const LATS = [50, 40, 30, 20];
const LONS = [-120, -100, -80];
const LABELS: [number, number][] = [
  [-106, 55],
  [-100, 39],
  [-103.5, 23.5],
];

export function NorthAmerica() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="reach-title"
      className="relative overflow-hidden bg-white text-paper-foreground"
    >
      <div className="container-wdf grid items-center gap-14 py-20 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
            {t.reach.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className="heading mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
            <span id="reach-title">{t.reach.title}</span>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg">
              {t.reach.body}
            </p>
            <p className="mt-8 flex items-center gap-3 text-sm text-paper-muted">
              <span aria-hidden className="h-0.5 w-8 bg-teal" />
              {t.reach.legend}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <svg
            viewBox={NA_VIEWBOX}
            role="img"
            aria-label={t.reach.mapLabel}
            className="h-auto w-full"
          >
            <g stroke="var(--paper-muted)" strokeOpacity="0.25" strokeDasharray="2 6">
              {LATS.map((lat) => {
                const [, y] = naProject(-132, lat);
                return <line key={lat} x1="0" x2="1000" y1={y} y2={y} />;
              })}
              {LONS.map((lon) => {
                const [x] = naProject(lon, 60);
                return <line key={lon} y1="0" y2="897" x1={x} x2={x} />;
              })}
            </g>
            <g
              fill="var(--paper-muted)"
              fontFamily="var(--font-mono)"
              fontSize="13"
              letterSpacing="1.5"
              opacity="0.7"
            >
              {LATS.map((lat) => (
                <text key={lat} x="8" y={naProject(-132, lat)[1] - 8}>
                  {lat}°N
                </text>
              ))}
              {LONS.map((lon) => (
                <text key={lon} x={naProject(lon, 60)[0] + 8} y="890">
                  {Math.abs(lon)}°W
                </text>
              ))}
            </g>
            <path
              d={NA_LAND}
              fill="var(--iron)"
              stroke="var(--paper-muted)"
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path
              d={NA_US_MX_BORDER}
              stroke="var(--teal)"
              strokeOpacity="0.18"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              className="draw-on-view"
              style={{ "--d": "400ms" } as CSSProperties}
              pathLength={1}
              d={NA_US_MX_BORDER}
              stroke="var(--teal)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <g
              fill="var(--paper-foreground)"
              fontFamily="var(--font-mono)"
              fontSize="15"
              letterSpacing="3"
              textAnchor="middle"
            >
              {LABELS.map(([lon, lat], i) => {
                const [x, y] = naProject(lon, lat);
                return (
                  <text key={i} x={x} y={y}>
                    {t.reach.countries[i]?.toUpperCase()}
                  </text>
                );
              })}
            </g>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
