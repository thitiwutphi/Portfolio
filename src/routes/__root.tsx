import { createRootRoute, Outlet } from '@tanstack/react-router'
import { lazy, Suspense, useEffect } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { NotFound } from '@/components/not-found'
import { localeInfo } from '@/i18n/locales'
import { useLocale, useMessages } from '@/i18n/use-locale'

const RouterDevtools =
  import.meta.env.DEV && import.meta.env.MODE !== 'test'
    ? lazy(() =>
        import('@tanstack/react-router-devtools').then((module) => ({
          default: module.TanStackRouterDevtools,
        })),
      )
    : () => null

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  const locale = useLocale()
  const t = useMessages()

  useEffect(() => {
    document.documentElement.lang = localeInfo[locale].htmlLang
  }, [locale])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        {t.skipToContent}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <Suspense>
        <RouterDevtools />
      </Suspense>
    </div>
  )
}
