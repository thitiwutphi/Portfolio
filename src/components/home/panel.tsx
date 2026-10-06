import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PanelProps {
  id: string
  title: string
  icon: LucideIcon
  /** Shown at the right of the title, e.g. a "View all" link. */
  action?: ReactNode
  className?: string
  children: ReactNode
}

/** A titled card on the home dashboard. */
export function Panel({ id, title, icon: Icon, action, className, children }: PanelProps) {
  const titleId = `${id}-title`
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('rounded-xl border bg-panel p-4 sm:p-5', className)}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id={titleId}
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-heading"
        >
          <Icon aria-hidden="true" className="size-[22px] text-brand" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
