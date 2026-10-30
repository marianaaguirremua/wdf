import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

type Route =
  | "/{-$locale}/services/manufacturing"
  | "/{-$locale}/services/energy"
  | "/{-$locale}/services/technology"
  | "/{-$locale}/services/3pl";

type Service = {
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

  const services: Service[] = [
    { ...manufacturing, ...t.servicesIndex.printing3d },
    ...t.services.capabilities.items.map((item, i) => ({
      ...manufacturing,
      title: item.title,
      body: sentence(item.processes),
      hash: `capability-${i + 1}`,
    })),
    ...t.energy.capabilities.items.map((item, i) => ({
      ...energy,
      ...item,
      hash: `energy-capability-${i + 1}`,
    })),
    ...t.technology.capabilities.items.map((item, i) => ({
      ...technology,
      ...item,
      hash: `technology-capability-${i + 1}`,
    })),
    ...t.threepl.capabilities.items.map((item, i) => ({
      ...threepl,
      ...item,
      hash: `threepl-capability-${i + 1}`,
    })),
  ];

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

        <ul className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={`${s.pillar}-${s.title}`} delay={(i % 3) * 70}>
              <Link
                to={s.to}
                params={params}
                {...(s.hash ? { hash: s.hash } : {})}
                style={{ "--dot": s.dot, "--ink": s.ink } as CSSProperties}
                className="group flex h-full flex-col rounded-md border border-paper-border bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-paper-foreground/20 hover:shadow-[0_10px_30px_-12px_rgb(12_24_40/0.18)] md:p-7"
              >
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
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
