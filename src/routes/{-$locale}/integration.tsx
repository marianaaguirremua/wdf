import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

// Placeholder until approved content exists; kept out of search indexes (noindex).
export const Route = createFileRoute("/{-$locale}/integration")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.integration;
    return pageHead({ locale, path: "/integration", ...meta, noindex: true });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  const page = t.placeholder.pages.integration;
  return <PlaceholderPage eyebrow={page.eyebrow} title={page.title} />;
}
