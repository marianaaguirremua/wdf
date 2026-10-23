import { Fragment, type ReactNode } from "react";
import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { THREEPL_LOCATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BorderMap } from "./BorderMap";
import { AnchorIcon, CubeIcon, GlobeIcon } from "./icons";

/** Renders `**…**` spans in a copy string as emphasis. */
function emphasize(text: string): ReactNode[] {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-paper-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const dash = (color: string, on: number, off: number) =>
  `repeating-linear-gradient(90deg,${color} 0 ${on}px,transparent ${on}px ${on + off}px)`;

// Legend keys sit on small navy tiles so they read exactly as on the (navy) map:
// first the freight flow, then the map's line styles.
const FLOW_KEYS: ReactNode[] = [
  <GlobeIcon key="globe" className="size-4 text-ink-foreground" />,
  <span
    key="border"
    className="block h-0.5 w-5"
    style={{ background: dash("var(--sand)", 5, 3) }}
  />,
  <CubeIcon key="cube" className="size-4 text-accent" />,
];
const LINE_KEYS: ReactNode[] = [
  <span
    key="link"
    className="block h-[3px] w-5"
    style={{ background: dash("var(--accent)", 7, 4) }}
  />,
  <span
    key="lane"
    className="block h-0.5 w-5"
    style={{ background: dash("var(--accent)", 2, 3) }}
  />,
  <AnchorIcon key="anchor" className="size-4 text-accent" />,
];

function LegendItem({ icon, term, text }: { icon: ReactNode; term: string; text: string }) {
  return (
    <li className="flex items-start gap-4 text-[0.95rem] leading-snug">
      <span aria-hidden className="grid h-6 w-8 shrink-0 place-items-center rounded-[4px] bg-ink-2">
        {icon}
      </span>
      <span className="text-paper-muted">
        <strong className="font-semibold text-paper-foreground">{term}</strong> — {text}
      </span>
    </li>
  );
}

/**
 * Where 3PL operates: the Mexicali hub and Yuma office on the border-region map, with the
 * freight flow, the ports and trade lanes they connect to, and both addresses.
 */
export function ThreePlNetwork() {
  const { t } = useI18n();
  const n = t.threepl.network;

  return (
    <section
      aria-labelledby="threepl-network-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div className="container-wdf py-24 md:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono inline-flex items-center gap-3 text-accent-deep">
              <span aria-hidden className="h-0.5 w-8 bg-accent" />
              {n.eyebrow}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="threepl-network-title">
                {n.title[0]} <span className="text-accent-deep">{n.title[1]}</span>
              </span>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper-muted md:text-[1.25rem]">
                {emphasize(n.body)}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="rounded-[4px] border border-paper-foreground/10 bg-white p-6">
              <ul className="flex flex-col gap-5">
                {n.legend.flow.map((item, i) => (
                  <LegendItem key={item.term} icon={FLOW_KEYS[i]} {...item} />
                ))}
              </ul>
              <div className="my-6 h-px bg-accent/40" />
              <ul className="flex flex-col gap-5">
                {n.legend.lines.map((item, i) => (
                  <LegendItem key={item.term} icon={LINE_KEYS[i]} {...item} />
                ))}
              </ul>
            </div>

            <dl className="mt-8 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-5 px-1 text-[0.95rem]">
              <div>
                <dt className="label-mono text-accent-deep">{n.places.mexicali}</dt>
                <dd className="mt-3 leading-relaxed">
                  {THREEPL_LOCATIONS.mexicali.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-accent-deep">{n.places.yuma}</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${THREEPL_LOCATIONS.yuma.tel}`}
                    className="tabular-nums transition-colors hover:text-accent-deep"
                  >
                    {THREEPL_LOCATIONS.yuma.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120} className="min-w-0 lg:col-span-8">
            {/* The map keeps a readable size on phones and scrolls sideways inside its frame. */}
            <div className="overflow-x-auto rounded-[4px] border border-paper-foreground/10">
              <div className="min-w-[640px]">
                <BorderMap copy={n.map} />
              </div>
            </div>

            <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
              {n.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "label-mono inline-flex items-center gap-2 rounded-[4px] border bg-white px-3 py-2.5 text-[0.62rem] tracking-[0.14em]",
                      i % 2 ? "border-accent-deep text-accent-deep" : "border-paper-foreground/15",
                    )}
                  >
                    {i === 0 && <GlobeIcon className="size-4" />}
                    {step}
                  </span>
                  {i < n.flow.length - 1 && (
                    <span aria-hidden className="text-accent-deep">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-paper-muted">{n.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
