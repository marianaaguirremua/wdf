import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";

// The title stays on one line from 1024px up; it wraps on smaller screens.
// Animated isometric illustration of a WDF plant (machining, inspection, integration, energy).
// Loaded as an <img>: its CSS animation runs inside the file, stays isolated from the site's
// styles, and stops on its own under prefers-reduced-motion. Its edges are masked so the
// artwork's darker vignette fades into its navy panel on the light section.
/** `merged`: continues the section above (Home) — no divider, no top padding. */
export function ThreePlPlant({ merged = false }: { merged?: boolean }) {
  const { t } = useI18n();
  const p = t.threepl.plant;

  return (
    <section
      aria-labelledby="threepl-plant-title"
      className={cn(
        "relative isolate overflow-hidden bg-paper text-paper-foreground",
        !merged && "border-t border-paper-border",
      )}
    >
      {!merged && <div aria-hidden className="column-rules -z-10 opacity-60" />}
      <div className={cn("container-wdf pb-24 md:pb-32", merged ? "pt-8" : "pt-12 md:pt-16")}>
        <Reveal
          as="h2"
          className="display mx-auto max-w-4xl text-balance text-center text-[clamp(1.875rem,3.2vw,2.875rem)] lg:max-w-none lg:whitespace-nowrap"
        >
          <span id="threepl-plant-title">
            <span className="text-accent-deep">{p.title[0]}</span> {p.title[1]}
          </span>
        </Reveal>

        <Reveal
          delay={200}
          className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-md bg-ink p-4 md:mt-16 md:p-8"
        >
          <img
            src="/media/3pl/wdf-plant.svg"
            alt={p.alt}
            width={1370}
            height={940}
            loading="lazy"
            decoding="async"
            className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_72%,transparent_100%)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
