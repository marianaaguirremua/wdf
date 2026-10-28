import { Link } from "@tanstack/react-router";
import { localeParam, useI18n } from "@/i18n";
import { NAV_ITEMS, PARTNERS } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

// Company links only; the division pages are listed under Services.
const COMPANY_ITEMS = NAV_ITEMS.filter((item) => item.key === "about" || item.key === "contact");

export function Footer() {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-border bg-ink text-ink-foreground">
      <div className="container-wdf grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link to="/{-$locale}" params={params} aria-label={t.nav.home} className="inline-block">
            <Logo className="w-28" />
          </Link>
          <p className="label-mono mt-6 text-ink-muted">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.company} className="md:col-span-3 md:col-start-7">
          <h2 className="label-mono text-ink-muted">{t.footer.company}</h2>
          <ul className="mt-5 space-y-3">
            {COMPANY_ITEMS.map((item) => (
              <li key={item.key}>
                <Link to={item.to} params={params} className="nav-link text-[0.95rem]">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.nav.services} className="md:col-span-3">
          <h2 className="label-mono text-ink-muted">
            <Link to="/{-$locale}/services" params={params} className="hover:text-ink-foreground">
              {t.nav.services}
            </Link>
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                to="/{-$locale}/services/manufacturing"
                params={params}
                className="nav-link text-[0.95rem]"
              >
                {t.footer.manufacturing}
              </Link>
            </li>
            <li>
              <Link
                to="/{-$locale}/services/energy"
                params={params}
                className="nav-link text-[0.95rem]"
              >
                {t.nav.energy}
              </Link>
            </li>
            <li>
              <Link
                to="/{-$locale}/services/technology"
                params={params}
                className="nav-link text-[0.95rem]"
              >
                {t.nav.technology}
              </Link>
            </li>
            <li>
              <Link
                to="/{-$locale}/services/3pl"
                params={params}
                className="nav-link text-[0.95rem]"
              >
                {t.nav.threepl}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-border">
        <div className="container-wdf flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-12">
          <h2 className="label-mono text-ink-muted">{t.footer.partners}</h2>
          <ul className="flex flex-wrap items-center gap-10">
            {PARTNERS.map((partner) => (
              <li key={partner.name}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener"
                  className="block opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    loading="lazy"
                    className={`${partner.size} w-auto`}
                  />
                  <span className="sr-only">({t.footer.external})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="container-wdf flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-ink-muted">
            © {year} WDF. {t.footer.rights}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
