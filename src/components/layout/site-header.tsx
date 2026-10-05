import { Link } from '@tanstack/react-router'

import { ModeToggle } from '@/components/theme/mode-toggle'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

import { Container } from './container'
import { MobileNav } from './mobile-nav'
import { navItems } from './nav-items'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-brand font-mono text-xs font-bold text-brand-foreground"
          >
            {profile.initials}
          </span>
          <span>{profile.firstName}</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.hash}>
                  <Button
                    variant="ghost"
                    asChild
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Link to="/" hash={item.hash}>
                      {item.label}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <ModeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
