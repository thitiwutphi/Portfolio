import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'

import { defaultLocale, isLocale } from '@/i18n/locales'

/** Optional language prefix: English at /, Thai at /th/. */
export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params }) => {
    // English lives at the site root, so only other languages are valid prefixes.
    const { locale } = params
    if (locale !== undefined && (!isLocale(locale) || locale === defaultLocale)) throw notFound()
  },
  component: Outlet,
})
