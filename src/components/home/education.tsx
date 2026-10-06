import { Link } from '@tanstack/react-router'
import { ArrowRight, GraduationCap } from 'lucide-react'

import { LogoImage } from '@/components/logo-image'
import { education } from '@/content/education'
import { formatPeriod } from '@/lib/date'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'
import { projectsDuring } from '@/lib/projects'
import { cn } from '@/lib/utils'

import { itemCardClass } from './item-card'
import { Panel } from './panel'

export function Education({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  const related = projectsDuring(education.company, education.start, education.end)
  return (
    <Panel id="education" title={t.education} icon={GraduationCap} className={className}>
      <div className={cn(itemCardClass, 'p-4')}>
        <div className="flex items-center gap-5">
          <LogoImage logo={education.logo} className="h-14 w-auto" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-heading">{education.school[locale]}</h3>
            <p className="mt-1 text-[13px] text-foreground/80">{education.degree[locale]}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {formatPeriod(education.start, education.end, locale)}
            </p>
          </div>
        </div>
        {related.length > 0 && (
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3 text-[13px]">
            <span className="text-muted-foreground">{t.projectsHere}:</span>
            {related.map((project) => (
              <Link
                key={project.slug}
                to="/{-$locale}/projects/$slug"
                params={{ ...localeParams, slug: project.slug }}
                className="inline-flex items-center gap-1 rounded-sm font-medium text-brand underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {project.title[locale]}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            ))}
          </p>
        )}
      </div>
    </Panel>
  )
}
