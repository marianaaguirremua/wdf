import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { MxFlag, UsFlag } from "./icons";

/** The country flag above each place name. */
function Flag({ country }: { country: "us" | "mx" }) {
  return country === "us" ? (
    <svg
      viewBox="0 0 19 10"
      aria-hidden
      className="h-4 w-auto shrink-0 shadow-[0_0_0_1px_rgb(12_24_40/0.12)]"
    >
      <UsFlag x={0} y={0} w={19} />
    </svg>
  ) : (
    <svg
      viewBox="0 0 7 4"
      aria-hidden
      className="h-4 w-auto shrink-0 shadow-[0_0_0_1px_rgb(12_24_40/0.12)]"
    >
      <MxFlag x={0} y={0} w={7} />
    </svg>
  );
}

/** California — Yuma — Mexicali, west to east across the region, with Yuma highlighted. */
function RegionStrip() {
  const { t } = useI18n();
  const d = t.threepl.whyYuma.diagram;
  const places = [
    { name: d.california, role: null, country: "us" },
    { name: d.yuma, role: d.yumaRole, country: "us" },
    { name: d.mexico, role: null, country: "mx" },
  ] as const;

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
            <Flag country={place.country} />
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

const MOUNTAINS = { src: "/media/yuma/mountains.webp", width: 2000, height: 1333 };

/**
 * Opens the Yuma page: "Why Yuma, Arizona?" (its h1) and the location line over a photo of the
 * Yuma-area mountains, the body text in a light box so it stays readable, the California — Yuma
 * — Mexicali strip beside it. The Yuma photos follow the map (YumaPhotos).
 */
export function ThreePlWhyYuma() {
  const { t } = useI18n();
  const w = t.threepl.whyYuma;

  return (
    <section
      aria-labelledby="threepl-yuma-title"
      className="relative isolate overflow-hidden bg-paper text-paper-foreground"
    >
      <img
        src={MOUNTAINS.src}
        alt=""
        width={MOUNTAINS.width}
        height={MOUNTAINS.height}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_25%]"
      />
      {/* Paper behind the header and the title, fading into the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--paper)_0%,color-mix(in_oklab,var(--paper)_70%,transparent)_22%,transparent_50%)]"
      />

      <div className="container-wdf pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-32 md:pt-[calc(var(--header-h)+4rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {/* "Why Yuma, Arizona?" is the title; the location line is its subtitle. */}
            <Reveal as="h1" className="heading text-[clamp(2.25rem,4.2vw,3.5rem)]">
              <span id="threepl-yuma-title">{w.eyebrow}</span>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 max-w-xl text-balance text-xl font-semibold text-accent-deep md:text-2xl">
                {w.title}
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-8">
              <div className="flex flex-col gap-4 rounded-md bg-white/90 p-6 shadow-[0_10px_30px_-12px_rgb(12_24_40/0.25)] backdrop-blur-sm md:p-7">
                {w.body.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={cn(
                      "leading-relaxed",
                      i
                        ? "text-paper-muted md:text-lg"
                        : "text-lg text-paper-foreground md:text-xl",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <RegionStrip />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
