import { defaultLocale, localePrefix, locales, type Locale } from '../i18n/locales.ts'
import { gallery } from './gallery.ts'
import { profile } from './profile.ts'
import { projects, type Project } from './projects.ts'

export const site = {
  /** Public URL of the deployed site, with trailing slash. */
  url: 'https://thitiwutphi.github.io/Portfolio/',
  repoUrl: 'https://github.com/thitiwutphi/Portfolio',
  ogImage: 'og-image.png',
} as const

export interface PageMeta {
  locale: Locale
  title: string
  description: string
  /** Path relative to the site root, without a leading slash ('' for the English home page). */
  path: string
  /** The same page in every language, for hreflang links. */
  alternates?: Record<Locale, string>
  /** Link-preview image (site-relative path or absolute URL); defaults to site.ogImage. */
  image?: string
  noindex?: boolean
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).href
}

const everyLocale = (pathFor: (locale: Locale) => string) =>
  Object.fromEntries(locales.map((locale) => [locale, pathFor(locale)])) as Record<Locale, string>

const homeDescription: Record<Locale, string> = {
  en: 'Robotics Software Engineer building ROS navigation, inspection robots, drone fleets and full-stack robotics platforms. Based in Bangkok, Thailand.',
  th: 'วิศวกรซอฟต์แวร์ด้านหุ่นยนต์ ผู้พัฒนาระบบนำทางบน ROS หุ่นยนต์ตรวจสอบ ฝูงโดรน และแพลตฟอร์มหุ่นยนต์แบบ full-stack ประจำกรุงเทพฯ',
}

export function homeMeta(locale: Locale): PageMeta {
  return {
    locale,
    title: `${profile.name} — ${profile.role[locale]}`,
    description: homeDescription[locale],
    path: localePrefix(locale),
    alternates: everyLocale(localePrefix),
  }
}

export function projectMeta(project: Project, locale: Locale): PageMeta {
  return {
    locale,
    title: `${project.title[locale]} — ${profile.name}`,
    description: project.summary[locale],
    path: `${localePrefix(locale)}projects/${project.slug}`,
    alternates: everyLocale((other) => `${localePrefix(other)}projects/${project.slug}`),
    image: projectImage(project),
  }
}

/** The project's first photo (or video still) for link previews. */
function projectImage(project: Project): string | undefined {
  for (const media of project.media ?? []) {
    if (media.type === 'image') return media.src
    if (media.type === 'video' && media.poster) return media.poster
    if (media.type === 'youtube')
      return `https://i.ytimg.com/vi/${encodeURIComponent(media.id)}/hqdefault.jpg`
  }
  return undefined
}

const projectsDescription: Record<Locale, string> = {
  en: 'Projects by Thitiwut Phimpisai, Robotics Software Engineer — robots, platforms and systems, and the companies they were built at.',
  th: 'ผลงานของ Thitiwut Phimpisai วิศวกรซอฟต์แวร์ด้านหุ่นยนต์ — หุ่นยนต์ แพลตฟอร์ม และระบบต่าง ๆ พร้อมบริษัทที่พัฒนาผลงาน',
}

export function projectsMeta(locale: Locale): PageMeta {
  return {
    locale,
    title: `${locale === 'th' ? 'ผลงานทั้งหมด' : 'All Projects'} — ${profile.name}`,
    description: projectsDescription[locale],
    path: `${localePrefix(locale)}projects`,
    alternates: everyLocale((other) => `${localePrefix(other)}projects`),
    // Keep the empty page out of search results until projects are added.
    noindex: projects.length === 0,
  }
}

const galleryDescription: Record<Locale, string> = {
  en: 'Photos by Thitiwut Phimpisai, Robotics Software Engineer — robots at work in labs, power plants and on site.',
  th: 'ภาพจากผลงานของ Thitiwut Phimpisai วิศวกรซอฟต์แวร์ด้านหุ่นยนต์ — หุ่นยนต์ขณะทำงานในห้องแล็บ โรงไฟฟ้า และหน้างาน',
}

export function galleryMeta(locale: Locale): PageMeta {
  return {
    locale,
    title: `${locale === 'th' ? 'แกลเลอรี' : 'Gallery'} — ${profile.name}`,
    description: galleryDescription[locale],
    path: `${localePrefix(locale)}gallery`,
    alternates: everyLocale((other) => `${localePrefix(other)}gallery`),
    image: gallery[0]?.full,
  }
}

export function notFoundMeta(locale: Locale = defaultLocale): PageMeta {
  return {
    locale,
    title:
      locale === 'th'
        ? `ไม่พบหน้าที่ต้องการ — ${profile.name}`
        : `Page not found — ${profile.name}`,
    description:
      locale === 'th'
        ? 'หน้าที่คุณกำลังหาไม่มีอยู่'
        : 'The page you are looking for does not exist.',
    path: localePrefix(locale),
    noindex: true,
  }
}
