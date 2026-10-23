import { cn } from "@/lib/utils";

/** Control chip, the Technology division's mark. Decorative; inherits `currentColor`. */
export function Chip({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", className)}>
      <path
        d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Body with a see-through die window, so the mark works on any background. */}
      <path
        d="M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3 4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
