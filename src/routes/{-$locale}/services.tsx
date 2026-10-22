import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { Capabilities } from "@/components/services/Capabilities";
import { Industries } from "@/components/services/Industries";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Support } from "@/components/services/Support";

// Content quoted from the approved Manufacturing site (manufacturing.wdfgroup.us).
export const Route = createFileRoute("/{-$locale}/services")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.services;
    return pageHead({ locale, path: "/services", ...meta });
  },
  component: Page,
});

function Page() {
  return (
    <>
      <ServicesHero />
      <Capabilities />
      <Support />
      <Industries />
      <ServicesCta />
    </>
  );
}
