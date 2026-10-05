import { IconTile } from '@/components/icon-tile'
import { focusIcons } from '@/components/icons'
import { Section } from '@/components/layout/section'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { focusAreas, profile } from '@/content/profile'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="From the lab to the field">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <li key={area.title}>
              <Card className="h-full">
                <CardHeader className="gap-2">
                  <IconTile icon={focusIcons[area.icon]} className="mb-2" />
                  <CardTitle className="font-semibold">
                    <h3>{area.title}</h3>
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{area.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
