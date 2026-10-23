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

/**
 * Translated URL slugs. Routes are defined once with the English path ("/about"); a locale
 * listed here is served under its own slug instead ("/es/nosotros"). The router rewrites
 * between the two (see src/router.tsx), and src/server.ts redirects any other spelling.
 */
export const PAGE_SLUGS: Partial<Record<Locale, Record<string, string>>> = {
  es: {
    "/about": "/nosotros",
    "/about/leadership": "/nosotros/liderazgo",
    "/services": "/servicios",
    "/energy": "/energia",
    "/technology": "/tecnologia",
    "/3pl": "/trespl",
    "/contact": "/contacto",
  },
};

/** Lowercases and strips accents so "/es/Energía" and "/es/tresPL" still resolve. */
function normalizeSlug(path: string): string {
  return path
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Public URL path for a page in a locale, e.g. ("es", "/about") -> "/es/nosotros". */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : (PAGE_SLUGS[locale]?.[path] ?? path);
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

/**
 * Maps a public pathname to the router's internal one ("/es/nosotros" -> "/es/about").
 * Pathnames without a translated slug are returned unchanged.
 */
export function internalPath(pathname: string): string {
  const { locale, path } = splitLocalePath(pathname);
  const slugs = PAGE_SLUGS[locale];
  if (!slugs) return pathname;
  let wanted: string;
  try {
    wanted = normalizeSlug(decodeURIComponent(path));
  } catch {
    return pathname;
  }
  const page = Object.keys(slugs).find((key) => slugs[key] === wanted || key === wanted);
  return page ? `/${locale}${page}` : pathname;
}

/** Maps the router's internal pathname to its public URL ("/es/about" -> "/es/nosotros"). */
export function publicPath(pathname: string): string {
  const { locale, path } = splitLocalePath(pathname);
  return PAGE_SLUGS[locale]?.[path] ? localizedPath(locale, path) : pathname;
}

/** Strips a locale prefix from a pathname, returning the locale and the bare page path. */
export function splitLocalePath(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: "/" + rest.join("/") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}
