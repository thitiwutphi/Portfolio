import { screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderApp, unlockProjects } from './test/render-app'

vi.mock('@/content/projects', () => ({ projects: [] }))

describe('before any projects are added', () => {
  it('hides the Featured Projects panel and the Projects menu item', async () => {
    renderApp('/')
    await screen.findByRole('heading', { level: 1, name: 'Thitiwut Phimpisai' })

    expect(screen.queryByRole('heading', { name: 'Featured Projects' })).not.toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).queryByRole('link', { name: 'Projects' })).not.toBeInTheDocument()
  })

  it('shows an empty state on the projects page, kept out of search results', async () => {
    unlockProjects()
    renderApp('/projects')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'All Projects' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Projects are on the way — check back soon.')).toBeInTheDocument()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })
})
