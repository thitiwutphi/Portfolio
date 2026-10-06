export const locales = ['en', 'th'] as const
export type Locale = (typeof locales)[number]

/** English is served at the site root; other languages get a path prefix (/th/…). */
export const defaultLocale: Locale = 'en'

/** A value in every supported language. */
export type Localized<T = string> = Record<Locale, T>

export const localeInfo: Record<
  Locale,
  { label: string; name: string; htmlLang: string; intl: string; ogLocale: string }
> = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', intl: 'en', ogLocale: 'en_US' },
  // Thai month names with Gregorian years, as LinkedIn shows them.
  th: {
    label: 'TH',
    name: 'ภาษาไทย',
    htmlLang: 'th',
    intl: 'th-TH-u-ca-gregory',
    ogLocale: 'th_TH',
  },
}

export function isLocale(value: unknown): value is Locale {
  return locales.some((locale) => locale === value)
}

/** Value for the optional `{-$locale}` route param (omitted for English). */
export function localeParam(locale: Locale): Locale | undefined {
  return locale === defaultLocale ? undefined : locale
}

/** Site-relative path prefix: '' for English, 'th/' for Thai. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `${locale}/`
}
