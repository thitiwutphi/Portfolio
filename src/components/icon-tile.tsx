import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-lg border bg-brand/10 text-brand',
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  )
}
