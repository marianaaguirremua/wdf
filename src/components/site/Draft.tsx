import { useI18n } from "@/i18n";
import { DRAFT_MARKERS } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Marks copy that is a proposal pending approval. Renders nothing once markers are off. */
export function DraftMark({ className }: { className?: string }) {
  const { t } = useI18n();
  if (!DRAFT_MARKERS) return null;
  return (
    <span
      title={t.draft.title}
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-sm border border-dashed border-current/40 px-2 py-1 text-[0.6rem] tracking-[0.16em] opacity-70",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-current" />
      {t.draft.label}
    </span>
  );
}
