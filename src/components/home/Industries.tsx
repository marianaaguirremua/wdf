import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRY_PHOTOS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Industries served, as a horizontal carousel: native scroll-snap (swipe, trackpad, keyboard
 * arrows once the track has focus), previous/next buttons, and mouse drag on desktop. Each tile
 * shows its photo from INDUSTRY_PHOTOS when one is set, otherwise a line illustration.
 */
export function Industries() {
  const { t } = useI18n();
  const ind = t.industries;
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
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

  // One click moves by the visible tiles, so a full "page" scrolls past.
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const tile = el?.querySelector("li");
    if (!el || !tile) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const per = tile.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.floor((el.clientWidth + gap) / per));
    el.scrollBy({ left: dir * visible * per, behavior: "smooth" });
  };

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
  };

  return (
    <section aria-labelledby="industries-title" className="section-light relative">
      <div className="container-wdf py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal as="h2" className="heading text-[clamp(1.75rem,3vw,2.5rem)]">
              <span id="industries-title">{ind.title}</span>
            </Reveal>
          </div>
          <div className="flex gap-3">
            <ArrowButton label={ind.previous} disabled={edges.start} onClick={() => step(-1)}>
              <path d="M15 5l-7 7 7 7" />
            </ArrowButton>
            <ArrowButton label={ind.next} disabled={edges.end} onClick={() => step(1)}>
              <path d="M9 5l7 7-7 7" />
            </ArrowButton>
          </div>
        </div>

        <Reveal delay={120} className="mt-10 md:mt-12">
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
                        <>
                          <IndustryArt kind={item.key} />
                        </>
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
        </Reveal>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls="industries-track"
      disabled={disabled}
      onClick={onClick}
      className="grid size-12 cursor-pointer place-items-center rounded-full border border-paper-foreground/20 text-paper-foreground transition-colors hover:border-petroleum hover:bg-petroleum hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-paper-foreground/20 disabled:hover:bg-transparent disabled:hover:text-paper-foreground"
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
