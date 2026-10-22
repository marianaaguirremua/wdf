import { localeParam, useI18n } from "@/i18n";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { MANUFACTURING_CONTACT_URL } from "@/lib/site";

export function ContactCta() {
  const { locale, t } = useI18n();
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-ink-2 text-ink-foreground"
    >
      <div
        aria-hidden
        className="blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(70%_90%_at_85%_100%,#000,transparent)]"
      />
      <div className="container-wdf grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-3">
          <p className="label-mono text-primary">{t.cta.eyebrow}</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5.4vw,4.75rem)]"
          >
            <span id="cta-title">{t.cta.title}</span>
          </Reveal>
          <Reveal
            delay={160}
            className="mt-10 grid gap-10 border-t border-ink-border pt-10 md:grid-cols-9"
          >
            <p className="text-lg leading-relaxed text-ink-muted md:col-span-5">{t.cta.body}</p>
            <div className="flex flex-col gap-3 md:col-span-4">
              <ButtonLink to="/{-$locale}/contact" params={{ locale: localeParam(locale) }}>
                {t.cta.primary}
              </ButtonLink>
              <ExternalButton href={MANUFACTURING_CONTACT_URL}>{t.cta.secondary}</ExternalButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
