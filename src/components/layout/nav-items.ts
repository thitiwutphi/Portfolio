import { projects } from '@/content/projects'

/**
 * Navigation: most items jump to a section of the home page (`hash`); Gallery is its own page.
 * Labels come from the `nav` messages.
 */
export const navItems = [
  { key: 'home', hash: 'home' },
  { key: 'about', hash: 'about' },
  { key: 'experience', hash: 'experience' },
  { key: 'projects', hash: 'projects' },
  { key: 'skills', hash: 'skills' },
  { key: 'education', hash: 'education' },
  { key: 'gallery', page: 'gallery' },
  { key: 'contact', hash: 'contact' },
] as const

export type NavItem = (typeof navItems)[number]
export type NavKey = NavItem['key']
/** Home-page sections that can be scrolled to. */
export type NavSection = Extract<NavItem, { hash: string }>['hash']

export const homeSections = navItems.flatMap((item) => ('hash' in item ? [item.hash] : []))

/** The items to show — the Projects section only exists once there are projects. */
export function visibleNavItems() {
  return navItems.filter((item) => item.key !== 'projects' || projects.length > 0)
}
