import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
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
              "flex flex-col items-center gap-3 rounded-[4px] border bg-ink px-4 py-6 text-center",
              place.role ? "border-accent" : "border-ink-3",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "size-3 rounded-full",
                place.role ? "bg-accent ring-4 ring-accent/25" : "bg-ink-muted",
              )}
            />
            <span
              className={cn("font-semibold", place.role ? "text-lg" : "text-ink-foreground/85")}
            >
              {place.name}
            </span>
            {place.role && <span className="label-mono text-sand">{place.role}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ThreePlWhyYuma() {
  const { t } = useI18n();
  const w = t.threepl.whyYuma;

  return (
    <section
      aria-labelledby="threepl-yuma-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div className="container-wdf grid items-center gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="label-mono inline-flex items-center gap-3 text-accent">
              <span aria-hidden className="h-0.5 w-8 shrink-0 bg-accent" />
              {w.eyebrow}
            </p>
          </Reveal>
          <Reveal as="h2" delay={80} className="display mt-8 text-[clamp(2.25rem,4.4vw,4rem)]">
            <span id="threepl-yuma-title">{w.title}</span>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex flex-col gap-5">
            {w.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={cn(
                  "leading-relaxed",
                  i ? "text-lg text-ink-muted" : "text-xl text-ink-foreground",
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
      </div>
    </section>
  );
}
