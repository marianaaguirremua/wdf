import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/i18n";
import { PAGE_PHOTOS } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";

// "How we work": four steps in order (the numbering is the sequence), each with a photo.
export function ThreePlProcess() {
  const { t } = useI18n();
  const p = t.threepl.process;

  return (
    <section
      aria-labelledby="threepl-process-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div className="container-wdf py-20 md:py-24">
        <SectionHeader
          id="threepl-process-title"
          title={p.eyebrow}
          subtitle={p.title}
          body={p.body}
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {p.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className="flex flex-col overflow-hidden rounded-md border border-paper-border bg-white"
            >
              <PhotoSlot photo={PAGE_PHOTOS[`threepl-process-${i + 1}`]} className="aspect-[4/3]" />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-semibold text-ink">
                    {i + 1}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-accent/50" />
                </div>
                <h3 className="heading mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
