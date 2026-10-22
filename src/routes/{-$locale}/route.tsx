import { Outlet, createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE, isLocale } from "@/i18n";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

// Optional locale prefix: "/about" is English, "/es/about" Spanish. The default locale is
// never prefixed, so "/en/..." redirects to its canonical unprefixed URL.
export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params, location }) => {
    const { locale } = params;
    if (locale === undefined) return;
    if (locale === DEFAULT_LOCALE) {
      throw redirect({
        href: location.pathname.replace(/^\/en(?=\/|$)/, "") || "/",
        statusCode: 301,
      });
    }
    if (!isLocale(locale)) throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
