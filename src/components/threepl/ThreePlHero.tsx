import { Fragment, type CSSProperties, type ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { THREEPL_LOCATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BorderMap } from "./BorderMap";
import { AnchorIcon, CubeIcon, GlobeIcon } from "./icons";

/** Renders `**…**` spans in a copy string as emphasis. */
function emphasize(text: string): ReactNode[] {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-ink-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const dash = (color: string, on: number, off: number) =>
  `repeating-linear-gradient(90deg,${color} 0 ${on}px,transparent ${on}px ${on + off}px)`;

// Legend keys, in message order: the flow (where freight starts, the border, where it lands),
// then the map's line styles (the Mexicali–Yuma link, dotted trade lanes, seaport anchors).
const FLOW_KEYS: ReactNode[] = [
  <GlobeIcon key="globe" className="size-5 text-ink-foreground" />,
  <span
    key="border"
    className="block h-0.5 w-6"
    style={{ background: dash("var(--ink-muted)", 5, 4) }}
  />,
  <CubeIcon key="cube" className="size-5 text-primary" />,
];
const LINE_KEYS: ReactNode[] = [
  <span
    key="link"
    className="block h-[3px] w-6"
    style={{ background: dash("var(--teal)", 8, 5) }}
  />,
  <span key="lane" className="block h-0.5 w-6" style={{ background: dash("var(--teal)", 3, 4) }} />,
  <AnchorIcon key="anchor" className="size-5 text-primary" />,
];

function LegendItem({ icon, term, text }: { icon: ReactNode; term: string; text: string }) {
  return (
    <li className="flex items-start gap-4 text-[0.95rem] leading-snug">
      <span aria-hidden className="grid h-5 w-6 shrink-0 place-items-center">
        {icon}
      </span>
      <span className="text-ink-muted">
        <strong className="font-semibold text-ink-foreground">{term}</strong> — {text}
      </span>
    </li>
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
      <div aria-hidden className="column-rules -z-10" />

      <div className="container-wdf pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-24 lg:pt-[calc(var(--header-h)+3.5rem)]">
        <p
          className="label-mono fade-up text-primary md:text-right"
          style={{ "--d": "50ms" } as CSSProperties}
        >
          {h.eyebrow}
        </p>
        <h1
          id="threepl-title"
          className="display mt-6 text-[clamp(2.6rem,6.6vw,6.25rem)] font-semibold md:text-center"
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
          className="fade-up mt-10 text-[1.0625rem] leading-relaxed text-ink-muted md:text-xl"
          style={{ "--d": "600ms" } as CSSProperties}
        >
          {emphasize(h.body)}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="fade-up lg:col-span-4" style={{ "--d": "700ms" } as CSSProperties}>
            <div className="rounded-sm border border-ink-border bg-ink-2/60 p-6">
              <ul className="flex flex-col gap-5">
                {h.legend.flow.map((item, i) => (
                  <LegendItem key={item.term} icon={FLOW_KEYS[i]} {...item} />
                ))}
              </ul>
              <div className="my-6 h-px bg-ink-border" />
              <ul className="flex flex-col gap-5">
                {h.legend.lines.map((item, i) => (
                  <LegendItem key={item.term} icon={LINE_KEYS[i]} {...item} />
                ))}
              </ul>
            </div>

            <dl className="mt-8 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-5 px-1 text-[0.95rem]">
              <div>
                <dt className="label-mono text-primary">{h.places.mexicali}</dt>
                <dd className="mt-3 leading-relaxed text-ink-foreground/90">
                  {THREEPL_LOCATIONS.mexicali.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-primary">{h.places.yuma}</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${THREEPL_LOCATIONS.yuma.tel}`}
                    className="tabular-nums text-ink-foreground/90 transition-colors hover:text-primary"
                  >
                    {THREEPL_LOCATIONS.yuma.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <ButtonLink
                to="/{-$locale}/3pl"
                params={{ locale: localeParam(locale) }}
                hash="threepl-contact"
              >
                {h.primary}
              </ButtonLink>
            </div>
          </div>

          <div
            className="fade-up min-w-0 lg:col-span-8"
            style={{ "--d": "300ms" } as CSSProperties}
          >
            {/* The map keeps a readable size on phones and scrolls sideways inside its frame. */}
            <div className="overflow-x-auto rounded-md border border-ink-border">
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
                        ? "border-primary text-primary"
                        : "border-ink-border text-ink-foreground",
                    )}
                  >
                    {i === 0 && <GlobeIcon className="size-4" />}
                    {step}
                  </span>
                  {i < h.flow.length - 1 && (
                    <span aria-hidden className="text-ink-muted">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">{h.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
