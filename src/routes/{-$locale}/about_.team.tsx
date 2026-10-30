import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { TEAM_PAGE_PUBLIC } from "@/lib/site";
import { LeadershipDirectory } from "@/components/about/Leadership";
import { ContactCta } from "@/components/home/ContactCta";

// The leadership team with direct contact details (src/lib/team.ts), reached from About.
// `about_` keeps the URL under /about without nesting this page inside the About layout.
// While TEAM_PAGE_PUBLIC is false the page is hidden: its URL sends visitors to Contact.
export const Route = createFileRoute("/{-$locale}/about_/team")({
  beforeLoad: ({ params }) => {
    if (TEAM_PAGE_PUBLIC) return;
    throw redirect({
      to: "/{-$locale}/contact",
      params: { locale: params.locale },
      statusCode: 302,
    });
  },
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.leadership;
    return pageHead({ locale, path: "/about/team", ...meta });
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
