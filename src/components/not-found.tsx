import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { notFoundMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'

export function NotFound() {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  usePageMeta(notFoundMeta(locale))

  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <p className="text-xs font-semibold tracking-wider text-brand uppercase">
        {t.notFound.eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t.notFound.description}</p>
      <Button asChild className="mt-8">
        <Link to="/{-$locale}" params={localeParams}>
          <ArrowLeft data-icon="inline-start" /> {t.notFound.backHome}
        </Link>
      </Button>
    </Container>
  )
}
