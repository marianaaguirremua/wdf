import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { PlaceholderPage, ExternalNote } from "@/components/site/PlaceholderPage";
import { MANUFACTURING_URL } from "@/lib/site";

// Placeholder until approved content exists; kept out of search indexes (noindex).
export const Route = createFileRoute("/{-$locale}/services")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.services;
    return pageHead({ locale, path: "/services", ...meta, noindex: true });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  const page = t.placeholder.pages.services;
  return (
    <PlaceholderPage
      eyebrow={page.eyebrow}
      title={page.title}
      extra={<ExternalNote note={page.note} label={page.link} href={MANUFACTURING_URL} />}
    />
  );
}
