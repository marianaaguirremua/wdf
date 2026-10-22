import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

// "What We Integrate": the hub statement plus the seven disciplines and their processes,
// as on the Manufacturing site. Eight cells fill a 4 × 2 grid on desktop and 2 × 4 on tablet.
export function Capabilities() {
  const { t } = useI18n();
  const c = t.services.capabilities;

  return (
    <section aria-labelledby="capabilities-title" className="section-light relative">
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-petroleum">{c.eyebrow}</p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display text-[clamp(2.25rem,5vw,4.25rem)] lg:col-span-9"
          >
            <span id="capabilities-title">{c.title}</span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-paper-foreground/10 bg-paper-foreground/10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          <div className="relative flex flex-col justify-between gap-10 bg-ink p-7 text-ink-foreground">
            <span className="label-mono inline-flex items-center gap-2.5 text-teal">
              <span aria-hidden className="blink size-1.5 rounded-full bg-teal" />
              WDF
            </span>
            <p className="text-xl font-semibold leading-snug tracking-[-0.01em]">{c.hub}</p>
            <svg viewBox="0 0 120 20" fill="none" aria-hidden className="h-5 w-full text-teal">
              <path d="M0 10 H120" stroke="currentColor" strokeOpacity="0.5" />
              {[8, 38, 68, 98].map((x) => (
                <circle key={x} cx={x} cy="10" r="3" fill="var(--ink)" stroke="currentColor" />
              ))}
            </svg>
          </div>

          {c.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 4) * 70}
              className="group relative flex flex-col bg-paper p-7"
            >
              <article
                id={`capability-${i + 1}`}
                className="flex h-full scroll-mt-[calc(var(--header-h)+1.5rem)] flex-col"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-petroleum transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <span className="label-mono text-petroleum">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.015em]">
                  {item.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.processes.map((p) => (
                    <li
                      key={p}
                      className="rounded-sm border border-paper-foreground/15 px-2.5 py-1 text-xs text-paper-muted transition-colors group-hover:border-petroleum/40 group-hover:text-paper-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
