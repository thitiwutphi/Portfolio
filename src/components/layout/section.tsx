import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Container } from './container'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  className?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={cn('border-t py-16 md:py-24', className)}>
      <Container>
        <div className="mb-10 max-w-2xl md:mb-12">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id={titleId}
            className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>
          {description && <p className="mt-3 text-pretty text-muted-foreground">{description}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'font-mono text-xs font-medium tracking-widest text-brand uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}
