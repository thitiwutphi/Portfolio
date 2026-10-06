import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, ExternalLink, Lightbulb } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { LogoImage } from '@/components/logo-image'
import { ProjectGallery } from '@/components/project-gallery'
import { Badge } from '@/components/ui/badge'
import { companies } from '@/content/companies'
import { projects, type Project } from '@/content/projects'
import { projectMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'
import { useLocale, useLocaleParams, useMessages } from '@/i18n/use-locale'
import { getProject } from '@/lib/projects'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/{-$locale}/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return { project }
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { project } = Route.useLoaderData()
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  usePageMeta(projectMeta(project, locale))

  const company = companies[project.company]
  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[index - 1]
  const next = projects[index + 1]

  return (
    <Container className="max-w-4xl py-8 sm:py-12">
      <Link
        to="/{-$locale}/projects"
        params={localeParams}
        className="-ml-1 inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> {t.project.back}
      </Link>

      <article className="mt-4 overflow-hidden rounded-xl border bg-panel">
        <header className="p-5 sm:p-7">
          <h1 className="text-2xl font-bold tracking-tight text-balance text-heading sm:text-3xl">
            {project.title[locale]}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="block h-11 w-16 shrink-0 rounded-md border bg-white p-1.5">
              <LogoImage logo={company.logo} className="size-full rounded-none" />
            </span>
            <div className="min-w-0 text-sm">
              <p className="text-xs text-muted-foreground">{t.project.company}</p>
              <p className="font-medium text-heading">
                {company.name[locale]}
                {project.period && (
                  <span className="font-normal whitespace-nowrap text-muted-foreground">
                    {' '}
                    · {project.period}
                  </span>
                )}
              </p>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-pretty text-foreground/80">
            {project.summary[locale]}
          </p>
        </header>

        {project.media && project.media.length > 0 && (
          <section aria-label={t.project.media} className="border-t p-5 sm:p-7">
            <ProjectGallery media={project.media} />
          </section>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section aria-labelledby="highlights-title" className="border-t p-5 sm:p-7">
            <h2 id="highlights-title" className="text-lg font-semibold text-heading">
              {t.project.highlights}
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight.en} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
                  <span>{highlight[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.tech && project.tech.length > 0 && (
          <section aria-labelledby="tech-title" className="border-t p-5 sm:p-7">
            <h2 id="tech-title" className="text-lg font-semibold text-heading">
              {t.project.technologies}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <Badge className="h-7 bg-chip px-3 text-[13px] font-normal text-chip-foreground">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.learned && (
          <section aria-labelledby="learned-title" className="border-t p-5 sm:p-7">
            <h2
              id="learned-title"
              className="flex items-center gap-2 text-lg font-semibold text-heading"
            >
              <Lightbulb aria-hidden="true" className="size-5 text-brand" />
              {t.project.learned}
            </h2>
            <p className="mt-4 rounded-lg border bg-card p-4 leading-relaxed">
              {project.learned[locale]}
            </p>
          </section>
        )}

        {project.links && project.links.length > 0 && (
          <section aria-labelledby="links-title" className="border-t p-5 sm:p-7">
            <h2 id="links-title" className="text-lg font-semibold text-heading">
              {t.project.links}
            </h2>
            <ul className="mt-4 space-y-2">
              {project.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm font-medium text-brand underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label[locale]}
                    <ExternalLink aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {(previous || next) && (
        <nav aria-label={t.project.more} className="mt-6 grid gap-4 sm:grid-cols-2">
          {previous && <AdjacentProject project={previous} direction="previous" />}
          {next && <AdjacentProject project={next} direction="next" />}
        </nav>
      )}
    </Container>
  )
}

function AdjacentProject({
  project,
  direction,
}: {
  project: Project
  direction: 'previous' | 'next'
}) {
  const locale = useLocale()
  const t = useMessages()
  const localeParams = useLocaleParams()
  const isNext = direction === 'next'

  return (
    <Link
      to="/{-$locale}/projects/$slug"
      params={{ ...localeParams, slug: project.slug }}
      className={cn(
        'group rounded-xl border bg-card p-4 shadow-xs transition-colors outline-none hover:border-brand/40 focus-visible:ring-3 focus-visible:ring-ring/50',
        isNext && 'text-right sm:col-start-2',
      )}
    >
      <span
        className={cn(
          'flex items-center gap-1 text-xs text-muted-foreground',
          isNext && 'justify-end',
        )}
      >
        {!isNext && <ArrowLeft aria-hidden="true" className="size-3.5" />}
        {isNext ? t.project.next : t.project.previous}
        {isNext && <ArrowRight aria-hidden="true" className="size-3.5" />}
      </span>
      <span className="mt-1 block font-medium text-heading group-hover:text-brand">
        {project.title[locale]}
      </span>
    </Link>
  )
}
