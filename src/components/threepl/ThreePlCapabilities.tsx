import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/i18n";
import { PAGE_PHOTOS } from "@/lib/site";
import { CrossTag } from "./CrossTag";
import { SectionHeader } from "./SectionHeader";

/**
 * Opens the 3PL page: "Logistics services" (the page's h1, below the fixed header) with a photo
 * beside it, then one card with a photo per service.
 */
export function ThreePlCapabilities() {
  const { t } = useI18n();
  const c = t.threepl.capabilities;

  return (
    <section
      aria-labelledby="threepl-capabilities-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div className="container-wdf pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+4rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <SectionHeader
            as="h1"
            id="threepl-capabilities-title"
            title={c.eyebrow}
            subtitle={c.title}
            body={c.body}
            className="lg:col-span-6"
          />
          <Reveal delay={160} className="relative lg:col-span-6">
            <span
              aria-hidden
              className="absolute -bottom-3 -left-3 h-1/2 w-1/2 rounded-md bg-accent"
            />
            <PhotoSlot
              photo={PAGE_PHOTOS["threepl-hero"]}
              eager
              className="relative aspect-[5/4] rounded-md"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={(i % 3) * 70}
              className="group flex flex-col overflow-hidden rounded-md border border-paper-border bg-white"
            >
              <PhotoSlot
                photo={PAGE_PHOTOS[`threepl-capability-${i + 1}`]}
                className="aspect-[4/3]"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-6 md:p-7">
                {/* Customs documentation & crossing is the cross-border service. */}
                {i === 3 && (
                  <span className="self-start">
                    <CrossTag label={c.crossTag} />
                  </span>
                )}
                {/* Anchor for links from the Services page (#threepl-capability-1, …). */}
                <h3
                  id={`threepl-capability-${i + 1}`}
                  className="heading mt-3 scroll-mt-[calc(var(--header-h)+6rem)] text-xl first:mt-0 md:text-[1.375rem]"
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
