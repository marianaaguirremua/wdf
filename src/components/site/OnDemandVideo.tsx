import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A video that costs nothing until the visitor asks for it: only a lazy poster and a play
 * button render at first. Clicking mounts the <video> with controls and starts it (sound is
 * allowed because the visitor started it). The frame keeps the video's own aspect ratio.
 */
export function OnDemandVideo({
  sources,
  poster,
  width,
  height,
  title,
  description,
  playLabel,
  className,
}: {
  /** In order of preference; the browser plays the first type it supports. */
  sources: readonly { src: string; type: string }[];
  poster: string;
  width: number;
  height: number;
  title: string;
  description: string;
  playLabel: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playing) return;
    const video = videoRef.current;
    video?.focus();
    void video?.play().catch(() => {
      // Playback refused (e.g. a strict autoplay policy): the controls are there to start it.
    });
  }, [playing]);

  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-sm border border-paper-foreground/15 bg-ink"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {playing ? (
          <video
            ref={videoRef}
            poster={poster}
            width={width}
            height={height}
            controls
            playsInline
            preload="auto"
            aria-label={title}
            className="absolute inset-0 h-full w-full object-contain"
          >
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={playLabel}
            className="group absolute inset-0 block h-full w-full cursor-pointer"
          >
            <img
              src={poster}
              alt=""
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/25"
            />
            <span
              aria-hidden
              className={cn(
                "absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-ink shadow-lg transition-transform duration-300 md:size-20",
                "group-hover:scale-105 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-white",
              )}
            >
              <svg viewBox="0 0 24 24" className="ml-1 size-7 md:size-8" fill="currentColor">
                <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-paper-muted">{description}</span>
      </figcaption>
    </figure>
  );
}
