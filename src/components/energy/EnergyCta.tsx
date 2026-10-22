import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { Bolt } from "./Bolt";

export function EnergyCta() {
  const { locale, t } = useI18n();
  const c = t.energy.cta;

  return (
    <section
      aria-labelledby="energy-cta-title"
      className="relative isolate overflow-hidden bg-mustard text-ink"
    >
      <Bolt className="absolute -right-16 -top-10 -z-10 h-[130%] w-auto text-white/25" />
      <div className="container-wdf grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-3">
          <p className="label-mono text-ink">{c.eyebrow}</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5.4vw,4.75rem)]"
          >
            <span id="energy-cta-title">{c.title}</span>
          </Reveal>
          <Reveal
            delay={160}
            className="mt-10 grid gap-10 border-t border-ink/20 pt-10 md:grid-cols-9"
          >
            <p className="text-lg leading-relaxed text-ink/80 md:col-span-5">{c.body}</p>
            <div className="flex flex-col gap-3 md:col-span-4">
              <ButtonLink
                to="/{-$locale}/contact"
                params={{ locale: localeParam(locale) }}
                variant="ink"
              >
                {c.primary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
