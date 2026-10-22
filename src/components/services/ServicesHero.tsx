import type { CSSProperties } from "react";
import { useI18n } from "@/i18n";
import { ExternalButton } from "@/components/site/Button";
import { MANUFACTURING_CONTACT_URL, MANUFACTURING_URL } from "@/lib/site";

// The approved brand statement leads; the right column indexes the seven integrated
// disciplines in their real order (engineering through logistics) and links to each card.
export function ServicesHero() {
  const { t } = useI18n();
  const h = t.services.hero;
  const lines = [h.pre, h.accent];

  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden
        className="blueprint absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(90%_80%_at_80%_40%,#000_20%,transparent_75%)]"
      />
      <div aria-hidden className="column-rules -z-10" />

      <div className="container-wdf grid gap-14 pb-20 pt-[calc(var(--header-h)+4.5rem)] md:pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="lg:col-span-8">
          <p className="label-mono fade-up text-primary" style={{ "--d": "50ms" } as CSSProperties}>
            {h.eyebrow}
          </p>
          <h1
            id="services-title"
            className="display mt-7 text-[clamp(2.6rem,6.2vw,5.6rem)] font-semibold"
          >
            {lines.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties} className={i ? "text-primary" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="fade-up mt-10 max-w-[38rem]" style={{ "--d": "600ms" } as CSSProperties}>
            <p className="text-xl font-semibold tracking-[-0.01em] md:text-2xl">{h.sub}</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted md:text-lg">
              {h.body}
            </p>
          </div>
          <div
            className="fade-up mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "750ms" } as CSSProperties}
          >
            <ExternalButton href={MANUFACTURING_CONTACT_URL} variant="primary">
              {h.primary}
            </ExternalButton>
            <ExternalButton href={MANUFACTURING_URL}>{h.secondary}</ExternalButton>
          </div>
        </div>

        <nav
          aria-label={h.index}
          className="fade-up self-end lg:col-span-4"
          style={{ "--d": "900ms" } as CSSProperties}
        >
          <p className="label-mono text-ink-muted">{h.index}</p>
          <ol className="mt-4 border-t border-ink-border">
            {t.services.capabilities.items.map((item, i) => (
              <li key={item.title} className="border-b border-ink-border">
                <a
                  href={`#capability-${i + 1}`}
                  className="group flex items-baseline gap-4 py-3 text-[0.95rem] text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                >
                  <span className="label-mono text-ink-muted transition-colors group-hover:text-primary">
                    0{i + 1}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
