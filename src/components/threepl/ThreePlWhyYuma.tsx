import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { MxFlag, UsFlag } from "./icons";

/** The country flag above each place name. */
function Flag({ country }: { country: "us" | "mx" }) {
  return country === "us" ? (
    <svg
      viewBox="0 0 19 10"
      aria-hidden
      className="h-3 w-auto shrink-0 shadow-[0_0_0_1px_rgb(12_24_40/0.12)]"
    >
      <UsFlag x={0} y={0} w={19} />
    </svg>
  ) : (
    <svg
      viewBox="0 0 7 4"
      aria-hidden
      className="h-3 w-auto shrink-0 shadow-[0_0_0_1px_rgb(12_24_40/0.12)]"
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
        className="absolute inset-x-6 top-1/2 h-0.5 border-t-2 border-dotted border-accent"
      />
      <ol className="relative grid grid-cols-3 gap-2 md:gap-3">
        {places.map((place) => (
          <li
            key={place.name}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-[4px] border bg-white px-3 py-3 text-center",
              place.role ? "border-accent" : "border-paper-border",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "size-2 rounded-full",
                place.role ? "bg-accent ring-2 ring-accent/25" : "bg-paper-muted/50",
              )}
            />
            <Flag country={place.country} />
            <span
              className={cn(
                "text-sm font-semibold leading-snug",
                !place.role && "text-paper-foreground/85",
              )}
            >
              {place.name}
            </span>
            {place.role && (
              <span className="label-mono text-[0.6rem] text-accent-deep">{place.role}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const MOUNTAINS = { src: "/media/yuma/mountains.webp", width: 2000, height: 1333 };

/**
 * Opens the Yuma page: "Why Yuma, Arizona?" (its h1) and the location line over a photo of the
 * Yuma-area mountains, the California — Yuma — Mexicali strip under the subtitle, and the body
 * text in a light box below it so it stays readable, and a Contact Us button to the project &
 * RFQ form; all centred. The Yuma photos follow the map (YumaPhotos).
 */
export function ThreePlWhyYuma() {
  const { locale, t } = useI18n();
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
        {/* "Why Yuma, Arizona?" is the title; the location line is its subtitle. Both centred. */}
        <div className="text-center">
          <Reveal as="h1" className="heading text-[clamp(2.75rem,6vw,5rem)]">
            <span id="threepl-yuma-title">{w.eyebrow}</span>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-xl font-semibold text-accent-deep md:text-2xl">
              {w.title}
            </p>
          </Reveal>
        </div>
        {/* The three places under the subtitle, then the text box; both centred. */}
        <Reveal delay={160} className="mx-auto mt-6 max-w-xl md:mt-8">
          <RegionStrip />
        </Reveal>
        <Reveal delay={200} className="mx-auto mt-10 max-w-3xl md:mt-12">
          <div className="flex flex-col gap-4 rounded-md bg-white/90 p-6 text-center shadow-[0_10px_30px_-12px_rgb(12_24_40/0.25)] backdrop-blur-sm md:p-8">
            {w.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={cn(
                  "leading-relaxed",
                  i ? "text-paper-muted md:text-lg" : "text-lg text-paper-foreground md:text-xl",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={240} className="mt-8 flex justify-center">
          <ButtonLink
            to="/{-$locale}/contact"
            params={{ locale: localeParam(locale) }}
            variant="accent"
          >
            {w.contact}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
