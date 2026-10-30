import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

/**
 * Services overview: one column per pillar (division) with its photo, summary and the services
 * it offers, each tagged with its pillar's name and dot. Service names are the approved
 * capability titles of each division page, so EN/ES stay in step with those pages.
 */
export function ServicesCatalog() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const d = t.divisions;

  // Dot colours match the rest of the site (contact form, division cards).
  const pillars = [
    {
      key: "manufacturing",
      to: "/{-$locale}/services/manufacturing",
      dot: "var(--teal)",
      ink: "var(--cyan-deep)",
      image: "/media/divisions/manufacturing.webp",
      copy: d.manufacturing,
      services: t.services.capabilities.items.map((i) => i.title),
    },
    {
      key: "energy",
      to: "/{-$locale}/services/energy",
      dot: "var(--mustard)",
      ink: "var(--mustard-deep)",
      image: "/media/divisions/energy.webp",
      copy: d.energy,
      services: t.energy.capabilities.items.map((i) => i.title),
    },
    {
      key: "technology",
      to: "/{-$locale}/services/technology",
      dot: "var(--teal)",
      ink: "var(--cyan-deep)",
      image: "/media/divisions/technology.webp",
      copy: d.technology,
      services: t.technology.capabilities.items.map((i) => i.title),
    },
    {
      key: "threepl",
      to: "/{-$locale}/services/3pl",
      dot: "#d2642a",
      ink: "#a8441a",
      image: "/media/divisions/threepl.webp",
      copy: d.threepl,
      services: t.threepl.capabilities.items.map((i) => i.title),
    },
  ] as const;

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

        <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-14 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal as="article" key={p.key} delay={i * 90} className="flex flex-col">
              <div
                style={{ "--dot": p.dot, "--ink": p.ink } as CSSProperties}
                className="flex h-full flex-col"
              >
                <h2
                  id={`pillar-${p.key}`}
                  className="heading border-b-2 border-[var(--dot)] pb-3 text-2xl"
                >
                  <Link to={p.to} params={params} className="hover:text-[var(--ink)]">
                    {p.copy.name}
                  </Link>
                </h2>
                <Link to={p.to} params={params} tabIndex={-1} aria-hidden className="mt-5 block">
                  <span className="block aspect-[4/3] overflow-hidden rounded-md bg-iron">
                    <img
                      src={p.image}
                      alt=""
                      width={960}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </span>
                </Link>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-paper-muted xl:min-h-[4lh]">
                  {p.copy.body}
                </p>

                <ul className="mt-6 divide-y divide-paper-border border-y border-paper-border">
                  {p.services.map((service) => (
                    <li key={service}>
                      <Link
                        to={p.to}
                        params={params}
                        className="group/svc flex items-start justify-between gap-3 py-3"
                      >
                        <span>
                          <span className="block text-[0.9375rem] font-medium leading-snug group-hover/svc:text-[var(--ink)]">
                            {service}
                          </span>
                          <span className="mt-1 flex items-center gap-1.5 text-xs text-paper-muted">
                            <span aria-hidden className="size-2 rounded-full bg-[var(--dot)]" />
                            {p.copy.name}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="mt-0.5 text-paper-muted transition-transform group-hover/svc:translate-x-0.5 group-hover/svc:text-[var(--ink)]"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={p.to}
                  params={params}
                  className="mt-6 inline-flex items-center gap-2 self-start text-[0.9375rem] font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
                >
                  {p.copy.cta}
                  <span aria-hidden className="arrow-nudge">
                    →
                  </span>
                  <span className="sr-only">: {p.copy.name}</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
