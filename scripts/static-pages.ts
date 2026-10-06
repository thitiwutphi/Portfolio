import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { Plugin, ResolvedConfig } from 'vite'

import { profile } from '../src/content/profile.ts'
import { projects } from '../src/content/projects.ts'
import {
  absoluteUrl,
  galleryMeta,
  homeMeta,
  notFoundMeta,
  projectMeta,
  projectsMeta,
  site,
  type PageMeta,
} from '../src/content/seo.ts'
import {
  defaultLocale,
  localeInfo,
  localePrefix,
  locales,
  type Locale,
} from '../src/i18n/locales.ts'

/**
 * GitHub Pages only serves static files, so after the SPA is built this plugin writes, for every
 * language (English at the root, Thai under th/):
 *  - index.html and projects/<slug>.html — copies of the app shell with that page's <html lang>,
 *    <title>, description, Open Graph and hreflang tags, so deep links return 200 and link previews
 *    (LinkedIn, Slack…) work
 *  - 404.html — served by GitHub Pages for unknown URLs; the app then renders its 404 route
 *  - sitemap.xml — every page with its language alternates
 */

const SEO_START = '<!-- seo:start -->'
const SEO_END = '<!-- seo:end -->'
const NOSCRIPT_START = '<!-- noscript:start -->'
const NOSCRIPT_END = '<!-- noscript:end -->'
const NOSCRIPT_MARKER = '<!-- app:noscript -->'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

function personJsonLd(locale: Locale): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role[locale],
    url: absoluteUrl(localePrefix(locale)),
    email: `mailto:${profile.email}`,
    telephone: profile.phoneHref.replace('tel:', ''),
    sameAs: [profile.links.github, profile.links.linkedin],
    address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Panyapiwat Institute of Management' },
  }
  // Escape "<" so the JSON can never close the surrounding <script> tag.
  return JSON.stringify(data).replaceAll('<', '\\u003c')
}

export function renderSeoTags(meta: PageMeta, { jsonLd = false } = {}): string {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image ?? site.ogImage)
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${url}" />`,
    ...(meta.alternates
      ? [
          ...locales.map(
            (locale) =>
              `<link rel="alternate" hreflang="${localeInfo[locale].htmlLang}" href="${absoluteUrl(meta.alternates![locale])}" />`,
          ),
          `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(meta.alternates[defaultLocale])}" />`,
        ]
      : []),
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(profile.name)}" />`,
    `<meta property="og:locale" content="${localeInfo[meta.locale].ogLocale}" />`,
    ...locales
      .filter((locale) => locale !== meta.locale)
      .map(
        (locale) =>
          `<meta property="og:locale:alternate" content="${localeInfo[locale].ogLocale}" />`,
      ),
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    // The size is only known for the default image.
    ...(meta.image
      ? []
      : [
          '<meta property="og:image:width" content="1200" />',
          '<meta property="og:image:height" content="630" />',
        ]),
    `<meta property="og:image:alt" content="${escapeHtml(`${profile.name} — ${profile.role[meta.locale]}`)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ]
  if (jsonLd) tags.push(`<script type="application/ld+json">${personJsonLd(meta.locale)}</script>`)
  return tags.map((tag) => `    ${tag}`).join('\n')
}

function replaceBetween(html: string, start: string, end: string, content: string): string {
  const from = html.indexOf(start)
  const to = html.indexOf(end)
  if (from === -1 || to === -1)
    throw new Error(`index.html is missing the ${start} / ${end} markers`)
  return `${html.slice(0, from + start.length)}\n${content}\n    ${html.slice(to)}`
}

function renderNoscript(locale: Locale): string {
  const note =
    locale === 'th'
      ? 'เปิดใช้งาน JavaScript เพื่อดูประสบการณ์และผลงาน'
      : 'Turn on JavaScript to see experience and projects.'
  return `    <noscript>
      <main style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem">
        <h1>${escapeHtml(profile.name)}</h1>
        <p>${escapeHtml(profile.role[locale])} · ${escapeHtml(profile.location[locale])}</p>
        <p>${escapeHtml(profile.summary[locale])}</p>
        <p>
          <a href="mailto:${profile.email}">Email</a> ·
          <a href="${profile.links.linkedin}">LinkedIn</a> ·
          <a href="${profile.links.github}">GitHub</a>
        </p>
        <p>${note}</p>
      </main>
    </noscript>`
}

/** A full page for one language: <html lang>, SEO tags and the no-JavaScript fallback. */
export function renderPage(
  template: string,
  meta: PageMeta,
  options?: { jsonLd?: boolean },
): string {
  let html = replaceBetween(template, SEO_START, SEO_END, renderSeoTags(meta, options))
  html = replaceBetween(html, NOSCRIPT_START, NOSCRIPT_END, renderNoscript(meta.locale))
  return html.replace(/<html lang="[^"]*">/, `<html lang="${localeInfo[meta.locale].htmlLang}">`)
}

function renderSitemap(pages: PageMeta[]): string {
  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => {
      const alternates = page.alternates
        ? locales
            .map(
              (locale) =>
                `\n    <xhtml:link rel="alternate" hreflang="${localeInfo[locale].htmlLang}" href="${absoluteUrl(page.alternates![locale])}" />`,
            )
            .join('')
        : ''
      return `  <url>\n    <loc>${absoluteUrl(page.path)}</loc>${alternates}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

export function staticPages(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'portfolio:static-pages',
    configResolved(resolved) {
      config = resolved
    },
    transformIndexHtml(html) {
      const withMarkers = html.replace(NOSCRIPT_MARKER, `${NOSCRIPT_START}\n${NOSCRIPT_END}`)
      return renderPage(withMarkers, homeMeta(defaultLocale), { jsonLd: true })
    },
    async closeBundle() {
      if (config.command !== 'build') return

      const outDir = path.resolve(config.root, config.build.outDir)
      const template = await readFile(path.join(outDir, 'index.html'), 'utf8')
      const write = async (file: string, contents: string) => {
        const target = path.join(outDir, file)
        await mkdir(path.dirname(target), { recursive: true })
        await writeFile(target, contents)
      }

      const pages: Promise<void>[] = []
      const sitemap: PageMeta[] = []
      for (const locale of locales) {
        const home = homeMeta(locale)
        sitemap.push(home)
        // The English home page is index.html itself.
        if (locale !== defaultLocale) {
          pages.push(write(`${home.path}index.html`, renderPage(template, home, { jsonLd: true })))
        }
        const galleryPage = galleryMeta(locale)
        sitemap.push(galleryPage)
        pages.push(write(`${galleryPage.path}.html`, renderPage(template, galleryPage)))
        // GitHub Pages may serve /projects as projects.html or redirect to projects/index.html.
        const list = projectsMeta(locale)
        sitemap.push(list)
        const listPage = renderPage(template, list)
        pages.push(write(`${list.path}.html`, listPage), write(`${list.path}/index.html`, listPage))
        for (const project of projects) {
          const meta = projectMeta(project, locale)
          sitemap.push(meta)
          pages.push(write(`${meta.path}.html`, renderPage(template, meta)))
        }
      }
      pages.push(write('404.html', renderPage(template, notFoundMeta())))
      pages.push(write('sitemap.xml', renderSitemap(sitemap)))
      await Promise.all(pages)

      config.logger.info(
        `  static pages: ${locales.length} languages × (home, gallery, all projects + ${projects.length} projects), 404.html, sitemap.xml`,
      )
    },
  }
}
