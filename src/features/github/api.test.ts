import { describe, expect, it, vi } from 'vitest'

import { fetchRepos, safeHomepage, selectShowcaseRepos, type Repo } from './api'

function repo(overrides: Partial<Repo>): Repo {
  return {
    id: 1,
    name: 'repo',
    html_url: 'https://github.com/thitiwutphi/repo',
    description: null,
    homepage: null,
    language: null,
    stargazers_count: 0,
    fork: false,
    archived: false,
    pushed_at: '2026-01-01T00:00:00Z',
    topics: [],
    ...overrides,
  }
}

describe('selectShowcaseRepos', () => {
  it('drops forks and archived repos', () => {
    const repos = [
      repo({ id: 1, name: 'mine' }),
      repo({ id: 2, name: 'forked', fork: true }),
      repo({ id: 3, name: 'old', archived: true }),
    ]
    expect(selectShowcaseRepos(repos).map((r) => r.name)).toEqual(['mine'])
  })

  it('sorts by stars, then by most recent push, and respects the limit', () => {
    const repos = [
      repo({ id: 1, name: 'older', pushed_at: '2025-01-01T00:00:00Z' }),
      repo({ id: 2, name: 'starred', stargazers_count: 5 }),
      repo({ id: 3, name: 'newer', pushed_at: '2026-06-01T00:00:00Z' }),
    ]
    expect(selectShowcaseRepos(repos).map((r) => r.name)).toEqual(['starred', 'newer', 'older'])
    expect(selectShowcaseRepos(repos, 1)).toHaveLength(1)
  })
})

describe('safeHomepage', () => {
  it('allows http(s) URLs only', () => {
    expect(safeHomepage('https://example.com')).toBe('https://example.com/')
    expect(safeHomepage('javascript:alert(1)')).toBeUndefined()
    expect(safeHomepage('not a url')).toBeUndefined()
    expect(safeHomepage('')).toBeUndefined()
    expect(safeHomepage(null)).toBeUndefined()
  })
})

describe('fetchRepos', () => {
  it('validates the response and defaults missing topics', async () => {
    const { topics: _topics, ...withoutTopics } = repo({ name: 'portfolio' })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json([withoutTopics])))

    const repos = await fetchRepos('thitiwutphi')

    expect(repos).toEqual([{ ...withoutTopics, topics: [] }])
    expect(fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/thitiwutphi/repos?per_page=100&sort=pushed',
      expect.objectContaining({ headers: { Accept: 'application/vnd.github+json' } }),
    )
  })

  it('throws on an error response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 403 })))
    await expect(fetchRepos('thitiwutphi')).rejects.toThrow('GitHub API responded with 403')
  })

  it('throws when the payload has an unexpected shape', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json([{ name: 42 }])))
    await expect(fetchRepos('thitiwutphi')).rejects.toThrow()
  })
})
