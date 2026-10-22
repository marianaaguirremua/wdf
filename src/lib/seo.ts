import { LOCALES, LOCALE_META, DEFAULT_LOCALE, localizedPath, type Locale } from "@/i18n/config";
import { SITE_URL } from "./site";

type HeadInput = {
  locale: Locale;
  /** Page path without locale prefix, e.g. "/" or "/about". */
  path: string;
  title: string;
  description: string;
  /** Placeholder pages stay out of search indexes until approved content exists. */
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

export function pageHead({ locale, path, title, description, noindex, jsonLd }: HeadInput) {
  const url = SITE_URL + localizedPath(locale, path);
  const alternates = LOCALES.map((l) => ({
    rel: "alternate",
    hrefLang: l,
    href: SITE_URL + localizedPath(l, path),
  }));

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, follow" : "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "WDF" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: LOCALE_META[locale].ogLocale },
      ...LOCALES.filter((l) => l !== locale).map((l) => ({
        property: "og:locale:alternate",
        content: LOCALE_META[l].ogLocale,
      })),
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      ...alternates,
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: SITE_URL + localizedPath(DEFAULT_LOCALE, path),
      },
    ],
    scripts: jsonLd ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] : [],
  };
}
