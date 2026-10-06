import { useLocation, useMatch, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { homeSections, type NavKey, type NavSection } from '@/components/layout/nav-items'

const HEADER_OFFSET = 80
const sections = homeSections

function isSection(value: string): value is NavSection {
  return (sections as readonly string[]).includes(value)
}

function isOnScreen(id: string): boolean {
  const rect = document.getElementById(id)?.getBoundingClientRect()
  return !!rect && rect.bottom > HEADER_OFFSET && rect.top < window.innerHeight
}

function computeActive(preferred: NavSection | undefined): NavSection {
  // Several sections sit side by side on wide screens, so the one the visitor navigated to
  // stays highlighted for as long as it is visible.
  if (preferred && preferred !== 'home' && isOnScreen(preferred)) return preferred
  if (window.scrollY < 40) return 'home'

  const { scrollHeight } = document.documentElement
  if (window.innerHeight + window.scrollY >= scrollHeight - 4) return 'contact'

  let current: NavSection = 'home'
  for (const id of sections) {
    const top = document.getElementById(id)?.getBoundingClientRect().top
    if (top !== undefined && top <= HEADER_OFFSET + 1) current = id
  }
  return current
}

/** The navigation item to highlight: the home-page section in view, or the current page. */
export function useActiveSection(): NavKey | undefined {
  const isHome = useMatch({ from: '/{-$locale}/', shouldThrow: false }) !== undefined
  const onProjectPage = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.routeId.startsWith('/{-$locale}/projects')),
  })
  const onGalleryPage = useMatch({ from: '/{-$locale}/gallery', shouldThrow: false }) !== undefined
  const hash = useLocation({ select: (location) => location.hash })
  const [active, setActive] = useState<NavSection>('home')

  useEffect(() => {
    if (!isHome) return
    const preferred = isSection(hash) ? hash : undefined
    let frame = requestAnimationFrame(() => setActive(computeActive(preferred)))
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setActive(computeActive(preferred)))
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [isHome, hash])

  if (onProjectPage) return 'projects'
  if (onGalleryPage) return 'gallery'
  return isHome ? active : undefined
}
