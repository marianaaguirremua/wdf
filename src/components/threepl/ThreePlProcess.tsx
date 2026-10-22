import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { TranslationDraft } from "./TranslationDraft";

// Four steps in order; the numbering is the sequence.
export function ThreePlProcess() {
  const { t } = useI18n();
  const p = t.threepl.process;

  return (
    <section aria-labelledby="threepl-process-title" className="section-light relative">
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
            <p className="label-mono text-petroleum">{p.eyebrow}</p>
            <TranslationDraft className="text-paper-muted" />
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="threepl-process-title">{p.title}</span>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-muted md:text-[1.25rem]">
                {p.body}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {p.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative">
              <div className="flex items-center gap-3">
                <span className="label-mono text-petroleum">0{i + 1}</span>
                <span aria-hidden className="h-px flex-1 bg-paper-foreground/15" />
              </div>
              <h3 className="mt-6 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-paper-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
