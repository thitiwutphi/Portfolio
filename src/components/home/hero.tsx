import { Link } from '@tanstack/react-router'
import { ArrowRight, MapPin } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { SocialLinks } from '@/components/social-links'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

import { ProfileCard } from './profile-card'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hero-grid" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-10%] -z-10 size-[520px] rounded-full bg-brand/15 blur-3xl"
      />
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
        <div className="motion-safe:animate-in motion-safe:duration-500 motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
          <p className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <MapPin aria-hidden="true" className="size-3.5" />
            {profile.location}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-brand sm:text-2xl">{profile.role}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-10 px-4">
              <Link to="/" hash="projects">
                View projects <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-4">
              <Link to="/" hash="contact">
                Get in touch
              </Link>
            </Button>
          </div>
          <SocialLinks className="mt-8" />
        </div>
        <ProfileCard />
      </Container>
    </section>
  )
}
