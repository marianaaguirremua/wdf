import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { AboutHero } from "@/components/about/AboutHero";
import { Leadership } from "@/components/about/Leadership";
import { ContactCta } from "@/components/home/ContactCta";
import { NorthAmerica } from "@/components/home/NorthAmerica";

// Who WDF is: the brand statement and the four divisions, where WDF operates, and the
// leadership team with their direct contact details (src/lib/team.ts).
export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.about;
    return pageHead({ locale, path: "/about", ...meta });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <AboutHero />
      <NorthAmerica eyebrow={t.about.reachEyebrow} />
      <Leadership />
      <ContactCta eyebrow={t.about.ctaEyebrow} />
    </>
  );
}
