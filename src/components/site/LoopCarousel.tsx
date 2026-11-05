import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pause between automatic steps. */
const AUTOPLAY_MS = 3500;

/**
 * An endless horizontal carousel (Home's industries, the Yuma page's photos). The tiles are
 * rendered twice; when the view reaches the second copy it is moved back by exactly one set, so
 * after the last tile the first one simply follows. It slides one tile every few seconds on its own, holds still
 * while the visitor points at it, focuses it with the keyboard or touches it, and never moves
 * under prefers-reduced-motion. Swipe, trackpad, mouse drag, the side arrows and the slider bar
 * underneath move it by hand. `tileClassName` sets the tile widths. The side arrows sit at the
 * middle of the pictures: above a one-line caption when `captioned`, else at the middle.
 */
export function LoopCarousel({
  id,
  items,
  label,
  previous,
  next,
  tileClassName,
  thumbClassName = "bg-petroleum",
  captioned = true,
}: {
  /** Id of the scrolling track (the arrows point at it). */
  id: string;
  items: { key: string; node: ReactNode }[];
  label: string;
  previous: string;
  next: string;
  tileClassName: string;
  thumbClassName?: string;
  /** Tiles carry a caption under the picture (moves the arrows up to the picture's middle). */
  captioned?: boolean;
}) {
  const count = items.length;
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
    const tiles = track.current?.children;
    const first = tiles?.[0] as HTMLElement | undefined;
    const copy = tiles?.[count] as HTMLElement | undefined;
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

  return (
    <>
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
          id={id}
          ref={track}
          tabIndex={0}
          role="region"
          aria-label={label}
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
          {[false, true].flatMap((copy) =>
            items.map((item) => (
              <li
                key={(copy ? "copy-" : "") + item.key}
                // The copy makes the loop seamless; hidden from assistive technology.
                aria-hidden={copy || undefined}
                className={cn("group shrink-0 snap-start", tileClassName)}
              >
                {item.node}
              </li>
            )),
          )}
        </ul>

        {/* Arrows at the sides, centred on the photos (the caption sits below them). */}
        <ArrowButton
          label={previous}
          controls={id}
          captioned={captioned}
          onClick={() => step(-1)}
          className="left-0 md:-left-6"
        >
          <path d="M15 5l-7 7 7 7" />
        </ArrowButton>
        <ArrowButton
          label={next}
          controls={id}
          captioned={captioned}
          onClick={() => step(1)}
          className="right-0 md:-right-6"
        >
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
          className={cn("absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full", thumbClassName)}
          style={{ width: `${thumb * 100}%`, left: `${Math.min(progress, 1 - thumb) * 100}%` }}
        />
      </div>
    </>
  );
}

function ArrowButton({
  label,
  controls,
  captioned,
  onClick,
  className,
  children,
}: {
  label: string;
  controls: string;
  captioned: boolean;
  onClick: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      onClick={onClick}
      className={cn(
        captioned ? "top-[calc((100%-2.5rem)/2)]" : "top-1/2",
        "absolute z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-paper-foreground/10 bg-white text-paper-foreground shadow-[0_6px_20px_-6px_rgb(12_24_40/0.35)] transition-colors hover:bg-petroleum hover:text-white md:size-12",
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
