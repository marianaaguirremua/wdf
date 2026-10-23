import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Bolt } from "@/components/energy/Bolt";
import { Chip } from "@/components/technology/Chip";
import { MANUFACTURING_URL } from "@/lib/site";

function ToolMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}

function RouteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M3 19h6V9h6V5h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="1" y="17" width="4" height="4" fill="currentColor" />
      <rect x="19" y="3" width="4" height="4" fill="currentColor" />
    </svg>
  );
}

const tileClass =
  "group flex aspect-square flex-col justify-between rounded-sm border border-paper-foreground/10 bg-white p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--tile)] md:p-6";

function TileBody({ mark, name, line }: { mark: ReactNode; name: string; line: string }) {
  return (
    <>
      <span className="grid size-10 place-items-center rounded-full bg-[color-mix(in_oklab,var(--tile)_16%,white)] text-[var(--tile-ink)]">
        {mark}
      </span>
      <span>
        <span className="block text-xl font-semibold tracking-[-0.02em] md:text-2xl">{name}</span>
        <span className="mt-1.5 block text-sm leading-snug text-paper-muted">{line}</span>
      </span>
    </>
  );
}

/** The four divisions as a 2 × 2 mosaic, each in its own accent, linking to its page. */
function DivisionMosaic() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const tone = (tile: string, ink: string) =>
    ({ "--tile": tile, "--tile-ink": ink }) as CSSProperties;
  const l = t.divisionLines;

  return (
    <nav aria-label={t.about.hero.divisions} className="grid grid-cols-2 gap-3 md:gap-4">
      <a
        href={MANUFACTURING_URL}
        target="_blank"
        rel="noopener"
        className={tileClass}
        style={tone("var(--teal)", "var(--petroleum)")}
      >
        <TileBody
          mark={<ToolMark className="size-5" />}
          name={t.divisions.manufacturing.name}
          line={l.manufacturing}
        />
        <span className="sr-only">({t.footer.external})</span>
      </a>
      <Link
        to="/{-$locale}/energy"
        params={params}
        className={tileClass}
        style={tone("var(--mustard)", "var(--mustard-deep)")}
      >
        <TileBody mark={<Bolt className="size-5" />} name={t.nav.energy} line={l.energy} />
      </Link>
      <Link
        to="/{-$locale}/technology"
        params={params}
        className={tileClass}
        style={tone("var(--teal)", "var(--cyan-deep)")}
      >
        <TileBody mark={<Chip className="size-5" />} name={t.nav.technology} line={l.technology} />
      </Link>
      <Link
        to="/{-$locale}/3pl"
        params={params}
        className={tileClass}
        style={tone("var(--slate)", "var(--paper-muted)")}
      >
        <TileBody mark={<RouteMark className="size-5" />} name={t.nav.threepl} line={l.threepl} />
      </Link>
    </nav>
  );
}

export function AboutHero() {
  const { locale, t } = useI18n();
  const h = t.about.hero;

  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-paper text-paper-foreground"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(90%_80%_at_30%_40%,#000_25%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -left-40 -top-40 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--cyan-soft),transparent)]"
      />

      <div className="container-wdf grid items-center gap-14 pb-20 pt-[calc(var(--header-h)+4.5rem)] md:pb-28 lg:grid-cols-12 lg:gap-12 lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="lg:col-span-7">
          <div
            className="fade-up flex flex-wrap items-center gap-4"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            <p className="label-mono text-cyan-deep">{h.eyebrow}</p>
          </div>
          <h1
            id="about-title"
            className="display mt-7 text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold"
          >
            {h.title.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties}>
                  {i ? (
                    <span className="box-decoration-clone bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--teal)_40%,transparent)_62%)]">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <div className="fade-up mt-10 max-w-[36rem]" style={{ "--d": "600ms" } as CSSProperties}>
            <p className="text-[1.0625rem] leading-relaxed text-paper-muted md:text-xl">{h.body}</p>
          </div>
          <div
            className="fade-up mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "800ms" } as CSSProperties}
          >
            <ButtonLink
              to="/{-$locale}/about/team"
              params={{ locale: localeParam(locale) }}
              className="accent-cyan"
              variant="accent"
            >
              {h.primary}
            </ButtonLink>
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="outline-light"
            >
              {h.secondary}
            </ButtonLink>
          </div>
        </div>

        <div className="fade-up lg:col-span-5" style={{ "--d": "400ms" } as CSSProperties}>
          <DivisionMosaic />
        </div>
      </div>
    </section>
  );
}
