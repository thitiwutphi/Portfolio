import { describe, expect, it } from 'vitest'

import { formatDuration, formatPeriod, formatYearMonth, monthsBetween } from './date'

describe('date helpers', () => {
  it('formats a year and month', () => {
    expect(formatYearMonth({ year: 2024, month: 4 })).toBe('April 2024')
  })

  it('formats a period, using "Present" when there is no end date', () => {
    expect(formatPeriod({ year: 2024, month: 4 }, { year: 2026, month: 9 })).toBe(
      'April 2024 – September 2026',
    )
    expect(formatPeriod({ year: 2024, month: 4 })).toBe('April 2024 – Present')
  })

  it('counts months inclusively, matching LinkedIn', () => {
    expect(monthsBetween({ year: 2024, month: 4 }, { year: 2026, month: 9 })).toBe(30)
    expect(monthsBetween({ year: 2021, month: 4 }, { year: 2024, month: 3 })).toBe(36)
    expect(monthsBetween({ year: 2020, month: 8 }, { year: 2021, month: 2 })).toBe(7)
    expect(monthsBetween({ year: 2018, month: 10 }, { year: 2019, month: 5 })).toBe(8)
  })

  it('formats durations', () => {
    expect(formatDuration(30)).toBe('2 years 6 months')
    expect(formatDuration(36)).toBe('3 years')
    expect(formatDuration(13)).toBe('1 year 1 month')
    expect(formatDuration(7)).toBe('7 months')
  })

  it('formats Thai month names with Gregorian years, as LinkedIn does', () => {
    expect(formatPeriod({ year: 2024, month: 4 }, { year: 2026, month: 9 }, 'th')).toBe(
      'เมษายน 2024 – กันยายน 2026',
    )
    expect(formatPeriod({ year: 2024, month: 4 }, undefined, 'th')).toBe('เมษายน 2024 – ปัจจุบัน')
    expect(formatDuration(30, 'th')).toBe('2 ปี 6 เดือน')
    expect(formatDuration(7, 'th')).toBe('7 เดือน')
  })
})
