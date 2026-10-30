import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRY_PHOTOS } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Pause between automatic steps. */
const AUTOPLAY_MS = 3500;

/**
 * Industries served, as a horizontal carousel: native scroll-snap (swipe, trackpad, keyboard
 * arrows once the track has focus), previous/next buttons at its sides, mouse drag on desktop
 * and a slider bar underneath. It advances one tile at a time on its own and loops; it holds
 * still while the visitor points at it, focuses it, drags it, or is scrolled away, never moves
 * under prefers-reduced-motion, and has a pause button. Each tile shows its photo from
 * INDUSTRY_PHOTOS when one is set, otherwise a line illustration.
 */
export function Industries() {
  const { t } = useI18n();
  const ind = t.industries;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState({ size: 1, offset: 0 });
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(true);
  // Bumped by any manual move so the autoplay timer starts over.
  const [nudge, setNudge] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.clientWidth / el.scrollWidth;
    setBar({ size, offset: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.35,
    });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  // Tile width plus gap: one "step" of the carousel.
  const tileStep = () => {
    const el = track.current;
    const tile = el?.querySelector("li");
    if (!el || !tile) return 0;
    return tile.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  // Moves by `tiles` and wraps around at either end, so the loop never stops at a wall.
  const go = useCallback((tiles: number) => {
    const el = track.current;
    const per = tileStep();
    if (!el || !per) return;
    const max = el.scrollWidth - el.clientWidth;
    let left = el.scrollLeft + tiles * per;
    if (tiles > 0 && el.scrollLeft >= max - 4) left = 0;
    else if (tiles < 0 && el.scrollLeft <= 4) left = max;
    el.scrollTo({ left: Math.max(0, Math.min(left, max)), behavior: "smooth" });
  }, []);

  // The arrows move by the visible tiles, so a full "page" scrolls past.
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const per = tileStep();
    if (!el || !per) return;
    go(dir * Math.max(1, Math.floor((el.clientWidth + 1) / per)));
    setNudge((n) => n + 1);
  };

  const running = !paused && !held && inView && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [running, go, nudge]);

  // Mouse drag (touch and pens already scroll natively). Snap is paused while dragging.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 5) return;
    if (!d.moved) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.dataset["dragging"] = "";
    }
    e.currentTarget.scrollLeft = d.left - dx;
  };
  const endDrag = (e: PointerEvent<HTMLUListElement>) => {
    if (!drag.current) return;
    drag.current = null;
    delete e.currentTarget.dataset["dragging"];
    setNudge((n) => n + 1);
  };

  // Slider bar: click the rail to jump there, or drag the thumb.
  const rail = useRef<HTMLDivElement>(null);
  const seek = (clientX: number, grab: number) => {
    const el = track.current;
    const r = rail.current?.getBoundingClientRect();
    if (!el || !r) return;
    const span = r.width * (1 - bar.size);
    const ratio = span > 0 ? (clientX - r.left - grab) / span : 0;
    el.scrollTo({ left: Math.max(0, Math.min(1, ratio)) * (el.scrollWidth - el.clientWidth) });
  };
  const railDrag = useRef<number | null>(null);
  const onRailDown = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const thumbLeft = r.left + bar.offset * r.width;
    const thumbW = bar.size * r.width;
    const onThumb = e.clientX >= thumbLeft && e.clientX <= thumbLeft + thumbW;
    railDrag.current = onThumb ? e.clientX - thumbLeft : thumbW / 2;
    e.currentTarget.setPointerCapture(e.pointerId);
    track.current?.setAttribute("data-dragging", "");
    seek(e.clientX, railDrag.current);
  };
  const onRailMove = (e: PointerEvent<HTMLDivElement>) => {
    if (railDrag.current !== null) seek(e.clientX, railDrag.current);
  };
  const onRailUp = () => {
    railDrag.current = null;
    track.current?.removeAttribute("data-dragging");
    setNudge((n) => n + 1);
  };

  return (
    <section aria-labelledby="industries-title" className="section-light relative">
      <div className="container-wdf py-20 md:py-24">
        <Reveal as="h2" className="heading max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)]">
          <span id="industries-title">{ind.title}</span>
        </Reveal>

        <Reveal delay={120} className="mt-10 md:mt-12">
          <div
            ref={root}
            className="relative"
            onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
            onTouchStart={() => setHeld(true)}
            onTouchEnd={() => {
              setHeld(false);
              setNudge((n) => n + 1);
            }}
            // Keyboard focus holds it; a tap or click on an arrow does not.
            onFocus={(e) => e.target.matches(":focus-visible") && setHeld(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
            }}
          >
            <ul
              id="industries-track"
              ref={track}
              tabIndex={0}
              role="region"
              aria-label={ind.region}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={cn(
                "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:-mx-10 md:gap-6 md:px-10 md:scroll-px-10",
                "scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                "cursor-grab data-[dragging]:cursor-grabbing data-[dragging]:snap-none data-[dragging]:scroll-auto data-[dragging]:select-none",
              )}
            >
              {ind.items.map((item) => {
                const photo = INDUSTRY_PHOTOS[item.key];
                return (
                  <li
                    key={item.key}
                    className="group w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
                  >
                    <figure>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-iron text-cyan-deep">
                        {photo ? (
                          <img
                            src={photo.src}
                            alt=""
                            width={photo.width}
                            height={photo.height}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <IndustryArt kind={item.key} />
                        )}
                      </div>
                      <figcaption className="mt-3 text-[0.9375rem] font-semibold md:text-base">
                        {item.name}
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>

            {/* Arrows at the sides, centred on the photos (the caption sits below them). */}
            <ArrowButton
              label={ind.previous}
              onClick={() => step(-1)}
              className="left-0 md:-left-6"
            >
              <path d="M15 5l-7 7 7 7" />
            </ArrowButton>
            <ArrowButton label={ind.next} onClick={() => step(1)} className="right-0 md:-right-6">
              <path d="M9 5l7 7-7 7" />
            </ArrowButton>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused || reduced ? ind.play : ind.pause}
              onClick={() => setPaused((p) => !p)}
              className={cn(
                "grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-paper-foreground/20 text-paper-foreground transition-colors hover:border-petroleum hover:bg-petroleum hover:text-white",
                reduced && "hidden",
              )}
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                {paused ? (
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                ) : (
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                )}
              </svg>
            </button>
            {/* The slider mirrors the track's own scroll position; keyboard users scroll the
                track itself (arrow keys) or use the buttons, so it stays out of the tab order. */}
            <div
              ref={rail}
              aria-hidden
              onPointerDown={onRailDown}
              onPointerMove={onRailMove}
              onPointerUp={onRailUp}
              onPointerCancel={onRailUp}
              className="relative h-6 flex-1 cursor-pointer touch-none"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-paper-foreground/10" />
              <span
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-petroleum transition-[left] duration-150"
                style={{ width: `${bar.size * 100}%`, left: `${bar.offset * 100}%` }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls="industries-track"
      onClick={onClick}
      className={cn(
        "absolute top-[calc((100%-2.5rem)/2)] z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-paper-foreground/10 bg-white text-paper-foreground shadow-[0_6px_20px_-6px_rgb(12_24_40/0.35)] transition-colors hover:bg-petroleum hover:text-white md:size-12",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

/** Decorative line drawings, one per industry key, on a 160×200 canvas. */
function IndustryArt({ kind }: { kind: string }) {
  const art: Record<string, ReactNode> = {
    automotive: (
      <>
        <path d="M18 122h124v-14l-14-6-18-20H58L40 102l-22 6z" />
        <path d="M44 102h82M64 82v20M96 82v20" />
        <circle cx="50" cy="124" r="12" />
        <circle cx="112" cy="124" r="12" />
        <circle cx="50" cy="124" r="4" />
        <circle cx="112" cy="124" r="4" />
      </>
    ),
    aerospace: (
      <>
        <path d="M80 36c6 0 8 10 8 22v20l46 26v12l-46-12v26l14 10v8l-22-6-22 6v-8l14-10v-26l-46 12v-12l46-26V58c0-12 2-22 8-22z" />
        <path d="M80 50v100" strokeDasharray="2 5" />
      </>
    ),
    electronics: (
      <>
        <rect x="50" y="70" width="60" height="60" rx="3" />
        <rect x="64" y="84" width="32" height="32" />
        <path d="M60 70V54M72 70V54M84 70V54M96 70V54M60 130v16M72 130v16M84 130v16M96 130v16M50 82H34M50 94H34M50 106H34M50 118H34M110 82h16M110 94h16M110 106h16M110 118h16" />
        <path d="M34 82H22V40M126 118h12v42M96 146v14h30" />
        <circle cx="22" cy="40" r="3" />
        <circle cx="138" cy="160" r="3" />
      </>
    ),
    medical: (
      <>
        <circle cx="80" cy="84" r="38" />
        <path d="M72 64h16v12h12v16H88v12H72V92H60V76h12z" />
        <path d="M14 152h40l8-14 10 26 10-34 8 22h56" />
      </>
    ),
    oilGas: (
      <>
        <path d="M30 156h100M46 156l22-74 22 74M56 122h24" />
        <path d="M34 78l92-22M120 50l12 20" />
        <circle cx="68" cy="72" r="5" />
        <path d="M34 78v34M30 112h8M116 156v-38h10v38" />
        <circle cx="121" cy="108" r="6" />
      </>
    ),
    metalmechanic: (
      <>
        <path d="M80 50l8 0 3 11 9 4 10-6 6 6-6 10 4 9 11 3v8l-11 3-4 9 6 10-6 6-10-6-9 4-3 11h-8l-3-11-9-4-10 6-6-6 6-10-4-9-11-3v-8l11-3 4-9-6-10 6-6 10 6 9-4z" />
        <circle cx="84" cy="88" r="14" />
        <path d="M34 156h40v-12H34zM74 150h52M80 144v12M90 144v12M100 144v12M110 144v12M120 144v12" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 160 200"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0 h-full w-full p-6 transition-transform duration-700 group-hover:scale-[1.04]"
    >
      {art[kind]}
    </svg>
  );
}
