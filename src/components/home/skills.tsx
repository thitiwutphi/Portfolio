import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { skillGroups } from '@/content/skills'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools of the trade">
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="secondary" className="h-7 px-3 text-sm font-normal">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
