import { isNotFound, Link, useLocation, useMatch, useRouterState } from '@tanstack/react-router'

import { localeInfo, localeParam, locales, type Locale } from '@/i18n/locales'
import { pathInLocale, useLocale, useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

/**
 * EN / TH toggle. Stays on the same page — and the same scroll position, section, filter — in the
 * other language.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const current = useLocale()
  const t = useMessages()

  return (
    <div
      role="group"
      aria-label={t.language}
      className={cn('flex shrink-0 rounded-full border bg-chip p-0.5', className)}
    >
      {locales.map((locale) => {
        const { label, name, htmlLang } = localeInfo[locale]
        return (
          <LocaleLink
            key={locale}
            locale={locale}
            active={locale === current}
            lang={htmlLang}
            hrefLang={htmlLang}
            aria-label={name}
            title={name}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              locale === current
                ? 'bg-background text-brand shadow-xs'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </LocaleLink>
        )
      })}
    </div>
  )
}

interface LocaleLinkProps {
  locale: Locale
  active: boolean
  lang: string
  hrefLang: string
  'aria-label': string
  title: string
  className: string
  children: string
}

function LocaleLink({ locale, active, children, ...attributes }: LocaleLinkProps) {
  const location = useLocation()
  const homeMatch = useMatch({ from: '/{-$locale}/', shouldThrow: false })
  const projectMatch = useMatch({ from: '/{-$locale}/projects/$slug', shouldThrow: false })
  const listMatch = useMatch({ from: '/{-$locale}/projects/', shouldThrow: false })
  const galleryMatch = useMatch({ from: '/{-$locale}/gallery', shouldThrow: false })
  // On a 404 the router may still report a partial match (e.g. "nope" read as a language).
  const notFound = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.status === 'notFound' || isNotFound(match.error)),
  })

  const params = { locale: localeParam(locale) }
  // Keep the scroll position: the page looks the same in both languages.
  const shared = {
    ...attributes,
    activeOptions: { exact: true },
    activeProps: {},
    resetScroll: false,
  }

  if (notFound) {
    return (
      <FallbackLink locale={locale} active={active} attributes={attributes}>
        {children}
      </FallbackLink>
    )
  }
  if (projectMatch) {
    return (
      <Link
        to="/{-$locale}/projects/$slug"
        params={{ ...params, slug: projectMatch.params.slug }}
        {...shared}
      >
        {children}
      </Link>
    )
  }
  if (listMatch) {
    return (
      <Link to="/{-$locale}/projects" params={params} search={listMatch.search} {...shared}>
        {children}
      </Link>
    )
  }
  if (galleryMatch) {
    return (
      <Link to="/{-$locale}/gallery" params={params} {...shared}>
        {children}
      </Link>
    )
  }
  if (homeMatch) {
    return (
      <Link to="/{-$locale}" params={params} hash={location.hash || undefined} {...shared}>
        {children}
      </Link>
    )
  }
  return (
    <FallbackLink locale={locale} active={active} attributes={attributes}>
      {children}
    </FallbackLink>
  )
}

/** Pages without a route of their own (the 404 page): swap the language in the URL. */
function FallbackLink({
  locale,
  active,
  attributes,
  children,
}: {
  locale: Locale
  active: boolean
  attributes: Omit<LocaleLinkProps, 'locale' | 'active' | 'children'>
  children: string
}) {
  const location = useLocation()
  return (
    <a
      href={`${pathInLocale(location.pathname, locale)}${location.searchStr}${location.hash ? `#${location.hash}` : ''}`}
      aria-current={active ? 'page' : undefined}
      {...attributes}
    >
      {children}
    </a>
  )
}
