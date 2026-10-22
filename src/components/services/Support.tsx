import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

// "Manufacturing Capacity When You Need It": seven support models as a specification list.
export function Support() {
  const { t } = useI18n();
  const s = t.services.support;

  return (
    <section
      aria-labelledby="support-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-primary">{s.eyebrow}</p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] lg:col-span-9"
          >
            <span id="support-title">{s.title}</span>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-ink-border md:mt-20 lg:ml-[25%]">
          {s.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={60}
              className="group grid gap-2 border-b border-ink-border py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="label-mono text-ink-muted transition-colors group-hover:text-primary md:col-span-1">
                / 0{i + 1}
              </span>
              <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] md:col-span-5">
                {item.title}
              </h3>
              <p className="leading-relaxed text-ink-muted md:col-span-6">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
