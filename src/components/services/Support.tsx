import { useI18n } from "@/i18n";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { PAGE_PHOTOS } from "@/lib/site";

// "Manufacturing Capacity When You Need It": a wide panoramic photo, then the seven support
// models as cards (four, then three, on desktop).
export function Support() {
  const { t } = useI18n();
  const s = t.services.support;

  return (
    <section aria-labelledby="support-title" className="relative bg-paper text-paper-foreground">
      <div className="container-wdf py-20 md:py-24">
        <div className="max-w-2xl">
          <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
            {s.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className="heading mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
            <span id="support-title">{s.title}</span>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-10 md:mt-12">
          <PhotoSlot
            photo={PAGE_PHOTOS["manufacturing-support"]}
            className="aspect-[16/9] rounded-md sm:aspect-[21/8]"
          />
        </Reveal>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 4) * 70}
              className="flex flex-col rounded-md border border-paper-border bg-white p-6"
            >
              <span aria-hidden className="h-1 w-8 rounded-full bg-teal" />
              <h3 className="heading mt-5 text-lg">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
