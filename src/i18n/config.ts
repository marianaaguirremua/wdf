// Locale registry. Adding a language = add it here + a messages file in ./messages.
// The default locale is served without a prefix (/about); others are prefixed (/es/about).

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; name: string; ogLocale: string }> = {
  en: { label: "EN", name: "English", ogLocale: "en_US" },
  es: { label: "ES", name: "Español", ogLocale: "es_MX" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Value for the optional `{-$locale}` route param: omitted for the default locale. */
export function localeParam(locale: Locale): Locale | undefined {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}

/** Public URL path for a page in a locale, e.g. ("es", "/about") -> "/es/about". */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

/** Strips a locale prefix from a pathname, returning the locale and the bare page path. */
export function splitLocalePath(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: "/" + rest.join("/") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}
