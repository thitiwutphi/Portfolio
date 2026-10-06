import { Link } from '@tanstack/react-router'
import { ArrowRight, ChevronRight, MonitorPlay } from 'lucide-react'

import { ProjectThumb } from '@/components/project-thumb'
import { companies } from '@/content/companies'
import { projects } from '@/content/projects'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'
import { homeProjects } from '@/lib/projects'
import { cn } from '@/lib/utils'

import { itemCardClass } from './item-card'
import { Panel } from './panel'

/** Featured Projects on the home page. Renders nothing until there are projects. */
export function Projects({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  const shown = homeProjects()
  if (shown.length === 0) return null

  return (
    <Panel
      id="projects"
      title={t.featuredProjects}
      icon={MonitorPlay}
      className={className}
      action={
        <Link
          to="/{-$locale}/projects"
          params={localeParams}
          className="inline-flex shrink-0 items-center gap-1 rounded-md py-1 text-sm font-medium text-brand underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {t.allProjects.viewAll(projects.length)}
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      }
    >
      <ul className="@container space-y-3">
        {shown.map((project) => (
          <li key={project.slug}>
            <Link
              to="/{-$locale}/projects/$slug"
              params={{ ...localeParams, slug: project.slug }}
              className={cn(
                itemCardClass,
                'group flex items-center gap-4 p-2.5 pr-3 transition-[border-color,box-shadow] outline-none hover:border-brand/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50',
              )}
            >
              <ProjectThumb
                project={project}
                className="h-[54px] w-20 @[22rem]:h-16 @[22rem]:w-24 @[25rem]:h-[76px] @[25rem]:w-[113px]"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-heading">
                  {project.title[locale]}
                </span>
                <span className="mt-0.5 block text-xs text-brand">
                  {companies[project.company].name[locale]}
                </span>
                <span className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {project.summary[locale]}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
