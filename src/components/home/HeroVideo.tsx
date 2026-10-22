import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import type { HeroVideo as HeroVideoConfig } from "@/lib/site";

// Full-bleed background video for the hero. It never autoplays from markup: playback starts
// after hydration only when motion is allowed and Data Saver is off, pauses while the hero
// is off screen, and can be paused by the visitor (WCAG 2.2.2). Otherwise the poster shows.
export function HeroVideo({ video }: { video: HeroVideoConfig }) {
  const { t } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (reduceMotion || saveData) return;
    setCanPlay(true);

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !userPaused.current) el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        aria-hidden
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      >
        {video.mobileMp4 && (
          <source src={video.mobileMp4} type="video/mp4" media="(max-width: 767px)" />
        )}
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>

      {/* Legibility scrims: strong on the text side, lighter toward the right and bottom. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(12_24_40/0.55)_0%,rgb(12_24_40/0.35)_40%,rgb(12_24_40/0.9)_100%)] lg:bg-[linear-gradient(90deg,rgb(12_24_40/0.92)_0%,rgb(12_24_40/0.7)_42%,rgb(12_24_40/0.25)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      {canPlay && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.hero.pauseVideo : t.hero.playVideo}
          className="absolute bottom-24 right-5 z-10 grid size-10 place-items-center rounded-full border border-ink-border bg-ink/60 text-ink-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary md:right-10"
        >
          {playing ? (
            <svg viewBox="0 0 12 12" aria-hidden className="size-3 fill-current">
              <rect x="2" y="1.5" width="2.5" height="9" />
              <rect x="7.5" y="1.5" width="2.5" height="9" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" aria-hidden className="size-3 fill-current">
              <path d="M3 1.5v9l7.5-4.5z" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
