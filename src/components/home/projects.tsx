import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { IconTile } from '@/components/icon-tile'
import { projectIcons } from '@/components/icons'
import { Section } from '@/components/layout/section'
import { ProjectCard } from '@/components/project-card'
import { projectContext, projects } from '@/content/projects'

const featured = projects.filter((project) => project.featured)
const earlier = projects.filter((project) => !project.featured)

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Robots and platforms I've built — open a project for the details."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {featured.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <h3 className="mt-14 mb-4 font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Earlier work
      </h3>
      <ul className="divide-y overflow-hidden rounded-xl border">
        {earlier.map((project) => (
          <li key={project.slug}>
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none sm:px-5"
            >
              <IconTile icon={projectIcons[project.icon]} className="size-9" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{project.title}</span>
                <span className="block truncate text-sm text-muted-foreground">
                  {projectContext(project)}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
