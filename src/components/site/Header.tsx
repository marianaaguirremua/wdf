import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { localeParam, useI18n } from "@/i18n";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const { locale, t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const params = { locale: localeParam(locale) };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname, locale]);

  // Lock page scroll behind the open mobile menu; close it if the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = overflow;
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) toggleRef.current?.focus();
  };

  // Escape closes the menu; Tab cycles within the header while the menu is open.
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
      return;
    }
    if (e.key !== "Tab" || !headerRef.current) return;
    const items = [...headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null && !el.closest("[inert]"),
    );
    const first = items[0];
    const last = items.at(-1);
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      ref={headerRef}
      onKeyDown={onKeyDown}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b text-ink-foreground transition-[background-color,border-color,backdrop-filter] duration-500",
        open
          ? "border-ink-border bg-ink"
          : scrolled
            ? "border-ink-border bg-ink/95 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="label-mono sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2.5 focus:text-primary-foreground"
      >
        {t.nav.skip}
      </a>

      <div className="container-wdf flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          to="/{-$locale}"
          params={params}
          aria-label={t.nav.home}
          className="-m-2 flex shrink-0 items-center p-2"
          onClick={() => setOpen(false)}
        >
          <Logo className="w-[5.5rem] sm:w-24" />
        </Link>

        <div className="flex items-center gap-6 xl:gap-8">
          <nav aria-label={t.nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    params={params}
                    className="nav-link text-[0.9rem] font-medium tracking-[-0.005em]"
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <span aria-hidden className="hidden h-5 w-px bg-ink-border lg:block" />
          <LanguageSwitcher />

          <button
            ref={toggleRef}
            type="button"
            className="group -mr-2 grid size-10 place-items-center rounded-sm lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-out-expo)]",
                  open ? "w-5 -translate-y-1.5 -rotate-45" : "w-3.5",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id={panelId} className="mobile-panel lg:hidden" data-open={open} inert={!open}>
        <div className="min-h-0 overflow-hidden">
          <nav
            aria-label={t.nav.menu}
            className="container-wdf flex h-[calc(100dvh-var(--header-h))] flex-col justify-between overflow-y-auto border-t border-ink-border pb-10 pt-6"
          >
            <ul>
              {NAV_ITEMS.map((item, i) => (
                <li
                  key={item.key}
                  className="mobile-item border-b border-ink-border"
                  style={{ "--i": i } as CSSProperties}
                >
                  <Link
                    to={item.to}
                    params={params}
                    onClick={() => close(false)}
                    className="group flex items-baseline gap-5 py-5 aria-[current=page]:text-primary"
                  >
                    <span className="label-mono text-ink-muted">0{i + 1}</span>
                    <span className="display text-[2rem] font-medium leading-none tracking-[-0.03em]">
                      {t.nav[item.key]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p
              className="mobile-item label-mono text-ink-muted"
              style={{ "--i": NAV_ITEMS.length } as CSSProperties}
            >
              wdfgroup.us
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
