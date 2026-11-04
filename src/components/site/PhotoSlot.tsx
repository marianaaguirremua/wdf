import type { Photo } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A photo, or an empty frame (light gray with a small picture icon) until one is added to
 * PAGE_PHOTOS / SERVICE_PHOTOS. `className` sets the frame's size or aspect ratio; the photo
 * always covers it. Decorative: the nearby heading names what it shows.
 */
export function PhotoSlot({
  photo,
  className,
  imgClassName,
  eager = false,
}: {
  photo: Photo | undefined;
  className?: string;
  /** Extra classes for the image, e.g. a hover zoom inside a card group. */
  imgClassName?: string;
  /** Load immediately (above the fold, e.g. a hero). */
  eager?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-iron", className)}>
      {photo ? (
        <img
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          {...(eager ? { fetchPriority: "high" as const } : {})}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-paper-foreground/20"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="M21 16l-5-5-7 7" />
        </svg>
      )}
    </div>
  );
}
