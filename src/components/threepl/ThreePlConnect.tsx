import { localeParam, useI18n } from "@/i18n";
import { Link } from "@tanstack/react-router";
import { OnDemandVideo } from "@/components/site/OnDemandVideo";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES_VIDEO } from "@/lib/site";

const cardClass =
  "group flex items-center justify-between gap-6 rounded-sm border border-paper-foreground/15 p-7 transition-colors hover:border-accent md:p-8";

// Links 3PL to the other WDF divisions: a general WDF services video (loaded only when
// played), then Manufacturing and Energy to their pages.
export function ThreePlConnect() {
  const { locale, t } = useI18n();
  const c = t.threepl.connect;
  const d = t.divisions;

  return (
    <section
      aria-labelledby="threepl-connect-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
            <p className="label-mono inline-flex items-center gap-3 text-accent-deep">
              <span aria-hidden className="h-0.5 w-8 bg-accent" />
              {c.eyebrow}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="threepl-connect-title">{c.title}</span>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-muted">{c.body}</p>
            </Reveal>

            <Reveal delay={160} className="mt-12">
              <OnDemandVideo
                {...SERVICES_VIDEO}
                title={c.video.title}
                description={c.video.description}
                playLabel={c.video.play}
              />
            </Reveal>

            <Reveal delay={160} className="mt-10 grid gap-4 md:grid-cols-2">
              <Link
                to="/{-$locale}/manufacturing"
                params={{ locale: localeParam(locale) }}
                className={cardClass}
              >
                <span>
                  <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">
                    {d.manufacturing.name}
                  </span>
                  <span className="mt-2 block text-sm text-paper-muted">
                    {t.divisionLines.manufacturing}
                  </span>
                </span>
                <span aria-hidden className="arrow-nudge text-xl text-accent-deep">
                  →
                </span>
              </Link>
              <Link
                to="/{-$locale}/energy"
                params={{ locale: localeParam(locale) }}
                className={cardClass}
              >
                <span>
                  <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">
                    {d.energy.name}
                  </span>
                  <span className="mt-2 block text-sm text-paper-muted">
                    {t.divisionLines.energy}
                  </span>
                </span>
                <span aria-hidden className="arrow-nudge text-xl text-accent-deep">
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
