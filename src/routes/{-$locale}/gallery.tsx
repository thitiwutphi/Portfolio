import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Images } from 'lucide-react'

import { GalleryGrid } from '@/components/gallery-grid'
import { Container } from '@/components/layout/container'
import { gallery } from '@/content/gallery'
import { galleryMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'

export const Route = createFileRoute('/{-$locale}/gallery')({
  component: GalleryPage,
})

function GalleryPage() {
  const t = useMessages()
  const localeParams = useLocaleParams()
  usePageMeta(galleryMeta(useLocale()))

  return (
    <Container className="py-8 sm:py-12">
      <Link
        to="/{-$locale}"
        params={localeParams}
        className="-ml-1 inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> {t.galleryPage.backHome}
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="max-w-3xl">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            <Images aria-hidden="true" className="size-8 text-brand" />
            {t.gallery}
          </h1>
          <p className="mt-3 leading-relaxed text-pretty text-foreground/80">
            {t.galleryPage.description}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{t.galleryPage.count(gallery.length)}</p>
      </header>

      <GalleryGrid className="mt-8" />
    </Container>
  )
}
