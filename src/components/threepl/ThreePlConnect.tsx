import { localeParam, useI18n } from "@/i18n";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { MANUFACTURING_URL } from "@/lib/site";

const cardClass =
  "group flex items-center justify-between gap-6 rounded-sm border border-ink-border p-7 transition-colors hover:border-primary md:p-8";

// Links 3PL to the other WDF divisions: Manufacturing to its own site, Energy to its page here.
export function ThreePlConnect() {
  const { locale, t } = useI18n();
  const c = t.threepl.connect;
  const d = t.divisions;

  return (
    <section
      aria-labelledby="threepl-connect-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
            <p className="label-mono text-primary">{c.eyebrow}</p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="threepl-connect-title">{c.title}</span>
            </Reveal>

            <Reveal delay={160} className="mt-14 grid gap-4 md:grid-cols-2">
              <a href={MANUFACTURING_URL} target="_blank" rel="noopener" className={cardClass}>
                <span>
                  <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">
                    {d.manufacturing.name}
                  </span>
                  <span className="mt-2 block text-sm text-ink-muted">
                    {t.divisionLines.manufacturing}
                  </span>
                </span>
                <span aria-hidden className="arrow-nudge arrow-nudge-diag text-xl">
                  ↗
                </span>
                <span className="sr-only">({t.footer.external})</span>
              </a>
              <Link
                to="/{-$locale}/energy"
                params={{ locale: localeParam(locale) }}
                className={cardClass}
              >
                <span>
                  <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">
                    {d.energy.name}
                  </span>
                  <span className="mt-2 block text-sm text-ink-muted">
                    {t.divisionLines.energy}
                  </span>
                </span>
                <span aria-hidden className="arrow-nudge text-xl">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
