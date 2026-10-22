import { useI18n } from "@/i18n";
import { DraftMark } from "@/components/site/Draft";

// The 3PL copy is quoted from the approved Spanish page on wdfintegrators.com; the English
// version is a translation, so it carries the Draft marker until the team approves it.
export function TranslationDraft({ className }: { className?: string | undefined }) {
  const { locale } = useI18n();
  return locale === "es" ? null : <DraftMark {...(className ? { className } : {})} />;
}
