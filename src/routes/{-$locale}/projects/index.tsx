import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, FolderOpen } from 'lucide-react'

import { itemCardClass } from '@/components/home/item-card'
import { Container } from '@/components/layout/container'
import { ProjectThumb } from '@/components/project-thumb'
import { Button } from '@/components/ui/button'
import { companies, companyIds, isCompanyId, type CompanyId } from '@/content/companies'
import { projects, type Project } from '@/content/projects'
import { projectsMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'
import { projectsAt } from '@/lib/projects'
import { cn } from '@/lib/utils'

interface ProjectsSearch {
  company?: CompanyId
}

export const Route = createFileRoute('/{-$locale}/projects/')({
  // ?company=arv. Unknown values show everything; the key must be set explicitly because
  // TanStack Router keeps any raw search value the validator leaves out.
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
    company: isCompanyId(search.company) ? search.company : undefined,
  }),
  component: AllProjectsPage,
})

const MAX_TECH = 4

function AllProjectsPage() {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  const { company } = Route.useSearch()
  usePageMeta(projectsMeta(locale))

  const shown = company ? projectsAt(company) : projects
  const filters = [
    { value: undefined, label: t.allProjects.all, count: projects.length },
    ...companyIds
      .map((value) => ({
        value,
        label: companies[value].shortName,
        count: projectsAt(value).length,
      }))
      .filter((filter) => filter.count > 0),
  ]

  return (
    <Container className="py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="-ml-2.5 text-muted-foreground">
        <Link to="/{-$locale}" params={localeParams} hash={projects.length ? 'projects' : 'home'}>
          <ArrowLeft data-icon="inline-start" /> {t.allProjects.backHome}
        </Link>
      </Button>

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
          {t.allProjects.title}
        </h1>
        <p className="mt-3 leading-relaxed text-pretty text-foreground/80">
          {t.allProjects.description}
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed bg-panel px-6 py-16 text-center">
          <FolderOpen aria-hidden="true" className="size-10 text-brand/60" strokeWidth={1.5} />
          <p className="mt-4 text-muted-foreground">{t.allProjects.empty}</p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            {/* Only worth filtering once projects come from more than one company. */}
            {filters.length > 2 && (
              <nav aria-label={t.allProjects.filter}>
                <ul className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const active = filter.value === company
                    return (
                      <li key={filter.value ?? 'all'}>
                        <Link
                          to="/{-$locale}/projects"
                          params={localeParams}
                          search={{ company: filter.value }}
                          replace
                          resetScroll={false}
                          activeOptions={{ exact: true, includeSearch: true }}
                          activeProps={{}}
                          className={cn(
                            'inline-flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                            active
                              ? 'border-brand bg-brand text-white dark:text-background'
                              : 'border-transparent bg-chip text-chip-foreground hover:border-brand/40',
                          )}
                        >
                          {filter.label}
                          <span
                            className={cn(
                              'tabular-nums',
                              active ? 'opacity-80' : 'text-muted-foreground',
                            )}
                          >
                            {filter.count}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            )}
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {t.allProjects.count(shown.length)}
            </p>
          </div>

          <ul className="mt-5 grid gap-4 lg:grid-cols-2">
            {shown.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  const tech = project.tech ?? []

  return (
    <article
      className={cn(
        itemCardClass,
        'group relative flex h-full gap-4 p-3 transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-md has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50 sm:p-4',
      )}
    >
      <ProjectThumb project={project} className="h-16 w-24 sm:h-[107px] sm:w-40" />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-brand">{companies[project.company].name[locale]}</span>
          {project.period && (
            <>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">{project.period}</span>
            </>
          )}
          {project.featured && (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-px font-medium text-amber-700 dark:text-amber-300">
              {t.allProjects.featured}
            </span>
          )}
        </p>
        <h2 className="mt-1.5 font-semibold text-heading">
          <Link
            to="/{-$locale}/projects/$slug"
            params={{ ...localeParams, slug: project.slug }}
            className="outline-none group-hover:text-brand after:absolute after:inset-0 after:rounded-lg"
          >
            {project.title[locale]}
          </Link>
        </h2>
        <p className="mt-1 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
          {project.summary[locale]}
        </p>
        {tech.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t.project.technologies}>
            {tech.slice(0, MAX_TECH).map((item) => (
              <li
                key={item}
                className="rounded-full bg-chip px-2.5 py-0.5 text-xs text-chip-foreground"
              >
                {item}
              </li>
            ))}
            {tech.length > MAX_TECH && (
              <li className="rounded-full px-1.5 py-0.5 text-xs text-muted-foreground">
                +{tech.length - MAX_TECH}
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}
