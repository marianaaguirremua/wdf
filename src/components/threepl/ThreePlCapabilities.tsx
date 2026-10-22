import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { TranslationDraft } from "./TranslationDraft";

export function ThreePlCapabilities() {
  const { t } = useI18n();
  const c = t.threepl.capabilities;

  return (
    <section aria-labelledby="threepl-capabilities-title" className="section-light relative">
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
            <p className="label-mono text-petroleum">{c.eyebrow}</p>
            <TranslationDraft className="text-paper-muted" />
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="threepl-capabilities-title">{c.title}</span>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-muted md:text-[1.25rem]">
                {c.body}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-paper-foreground/10 bg-paper-foreground/10 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={(i % 3) * 70}
              className="group relative flex flex-col bg-paper p-7 md:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-petroleum transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className="label-mono text-petroleum">0{i + 1} / WDF 3PL</span>
              <h3 className="mt-6 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-4 leading-relaxed text-paper-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
