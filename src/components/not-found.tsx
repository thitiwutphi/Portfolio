import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { notFoundMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'

export function NotFound() {
  usePageMeta(notFoundMeta)

  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">
          <ArrowLeft data-icon="inline-start" /> Back to home
        </Link>
      </Button>
    </Container>
  )
}
