import { createFileRoute, Outlet, useMatch } from '@tanstack/react-router'

import { ProjectGate } from '@/components/project-gate'
import { projectMeta, projectsMeta } from '@/content/seo'
import { useLocale } from '@/i18n/use-locale'
import { getProject } from '@/lib/projects'

/** Every page under /projects needs the access code. */
export const Route = createFileRoute('/{-$locale}/projects')({
  component: ProjectsLayout,
})

function ProjectsLayout() {
  const locale = useLocale()
  const projectMatch = useMatch({ from: '/{-$locale}/projects/$slug', shouldThrow: false })
  const project = projectMatch ? getProject(projectMatch.params.slug) : undefined
  // While locked, keep the page title of the page being opened.
  const meta = project ? projectMeta(project, locale) : projectsMeta(locale)

  // Unknown project: show the 404 page rather than asking for the code.
  if (projectMatch && !project) return <Outlet />

  return (
    <ProjectGate meta={meta}>
      <Outlet />
    </ProjectGate>
  )
}
