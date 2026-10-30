import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ContactCta } from "@/components/home/ContactCta";
import { ServicesCatalog } from "@/components/services/ServicesCatalog";

// Services overview: each pillar with the services it offers, linking to its page.
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
      <ServicesCatalog />
      <ContactCta eyebrow={t.nav.contact} />
    </>
  );
}
