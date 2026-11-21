export type I18NLocale = (typeof I18N_LOCALES)[number];
export const I18N_COOKIE_NAME = "NEXT_LOCALE" as const;
export const I18N_DEFAULT_LOCALE = "en" as const;
export const I18N_LOCALES = ["en", "id"] as const;
/** The name of each Locale in its own language, for links to a Post Translation. */
export const I18N_LOCALE_NAMES = {
  en: "English",
  id: "Bahasa Indonesia",
} as const satisfies Record<I18NLocale, string>;
/** Every Locale but the default, in which every Post has a Post Translation. */
export const I18N_TRANSLATED_LOCALES = I18N_LOCALES.filter(
  (locale) => locale !== I18N_DEFAULT_LOCALE
);
/** Whether a value from outside (a cookie, a path) is a supported Locale. */
export const isI18NLocale = (value?: string): value is I18NLocale =>
  I18N_LOCALES.some((locale) => locale === value);
