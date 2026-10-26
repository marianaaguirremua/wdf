import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { HERO_VIDEO } from "@/lib/site";
import { HeroDrawing } from "./HeroDrawing";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const words = t.hero.title.split(" ");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ink-foreground"
    >
      {HERO_VIDEO ? (
        <>
          <HeroVideo video={HERO_VIDEO} />
          <div aria-hidden className="column-rules -z-20 opacity-60" />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="blueprint absolute inset-0 -z-20 opacity-50 [mask-image:radial-gradient(90%_80%_at_75%_45%,#000_20%,transparent_75%)]"
          />
          <div aria-hidden className="column-rules -z-20" />

          {/* Drawing: right half on desktop, a quiet backdrop on small screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute -z-10 inset-x-0 top-[calc(var(--header-h)+1rem)] mx-auto aspect-square w-[min(118vw,560px)] opacity-[0.16] sm:opacity-30 lg:inset-x-auto lg:right-[2%] lg:top-1/2 lg:w-[min(46vw,700px)] lg:-translate-y-[46%] lg:opacity-100"
          >
            <HeroDrawing className="h-full w-full" />
          </div>
        </>
      )}

      <div className="container-wdf flex flex-1 flex-col justify-end pb-14 pt-[calc(var(--header-h)+4rem)] lg:justify-center lg:pb-10">
        <div className="max-w-[46rem] lg:max-w-[52%]">
          <div
            className="fade-up flex flex-wrap items-center gap-4"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            <p className="label-mono text-primary">{t.hero.eyebrow}</p>
          </div>

          <h1
            id="hero-title"
            className="display mt-7 text-[clamp(2.9rem,7.4vw,6.6rem)] font-semibold"
          >
            {words.map((w, i) => (
              <span key={`${w}-${i}`} className="rise-line inline-block align-top">
                <span style={{ "--i": i } as CSSProperties}>{w}</span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p
            className="fade-up mt-8 max-w-[34rem] text-[1.125rem] leading-relaxed text-ink-muted md:text-xl"
            style={{ "--d": "650ms" } as CSSProperties}
          >
            {t.hero.sub}
          </p>

          <div
            className="fade-up mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "800ms" } as CSSProperties}
          >
            <ButtonLink to="/{-$locale}" params={params} hash="divisions">
              {t.hero.primary}
            </ButtonLink>
            <ButtonLink to="/{-$locale}/contact" params={params} variant="outline">
              {t.hero.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
