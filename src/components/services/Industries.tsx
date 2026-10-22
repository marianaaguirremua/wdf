import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

export function Industries() {
  const { t } = useI18n();
  const ind = t.services.industries;

  return (
    <section aria-labelledby="industries-title" className="section-light relative">
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-petroleum">{ind.eyebrow}</p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display text-[clamp(2.25rem,5vw,4.25rem)] lg:col-span-9"
          >
            <span id="industries-title">{ind.title}</span>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          delay={120}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-paper-foreground/10 bg-paper-foreground/10 md:mt-20 md:grid-cols-3"
        >
          {ind.items.map((name, i) => (
            <li
              key={name}
              className="group flex aspect-[4/3] flex-col justify-between bg-paper p-5 transition-colors duration-300 hover:bg-ink hover:text-ink-foreground md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="label-mono text-paper-muted transition-colors group-hover:text-teal">
                  IND-0{i + 1}
                </span>
                <svg
                  viewBox="0 0 100 20"
                  fill="none"
                  aria-hidden
                  className="hidden h-4 w-16 text-paper-foreground/20 transition-colors group-hover:text-teal sm:block"
                >
                  <path d="M0 10 H100" stroke="currentColor" />
                  <circle cx={12 + i * 15} cy="10" r="4" fill="none" stroke="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
                {name}
              </h3>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
