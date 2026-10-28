import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ContactCta } from "@/components/home/ContactCta";
import { Divisions } from "@/components/home/Divisions";

// Services overview: the four divisions, each linking to its page under /services.
export const Route = createFileRoute("/{-$locale}/services")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.services;
    return pageHead({ locale, path: "/services", ...meta });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <Divisions as="h1" eyebrow={t.servicesIndex.eyebrow} title={t.servicesIndex.title} />
      <ContactCta eyebrow={t.nav.contact} />
    </>
  );
}
