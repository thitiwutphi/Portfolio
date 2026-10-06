import { createRouter, type RouterHistory } from '@tanstack/react-router'

import { ErrorFallback } from '@/components/error-fallback'
import { NotFound } from '@/components/not-found'

import { routeTree } from './routeTree.gen'

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    history,
    basepath: import.meta.env.BASE_URL,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorFallback,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
