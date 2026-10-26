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
      <div className="container-wdf py-24 md:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label-mono inline-flex items-center gap-3 text-accent">
              <span aria-hidden className="h-0.5 w-8 shrink-0 bg-accent" />
              {p.eyebrow}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,4.4vw,4rem)]">
              <span id="threepl-plant-title">{p.title}</span>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{p.body}</p>
            </Reveal>
          </div>
        </div>

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
