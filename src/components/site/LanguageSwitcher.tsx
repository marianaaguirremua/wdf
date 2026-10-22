import { useLocation, useRouter } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { LOCALES, LOCALE_META, localizedPath, splitLocalePath, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** EN/ES segmented switch. Links to the same page in the other language (crawlable hrefs). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const { pathname, hash } = useLocation();
  const { path } = splitLocalePath(pathname);
  const activeIndex = LOCALES.indexOf(locale);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    router.history.push(href + (hash ? `#${hash}` : ""));
  };

  return (
    <nav aria-label={t.nav.language} className={className}>
      <ul
        className="relative grid h-8 rounded-full border border-ink-border p-0.5"
        style={{ gridTemplateColumns: `repeat(${LOCALES.length}, 2.5rem)` }}
      >
        <span
          aria-hidden
          className="absolute inset-y-0.5 left-0.5 w-10 rounded-full bg-ink-3 transition-transform duration-500 ease-[var(--ease-out-expo)]"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {LOCALES.map((l) => {
          const href = localizedPath(l, path);
          const active = l === locale;
          return (
            <li key={l} className="relative z-10 grid">
              <a
                href={href}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                aria-label={LOCALE_META[l].name}
                onClick={(e) => go(e, href)}
                className={cn(
                  "label-mono grid place-items-center rounded-full text-[0.65rem] transition-colors",
                  active ? "text-primary" : "text-ink-muted hover:text-ink-foreground",
                )}
              >
                {LOCALE_META[l].label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
