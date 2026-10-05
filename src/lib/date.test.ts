import { describe, expect, it } from 'vitest'

import { formatDuration, formatPeriod, formatYearMonth, monthsBetween } from './date'

describe('date helpers', () => {
  it('formats a year and month', () => {
    expect(formatYearMonth({ year: 2024, month: 4 })).toBe('Apr 2024')
  })

  it('formats a period, using "Present" when there is no end date', () => {
    expect(formatPeriod({ year: 2024, month: 4 }, { year: 2026, month: 9 })).toBe(
      'Apr 2024 – Sep 2026',
    )
    expect(formatPeriod({ year: 2024, month: 4 })).toBe('Apr 2024 – Present')
  })

  it('counts months inclusively, matching LinkedIn', () => {
    expect(monthsBetween({ year: 2024, month: 4 }, { year: 2026, month: 9 })).toBe(30)
    expect(monthsBetween({ year: 2021, month: 4 }, { year: 2024, month: 3 })).toBe(36)
    expect(monthsBetween({ year: 2020, month: 8 }, { year: 2021, month: 2 })).toBe(7)
    expect(monthsBetween({ year: 2018, month: 10 }, { year: 2019, month: 5 })).toBe(8)
  })

  it('formats durations', () => {
    expect(formatDuration(30)).toBe('2 yrs 6 mos')
    expect(formatDuration(36)).toBe('3 yrs')
    expect(formatDuration(13)).toBe('1 yr 1 mo')
    expect(formatDuration(7)).toBe('7 mos')
  })
})
