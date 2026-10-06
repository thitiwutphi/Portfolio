import { cleanup, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { companies } from './content/companies'
import { projects } from './content/projects'
import { locales } from './i18n/locales'
import { basepath, renderApp, unlockProjects } from './test/render-app'

// Project behaviour with real-looking data is covered in projects.test.tsx.

describe('home page', () => {
  it('renders the profile and every dashboard panel', async () => {
    renderApp('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Thitiwut Phimpisai' }),
    ).toBeInTheDocument()
    for (const name of [
      'Summary',
      'Top Skills',
      'Certifications',
      'Honors-Awards',
      'Experience',
      'Education',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    // The gallery is its own page now.
    expect(screen.queryByRole('heading', { name: 'Gallery' })).not.toBeInTheDocument()
    expect(document.title).toBe('Thitiwut Phimpisai — Robotics Software Engineer')
  })

  it('links contact details', async () => {
    renderApp('/')
    const hero = (await screen.findByRole('heading', { level: 1 })).closest('section')!

    expect(within(hero).getByRole('link', { name: /0637300458/ })).toHaveAttribute(
      'href',
      'tel:+66637300458',
    )
    expect(within(hero).getByRole('link', { name: 'Get in Touch' })).toHaveAttribute(
      'href',
      'mailto:thitiwutphi@gmail.com',
    )
  })

  it('lists experience with long-form dates and durations', async () => {
    renderApp('/')
    const experience = (await screen.findByRole('heading', { name: 'Experience' })).closest(
      'section',
    )!

    expect(experience).toHaveTextContent('April 2024 – September 2026 (2 years 6 months)')
    expect(within(experience).getAllByRole('article')).toHaveLength(4)

    // RMA Group and Gosoft were internships
    const internships = within(experience)
      .getAllByText('Internship')
      .map((badge) => badge.closest('article')?.querySelector('h3')?.textContent)
    expect(internships).toEqual(['RMA Group Company Limited', 'Gosoft (Thailand)'])
  })

  it('expands a certification and opens its transcript in a dialog', async () => {
    renderApp('/')
    const user = userEvent.setup()

    await user.click(
      await screen.findByRole('button', { name: /Introduction to Programming using Java/ }),
    )
    expect(screen.getByText(/Exam 98-388 · Passed December 16, 2019/)).toBeVisible()

    await user.click(
      screen.getByRole('button', { name: /View larger: Certiport digital transcript/ }),
    )
    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('mta-java-certificate.webp'),
    )
  })

  it('shows the PIM All Star photo when the award is expanded', async () => {
    renderApp('/')
    const user = userEvent.setup()

    await user.click(await screen.findByRole('button', { name: /PIM All Star/ }))

    expect(
      screen.getByRole('img', { name: /receiving the PIM All Star award certificate/ }),
    ).toBeVisible()
  })

  it('shows the top skills and reveals the rest on demand', async () => {
    renderApp('/')
    const user = userEvent.setup()
    const panel = (await screen.findByRole('heading', { name: 'Top Skills' })).closest('section')!
    const chips = () => within(panel).getAllByRole('listitem').length - 1 // minus the toggle

    expect(chips()).toBe(14)
    const toggle = within(panel).getByRole('button', { name: '+13 more' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(chips()).toBe(27)
    expect(within(panel).getByText('Modbus')).toBeInTheDocument()
    expect(within(panel).getByRole('button', { name: 'Show less' })).toHaveFocus()
  })

  it('opens the gallery page from the menu', async () => {
    const router = renderApp('/')
    const user = userEvent.setup()
    const nav = await screen.findByRole('navigation', { name: 'Main' })

    await user.click(within(nav).getByRole('link', { name: 'Gallery' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Gallery' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe(`${basepath}/gallery`)
    expect(within(nav).getByRole('link', { name: 'Gallery' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(document.title).toBe('Gallery — Thitiwut Phimpisai')
  })

  it('opens gallery photos in a viewer with next / previous', async () => {
    renderApp('/gallery')
    const user = userEvent.setup()
    await screen.findByRole('heading', { level: 1, name: 'Gallery' })
    const photos = screen.getAllByRole('button', { name: /^Open photo:/ })
    expect(photos).toHaveLength(8)
    expect(screen.getByText('8 photos')).toBeInTheDocument()

    await user.click(photos[0]!)
    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByText('1 / 8')).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Next photo' }))
    expect(within(dialog).getByText('2 / 8')).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(within(dialog).getByText('8 / 8')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(photos[7]).toHaveFocus()
  })

  it('starts in light mode even when the device prefers dark', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({
          matches: query.includes('dark'),
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    )
    renderApp('/')

    expect(await screen.findByRole('switch', { name: 'Dark mode' })).toHaveAttribute(
      'aria-checked',
      'false',
    )
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('toggles dark mode and remembers the choice', async () => {
    renderApp('/')
    const user = userEvent.setup()

    await user.click(await screen.findByRole('switch', { name: 'Dark mode' }))

    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})

describe('unknown pages', () => {
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

describe('real projects', () => {
  // Runs against src/content/projects.ts, so every project added later is checked too.
  it.each(projects.map((project) => [project.slug, project] as const))(
    '%s renders in both languages with its company',
    async (slug, project) => {
      for (const locale of locales) {
        cleanup()
        unlockProjects()
        renderApp(`${locale === 'en' ? '' : `/${locale}`}/projects/${slug}`)
        expect(
          await screen.findByRole('heading', { level: 1, name: project.title[locale] }),
        ).toBeInTheDocument()
        expect(screen.getByText(companies[project.company].name[locale])).toBeInTheDocument()
      }
    },
  )
})

describe('Thai', () => {
  it('renders the home page in Thai at /th', async () => {
    renderApp('/th')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Thitiwut Phimpisai' }),
    ).toBeInTheDocument()
    for (const name of ['ทักษะเด่น', 'ใบรับรอง', 'ประสบการณ์ทำงาน', 'การศึกษา']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    expect(document.documentElement).toHaveAttribute('lang', 'th')
    expect(document.title).toBe('Thitiwut Phimpisai — วิศวกรซอฟต์แวร์ด้านหุ่นยนต์')

    const experience = screen.getByRole('heading', { name: 'ประสบการณ์ทำงาน' }).closest('section')!
    expect(experience).toHaveTextContent('เมษายน 2024 – กันยายน 2026 (2 ปี 6 เดือน)')
    expect(within(experience).getAllByText('ฝึกงาน')).toHaveLength(2)
  })

  it('switches language and stays on the same section', async () => {
    const router = renderApp('/#experience')
    const user = userEvent.setup()

    await user.click(await screen.findByRole('link', { name: 'ภาษาไทย' }))

    expect(
      await screen.findByRole('heading', { level: 2, name: 'ประสบการณ์ทำงาน' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe(`${basepath}/th`)
    expect(router.state.location.hash).toBe('experience')

    await user.click(screen.getByRole('link', { name: 'English' }))
    expect(await screen.findByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('lang', 'en')
  })

  it('has a Thai gallery page and keeps it when switching language', async () => {
    const router = renderApp('/th/gallery')
    const user = userEvent.setup()

    expect(await screen.findByRole('heading', { level: 1, name: 'แกลเลอรี' })).toBeInTheDocument()
    expect(screen.getByText('8 รูป')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'English' }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Gallery' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe(`${basepath}/gallery`)
  })

  it('stays on the 404 page when switching language there', async () => {
    renderApp('/nope')
    await screen.findByRole('heading', { level: 1, name: 'Page not found' })
    expect(screen.getByRole('link', { name: 'ภาษาไทย' })).toHaveAttribute(
      'href',
      `${basepath}/th/nope`,
    )
  })

  it('shows a Thai 404 for unknown Thai URLs', async () => {
    renderApp('/th/nope')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'ไม่พบหน้าที่ต้องการ' }),
    ).toBeInTheDocument()
  })

  it('rejects unknown language prefixes', async () => {
    renderApp('/fr')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })
})
