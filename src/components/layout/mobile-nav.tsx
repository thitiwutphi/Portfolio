import { Menu } from 'lucide-react'

import { ThemeSwitch } from '@/components/theme/theme-switch'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

import { visibleNavItems, type NavKey } from './nav-items'
import { NavLink } from './nav-link'

export function MobileNav({ active }: { active: NavKey | undefined }) {
  const t = useMessages()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.openMenu}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>{t.menu}</SheetTitle>
          <SheetDescription className="sr-only">{t.menuDescription}</SheetDescription>
        </SheetHeader>
        <nav aria-label={t.mobileNav}>
          <ul className="grid gap-1 px-4">
            {visibleNavItems().map((item) => (
              <li key={item.key}>
                <SheetClose asChild>
                  <NavLink
                    item={item}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-base hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
                      active === item.key && 'bg-muted font-medium text-brand',
                    )}
                  >
                    {t.nav[item.key]}
                  </NavLink>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mx-4 mt-2 flex items-center justify-between border-t px-3 pt-4 sm:hidden">
          <span className="text-sm text-muted-foreground">{t.darkMode}</span>
          <ThemeSwitch />
        </div>
      </SheetContent>
    </Sheet>
  )
}
