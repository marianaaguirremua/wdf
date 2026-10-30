import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRY_PHOTOS } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Pause between automatic steps. */
const AUTOPLAY_MS = 3500;

/**
 * Industries served, as an endless horizontal carousel. The tiles are rendered twice; when the
 * view reaches the second copy it is moved back by exactly one set, so after the last industry
 * the first one simply follows. It slides one tile every few seconds on its own, holds still
 * while the visitor points at it, focuses it with the keyboard or touches it, and never moves
 * under prefers-reduced-motion. Swipe, trackpad, mouse drag, the side arrows and the slider bar
 * underneath move it by hand. Each tile shows its photo from INDUSTRY_PHOTOS when one is set,
 * otherwise a line illustration.
 */
export function Industries() {
  const { t } = useI18n();
  const ind = t.industries;
  const count = ind.items.length;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(true);
  // Bumped by any manual move so the autoplay timer starts over.
  const [nudge, setNudge] = useState(0);

  // Width of one full set of tiles (first tile of the copy minus first tile of the original).
  const setWidth = useCallback(() => {
    const items = track.current?.children;
    const first = items?.[0] as HTMLElement | undefined;
    const copy = items?.[count] as HTMLElement | undefined;
    return first && copy ? copy.offsetLeft - first.offsetLeft : 0;
  }, [count]);

  // Instant jump that keeps the same picture on screen (snap and smooth scrolling off for it).
  const jump = useCallback((left: number) => {
    const el = track.current;
    if (!el) return;
    el.style.scrollBehavior = "auto";
    el.style.scrollSnapType = "none";
    el.scrollLeft = left;
    void el.offsetWidth;
    el.style.scrollBehavior = "";
    el.style.scrollSnapType = "";
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let settle = 0;
    const onScroll = () => {
      const w = setWidth();
      if (w) setProgress((el.scrollLeft % w) / w);
      // Once the movement settles inside the copy, step back into the original set.
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        const w2 = setWidth();
        if (w2 && el.scrollLeft >= w2 - 2 && !el.hasAttribute("data-dragging")) {
          jump(el.scrollLeft - w2);
        }
      }, 140);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
    };
  }, [setWidth, jump]);

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

  // Moves by `tiles`. Going back from the first set starts from the copy, so it loops too.
  const go = useCallback(
    (tiles: number) => {
      const el = track.current;
      const per = tileStep();
      const w = setWidth();
      if (!el || !per || !w) return;
      if (tiles < 0 && el.scrollLeft < -tiles * per - 2) jump(el.scrollLeft + w);
      el.scrollTo({ left: el.scrollLeft + tiles * per, behavior: "smooth" });
    },
    [setWidth, jump],
  );

  const step = (dir: 1 | -1) => {
    go(dir);
    setNudge((n) => n + 1);
  };

  const running = !held && inView && !reduced;
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

  // Slider bar: the thumb is one tile wide and travels across the set; click or drag to seek.
  const rail = useRef<HTMLDivElement>(null);
  const thumb = 1 / count;
  const seek = (clientX: number) => {
    const el = track.current;
    const r = rail.current?.getBoundingClientRect();
    const w = setWidth();
    if (!el || !r || !w) return;
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    el.scrollTo({ left: Math.min(ratio, 1 - thumb / 2) * w });
  };
  const railDown = useRef(false);
  const onRailDown = (e: PointerEvent<HTMLDivElement>) => {
    railDown.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    track.current?.setAttribute("data-dragging", "");
    seek(e.clientX);
  };
  const onRailMove = (e: PointerEvent<HTMLDivElement>) => {
    if (railDown.current) seek(e.clientX);
  };
  const onRailUp = () => {
    railDown.current = false;
    track.current?.removeAttribute("data-dragging");
    setNudge((n) => n + 1);
  };

  const tile = (item: (typeof ind.items)[number], copy: boolean) => {
    const photo = INDUSTRY_PHOTOS[item.key];
    return (
      <li
        key={(copy ? "copy-" : "") + item.key}
        aria-hidden={copy || undefined}
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
              {ind.items.map((item) => tile(item, false))}
              {/* The copy that makes the loop seamless; hidden from assistive technology. */}
              {ind.items.map((item) => tile(item, true))}
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

          {/* The slider mirrors the track's position; keyboard users scroll the track itself
              (arrow keys) or use the buttons, so it stays out of the tab order. */}
          <div
            ref={rail}
            aria-hidden
            onPointerDown={onRailDown}
            onPointerMove={onRailMove}
            onPointerUp={onRailUp}
            onPointerCancel={onRailUp}
            className="relative mt-8 h-6 cursor-pointer touch-none"
          >
            <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-paper-foreground/10" />
            <span
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-petroleum"
              style={{ width: `${thumb * 100}%`, left: `${Math.min(progress, 1 - thumb) * 100}%` }}
            />
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
