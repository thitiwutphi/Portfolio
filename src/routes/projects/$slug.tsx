import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Newspaper,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { IconTile } from '@/components/icon-tile'
import { projectIcons } from '@/components/icons'
import { Container } from '@/components/layout/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getProject, projectContext, projects, type Project } from '@/content/projects'
import { projectMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return { project }
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { project } = Route.useLoaderData()
  usePageMeta(projectMeta(project))

  const context = projectContext(project)
  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[index - 1]
  const next = projects[index + 1]

  return (
    <article className="py-10 sm:py-16">
      <Container className="max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="-ml-2.5 text-muted-foreground">
          <Link to="/" hash="projects">
            <ArrowLeft data-icon="inline-start" /> All projects
          </Link>
        </Button>

        <header className="mt-8">
          <div className="flex items-center gap-3">
            <IconTile icon={projectIcons[project.icon]} />
            {context && <p className="font-mono text-xs text-muted-foreground">{context}</p>}
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            {project.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary" className="h-6 px-2.5">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </header>

        <Separator className="my-10" />

        <div className="space-y-12">
          <ProjectSection icon={Wrench} title="What I built">
            <ul className="space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </ProjectSection>

          {project.learned && (
            <ProjectSection icon={Lightbulb} title="What I learned">
              <p className="rounded-xl border bg-muted/40 p-5 leading-relaxed">{project.learned}</p>
            </ProjectSection>
          )}

          {project.press && (
            <ProjectSection icon={Newspaper} title="In the press">
              <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-brand/60">
                {project.press.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProjectSection>
          )}
        </div>

        <Separator className="my-10" />

        <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
          {previous && <AdjacentProject project={previous} direction="previous" />}
          {next && <AdjacentProject project={next} direction="next" />}
        </nav>
      </Container>
    </article>
  )
}

function ProjectSection({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold tracking-tight">
        <Icon aria-hidden="true" className="size-5 text-brand" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function AdjacentProject({
  project,
  direction,
}: {
  project: Project
  direction: 'previous' | 'next'
}) {
  const isNext = direction === 'next'
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={`group rounded-xl border p-4 transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${isNext ? 'text-right sm:col-start-2' : ''}`}
    >
      <span
        className={`flex items-center gap-1 text-xs text-muted-foreground ${isNext ? 'justify-end' : ''}`}
      >
        {!isNext && <ArrowLeft aria-hidden="true" className="size-3.5" />}
        {isNext ? 'Next project' : 'Previous project'}
        {isNext && <ArrowRight aria-hidden="true" className="size-3.5" />}
      </span>
      <span className="mt-1 block font-medium group-hover:text-brand">{project.title}</span>
    </Link>
  )
}
