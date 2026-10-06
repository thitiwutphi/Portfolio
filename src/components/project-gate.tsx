import { Link } from '@tanstack/react-router'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { profile } from '@/content/profile'
import type { PageMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'
import { useLocaleParams, useMessages } from '@/i18n/use-locale'
import { hasProjectAccess, isAccessCodeValid, rememberProjectAccess } from '@/lib/project-access'

/** Shows `children` only after the visitor enters the access code (remembered in this browser). */
export function ProjectGate({ meta, children }: { meta: PageMeta; children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(hasProjectAccess)

  if (unlocked) return children
  return (
    <LockedNotice
      meta={meta}
      onUnlock={() => {
        rememberProjectAccess()
        setUnlocked(true)
      }}
    />
  )
}

function LockedNotice({ meta, onUnlock }: { meta: PageMeta; onUnlock: () => void }) {
  const t = useMessages()
  const localeParams = useLocaleParams()
  const inputId = useId()
  const errorId = useId()
  const input = useRef<HTMLInputElement>(null)
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(false)
  usePageMeta(meta)

  // The form is the only thing on the page, so put the cursor in it.
  useEffect(() => {
    input.current?.focus()
  }, [])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (isAccessCodeValid(code)) {
      onUnlock()
    } else {
      setWrong(true)
      input.current?.select()
    }
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(t.projectGate.emailSubject)}`

  return (
    <Container className="flex justify-center py-14 sm:py-24">
      <div className="w-full max-w-md rounded-xl border bg-panel p-6 text-center shadow-xs sm:p-8">
        <span
          aria-hidden="true"
          className="mx-auto grid size-12 place-items-center rounded-full bg-brand/10 text-brand"
        >
          <LockKeyhole className="size-6" />
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-balance text-heading">
          {t.projectGate.title}
        </h1>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          {t.projectGate.description}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-2 text-left" noValidate>
          <label htmlFor={inputId} className="text-sm font-medium text-heading">
            {t.projectGate.label}
          </label>
          <Input
            ref={input}
            id={inputId}
            type="password"
            autoComplete="current-password"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setWrong(false)
            }}
            aria-invalid={wrong || undefined}
            aria-describedby={wrong ? errorId : undefined}
            className="h-10 bg-card"
          />
          <p id={errorId} role="alert" className="min-h-5 text-sm text-destructive">
            {wrong ? t.projectGate.wrong : ''}
          </p>
          <Button type="submit" className="h-10 w-full">
            {t.projectGate.submit}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          {t.projectGate.request}{' '}
          <a
            href={mailto}
            className="rounded-sm font-medium text-brand underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {t.projectGate.emailMe}
          </a>
        </p>
        <Link
          to="/{-$locale}"
          params={localeParams}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> {t.projectGate.backHome}
        </Link>
      </div>
    </Container>
  )
}
