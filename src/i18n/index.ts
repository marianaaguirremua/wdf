import { useParams } from "@tanstack/react-router";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import en, { type Messages } from "./messages/en";
import es from "./messages/es";

export * from "./config";
export type { Messages };

const MESSAGES: Record<Locale, Messages> = { en, es };

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}

/** Resolves the `{-$locale}` route param; unknown values fall back to the default locale. */
export function resolveLocale(param: unknown): Locale {
  return isLocale(param) ? param : DEFAULT_LOCALE;
}

export function useI18n(): { locale: Locale; t: Messages } {
  const params = useParams({ strict: false }) as { locale?: string };
  const locale = resolveLocale(params.locale);
  return { locale, t: MESSAGES[locale] };
}
