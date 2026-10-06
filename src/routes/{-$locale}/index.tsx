import { createFileRoute } from '@tanstack/react-router'

import { Awards, Certifications } from '@/components/home/achievements'
import { Education } from '@/components/home/education'
import { Experience } from '@/components/home/experience'
import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'
import { Skills } from '@/components/home/skills'
import { Container } from '@/components/layout/container'
import { homeMeta } from '@/content/seo'
import { usePageMeta } from '@/hooks/use-page-meta'
import { useLocale } from '@/i18n/use-locale'

export const Route = createFileRoute('/{-$locale}/')({
  component: HomePage,
})

function HomePage() {
  usePageMeta(homeMeta(useLocale()))

  return (
    <>
      <Hero />
      <Container className="py-5 sm:py-6">
        {/*
          1440px+: three columns, as in the design. 1024–1439px: the two side columns stack on the
          left with Experience on the right. Below that the column wrappers use `display: contents`
          so every panel becomes one item in a single column, ordered for reading on a phone.
        */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] wide:grid-cols-[minmax(0,335fr)_minmax(0,637fr)_minmax(0,455fr)] wide:grid-rows-1">
          <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:gap-4">
            <Skills className="order-1" />
            <Certifications className="order-5" />
            <Awards className="order-6" />
          </div>
          <div className="contents lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block wide:row-span-1">
            <Experience className="order-2 lg:h-full" />
          </div>
          <div className="contents lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col lg:gap-4 lg:self-start wide:col-start-3 wide:row-start-1">
            <Projects className="order-3" />
            <Education className="order-4" />
          </div>
        </div>
      </Container>
    </>
  )
}
