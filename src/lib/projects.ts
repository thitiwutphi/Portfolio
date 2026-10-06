import type { CompanyId } from '@/content/companies'
import { projects, type Project, type ProjectMedia } from '@/content/projects'
import { asset } from '@/lib/asset'
import { currentYearMonth, type YearMonth } from '@/lib/date'

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Featured projects, or the latest four when none are marked as featured. */
export function homeProjects(): Project[] {
  const featured = projects.filter((project) => project.featured)
  return featured.length > 0 ? featured : projects.slice(0, 4)
}

export function projectsAt(company: CompanyId): Project[] {
  return projects.filter((project) => project.company === company)
}

/** First and last year mentioned in `period` ('2020', '2024 – 2026'). */
function projectYears(project: Project): [number, number] | undefined {
  const years = (project.period?.match(/\d{4}/g) ?? []).map(Number)
  return years.length > 0 ? [Math.min(...years), Math.max(...years)] : undefined
}

/**
 * Projects at a company that overlap a stint there — so a project from university doesn't show
 * up under a later job at the same institute. Projects without a period always match.
 */
export function projectsDuring(company: CompanyId, start: YearMonth, end?: YearMonth): Project[] {
  const lastYear = (end ?? currentYearMonth()).year
  return projectsAt(company).filter((project) => {
    const years = projectYears(project)
    return !years || (years[0] <= lastYear && years[1] >= start.year)
  })
}

export function youTubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`
}

/** URL of a still image that represents a media item, if it has one. */
export function mediaPreview(media: ProjectMedia): string | undefined {
  switch (media.type) {
    case 'image':
      return asset(media.thumb ?? media.src)
    case 'video':
      return media.poster ? asset(media.poster) : undefined
    case 'youtube':
      return youTubeThumbnail(media.id)
  }
}

/** Accessible name of a media item. */
export function mediaLabel(media: ProjectMedia) {
  return media.type === 'image' ? media.alt : media.title
}
