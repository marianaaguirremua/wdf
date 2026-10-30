import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { SERVICE_PHOTOS } from "@/lib/site";

/** Cards shown at first and added by each "View more". */
const PAGE = 6;
/** Cards per row on desktop; no row repeats a pillar. */
const COLUMNS = 3;

/**
 * Mixes the pillars' lists in rotation (Manufacturing, Energy, Technology, 3PL, …) so that no
 * row of `columns` cards shows the same pillar twice. When the rotation alone would end with
 * two cards of the longer list side by side, a short look-ahead reorders the last rows.
 */
function interleave<T>(lists: T[][], columns: number): T[] {
  const left = lists.map((l) => [...l]);
  const order: number[] = [];
  const total = left.reduce((n, l) => n + l.length, 0);
  const place = (last: number): boolean => {
    if (order.length === total) return true;
    const row = order.slice(order.length - (order.length % columns));
    for (let k = 1; k <= lists.length; k++) {
      const p = (last + k) % lists.length;
      if (!left[p]!.length || row.includes(p)) continue;
      order.push(p);
      left[p]!.shift();
      if (place(p)) return true;
      order.pop();
      left[p]!.unshift(lists[p]![lists[p]!.length - left[p]!.length - 1]!);
    }
    return false;
  };
  // No valid order (e.g. one pillar has most of the cards): fall back to plain pillar order.
  if (!place(lists.length - 1)) return lists.flat();
  const next = lists.map(() => 0);
  return order.map((p) => lists[p]![next[p]!++]!);
}

type Route =
  | "/{-$locale}/services/manufacturing"
  | "/{-$locale}/services/energy"
  | "/{-$locale}/services/technology"
  | "/{-$locale}/services/3pl";

type Service = {
  /** Key in SERVICE_PHOTOS. */
  key: string;
  title: string;
  body: string;
  pillar: string;
  to: Route;
  /** Anchor of this service on its division page; none opens the page at the top. */
  hash?: string;
  dot: string;
  ink: string;
};

/**
 * Services overview: one card per service, three to a row. Each card names the service,
 * describes it and carries a label with its pillar and the pillar's dot, and opens that service
 * on its division page. Titles and descriptions are the approved capability copy of each
 * division page (EN/ES), so the two stay in step; 3D Printing is listed first under Manufacturing.
 */
export function ServicesCatalog() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const d = t.divisions;

  // Dot colours match the rest of the site (contact form, division cards).
  const manufacturing = {
    pillar: d.manufacturing.name,
    to: "/{-$locale}/services/manufacturing",
    dot: "var(--teal)",
    ink: "var(--cyan-deep)",
  } as const;
  const energy = {
    pillar: d.energy.name,
    to: "/{-$locale}/services/energy",
    dot: "var(--mustard)",
    ink: "var(--mustard-deep)",
  } as const;
  const technology = {
    pillar: d.technology.name,
    to: "/{-$locale}/services/technology",
    dot: "var(--teal)",
    ink: "var(--cyan-deep)",
  } as const;
  const threepl = {
    pillar: d.threepl.name,
    to: "/{-$locale}/services/3pl",
    dot: "#d2642a",
    ink: "#a8441a",
  } as const;

  // The Manufacturing page lists processes rather than a sentence: "CNC machining, turning, …".
  const sentence = (parts: readonly string[]) => parts.join(", ") + ".";

  // One list per pillar, in pillar order; mixed below.
  const byPillar: Service[][] = [
    [
      { ...manufacturing, ...t.servicesIndex.printing3d, key: "manufacturing-3d-printing" },
      ...t.services.capabilities.items.map((item, i) => ({
        ...manufacturing,
        key: `manufacturing-${i + 1}`,
        title: item.title,
        body: sentence(item.processes),
        hash: `capability-${i + 1}`,
      })),
    ],
    t.energy.capabilities.items.map((item, i) => ({
      ...energy,
      ...item,
      key: `energy-${i + 1}`,
      hash: `energy-capability-${i + 1}`,
    })),
    t.technology.capabilities.items.map((item, i) => ({
      ...technology,
      ...item,
      key: `technology-${i + 1}`,
      hash: `technology-capability-${i + 1}`,
    })),
    t.threepl.capabilities.items.map((item, i) => ({
      ...threepl,
      ...item,
      key: `threepl-${i + 1}`,
      hash: `threepl-capability-${i + 1}`,
    })),
  ];
  const services = interleave(byPillar, COLUMNS);

  const [shown, setShown] = useState(PAGE);
  const list = useRef<HTMLUListElement>(null);
  // After "View more", focus moves to the first new card so keyboard users continue from there.
  const focusFrom = useRef<number | null>(null);
  useEffect(() => {
    if (focusFrom.current === null) return;
    list.current?.querySelectorAll("a")[focusFrom.current]?.focus();
    focusFrom.current = null;
  }, [shown]);

  return (
    <section aria-labelledby="services-title" className="relative bg-paper text-paper-foreground">
      <div className="container-wdf pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="max-w-2xl">
          <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
            {t.servicesIndex.eyebrow}
          </Reveal>
          <Reveal as="h1" delay={80} className="heading mt-3 text-[clamp(2.25rem,4.2vw,3.5rem)]">
            <span id="services-title">{t.servicesIndex.title}</span>
          </Reveal>
        </div>

        <ul ref={list} className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, shown).map((s, i) => (
            <Reveal as="li" key={`${s.pillar}-${s.title}`} delay={(i % 3) * 70}>
              <Link
                to={s.to}
                params={params}
                {...(s.hash ? { hash: s.hash } : {})}
                style={{ "--dot": s.dot, "--ink": s.ink } as CSSProperties}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-paper-border bg-white transition-[border-color,box-shadow] duration-300 hover:border-paper-foreground/20 hover:shadow-[0_10px_30px_-12px_rgb(12_24_40/0.18)]"
              >
                <ServicePhoto photo={SERVICE_PHOTOS[s.key]} />
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h2 className="heading text-xl group-hover:text-[var(--ink)]">{s.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-muted">{s.body}</p>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="flex items-center gap-2 text-sm text-paper-foreground/80">
                      <span aria-hidden className="size-2.5 rounded-full bg-[var(--dot)]" />
                      {s.pillar}
                    </span>
                    <span
                      aria-hidden
                      className="text-paper-muted transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--ink)]"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        {shown < services.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                focusFrom.current = shown;
                setShown((n) => Math.min(n + PAGE, services.length));
              }}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border border-paper-foreground/20 bg-white px-6 text-[0.9375rem] font-semibold text-paper-foreground transition-colors hover:border-petroleum hover:bg-petroleum hover:text-white"
            >
              {t.servicesIndex.more}
              <span className="font-normal opacity-70" aria-hidden>
                ({shown}/{services.length})
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** 4:3 photo frame; an empty frame until the service's photo is added to SERVICE_PHOTOS. */
function ServicePhoto({
  photo,
}: {
  photo: { src: string; width: number; height: number } | undefined;
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-iron">
      {photo ? (
        <img
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-paper-foreground/20"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="M21 16l-5-5-7 7" />
        </svg>
      )}
    </div>
  );
}
