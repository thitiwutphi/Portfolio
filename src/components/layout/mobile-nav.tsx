import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

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

import { navItems } from './nav-items'

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">Jump to a section of the page</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile">
          <ul className="grid gap-1 px-4">
            {navItems.map((item) => (
              <li key={item.hash}>
                <SheetClose asChild>
                  <Link
                    to="/"
                    hash={item.hash}
                    className="block rounded-md px-3 py-2.5 text-base hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
