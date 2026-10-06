import { Moon, Sun } from 'lucide-react'
import { Switch as SwitchPrimitive } from 'radix-ui'

import { useMessages } from '@/i18n/use-locale'
import { cn } from '@/lib/utils'

import { useTheme } from './theme-context'

export function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const t = useMessages()
  const dark = resolvedTheme === 'dark'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Sun aria-hidden="true" className="size-4 text-heading/80" />
      <SwitchPrimitive.Root
        checked={dark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label={t.darkMode}
        className="inline-flex h-6 w-11 shrink-0 items-center rounded-full border bg-chip p-0.5 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=checked]:border-brand/40 data-[state=checked]:bg-brand/30"
      >
        <SwitchPrimitive.Thumb className="grid size-[18px] place-items-center rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-5">
          <Moon aria-hidden="true" className="size-3 text-brand" />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    </div>
  )
}
