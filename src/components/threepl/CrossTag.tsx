import { cn } from "@/lib/utils";

/** "MX ⇄ US" tag: sand fill with navy text (10.5:1), for the hero and cross-border services. */
export function CrossTag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded-[4px] bg-sand px-2.5 py-1.5 text-[0.65rem] text-ink",
        className,
      )}
    >
      {label}
    </span>
  );
}
