import { Link } from "@tanstack/react-router";
import { localeParam, useI18n } from "@/i18n";
import { MANUFACTURING_URL, NAV_ITEMS } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

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
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link to={item.to} params={params} className="nav-link text-[0.95rem]">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.divisions} className="md:col-span-3">
          <h2 className="label-mono text-ink-muted">{t.footer.divisions}</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={MANUFACTURING_URL}
                target="_blank"
                rel="noopener"
                className="nav-link inline-flex items-center gap-1.5 text-[0.95rem]"
              >
                {t.footer.manufacturing}
                <span aria-hidden className="arrow-nudge arrow-nudge-diag text-primary">
                  ↗
                </span>
                <span className="sr-only">({t.footer.external})</span>
              </a>
            </li>
            <li>
              <Link to="/{-$locale}/energy" params={params} className="nav-link text-[0.95rem]">
                {t.nav.energy}
              </Link>
            </li>
            <li>
              <Link to="/{-$locale}/technology" params={params} className="nav-link text-[0.95rem]">
                {t.nav.technology}
              </Link>
            </li>
            <li>
              <Link to="/{-$locale}/3pl" params={params} className="nav-link text-[0.95rem]">
                {t.nav.threepl}
              </Link>
            </li>
          </ul>
        </nav>
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
