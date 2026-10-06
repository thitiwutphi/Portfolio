import { Play } from 'lucide-react'

import { LogoImage } from '@/components/logo-image'
import { companies } from '@/content/companies'
import type { Project } from '@/content/projects'
import { mediaPreview } from '@/lib/projects'
import { cn } from '@/lib/utils'

/**
 * Card cover: the project's first photo or video still. Projects without media show the logo of
 * the company where they were done. Always decorative — the project title sits next to it.
 */
export function ProjectThumb({ project, className }: { project: Project; className?: string }) {
  const cover = project.media?.[0]
  const preview = cover ? mediaPreview(cover) : undefined
  const base = 'relative shrink-0 overflow-hidden rounded-md'

  if (cover && preview) {
    return (
      <span aria-hidden="true" className={cn(base, 'block bg-muted', className)}>
        <img
          src={preview}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        {cover.type !== 'image' && (
          <span className="absolute inset-0 grid place-items-center bg-black/15">
            <span className="grid size-8 place-items-center rounded-full bg-black/60 text-white">
              <Play className="size-4 translate-x-px fill-current" />
            </span>
          </span>
        )}
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      // Fixed padding: percentage padding is relative to the card, not this box.
      className={cn(base, 'block border bg-white p-2 sm:p-4', className)}
    >
      <LogoImage logo={companies[project.company].logo} className="size-full rounded-none" />
    </span>
  )
}
