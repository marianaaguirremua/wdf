import { useI18n } from "@/i18n";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { YUMA_PHOTOS } from "@/lib/site";
import { cn } from "@/lib/utils";

/** California — Yuma — Mexicali, west to east across the region, with Yuma highlighted. */
function RegionStrip() {
  const { t } = useI18n();
  const d = t.threepl.whyYuma.diagram;
  const places = [
    { name: d.california, role: null },
    { name: d.yuma, role: d.yumaRole },
    { name: d.mexico, role: null },
  ];

  return (
    <div role="img" aria-label={d.label} className="relative">
      {/* Dotted link behind the three places */}
      <span
        aria-hidden
        className="absolute bottom-8 left-1/2 top-8 w-0.5 -translate-x-1/2 border-l-2 border-dotted border-accent md:inset-x-8 md:bottom-auto md:left-auto md:top-1/2 md:h-0.5 md:w-auto md:translate-x-0 md:border-l-0 md:border-t-2"
      />
      <ol className="relative grid gap-6 md:grid-cols-3 md:gap-4">
        {places.map((place) => (
          <li
            key={place.name}
            className={cn(
              "flex flex-col items-center gap-3 rounded-[4px] border bg-white px-4 py-6 text-center",
              place.role ? "border-accent" : "border-paper-border",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "size-3 rounded-full",
                place.role ? "bg-accent ring-4 ring-accent/25" : "bg-paper-muted/50",
              )}
            />
            <span
              className={cn("font-semibold", place.role ? "text-lg" : "text-paper-foreground/85")}
            >
              {place.name}
            </span>
            {place.role && <span className="label-mono text-accent-deep">{place.role}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** `page`: opens the Yuma page — the title is its h1 and the section clears the fixed header. */
export function ThreePlWhyYuma({ page = false }: { page?: boolean }) {
  const { t } = useI18n();
  const w = t.threepl.whyYuma;

  return (
    <section
      aria-labelledby="threepl-yuma-title"
      className="relative isolate overflow-hidden bg-white text-paper-foreground border-t border-paper-border"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div
        className={cn(
          "container-wdf grid items-center gap-14 pb-20 md:pb-24 lg:grid-cols-12 lg:gap-8",
          page
            ? "pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+5rem)]"
            : "pt-20 md:pt-24",
        )}
      >
        <div className="lg:col-span-6">
          {/* "Why Yuma, Arizona?" is the title; the location line is its subtitle. */}
          <Reveal as={page ? "h1" : "h2"} className="display text-[clamp(2.25rem,4.4vw,4rem)]">
            <span id="threepl-yuma-title">{w.eyebrow}</span>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-balance text-xl font-semibold text-accent-deep md:text-2xl">
              {w.title}
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex flex-col gap-5">
            {w.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={cn(
                  "leading-relaxed",
                  i ? "text-lg text-paper-muted" : "text-xl text-paper-foreground",
                )}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal delay={200} className="lg:col-span-5 lg:col-start-8">
          <RegionStrip />
        </Reveal>
        {page && (
          <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-12 lg:grid-cols-4">
            {YUMA_PHOTOS.map((photo, i) => (
              <Reveal as="li" key={photo.src} delay={240 + i * 70}>
                <PhotoSlot photo={photo} eager className="aspect-[4/3] rounded-md" />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
