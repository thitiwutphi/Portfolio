import { Link } from '@tanstack/react-router'

import { ThemeSwitch } from '@/components/theme/theme-switch'
import { profile } from '@/content/profile'
import { useActiveSection } from '@/hooks/use-active-section'
import { useLocaleParams, useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

import { Container } from './container'
import { LanguageSwitch } from './language-switch'
import { MobileNav } from './mobile-nav'
import { visibleNavItems } from './nav-items'
import { NavLink } from './nav-link'

export function SiteHeader() {
  const active = useActiveSection()
  const t = useMessages()
  const localeParams = useLocaleParams()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <Container className="flex h-14 items-center gap-6">
        <Link
          to="/{-$locale}"
          params={localeParams}
          hash="home"
          className="shrink-0 rounded-md text-base font-bold tracking-tight text-heading sm:text-xl"
        >
          {profile.name}
        </Link>

        <nav aria-label={t.mainNav} className="ml-6 hidden h-full lg:block xl:ml-14">
          <ul className="flex h-full items-center">
            {visibleNavItems().map((item) => {
              const isActive = active === item.key
              return (
                <li key={item.key} className="h-full">
                  <NavLink
                    item={item}
                    active={isActive}
                    className={cn(
                      'relative flex h-full items-center px-3 text-sm font-medium whitespace-nowrap text-foreground/85 transition-colors hover:text-brand xl:px-4',
                      'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand after:opacity-0 after:transition-opacity xl:after:inset-x-4',
                      'data-active:text-brand data-active:after:opacity-100',
                    )}
                  >
                    {t.nav[item.key]}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitch />
          {/* On phones the theme switch lives in the menu to keep the header uncluttered. */}
          <ThemeSwitch className="hidden sm:flex" />
          <MobileNav active={active} />
        </div>
      </Container>
    </header>
  )
}
