import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { DirectContact } from "@/components/site/DirectContact";
import { THREEPL_CONTACT } from "@/lib/site";

/** The 3PL contact band; `id` is its anchor (#threepl-contact on 3PL, #yuma-contact on Yuma). */
export function ThreePlCta({ id = "threepl-contact" }: { id?: string }) {
  const { locale, t } = useI18n();
  const c = t.threepl.cta;

  return (
    <section
      id={id}
      aria-labelledby="threepl-cta-title"
      className="relative isolate scroll-mt-[var(--header-h)] overflow-hidden bg-accent text-ink"
    >
      <div className="container-wdf py-20 md:py-24">
        <Reveal as="h2" className="heading text-[clamp(1.75rem,3vw,2.5rem)]">
          <span id="threepl-cta-title">{c.eyebrow}</span>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 max-w-3xl text-balance text-xl font-semibold text-ink/85 md:text-2xl">
            {c.title}
          </p>
        </Reveal>
        <Reveal delay={160} className="mt-8 grid gap-10 border-t border-ink/20 pt-8 md:grid-cols-9">
          <div className="md:col-span-5">
            <p className="text-lg leading-relaxed text-ink/80">{c.body}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">{c.note}</p>
            <DirectContact
              label={c.contact}
              contact={THREEPL_CONTACT}
              tone="accent"
              className="mt-8"
            />
          </div>
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
    </section>
  );
}
