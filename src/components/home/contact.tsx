import { Mail } from 'lucide-react'

import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t py-16 md:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[460px] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
          />
          <Eyebrow>Contact</Eyebrow>
          <h2
            id="contact-title"
            className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Working on robotics, autonomy or real-time robot platforms? Send me a message — I&apos;m
            always happy to talk robots.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-10 px-4">
              <a href={`mailto:${profile.email}`}>
                <Mail data-icon="inline-start" /> Email me
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-4">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon data-icon="inline-start" /> LinkedIn
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-4">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <GitHubIcon data-icon="inline-start" /> GitHub
              </a>
            </Button>
          </div>
          <p className="mt-6 font-mono text-sm text-muted-foreground select-all">{profile.email}</p>
        </div>
      </Container>
    </section>
  )
}
