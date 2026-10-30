import { useLocation, useRouter } from "@tanstack/react-router";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type JSX,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { LOCALE_META, LOCALES, localizedPath, splitLocalePath, useI18n } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

// Each language is offered as a country: the U.S. flag for English, Mexico's for Spanish.
const COUNTRY: Record<Locale, { name: string; Flag: () => JSX.Element }> = {
  en: { name: "United States", Flag: UsFlag },
  es: { name: "México", Flag: MxFlag },
};

/**
 * Country selector in the header: the current flag opens a short list of both countries.
 * Each option links to the same page in that language (crawlable hrefs with hreflang).
 */
export function LanguageSwitcher({
  className,
  up = false,
}: {
  className?: string;
  /** Open the list above the button (footer, at the bottom of the page). */
  up?: boolean;
}) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const { pathname, hash } = useLocation();
  const { path } = splitLocalePath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const Current = COUNTRY[locale].Flag;

  useEffect(() => setOpen(false), [pathname, locale]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    router.history.push(href + (hash ? `#${hash}` : ""));
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.nav.language}: ${COUNTRY[locale].name} (${LOCALE_META[locale].name})`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-ink-border px-2.5 transition-colors hover:border-ink-foreground/40"
      >
        <span className="block h-[14px] w-5 overflow-hidden rounded-[2px] ring-1 ring-white/15">
          <Current />
        </span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn(
            "size-2.5 text-ink-muted transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <path d="M2 4.5l4 3.5 4-3.5" />
        </svg>
      </button>

      <nav
        id={listId}
        aria-label={t.nav.language}
        hidden={!open}
        className={cn(
          "absolute z-10",
          up ? "bottom-full left-0 pb-2 sm:left-auto sm:right-0" : "right-0 top-full pt-2",
        )}
      >
        <ul className="w-48 overflow-hidden rounded-sm border border-ink-border bg-ink py-1.5 shadow-2xl shadow-black/40">
          {LOCALES.map((l) => {
            const href = localizedPath(l, path);
            const active = l === locale;
            const { name, Flag } = COUNTRY[l];
            return (
              <li key={l}>
                <a
                  href={href}
                  hrefLang={l}
                  lang={l}
                  aria-current={active ? "true" : undefined}
                  onClick={(e) => go(e, href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-[0.9rem] transition-colors hover:bg-ink-2 focus-visible:bg-ink-2",
                    active ? "text-primary" : "text-ink-foreground/80 hover:text-ink-foreground",
                  )}
                >
                  <span className="block h-[14px] w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/15">
                    <Flag />
                  </span>
                  <span className="flex-1">{name}</span>
                  <span className="label-mono text-[0.6rem] text-ink-muted">
                    {LOCALE_META[l].label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/** United States flag, simplified for a 20 × 14 px chip (stripes and canton). */
function UsFlag() {
  return (
    <svg viewBox="0 0 38 26" aria-hidden className="block h-full w-full" preserveAspectRatio="none">
      <rect width="38" height="26" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * 2} width="38" height="2" fill="#b22234" />
      ))}
      <rect width="16" height="14" fill="#3c3b6e" />
      {[2, 5.5, 9, 12.5].flatMap((x) =>
        [2.5, 7, 11.5].map((y) => (
          <circle key={`${x}-${y}`} cx={x + 0.5} cy={y} r="0.8" fill="#fff" />
        )),
      )}
    </svg>
  );
}

/** Mexico flag, simplified for a 20 × 14 px chip (tricolor and a small emblem). */
function MxFlag() {
  return (
    <svg viewBox="0 0 30 21" aria-hidden className="block h-full w-full" preserveAspectRatio="none">
      <rect width="10" height="21" fill="#006847" />
      <rect x="10" width="10" height="21" fill="#fff" />
      <rect x="20" width="10" height="21" fill="#ce1126" />
      <ellipse cx="15" cy="10.5" rx="2.6" ry="2.4" fill="#8c5a2b" />
      <path d="M12.6 12.4 Q15 14.6 17.4 12.4" stroke="#006847" strokeWidth="0.8" fill="none" />
    </svg>
  );
}
