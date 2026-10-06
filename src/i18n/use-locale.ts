import { useRouterState } from '@tanstack/react-router'

import { defaultLocale, isLocale, localeParam, type Locale } from './locales'
import { messages, type Messages } from './messages'

const basepath = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Reads the language from the URL (/th/… is Thai). Works on unmatched URLs too, for the 404 page. */
export function localeFromPathname(pathname: string): Locale {
  const path =
    basepath && pathname.startsWith(basepath) ? pathname.slice(basepath.length) : pathname
  const first = path.split('/')[1]
  return isLocale(first) ? first : defaultLocale
}

/** The same URL in another language: /Portfolio/th/nope ↔ /Portfolio/nope. */
export function pathInLocale(pathname: string, locale: Locale): string {
  const path =
    basepath && pathname.startsWith(basepath) ? pathname.slice(basepath.length) : pathname
  const segments = path.split('/')
  if (isLocale(segments[1])) segments.splice(1, 1)
  const rest = segments.join('/') || '/'
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${basepath}${prefix}${prefix && rest === '/' ? '' : rest}`
}

export function useLocale(): Locale {
  return useRouterState({ select: (state) => localeFromPathname(state.location.pathname) })
}

export function useMessages(): Messages {
  return messages[useLocale()]
}

/** Params for links that stay in the current language, e.g. `<Link to="/{-$locale}" params={…}>`. */
export function useLocaleParams(): { locale: Locale | undefined } {
  return { locale: localeParam(useLocale()) }
}
