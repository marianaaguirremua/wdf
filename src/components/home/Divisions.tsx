import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { MANUFACTURING_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// Each division keeps the shared grid, type and motion language but owns an accent drawn
// from the approved palette and a line motif: toolpath (Manufacturing), single-line
// diagram (Energy) and routed flow (3PL). Motifs animate on hover/focus.

function ToolpathMotif() {
  return (
    <svg viewBox="0 0 240 180" fill="none" aria-hidden className="h-full w-full">
      <path
        d="M30 150 L30 40 L210 40 L210 150 L160 150 L160 90 L80 90 L80 150 Z"
        stroke="var(--accent)"
        strokeOpacity="0.35"
        strokeDasharray="3 5"
      />
      <path d="M20 160 H220 M20 30 H220" stroke="currentColor" strokeOpacity="0.12" />
      <g className="motif-tool">
        <circle r="9" stroke="var(--accent)" />
        <circle r="2.5" fill="var(--accent)" />
      </g>
    </svg>
  );
}

function SingleLineMotif() {
  const nodes = [
    [40, 50],
    [120, 50],
    [200, 50],
    [120, 130],
    [200, 130],
  ] as const;
  return (
    <svg viewBox="0 0 240 180" fill="none" aria-hidden className="h-full w-full">
      <path d="M20 50 H220 M120 50 V130 H200" stroke="currentColor" strokeOpacity="0.14" />
      <path className="motif-flow" d="M20 50 H220 M120 50 V130 H200" stroke="var(--accent)" />
      {nodes.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 7}
          y={y - 7}
          width="14"
          height="14"
          fill="var(--ink-2)"
          stroke="var(--accent)"
        />
      ))}
      <path d="M40 130 h20 M44 138 h12 M48 146 h4" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}

function RouteMotif() {
  return (
    <svg viewBox="0 0 240 180" fill="none" aria-hidden className="h-full w-full">
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={22 + c * 34}
            y={24 + r * 36}
            width="26"
            height="26"
            stroke="currentColor"
            strokeOpacity="0.1"
          />
        )),
      )}
      <path
        d="M20 140 H90 V70 H160 V30 H220"
        stroke="var(--accent)"
        strokeOpacity="0.5"
        strokeDasharray="2 4"
      />
      <g className="motif-route">
        <rect x="-8" y="-8" width="16" height="16" fill="var(--accent)" />
      </g>
    </svg>
  );
}

type DivisionProps = {
  index: number;
  accent: string;
  status: string;
  live?: boolean;
  name: string;
  kicker: string;
  body: string;
  motif: ReactNode;
  tags?: readonly string[];
  action: ReactNode;
};

function Division({
  index,
  accent,
  status,
  live,
  name,
  kicker,
  body,
  motif,
  tags,
  action,
}: DivisionProps) {
  return (
    <Reveal
      as="article"
      delay={index * 110}
      className="division relative flex flex-col border-t border-ink-border pt-8 lg:border-l lg:border-t-0 lg:px-8 lg:pt-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
    >
      <div style={{ "--accent": accent } as CSSProperties} className="flex h-full flex-col">
        <span
          aria-hidden
          className="division-rule mb-8 block h-0.5 w-full bg-[var(--accent)] lg:mb-10"
        />
        <div className="flex items-center justify-between">
          <span className="label-mono text-ink-muted">0{index + 1}</span>
          <span className="label-mono inline-flex items-center gap-2 text-ink-muted">
            <span
              aria-hidden
              className={cn(
                "size-1.5 rounded-full",
                live ? "bg-[var(--accent)]" : "border border-ink-muted",
              )}
            />
            {status}
          </span>
        </div>
        <div className="my-8 aspect-[4/3] w-full max-w-[17rem] text-ink-foreground lg:max-w-none">
          {motif}
        </div>
        <h3 className="display text-[2.5rem] font-semibold lg:text-[2.75rem]">{name}</h3>
        <p className="label-mono mt-4 text-[var(--accent)]">{kicker}</p>
        <p className="mt-5 max-w-sm leading-relaxed text-ink-muted">{body}</p>
        {tags && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-ink-border px-2.5 py-1.5 text-xs text-ink-foreground/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-10">{action}</div>
      </div>
    </Reveal>
  );
}

const actionClass =
  "inline-flex items-center gap-2 border-b border-ink-border pb-1.5 text-[0.9rem] font-semibold text-ink-foreground transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]";

export function Divisions() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const d = t.divisions;

  return (
    <section
      id="divisions"
      aria-labelledby="divisions-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-primary">{d.eyebrow}</p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display text-[clamp(2.25rem,5vw,4.25rem)] lg:col-span-9"
          >
            <span id="divisions-title">{d.title}</span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-3 lg:gap-0">
          <Division
            index={0}
            accent="var(--teal)"
            live
            status={d.online}
            name={d.manufacturing.name}
            kicker={d.manufacturing.kicker}
            body={d.manufacturing.body}
            tags={d.manufacturing.tags}
            motif={<ToolpathMotif />}
            action={
              <a href={MANUFACTURING_URL} target="_blank" rel="noopener" className={actionClass}>
                {d.manufacturing.cta}
                <span aria-hidden className="arrow-nudge arrow-nudge-diag">
                  ↗
                </span>
                <span className="sr-only">({t.footer.external})</span>
              </a>
            }
          />
          <Division
            index={1}
            accent="var(--mustard)"
            live
            status={d.online}
            name={d.energy.name}
            kicker={d.energy.kicker}
            body={d.energy.body}
            tags={d.energy.tags}
            motif={<SingleLineMotif />}
            action={
              <Link to="/{-$locale}/energy" params={params} className={actionClass}>
                {d.energy.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={2}
            accent="var(--slate)"
            live
            status={d.online}
            name={d.threepl.name}
            kicker={d.threepl.kicker}
            body={d.threepl.body}
            tags={d.threepl.tags}
            motif={<RouteMotif />}
            action={
              <Link to="/{-$locale}/3pl" params={params} className={actionClass}>
                {d.threepl.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
}
