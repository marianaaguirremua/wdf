import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

export function Intro() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="intro-title" className="relative bg-white text-paper-foreground">
      <div className="container-wdf grid gap-6 py-20 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
            {t.intro.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className="heading mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
            <span id="intro-title">{t.intro.title}</span>
          </Reveal>
        </div>
        <Reveal delay={160} className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <p className="text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg">
            {t.intro.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
