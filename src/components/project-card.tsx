import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { IconTile } from '@/components/icon-tile'
import { projectIcons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { projectContext, type Project } from '@/content/projects'

const MAX_TECH = 5

export function ProjectCard({ project }: { project: Project }) {
  const context = projectContext(project)
  const extraTech = project.tech.length - MAX_TECH

  return (
    <Card className="group relative h-full gap-5 transition-shadow hover:shadow-lg hover:ring-brand/40 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
      <CardHeader className="gap-2">
        <div className="mb-2 flex items-start justify-between">
          <IconTile icon={projectIcons[project.icon]} />
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          />
        </div>
        <CardTitle className="text-lg font-semibold">
          <h3>
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
        </CardTitle>
        {context && <p className="font-mono text-xs text-muted-foreground">{context}</p>}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <p className="leading-relaxed text-muted-foreground">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.slice(0, MAX_TECH).map((tech) => (
            <li key={tech}>
              <Badge variant="outline">{tech}</Badge>
            </li>
          ))}
          {extraTech > 0 && (
            <li>
              <Badge variant="outline" className="text-muted-foreground">
                +{extraTech} more
              </Badge>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
