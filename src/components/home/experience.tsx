import { Link } from '@tanstack/react-router'
import { ArrowRight, BriefcaseBusiness, CalendarDays, MapPin } from 'lucide-react'

import { LogoImage } from '@/components/logo-image'
import { companies } from '@/content/companies'
import { experience } from '@/content/experience'
import { currentYearMonth, formatDuration, formatPeriod, monthsBetween } from '@/lib/date'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'
import { projectsDuring } from '@/lib/projects'
import { cn } from '@/lib/utils'

import { itemCardClass } from './item-card'
import { Panel } from './panel'

export function Experience({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  return (
    <Panel id="experience" title={t.experience} icon={BriefcaseBusiness} className={className}>
      <ol className="relative space-y-3 sm:pl-7 sm:before:absolute sm:before:top-4 sm:before:bottom-4 sm:before:left-[9px] sm:before:w-0.5 sm:before:rounded-full sm:before:bg-brand/25">
        {experience.map((job) => {
          const duration = formatDuration(
            monthsBetween(job.start, job.end ?? currentYearMonth()),
            locale,
          )
          const company = companies[job.company]
          const related = projectsDuring(job.company, job.start, job.end)
          return (
            <li key={`${job.company}-${job.role.en}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-4 -left-6 hidden size-3 rounded-full bg-brand ring-4 ring-panel sm:block"
              />
              <article className={cn(itemCardClass, 'p-4')}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-heading">{company.name[locale]}</h3>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand">
                      {job.role[locale]}
                      {job.employmentType === 'Internship' && (
                        <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-2 py-px text-xs font-medium">
                          <span className="sr-only">, </span>
                          {t.internship}
                        </span>
                      )}
                    </p>
                  </div>
                  <LogoImage logo={company.logo} area={2600} className="hidden sm:block" />
                </div>
                <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-start gap-1.5">
                    <CalendarDays aria-hidden="true" className="mt-px size-3.5 shrink-0" />
                    <span>
                      {formatPeriod(job.start, job.end, locale)}{' '}
                      <span className="whitespace-nowrap">({duration})</span>
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    {job.location[locale]}
                  </span>
                </p>
                <ul className="mt-2.5 list-disc space-y-0.5 pl-5 text-[13px] leading-normal text-foreground/80 marker:text-muted-foreground">
                  {job.highlights.map((highlight) => (
                    <li key={highlight.en}>{highlight[locale]}</li>
                  ))}
                </ul>
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
              </article>
            </li>
          )
        })}
      </ol>
    </Panel>
  )
}
