import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { DirectContact } from "@/components/site/DirectContact";
import { THREEPL_CONTACT } from "@/lib/site";

export function ThreePlCta() {
  const { locale, t } = useI18n();
  const c = t.threepl.cta;

  return (
    <section
      aria-labelledby="threepl-cta-title"
      className="relative isolate overflow-hidden bg-ink-2 text-ink-foreground"
    >
      <div
        aria-hidden
        className="blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(70%_90%_at_85%_100%,#000,transparent)]"
      />
      <div className="container-wdf grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
          <p className="label-mono text-primary">{c.eyebrow}</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5.4vw,4.75rem)]"
          >
            <span id="threepl-cta-title">{c.title}</span>
          </Reveal>
          <Reveal
            delay={160}
            className="mt-10 grid gap-10 border-t border-ink-border pt-10 md:grid-cols-9"
          >
            <div className="md:col-span-5">
              <p className="text-lg leading-relaxed text-ink-muted">{c.body}</p>
              <DirectContact label={c.contact} contact={THREEPL_CONTACT} className="mt-8" />
            </div>
            <div className="flex flex-col gap-3 md:col-span-4">
              <ButtonLink to="/{-$locale}/contact" params={{ locale: localeParam(locale) }}>
                {c.primary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
