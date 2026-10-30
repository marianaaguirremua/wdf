import { localeParam, useI18n } from "@/i18n";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { MANUFACTURING_CONTACT_URL } from "@/lib/site";

/** `eyebrow` overrides the homepage section number when the CTA is reused on another page. */
export function ContactCta({ eyebrow }: { eyebrow?: string }) {
  const { locale, t } = useI18n();
  return (
    <section
      aria-labelledby="cta-title"
      className="relative border-t border-paper-border bg-white text-paper-foreground"
    >
      <div className="container-wdf py-20 md:py-24">
        <div className="grid gap-8 rounded-md bg-cyan-soft px-6 py-10 md:px-12 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
              {eyebrow ?? t.cta.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="heading mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
              <span id="cta-title">{t.cta.title}</span>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-paper-muted">
                {t.cta.body}
              </p>
            </Reveal>
          </div>
          <Reveal
            delay={200}
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch xl:flex-row xl:justify-end"
          >
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="accent"
              className="accent-cyan"
            >
              {t.cta.primary}
            </ButtonLink>
            <ExternalButton
              href={MANUFACTURING_CONTACT_URL}
              variant="outline-light"
              className="bg-white"
            >
              {t.cta.secondary}
            </ExternalButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
