import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { LOGO_ON_LIGHT, SITE_URL } from "@/lib/site";
import { ContactCta } from "@/components/home/ContactCta";
import { Divisions } from "@/components/home/Divisions";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { NorthAmerica } from "@/components/home/NorthAmerica";

export const Route = createFileRoute("/{-$locale}/")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const t = getMessages(locale);
    return pageHead({
      locale,
      path: "/",
      title: t.meta.home.title,
      description: t.meta.home.description,
      // Verified facts only: name, URL, logo.
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "WDF",
        url: SITE_URL,
        logo: SITE_URL + LOGO_ON_LIGHT,
      },
    });
  },
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      <Hero />
      <Divisions title={t.intro.title} body={t.intro.body} />
      <NorthAmerica />
      <Industries />
      <ContactCta />
    </>
  );
}
