import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { localeParam, splitLocalePath, useI18n } from "@/i18n";
import { SERVICE_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Desktop "Services" entry: a disclosure button that opens the overview and the four division
 * pages. Opens on hover with a mouse, and on click, Enter or Space; Escape, a click outside,
 * moving focus away or a route change closes it.
 */
export function ServicesMenu() {
  const { locale, t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Set when hovering opened the menu, so the click that usually follows keeps it open.
  const hoverOpened = useRef(false);
  const panelId = useId();
  const params = { locale: localeParam(locale) };
  const page = splitLocalePath(pathname).path;
  const active = page === "/services" || page.startsWith("/services/");

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

  const links = [
    { key: "servicesOverview", to: "/{-$locale}/services" } as const,
    ...SERVICE_ITEMS,
  ];

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || open) return;
        hoverOpened.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        hoverOpened.current = false;
        setOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={active || undefined}
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false;
            return;
          }
          setOpen((o) => !o);
        }}
        className="nav-link flex cursor-pointer items-center gap-1.5 text-[0.9rem] font-medium tracking-[-0.005em]"
      >
        {t.nav.services}
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn("size-2.5 transition-transform duration-300", open && "rotate-180")}
        >
          <path d="M2 4.5l4 3.5 4-3.5" />
        </svg>
      </button>

      {/* pt-3 bridges the gap so the pointer can travel from the button into the panel. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
      >
        <ul className="overflow-hidden rounded-sm border border-ink-border bg-ink py-2 shadow-2xl shadow-black/40">
          {links.map((item, i) => (
            <li key={item.key} className={cn(i === 0 && "mb-1 border-b border-ink-border pb-1")}>
              <Link
                to={item.to}
                params={params}
                activeOptions={{ exact: true }}
                className="block px-5 py-2.5 text-[0.9rem] text-ink-foreground/75 transition-colors hover:bg-ink-2 hover:text-ink-foreground focus-visible:bg-ink-2 focus-visible:text-ink-foreground aria-[current=page]:text-primary"
              >
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
