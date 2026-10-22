import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

export function EnergyDeliverables() {
  const { t } = useI18n();
  const d = t.energy.deliverables;

  return (
    <section aria-labelledby="energy-deliverables-title" className="bg-white text-paper-foreground">
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-mustard-deep">{d.eyebrow}</p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] lg:col-span-9"
          >
            <span id="energy-deliverables-title">{d.title}</span>
          </Reveal>
        </div>

        <div className="lg:ml-[25%]">
          <ol className="mt-16 border-t border-paper-foreground/15 md:mt-20">
            {d.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={60}
                className="group flex items-baseline gap-6 border-b border-paper-foreground/15 py-7 md:gap-10"
              >
                <span className="label-mono text-mustard-deep">0{i + 1}</span>
                <span className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-mustard-deep md:text-[1.75rem]">
                  {item}
                </span>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-paper-muted">{d.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
