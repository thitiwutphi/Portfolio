import { Mail, Phone } from 'lucide-react'

import { LinkedInIcon } from '@/components/brand-icons'
import { profile } from '@/content/profile'
import { useLocale, useMessages } from '@/i18n/use-locale'

import { Container } from './container'

export function SiteFooter() {
  const locale = useLocale()
  const t = useMessages()
  return (
    <footer id="contact" aria-label={t.contact} className="bg-footer text-footer-foreground">
      <Container className="flex flex-col gap-4 py-6 text-sm xl:flex-row xl:items-center xl:gap-10 xl:py-4">
        <p>
          <span className="font-semibold text-white">{profile.name}</span>
          <span aria-hidden="true" className="mx-3 text-white/40">
            |
          </span>
          {profile.role[locale]}
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-1 xl:ml-auto">
          <li>
            <a
              href={profile.phoneHref}
              className="inline-flex items-center gap-2 py-1 hover:text-white"
            >
              <Phone aria-hidden="true" className="size-4" />
              {profile.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 py-1 hover:text-white"
            >
              <Mail aria-hidden="true" className="size-4" />
              {profile.email}
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 py-1 hover:text-white"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="text-footer-foreground/80 xl:ml-8">{profile.footerTagline[locale]}</p>
      </Container>
    </footer>
  )
}
