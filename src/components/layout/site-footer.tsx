import { profile } from '@/content/profile'
import { site } from '@/content/seo'

import { Container } from './container'

export function SiteFooter() {
  return (
    <footer className="border-t py-8 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with React, TanStack &amp; shadcn/ui ·{' '}
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Source on GitHub
          </a>
        </p>
      </Container>
    </footer>
  )
}
