import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { CrossTag } from "./CrossTag";
import { CrossingGraphic } from "./CrossingGraphic";

// 3PL hero: names the U.S.–Mexico border and the Mexicali–Calexico crossing in the headline
// and subtitle, beside a flat schematic of the crossing.
export function ThreePlHero() {
  const { locale, t } = useI18n();
  const h = t.threepl.hero;

  return (
    <section
      aria-labelledby="threepl-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10" />

      <div className="container-wdf grid items-center gap-14 pb-20 pt-[calc(var(--header-h)+4rem)] md:pb-28 lg:grid-cols-12 lg:gap-10 lg:pt-[calc(var(--header-h)+5.5rem)]">
        <div className="lg:col-span-6">
          <div
            className="fade-up flex flex-wrap items-center gap-4"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            <p className="label-mono text-accent">{h.eyebrow}</p>
            <CrossTag label={h.tag} />
          </div>
          <h1
            id="threepl-title"
            className="display mt-7 text-[clamp(2.6rem,5.4vw,5rem)] font-semibold"
          >
            {h.title.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties} className={i ? "text-accent" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="fade-up mt-8 max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink-muted md:text-xl"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            {h.body}
          </p>
          <div className="fade-up mt-10" style={{ "--d": "800ms" } as CSSProperties}>
            <ButtonLink
              to="/{-$locale}/3pl"
              params={{ locale: localeParam(locale) }}
              hash="threepl-contact"
              variant="accent"
            >
              {h.primary}
            </ButtonLink>
          </div>
        </div>

        <div className="fade-up lg:col-span-6" style={{ "--d": "300ms" } as CSSProperties}>
          <div className="overflow-hidden rounded-[4px] border border-ink-3">
            <CrossingGraphic copy={h.graphic} />
          </div>
        </div>
      </div>
    </section>
  );
}
