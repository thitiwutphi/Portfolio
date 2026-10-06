import { cleanup, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { Project } from './content/projects'
import { basepath, renderApp, unlockProjects } from './test/render-app'

// The real project list starts empty and grows over time, so these tests use their own projects.
vi.mock('@/content/projects', () => {
  const projects: Project[] = [
    {
      slug: 'laika-s',
      title: { en: 'LAIKA-S Inspection Robot', th: 'หุ่นยนต์ตรวจสอบ LAIKA-S' },
      summary: { en: 'Quadruped inspection robot.', th: 'หุ่นยนต์ตรวจสอบสี่ขา' },
      company: 'arv',
      period: '2024 – 2026',
      featured: true,
      media: [
        {
          type: 'image',
          src: 'images/gallery/quadruped-substation.webp',
          thumb: 'images/gallery/quadruped-substation-thumb.webp',
          width: 1600,
          height: 900,
          alt: { en: 'LAIKA-S at a substation', th: 'LAIKA-S ที่สถานีไฟฟ้าย่อย' },
          caption: { en: 'Inspection run', th: 'ออกตรวจสอบ' },
        },
        {
          type: 'youtube',
          id: 'dQw4w9WgXcQ',
          title: { en: 'LAIKA-S demo', th: 'สาธิต LAIKA-S' },
        },
        {
          type: 'video',
          src: 'videos/laika-s.mp4',
          poster: 'images/gallery/quadruped-power-plant-thumb.webp',
          width: 1280,
          height: 720,
          title: { en: 'Field test', th: 'ทดสอบภาคสนาม' },
        },
      ],
      highlights: [{ en: 'Built the web monitoring platform.', th: 'พัฒนาแพลตฟอร์มมอนิเตอร์' }],
      tech: ['ROS 2', 'React'],
      links: [{ label: { en: 'Press', th: 'ข่าว' }, url: 'https://example.com/press' }],
    },
    {
      slug: 'delivery-robot',
      title: { en: 'Outdoor Delivery Robot', th: 'หุ่นยนต์ส่งของกลางแจ้ง' },
      summary: { en: 'Delivery robot for 7-Eleven.', th: 'หุ่นยนต์ส่งของสำหรับ 7-Eleven' },
      company: 'pim',
      period: '2020',
      featured: true,
    },
    {
      slug: 'iot-gateway',
      title: { en: 'Smart IoT Gateway', th: 'Smart IoT Gateway' },
      summary: { en: 'Modbus gateway.', th: 'เกตเวย์ Modbus' },
      company: 'gosoft',
    },
  ]
  return { projects }
})

describe('access code', () => {
  it('asks for the code before showing the projects list', async () => {
    renderApp('/projects')
    const user = userEvent.setup()

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Projects are password-protected' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    const input = screen.getByLabelText('Access code')
    expect(input).toHaveFocus()

    await user.type(input, '0000{Enter}')
    expect(screen.getByRole('alert')).toHaveTextContent('That code is incorrect')
    expect(input).toHaveAttribute('aria-invalid', 'true')

    await user.clear(input)
    await user.type(input, '12345678')
    await user.click(screen.getByRole('button', { name: 'View projects' }))
    expect(
      await screen.findByRole('heading', { level: 1, name: 'All Projects' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('protects project pages and remembers the code', async () => {
    renderApp('/projects/laika-s')
    const user = userEvent.setup()

    await user.type(await screen.findByLabelText('Access code'), ' 12345678 {Enter}')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'LAIKA-S Inspection Robot' }),
    ).toBeInTheDocument()

    // A later visit in the same browser goes straight in.
    cleanup()
    renderApp('/projects/delivery-robot')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Outdoor Delivery Robot' }),
    ).toBeInTheDocument()
  })

  it('keeps project titles and covers visible on the home page', async () => {
    renderApp('/')
    const panel = (await screen.findByRole('heading', { name: 'Featured Projects' })).closest(
      'section',
    )!
    expect(
      within(panel).getByRole('link', { name: /LAIKA-S Inspection Robot/ }),
    ).toBeInTheDocument()
  })

  it('asks in Thai on Thai pages, keeping the page title', async () => {
    renderApp('/th/projects/laika-s')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'ผลงานนี้ต้องใช้รหัสในการเข้าดู' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('รหัสเข้าดู')).toBeInTheDocument()
    expect(document.title).toBe('หุ่นยนต์ตรวจสอบ LAIKA-S — Thitiwut Phimpisai')
  })

  it('shows the 404 page for unknown projects without asking for the code', async () => {
    renderApp('/projects/does-not-exist')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })
})

describe('with the access code entered', () => {
  beforeEach(unlockProjects)

  describe('projects on the home page', () => {
    it('shows featured projects with their company and links to the full list', async () => {
      const router = renderApp('/')
      const user = userEvent.setup()
      const panel = (await screen.findByRole('heading', { name: 'Featured Projects' })).closest(
        'section',
      )!

      const cards = within(panel).getAllByRole('listitem')
      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent('LAIKA-S Inspection Robot')
      expect(cards[0]).toHaveTextContent('AI and Robotics Ventures')
      expect(
        within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', {
          name: 'Projects',
        }),
      ).toBeInTheDocument()

      await user.click(within(panel).getByRole('link', { name: 'View all (3)' }))
      expect(
        await screen.findByRole('heading', { level: 1, name: 'All Projects' }),
      ).toBeInTheDocument()
      expect(router.state.location.pathname).toBe(`${basepath}/projects`)
      expect(screen.getAllByRole('article')).toHaveLength(3)
    })

    it('links each experience to the projects done at that company', async () => {
      renderApp('/')
      const experience = (await screen.findByRole('heading', { name: 'Experience' })).closest(
        'section',
      )!
      const arv = within(experience)
        .getByRole('heading', { name: 'AI and Robotics Ventures' })
        .closest('article')!

      expect(within(arv).getByRole('link', { name: 'LAIKA-S Inspection Robot' })).toHaveAttribute(
        'href',
        expect.stringMatching(/\/projects\/laika-s$/),
      )
    })
  })

  describe('project links by period', () => {
    it('links a project from university under Education, not under the later job', async () => {
      renderApp('/')
      const education = (await screen.findByRole('heading', { name: 'Education' })).closest(
        'section',
      )!
      const experience = screen.getByRole('heading', { name: 'Experience' }).closest('section')!
      const pimJob = within(experience)
        .getByRole('heading', { name: 'Panyapiwat Institute of Management' })
        .closest('article')!

      expect(
        within(education).getByRole('link', { name: 'Outdoor Delivery Robot' }),
      ).toBeInTheDocument()
      expect(
        within(pimJob).queryByRole('link', { name: 'Outdoor Delivery Robot' }),
      ).not.toBeInTheDocument()
    })
  })

  describe('all projects page', () => {
    it('filters by company through the URL', async () => {
      const router = renderApp('/projects')
      const user = userEvent.setup()
      const filters = await screen.findByRole('navigation', { name: 'Filter by company' })

      expect(
        within(filters)
          .getAllByRole('link')
          .map((link) => link.textContent),
      ).toEqual(['All3', 'ARV1', 'PIM1', 'Gosoft1'])

      await user.click(within(filters).getByRole('link', { name: /Gosoft/ }))

      expect(router.state.location.search).toEqual({ company: 'gosoft' })
      expect(screen.getAllByRole('article')).toHaveLength(1)
      expect(screen.getByRole('article')).toHaveTextContent('Smart IoT Gateway')
      expect(screen.getByRole('article')).toHaveTextContent('Gosoft (Thailand)')
      expect(within(filters).getByRole('link', { name: /Gosoft/ })).toHaveAttribute(
        'aria-current',
        'page',
      )
    })

    it('ignores unknown companies', async () => {
      renderApp('/projects?company=nope')
      await screen.findByRole('heading', { level: 1, name: 'All Projects' })
      expect(screen.getAllByRole('article')).toHaveLength(3)
    })

    it('keeps the filter when switching language', async () => {
      const router = renderApp('/projects?company=arv')
      const user = userEvent.setup()

      await user.click(await screen.findByRole('link', { name: 'ภาษาไทย' }))

      expect(
        await screen.findByRole('heading', { level: 1, name: 'ผลงานทั้งหมด' }),
      ).toBeInTheDocument()
      expect(router.state.location.pathname).toBe(`${basepath}/th/projects`)
      expect(router.state.location.search).toEqual({ company: 'arv' })
      expect(screen.getByRole('article')).toHaveTextContent('หุ่นยนต์ตรวจสอบ LAIKA-S')
    })
  })

  describe('project page', () => {
    it('shows the company, details and links', async () => {
      renderApp('/projects/laika-s')

      expect(
        await screen.findByRole('heading', { level: 1, name: 'LAIKA-S Inspection Robot' }),
      ).toBeInTheDocument()
      expect(screen.getByText('Company')).toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'AI and Robotics Ventures' })).toBeInTheDocument()
      expect(screen.getByText('· 2024 – 2026')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Press' })).toHaveAttribute(
        'href',
        'https://example.com/press',
      )
      expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
        'content',
        expect.stringContaining('images/gallery/quadruped-substation.webp'),
      )
    })

    it('shows photos, YouTube and video files in one gallery', async () => {
      renderApp('/projects/laika-s')
      const user = userEvent.setup()
      const gallery = await screen.findByRole('region', { name: 'Photos and videos' })

      // First item: the photo, with its caption.
      expect(within(gallery).getByRole('img', { name: 'LAIKA-S at a substation' })).toBeVisible()
      expect(within(gallery).getByText('Inspection run')).toBeVisible()

      // YouTube loads only after pressing play, from the privacy-enhanced domain.
      await user.click(within(gallery).getByRole('button', { name: /Show 2 of 3: LAIKA-S demo/ }))
      expect(within(gallery).queryByTitle('LAIKA-S demo')).not.toBeInTheDocument()
      await user.click(within(gallery).getByRole('button', { name: 'Play video: LAIKA-S demo' }))
      expect(within(gallery).getByTitle('LAIKA-S demo')).toHaveAttribute(
        'src',
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0',
      )

      // Arrow keys move between items.
      within(gallery)
        .getByRole('button', { name: /Show 2 of 3/ })
        .focus()
      await user.keyboard('{ArrowRight}')
      const video = gallery.querySelector('video')
      expect(video).toHaveAttribute('src', expect.stringContaining('videos/laika-s.mp4'))
      expect(video).toHaveAttribute('controls')
      expect(within(gallery).getByRole('button', { name: /Show 3 of 3/ })).toHaveAttribute(
        'aria-current',
        'true',
      )
    })

    it('works without photos or videos', async () => {
      renderApp('/projects/delivery-robot')
      expect(
        await screen.findByRole('heading', { level: 1, name: 'Outdoor Delivery Robot' }),
      ).toBeInTheDocument()
      expect(screen.queryByRole('region', { name: 'Photos and videos' })).not.toBeInTheDocument()
      expect(screen.getByText('Panyapiwat Institute of Management')).toBeInTheDocument()
    })

    it('is translated, including the company name', async () => {
      renderApp('/th/projects/delivery-robot')
      expect(
        await screen.findByRole('heading', { level: 1, name: 'หุ่นยนต์ส่งของกลางแจ้ง' }),
      ).toBeInTheDocument()
      expect(screen.getByText('บริษัท')).toBeInTheDocument()
      expect(screen.getByText('สถาบันการจัดการปัญญาภิวัฒน์')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ผลงานทั้งหมด' })).toHaveAttribute(
        'href',
        expect.stringMatching(/\/th\/projects$/),
      )
    })
  })
})
