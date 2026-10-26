import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

export function Intro() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="intro-title" className="section-light relative">
      <div className="container-wdf grid gap-10 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
          <p className="label-mono text-petroleum">{t.intro.eyebrow}</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
            <span id="intro-title">{t.intro.title}</span>
          </Reveal>
          <div className="mt-12 grid gap-8 border-t border-paper-foreground/15 pt-10 md:grid-cols-9">
            <Reveal delay={160} className="md:col-span-6 md:col-start-4">
              <p className="text-lg leading-relaxed text-paper-muted md:text-[1.25rem]">
                {t.intro.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
