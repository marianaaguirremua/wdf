import { localeParam, useI18n } from "@/i18n";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { DirectContact } from "@/components/site/DirectContact";
import { MANUFACTURING_CONTACT, MANUFACTURING_CONTACT_URL } from "@/lib/site";

// Quotes are taken by the Manufacturing site's RFQ form; WDF contact stays on this site.
export function ServicesCta() {
  const { locale, t } = useI18n();
  const c = t.services.cta;

  return (
    <section
      aria-labelledby="services-cta-title"
      className="relative border-t border-paper-border bg-white text-paper-foreground"
    >
      <div className="container-wdf py-20 md:py-24">
        <div className="grid gap-8 rounded-md bg-cyan-soft px-6 py-10 md:px-12 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
              {c.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="heading mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
              <span id="services-cta-title">{c.title}</span>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-paper-muted">
                {c.body}
              </p>
              <DirectContact
                label={c.contact}
                contact={MANUFACTURING_CONTACT}
                tone="accent"
                className="mt-7"
              />
            </Reveal>
          </div>
          <Reveal delay={200} className="flex flex-col gap-3 lg:col-span-5">
            <ExternalButton
              href={MANUFACTURING_CONTACT_URL}
              variant="accent"
              className="accent-cyan"
            >
              {c.primary}
            </ExternalButton>
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="outline-light"
              className="bg-white"
            >
              {c.secondary}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
