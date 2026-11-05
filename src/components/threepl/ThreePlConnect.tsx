import { localeParam, useI18n } from "@/i18n";
import { Link } from "@tanstack/react-router";
import { OnDemandVideo } from "@/components/site/OnDemandVideo";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "./SectionHeader";
import { SERVICES_VIDEO } from "@/lib/site";

const cardClass =
  "group flex items-center justify-between gap-6 rounded-md border border-paper-border bg-paper p-7 transition-colors hover:border-accent md:p-8";

// Links 3PL to the other WDF divisions: a general WDF services video (loaded only when
// played), then Manufacturing and Energy to their pages.
export function ThreePlConnect() {
  const { locale, t } = useI18n();
  const c = t.threepl.connect;
  const d = t.divisions;

  return (
    <section
      aria-labelledby="threepl-connect-title"
      className="relative bg-white text-paper-foreground"
    >
      <div className="container-wdf py-20 md:py-24">
        <SectionHeader
          id="threepl-connect-title"
          title={c.eyebrow}
          subtitle={c.title}
          body={c.body}
        />
        <div>
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
              to="/{-$locale}/services/manufacturing"
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
              to="/{-$locale}/services/energy"
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
    </section>
  );
}
