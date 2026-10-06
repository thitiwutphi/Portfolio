import { Mail, MapPin, Phone, Settings } from 'lucide-react'

import { LinkedInIcon } from '@/components/brand-icons'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import { asset } from '@/lib/asset'
import { useLocale, useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

export function Hero() {
  const locale = useLocale()
  const t = useMessages()
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-r from-hero-from to-hero-to"
    >
      {/* 1440px+: the photo bleeds off the right edge, as in the design. */}
      <RobotBanner className="absolute inset-y-0 right-0 hidden w-[38%] wide:block" bleed />

      {/*
        Phones: profile, summary, photo stacked. 1024–1439px: profile beside the photo with the
        summary underneath. 1440px+ (enough room for three parts): profile beside the summary.
      */}
      <Container className="py-8 sm:py-10 wide:py-9">
        <div className="grid items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10 wide:w-[61%]">
          <ProfileBlock />
          {/* max-w keeps the summary at a readable line length when it spans the full width. */}
          <div
            id="about"
            className="max-w-[65ch] scroll-mt-20 lg:col-span-2 wide:col-span-1 wide:max-w-none"
          >
            <h2 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <Settings aria-hidden="true" className="size-[22px] text-brand" />
              {t.summary}
            </h2>
            <p className="mt-3 text-[13px] leading-[1.6] text-pretty text-foreground/80">
              {profile.summary[locale]}
            </p>
          </div>
          <RobotBanner className="aspect-[16/10] rounded-xl shadow-sm sm:aspect-[591/275] lg:col-start-2 lg:row-start-1 wide:hidden" />
        </div>
      </Container>
    </section>
  )
}

function ProfileBlock() {
  const locale = useLocale()
  const t = useMessages()
  // py-1 keeps each link at least 24px tall for touch (WCAG 2.5.8).
  const contactClass = 'inline-flex items-center gap-2.5 py-1 hover:text-brand'
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
      <img
        src={asset(profile.photo)}
        alt={t.portraitAlt(profile.name)}
        width={150}
        height={150}
        fetchPriority="high"
        className="size-32 shrink-0 rounded-full border-[5px] border-white object-cover shadow-lg ring-1 shadow-heading/10 ring-black/5 sm:size-[150px] dark:border-card"
      />
      <div className="min-w-0">
        <h1
          id="hero-title"
          className="text-[26px] leading-tight font-bold tracking-tight whitespace-nowrap text-heading"
        >
          {profile.name}
        </h1>
        <p className="mt-1 text-xl font-medium whitespace-nowrap text-brand">
          {profile.role[locale]}
        </p>
        <ul className="mt-3 inline-grid gap-1 text-left text-xs text-foreground/80">
          <li className="inline-flex items-center gap-2.5 py-1">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-heading/60" />
            {profile.location[locale]}
          </li>
          <li>
            <a href={profile.phoneHref} className={contactClass}>
              <Phone aria-hidden="true" className="size-4 shrink-0 text-heading/60" />
              {profile.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className={contactClass}>
              <Mail aria-hidden="true" className="size-4 shrink-0 text-heading/60" />
              {profile.email}
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(
                contactClass,
                'items-start break-all lg:break-normal lg:whitespace-nowrap',
              )}
            >
              <LinkedInIcon className="mt-px size-4 shrink-0 text-heading/60" />
              {profile.links.linkedinLabel}
            </a>
          </li>
        </ul>
        <div>
          <Button asChild className="mt-5 h-9 gap-2 px-4">
            <a href={`mailto:${profile.email}`}>
              <Mail data-icon="inline-start" /> {t.getInTouch}
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

/** `bleed`: the wide-screen version that runs off the right edge of the page. */
function RobotBanner({ className, bleed = false }: { className?: string; bleed?: boolean }) {
  const locale = useLocale()
  return (
    <figure className={cn('relative m-0 overflow-hidden', className)}>
      <img
        src={asset(profile.banner.image)}
        alt={profile.banner.imageAlt[locale]}
        width={591}
        height={275}
        className={cn(
          'size-full object-cover',
          // The wide banner fades in from the left, so anchor the photo right to keep the robot
          // clear of the caption.
          bleed
            ? 'mask-[linear-gradient(to_right,transparent,black_22%)] object-right'
            : 'object-[30%_center]',
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-l from-[#0b1f44]/70 via-[#0b1f44]/20 via-45% to-transparent to-65%"
      />
      <figcaption
        className={cn(
          'absolute inset-y-0 right-0 flex flex-col justify-center text-white',
          bleed ? 'w-[38%] max-w-[18rem] pr-10' : 'w-[44%] pr-4 sm:pr-8',
        )}
      >
        <p className="text-lg leading-tight font-bold [text-shadow:0_1px_8px_rgb(0_0_0/0.25)] sm:text-[26px]">
          {profile.banner.headline[locale].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mt-2 text-[11px] font-semibold sm:mt-5 sm:text-sm">
          {profile.banner.tagline[locale]}
        </p>
      </figcaption>
    </figure>
  )
}
