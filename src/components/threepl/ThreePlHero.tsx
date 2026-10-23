import { Fragment, type CSSProperties, type ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { cn } from "@/lib/utils";
import { BorderMap } from "./BorderMap";

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

// Legend keys match the map: pin, the dashed Mexicali–Yuma link, dotted trade lanes.
const LEGEND_KEYS: ReactNode[] = [
  <span key="pin" className="block size-3 rounded-full bg-teal" />,
  <span
    key="link"
    className="block h-[3px] w-6 bg-[repeating-linear-gradient(90deg,var(--teal)_0_8px,transparent_8px_13px)]"
  />,
  <span
    key="lane"
    className="block h-[3px] w-6 bg-[radial-gradient(circle,var(--teal)_45%,transparent_50%)] bg-[length:6px_3px]"
  />,
];

export function ThreePlHero() {
  const { locale, t } = useI18n();
  const h = t.threepl.hero;

  return (
    <section
      aria-labelledby="threepl-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10" />

      <div className="container-wdf grid gap-14 pb-20 pt-[calc(var(--header-h)+4rem)] md:pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-[calc(var(--header-h)+5rem)]">
        <div className="lg:col-span-5">
          <p className="label-mono fade-up text-primary" style={{ "--d": "50ms" } as CSSProperties}>
            {h.eyebrow}
          </p>
          <h1
            id="threepl-title"
            className="display mt-7 text-[clamp(2.5rem,4.4vw,4.25rem)] font-semibold"
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
            className="fade-up mt-8 text-[1.0625rem] leading-relaxed text-ink-muted md:text-lg"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            {emphasize(h.body)}
          </p>

          <ul
            className="fade-up mt-8 flex flex-col gap-4 rounded-sm border border-ink-border bg-ink-2/60 p-6"
            style={{ "--d": "700ms" } as CSSProperties}
          >
            {h.legend.map((item, i) => (
              <li key={item.term} className="flex items-center gap-4 text-[0.95rem]">
                <span aria-hidden className="grid w-6 shrink-0 place-items-center">
                  {LEGEND_KEYS[i]}
                </span>
                <span className="text-ink-muted">
                  <strong className="font-semibold text-ink-foreground">{item.term}</strong> —{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="fade-up mt-8" style={{ "--d": "800ms" } as CSSProperties}>
            <ButtonLink
              to="/{-$locale}/3pl"
              params={{ locale: localeParam(locale) }}
              hash="threepl-contact"
            >
              {h.primary}
            </ButtonLink>
          </div>
        </div>

        <div className="fade-up min-w-0 lg:col-span-7" style={{ "--d": "300ms" } as CSSProperties}>
          {/* The map keeps a readable size on phones and scrolls sideways inside its frame. */}
          <div className="overflow-x-auto rounded-sm border border-ink-border">
            <div className="min-w-[640px]">
              <BorderMap copy={h.map} />
            </div>
          </div>

          <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
            {h.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={cn(
                    "label-mono rounded-sm border px-2.5 py-2.5 text-[0.6rem] tracking-[0.12em]",
                    i % 2 ? "border-primary text-primary" : "border-ink-border text-ink-foreground",
                  )}
                >
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
    </section>
  );
}
