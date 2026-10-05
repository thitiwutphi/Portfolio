import { createFileRoute } from '@tanstack/react-router'

import { About } from '@/components/home/about'
import { Contact } from '@/components/home/contact'
import { Education } from '@/components/home/education'
import { Experience } from '@/components/home/experience'
import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'
import { Skills } from '@/components/home/skills'
import { homeMeta } from '@/content/seo'
import { reposQueryOptions } from '@/features/github/api'
import { GitHubRepos } from '@/features/github/github-repos'
import { usePageMeta } from '@/hooks/use-page-meta'

export const Route = createFileRoute('/')({
  // Start fetching GitHub repos early without blocking the page render.
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(reposQueryOptions())
  },
  component: HomePage,
})

function HomePage() {
  usePageMeta(homeMeta)

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GitHubRepos />
      <Education />
      <Contact />
    </>
  )
}
