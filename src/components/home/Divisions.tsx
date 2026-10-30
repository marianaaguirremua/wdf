import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

// Each division keeps the shared grid, type and motion language but owns an accent drawn
// from the approved palette and a line motif: toolpath (Manufacturing), single-line
// diagram (Energy), control network (Technology) and routed flow (3PL). Motifs animate on hover/focus.

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

function NetworkMotif() {
  const devices = [40, 93, 147, 200];
  const links = devices.map((x) => `M120 64 V96 H${x} V128`).join(" ");
  return (
    <svg viewBox="0 0 240 180" fill="none" aria-hidden className="h-full w-full">
      <path d={links} stroke="currentColor" strokeOpacity="0.14" />
      <path className="motif-flow" d={links} stroke="var(--accent)" />
      <rect x="96" y="28" width="48" height="36" fill="var(--ink-2)" stroke="var(--accent)" />
      <path d="M106 40 h28 M106 48 h20" stroke="var(--accent)" strokeOpacity="0.6" />
      {devices.map((x) => (
        <circle key={x} cx={x} cy={140} r="12" fill="var(--ink-2)" stroke="var(--accent)" />
      ))}
      <path d="M20 164 H220" stroke="currentColor" strokeOpacity="0.12" />
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
  /** Line colour for the motif and the card's top rule. */
  accent: string;
  /** Darker shade of the accent for text on white (AA contrast). */
  accentText: string;
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
  accentText,
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
      delay={index * 90}
      className="division group/card relative flex cursor-pointer flex-col overflow-hidden rounded-md border border-paper-border bg-white transition-[border-color,box-shadow] duration-300 hover:border-paper-foreground/20 hover:shadow-[0_10px_30px_-12px_rgb(12_24_40/0.18)]"
    >
      <div
        style={{ "--accent": accent, "--accent-text": accentText } as CSSProperties}
        className="flex h-full flex-col"
      >
        <span aria-hidden className="block h-1 w-full bg-[var(--accent)]" />
        <div className="flex h-full flex-col p-6 md:p-7">
          <div className="aspect-[4/3] w-full max-w-[15rem] text-paper-foreground/70 xl:aspect-auto xl:h-40 xl:max-w-none">
            {motif}
          </div>
          <h3 className="heading mt-6 text-2xl">{name}</h3>
          <p className="mt-2 text-[0.9375rem] font-medium text-[var(--accent-text)] xl:min-h-[2lh]">
            {kicker}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-muted">{body}</p>
          {tags && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm bg-paper px-2.5 py-1 text-xs text-paper-foreground/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-7">{action}</div>
        </div>
      </div>
    </Reveal>
  );
}

// The link's ::after stretches over the whole card (the <article> is relative), so the entire
// card opens the division page while staying a single link for keyboard and screen readers.
const actionClass =
  "inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[var(--accent-text)] after:absolute after:inset-0 after:content-[''] hover:underline group-hover/card:underline underline-offset-4";

/** On the Services page the block is the page itself: its own eyebrow and title, as the h1. */
export function Divisions({
  eyebrow,
  title,
  as = "h2",
}: {
  eyebrow?: string;
  title?: string;
  as?: "h1" | "h2";
}) {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const d = t.divisions;

  return (
    <section
      id="divisions"
      aria-labelledby="divisions-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div
        className={cn(
          "container-wdf py-20 md:py-24",
          as === "h1" && "pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4.5rem)]",
        )}
      >
        <div className="max-w-2xl">
          <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
            {eyebrow ?? d.eyebrow}
          </Reveal>
          <Reveal
            as={as}
            delay={80}
            className={cn(
              "heading mt-3",
              as === "h1"
                ? "text-[clamp(2.25rem,4.2vw,3.5rem)]"
                : "text-[clamp(1.75rem,3vw,2.5rem)]",
            )}
          >
            <span id="divisions-title">{title ?? d.title}</span>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
          <Division
            index={0}
            accent="var(--teal)"
            accentText="var(--cyan-deep)"
            name={d.manufacturing.name}
            kicker={d.manufacturing.kicker}
            body={d.manufacturing.body}
            tags={d.manufacturing.tags}
            motif={<ToolpathMotif />}
            action={
              <Link to="/{-$locale}/services/manufacturing" params={params} className={actionClass}>
                {d.manufacturing.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={1}
            accent="var(--mustard)"
            accentText="var(--mustard-deep)"
            name={d.energy.name}
            kicker={d.energy.kicker}
            body={d.energy.body}
            tags={d.energy.tags}
            motif={<SingleLineMotif />}
            action={
              <Link to="/{-$locale}/services/energy" params={params} className={actionClass}>
                {d.energy.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={2}
            accent="var(--teal)"
            accentText="var(--cyan-deep)"
            name={d.technology.name}
            kicker={d.technology.kicker}
            body={d.technology.body}
            tags={d.technology.tags}
            motif={<NetworkMotif />}
            action={
              <Link to="/{-$locale}/services/technology" params={params} className={actionClass}>
                {d.technology.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={3}
            accent="var(--industrial)"
            accentText="var(--steel)"
            name={d.threepl.name}
            kicker={d.threepl.kicker}
            body={d.threepl.body}
            tags={d.threepl.tags}
            motif={<RouteMotif />}
            action={
              <Link to="/{-$locale}/services/3pl" params={params} className={actionClass}>
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
