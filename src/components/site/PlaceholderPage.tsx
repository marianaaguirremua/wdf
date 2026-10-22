import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";

/** Minimal, professional holding page for routes whose content is not approved yet. */
export function PlaceholderPage({
  eyebrow,
  title,
  extra,
}: {
  eyebrow: string;
  title: string;
  extra?: ReactNode;
}) {
  const { locale, t } = useI18n();

  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden pb-20 pt-40 md:pb-28">
      <div
        aria-hidden
        className="blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(80%_70%_at_70%_40%,#000,transparent)]"
      />
      <div aria-hidden className="column-rules -z-10" />
      <div className="container-wdf">
        <p className="label-mono fade-up text-primary">{eyebrow}</p>
        <h1 className="display mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6rem)]">
          <span className="rise-line">
            <span>{title}</span>
          </span>
        </h1>
        <div
          className="fade-up mt-10 grid max-w-3xl gap-8 border-t border-ink-border pt-8 md:grid-cols-[auto_1fr]"
          style={{ "--d": "300ms" } as CSSProperties}
        >
          <p className="label-mono inline-flex items-center gap-2 self-start text-ink-muted">
            <span aria-hidden className="blink size-1.5 rounded-full bg-primary" />
            {t.placeholder.status}
          </p>
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">{t.placeholder.body}</p>
            {extra}
            <Link
              to="/{-$locale}"
              params={{ locale: localeParam(locale) }}
              className="label-mono mt-10 inline-flex items-center gap-2 text-ink-foreground hover:text-primary"
            >
              <span aria-hidden>←</span> {t.placeholder.back}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Outbound link used on placeholder pages (e.g. to the Manufacturing site). */
export function ExternalNote({ note, label, href }: { note: string; label: string; href: string }) {
  const { t } = useI18n();
  return (
    <p className="mt-6 text-ink-foreground">
      {note}{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-1 text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
      >
        {label}
        <span aria-hidden className="arrow-nudge arrow-nudge-diag">
          ↗
        </span>
        <span className="sr-only">({t.footer.external})</span>
      </a>
    </p>
  );
}
