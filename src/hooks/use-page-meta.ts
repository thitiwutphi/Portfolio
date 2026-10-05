import { useEffect } from 'react'

import { absoluteUrl, type PageMeta } from '@/content/seo'

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

/**
 * Updates the document title and SEO tags on client-side navigation.
 * The same tags are rendered statically per page at build time (see scripts/static-pages.ts).
 */
export function usePageMeta({ title, description, path, noindex }: PageMeta) {
  useEffect(() => {
    const url = absoluteUrl(path)
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = url

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) upsertMeta('name', 'robots', 'noindex')
    else robots?.remove()
  }, [title, description, path, noindex])
}
