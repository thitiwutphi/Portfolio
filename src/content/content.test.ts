import { describe, expect, it } from 'vitest'

import { monthsBetween } from '@/lib/date'

import { experience } from './experience'
import { getProject, projects } from './projects'

describe('content', () => {
  it('has unique, URL-safe project slugs', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('links experience entries only to existing projects', () => {
    for (const job of experience) {
      for (const slug of job.projectSlugs ?? []) expect(getProject(slug), slug).toBeDefined()
    }
  })

  it('has valid, chronological experience dates', () => {
    for (const job of experience) {
      expect(job.start.month).toBeGreaterThanOrEqual(1)
      expect(job.start.month).toBeLessThanOrEqual(12)
      if (job.end) expect(monthsBetween(job.start, job.end)).toBeGreaterThan(0)
    }
  })
})
