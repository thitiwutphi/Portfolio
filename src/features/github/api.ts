import { queryOptions } from '@tanstack/react-query'
import * as z from 'zod/mini'

export const GITHUB_USER = 'thitiwutphi'

const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.url(),
  description: z.nullable(z.string()),
  homepage: z.nullable(z.string()),
  language: z.nullable(z.string()),
  stargazers_count: z.number(),
  fork: z.boolean(),
  archived: z.boolean(),
  pushed_at: z.string(),
  topics: z._default(z.array(z.string()), []),
})

export type Repo = z.infer<typeof repoSchema>

export async function fetchRepos(user: string, signal?: AbortSignal): Promise<Repo[]> {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`,
    { headers: { Accept: 'application/vnd.github+json' }, signal },
  )
  if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`)
  return z.array(repoSchema).parse(await response.json())
}

export const reposQueryOptions = (user: string = GITHUB_USER) =>
  queryOptions({
    queryKey: ['github', 'repos', user],
    queryFn: ({ signal }) => fetchRepos(user, signal),
    staleTime: 10 * 60 * 1000,
  })

/** Public, non-fork, non-archived repos — most starred first, then most recently pushed. */
export function selectShowcaseRepos(repos: Repo[], limit = 6): Repo[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
    )
    .slice(0, limit)
}

/** Only allow http(s) homepages so a repo's website field can't inject other URL schemes. */
export function safeHomepage(homepage: string | null): string | undefined {
  if (!homepage) return undefined
  try {
    const url = new URL(homepage)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : undefined
  } catch {
    return undefined
  }
}
