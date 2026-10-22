import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

// Four steps in order on a warm mustard band; the numbering is the sequence.
export function EnergyProcess() {
  const { t } = useI18n();
  const p = t.energy.process;

  return (
    <section
      aria-labelledby="energy-process-title"
      className="bg-mustard-soft text-paper-foreground"
    >
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-mustard-deep">{p.eyebrow}</p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="energy-process-title">{p.title}</span>
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
            <Reveal as="li" key={step.title} delay={i * 90}>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-mustard font-mono text-xs font-semibold text-ink">
                  0{i + 1}
                </span>
                <span aria-hidden className="h-px flex-1 bg-mustard/60" />
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
