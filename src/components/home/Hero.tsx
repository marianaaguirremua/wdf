import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";

// Hero photo (supplied by the WDF team): a plant interior that already fades to white on the
// left, so the text sits on the white side. Desktop shows it full-bleed behind the text;
// on narrow screens the text stays on white and a crop of the photo follows as a band.
const HERO_PHOTO = { src: "/media/home/hero-plant.webp", width: 1920, height: 1080 };
const HERO_PHOTO_MOBILE = { src: "/media/home/hero-plant-mobile.webp", width: 960, height: 600 };

export function Hero() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-paper-border bg-white text-paper-foreground"
    >
      {/* Only screens 1024px and up load the full photo; smaller ones get an empty pixel here
          and the lazy-loaded band below. */}
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={HERO_PHOTO.src}
          width={HERO_PHOTO.width}
          height={HERO_PHOTO.height}
        />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover object-right lg:block"
        />
      </picture>
      {/* Extra white on the text side keeps the copy legible on any screen width. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-[55%] bg-gradient-to-r from-white via-white/80 to-transparent lg:block"
      />

      <div className="container-wdf flex items-center pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+5rem)] lg:min-h-[min(46rem,88svh)] lg:pb-24 lg:pt-[calc(var(--header-h)+4rem)]">
        <div className="max-w-[36rem]">
          <p
            className="fade-up text-sm font-semibold text-cyan-deep"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            {t.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="heading fade-up mt-4 whitespace-pre-line text-[clamp(2.25rem,4.2vw,3.5rem)]"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            {t.hero.title}
          </h1>
          <p
            className="fade-up mt-6 max-w-[32rem] text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg"
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
            <ButtonLink
              to="/{-$locale}/contact"
              params={params}
              variant="outline-light"
              className="bg-white"
            >
              {t.hero.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>

      <img
        src={HERO_PHOTO_MOBILE.src}
        alt=""
        width={HERO_PHOTO_MOBILE.width}
        height={HERO_PHOTO_MOBILE.height}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/10] w-full object-cover lg:hidden"
      />
    </section>
  );
}
