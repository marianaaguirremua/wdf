import type { CSSProperties } from "react";
import { useI18n } from "@/i18n";
import { ExternalButton } from "@/components/site/Button";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { MANUFACTURING_CONTACT_URL, PAGE_PHOTOS } from "@/lib/site";

// The approved brand statement on a light band, with the hero photo filling the right half of
// the section up to the screen edge (below the text on narrow screens).
export function ServicesHero() {
  const { t } = useI18n();
  const h = t.services.hero;

  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden border-b border-paper-border bg-paper text-paper-foreground"
    >
      <div className="container-wdf pb-12 pt-[calc(var(--header-h)+3rem)] md:pb-14 lg:flex lg:min-h-[min(40rem,80svh)] lg:items-center lg:pb-20 lg:pt-[calc(var(--header-h)+4rem)]">
        <div className="lg:w-1/2 lg:pr-14 xl:pr-20">
          <p
            className="fade-up text-sm font-semibold text-cyan-deep"
            style={{ "--d": "50ms" } as CSSProperties}
          >
            {h.eyebrow}
          </p>
          <h1
            id="services-title"
            className="heading fade-up mt-4 text-[clamp(2.25rem,4.2vw,3.5rem)]"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            {h.pre} <span className="text-cyan-deep">{h.accent}</span>
          </h1>
          <p
            className="fade-up mt-6 text-lg font-semibold"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            {h.sub}
          </p>
          <p
            className="fade-up mt-3 text-[1.0625rem] leading-relaxed text-paper-muted"
            style={{ "--d": "260ms" } as CSSProperties}
          >
            {h.body}
          </p>
          <div className="fade-up mt-9" style={{ "--d": "320ms" } as CSSProperties}>
            <ExternalButton
              href={MANUFACTURING_CONTACT_URL}
              variant="accent"
              className="accent-cyan"
            >
              {h.primary}
            </ExternalButton>
          </div>
        </div>
      </div>

      {/* Below the text on narrow screens; the right half of the band from 1024px. */}
      <PhotoSlot
        photo={PAGE_PHOTOS["manufacturing-hero"]}
        eager
        className="aspect-[16/10] w-full lg:absolute lg:bottom-0 lg:left-1/2 lg:right-0 lg:top-[var(--header-h)] lg:aspect-auto lg:w-auto"
      />
    </section>
  );
}
