import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { Plugin, ResolvedConfig } from 'vite'

import { profile } from '../src/content/profile.ts'
import { projects } from '../src/content/projects.ts'
import {
  absoluteUrl,
  homeMeta,
  notFoundMeta,
  projectMeta,
  site,
  type PageMeta,
} from '../src/content/seo.ts'

/**
 * GitHub Pages only serves static files, so after the SPA is built this plugin writes:
 *  - projects/<slug>.html — a copy of index.html with that page's <title>, description and
 *    Open Graph tags, so deep links return 200 and link previews (LinkedIn, Slack…) work
 *  - 404.html — served by GitHub Pages for unknown URLs; the app then renders its 404 route
 *  - sitemap.xml
 */

const SEO_START = '<!-- seo:start -->'
const SEO_END = '<!-- seo:end -->'
const NOSCRIPT_MARKER = '<!-- app:noscript -->'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

function personJsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: site.url,
    email: `mailto:${profile.email}`,
    sameAs: [profile.links.github, profile.links.linkedin],
    address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Panyapiwat Institute of Management' },
  }
  // Escape "<" so the JSON can never close the surrounding <script> tag.
  return JSON.stringify(data).replaceAll('<', '\\u003c')
}

export function renderSeoTags(meta: PageMeta, { jsonLd = false } = {}): string {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(site.ogImage)
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(profile.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(`${profile.name} — ${profile.role}`)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ]
  if (jsonLd) tags.push(`<script type="application/ld+json">${personJsonLd()}</script>`)
  return tags.map((tag) => `    ${tag}`).join('\n')
}

export function injectSeo(html: string, meta: PageMeta, options?: { jsonLd?: boolean }): string {
  const start = html.indexOf(SEO_START)
  const end = html.indexOf(SEO_END)
  if (start === -1 || end === -1)
    throw new Error('index.html is missing the seo:start / seo:end markers')
  return `${html.slice(0, start + SEO_START.length)}\n${renderSeoTags(meta, options)}\n    ${html.slice(end)}`
}

function renderNoscript(): string {
  return `<noscript>
      <main style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem">
        <h1>${escapeHtml(profile.name)}</h1>
        <p>${escapeHtml(profile.role)} · ${escapeHtml(profile.location)}</p>
        <p>${escapeHtml(profile.tagline)}</p>
        <p>
          <a href="mailto:${profile.email}">Email</a> ·
          <a href="${profile.links.linkedin}">LinkedIn</a> ·
          <a href="${profile.links.github}">GitHub</a>
        </p>
        <p>Turn on JavaScript to see projects and experience.</p>
      </main>
    </noscript>`
}

function renderSitemap(pages: PageMeta[]): string {
  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => `  <url><loc>${absoluteUrl(page.path)}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
      return injectSeo(html, homeMeta, { jsonLd: true }).replace(NOSCRIPT_MARKER, renderNoscript())
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

      await Promise.all([
        ...projects.map((project) =>
          write(`projects/${project.slug}.html`, injectSeo(template, projectMeta(project))),
        ),
        write('404.html', injectSeo(template, notFoundMeta)),
        write('sitemap.xml', renderSitemap([homeMeta, ...projects.map(projectMeta)])),
      ])
      config.logger.info(`  static pages: ${projects.length} project pages, 404.html, sitemap.xml`)
    },
  }
}
