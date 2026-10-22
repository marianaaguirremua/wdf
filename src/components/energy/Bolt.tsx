import { cn } from "@/lib/utils";

/** Lightning bolt, the Energy division's mark. Decorative; inherits `currentColor`. */
export function Bolt({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", className)}>
      <path d="M13.5 2 4.5 13.5h6l-1.5 8.5 9-11.5h-6L13.5 2Z" fill="currentColor" />
    </svg>
  );
}
