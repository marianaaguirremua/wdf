import { useI18n } from "@/i18n";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { PAGE_PHOTOS } from "@/lib/site";

// "What We Integrate": a photo and the hub statement stay in view (sticky) on the left while
// the seven disciplines and their processes, as on the Manufacturing site, scroll on the right.
// Each discipline keeps its #capability-N anchor for the Services page links.
export function Capabilities() {
  const { t } = useI18n();
  const c = t.services.capabilities;

  return (
    <section
      aria-labelledby="capabilities-title"
      className="relative bg-white text-paper-foreground"
    >
      <div className="container-wdf grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            {/* The label would repeat the title ("What We Integrate"), so only the title shows. */}
            <Reveal as="h2" className="heading text-[clamp(1.75rem,3vw,2.5rem)]">
              <span id="capabilities-title">{c.title}</span>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-paper-muted">{c.hub}</p>
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <PhotoSlot
                photo={PAGE_PHOTOS["manufacturing-integrate"]}
                className="aspect-[4/3] rounded-md lg:aspect-[4/5]"
              />
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-paper-border lg:col-span-7">
          {c.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={40} className="border-b border-paper-border">
              <article
                id={`capability-${i + 1}`}
                className="group grid scroll-mt-[calc(var(--header-h)+1.5rem)] gap-4 py-7 sm:grid-cols-[3rem_1fr] md:py-8"
              >
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-cyan-soft text-sm font-semibold text-cyan-deep transition-colors group-hover:bg-teal group-hover:text-ink"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="heading text-xl md:text-2xl">{item.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.processes.map((p) => (
                      <li
                        key={p}
                        className="rounded-sm bg-paper px-2.5 py-1 text-[0.8125rem] text-paper-foreground/80"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
