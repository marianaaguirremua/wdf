import { Link } from "@tanstack/react-router";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { MANUFACTURING_URL } from "@/lib/site";

const cardClass =
  "group flex items-center justify-between gap-6 rounded-sm border border-paper-foreground/15 bg-white p-7 transition-colors hover:border-mustard md:p-8";

// Links Energy to the other WDF divisions: Manufacturing to its own site, 3PL to its page here.
export function EnergyConnect() {
  const { locale, t } = useI18n();
  const c = t.energy.connect;
  const d = t.divisions;

  return (
    <section aria-labelledby="energy-connect-title" className="bg-paper text-paper-foreground">
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-mustard-deep">{c.eyebrow}</p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="energy-connect-title">{c.title}</span>
            </Reveal>

            <Reveal delay={160} className="mt-14 grid gap-4 md:grid-cols-2">
              <a href={MANUFACTURING_URL} target="_blank" rel="noopener" className={cardClass}>
                <span>
                  <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">
                    {d.manufacturing.name}
                  </span>
                  <span className="mt-2 block text-sm text-paper-muted">{c.manufacturing}</span>
                </span>
                <span
                  aria-hidden
                  className="arrow-nudge arrow-nudge-diag text-xl text-mustard-deep"
                >
                  ↗
                </span>
                <span className="sr-only">({t.footer.external})</span>
              </a>
              <Link
                to="/{-$locale}/3pl"
                params={{ locale: localeParam(locale) }}
                className={cardClass}
              >
                <span>
                  <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">
                    {d.threepl.name}
                  </span>
                  <span className="mt-2 block text-sm text-paper-muted">{c.threepl}</span>
                </span>
                <span aria-hidden className="arrow-nudge text-xl text-mustard-deep">
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
