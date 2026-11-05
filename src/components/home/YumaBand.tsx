import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { emphasize } from "@/components/threepl/emphasize";

const MOUNTAINS = { src: "/media/yuma/mountains.webp", width: 2000, height: 1333 };
const DOWNTOWN = { src: "/media/yuma/downtown.webp", width: 1400, height: 1050 };

/**
 * Home: "Establish your business in Yuma with WDF." over a photo of the Yuma-area mountains,
 * with a downtown Yuma photo beside it. The background fades in from the section above; the
 * paragraph sits in a light box so it stays readable over the photo. Links to the Yuma page.
 */
export function YumaBand() {
  const { locale, t } = useI18n();
  const h = t.threepl.hero;

  return (
    <section
      aria-labelledby="yuma-band-title"
      className="accent-terracotta relative isolate overflow-hidden bg-paper text-paper-foreground"
    >
      <img
        src={MOUNTAINS.src}
        alt=""
        width={MOUNTAINS.width}
        height={MOUNTAINS.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_70%]"
      />
      {/* Paper at the top, so the section continues from the one above and the title reads. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--paper)_0%,color-mix(in_oklab,var(--paper)_70%,transparent)_28%,transparent_62%)]"
      />

      <div className="container-wdf grid items-center gap-10 pb-20 pt-12 md:pb-28 md:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {/* Same size as the Home title ("Built for North American industry."). */}
          <Reveal as="h2" className="heading text-[clamp(2.25rem,4.2vw,3.5rem)]">
            <span id="yuma-band-title">
              <span className="block">{h.title[0]}</span>
              <span className="block text-accent-deep">{h.title[1]}</span>
            </span>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <p className="rounded-md bg-white/90 p-6 text-[1.0625rem] leading-relaxed text-paper-foreground/80 shadow-[0_10px_30px_-12px_rgb(12_24_40/0.25)] backdrop-blur-sm md:p-7 md:text-lg">
              {emphasize(h.body)}
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-8">
            <ButtonLink
              to="/{-$locale}/yuma"
              params={{ locale: localeParam(locale) }}
              variant="accent"
              className="min-h-16 w-full gap-4 bg-white px-8 text-lg text-paper-foreground shadow-[0_10px_30px_-12px_rgb(12_24_40/0.35)] hover:bg-accent-soft hover:text-accent-deep sm:w-auto md:text-xl"
            >
              {h.primary}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <img
            src={DOWNTOWN.src}
            alt=""
            width={DOWNTOWN.width}
            height={DOWNTOWN.height}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-md object-cover shadow-[0_20px_50px_-20px_rgb(12_24_40/0.5)] ring-1 ring-white/70"
          />
        </Reveal>
      </div>
    </section>
  );
}
