import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { render } from '@testing-library/react'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { rememberProjectAccess } from '@/lib/project-access'
import { createAppRouter } from '@/router'

export const basepath = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Renders the whole app at `path` (without the base path) and returns its router. */
export function renderApp(path: string) {
  const history = createMemoryHistory({ initialEntries: [`${basepath}${path}`] })
  const router = createAppRouter(history)
  render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
  return router
}

/** Skips the access-code screen, as if the visitor had already entered the code. */
export function unlockProjects() {
  rememberProjectAccess()
}
