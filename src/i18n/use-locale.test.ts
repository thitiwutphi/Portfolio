import { describe, expect, it } from 'vitest'

import { localeFromPathname, pathInLocale } from './use-locale'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

describe('pathInLocale', () => {
  it('swaps the language prefix and keeps the rest of the path', () => {
    expect(pathInLocale(`${base}/nope`, 'th')).toBe(`${base}/th/nope`)
    expect(pathInLocale(`${base}/th/nope`, 'en')).toBe(`${base}/nope`)
    expect(pathInLocale(`${base}/th/projects/x`, 'th')).toBe(`${base}/th/projects/x`)
  })

  it('handles the home page', () => {
    expect(pathInLocale(`${base}/`, 'th')).toBe(`${base}/th`)
    expect(pathInLocale(`${base}/th`, 'en')).toBe(`${base}/`)
  })

  it('agrees with localeFromPathname', () => {
    expect(localeFromPathname(pathInLocale(`${base}/gallery`, 'th'))).toBe('th')
    expect(localeFromPathname(pathInLocale(`${base}/th/gallery`, 'en'))).toBe('en')
  })
})
