import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AppProviders } from './app-providers'
import { createAppRouter, createQueryClient } from './router'

const basepath = import.meta.env.BASE_URL.replace(/\/$/, '')

function renderApp(path: string) {
  const queryClient = createQueryClient()
  const history = createMemoryHistory({ initialEntries: [`${basepath}${path}`] })
  const router = createAppRouter(queryClient, history)
  render(
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
    </AppProviders>,
  )
  return router
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      Response.json([
        {
          id: 1,
          name: 'Portfolio',
          html_url: 'https://github.com/thitiwutphi/Portfolio',
          description: 'Personal portfolio',
          homepage: 'https://thitiwutphi.github.io/Portfolio/',
          language: 'TypeScript',
          stargazers_count: 0,
          fork: false,
          archived: false,
          pushed_at: '2026-10-05T00:00:00Z',
          topics: ['react'],
        },
      ]),
    ),
  )
})

describe('app', () => {
  it('renders the home page with every section', async () => {
    renderApp('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Thitiwut Phimpisai' }),
    ).toBeInTheDocument()
    for (const name of [
      'From the lab to the field',
      "Where I've worked",
      'Selected work',
      'Tools of the trade',
      'On GitHub',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    expect(document.title).toBe('Thitiwut Phimpisai — Robotics Software Engineer')
  })

  it('loads GitHub repositories through TanStack Query', async () => {
    renderApp('/')

    const section = (await screen.findByRole('heading', { name: 'On GitHub' })).closest('section')
    expect(section).not.toBeNull()
    expect(await within(section!).findByRole('link', { name: 'Portfolio' })).toHaveAttribute(
      'href',
      'https://github.com/thitiwutphi/Portfolio',
    )
  })

  it('navigates from a project card to its detail page', async () => {
    const router = renderApp('/')
    const user = userEvent.setup()

    const projectsSection = (await screen.findByRole('heading', { name: 'Selected work' })).closest(
      'section',
    )
    await user.click(
      within(projectsSection!).getByRole('link', { name: 'Outdoor Delivery Robot for 7-Eleven' }),
    )

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Outdoor Delivery Robot for 7-Eleven' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe(`${basepath}/projects/outdoor-delivery-robot`)
    expect(screen.getByRole('heading', { name: 'In the press' })).toBeInTheDocument()
    expect(document.title).toBe('Outdoor Delivery Robot for 7-Eleven — Thitiwut Phimpisai')
  })

  it('shows the 404 page for an unknown project', async () => {
    renderApp('/projects/does-not-exist')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  it('shows the 404 page for an unknown route', async () => {
    renderApp('/nope')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })
})
