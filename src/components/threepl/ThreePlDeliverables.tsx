import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

export function ThreePlDeliverables() {
  const { t } = useI18n();
  const d = t.threepl.deliverables;

  return (
    <section
      aria-labelledby="threepl-deliverables-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
            <p className="label-mono text-primary">{d.eyebrow}</p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] lg:col-span-9"
          >
            <span id="threepl-deliverables-title">{d.title}</span>
          </Reveal>
        </div>

        <div className="lg:ml-[25%]">
          <ol className="mt-16 border-t border-ink-border md:mt-20">
            {d.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={60}
                className="group flex items-baseline gap-6 border-b border-ink-border py-7 md:gap-10"
              >
                <span className="label-mono text-ink-muted transition-colors group-hover:text-primary">
                  0{i + 1}
                </span>
                <span className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] md:text-[1.75rem]">
                  {item}
                </span>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">{d.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
