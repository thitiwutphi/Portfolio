import { profile } from './profile.ts'
import type { Project } from './projects.ts'

export const site = {
  /** Public URL of the deployed site, with trailing slash. */
  url: 'https://thitiwutphi.github.io/Portfolio/',
  repoUrl: 'https://github.com/thitiwutphi/Portfolio',
  ogImage: 'og-image.png',
} as const

export interface PageMeta {
  title: string
  description: string
  /** Path relative to the site root, without a leading slash ('' for home). */
  path: string
  noindex?: boolean
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).href
}

export const homeMeta: PageMeta = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.role} building ROS 2 navigation, inspection robots, fleet platforms and edge AI. ${profile.location}.`,
  path: '',
}

export function projectMeta(project: Project): PageMeta {
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
    path: `projects/${project.slug}`,
  }
}

export const notFoundMeta: PageMeta = {
  title: `Page not found — ${profile.name}`,
  description: 'The page you are looking for does not exist.',
  path: '',
  noindex: true,
}
