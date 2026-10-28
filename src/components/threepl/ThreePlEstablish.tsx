import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";

// How WDF helps a company get established in the U.S.: four steps in order (the numbering is the
// sequence), then a call to action to the 3PL contact.
export function ThreePlEstablish() {
  const { locale, t } = useI18n();
  const e = t.threepl.establish;
  const last = e.title.length - 1;

  return (
    <section
      aria-labelledby="threepl-establish-title"
      className="relative bg-white text-paper-foreground"
    >
      <div className="container-wdf py-24 md:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono inline-flex items-center gap-3 text-accent-deep">
              <span aria-hidden className="h-0.5 w-8 shrink-0 bg-accent" />
              {e.eyebrow}
            </p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display text-[clamp(2.25rem,4.6vw,4rem)] lg:col-span-9"
          >
            <span id="threepl-establish-title">
              {e.title.map((sentence, i) => (
                <span key={sentence} className={i === last ? "block text-accent-deep" : "block"}>
                  {sentence}
                </span>
              ))}
            </span>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {e.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90}>
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-ink">
                  0{i + 1}
                </span>
                <span aria-hidden className="h-px flex-1 bg-accent/60" />
              </div>
              <h3 className="mt-6 text-[1.4rem] font-semibold leading-tight tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-paper-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200} className="mt-14">
          <ButtonLink
            to="/{-$locale}/services/3pl"
            params={{ locale: localeParam(locale) }}
            hash="threepl-contact"
            variant="accent"
          >
            {e.primary}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
