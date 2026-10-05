import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, Star } from 'lucide-react'
import type { ReactNode } from 'react'

import { GitHubIcon } from '@/components/brand-icons'
import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { profile } from '@/content/profile'

import { reposQueryOptions, safeHomepage, selectShowcaseRepos, type Repo } from './api'

const LANGUAGE_COLORS: Record<string, string> = {
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  CSS: '#563d7c',
  Dart: '#00b4ab',
  Go: '#00add8',
  HTML: '#e34c26',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#da5b0b',
  Kotlin: '#a97bff',
  Python: '#3572a5',
  Rust: '#dea584',
  Shell: '#89e051',
  TypeScript: '#3178c6',
}

const updatedFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' })

export function GitHubRepos() {
  const {
    data: repos,
    isPending,
    isError,
  } = useQuery({
    ...reposQueryOptions(),
    select: selectShowcaseRepos,
  })

  return (
    <Section
      id="open-source"
      eyebrow="Open source"
      title="On GitHub"
      description="Public repositories, pulled live from the GitHub API."
    >
      {isPending ? (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories">
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index}>
              <Skeleton className="h-40 rounded-xl" />
            </li>
          ))}
        </ul>
      ) : isError ? (
        <StatusMessage>GitHub repositories couldn&apos;t be loaded right now.</StatusMessage>
      ) : repos.length === 0 ? (
        <StatusMessage>No public repositories yet.</StatusMessage>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      )}
      <Button asChild variant="outline" className="mt-8">
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          <GitHubIcon data-icon="inline-start" /> View GitHub profile
        </a>
      </Button>
    </Section>
  )
}

function StatusMessage({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
      {children}
    </p>
  )
}

function RepoCard({ repo }: { repo: Repo }) {
  const homepage = safeHomepage(repo.homepage)

  return (
    <Card className="relative h-full hover:ring-brand/40 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
      <CardHeader>
        <CardTitle className="font-mono font-semibold">
          <h3>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {repo.name}
            </a>
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-muted-foreground">{repo.description ?? 'No description yet.'}</p>
        {repo.topics.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
            {repo.topics.slice(0, 4).map((topic) => (
              <li key={topic}>
                <Badge variant="secondary">{topic}</Badge>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? 'currentColor' }}
              />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Stars:</span> {repo.stargazers_count}
            </span>
          )}
          <span>Updated {updatedFormatter.format(new Date(repo.pushed_at))}</span>
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-0.5 font-medium text-brand underline-offset-4 hover:underline"
            >
              Website <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
