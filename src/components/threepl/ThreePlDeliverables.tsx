import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/i18n";
import { PAGE_PHOTOS } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";

// "Deliverables & responsibilities": a photo beside the four deliverables, then the note.
export function ThreePlDeliverables() {
  const { t } = useI18n();
  const d = t.threepl.deliverables;

  return (
    <section
      aria-labelledby="threepl-deliverables-title"
      className="relative bg-white text-paper-foreground"
    >
      <div className="container-wdf py-20 md:py-24">
        <SectionHeader id="threepl-deliverables-title" title={d.eyebrow} subtitle={d.title} />

        <div className="mt-12 grid items-center gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <PhotoSlot
              photo={PAGE_PHOTOS["threepl-deliverables"]}
              className="aspect-[4/3] rounded-md lg:aspect-[4/5]"
            />
          </Reveal>
          <div className="lg:col-span-7">
            <ol className="border-t border-paper-border">
              {d.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={60}
                  className="flex items-center gap-5 border-b border-paper-border py-6 md:gap-8 md:py-7"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent-deep">
                    {i + 1}
                  </span>
                  <span className="heading text-xl md:text-2xl">{item}</span>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={120}>
              <p className="mt-6 text-sm leading-relaxed text-paper-muted">{d.note}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
