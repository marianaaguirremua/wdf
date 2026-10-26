import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";

// Animated isometric illustration of a WDF plant (machining, inspection, integration, energy).
// Loaded as an <img>: its CSS animation runs inside the file, stays isolated from the site's
// styles, and stops on its own under prefers-reduced-motion. Its edges are masked so the
// artwork's darker vignette fades into the section instead of showing as a box.
export function ThreePlPlant() {
  const { t } = useI18n();
  const p = t.threepl.plant;

  return (
    <section
      aria-labelledby="threepl-plant-title"
      className="relative isolate overflow-hidden border-t border-ink-border bg-ink text-ink-foreground"
    >
      <div aria-hidden className="column-rules -z-10 opacity-60" />
      <div className="container-wdf pb-24 pt-12 md:pb-32 md:pt-16">
        <Reveal
          as="h2"
          className="display mx-auto max-w-4xl text-balance text-center text-[clamp(1.875rem,3.2vw,2.875rem)]"
        >
          <span id="threepl-plant-title">
            <span className="text-accent">{p.title[0]}</span> {p.title[1]}
          </span>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-12 max-w-6xl md:mt-16">
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
