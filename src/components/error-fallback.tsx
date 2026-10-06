import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { useLocaleParams, useMessages } from '@/i18n/use-locale'

export function ErrorFallback({ error }: ErrorComponentProps) {
  const router = useRouter()
  const t = useMessages()
  const localeParams = useLocaleParams()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <p className="text-xs font-semibold tracking-wider text-brand uppercase">{t.error.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {t.error.title}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t.error.description}</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => void router.invalidate()}>{t.error.retry}</Button>
        <Button variant="outline" asChild>
          <Link to="/{-$locale}" params={localeParams}>
            {t.error.backHome}
          </Link>
        </Button>
      </div>
    </Container>
  )
}
