import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { LeadershipDirectory } from "@/components/about/Leadership";
import { ContactCta } from "@/components/home/ContactCta";

// The leadership team with direct contact details (src/lib/team.ts), reached from About.
// `about_` keeps the URL under /about without nesting this page inside the About layout.
export const Route = createFileRoute("/{-$locale}/about_/leadership")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.leadership;
    return pageHead({ locale, path: "/about/leadership", ...meta });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <LeadershipDirectory />
      <ContactCta eyebrow={t.nav.contact} />
    </>
  );
}
