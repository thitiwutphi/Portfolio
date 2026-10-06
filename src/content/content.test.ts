/// <reference types="node" />
import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { locales } from '@/i18n/locales'
import { monthsBetween } from '@/lib/date'

import { companies, isCompanyId } from './companies'
import { awards, certifications, education } from './education'
import { experience } from './experience'
import { gallery } from './gallery'
import { profile } from './profile'
import { projects } from './projects'
import { moreSkills, skillLabel, topSkills } from './skills'

// Vitest runs from the project root.
const publicFile = (path: string) => join(process.cwd(), 'public', path)

describe('content', () => {
  it('has unique, URL-safe project slugs', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('has every translated text in every language', () => {
    const missing: string[] = []
    const walk = (value: unknown, path: string) => {
      if (Array.isArray(value)) value.forEach((item, i) => walk(item, `${path}[${i}]`))
      else if (value && typeof value === 'object') {
        const record = value as Record<string, unknown>
        if ('en' in record) {
          for (const locale of locales) {
            const text = record[locale]
            if (typeof text === 'string' ? !text.trim() : !Array.isArray(text) || !text.length)
              missing.push(`${path}.${locale}`)
          }
        } else for (const [key, child] of Object.entries(record)) walk(child, `${path}.${key}`)
      }
    }
    walk(
      {
        profile,
        experience,
        projects,
        education,
        certifications,
        awards,
        gallery,
        topSkills,
        moreSkills,
      },
      'content',
    )
    expect(missing).toEqual([])
  })

  it('gives every project a known company and valid media', () => {
    for (const project of projects) {
      expect(isCompanyId(project.company), project.slug).toBe(true)
      for (const media of project.media ?? []) {
        if (media.type === 'youtube') expect(media.id, project.slug).toMatch(/^[\w-]{11}$/)
        else expect(media.width * media.height, project.slug).toBeGreaterThan(0)
      }
    }
  })

  it('lists every skill once', () => {
    const skills = [...topSkills, ...moreSkills].map((skill) => skillLabel(skill, 'en'))
    expect(new Set(skills).size).toBe(skills.length)
  })

  it('has valid, chronological experience dates', () => {
    for (const job of experience) {
      expect(job.start.month).toBeGreaterThanOrEqual(1)
      expect(job.start.month).toBeLessThanOrEqual(12)
      if (job.end) expect(monthsBetween(job.start, job.end)).toBeGreaterThan(0)
    }
  })

  it('references images that exist in public/', () => {
    const images = [
      profile.photo,
      profile.banner.image,
      education.logo.src,
      ...projects.flatMap((project) =>
        (project.media ?? []).flatMap((media) =>
          media.type === 'image'
            ? [media.src, ...(media.thumb ? [media.thumb] : [])]
            : media.type === 'video'
              ? [
                  media.src,
                  ...(media.poster ? [media.poster] : []),
                  ...(media.captions ? [media.captions] : []),
                ]
              : [],
        ),
      ),
      ...Object.values(companies).map((company) => company.logo.src),
      ...certifications.flatMap((cert) => [cert.logo.src, cert.image.thumb, cert.image.full]),
      ...awards.flatMap((award) => [award.image.thumb, award.image.full]),
      ...gallery.flatMap((image) => [image.thumbSmall, image.thumb, image.full]),
    ]
    for (const image of images) expect(existsSync(publicFile(image)), image).toBe(true)
  })
})
