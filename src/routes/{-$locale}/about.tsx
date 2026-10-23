import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { AboutHero } from "@/components/about/AboutHero";
import { LeadershipTeaser } from "@/components/about/Leadership";
import { ContactCta } from "@/components/home/ContactCta";

// Who WDF is: the four pillars, an entry to the leadership team (its own page,
// /about/leadership) and the contact CTA. Hero copy is the approved WDF Group text.
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
      <LeadershipTeaser />
      <ContactCta eyebrow={t.about.ctaEyebrow} />
    </>
  );
}
