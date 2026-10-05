import { Mail } from 'lucide-react'

import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { profile } from '@/content/profile'
import { cn } from '@/lib/utils'

const socialLinks = [
  { label: 'GitHub', href: profile.links.github, icon: GitHubIcon, external: true },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedInIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, external: false },
]

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socialLinks.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon-lg" asChild>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Icon className="size-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}
