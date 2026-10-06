import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { useLocaleParams } from '@/i18n/use-locale'

import type { NavItem } from './nav-items'

interface NavLinkProps {
  item: NavItem
  className?: string
  /** Highlighted as the current section or page. */
  active?: boolean
  children: ReactNode
}

/** Links to a home-page section, or to a page such as Gallery, in the current language. */
export function NavLink({ item, className, active, children }: NavLinkProps) {
  const localeParams = useLocaleParams()
  const shared = { className, 'data-active': active || undefined, activeProps: {} }

  if ('page' in item) {
    return (
      <Link to="/{-$locale}/gallery" params={localeParams} {...shared}>
        {children}
      </Link>
    )
  }
  return (
    <Link
      to="/{-$locale}"
      params={localeParams}
      hash={item.hash}
      activeOptions={{ includeHash: true }}
      {...shared}
    >
      {children}
    </Link>
  )
}
