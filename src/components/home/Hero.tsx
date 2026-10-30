import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { HeroDrawing } from "./HeroDrawing";

// The drawing is the same technical illustration as before, redrawn in the light hero's
// colours: its line, label and highlight colours come from these variables.
const DRAWING_ON_LIGHT = {
  "--ink-muted": "var(--paper-muted)",
  "--ink-foreground": "var(--paper-foreground)",
  "--teal": "var(--cyan-deep)",
} as CSSProperties;

export function Hero() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };

  return (
    <section
      aria-labelledby="hero-title"
      className="section-light relative overflow-hidden border-b border-paper-border"
    >
      <div className="container-wdf grid items-center gap-12 pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p
            className="fade-up text-sm font-semibold text-cyan-deep"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            {t.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="heading fade-up mt-4 max-w-[38rem] text-[clamp(2.25rem,4.2vw,3.5rem)]"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            {t.hero.title}
          </h1>
          <p
            className="fade-up mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            {t.hero.sub}
          </p>
          <div
            className="fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <ButtonLink
              to="/{-$locale}/services"
              params={params}
              variant="accent"
              className="accent-cyan"
            >
              {t.hero.primary}
            </ButtonLink>
            <ButtonLink to="/{-$locale}/contact" params={params} variant="outline-light">
              {t.hero.secondary}
            </ButtonLink>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none"
          style={DRAWING_ON_LIGHT}
        >
          <HeroDrawing className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
