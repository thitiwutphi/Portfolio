import { Blocks } from 'lucide-react'
import { useId, useState } from 'react'

import { moreSkills, skillLabel, topSkills } from '@/content/skills'
import { useLocale, useMessages } from '@/i18n/use-locale'

import { Panel } from './panel'

const chipClass = 'inline-flex h-8 items-center rounded-full px-4 text-[13px]'

export function Skills({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useMessages()
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const skills = expanded ? [...topSkills, ...moreSkills] : topSkills

  return (
    <Panel id="skills" title={t.topSkills} icon={Blocks} className={className}>
      <ul id={listId} className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <li key={skillLabel(skill, 'en')}>
            <span className={`${chipClass} bg-chip text-chip-foreground`}>
              {skillLabel(skill, locale)}
            </span>
          </li>
        ))}
        {moreSkills.length > 0 && (
          // Same key in both states so focus stays on the button when the list grows.
          <li key="toggle">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={listId}
              onClick={() => setExpanded((value) => !value)}
              className={`${chipClass} border border-dashed border-brand/40 font-medium text-brand outline-none hover:bg-brand/10 focus-visible:ring-3 focus-visible:ring-ring/50`}
            >
              {expanded ? t.fewerSkills : t.moreSkills(moreSkills.length)}
            </button>
          </li>
        )}
      </ul>
    </Panel>
  )
}
