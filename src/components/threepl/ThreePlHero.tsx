import type { CSSProperties, ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { THREEPL_LOCATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BorderMap } from "./BorderMap";
import { emphasize } from "./emphasize";
import { AnchorIcon, CubeIcon, GlobeIcon } from "./icons";

const dash = (color: string, on: number, off: number) =>
  `repeating-linear-gradient(90deg,${color} 0 ${on}px,transparent ${on}px ${on + off}px)`;

// Legend keys, in message order: the flow (where freight starts, the border, where it lands),
// then the map's line styles (the Mexicali–Yuma link, dotted trade lanes, seaport anchors).
const FLOW_KEYS: ReactNode[] = [
  <GlobeIcon key="globe" className="size-5 text-paper-foreground" />,
  <span
    key="border"
    className="block h-0.5 w-6"
    style={{ background: dash("var(--sand)", 5, 4) }}
  />,
  <CubeIcon key="cube" className="size-5 text-accent" />,
];
const LINE_KEYS: ReactNode[] = [
  <span
    key="link"
    className="block h-[3px] w-6"
    style={{ background: dash("var(--accent)", 8, 5) }}
  />,
  <span
    key="lane"
    className="block h-0.5 w-6"
    style={{ background: dash("var(--accent)", 3, 4) }}
  />,
  <AnchorIcon key="anchor" className="size-5 text-accent" />,
];

function LegendItem({ icon, term, text }: { icon: ReactNode; term: string; text: string }) {
  return (
    <li className="flex items-start gap-4 text-[0.95rem] leading-snug">
      <span aria-hidden className="grid h-5 w-6 shrink-0 place-items-center">
        {icon}
      </span>
      <span className="text-paper-muted">
        <strong className="font-semibold text-paper-foreground">{term}</strong> — {text}
      </span>
    </li>
  );
}

/**
 * `embedded`: shown inside another page (Home) instead of opening the 3PL page — the title is an
 * h2 and the intro is a normal section rather than full screen. The map is the same either way.
 */
export function ThreePlHero({ embedded = false }: { embedded?: boolean }) {
  const { locale, t } = useI18n();
  const h = t.threepl.hero;
  const Title = embedded ? "h2" : "h1";

  // Full page: a full-screen intro (eyebrow, title, subtitle), then the legend, locations and
  // border map (ThreePlMap). Embedded (Home): only the intro, with a button to the Yuma page.
  return (
    <>
      <section
        aria-labelledby="threepl-title"
        className={cn(
          "relative isolate flex flex-col overflow-hidden bg-paper text-paper-foreground border-t border-paper-border",
          !embedded && "min-h-[100svh]",
        )}
      >
        <div aria-hidden className="column-rules -z-10" />
        <div
          className={cn(
            "container-wdf flex flex-1 flex-col justify-center",
            embedded ? "pb-16 pt-24 md:pt-32" : "pb-28 pt-[calc(var(--header-h)+3rem)]",
          )}
        >
          <p
            className="label-mono fade-up text-accent-deep md:text-right"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            {h.eyebrow}
          </p>
          <Title
            id="threepl-title"
            className={cn(
              "display mt-6 text-balance font-semibold md:text-center",
              // On Home, the same size as the page's other section titles.
              embedded ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[clamp(2.6rem,6.2vw,5.6rem)]",
            )}
          >
            {h.title.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties} className={i ? "text-accent" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </Title>
          <p
            className="fade-up mx-auto mt-10 max-w-4xl text-[1.0625rem] leading-relaxed text-paper-muted md:text-center md:text-xl"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            {emphasize(h.body)}
          </p>
          {embedded && (
            <div
              className="fade-up mt-10 flex md:justify-center"
              style={{ "--d": "700ms" } as CSSProperties}
            >
              <ButtonLink
                to="/{-$locale}/yuma"
                params={{ locale: localeParam(locale) }}
                variant="accent"
                className="min-h-16 w-full gap-4 px-8 text-lg sm:w-auto md:text-xl"
              >
                {h.primary}
              </ButtonLink>
            </div>
          )}
        </div>
        {!embedded && (
          <span
            aria-hidden
            className="fade-up absolute inset-x-0 bottom-8 mx-auto flex w-max flex-col items-center gap-2 text-paper-muted"
            style={{ "--d": "1100ms" } as CSSProperties}
          >
            <span className="block h-10 w-px bg-gradient-to-b from-transparent to-accent" />
            <span className="text-accent">↓</span>
          </span>
        )}
      </section>

      {!embedded && <ThreePlMap />}
    </>
  );
}

/**
 * The legend, the two locations and the border map (on the Yuma page), with a button to the
 * contact band at the end of that page.
 */
export function ThreePlMap() {
  const { locale, t } = useI18n();
  const h = t.threepl.hero;
  return (
    <section className="relative isolate overflow-hidden border-t border-paper-border bg-paper text-paper-foreground">
      <div aria-hidden className="column-rules -z-10" />
      <div className="container-wdf grid gap-10 pb-20 pt-20 md:pb-24 md:pt-24 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="rounded-sm border border-paper-border bg-white p-6">
            <ul className="flex flex-col gap-5">
              {h.legend.flow.map((item, i) => (
                <LegendItem key={item.term} icon={FLOW_KEYS[i]} {...item} />
              ))}
            </ul>
            <div className="my-6 h-px bg-paper-border" />
            <ul className="flex flex-col gap-5">
              {h.legend.lines.map((item, i) => (
                <LegendItem key={item.term} icon={LINE_KEYS[i]} {...item} />
              ))}
            </ul>
          </div>

          <dl className="mt-8 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4 px-1 text-[0.95rem]">
            <div>
              <dt className="label-mono text-accent-deep">{h.places.mexicali}</dt>
              <dd className="mt-3 leading-relaxed text-paper-foreground/90">
                {THREEPL_LOCATIONS.mexicali.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="label-mono text-accent-deep">{h.places.yuma}</dt>
              <dd className="mt-3 leading-relaxed text-paper-foreground/90">
                {THREEPL_LOCATIONS.yuma.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={`tel:${THREEPL_LOCATIONS.yuma.tel}`}
                  className="mt-1 block tabular-nums transition-colors hover:text-accent"
                >
                  {THREEPL_LOCATIONS.yuma.phone}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <ButtonLink
              to="/{-$locale}/yuma"
              params={{ locale: localeParam(locale) }}
              hash="yuma-contact"
              variant="accent"
            >
              {h.contact}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={150} className="min-w-0 lg:col-span-8">
          {/* The map keeps a readable size on phones and scrolls sideways inside its frame.
              .map-light recolours it (its colours are CSS variables) without changing BorderMap. */}
          <div className="map-light overflow-x-auto rounded-md border border-paper-border bg-ink">
            <div className="min-w-[640px]">
              <BorderMap copy={h.map} />
            </div>
          </div>

          <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
            {h.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={cn(
                    "label-mono inline-flex items-center gap-2 rounded-sm border px-3 py-2.5 text-[0.62rem] tracking-[0.14em]",
                    i % 2
                      ? "border-accent text-accent-deep"
                      : "border-paper-border bg-white text-paper-foreground",
                  )}
                >
                  {i === 0 && <GlobeIcon className="size-4" />}
                  {step}
                </span>
                {i < h.flow.length - 1 && (
                  <span aria-hidden className="text-paper-muted">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-paper-muted">{h.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
