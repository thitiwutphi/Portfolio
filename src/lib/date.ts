import { defaultLocale, localeInfo, type Locale } from '@/i18n/locales'

export interface YearMonth {
  year: number
  /** 1 – 12 */
  month: number
}

const formatters = new Map<Locale, Intl.DateTimeFormat>()

function monthFormatter(locale: Locale): Intl.DateTimeFormat {
  let formatter = formatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(localeInfo[locale].intl, {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
    formatters.set(locale, formatter)
  }
  return formatter
}

export function formatYearMonth(
  { year, month }: YearMonth,
  locale: Locale = defaultLocale,
): string {
  return monthFormatter(locale).format(new Date(Date.UTC(year, month - 1, 1)))
}

export function formatPeriod(
  start: YearMonth,
  end?: YearMonth,
  locale: Locale = defaultLocale,
): string {
  const present = locale === 'th' ? 'ปัจจุบัน' : 'Present'
  return `${formatYearMonth(start, locale)} – ${end ? formatYearMonth(end, locale) : present}`
}

/** Whole months between two dates, counting both the first and last month (as LinkedIn does). */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  return end.year * 12 + end.month - (start.year * 12 + start.month) + 1
}

export function formatDuration(totalMonths: number, locale: Locale = defaultLocale): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []
  if (locale === 'th') {
    if (years > 0) parts.push(`${years} ปี`)
    if (months > 0) parts.push(`${months} เดือน`)
  } else {
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  }
  return parts.join(' ')
}

export function currentYearMonth(now = new Date()): YearMonth {
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}
