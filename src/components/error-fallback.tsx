import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/section'
import { Button } from '@/components/ui/button'

export function ErrorFallback({ error }: ErrorComponentProps) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <Eyebrow>Something went wrong</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        This page failed to load
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Please try again. If the problem continues, head back to the home page.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => void router.invalidate()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </Container>
  )
}
