import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/content/experience'
import { getProject } from '@/content/projects'
import { currentYearMonth, formatDuration, formatPeriod, monthsBetween } from '@/lib/date'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="ml-1.5 space-y-12 border-l pl-6 sm:pl-8">
        {experience.map((job) => {
          const duration = formatDuration(monthsBetween(job.start, job.end ?? currentYearMonth()))
          const related = (job.projectSlugs ?? [])
            .map(getProject)
            .filter((project) => project !== undefined)

          return (
            <li key={`${job.company}-${job.role}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[calc(1.5rem+5.5px)] size-2.5 rounded-full bg-brand ring-4 ring-background sm:-left-[calc(2rem+5.5px)]"
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-semibold text-pretty">{job.role}</h3>
                <p className="shrink-0 font-mono text-xs text-muted-foreground">
                  {formatPeriod(job.start, job.end)} · {duration}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{job.company}</span> ·{' '}
                {job.employmentType} · {job.location}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-brand/60 sm:text-base">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
                {job.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="secondary">{skill}</Badge>
                  </li>
                ))}
              </ul>
              {related.length > 0 && (
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Projects:</span>
                  {related.map((project) => (
                    <Link
                      key={project.slug}
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="inline-flex items-center gap-1 font-medium text-brand underline-offset-4 hover:underline"
                    >
                      {project.title}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  ))}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
