export interface YearMonth {
  year: number
  /** 1 – 12 */
  month: number
}

const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatYearMonth({ year, month }: YearMonth): string {
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)))
}

export function formatPeriod(start: YearMonth, end?: YearMonth): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`
}

/** Whole months between two dates, counting both the first and last month (as LinkedIn does). */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  return end.year * 12 + end.month - (start.year * 12 + start.month) + 1
}

export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ')
}

export function currentYearMonth(now = new Date()): YearMonth {
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}
